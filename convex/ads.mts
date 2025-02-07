import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Create an Ad
export const createAds = mutation({
	args: {
		adName: v.string(),
		teamId: v.string(),
		createdBy: v.string(),
		type: v.optional(v.string()), // Ad type (e.g., video, image)
		costPerView: v.optional(v.string()),
		numberOfDaysRunning: v.optional(v.string()),
		adResource: v.optional(v.string()),
		adResourceUrl: v.optional(v.string()), // URL to the ad resource
		description: v.optional(v.string()),
		duration: v.optional(v.float64()),
		isActive: v.optional(v.boolean()),
		isPublished: v.optional(v.boolean()),
		lastModifiedBy: v.optional(v.string()),
		endDate: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const now = new Date().toISOString();

		const result = await ctx.db.insert('ads', {
			adName: args.adName,
			teamId: args.teamId,
			createdBy: args.createdBy,
			type: args.type,
			costPerView: args.costPerView,
			numberOfDaysRunning: args.numberOfDaysRunning,
			adResourceUrl: args.adResourceUrl,
			description: args.description,
			duration: args.duration ?? 30,
			isActive: args.isActive ?? false,
			isPublished: args.isPublished ?? false,
			lastModifiedBy: args.lastModifiedBy,
			endDate: args.endDate,
			// Required fields
			createdAt: now,
			lastModifiedAt: now,
			startDate: now,
		});

		// Return the complete ad object
		const createdAd = await ctx.db.get(result);
		return createdAd;
	},
});

// List Ads by Email with improved querying
export const list = query({
	args: {
		email: v.string(),
	},
	handler: async (ctx, args) => {
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
export const getById = query({
	args: {
		id: v.id('ads'),
	},
	handler: async (ctx, args) => {
		const ad = await ctx.db.get(args.id);
		if (!ad) {
			throw new Error('Ad not found');
		}

		return {
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
		};
	},
});

// Retrieve All Ads
export const listAll = query({
	handler: async (ctx) => {
		const ads = await ctx.db.query('ads').collect();
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
		}));
	},
});

// Update an Ad
export const updateAd = mutation({
	args: {
		id: v.id('ads'),
		adName: v.optional(v.string()),
		teamId: v.optional(v.string()),
		createdBy: v.optional(v.string()),
		type: v.optional(v.string()),
		costPerView: v.optional(v.string()),
		numberOfDaysRunning: v.optional(v.string()),
		adResourceUrl: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { id, ...updateFields } = args;

		try {
			const now = new Date().toISOString();
			const result = await ctx.db.patch(id, {
				...updateFields,
				lastModifiedAt: now,
			});
			return result;
		} catch (error) {
			console.error('Error updating ad:', error);
			throw new Error('Failed to update ad');
		}
	},
});

// Delete an Ad
export const deleteAd = mutation({
	args: {
		id: v.id('ads'),
	},
	handler: async (ctx, args) => {
		try {
			const result = await ctx.db.delete(args.id);
			return result;
		} catch (error) {
			console.error('Error deleting ad:', error);
			throw new Error('Failed to delete ad');
		}
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

			// Get user ID for audit log
			const user = await ctx.db
				.query('user')
				.filter((q) => q.eq(q.field('email'), args.userEmail))
				.first();

			if (!user) {
				throw new Error('User not found');
			}

			// Create audit log entry with correct user ID
			await ctx.db.insert('auditLog', {
				action: `Toggle Publish ${args.isPublished ? 'ON' : 'OFF'}`,
				resourceId: args.id,
				resourceType: 'ads',
				userId: user._id, // Now using the correct user ID
				userEmail: args.userEmail,
				timestamp: now,
				details: `Ad publication status changed to ${args.isPublished}`,
				changes: {
					before: {
						isPublished: ad.isPublished,
						isActive: ad.isActive,
					},
					after: {
						isPublished: updateData.isPublished,
						isActive: updateData.isActive,
					},
				},
			});

			return {
				...ad,
				...updateData,
				id: args.id,
			};
		} catch (error) {
			console.error('Toggle Publish Error:', {
				id: args.id,
				userEmail: args.userEmail,
				isPublished: args.isPublished,
				errorMessage: error instanceof Error ? error.message : 'Unknown error',
			});
			throw error;
		}
	},
});

// Add a new query to check ad expiration
// export const checkAdExpiration = query({
// 	handler: async (ctx) => {
// 		const ads = await ctx.db
// 			.query('ads')
// 			.filter((q) => q.eq(q.field('isPublished'), true))
// 			.collect();

