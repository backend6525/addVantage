import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';

// Create Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || '');

export async function POST(request: NextRequest) {
	try {
		// Check if user is authenticated
		const { getUser, isAuthenticated } = getKindeServerSession();
		const authenticated = await isAuthenticated();

		if (!authenticated) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		const user = await getUser();

		if (!user || !user.email) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// For security, you might want to add additional admin checks here
		// For now, any authenticated user can run this migration
		console.log(`Running user roles migration requested by: ${user.email}`);

		// Call the Convex mutation to fix users with empty roles
		const result = await convex.mutation(api.user.fixUsersWithEmptyRoles, {
			adminEmail: user.email,
		});

		return NextResponse.json({
			success: true,
			message: 'User roles migration completed successfully',
			...result,
		});
	} catch (error) {
		console.error('Error in user roles migration:', error);
		return NextResponse.json(
			{
				error: 'Failed to fix user roles',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
