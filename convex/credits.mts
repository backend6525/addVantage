import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { internal } from './_generated/api';
import { Id } from './_generated/dataModel';

export const migrateUserCredits = mutation({
	args: {},
	handler: async (ctx) => {
		const users = await ctx.db.query('user').collect();
		let migratedCount = 0;
		let errorCount = 0;

		for (const user of users) {
			try {
				// Check if user already has credits
				const existingCredits = await ctx.db
					.query('userCredits')
					.withIndex('by_userId', (q) => q.eq('userId', user._id.toString()))
					.first();

				if (!existingCredits) {
					// Create new credits record with default values
					await ctx.db.insert('userCredits', {
						userId: user._id.toString(),
						userEmail: user.email,
						credits: 0,
						accountType: 'free',
						dailyAdCount: 0,
						weeklyAdCount: 0,
						dailyAdLimit: 1,
						weeklyAdLimit: 5,
						lastAdCreated: new Date().toISOString(),
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					});
					migratedCount++;
				}
			} catch (error) {
				console.error(`Error migrating user ${user._id}:`, error);
				errorCount++;
			}
		}

		return {
			totalUsers: users.length,
			migratedCount,
			errorCount,
		};
	},
});

// Migration function to consolidate data from legacy tables
export const consolidateLegacyData = mutation({
	args: {},
	handler: async (ctx) => {
		const users = await ctx.db.query('user').collect();
		let consolidatedCount = 0;
		let errorCount = 0;

		for (const user of users) {
			try {
				// Get existing userCredits record
				let userCredits = await ctx.db
					.query('userCredits')
					.withIndex('by_userId', (q) => q.eq('userId', user._id.toString()))
					.first();

				// If no userCredits exists, create one with data from user table
				if (!userCredits) {
					const now = new Date().toISOString();
					await ctx.db.insert('userCredits', {
						userId: user._id.toString(),
						userEmail: user.email,
						credits: 0,
						accountType: 'free',
						dailyAdCount: user.dailyAdCount ?? 0,
						weeklyAdCount: user.weeklyAdCount ?? 0,
						dailyAdLimit: user.dailyAdLimit ?? 1,
						weeklyAdLimit: user.weeklyAdLimit ?? 5,
						lastAdCreated: user.lastUpdated ?? now,
						createdAt: now,
						updatedAt: now,
					});
					consolidatedCount++;
				} else {
					// Update existing userCredits with any missing data from user table
					const updates: any = {};
					if (
						userCredits.dailyAdCount === undefined &&
						user.dailyAdCount !== undefined
					) {
						updates.dailyAdCount = user.dailyAdCount;
					}
					if (
						userCredits.weeklyAdCount === undefined &&
						user.weeklyAdCount !== undefined
					) {
						updates.weeklyAdCount = user.weeklyAdCount;
					}
					if (
						userCredits.dailyAdLimit === undefined &&
						user.dailyAdLimit !== undefined
					) {
						updates.dailyAdLimit = user.dailyAdLimit;
					}
					if (
						userCredits.weeklyAdLimit === undefined &&
						user.weeklyAdLimit !== undefined
					) {
						updates.weeklyAdLimit = user.weeklyAdLimit;
					}
					if (
						userCredits.lastAdCreated === undefined &&
						user.lastUpdated !== undefined
					) {
						updates.lastAdCreated = user.lastUpdated;
					}

					if (Object.keys(updates).length > 0) {
						updates.updatedAt = new Date().toISOString();
						await ctx.db.patch(userCredits._id, updates);
						consolidatedCount++;
					}
				}
			} catch (error) {
				console.error(`Error consolidating data for user ${user._id}:`, error);
				errorCount++;
			}
		}

		return {
			totalUsers: users.length,
			consolidatedCount,
			errorCount,
			message:
				'Legacy data consolidation completed. userCredits is now the single source of truth.',
		};
	},
});

