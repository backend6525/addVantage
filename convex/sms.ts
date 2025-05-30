import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Send bulk SMS
export const send = mutation({
	args: {
		contacts: v.array(v.string()), // array of contact IDs
		message: v.string(),
		scheduleAt: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		// In a real app, you would integrate with your SMS provider here
		// This is just a simulation
		const result = {
			success: true,
			message: 'SMS scheduled for delivery',
			scheduledAt: args.scheduleAt || Date.now(),
		};

		// Create history record
		await ctx.db.insert('smsHistory', {
			userId: identity.subject,
			message: args.message,
			recipients: args.contacts.length,
			status: 'PENDING',
			scheduledAt: args.scheduleAt || Date.now(),
		});

		return result;
	},
});

// Get SMS history
export const getHistory = query({
	args: {
		limit: v.optional(v.number()),
		page: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		const limit = args.limit || 10;
		const page = args.page || 1;
		const offset = (page - 1) * limit;

		const history = await ctx.db
			.query('smsHistory')
			.withIndex('by_user', (q) => q.eq('userId', identity.subject))
			.order('desc')
			.paginate({
				numItems: limit,
				cursor: offset > 0 ? `${offset}` : null,
			});

		return {
			data: history.page,
			total: history.page.length,
			page,
			limit,
		};
	},
});
