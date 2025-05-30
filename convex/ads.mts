import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';
import { api } from './_generated/api';

// Define interface for user with ad count properties
interface UserWithAdCounts {
	_id: Id<'user'>;
	_creationTime: number;
	picture?: string;
	phone?: string;
	location?: string;
	name: string;
	email: string;
	dailyAdCount?: number;
	weeklyAdCount?: number;
	dailyAdLimit?: number;
	weeklyAdLimit?: number;
	lastUpdated?: string;
	createdAt?: string;
}

// Create an Ad
export const createAd = mutation({
	args: {
		adName: v.string(),
		teamId: v.string(),
		type: v.optional(v.string()),
		costPerView: v.optional(v.string()),
		numberOfDaysRunning: v.optional(v.string()),
		adResourceUrl: v.optional(v.string()),
		description: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity || !identity.email) {
			throw new Error('User must be authenticated to create an ad');
		}

		const ad = {
			...args,
			createdBy: identity.email,
			createdAt: new Date().toISOString(),
			lastModifiedAt: new Date().toISOString(),
			isPublished: false,
		};

		const adId = await ctx.db.insert('ads', ad);
		return { id: adId };
	},
});

// Create an Ad with email parameter (for API routes)
export const createAdWithEmail = mutation({
	args: {
		adName: v.string(),
		teamId: v.string(),
		createdBy: v.string(),
		type: v.optional(v.string()),
		costPerView: v.optional(v.string()),
		numberOfDaysRunning: v.optional(v.string()),
		adResourceUrl: v.optional(v.string()),
		description: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const ad = {
			...args,
			createdAt: new Date().toISOString(),
			lastModifiedAt: new Date().toISOString(),
			isPublished: false,
		};

		const adId = await ctx.db.insert('ads', ad);
		return { id: adId };
	},
});

// List Ads by Email with improved querying
export const list = query({
	args: {
		email: v.string(),
	},
	handler: async (ctx, args) => {
		// Check if user exists in the database
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.email))
			.first();

		if (!user) {
			throw new Error('Unauthorized: User does not exist');
		}

		const ads = await ctx.db
			.query('ads')
			.withIndex('by_createdBy', (q) => q.eq('createdBy', args.email))
			.order('desc')
			.collect();

		// Map the results with consistent formatting
		return ads.map((ad) => ({
			id: ad._id,
			title: ad.adName || 'No Title',
			description: ad.description || 'No description available',
			adResourceUrl: ad.adResourceUrl || '',
			costPerView: ad.costPerView || '0',
			type: ad.type || 'Unknown Type',
			numberOfDaysRunning: ad.numberOfDaysRunning || '0',
			teamId: ad.teamId || 'N/A',
			createdBy: ad.createdBy,
			isPublished: ad.isPublished || false,
			createdAt: ad.createdAt,
			lastModifiedAt: ad.lastModifiedAt,
		}));
	},
});

// Retrieve a Single Ad by ID
// export const getById = query({
// 	args: {
// 		id: v.id('ads'),
// 		userEmail: v.string(),
// 	},
// 	handler: async (ctx, args) => {
// 		const ad = await ctx.db.get(args.id);
// 		if (!ad) {
// 			throw new Error('Ad not found');
// 		}

// 		// Check if user exists in the database
// 		const user = await ctx.db
// 			.query('user')
// 			.withIndex('by_email', (q) => q.eq('email', args.userEmail))
// 			.first();

// 		if (!user) {
// 			throw new Error('Unauthorized: User does not exist');
// 		}

// 		// Check if the user owns this ad
// 		if (ad.createdBy !== args.userEmail) {
// 			throw new Error('Unauthorized: You can only view your own ads');
// 		}

// 		return {
// 			id: ad._id,
// 			title: ad.adName || 'No Title',
// 			description: ad.description || 'No description available',
// 			adResourceUrl: ad.adResourceUrl || '',
// 			costPerView: ad.costPerView || '0',
// 			type: ad.type || 'Unknown Type',
// 			numberOfDaysRunning: ad.numberOfDaysRunning || '0',
// 			teamId: ad.teamId || 'N/A',
// 			createdBy: ad.createdBy,
// 			isPublished: ad.isPublished || false,
// 		};
// 	},
// });

