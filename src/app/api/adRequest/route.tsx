import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { NextResponse } from 'next/server';

type NotificationPayload = {
	userId: string;
	type: 'adRequest';
	message: string;
	adId: string;
	requesterId: string;
	status: 'pending';
};
// Create Convex client - note the name change from convex to convexClient
const convexClient = new ConvexHttpClient(
	process.env.NEXT_PUBLIC_CONVEX_URL || ''
);

// Helper to initialize Convex client
function getConvexClient() {
	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
		console.error('NEXT_PUBLIC_CONVEX_URL is not defined');
		throw new Error('Convex URL missing from environment variables.');
	}
	return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
}

// Helper to handle retries
async function withRetry(fn, retries = 3, delay = 1000) {
	try {
		return await fn();
	} catch (error) {
		if (retries <= 0) throw error;
		console.log(`Retrying... ${retries} attempts left`);
		await new Promise((resolve) => setTimeout(resolve, delay));
		return withRetry(fn, retries - 1, delay * 2);
	}
}

// POST: Handle Ad Request
export async function POST(request) {
	try {
		const userEmail = request.headers.get('x-user-email');
		if (!userEmail) {
			return NextResponse.json(
				{ error: 'User email is required' },
				{ status: 400 }
			);
		}

		const { adId, publisherId } = await request.json();
		if (!adId || !publisherId) {
			return NextResponse.json(
				{ error: 'Ad ID and publisher ID are required' },
				{ status: 400 }
			);
		}

		const convex = getConvexClient();

		await withRetry(async () => {
			const payload: NotificationPayload = {
				userId: publisherId,
				type: 'adRequest',
				message: `User ${userEmail} has requested access to your ad`,
				adId,
				requesterId: userEmail,
				status: 'pending',
			};

			// await convex.mutation(api.notifications.createNotification, payload);
			// const response = await convexClient.mutation(
			// 	api.notifications.createNotification,
			// 	payload
			// );
			// return response;
			const response = await convexClient.mutation(
				api.notifications.createNotification,
				payload as NotificationPayload
			);
			return response;
		});

		return NextResponse.json(
			{ message: 'Request sent successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error processing ad request:', error);
		return NextResponse.json(
			{ error: 'Failed to process request' },
			{ status: 500 }
		);
	}
}
