import { NextResponse } from 'next/server';
import { fetchMutation } from 'convex/nextjs';
import { api } from '../../../../../convex/_generated/api';
import * as XLSX from 'xlsx';

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		}

		// Parse Excel file
		const buffer = await file.arrayBuffer();
		const workbook = XLSX.read(buffer);
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];
		const json = XLSX.utils.sheet_to_json<{
			phone: string;
			name?: string;
			group?: string;
		}>(sheet);

		// Validate and format contacts
		const validContacts = json
			.map((contact) => ({
				phone: contact.phone?.toString().trim() || '',
				name: contact.name?.toString().trim(),
				group: contact.group?.toString().trim(),
			}))
			.filter((contact) => /^[\d\s\-+()]+$/.test(contact.phone));

		if (validContacts.length === 0) {
			return NextResponse.json(
				{ error: 'No valid contacts found in the file' },
				{ status: 400 }
			);
		}

		// Create contacts in Convex
		const results = await Promise.all(
			validContacts.map((contact) =>
				fetchMutation(api.contacts.create, contact)
			)
		);

		return NextResponse.json({
			success: true,
			created: results.length,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to import contacts' },
			{ status: 500 }
		);
	}
}
