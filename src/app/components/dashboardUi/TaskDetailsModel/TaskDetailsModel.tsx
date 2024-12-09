// import React, { useState, useEffect, useRef } from 'react';
// import {
// 	X,
// 	CheckCircle,
// 	MessageCircle,
// 	Send,
// 	Info,
// 	Star,
// 	MoreVertical,
// 	Plus,
// 	Trash2,
// 	Check,
// 	AlertTriangle,
// } from 'lucide-react';
// import { v4 as uuidv4 } from 'uuid';
// import { Task, TaskStatus, TaskPriority } from '@/lib/types/task';

// export interface Subtask {
// 	id: string;
// 	title: string;
// 	completed: boolean;
// }

// interface TaskDetailsPageProps {
// 	task: Task;
// 	onUpdate: (updates: Partial<Task>) => void;
// 	onClose: () => void;
// }

// const TaskDetailsPage: React.FC<TaskDetailsPageProps> = ({
// 	task,
// 	onUpdate,
// 	onClose,
// }) => {
// 	// State for editing task
// 	const [editedTask, setEditedTask] = useState<Partial<Task>>(task);
// 	const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
// 	const [isModified, setIsModified] = useState(false);
// 	const [activeTab, setActiveTab] = useState('Details');
// 	const [newComment, setNewComment] = useState('');

// 	// Activities (simulated for now)
// 	const [activities, setActivities] = useState([
// 		{
// 			id: '1',
// 			user: 'Jane Smith',
// 			action: 'Added subtask "Write unit tests"',
// 			timestamp: '2 hours ago',
// 		},
// 	]);

// 	// Refs and Effects
// 	const inputRef = useRef<HTMLInputElement>(null);

// 	// Track changes
// 	useEffect(() => {
// 		const hasChanges = JSON.stringify(task) !== JSON.stringify(editedTask);
// 		setIsModified(hasChanges);
// 	}, [editedTask, task]);

// 	// Subtask Management Functions
// 	const handleAddSubtask = () => {
// 		const trimmedTitle = newSubtaskTitle.trim();
// 		if (trimmedTitle) {
// 			const updatedSubtasks = [
// 				...(editedTask.subtasks || []),
// 				{
// 					id: uuidv4(),
// 					title: trimmedTitle,
// 					completed: false,
// 				},
// 			];
// 			setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
// 			setNewSubtaskTitle('');
// 		}
// 	};

// 	const handleDeleteSubtask = (subtaskId: string) => {
// 		const updatedSubtasks = (editedTask.subtasks || []).filter(
// 			(subtask) => subtask.id !== subtaskId
// 		);
// 		setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
// 	};

// 	const handleToggleSubtask = (subtaskId: string) => {
// 		const updatedSubtasks = (editedTask.subtasks || []).map((subtask) =>
// 			subtask.id === subtaskId
// 				? { ...subtask, completed: !subtask.completed }
// 				: subtask
// 		);
// 		setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
// 	};

// 	// Comment Management
// 	const handleAddComment = () => {
// 		if (newComment.trim()) {
// 			const newActivityEntry = {
// 				id: uuidv4(),
// 				user: 'Current User', // Replace with actual user logic
// 				action: newComment,
// 				timestamp: 'Just now',
// 			};
// 			setActivities([newActivityEntry, ...activities]);
// 			setNewComment('');
// 		}
// 	};

// 	// Save Handler
// 	const handleSave = () => {
// 		if (!editedTask.title?.trim()) {
// 			alert('Task title cannot be empty');
// 			return;
// 		}

// 		// Add current timestamp to updatedAt
// 		const updatedTaskWithTimestamp = {
// 			...editedTask,
// 			updatedAt: new Date().toISOString(),
// 		};

// 		// Call onUpdate with the full updated task
// 		onUpdate(updatedTaskWithTimestamp);

// 		// Close the task details
// 		onClose();
// 	};

