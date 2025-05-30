// app/(platform)/bulk-sms/components/AddContactModal.tsx
'use client';

import { useState } from 'react';
import { Modal } from '../components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddContactModalProps {
	isOpen: boolean;
	onClose: () => void;
	onContactAdded: (contact: {
		phone: string;
		name: string;
		group: string;
	}) => void;
}

export function AddContactModal({
	isOpen,
	onClose,
	onContactAdded,
}: AddContactModalProps) {
	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');
	const [group, setGroup] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			await onContactAdded({ phone, name, group });
			onClose();
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Add New Contact'>
			<div className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Phone Number
					</label>
					<Input
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder='+1234567890'
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Name (Optional)
					</label>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='John Doe'
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Group (Optional)
					</label>
					<Input
						value={group}
						onChange={(e) => setGroup(e.target.value)}
						placeholder='Customers'
					/>
				</div>

				<div className='flex justify-end space-x-3 pt-4'>
					<Button variant='secondary' onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={!phone || isLoading}>
						{isLoading ? 'Adding...' : 'Add Contact'}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
