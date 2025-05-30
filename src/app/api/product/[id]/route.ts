import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../convex/_generated/api';
import { verifyToken } from '../../../../lib/auth';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		// Verify authentication
		const token = request.headers.get('authorization')?.split(' ')[1];
		if (!token) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		const userEmail = request.headers.get('x-user-email');
		if (!userEmail) {
			return NextResponse.json(
				{ error: 'User email required' },
				{ status: 400 }
			);
		}

		// Verify token
		const isValid = await verifyToken(token);
		if (!isValid) {
			return NextResponse.json(
				{ error: 'Invalid authentication token' },
				{ status: 401 }
			);
		}

		// Get the product using the correct function
		const product = await convex.query(api.ads.getAdById, {
			id: params.id,
		});

		if (!product) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
		}

		// Verify ownership
		if (product.createdBy !== userEmail) {
			return NextResponse.json(
				{ error: 'Unauthorized to delete this product' },
				{ status: 403 }
			);
		}

		// Delete the product using ads.deleteAd (which requires userEmail)
		await convex.mutation(api.ads.deleteAd, {
			id: params.id,
			userEmail: userEmail,
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error deleting product:', error);
		return NextResponse.json(
			{ error: 'Failed to delete product' },
			{ status: 500 }
		);
	}
}
