import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';
import { QueryCtx, MutationCtx } from './_generated/server';

// Get a user by email
export const getUserByEmail = query({
	args: {
		email: v.string(),
	},
	handler: async (ctx: QueryCtx, args) => {
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.email))
			.first();

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	},
});

// Get user credits
export const getUserCredits = query({
	args: { email: v.string() },
	handler: async (ctx: QueryCtx, args: { email: string }) => {
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.email))
			.first();

		if (!user) {
			return {
				credits: 5, // Default credits for new users
				accountType: 'free',
			};
		}

		// Calculate credits based on ad limits
		const credits = Math.max(
			0,
			(user.dailyAdLimit ?? 5) - (user.dailyAdCount ?? 0)
		);

		return {
			credits,
			accountType: 'free', // Default to free account type
		};
	},
});

// Create a new user
export const createUser = mutation({
	args: {
		name: v.string(),
		email: v.string(),
		picture: v.optional(v.string()),
		roles: v.optional(
			v.array(
				v.object({
					id: v.string(),
					key: v.string(),
					name: v.string(),
				})
			)
		),
		phone: v.optional(v.string()),
		location: v.optional(v.string()),
		dailyAdCount: v.optional(v.number()),
		weeklyAdCount: v.optional(v.number()),
		dailyAdLimit: v.optional(v.number()),
		weeklyAdLimit: v.optional(v.number()),
		createdAt: v.optional(v.string()),
		lastUpdated: v.optional(v.string()),
		onboardingCompleted: v.optional(v.boolean()),
	},
	handler: async (
		ctx: MutationCtx,
		args: {
			name: string;
			email: string;
			picture?: string;
			roles?: Array<{ id: string; key: string; name: string }>;
			phone?: string;
			location?: string;
			dailyAdCount?: number;
			weeklyAdCount?: number;
			dailyAdLimit?: number;
			weeklyAdLimit?: number;
			createdAt?: string;
			lastUpdated?: string;
			onboardingCompleted?: boolean;
		}
	) => {
		// Check if user already exists
		const existingUser = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.email))
			.first();

		if (existingUser) {
			return existingUser._id;
		}

		// Create the new user
		const userId = await ctx.db.insert('user', {
			name: args.name,
			email: args.email,
			picture: args.picture,
			roles:
				args.roles?.map((role) => ({
					id: role.id,
					key: role.key,
					name: role.name,
				})) || [],
			phone: args.phone,
			location: args.location,
			dailyAdCount: args.dailyAdCount ?? 0,
			weeklyAdCount: args.weeklyAdCount ?? 0,
			dailyAdLimit: args.dailyAdLimit ?? 5,
			weeklyAdLimit: args.weeklyAdLimit ?? 20,
			createdAt: args.createdAt ?? new Date().toISOString(),
			lastUpdated: args.lastUpdated ?? new Date().toISOString(),
			lastLimitReset: new Date().toISOString(),
			onboardingCompleted: args.onboardingCompleted ?? false,
		});

		return userId;
	},
});

// Update user information
export const updateUser = mutation({
	args: {
		id: v.id('user'),
		name: v.optional(v.string()),
		picture: v.optional(v.string()),
		roles: v.optional(
			v.array(
				v.object({
					id: v.string(),
					key: v.string(),
					name: v.string(),
				})
			)
		),
		phone: v.optional(v.string()),
		location: v.optional(v.string()),
		website: v.optional(v.string()),
		companyName: v.optional(v.string()),
		bio: v.optional(v.string()),
		userType: v.optional(v.string()),
		platforms: v.optional(v.array(v.string())),
		dailyAdCount: v.optional(v.number()),
		weeklyAdCount: v.optional(v.number()),
		dailyAdLimit: v.optional(v.number()),
		weeklyAdLimit: v.optional(v.number()),
	},
	handler: async (
		ctx: MutationCtx,
		args: {
			id: Id<'user'>;
			name?: string;
			picture?: string;
			roles?: Array<{ id: string; key: string; name: string }>;
			phone?: string;
			location?: string;
			website?: string;
			companyName?: string;
			bio?: string;
			userType?: string;
			platforms?: string[];
			dailyAdCount?: number;
			weeklyAdCount?: number;
			dailyAdLimit?: number;
			weeklyAdLimit?: number;
		}
	) => {
		const { id, ...updates } = args;

		// Add lastUpdated timestamp
		const updateData = {
			...updates,
			lastUpdated: new Date().toISOString(),
		};

		// Only include fields that were provided
		const filteredUpdates = Object.fromEntries(
			Object.entries(updateData).filter(([_, value]) => value !== undefined)
		);

		await ctx.db.patch(id, filteredUpdates);
		return id;
	},
});

