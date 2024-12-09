// import React from 'react';
// import { Task } from '@/lib/types/task';
// import { getStatusColor, getPriorityColor } from '@/lib/utils/taskUtils';
// import { Calendar, User, Paperclip } from 'lucide-react';

// interface TaskCardProps {
// 	task: Task;
// 	onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
// }

// const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
// 	return (
// 		<div
// 			draggable
// 			onDragStart={(e) => onDragStart(e, task)}
// 			className={`p-3 mb-2 rounded-lg shadow-sm cursor-move ${getStatusColor(task.status)}`}>
// 			<div className='flex justify-between items-center mb-2'>
// 				<h3 className='font-semibold text-sm'>{task.title}</h3>
// 				<span
// 					className={`text-xs font-bold ${getPriorityColor(task.priority)}`}>
// 					{task.priority}
// 				</span>
// 			</div>
// 			<div className='flex justify-between items-center text-xs text-gray-600'>
// 				<div className='flex items-center space-x-1'>
// 					<User size={12} />
// 					<span>{task.assignee || 'Unassigned'}</span>
// 				</div>
// 				{task.dueDate && (
// 					<div className='flex items-center space-x-1'>
// 						<Calendar size={12} />
// 						<span>{task.dueDate.toLocaleDateString()}</span>
// 					</div>
// 				)}
// 				{task.attachments && (
// 					<div className='flex items-center space-x-1'>
// 						<Paperclip size={12} />
// 						<span>{task.attachments.length}</span>
// 					</div>
// 				)}
// 			</div>
// 			<div className='text-xs mt-1 text-gray-500'>
// 				{task.project || 'Learning Platform'}
// 			</div>
// 		</div>
// 	);
// };

// export default TaskCard;

import React from 'react';
import { Calendar, User, Paperclip, MoreVertical } from 'lucide-react';
import { Task } from '@/lib/types/task';
import { getStatusColor, getPriorityColor } from '@/lib/utils/taskUtils';

interface TaskCardProps {
	task: Task;
	onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
	onOpenDetails: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
	task,
	onDragStart,
	onOpenDetails,
}) => {
	return (
		<div
			draggable
			onDragStart={(e) => onDragStart(e, task)}
			onClick={() => onOpenDetails(task)}
			className={`
        p-3 mb-2 rounded-lg shadow-sm cursor-move 
        ${getStatusColor(task.status)} 
        hover:opacity-80 transition-opacity
      `}>
			<div className='flex justify-between items-center mb-2'>
				<h3 className='font-semibold text-sm truncate pr-2'>{task.title}</h3>
				<span
					className={`
            text-xs font-bold 
            ${getPriorityColor(task.priority)}
          `}>
					{task.priority}
				</span>
			</div>

			<div className='flex justify-between items-center text-xs text-gray-600'>
				<div className='flex items-center space-x-1'>
					<User size={12} />
					<span>{task.assignee || 'Unassigned'}</span>
				</div>

				{task.dueDate && (
					<div className='flex items-center space-x-1'>
						<Calendar size={12} />
						<span>{task.dueDate.toLocaleDateString()}</span>
					</div>
				)}

				{task.attachments && task.attachments.length > 0 && (
					<div className='flex items-center space-x-1'>
						<Paperclip size={12} />
						<span>{task.attachments.length}</span>
					</div>
				)}
			</div>

			<div className='text-xs mt-1 text-gray-500'>
				{task.project || 'Learning Platform'}
			</div>
		</div>
	);
};
