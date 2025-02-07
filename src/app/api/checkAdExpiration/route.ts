// import { ConvexHttpClient } from 'convex/browser';
// import { api } from '../../../../convex/_generated/api';
// import { NextResponse } from 'next/server';

// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// export async function GET() {
// 	try {
// 		const expiringAds = await convex.query(api.ads.checkAdExpiration);

// 		return NextResponse.json(expiringAds, {
// 			status: 200,
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		});
// 	} catch (error) {
// 		console.error('Error checking ad expiration:', error);
// 		return NextResponse.json(
// 			{ error: 'Failed to check ad expiration' },
// 			{ status: 500 }
// 		);
// 	}
// }

// import { NextResponse } from 'next/server';
// import { ConvexHttpClient } from 'convex/browser';
// import { api } from '../../../../convex/_generated/api';

// // Create Convex client
// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || '');

// export async function GET() {
// 	try {
// 		// Explicitly type the response or use a more specific query method
// 		const expiringAds = await convex.query(api.ads.checkAdExpiration, {}); // Add empty object as parameters

// 		return NextResponse.json(expiringAds);
// 	} catch (error) {
// 		const errMessage = error instanceof Error ? error.message : 'Unknown error';
// 		console.error('Error checking ad expiration:', errMessage);
// 		return NextResponse.json(
// 			{ error: `Error checking ad expiration: ${errMessage}` },
// 			{ status: 500 }
// 		);
// 	}
// }

import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

// Create Convex client
const convexClient = new ConvexHttpClient(
	process.env.NEXT_PUBLIC_CONVEX_URL || ''
);

export async function GET() {
	try {
		// Using mutation instead of query
		const expiringAds = await convexClient.mutation(api.ads.checkAdExpiration);

		return NextResponse.json(expiringAds);
	} catch (error) {
		const errMessage = error instanceof Error ? error.message : 'Unknown error';
		console.error('Error checking ad expiration:', errMessage);
		return NextResponse.json(
			{ error: `Error checking ad expiration: ${errMessage}` },
			{ status: 500 }
		);
	}
}
