import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TaskHistoryItem {
	id: string;
	task: string;
	status: 'pending' | 'completed' | 'failed';
	result?: string;
	timestamp: Date;
	type: TaskType;
	metadata?: Record<string, any>;
}

export enum TaskType {
	CAMPAIGN_CREATE = 'campaign_create',
	CAMPAIGN_UPDATE = 'campaign_update',
	CAMPAIGN_ANALYZE = 'campaign_analyze',
	REPORT_GENERATE = 'report_generate',
	AUDIENCE_UPDATE = 'audience_update',
	BUDGET_ADJUST = 'budget_adjust',
	CONTENT_CREATE = 'content_create',
	PERFORMANCE_ANALYZE = 'performance_analyze',
	SETTINGS_UPDATE = 'settings_update',
	DATA_EXPORT = 'data_export',
	INTEGRATION_SETUP = 'integration_setup',
	AUTOMATION_CREATE = 'automation_create',
}

interface TaskStore {
	taskHistory: TaskHistoryItem[];
	addTask: (task: TaskHistoryItem) => void;
	updateTaskStatus: (
		id: string,
		status: TaskHistoryItem['status'],
		result?: string
	) => void;
	clearHistory: () => void;
	getTasksByType: (type: TaskType) => TaskHistoryItem[];
	getRecentTasks: (limit?: number) => TaskHistoryItem[];
}

export const useTaskStore = create<TaskStore>()(
	persist(
		(set, get) => ({
			taskHistory: [],

			addTask: (task) =>
				set((state) => ({
					taskHistory: [task, ...state.taskHistory],
				})),

			updateTaskStatus: (id, status, result) =>
				set((state) => ({
					taskHistory: state.taskHistory.map((task) =>
						task.id === id ? { ...task, status, result } : task
					),
				})),

			clearHistory: () => set({ taskHistory: [] }),

			getTasksByType: (type) => {
				return get().taskHistory.filter((task) => task.type === type);
			},

			getRecentTasks: (limit = 10) => {
				return get()
					.taskHistory.sort(
						(a, b) => b.timestamp.getTime() - a.timestamp.getTime()
					)
					.slice(0, limit);
			},
		}),
		{
			name: 'adzpay-task-store',
		}
	)
);
