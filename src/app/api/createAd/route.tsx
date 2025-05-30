import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

// Create Convex client
const convexClient = new ConvexHttpClient(
	process.env.NEXT_PUBLIC_CONVEX_URL || ''
);

export const POST = async (req: NextRequest) => {
	try {
		// Get authenticated user
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user || !user.email) {
			return NextResponse.json(
				{ error: 'Authentication required to create an ad' },
				{ status: 401 }
			);
		}

		// Parse request body
		const body = await req.json();

		console.log('Received payload:', body);

		// Destructure required fields from the body
		const {
			adName,
			teamId,
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

		// Create payload with user email
		const adPayload = {
			adName,
			teamId,
			createdBy: user.email,
			type,
			costPerView,
			numberOfDaysRunning,
			adResourceUrl,
			description,
		};

		// Send the payload to Convex API
		const response = await convexClient.mutation(
			api.ads.createAdWithEmail,
			adPayload
		);
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
