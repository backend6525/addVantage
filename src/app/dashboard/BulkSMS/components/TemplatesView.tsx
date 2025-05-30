'use client';

import { useState, useEffect } from 'react';
import {
	LayoutTemplate,
	Search,
	Plus,
	ChevronRight,
	Trash2,
} from 'lucide-react';
import { Modal } from '../components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pagination } from '../components/ui/pagination';
import { useToast } from '@/app/components/ui/toast/use-toast';

interface Template {
	id: string;
	name: string;
	content: string;
	category: string;
	lastUsed: string;
}

export default function TemplatesView() {
	const [templates, setTemplates] = useState<Template[]>([]);
	const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const templatesPerPage = 6;
	const { toast } = useToast();

	// Fetch templates from API
	useEffect(() => {
		const fetchTemplates = async () => {
			setIsLoading(true);
			try {
				// Get the auth token from sessionStorage
				const authToken = sessionStorage.getItem('userToken');
				if (!authToken) {
					throw new Error('Authentication required');
				}

				const response = await fetch('/api/sendBulkSms/templates', {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				// Transform the data to match your Template interface
				const formattedTemplates = data.map((template: any) => ({
					id: template._id,
					name: template.name,
					content: template.content,
					category: template.category,
					lastUsed: template._creationTime
						? new Date(template._creationTime).toISOString().split('T')[0]
						: 'N/A',
				}));

				setTemplates(formattedTemplates);
				setFilteredTemplates(formattedTemplates);
			} catch (error) {
				console.error('Failed to fetch templates:', error);
				toast({
					title: 'Error',
					description: 'Failed to load templates',
					variant: 'destructive',
				});
			} finally {
				setIsLoading(false);
			}
		};

		fetchTemplates();
	}, []);

	// Apply filters
	useEffect(() => {
		let result = [...templates];

		if (searchTerm) {
			result = result.filter(
				(template) =>
					template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					template.content.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (selectedCategory) {
			result = result.filter(
				(template) => template.category === selectedCategory
			);
		}

		setFilteredTemplates(result);
		setCurrentPage(1); // Reset to first page when filters change
	}, [searchTerm, selectedCategory, templates]);

	// Pagination logic
	const indexOfLastTemplate = currentPage * templatesPerPage;
	const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
	const currentTemplates = filteredTemplates.slice(
		indexOfFirstTemplate,
		indexOfLastTemplate
	);
	const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);

	const handleCreateTemplate = async (
		newTemplate: Omit<Template, 'id' | 'lastUsed'>
	) => {
		try {
			// Get the auth token from sessionStorage
			const authToken = sessionStorage.getItem('userToken');
			if (!authToken) {
				throw new Error('Authentication required');
			}

			const response = await fetch('/api/sendBulkSms/templates', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
				body: JSON.stringify(newTemplate),
			});

			const data = await response.json();

			if (!response.ok) {
				console.error('Server error response:', data);
				throw new Error(data.error || 'Failed to create template');
			}

			// Update local state
			setTemplates((prev) => [
				...prev,
				{
					...data,
					id: data._id,
					lastUsed: 'Just now',
				},
			]);

			toast({
				title: 'Success',
				description: 'Template created successfully',
			});
		} catch (error) {
			console.error('Error creating template:', error);
			toast({
				title: 'Error',
				description:
					error instanceof Error ? error.message : 'Failed to create template',
				variant: 'destructive',
			});
		}
	};

	const handleDeleteTemplate = async (id: string) => {
		try {
			const response = await fetch(`/api/templates?id=${id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete template');
			}

			setTemplates(templates.filter((template) => template.id !== id));

			toast({
				title: 'Success',
				description: 'Template deleted successfully',
			});
		} catch (error) {
			console.error('Error deleting template:', error);
			toast({
				title: 'Error',
				description: 'Failed to delete template',
				variant: 'destructive',
			});
		}
	};

	const categories = Array.from(new Set(templates.map((t) => t.category)));

	return (
		<div className='bg-slate-800/90 rounded-lg p-6 border border-slate-700/50'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-semibold text-white'>Message Templates</h2>
				<div className='flex space-x-3'>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
						<Input
							type='text'
							placeholder='Search templates...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='pl-10 w-64'
						/>
					</div>
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className='bg-slate-700/50 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50'>
						<option value=''>All Categories</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					<Button onClick={() => setIsCreateModalOpen(true)}>
						<Plus className='h-4 w-4 mr-2' />
						New Template
					</Button>
				</div>
			</div>

			{isLoading ? (
				<div className='flex justify-center items-center h-64'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
				</div>
			) : (
				<>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{currentTemplates.map((template) => (
							<div
								key={template.id}
								className='bg-slate-700/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500/30 transition-colors'>
								<div className='flex items-center justify-between mb-2'>
									<h3 className='font-medium text-white'>{template.name}</h3>
									<div className='flex items-center space-x-2'>
										<span className='text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded'>
											{template.category}
										</span>
										<button
											onClick={() => handleDeleteTemplate(template.id)}
											className='text-red-400 hover:text-red-300 p-1'>
											<Trash2 className='h-4 w-4' />
										</button>
									</div>
								</div>
								<p className='text-sm text-gray-300 mb-3 line-clamp-2'>
									{template.content}
								</p>
								<div className='flex items-center justify-between text-xs text-gray-400'>
									<span>Last used: {template.lastUsed}</span>
									<button className='text-purple-400 hover:text-purple-300 flex items-center'>
										Use template <ChevronRight className='h-3 w-3 ml-1' />
									</button>
								</div>
							</div>
						))}
					</div>

					{filteredTemplates.length === 0 && (
						<div className='text-center py-8 text-gray-400'>
							No templates found. Try adjusting your search or create a new
							template.
						</div>
					)}

					<div className='mt-6'>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={setCurrentPage}
						/>
					</div>
				</>
			)}

			{/* Create Template Modal */}
			<CreateTemplateModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onTemplateCreated={handleCreateTemplate}
				existingCategories={categories}
			/>
		</div>
	);
}

// Create Template Modal Component
function CreateTemplateModal({
	isOpen,
	onClose,
	onTemplateCreated,
	existingCategories,
}: {
	isOpen: boolean;
	onClose: () => void;
	onTemplateCreated: (template: Omit<Template, 'id' | 'lastUsed'>) => void;
	existingCategories: string[];
}) {
	const [name, setName] = useState('');
	const [content, setContent] = useState('');
	const [category, setCategory] = useState('');
	const [newCategory, setNewCategory] = useState('');
	const [isCreatingCategory, setIsCreatingCategory] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = () => {
		setIsLoading(true);
		try {
			const selectedCategoryValue =
				category === '_new' ? newCategory : category;
			onTemplateCreated({
				name,
				content,
				category: selectedCategoryValue,
			});
			setName('');
			setContent('');
			setCategory('');
			setNewCategory('');
			setIsCreatingCategory(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Create New Template'>
			<div className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Template Name *
					</label>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='e.g., Welcome Message'
						required
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Category *
					</label>
					<select
						value={category}
						onChange={(e) => {
							setCategory(e.target.value);
							setIsCreatingCategory(e.target.value === '_new');
						}}
						className='bg-slate-700/50 rounded-lg px-3 py-2 w-full text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50'>
						<option value=''>Select a category</option>
						{existingCategories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
						<option value='_new'>+ Create new category</option>
					</select>
					{isCreatingCategory && (
						<div className='mt-2'>
							<Input
								value={newCategory}
								onChange={(e) => setNewCategory(e.target.value)}
								placeholder='Enter new category name'
								className='mt-1'
							/>
						</div>
					)}
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1'>
						Message Content *
					</label>
					<Textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder='Enter your template message...'
						rows={5}
						required
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
						disabled={
							!name || !content || (!category && !newCategory) || isLoading
						}>
						{isLoading ? 'Creating...' : 'Create Template'}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
