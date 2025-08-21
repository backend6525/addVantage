import { LucideIcon } from 'lucide-react';

export interface Publisher {
	id: string;
	name: string;
	email?: string;
	location?: string;
	logoUrl?: string;
	totalAds?: number;
	rating?: number;
	bio?: string;
	socialLinks?: {
		platform: string;
		url: string;
		icon: LucideIcon;
	}[];
}

export interface Product {
	id: string;
	type: string;
	adResourceUrl?: string;
	title: string;
	description: string;
	createdBy?: string;
	costPerView?: string;
	numberOfDaysRunning?: string;
	publisher?: Publisher;
	isPublished?: boolean;
}

export interface ProductDetails extends Product {
	publishDate?: string;
	interestedUsers?: string[];
	rating?: number;
	totalViews?: number;
	isOnline?: boolean;
	targetAudience?: string[];
	targetAudienceDescription?: string;
	adCampaignDetails?: {
		objective: string;
		budget: string;
		platform: string;
		startDate?: string;
		endDate?: string;
		status?: string;
	};
	tags?: string[];
	isPublished?: boolean;
	reviews?: {
		id: string;
		user: string;
		userAvatar?: string;
		rating: number;
		comment: string;
		date: string;
	}[];
	performanceMetrics?: {
		daily: {
			date: string;
			views: number;
			interactions: number;
			conversions: number;
		}[];
		demographics?: {
			age: { group: string; value: number }[];
			gender: { group: string; value: number }[];
			location: { country: string; value: number }[];
		};
	};
	relatedAds?: {
		id: string;
		title: string;
		thumbnailUrl?: string;
	}[];
}

export interface MetricCardProps {
	icon: LucideIcon;
	label: string;
	value: string | number;
	color: string;
}

export interface TabProps {
	label: string;
	icon: LucideIcon;
	content: React.ReactNode;
}
