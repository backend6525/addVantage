import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Id } from '../../../../convex/_generated/dataModel';

interface ProductResponse {
	id: Id<'ads'>;
	createdBy: string;
	adName: string;
	teamId: string;
	type?: string;
	costPerView?: string;
	numberOfDaysRunning?: string;
	adResourceUrl?: string;
	description?: string;
	isPublished?: boolean;
	createdAt: string;
	lastModifiedAt: string;
}

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
		const { searchParams } = new URL(request.url);
		const email = searchParams.get('email');
		const id = searchParams.get('id');

		if (!email && !id) {
			return NextResponse.json(
				{ error: 'Either email or id parameter is required' },
				{ status: 400 }
			);
		}

		const convex = getConvexClient();

		// Use retry logic for fetching
		if (id) {
			const product = await withRetry(async () => {
				const result = (await convex.query(api.ads.getById, {
					id,
				})) as ProductResponse;
				if (!result) {
					throw new Error('Product not found');
				}
				return result;
			});

			return NextResponse.json(product);
		} else {
			const products = await withRetry(async () => {
				const result = (await convex.query(api.ads.list, {
					email,
				})) as ProductResponse[];
				if (!result) {
					throw new Error('No response from database');
				}
				return result;
			});

			return NextResponse.json(products);
		}
	} catch (error) {
		console.error('Error in product GET:', error);
		if (error instanceof Error && error.message === 'Product not found') {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
		}
		return NextResponse.json(
			{ error: 'Failed to fetch product data' },
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
		const { id, ...updateData } = body;

		if (!id) {
			return NextResponse.json(
				{ error: 'Product ID is required' },
				{ status: 400 }
			);
		}

		const convex = getConvexClient();

		// First verify the user owns this product
		const product = await withRetry(async () => {
			const result = (await convex.query(api.ads.getById, {
				id,
			})) as ProductResponse;
			if (!result) {
				throw new Error('Product not found');
			}
			return result;
		});

		if (product.createdBy !== userEmail) {
			return NextResponse.json(
				{ error: 'Unauthorized: You can only modify your own products' },
				{ status: 403 }
			);
		}

		// Proceed with update
		const result = await withRetry(() =>
			convex.mutation(api.ads.updateAd, {
				id,
				...updateData,
			})
		);

		return NextResponse.json(result);
	} catch (error) {
		console.error('Error in product PATCH:', error);
		return NextResponse.json(
			{ error: 'Failed to update product' },
			{ status: 500 }
		);
	}
}

// import { NextResponse } from 'next/server';
// import { headers } from 'next/headers';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import { ConvexHttpClient } from 'convex/browser';
// import { api } from '../../../../convex/_generated/api';

// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export async function GET(request: Request) {
// 	try {
// 		const headersList = headers();
// 		const userEmail = headersList.get('x-user-email');

// 		if (!userEmail) {
// 			console.warn('No user email found in headers');
// 			return NextResponse.json(
// 				{ error: 'User email is required' },
// 				{ status: 400 }
// 			);
// 		}

// 		const products = await convex.query(api.ads.listAds, { userEmail });

// 		return NextResponse.json(products);
// 	} catch (error) {
// 		console.error('Error in GET /api/product:', error);
// 		return NextResponse.json(
// 			{ error: 'Failed to fetch products' },
// 			{ status: 500 }
// 		);
// 	}
// }