// 	// Utility Functions
// 	const getPriorityColor = (priority?: TaskPriority) => {
// 		switch (priority) {
// 			case TaskPriority.HIGH:
// 				return 'text-red-600 bg-red-50';
// 			case TaskPriority.MEDIUM:
// 				return 'text-yellow-600 bg-yellow-50';
// 			case TaskPriority.LOW:
// 				return 'text-green-600 bg-green-50';
// 			default:
// 				return 'text-gray-600 bg-gray-50';
// 		}
// 	};

// 	return (
// 		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
// 			<div className='flex w-full max-w-6xl h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl'>
// 				{/* Left Panel - Task Overview */}
// 				<div className='w-2/3 p-8 bg-white overflow-y-auto'>
// 					{/* Top Navigation */}
// 					<div className='absolute top-6 left-6 text-sm text-gray-500'>
// 						Shared with me / Learning Platform
// 					</div>

// 					<div className='absolute top-6 right-6 flex space-x-3'>
// 						<button onClick={onClose} aria-label='Close'>
// 							<X className='text-gray-800 w-6 h-6' />
// 						</button>
// 						<CheckCircle className='text-gray-800 w-6 h-6' />
// 						<MessageCircle className='text-gray-800 w-6 h-6' />
// 					</div>

// 					{/* Main Content - Preserved from original implementation */}
// 					{/* Header Section */}
// 					<div className='flex items-center justify-between mb-8 mt-8'>
// 						<div className='flex items-center space-x-4'>
// 							<div className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm'>
// 								{task.id}
// 							</div>
// 							<input
// 								value={editedTask.title || ''}
// 								onChange={(e) =>
// 									setEditedTask({ ...editedTask, title: e.target.value })
// 								}
// 								className='text-3xl font-bold text-gray-800 bg-transparent w-full'
// 								placeholder='Enter task title'
// 							/>
// 						</div>
// 						<button className='bg-purple-600 text-white px-4 py-2 rounded-lg text-sm'>
// 							Ask AI
// 						</button>
// 					</div>

// 					{/* Task Details Grid - Status and Priority */}
// 					<div className='grid grid-cols-2 gap-6 mb-6'>
// 						<div>
// 							<label className='block text-sm text-gray-500 mb-2'>Status</label>
// 							<select
// 								value={editedTask.status}
// 								onChange={(e) =>
// 									setEditedTask({
// 										...editedTask,
// 										status: e.target.value as TaskStatus,
// 									})
// 								}
// 								className='w-full bg-gray-100 px-4 py-2 rounded-lg'>
// 								{Object.values(TaskStatus).map((status) => (
// 									<option key={status} value={status}>
// 										{status.toLowerCase().replace('_', ' ')}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 						<div>
// 							<label className='block text-sm text-gray-500 mb-2'>
// 								Priority
// 							</label>
// 							<select
// 								value={editedTask.priority}
// 								onChange={(e) =>
// 									setEditedTask({
// 										...editedTask,
// 										priority: e.target.value as TaskPriority,
// 									})
// 								}
// 								className={`w-full px-4 py-2 rounded-lg ${getPriorityColor(editedTask.priority)}`}>
// 								{Object.values(TaskPriority).map((priority) => (
// 									<option key={priority} value={priority}>
// 										{priority.toLowerCase()}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 					</div>

// 					{/* Description */}
// 					<div className='mb-6'>
// 						<label className='block text-sm text-gray-500 mb-2'>
// 							Description
// 						</label>
// 						<textarea
// 							value={editedTask.description || ''}
// 							onChange={(e) =>
// 								setEditedTask({ ...editedTask, description: e.target.value })
// 							}
// 							className='w-full bg-gray-100 p-4 rounded-lg text-sm text-gray-700 h-24'
// 							placeholder='Enter task description'
// 						/>
// 					</div>

// 					{/* Tabs */}
// 					<div className='flex space-x-4 mb-6 border-b'>
// 						{['Details', 'Subtasks', 'Action Items'].map((tab) => (
// 							<button
// 								key={tab}
// 								className={`pb-2 text-sm ${
// 									activeTab === tab
// 										? 'text-purple-600 border-b-2 border-purple-600'
// 										: 'text-gray-500'
// 								}`}
// 								onClick={() => setActiveTab(tab)}>
// 								{tab}
// 							</button>
// 						))}
// 					</div>

