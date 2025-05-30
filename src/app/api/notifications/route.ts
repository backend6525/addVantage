// import { ConvexHttpClient } from 'convex/browser';
// import { api } from '../../../../convex/_generated/api';
// import { NextResponse } from 'next/server';
// import { headers } from 'next/headers';
// import { Id } from '../../../../convex/_generated/dataModel';

// interface NotificationBody {
// 	notificationId: Id<'notifications'>;
// 	status?: string;
// 	action: 'status' | 'markAsRead';
// }

// function getConvexClient() {
// 	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
// 		throw new Error('NEXT_PUBLIC_CONVEX_URL is not defined');
// 	}
// 	return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
// }

// export async function GET(): Promise<NextResponse> {
// 	try {
// 		const headersList = headers();
// 		const userEmail = headersList.get('x-user-email');

// 		if (!userEmail) {
// 			console.error('No user email provided in headers');
// 			return NextResponse.json(
// 				{ error: 'User email is required' },
// 				{ status: 400 }
// 			);
// 		}

// 		console.log('Fetching notifications for user:', userEmail);
// 		const convex = getConvexClient();

// 		try {
// 			const [notifications, unreadCount] = await Promise.all([
// 				convex.query(api.notifications.listNotifications, {
// 					userId: userEmail,
// 				}),
// 				convex.query(api.notifications.getUnreadCount, {
// 					userId: userEmail,
// 				}),
// 			]);

// 			console.log('Raw notifications from Convex:', notifications);
// 			console.log('Raw unread count from Convex:', unreadCount);

// 			// Ensure notifications is an array
// 			const formattedNotifications = Array.isArray(notifications)
// 				? notifications
// 				: [];

// 			console.log('Formatted notifications:', formattedNotifications);
// 			console.log('Final unread count:', unreadCount);

// 			return NextResponse.json({
// 				notifications: formattedNotifications,
// 				unreadCount: unreadCount || 0,
// 			});
// 		} catch (convexError) {
// 			console.error('Convex query error:', convexError);
// 			throw convexError;
// 		}
// 	} catch (error: any) {
// 		console.error('Error in notifications GET route:', error);
// 		return NextResponse.json(
// 			{ error: 'Failed to fetch notifications', details: error.message },
// 			{ status: 500 }
// 		);
// 	}
// }

// export async function PATCH(request: Request): Promise<NextResponse> {
// 	try {
// 		const headersList = headers();
// 		const userEmail = headersList.get('x-user-email');

// 		if (!userEmail) {
// 			return NextResponse.json(
// 				{ error: 'User email is required' },
// 				{ status: 400 }
// 			);
// 		}

// 		const body: NotificationBody = await request.json();
// 		const { notificationId, status, action } = body;

// 		if (!notificationId || (!status && action !== 'markAsRead')) {
// 			return NextResponse.json(
// 				{ error: 'Invalid request parameters' },
// 				{ status: 400 }
// 			);
// 		}

// 		const convex = getConvexClient();

// 		if (action === 'status') {
// 			await convex.mutation(api.notifications.updateNotificationStatus, {
// 				notificationId,
// 				status,
// 			});
// 		} else if (action === 'markAsRead') {
// 			await convex.mutation(api.notifications.markAsRead, {
// 				notificationId,
// 			});
// 		}

// 		return NextResponse.json({ success: true });
// 	} catch (error: any) {
// 		console.error('Error updating notification:', error);
// 		return NextResponse.json(
// 			{ error: 'Failed to update notification' },
// 			{ status: 500 }
// 		);
// 	}
// }

// import { ConvexHttpClient } from 'convex/browser';
// import { api } from '../../../../convex/_generated/api';
// import { NextResponse } from 'next/server';
// import { headers } from 'next/headers';
// import { Id } from '../../../../convex/_generated/dataModel';

// interface NotificationBody {
// 	notificationId?: Id<'notifications'>;
// 	status?: string;
// 	action: 'status' | 'markAsRead' | 'markAllRead' | 'filter';
// 	type?: string;
// 	markAsRead?: boolean;
// }

// function getConvexClient() {
// 	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
// 		throw new Error('NEXT_PUBLIC_CONVEX_URL is not defined');
// 	}
// 	return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
// }

// export async function GET(request: Request): Promise<NextResponse> {
// 	try {
// 		const headersList = headers();
// 		const userEmail = headersList.get('x-user-email');

// 		// Get URL parameters for filtering
// 		const url = new URL(request.url);
// 		const type = url.searchParams.get('type');
// 		const status = url.searchParams.get('status');

// 		if (!userEmail) {
// 			console.error('No user email provided in headers');
// 			return NextResponse.json(
// 				{ error: 'User email is required' },
// 				{ status: 400 }
// 			);
// 		}

// 		console.log('Fetching notifications for user:', userEmail);
// 		const convex = getConvexClient();

