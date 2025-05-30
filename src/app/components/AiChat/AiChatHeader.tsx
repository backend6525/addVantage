'use client';

import React from 'react';
import { X, Bot, User, ToggleLeft, ToggleRight } from 'lucide-react';

interface AIChatHeaderProps {
	onClose: () => void;
	isAgentMode: boolean;
	onToggleMode: () => void;
}

export const AIChatHeader: React.FC<AIChatHeaderProps> = ({
	onClose,
	isAgentMode,
	onToggleMode,
}) => {
	return (
		<div className='flex justify-between items-center p-4 bg-blue-500 dark:bg-blue-700 text-white rounded-t-xl'>
			<div className='flex items-center gap-3'>
				{isAgentMode ? (
					<Bot className='w-6 h-6 animate-pulse' />
				) : (
					<User className='w-6 h-6' />
				)}
				<div>
					<h2 className='text-lg font-semibold'>
						{isAgentMode ? 'AdZPay Agent' : 'AI Assistant'}
					</h2>
					<p className='text-xs text-blue-100'>
						{isAgentMode ? 'Task Execution Mode' : 'Help & Support Mode'}
					</p>
				</div>
			</div>

			<div className='flex items-center gap-3'>
				<button
					onClick={onToggleMode}
					className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors'>
					{isAgentMode ? (
						<>
							<ToggleRight className='w-5 h-5' />
							<span className='text-sm'>Agent Mode</span>
						</>
					) : (
						<>
							<ToggleLeft className='w-5 h-5' />
							<span className='text-sm'>Assistant Mode</span>
						</>
					)}
				</button>
				<button
					onClick={onClose}
					className='hover:bg-blue-600 dark:hover:bg-blue-800 p-1 rounded-full transition-colors'>
					<X size={24} />
				</button>
			</div>
		</div>
	);
};
