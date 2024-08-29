import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";

export const createAd = mutation({
	// args: {
	// 	adName: v.string(),
	// 	teamId: v.string(),
	// 	createdBy: v.string(),
	// 	type: v.optional(v.string()),
	// 	costPerView: v.optional(v.string()),
	// 	nOfDaysRunning: v.optional(v.string()),
	// },
	args: {
		adName: v.string(),
		teamId: v.string(),
		createdBy: v.string(),
		type: v.optional(v.string()),
		costPerView: v.optional(v.string()),
		numberOfDaysRunning: v.optional(v.string()),
		adResource: v.optional(v.any()), // Add this line
	},
	handler: async (ctx, args) => {
		const result = await ctx.db.insert("ads", args);
		return result;
	},
});

// Retrieving Alladds filtered by Email

export const list = query({
	args: {
		email: v.string(),
	},
	handler: async (ctx, args) => {
		const ads = await ctx.db
			.query("ads")
			.filter((q) => q.eq(q.field("createdBy"), args.email))
			.collect();

		return ads;
	},
});

// Retrieving Alladds
export const listAll = query({
	handler: async (ctx) => {
		const ads = await ctx.db.query("ads").collect();
		return ads;
	},
});