// 		try {
// 			const [notifications, unreadCount] = await Promise.all([
// 				convex.query(api.notifications.listNotifications, {
// 					userId: userEmail,
// 					type: type || undefined,
// 					status: status || undefined,
// 				}),
// 				convex.query(api.notifications.getUnreadCount, {
// 					userId: userEmail,
// 				}),
// 			]);

// 			console.log('Raw notifications from Convex:', notifications);
// 			console.log('Raw unread count from Convex:', unreadCount);

// 			// Ensure notifications is an array
// 			const formattedNotifications = Array.isArray(notifications)
// 				? notifications
// 				: [];

// 			console.log('Formatted notifications:', formattedNotifications);
// 			console.log('Final unread count:', unreadCount);

// 			return NextResponse.json({
// 				notifications: formattedNotifications,
// 				unreadCount: unreadCount || 0,
// 			});
// 		} catch (convexError) {
// 			console.error('Convex query error:', convexError);
// 			throw convexError;
// 		}
// 	} catch (error: any) {
// 		console.error('Error in notifications GET route:', error);
// 		return NextResponse.json(
// 			{ error: 'Failed to fetch notifications', details: error.message },
// 			{ status: 500 }
// 		);
// 	}
// }

// export async function PATCH(request: Request): Promise<NextResponse> {
// 	try {
// 		const headersList = headers();
// 		const userEmail = headersList.get('x-user-email');

// 		if (!userEmail) {
// 			return NextResponse.json(
// 				{ error: 'User email is required' },
// 				{ status: 400 }
// 			);
// 		}

// 		const body: NotificationBody = await request.json();
// 		const { notificationId, status, action, markAsRead, type } = body;

// 		if (action !== 'markAllRead' && !notificationId && action !== 'filter') {
// 			return NextResponse.json(
// 				{ error: 'Invalid request parameters' },
// 				{ status: 400 }
// 			);
// 		}

// 		const convex = getConvexClient();

// 		switch (action) {
// 			case 'status':
// 				if (!notificationId || !status) {
// 					return NextResponse.json(
// 						{ error: 'Missing notificationId or status' },
// 						{ status: 400 }
// 					);
// 				}
// 				await convex.mutation(api.notifications.updateNotificationStatus, {
// 					notificationId,
// 					status,
// 					markAsRead: true,
// 				});
// 				break;

// 			case 'markAsRead':
// 				if (!notificationId) {
// 					return NextResponse.json(
// 						{ error: 'Missing notificationId' },
// 						{ status: 400 }
// 					);
// 				}
// 				await convex.mutation(api.notifications.markAsRead, {
// 					notificationId,
// 				});
// 				break;

// 			case 'markAllRead':
// 				await convex.mutation(api.notifications.markAllAsRead, {
// 					userId: userEmail,
// 				});
// 				break;

// 			default:
// 				return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
// 		}

// 		return NextResponse.json({ success: true });
// 	} catch (error: any) {
// 		console.error('Error updating notification:', error);
// 		return NextResponse.json(
// 			{ error: 'Failed to update notification', details: error.message },
// 			{ status: 500 }
// 		);
// 	}
// }

import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Id } from '../../../../convex/_generated/dataModel';

interface NotificationBody {
	notificationId?: Id<'notifications'>;
	status?: string;
	action: 'status' | 'markAsRead' | 'markAllRead' | 'filter' | 'create';
	type?: string;
	markAsRead?: boolean;
	message?: string;
	adId?: string;
	requesterId?: string;
}

function getConvexClient() {
	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
		throw new Error('NEXT_PUBLIC_CONVEX_URL is not defined');
	}
	return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
}

export async function GET(request: Request): Promise<NextResponse> {
	try {
		const headersList = headers();
		const userEmail = headersList.get('x-user-email');

		// Get URL parameters for filtering
		const url = new URL(request.url);
		const type = url.searchParams.get('type');
		const status = url.searchParams.get('status');

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
					type: type || undefined,
					status: status || undefined,
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
	} catch (error: any) {
		console.error('Error in notifications GET route:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch notifications', details: error.message },
			{ status: 500 }
		);
	}
}

// export async function POST(request: Request): Promise<NextResponse> {
// 	try {
// 		const headersList = headers();
// 		const userEmail = headersList.get('x-user-email');

// 		if (!userEmail) {
// 			return NextResponse.json(
// 				{ error: 'User email is required' },
// 				{ status: 400 }
// 			);
// 		}

// 		const body: NotificationBody = await request.json();
// 		const { type, message, adId, requesterId, status, action } = body;

// 		if (action !== 'create') {
// 			return NextResponse.json(
// 				{ error: 'Invalid action for POST method' },
// 				{ status: 400 }
// 			);
// 		}

// 		if (!type || !message || !adId || !requesterId) {
// 			return NextResponse.json(
// 				{ error: 'Missing required notification fields' },
// 				{ status: 400 }
// 			);
// 		}