// Update user profile information specifically for onboarding
export const updateProfile = mutation({
	args: {
		userId: v.id('user'),
		name: v.optional(v.string()),
		email: v.optional(v.string()),
		website: v.optional(v.string()),
		companyName: v.optional(v.string()),
		bio: v.optional(v.string()),
	},
	handler: async (
		ctx: MutationCtx,
		args: {
			userId: Id<'user'>;
			name?: string;
			email?: string;
			website?: string;
			companyName?: string;
			bio?: string;
		}
	) => {
		const { userId, ...updates } = args;

		// Add lastUpdated timestamp
		const updateData = {
			...updates,
			lastUpdated: new Date().toISOString(),
		};

		// Only include fields that were provided
		const filteredUpdates = Object.fromEntries(
			Object.entries(updateData).filter(([_, value]) => value !== undefined)
		);

		await ctx.db.patch(userId, filteredUpdates);
		return userId;
	},
});

// Update user roles
export const updateUserRoles = mutation({
	args: {
		email: v.string(),
		roles: v.array(v.string()),
	},
	handler: async (
		ctx: MutationCtx,
		args: { email: string; roles: string[] }
	) => {
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.email))
			.first();

		if (!user) {
			throw new Error('User not found');
		}

		await ctx.db.patch(user._id, {
			roles: args.roles.map((role) => ({
				id: role,
				name: role,
				key: role,
			})),
			lastUpdated: new Date().toISOString(),
		});

		return user._id;
	},
});

// Reset daily ad count
export const resetDailyAdCount = mutation({
	args: { email: v.string() },
	handler: async (ctx: MutationCtx, args: { email: string }) => {
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.email))
			.first();

		if (!user) return null;

		const today = new Date().toISOString().split('T')[0];
		const lastUpdated = user.lastUpdated?.split('T')[0];

		if (lastUpdated !== today) {
			await ctx.db.patch(user._id, {
				dailyAdCount: 0,
				lastUpdated: new Date().toISOString(),
				lastLimitReset: new Date().toISOString(),
			});
			return {
				...user,
				dailyAdCount: 0,
				lastLimitReset: new Date().toISOString(),
			};
		}

		return user;
	},
});

// Reset weekly ad count
export const resetWeeklyAdCount = mutation({
	args: { email: v.string() },
	handler: async (ctx: MutationCtx, args: { email: string }) => {
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.email))
			.first();

		if (!user) return null;

		await ctx.db.patch(user._id, {
			weeklyAdCount: 0,
			lastUpdated: new Date().toISOString(),
		});

		return {
			...user,
			weeklyAdCount: 0,
		};
	},
});

// Mark onboarding as completed
export const completeOnboarding = mutation({
	args: {
		userId: v.id('user'),
	},
	handler: async (ctx: MutationCtx, args: { userId: Id<'user'> }) => {
		await ctx.db.patch(args.userId, {
			onboardingCompleted: true,
			lastUpdated: new Date().toISOString(),
		});
		return args.userId;
	},
});

// Update the last time limits were reset
export const updateLastLimitReset = mutation({
	args: {
		email: v.string(),
		timestamp: v.string(),
	},
	handler: async (
		ctx: MutationCtx,
		args: { email: string; timestamp: string }
	) => {
		const user = await ctx.db
			.query('user')
			.withIndex('by_email', (q) => q.eq('email', args.email))
			.first();

		if (!user) return null;

		await ctx.db.patch(user._id, {
			lastLimitReset: args.timestamp,
			lastUpdated: new Date().toISOString(),
		});

		return {
			...user,
			lastLimitReset: args.timestamp,
		};
	},
});

export const handleSignOut = mutation({
	args: { email: v.string() },
	handler: async (ctx, args) => {
		const { email } = args;

		// Get the user
		const user = await ctx.db
			.query('user')
			.filter((q) => q.eq(q.field('email'), email))
			.first();

		if (!user) {
			throw new Error('User not found');
		}

		// Update user's last signout time
		await ctx.db.patch(user._id, {
			lastUpdated: new Date().toISOString(),
		});

		return { success: true };
	},
});
