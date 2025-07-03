import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get('email');
	const teamId = searchParams.get('teamId');
	const type = searchParams.get('type'); // 'members', 'influencers', 'campaigns', 'details', etc.
	const status = searchParams.get('status');
	const influencerId = searchParams.get('influencerId');
	const campaignId = searchParams.get('campaignId');

	const { getUser, getAccessToken } = getKindeServerSession();
	const user = await getUser();

	// If fetching team details with all related data
	if (teamId && type === 'details') {
		try {
			const teamDetails = await convex.query(api.teams.getTeamWithDetails, {
				teamId,
			});
			return NextResponse.json(teamDetails);
		} catch (error) {
			console.error('Error fetching team details:', error);
			return NextResponse.json(
				{ error: 'Failed to fetch team details' },
				{ status: 500 }
			);
		}
	}

	// If teamId is provided, fetch team data based on type
	if (teamId) {
		const accessToken = await getAccessToken();
		if (!accessToken) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		try {
			if (type === 'influencers') {
				const influencers = await convex.query(api.teams.getTeamInfluencers, {
					teamId,
					...(status && { status }),
				});
				return NextResponse.json(influencers);
			} else if (type === 'members') {
				const members = await convex.query(api.teams.getTeamMembers, {
					teamId,
					...(status && { status }),
				});
				return NextResponse.json(members);
			} else if (type === 'campaigns') {
				const campaigns = await convex.query(api.teams.getTeamCampaigns, {
					teamId,
					...(status && { status }),
				});
				return NextResponse.json(campaigns);
			} else {
				// Default to team info
				const team = await convex.query(api.teams.getTeam, { teamId });
				return NextResponse.json(team);
			}
		} catch (error) {
			console.error('Error fetching team data:', error);
			return NextResponse.json(
				{ error: 'Failed to fetch team data' },
				{ status: 500 }
			);
		}
	}

	// If fetching influencer details
	if (influencerId) {
		try {
			const influencer = await convex.query(api.teams.getInfluencer, {
				influencerId,
			});
			return NextResponse.json(influencer);
		} catch (error) {
			console.error('Error fetching influencer:', error);
			return NextResponse.json(
				{ error: 'Failed to fetch influencer' },
				{ status: 500 }
			);
		}
	}

	// If fetching campaign details
	if (campaignId) {
		try {
			const campaign = await convex.query(api.teams.getCampaign, {
				campaignId,
			});
			return NextResponse.json(campaign);
		} catch (error) {
			console.error('Error fetching campaign:', error);
			return NextResponse.json(
				{ error: 'Failed to fetch campaign' },
				{ status: 500 }
			);
		}
	}

	// If email is provided, fetch teams for user
	if (email) {
		if (!user || user.email !== email) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		try {
			const teams = await convex.query(api.teams.getTeam, { email });
			return NextResponse.json(teams);
		} catch (error) {
			console.error('Error fetching teams:', error);
			return NextResponse.json(
				{ error: 'Failed to fetch teams' },
				{ status: 500 }
			);
		}
	}

	return NextResponse.json(
		{ error: 'Missing required parameters' },
		{ status: 400 }
	);
}

