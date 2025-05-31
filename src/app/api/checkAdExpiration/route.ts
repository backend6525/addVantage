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

		const client = getConvexClient();
		const expiredAds = await client.query(api.ads.checkAdExpiration);

		const expiredCount = expiredAds.filter((ad) => ad.isExpired).length;
		const expiringCount = expiredAds.filter((ad) => ad.isExpiring).length;

		return NextResponse.json({
			success: true,
			data: {
				ads: expiredAds,
				summary: {
					total: expiredAds.length,
					active: expiredAds.filter((ad) => ad.isPublished).length,
					expired: expiredCount,
					expiring: expiringCount,
				},
			},
			message: `Ad expiration check completed. Found ${expiredCount} expired ads.`,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error('Error checking ad expiration:', error);

		return NextResponse.json({
			success: false,
			data: {
				ads: [],
				summary: {
					total: 0,
					active: 0,
					expired: 0,
					expiring: 0,
				},
			},
			message: `Error checking ad expiration: ${error instanceof Error ? error.message : 'Unknown error'}`,
			timestamp: new Date().toISOString(),
		});
	}
}
