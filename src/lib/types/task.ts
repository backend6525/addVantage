export enum TaskStatus {
	WISHLIST = 'WISHLIST',
	REQUESTED = 'REQUESTED',
	OUTLINE = 'OUTLINE',
	CREATION = 'CREATION',
	FIRST_UPDATE = 'FIRST_UPDATE',
	REVIEW = 'REVIEW',
}

export enum TaskPriority {
	LOW = 'Low',
	MEDIUM = 'Medium',
	HIGH = 'High',
	CRITICAL = 'Critical',
}

export interface Task {
	id: string;
	title: string;
	description?: string;
	status: TaskStatus;
	priority: TaskPriority;
	assignee?: string;
	dueDate?: Date;
	project?: string;
	attachments?: string[];
	subtasks?: Subtask[];
	comments?: string[];
}

export enum UserRole {
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	MEMBER = 'MEMBER',
}

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	avatar?: string;
}

export interface Subtask {
	id: string;
	title: string;
	completed: boolean;
}

export interface TaskExtended extends Task {
	subtasks?: Subtask[];
	comments?: string[];
	attachments?: string[];
}
export interface Notification {
	id: string;
	type: 'ASSIGNMENT' | 'STATUS_CHANGE' | 'COMMENT' | 'DUE_DATE';
	taskId: string;
	message: string;
	read: boolean;
	createdAt: Date;
}
