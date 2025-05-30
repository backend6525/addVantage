import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	X,
	Check,
	Plus,
	Trash2,
	Send,
	MessageCircle,
	AlignLeft,
	CheckSquare,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus, TaskPriority } from '@/lib/types/task';

interface TaskDetailsPageProps {
	task: Task;
	onUpdate: (updates: Partial<Task>) => void;
	onClose: () => void;
}

const TaskDetailsPage: React.FC<TaskDetailsPageProps> = ({
	task,
	onUpdate,
	onClose,
}) => {
	// State Management
	const [editedTask, setEditedTask] = useState<Partial<Task>>(task);
	const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
	const [isModified, setIsModified] = useState(false);
	const [activeTab, setActiveTab] = useState('Subtasks');
	const [newComment, setNewComment] = useState('');

	// Simulated Activities
	const [activities, setActivities] = useState([
		{
			id: '1',
			user: 'Jane Smith',
			action: 'Added subtask "Write unit tests"',
			timestamp: '2 hours ago',
		},
	]);

	// Track Changes
	useEffect(() => {
		const hasChanges = JSON.stringify(task) !== JSON.stringify(editedTask);
		setIsModified(hasChanges);
	}, [editedTask, task]);

	// Subtask Management
	const handleAddSubtask = () => {
		const trimmedTitle = newSubtaskTitle.trim();
		if (trimmedTitle) {
			const updatedSubtasks = [
				...(editedTask.subtasks || []),
				{
					id: uuidv4(),
					title: trimmedTitle,
					completed: false,
				},
			];
			setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
			setNewSubtaskTitle('');
		}
	};

	const handleDeleteSubtask = (subtaskId: string) => {
		const updatedSubtasks = (editedTask.subtasks || []).filter(
			(subtask) => subtask.id !== subtaskId
		);
		setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
	};

	const handleToggleSubtask = (subtaskId: string) => {
		const updatedSubtasks = (editedTask.subtasks || []).map((subtask) =>
			subtask.id === subtaskId
				? { ...subtask, completed: !subtask.completed }
				: subtask
		);
		setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
	};

	// Comment Management
	const handleAddComment = () => {
		if (newComment.trim()) {
			const newActivityEntry = {
				id: uuidv4(),
				user: 'Current User',
				action: newComment,
				timestamp: 'Just now',
			};
			setActivities([newActivityEntry, ...activities]);
			setNewComment('');
		}
	};

	// Save Handler
	const handleSave = () => {
		if (!editedTask.title?.trim()) {
			alert('Task title cannot be empty');
			return;
		}

		const updatedTaskWithTimestamp = {
			...editedTask,
			updatedAt: new Date().toISOString(),
		};

		onUpdate(updatedTaskWithTimestamp);
		onClose();
	};

	// Tabs for Right Panel
	const tabs = [
		{
			icon: <MessageCircle className='w-5 h-5' />,
			name: 'Activity',
		},
		{
			icon: <CheckSquare className='w-5 h-5' />,
			name: 'Subtasks',
		},
		{
			icon: <AlignLeft className='w-5 h-5' />,
			name: 'Description',
		},
	];

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4'>
			<motion.div
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				className='w-full max-w-6xl h-[90vh] bg-gray-900 rounded-2xl overflow-hidden grid grid-cols-3 shadow-2xl border border-gray-700'>
				{/* Left Panel: Task Details */}
				<div className='col-span-2 p-8 overflow-y-auto bg-gray-800/60 backdrop-blur-sm border-r border-gray-700 space-y-6'>
					{/* Top Navigation */}
					<div className='flex justify-between items-center'>
						<div className='text-sm text-gray-400'>Task Management</div>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={onClose}
							className='text-gray-400 hover:text-white'>
							<X className='w-6 h-6' />
						</motion.button>
					</div>

					{/* Task Title */}
					<input
						value={editedTask.title || ''}
						onChange={(e) =>
							setEditedTask({ ...editedTask, title: e.target.value })
						}
						className='w-full bg-transparent text-3xl font-bold text-white border-b border-gray-700 pb-2 focus:outline-none'
						placeholder='Enter task title'
					/>

					{/* Status and Priority */}
					<div className='grid grid-cols-2 gap-6'>
						<div>
							<label className='block text-sm text-gray-400 mb-2'>Status</label>
							<select
								value={editedTask.status}
								onChange={(e) =>
									setEditedTask({
										...editedTask,
										status: e.target.value as TaskStatus,
									})
								}
								className='w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600'>
								{Object.values(TaskStatus).map((status) => (
									<option key={status} value={status}>
										{status.toLowerCase().replace('_', ' ')}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className='block text-sm text-gray-400 mb-2'>
								Priority
							</label>
							<select
								value={editedTask.priority}
								onChange={(e) =>
									setEditedTask({
										...editedTask,
										priority: e.target.value as TaskPriority,
									})
								}
								className='w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600'>
								{Object.values(TaskPriority).map((priority) => (
									<option key={priority} value={priority}>
										{priority.toLowerCase()}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Save Button */}
					<div className='flex justify-end'>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleSave}
							disabled={!isModified}
							className='px-6 py-3 bg-blue-600 text-white rounded-lg 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all hover:bg-blue-700'>
							{isModified ? 'Save Changes' : 'No Changes'}
						</motion.button>
					</div>
				</div>

				{/* Right Panel: Dynamic Content */}
				<div className='col-span-1 bg-gray-900 flex flex-col'>
					{/* Tabs */}
					<div className='flex border-b border-gray-800'>
						{tabs.map((tab) => (
							<motion.button
								key={tab.name}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setActiveTab(tab.name)}
								className={`
                  flex-1 py-4 flex items-center justify-center space-x-2
                  ${
										activeTab === tab.name
											? 'bg-gray-800 text-white'
											: 'text-gray-500 hover:bg-gray-800/50'
									}
                `}>
								{tab.icon}
								<span className='text-sm'>{tab.name}</span>
							</motion.button>
						))}
					</div>

					{/* Tab Content */}
					<div className='flex-grow overflow-y-auto p-6 relative'>
						{activeTab === 'Activity' && (
							<div className='space-y-4'>
								{activities.map((activity) => (
									<motion.div
										key={activity.id}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										className='bg-gray-800 p-3 rounded-lg'>
										<p className='text-white text-sm'>{activity.action}</p>
										<p className='text-xs text-gray-500 italic'>
											{activity.timestamp}
										</p>
									</motion.div>
								))}
							</div>
						)}

						{activeTab === 'Subtasks' && (
							<div>
								<div className='flex space-x-2 mb-4'>
									<input
										type='text'
										value={newSubtaskTitle}
										onChange={(e) => setNewSubtaskTitle(e.target.value)}
										placeholder='Add new subtask'
										className='flex-grow bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700'
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												handleAddSubtask();
											}
										}}
									/>
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										onClick={handleAddSubtask}
										disabled={!newSubtaskTitle.trim()}
										className='bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50'>
										<Plus className='w-5 h-5' />
									</motion.button>
								</div>
								<AnimatePresence>
									{editedTask.subtasks?.map((subtask) => (
										<motion.div
											key={subtask.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											className='flex items-center space-x-2 bg-gray-800 p-3 rounded-lg mb-2'>
											<motion.button
												whileTap={{ scale: 0.9 }}
												onClick={() => handleToggleSubtask(subtask.id)}
												className={`
                          p-1 rounded-full transition-all
                          ${
														subtask.completed
															? 'bg-green-500 text-white'
															: 'bg-gray-600 text-gray-300'
													}
                        `}>
												<Check size={16} />
											</motion.button>
											<input
												type='text'
												value={subtask.title}
												onChange={(e) => {
													const updatedSubtasks = (
														editedTask.subtasks || []
													).map((s) =>
														s.id === subtask.id
															? { ...s, title: e.target.value }
															: s
													);
													setEditedTask({
														...editedTask,
														subtasks: updatedSubtasks,
													});
												}}
												className={`
                          flex-grow bg-transparent text-white
                          ${subtask.completed ? 'line-through text-gray-500' : ''}
                          focus:outline-none
                        `}
											/>
											<motion.button
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												onClick={() => handleDeleteSubtask(subtask.id)}
												className='text-red-500 hover:bg-red-500/20 p-1 rounded-full'>
												<Trash2 size={16} />
											</motion.button>
										</motion.div>
									))}
								</AnimatePresence>
							</div>
						)}

						{activeTab === 'Description' && (
							<textarea
								value={editedTask.description || ''}
								onChange={(e) =>
									setEditedTask({ ...editedTask, description: e.target.value })
								}
								className='w-full h-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 resize-none'
								placeholder='Detailed task description...'
							/>
						)}
					</div>

					{/* Comment Input */}
					{activeTab === 'Activity' && (
						<div className='p-4 border-t border-gray-800 flex space-x-2'>
							<input
								type='text'
								placeholder='Add a comment...'
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handleAddComment();
									}
								}}
								className='flex-grow bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700'
							/>
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={handleAddComment}
								disabled={!newComment.trim()}
								className='bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50'>
								<Send className='w-5 h-5' />
							</motion.button>
						</div>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default TaskDetailsPage;
