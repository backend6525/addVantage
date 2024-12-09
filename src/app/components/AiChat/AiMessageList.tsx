// import React, { useRef, useEffect } from 'react';
// import { Message } from './AiChatWindow';

// interface AIMessageListProps {
// 	messages: Message[];
// }

// export const AIMessageList: React.FC<AIMessageListProps> = ({ messages }) => {
// 	const messagesEndRef = useRef<null | HTMLDivElement>(null);

// 	const scrollToBottom = () => {
// 		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// 	};

// 	useEffect(() => {
// 		scrollToBottom();
// 	}, [messages]);

// 	return (
// 		<div className='h-96 overflow-y-auto p-4 space-y-3'>
// 			{messages.map((message) => (
// 				<div
// 					key={message.id}
// 					className={`flex ${
// 						message.sender === 'ai' ? 'justify-start' : 'justify-end'
// 					}`}>
// 					<div
// 						className={`max-w-[70%] p-3 rounded-lg ${
// 							message.sender === 'ai'
// 								? 'bg-gray-100 text-gray-800'
// 								: 'bg-blue-500 text-white'
// 						}`}>
// 						{message.text}
// 					</div>
// 				</div>
// 			))}
// 			<div ref={messagesEndRef} />
// 		</div>
// 	);
// };

'use client';

import React, { useRef, useEffect } from 'react';
import { Message } from './AiChatWindow';
import Link from 'next/link';
import {
	ExternalLink,
	Loader,
	CheckCircle,
	XCircle,
	History,
	Clock,
	Filter,
} from 'lucide-react';
import { useTaskStore } from '@/app/components/AiChat/AiChatService/taskStore';

interface AIMessageListProps {
	messages: Message[];
	onSuggestionClick: (suggestion: string) => void;
}

export const AIMessageList: React.FC<AIMessageListProps> = ({
	messages,
	onSuggestionClick,
}) => {
	const messagesEndRef = useRef<null | HTMLDivElement>(null);
	const { getRecentTasks, clearHistory } = useTaskStore();

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const getTaskStatusIcon = (status?: string) => {
		switch (status) {
			case 'pending':
				return <Loader className='w-4 h-4 animate-spin text-blue-500' />;
			case 'completed':
				return <CheckCircle className='w-4 h-4 text-green-500' />;
			case 'failed':
				return <XCircle className='w-4 h-4 text-red-500' />;
			default:
				return null;
		}
	};

	const getTaskStatusClass = (status?: string) => {
		switch (status) {
			case 'pending':
				return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
			case 'completed':
				return 'border-green-500 bg-green-50 dark:bg-green-900/20';
			case 'failed':
				return 'border-red-500 bg-red-50 dark:bg-red-900/20';
			default:
				return '';
		}
	};

	return (
		<div className='h-96 overflow-y-auto p-4 space-y-4'>
			{messages.map((message) => (
				<div
					key={message.id}
					className={`flex ${
						message.sender === 'ai' ? 'justify-start' : 'justify-end'
					}`}>
					<div className='space-y-3 max-w-[85%]'>
						{/* Message Text */}
						<div
							className={`p-3 rounded-lg ${
								message.sender === 'ai'
									? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
									: 'bg-blue-500 text-white'
							} ${
								message.type === 'task' || message.type === 'task-result'
									? `border-l-4 ${getTaskStatusClass(message.taskStatus)}`
									: ''
							}`}>
							<div className='flex items-center gap-2'>
								{message.type === 'task-history' && (
									<History className='w-4 h-4 text-blue-500' />
								)}
								{getTaskStatusIcon(message.taskStatus)}
								<div className='flex-1'>
									{message.text.split('\n').map((line, idx) => (
										<p key={idx} className='mb-1 last:mb-0'>
											{line}
										</p>
									))}
								</div>
							</div>
							{message.taskId && message.taskStatus === 'pending' && (
								<div className='mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400'>
									<Clock className='w-3 h-3' />
									<span>Waiting for confirmation...</span>
								</div>
							)}
						</div>

						{/* Task History Actions */}
						{message.type === 'task-history' && (
							<div className='flex gap-2'>
								<button
									onClick={() => onSuggestionClick('Show more tasks')}
									className='flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
									<History className='w-4 h-4' />
									More
								</button>
								<button
									onClick={() => clearHistory()}
									className='flex items-center gap-1 px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-800/30 transition-colors'>
									Clear
								</button>
								<button
									onClick={() => onSuggestionClick('Filter by type')}
									className='flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
									<Filter className='w-4 h-4' />
									Filter
								</button>
							</div>
						)}

						{/* Suggestions */}
						{message.sender === 'ai' && message.suggestions && (
							<div className='flex flex-wrap gap-2'>
								{message.suggestions.map((suggestion, idx) => (
									<button
										key={idx}
										onClick={() => onSuggestionClick(suggestion)}
										className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
											message.type === 'task'
												? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/30'
												: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
										}`}>
										{suggestion}
									</button>
								))}
							</div>
						)}

						{/* Link */}
						{message.sender === 'ai' &&
							message.type === 'link' &&
							message.link && (
								<Link
									href={message.link}
									className='inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
									View Details
									<ExternalLink size={16} />
								</Link>
							)}
					</div>
				</div>
			))}
			<div ref={messagesEndRef} />
		</div>
	);
};