export const getAdById = query({
	args: {
		id: v.string(),
	},
	handler: async (ctx, args) => {
		const ad = await ctx.db.get(args.id as Id<'ads'>);
		if (!ad) {
			throw new Error('Ad not found');
		}
		return ad;
	},
});

// Retrieve All Ads for a specific user
export const listAllAds = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('User must be authenticated to list all ads');
		}

		const ads = await ctx.db.query('ads').collect();
		return ads;
	},
});

// Update an Ad
export const updateAd = mutation({
	args: {
		id: v.string(),
		adName: v.optional(v.string()),
		teamId: v.optional(v.string()),
		type: v.optional(v.string()),
		costPerView: v.optional(v.string()),
		numberOfDaysRunning: v.optional(v.string()),
		adResourceUrl: v.optional(v.string()),
		description: v.optional(v.string()),
		isPublished: v.optional(v.boolean()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('User must be authenticated to update an ad');
		}

		const ad = await ctx.db.get(args.id as Id<'ads'>);
		if (!ad) {
			throw new Error('Ad not found');
		}

		if (ad.createdBy !== identity.email) {
			throw new Error('Only the creator can update this ad');
		}

		const { id, ...updateData } = args;
		await ctx.db.patch(id as Id<'ads'>, {
			...updateData,
			lastModifiedAt: new Date().toISOString(),
		});

		return { success: true };
	},
});

// List only published ads
export const listPublishedAds = query({
	args: {
		userEmail: v.string(),
		isPublished: v.boolean(),
	},
	handler: async (ctx, args) => {
		// Check if user exists in the database
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.userEmail))
			.first();

		if (!user) {
			throw new Error('Unauthorized: User does not exist');
		}

		// Query ads that are published
		const publishedAds = await ctx.db
			.query('ads')
			.withIndex('by_published', (q) => q.eq('isPublished', args.isPublished))
			.collect();

		// Map the results with consistent formatting
		return publishedAds.map((ad) => ({
			id: ad._id,
			title: ad.adName || 'No Title',
			description: ad.description || 'No description available',
			adResourceUrl: ad.adResourceUrl || '',
			costPerView: ad.costPerView || '0',
			type: ad.type || 'Unknown Type',
			numberOfDaysRunning: ad.numberOfDaysRunning || '0',
			teamId: ad.teamId || 'N/A',
			createdBy: ad.createdBy,
			isPublished: ad.isPublished || false,
			createdAt: ad.createdAt,
			lastModifiedAt: ad.lastModifiedAt,
		}));
	},
});

// Delete an Ad
export const deleteAd = mutation({
	args: {
		id: v.id('ads'),
		userEmail: v.string(),
	},
	handler: async (ctx, args) => {
		// Get the ad to check ownership
		const ad = await ctx.db.get(args.id);
		if (!ad) {
			throw new Error('Ad not found');
		}

		// Verify the user owns the ad
		if (ad.createdBy !== args.userEmail) {
			throw new Error('Unauthorized: You can only delete your own ads');
		}

		// Delete the ad
		await ctx.db.delete(args.id);
		return { success: true };
	},
});

export const togglePublish = mutation({
	args: {
		id: v.id('ads'),
		isPublished: v.boolean(),
		userEmail: v.string(),
	},
	handler: async (ctx, args) => {
		try {
			const ad = await ctx.db.get(args.id);
			if (!ad) {
				throw new Error('Ad not found');
			}

			// Check if user exists in the database
			const user = await ctx.db
				.query('user')
				.withIndex('by_email', (q) => q.eq('email', args.userEmail))
				.first();

			if (!user) {
				throw new Error('Unauthorized: User does not exist');
			}

			if (ad.createdBy !== args.userEmail) {
				throw new Error('Unauthorized: You can only modify your own ads');
			}

			const now = new Date().toISOString();

			const updateData = {
				isPublished: args.isPublished,
				isActive: args.isPublished,
				lastModifiedAt: now,
				...(args.isPublished
					? {
							startDate: now,
							duration: 30,
						}
					: {}),
			};

			await ctx.db.patch(args.id, updateData);
			return { success: true };
		} catch (error) {
			console.error('Error toggling publish status:', error);
			throw new Error('Failed to update publish status');
		}
	},
});

