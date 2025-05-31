import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';

// Create Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || '');

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
		// Ensure roles is always an array
		const rolesArray = Array.isArray(roles) ? roles : roles ? [roles] : [];

		// Step 7: Ensure user exists in Convex before fetching credits
		let userRecord = null;
		if (user.email) {
			console.log('Ensuring user exists in Convex for:', user.email);
			console.log('Kinde roles extracted:', rolesArray);

			try {
				// First try to get the user
				userRecord = await convex.query(api.user.getUserByEmail, {
					email: user.email,
				});
				console.log('User exists in Convex:', user.email);
				console.log(
					'User record fetched:',
					JSON.stringify(userRecord, null, 2)
				);

				// Sync roles from Kinde for existing users to keep them updated
				if (rolesArray && rolesArray.length > 0) {
					console.log(
						'Syncing roles from Kinde for existing user:',
						rolesArray
					);
					await convex.mutation(api.user.syncUserRolesFromKinde, {
						email: user.email,
						kindeRoles: rolesArray,
					});

					// Fetch the user again to get updated roles
					userRecord = await convex.query(api.user.getUserByEmail, {
						email: user.email,
					});
				}
			} catch (error) {
				// User doesn't exist, create them
				console.log('Creating user in Convex:', user.email);

				// Transform Kinde roles to Convex format
				let userRoles = [];
				if (Array.isArray(rolesArray) && rolesArray.length > 0) {
					userRoles = rolesArray
						.map((role: any) => {
							// Handle different role formats from Kinde
							if (typeof role === 'string') {
								return {
									id: role.toLowerCase(),
									key: role.toUpperCase(),
									name:
										role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
								};
							} else if (typeof role === 'object' && role.key) {
								return {
									id: role.id || role.key.toLowerCase(),
									key: role.key,
									name: role.name || role.key,
								};
							}
							return null;
						})
						.filter(Boolean);
				}

				// Fallback to default MEMBER role if no valid roles from Kinde
				if (userRoles.length === 0) {
					userRoles = [
						{
							id: 'member',
							key: 'MEMBER',
							name: 'Member',
						},
					];
				}

				console.log('Final roles to be saved:', userRoles);

				await convex.mutation(api.user.createUser, {
					name:
						`${user.given_name || ''} ${user.family_name || ''}`.trim() ||
						user.email.split('@')[0],
					email: user.email,
					picture: user.picture || '',
					dailyAdCount: 0,
					weeklyAdCount: 0,
					dailyAdLimit: 1, // Default free limit
					weeklyAdLimit: 5, // Default free limit
					createdAt: new Date().toISOString(),
					lastUpdated: new Date().toISOString(),
					onboardingCompleted: false,
					// Use roles from Kinde auth or fallback to default
					roles: userRoles,
				});

				// Fetch the newly created user
				userRecord = await convex.query(api.user.getUserByEmail, {
					email: user.email,
				});
				console.log(
					'Newly created user record:',
					JSON.stringify(userRecord, null, 2)
				);
			}
		}

		console.log('Final userRecord before response:', {
			exists: !!userRecord,
			onboardingCompleted: userRecord?.onboardingCompleted,
			email: userRecord?.email,
		});

		// Step 8: Get real user limits data from userCredits table (SINGLE SOURCE OF TRUTH)
		let userLimitsData = {
			dailyAdCount: 0,
			weeklyAdCount: 0,
			dailyAdLimit: 1,
			weeklyAdLimit: 5,
			credits: 0,
			accountType: 'free' as const,
			hasCredits: false,
		};

		try {
			if (user.email) {
				console.log('Fetching real user limits for:', user.email);
				const limitsFromDB = await convex.query(
					api.credits.getUserCreditsQuery,
					{
						email: user.email,
					}
				);

				if (limitsFromDB) {
					userLimitsData = {
						dailyAdCount: limitsFromDB.dailyAdCount,
						weeklyAdCount: limitsFromDB.weeklyAdCount,
						dailyAdLimit: limitsFromDB.dailyAdLimit,
						weeklyAdLimit: limitsFromDB.weeklyAdLimit,
						credits: limitsFromDB.credits,
						accountType: limitsFromDB.accountType,
						hasCredits: limitsFromDB.hasCredits,
					};
					console.log('Retrieved real user limits:', userLimitsData);
				}
			}
		} catch (limitsError) {
			console.error('Error fetching user limits:', limitsError);
			// Fall back to defaults if there's an error
		}

		// Step 9: Construct the response with real data from userCredits table
		const responseData = {
			id: userRecord?._id || user.id, // Include user ID from Convex or fallback to Kinde ID
			_id: userRecord?._id, // Include Convex _id format for frontend compatibility
			kindeId: user.id, // Include Kinde ID as well for reference
			convexId: userRecord?._id, // Include Convex ID for reference
			email: user.email,
			given_name: user.given_name,
			family_name: user.family_name,
			name: `${user.given_name || ''} ${user.family_name || ''}`.trim(),
			picture: user.picture || '',
			idToken,
			decodedToken,
			roles: Array.isArray(rolesArray) ? rolesArray : [rolesArray], // Ensure roles is always an array
			// REAL data from userCredits table (SINGLE SOURCE OF TRUTH)
			dailyAdCount: userLimitsData.dailyAdCount,
			weeklyAdCount: userLimitsData.weeklyAdCount,
			dailyAdLimit: userLimitsData.dailyAdLimit,
			weeklyAdLimit: userLimitsData.weeklyAdLimit,
			credits: userLimitsData.credits,
			accountType: userLimitsData.accountType,
			hasCredits: userLimitsData.hasCredits,
			lastLimitReset: new Date().toISOString(),
			onboardingCompleted: userRecord?.onboardingCompleted ?? false,
		};

		console.log(
			'ONBOARDING DEBUG - Final response onboardingCompleted:',
			responseData.onboardingCompleted
		);
		console.log('User session data with REAL limits:', responseData); // Debugging logs
		console.log('User ID fields in response:', {
			id: responseData.id,
			_id: responseData._id,
			kindeId: responseData.kindeId,
			convexId: responseData.convexId,
		}); // Debug user ID fields

		// Step 10: Return the user details with real data
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
