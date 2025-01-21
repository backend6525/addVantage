import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

// Create Convex client
const convexClient = new ConvexHttpClient(
	process.env.NEXT_PUBLIC_CONVEX_URL || ''
);

export const POST = async (req) => {
	try {
		// Parse request body
		const body = await req.json();

		console.log('Received payload:', body);

		// Destructure required fields from the body
		const {
			adName,
			teamId,
			createdBy,
			type,
			costPerView,
			numberOfDaysRunning,
			adResourceUrl,
			description,
		} = body;

		// Check for missing required fields
		if (
			!adName ||
			!teamId ||
			!createdBy ||
			!type ||
			!costPerView ||
			!numberOfDaysRunning ||
			!adResourceUrl ||
			!description
		) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Send the payload to Convex API
		const response = await convexClient.mutation(api.ads.createAds, body);
		console.log('Response from Convex mutation:', response);

		// Return success response
		return NextResponse.json(response);
	} catch (error) {
		// Handle errors and return appropriate response
		const errMessage = error instanceof Error ? error.message : 'Unknown error';
		console.error('Error creating ad in Convex:', errMessage);
		return NextResponse.json(
			{ error: `Error creating ad in Convex: ${errMessage}` },
			{ status: 500 }
		);
	}
};