interface adLimits {
	_id: Id<'adLimits'>;
	_creationTime: number;
	userId?: Id<'user'>;
	userEmail: string;
	dailyCount: number;
	weeklyCount: number;
	hasCredits: boolean;
	lastDailyReset: string;
	lastWeeklyReset: string;
	createdAt: string;
	updatedAt: string;
}
export const getUserAdLimits = mutation({
	args: {
		userEmail: v.string(),
	},
	handler: async (ctx, args) => {
		// First get the user by email to get their ID
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.userEmail))
			.first();

		if (!user) {
			throw new Error('User not found');
		}

		// Query the adLimits table using both userId and userEmail for safety
		let limit = (await ctx.db
			.query('adLimits')
			.withIndex('by_user', (q) => q.eq('userEmail', args.userEmail))
			.filter((q) => q.eq(q.field('userId'), user._id))
			.first()) as adLimits | null;

		// If no limits exist, create a default record with userId
		if (!limit) {
			const now = new Date().toISOString();
			const newLimitsId = await ctx.db.insert('adLimits', {
				userId: user._id, // Add the user ID to associate limits with the specific user
				userEmail: args.userEmail,
				dailyCount: 0,
				weeklyCount: 0,
				hasCredits: true, // Default to true for new users
				lastDailyReset: now,
				lastWeeklyReset: now,
				createdAt: now,
				updatedAt: now,
			});
			limit = (await ctx.db.get(newLimitsId)) as adLimits;
		}

		// Check if limits should reset
		const now = new Date();
		let shouldUpdate = false;
		let newDailyCount = limit.dailyCount;
		let newWeeklyCount = limit.weeklyCount;

		// Check if daily limit should reset
		const lastDailyReset = new Date(limit.lastDailyReset);
		if (
			now.getDate() !== lastDailyReset.getDate() ||
			now.getMonth() !== lastDailyReset.getMonth() ||
			now.getFullYear() !== lastDailyReset.getFullYear()
		) {
			newDailyCount = 0;
			shouldUpdate = true;
		}

		// Check if weekly limit should reset
		const lastWeeklyReset = new Date(limit.lastWeeklyReset);
		const daysSinceWeeklyReset = Math.floor(
			(now.getTime() - lastWeeklyReset.getTime()) / (1000 * 60 * 60 * 24)
		);
		if (daysSinceWeeklyReset >= 7) {
			newWeeklyCount = 0;
			shouldUpdate = true;
		}

		// Update if needed
		if (shouldUpdate) {
			const updatedLimit = await ctx.db.patch(limit._id, {
				dailyCount: newDailyCount,
				weeklyCount: newWeeklyCount,
				lastDailyReset: now.toISOString(),
				...(daysSinceWeeklyReset >= 7
					? { lastWeeklyReset: now.toISOString() }
					: {}),
				updatedAt: now.toISOString(),
			});
			return updatedLimit;
		}

		return limit;
	},
});

export const checkAndResetLimits = mutation({
	args: { userEmail: v.string() },
	handler: async (ctx, args) => {
		// Reuse the getUserAdLimits logic to avoid duplication
		const limit = await ctx.runMutation(api.ads.getUserAdLimits, {
			userEmail: args.userEmail,
		});
		return limit;
	},
});

