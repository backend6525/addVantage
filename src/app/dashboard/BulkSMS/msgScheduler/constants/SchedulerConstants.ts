// Timezone options
export const TIME_ZONE_OPTIONS = [
	'UTC-12',
	'UTC-11',
	'UTC-10',
	'UTC-9',
	'UTC-8',
	'UTC-7',
	'UTC-6',
	'UTC-5',
	'UTC-4',
	'UTC-3',
	'UTC-2',
	'UTC-1',
	'UTC+0',
	'UTC+1',
	'UTC+2',
	'UTC+3',
	'UTC+4',
	'UTC+5',
	'UTC+6',
	'UTC+7',
	'UTC+8',
	'UTC+9',
	'UTC+10',
	'UTC+11',
	'UTC+12',
];

// Sample audience segments
export const SEGMENT_OPTIONS = [
	{
		id: 'segment1',
		name: 'High-value customers',
		description: 'Customers with lifetime value > $1000',
	},
	{
		id: 'segment2',
		name: 'New users',
		description: 'Users who joined in the last 30 days',
	},
	{
		id: 'segment3',
		name: 'Inactive users',
		description: 'Users without activity in 60+ days',
	},
	{
		id: 'segment4',
		name: 'Enterprise accounts',
		description: 'All users from enterprise-tier accounts',
	},
];

// Batch options
export const BATCH_OPTIONS = [
	{ value: 1, label: 'Send all at once' },
	{ value: 2, label: 'Split into 2 batches' },
	{ value: 3, label: 'Split into 3 batches' },
	{ value: 4, label: 'Split into 4 batches' },
];

// Interval options
export const INTERVAL_OPTIONS = [
	{ value: 15, label: '15 minutes' },
	{ value: 30, label: '30 minutes' },
	{ value: 60, label: '1 hour' },
	{ value: 120, label: '2 hours' },
	{ value: 1440, label: '1 day' },
];
