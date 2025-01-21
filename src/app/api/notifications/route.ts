import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

function getConvexClient() {
	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
		throw new Error('NEXT_PUBLIC_CONVEX_URL is not defined');
	}
	return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
}

export async function GET(request: Request) {
	try {
		const headersList = headers();
		const userEmail = headersList.get('x-user-email');

		if (!userEmail) {
			console.error('No user email provided in headers');
			return NextResponse.json(
				{ error: 'User email is required' },
				{ status: 400 }
			);
		}

		console.log('Fetching notifications for user:', userEmail);
		const convex = getConvexClient();

		try {
			const [notifications, unreadCount] = await Promise.all([
				convex.query(api.notifications.listNotifications, {
					userId: userEmail,
				}),
				convex.query(api.notifications.getUnreadCount, {
					userId: userEmail,
				}),
			]);

			console.log('Raw notifications from Convex:', notifications);
			console.log('Raw unread count from Convex:', unreadCount);

			// Ensure notifications is an array
			const formattedNotifications = Array.isArray(notifications)
				? notifications
				: [];

			console.log('Formatted notifications:', formattedNotifications);
			console.log('Final unread count:', unreadCount);

			return NextResponse.json({
				notifications: formattedNotifications,
				unreadCount: unreadCount || 0,
			});
		} catch (convexError) {
			console.error('Convex query error:', convexError);
			throw convexError;
		}
	} catch (error) {
		console.error('Error in notifications GET route:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch notifications', details: error.message },
			{ status: 500 }
		);
	}
}

export async function PATCH(request: Request) {
	try {
		const headersList = headers();
		const userEmail = headersList.get('x-user-email');

		if (!userEmail) {
			return NextResponse.json(
				{ error: 'User email is required' },
				{ status: 400 }
			);
		}

		const body = await request.json();
		const { notificationId, status, action } = body;

		if (!notificationId || (!status && action !== 'markAsRead')) {
			return NextResponse.json(
				{ error: 'Invalid request parameters' },
				{ status: 400 }
			);
		}

		const convex = getConvexClient();

		if (action === 'status') {
			await convex.mutation(api.notifications.updateNotificationStatus, {
				notificationId,
				status,
			});
		} else if (action === 'markAsRead') {
			await convex.mutation(api.notifications.markAsRead, {
				notificationId,
			});
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error updating notification:', error);
		return NextResponse.json(
			{ error: 'Failed to update notification' },
			{ status: 500 }
		);
	}
}
