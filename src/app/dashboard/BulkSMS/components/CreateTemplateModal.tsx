// app/(platform)/bulk-sms/components/CreateTemplateModal.tsx
'use client';

import { useState } from 'react';
import { Modal } from '../components/ui/modal';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';

interface CreateTemplateModalProps {
	isOpen: boolean;
	onClose: () => void;
	onTemplateCreated: (template: {
		name: string;
		content: string;
		category: string;
	}) => void;
}

export function CreateTemplateModal({
	isOpen,
	onClose,
	onTemplateCreated,
}: CreateTemplateModalProps) {
	const [name, setName] = useState('');
	const [content, setContent] = useState('');
	const [category, setCategory] = useState('General');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			await onTemplateCreated({ name, content, category });
			onClose();
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Create New Template'>
			<div className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Template Name
					</label>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='e.g., Welcome Message'
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Category
					</label>
					<Select value={category} onValueChange={setCategory}>
						<SelectTrigger>
							<SelectValue placeholder='Select a category' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='General'>General</SelectItem>
							<SelectItem value='Marketing'>Marketing</SelectItem>
							<SelectItem value='Notification'>Notification</SelectItem>
							<SelectItem value='Reminder'>Reminder</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Message Content
					</label>
					<Textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder='Enter your template message...'
						rows={5}
					/>
					<p className='text-xs text-gray-500 mt-1'>
						{160 - content.length} characters remaining
					</p>
				</div>

				<div className='flex justify-end space-x-3 pt-4'>
					<Button variant='secondary' onClick={onClose}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={!name || !content || isLoading}>
						{isLoading ? 'Creating...' : 'Create Template'}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
