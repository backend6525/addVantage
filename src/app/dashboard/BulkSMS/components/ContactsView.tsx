'use client';

import { useState, useEffect } from 'react';
import {
	Users,
	Search,
	Plus,
	Download,
	Upload,
	Trash2,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import { Modal } from '../components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '../components/ui/pagination';
import { ImportContactsModal } from './ImportContactsModal';
import { toast } from 'sonner';

interface Contact {
	_id: string;
	phone: string;
	name?: string;
	group?: string;
	lastContacted?: string;
}

export default function ContactsView() {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedGroup, setSelectedGroup] = useState('');
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isImportModalOpen, setIsImportModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const contactsPerPage = 10;

	// Fetch contacts from API
	useEffect(() => {
		fetchContacts();
	}, []);

	const fetchContacts = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/sendBulkSms/contacts');
			if (!response.ok) throw new Error('Failed to fetch contacts');
			const data = await response.json();
			setContacts(data);
			setFilteredContacts(data);
		} catch (error) {
			console.error('Failed to fetch contacts:', error);
			toast.error('Failed to fetch contacts');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		let result = [...contacts];

		if (searchTerm) {
			result = result.filter((contact) => {
				const phoneMatch = contact.phone.includes(searchTerm);
				const nameMatch = contact.name
					?.toLowerCase()
					.includes(searchTerm.toLowerCase());
				return phoneMatch || nameMatch;
			});
		}

		if (selectedGroup) {
			result = result.filter((contact) => contact.group === selectedGroup);
		}

		setFilteredContacts(result);
		setCurrentPage(1);
	}, [searchTerm, selectedGroup, contacts]);

	// Pagination logic
	const indexOfLastContact = currentPage * contactsPerPage;
	const indexOfFirstContact = indexOfLastContact - contactsPerPage;
	const currentContacts = filteredContacts.slice(
		indexOfFirstContact,
		indexOfLastContact
	);
	const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

	const handleAddContact = async (newContact: Omit<Contact, '_id'>) => {
		try {
			const response = await fetch('/api/sendBulkSms/contacts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newContact),
			});

			if (!response.ok) throw new Error('Failed to create contact');

			toast.success('Contact added successfully');
			fetchContacts(); // Refresh contacts list
			setIsAddModalOpen(false);
		} catch (error) {
			console.error('Error adding contact:', error);
			toast.error('Failed to add contact');
		}
	};

	const handleDeleteContact = async (id: string) => {
		try {
			console.log('Attempting to delete contact with ID:', id);
			const contact = currentContacts.find((c) => c._id === id);
			console.log('Contact object:', contact);

			if (!id || !contact) {
				toast.error('Invalid contact ID');
				return;
			}

			// Ensure the ID is a valid string
			const contactId = contact._id;
			console.log('Contact ID to delete:', contactId);

			const response = await fetch('/api/sendBulkSms/contacts', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ids: [contactId] }),
			});

			console.log('Delete response status:', response.status);

			if (!response.ok) {
				const errorData = await response.json();
				console.error('Delete error response:', errorData);
				throw new Error(errorData.error || 'Failed to delete contact');
			}

			const result = await response.json();
			console.log('Delete successful:', result);

			toast.success('Contact deleted successfully');
			fetchContacts(); // Refresh contacts list
		} catch (error) {
			console.error('Error deleting contact:', error);
			toast.error(
				error instanceof Error ? error.message : 'Failed to delete contact'
			);
		}
	};

	const groups = Array.from(
		new Set(contacts.map((c) => c.group).filter(Boolean) as string[])
	);

	return (
		<div className='bg-slate-800/90 rounded-lg p-6 border border-slate-700/50'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-semibold text-white'>Contact Management</h2>
				<div className='flex space-x-3'>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
						<Input
							type='text'
							placeholder='Search contacts...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='pl-10 w-64'
						/>
					</div>
					<select
						value={selectedGroup}
						onChange={(e) => setSelectedGroup(e.target.value)}
						className='bg-slate-700/50 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50'>
						<option value=''>All Groups</option>
						{groups.map((group) => (
							<option key={group} value={group}>
								{group}
							</option>
						))}
					</select>
					<Button
						variant='secondary'
						onClick={() => setIsImportModalOpen(true)}>
						<Upload className='h-4 w-4 mr-2' />
						Import
					</Button>
					<Button onClick={() => setIsAddModalOpen(true)}>
						<Plus className='h-4 w-4 mr-2' />
						Add Contact
					</Button>
				</div>
			</div>
			{isLoading ? (
				<div className='flex justify-center items-center h-64'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
				</div>
			) : (
				<>
					<div className='overflow-x-auto'>
						<table className='w-full text-sm text-left text-gray-400'>
							<thead className='text-xs text-gray-300 border-b border-slate-700/50'>
								<tr>
									<th className='px-6 py-3'>Phone Number</th>
									<th className='px-6 py-3'>Name</th>
									<th className='px-6 py-3'>Group</th>
									<th className='px-6 py-3'>Last Contacted</th>
									<th className='px-6 py-3'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{currentContacts.map((contact) => (
									<tr
										key={contact._id}
										className='border-b border-slate-700/50 hover:bg-slate-700/30'>
										<td className='px-6 py-4'>{contact.phone}</td>
										<td className='px-6 py-4'>{contact.name || '-'}</td>
										<td className='px-6 py-4'>
											{contact.group ? (
												<span className='text-xs bg-slate-600/50 text-gray-300 px-2 py-1 rounded'>
													{contact.group}
												</span>
											) : (
												'-'
											)}
										</td>
										<td className='px-6 py-4'>
											{contact.lastContacted || 'Never'}
										</td>
										<td className='px-6 py-4'>
											<button
												onClick={() => handleDeleteContact(contact._id)}
												className='text-red-400 hover:text-red-300 flex items-center'>
												<Trash2 className='h-4 w-4 mr-1' />
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{filteredContacts.length === 0 && (
						<div className='text-center py-8 text-gray-400'>
							No contacts found. Try adjusting your search or add a new contact.
						</div>
					)}

					{filteredContacts.length > 0 && (
						<div className='mt-4'>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
							/>
						</div>
					)}
				</>
			)}
			{/* Add Contact Modal */}
			<AddContactModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				onContactAdded={handleAddContact}
				existingGroups={groups}
			/>

			<ImportContactsModal
				isOpen={isImportModalOpen}
				onClose={() => setIsImportModalOpen(false)}
				onContactsImported={async (newContacts) => {
					try {
						const response = await fetch('/api/sendBulkSms/contacts', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(newContacts),
						});

						if (!response.ok) throw new Error('Failed to import contacts');

						toast.success('Contacts imported successfully');
						fetchContacts(); // Refresh contacts list
					} catch (error) {
						console.error('Error importing contacts:', error);
						toast.error('Failed to import contacts');
					}
				}}
			/>
		</div>
	);
}

// Add Contact Modal Component
function AddContactModal({
	isOpen,
	onClose,
	onContactAdded,
	existingGroups,
}: {
	isOpen: boolean;
	onClose: () => void;
	onContactAdded: (contact: Omit<Contact, '_id'>) => void;
	existingGroups: string[];
}) {
	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');
	const [group, setGroup] = useState('');
	const [newGroup, setNewGroup] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		if (!phone.trim()) {
			toast.error('Phone number is required');
			return;
		}

		if (group === 'new' && !newGroup.trim()) {
			toast.error('Please enter a group name');
			return;
		}

		setIsLoading(true);
		try {
			await onContactAdded({
				phone: phone.trim(),
				name: name.trim() || undefined,
				group: group === 'new' ? newGroup.trim() : group || undefined,
			});
			setPhone('');
			setName('');
			setGroup('');
			setNewGroup('');
		} catch (error) {
			console.error('Error adding contact:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Add New Contact'>
			<div className='space-y-4'>
				<p className='text-sm text-gray-400 mb-4'>
					Enter the contact details below
				</p>
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Phone Number *
					</label>
					<Input
						type='tel'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder='+1234567890'
						className='w-full'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Name
					</label>
					<Input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='John Doe'
						className='w-full'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Group
					</label>
					<select
						value={group}
						onChange={(e) => setGroup(e.target.value)}
						className='w-full bg-slate-700/50 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50'>
						<option value=''>Select a group</option>
						{existingGroups.map((g) => (
							<option key={g} value={g}>
								{g}
							</option>
						))}
						<option value='new'>Create new group</option>
					</select>
				</div>
				{group === 'new' && (
					<div>
						<label className='block text-sm font-medium text-gray-300 mb-1'>
							New Group Name
						</label>
						<Input
							type='text'
							value={newGroup}
							onChange={(e) => setNewGroup(e.target.value)}
							placeholder='Enter group name'
							className='w-full'
						/>
					</div>
				)}
				<div className='flex justify-end space-x-3 pt-4'>
					<Button variant='secondary' onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? (
							<div className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
						) : (
							'Add Contact'
						)}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
