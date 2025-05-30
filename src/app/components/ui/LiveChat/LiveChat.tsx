'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	MessageCircle,
	X,
	Send,
	Bot,
	User,
	Minimize2,
	Maximize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock messages for demonstration
const initialMessages = [
	{
		id: 1,
		sender: 'bot',
		message: 'Hello! How can I help you with AddVantage today?',
		timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
	},
];

const LiveChat = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);
	const [messages, setMessages] = useState(initialMessages);
	const [inputValue, setInputValue] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	// Focus input when chat is opened
	useEffect(() => {
		if (isOpen && !isMinimized) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 300);
		}
	}, [isOpen, isMinimized]);

	const handleSendMessage = () => {
		if (!inputValue.trim()) return;

		// Add user message
		const userMessage = {
			id: messages.length + 1,
			sender: 'user',
			message: inputValue,
			timestamp: new Date().toISOString(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue('');
		setIsTyping(true);

		// Simulate bot response after a delay
		setTimeout(() => {
			const botResponses = [
				"I'd be happy to help you with that! What specific feature are you interested in?",
				"That's a great question! Let me explain how AddVantage can help with that.",
				'I can definitely provide more information about our pricing plans. Which tier are you considering?',
				'Our platform is designed to be intuitive. Would you like a quick demo of that feature?',
				"Thank you for your interest! Is there anything specific you'd like to know about our reward system?",
			];

			const randomResponse =
				botResponses[Math.floor(Math.random() * botResponses.length)];

			const botMessage = {
				id: messages.length + 2,
				sender: 'bot',
				message: randomResponse,
				timestamp: new Date().toISOString(),
			};

			setMessages((prev) => [...prev, botMessage]);
			setIsTyping(false);
		}, 1500);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSendMessage();
		}
	};

	const formatTime = (timestamp: string) => {
		const date = new Date(timestamp);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	return (
		<>
			{/* Chat Toggle Button */}
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className='fixed bottom-6 right-6 z-50 glass p-4 rounded-full shadow-lg border border-primary/30 hover:scale-110 transition-transform'
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				aria-label={isOpen ? 'Close chat' : 'Open chat'}>
				{isOpen ? (
					<X className='w-6 h-6 text-primary' />
				) : (
					<MessageCircle className='w-6 h-6 text-primary' />
				)}
			</motion.button>

			{/* Chat Window */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{
							opacity: 1,
							y: 0,
							scale: 1,
							height: isMinimized ? 'auto' : '500px',
						}}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ type: 'spring', damping: 20 }}
						className='fixed bottom-24 right-6 z-50 w-80 md:w-96 glass rounded-xl shadow-xl border border-primary/20 overflow-hidden'>
						{/* Chat Header */}
						<div className='p-4 border-b border-primary/10 flex justify-between items-center bg-primary/5'>
							<div className='flex items-center gap-2'>
								<Bot className='w-5 h-5 text-primary' />
								<h3 className='font-bold'>AddVantage Support</h3>
							</div>
							<div className='flex items-center gap-2'>
								<button
									onClick={() => setIsMinimized(!isMinimized)}
									className='p-1 rounded-full hover:bg-primary/10 transition-colors'
									aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}>
									{isMinimized ? (
										<Maximize2 className='w-4 h-4 text-primary' />
									) : (
										<Minimize2 className='w-4 h-4 text-primary' />
									)}
								</button>
								<button
									onClick={() => setIsOpen(false)}
									className='p-1 rounded-full hover:bg-primary/10 transition-colors'
									aria-label='Close chat'>
									<X className='w-4 h-4 text-primary' />
								</button>
							</div>
						</div>

						{/* Chat Messages */}
						{!isMinimized && (
							<>
								<div className='p-4 h-[350px] overflow-y-auto custom-scrollbar'>
									{messages.map((msg) => (
										<div
											key={msg.id}
											className={`flex mb-4 ${
												msg.sender === 'user' ? 'justify-end' : 'justify-start'
											}`}>
											<div
												className={`max-w-[80%] p-3 rounded-xl ${
													msg.sender === 'user'
														? 'bg-primary text-white rounded-br-none'
														: 'bg-muted rounded-bl-none'
												}`}>
												<div className='flex items-start gap-2'>
													{msg.sender === 'bot' && (
														<Bot className='w-5 h-5 text-primary mt-1 flex-shrink-0' />
													)}
													<div>
														<p className='text-sm'>{msg.message}</p>
														<span className='text-xs opacity-70 mt-1 block'>
															{formatTime(msg.timestamp)}
														</span>
													</div>
													{msg.sender === 'user' && (
														<User className='w-5 h-5 text-white/80 mt-1 flex-shrink-0' />
													)}
												</div>
											</div>
										</div>
									))}
									{isTyping && (
										<div className='flex justify-start mb-4'>
											<div className='bg-muted p-3 rounded-xl rounded-bl-none max-w-[80%]'>
												<div className='flex items-center gap-1'>
													<div className='w-2 h-2 bg-primary/50 rounded-full animate-bounce'></div>
													<div className='w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-100'></div>
													<div className='w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-200'></div>
												</div>
											</div>
										</div>
									)}
									<div ref={messagesEndRef} />
								</div>

								{/* Chat Input */}
								<div className='p-4 border-t border-primary/10'>
									<div className='flex gap-2'>
										<input
											ref={inputRef}
											type='text'
											value={inputValue}
											onChange={(e) => setInputValue(e.target.value)}
											onKeyPress={handleKeyPress}
											placeholder='Type your message...'
											className='flex-1 bg-transparent border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30'
										/>
										<Button
											onClick={handleSendMessage}
											disabled={!inputValue.trim()}
											size='icon'
											className='rounded-lg'>
											<Send className='w-4 h-4' />
										</Button>
									</div>
								</div>
							</>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default LiveChat;
