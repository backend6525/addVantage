// import { v } from 'convex/values';
// import { query, mutation } from './_generated/server';

// export const getTeam = query({
// 	args: {
// 		email: v.optional(v.string()),
// 		teamName: v.optional(v.string()),
// 	},
// 	handler: async (ctx, args) => {
// 		let query = ctx.db.query('teams');
// 		if (args.email) {
// 			query = query.filter((q) => q.eq(q.field('createdBy'), args.email));
// 		}
// 		if (args.teamName) {
// 			query = query.filter((q) => q.eq(q.field('teamName'), args.teamName));
// 		}
// 		const result = await query.collect();
// 		return result;
// 	},
// });

// export const createTeam = mutation({
// 	args: { teamName: v.string(), createdBy: v.string() },
// 	handler: async (ctx, args) => {
// 		const existingTeam = await ctx.db
// 			.query('teams')
// 			.filter((q) => q.eq(q.field('teamName'), args.teamName))
// 			.first();
// 		if (existingTeam) {
// 			throw new Error(`Team with name ${args.teamName}, already exists.`);
// 		}
// 		const result = await ctx.db.insert('teams', args);
// 		return result;
// 	},
// });

// export const deleteTeam = mutation({
// 	args: {
// 		id: v.id('teams'),
// 	},
// 	handler: async (ctx, args) => {
// 		await ctx.db.delete(args.id);
// 	},
// });

// convex/teams.ts
import { v } from 'convex/values';
import { query, mutation } from './_generated/server';

// Team Functions
export const getTeam = query({
	args: {
		email: v.optional(v.string()),
		teamName: v.optional(v.string()),
		teamId: v.optional(v.id('teams')),
	},
	handler: async (ctx, args) => {
		let query = ctx.db.query('teams');

		if (args.teamId) {
			return await ctx.db.get(args.teamId);
		}
		if (args.email) {
			query = query.filter((q) => q.eq(q.field('createdBy'), args.email));
		}
		if (args.teamName) {
			query = query.filter((q) => q.eq(q.field('teamName'), args.teamName));
		}

		return await query.collect();
	},
});

export const createTeam = mutation({
	args: {
		teamName: v.string(),
		createdBy: v.string(),
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
	},
	handler: async (ctx, args) => {
		const existingTeam = await ctx.db
			.query('teams')
			.filter((q) => q.eq(q.field('teamName'), args.teamName))
			.first();

		if (existingTeam) {
			throw new Error(`Team with name ${args.teamName} already exists.`);
		}

		const now = Date.now();
		const result = await ctx.db.insert('teams', {
			...args,
			isActive: true,
			createdAt: now,
			updatedAt: now,
		});

		return result;
	},
});

export const updateTeam = mutation({
	args: {
		teamId: v.id('teams'),
		updates: v.object({
			teamName: v.optional(v.string()),
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
		}),
	},
	handler: async (ctx, args) => {
		const { teamId, updates } = args;
		await ctx.db.patch(teamId, {
			...updates,
			updatedAt: Date.now(),
		});
	},
});

export const deleteTeam = mutation({
	args: {
		teamId: v.id('teams'),
	},
	handler: async (ctx, args) => {
		// First delete all related data
		// Team members
		const members = await ctx.db
			.query('teamMembers')
			.withIndex('by_team', (q) => q.eq('teamId', args.teamId))
			.collect();

		await Promise.all(members.map((member) => ctx.db.delete(member._id)));

		// Team influencers
		const teamInfluencers = await ctx.db
			.query('teamInfluencers')
			.withIndex('by_team', (q) => q.eq('teamId', args.teamId))
			.collect();

		await Promise.all(teamInfluencers.map((ti) => ctx.db.delete(ti._id)));

		// Finally delete the team
		await ctx.db.delete(args.teamId);
	},
});

// Team Member Functions
export const getTeamMembers = query({
	args: {
		teamId: v.id('teams'),
		status: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		let query = ctx.db
			.query('teamMembers')
			.withIndex('by_team', (q) => q.eq('teamId', args.teamId));

		if (args.status) {
			query = query.filter((q) => q.eq(q.field('status'), args.status));
		}

		return await query.collect();
	},
});

