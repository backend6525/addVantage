// app/api/publisher/route.ts
import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

// Create Convex client
const convexClient = new ConvexHttpClient(
	process.env.NEXT_PUBLIC_CONVEX_URL || ''
);

export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url);
		const adId = searchParams.get('adId');

		if (!adId) {
			return NextResponse.json({ error: 'Ad ID is required' }, { status: 400 });
		}

		// Get the ad details
		const ad = await convexClient.query(api.ads.getAd, { id: adId });

		if (!ad) {
			return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
		}

		// Check if the ad is published
		if (!ad.isPublished) {
			return NextResponse.json(
				{ error: 'Ad is not published' },
				{ status: 404 }
			);
		}

		// Get the publisher (user) information using the createdBy email
		const publisher = await convexClient.query(api.user.getUserByEmail, {
			email: ad.createdBy,
		});

		if (!publisher) {
			return NextResponse.json(
				{ error: 'Publisher not found' },
				{ status: 404 }
			);
		}

		// Get the count of published ads by this publisher
		const publishedAds = await convexClient.query(
			api.ads.getPublishedAdsByUser,
			{
				email: ad.createdBy,
			}
		);

		// Format the response to match the expected publisher interface
		const publisherInfo = {
			id: publisher._id,
			name: publisher.name || publisher.email,
			email: publisher.email,
			location: publisher.location || 'Unknown Location',
			logoUrl: publisher.picture || '/api/placeholder/64/64',
			totalAds: publishedAds?.length || 0,
			rating: 0, // You might want to calculate this based on reviews
			verified: false, // You might have a verification system
			bio: publisher.bio || 'No bio available',
			socialLinks: [], // You might want to store social links in the user table
		};

		return NextResponse.json(publisherInfo);
	} catch (error) {
		const errMessage = error instanceof Error ? error.message : 'Unknown error';
		console.error('Error fetching publisher information:', errMessage);
		return NextResponse.json(
			{ error: `Error fetching publisher information: ${errMessage}` },
			{ status: 500 }
		);
	}
};