// 					{/* Subtasks Section (when Subtasks tab is active) */}
// 					{activeTab === 'Subtasks' && (
// 						<div>
// 							{/* Subtask List */}
// 							{editedTask.subtasks?.map((subtask) => (
// 								<div
// 									key={subtask.id}
// 									className='flex items-center space-x-2 mb-2 p-2 bg-gray-50 rounded-lg'>
// 									<button
// 										onClick={() => handleToggleSubtask(subtask.id)}
// 										className={`
//                       p-1 rounded-full transition-all
//                       ${
// 												subtask.completed
// 													? 'bg-green-500 text-white'
// 													: 'bg-gray-200 text-gray-600'
// 											}
//                     `}
// 										aria-label={
// 											subtask.completed
// 												? 'Mark as incomplete'
// 												: 'Mark as complete'
// 										}>
// 										<Check size={16} />
// 									</button>
// 									<input
// 										type='text'
// 										value={subtask.title}
// 										onChange={(e) => {
// 											const updatedSubtasks = (editedTask.subtasks || []).map(
// 												(s) =>
// 													s.id === subtask.id
// 														? { ...s, title: e.target.value }
// 														: s
// 											);
// 											setEditedTask({
// 												...editedTask,
// 												subtasks: updatedSubtasks,
// 											});
// 										}}
// 										className={`
//                       flex-grow p-2 bg-transparent rounded
//                       ${subtask.completed ? 'line-through text-gray-400' : ''}
//                       focus:outline-none focus:ring-2 focus:ring-blue-500
//                     `}
// 									/>
// 									<button
// 										onClick={() => handleDeleteSubtask(subtask.id)}
// 										className='text-red-500 hover:bg-red-100 p-1 rounded-full transition-colors'
// 										aria-label='Delete subtask'>
// 										<Trash2 size={16} />
// 									</button>
// 								</div>
// 							))}

// 							{/* Add Subtask */}
// 							<div className='flex space-x-2 mt-4'>
// 								<input
// 									type='text'
// 									value={newSubtaskTitle}
// 									onChange={(e) => setNewSubtaskTitle(e.target.value)}
// 									placeholder='Add a new subtask'
// 									className='flex-grow p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
// 									onKeyDown={(e) => {
// 										if (e.key === 'Enter') {
// 											handleAddSubtask();
// 										}
// 									}}
// 								/>
// 								<button
// 									onClick={handleAddSubtask}
// 									disabled={!newSubtaskTitle.trim()}
// 									className='bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
// 									aria-label='Add subtask'>
// 									<Plus size={20} />
// 								</button>
// 							</div>
// 						</div>
// 					)}

// 					{/* Custom Fields Table */}
// 					<table className='w-full text-sm mt-6'>
// 						<thead>
// 							<tr className='bg-gray-100'>
// 								<th className='p-3 text-left'>Name</th>
// 								<th className='p-3 text-right'>Required</th>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							<tr>
// 								<td className='p-3'>No custom fields</td>
// 								<td className='p-3 text-right'>-</td>
// 							</tr>
// 						</tbody>
// 					</table>

// 					{/* Save Changes Button */}
// 					<div className='mt-6 flex justify-end'>
// 						<button
// 							onClick={handleSave}
// 							disabled={!isModified}
// 							className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
// 							{isModified ? 'Save Changes' : 'No Changes'}
// 						</button>
// 					</div>
// 				</div>

// 				{/* Right Panel - Activity Feed */}
// 				<div className='w-1/3 bg-gray-900 text-white p-8 relative overflow-y-auto'>
// 					<h2 className='text-xl font-bold mb-6'>Activity</h2>

// 					{/* Activity Timeline */}
// 					<div className='space-y-4'>
// 						{activities.map((activity) => (
// 							<div key={activity.id} className='flex items-start space-x-3'>
// 								<Info className='w-4 h-4 mt-1 text-gray-400' />
// 								<div>
// 									<p className='text-sm'>{activity.action}</p>
// 									<p className='text-xs text-gray-400 italic'>
// 										{activity.timestamp}
// 									</p>
// 								</div>
// 							</div>
// 						))}
// 					</div>