export const addTeamMember = mutation({
	args: {
		teamId: v.id('teams'),
		email: v.string(),
		firstName: v.string(),
		lastName: v.string(),
		role: v.string(),
		invitedBy: v.string(),
	},
	handler: async (ctx, args) => {
		const existingMember = await ctx.db
			.query('teamMembers')
			.withIndex('by_team_and_email', (q) =>
				q.eq('teamId', args.teamId).eq('email', args.email)
			)
			.first();

		if (existingMember) {
			throw new Error('This user is already a member of the team');
		}

		const now = Date.now();
		return await ctx.db.insert('teamMembers', {
			...args,
			status: 'pending',
			joinedAt: now,
			createdAt: now,
			updatedAt: now,
		});
	},
});

export const updateTeamMember = mutation({
	args: {
		memberId: v.id('teamMembers'),
		updates: v.object({
			role: v.optional(v.string()),
			status: v.optional(v.string()),
		}),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.memberId, {
			...args.updates,
			updatedAt: Date.now(),
		});
	},
});

export const removeTeamMember = mutation({
	args: {
		memberId: v.id('teamMembers'),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.memberId);
	},
});

// Team Influencer Functions
export const getTeamInfluencers = query({
	args: {
		teamId: v.id('teams'),
		status: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		// First get all team-influencer relationships
		let query = ctx.db
			.query('teamInfluencers')
			.withIndex('by_team', (q) => q.eq('teamId', args.teamId));

		if (args.status) {
			query = query.filter((q) => q.eq(q.field('status'), args.status));
		}

		const teamInfluencers = await query.collect();

		// Then fetch the full influencer details for each
		const influencers = await Promise.all(
			teamInfluencers.map(async (ti) => {
				const influencer = await ctx.db.get(ti.influencerId);
				if (!influencer) {
					throw new Error(`Influencer ${ti.influencerId} not found`);
				}

				// Get social profiles
				const socialProfiles = await ctx.db
					.query('socialMediaProfiles')
					.withIndex('by_influencer', (q) =>
						q.eq('influencerId', ti.influencerId)
					)
					.collect();

				return {
					...influencer,
					socialProfiles,
					relationId: ti._id,
					tags: ti.tags,
					internalNotes: ti.internalNotes,
					status: ti.status,
				};
			})
		);

		return influencers;
	},
});

export const addInfluencerToTeam = mutation({
	args: {
		teamId: v.id('teams'),
		influencerId: v.id('influencers'),
		addedBy: v.string(),
		tags: v.optional(v.array(v.string())),
		internalNotes: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const existingRelation = await ctx.db
			.query('teamInfluencers')
			.withIndex('by_team_influencer', (q) =>
				q.eq('teamId', args.teamId).eq('influencerId', args.influencerId)
			)
			.first();

		if (existingRelation) {
			throw new Error('This influencer is already associated with the team');
		}

		const now = Date.now();
		return await ctx.db.insert('teamInfluencers', {
			...args,
			status: 'active',
			createdAt: now,
			updatedAt: now,
		});
	},
});

// export const createInfluencerAndAddToTeam = mutation({
// 	args: {
// 		teamId: v.id('teams'),
// 		addedBy: v.string(),
// 		influencerData: v.object({
// 			email: v.string(),
// 			firstName: v.string(),
// 			lastName: v.string(),
// 			phoneNumber: v.optional(v.string()),
// 			location: v.object({
// 				city: v.optional(v.string()),
// 				state: v.optional(v.string()),
// 				country: v.string(),
// 				timezone: v.optional(v.string()),
// 			}),
// 			bio: v.optional(v.string()),
// 			website: v.optional(v.string()),
// 			occupation: v.optional(v.string()),
// 			expertise: v.optional(v.array(v.string())),
// 		}),
// 		socialProfiles: v.optional(
// 			v.array(
// 				v.object({
// 					platform: v.string(),
// 					username: v.string(),
// 					profileUrl: v.string(),
// 					isVerified: v.boolean(),
// 					followerCount: v.number(),
// 					engagementRate: v.optional(v.number()),
// 					averageLikes: v.optional(v.number()),
// 					averageComments: v.optional(v.number()),
// 					averageShares: v.optional(v.number()),
// 					averageViews: v.optional(v.number()),
// 				})
// 			)
// 		),
// 		tags: v.optional(v.array(v.string())),
// 		internalNotes: v.optional(v.string()),
// 	},
// 	handler: async (ctx, args) => {
// 		const now = Date.now();

