// // app/api/user/limits/route.ts
// import { NextResponse, NextRequest } from 'next/server';
// import { ConvexHttpClient } from 'convex/browser';
// import { api } from '@/../../convex/_generated/api';

// // Create a Convex client
// const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
// if (!convexUrl) {
// 	console.error('NEXT_PUBLIC_CONVEX_URL environment variable is not set');
// }

// const convex = new ConvexHttpClient(convexUrl || '');

// export async function GET(request: NextRequest) {
// 	const { searchParams } = new URL(request.url);
// 	const email = searchParams.get('email');

// 	console.log('UserLimits API - Request received for email:', email);

// 	if (!email) {
// 		console.log('UserLimits API - Error: No email provided');
// 		return NextResponse.json(
// 			{ error: 'Email parameter is required' },
// 			{ status: 400 }
// 		);
// 	}

// 	if (!convexUrl) {
// 		console.error('UserLimits API - Error: Convex URL not configured');
// 		return NextResponse.json(
// 			{ error: 'Server configuration error' },
// 			{ status: 500 }
// 		);
// 	}

// 	try {
// 		// Get user data using our user module
// 		const userData = await convex.query(api.user.getUserByEmail, { email });

// 		console.log('UserLimits API - Raw userData:', userData);

// 		if (!userData) {
// 			console.log('UserLimits API - User not found');
// 			return NextResponse.json({ error: 'User not found' }, { status: 404 });
// 		}

// 		// Check if we need to reset limits based on time elapsed
// 		const now = new Date();
// 		const lastReset = new Date(userData.lastLimitReset || 0);

// 		// Fix incorrect future date
// 		if (lastReset > now) {
// 			console.log('UserLimits API - Fixing incorrect future date');
// 			await convex.mutation(api.user.updateLastLimitReset, {
// 				email,
// 				timestamp: now.toISOString(),
// 			});
// 			lastReset.setTime(now.getTime());
// 		}

// 		const daysSinceReset = Math.floor(
// 			(now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24)
// 		);

// 		console.log('UserLimits API - Days since last reset:', daysSinceReset);

// 		let dailyAdCount = userData.dailyAdCount || 0;
// 		let weeklyAdCount = userData.weeklyAdCount || 0;

// 		// Reset daily count if it's a new day
// 		if (daysSinceReset >= 1) {
// 			console.log('UserLimits API - Resetting daily count');
// 			dailyAdCount = 0;
// 			await convex.mutation(api.user.resetDailyAdCount, { email });
// 		}

// 		// Reset weekly count if it's been a week
// 		if (daysSinceReset >= 7) {
// 			console.log('UserLimits API - Resetting weekly count');
// 			weeklyAdCount = 0;
// 			await convex.mutation(api.user.resetWeeklyAdCount, { email });
// 		}

// 		// If we reset any counts, update the last reset time
// 		if (daysSinceReset >= 1) {
// 			console.log('UserLimits API - Updating last reset time');
// 			await convex.mutation(api.user.updateLastLimitReset, {
// 				email,
// 				timestamp: now.toISOString(),
// 			});
// 		}

// 		// Get user credits to check if they have credits
// 		const userCredits = await convex.mutation(api.credits.getUserCredits, {
// 			email,
// 		});
// 		console.log('UserLimits API - User credits:', userCredits);

// 		const response = {
// 			dailyAdCount,
// 			weeklyAdCount,
// 			dailyAdLimit: userData.dailyAdLimit || 1,
// 			weeklyAdLimit: userData.weeklyAdLimit || 5,
// 			hasCredits: userCredits?.hasCredits || false,
// 			credits: userCredits?.credits || 0,
// 			accountType: userCredits?.accountType || 'free',
// 		};

// 		console.log('UserLimits API - Final response:', response);
// 		return NextResponse.json(response);
// 	} catch (error) {
// 		console.error('UserLimits API - Error fetching user limits:', error);
// 		// Log the full error details
// 		if (error instanceof Error) {
// 			console.error('Error details:', {
// 				message: error.message,
// 				stack: error.stack,
// 				name: error.name,
// 			});
// 		}
// 		return NextResponse.json(
// 			{
// 				error: 'Failed to fetch user limits',
// 				details: error instanceof Error ? error.message : 'Unknown error',
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

import { NextResponse, NextRequest } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../../convex/_generated/api';

// Create a Convex client
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
	console.error('NEXT_PUBLIC_CONVEX_URL environment variable is not set');
}

const convex = new ConvexHttpClient(convexUrl || '');

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get('email');

	console.log('UserLimits API - Request received for email:', email);

	if (!email) {
		console.log('UserLimits API - Error: No email provided');
		return NextResponse.json(
			{ error: 'Email parameter is required' },
			{ status: 400 }
		);
	}

	if (!convexUrl) {
		console.error('UserLimits API - Error: Convex URL not configured');
		return NextResponse.json(
			{ error: 'Server configuration error' },
			{ status: 500 }
		);
	}

	try {
		console.log(
			'UserLimits API - Fetching from SINGLE SOURCE OF TRUTH (userCredits)...'
		);

		// Get the authoritative data from userCredits table (SINGLE SOURCE OF TRUTH)
		const userCredits = await convex.query(api.credits.getUserCreditsQuery, {
			email,
		});

		console.log('UserLimits API - Single source data:', userCredits);

		if (!userCredits) {
			console.log('UserLimits API - No user credits found, user may not exist');
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Get basic user info for profile data only (not for limits)
		let userData = null;
		try {
			userData = await convex.query(api.user.getUserByEmail, { email });
		} catch (userError) {
			console.warn(
				'UserLimits API - Could not fetch user profile data:',
				userError
			);
		}

		// Return ONLY data from the single source of truth
		const response = {
			// Limits data - ONLY from userCredits table
			dailyAdCount: userCredits.dailyAdCount,
			weeklyAdCount: userCredits.weeklyAdCount,
			dailyAdLimit: userCredits.dailyAdLimit,
			weeklyAdLimit: userCredits.weeklyAdLimit,

			// Credit status - from userCredits table
			hasCredits: userCredits.hasCredits,
			credits: userCredits.credits,
			accountType: userCredits.accountType,

			// Profile info - from user table
			onboardingCompleted: userData?.onboardingCompleted || false,
			name: userData?.name || email.split('@')[0],
			email: email,
			picture: userData?.picture || '',

			// Metadata
			lastAdCreated: userCredits.lastAdCreated,
			lastUpdated: userCredits.updatedAt,
		};

		console.log('UserLimits API - Returning single-source data:', response);
		return NextResponse.json(response);
	} catch (error) {
		console.error('UserLimits API - Error fetching user limits:', error);

		// Log detailed error information
		if (error instanceof Error) {
			console.error('UserLimits API - Error details:', {
				message: error.message,
				stack: error.stack,
				name: error.name,
			});
		}

		return NextResponse.json(
			{
				error: 'Failed to fetch user limits',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
