import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(request: NextRequest) {
	try {
		const { getUser, isAuthenticated } = getKindeServerSession();

		// Check if user is authenticated
		const authenticated = await isAuthenticated();

		if (!authenticated) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		const user = await getUser();

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Return basic setup information
		return NextResponse.json({
			success: true,
			user: {
				id: user.id,
				email: user.email,
				name: `${user.given_name || ''} ${user.family_name || ''}`.trim(),
			},
			message: 'Auth setup completed',
		});
	} catch (error) {
		console.error('Error in auth setup:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const { getUser, isAuthenticated } = getKindeServerSession();

		// Check if user is authenticated
		const authenticated = await isAuthenticated();

		if (!authenticated) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		const user = await getUser();

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Handle POST request for setup
		const body = await request.json().catch(() => ({}));

		return NextResponse.json({
			success: true,
			message: 'Auth setup updated',
			user: {
				id: user.id,
				email: user.email,
				name: `${user.given_name || ''} ${user.family_name || ''}`.trim(),
			},
		});
	} catch (error) {
		console.error('Error in auth setup POST:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