// 		const convex = getConvexClient();

// 		// Create a new notification
// 		const result = await convex.mutation(api.notifications.createNotification, {
// 			userId: userEmail,
// 			type,
// 			message,
// 			adId,
// 			requesterId,
// 			status: status || 'pending',
// 		});

// 		return NextResponse.json({
// 			success: true,
// 			notification: result,
// 		});
// 	} catch (error: any) {
// 		console.error('Error creating notification:', error);
// 		return NextResponse.json(
// 			{ error: 'Failed to create notification', details: error.message },
// 			{ status: 500 }
// 		);
// 	}
// }

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const headersList = headers();
		const userEmail = headersList.get('x-user-email');

		console.log('POST request received for notifications');
		console.log('Headers:', Object.fromEntries(headersList.entries()));
		console.log('User email from header:', userEmail);

		if (!userEmail) {
			console.error('No user email provided in headers');
			return NextResponse.json(
				{ error: 'User email is required' },
				{ status: 400 }
			);
		}

		// Log the raw request body for debugging
		const rawBody = await request.text();
		console.log('Raw request body:', rawBody);

		// Parse the body again since we've consumed it
		const body: NotificationBody = JSON.parse(rawBody);
		console.log('Parsed body:', body);

		const { type, message, adId, requesterId, status, action } = body;
		console.log('Extracted fields:', {
			type,
			message,
			adId,
			requesterId,
			status,
			action,
		});

		if (action !== 'create') {
			console.error(`Invalid action: ${action}. Expected 'create'`);
			return NextResponse.json(
				{ error: `Invalid action for POST method: ${action}` },
				{ status: 400 }
			);
		}

		if (!type || !message || !adId || !requesterId) {
			const missingFields = [];
			if (!type) missingFields.push('type');
			if (!message) missingFields.push('message');
			if (!adId) missingFields.push('adId');
			if (!requesterId) missingFields.push('requesterId');

			console.error(`Missing required fields: ${missingFields.join(', ')}`);
			return NextResponse.json(
				{
					error: 'Missing required notification fields',
					missingFields: missingFields,
				},
				{ status: 400 }
			);
		}

		console.log('All validation passed, creating notification with Convex');
		const convex = getConvexClient();

		// Log the data being sent to Convex
		const convexParams = {
			userId: userEmail,
			type,
			message,
			adId,
			requesterId,
			status: status || 'pending',
		};
		console.log('Sending to Convex:', convexParams);

		// Create a new notification
		try {
			const result = await convex.mutation(
				api.notifications.createNotification,
				convexParams
			);
			console.log('Convex result:', result);

			return NextResponse.json({
				success: true,
				notification: result,
			});
		} catch (convexError) {
			console.error('Convex mutation error:', convexError);
			return NextResponse.json(
				{
					error: 'Convex mutation failed',
					details:
						convexError instanceof Error
							? convexError.message
							: String(convexError),
				},
				{ status: 500 }
			);
		}
	} catch (error: any) {
		console.error('Error creating notification:', error);
		console.error('Error stack:', error.stack);
		return NextResponse.json(
			{
				error: 'Failed to create notification',
				details: error.message,
				stack: error.stack,
			},
			{ status: 500 }
		);
	}
}

export async function PATCH(request: Request): Promise<NextResponse> {
	try {
		const headersList = headers();
		const userEmail = headersList.get('x-user-email');

		if (!userEmail) {
			return NextResponse.json(
				{ error: 'User email is required' },
				{ status: 400 }
			);
		}

		const body: NotificationBody = await request.json();
		const { notificationId, status, action, markAsRead, type } = body;

		if (action !== 'markAllRead' && !notificationId && action !== 'filter') {
			return NextResponse.json(
				{ error: 'Invalid request parameters' },
				{ status: 400 }
			);
		}

		const convex = getConvexClient();

		switch (action) {
			case 'status':
				if (!notificationId || !status) {
					return NextResponse.json(
						{ error: 'Missing notificationId or status' },
						{ status: 400 }
					);
				}
				await convex.mutation(api.notifications.updateNotificationStatus, {
					notificationId,
					status,
					markAsRead: true,
				});
				break;

			case 'markAsRead':
				if (!notificationId) {
					return NextResponse.json(
						{ error: 'Missing notificationId' },
						{ status: 400 }
					);
				}
				await convex.mutation(api.notifications.markAsRead, {
					notificationId,
				});
				break;

			case 'markAllRead':
				await convex.mutation(api.notifications.markAllAsRead, {
					userId: userEmail,
				});
				break;

			default:
				return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
		}

		return NextResponse.json({ success: true });
	} catch (error: any) {
		console.error('Error updating notification:', error);
		return NextResponse.json(
			{ error: 'Failed to update notification', details: error.message },
			{ status: 500 }
		);
	}
}
