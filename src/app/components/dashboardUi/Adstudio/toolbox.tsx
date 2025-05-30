// import React, { useState } from 'react';
// import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
// import {
// 	Upload as UploadIcon,
// 	LayoutTemplate as TemplateIcon,
// 	Search as SearchIcon,
// 	Plus as PlusIcon,
// 	Info as InfoIcon,
// 	ArrowRight as ArrowRightIcon,
// } from 'lucide-react';

// // Node types that can be dragged onto the canvas
// const nodeTypes = [
// 	{
// 		id: 'create-ad',
// 		type: 'create-ad',
// 		label: 'Create Ad',
// 		description: 'Starting point ',
// 		icon: '📝',
// 		category: 'core',
// 	},
// 	{
// 		id: 'designer',
// 		type: 'designer',
// 		label: 'Ad Designer',
// 		description: 'Customize ad appearance',
// 		icon: '🎨',
// 		category: 'core',
// 	},
// 	{
// 		id: 'platform',
// 		type: 'platform',
// 		label: 'Platform',
// 		description: 'Select distribution platform',
// 		icon: '📱',
// 		category: 'distribution',
// 	},
// 	{
// 		id: 'audience',
// 		type: 'audience',
// 		label: 'Audience',
// 		description: 'Define target audience',
// 		icon: '👥',
// 		category: 'targeting',
// 	},
// 	{
// 		id: 'budget',
// 		type: 'budget',
// 		label: 'Budget',
// 		description: 'Set campaign budget',
// 		icon: '💰',
// 		category: 'management',
// 	},
// 	{
// 		id: 'schedule',
// 		type: 'schedule',
// 		label: 'Schedule',
// 		description: 'Set campaign timeline',
// 		icon: '📅',
// 		category: 'management',
// 	},
// 	{
// 		id: 'metrics',
// 		type: 'metrics',
// 		label: 'Metrics',
// 		description: 'Configure success metrics',
// 		icon: '📊',
// 		category: 'analytics',
// 	},
// ];

// // Component for a draggable node in the toolbox - made more compact
// const DraggableNodeItem: React.FC<{
// 	node: (typeof nodeTypes)[0];
// 	onDragStart: (e: React.DragEvent, type: string) => void;
// 	onAddNode: (type: string) => void;
// }> = ({ node, onDragStart, onAddNode }) => {
// 	return (
// 		<div
// 			className='p-2 mb-2 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm cursor-grab hover:bg-gray-700/50 transition-all duration-300 group'
// 			draggable
// 			onDragStart={(e) => onDragStart(e, node.type)}>
// 			<div className='flex items-center gap-2'>
// 				<div className='flex items-center justify-center w-8 h-8 bg-gray-700/50 rounded-lg text-xl group-hover:bg-gray-600/50 transition-colors duration-300'>
// 					{node.icon}
// 				</div>
// 				<div className='flex-1'>
// 					<h3 className='font-medium text-sm text-gray-100'>{node.label}</h3>
// 					<p className='text-xs text-gray-400 truncate'>{node.description}</p>
// 				</div>
// 				<button
// 					onClick={() => onAddNode(node.type)}
// 					className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-700/50 hover:bg-blue-600/50 text-gray-400 hover:text-white transition-colors duration-300'>
// 					<PlusIcon className='w-3 h-3' />
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// // Simplified category filter as tabs
// const CategoryFilter: React.FC<{
// 	categories: string[];
// 	activeCategory: string;
// 	onCategoryChange: (category: string) => void;
// }> = ({ categories, activeCategory, onCategoryChange }) => {
// 	return (
// 		<div className='flex overflow-x-auto gap-1 pb-2 no-scrollbar'>
// 			<button
// 				className={`px-2 py-1 text-xs rounded-full whitespace-nowrap transition-colors duration-300 ${
// 					activeCategory === 'all'
// 						? 'bg-blue-600 text-white'
// 						: 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
// 				}`}
// 				onClick={() => onCategoryChange('all')}>
// 				All
// 			</button>
// 			{categories.map((category) => (
// 				<button
// 					key={category}
// 					className={`px-2 py-1 text-xs rounded-full whitespace-nowrap transition-colors duration-300 ${
// 						activeCategory === category
// 							? 'bg-blue-600 text-white'
// 							: 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
// 					}`}
// 					onClick={() => onCategoryChange(category)}>
// 					{category.charAt(0).toUpperCase() + category.slice(1)}
// 				</button>
// 			))}
// 		</div>
// 	);
// };