// 					{/* Comment Section */}
// 					<div className='absolute bottom-8 left-8 right-8 flex space-x-2'>
// 						<input
// 							type='text'
// 							placeholder='Add a comment...'
// 							value={newComment}
// 							onChange={(e) => setNewComment(e.target.value)}
// 							onKeyDown={(e) => {
// 								if (e.key === 'Enter') {
// 									handleAddComment();
// 								}
// 							}}
// 							className='flex-grow p-3 bg-gray-800 rounded-lg text-sm'
// 						/>
// 						<button
// 							onClick={handleAddComment}
// 							disabled={!newComment.trim()}
// 							className='bg-purple-600 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'>
// 							<Send className='w-5 h-5' />
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default TaskDetailsPage;

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Check, Plus, Trash2, Send, Info } from 'lucide-react';
// import { v4 as uuidv4 } from 'uuid';
// import { Task, TaskStatus, TaskPriority } from '@/lib/types/task';

// interface TaskDetailsPageProps {
// 	task: Task;
// 	onUpdate: (updates: Partial<Task>) => void;
// 	onClose: () => void;
// }

// const TaskDetailsPage: React.FC<TaskDetailsPageProps> = ({
// 	task,
// 	onUpdate,
// 	onClose,
// }) => {
// 	// State Management
// 	const [editedTask, setEditedTask] = useState<Partial<Task>>(task);
// 	const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
// 	const [isModified, setIsModified] = useState(false);
// 	const [activeTab, setActiveTab] = useState('Details');
// 	const [newComment, setNewComment] = useState('');

// 	// Simulated Activities
// 	const [activities, setActivities] = useState([
// 		{
// 			id: '1',
// 			user: 'Jane Smith',
// 			action: 'Added subtask "Write unit tests"',
// 			timestamp: '2 hours ago',
// 		},
// 	]);

// 	// Track Changes
// 	useEffect(() => {
// 		const hasChanges = JSON.stringify(task) !== JSON.stringify(editedTask);
// 		setIsModified(hasChanges);
// 	}, [editedTask, task]);

// 	// Subtask Management
// 	const handleAddSubtask = () => {
// 		const trimmedTitle = newSubtaskTitle.trim();
// 		if (trimmedTitle) {
// 			const updatedSubtasks = [
// 				...(editedTask.subtasks || []),
// 				{
// 					id: uuidv4(),
// 					title: trimmedTitle,
// 					completed: false,
// 				},
// 			];
// 			setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
// 			setNewSubtaskTitle('');
// 		}
// 	};

// 	const handleDeleteSubtask = (subtaskId: string) => {
// 		const updatedSubtasks = (editedTask.subtasks || []).filter(
// 			(subtask) => subtask.id !== subtaskId
// 		);
// 		setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
// 	};

// 	const handleToggleSubtask = (subtaskId: string) => {
// 		const updatedSubtasks = (editedTask.subtasks || []).map((subtask) =>
// 			subtask.id === subtaskId
// 				? { ...subtask, completed: !subtask.completed }
// 				: subtask
// 		);
// 		setEditedTask({ ...editedTask, subtasks: updatedSubtasks });
// 	};

// 	// Comment Management
// 	const handleAddComment = () => {
// 		if (newComment.trim()) {
// 			const newActivityEntry = {
// 				id: uuidv4(),
// 				user: 'Current User',
// 				action: newComment,
// 				timestamp: 'Just now',
// 			};
// 			setActivities([newActivityEntry, ...activities]);
// 			setNewComment('');
// 		}
// 	};

// 	// Save Handler
// 	const handleSave = () => {
// 		if (!editedTask.title?.trim()) {
// 			alert('Task title cannot be empty');
// 			return;
// 		}

// 		const updatedTaskWithTimestamp = {
// 			...editedTask,
// 			updatedAt: new Date().toISOString(),
// 		};

// 		onUpdate(updatedTaskWithTimestamp);
// 		onClose();
// 	};