// 		// First create the influencer
// 		const influencerId = await ctx.db.insert('influencers', {
// 			...args.influencerData,
// 			verificationStatus: {
// 				emailVerified: false,
// 				phoneVerified: false,
// 				identityVerified: false,
// 			},
// 			status: 'active',
// 			createdAt: now,
// 			updatedAt: now,
// 		});

// 		// Add social profiles if provided
// 		if (args.socialProfiles) {
// 			await Promise.all(
// 				args.socialProfiles.map((profile) =>
// 					ctx.db.insert('socialMediaProfiles', {
// 						...profile,
// 						influencerId,
// 						lastUpdated: now,
// 						isActive: true,
// 					})
// 				)
// 			);
// 		}

// 		// Then add to team
// 		const relationId = await ctx.db.insert('teamInfluencers', {
// 			teamId: args.teamId,
// 			influencerId,
// 			addedBy: args.addedBy,
// 			tags: args.tags || [],
// 			internalNotes: args.internalNotes || '',
// 			status: 'active',
// 			createdAt: now,
// 			updatedAt: now,
// 		});

// 		return { influencerId, relationId };
// 	},
// });

export const createInfluencerAndAddToTeam = mutation({
	args: {
		teamId: v.id('teams'),
		addedBy: v.string(),
		influencerData: v.object({
			email: v.string(),
			firstName: v.string(),
			lastName: v.string(),
			phoneNumber: v.optional(v.string()),
			dateOfBirth: v.optional(v.number()), // Added timestamp field
			location: v.object({
				city: v.optional(v.string()),
				state: v.optional(v.string()),
				country: v.string(),
				timezone: v.optional(v.string()),
			}),
			bio: v.optional(v.string()),
			website: v.optional(v.string()),
			occupation: v.optional(v.string()),
			expertise: v.optional(v.array(v.string())),
		}),
		socialProfiles: v.optional(
			v.array(
				v.object({
					platform: v.string(),
					username: v.string(),
					profileUrl: v.string(),
					isVerified: v.boolean(),
					followerCount: v.number(),
					engagementRate: v.optional(v.number()),
					averageLikes: v.optional(v.number()),
					averageComments: v.optional(v.number()),
					averageShares: v.optional(v.number()),
					averageViews: v.optional(v.number()),
				})
			)
		),
		tags: v.optional(v.array(v.string())),
		internalNotes: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const now = Date.now();

		// First create the influencer with all required fields
		const influencerId = await ctx.db.insert('influencers', {
			...args.influencerData,
			// Ensure all required schema fields are included
			verificationStatus: {
				emailVerified: false,
				phoneVerified: false,
				identityVerified: false,
			},
			status: 'active',
			createdAt: now,
			updatedAt: now,
			// Set defaults for optional fields if not provided
			dateOfBirth: args.influencerData.dateOfBirth,
			occupation: args.influencerData.occupation || '',
			expertise: args.influencerData.expertise || [],
		});

		// Add social profiles if provided
		if (args.socialProfiles && args.socialProfiles.length > 0) {
			await Promise.all(
				args.socialProfiles.map((profile) =>
					ctx.db.insert('socialMediaProfiles', {
						...profile,
						influencerId,
						lastUpdated: now,
						isActive: true,
						// Set defaults for optional social profile fields
						engagementRate: profile.engagementRate || 0,
						averageLikes: profile.averageLikes || 0,
						averageComments: profile.averageComments || 0,
						averageShares: profile.averageShares || 0,
						averageViews: profile.averageViews || 0,
					})
				)
			);
		}

		// Create team-influencer relationship
		const relationId = await ctx.db.insert('teamInfluencers', {
			teamId: args.teamId,
			influencerId,
			addedBy: args.addedBy,
			tags: args.tags || [],
			internalNotes: args.internalNotes || '',
			status: 'active',
			createdAt: now,
			updatedAt: now,
		});

		// Return both IDs for reference
		return {
			influencerId,
			relationId,
			success: true,
			timestamp: now,
		};
	},
});