// const AdStudioToolbox: React.FC = () => {
// 	const { addNode } = useAdStudio();
// 	const [searchTerm, setSearchTerm] = useState('');
// 	const [activeCategory, setActiveCategory] = useState('all');
// 	const [isInfoVisible, setIsInfoVisible] = useState(false);

// 	// Extract unique categories
// 	const categories = Array.from(
// 		new Set(nodeTypes.map((node) => node.category))
// 	);

// 	// Handle node drag start
// 	const handleDragStart = (e: React.DragEvent, type: string) => {
// 		e.dataTransfer.setData('application/reactflow', type);
// 		e.dataTransfer.effectAllowed = 'move';
// 	};

// 	// Handle dropping a node on the canvas from the toolbox
// 	const handleAddNode = (type: string) => {
// 		const nodeTemplate = nodeTypes.find((n) => n.type === type);
// 		if (!nodeTemplate) return;

// 		// Generate a position near the center of the canvas
// 		const position = {
// 			x: 200 + Math.random() * 100,
// 			y: 200 + Math.random() * 100,
// 		};

// 		addNode({
// 			type,
// 			position,
// 			data: {
// 				label: nodeTemplate.label,
// 				description: nodeTemplate.description,
// 				icon: nodeTemplate.icon,
// 			},
// 		});
// 	};

// 	// Filter nodes based on search term and category
// 	const filteredNodes = nodeTypes.filter((node) => {
// 		const matchesSearch =
// 			node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
// 			node.description.toLowerCase().includes(searchTerm.toLowerCase());
// 		const matchesCategory =
// 			activeCategory === 'all' || node.category === activeCategory;
// 		return matchesSearch && matchesCategory;
// 	});

// 	return (
// 		<div className='h-full flex flex-col overflow-hidden bg-gray-900/50 backdrop-blur-sm'>
// 			{/* Toolbox Header - Reduced padding and spacing */}
// 			<div className='sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 p-2 border-b border-gray-700/50'>
// 				<div className='flex items-center justify-between mb-2'>
// 					<h2 className='text-base font-semibold text-gray-100'>
// 						Ad Studio Nodes
// 					</h2>
// 					<button
// 						className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-gray-200 transition-colors duration-300'
// 						onClick={() => setIsInfoVisible(!isInfoVisible)}>
// 						<InfoIcon className='w-4 h-4' />
// 					</button>
// 				</div>

// 				{isInfoVisible && (
// 					<div className='bg-gray-800/70 rounded-lg p-2 mb-2 text-xs text-gray-300 border border-gray-700/50'>
// 						<p>Drag nodes onto the canvas to build your workflow.</p>
// 					</div>
// 				)}

// 				{/* Search input - Reduced height */}
// 				<div className='relative mb-2'>
// 					<input
// 						type='text'
// 						placeholder='Search nodes...'
// 						className='w-full pl-8 pr-4 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-transparent'
// 						value={searchTerm}
// 						onChange={(e) => setSearchTerm(e.target.value)}
// 					/>
// 					<SearchIcon className='absolute left-2 top-2 h-3.5 w-3.5 text-gray-500' />
// 				</div>

// 				{/* Category filter */}
// 				<CategoryFilter
// 					categories={categories}
// 					activeCategory={activeCategory}
// 					onCategoryChange={setActiveCategory}
// 				/>
// 			</div>

