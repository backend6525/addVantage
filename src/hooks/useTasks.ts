// import { useState, useCallback } from 'react';
// import {
// 	Task,
// 	TaskStatus,
// 	TaskPriority,
// 	Notification,
// 	User,
// 	UserRole,
// } from '@/lib/types/task';
// import { createTask } from '@/lib/utils/taskUtils';
// import { v4 as uuidv4 } from 'uuid';

// export const useTasks = () => {
// 	const [tasks, setTasks] = useState<Task[]>([
// 		createTask({
// 			title: 'Test Driven Development',
// 			status: TaskStatus.WISHLIST,
// 			assignee: 'JD',
// 		}),
// 		createTask({
// 			title: 'Design Pattern',
// 			status: TaskStatus.REQUESTED,
// 			assignee: 'SM',
// 		}),
// 	]);

// 	const [notifications, setNotifications] = useState<Notification[]>([]);

// 	const [currentUser, setCurrentUser] = useState<User>({
// 		id: uuidv4(),
// 		name: 'John Doe',
// 		email: 'john@example.com',
// 		role: UserRole.ADMIN,
// 	});

// 	const addTask = useCallback((taskData: Partial<Task>) => {
// 		const newTask = createTask(taskData);
// 		setTasks((prevTasks) => [...prevTasks, newTask]);
// 	}, []);

// 	const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
// 		setTasks(
// 			tasks.map((task) =>
// 				task.id === taskId ? { ...task, status: newStatus } : task
// 			)
// 		);
// 	};

// 	const getTasksByStatus = () => {
// 		return Object.values(TaskStatus).reduce(
// 			(acc, status) => {
// 				acc[status] = tasks.filter((task) => task.status === status);
// 				return acc;
// 			},
// 			{} as Record<TaskStatus, Task[]>
// 		);
// 	};

// 	return { tasks, addTask, updateTaskStatus, getTasksByStatus };
// };

import { useState, useCallback } from 'react';
import {
	Task,
	TaskStatus,
	TaskPriority,
	Notification,
	User,
	UserRole,
} from '@/lib/types/task';
import { createTask } from '@/lib/utils/taskUtils';
import { v4 as uuidv4 } from 'uuid';

export const useTasks = () => {
	const [tasks, setTasks] = useState<Task[]>([
		createTask({
			title: 'Test Driven Development',
			status: TaskStatus.WISHLIST,
			assignee: 'JD',
		}),
		createTask({
			title: 'Design Pattern',
			status: TaskStatus.REQUESTED,
			assignee: 'SM',
		}),
	]);

	const [notifications, setNotifications] = useState<Notification[]>([]);

	const [currentUser, setCurrentUser] = useState<User>({
		id: uuidv4(),
		name: 'John Doe',
		email: 'john@example.com',
		role: UserRole.ADMIN,
	});

	const addTask = useCallback((taskData: Partial<Task>) => {
		const newTask = createTask(taskData);
		setTasks((prevTasks) => [...prevTasks, newTask]);

		// Create notification
		const notification: Notification = {
			id: uuidv4(),
			type: 'ASSIGNMENT',
			taskId: newTask.id,
			message: `New task "${newTask.title}" created`,
			read: false,
			createdAt: new Date(),
		};
		setNotifications((prevNotifications) => [
			...prevNotifications,
			notification,
		]);

		return newTask;
	}, []);

	const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId ? { ...task, ...updates } : task
			)
		);
	}, []);

	const deleteTask = useCallback((taskId: string) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
	}, []);

	const moveTask = useCallback((taskId: string, newStatus: TaskStatus) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId ? { ...task, status: newStatus } : task
			)
		);
	}, []);

	const addSubtask = useCallback((taskId: string, subtaskTitle: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => {
				if (task.id === taskId) {
					const newSubtask = {
						id: uuidv4(),
						title: subtaskTitle,
						completed: false,
					};
					return {
						...task,
						subtasks: [...(task.subtasks || []), newSubtask],
					};
				}
				return task;
			})
		);
	}, []);

	const filterTasks = useCallback(
		(filters: Partial<Task>) => {
			return tasks.filter((task) =>
				Object.entries(filters).every(
					([key, value]) => task[key as keyof Task] === value
				)
			);
		},
		[tasks]
	);
	const updateTaskStatus = (taskId: string, status: TaskStatus) => {
		updateTask(taskId, { status });
	};

	const searchTasks = useCallback(
		(query: string) => {
			return tasks.filter(
				(task) =>
					task.title.toLowerCase().includes(query.toLowerCase()) ||
					task.description?.toLowerCase().includes(query.toLowerCase())
			);
		},
		[tasks]
	);

	return {
		tasks,
		currentUser,
		notifications,
		addTask,
		updateTask,
		deleteTask,
		moveTask,
		addSubtask,
		filterTasks,
		searchTasks,
		updateTaskStatus,
	};
};