// 		return ads.map((ad) => {
// 			const startDate = ad.startDate ? new Date(ad.startDate) : null;
// 			const duration = ad.duration || 30; // Default to 30 days if not set

// 			if (!startDate) {
// 				return {
// 					...ad,
// 					id: ad._id,
// 					daysRemaining: duration,
// 					isExpiring: false,
// 				};
// 			}

// 			const now = new Date();
// 			const diffTime = Math.abs(now.getTime() - startDate.getTime());
// 			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
// 			const daysRemaining = duration - diffDays;

// 			return {
// 				...ad,
// 				id: ad._id,
// 				daysRemaining: Math.max(0, daysRemaining),
// 				isExpiring: daysRemaining <= 5 && daysRemaining > 0,
// 			};
// 		});
// 	},
// });

// Define the expected return type
type CheckAdExpirationResponse = {
	id: string;
	isPublished: boolean;
	daysRemaining?: number;
	isExpiring: boolean;
	startDate?: string;
	duration?: number;
}[];

export const checkAdExpiration = query({
	// Explicitly define the return type
	handler: async (ctx): Promise<CheckAdExpirationResponse> => {
		const ads = await ctx.db
			.query('ads')
			.filter((q) => q.eq(q.field('isPublished'), true))
			.collect();

		return ads.map((ad) => {
			const startDate = ad.startDate ? new Date(ad.startDate) : null;
			const duration = ad.duration || 30;

			if (!startDate) {
				return {
					id: ad._id,
					isPublished: ad.isPublished ?? false,
					daysRemaining: duration,
					isExpiring: false,
					startDate: ad.startDate,
					duration,
				};
			}

			const now = new Date();
			const diffTime = Math.abs(now.getTime() - startDate.getTime());
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			const daysRemaining = duration - diffDays;

			return {
				id: ad._id,
				isPublished: ad.isPublished ?? false,
				daysRemaining: Math.max(0, daysRemaining),
				isExpiring: daysRemaining <= 5 && daysRemaining > 0,
				startDate: ad.startDate,
				duration,
			};
		});
	},
});
// Update listPublishedAds to include countdown information
export const listPublishedAds = query({
	args: {
		userEmail: v.string(),
		isPublished: v.boolean(),
	},
	handler: async (ctx, args) => {
		const publishedAds = await ctx.db
			.query('ads')
			.filter((q) => q.eq(q.field('isPublished'), args.isPublished))
			.collect();

		return publishedAds.map((ad) => {
			const startDate = ad.startDate ? new Date(ad.startDate) : null;
			const duration = ad.duration || 30; // Default to 30 days if not set

			let daysRemaining = duration;
			let numberOfDaysRunning = '0';

			if (startDate) {
				const now = new Date();
				const diffTime = Math.abs(now.getTime() - startDate.getTime());
				const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
				daysRemaining = Math.max(0, duration - diffDays);
				numberOfDaysRunning = diffDays.toString();
			}

			return {
				id: ad._id,
				title: ad.adName || 'No Title',
				description: ad.description || 'No description available',
				adResourceUrl: ad.adResourceUrl || '',
				costPerView: ad.costPerView || '0',
				type: ad.type || 'Unknown Type',
				numberOfDaysRunning,
				teamId: ad.teamId || 'N/A',
				createdBy: ad.createdBy,
				isPublished: ad.isPublished || false,
				daysRemaining,
				startDate: ad.startDate,
				duration: ad.duration,
			};
		});
	},
});

// New mutation to extend ad duration
export const extendAdDuration = mutation({
	args: {
		id: v.id('ads'),
		extensionDays: v.number(),
	},
	handler: async (ctx, args) => {
		const ad = await ctx.db.get(args.id);
		if (!ad) throw new Error('Ad not found');

		return await ctx.db.patch(args.id, {
			duration: (ad.duration ?? 0) + args.extensionDays,
			isActive: true,
		});
	},
});

// Add a migration mutation to fix existing documents
export const fixMissingFields = mutation({
	handler: async (ctx) => {
		const now = new Date().toISOString();

		// Get all ads
		const ads = await ctx.db.query('ads').collect();

		// Update each ad that's missing required fields
		for (const ad of ads) {
			if (!ad.createdAt || !ad.lastModifiedAt) {
				await ctx.db.patch(ad._id, {
					createdAt: ad.createdAt || now,
					lastModifiedAt: ad.lastModifiedAt || now,
				});
			}
		}
	},
});
