// app/api/webhooks/kinde/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/../../convex/_generated/api';
// Create a Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function POST(request: NextRequest) {
	try {
		// Verify webhook signature (recommended in production)
		// const signature = request.headers.get('kinde-signature');
		// Verify signature logic here...

		// Parse the webhook payload
		const payload = await request.json();

		// Handle user creation events
		if (payload.event === 'user.created') {
			const userData = payload.data;

			// Check if user already exists to prevent duplicates
			const existingUser = await convex.query(api.users.getUserByEmail, {
				email: userData.email,
			});

			if (!existingUser) {
				// Create the user with your schema
				await convex.mutation(api.users.createUser, {
					name: `${userData.given_name || ''} ${userData.family_name || ''}`.trim(),
					email: userData.email,
					picture: userData.picture || '',
					dailyAdCount: 0,
					weeklyAdCount: 0,
					dailyAdLimit: 5, // Default limit
					weeklyAdLimit: 20, // Default limit
					createdAt: new Date().toISOString(),
					lastUpdated: new Date().toISOString(),
				});

				console.log('User created via webhook:', userData.email);
			}
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