// 	return (
// 		<motion.div
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			exit={{ opacity: 0 }}
// 			className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4'>
// 			<motion.div
// 				initial={{ scale: 0.9 }}
// 				animate={{ scale: 1 }}
// 				className='w-full max-w-6xl h-[90vh] bg-gray-900 rounded-2xl overflow-hidden grid grid-cols-3 shadow-2xl border border-gray-700'>
// 				{/* Left Panel: Task Details */}
// 				<div className='col-span-2 p-8 overflow-y-auto bg-gray-800/60 backdrop-blur-sm border-r border-gray-700'>
// 					{/* Top Navigation */}
// 					<div className='flex justify-between items-center mb-8'>
// 						<div className='text-sm text-gray-400'>Task Management</div>
// 						<div className='flex space-x-4'>
// 							<motion.button
// 								whileHover={{ scale: 1.1 }}
// 								whileTap={{ scale: 0.9 }}
// 								onClick={onClose}
// 								className='text-gray-400 hover:text-white'>
// 								<X className='w-6 h-6' />
// 							</motion.button>
// 						</div>
// 					</div>

// 					{/* Task Title */}
// 					<input
// 						value={editedTask.title || ''}
// 						onChange={(e) =>
// 							setEditedTask({ ...editedTask, title: e.target.value })
// 						}
// 						className='w-full bg-transparent text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2 focus:outline-none'
// 						placeholder='Enter task title'
// 					/>

// 					{/* Status and Priority */}
// 					<div className='grid grid-cols-2 gap-6 mb-6'>
// 						<div>
// 							<label className='block text-sm text-gray-400 mb-2'>Status</label>
// 							<select
// 								value={editedTask.status}
// 								onChange={(e) =>
// 									setEditedTask({
// 										...editedTask,
// 										status: e.target.value as TaskStatus,
// 									})
// 								}
// 								className='w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600'>
// 								{Object.values(TaskStatus).map((status) => (
// 									<option key={status} value={status}>
// 										{status.toLowerCase().replace('_', ' ')}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 						<div>
// 							<label className='block text-sm text-gray-400 mb-2'>
// 								Priority
// 							</label>
// 							<select
// 								value={editedTask.priority}
// 								onChange={(e) =>
// 									setEditedTask({
// 										...editedTask,
// 										priority: e.target.value as TaskPriority,
// 									})
// 								}
// 								className='w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600'>
// 								{Object.values(TaskPriority).map((priority) => (
// 									<option key={priority} value={priority}>
// 										{priority.toLowerCase()}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 					</div>

// 					{/* Description */}
// 					<div className='mb-6'>
// 						<label className='block text-sm text-gray-400 mb-2'>
// 							Description
// 						</label>
// 						<textarea
// 							value={editedTask.description || ''}
// 							onChange={(e) =>
// 								setEditedTask({ ...editedTask, description: e.target.value })
// 							}
// 							className='w-full bg-gray-700 text-white p-4 rounded-lg border border-gray-600 h-24'
// 							placeholder='Enter task description'
// 						/>
// 					</div>

