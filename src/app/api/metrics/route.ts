import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import {
	fetchFacebookMetrics,
	fetchTwitterMetrics,
	fetchInstagramMetrics,
	fetchLinkedInMetrics,
	fetchTikTokMetrics,
} from '@/service/index';

// Force dynamic rendering for this route since it uses request.url
export const dynamic = 'force-dynamic';

// Create a Convex HTTP client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || '');

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get('userId');
		const platform = searchParams.get('platform');

		if (!userId || typeof userId !== 'string') {
			return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
		}

		if (!platform || typeof platform !== 'string') {
			return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
		}

		// Convert string userId to a proper Convex ID if needed
		let convexUserId: Id<'user'>;
		try {
			convexUserId = userId as Id<'user'>;
		} catch (idError) {
			return NextResponse.json(
				{ error: 'Invalid user ID format' },
				{ status: 400 }
			);
		}

		// First, try to get metrics from Convex (cached data)
		const cachedMetrics = await convex.query(
			api.social_media_analytics.getMetrics,
			{
				userId: convexUserId,
				platform,
			}
		);

		// If we have recent metrics (less than 1 hour old), return them
		const ONE_HOUR = 60 * 60 * 1000;
		if (
			cachedMetrics &&
			cachedMetrics.updatedAt &&
			Date.now() - cachedMetrics.updatedAt < ONE_HOUR
		) {
			return NextResponse.json(cachedMetrics);
		}

		// Get the access token for the requested platform for this user
		const socialAccount = await convex.query(
			api.social_media_analytics.getSocialAccount,
			{
				userId: convexUserId,
				platform,
			}
		);

		if (!socialAccount || !socialAccount.accessToken) {
			return NextResponse.json(
				{
					error: `No ${platform} account connected for this user`,
				},
				{ status: 404 }
			);
		}

		// Use the access token to fetch fresh metrics
		let freshMetrics;
		const accessToken = socialAccount.accessToken;

		switch (platform) {
			case 'facebook':
				freshMetrics = await fetchFacebookMetrics(accessToken);
				break;
			case 'twitter':
				freshMetrics = await fetchTwitterMetrics(accessToken);
				break;
			case 'instagram':
				freshMetrics = await fetchInstagramMetrics(accessToken);
				break;
			case 'linkedin':
				freshMetrics = await fetchLinkedInMetrics(accessToken);
				break;
			case 'tiktok':
				freshMetrics = await fetchTikTokMetrics(accessToken);
				break;
			default:
				return NextResponse.json(
					{ error: 'Unsupported platform' },
					{ status: 400 }
				);
		}

		// Extract and normalize metrics
		const normalizedMetrics = {
			followers:
				freshMetrics.followers ||
				freshMetrics.page_fan_adds?.data?.[0]?.value ||
				0,
			likes:
				freshMetrics.likes ||
				freshMetrics.page_engaged_users?.data?.[0]?.value ||
				0,
			views:
				freshMetrics.views ||
				freshMetrics.page_impressions?.data?.[0]?.value ||
				0,
		};

		// Save the fresh metrics to Convex
		await convex.mutation(api.social_media_analytics.updateMetrics, {
			userId: convexUserId,
			platform,
			followers: normalizedMetrics.followers,
			likes: normalizedMetrics.likes,
			views: normalizedMetrics.views,
			updatedAt: Date.now(),
		});

		return NextResponse.json(normalizedMetrics);
	} catch (error) {
		console.error('Error processing metrics:', error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Unknown error occurred',
			},
			{ status: 500 }
		);
	}
}
