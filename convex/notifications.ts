import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Create a notification
export const createNotification = mutation({
	args: {
		userId: v.string(),
		type: v.string(),
		message: v.string(),
		adId: v.optional(v.string()),
		requesterId: v.optional(v.string()),
		status: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const notification = await ctx.db.insert('notifications', {
			userId: args.userId,
			type: args.type,
			message: args.message,
			adId: args.adId,
			requesterId: args.requesterId,
			status: args.status || 'pending',
			createdAt: new Date().toISOString(),
			read: false,
		});
		return notification;
	},
});

// Get notifications for a user with optional filtering
export const listNotifications = query({
	args: {
		userId: v.string(),
		type: v.optional(v.string()),
		status: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { userId, type, status } = args;

		// Start with base query
		let notificationsQuery = ctx.db
			.query('notifications')
			.filter((q) => q.eq(q.field('userId'), userId))
			.order('desc');

		// Apply type filter if specified
		if (type) {
			notificationsQuery = notificationsQuery.filter((q) =>
				q.eq(q.field('type'), type)
			);
		}

		// Apply status filter if specified
		if (status) {
			notificationsQuery = notificationsQuery.filter((q) =>
				q.eq(q.field('status'), status)
			);
		}

		const notifications = await notificationsQuery.collect();

		return notifications.map((notification) => ({
			id: notification._id,
			type: notification.type,
			message: notification.message,
			adId: notification.adId,
			requesterId: notification.requesterId,
			status: notification.status,
			createdAt: notification.createdAt,
			read: notification.read,
		}));
	},
});

// Update notification status (and optionally mark as read)
export const updateNotificationStatus = mutation({
	args: {
		notificationId: v.id('notifications'),
		status: v.string(),
		markAsRead: v.optional(v.boolean()),
	},
	handler: async (ctx, args) => {
		const updateFields: any = {
			status: args.status,
			updatedAt: new Date().toISOString(),
		};

		// Also mark as read if specified
		if (args.markAsRead) {
			updateFields.read = true;
		}

		const notification = await ctx.db.patch(args.notificationId, updateFields);
		return notification;
	},
});

// Mark notification as read
export const markAsRead = mutation({
	args: {
		notificationId: v.id('notifications'),
	},
	handler: async (ctx, args) => {
		const notification = await ctx.db.patch(args.notificationId, {
			read: true,
			updatedAt: new Date().toISOString(),
		});
		return notification;
	},
});

// Mark all notifications as read for a user
export const markAllAsRead = mutation({
	args: {
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const unreadNotifications = await ctx.db
			.query('notifications')
			.filter((q) =>
				q.and(
					q.eq(q.field('userId'), args.userId),
					q.eq(q.field('read'), false)
				)
			)
			.collect();

		// Update each notification to be read
		for (const notification of unreadNotifications) {
			await ctx.db.patch(notification._id, {
				read: true,
				updatedAt: new Date().toISOString(),
			});
		}

		return {
			success: true,
			count: unreadNotifications.length,
		};
	},
});

// Get unread notification count
export const getUnreadCount = query({
	args: {
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const notifications = await ctx.db
			.query('notifications')
			.filter((q) =>
				q.and(
					q.eq(q.field('userId'), args.userId),
					q.eq(q.field('read'), false)
				)
			)
			.collect();

		return notifications.length;
	},
});
