import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';

// Get all contacts for current user
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
				.query('contacts')
				.withIndex('by_user', (q) => q.eq('userId', user._id.toString()))
				.collect();
		}

		// Otherwise, use the authenticated user
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		return await ctx.db
			.query('contacts')
			.withIndex('by_user', (q) => q.eq('userId', identity.subject))
			.collect();
	},
});

// Create a new contact
export const create = mutation({
	args: {
		phone: v.string(),
		name: v.optional(v.string()),
		group: v.optional(v.string()),
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

			const { userEmail, ...contactData } = args;
			return await ctx.db.insert('contacts', {
				...contactData,
				userId: user._id.toString(),
			});
		}

		// Otherwise, use the authenticated user
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		const { userEmail, ...contactData } = args;
		return await ctx.db.insert('contacts', {
			...contactData,
			userId: identity.subject,
		});
	},
});

// Bulk delete contacts
export const bulkDelete = mutation({
	args: {
		ids: v.array(v.id('contacts')),
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

			// Verify that the contacts belong to the user
			for (const id of args.ids) {
				const contact = await ctx.db.get(id);
				if (!contact) {
					throw new Error('Contact not found');
				}
				if (contact.userId !== user._id.toString()) {
					throw new Error('Unauthorized to delete this contact');
				}
			}

			await Promise.all(args.ids.map((id) => ctx.db.delete(id)));
			return { success: true };
		}

		// Otherwise, use the authenticated user
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized');
		}

		// Verify that the contacts belong to the user
		for (const id of args.ids) {
			const contact = await ctx.db.get(id);
			if (!contact) {
				throw new Error('Contact not found');
			}
			if (contact.userId !== identity.subject) {
				throw new Error('Unauthorized to delete this contact');
			}
		}

		await Promise.all(args.ids.map((id) => ctx.db.delete(id)));
		return { success: true };
	},
});
