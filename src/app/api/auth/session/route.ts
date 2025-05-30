import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const { getAccessToken } = getKindeServerSession();
		const accessToken = await getAccessToken();

		if (!accessToken) {
			return NextResponse.json(
				{ error: 'No access token found' },
				{ status: 401 }
			);
		}

		return NextResponse.json({ token: accessToken });
	} catch (error) {
		console.error('Error getting session token:', error);
		return NextResponse.json(
			{ error: 'Failed to get session token' },
			{ status: 500 }
		);
	}
}