// 			{/* Node List - Fixed height to avoid scrolling */}
// 			<div className='flex-1 p-2 space-y-1'>
// 				{filteredNodes.length > 0 ? (
// 					filteredNodes.map((node) => (
// 						<DraggableNodeItem
// 							key={node.id}
// 							node={node}
// 							onDragStart={handleDragStart}
// 							onAddNode={handleAddNode}
// 						/>
// 					))
// 				) : (
// 					<div className='flex flex-col items-center justify-center h-24 text-gray-400 text-xs p-2 text-center'>
// 						<SearchIcon className='h-4 w-4 mb-1 opacity-50' />
// 						<p>No nodes found.</p>
// 						<p className='text-xs mt-1'>Try different search terms.</p>
// 					</div>
// 				)}
// 			</div>

// 			{/* Actions Section - Fixed at bottom */}
// 			<div className='p-2 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50 mt-32'>
// 				<h3 className='text-xs font-medium text-gray-100 mb-1.5'>Actions</h3>
// 				<div className='grid grid-cols-2 gap-2'>
// 					<button
// 						className='py-1.5 px-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 text-xs flex items-center justify-center gap-1'
// 						onClick={() => console.log('Import workflow')}>
// 						<UploadIcon className='w-3.5 h-3.5' />
// 						<span>Import</span>
// 					</button>

// 					<button
// 						className='py-1.5 px-2 bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 text-xs flex items-center justify-center gap-1'
// 						onClick={() => console.log('Templates')}>
// 						<TemplateIcon className='w-3.5 h-3.5' />
// 						<span>Templates</span>
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default AdStudioToolbox;

import React, { useState, useCallback, useMemo } from 'react';
import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
import {
	Upload as UploadIcon,
	LayoutTemplate as TemplateIcon,
	Search as SearchIcon,
	Plus as PlusIcon,
	Info as InfoIcon,
	ArrowRight as ArrowRightIcon,
} from 'lucide-react';

// Node types that can be dragged onto the canvas
const nodeTypes = [
	{
		id: 'create-ad',
		type: 'create-ad',
		label: 'Create Ad',
		description: 'Starting point ',
		icon: '📝',
		category: 'core',
	},
	{
		id: 'designer',
		type: 'designer',
		label: 'Ad Designer',
		description: 'Customize ad appearance',
		icon: '🎨',
		category: 'core',
	},
	{
		id: 'platform',
		type: 'platform',
		label: 'Platform',
		description: 'Select distribution platform',
		icon: '📱',
		category: 'distribution',
	},
	{
		id: 'audience',
		type: 'audience',
		label: 'Audience',
		description: 'Define target audience',
		icon: '👥',
		category: 'targeting',
	},
	{
		id: 'budget',
		type: 'budget',
		label: 'Budget',
		description: 'Set campaign budget',
		icon: '💰',
		category: 'management',
	},
	{
		id: 'schedule',
		type: 'schedule',
		label: 'Schedule',
		description: 'Set campaign timeline',
		icon: '📅',
		category: 'management',
	},
	{
		id: 'metrics',
		type: 'metrics',
		label: 'Metrics',
		description: 'Configure success metrics',
		icon: '📊',
		category: 'analytics',
	},
];

// Tooltip component for better UI feedback
const Tooltip: React.FC<{
	children: React.ReactNode;
	content: string;
}> = ({ children, content }) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div
			className='relative'
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
			onFocus={() => setIsVisible(true)}
			onBlur={() => setIsVisible(false)}>
			{children}
			{isVisible && (
				<div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-xs text-white rounded whitespace-nowrap z-50'>
					{content}
					<div className='absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45'></div>
				</div>
			)}
		</div>
	);
};

