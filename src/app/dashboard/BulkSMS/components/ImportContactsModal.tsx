// app/(platform)/bulk-sms/components/ImportContactsModal.tsx
'use client';

import { useState } from 'react';
import { Modal } from '../components/ui/modal';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';
import { Upload } from 'lucide-react';

interface ImportContactsModalProps {
	isOpen: boolean;
	onClose: () => void;
	onContactsImported: (
		contacts: { phone: string; name?: string; group?: string }[]
	) => void;
}

export function ImportContactsModal({
	isOpen,
	onClose,
	onContactsImported,
}: ImportContactsModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsLoading(true);
		setError('');

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = e.target?.result;
				const workbook = XLSX.read(data, { type: 'array' });
				const sheetName = workbook.SheetNames[0];
				const sheet = workbook.Sheets[sheetName];
				const json = XLSX.utils.sheet_to_json<{
					phone: string;
					name?: string;
					group?: string;
				}>(sheet);

				// Validate and format contacts
				const validContacts = json
					.map((contact) => ({
						phone: contact.phone?.toString().trim() || '',
						name: contact.name?.toString().trim(),
						group: contact.group?.toString().trim(),
					}))
					.filter((contact) => /^[\d\s\-+()]+$/.test(contact.phone));

				if (validContacts.length === 0) {
					setError('No valid contacts found in the file');
					return;
				}

				onContactsImported(validContacts);
				onClose();
			} catch (err) {
				console.error('Error parsing Excel file:', err);
				setError('Failed to parse the file. Please check the format.');
			} finally {
				setIsLoading(false);
			}
		};
		reader.readAsArrayBuffer(file);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Import Contacts'>
			<div className='space-y-4'>
				<div>
					<p className='text-sm text-gray-300 mb-4'>
						Upload an Excel file with phone numbers. The first row should
						contain headers. Supported columns:{' '}
						<span className='text-purple-300'>phone</span>,
						<span className='text-purple-300'> name</span>,
						<span className='text-purple-300'> group</span>.
					</p>

					<div className='border-2 border-dashed border-gray-700 rounded-lg p-8 text-center'>
						<input
							type='file'
							accept='.xlsx,.xls,.csv'
							onChange={handleFileUpload}
							className='hidden'
							id='contacts-upload'
							disabled={isLoading}
						/>
						<label
							htmlFor='contacts-upload'
							className='cursor-pointer flex flex-col items-center'>
							<Upload className='h-8 w-8 text-gray-400 mb-2' />
							<span className='text-gray-300'>
								{isLoading ? 'Processing...' : 'Click to upload Excel file'}
							</span>
							<span className='text-gray-500 text-sm mt-1'>
								or drag and drop
							</span>
						</label>
					</div>
				</div>

				{error && <div className='text-red-400 text-sm mt-2'>{error}</div>}

				<div className='flex justify-end space-x-3 pt-4'>
					<Button variant='secondary' onClick={onClose} disabled={isLoading}>
						Cancel
					</Button>
				</div>
			</div>
		</Modal>
	);
}
