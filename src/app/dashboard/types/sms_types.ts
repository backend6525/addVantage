// types/sms.ts
export interface ScheduleData {
	scheduledTime: Date;
	recurrence: RecurrenceType;
	customRecurrence?: {
		interval: number;
		unit: 'day' | 'week' | 'month';
		endAfter?: number;
		endDate?: Date;
	};
	timeZone: string;
	// segments?: Segment[];
	segments?: any[];
	notifications: boolean;
	sendOutsideBusinessHours: boolean;
}

export type RecurrenceType = 'once' | 'daily' | 'weekly' | 'monthly' | 'custom';
