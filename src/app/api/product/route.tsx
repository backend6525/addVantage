import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Id } from '../../../../convex/_generated/dataModel';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

interface ProductResponse {
	_id: Id<'ads'>;
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

function getConvexClient() {
	// Log environment details
	console.log('Environment check:', {
		hasConvexUrl: !!process.env.NEXT_PUBLIC_CONVEX_URL,
		envMode: process.env.NODE_ENV,
	});

	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
		throw new Error('NEXT_PUBLIC_CONVEX_URL is not defined');
	}
	return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
}

async function withRetry<T>(
	operation: () => Promise<T>,
	retries = MAX_RETRIES,
	backoff = INITIAL_BACKOFF
): Promise<T> {
	const timeoutPromise = new Promise((_, reject) => {
		setTimeout(() => reject(new Error('Operation timed out')), TIMEOUT);
	});

	try {
		const result = await Promise.race([operation(), timeoutPromise]);
		return result as T;
	} catch (error) {
		if (retries === 0) {
			console.error('All retries exhausted:', {
				originalError: error.message,
				backoff,
				timestamp: new Date().toISOString(),
			});
			throw error;
		}

		console.log(
			`Retrying operation in ${process.env.NODE_ENV}. Attempts remaining: ${retries}. Waiting ${backoff}ms`
		);
		await new Promise((resolve) => setTimeout(resolve, backoff));

		return withRetry(operation, retries - 1, backoff * 2);
	}
}

export async function GET(request: Request) {
	try {
		// Log request details
		const url = new URL(request.url);
		console.log('GET request details:', {
			path: url.pathname,
			host: url.host,
			protocol: url.protocol,
			environment: process.env.NODE_ENV,
		});

		const { searchParams } = url;
		const email = searchParams.get('email');
		const id = searchParams.get('id');

		// Get user email from headers if available
		const headersList = headers();
		// const headerEmail = headersList.get('x-user-email');

		// Use email from headers if not provided in query params
		let userEmail = email;

		// if (!userEmail && !id) {
		// 	return NextResponse.json(
		// 		{ error: 'Either email parameter or x-user-email header is required' },
		// 		{ status: 400 }
		// 	);
		// }

		if (!userEmail) {
			try {
				const { getUser } = getKindeServerSession();
				const user = await getUser();
				if (user && user.email) {
					userEmail = user.email;
					console.log('Retrieved email from authenticated session:', userEmail);
				} else {
					return NextResponse.json(
						{ error: 'User email could not be determined' },
						{ status: 401 }
					);
				}
			} catch (authError) {
				console.error('Authentication error:', authError);
				return NextResponse.json(
					{ error: 'Authentication failed' },
					{ status: 401 }
				);
			}
		}

		const convex = getConvexClient();

		if (id) {
			// Check if we have a userEmail to pass along
			if (!userEmail) {
				return NextResponse.json(
					{ error: 'User email is required when fetching by ID' },
					{ status: 400 }
				);
			}

			console.log(
				`Attempting to fetch product with ID: ${id} for user: ${userEmail}`
			);

			const product = await withRetry(async () => {
				// Use the correct function name
				const result = (await convex.query(api.ads.getAdById, {
					id,
				})) as ProductResponse;

				if (!result) {
					throw new Error('Product not found');
				}

				// Transform the result to match the expected format
				return {
					id: result._id,
					title: result.adName || 'No Title',
					description: result.description || 'No description available',
					adResourceUrl: result.adResourceUrl || '',
					costPerView: result.costPerView || '0',
					type: result.type || 'Unknown Type',
					numberOfDaysRunning: result.numberOfDaysRunning || '0',
					teamId: result.teamId || 'N/A',
					createdBy: result.createdBy,
					isPublished: result.isPublished || false,
					createdAt: result.createdAt,
					lastModifiedAt: result.lastModifiedAt,
				};
			});

			return NextResponse.json(product, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, x-user-email',
				},
			});
		} else {
			const products = await withRetry(async () => {
				// Users are now created by the auth flow, so we can directly query
				const result = (await convex.query(api.ads.list, {
					email: userEmail,
				})) as ProductResponse[];

				if (!result) {
					throw new Error('No response from database');
				}
				return result;
			});

			return NextResponse.json(products, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, x-user-email',
				},
			});
		}
	} catch (error) {
		console.error('Detailed error in GET:', {
			name: error.name,
			message: error.message,
			stack: error.stack,
			url: request.url,
			environment: process.env.NODE_ENV,
		});

		if (error instanceof Error) {
			// Handle specific error messages
			if (error.message === 'Product not found') {
				return NextResponse.json(
					{ error: 'Product not found' },
					{ status: 404 }
				);
			}

			if (error.message.includes('Unauthorized')) {
				return NextResponse.json({ error: error.message }, { status: 403 });
			}

			if (error.message.includes('timed out')) {
				return NextResponse.json(
					{ error: 'Request timed out. Please try again.' },
					{ status: 504 }
				);
			}
		}

		// Include error details in development mode for easier debugging
		return NextResponse.json(
			{
				error: 'Failed to fetch product data',
				details:
					process.env.NODE_ENV === 'development' ? error.message : undefined,
			},
			{ status: 500 }
		);
	}
}

