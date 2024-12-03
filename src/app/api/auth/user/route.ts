// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	try {
// 		// Get the session
// 		const session = await getKindeServerSession(req);

// 		// Ensure the user is authenticated
// 		if (!session) {
// 			return res.status(401).json({ error: 'Unauthorized' });
// 		}

// 		// Retrieve user information
// 		const user = await session.getUser();

// 		if (!user) {
// 			return res.status(404).json({ error: 'User not found' });
// 		}

// 		// Example role extraction (if roles are part of the user object)
// 		const role = user.role || 'user'; // Default role if none provided

// 		// Respond with user details
// 		res.status(200).json({
// 			email: user.email,
// 			given_name: user.given_name,
// 			family_name: user.family_name,
// 			role, // Add role information
// 		});
// 	} catch (error) {
// 		console.error('Error fetching user:', error);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}
// }

// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	try {
// 		// Get the session
// 		const session = await getKindeServerSession(req);

// 		// Ensure the user is authenticated
// 		if (!session) {
// 			return res.status(401).json({ error: 'Unauthorized' });
// 		}

// 		// Retrieve user information
// 		const user = await session.getUser();

// 		if (!user) {
// 			return res.status(404).json({ error: 'User not found' });
// 		}

// 		// Retrieve custom claims for roles if defined
// 		const roles = session.getClaim('roles') || []; // Replace 'roles' with your claim key
// 		const role = Array.isArray(roles) ? roles[0] : 'user'; // Use the first role, default to 'user'

// 		// Respond with user details
// 		res.status(200).json({
// 			email: user.email,
// 			given_name: user.given_name,
// 			family_name: user.family_name,
// 			role, // Include role information
// 		});
// 		console.log('Session Claims:', session.getClaim('access_token'));
// 	} catch (error) {
// 		console.error('Error fetching user:', error);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}
// }

// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import jwt from 'jsonwebtoken';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	try {
// 		// Step 1: Retrieve the session
// 		const session = await getKindeServerSession(req);

// 		// Step 2: Ensure the session is valid
// 		if (!session) {
// 			return res.status(401).json({ error: 'Unauthorized: No session found.' });
// 		}

// 		// Step 3: Retrieve user information
// 		const user = await session.getUser();

// 		if (!user) {
// 			return res.status(404).json({ error: 'User not found in session.' });
// 		}

// 		// Step 4: Attempt to retrieve claims, including the access token
// 		const accessToken = session.getClaim('access_token') || null; // Access token if available
// 		const idToken = session.getClaim('id_token'); // ID token for further details if needed
// 		const roles = session.getClaim('roles') || []; // Example custom claim for roles

// 		// Decode the ID token to inspect claims (optional)
// 		let decodedToken = null;
// 		if (idToken) {
// 			decodedToken = jwt.decode(idToken);
// 		}

// 		// Step 5: Construct response with all available data
// 		const responseData = {
// 			email: user.email,
// 			given_name: user.given_name,
// 			family_name: user.family_name,
// 			accessToken, // Include access token for frontend logic
// 			roles: Array.isArray(roles) ? roles : [roles], // Ensure roles is an array
// 			decodedToken, // Optional: Provide decoded token for debugging
// 		};

// 		console.log('User session data:', responseData); // Debugging logs

// 		// Step 6: Return user details
// 		res.status(200).json(responseData);
// 	} catch (error) {
// 		// Log and handle unexpected errors
// 		console.error('Error in user API:', error);
// 		res
// 			.status(500)
// 			.json({ error: 'Internal Server Error: Failed to fetch user.' });
// 	}
// }

// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import jwt from 'jsonwebtoken';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	try {
// 		// Step 1: Retrieve the session
// 		const session = await getKindeServerSession(req);

// 		// Step 2: Ensure the session is valid
// 		if (!session) {
// 			return res.status(401).json({ error: 'Unauthorized: No session found.' });
// 		}

// 		// Step 3: Retrieve user information
// 		const user = await session.getUser();

// 		if (!user) {
// 			return res.status(404).json({ error: 'User not found in session.' });
// 		}

// 		// Step 4: Retrieve the ID token asynchronously
// 		const idTokenClaim = await session.getClaim('id_token');
// 		const idToken = idTokenClaim?.value || null; // Extract value if the claim exists

// 		// Step 5: Attempt to decode the ID token if available
// 		let decodedToken = null;
// 		if (idToken) {
// 			decodedToken = jwt.decode(idToken);
// 		}

// 		// Step 6: Retrieve roles or other claims
// 		const rolesClaim = await session.getClaim('roles'); // Asynchronous retrieval
// 		const roles = rolesClaim ? rolesClaim.value : []; // Extract value or default to empty array

// 		// Step 7: Construct the response with all available data
// 		const responseData = {
// 			email: user.email,
// 			given_name: user.given_name,
// 			family_name: user.family_name,
// 			idToken, // Include ID token
// 			decodedToken, // Include decoded token for debugging or further use
// 			roles: Array.isArray(roles) ? roles : [roles], // Ensure roles is always an array
// 		};

// 		console.log('User session data:', responseData); // Debugging logs

// 		// Step 8: Return the user details
// 		res.status(200).json(responseData);
// 	} catch (error) {
// 		// Log and handle unexpected errors
// 		console.error('Error in user API:', error);
// 		res
// 			.status(500)
// 			.json({ error: 'Internal Server Error: Failed to fetch user.' });
// 	}
// }

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		// Step 1: Retrieve the session
		const session = await getKindeServerSession();

		// Step 2: Ensure the session is valid
		if (!session) {
			return NextResponse.json(
				{ error: 'Unauthorized: No session found.' },
				{ status: 401 }
			);
		}

		// Step 3: Retrieve user information
		const user = await session.getUser();

		if (!user) {
			return NextResponse.json(
				{ error: 'User not found in session.' },
				{ status: 404 }
			);
		}

		// Step 4: Retrieve the ID token asynchronously
		const idTokenClaim = await session.getClaim('id_token');
		const idToken = idTokenClaim?.value || null;

		// Step 5: Decode the ID token if available
		let decodedToken = null;
		if (idToken) {
			decodedToken = jwt.decode(idToken);
		}

		// Step 6: Retrieve roles or other claims
		const rolesClaim = await session.getClaim('roles');
		const roles = rolesClaim ? rolesClaim.value : [];

		// Step 7: Construct the response with all available data
		const responseData = {
			email: user.email,
			given_name: user.given_name,
			family_name: user.family_name,
			idToken,
			decodedToken,
			roles: Array.isArray(roles) ? roles : [roles], // Ensure roles is always an array
		};

		// Debugging logs
		console.log('User session data:', responseData);

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
