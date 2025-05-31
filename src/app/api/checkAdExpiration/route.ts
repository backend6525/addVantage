// import { NextResponse } from 'next/server';
// import { ConvexHttpClient } from 'convex/browser';
// import { api } from '../../../../convex/_generated/api';

// // Define the expected response type
// type CheckAdExpirationResponse = {
// 	id: string;
// 	isActive: boolean;
// 	daysRemaining?: number;
// 	startDate?: string;
// 	endDate?: string;
// }[];

// function getConvexClient() {
// 	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
// 		throw new Error('NEXT_PUBLIC_CONVEX_URL is not defined');
// 	}
// 	return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
// }

// export async function GET() {
// 	try {
// 		console.log('Starting ad expiration check...');
// 		const convex = getConvexClient();

// 		try {
// 			// Directly call the mutation without type casting
// 			const expiringAds = (await convex.query(
// 				api.ads.checkAdExpiration
// 			)) as CheckAdExpirationResponse;
// 			console.log('Raw response from Convex mutation:', expiringAds);

// 			const formattedResponse = Array.isArray(expiringAds) ? expiringAds : [];
// 			console.log('Formatted expiring ads:', formattedResponse);

// 			// Group ads by status
// 			const groupedAds = formattedResponse.reduce(
// 				(acc, ad) => {
// 					const status = ad.isActive ? 'active' : 'expired';
// 					if (!acc[status]) acc[status] = [];
// 					acc[status].push(ad);
// 					return acc;
// 				},
// 				{} as Record<string, typeof formattedResponse>
// 			);

// 			return NextResponse.json({
// 				success: true,
// 				data: {
// 					ads: formattedResponse,
// 					summary: {
// 						total: formattedResponse.length,
// 						active: groupedAds.active?.length || 0,
// 						expired: groupedAds.expired?.length || 0,
// 					},
// 				},
// 			});
// 		} catch (convexError) {
// 			console.error('Convex mutation error:', convexError);
// 			return NextResponse.json(
// 				{
// 					success: false,
// 					error: 'Mutation failed',
// 					details:
// 						convexError instanceof Error
// 							? convexError.message
// 							: 'Unknown error',
// 				},
// 				{ status: 400 }
// 			);
// 		}
// 	} catch (error) {
// 		console.error('Error in checkAdExpiration GET route:', error);
// 		return NextResponse.json(
// 			{
// 				success: false,
// 				error: 'Failed to check ad expiration',
// 				details: error instanceof Error ? error.message : 'Unknown error',
// 				timestamp: new Date().toISOString(),
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

// Define the expected response type
type CheckAdExpirationResponse = {
	id: string;
	isPublished: boolean;
	daysRemaining?: number;
	isExpiring: boolean;
	startDate?: string;
	duration?: number;
}[];

function getConvexClient() {
	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
		throw new Error('NEXT_PUBLIC_CONVEX_URL is not defined');
	}
	return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
}

export async function GET() {
	try {
		console.log('Starting ad expiration check...');
		const convex = getConvexClient();

		try {
			const expiringAds = (await convex.query(
				api.ads.checkAdExpiration
			)) as CheckAdExpirationResponse;
			console.log('Raw response from Convex mutation:', expiringAds);

			const formattedResponse = Array.isArray(expiringAds) ? expiringAds : [];
			console.log('Formatted expiring ads:', formattedResponse);

			// Use simpler grouping logic
			const groupedAds: Record<string, CheckAdExpirationResponse> = {
				active: [],
				expired: [],
			};
			formattedResponse.forEach((ad) => {
				const status = ad.isExpiring ? 'active' : 'expired';
				groupedAds[status].push(ad);
			});

			return NextResponse.json({
				success: true,
				data: {
					ads: formattedResponse,
					summary: {
						total: formattedResponse.length,
						active: groupedAds.active.length,
						expired: groupedAds.expired.length,
					},
				},
			});
		} catch (convexError) {
			console.error('Convex mutation error:', convexError);
			return NextResponse.json(
				{
					success: false,
					error: 'Mutation failed',
					details:
						convexError instanceof Error
							? convexError.message
							: 'Unknown error',
				},
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error('Error in checkAdExpiration GET route:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to check ad expiration',
				details: error instanceof Error ? error.message : 'Unknown error',
				timestamp: new Date().toISOString(),
			},
			{ status: 500 }
		);
	}
}