export async function PATCH(request: Request) {
	try {
		// Log request details
		const url = new URL(request.url);
		console.log('PATCH request details:', {
			path: url.pathname,
			host: url.host,
			protocol: url.protocol,
			environment: process.env.NODE_ENV,
		});

		const headersList = headers();
		const userEmail = headersList.get('x-user-email');

		// Log headers for debugging
		console.log('Request headers:', Object.fromEntries(headersList.entries()));

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

		return NextResponse.json(result, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, x-user-email',
			},
		});
	} catch (error) {
		console.error('Detailed error in PATCH:', {
			error: error.message,
			type: error.constructor.name,
			stack: error.stack,
			timestamp: new Date().toISOString(),
			environment: process.env.NODE_ENV,
		});

		if (error.message.includes('timed out')) {
			return NextResponse.json(
				{ error: 'Request timed out. Please try again.' },
				{ status: 504 }
			);
		}

		if (error.message.includes('not found')) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
		}

		return NextResponse.json(
			{
				error: 'Failed to update product',
				details:
					process.env.NODE_ENV === 'development' ? error.message : undefined,
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(request: Request) {
	try {
		const url = new URL(request.url);
		const { searchParams } = url;
		const id = searchParams.get('id');
		const headersList = headers();
		const userEmail = headersList.get('x-user-email');

		console.log('Delete request received:', {
			id,
			userEmail,
			timestamp: new Date().toISOString(),
		});

		if (!id) {
			return NextResponse.json(
				{ error: 'Product ID is required' },
				{ status: 400 }
			);
		}

		if (!userEmail) {
			return NextResponse.json(
				{ error: 'User email is required' },
				{ status: 400 }
			);
		}

		const convex = getConvexClient();

		// First get the ad to get the image URL
		const ad = await withRetry(async () => {
			console.log('Fetching ad details for deletion:', id);
			const result = await convex.query(api.ads.getAdById, {
				id: id as Id<'ads'>,
			});
			if (!result) {
				throw new Error('Ad not found');
			}
			return result;
		});

		console.log('Ad details retrieved:', {
			id: ad._id,
			imageUrl: ad.adResourceUrl,
		});

		// Delete the image from S3 if it exists
		if (ad.adResourceUrl) {
			console.log('Attempting to delete image from S3:', ad.adResourceUrl);
			try {
				const deleteResponse = await fetch('/api/deleteFromS3', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						fileName: ad.adResourceUrl,
					}),
				});

				if (!deleteResponse.ok) {
					const errorText = await deleteResponse.text();
					console.error('Failed to delete image from S3:', {
						status: deleteResponse.status,
						error: errorText,
						url: ad.adResourceUrl,
					});
				} else {
					console.log('Successfully deleted image from S3:', ad.adResourceUrl);
				}
			} catch (error) {
				console.error('Error deleting image from S3:', {
					error: error instanceof Error ? error.message : 'Unknown error',
					url: ad.adResourceUrl,
					timestamp: new Date().toISOString(),
				});
			}
		} else {
			console.log('No image URL found for ad:', id);
		}

		// Delete the product from Convex
		console.log('Deleting ad from Convex:', id);
		await withRetry(async () => {
			await convex.mutation(api.ads.deleteAd, {
				id: id as Id<'ads'>,
				userEmail: userEmail,
			});
		});

		console.log('Successfully deleted ad:', {
			id,
			userEmail,
			timestamp: new Date().toISOString(),
		});

		return NextResponse.json(
			{ success: true },
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, x-user-email',
				},
			}
		);
	} catch (error) {
		console.error('Error in delete operation:', {
			error: error instanceof Error ? error.message : 'Unknown error',
			timestamp: new Date().toISOString(),
		});
		return NextResponse.json(
			{
				error: 'Failed to delete product',
				details:
					process.env.NODE_ENV === 'development' ? error.message : undefined,
			},
			{ status: 500 }
		);
	}
}