// Component for a draggable node in the toolbox - made more compact and accessible
const DraggableNodeItem: React.FC<{
	node: (typeof nodeTypes)[0];
	onDragStart: (e: React.DragEvent, type: string) => void;
	onAddNode: (type: string) => void;
}> = ({ node, onDragStart, onAddNode }) => {
	const [isDragging, setIsDragging] = useState(false);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onAddNode(node.type);
		}
	};

	return (
		<div
			className={`p-2 mb-2 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm cursor-grab hover:bg-gray-700/50 transition-all duration-300 group ${
				isDragging ? 'ring-2 ring-blue-500 opacity-50' : ''
			}`}
			draggable
			onDragStart={(e) => {
				setIsDragging(true);
				onDragStart(e, node.type);
			}}
			onDragEnd={() => setIsDragging(false)}
			tabIndex={0}
			onKeyDown={handleKeyDown}
			role='button'
			aria-label={`Add ${node.label} node to canvas`}>
			<div className='flex items-center gap-2'>
				<div className='flex items-center justify-center w-8 h-8 bg-gray-700/50 rounded-lg text-xl group-hover:bg-gray-600/50 transition-colors duration-300'>
					{node.icon}
				</div>
				<div className='flex-1'>
					<h3 className='font-medium text-sm text-gray-100'>{node.label}</h3>
					<p className='text-xs text-gray-400 truncate'>{node.description}</p>
				</div>
				<Tooltip content={`Add ${node.label} to canvas`}>
					<button
						onClick={() => onAddNode(node.type)}
						className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-700/50 hover:bg-blue-600/50 text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
						aria-label={`Add ${node.label} node`}>
						<PlusIcon className='w-3 h-3' />
					</button>
				</Tooltip>
			</div>
		</div>
	);
};

// Simplified category filter as tabs with keyboard navigation
const CategoryFilter: React.FC<{
	categories: string[];
	activeCategory: string;
	onCategoryChange: (category: string) => void;
}> = ({ categories, activeCategory, onCategoryChange }) => {
	const handleKeyDown = (e: React.KeyboardEvent, category: string) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onCategoryChange(category);
		}
	};

	return (
		<div
			className='flex overflow-x-auto gap-1 pb-2 no-scrollbar'
			role='tablist'>
			<button
				role='tab'
				aria-selected={activeCategory === 'all'}
				className={`px-2 py-1 text-xs rounded-full whitespace-nowrap transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
					activeCategory === 'all'
						? 'bg-blue-600 text-white'
						: 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
				}`}
				onClick={() => onCategoryChange('all')}
				onKeyDown={(e) => handleKeyDown(e, 'all')}>
				All
			</button>
			{categories.map((category) => (
				<button
					key={category}
					role='tab'
					aria-selected={activeCategory === category}
					className={`px-2 py-1 text-xs rounded-full whitespace-nowrap transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
						activeCategory === category
							? 'bg-blue-600 text-white'
							: 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
					}`}
					onClick={() => onCategoryChange(category)}
					onKeyDown={(e) => handleKeyDown(e, category)}>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</button>
			))}
		</div>
	);
};

// Function to get recently used nodes from localStorage
const getRecentlyUsedNodes = () => {
	try {
		const storedNodes = localStorage.getItem('recentlyUsedNodes');
		return storedNodes ? JSON.parse(storedNodes) : [];
	} catch (error) {
		console.error('Error getting recently used nodes:', error);
		return [];
	}
};

// Function to save recently used node to localStorage
const saveRecentlyUsedNode = (nodeType: string) => {
	try {
		const recentNodes = getRecentlyUsedNodes();
		const updatedNodes = [
			nodeType,
			...recentNodes.filter((type) => type !== nodeType),
		].slice(0, 3); // Keep only the 3 most recent

		localStorage.setItem('recentlyUsedNodes', JSON.stringify(updatedNodes));
	} catch (error) {
		console.error('Error saving recently used node:', error);
	}
};

