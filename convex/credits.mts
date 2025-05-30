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
						dailyAdLimit: 5,
						weeklyAdLimit: 20,
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

// Get user credits by email
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

		// Get user's credits from userCredits table
		const userCredits = await ctx.db
			.query('userCredits')
			.withIndex('by_userId', (q) => q.eq('userId', user._id.toString()))
			.first();

		// If no credits record exists, create one with default values
		if (!userCredits) {
			const now = new Date().toISOString();
			// Create a new userCredits record
			const newCreditsId = await ctx.db.insert('userCredits', {
				userId: user._id.toString(),
				userEmail: email,
				credits: 0,
				accountType: 'free',
				dailyAdCount: 0,
				weeklyAdCount: 0,
				dailyAdLimit: 5,
				weeklyAdLimit: 20,
				createdAt: now,
				updatedAt: now,
			});

			// Return default values
			return {
				hasCredits: false,
				credits: 0,
				accountType: 'free',
				dailyAdCount: 0,
				weeklyAdCount: 0,
				dailyAdLimit: 5,
				weeklyAdLimit: 20,
			};
		}

		// Return the credits data
		return {
			hasCredits: userCredits.credits > 0 || false,
			credits: userCredits.credits || 0,
			accountType: userCredits.accountType || 'free',
			dailyAdCount: userCredits.dailyAdCount || 0,
			weeklyAdCount: userCredits.weeklyAdCount || 0,
			dailyAdLimit: userCredits.dailyAdLimit || 5,
			weeklyAdLimit: userCredits.weeklyAdLimit || 20,
		};
	},
});
