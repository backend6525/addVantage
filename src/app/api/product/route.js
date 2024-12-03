// import { NextRequest, NextResponse } from 'next/server';
// import { fetchQuery } from 'convex/nextjs';
// import { api } from '../../../../convex/_generated/api';

// export async function GET(request: NextRequest) {
// 	try {
// 		const { searchParams } = new URL(request.url);
// 		const email = searchParams.get('email');
// 		const productId = searchParams.get('id'); // Check if ID is present for single product fetch

// 		if (productId) {
// 			// Fetch single product by ID
// 			const product = await fetchQuery(api.ads.getById, { id: productId });
// 			if (!product) {
// 				return NextResponse.json(
// 					{ message: 'Product not found' },
// 					{ status: 404 }
// 				);
// 			}
// 			return NextResponse.json(product, { status: 200 });
// 		}

// 		if (email) {
// 			// Fetch all products for the email
// 			const products = await fetchQuery(api.ads.list, { email });
// 			return NextResponse.json(products, { status: 200 });
// 		}

// 		// If neither email nor ID is provided, return bad request
// 		return NextResponse.json(
// 			{ message: 'Email or Product ID query parameter is required' },
// 			{ status: 400 }
// 		);
// 	} catch (error) {
// 		console.error('Error fetching products:', error);
// 		return NextResponse.json(
// 			{ message: 'Failed to fetch products' },
// 			{ status: 500 }
// 		);
// 	}
// }

import { fetchQuery } from 'convex/nextjs';
import { api } from '../../../../convex/_generated/api';
import { NextResponse } from 'next/server';

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const email = searchParams.get('email');
		const productId = searchParams.get('id');

		if (productId) {
			// Fetch single product by ID
			const product = await fetchQuery(api.ads.getById, { id: productId });
			if (!product) {
				return NextResponse.json(
					{ message: 'Product not found' },
					{ status: 404 }
				);
			}
			return NextResponse.json(product, { status: 200 });
		}

		if (email) {
			// Fetch all products for the email
			const products = await fetchQuery(api.ads.list, { email });
			return NextResponse.json(products, { status: 200 });
		}

		// If neither email nor ID is provided, return bad request
		return NextResponse.json(
			{ message: 'Email or Product ID query parameter is required' },
			{ status: 400 }
		);
	} catch (error) {
		console.error('Error fetching products:', error);
		return NextResponse.json(
			{ message: 'Failed to fetch products' },
			{ status: 500 }
		);
	}
}
