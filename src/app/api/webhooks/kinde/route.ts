// app/api/webhooks/kinde/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';

// Create a Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
	try {
		// Verify webhook signature (recommended in production)
		// const signature = request.headers.get('kinde-signature');
		// Verify signature logic here...

		// Parse the webhook payload
		const payload = await request.json();
		console.log('Kinde webhook received:', payload.event, payload.data?.email);

		// Handle user creation events
		if (payload.event === 'user.created') {
			const userData = payload.data;

			if (!userData.email) {
				console.error('No email provided in webhook payload');
				return NextResponse.json(
					{ error: 'No email provided' },
					{ status: 400 }
				);
			}

			// Check if user already exists to prevent duplicates
			try {
				const existingUser = await convex.query(api.user.getUserByEmail, {
					email: userData.email,
				});
				console.log('User already exists:', userData.email);
				return NextResponse.json({
					success: true,
					message: 'User already exists',
				});
			} catch (error) {
				// User doesn't exist, create them
				console.log('Creating new user:', userData.email);
			}

			// Create the user with the correct schema
			await convex.mutation(api.user.createUser, {
				name:
					`${userData.given_name || ''} ${userData.family_name || ''}`.trim() ||
					userData.email.split('@')[0],
				email: userData.email,
				picture: userData.picture || '',
				dailyAdCount: 0,
				weeklyAdCount: 0,
				dailyAdLimit: 1, // Default free limit
				weeklyAdLimit: 5, // Default free limit
				createdAt: new Date().toISOString(),
				lastUpdated: new Date().toISOString(),
				onboardingCompleted: false,
			});

			console.log('User created via webhook:', userData.email);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error processing Kinde webhook:', error);
		return NextResponse.json(
			{ error: 'Webhook processing failed' },
			{ status: 500 }
		);
	}
}
