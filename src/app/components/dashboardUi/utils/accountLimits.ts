// Account limits utility functions
export type AccountType = 'free' | 'pro' | 'enterprise';

export const getDailyLimit = (accountType: AccountType = 'free'): number => {
	switch (accountType) {
		case 'pro':
			return 10;
		case 'enterprise':
			return 50;
		default:
			return 1; // free account
	}
};

export const getWeeklyLimit = (accountType: AccountType = 'free'): number => {
	switch (accountType) {
		case 'pro':
			return 50;
		case 'enterprise':
			return 250;
		default:
			return 5; // free account
	}
};

export const getAccountLimits = (accountType: AccountType = 'free') => {
	return {
		dailyLimit: getDailyLimit(accountType),
		weeklyLimit: getWeeklyLimit(accountType),
	};
};
