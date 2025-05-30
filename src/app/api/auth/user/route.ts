import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		// Step 1: Retrieve the session
		const { getUser, getClaim } = getKindeServerSession();

		// Step 2: Retrieve user information
		const user = await getUser();

		if (!user) {
			return NextResponse.json(
				{ error: 'User not found in session.' },
				{ status: 404 }
			);
		}

		// Step 4: Retrieve the ID token asynchronously
		const idTokenClaim = await getClaim('id_token');
		const idToken = idTokenClaim?.value || null;

		// Step 5: Attempt to decode the ID token if available
		let decodedToken = null;
		if (idToken) {
			decodedToken = jwt.decode(idToken);
		}

		// Step 6: Retrieve roles or other claims
		const rolesClaim = await getClaim('roles');
		const roles = rolesClaim ? rolesClaim.value : [];

		// Step 7: Construct the response with all available data
		const responseData = {
			email: user.email,
			given_name: user.given_name,
			family_name: user.family_name,
			name: `${user.given_name || ''} ${user.family_name || ''}`.trim(),
			picture: user.picture || '',
			idToken,
			decodedToken,
			roles: Array.isArray(roles) ? roles : [roles], // Ensure roles is always an array
			// Default dashboard-related fields
			dailyAdCount: 0,
			weeklyAdCount: 0,
			dailyAdLimit: 10,
			weeklyAdLimit: 50,
			credits: 5,
			accountType: 'free',
			lastLimitReset: new Date().toISOString(),
		};

		console.log('User session data:', responseData); // Debugging logs

		// Step 8: Return the user details
		return NextResponse.json(responseData, { status: 200 });
	} catch (error) {
		// Log and handle unexpected errors
		console.error('Error in user API:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error: Failed to fetch user.' },
			{ status: 500 }
		);
	}
}
