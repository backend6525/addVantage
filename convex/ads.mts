import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create an Ad
// export const createAd = mutation({
// 	args: {
// 		adName: v.string(),
// 		teamId: v.string(),
// 		createdBy: v.string(),
// 		type: v.optional(v.string()),
// 		costPerView: v.optional(v.string()),
// 		numberOfDaysRunning: v.optional(v.string()),
// 		adResource: v.optional(v.any()),
// 	},
// 	handler: async (ctx, args) => {
// 		const result = await ctx.db.insert("ads", args);
// 		return result;
// 	},
// });

// Create an Ad
// export const createAd = mutation({
// 	args: {
// 		adName: v.string(),
// 		teamId: v.string(),
// 		createdBy: v.string(),
// 		type: v.optional(v.string()), // Handle different ad types
// 		costPerView: v.optional(v.string()),
// 		numberOfDaysRunning: v.optional(v.string()),
// 		adResource: v.optional(v.string()), // Store the file URL
// 	},
// 	handler: async (ctx, args) => {
// 		// Insert ad details into the "ads" collection
// 		const result = await ctx.db.insert("ads", {
// 			adName: args.adName,
// 			teamId: args.teamId,
// 			createdBy: args.createdBy,
// 			type: args.type,
// 			costPerView: args.costPerView,
// 			numberOfDaysRunning: args.numberOfDaysRunning,
// 			adResourceUrl: args.adResource, // Store URL, not the file
// 		});
// 		return result;
// 	},
// });

export const createAd = mutation({
	args: {
		adName: v.string(),
		teamId: v.string(),
		createdBy: v.string(),
		type: v.optional(v.string()), // Handle different ad types
		costPerView: v.optional(v.string()),
		numberOfDaysRunning: v.optional(v.string()),
		adResource: v.optional(v.string()), // Store the file URL as a string
	},
	handler: async (ctx, args) => {
		// Insert ad details into the "ads" collection
		const result = await ctx.db.insert("ads", {
			adName: args.adName,
			teamId: args.teamId,
			createdBy: args.createdBy,
			type: args.type,
			costPerView: args.costPerView,
			numberOfDaysRunning: args.numberOfDaysRunning,
			adResourceUrl: args.adResource, // Store URL, not the file itself
		});
		return result;
	},
});

// List Ads by user email
export const list = query({
	args: {
		email: v.optional(v.string()), // Make email optional
	},
	handler: async (ctx, args) => {
		if (!args.email) {
			return [];
		}

		const ads = await ctx.db
			.query("ads")
			.filter((q) => q.eq(q.field("createdBy"), args.email))
			.collect();

		// console.log("Ads returned from database:", ads);

		const validAds = ads.map((ad) => ({
			id: ad._id, // Mapping _id to id
			title: ad.adName || "No Title", // Fallback in case title is missing
			description: ad.description || "No description available", // Add fallback for description
			videoSrc: ad.adResource?.videoSrc || "", // Ensure video source is present
			costPerView: ad.costPerView || "0",
			type: ad.type || "Unknown Type",
		}));

		return validAds;
	},
});

// Retrieve all ads
export const listAll = query({
	handler: async (ctx) => {
		const ads = await ctx.db.query("ads").collect();
		return ads;
	},
});

// Update an Ad
export const updateAd = mutation({
	args: {
		id: v.id("ads"), // Use Id type for the "ads" collection
		adName: v.optional(v.string()),
		teamId: v.optional(v.string()),
		createdBy: v.optional(v.string()),
		type: v.optional(v.string()),
		costPerView: v.optional(v.string()),
		numberOfDaysRunning: v.optional(v.string()),
		adResource: v.optional(v.any()),
	},
	handler: async (ctx, args) => {
		const { id, ...updateFields } = args; // Destructure the id and update fields

		try {
			// Patch the document by its Id, updating only the fields provided
			const result = await ctx.db.patch(id, updateFields);
			return result;
		} catch (error) {
			console.error("Error updating ad:", error);
			throw new Error("Failed to update ad");
		}
	},
});

// Delete an Ad
export const deleteAd = mutation({
	args: {
		id: v.id("ads"), // Use Id type for the "ads" collection
	},
	handler: async (ctx, args) => {
		try {
			// Delete the document directly by its Id
			const result = await ctx.db.delete(args.id);
			return result;
		} catch (error) {
			console.error("Error deleting ad:", error);
			throw new Error("Failed to delete ad");
		}
	},
});
