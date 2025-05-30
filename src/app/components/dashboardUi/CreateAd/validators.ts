// validators.ts
export const validateAdName = (name: string) => {
	if (!name) return 'Ad name is required';
	if (name.length < 3) return 'Ad name must be at least 3 characters';
	if (name.length > 50) return 'Ad name cannot exceed 50 characters';
	return '';
};

export const validateTeamId = (teamId: string) => {
	const teamIdRegex = /^[A-Za-z0-9]{6,10}$/;
	if (!teamId) return 'Team ID is required';
	if (!teamIdRegex.test(teamId)) return 'Invalid Team ID format';
	return '';
};

export const validateCostPerView = (cost: string) => {
	if (cost === '') return '';
	const costNum = parseFloat(cost);
	if (isNaN(costNum) || costNum < 0) return 'Invalid cost';
	return '';
};

export const validateDays = (days: string) => {
	if (days === '') return '';
	const daysNum = parseInt(days, 10);
	if (isNaN(daysNum) || daysNum <= 0 || daysNum > 30)
		return 'Days must be between 1 and 30';
	return '';
};

export const validateAdResource = (type: string, file: File | null) => {
	if (type !== 'Text' && !file)
		return 'Resource file is required for this type';
	return '';
};

export const validateAdDescription = (description: string) => {
	if (!description) return 'Description is required';
	if (description.length < 10)
		return 'Description must be at least 10 characters';
	if (description.length > 500)
		return 'Description cannot exceed 500 characters';
	return '';
};