// 					{/* Subtasks */}
// 					<div>
// 						<div className='flex justify-between items-center mb-4'>
// 							<h3 className='text-xl font-semibold text-white'>Subtasks</h3>
// 							<div className='flex space-x-2'>
// 								<input
// 									type='text'
// 									value={newSubtaskTitle}
// 									onChange={(e) => setNewSubtaskTitle(e.target.value)}
// 									placeholder='Add new subtask'
// 									className='bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600'
// 								/>
// 								<motion.button
// 									whileHover={{ scale: 1.1 }}
// 									whileTap={{ scale: 0.9 }}
// 									onClick={handleAddSubtask}
// 									disabled={!newSubtaskTitle.trim()}
// 									className='bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50'>
// 									<Plus className='w-5 h-5' />
// 								</motion.button>
// 							</div>
// 						</div>
// 						<AnimatePresence>
// 							{editedTask.subtasks?.map((subtask) => (
// 								<motion.div
// 									key={subtask.id}
// 									initial={{ opacity: 0, x: -20 }}
// 									animate={{ opacity: 1, x: 0 }}
// 									exit={{ opacity: 0, x: -20 }}
// 									className='flex items-center space-x-2 bg-gray-700/50 p-3 rounded-lg mb-2'>
// 									<motion.button
// 										whileTap={{ scale: 0.9 }}
// 										onClick={() => handleToggleSubtask(subtask.id)}
// 										className={`
//                       p-1 rounded-full transition-all
//                       ${
// 												subtask.completed
// 													? 'bg-green-500 text-white'
// 													: 'bg-gray-600 text-gray-300'
// 											}
//                     `}>
// 										<Check size={16} />
// 									</motion.button>
// 									<input
// 										type='text'
// 										value={subtask.title}
// 										onChange={(e) => {
// 											const updatedSubtasks = (editedTask.subtasks || []).map(
// 												(s) =>
// 													s.id === subtask.id
// 														? { ...s, title: e.target.value }
// 														: s
// 											);
// 											setEditedTask({
// 												...editedTask,
// 												subtasks: updatedSubtasks,
// 											});
// 										}}
// 										className={`
//                       flex-grow bg-transparent text-white
//                       ${subtask.completed ? 'line-through text-gray-500' : ''}
//                       focus:outline-none
//                     `}
// 									/>
// 									<motion.button
// 										whileHover={{ scale: 1.1 }}
// 										whileTap={{ scale: 0.9 }}
// 										onClick={() => handleDeleteSubtask(subtask.id)}
// 										className='text-red-500 hover:bg-red-500/20 p-1 rounded-full'>
// 										<Trash2 size={16} />
// 									</motion.button>
// 								</motion.div>
// 							))}
// 						</AnimatePresence>
// 					</div>

// 					{/* Save Button */}
// 					<div className='mt-6 flex justify-end'>
// 						<motion.button
// 							whileHover={{ scale: 1.05 }}
// 							whileTap={{ scale: 0.95 }}
// 							onClick={handleSave}
// 							disabled={!isModified}
// 							className='px-6 py-3 bg-blue-600 text-white rounded-lg
//               disabled:opacity-50 disabled:cursor-not-allowed
//               transition-all hover:bg-blue-700'>
// 							{isModified ? 'Save Changes' : 'No Changes'}
// 						</motion.button>
// 					</div>
// 				</div>

// 				{/* Right Panel: Activity Feed */}
// 				<div className='col-span-1 p-8 bg-gray-900 overflow-y-auto'>
// 					<h2 className='text-xl font-bold text-white mb-6'>Activity</h2>

// 					{/* Activity Timeline */}
// 					<div className='space-y-4'>
// 						{activities.map((activity) => (
// 							<motion.div
// 								key={activity.id}
// 								initial={{ opacity: 0, x: 20 }}
// 								animate={{ opacity: 1, x: 0 }}
// 								className='flex items-start space-x-3 bg-gray-800 p-3 rounded-lg'>
// 								<Info className='w-5 h-5 text-gray-400 mt-1' />
// 								<div>
// 									<p className='text-white text-sm'>{activity.action}</p>
// 									<p className='text-xs text-gray-500 italic'>
// 										{activity.timestamp}
// 									</p>
// 								</div>
// 							</motion.div>
// 						))}
// 					</div>

// 					{/* Comment Input */}
// 					<div className='absolute bottom-8 left-8 right-8 flex space-x-2'>
// 						<input
// 							type='text'
// 							placeholder='Add a comment...'
// 							value={newComment}
// 							onChange={(e) => setNewComment(e.target.value)}
// 							onKeyDown={(e) => {
// 								if (e.key === 'Enter') {
// 									handleAddComment();
// 								}
// 							}}
// 							className='flex-grow bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600'
// 						/>
// 						<motion.button
// 							whileHover={{ scale: 1.1 }}
// 							whileTap={{ scale: 0.9 }}
// 							onClick={handleAddComment}
// 							disabled={!newComment.trim()}
// 							className='bg-blue-600 text-white p-3 rounded-lg disabled:opacity-50'>
// 							<Send className='w-5 h-5' />
// 						</motion.button>
// 					</div>
// 				</div>
// 			</motion.div>
// 		</motion.div>
// 	);
// };

// export default TaskDetailsPage;

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
