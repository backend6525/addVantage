'use client';
import React, { useState } from 'react';
import { TaskCard } from '@/app/components/dashboardUi/TaskCard/TaskCard';
import { useTasks } from '@/hooks/useTasks';
import { Task, TaskPriority, TaskStatus } from '@/lib/types/task';
import { PlusCircle } from 'lucide-react';
import TaskDetailsModal from '@/app/components/dashboardUi/TaskDetailsModel/TaskDetailsModel';

const columnColors = {
	[TaskStatus.WISHLIST]: 'bg-gray-800 hover:bg-gray-700',
	[TaskStatus.REQUESTED]: 'bg-blue-900/30 hover:bg-blue-900/50',
	[TaskStatus.OUTLINE]: 'bg-yellow-900/30 hover:bg-yellow-900/50',
	[TaskStatus.CREATION]: 'bg-green-900/30 hover:bg-green-900/50',
	[TaskStatus.FIRST_UPDATE]: 'bg-purple-900/30 hover:bg-purple-900/50',
	[TaskStatus.REVIEW]: 'bg-pink-900/30 hover:bg-pink-900/50',
};

export const KanbanBoard: React.FC = () => {
	const { tasks, moveTask, updateTask, addTask } = useTasks();
	const [draggedTask, setDraggedTask] = useState<Task | null>(null);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [isAddingTask, setIsAddingTask] = useState(false);

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
		setDraggedTask(task);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDrop = (
		e: React.DragEvent<HTMLDivElement>,
		status: TaskStatus
	) => {
		e.preventDefault();
		if (draggedTask) {
			moveTask(draggedTask.id, status);
		}
		setDraggedTask(null);
	};

	const handleAddTask = (status: TaskStatus) => {
		const newTask = addTask({
			title: 'New Task',
			description: '',
			status: status,
			priority: TaskPriority.MEDIUM,
		});
		setSelectedTask(newTask);
	};

	const renderColumn = (status: TaskStatus) => {
		const columnTasks = tasks.filter((task) => task.status === status);

		return (
			<div
				className={`rounded-2xl p-4 min-h-[600px] shadow-xl border border-gray-700 transition-colors duration-200 ${columnColors[status]}`}
				onDragOver={handleDragOver}
				onDrop={(e) => handleDrop(e, status)}>
				<div className='flex justify-between items-center mb-4'>
					<div>
						<h2 className='font-semibold text-white capitalize'>
							{status.toLowerCase().replace('_', ' ')}
						</h2>
						<span className='text-sm text-gray-400'>
							{columnTasks.length} tasks
						</span>
					</div>
					<button
						onClick={() => handleAddTask(status)}
						className='p-2 rounded-full hover:bg-gray-700 transition-colors duration-200'>
						<PlusCircle className='h-5 w-5 text-gray-400 hover:text-blue-500' />
					</button>
				</div>

				<div className='space-y-3'>
					{columnTasks.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							onDragStart={handleDragStart}
							onOpenDetails={setSelectedTask}
						/>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className='bg-gray-900 min-h-screen p-8'>
			<div className='grid grid-cols-6 gap-4'>
				{Object.values(TaskStatus).map((status) => (
					<div key={status}>{renderColumn(status)}</div>
				))}
			</div>

			{selectedTask && (
				<TaskDetailsModal
					task={selectedTask}
					onClose={() => setSelectedTask(null)}
					onUpdate={(updates) => {
						updateTask(selectedTask.id, updates);
						setSelectedTask(null);
					}}
				/>
			)}
		</div>
	);
};
