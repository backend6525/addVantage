'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { AIChatHeader } from './AiChatHeader';
import { AIMessageList } from './AiMessageList';
import { AIChatInput } from './AiChatInput';
import { motion } from 'framer-motion';
import {
	useTaskStore,
	TaskType,
	TaskHistoryItem,
} from '@/app/components/AiChat/AiChatService/taskStore';
import {
	executeTask,
	detectTaskType,
	extractMetadata,
} from '@/app/components/AiChat/AiChatService/taskService';
import { v4 as uuidv4 } from 'uuid';

interface AIChatWindowProps {
	onClose: () => void;
}

export interface Message {
	id: string;
	text: string;
	sender: 'user' | 'ai';
	type?:
		| 'text'
		| 'suggestion'
		| 'link'
		| 'task'
		| 'task-result'
		| 'task-history';
	suggestions?: string[];
	link?: string;
	taskStatus?: 'pending' | 'completed' | 'failed';
	taskId?: string;
}

const generateResponse = (
	message: string,
	isAgentMode: boolean,
	recentTasks: TaskHistoryItem[]
): Message => {
	const query = message.toLowerCase();

	if (isAgentMode) {
		const taskType = detectTaskType(query);

		if (taskType) {
			return {
				id: Date.now().toString(),
				text: `I'll help you with that. Please confirm the details:`,
				sender: 'ai',
				type: 'task',
				taskStatus: 'pending',
				suggestions: ['Confirm and execute', 'Modify details', 'Cancel task'],
				taskId: uuidv4(),
			};
		}

		if (query.includes('history') || query.includes('recent')) {
			const taskSummary = recentTasks
				.slice(0, 5)
				.map((task) => `${task.task} (${task.status})`)
				.join('\n');

			return {
				id: Date.now().toString(),
				text: `Here are your recent tasks:\n${taskSummary}`,
				sender: 'ai',
				type: 'task-history',
				suggestions: ['Show more tasks', 'Clear history', 'Filter by type'],
			};
		}

		return {
			id: Date.now().toString(),
			text: 'What would you like me to do? Here are some options:',
			sender: 'ai',
			type: 'task',
			suggestions: [
				'Create new campaign',
				'Analyze performance',
				'Generate report',
				'Update settings',
				'Show task history',
			],
		};
	}

	// Assistant mode responses (existing code)
	if (
		query.includes('pricing') ||
		query.includes('plans') ||
		query.includes('cost')
	) {
		return {
			id: Date.now().toString(),
			text: 'Let me help you with our pricing plans. We offer different tiers to suit your needs:',
			sender: 'ai',
			type: 'link',
			link: '/#pricing',
			suggestions: [
				'Tell me about the Basic plan',
				"What's included in the Enterprise plan?",
				'Do you offer a free trial?',
			],
		};
	}

	if (query.includes('feature') || query.includes('what can')) {
		return {
			id: Date.now().toString(),
			text: 'Our platform offers several powerful features:',
			sender: 'ai',
			type: 'link',
			link: '/#features',
			suggestions: [
				'Tell me about Smart Ad Discovery',
				'How does the reward system work?',
				'What security features do you offer?',
			],
		};
	}

	if (
		query.includes('contact') ||
		query.includes('support') ||
		query.includes('help')
	) {
		return {
			id: Date.now().toString(),
			text: 'I can help you get in touch with our support team:',
			sender: 'ai',
			type: 'suggestion',
			suggestions: ['Contact Support Team', 'View FAQs', 'Schedule a Demo'],
		};
	}

	if (
		query.includes('get started') ||
		query.includes('sign up') ||
		query.includes('register')
	) {
		return {
			id: Date.now().toString(),
			text: 'Great! Let me help you get started with adzpay:',
			sender: 'ai',
			type: 'link',
			link: '/get-started',
			suggestions: [
				'Create an account',
				'Watch tutorial',
				'View documentation',
			],
		};
	}

	// Default assistant mode response
	return {
		id: Date.now().toString(),
		text: 'I can help you with:',
		sender: 'ai',
		type: 'suggestion',
		suggestions: [
			'Explore Features',
			'View Pricing Plans',
			'Contact Support',
			'Get Started',
		],
	};
};

