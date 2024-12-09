// app/api/product/[id]/publish/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex-server'; // Create this utility for server-side Convex interactions
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		// Validate the product ID
		const productId = params.id as Id<'products'>;

		// Call Convex mutation to toggle publish status
		const updatedProduct = await convex.mutation(api.products.togglePublish, {
			productId,
		});

		return NextResponse.json(updatedProduct, { status: 200 });
	} catch (error) {
		console.error('Error toggling publish status:', error);
		return NextResponse.json(
			{ error: 'Failed to update publish status' },
			{ status: 500 }
		);
	}
}
