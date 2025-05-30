import { NextResponse } from 'next/server';
import { fetchMutation } from 'convex/nextjs';
import { api } from '../../../../convex/_generated/api';

// POST /api/sms/send
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const result = await fetchMutation(api.sms.send, body);
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to send SMS' }, { status: 500 });
	}
}
