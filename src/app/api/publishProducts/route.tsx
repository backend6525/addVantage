import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 1000; // 1 second

// Initialize Convex client with timeout
function getConvexClient() {
	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
		throw new Error('NEXT_PUBLIC_CONVEX_URL is not defined');
	}
	return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
}

// Retry function with exponential backoff
async function withRetry<T>(
	operation: () => Promise<T>,
	retries = MAX_RETRIES,
	backoff = INITIAL_BACKOFF
): Promise<T> {
	try {
		return await operation();
	} catch (error) {
		if (retries === 0) throw error;

		console.log(
			`Retrying operation. Attempts remaining: ${retries}. Waiting ${backoff}ms`
		);
		await new Promise((resolve) => setTimeout(resolve, backoff));

		return withRetry(operation, retries - 1, backoff * 2);
	}
}

export async function GET(request: Request) {
	try {
		const headersList = headers();
		const userEmail = headersList.get('x-user-email');

		if (!userEmail) {
			return NextResponse.json(
				{ error: 'User email is required' },
				{ status: 400 }
			);
		}

		const convex = getConvexClient();

		// Explicitly query only truly published ads
		const publishedAds = await withRetry(() =>
			convex.query(api.ads.listPublishedAds, {
				userEmail,
				isPublished: true,
			})
		);

		// Log the response for debugging
		console.log('Published ads from database:', publishedAds);

		return NextResponse.json(publishedAds || [], {
			headers: {
				'Cache-Control': 'no-store, no-cache, must-revalidate',
				Pragma: 'no-cache',
			},
		});
	} catch (error) {
		console.error('Error in publishProducts GET:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch published ads' },
			{ status: 500 }
		);
	}
}

export async function PATCH(request: Request) {
	try {
		const headersList = headers();
		const userEmail = headersList.get('x-user-email');

		if (!userEmail) {
			return NextResponse.json(
				{ error: 'User email is required' },
				{ status: 400 }
			);
		}

		const body = await request.json();
		const { id, isPublished } = body;

		if (!id) {
			return NextResponse.json(
				{ error: 'Product ID is required' },
				{ status: 400 }
			);
		}

		const convex = getConvexClient();
		const result = await withRetry(() =>
			convex.mutation(api.ads.togglePublish, {
				id,
				isPublished,
				userEmail,
			})
		);

		return NextResponse.json(result);
	} catch (error) {
		console.error('Error in PATCH /api/publishProducts:', error);

		// Handle specific error types
		if (error.code === 'UND_ERR_CONNECT_TIMEOUT') {
			return NextResponse.json(
				{ error: 'Connection timeout. Please try again.' },
				{ status: 504 }
			);
		}

		return NextResponse.json(
			{ error: 'Failed to update publish status. Please try again later.' },
			{ status: 500 }
		);
	}
}
