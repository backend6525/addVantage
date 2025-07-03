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

const campaignInfluencers = defineTable({
	campaignId: v.id('campaigns'),
	influencerId: v.id('influencers'),
	assignedBy: v.string(),
	status: v.string(), // "assigned", "accepted", "rejected", "completed"
	agreedRate: v.optional(
		v.object({
			amount: v.number(),
			currency: v.string(),
		})
	),
	deliverables: v.optional(v.array(v.string())),
	createdAt: v.number(),
	updatedAt: v.number(),
})
	.index('by_campaign', ['campaignId'])
	.index('by_influencer', ['influencerId'])
	.index('by_campaign_influencer', ['campaignId', 'influencerId']);

// Core team management
const teams = defineTable({
	teamName: v.string(),
	createdBy: v.string(), // email of team owner
	description: v.optional(v.string()),
	industry: v.optional(v.string()),
	targetAudience: v.optional(v.string()),
	defaultBudget: v.optional(
		v.object({
			min: v.number(),
			max: v.number(),
			currency: v.string(),
		})
	),
	campaignTypes: v.optional(v.array(v.string())),
	isActive: v.optional(v.boolean()),
	createdAt: v.optional(v.float64()),
	updatedAt: v.optional(v.number()),
}).index('by_creator', ['createdBy']);

// Simple team membership (separate from influencer profiles)
const teamMembers = defineTable({
	teamId: v.id('teams'),
	email: v.string(),
	firstName: v.string(),
	lastName: v.string(),
	role: v.string(), // "owner", "admin", "member", "viewer"
	status: v.string(), // "active", "pending", "inactive"
	invitedBy: v.optional(v.string()),
	joinedAt: v.number(),
	lastActive: v.optional(v.number()),
	createdAt: v.number(),
	updatedAt: v.number(),
})
	.index('by_team', ['teamId'])
	.index('by_email', ['email'])
	.index('by_team_and_email', ['teamId', 'email']);

// Detailed influencer profiles (separate from team membership)
// const influencers = defineTable({
// 	// Basic Information
// 	email: v.string(),
// 	firstName: v.string(),
// 	lastName: v.string(),
// 	phoneNumber: v.optional(v.string()),
// 	dateOfBirth: v.optional(v.number()), // timestamp
// 	location: v.object({
// 		city: v.optional(v.string()),
// 		state: v.optional(v.string()),
// 		country: v.string(),
// 		timezone: v.optional(v.string()),
// 	}),

// 	// Professional Information
// 	bio: v.optional(v.string()),
// 	website: v.optional(v.string()),
// 	occupation: v.optional(v.string()),
// 	expertise: v.optional(v.array(v.string())),

// 	// Verification Status
// 	verificationStatus: v.object({
// 		emailVerified: v.boolean(),
// 		phoneVerified: v.boolean(),
// 		identityVerified: v.boolean(),
// 	}),

// 	status: v.string(), // "active", "inactive", "suspended"
// 	createdAt: v.number(),
// 	updatedAt: v.number(),
// })
// 	.index('by_email', ['email'])
// 	.index('by_status', ['status']);
// convex/influencers.ts

const influencers = defineTable({
	// Basic Information
	email: v.string(),
	firstName: v.string(),
	lastName: v.string(),
	phoneNumber: v.optional(v.string()),
	dateOfBirth: v.optional(v.number()), // timestamp
	location: v.object({
		city: v.optional(v.string()),
		state: v.optional(v.string()),
		country: v.string(),
		timezone: v.optional(v.string()),
	}),

	// Professional Information
	bio: v.optional(v.string()),
	website: v.optional(v.string()),
	occupation: v.optional(v.string()),
	expertise: v.optional(v.array(v.string())),

	// Verification Status
	verificationStatus: v.object({
		emailVerified: v.boolean(),
		phoneVerified: v.boolean(),
		identityVerified: v.boolean(),
	}),

	status: v.string(), // "active", "inactive", "suspended"
	createdAt: v.number(),
	updatedAt: v.number(),
})
	.index('by_email', ['email'])
	.index('by_status', ['status']);

// Social media profiles (normalized)
const socialMediaProfiles = defineTable({
	influencerId: v.id('influencers'),
	platform: v.string(), // "instagram", "tiktok", "youtube", etc.
	username: v.string(),
	profileUrl: v.string(),
	isVerified: v.boolean(),
	followerCount: v.number(),
	engagementRate: v.optional(v.number()),
	averageLikes: v.optional(v.number()),
	averageComments: v.optional(v.number()),
	averageShares: v.optional(v.number()),
	averageViews: v.optional(v.number()),
	lastUpdated: v.number(),
	isActive: v.boolean(),
})
	.index('by_influencer', ['influencerId'])
	.index('by_platform', ['platform'])
	.index('by_influencer_platform', ['influencerId', 'platform']);

// Influencer business information
const influencerBusiness = defineTable({
	influencerId: v.id('influencers'),
	contentCategories: v.array(v.string()),
	primaryAudience: v.optional(
		v.object({
			ageRange: v.string(),
			gender: v.string(),
			topCountries: v.array(v.string()),
			interests: v.array(v.string()),
		})
	),

	ratesAndPricing: v.object({
		sponsoredPost: v.optional(
			v.object({
				min: v.number(),
				max: v.number(),
				currency: v.string(),
			})
		),
		story: v.optional(
			v.object({
				min: v.number(),
				max: v.number(),
				currency: v.string(),
			})
		),
		reel: v.optional(
			v.object({
				min: v.number(),
				max: v.number(),
				currency: v.string(),
			})
		),
		ugc: v.optional(
			v.object({
				min: v.number(),
				max: v.number(),
				currency: v.string(),
			})
		),
	}),

	availability: v.object({
		isAvailable: v.boolean(),
		workingHours: v.optional(v.string()),
		responseTime: v.optional(v.string()),
		blackoutDates: v.optional(v.array(v.number())), // timestamps
	}),

	collaborationPreferences: v.object({
		preferredBrands: v.array(v.string()),
		excludedBrands: v.array(v.string()),
		contentTypes: v.array(v.string()),
		campaignTypes: v.array(v.string()),
		minimumNoticePeriod: v.optional(v.number()),
		maxPostsPerWeek: v.optional(v.number()),
	}),

	updatedAt: v.number(),
}).index('by_influencer', ['influencerId']);

