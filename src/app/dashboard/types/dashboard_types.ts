// types.ts
export interface Product {
	id: string;
	type: string;
	adResourceUrl?: string;
	title: string;
	description: string;
	costPerView?: string;
	numberOfDaysRunning?: string;
	isPublished?: boolean;
	performance?: {
		views: number;
		clicks: number;
		ctr: number;
	};
	createdBy: string;
	startDate?: string;
	duration: number;
	isActive: boolean;
	daysRemaining?: number;
}

export interface KindeUser {
	email?: string;
	given_name?: string;
	family_name?: string;
}

export interface DashboardProps {
	isMenuOpen: boolean;
	user: KindeUser;
}
