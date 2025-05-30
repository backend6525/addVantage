import { NextResponse } from 'next/server';
import { fetchQuery, fetchMutation } from 'convex/nextjs';
import { api } from '../../../../../convex/_generated/api';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Id } from '../../../../../convex/_generated/dataModel';

// GET /api/contacts
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

		// Use the user's email to fetch contacts
		const contacts = await fetchQuery(api.contacts.get, {
			userEmail: user.email,
		});

		return NextResponse.json(contacts);
	} catch (error) {
		console.error('Error fetching contacts:', error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Failed to fetch contacts',
				details: error instanceof Error ? error.stack : undefined,
			},
			{ status: 500 }
		);
	}
}

// POST /api/contacts
export async function POST(request: Request) {
	try {
		const body = await request.json();
		console.log('Creating contact with data:', body);

		// Get the authenticated user
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user || !user.email) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		// Handle both single contact and bulk contact creation
		const contacts = Array.isArray(body) ? body : [body];
		const results = [];
		const errors = [];

		for (const contact of contacts) {
			try {
				// Use the user's email to create the contact
				const result = await fetchMutation(api.contacts.create, {
					...contact,
					userEmail: user.email,
				});
				results.push(result);
			} catch (error) {
				console.error('Error creating contact:', error);
				errors.push({
					error:
						error instanceof Error ? error.message : 'Failed to create contact',
					contact,
				});
			}
		}

		// If there were any errors, return a partial success response
		if (errors.length > 0) {
			return NextResponse.json(
				{
					error: 'Some contacts failed to create',
					details: errors,
					successful: results,
				},
				{ status: 207 } // Multi-status response
			);
		}

		return NextResponse.json(results);
	} catch (error) {
		console.error('Error creating contacts:', error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Failed to create contacts',
				details: error instanceof Error ? error.stack : undefined,
			},
			{ status: 500 }
		);
	}
}

// DELETE /api/contacts (bulk delete)
export async function DELETE(request: Request) {
	try {
		const { ids } = await request.json();
		console.log('Received delete request with IDs:', ids);

		// Validate that ids is an array and not empty
		if (!Array.isArray(ids) || ids.length === 0) {
			return NextResponse.json(
				{ error: 'Invalid request: ids must be a non-empty array' },
				{ status: 400 }
			);
		}

		// Get the authenticated user
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user || !user.email) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		// Convert string IDs to Convex IDs
		const convexIds = ids.map((id) => id as Id<'contacts'>);
		console.log('Converted IDs:', convexIds);

		// Use the user's email to delete contacts
		const result = await fetchMutation(api.contacts.bulkDelete, {
			ids: convexIds,
			userEmail: user.email,
		});

		return NextResponse.json(result);
	} catch (error) {
		console.error('Error deleting contacts:', error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Failed to delete contacts',
				details: error instanceof Error ? error.stack : undefined,
			},
			{ status: 500 }
		);
	}
}
