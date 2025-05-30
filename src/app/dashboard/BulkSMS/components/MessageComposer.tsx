'use client';

import React, { useState } from 'react';
import {
	Send,
	Clock,
	Save,
	X,
	PlusCircle,
	Trash2,
	MessageSquare,
	History,
	Settings,
	HelpCircle,
	Users,
} from 'lucide-react';

interface MessageTemplate {
	id: string;
	name: string;
	content: string;
	createdAt: string;
}

interface MessageComposerProps {
	contacts: string[];
	message: string;
	setMessage: (message: string) => void;
	isLoading: boolean;
	setIsLoading: (loading: boolean) => void;
	showContactsSidebar: boolean;
	setShowContactsSidebar: (show: boolean) => void;
}

export default function MessageComposer({
	contacts,
	message,
	setMessage,
	isLoading,
	setIsLoading,
	showContactsSidebar,
	setShowContactsSidebar,
}: MessageComposerProps) {
	const [showScheduleModal, setShowScheduleModal] = useState(false);
	const [scheduledTime, setScheduledTime] = useState('');
	const [showTemplatesModal, setShowTemplatesModal] = useState(false);
	const [templates, setTemplates] = useState<MessageTemplate[]>([]);
	const [newTemplateName, setNewTemplateName] = useState('');
	const [newTemplateContent, setNewTemplateContent] = useState('');
	const [showSuccessNotification, setShowSuccessNotification] = useState(false);

	// Handle sending message
	const handleSendMessage = async () => {
		if (!message.trim() || contacts.length === 0) return;

		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setMessage('');
			setShowSuccessNotification(true);
			setTimeout(() => setShowSuccessNotification(false), 3000);
		} catch (error) {
			console.error('Error sending message:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Handle scheduling message
	const handleScheduleMessage = () => {
		if (!message.trim() || contacts.length === 0 || !scheduledTime) return;

		setIsLoading(true);
		try {
			// Simulate API call
			setTimeout(() => {
				setMessage('');
				setScheduledTime('');
				setShowScheduleModal(false);
				setShowSuccessNotification(true);
				setTimeout(() => setShowSuccessNotification(false), 3000);
				setIsLoading(false);
			}, 2000);
		} catch (error) {
			console.error('Error scheduling message:', error);
			setIsLoading(false);
		}
	};

	// Save message template
	const handleSaveTemplate = () => {
		if (!newTemplateName.trim() || !newTemplateContent.trim()) return;

		const newTemplate: MessageTemplate = {
			id: Date.now().toString(),
			name: newTemplateName.trim(),
			content: newTemplateContent.trim(),
			createdAt: new Date().toISOString(),
		};

		setTemplates([...templates, newTemplate]);
		setNewTemplateName('');
		setNewTemplateContent('');
		setShowTemplatesModal(false);
		setShowSuccessNotification(true);
		setTimeout(() => setShowSuccessNotification(false), 3000);
	};

	// Load template content
	const loadTemplate = (template: MessageTemplate) => {
		setMessage(template.content);
		setShowTemplatesModal(false);
	};

	// Delete template
	const deleteTemplate = (templateId: string) => {
		setTemplates(templates.filter((t) => t.id !== templateId));
	};

	return (
		<div className='flex-1 flex flex-col h-full'>
			{/* Header */}
			<div className='flex items-center justify-between p-4 border-b border-slate-700/50'>
				<div className='flex items-center space-x-4'>
					<button
						onClick={() => setShowContactsSidebar(!showContactsSidebar)}
						className='p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50'>
						<Users className='h-5 w-5' />
					</button>
					<h2 className='text-lg font-semibold text-white'>Compose Message</h2>
				</div>
				<div className='flex items-center space-x-2'>
					<button
						onClick={() => setShowTemplatesModal(true)}
						className='p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50'
						title='Message Templates'>
						<MessageSquare className='h-5 w-5' />
					</button>
					<button
						onClick={() => setShowScheduleModal(true)}
						className='p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50'
						title='Schedule Message'>
						<Clock className='h-5 w-5' />
					</button>
					<button
						className='p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50'
						title='Settings'>
						<Settings className='h-5 w-5' />
					</button>
					<button
						className='p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50'
						title='Help'>
						<HelpCircle className='h-5 w-5' />
					</button>
				</div>
			</div>

			{/* Message Composer */}
			<div className='flex-1 p-4 flex flex-col'>
				<div className='mb-4'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-sm text-gray-400'>
							Recipients: {contacts.length} contacts
						</span>
						<button
							onClick={() => setShowContactsSidebar(true)}
							className='text-sm text-purple-400 hover:text-purple-300'>
							Manage Contacts
						</button>
					</div>
					<div className='flex flex-wrap gap-2'>
						{contacts.slice(0, 3).map((contact, index) => (
							<div
								key={index}
								className='px-2 py-1 bg-slate-700/50 rounded-lg text-sm text-gray-300'>
								{contact}
							</div>
						))}
						{contacts.length > 3 && (
							<div className='px-2 py-1 bg-slate-700/50 rounded-lg text-sm text-gray-300'>
								+{contacts.length - 3} more
							</div>
						)}
					</div>
				</div>

				<div className='flex-1 flex flex-col'>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder='Type your message here...'
						className='flex-1 w-full p-4 bg-slate-700/50 border border-slate-700/50 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none'
					/>
					<div className='mt-4 flex justify-between items-center'>
						<div className='text-sm text-gray-400'>
							{message.length} characters
						</div>
						<div className='flex space-x-2'>
							<button
								onClick={() => setShowScheduleModal(true)}
								className='px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg flex items-center space-x-2'>
								<Clock className='h-4 w-4' />
								<span>Schedule</span>
							</button>
							<button
								onClick={handleSendMessage}
								disabled={!message.trim() || contacts.length === 0 || isLoading}
								className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2'>
								<Send className='h-4 w-4' />
								<span>{isLoading ? 'Sending...' : 'Send Message'}</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Schedule Modal */}
			{showScheduleModal && (
				<div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50'>
					<div className='bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full border border-gray-700 animate-fade-in'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-xl font-semibold text-blue-400 flex items-center'>
								<Clock className='h-5 w-5 mr-2' />
								Schedule Message
							</h3>
							<button
								onClick={() => setShowScheduleModal(false)}
								className='p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-all duration-300'>
								<X className='h-5 w-5' />
							</button>
						</div>
						<div className='space-y-4'>
							<div>
								<label className='text-sm text-gray-400'>Schedule Time</label>
								<input
									type='datetime-local'
									value={scheduledTime}
									onChange={(e) => setScheduledTime(e.target.value)}
									className='w-full mt-1 p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50'
								/>
							</div>
							<div className='flex justify-end space-x-3'>
								<button
									onClick={() => setShowScheduleModal(false)}
									className='px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors'>
									Cancel
								</button>
								<button
									onClick={handleScheduleMessage}
									disabled={
										!message.trim() ||
										contacts.length === 0 ||
										!scheduledTime ||
										isLoading
									}
									className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2'>
									<Clock className='h-4 w-4' />
									<span>Schedule</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Templates Modal */}
			{showTemplatesModal && (
				<div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50'>
					<div className='bg-gray-800 rounded-xl shadow-2xl p-6 max-w-2xl w-full border border-gray-700 animate-fade-in'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-xl font-semibold text-blue-400 flex items-center'>
								<MessageSquare className='h-5 w-5 mr-2' />
								Message Templates
							</h3>
							<button
								onClick={() => setShowTemplatesModal(false)}
								className='p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-all duration-300'>
								<X className='h-5 w-5' />
							</button>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							{/* Templates List */}
							<div className='space-y-4'>
								<h4 className='text-sm font-medium text-gray-300'>
									Saved Templates
								</h4>
								<div className='space-y-2 max-h-[400px] overflow-y-auto'>
									{templates.map((template) => (
										<div
											key={template.id}
											className='p-3 bg-gray-700/50 rounded-lg border border-gray-700/50 hover:border-gray-600/50 cursor-pointer'
											onClick={() => loadTemplate(template)}>
											<div className='flex items-center justify-between mb-2'>
												<span className='text-sm font-medium text-gray-300'>
													{template.name}
												</span>
												<button
													onClick={(e) => {
														e.stopPropagation();
														deleteTemplate(template.id);
													}}
													className='p-1 text-gray-400 hover:text-red-400 rounded'>
													<Trash2 className='h-3.5 w-3.5' />
												</button>
											</div>
											<p className='text-sm text-gray-400 line-clamp-2'>
												{template.content}
											</p>
										</div>
									))}
								</div>
							</div>

							{/* New Template Form */}
							<div className='space-y-4'>
								<h4 className='text-sm font-medium text-gray-300'>
									Create New Template
								</h4>
								<div className='space-y-4'>
									<div>
										<label className='text-sm text-gray-400'>
											Template Name
										</label>
										<input
											type='text'
											value={newTemplateName}
											onChange={(e) => setNewTemplateName(e.target.value)}
											placeholder='Enter template name'
											className='w-full mt-1 p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50'
										/>
									</div>
									<div>
										<label className='text-sm text-gray-400'>
											Template Content
										</label>
										<textarea
											value={newTemplateContent}
											onChange={(e) => setNewTemplateContent(e.target.value)}
											placeholder='Enter template content'
											className='w-full mt-1 p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 h-32 resize-none'
										/>
									</div>
									<button
										onClick={handleSaveTemplate}
										disabled={
											!newTemplateName.trim() || !newTemplateContent.trim()
										}
										className='w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2'>
										<Save className='h-4 w-4' />
										<span>Save Template</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Success Notification */}
			{showSuccessNotification && (
				<div className='fixed bottom-6 right-6 bg-green-500/90 text-white px-6 py-4 rounded-lg shadow-xl flex items-center animate-fade-in-up'>
					<div className='bg-white bg-opacity-30 p-2 rounded-full mr-3'>
						<Save className='h-5 w-5' />
					</div>
					<div>
						<h4 className='font-semibold'>Success!</h4>
						<p className='text-sm opacity-90'>
							Operation completed successfully.
						</p>
					</div>
					<button
						onClick={() => setShowSuccessNotification(false)}
						className='ml-6 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300'>
						<X className='h-4 w-4' />
					</button>
				</div>
			)}
		</div>
	);
}
