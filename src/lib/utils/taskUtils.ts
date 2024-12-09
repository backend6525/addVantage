import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus, TaskPriority, Subtask } from '../types/task';

export const createTask = (partial: Partial<Task>): Task => ({
	id: uuidv4(),
	title: partial.title || '',
	description: partial.description || '',
	status: partial.status || TaskStatus.WISHLIST,
	priority: partial.priority || TaskPriority.MEDIUM,
	assignee: partial.assignee,
	dueDate: partial.dueDate,
	project: partial.project || 'Learning Platform',
	subtasks: partial.subtasks || [],
	comments: partial.comments || [],
	attachments: partial.attachments || [],
});

export const getStatusColor = (status: TaskStatus) => {
	const statusColors: Record<TaskStatus, string> = {
		[TaskStatus.WISHLIST]: 'bg-gray-200',
		[TaskStatus.REQUESTED]: 'bg-blue-200',
		[TaskStatus.OUTLINE]: 'bg-yellow-200',
		[TaskStatus.CREATION]: 'bg-green-200',
		[TaskStatus.FIRST_UPDATE]: 'bg-purple-200',
		[TaskStatus.REVIEW]: 'bg-red-200',
	};
	return statusColors[status];
};

export const getPriorityColor = (priority: TaskPriority) => {
	const priorityColors: Record<TaskPriority, string> = {
		[TaskPriority.LOW]: 'text-green-600',
		[TaskPriority.MEDIUM]: 'text-yellow-600',
		[TaskPriority.HIGH]: 'text-orange-600',
		[TaskPriority.CRITICAL]: 'text-red-600',
	};
	return priorityColors[priority];
};
