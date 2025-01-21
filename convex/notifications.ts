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

// Get notifications for a user
export const listNotifications = query({
	args: {
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const notifications = await ctx.db
			.query('notifications')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.order('desc')
			.collect();

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

// Update notification status
export const updateNotificationStatus = mutation({
	args: {
		notificationId: v.id('notifications'),
		status: v.string(),
	},
	handler: async (ctx, args) => {
		const notification = await ctx.db.patch(args.notificationId, {
			status: args.status,
		});
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
		});
		return notification;
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