export const updateTeamInfluencer = mutation({
	args: {
		relationId: v.id('teamInfluencers'),
		updates: v.object({
			tags: v.optional(v.array(v.string())),
			internalNotes: v.optional(v.string()),
			status: v.optional(v.string()),
		}),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.relationId, {
			...args.updates,
			updatedAt: Date.now(),
		});
	},
});

export const removeInfluencerFromTeam = mutation({
	args: {
		relationId: v.id('teamInfluencers'),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.relationId);
	},
});

// Campaign Functions
export const getTeamCampaigns = query({
	args: {
		teamId: v.id('teams'),
		status: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		let query = ctx.db
			.query('campaigns')
			.withIndex('by_team', (q) => q.eq('teamId', args.teamId));

		if (args.status) {
			query = query.filter((q) => q.eq(q.field('status'), args.status));
		}

		return await query.collect();
	},
});

// Additional utility functions
export const getTeamWithDetails = query({
	args: {
		teamId: v.id('teams'),
	},
	handler: async (ctx, args) => {
		const team = await ctx.db.get(args.teamId);
		if (!team) {
			throw new Error('Team not found');
		}

		const [members, influencers, campaigns] = await Promise.all([
			ctx.db
				.query('teamMembers')
				.withIndex('by_team', (q) => q.eq('teamId', args.teamId))
				.collect(),
			ctx.db
				.query('teamInfluencers')
				.withIndex('by_team', (q) => q.eq('teamId', args.teamId))
				.collect(),
			ctx.db
				.query('campaigns')
				.withIndex('by_team', (q) => q.eq('teamId', args.teamId))
				.collect(),
		]);

		return {
			...team,
			members,
			influencers,
			campaigns,
		};
	},
});

export const createCampaign = mutation({
	args: {
		teamId: v.id('teams'),
		campaignName: v.string(),
		description: v.string(),
		budget: v.object({
			total: v.number(),
			currency: v.string(),
		}),
		startDate: v.number(), // timestamp
		endDate: v.number(), // timestamp
		targetAudience: v.object({
			demographics: v.optional(v.string()),
			interests: v.array(v.string()),
			locations: v.array(v.string()),
		}),
		createdBy: v.string(),
		status: v.optional(v.string()), // defaults to "draft"
	},
	handler: async (ctx, args) => {
		// Verify the team exists
		const team = await ctx.db.get(args.teamId);
		if (!team) {
			throw new Error('Team not found');
		}

		// Check if campaign name already exists for this team
		const existingCampaign = await ctx.db
			.query('campaigns')
			.withIndex('by_team', (q) => q.eq('teamId', args.teamId))
			.filter((q) => q.eq(q.field('campaignName'), args.campaignName))
			.first();

		if (existingCampaign) {
			throw new Error(
				`Campaign with name "${args.campaignName}" already exists for this team`
			);
		}

		// Validate dates
		if (args.startDate >= args.endDate) {
			throw new Error('Start date must be before end date');
		}

		const now = Date.now();
		const result = await ctx.db.insert('campaigns', {
			teamId: args.teamId,
			campaignName: args.campaignName,
			description: args.description,
			budget: args.budget,
			startDate: args.startDate,
			endDate: args.endDate,
			targetAudience: args.targetAudience,
			createdBy: args.createdBy,
			status: args.status || 'draft',
			createdAt: now,
			updatedAt: now,
		});

		return result;
	},
});

