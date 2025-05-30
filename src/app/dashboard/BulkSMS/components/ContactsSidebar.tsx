'use client';

import React, { useState, useEffect } from 'react';
import {
	Users,
	Search,
	Phone,
	X,
	PlusCircle,
	ChevronLeft,
	Upload,
	Download,
	UserPlus,
	Save,
	Trash2,
	CheckCircle2,
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

interface Contact {
	phone: string;
	name: string;
	group: string;
	createdAt: string;
}

interface ContactGroup {
	id: string;
	name: string;
	contacts: string[];
	createdAt: string;
}

interface ContactsSidebarProps {
	showContactsSidebar: boolean;
	setShowContactsSidebar: (show: boolean) => void;
	contacts: string[];
	setContacts: (contacts: string[]) => void;
}

export default function ContactsSidebar({
	showContactsSidebar,
	setShowContactsSidebar,
	contacts,
	setContacts,
}: ContactsSidebarProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [manualContact, setManualContact] = useState('');
	const [contactName, setContactName] = useState('');
	const [contactGroup, setContactGroup] = useState('');
	const [newGroupName, setNewGroupName] = useState('');
	const [contactGroups, setContactGroups] = useState<ContactGroup[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<string>('');
	const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
	const [showImportModal, setShowImportModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch contacts on component mount and when sidebar is shown
	useEffect(() => {
		if (showContactsSidebar) {
			fetchContacts();
		}
	}, [showContactsSidebar]);

	// Fetch contacts from the API
	const fetchContacts = async () => {
		try {
			const response = await fetch('/api/sendBulkSms/contacts');
			if (!response.ok) throw new Error('Failed to fetch contacts');
			const data = await response.json();
			setContacts(data.map((contact: Contact) => contact.phone));
		} catch (error) {
			console.error('Error fetching contacts:', error);
			toast.error('Failed to fetch contacts');
		}
	};

	// Handle Excel file import
	const handleExcelImport = (file: File) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const data = e.target?.result;
			const workbook = XLSX.read(data, { type: 'binary' });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

			// Extract phone numbers from Excel
			const phoneNumbers = json
				.flat()
				.filter(
					(contact): contact is string =>
						typeof contact === 'string' &&
						contact.trim() !== '' &&
						/^[\d\s\-+()]+$/.test(contact.trim())
				);

			// Filter out duplicates and add to contacts
			const uniqueContacts = [...new Set([...contacts, ...phoneNumbers])];
			setContacts(uniqueContacts);
			toast.success('Contacts imported successfully');
			setShowImportModal(false);
		};
		reader.readAsBinaryString(file);
	};

	// Create new contact group
	const handleCreateGroup = () => {
		if (newGroupName.trim() && contacts.length > 0) {
			const newGroup: ContactGroup = {
				id: Date.now().toString(),
				name: newGroupName.trim(),
				contacts: [...contacts],
				createdAt: new Date().toISOString(),
			};
			setContactGroups([...contactGroups, newGroup]);
			setNewGroupName('');
			setShowCreateGroupModal(false);
			toast.success('Group created successfully');
		}
	};

	// Load contacts from group
	const loadGroupContacts = (groupId: string) => {
		const group = contactGroups.find((g) => g.id === groupId);
		if (group) {
			setContacts(group.contacts);
			setSelectedGroup(groupId);
		}
	};

	// Delete contact group
	const deleteGroup = (groupId: string) => {
		setContactGroups(contactGroups.filter((g) => g.id !== groupId));
		if (selectedGroup === groupId) {
			setSelectedGroup('');
			setContacts([]);
		}
	};

	// Export contacts to Excel
	const exportToExcel = () => {
		const ws = XLSX.utils.aoa_to_sheet([
			['Phone Numbers'],
			...contacts.map((c) => [c]),
		]);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Contacts');
		XLSX.writeFile(wb, 'contacts.xlsx');
	};

	// Add a single contact manually
	const addManualContact = async () => {
		if (!manualContact.trim()) {
			toast.error('Please enter a phone number');
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch('/api/sendBulkSms/contacts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					phone: manualContact.trim(),
					name: contactName.trim(),
					group: contactGroup.trim(),
				}),
			});

			if (!response.ok) throw new Error('Failed to create contact');

			toast.success('Contact added successfully');
			setManualContact('');
			setContactName('');
			setContactGroup('');
			fetchContacts(); // Refresh contacts list
		} catch (error) {
			console.error('Error adding contact:', error);
			toast.error('Failed to add contact');
		} finally {
			setIsLoading(false);
		}
	};

	// Remove a contact
	const removeContact = async (contact: string) => {
		try {
			const response = await fetch('/api/sendBulkSms/contacts', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ids: [contact] }),
			});

			if (!response.ok) throw new Error('Failed to delete contact');

			toast.success('Contact deleted successfully');
			fetchContacts(); // Refresh contacts list
		} catch (error) {
			console.error('Error deleting contact:', error);
			toast.error('Failed to delete contact');
		}
	};

	// Filter contacts by search term
	const filteredContacts = contacts.filter((contact) =>
		contact.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div
			className={`${
				showContactsSidebar ? 'w-80' : 'w-0'
			} border-r border-slate-700/50 transition-all duration-300 overflow-hidden`}>
			<div className='p-4 h-full flex flex-col'>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-lg font-semibold text-white'>Contacts</h2>
					<div className='flex items-center space-x-2'>
						<button
							onClick={() => setShowImportModal(true)}
							className='p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50'
							title='Import from Excel'>
							<Upload className='h-4 w-4' />
						</button>
						<button
							onClick={exportToExcel}
							className='p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50'
							title='Export to Excel'>
							<Download className='h-4 w-4' />
						</button>
						<button
							onClick={() => setShowContactsSidebar(false)}
							className='text-gray-400 hover:text-white'>
							<ChevronLeft className='h-5 w-5' />
						</button>
					</div>
				</div>

				{/* Contact Groups */}
				<div className='mb-4'>
					<div className='flex items-center justify-between mb-2'>
						<h3 className='text-sm font-medium text-gray-300'>
							Contact Groups
						</h3>
						<button
							onClick={() => setShowCreateGroupModal(true)}
							className='p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-slate-700/50'
							title='Create New Group'>
							<UserPlus className='h-4 w-4' />
						</button>
					</div>
					<div className='space-y-2 max-h-[150px] overflow-y-auto'>
						{contactGroups.map((group) => (
							<div
								key={group.id}
								className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
									selectedGroup === group.id
										? 'bg-purple-600/20 border border-purple-500/30'
										: 'bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50'
								}`}
								onClick={() => loadGroupContacts(group.id)}>
								<div className='flex items-center space-x-2'>
									<Users className='h-4 w-4 text-gray-400' />
									<span className='text-sm text-gray-300'>{group.name}</span>
									<span className='text-xs text-gray-500'>
										({group.contacts.length})
									</span>
								</div>
								<button
									onClick={(e) => {
										e.stopPropagation();
										deleteGroup(group.id);
									}}
									className='p-1 text-gray-400 hover:text-red-400 rounded'>
									<Trash2 className='h-3.5 w-3.5' />
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Search Bar */}
				<div className='relative mb-4'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
					<input
						type='text'
						placeholder='Search contacts...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50'
					/>
				</div>

				{/* Add Contact Form */}
				<div className='mb-4 space-y-2'>
					<input
						type='text'
						placeholder='Phone Number'
						value={manualContact}
						onChange={(e) => setManualContact(e.target.value)}
						className='w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50'
					/>
					<input
						type='text'
						placeholder='Name (optional)'
						value={contactName}
						onChange={(e) => setContactName(e.target.value)}
						className='w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50'
					/>
					<input
						type='text'
						placeholder='Group/Category (optional)'
						value={contactGroup}
						onChange={(e) => setContactGroup(e.target.value)}
						className='w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50'
					/>
					<button
						onClick={addManualContact}
						disabled={isLoading}
						className='w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
						{isLoading ? (
							<div className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
						) : (
							<>
								<UserPlus className='h-4 w-4' />
								<span>Add Contact</span>
							</>
						)}
					</button>
				</div>

				{/* Contacts List */}
				<div className='flex-1 overflow-y-auto'>
					{filteredContacts.length === 0 ? (
						<div className='text-center text-gray-400 py-4'>
							No contacts found
						</div>
					) : (
						<div className='space-y-2'>
							{filteredContacts.map((contact) => (
								<div
									key={contact}
									className='flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg'>
									<div className='flex items-center space-x-2'>
										<Phone className='h-4 w-4 text-gray-400' />
										<span className='text-white'>{contact}</span>
									</div>
									<button
										onClick={() => removeContact(contact)}
										className='p-1 text-gray-400 hover:text-red-400 rounded-lg hover:bg-slate-700/50'>
										<X className='h-4 w-4' />
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Import Modal */}
			{showImportModal && (
				<div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50'>
					<div className='bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full border border-gray-700 animate-fade-in'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-xl font-semibold text-blue-400 flex items-center'>
								<Upload className='h-5 w-5 mr-2' />
								Import Contacts
							</h3>
							<button
								onClick={() => setShowImportModal(false)}
								className='p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-all duration-300'>
								<X className='h-5 w-5' />
							</button>
						</div>
						<div className='space-y-4'>
							<p className='text-gray-300 text-sm'>
								Upload an Excel file containing phone numbers. The first row
								will be treated as headers.
							</p>
							<div className='border-2 border-dashed border-gray-700 rounded-lg p-8 text-center'>
								<input
									type='file'
									accept='.xlsx,.xls'
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file) handleExcelImport(file);
									}}
									className='hidden'
									id='excel-upload'
								/>
								<label
									htmlFor='excel-upload'
									className='cursor-pointer flex flex-col items-center'>
									<Upload className='h-8 w-8 text-gray-400 mb-2' />
									<span className='text-gray-300'>
										Click to upload Excel file
									</span>
									<span className='text-gray-500 text-sm mt-1'>
										or drag and drop
									</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Create Group Modal */}
			{showCreateGroupModal && (
				<div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50'>
					<div className='bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full border border-gray-700 animate-fade-in'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-xl font-semibold text-blue-400 flex items-center'>
								<UserPlus className='h-5 w-5 mr-2' />
								Create Contact Group
							</h3>
							<button
								onClick={() => setShowCreateGroupModal(false)}
								className='p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-all duration-300'>
								<X className='h-5 w-5' />
							</button>
						</div>
						<div className='space-y-4'>
							<div>
								<label className='text-sm text-gray-400'>Group Name</label>
								<input
									type='text'
									value={newGroupName}
									onChange={(e) => setNewGroupName(e.target.value)}
									placeholder='Enter group name'
									className='w-full mt-1 p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50'
								/>
							</div>
							<div className='flex justify-end space-x-3'>
								<button
									onClick={() => setShowCreateGroupModal(false)}
									className='px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors'>
									Cancel
								</button>
								<button
									onClick={handleCreateGroup}
									disabled={!newGroupName.trim() || contacts.length === 0}
									className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2'>
									<Save className='h-4 w-4' />
									<span>Create Group</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
