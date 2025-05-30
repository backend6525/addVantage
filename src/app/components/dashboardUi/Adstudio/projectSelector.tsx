// // @/app/components/dashboardUi/Adstudio/projectSelector.tsx
// import React, { useState, useEffect } from 'react';
// import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';

// interface Project {
// 	id: string;
// 	name: string;
// 	lastModified: Date;
// }

// const ProjectSelector: React.FC = () => {
// 	const { state, loadProject, setProjectId } = useAdStudio();
// 	const [projects, setProjects] = useState<Project[]>([]);
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [isLoading, setIsLoading] = useState(false);

// 	useEffect(() => {
// 		// Mock function to fetch projects - replace with actual API call
// 		const fetchProjects = async () => {
// 			try {
// 				setIsLoading(true);
// 				// Replace with actual API call
// 				const mockProjects: Project[] = [
// 					{
// 						id: 'proj-1',
// 						name: 'Facebook Campaign Q1',
// 						lastModified: new Date(2025, 2, 8),
// 					},
// 					{
// 						id: 'proj-2',
// 						name: 'Instagram Product Launch',
// 						lastModified: new Date(2025, 2, 5),
// 					},
// 					{
// 						id: 'proj-3',
// 						name: 'Google Ads Retargeting',
// 						lastModified: new Date(2025, 1, 15),
// 					},
// 				];

// 				setProjects(mockProjects);
// 			} catch (error) {
// 				console.error('Error fetching projects:', error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchProjects();
// 	}, []);

// 	const handleSelectProject = async (projectId: string) => {
// 		try {
// 			setIsLoading(true);
// 			// Replace with actual project data fetch
// 			// Simulate API call delay
// 			await new Promise((resolve) => setTimeout(resolve, 500));

// 			// Mock project data
// 			const projectData = {
// 				nodes: [
// 					{
// 						id: 'node-1',
// 						type: 'create-ad',
// 						position: { x: 100, y: 100 },
// 						data: {
// 							label: 'Create Ad',
// 							description: 'Starting point for ad creation',
// 							icon: '📝',
// 							// Other properties
// 						},
// 					},
// 					// More nodes would be here in real data
// 				],
// 				connections: [
// 					// Connections would be here in real data
// 				],
// 			};

// 			// Load project data into state
// 			loadProject(projectData);
// 			setProjectId(projectId);
// 			setIsOpen(false);
// 		} catch (error) {
// 			console.error('Error loading project:', error);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	const selectedProject = projects.find((p) => p.id === state.projectId);

// 	return (
// 		<div className='relative'>
// 			<button
// 				className='flex items-center gap-2 px-3 py-2 rounded-md border hover:bg-gray-50'
// 				onClick={() => setIsOpen(!isOpen)}
// 				disabled={isLoading}>
// 				{isLoading ? (
// 					<span className='flex items-center gap-2'>
// 						<svg
// 							className='animate-spin h-4 w-4 text-gray-500'
// 							viewBox='0 0 24 24'>
// 							<circle
// 								className='opacity-25'
// 								cx='12'
// 								cy='12'
// 								r='10'
// 								stroke='currentColor'
// 								strokeWidth='4'
// 								fill='none'
// 							/>
// 							<path
// 								className='opacity-75'
// 								fill='currentColor'
// 								d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
// 							/>
// 						</svg>
// 						<span>Loading...</span>
// 					</span>
// 				) : (
// 					<>
// 						<span className='text-sm font-medium'>
// 							{selectedProject ? selectedProject.name : 'Select Project'}
// 						</span>
// 						<svg
// 							xmlns='http://www.w3.org/2000/svg'
// 							className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
// 							fill='none'
// 							viewBox='0 0 24 24'
// 							stroke='currentColor'>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth={2}
// 								d='M19 9l-7 7-7-7'
// 							/>
// 						</svg>
// 					</>
// 				)}
// 			</button>