export const updateCampaign = mutation({
	args: {
		campaignId: v.id('campaigns'),
		updates: v.object({
			campaignName: v.optional(v.string()),
			description: v.optional(v.string()),
			budget: v.optional(
				v.object({
					total: v.number(),
					currency: v.string(),
				})
			),
			startDate: v.optional(v.number()),
			endDate: v.optional(v.number()),
			status: v.optional(v.string()),
			targetAudience: v.optional(
				v.object({
					demographics: v.optional(v.string()),
					interests: v.array(v.string()),
					locations: v.array(v.string()),
				})
			),
		}),
	},
	handler: async (ctx, args) => {
		const { campaignId, updates } = args;

		// Get the current campaign to validate updates
		const campaign = await ctx.db.get(campaignId);
		if (!campaign) {
			throw new Error('Campaign not found');
		}

		// Validate dates if both are being updated or one is being updated
		if (updates.startDate || updates.endDate) {
			const startDate = updates.startDate ?? campaign.startDate;
			const endDate = updates.endDate ?? campaign.endDate;

			if (startDate >= endDate) {
				throw new Error('Start date must be before end date');
			}
		}

		// Check for duplicate campaign name if updating name
		if (
			updates.campaignName &&
			updates.campaignName !== campaign.campaignName
		) {
			const existingCampaign = await ctx.db
				.query('campaigns')
				.withIndex('by_team', (q) => q.eq('teamId', campaign.teamId))
				.filter((q) => q.eq(q.field('campaignName'), updates.campaignName))
				.first();

			if (existingCampaign) {
				throw new Error(
					`Campaign with name "${updates.campaignName}" already exists for this team`
				);
			}
		}

		await ctx.db.patch(campaignId, {
			...updates,
			updatedAt: Date.now(),
		});
	},
});

export const deleteCampaign = mutation({
	args: {
		campaignId: v.id('campaigns'),
	},
	handler: async (ctx, args) => {
		// You might want to add cascade deletion for related data
		// such as campaign influencers, posts, etc.
		await ctx.db.delete(args.campaignId);
	},
});

export const getCampaign = query({
	args: {
		campaignId: v.id('campaigns'),
	},
	handler: async (ctx, args) => {
		return await ctx.db.get(args.campaignId);
	},
});
// Individual Influencer Functions
export const getInfluencer = query({
	args: {
		influencerId: v.id('influencers'),
	},
	handler: async (ctx, args) => {
		const influencer = await ctx.db.get(args.influencerId);
		if (!influencer) {
			throw new Error('Influencer not found');
		}

		// Get social profiles
		const socialProfiles = await ctx.db
			.query('socialMediaProfiles')
			.withIndex('by_influencer', (q) =>
				q.eq('influencerId', args.influencerId)
			)
			.collect();

		return {
			...influencer,
			socialProfiles,
		};
	},
});

export const createInfluencer = mutation({
	args: {
		email: v.string(),
		firstName: v.string(),
		lastName: v.string(),
		phoneNumber: v.optional(v.string()),
		dateOfBirth: v.optional(v.number()),
		location: v.object({
			city: v.optional(v.string()),
			state: v.optional(v.string()),
			country: v.string(),
			timezone: v.optional(v.string()),
		}),
		bio: v.optional(v.string()),
		website: v.optional(v.string()),
		occupation: v.optional(v.string()),
		expertise: v.optional(v.array(v.string())),
	},
	handler: async (ctx, args) => {
		// Check if influencer with this email already exists
		const existingInfluencer = await ctx.db
			.query('influencers')
			.filter((q) => q.eq(q.field('email'), args.email))
			.first();

		if (existingInfluencer) {
			throw new Error(`Influencer with email ${args.email} already exists`);
		}

		const now = Date.now();
		const result = await ctx.db.insert('influencers', {
			...args,
			verificationStatus: {
				emailVerified: false,
				phoneVerified: false,
				identityVerified: false,
			},
			status: 'active',
			createdAt: now,
			updatedAt: now,
		});

		return result;
	},
});

export const updateInfluencer = mutation({
	args: {
		influencerId: v.id('influencers'),
		updates: v.object({
			firstName: v.optional(v.string()),
			lastName: v.optional(v.string()),
			phoneNumber: v.optional(v.string()),
			dateOfBirth: v.optional(v.number()),
			location: v.optional(
				v.object({
					city: v.optional(v.string()),
					state: v.optional(v.string()),
					country: v.string(),
					timezone: v.optional(v.string()),
				})
			),
			bio: v.optional(v.string()),
			website: v.optional(v.string()),
			occupation: v.optional(v.string()),
			expertise: v.optional(v.array(v.string())),
			status: v.optional(v.string()),
		}),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.influencerId, {
			...args.updates,
			updatedAt: Date.now(),
		});
	},
});

