// import { query, mutation } from './_generated/server';
// import { v } from 'convex/values';

// export const get = query({
// 	args: {},
// 	handler: async (ctx) => {
// 		const identity = await ctx.auth.getUserIdentity();
// 		if (!identity) {
// 			throw new Error('Unauthorized');
// 		}

// 		return await ctx.db
// 			.query('templates')
// 			.withIndex('by_user', (q) => q.eq('userId', identity.subject))
// 			.collect();
// 	},
// });

// export const create = mutation({
// 	args: {
// 		name: v.string(),
// 		content: v.string(),
// 		category: v.string(),
// 	},
// 	handler: async (ctx, args) => {
// 		const identity = await ctx.auth.getUserIdentity();
// 		if (!identity) {
// 			throw new Error('Unauthorized');
// 		}

// 		return await ctx.db.insert('templates', {
// 			...args,
// 			userId: identity.subject,
// 		});
// 	},
// });

import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
	args: {
		userEmail: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		// If userEmail is provided, use it to find the user
		if (args.userEmail && typeof args.userEmail === 'string') {
			// Find the user by email
			const user = await ctx.db
				.query('user')
				.withIndex('by_email', (q) => q.eq('email', args.userEmail!))
				.first();

			if (!user) {
				throw new Error('User not found');
			}

			return await ctx.db
				.query('templates')
				.withIndex('by_user', (q) => q.eq('userId', user._id))
				.order('desc')
				.collect();
		}

		// Otherwise, use the authenticated user
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		return await ctx.db
			.query('templates')
			.withIndex('by_user', (q) => q.eq('userId', identity.subject))
			.order('desc')
			.collect();
	},
});

export const getById = query({
	args: {
		id: v.id('templates'),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		const template = await ctx.db.get(args.id);

		if (!template || template.userId !== identity.subject) {
			throw new Error('Template not found');
		}

		return template;
	},
});

export const create = mutation({
	args: {
		name: v.string(),
		content: v.string(),
		category: v.string(),
		userEmail: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		// If userEmail is provided, use it to find the user
		if (args.userEmail && typeof args.userEmail === 'string') {
			// Find the user by email
			const user = await ctx.db
				.query('user')
				.withIndex('by_email', (q) => q.eq('email', args.userEmail!))
				.first();

			if (!user) {
				throw new Error('User not found');
			}

			// Validate input
			if (args.name.length > 100) {
				throw new Error('Template name too long');
			}

			if (args.content.length > 1600) {
				throw new Error('Template content too long');
			}

			// Create the template with the user's ID
			return await ctx.db.insert('templates', {
				name: args.name,
				content: args.content,
				category: args.category,
				userId: user._id,
			});
		}

		// Otherwise, use the authenticated user
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		// Validate input
		if (args.name.length > 100) {
			throw new Error('Template name too long');
		}

		if (args.content.length > 1600) {
			throw new Error('Template content too long');
		}

		return await ctx.db.insert('templates', {
			...args,
			userId: identity.subject,
		});
	},
});

export const update = mutation({
	args: {
		id: v.id('templates'),
		name: v.optional(v.string()),
		content: v.optional(v.string()),
		category: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		const existing = await ctx.db.get(args.id);
		if (!existing || existing.userId !== identity.subject) {
			throw new Error('Template not found');
		}

		return await ctx.db.patch(args.id, {
			name: args.name ?? existing.name,
			content: args.content ?? existing.content,
			category: args.category ?? existing.category,
		});
	},
});

export const remove = mutation({
	args: {
		id: v.id('templates'),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		const existing = await ctx.db.get(args.id);
		if (!existing || existing.userId !== identity.subject) {
			throw new Error('Template not found');
		}

		await ctx.db.delete(args.id);
		return { success: true };
	},
});

export const recordUsage = mutation({
	args: {
		id: v.id('templates'),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		const existing = await ctx.db.get(args.id);
		if (!existing || existing.userId !== identity.subject) {
			throw new Error('Template not found');
		}

		// Update last used timestamp
		return await ctx.db.patch(args.id, {
			lastUsed: Date.now(),
		});
	},
});