// 			{isOpen && (
// 				<div className='absolute top-full right-0 mt-1 w-72 bg-white border rounded-md shadow-lg z-10'>
// 					<div className='p-2 border-b'>
// 						<input
// 							type='text'
// 							placeholder='Search projects...'
// 							className='w-full px-3 py-1.5 text-sm border rounded'
// 						/>
// 					</div>
// 					<div className='max-h-64 overflow-y-auto'>
// 						{projects.length === 0 ? (
// 							<div className='p-3 text-center text-gray-500 text-sm'>
// 								No projects found
// 							</div>
// 						) : (
// 							<div className='py-1'>
// 								{projects.map((project) => (
// 									<button
// 										key={project.id}
// 										className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
// 											project.id === state.projectId
// 												? 'bg-blue-50 text-blue-700'
// 												: ''
// 										}`}
// 										onClick={() => handleSelectProject(project.id)}>
// 										<div className='font-medium'>{project.name}</div>
// 										<div className='text-xs text-gray-500'>
// 											Last edited: {project.lastModified.toLocaleDateString()}
// 										</div>
// 									</button>
// 								))}
// 							</div>
// 						)}
// 					</div>
// 					<div className='p-2 border-t'>
// 						<button
// 							className='w-full py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded'
// 							onClick={() => {
// 								// Reset to a new blank project
// 								loadProject({ nodes: [], connections: [] });
// 								setProjectId(null);
// 								setIsOpen(false);
// 							}}>
// 							+ Create New Project
// 						</button>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProjectSelector;

import React, { useState, useEffect, useRef } from 'react';
import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
import {
	ChevronDown as ChevronDownIcon,
	Search as SearchIcon,
	Clock as ClockIcon,
	Plus as PlusIcon,
	Loader2 as LoaderIcon,
	Check as CheckIcon,
	FolderPlus as FolderPlusIcon,
} from 'lucide-react';

interface Project {
	id: string;
	name: string;
	lastModified: Date;
	nodeCount?: number;
}

