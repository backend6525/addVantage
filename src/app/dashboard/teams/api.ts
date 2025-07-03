import { toast } from 'sonner';
import { Team, Campaign, Influencer, ContentDeliverable } from './types';

export const fetchUser = async () => {
	try {
		const response = await fetch('/api/auth/user');
		if (!response.ok) throw new Error('Failed to fetch user');
		return await response.json();
	} catch (error) {
		console.error('Error fetching user:', error);
		throw error;
	}
};

export const fetchTeams = async (userEmail: string) => {
	try {
		const response = await fetch(
			`/api/teams?email=${encodeURIComponent(userEmail)}`
		);
		if (!response.ok) throw new Error('Failed to fetch teams');
		const teamsData = await response.json();
		return Array.isArray(teamsData) ? teamsData : [];
	} catch (error) {
		console.error('Error fetching teams:', error);
		throw error;
	}
};

export const fetchCampaigns = async (teamId: string) => {
	try {
		const response = await fetch(`/api/teams?teamId=${teamId}&type=campaigns`);
		if (!response.ok) throw new Error('Failed to fetch campaigns');
		const campaignsData = await response.json();
		return Array.isArray(campaignsData) ? campaignsData : [];
	} catch (error) {
		console.error('Error fetching campaigns:', error);
		return [];
	}
};

export const fetchTeamInfluencers = async (teamId: string) => {
	try {
		const response = await fetch(
			`/api/teams?teamId=${teamId}&type=influencers`
		);
		if (!response.ok) throw new Error('Failed to fetch influencers');
		const influencersData = await response.json();
		return Array.isArray(influencersData) ? influencersData : [];
	} catch (error) {
		console.error('Error fetching influencers:', error);
		return [];
	}
};

export const fetchDeliverables = async (
	teamId: string,
	campaignId?: string
) => {
	try {
		const url = campaignId
			? `/api/deliverables?campaignId=${campaignId}`
			: `/api/deliverables?teamId=${teamId}`;
		const response = await fetch(url);
		if (!response.ok) throw new Error('Failed to fetch deliverables');
		const deliverablesData = await response.json();
		return Array.isArray(deliverablesData) ? deliverablesData : [];
	} catch (error) {
		console.error('Error fetching deliverables:', error);
		return [];
	}
};

export const fetchAnalytics = async (teamId: string) => {
	try {
		const response = await fetch(`/api/analytics/team/${teamId}`);
		if (!response.ok) throw new Error('Failed to fetch analytics');
		return await response.json();
	} catch (error) {
		console.error('Error fetching analytics:', error);
		return null;
	}
};

export const createTeam = async (teamData: any, currentUserEmail: string) => {
	try {
		const response = await fetch('/api/teams', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				action: 'createTeam',
				...teamData,
			}),
		});

		if (response.ok) {
			toast.success('Team created successfully!');
			return await fetchTeams(currentUserEmail);
		}
	} catch (error) {
		console.error('Error creating team:', error);
		toast.error('Failed to create team');
		throw error;
	}
};

export const createCampaign = async (teamId: string, campaignData: any) => {
	try {
		const response = await fetch('/api/teams', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				action: 'createCampaign',
				teamId,
				...campaignData,
			}),
		});

		if (response.ok) {
			toast.success('Campaign created successfully!');
			return await fetchCampaigns(teamId);
		}
	} catch (error) {
		console.error('Error creating campaign:', error);
		toast.error('Failed to create campaign');
		throw error;
	}
};

export const assignInfluencer = async (assignmentData: any, teamId: string) => {
	try {
		const response = await fetch('/api/teams', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				action: 'assignInfluencerToCampaign',
				...assignmentData,
			}),
		});

		if (response.ok) {
			toast.success('Influencer assigned successfully!');
			return await fetchCampaigns(teamId);
		}
	} catch (error) {
		console.error('Error assigning influencer:', error);
		toast.error('Failed to assign influencer');
		throw error;
	}
};

export const deleteTeam = async (teamId: string, currentUserEmail: string) => {
	try {
		const response = await fetch('/api/teams', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				action: 'deleteTeam',
				teamId,
			}),
		});

		if (response.ok) {
			toast.success('Team deleted successfully');
			return await fetchTeams(currentUserEmail);
		}
	} catch (error) {
		console.error('Error deleting team:', error);
		toast.error('Failed to delete team');
		throw error;
	}
};

// export const addInfluencer = async (teamId: string, influencerData: any) => {
// 	try {
// 		const response = await fetch('/api/teams', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				action: 'createInfluencerAndAddToTeam',
// 				teamId,
// 				influencerData: influencerData.influencerData,
// 				socialProfiles: influencerData.socialProfiles,
// 			}),
// 		});

