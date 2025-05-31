import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';

// Create Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || '');

export async function GET(request: NextRequest) {
	try {
		// Check if user is authenticated
		const { getUser, getClaim, isAuthenticated } = getKindeServerSession();
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

		// Get roles from Kinde
		const rolesClaim = await getClaim('roles');
		const kindeRoles = rolesClaim ? rolesClaim.value : [];
		const rolesArray = Array.isArray(kindeRoles)
			? kindeRoles
			: kindeRoles
				? [kindeRoles]
				: [];

		// Get user from Convex
		let convexUser = null;
		try {
			convexUser = await convex.query(api.user.getUserByEmail, {
				email: user.email,
			});
		} catch (error) {
			console.log('User not found in Convex');
		}

		return NextResponse.json({
			success: true,
			debug: {
				userEmail: user.email,
				kindeRoles: {
					raw: kindeRoles,
					processed: rolesArray,
				},
				convexUser: {
					exists: !!convexUser,
					roles: convexUser?.roles || [],
					email: convexUser?.email,
					id: convexUser?._id,
				},
				timestamp: new Date().toISOString(),
			},
		});
	} catch (error) {
		console.error('Error in debug endpoint:', error);
		return NextResponse.json(
			{
				error: 'Failed to fetch user roles debug info',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		// Force sync roles from Kinde to Convex
		const { getUser, getClaim, isAuthenticated } = getKindeServerSession();
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

		// Get roles from Kinde
		const rolesClaim = await getClaim('roles');
		const kindeRoles = rolesClaim ? rolesClaim.value : [];
		const rolesArray = Array.isArray(kindeRoles)
			? kindeRoles
			: kindeRoles
				? [kindeRoles]
				: [];

		console.log(`Force syncing roles for ${user.email}:`, rolesArray);

		// Force sync roles
		const result = await convex.mutation(api.user.syncUserRolesFromKinde, {
			email: user.email,
			kindeRoles: rolesArray,
		});

		return NextResponse.json({
			success: true,
			message: 'Roles force-synced successfully',
			result,
		});
	} catch (error) {
		console.error('Error in force sync:', error);
		return NextResponse.json(
			{
				error: 'Failed to force sync user roles',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
