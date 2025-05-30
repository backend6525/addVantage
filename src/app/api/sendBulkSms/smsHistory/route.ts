import { NextResponse } from 'next/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '../../../../../convex/_generated/api';

// GET /api/sms/history
export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const limit = searchParams.get('limit');
		const page = searchParams.get('page');

		const history = await fetchQuery(api.sms.getHistory, {
			limit: limit ? parseInt(limit) : undefined,
			page: page ? parseInt(page) : undefined,
		});

		return NextResponse.json(history);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch SMS history' },
			{ status: 500 }
		);
	}
}
