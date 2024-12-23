import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface AIChatInputProps {
	onSendMessage: (message: string) => void;
}

export const AIChatInput: React.FC<AIChatInputProps> = ({ onSendMessage }) => {
	const [message, setMessage] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim()) {
			onSendMessage(message);
			setMessage('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='p-4 border-t border-gray-200'>
			<div className='flex items-center space-x-2'>
				<input
					type='text'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder='Type your message...'
					className='flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<button
					type='submit'
					className='bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors'>
					<Send size={20} />
				</button>
			</div>
		</form>
	);
};