// Many-to-many relationship: teams can work with multiple influencers
const teamInfluencers = defineTable({
	teamId: v.id('teams'),
	influencerId: v.id('influencers'),
	addedBy: v.string(), // email of team member who added this influencer
	tags: v.optional(v.array(v.string())),
	internalNotes: v.optional(v.string()),
	status: v.string(), // "active", "inactive", "archived"
	createdAt: v.number(),
	updatedAt: v.number(),
})
	.index('by_team', ['teamId'])
	.index('by_influencer', ['influencerId'])
	.index('by_team_influencer', ['teamId', 'influencerId']);

// Campaigns
const campaigns = defineTable({
	teamId: v.id('teams'),
	campaignName: v.string(),
	description: v.string(),
	budget: v.object({
		total: v.number(),
		currency: v.string(),
	}),
	startDate: v.number(), // timestamp
	endDate: v.number(), // timestamp
	status: v.string(), // "draft", "active", "completed", "cancelled"
	targetAudience: v.object({
		demographics: v.optional(v.string()),
		interests: v.array(v.string()),
		locations: v.array(v.string()),
	}),
	createdBy: v.string(),
	createdAt: v.number(),
	updatedAt: v.number(),
})
	.index('by_team', ['teamId'])
	.index('by_status', ['status'])
	.index('by_team_status', ['teamId', 'status']);

// Campaign assignments (which influencers are assigned to which campaigns)
const campaignAssignments = defineTable({
	campaignId: v.id('campaigns'),
	influencerId: v.id('influencers'),
	assignedBy: v.string(),
	status: v.string(), // "assigned", "accepted", "declined", "completed"
	agreedRate: v.optional(
		v.object({
			amount: v.number(),
			currency: v.string(),
			contentType: v.string(),
		})
	),
	deliverables: v.array(
		v.object({
			type: v.string(), // "post", "story", "reel", "ugc"
			dueDate: v.number(),
			status: v.string(), // "pending", "submitted", "approved", "revision_needed"
			description: v.optional(v.string()),
		})
	),
	assignedAt: v.number(),
	updatedAt: v.number(),
})
	.index('by_campaign', ['campaignId'])
	.index('by_influencer', ['influencerId'])
	.index('by_campaign_influencer', ['campaignId', 'influencerId'])
	.index('by_status', ['status']);

// Content deliverables
const contentDeliverables = defineTable({
	assignmentId: v.id('campaignAssignments'),
	campaignId: v.id('campaigns'),
	influencerId: v.id('influencers'),
	contentType: v.string(),
	contentUrl: v.optional(v.string()),
	caption: v.optional(v.string()),
	hashtags: v.optional(v.array(v.string())),
	scheduledPostTime: v.optional(v.number()),
	actualPostTime: v.optional(v.number()),
	status: v.string(), // "draft", "submitted", "approved", "published", "revision_needed"
	feedback: v.optional(v.string()),
	performance: v.optional(
		v.object({
			reach: v.optional(v.number()),
			impressions: v.optional(v.number()),
			engagement: v.optional(v.number()),
			clicks: v.optional(v.number()),
			conversions: v.optional(v.number()),
		})
	),
	createdAt: v.number(),
	updatedAt: v.number(),
})
	.index('by_assignment', ['assignmentId'])
	.index('by_campaign', ['campaignId'])
	.index('by_influencer', ['influencerId'])
	.index('by_status', ['status']);

// Media kit assets
const mediaKitAssets = defineTable({
	influencerId: v.id('influencers'),
	type: v.string(), // "profile_photo", "content_sample", "statistics_screenshot"
	url: v.string(),
	platform: v.optional(v.string()),
	description: v.optional(v.string()),
	isActive: v.boolean(),
	createdAt: v.number(),
})
	.index('by_influencer', ['influencerId'])
	.index('by_type', ['type']);

// Campaign performance history (for influencers)
const campaignHistory = defineTable({
	influencerId: v.id('influencers'),
	brandName: v.string(),
	campaignType: v.string(),
	completedAt: v.number(),
	performance: v.object({
		reach: v.optional(v.number()),
		impressions: v.optional(v.number()),
		engagement: v.optional(v.number()),
		clicks: v.optional(v.number()),
		conversions: v.optional(v.number()),
	}),
	rating: v.optional(v.number()), // 1-5 stars
	testimonial: v.optional(v.string()),
	createdAt: v.number(),
}).index('by_influencer', ['influencerId']);

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

// SINGLE SOURCE OF TRUTH: userCredits table for all limit and credit data
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
	// Legacy fields kept for compatibility but no longer actively used for limits
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

// Export the consolidated schema
export default defineSchema({
	ads,
	teams,
	user,
	auditLog,
	notifications,
	userCredits, // SINGLE SOURCE OF TRUTH for limits and credits
	socialAccounts,
	metrics,
	smsHistory,
	contacts,
	templates,
	teamMembers,
	influencers,
	socialMediaProfiles,
	influencerBusiness,
	teamInfluencers,
	campaigns,
	campaignAssignments,
	contentDeliverables,
	mediaKitAssets,
	campaignHistory,
	campaignInfluencers,
});
