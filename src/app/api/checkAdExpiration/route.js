import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

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
			// Perform the mutation to check ad expiration
			const expiringAds = await convex.mutation(api.ads.checkAdExpiration);
			console.log('Raw response from Convex mutation:', expiringAds);

			// Ensure we have an array of responses
			const formattedResponse = Array.isArray(expiringAds) ? expiringAds : [];

			// Log the formatted response
			console.log('Formatted expiring ads:', formattedResponse);

			// Group ads by status for better organization
			const groupedAds = formattedResponse.reduce((acc, ad) => {
				const status = ad.isActive ? 'active' : 'expired';
				if (!acc[status]) acc[status] = [];
				acc[status].push(ad);
				return acc;
			}, {});

			return NextResponse.json({
				ads: formattedResponse,
				summary: {
					total: formattedResponse.length,
					active: groupedAds.active?.length || 0,
					expired: groupedAds.expired?.length || 0,
				},
			});
		} catch (convexError) {
			console.error('Convex mutation error:', convexError);
			throw convexError;
		}
	} catch (error) {
		console.error('Error in checkAdExpiration GET route:', error);
		return NextResponse.json(
			{
				error: 'Failed to check ad expiration',
				details: error.message,
				timestamp: new Date().toISOString(),
			},
			{ status: 500 }
		);
	}
}