const ProjectSelector: React.FC = () => {
	const { state, loadProject, setProjectId } = useAdStudio();
	const [projects, setProjects] = useState<Project[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Handle clicks outside the dropdown to close it
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		// Mock function to fetch projects - replace with actual API call
		const fetchProjects = async () => {
			try {
				setIsLoading(true);
				// Simulate API call delay
				await new Promise((resolve) => setTimeout(resolve, 600));

				// Replace with actual API call
				const mockProjects: Project[] = [
					{
						id: 'proj-1',
						name: 'Facebook Campaign Q1',
						lastModified: new Date(2025, 2, 8),
						nodeCount: 5,
					},
					{
						id: 'proj-2',
						name: 'Instagram Product Launch',
						lastModified: new Date(2025, 2, 5),
						nodeCount: 8,
					},
					{
						id: 'proj-3',
						name: 'Google Ads Retargeting',
						lastModified: new Date(2025, 1, 15),
						nodeCount: 4,
					},
					{
						id: 'proj-4',
						name: 'LinkedIn B2B Campaign',
						lastModified: new Date(2025, 1, 10),
						nodeCount: 6,
					},
					{
						id: 'proj-5',
						name: 'TikTok Awareness Campaign',
						lastModified: new Date(2025, 0, 20),
						nodeCount: 7,
					},
				];

				setProjects(mockProjects);
			} catch (error) {
				console.error('Error fetching projects:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProjects();
	}, []);

	const handleSelectProject = async (projectId: string) => {
		try {
			setIsLoading(true);
			// Replace with actual project data fetch
			// Simulate API call delay
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Mock project data
			const projectData = {
				nodes: [
					{
						id: 'node-1',
						type: 'create-ad',
						position: { x: 100, y: 100 },
						data: {
							label: 'Create Ad',
							description: 'Starting point for ad creation',
							icon: '📝',
							// Other properties
						},
					},
					// More nodes would be here in real data
				],
				connections: [
					// Connections would be here in real data
				],
			};

			// Load project data into state
			loadProject(projectData);
			setProjectId(projectId);
			setIsOpen(false);
		} catch (error) {
			console.error('Error loading project:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCreateNewProject = () => {
		// Reset to a new blank project
		loadProject({ nodes: [], connections: [] });
		setProjectId(null);
		setIsOpen(false);
	};

	const selectedProject = projects.find((p) => p.id === state.projectId);

	// Filter projects based on search term
	const filteredProjects = searchTerm
		? projects.filter((project) =>
				project.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		: projects;

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 transition-colors text-gray-100 ${isLoading ? 'opacity-75' : ''}`}
				onClick={() => !isLoading && setIsOpen(!isOpen)}
				disabled={isLoading}
				aria-expanded={isOpen}
				aria-haspopup='true'>
				{isLoading ? (
					<span className='flex items-center gap-2'>
						<LoaderIcon className='h-4 w-4 text-gray-400 animate-spin' />
						<span className='text-sm'>Loading...</span>
					</span>
				) : (
					<>
						<span className='text-sm font-medium truncate max-w-48'>
							{selectedProject ? selectedProject.name : 'Select Project'}
						</span>
						<ChevronDownIcon
							className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
								isOpen ? 'rotate-180' : ''
							}`}
						/>
					</>
				)}
			</button>

			{isOpen && (
				<div className='absolute top-full right-0 mt-2 w-80 bg-gray-800/90 border border-gray-700/50 rounded-lg shadow-lg z-10 backdrop-blur-sm overflow-hidden'>
					<div className='p-3 border-b border-gray-700/50'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search projects...'
								className='w-full pl-10 pr-4 py-2 bg-gray-700/50 text-gray-100 text-sm border border-gray-600/50 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<SearchIcon className='absolute left-3 top-2.5 h-4 w-4 text-gray-500' />
						</div>
					</div>

					<div className='max-h-64 overflow-y-auto'>
						{filteredProjects.length === 0 ? (
							<div className='p-4 text-center text-gray-400 text-sm'>
								{searchTerm ? (
									<>
										<SearchIcon className='mx-auto h-5 w-5 mb-2 opacity-50' />
										<p>No projects found matching &quot;{searchTerm}&quot;</p>
										<p className='text-xs mt-1'>Try a different search term</p>
									</>
								) : (
									<>
										<FolderPlusIcon className='mx-auto h-5 w-5 mb-2 opacity-50' />
										<p>No projects found</p>
										<p className='text-xs mt-1'>
											Create your first project to get started
										</p>
									</>
								)}
							</div>
						) : (
							<div className='py-1'>
								{filteredProjects.map((project) => (
									<button
										key={project.id}
										className={`w-full text-left px-4 py-3 hover:bg-gray-700/50 transition-colors flex items-center justify-between ${
											project.id === state.projectId
												? 'bg-blue-600/20 border-l-2 border-blue-500'
												: ''
										}`}
										onClick={() => handleSelectProject(project.id)}>
										<div className='flex-1 min-w-0'>
											<div className='font-medium text-gray-100 truncate flex items-center gap-2'>
												{project.name}
												{project.id === state.projectId && (
													<CheckIcon className='h-3.5 w-3.5 text-blue-400' />
												)}
											</div>
											<div className='flex items-center gap-1.5 text-xs text-gray-400 mt-1'>
												<ClockIcon className='h-3 w-3' />
												{project.lastModified.toLocaleDateString(undefined, {
													year: 'numeric',
													month: 'short',
													day: 'numeric',
												})}
												{project.nodeCount && (
													<>
														<span className='mx-1'>•</span>
														<span>{project.nodeCount} nodes</span>
													</>
												)}
											</div>
										</div>
										<div
											className={`w-1.5 h-6 rounded-sm ${project.id === state.projectId ? 'bg-blue-500' : 'bg-transparent'}`}></div>
									</button>
								))}
							</div>
						)}
					</div>

					<div className='p-3 border-t border-gray-700/50'>
						<button
							className='w-full py-2 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-sm rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all flex items-center justify-center gap-2'
							onClick={handleCreateNewProject}>
							<PlusIcon className='h-4 w-4' />
							Create New Project
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProjectSelector;
