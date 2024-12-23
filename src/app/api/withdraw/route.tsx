// import { NextRequest, NextResponse } from 'next/server';
// import { sendPayout } from '../payments/route';

// export async function POST(request: NextRequest) {
// 	try {
// 		const { method, amount, details } = await request.json();

// 		if (!method || !amount || !details) {
// 			return NextResponse.json(
// 				{ error: 'Missing required fields' },
// 				{ status: 400 }
// 			);
// 		}

// 		const clientId = process.env.PAYPAL_CLIENT_ID;
// 		const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// 		if (!clientId || !clientSecret) {
// 			return NextResponse.json(
// 				{ error: 'PayPal credentials not configured' },
// 				{ status: 500 }
// 			);
// 		}

// 		if (method === 'paypal') {
// 			if (!details.paypalEmail) {
// 				return NextResponse.json(
// 					{ error: 'PayPal email is required' },
// 					{ status: 400 }
// 				);
// 			}

// 			// Process PayPal payout
// 			const payoutResponse = await sendPayout(
// 				details.paypalEmail,
// 				amount,
// 				clientId,
// 				clientSecret
// 			);
// 			return NextResponse.json(
// 				{ success: true, data: payoutResponse },
// 				{ status: 200 }
// 			);
// 		}

// 		// Add handling for other methods (bank, mobile) if needed
// 		return NextResponse.json(
// 			{ error: 'Unsupported withdrawal method' },
// 			{ status: 400 }
// 		);
// 	} catch (error) {
// 		console.error('Error processing withdrawal:', error);
// 		return NextResponse.json(
// 			{ error: 'Failed to process withdrawal' },
// 			{ status: 500 }
// 		);
// 	}
// }

import { NextRequest, NextResponse } from 'next/server';
import { sendPayout } from '@/utils/paypal'; // Import from the new utility file

export async function POST(request: NextRequest) {
	try {
		// Parse request payload
		const { method, amount, details } = await request.json();

		// Validate input
		if (!method || !amount || !details) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Retrieve PayPal credentials
		const clientId = process.env.PAYPAL_CLIENT_ID;
		const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

		// Ensure PayPal credentials exist
		if (!clientId || !clientSecret) {
			return NextResponse.json(
				{ error: 'PayPal credentials not configured' },
				{ status: 500 }
			);
		}

		if (method === 'paypal') {
			// Validate PayPal-specific fields
			if (!details.paypalEmail) {
				return NextResponse.json(
					{ error: 'PayPal email is required' },
					{ status: 400 }
				);
			}

			// Process PayPal payout
			try {
				const payoutResponse = await sendPayout(
					details.paypalEmail,
					amount,
					clientId,
					clientSecret
				);

				return NextResponse.json(
					{ success: true, data: payoutResponse },
					{ status: 200 }
				);
			} catch (error) {
				console.error('PayPal payout failed:', error);
				return NextResponse.json(
					{ error: 'Failed to process PayPal payout' },
					{ status: 500 }
				);
			}
		}

		// Add handling for other methods (bank, mobile) if needed
		return NextResponse.json(
			{ error: 'Unsupported withdrawal method' },
			{ status: 400 }
		);
	} catch (error) {
		console.error('Error processing withdrawal:', error);
		return NextResponse.json(
			{ error: 'Failed to process withdrawal' },
			{ status: 500 }
		);
	}
}
