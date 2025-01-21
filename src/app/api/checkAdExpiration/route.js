import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { NextResponse } from 'next/server';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function GET() {
	try {
		const expiringAds = await convex.query(api.ads.checkAdExpiration);

		return NextResponse.json(expiringAds, {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Error checking ad expiration:', error);
		return NextResponse.json(
			{ error: 'Failed to check ad expiration' },
			{ status: 500 }
		);
	}
}
