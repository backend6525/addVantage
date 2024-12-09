'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import {
	Upload,
	Mail,
	Edit3,
	Send,
	FileText,
	Trash2,
	Loader2,
	CheckCircle,
	PlusCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Notification, { NotificationProps } from './Notification';
import GenerateCodeCard from './GenerateCode';

interface InviteFormProps {
	userId: string;
}

interface EmailRecipient {
	email: string;
	status?: 'pending' | 'sent' | 'failed';
}

const InviteForm: React.FC<InviteFormProps> = ({ userId }) => {
	// Email States
	const [friendEmail, setFriendEmail] = useState('');
	const [bulkEmails, setBulkEmails] = useState<EmailRecipient[]>([]);
	const [emailMessage, setEmailMessage] = useState('');

	// Document States
	const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
	const [documentText, setDocumentText] = useState('');
	const [isAiEditing, setIsAiEditing] = useState(false);

	// UI and Notification States
	const [notification, setNotification] = useState<NotificationProps | null>(
		null
	);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [activeOption, setActiveOption] = useState<
		'email' | 'code' | 'bulk' | 'document'
	>('email');

	// File Input Ref
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Validation Functions
	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Single Email Invite Handler
	const handleInvite = async () => {
		if (!validateEmail(friendEmail)) {
			setIsEmailValid(false);
			setNotification({
				message: 'Please enter a valid email address.',
				type: 'error',
			});
			return;
		}

		try {
			const response = await fetch('/api/inviteFriend', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ friendEmail, userId }),
			});

			const data = await response.json();

			setNotification({
				message: data.success ? data.message : 'Invitation failed',
				type: data.success ? 'success' : 'error',
			});
		} catch (error) {
			setNotification({
				message: 'Something went wrong. Please try again.',
				type: 'error',
			});
		}
	};

	// Bulk Email Handling
	const addBulkEmail = () => {
		if (validateEmail(friendEmail)) {
			setBulkEmails([...bulkEmails, { email: friendEmail, status: 'pending' }]);
			setFriendEmail('');
		} else {
			setNotification({
				message: 'Invalid email address',
				type: 'error',
			});
		}
	};

	const sendBulkEmails = async () => {
		try {
			const response = await fetch('/api/bulkInvite', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					emails: bulkEmails.map((e) => e.email),
					message: emailMessage,
					userId,
				}),
			});

			const results = await response.json();
			// Update email statuses based on results
			setBulkEmails(
				bulkEmails.map((email, index) => ({
					...email,
					status: results[index].success ? 'sent' : 'failed',
				}))
			);

			setNotification({
				message: 'Bulk emails sent successfully',
				type: 'success',
			});
		} catch (error) {
			setNotification({
				message: 'Failed to send bulk emails',
				type: 'error',
			});
		}
	};

	// Document Upload and Processing
	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setUploadedDocument(file);

			// Basic file reading (you'd want more robust parsing for PDFs/DOCs)
			const reader = new FileReader();
			reader.onload = (e) => {
				const text = e.target?.result as string;
				setDocumentText(text);
			};
			reader.readAsText(file);
		}
	};

	// AI-Assisted Editing
	const handleAiEdit = async () => {
		setIsAiEditing(true);
		try {
			const response = await fetch('/api/aiEditDocument', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					text: documentText,
					userId,
				}),
			});

			const data = await response.json();
			setDocumentText(data.editedText);
			setNotification({
				message: 'Document edited by AI',
				type: 'success',
			});
		} catch (error) {
			setNotification({
				message: 'AI editing failed',
				type: 'error',
			});
		} finally {
			setIsAiEditing(false);
		}
	};

	const renderEmailSection = () => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className='bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4'>
			<div className='mb-4 relative'>
				<label className='block text-white/70 mb-2'>Friend&apos;s Email</label>
				<div className='flex'>
					<input
						type='email'
						value={friendEmail}
						onChange={(e) => {
							setFriendEmail(e.target.value);
							setIsEmailValid(true);
						}}
						placeholder="Enter your friend's email"
						className={`flex-grow p-3 bg-white/10 border ${
							isEmailValid ? 'border-white/20' : 'border-red-500'
						} rounded-l text-white focus:border-blue-500 transition-colors`}
					/>
					<button
						onClick={handleInvite}
						className='bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-4 rounded-r'>
						<Mail />
					</button>
				</div>
				{!isEmailValid && (
					<span className='text-red-400 text-sm mt-1 block'>
						Please enter a valid email address
					</span>
				)}
			</div>
		</motion.div>
	);

	const renderBulkEmailSection = () => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className='bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4'>
			<div className='flex space-x-2'>
				<input
					type='email'
					value={friendEmail}
					onChange={(e) => setFriendEmail(e.target.value)}
					placeholder='Enter email to add'
					className='flex-grow p-3 bg-white/10 border border-white/20 rounded text-white focus:border-blue-500 transition-colors'
				/>
				<button
					onClick={addBulkEmail}
					className='bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 p-3 rounded'>
					<PlusCircle />
				</button>
			</div>
			<textarea
				value={emailMessage}
				onChange={(e) => setEmailMessage(e.target.value)}
				placeholder='Optional message for bulk emails'
				className='w-full p-3 bg-white/10 border border-white/20 rounded text-white min-h-[100px] focus:border-blue-500 transition-colors'
			/>
			<AnimatePresence>
				{bulkEmails.map((recipient, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='flex justify-between items-center p-2 bg-white/5 rounded'>
						<span className='text-white/70'>{recipient.email}</span>
						{recipient.status === 'sent' && (
							<CheckCircle className='text-green-400' />
						)}
						{recipient.status === 'failed' && (
							<Trash2 className='text-red-400' />
						)}
					</motion.div>
				))}
			</AnimatePresence>
			<button
				onClick={sendBulkEmails}
				disabled={bulkEmails.length === 0}
				className='w-full bg-green-500/20 text-green-400 hover:bg-green-500/30 py-3 px-4 rounded-lg
                    disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
				Send Bulk Invites
			</button>
		</motion.div>
	);

	const renderDocumentSection = () => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className='bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4'>
			<input
				type='file'
				ref={fileInputRef}
				onChange={handleFileUpload}
				accept='.txt,.doc,.docx,.pdf'
				className='hidden'
			/>
			<button
				onClick={() => fileInputRef.current?.click()}
				className='w-full flex items-center justify-center bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 py-3 px-4 rounded-lg space-x-2 transition-colors'>
				<Upload /> <span>Upload Document</span>
			</button>

			{uploadedDocument && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='flex items-center justify-between p-3 bg-white/5 rounded'>
					<div className='flex items-center space-x-2 text-white/70'>
						<FileText />
						<span>{uploadedDocument.name}</span>
					</div>
					<button
						onClick={() => setUploadedDocument(null)}
						className='text-red-400 hover:text-red-500 transition-colors'>
						<Trash2 />
					</button>
				</motion.div>
			)}

			<textarea
				value={documentText}
				onChange={(e) => setDocumentText(e.target.value)}
				placeholder='Document text will appear here'
				className='w-full p-3 bg-white/10 border border-white/20 rounded text-white min-h-[200px] focus:border-blue-500 transition-colors'
			/>

			<div className='flex space-x-2'>
				<button
					onClick={handleAiEdit}
					disabled={!documentText || isAiEditing}
					className='flex-grow bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 py-3 px-4 rounded-lg
                        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors'>
					{isAiEditing ? (
						<>
							<Loader2 className='animate-spin' /> <span>Editing...</span>
						</>
					) : (
						<>
							<Edit3 /> <span>AI Edit</span>
						</>
					)}
				</button>
				<button
					onClick={() => {
						/* Implement send document logic */
					}}
					disabled={!documentText}
					className='flex-grow bg-green-500/20 text-green-400 hover:bg-green-500/30 py-3 px-4 rounded-lg
                        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors'>
					<Send /> <span>Send Document</span>
				</button>
			</div>
		</motion.div>
	);

	return (
		<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white p-8 md:p-16 lg:p-20'>
			<div className='max-w-5xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-10 space-y-8'>
				{notification && (
					<Notification
						message={notification.message}
						type={notification.type}
					/>
				)}

				<div className='flex justify-between items-center mb-6'>
					<div>
						<h1 className='text-3xl font-bold text-white/90 mb-2'>
							Referral Center
						</h1>
						<p className='text-white/70'>
							Invite friends, send bulk emails, and manage documents
						</p>
					</div>
				</div>

				<div className='flex justify-center mb-6 bg-white/10 rounded-full p-1'>
					{['email', 'bulk', 'document', 'code'].map((option) => (
						<button
							key={option}
							className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
								activeOption === option
									? 'bg-blue-500/30 text-blue-400'
									: 'text-white/70 hover:bg-white/10'
							}`}
							onClick={() => setActiveOption(option as any)}>
							{option === 'email' && 'Invite Email'}
							{option === 'bulk' && 'Bulk Emails'}
							{option === 'document' && 'Document'}
							{option === 'code' && 'Referral Code'}
						</button>
					))}
				</div>

				{activeOption === 'email' && renderEmailSection()}
				{activeOption === 'bulk' && renderBulkEmailSection()}
				{activeOption === 'document' && renderDocumentSection()}
				{activeOption === 'code' && (
					<div className='w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto'>
						<GenerateCodeCard />
					</div>
				)}
			</div>
		</div>
	);
};

export default InviteForm;

// 'use client';

// import React, { useState, useRef, ChangeEvent } from 'react';
// import {
// 	Upload,
// 	Mail,
// 	Edit3,
// 	Send,
// 	FileText,
// 	Trash2,
// 	Loader2,
// 	CheckCircle,
// 	PlusCircle,
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Notification, { NotificationProps } from './Notification';
// import GenerateCodeCard from './GenerateCode';

// interface InviteFormProps {
// 	userId: string;
// }

// interface EmailRecipient {
// 	email: string;
// 	status?: 'pending' | 'sent' | 'failed';
// }

// const InviteForm: React.FC<InviteFormProps> = ({ userId }) => {
// 	// Email States
// 	const [friendEmail, setFriendEmail] = useState('');
// 	const [bulkEmails, setBulkEmails] = useState<EmailRecipient[]>([]);
// 	const [emailMessage, setEmailMessage] = useState('');

// 	// Document States
// 	const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
// 	const [documentText, setDocumentText] = useState('');
// 	const [isAiEditing, setIsAiEditing] = useState(false);

// 	// UI and Notification States
// 	const [notification, setNotification] = useState<NotificationProps | null>(
// 		null
// 	);
// 	const [isEmailValid, setIsEmailValid] = useState(true);
// 	const [activeOption, setActiveOption] = useState<
// 		'email' | 'code' | 'bulk' | 'document'
// 	>('email');

// 	// File Input Ref
// 	const fileInputRef = useRef<HTMLInputElement>(null);

// 	// Validation Functions
// 	const validateEmail = (email: string) => {
// 		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 		return emailRegex.test(email);
// 	};

// 	// Single Email Invite Handler
// 	const handleInvite = async () => {
// 		if (!validateEmail(friendEmail)) {
// 			setIsEmailValid(false);
// 			setNotification({
// 				message: 'Please enter a valid email address.',
// 				type: 'error',
// 			});
// 			return;
// 		}

// 		try {
// 			const response = await fetch('/api/inviteFriend', {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({ friendEmail, userId }),
// 			});

// 			const data = await response.json();

// 			setNotification({
// 				message: data.success ? data.message : 'Invitation failed',
// 				type: data.success ? 'success' : 'error',
// 			});
// 		} catch (error) {
// 			setNotification({
// 				message: 'Something went wrong. Please try again.',
// 				type: 'error',
// 			});
// 		}
// 	};

// 	// Bulk Email Handling
// 	const addBulkEmail = () => {
// 		if (validateEmail(friendEmail)) {
// 			setBulkEmails([...bulkEmails, { email: friendEmail, status: 'pending' }]);
// 			setFriendEmail('');
// 		} else {
// 			setNotification({
// 				message: 'Invalid email address.',
// 				type: 'error',
// 			});
// 		}
// 	};

// 	const sendBulkEmails = async () => {
// 		try {
// 			const response = await fetch('/api/bulkInvite', {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({
// 					emails: bulkEmails.map((e) => e.email),
// 					message: emailMessage,
// 					userId,
// 				}),
// 			});

// 			const results = await response.json();
// 			setBulkEmails(
// 				bulkEmails.map((email, index) => ({
// 					...email,
// 					status: results[index].success ? 'sent' : 'failed',
// 				}))
// 			);

// 			setNotification({
// 				message: 'Bulk emails sent successfully.',
// 				type: 'success',
// 			});
// 		} catch (error) {
// 			setNotification({
// 				message: 'Failed to send bulk emails.',
// 				type: 'error',
// 			});
// 		}
// 	};

// 	// Document Upload and Processing
// 	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
// 		const file = event.target.files?.[0];
// 		if (file) {
// 			setUploadedDocument(file);

// 			const reader = new FileReader();
// 			reader.onload = (e) => {
// 				const text = e.target?.result as string;
// 				setDocumentText(text);
// 			};
// 			reader.readAsText(file);
// 		}
// 	};

// 	// AI-Assisted Editing
// 	const handleAiEdit = async () => {
// 		setIsAiEditing(true);
// 		try {
// 			const response = await fetch('/api/aiEditDocument', {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({
// 					text: documentText,
// 					userId,
// 				}),
// 			});

// 			const data = await response.json();
// 			setDocumentText(data.editedText);
// 			setNotification({
// 				message: 'Document edited by AI.',
// 				type: 'success',
// 			});
// 		} catch (error) {
// 			setNotification({
// 				message: 'AI editing failed.',
// 				type: 'error',
// 			});
// 		} finally {
// 			setIsAiEditing(false);
// 		}
// 	};

// 	// Render Email Section
// 	const renderEmailSection = () => (
// 		<motion.div className='section'>
// 			<div className='input-group'>
// 				<label className='label'>Friend&#39;s Email</label>
// 				<div className='flex'>
// 					<input
// 						type='email'
// 						value={friendEmail}
// 						onChange={(e) => {
// 							setFriendEmail(e.target.value);
// 							setIsEmailValid(true);
// 						}}
// 						placeholder='Enter your friend&#39;s email'
// 						className={`input ${isEmailValid ? '' : 'error'}`}
// 					/>
// 					<button onClick={handleInvite} className='btn'>
// 						<Mail />
// 					</button>
// 				</div>
// 				{!isEmailValid && (
// 					<span className='error-text'>
// 						Please enter a valid email address.
// 					</span>
// 				)}
// 			</div>
// 		</motion.div>
// 	);

// 	return (
// 		<div className='invite-form'>
// 			<div className='header'>
// 				<h1>Invite Friends</h1>
// 				<p>Invite friends, send bulk emails, and manage documents.</p>
// 			</div>

// 			{renderEmailSection()}
// 			{/* Additional sections for bulk email, document, etc., can be added */}
// 		</div>
// 	);
// };

// export default InviteForm;
