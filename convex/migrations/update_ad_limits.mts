import { action } from '../_generated/server';
import { v } from 'convex/values';
import { api } from '../_generated/api';

/**
 * This migration fixes existing adLimits records by associating them with the correct user ID
 */
export const migrateAdLimits = action({
	args: {},
	handler: async (ctx) => {
		console.log('Starting adLimits migration');

		// Get all adLimits records
		const adLimits = await ctx.runQuery(api.ads.getAllAdLimits, {});
		console.log(`Found ${adLimits.length} adLimits records to migrate`);

		// Process each record
		for (const limit of adLimits) {
			// Skip records that already have a userId
			if (limit.userId) {
				console.log(`Skipping record ${limit._id} - already has userId`);
				continue;
			}

			try {
				// Find the corresponding user by email
				const user = await ctx.runQuery(api.user.getUserByEmail, {
					email: limit.userEmail,
				});

				// Update the adLimits record with the userId
				await ctx.runMutation(api.ads.updateAdLimitUserId, {
					adLimitId: limit._id,
					userId: user._id,
				});
				console.log(
					`Updated adLimits record ${limit._id} with userId ${user._id}`
				);
			} catch (error) {
				console.log(`Warning: No user found for email ${limit.userEmail}`);
			}
		}

		console.log('AdLimits migration completed');
		return { success: true, count: adLimits.length };
	},
});