export async function POST(request: Request) {
	const { getUser, getAccessToken } = getKindeServerSession();
	const accessToken = await getAccessToken();
	const user = await getUser();

	if (!accessToken || !user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { action, ...data } = body;

		switch (action) {
			case 'createTeam':
				const teamId = await convex.mutation(api.teams.createTeam, {
					teamName: data.teamName,
					createdBy: user.email!,
					description: data.description,
					industry: data.industry,
					targetAudience: data.targetAudience,
					defaultBudget: data.defaultBudget,
					campaignTypes: data.campaignTypes,
				});
				return NextResponse.json({ teamId, success: true });

			case 'updateTeam':
				await convex.mutation(api.teams.updateTeam, {
					teamId: data.teamId,
					updates: data.updates,
				});
				return NextResponse.json({ success: true });

			case 'addTeamMember':
				const memberId = await convex.mutation(api.teams.addTeamMember, {
					teamId: data.teamId,
					email: data.email,
					firstName: data.firstName,
					lastName: data.lastName,
					role: data.role,
					invitedBy: user.email!,
				});
				return NextResponse.json({ memberId, success: true });

			case 'updateTeamMember':
				await convex.mutation(api.teams.updateTeamMember, {
					memberId: data.memberId,
					updates: data.updates,
				});
				return NextResponse.json({ success: true });

			// case 'createInfluencer':
			// 	const influencerId = await convex.mutation(api.teams.createInfluencer, {
			// 		email: data.email,
			// 		firstName: data.firstName,
			// 		lastName: data.lastName,
			// 		phoneNumber: data.phoneNumber,
			// 		dateOfBirth: data.dateOfBirth,
			// 		location: data.location,
			// 		bio: data.bio,
			// 		website: data.website,
			// 		occupation: data.occupation,
			// 		expertise: data.expertise,
			// 	});
			// 	return NextResponse.json({ influencerId, success: true });
			// case 'createInfluencerAndAddToTeam':
			// 	console.log('Creating influencer with data:', data);
			// 	try {
			// 		const { influencerId: newInfluencerId, relationId: newRelationId } =
			// 			await convex.mutation(api.teams.createInfluencerAndAddToTeam, {
			// 				teamId: data.teamId,
			// 				addedBy: user.email!,
			// 				influencerData: data.influencerData,
			// 				socialProfiles: data.socialProfiles,
			// 				tags: data.tags || [],
			// 				internalNotes: data.internalNotes || '',
			// 			});
			// 		console.log('Influencer created successfully');
			// 		return NextResponse.json({
			// 			influencerId: newInfluencerId,
			// 			relationId: newRelationId,
			// 			success: true,
			// 		});
			// 	} catch (error) {
			// 		console.error('Error in createInfluencerAndAddToTeam:', error);
			// 		return NextResponse.json(
			// 			{ error: 'Failed to create influencer' },
			// 			{ status: 500 }
			// 		);
			// 	}

			// case 'createInfluencerAndAddToTeam':
			// 	console.log('Received data:', data);
			// 	try {
			// 		console.log('Calling Convex mutation...');
			// 		const result = await convex.mutation(
			// 			api.teams.createInfluencerAndAddToTeam,
			// 			{
			// 				teamId: data.teamId,
			// 				addedBy: user.email!,
			// 				influencerData: {
			// 					...data.influencerData,
			// 					occupation: data.influencerData.occupation || 'Influencer',
			// 					expertise: data.influencerData.expertise || [],
			// 				},
			// 				socialProfiles: data.socialProfiles,
			// 			}
			// 		);
			// 		console.log('Mutation successful:', result);
			// 		return NextResponse.json(result);
			// 	} catch (error) {
			// 		console.error('Mutation failed:', error);
			// 		return NextResponse.json(
			// 			{ error: error.message || 'Failed to create influencer' },
			// 			{ status: 500 }
			// 		);
			// 	}
			case 'createInfluencerAndAddToTeam':
				console.log('Received data:', data);
				try {
					// Validate required fields
					if (!data.teamId || !data.influencerData?.email) {
						throw new Error('Missing required fields');
					}

					// Prepare the influencer data
					const influencerData = {
						...data.influencerData,
						// Convert date string to timestamp if provided
						dateOfBirth: data.influencerData.dateOfBirth
							? new Date(data.influencerData.dateOfBirth).getTime()
							: undefined,
						// Set defaults for optional fields
						occupation: data.influencerData.occupation || '',
						expertise: data.influencerData.expertise || [],
						// Ensure country is provided in location
						location: {
							...data.influencerData.location,
							country: data.influencerData.location.country || '',
						},
					};

					// Validate and prepare social profiles
					const socialProfiles =
						data.socialProfiles?.map((profile) => ({
							platform: profile.platform,
							username: profile.username || profile.handle, // Handle both field names
							profileUrl:
								profile.profileUrl ||
								`https://${profile.platform}.com/${profile.username}`,
							isVerified: Boolean(profile.isVerified),
							followerCount: Number(profile.followerCount) || 0,
							// Optional engagement metrics
							...(profile.engagementRate && {
								engagementRate: Number(profile.engagementRate),
							}),
							...(profile.averageLikes && {
								averageLikes: Number(profile.averageLikes),
							}),
							// Include other optional metrics as needed
						})) || [];

					console.log('Calling Convex mutation with prepared data...');
					const result = await convex.mutation(
						api.teams.createInfluencerAndAddToTeam,
						{
							teamId: data.teamId,
							addedBy: user.email!,
							influencerData,
							socialProfiles,
							tags: data.tags || [],
							internalNotes: data.internalNotes || '',
						}
					);

					console.log('Mutation successful:', result);
					return NextResponse.json(result);
				} catch (error) {
					console.error('Detailed error:', {
						message: error.message,
						stack: error.stack,
						inputData: data,
					});
					return NextResponse.json(
						{
							error: error.message || 'Failed to create influencer',
							details:
								process.env.NODE_ENV === 'development'
									? error.stack
									: undefined,
						},
						{ status: 500 }
					);
				}

			case 'updateInfluencer':
				await convex.mutation(api.teams.updateInfluencer, {
					influencerId: data.influencerId,
					updates: data.updates,
				});
				return NextResponse.json({ success: true });

			case 'addSocialMediaProfile':
				const profileId = await convex.mutation(
					api.teams.addSocialMediaProfile,
					{
						influencerId: data.influencerId,
						platform: data.platform,
						username: data.username,
						profileUrl: data.profileUrl,
						isVerified: data.isVerified || false,
						followerCount: data.followerCount,
						engagementRate: data.engagementRate,
						averageLikes: data.averageLikes,
						averageComments: data.averageComments,
						averageShares: data.averageShares,
						averageViews: data.averageViews,
					}
				);
				return NextResponse.json({ profileId, success: true });

			case 'addInfluencerToTeam':
				const relationId = await convex.mutation(
					api.teams.addInfluencerToTeam,
					{
						teamId: data.teamId,
						influencerId: data.influencerId,
						addedBy: user.email!,
						tags: data.tags,
						internalNotes: data.internalNotes,
					}
				);
				return NextResponse.json({ relationId, success: true });

			case 'updateTeamInfluencer':
				await convex.mutation(api.teams.updateTeamInfluencer, {
					relationId: data.relationId,
					updates: data.updates,
				});
				return NextResponse.json({ success: true });

			case 'createInfluencerAndAddToTeam':
				const { influencerId: newInfluencerId, relationId: newRelationId } =
					await convex.mutation(api.teams.createInfluencerAndAddToTeam, {
						teamId: data.teamId,
						addedBy: user.email!,
						influencerData: data.influencerData,
						socialProfiles: data.socialProfiles,
						tags: data.tags,
						internalNotes: data.internalNotes,
					});
				return NextResponse.json({
					influencerId: newInfluencerId,
					relationId: newRelationId,
					success: true,
				});

			case 'createCampaign':
				const campaignId = await convex.mutation(api.teams.createCampaign, {
					teamId: data.teamId,
					campaignName: data.campaignName,
					description: data.description,
					budget: data.budget,
					startDate: data.startDate,
					endDate: data.endDate,
					targetAudience: data.targetAudience,
					createdBy: user.email!,
				});
				return NextResponse.json({ campaignId, success: true });

			case 'assignInfluencerToCampaign':
				const assignmentId = await convex.mutation(
					api.teams.assignInfluencerToCampaign,
					{
						campaignId: data.campaignId,
						influencerId: data.influencerId,
						assignedBy: user.email!,
						agreedRate: data.agreedRate,
						deliverables: data.deliverables,
					}
				);
				return NextResponse.json({ assignmentId, success: true });

			default:
				return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
		}
	} catch (error) {
		console.error('Error in POST request:', error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Operation failed' },
			{ status: 500 }
		);
	}
}

