import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { NextResponse } from 'next/server';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const email = searchParams.get('email');

		if (!email) {
			return NextResponse.json(
				{ error: 'Email parameter is required' },
				{ status: 400 }
			);
		}

		const ads = await convex.query(api.ads.list, { email });

		return NextResponse.json(ads);
	} catch (error) {
		console.error('Error fetching ads:', error);
		return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
	}
}

// import { NextResponse } from 'next/server';
// import { headers } from 'next/headers';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import { ConvexHttpClient } from 'convex/browser';
// import { api } from '../../../../convex/_generated/api';

// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export async function GET(request: Request) {
// 	try {
// 		const headersList = headers();
// 		const userEmail = headersList.get('x-user-email');

// 		if (!userEmail) {
// 			console.warn('No user email found in headers');
// 			return NextResponse.json(
// 				{ error: 'User email is required' },
// 				{ status: 400 }
// 			);
// 		}

// 		const products = await convex.query(api.ads.listAds, { userEmail });

// 		return NextResponse.json(products);
// 	} catch (error) {
// 		console.error('Error in GET /api/product:', error);
// 		return NextResponse.json(
// 			{ error: 'Failed to fetch products' },
// 			{ status: 500 }
// 		);
// 	}
// }