const AdStudioToolbox: React.FC = () => {
	const { addNode } = useAdStudio();
	const [searchTerm, setSearchTerm] = useState('');
	const [activeCategory, setActiveCategory] = useState('all');
	const [isInfoVisible, setIsInfoVisible] = useState(false);
	const [feedback, setFeedback] = useState<{
		message: string;
		visible: boolean;
	}>({
		message: '',
		visible: false,
	});
	const [recentlyUsed, setRecentlyUsed] = useState<string[]>(
		getRecentlyUsedNodes()
	);

	// Extract unique categories
	const categories = useMemo(() => {
		return Array.from(new Set(nodeTypes.map((node) => node.category)));
	}, []);

	// Filter nodes based on search term and category
	const filteredNodes = useMemo(() => {
		return nodeTypes.filter((node) => {
			const matchesSearch =
				node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
				node.description.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory =
				activeCategory === 'all' || node.category === activeCategory;
			return matchesSearch && matchesCategory;
		});
	}, [searchTerm, activeCategory]);

	// Get recently used nodes
	const recentNodes = useMemo(() => {
		return recentlyUsed
			.map((type) => nodeTypes.find((node) => node.type === type))
			.filter(Boolean) as (typeof nodeTypes)[0][];
	}, [recentlyUsed]);

	// Handle node drag start
	const handleDragStart = useCallback((e: React.DragEvent, type: string) => {
		e.dataTransfer.setData('application/reactflow', type);
		e.dataTransfer.effectAllowed = 'move';
	}, []);

	// Handle dropping a node on the canvas from the toolbox
	const handleAddNode = useCallback(
		(type: string) => {
			const nodeTemplate = nodeTypes.find((n) => n.type === type);
			if (!nodeTemplate) return;

			// Generate a position near the center of the canvas
			const position = {
				x: 200 + Math.random() * 100,
				y: 200 + Math.random() * 100,
			};

			addNode({
				type,
				position,
				data: {
					label: nodeTemplate.label,
					description: nodeTemplate.description,
					icon: nodeTemplate.icon,
				},
			});

			// Show feedback
			setFeedback({
				message: `Added ${nodeTemplate.label} to canvas`,
				visible: true,
			});

			// Hide feedback after 2 seconds
			setTimeout(() => {
				setFeedback((prev) => ({ ...prev, visible: false }));
			}, 2000);

			// Save to recently used
			saveRecentlyUsedNode(type);
			setRecentlyUsed(getRecentlyUsedNodes());
		},
		[addNode]
	);

	// Handle search input keydown events
	const handleSearchKeyDown = (e: React.KeyboardEvent) => {
		// Clear search on Escape
		if (e.key === 'Escape') {
			setSearchTerm('');
		}
	};

	return (
		<div className='h-full flex flex-col overflow-hidden bg-gray-900/50 backdrop-blur-sm'>
			{/* Toolbox Header - Reduced padding and spacing */}
			<div className='sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 p-2 border-b border-gray-700/50'>
				<div className='flex items-center justify-between mb-2'>
					<h2 className='text-base font-semibold text-gray-100'>
						Ad Studio Nodes
					</h2>
					<Tooltip content='Toggle help information'>
						<button
							className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
							onClick={() => setIsInfoVisible(!isInfoVisible)}
							aria-expanded={isInfoVisible}
							aria-label='Toggle help information'>
							<InfoIcon className='w-4 h-4' />
						</button>
					</Tooltip>
				</div>

				{isInfoVisible && (
					<div className='bg-gray-800/70 rounded-lg p-2 mb-2 text-xs text-gray-300 border border-gray-700/50'>
						<p>
							Drag nodes onto the canvas to build your workflow. You can also
							click the + button to add nodes directly.
						</p>
						<p className='mt-1'>
							Press Tab to navigate between items and Enter to add a node.
						</p>
					</div>
				)}

				{/* Search input - Reduced height */}
				<div className='relative mb-2'>
					<input
						type='text'
						placeholder='Search nodes...'
						className='w-full pl-8 pr-4 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-transparent'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyDown={handleSearchKeyDown}
						aria-label='Search nodes'
					/>
					<SearchIcon className='absolute left-2 top-2 h-3.5 w-3.5 text-gray-500' />
					{searchTerm && (
						<button
							className='absolute right-2 top-2 text-gray-400 hover:text-gray-200'
							onClick={() => setSearchTerm('')}
							aria-label='Clear search'>
							<svg
								className='w-3.5 h-3.5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					)}
				</div>

				{/* Category filter */}
				<CategoryFilter
					categories={categories}
					activeCategory={activeCategory}
					onCategoryChange={setActiveCategory}
				/>
			</div>

			{/* Node List - Fixed height to avoid scrolling */}
			<div className='flex-1 p-2 space-y-1 overflow-y-auto'>
				{/* Recently used section */}
				{recentNodes.length > 0 && searchTerm === '' && (
					<>
						<div className='flex items-center mb-1 mt-1'>
							<h3 className='text-xs font-medium text-gray-400'>
								Recently Used
							</h3>
							<div className='flex-1 ml-2 border-t border-gray-700/50'></div>
						</div>
						{recentNodes.map((node) => (
							<DraggableNodeItem
								key={`recent-${node.id}`}
								node={node}
								onDragStart={handleDragStart}
								onAddNode={handleAddNode}
							/>
						))}
						<div className='flex items-center mb-1 mt-2'>
							<h3 className='text-xs font-medium text-gray-400'>All Nodes</h3>
							<div className='flex-1 ml-2 border-t border-gray-700/50'></div>
						</div>
					</>
				)}

				{/* Filtered nodes */}
				{filteredNodes.length > 0 ? (
					filteredNodes.map((node) => (
						<DraggableNodeItem
							key={node.id}
							node={node}
							onDragStart={handleDragStart}
							onAddNode={handleAddNode}
						/>
					))
				) : (
					<div className='flex flex-col items-center justify-center h-32 text-gray-400 text-xs p-4 text-center border border-gray-700/50 rounded-lg bg-gray-800/30'>
						<SearchIcon className='h-5 w-5 mb-2 opacity-50' />
						<p>No nodes found for &quot;{searchTerm}&quot;</p>
						<button
							className='mt-2 px-2 py-1 bg-gray-700/50 hover:bg-gray-600/50 rounded text-gray-300 transition-colors'
							onClick={() => setSearchTerm('')}
							aria-label='Clear search'>
							Clear search
						</button>
					</div>
				)}
			</div>

			{/* Feedback toast */}
			{feedback.visible && (
				<div className='fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-gray-100 px-3 py-2 rounded-lg text-sm shadow-lg animate-fade-in-up z-50'>
					<div className='flex items-center'>
						<svg
							className='w-4 h-4 text-green-400 mr-2'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 13l4 4L19 7'
							/>
						</svg>
						{feedback.message}
					</div>
				</div>
			)}

			{/* Actions Section - Fixed at bottom */}
			<div className='p-2 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50 mt-32'>
				<h3 className='text-xs font-medium text-gray-100 mb-1.5'>Actions</h3>
				<div className='grid grid-cols-2 gap-2'>
					<Tooltip content='Import an existing workflow'>
						<button
							className='py-1.5 px-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 text-xs flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
							onClick={() => console.log('Import workflow')}
							aria-label='Import workflow'>
							<UploadIcon className='w-3.5 h-3.5' />
							<span>Import</span>
						</button>
					</Tooltip>

					<Tooltip content='Browse templates gallery'>
						<button
							className='py-1.5 px-2 bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 text-xs flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-gray-500/50'
							onClick={() => console.log('Templates')}
							aria-label='Browse templates'>
							<TemplateIcon className='w-3.5 h-3.5' />
							<span>Templates</span>
						</button>
					</Tooltip>
				</div>

				<div className='mt-2 text-center'>
					<p className='text-xs text-gray-500'>
						<kbd className='px-1 py-0.5 bg-gray-800 rounded text-gray-400 text-xs mr-1'>
							Shift+D
						</kbd>
						Toggle toolbox
					</p>
				</div>
			</div>
		</div>
	);
};

export default AdStudioToolbox;
