// import { NextRequest, NextResponse } from 'next/server';
// import { ConvexHttpClient } from 'convex/browser';
// import { api } from '../../../../convex/_generated/api';
// //import convex from '@/lib/convex/convexClient';

// const convexClient = new ConvexHttpClient(
// 	process.env.NEXT_PUBLIC_CONVEX_URL || ''
// );
// export const POST = async (req: NextRequest) => {
// 	try {
// 		const body = await req.json();

// 		console.log('Received payload:', body);
// 		const {
// 			adName,
// 			teamId,
// 			createdBy,
// 			type,
// 			costPerView,
// 			numberOfDaysRunning,
// 			adResourceUrl,
// 		} = body;

// 		if (
// 			!adName ||
// 			!teamId ||
// 			!createdBy ||
// 			!type ||
// 			!costPerView ||
// 			!numberOfDaysRunning ||
// 			!adResourceUrl
// 		) {
// 			return NextResponse.json(
// 				{ error: 'Missing required fields' },
// 				{ status: 400 }
// 			);
// 		}

// 		const payload = body;

// 		// Corrected API path
// 		const response = await convexClient.mutation(api.ads.createAds, payload);
// 		console.log('Response from Convex mutation:', response);

// 		return NextResponse.json(response);
// 	} catch (error) {
// 		const errMessage = error instanceof Error ? error.message : 'Unknown error';
// 		console.error('Error creating ad in Convex:', errMessage);
// 		return NextResponse.json(
// 			{ error: `Error creating ad in Convex: ${errMessage}` },
// 			{ status: 500 }
// 		);
// 	}
// };

// import { NextRequest, NextResponse } from 'next/server';
// import { ConvexHttpClient } from 'convex/browser';
// import { api } from '../../../../convex/_generated/api';

// const convexClient = new ConvexHttpClient(
// 	process.env.NEXT_PUBLIC_CONVEX_URL || ''
// );

// export const POST = async (req: NextRequest) => {
// 	try {
// 		const body = await req.json();

// 		console.log('Received payload:', body);
// 		const {
// 			adName,
// 			teamId,
// 			createdBy,
// 			type,
// 			costPerView,
// 			numberOfDaysRunning,
// 			adResourceUrl,
// 		} = body;

// 		if (
// 			!adName ||
// 			!teamId ||
// 			!createdBy ||
// 			!type ||
// 			!costPerView ||
// 			!numberOfDaysRunning ||
// 			!adResourceUrl
// 		) {
// 			return NextResponse.json(
// 				{ error: 'Missing required fields' },
// 				{ status: 400 }
// 			);
// 		}

// 		// Type-cast payload if necessary
// 		const payload = body as {
// 			adName: string;
// 			teamId: string;
// 			createdBy: string;
// 			type: string;
// 			costPerView: number;
// 			numberOfDaysRunning: number;
// 			adResourceUrl: string;
// 		};

// 		// Explicitly annotate the mutation call
// 		const response = await convexClient.mutation<typeof api.ads.createAds>(
// 			api.ads.createAds,
// 			payload
// 		);

// 		console.log('Response from Convex mutation:', response);

// 		return NextResponse.json(response);
// 	} catch (error) {
// 		const errMessage = error instanceof Error ? error.message : 'Unknown error';
// 		console.error('Error creating ad in Convex:', errMessage);
// 		return NextResponse.json(
// 			{ error: `Error creating ad in Convex: ${errMessage}` },
// 			{ status: 500 }
// 		);
// 	}
// };

import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

const convexClient = new ConvexHttpClient(
	process.env.NEXT_PUBLIC_CONVEX_URL || ''
);

type CreateAdsPayload = {
	adName: string;
	teamId: string;
	createdBy: string;
	type: string;
	costPerView: number;
	numberOfDaysRunning: number;
	adResourceUrl: string;
};

type CreateAdsResponse = {
	success: boolean;
	message: string;
};

async function createAd(payload: CreateAdsPayload): Promise<CreateAdsResponse> {
	return convexClient.mutation(
		api.ads.createAds,
		payload
	) as unknown as CreateAdsResponse;
}

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();

		console.log('Received payload:', body);

		const {
			adName,
			teamId,
			createdBy,
			type,
			costPerView,
			numberOfDaysRunning,
			adResourceUrl,
		} = body;

		if (
			!adName ||
			!teamId ||
			!createdBy ||
			!type ||
			!costPerView ||
			!numberOfDaysRunning ||
			!adResourceUrl
		) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		const payload: CreateAdsPayload = body;

		const response = await createAd(payload);

		console.log('Response from Convex mutation:', response);

		return NextResponse.json(response);
	} catch (error) {
		const errMessage = error instanceof Error ? error.message : 'Unknown error';
		console.error('Error creating ad in Convex:', errMessage);
		return NextResponse.json(
			{ error: `Error creating ad in Convex: ${errMessage}` },
			{ status: 500 }
		);
	}
};
