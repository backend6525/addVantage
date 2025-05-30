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
	updatedAt: v.optional(v.string()),
	createdAt: v.string(),
	read: v.boolean(),
})
	.index('by_userId', ['userId'])
	.index('by_adId', ['adId'])
	.index('by_requesterId', ['requesterId'])
	.index('by_status', ['status'])
	.index('by_createdAt', ['createdAt']);

// Your existing tables...

// New table for tracking ad creation limits
const adLimits = defineTable({
	userId: v.optional(v.id('user')),
	userEmail: v.string(),
	dailyCount: v.number(),
	weeklyCount: v.number(),
	hasCredits: v.boolean(),
	lastDailyReset: v.string(), // ISO date string
	lastWeeklyReset: v.string(), // ISO date string
	createdAt: v.string(),
	updatedAt: v.string(),
})
	.index('by_user', ['userEmail'])
	.index('by_userId', ['userId']);

// New table for tracking user credits/account status
export const userCredits = defineTable({
	userId: v.string(),
	userEmail: v.string(),
	credits: v.number(),
	accountType: v.string(),
	dailyAdCount: v.optional(v.number()),
	weeklyAdCount: v.optional(v.number()),
	dailyAdLimit: v.optional(v.number()),
	weeklyAdLimit: v.optional(v.number()),
	lastAdCreated: v.optional(v.string()),
	createdAt: v.string(),
	updatedAt: v.string(),
}).index('by_userId', ['userId']);

const user = defineTable({
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
	website: v.optional(v.string()),
	companyName: v.optional(v.string()),
	bio: v.optional(v.string()),
	userType: v.optional(v.string()),
	platforms: v.optional(v.array(v.string())),
	dailyAdCount: v.optional(v.number()),
	weeklyAdCount: v.optional(v.number()),
	dailyAdLimit: v.optional(v.number()),
	weeklyAdLimit: v.optional(v.number()),
	createdAt: v.optional(v.string()),
	lastUpdated: v.optional(v.string()),
	onboardingCompleted: v.optional(v.boolean()),
	lastLimitReset: v.optional(v.string()),
}).index('by_email', ['email']);

const socialAccounts = defineTable({
	userId: v.id('user'),
	platform: v.string(),
	accessToken: v.string(),
	refreshToken: v.optional(v.string()),
	expiresAt: v.optional(v.number()),
}).index('by_userId', ['userId']);

const metrics = defineTable({
	userId: v.id('user'),
	platform: v.string(),
	followers: v.number(),
	likes: v.number(),
	views: v.number(),
	updatedAt: v.number(),
}).index('by_userId_platform', ['userId', 'platform']);

const smsHistory = defineTable({
	userId: v.string(),
	message: v.string(),
	recipients: v.number(),
	status: v.union(
		v.literal('PENDING'),
		v.literal('SENT'),
		v.literal('FAILED'),
		v.literal('DELIVERED')
	),
	scheduledAt: v.optional(v.number()),
	deliveredAt: v.optional(v.number()),
}).index('by_user', ['userId']);

const contacts = defineTable({
	phone: v.string(),
	name: v.optional(v.string()),
	group: v.optional(v.string()),
	userId: v.string(),
}).index('by_user', ['userId']);

const templates = defineTable({
	name: v.string(),
	content: v.string(),
	category: v.string(),
	userId: v.string(),
	lastUsed: v.optional(v.number()),
}).index('by_user', ['userId']);

// Export the updated schema
export default defineSchema({
	ads,
	teams,
	user,
	auditLog, // Add the new auditLog table
	notifications,
	adLimits,
	userCredits,
	socialAccounts,
	metrics,
	smsHistory,
	contacts,
	templates,
});
