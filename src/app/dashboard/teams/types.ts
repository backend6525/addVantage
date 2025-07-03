import { ReactNode } from 'react';

export interface Team {
	_id: string;
	teamName: string;
	createdBy: string;
	description?: string;
	industry?: string;
	targetAudience?: string;
	defaultBudget?: {
		min: number;
		max: number;
		currency: string;
	};
	campaignTypes?: string[];
	isActive: boolean;
	createdAt: number;
	updatedAt: number;
}

export interface Campaign {
	_id: string;
	teamId: string;
	campaignName: string;
	description: string;
	budget: {
		total: number;
		currency: string;
	};
	startDate: number;
	endDate: number;
	status: 'draft' | 'active' | 'completed' | 'cancelled';
	targetAudience: {
		demographics?: string;
		interests: string[];
		locations: string[];
	};
	createdBy: string;
	createdAt: number;
	updatedAt: number;
}

export interface SocialProfile {
	_id: string;
	platform: string;
	username: string;
	profileUrl: string;
	isVerified: boolean;
	followerCount: number;
	engagementRate?: number;
	averageLikes?: number;
	averageComments?: number;
	isActive: boolean;
}

export interface InfluencerBusiness {
	contentCategories: string[];
	ratesAndPricing: {
		sponsoredPost?: { min: number; max: number; currency: string };
		story?: { min: number; max: number; currency: string };
		reel?: { min: number; max: number; currency: string };
		ugc?: { min: number; max: number; currency: string };
	};
	availability: {
		isAvailable: boolean;
		workingHours?: string;
		responseTime?: string;
	};
}

export interface Influencer {
	role: ReactNode;
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	location: {
		city?: string;
		state?: string;
		country: string;
		timezone?: string;
	};
	bio?: string;
	website?: string;
	occupation?: string;
	expertise?: string[];
	socialProfiles?: SocialProfile[];
	businessInfo?: InfluencerBusiness;
	status: 'active' | 'inactive' | 'suspended';
}

export interface ContentDeliverable {
	_id: string;
	campaignId: string;
	influencerId: string;
	contentType: string;
	status: 'draft' | 'submitted' | 'approved' | 'published' | 'revision_needed';
	scheduledPostTime?: number;
	actualPostTime?: number;
	performance?: {
		reach?: number;
		impressions?: number;
		engagement?: number;
		clicks?: number;
	};
}