export const incrementAdCounts = mutation({
	args: { userId: v.string() },
	handler: async (ctx, args) => {
		const { userId } = args;

		// First, get the user by email to get their ID
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', userId))
			.first();

		if (!user) {
			throw new Error('User not found');
		}

		// Get user's current ad counts and limits from userCredits table
		const userCredits = await ctx.db
			.query('userCredits')
			.withIndex('by_userId', (q) => q.eq('userId', user._id.toString()))
			.first();

		// Get current counts with defaults and type assertions
		const currentDailyCount = userCredits?.dailyAdCount ?? 0;
		const currentWeeklyCount = userCredits?.weeklyAdCount ?? 0;
		const dailyLimit = (userCredits?.dailyAdLimit as number) ?? 5; // Default limit for free tier
		const weeklyLimit = (userCredits?.weeklyAdLimit as number) ?? 20; // Default limit for free tier

		// Check if incrementing would exceed limits
		if (currentDailyCount >= dailyLimit) {
			throw new Error('Daily ad limit reached');
		}
		if (currentWeeklyCount >= weeklyLimit) {
			throw new Error('Weekly ad limit reached');
		}

		const now = new Date().toISOString();

		// Update the userCredits table
		if (userCredits) {
			await ctx.db.patch(userCredits._id, {
				dailyAdCount: currentDailyCount + 1,
				weeklyAdCount: currentWeeklyCount + 1,
				lastAdCreated: now,
				updatedAt: now,
			});
		} else {
			// Create a new userCredits record if it doesn't exist
			await ctx.db.insert('userCredits', {
				userId: user._id.toString(),
				userEmail: userId,
				credits: 0,
				accountType: 'free',
				dailyAdCount: 1,
				weeklyAdCount: 1,
				dailyAdLimit: 5,
				weeklyAdLimit: 20,
				lastAdCreated: now,
				createdAt: now,
				updatedAt: now,
			});
		}

		// Also update the user table
		await ctx.db.patch(user._id, {
			dailyAdCount: (user.dailyAdCount || 0) + 1,
			weeklyAdCount: (user.weeklyAdCount || 0) + 1,
			lastUpdated: now,
		});

		// Return the updated counts
		return {
			success: true,
			dailyCount: (user.dailyAdCount || 0) + 1,
			weeklyCount: (user.weeklyAdCount || 0) + 1,
		};
	},
});

// Reset daily ad counts for all users
export const resetDailyAdCounts = mutation({
	args: {
		adminEmail: v.string(),
	},
	handler: async (ctx, args) => {
		// Check if the requesting user exists
		const requestingUser = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.adminEmail))
			.first();

		if (!requestingUser) {
			throw new Error('Unauthorized: User does not exist');
		}

		// Get all users
		const users = (await ctx.db.query('user').collect()) as UserWithAdCounts[];

		// Update each user's daily count
		for (const user of users) {
			await ctx.db.patch(user._id, {
				dailyAdCount: 0,
				lastUpdated: new Date().toISOString(),
			});
		}

		return { success: true, usersUpdated: users.length };
	},
});

// Reset weekly ad counts for all users
export const resetWeeklyAdCounts = mutation({
	args: {
		adminEmail: v.string(),
	},
	handler: async (ctx, args) => {
		// Check if the requesting user exists
		const requestingUser = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.adminEmail))
			.first();

		if (!requestingUser) {
			throw new Error('Unauthorized: User does not exist');
		}

		// Get all users
		const users = (await ctx.db.query('user').collect()) as UserWithAdCounts[];

		// Update each user's weekly count
		for (const user of users) {
			await ctx.db.patch(user._id, {
				weeklyAdCount: 0,
				lastUpdated: new Date().toISOString(),
			});
		}

		return { success: true, usersUpdated: users.length };
	},
});

// Helper for migration: Get all ad limits records
export const getAllAdLimits = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('adLimits').collect();
	},
});

// Helper for migration: Update a specific ad limit record with a userId
export const updateAdLimitUserId = mutation({
	args: {
		adLimitId: v.id('adLimits'),
		userId: v.id('user'),
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.adLimitId, {
			userId: args.userId,
		});
	},
});