export const deleteInfluencer = mutation({
	args: {
		influencerId: v.id('influencers'),
	},
	handler: async (ctx, args) => {
		// Delete all related social media profiles
		const socialProfiles = await ctx.db
			.query('socialMediaProfiles')
			.withIndex('by_influencer', (q) =>
				q.eq('influencerId', args.influencerId)
			)
			.collect();

		await Promise.all(
			socialProfiles.map((profile) => ctx.db.delete(profile._id))
		);

		// Delete all team-influencer relationships
		const teamInfluencers = await ctx.db
			.query('teamInfluencers')
			.withIndex('by_influencer', (q) =>
				q.eq('influencerId', args.influencerId)
			)
			.collect();

		await Promise.all(teamInfluencers.map((ti) => ctx.db.delete(ti._id)));

		// Finally delete the influencer
		await ctx.db.delete(args.influencerId);
	},
});

// Social Media Profile Functions
export const addSocialMediaProfile = mutation({
	args: {
		influencerId: v.id('influencers'),
		platform: v.string(),
		username: v.string(),
		profileUrl: v.string(),
		isVerified: v.boolean(),
		followerCount: v.number(),
		engagementRate: v.optional(v.number()),
		averageLikes: v.optional(v.number()),
		averageComments: v.optional(v.number()),
		averageShares: v.optional(v.number()),
		averageViews: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		// Check if profile for this platform already exists for this influencer
		const existingProfile = await ctx.db
			.query('socialMediaProfiles')
			.withIndex('by_influencer', (q) =>
				q.eq('influencerId', args.influencerId)
			)
			.filter((q) => q.eq(q.field('platform'), args.platform))
			.first();

		if (existingProfile) {
			throw new Error(
				`${args.platform} profile already exists for this influencer`
			);
		}

		const now = Date.now();
		const result = await ctx.db.insert('socialMediaProfiles', {
			...args,
			lastUpdated: now,
			isActive: true,
		});

		return result;
	},
});

export const updateSocialMediaProfile = mutation({
	args: {
		profileId: v.id('socialMediaProfiles'),
		updates: v.object({
			username: v.optional(v.string()),
			profileUrl: v.optional(v.string()),
			isVerified: v.optional(v.boolean()),
			followerCount: v.optional(v.number()),
			engagementRate: v.optional(v.number()),
			averageLikes: v.optional(v.number()),
			averageComments: v.optional(v.number()),
			averageShares: v.optional(v.number()),
			averageViews: v.optional(v.number()),
			isActive: v.optional(v.boolean()),
		}),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.profileId, {
			...args.updates,
			lastUpdated: Date.now(),
		});
	},
});

export const deleteSocialMediaProfile = mutation({
	args: {
		profileId: v.id('socialMediaProfiles'),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.profileId);
	},
});

// Campaign Assignment Functions (assuming you have a campaignInfluencers table)
export const assignInfluencerToCampaign = mutation({
	args: {
		campaignId: v.id('campaigns'),
		influencerId: v.id('influencers'),
		assignedBy: v.string(),
		agreedRate: v.optional(
			v.object({
				amount: v.number(),
				currency: v.string(),
			})
		),
		deliverables: v.optional(v.array(v.string())),
	},
	handler: async (ctx, args) => {
		// Check if assignment already exists
		const existingAssignment = await ctx.db
			.query('campaignInfluencers')
			.withIndex('by_campaign_influencer', (q) =>
				q
					.eq('campaignId', args.campaignId)
					.eq('influencerId', args.influencerId)
			)
			.first();

		if (existingAssignment) {
			throw new Error('Influencer is already assigned to this campaign');
		}

		const now = Date.now();
		const result = await ctx.db.insert('campaignInfluencers', {
			...args,
			status: 'assigned',
			createdAt: now,
			updatedAt: now,
		});

		return result;
	},
});

export const updateCampaignAssignment = mutation({
	args: {
		assignmentId: v.id('campaignInfluencers'),
		updates: v.object({
			status: v.optional(v.string()),
			agreedRate: v.optional(
				v.object({
					amount: v.number(),
					currency: v.string(),
				})
			),
			deliverables: v.optional(v.array(v.string())),
		}),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.assignmentId, {
			...args.updates,
			updatedAt: Date.now(),
		});
	},
});

export const removeInfluencerFromCampaign = mutation({
	args: {
		assignmentId: v.id('campaignInfluencers'),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.assignmentId);
	},
});
