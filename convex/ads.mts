import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';
// Temporarily remove this import to fix TypeScript issues
// import { api } from './_generated/api';

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

// Helper function to get or create user
async function getOrCreateUser(ctx: any, email: string) {
	// Check if user exists in the database
	let user = await ctx.db
		.query('user')
		.withIndex('by_email', (q: any) => q.eq('email', email))
		.first();

	// If user doesn't exist, create them using the createUser mutation
	if (!user) {
		console.log(`Creating new user record for email: ${email}`);
		const now = new Date().toISOString();

		const userId = await ctx.db.insert('user', {
			email: email,
			name: email.split('@')[0], // Use email prefix as default name
			createdAt: now,
			lastUpdated: now,
			// Set default values for ad counts
			dailyAdCount: 0,
			weeklyAdCount: 0,
			dailyAdLimit: 1,
			weeklyAdLimit: 5,
			// Set default role for new users (consistent with auth route fallback)
			roles: [
				{
					id: 'member',
					key: 'MEMBER',
					name: 'Member',
				},
			],
			onboardingCompleted: false,
		});

		user = await ctx.db.get(userId);
		console.log(`Successfully created user record with ID: ${userId}`);
	}

	return user;
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
		// Get or create user (will auto-create if they don't exist)
		const user = await getOrCreateUser(ctx, args.email);

		if (!user) {
			throw new Error('Failed to create or retrieve user');
		}

		const ads = await ctx.db
			.query('ads')
			.withIndex('by_createdBy', (q: any) => q.eq('createdBy', args.email))
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
		// Get or create user (will auto-create if they don't exist)
		const user = await getOrCreateUser(ctx, args.userEmail);

		if (!user) {
			throw new Error('Failed to create or retrieve user');
		}

		// Query ads that are published
		const publishedAds = await ctx.db
			.query('ads')
			.withIndex('by_published', (q: any) =>
				q.eq('isPublished', args.isPublished)
			)
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

			// Get or create user (will auto-create if they don't exist)
			const user = await getOrCreateUser(ctx, args.userEmail);

			if (!user) {
				throw new Error('Failed to create or retrieve user');
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

// SINGLE SOURCE OF TRUTH: Use userCredits for all limit checking
export const checkAndResetLimits = mutation({
	args: { userEmail: v.string() },
	handler: async (ctx, args) => {
		// TEMPORARILY DISABLED - will re-enable after TypeScript issues are resolved
		// Use the getUserCredits function from credits.mts as the single source of truth
		// const userCredits = await ctx.runMutation(api.credits.getUserCredits, {
		// 	email: args.userEmail,
		// });
		// return userCredits;

		// Return a default response for now
		return {
			hasCredits: false,
			credits: 0,
			accountType: 'free',
			dailyAdCount: 0,
			weeklyAdCount: 0,
			dailyAdLimit: 1,
			weeklyAdLimit: 5,
			lastAdCreated: null,
			updatedAt: new Date().toISOString(),
		};
	},
});

export const incrementAdCounts = mutation({
	args: { userId: v.string() },
	handler: async (ctx, args) => {
		const { userId } = args;

		// Get or create user (will auto-create if they don't exist)
		const user = await getOrCreateUser(ctx, userId);

		if (!user) {
			throw new Error('Failed to create or retrieve user');
		}

		// Get user's current ad counts and limits from userCredits table (SINGLE SOURCE OF TRUTH)
		let userCredits = await ctx.db
			.query('userCredits')
			.withIndex('by_userId', (q: any) => q.eq('userId', user._id.toString()))
			.first();

		// If no userCredits record exists, create one with default values
		if (!userCredits) {
			const now = new Date().toISOString();
			const newCreditsId = await ctx.db.insert('userCredits', {
				userId: user._id.toString(),
				userEmail: userId,
				credits: 0,
				accountType: 'free',
				dailyAdCount: 0,
				weeklyAdCount: 0,
				dailyAdLimit: 1,
				weeklyAdLimit: 5,
				lastAdCreated: now,
				createdAt: now,
				updatedAt: now,
			});
			userCredits = await ctx.db.get(newCreditsId);
		}

		// At this point, userCredits is guaranteed to exist
		if (!userCredits) {
			throw new Error('Failed to create or retrieve user credits');
		}

		// Check if limits need to be reset based on time
		const now = new Date();
		const lastAdCreated = userCredits.lastAdCreated
			? new Date(userCredits.lastAdCreated)
			: new Date(0);

		// Reset daily count if it's a new day
		const isDifferentDay =
			now.getDate() !== lastAdCreated.getDate() ||
			now.getMonth() !== lastAdCreated.getMonth() ||
			now.getFullYear() !== lastAdCreated.getFullYear();

		// Reset weekly count if it's been a week
		const daysSinceLastAd = Math.floor(
			(now.getTime() - lastAdCreated.getTime()) / (1000 * 60 * 60 * 24)
		);
		const shouldResetWeekly = daysSinceLastAd >= 7;

		let currentDailyCount = userCredits?.dailyAdCount ?? 0;
		let currentWeeklyCount = userCredits?.weeklyAdCount ?? 0;

		// Reset counts if needed
		if (isDifferentDay) {
			currentDailyCount = 0;
		}
		if (shouldResetWeekly) {
			currentWeeklyCount = 0;
		}

		// Get dynamic limits based on account type
		const accountType = userCredits?.accountType || 'free';
		const getDailyLimit = (type: string) => {
			switch (type) {
				case 'pro':
					return 10;
				case 'enterprise':
					return 50;
				default:
					return 1; // free account
			}
		};

		const getWeeklyLimit = (type: string) => {
			switch (type) {
				case 'pro':
					return 50;
				case 'enterprise':
					return 250;
				default:
					return 5; // free account
			}
		};

		const dailyLimit = getDailyLimit(accountType);
		const weeklyLimit = getWeeklyLimit(accountType);

		// Check if incrementing would exceed limits
		if (currentDailyCount >= dailyLimit) {
			throw new Error(
				`Daily ad limit reached (${dailyLimit} per day for ${accountType} account)`
			);
		}
		if (currentWeeklyCount >= weeklyLimit) {
			throw new Error(
				`Weekly ad limit reached (${weeklyLimit} per week for ${accountType} account)`
			);
		}

		const nowISO = now.toISOString();

		// Update ONLY the userCredits table (SINGLE SOURCE OF TRUTH)
		await ctx.db.patch(userCredits._id, {
			dailyAdCount: currentDailyCount + 1,
			weeklyAdCount: currentWeeklyCount + 1,
			dailyAdLimit: dailyLimit,
			weeklyAdLimit: weeklyLimit,
			lastAdCreated: nowISO,
			updatedAt: nowISO,
		});

		// Return the updated counts
		return {
			success: true,
			dailyCount: currentDailyCount + 1,
			weeklyCount: currentWeeklyCount + 1,
			dailyLimit,
			weeklyLimit,
			accountType,
		};
	},
});

// Reset daily ad counts for all users (admin function)
export const resetDailyAdCounts = mutation({
	args: {
		adminEmail: v.string(),
	},
	handler: async (ctx, args) => {
		// Get or create admin user (will auto-create if they don't exist)
		const requestingUser = await getOrCreateUser(ctx, args.adminEmail);

		if (!requestingUser) {
			throw new Error('Failed to create or retrieve admin user');
		}

		// Get all userCredits records and reset daily counts
		const allUserCredits = await ctx.db.query('userCredits').collect();

		for (const userCredit of allUserCredits) {
			await ctx.db.patch(userCredit._id, {
				dailyAdCount: 0,
				updatedAt: new Date().toISOString(),
			});
		}

		return { success: true, usersUpdated: allUserCredits.length };
	},
});

// Reset weekly ad counts for all users (admin function)
export const resetWeeklyAdCounts = mutation({
	args: {
		adminEmail: v.string(),
	},
	handler: async (ctx, args) => {
		// Get or create admin user (will auto-create if they don't exist)
		const requestingUser = await getOrCreateUser(ctx, args.adminEmail);

		if (!requestingUser) {
			throw new Error('Failed to create or retrieve admin user');
		}

		// Get all userCredits records and reset weekly counts
		const allUserCredits = await ctx.db.query('userCredits').collect();

		for (const userCredit of allUserCredits) {
			await ctx.db.patch(userCredit._id, {
				weeklyAdCount: 0,
				updatedAt: new Date().toISOString(),
			});
		}

		return { success: true, usersUpdated: allUserCredits.length };
	},
});

// Check ad expiration status (READ-ONLY QUERY)
export const checkAdExpiration = query({
	args: {},
	handler: async (ctx) => {
		const publishedAds = await ctx.db
			.query('ads')
			.filter((q) => q.eq(q.field('isPublished'), true))
			.collect();

		const now = new Date();
		const results = [];

		for (const ad of publishedAds) {
			const createdAt = new Date(ad.createdAt || ad._creationTime);
			const durationDays = parseInt(ad.numberOfDaysRunning || '0', 10);
			const expirationDate = new Date(createdAt);
			expirationDate.setDate(expirationDate.getDate() + durationDays);
			const timeDiff = expirationDate.getTime() - now.getTime();
			const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
			const isExpired = now > expirationDate;
			const isExpiring = daysRemaining <= 1 && daysRemaining > 0;

			results.push({
				id: ad._id,
				title: ad.adName || 'Untitled Ad',
				isPublished: ad.isPublished,
				daysRemaining: Math.max(0, daysRemaining),
				isExpiring: isExpiring,
				isExpired: isExpired,
				startDate: createdAt.toISOString(),
				expirationDate: expirationDate.toISOString(),
				duration: durationDays,
				createdBy: ad.createdBy,
			});
		}

		return results;
	},
});

// Mutation version to actually update the database (called periodically)
export const updateExpiredAds = mutation({
	args: {},
	handler: async (ctx) => {
		// Get all published ads
		const publishedAds = await ctx.db
			.query('ads')
			.filter((q) => q.eq(q.field('isPublished'), true))
			.collect();

		const now = new Date();
		let expiredCount = 0;

		for (const ad of publishedAds) {
			try {
				// Parse the creation date and duration
				const createdAt = new Date(ad.createdAt || ad._creationTime);
				const durationDays = parseInt(ad.numberOfDaysRunning || '0', 10);

				// Calculate expiration date
				const expirationDate = new Date(createdAt);
				expirationDate.setDate(expirationDate.getDate() + durationDays);

				// Check if ad has expired
				const isExpired = now > expirationDate;

				// If ad has expired, unpublish it
				if (isExpired) {
					await ctx.db.patch(ad._id, {
						isPublished: false,
						lastModifiedAt: new Date().toISOString(),
					});
					expiredCount++;
				}
			} catch (error) {
				console.error(`Error updating expired ad ${ad._id}:`, error);
			}
		}

		console.log(
			`Updated ${expiredCount} expired ads out of ${publishedAds.length} published ads`
		);

		return {
			success: true,
			totalChecked: publishedAds.length,
			expiredCount,
			timestamp: new Date().toISOString(),
		};
	},
});