// SINGLE SOURCE OF TRUTH: Get user credits and limits from userCredits table ONLY
export const getUserCredits = mutation({
	args: { email: v.string() },
	handler: async (ctx, args) => {
		const { email } = args;

		// First get the user by email to get their ID
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', email))
			.first();

		if (!user) {
			throw new Error('User not found');
		}

		// Get user's credits from userCredits table (SINGLE SOURCE OF TRUTH)
		let userCredits = await ctx.db
			.query('userCredits')
			.withIndex('by_userId', (q) => q.eq('userId', user._id.toString()))
			.first();

		// Get dynamic limits based on account type
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

		// If no credits record exists, create one with default values
		if (!userCredits) {
			const now = new Date().toISOString();
			const accountType = 'free';
			const dailyLimit = getDailyLimit(accountType);
			const weeklyLimit = getWeeklyLimit(accountType);

			// Create a new userCredits record
			const newCreditsId = await ctx.db.insert('userCredits', {
				userId: user._id.toString(),
				userEmail: email,
				credits: 0,
				accountType,
				dailyAdCount: 0,
				weeklyAdCount: 0,
				dailyAdLimit: dailyLimit,
				weeklyAdLimit: weeklyLimit,
				lastAdCreated: now,
				createdAt: now,
				updatedAt: now,
			});

			userCredits = await ctx.db.get(newCreditsId);
		}

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

		let currentDailyCount = userCredits.dailyAdCount || 0;
		let currentWeeklyCount = userCredits.weeklyAdCount || 0;
		const accountType = userCredits.accountType || 'free';
		const dailyLimit = getDailyLimit(accountType);
		const weeklyLimit = getWeeklyLimit(accountType);

		// Reset counts if needed and update the database
		if (isDifferentDay || shouldResetWeekly) {
			if (isDifferentDay) {
				currentDailyCount = 0;
			}
			if (shouldResetWeekly) {
				currentWeeklyCount = 0;
			}

			const nowISO = now.toISOString();

			// Update ONLY the userCredits record (SINGLE SOURCE OF TRUTH)
			await ctx.db.patch(userCredits._id, {
				dailyAdCount: currentDailyCount,
				weeklyAdCount: currentWeeklyCount,
				dailyAdLimit: dailyLimit,
				weeklyAdLimit: weeklyLimit,
				updatedAt: nowISO,
			});
		}

		// Return the credits data with dynamic limits
		return {
			hasCredits: userCredits.credits > 0 || false,
			credits: userCredits.credits || 0,
			accountType,
			dailyAdCount: currentDailyCount,
			weeklyAdCount: currentWeeklyCount,
			dailyAdLimit: dailyLimit,
			weeklyAdLimit: weeklyLimit,
			lastAdCreated: userCredits.lastAdCreated,
			updatedAt: userCredits.updatedAt,
		};
	},
});

// READ-ONLY QUERY: Get user credits and limits from userCredits table (for API routes)
export const getUserCreditsQuery = query({
	args: { email: v.string() },
	handler: async (ctx, args) => {
		const { email } = args;

		// First get the user by email to get their ID
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', email))
			.first();

		if (!user) {
			return null; // Return null instead of throwing error for API routes
		}

		// Get user's credits from userCredits table (SINGLE SOURCE OF TRUTH)
		const userCredits = await ctx.db
			.query('userCredits')
			.withIndex('by_userId', (q) => q.eq('userId', user._id.toString()))
			.first();

		// Get dynamic limits based on account type
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

		// If no credits record exists, return default values (don't create in query)
		if (!userCredits) {
			const accountType = 'free';
			const dailyLimit = getDailyLimit(accountType);
			const weeklyLimit = getWeeklyLimit(accountType);

			return {
				hasCredits: false,
				credits: 0,
				accountType,
				dailyAdCount: 0,
				weeklyAdCount: 0,
				dailyAdLimit: dailyLimit,
				weeklyAdLimit: weeklyLimit,
				lastAdCreated: null,
				updatedAt: new Date().toISOString(),
			};
		}

		// Calculate current counts (read-only, no DB updates)
		const now = new Date();
		const lastAdCreated = userCredits.lastAdCreated
			? new Date(userCredits.lastAdCreated)
			: new Date(0);

		// Check if we need to reset counts (but don't actually reset in query)
		const isDifferentDay =
			now.getDate() !== lastAdCreated.getDate() ||
			now.getMonth() !== lastAdCreated.getMonth() ||
			now.getFullYear() !== lastAdCreated.getFullYear();

		const daysSinceLastAd = Math.floor(
			(now.getTime() - lastAdCreated.getTime()) / (1000 * 60 * 60 * 24)
		);
		const shouldResetWeekly = daysSinceLastAd >= 7;

		let currentDailyCount = userCredits.dailyAdCount || 0;
		let currentWeeklyCount = userCredits.weeklyAdCount || 0;
		const accountType = userCredits.accountType || 'free';
		const dailyLimit = getDailyLimit(accountType);
		const weeklyLimit = getWeeklyLimit(accountType);

		// Reset counts in the returned data (but not in DB)
		if (isDifferentDay) {
			currentDailyCount = 0;
		}
		if (shouldResetWeekly) {
			currentWeeklyCount = 0;
		}

		// Return the current state with calculated values
		return {
			hasCredits: userCredits.credits > 0 || false,
			credits: userCredits.credits || 0,
			accountType,
			dailyAdCount: currentDailyCount,
			weeklyAdCount: currentWeeklyCount,
			dailyAdLimit: dailyLimit,
			weeklyAdLimit: weeklyLimit,
			lastAdCreated: userCredits.lastAdCreated,
			updatedAt: userCredits.updatedAt,
		};
	},
});

// Helper to sync legacy user table data (for migration purposes only)
export const syncUserTableFromCredits = mutation({
	args: { email: v.string() },
	handler: async (ctx, args) => {
		const { email } = args;

		// Get the user
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', email))
			.first();

		if (!user) {
			throw new Error('User not found');
		}

		// Get current credits data (single source of truth)
		const userCredits = await ctx.db
			.query('userCredits')
			.withIndex('by_userId', (q) => q.eq('userId', user._id.toString()))
			.first();

		if (userCredits) {
			// Sync user table with userCredits data (for legacy compatibility)
			await ctx.db.patch(user._id, {
				dailyAdCount: userCredits.dailyAdCount,
				weeklyAdCount: userCredits.weeklyAdCount,
				dailyAdLimit: userCredits.dailyAdLimit,
				weeklyAdLimit: userCredits.weeklyAdLimit,
				lastUpdated: userCredits.updatedAt,
			});
		}

		return { success: true };
	},
});
