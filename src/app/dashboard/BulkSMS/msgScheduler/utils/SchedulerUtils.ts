/**
 * Format date for the date input
 */
export const formatDateForInput = (date: Date): string => {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

/**
 * Generate a random count between min and max
 */
export const generateRandomCount = (
	min: number = 50,
	max: number = 500
): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Check if a step is complete based on current values
 */
export const isStepComplete = (
	step: number,
	{
		scheduledDate,
		scheduledTime,
		recurrence,
		customInterval,
		endAfterOccurrences,
		endDate,
		segmented,
		selectedSegments,
	}: {
		scheduledDate: string;
		scheduledTime: string;
		recurrence: string;
		customInterval: number;
		endAfterOccurrences: number | null;
		endDate: string;
		segmented: boolean;
		selectedSegments: any[];
	}
) => {
	if (step === 1) {
		return scheduledDate && scheduledTime;
	} else if (step === 2) {
		if (recurrence === 'custom') {
			// Must have interval and either end date or end after occurrences
			return customInterval > 0 && (endAfterOccurrences !== null || endDate);
		}
		return true;
	} else if (step === 3) {
		if (segmented) {
			return selectedSegments.length > 0;
		}
		return true;
	}
	return false;
};
