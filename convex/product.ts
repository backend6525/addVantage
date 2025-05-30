import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';

export const deleteProduct = mutation({
	args: {
		id: v.string(),
	},
	handler: async (ctx, args) => {
		// Delete the product
		await ctx.db.delete(args.id as Id<'ads'>);
		return { success: true };
	},
});
