import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { NextResponse } from 'next/server';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { id, extensionDays } = body;

		const updatedAd = await convex.mutation(api.ads.extendAdDuration, {
			id,
			extensionDays,
		});

		return NextResponse.json(updatedAd);
	} catch (error) {
		console.error('Error extending ad:', error);
		return NextResponse.json(
			{ error: 'Failed to extend ad duration' },
			{ status: 500 }
		);
	}
}
