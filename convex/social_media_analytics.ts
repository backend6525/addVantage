// import { mutation, query } from 'convex/server';
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const addSocialAccount = mutation({
	args: {
		userId: v.id('user'),
		platform: v.string(),
		accessToken: v.string(),
		refreshToken: v.optional(v.string()),
		expiresAt: v.optional(v.number()),
	},
	handler: async (
		{ db },
		{ userId, platform, accessToken, refreshToken, expiresAt }
	) => {
		await db.insert('socialAccounts', {
			userId,
			platform,
			accessToken,
			refreshToken,
			expiresAt,
		});
	},
});

export const updateMetrics = mutation({
	args: {
		userId: v.id('user'),
		platform: v.string(),
		followers: v.number(),
		likes: v.number(),
		views: v.number(),
		updatedAt: v.number(),
	},
	handler: async ({ db }, args) => {
		const existing = await db
			.query('metrics')
			.withIndex('by_userId_platform', (q) =>
				q.eq('userId', args.userId).eq('platform', args.platform)
			)
			.first();

		if (!existing) {
			throw new Error('Metrics document not found');
		}

		// Patch only the specified fields
		await db.patch(existing._id, {
			followers: args.followers,
			likes: args.likes,
			views: args.views,
			updatedAt: args.updatedAt,
		});
	},
});

export const getMetrics = query({
	args: { userId: v.id('user'), platform: v.string() },
	handler: async ({ db }, { userId, platform }) => {
		return await db
			.query('metrics')
			// .filter((q) => q.eq('userId', userId).eq('platform', platform))
			.withIndex('by_userId_platform', (q) =>
				q.eq('userId', userId).eq('platform', platform)
			)
			.first();
	},
});

// Add this to your Convex functions file
// export const getSocialAccount = query({
// 	args: { userId: v.id('user'), platform: v.string() },
// 	handler: async ({ db }, { userId, platform }) => {
// 		return await db
// 			.query('socialAccounts')
// 			.withIndex('by_userId', (q) =>
// 				q.eq('userId', userId).eq('platform', platform)
// 			)
// 			.first();
// 	},
// });

// Add this to your Convex functions file
export const getSocialAccount = query({
	args: { userId: v.id('user'), platform: v.string() },
	handler: async ({ db }, { userId, platform }) => {
		return await db
			.query('socialAccounts')
			.withIndex('by_userId', (q) => q.eq('userId', userId))
			.filter((q) => q.eq('platform', platform))
			.first();
	},
});