export async function PUT(request: Request) {
	const { getUser, getAccessToken } = getKindeServerSession();
	const accessToken = await getAccessToken();
	const user = await getUser();

	if (!accessToken || !user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { action, ...data } = body;

		switch (action) {
			case 'updateSocialMediaProfile':
				await convex.mutation(api.teams.updateSocialMediaProfile, {
					profileId: data.profileId,
					updates: {
						username: data.username,
						profileUrl: data.profileUrl,
						isVerified: data.isVerified,
						followerCount: data.followerCount,
						engagementRate: data.engagementRate,
						averageLikes: data.averageLikes,
						averageComments: data.averageComments,
						averageShares: data.averageShares,
						averageViews: data.averageViews,
					},
				});
				return NextResponse.json({ success: true });

			case 'updateCampaign':
				await convex.mutation(api.teams.updateCampaign, {
					campaignId: data.campaignId,
					updates: data.updates,
				});
				return NextResponse.json({ success: true });

			case 'updateCampaignAssignment':
				await convex.mutation(api.teams.updateCampaignAssignment, {
					assignmentId: data.assignmentId,
					updates: data.updates,
				});
				return NextResponse.json({ success: true });

			default:
				return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
		}
	} catch (error) {
		console.error('Error in PUT request:', error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Update failed' },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: Request) {
	const { getUser, getAccessToken } = getKindeServerSession();
	const accessToken = await getAccessToken();
	const user = await getUser();

	if (!accessToken || !user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { action, ...data } = body;

		switch (action) {
			case 'deleteTeam':
				await convex.mutation(api.teams.deleteTeam, {
					teamId: data.teamId,
				});
				return NextResponse.json({ success: true });

			case 'removeTeamMember':
				await convex.mutation(api.teams.removeTeamMember, {
					memberId: data.memberId,
				});
				return NextResponse.json({ success: true });

			case 'removeInfluencerFromTeam':
				await convex.mutation(api.teams.removeInfluencerFromTeam, {
					relationId: data.relationId,
				});
				return NextResponse.json({ success: true });

			case 'deleteInfluencer':
				await convex.mutation(api.teams.deleteInfluencer, {
					influencerId: data.influencerId,
				});
				return NextResponse.json({ success: true });

			case 'deleteSocialMediaProfile':
				await convex.mutation(api.teams.deleteSocialMediaProfile, {
					profileId: data.profileId,
				});
				return NextResponse.json({ success: true });

			case 'deleteCampaign':
				await convex.mutation(api.teams.deleteCampaign, {
					campaignId: data.campaignId,
				});
				return NextResponse.json({ success: true });

			case 'removeInfluencerFromCampaign':
				await convex.mutation(api.teams.removeInfluencerFromCampaign, {
					assignmentId: data.assignmentId,
				});
				return NextResponse.json({ success: true });

			default:
				return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
		}
	} catch (error) {
		console.error('Error in DELETE request:', error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Delete failed' },
			{ status: 500 }
		);
	}
}
