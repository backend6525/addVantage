// import { NextApiRequest, NextApiResponse } from 'next';
// import { addSocialAccount } from '@../../../convex/social_media_analytics';

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	if (req.method !== 'POST')
// 		return res.status(405).json({ error: 'Method Not Allowed' });

// 	try {
// 		const { userId, platform, accessToken, refreshToken, expiresAt } = req.body;
// 		await addSocialAccount({
// 			userId,
// 			platform,
// 			accessToken,
// 			refreshToken,
// 			expiresAt,
// 		});
// 		res.status(200).json({ message: 'Social account connected successfully.' });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// }

import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

// Create a Convex HTTP client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || '');

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { userId, platform, accessToken, refreshToken, expiresAt } = body;

		// Call the Convex mutation using the client
		await convex.mutation(api.social_media_analytics.addSocialAccount, {
			userId,
			platform,
			accessToken,
			refreshToken,
			expiresAt,
		});

		return NextResponse.json({
			message: 'Social account connected successfully.',
		});
	} catch (error) {
		console.error('Error connecting social account:', error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Connection failed' },
			{ status: 500 }
		);
	}
}