// 		if (response.ok) {
// 			toast.success('Influencer added successfully!');
// 			return await fetchTeamInfluencers(teamId);
// 		}
// 	} catch (error) {
// 		console.error('Error adding influencer:', error);
// 		toast.error('Failed to add influencer');
// 		throw error;
// 	}
// };

// export const addInfluencer = async (teamId: string, influencerData: any) => {
// 	try {
// 		const response = await fetch('/api/teams', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				action: 'createInfluencerAndAddToTeam',
// 				teamId,
// 				influencerData: influencerData.influencerData,
// 				socialProfiles: influencerData.socialProfiles,
// 			}),
// 		});

// 		if (!response.ok) {
// 			const errorData = await response.json();
// 			console.error('Backend error:', errorData);
// 			throw new Error(errorData.error || 'Failed to add influencer');
// 		}

// 		const result = await response.json();
// 		console.log('Influencer created:', result);

// 		toast.success('Influencer added successfully!');
// 		return await fetchTeamInfluencers(teamId);
// 	} catch (error) {
// 		console.error('Full error:', error);
// 		toast.error(error.message || 'Failed to add influencer');
// 		throw error;
// 	}
// };
// export const addInfluencer = async (teamId: string, influencerData: any) => {
// 	try {
// 		const response = await fetch('/api/teams', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				action: 'createInfluencerAndAddToTeam',
// 				teamId,
// 				influencerData: {
// 					...influencerData.influencerData,
// 					occupation: influencerData.influencerData.occupation || 'Influencer',
// 					expertise: influencerData.influencerData.expertise || [],
// 				},
// 				socialProfiles: influencerData.socialProfiles,
// 			}),
// 		});

// 		const result = await response.json();
// 		if (!response.ok)
// 			throw new Error(result.error || 'Failed to add influencer');

// 		toast.success('Influencer added successfully!');
// 		return await fetchTeamInfluencers(teamId);
// 	} catch (error) {
// 		console.error('Error details:', {
// 			message: error.message,
// 			stack: error.stack,
// 			data: influencerData,
// 		});
// 		toast.error(`Failed to add influencer: ${error.message}`);
// 		throw error;
// 	}
// };

export const addInfluencer = async (teamId: string, influencerData: any) => {
	try {
		// Prepare the payload with proper data transformations
		const payload = {
			action: 'createInfluencerAndAddToTeam',
			teamId,
			influencerData: {
				...influencerData.influencerData,
				// Convert date string to timestamp if provided
				dateOfBirth: influencerData.influencerData.dateOfBirth
					? new Date(influencerData.influencerData.dateOfBirth).getTime()
					: undefined,
				// Set defaults for optional fields
				occupation: influencerData.influencerData.occupation || 'Influencer',
				expertise: influencerData.influencerData.expertise || [],
				// Ensure location.country exists
				location: {
					...influencerData.influencerData.location,
					country: influencerData.influencerData.location?.country || '',
				},
			},
			// Validate and transform social profiles
			socialProfiles:
				influencerData.socialProfiles?.map((profile) => ({
					platform: profile.platform,
					username: profile.username || profile.handle, // Handle both field names
					profileUrl:
						profile.profileUrl ||
						`https://${profile.platform}.com/${profile.username || profile.handle}`,
					isVerified: Boolean(profile.isVerified),
					followerCount: Number(profile.followerCount) || 0,
					// Optional fields can be added if needed
					...(profile.engagementRate && {
						engagementRate: Number(profile.engagementRate),
					}),
				})) || [],
			tags: [], // Add empty array if not provided
			internalNotes: '', // Default empty string
		};

		const response = await fetch('/api/teams', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});

		const result = await response.json();
		if (!response.ok) {
			throw new Error(result.error || 'Failed to add influencer');
		}

		toast.success('Influencer added successfully!');
		return await fetchTeamInfluencers(teamId);
	} catch (error) {
		console.error('Error details:', {
			message: error.message,
			stack: error.stack,
			inputData: influencerData,
		});
		toast.error(`Failed to add influencer: ${error.message}`);
		throw error;
	}
};

export const createDeliverable = async (
	deliverableData: any,
	teamId: string
) => {
	try {
		const response = await fetch('/api/deliverables', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(deliverableData),
		});

		if (response.ok) {
			toast.success('Deliverable created successfully!');
			return await fetchDeliverables(teamId);
		}
	} catch (error) {
		console.error('Error creating deliverable:', error);
		toast.error('Failed to create deliverable');
		throw error;
	}
};

export const updateTeam = async (
	teamId: string,
	updates: any,
	currentUserEmail: string
) => {
	try {
		const response = await fetch('/api/teams', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				action: 'updateTeam',
				teamId,
				updates,
			}),
		});

		if (response.ok) {
			toast.success('Team updated successfully');
			return await fetchTeams(currentUserEmail);
		}
	} catch (error) {
		console.error('Error updating team:', error);
		toast.error('Failed to update team');
		throw error;
	}
};
