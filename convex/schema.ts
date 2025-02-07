import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const ads = defineTable({
	adName: v.string(),
	teamId: v.string(),
	createdBy: v.string(),
	type: v.optional(v.string()), // Ad type (e.g., video, image)
	costPerView: v.optional(v.string()),
	numberOfDaysRunning: v.optional(v.string()),
	adResourceUrl: v.optional(v.string()), // URL to the ad resource
	description: v.optional(v.string()),
	createdAt: v.string(),
	lastModifiedAt: v.string(),

	// Added fields to match your existing functions
	isPublished: v.optional(v.boolean()),

	// New fields for ad duration tracking (from checkAdExpiration function)
	startDate: v.optional(v.string()),
	endDate: v.optional(v.string()),
	duration: v.optional(v.number()),
	isActive: v.optional(v.boolean()),
	lastModifiedBy: v.optional(v.string()),
})
	.index('by_createdBy', ['createdBy'])
	.index('by_published', ['isPublished']);

const teams = defineTable({
	teamName: v.string(),
	createdBy: v.string(),
	// Optional additional fields
	createdAt: v.optional(v.string()),
	members: v.optional(v.array(v.string())),
	description: v.optional(v.string()),
	isActive: v.optional(v.boolean()),
})
	.index('by_teamName', ['teamName'])
	.index('by_createdBy', ['createdBy']);

const user = defineTable({
	name: v.string(),
	email: v.string(),
	picture: v.optional(v.string()),
	phone: v.optional(v.string()),
	location: v.optional(v.string()),
}).index('by_email', ['email']);

// New audit log table
const auditLog = defineTable({
	action: v.string(), // Type of action (e.g., "Toggle Publish", "Create Ad", "Update Ad")
	resourceId: v.id('ads'), // ID of the resource being modified
	resourceType: v.literal('ads'), // Ensure it's always related to ads
	userId: v.id('user'), // ID of the user performing the action
	userEmail: v.string(), // Email of the user for easier tracking
	timestamp: v.string(), // ISO date string
	details: v.optional(v.string()), // Optional additional details
	changes: v.optional(
		v.object({
			before: v.optional(v.any()),
			after: v.optional(v.any()),
		})
	), // Optional object to track specific changes
})
	.index('by_resourceId', ['resourceId'])
	.index('by_userId', ['userId'])
	.index('by_timestamp', ['timestamp']);

const notifications = defineTable({
	userId: v.string(),
	type: v.string(),
	message: v.string(),
	adId: v.optional(v.string()),
	requesterId: v.optional(v.string()),
	status: v.string(),
	createdAt: v.string(),
	read: v.boolean(),
})
	.index('by_userId', ['userId'])
	.index('by_adId', ['adId'])
	.index('by_requesterId', ['requesterId'])
	.index('by_status', ['status'])
	.index('by_createdAt', ['createdAt']);

// Export the updated schema
export default defineSchema({
	ads,
	teams,
	user,
	auditLog, // Add the new auditLog table
	notifications,
});

// Existing tables remain the same...
