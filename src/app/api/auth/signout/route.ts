import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';

// Create Convex client
const convexClient = new ConvexHttpClient(
	process.env.NEXT_PUBLIC_CONVEX_URL || ''
);

export async function POST(req: Request) {
	try {
		// Get the access token directly from Kinde
		const { getUser, getAccessToken } = getKindeServerSession();
		const user = await getUser();
		const accessToken = await getAccessToken();

		if (!user?.email) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		try {
			// Try to update Convex without auth token first
			await convexClient.mutation(api.user.handleSignOut, {
				email: user.email,
			});
		} catch (convexError) {
			console.error('Error updating Convex:', convexError);
			// Continue with signout even if Convex update fails
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error during signout:', error);
		return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 });
	}
}
