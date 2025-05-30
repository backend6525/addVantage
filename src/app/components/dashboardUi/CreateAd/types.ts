// types.ts
export type CreateAdPayload = {
	adName: string;
	teamId: string;
	createdBy: string;
	type: string;
	costPerView: string;
	numberOfDaysRunning: string;
	adResourceUrl: string | null;
	description: string;
};

export interface CreateProps {
	onCreateAd: (counts: { dailyCount: number; weeklyCount: number }) => void;
	isMenuOpen: boolean;
	dailyAdCount: number;
	weeklyAdCount: number;
	hasCredits: boolean;
	userEmail: string;
}

export type FormErrors = {
	adName: string;
	teamId: string;
	costPerView: string;
	numberOfDaysRunning: string;
	adResource: string;
	description: string;
	type: string;
};