export const AIChatWindow: React.FC<AIChatWindowProps> = ({ onClose }) => {
	const [isAgentMode, setIsAgentMode] = useState(false);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			text: "Hi there! I'm your adzpay assistant. How can I help you today?",
			sender: 'ai',
			type: 'suggestion',
			suggestions: [
				'Tell me about features',
				'Show pricing plans',
				'How to get started',
				'Contact support',
			],
		},
	]);
	const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);

	const { taskHistory, addTask, updateTaskStatus, getRecentTasks } =
		useTaskStore();

	const handleSendMessage = useCallback(
		async (message: string) => {
			// Add user message
			const userMessage: Message = {
				id: Date.now().toString(),
				text: message,
				sender: 'user',
			};
			setMessages((prev) => [...prev, userMessage]);

			if (pendingTaskId && message.toLowerCase().includes('confirm')) {
				// Execute the pending task
				const taskType = detectTaskType(message);
				if (taskType) {
					const metadata = extractMetadata(message, taskType);
					const newTask: TaskHistoryItem = {
						id: pendingTaskId,
						task: message,
						status: 'pending',
						timestamp: new Date(),
						type: taskType,
						metadata,
					};

					addTask(newTask);

					try {
						const result = await executeTask(newTask);
						updateTaskStatus(
							pendingTaskId,
							result.success ? 'completed' : 'failed',
							result.result || result.error
						);

						setMessages((prev) => [
							...prev,
							{
								id: Date.now().toString(),
								text: result.success
									? result.result!
									: `Error: ${result.error}`,
								sender: 'ai',
								type: 'task-result',
								taskStatus: result.success ? 'completed' : 'failed',
								taskId: pendingTaskId,
							},
						]);
					} catch (error) {
						updateTaskStatus(pendingTaskId, 'failed', error.message);
						setMessages((prev) => [
							...prev,
							{
								id: Date.now().toString(),
								text: `Error: ${error.message}`,
								sender: 'ai',
								type: 'task-result',
								taskStatus: 'failed',
								taskId: pendingTaskId,
							},
						]);
					}
				}
				setPendingTaskId(null);
			} else {
				// Generate normal response
				const aiResponse = generateResponse(
					message,
					isAgentMode,
					getRecentTasks()
				);
				if (aiResponse.type === 'task') {
					setPendingTaskId(aiResponse.taskId!);
				}
				setMessages((prev) => [...prev, aiResponse]);
			}
		},
		[isAgentMode, pendingTaskId, addTask, updateTaskStatus, getRecentTasks]
	);

	const handleSuggestionClick = useCallback(
		(suggestion: string) => {
			handleSendMessage(suggestion);
		},
		[handleSendMessage]
	);

	const handleToggleMode = useCallback(() => {
		setIsAgentMode((prev) => !prev);
		setPendingTaskId(null);
		setMessages((prev) => [
			...prev,
			{
				id: Date.now().toString(),
				text: `Switched to ${
					!isAgentMode ? 'Agent' : 'Assistant'
				} mode. How can I help you?`,
				sender: 'ai',
				type: 'suggestion',
				suggestions: !isAgentMode
					? ['Create new campaign', 'Analyze performance', 'Show task history']
					: ['Tell me about features', 'Show pricing', 'Get support'],
			},
		]);
	}, [isAgentMode]);

	return (
		<motion.div
			className='fixed bottom-24 right-6 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50'
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}>
			<AIChatHeader
				onClose={onClose}
				isAgentMode={isAgentMode}
				onToggleMode={handleToggleMode}
			/>
			<AIMessageList
				messages={messages}
				onSuggestionClick={handleSuggestionClick}
			/>
			<AIChatInput onSendMessage={handleSendMessage} />
		</motion.div>
	);
};
