// import { NextResponse } from 'next/server';
// import { fetchQuery, fetchMutation } from 'convex/nextjs';
// import { api } from '../../../../../convex/_generated/api';

// // GET /api/templates
// export async function GET() {
// 	try {
// 		const templates = await fetchQuery(api.templates.get, {});
// 		return NextResponse.json(templates);
// 	} catch (error) {
// 		return NextResponse.json(
// 			{ error: 'Failed to fetch templates' },
// 			{ status: 500 }
// 		);
// 	}
// }

// // POST /api/templates
// export async function POST(request: Request) {
// 	try {
// 		const body = await request.json();
// 		const result = await fetchMutation(api.templates.create, body);
// 		return NextResponse.json(result);
// 	} catch (error) {
// 		return NextResponse.json(
// 			{ error: 'Failed to create template' },
// 			{ status: 500 }
// 		);
// 	}
// }

import { NextResponse } from 'next/server';
import { fetchQuery, fetchMutation } from 'convex/nextjs';
import { api } from '../../../../../convex/_generated/api';
import { Id } from 'convex/_generated/dataModel';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

// GET /api/templates
export async function GET(request: Request) {
	try {
		// Get the authenticated user
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user || !user.email) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		// Use the user's email to fetch templates
		const templates = await fetchQuery(api.templates.get, {
			userEmail: user.email,
		});
		return NextResponse.json(templates);
	} catch (error) {
		console.error('Error fetching templates:', error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Failed to fetch templates',
				details: error instanceof Error ? error.stack : undefined,
			},
			{ status: 500 }
		);
	}
}

// POST /api/templates
export async function POST(request: Request) {
	try {
		const body = await request.json();
		console.log('Creating template with data:', body);

		// Get the authenticated user
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user || !user.email) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		// Use the user's email to create the template
		const result = await fetchMutation(api.templates.create, {
			...body,
			userEmail: user.email,
		});

		return NextResponse.json(result);
	} catch (error) {
		console.error('Error creating template:', error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Failed to create template',
				details: error instanceof Error ? error.stack : undefined,
			},
			{ status: 500 }
		);
	}
}

// PUT /api/templates
export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const result = await fetchMutation(api.templates.update, body);
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Failed to update template',
			},
			{ status: 500 }
		);
	}
}

// DELETE /api/templates
export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json(
				{ error: 'Missing template ID' },
				{ status: 400 }
			);
		}

		const result = await fetchMutation(api.templates.remove, {
			id: id as Id<'templates'>,
		});
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Failed to delete template',
			},
			{ status: 500 }
		);
	}
}
