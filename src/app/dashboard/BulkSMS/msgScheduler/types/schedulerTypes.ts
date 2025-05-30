export type RecurrenceType = 'once' | 'daily' | 'weekly' | 'monthly' | 'custom';

export interface ScheduleOption {
	id: string;
	name: string;
	description: string;
}

export interface ScheduleData {
	scheduledTime: Date;
	recurrence: RecurrenceType;
	timeZone: string;
	notifications: boolean;
	sendOutsideBusinessHours: boolean;
	customRecurrence?: {
		interval: number;
		unit: 'day' | 'week' | 'month';
		endAfter?: number;
		endDate?: Date;
	};
	segments?: {
		segmentId: string;
		name: string;
		count: number;
	}[];
	segmentInterval?: number;
}

export interface SchedulerProps {
	contacts: string[];
	message: string;
	onSchedule: (scheduleData: ScheduleData) => void;
	onCancel: () => void;
}
