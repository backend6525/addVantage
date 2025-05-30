// @/app/components/dashboardUi/Adstudio/recentProjects.tsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FixedSizeGrid as Grid } from 'react-window';

// interface Project {
// 	id: string;
// 	name: string;
// 	lastModified: Date;
// 	thumbnail?: string;
// 	nodeCount: number;
// }

// interface RecentProjectsProps {
// 	limit?: number;
// }

// interface GridCellProps {
// 	columnIndex: number;
// 	rowIndex: number;
// 	style: React.CSSProperties;
// }

// // Memoized Project Card
// const ProjectCard = React.memo(
// 	({
// 		project,
// 		onSelect,
// 	}: {
// 		project: Project;
// 		onSelect: (projectId: string) => void;
// 	}) => (
// 		<div
// 			className='border rounded-md overflow-hidden hover:shadow-md transition-shadow cursor-pointer m-2'
// 			onClick={() => onSelect(project.id)}>
// 			<div className='bg-gray-100 h-24 flex items-center justify-center'>
// 				{project.thumbnail ? (
// 					<Image
// 						src={project.thumbnail}
// 						alt={project.name}
// 						className='object-cover'
// 						fill
// 						sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
// 					/>
// 				) : (
// 					<div className='flex flex-col items-center justify-center'>
// 						<svg
// 							xmlns='http://www.w3.org/2000/svg'
// 							className='h-10 w-10 text-gray-400'
// 							fill='none'
// 							viewBox='0 0 24 24'
// 							stroke='currentColor'>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth={1.5}
// 								d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
// 							/>
// 						</svg>
// 						<span className='text-xs text-gray-500 mt-1'>
// 							{project.nodeCount} nodes
// 						</span>
// 					</div>
// 				)}
// 			</div>
// 			<div className='p-3'>
// 				<h3 className='font-medium text-gray-800 truncate'>{project.name}</h3>
// 				<p className='text-xs text-gray-500 mt-1'>
// 					Last modified: {project.lastModified.toLocaleDateString()}
// 				</p>
// 			</div>
// 		</div>
// 	)
// );
// ProjectCard.displayName = 'ProjectCard';

// const ViewAllCard = React.memo(() => (
// 	<Link
// 		href='/dashboard/ad-studio/projects'
// 		className='border rounded-md flex flex-col items-center justify-center h-full p-6 hover:bg-gray-50 transition-colors m-2'>
// 		<div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2'>
// 			<svg
// 				xmlns='http://www.w3.org/2000/svg'
// 				className='h-6 w-6 text-gray-500'
// 				fill='none'
// 				viewBox='0 0 24 24'
// 				stroke='currentColor'>
// 				<path
// 					strokeLinecap='round'
// 					strokeLinejoin='round'
// 					strokeWidth={2}
// 					d='M12 6v6m0 0v6m0-6h6m-6 0H6'
// 				/>
// 			</svg>
// 		</div>
// 		<span className='text-sm font-medium text-gray-600'>View All Projects</span>
// 	</Link>
// ));
// ViewAllCard.displayName = 'ViewAllCard';

// const RecentProjects: React.FC<RecentProjectsProps> = ({ limit = 5 }) => {
// 	const { loadProject, setProjectId } = useAdStudio();
// 	const [projects, setProjects] = useState<Project[]>([]);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

// 	// Update dimensions when container is mounted or window is resized
// 	useEffect(() => {
// 		const updateDimensions = () => {
// 			if (containerRef.current) {
// 				// Use the container's width
// 				setDimensions({
// 					width: containerRef.current.offsetWidth,
// 					height: containerRef.current.offsetHeight,
// 				});
// 			}
// 		};

// 		// Initial measurement
// 		updateDimensions();

// 		// Measure on resize
// 		window.addEventListener('resize', updateDimensions);

// 		return () => {
// 			window.removeEventListener('resize', updateDimensions);
// 		};
// 	}, []);

// 	useEffect(() => {
// 		// Mock function to fetch recent projects - replace with actual API call
// 		const fetchRecentProjects = async () => {
// 			try {
// 				setIsLoading(true);
// 				// Simulate API call delay
// 				await new Promise((resolve) => setTimeout(resolve, 600));

// 				// Replace with actual API call
// 				const mockProjects: Project[] = [
// 					{
// 						id: 'proj-1',
// 						name: 'Facebook Campaign Q1',
// 						lastModified: new Date(2025, 2, 8),
// 						nodeCount: 5,
// 					},
// 					{
// 						id: 'proj-2',
// 						name: 'Instagram Product Launch',
// 						lastModified: new Date(2025, 2, 5),
// 						nodeCount: 8,
// 					},
// 					{
// 						id: 'proj-3',
// 						name: 'Google Ads Retargeting',
// 						lastModified: new Date(2025, 1, 15),
// 						nodeCount: 4,
// 					},
// 					{
// 						id: 'proj-4',
// 						name: 'LinkedIn B2B Campaign',
// 						lastModified: new Date(2025, 1, 10),
// 						nodeCount: 6,
// 					},
// 				];

// 				setProjects(mockProjects.slice(0, limit));
// 			} catch (error) {
// 				console.error('Error fetching recent projects:', error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchRecentProjects();
// 	}, [limit]);

// 	const handleSelectProject = useCallback(
// 		async (projectId: string) => {
// 			try {
// 				setIsLoading(true);
// 				// Replace with actual project data fetch
// 				// Simulate API call delay
// 				await new Promise((resolve) => setTimeout(resolve, 500));

// 				// Mock project data
// 				const projectData = {
// 					nodes: [
// 						{
// 							id: 'node-1',
// 							type: 'create-ad',
// 							position: { x: 100, y: 100 },
// 							data: { label: 'Create Ad' },
// 						},
// 						// More nodes would be here in real data
// 					],
// 					connections: [
// 						// Connections would be here in real data
// 					],
// 				};

// 				// Load project data into state
// 				loadProject(projectData);
// 				setProjectId(projectId);
// 			} catch (error) {
// 				console.error('Error loading project:', error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		},
// 		[loadProject, setProjectId]
// 	);

// 	if (isLoading) {
// 		return (
// 			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse'>
// 				{Array(limit)
// 					.fill(0)
// 					.map((_, index) => (
// 						<div key={index} className='h-32 bg-gray-200 rounded-md'></div>
// 					))}
// 			</div>
// 		);
// 	}

// 	if (projects.length === 0) {
// 		return (
// 			<div className='text-center py-8'>
// 				<p className='text-gray-500 mb-4'>You dont have any recent projects</p>
// 				<button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
// 					Create Your First Project
// 				</button>
// 			</div>
// 		);
// 	}

// 	// Get column count based on container width (matching the original grid layout)
// 	const getColumnCount = () => {
// 		const width = dimensions.width;
// 		if (width >= 1024) return 3; // lg breakpoint
// 		if (width >= 768) return 2; // md breakpoint
// 		return 1; // default for small screens
// 	};

// 	const columnCount = getColumnCount();
// 	const columnWidth = dimensions.width / columnCount;
// 	const itemsCount = projects.length + 1; // +1 for "View All" button
// 	const rowCount = Math.ceil(itemsCount / columnCount);
// 	const rowHeight = 180; // Approximate height of a card

// 	// Calculate grid height based on number of rows (with a max height)
// 	const gridHeight = Math.min(rowCount * rowHeight, 600);

// 	const Cell = ({ columnIndex, rowIndex, style }: GridCellProps) => {
// 		const index = rowIndex * columnCount + columnIndex;

// 		// "View All" card is the last item
// 		if (index === projects.length) {
// 			return (
// 				<div style={style}>
// 					<ViewAllCard />
// 				</div>
// 			);
// 		}

// 		// Don't render anything if index is out of range
// 		if (index >= projects.length) {
// 			return null;
// 		}

// 		return (
// 			<div style={style}>
// 				<ProjectCard project={projects[index]} onSelect={handleSelectProject} />
// 			</div>
// 		);
// 	};

// 	return (
// 		<div
// 			ref={containerRef}
// 			className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
// 			style={{ minHeight: '200px' }}>
// 			{dimensions.width > 0 && (
// 				<Grid
// 					columnCount={columnCount}
// 					columnWidth={columnWidth}
// 					height={gridHeight}
// 					rowCount={rowCount}
// 					rowHeight={rowHeight}
// 					width={dimensions.width}>
// 					{Cell}
// 				</Grid>
// 			)}
// 		</div>
// 	);
// };

// export default RecentProjects;

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FixedSizeGrid as Grid } from 'react-window';
// import { Plus as PlusIcon } from 'lucide-react';

// interface Project {
// 	id: string;
// 	name: string;
// 	lastModified: Date;
// 	thumbnail?: string;
// 	nodeCount: number;
// }

// interface RecentProjectsProps {
// 	limit?: number;
// }

// interface GridCellProps {
// 	columnIndex: number;
// 	rowIndex: number;
// 	style: React.CSSProperties;
// }

// // Memoized Project Card
// const ProjectCard = React.memo(
// 	({
// 		project,
// 		onSelect,
// 	}: {
// 		project: Project;
// 		onSelect: (projectId: string) => void;
// 	}) => (
// 		<div
// 			className='border border-gray-700/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer m-2 bg-gray-800/50 backdrop-blur-sm'
// 			onClick={() => onSelect(project.id)}>
// 			<div className='bg-gray-700/50 h-24 flex items-center justify-center'>
// 				{project.thumbnail ? (
// 					<Image
// 						src={project.thumbnail}
// 						alt={project.name}
// 						className='object-cover'
// 						fill
// 						sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
// 					/>
// 				) : (
// 					<div className='flex flex-col items-center justify-center'>
// 						<svg
// 							xmlns='http://www.w3.org/2000/svg'
// 							className='h-10 w-10 text-gray-400'
// 							fill='none'
// 							viewBox='0 0 24 24'
// 							stroke='currentColor'>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth={1.5}
// 								d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
// 							/>
// 						</svg>
// 						<span className='text-xs text-gray-400 mt-1'>
// 							{project.nodeCount} nodes
// 						</span>
// 					</div>
// 				)}
// 			</div>
// 			<div className='p-3'>
// 				<h3 className='font-medium text-gray-100 truncate'>{project.name}</h3>
// 				<p className='text-xs text-gray-400 mt-1'>
// 					Last modified: {project.lastModified.toLocaleDateString()}
// 				</p>
// 			</div>
// 		</div>
// 	)
// );
// ProjectCard.displayName = 'ProjectCard';

// const ViewAllCard = React.memo(() => (
// 	<Link
// 		href='/dashboard/ad-studio/projects'
// 		className='border border-gray-700/50 rounded-lg flex flex-col items-center justify-center h-full p-6 hover:bg-gray-700/50 transition-colors m-2 bg-gray-800/50 backdrop-blur-sm'>
// 		<div className='w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mb-2'>
// 			<PlusIcon className='h-6 w-6 text-gray-400' />
// 		</div>
// 		<span className='text-sm font-medium text-gray-100'>View All Projects</span>
// 	</Link>
// ));
// ViewAllCard.displayName = 'ViewAllCard';

// const RecentProjects: React.FC<RecentProjectsProps> = ({ limit = 5 }) => {
// 	const { loadProject, setProjectId } = useAdStudio();
// 	const [projects, setProjects] = useState<Project[]>([]);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

// 	// Update dimensions when container is mounted or window is resized
// 	useEffect(() => {
// 		const updateDimensions = () => {
// 			if (containerRef.current) {
// 				setDimensions({
// 					width: containerRef.current.offsetWidth,
// 					height: containerRef.current.offsetHeight,
// 				});
// 			}
// 		};

// 		updateDimensions();
// 		window.addEventListener('resize', updateDimensions);

// 		return () => {
// 			window.removeEventListener('resize', updateDimensions);
// 		};
// 	}, []);

// 	useEffect(() => {
// 		// Mock function to fetch recent projects
// 		const fetchRecentProjects = async () => {
// 			try {
// 				setIsLoading(true);
// 				await new Promise((resolve) => setTimeout(resolve, 600));

// 				const mockProjects: Project[] = [
// 					{
// 						id: 'proj-1',
// 						name: 'Facebook Campaign Q1',
// 						lastModified: new Date(2025, 2, 8),
// 						nodeCount: 5,
// 					},
// 					{
// 						id: 'proj-2',
// 						name: 'Instagram Product Launch',
// 						lastModified: new Date(2025, 2, 5),
// 						nodeCount: 8,
// 					},
// 					{
// 						id: 'proj-3',
// 						name: 'Google Ads Retargeting',
// 						lastModified: new Date(2025, 1, 15),
// 						nodeCount: 4,
// 					},
// 					{
// 						id: 'proj-4',
// 						name: 'LinkedIn B2B Campaign',
// 						lastModified: new Date(2025, 1, 10),
// 						nodeCount: 6,
// 					},
// 				];

// 				setProjects(mockProjects.slice(0, limit));
// 			} catch (error) {
// 				console.error('Error fetching recent projects:', error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchRecentProjects();
// 	}, [limit]);

// 	const handleSelectProject = useCallback(
// 		async (projectId: string) => {
// 			try {
// 				setIsLoading(true);
// 				await new Promise((resolve) => setTimeout(resolve, 500));

// 				const projectData = {
// 					nodes: [
// 						{
// 							id: 'node-1',
// 							type: 'create-ad',
// 							position: { x: 100, y: 100 },
// 							data: { label: 'Create Ad' },
// 						},
// 					],
// 					connections: [],
// 				};

// 				loadProject(projectData);
// 				setProjectId(projectId);
// 			} catch (error) {
// 				console.error('Error loading project:', error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		},
// 		[loadProject, setProjectId]
// 	);

// 	if (isLoading) {
// 		return (
// 			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse'>
// 				{Array(limit)
// 					.fill(0)
// 					.map((_, index) => (
// 						<div
// 							key={index}
// 							className='h-32 bg-gray-700/50 rounded-lg backdrop-blur-sm'></div>
// 					))}
// 			</div>
// 		);
// 	}

// 	if (projects.length === 0) {
// 		return (
// 			<div className='text-center py-8'>
// 				<p className='text-gray-400 mb-4'>You dont have any recent projects</p>
// 				<button className='px-4 py-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all'>
// 					Create Your First Project
// 				</button>
// 			</div>
// 		);
// 	}

// 	// Get column count based on container width
// 	const getColumnCount = () => {
// 		const width = dimensions.width;
// 		if (width >= 1024) return 3; // lg breakpoint
// 		if (width >= 768) return 2; // md breakpoint
// 		return 1; // default for small screens
// 	};

// 	const columnCount = getColumnCount();
// 	const columnWidth = dimensions.width / columnCount;
// 	const itemsCount = projects.length + 1; // +1 for "View All" button
// 	const rowCount = Math.ceil(itemsCount / columnCount);
// 	const rowHeight = 180; // Approximate height of a card

// 	// Calculate grid height based on number of rows (with a max height)
// 	const gridHeight = Math.min(rowCount * rowHeight, 600);

// 	const Cell = ({ columnIndex, rowIndex, style }: GridCellProps) => {
// 		const index = rowIndex * columnCount + columnIndex;

// 		// "View All" card is the last item
// 		if (index === projects.length) {
// 			return (
// 				<div style={style}>
// 					<ViewAllCard />
// 				</div>
// 			);
// 		}

// 		// Don't render anything if index is out of range
// 		if (index >= projects.length) {
// 			return null;
// 		}

// 		return (
// 			<div style={style}>
// 				<ProjectCard project={projects[index]} onSelect={handleSelectProject} />
// 			</div>
// 		);
// 	};

// 	return (
// 		<div ref={containerRef} className='w-full' style={{ minHeight: '200px' }}>
// 			{dimensions.width > 0 && (
// 				<Grid
// 					columnCount={columnCount}
// 					columnWidth={columnWidth}
// 					height={gridHeight}
// 					rowCount={rowCount}
// 					rowHeight={rowHeight}
// 					width={dimensions.width}>
// 					{Cell}
// 				</Grid>
// 			)}
// 		</div>
// 	);
// };

// export default RecentProjects;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Plus as PlusIcon, Clock as ClockIcon } from 'lucide-react';

// interface Project {
// 	id: string;
// 	name: string;
// 	lastModified: Date;
// 	thumbnail?: string;
// 	nodeCount: number;
// }

// interface RecentProjectsProps {
// 	limit?: number;
// }

// // Memoized Project Card
// const ProjectCard = React.memo(
// 	({
// 		project,
// 		onSelect,
// 	}: {
// 		project: Project;
// 		onSelect: (projectId: string) => void;
// 	}) => (
// 		<div
// 			className='border border-gray-700/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 transition-colors'
// 			onClick={() => onSelect(project.id)}>
// 			<div className='bg-gray-700/50 h-32 flex items-center justify-center relative'>
// 				{project.thumbnail ? (
// 					<Image
// 						src={project.thumbnail}
// 						alt={project.name}
// 						className='object-cover'
// 						fill
// 						sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
// 					/>
// 				) : (
// 					<div className='flex flex-col items-center justify-center text-gray-400'>
// 						<svg
// 							xmlns='http://www.w3.org/2000/svg'
// 							className='h-10 w-10'
// 							fill='none'
// 							viewBox='0 0 24 24'
// 							stroke='currentColor'>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth={1.5}
// 								d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
// 							/>
// 						</svg>
// 						<span className='text-xs mt-1'>{project.nodeCount} nodes</span>
// 					</div>
// 				)}
// 			</div>
// 			<div className='p-4'>
// 				<h3 className='font-medium text-gray-100 truncate'>{project.name}</h3>
// 				<div className='flex items-center gap-2 text-xs text-gray-400 mt-1'>
// 					<ClockIcon className='w-3 h-3' />
// 					<span>
// 						Last modified: {project.lastModified.toLocaleDateString()}
// 					</span>
// 				</div>
// 			</div>
// 		</div>
// 	)
// );
// ProjectCard.displayName = 'ProjectCard';

// const ViewAllCard = React.memo(() => (
// 	<Link
// 		href='/dashboard/ad-studio/projects'
// 		className='border border-gray-700/50 rounded-lg flex flex-col items-center justify-center h-full p-6 hover:bg-gray-700/50 transition-colors bg-gray-800/50 backdrop-blur-sm'>
// 		<div className='w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mb-2'>
// 			<PlusIcon className='h-6 w-6 text-gray-400' />
// 		</div>
// 		<span className='text-sm font-medium text-gray-100'>View All Projects</span>
// 	</Link>
// ));
// ViewAllCard.displayName = 'ViewAllCard';

// const RecentProjects: React.FC<RecentProjectsProps> = ({ limit = 4 }) => {
// 	const { loadProject, setProjectId } = useAdStudio();
// 	const [projects, setProjects] = useState<Project[]>([]);
// 	const [isLoading, setIsLoading] = useState(true);

// 	useEffect(() => {
// 		// Mock function to fetch recent projects
// 		const fetchRecentProjects = async () => {
// 			try {
// 				setIsLoading(true);
// 				await new Promise((resolve) => setTimeout(resolve, 600));

// 				const mockProjects: Project[] = [
// 					{
// 						id: 'proj-1',
// 						name: 'Facebook Campaign Q1',
// 						lastModified: new Date(2025, 2, 8),
// 						thumbnail: '/images/project-thumbnail-1.jpg',
// 						nodeCount: 5,
// 					},
// 					{
// 						id: 'proj-2',
// 						name: 'Instagram Product Launch',
// 						lastModified: new Date(2025, 2, 5),
// 						thumbnail: '/images/project-thumbnail-2.jpg',
// 						nodeCount: 8,
// 					},
// 					{
// 						id: 'proj-3',
// 						name: 'Google Ads Retargeting',
// 						lastModified: new Date(2025, 1, 15),
// 						thumbnail: '/images/project-thumbnail-3.jpg',
// 						nodeCount: 4,
// 					},
// 					{
// 						id: 'proj-4',
// 						name: 'LinkedIn B2B Campaign',
// 						lastModified: new Date(2025, 1, 10),
// 						thumbnail: '/images/project-thumbnail-4.jpg',
// 						nodeCount: 6,
// 					},
// 				];

// 				setProjects(mockProjects.slice(0, limit));
// 			} catch (error) {
// 				console.error('Error fetching recent projects:', error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchRecentProjects();
// 	}, [limit]);

// 	const handleSelectProject = useCallback(
// 		async (projectId: string) => {
// 			try {
// 				setIsLoading(true);
// 				await new Promise((resolve) => setTimeout(resolve, 500));

// 				const projectData = {
// 					nodes: [
// 						{
// 							id: 'node-1',
// 							type: 'create-ad',
// 							position: { x: 100, y: 100 },
// 							data: { label: 'Create Ad' },
// 						},
// 					],
// 					connections: [],
// 				};

// 				loadProject(projectData);
// 				setProjectId(projectId);
// 			} catch (error) {
// 				console.error('Error loading project:', error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		},
// 		[loadProject, setProjectId]
// 	);

// 	if (isLoading) {
// 		return (
// 			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse'>
// 				{Array(limit)
// 					.fill(0)
// 					.map((_, index) => (
// 						<div
// 							key={index}
// 							className='h-48 bg-gray-700/50 rounded-lg backdrop-blur-sm'></div>
// 					))}
// 			</div>
// 		);
// 	}

// 	if (projects.length === 0) {
// 		return (
// 			<div className='text-center py-8'>
// 				<p className='text-gray-400 mb-4'>You dont have any recent projects</p>
// 				<button className='px-4 py-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all'>
// 					Create Your First Project
// 				</button>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className='space-y-6'>
// 			<h2 className='text-xl font-semibold text-gray-100'>Recent Projects</h2>
// 			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
// 				{projects.map((project) => (
// 					<ProjectCard
// 						key={project.id}
// 						project={project}
// 						onSelect={handleSelectProject}
// 					/>
// 				))}
// 				<ViewAllCard />
// 			</div>
// 		</div>
// 	);
// };

//export default RecentProjects;

import React, { useState, useEffect, useCallback } from 'react';
import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
import Link from 'next/link';
import Image from 'next/image';
import {
	Plus as PlusIcon,
	Clock as ClockIcon,
	Search as SearchIcon,
	ArrowRight as ArrowRightIcon,
} from 'lucide-react';

interface Project {
	id: string;
	name: string;
	lastModified: Date;
	thumbnail?: string;
	nodeCount: number;
}

interface RecentProjectsProps {
	limit?: number;
}

// Memoized Project Card with improved hover effects and metadata display
const ProjectCard = React.memo(
	({
		project,
		onSelect,
	}: {
		project: Project;
		onSelect: (projectId: string) => void;
	}) => (
		<div
			className='border border-gray-700/50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 group'
			onClick={() => onSelect(project.id)}>
			<div className='bg-gray-700/50 h-40 flex items-center justify-center relative'>
				{project.thumbnail ? (
					<>
						<Image
							src={project.thumbnail}
							alt={project.name}
							className='object-cover transition-transform duration-300 group-hover:scale-105'
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
					</>
				) : (
					<div className='flex flex-col items-center justify-center text-gray-400'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-12 w-12'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={1.5}
								d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
							/>
						</svg>
						<span className='text-xs mt-2'>{project.nodeCount} nodes</span>
					</div>
				)}
				<div className='absolute top-2 right-2 bg-gray-800/80 rounded-full px-2 py-1 text-xs text-gray-300 backdrop-blur-sm'>
					{project.nodeCount} nodes
				</div>
			</div>
			<div className='p-4'>
				<h3 className='font-medium text-gray-100 truncate'>{project.name}</h3>
				<div className='flex items-center gap-2 text-xs text-gray-400 mt-2'>
					<ClockIcon className='w-3 h-3' />
					<span>
						{project.lastModified.toLocaleDateString(undefined, {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})}
					</span>
				</div>
				<div className='mt-3 pt-3 border-t border-gray-700/50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
					<span className='text-xs text-blue-400 flex items-center'>
						Open Project
						<ArrowRightIcon className='w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300' />
					</span>
				</div>
			</div>
		</div>
	)
);
ProjectCard.displayName = 'ProjectCard';

const ViewAllCard = React.memo(() => (
	<Link
		href='/dashboard/ad-studio/projects'
		className='border border-gray-700/50 rounded-lg flex flex-col items-center justify-center h-full p-6 hover:bg-gray-700/50 transition-all duration-300 bg-gray-800/50 backdrop-blur-sm group'>
		<div className='w-14 h-14 rounded-full bg-gray-700/50 flex items-center justify-center mb-3 group-hover:bg-gray-600/50 transition-colors duration-300'>
			<PlusIcon className='h-7 w-7 text-gray-400 group-hover:text-gray-200 transition-colors duration-300' />
		</div>
		<span className='text-sm font-medium text-gray-100 group-hover:text-gray-200 transition-colors duration-300'>
			View All Projects
		</span>
	</Link>
));
ViewAllCard.displayName = 'ViewAllCard';

// New component for creating a project
const CreateProjectCard = React.memo(() => (
	<Link
		href='/dashboard/ad-studio/projects/new'
		className='border border-gray-700/50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm hover:from-blue-800/40 hover:to-indigo-800/40 group'>
		<div className='p-6 flex flex-col items-center justify-center h-full'>
			<div className='w-14 h-14 rounded-full bg-blue-700/50 flex items-center justify-center mb-3 group-hover:bg-blue-600/50 transition-colors duration-300'>
				<PlusIcon className='h-7 w-7 text-blue-200 group-hover:text-white transition-colors duration-300' />
			</div>
			<span className='text-sm font-medium text-gray-100 group-hover:text-white transition-colors duration-300'>
				Create New Project
			</span>
			<p className='text-xs text-gray-400 mt-2 text-center'>
				Start building your next ad campaign
			</p>
		</div>
	</Link>
));
CreateProjectCard.displayName = 'CreateProjectCard';

const RecentProjects: React.FC<RecentProjectsProps> = ({ limit = 3 }) => {
	const { loadProject, setProjectId } = useAdStudio();
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		// Mock function to fetch recent projects
		const fetchRecentProjects = async () => {
			try {
				setIsLoading(true);
				await new Promise((resolve) => setTimeout(resolve, 600));

				const mockProjects: Project[] = [
					{
						id: 'proj-1',
						name: 'Facebook Campaign Q1',
						lastModified: new Date(2025, 2, 8),
						thumbnail: '/images/project-thumbnail-1.jpg',
						nodeCount: 5,
					},
					{
						id: 'proj-2',
						name: 'Instagram Product Launch',
						lastModified: new Date(2025, 2, 5),
						thumbnail: '/images/project-thumbnail-2.jpg',
						nodeCount: 8,
					},
					{
						id: 'proj-3',
						name: 'Google Ads Retargeting',
						lastModified: new Date(2025, 1, 15),
						thumbnail: '/images/project-thumbnail-3.jpg',
						nodeCount: 4,
					},
					{
						id: 'proj-4',
						name: 'LinkedIn B2B Campaign',
						lastModified: new Date(2025, 1, 10),
						thumbnail: '/images/project-thumbnail-4.jpg',
						nodeCount: 6,
					},
				];

				setProjects(mockProjects);
			} catch (error) {
				console.error('Error fetching recent projects:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecentProjects();
	}, []);

	const filteredProjects = projects
		.filter((project) =>
			project.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.slice(0, limit);

	const handleSelectProject = useCallback(
		async (projectId: string) => {
			try {
				setIsLoading(true);
				await new Promise((resolve) => setTimeout(resolve, 500));

				const projectData = {
					nodes: [
						{
							id: 'node-1',
							type: 'create-ad',
							position: { x: 100, y: 100 },
							data: { label: 'Create Ad' },
						},
					],
					connections: [],
				};

				loadProject(projectData);
				setProjectId(projectId);
			} catch (error) {
				console.error('Error loading project:', error);
			} finally {
				setIsLoading(false);
			}
		},
		[loadProject, setProjectId]
	);

	if (isLoading) {
		return (
			<div className='space-y-6'>
				<div className='flex justify-between items-center'>
					<div className='h-7 w-48 bg-gray-700/50 rounded-md animate-pulse'></div>
					<div className='h-10 w-60 bg-gray-700/50 rounded-lg animate-pulse'></div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse'>
					{Array(limit + 1)
						.fill(0)
						.map((_, index) => (
							<div
								key={index}
								className='h-64 bg-gray-700/50 rounded-lg backdrop-blur-sm'></div>
						))}
				</div>
			</div>
		);
	}

	if (projects.length === 0) {
		return (
			<div className='text-center py-12 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/50'>
				<div className='flex justify-center mb-4'>
					<div className='p-4 bg-gray-700/50 rounded-full'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-12 w-12 text-gray-400'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={1.5}
								d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
							/>
						</svg>
					</div>
				</div>
				<h3 className='text-xl font-medium text-gray-100 mb-2'>
					No projects found
				</h3>
				<p className='text-gray-400 mb-6 max-w-md mx-auto'>
					Start creating your first ad campaign project to optimize your
					marketing efforts
				</p>
				<Link
					href='/dashboard/ad-studio/projects/new'
					className='px-6 py-3 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all font-medium'>
					Create Your First Project
				</Link>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<h2 className='text-xl font-semibold text-gray-100'>Recent Projects</h2>
				<div className='relative w-full sm:w-auto'>
					<input
						type='text'
						placeholder='Search projects...'
						className='pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent w-full sm:w-64 backdrop-blur-sm'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<SearchIcon className='absolute left-3 top-2.5 h-4 w-4 text-gray-500' />
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<CreateProjectCard />
				{filteredProjects.map((project) => (
					<ProjectCard
						key={project.id}
						project={project}
						onSelect={handleSelectProject}
					/>
				))}
				{projects.length > 0 && <ViewAllCard />}
			</div>
		</div>
	);
};

export default RecentProjects;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
// import Link from 'next/link';
// import Image from 'next/image';
// import {
// 	Plus as PlusIcon,
// 	Clock as ClockIcon,
// 	Search as SearchIcon,
// 	ArrowRight as ArrowRightIcon,
// } from 'lucide-react';

// interface Project {
// 	id: string;
// 	name: string;
// 	lastModified: Date;
// 	thumbnail?: string;
// 	nodeCount: number;
// }

// interface RecentProjectsProps {
// 	limit?: number;
// }

// // Memoized Project Card with reduced height/width and preserved design
// const ProjectCard = React.memo(
// 	({
// 		project,
// 		onSelect,
// 	}: {
// 		project: Project;
// 		onSelect: (projectId: string) => void;
// 	}) => (
// 		<div
// 			className='border border-gray-700/50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 group'
// 			onClick={() => onSelect(project.id)}>
// 			<div className='bg-gray-700/50 h-32 flex items-center justify-center relative'>
// 				{project.thumbnail ? (
// 					<>
// 						<Image
// 							src={project.thumbnail}
// 							alt={project.name}
// 							className='object-cover transition-transform duration-300 group-hover:scale-105'
// 							fill
// 							sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
// 						/>
// 						<div className='absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
// 					</>
// 				) : (
// 					<div className='flex flex-col items-center justify-center text-gray-400'>
// 						<svg
// 							xmlns='http://www.w3.org/2000/svg'
// 							className='h-10 w-10'
// 							fill='none'
// 							viewBox='0 0 24 24'
// 							stroke='currentColor'>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth={1.5}
// 								d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
// 							/>
// 						</svg>
// 						<span className='text-xs mt-1'>{project.nodeCount} nodes</span>
// 					</div>
// 				)}
// 				<div className='absolute top-2 right-2 bg-gray-800/80 rounded-full px-2 py-0.5 text-xs text-gray-300 backdrop-blur-sm'>
// 					{project.nodeCount} nodes
// 				</div>
// 			</div>
// 			<div className='p-3'>
// 				<h3 className='font-medium text-sm text-gray-100 truncate'>
// 					{project.name}
// 				</h3>
// 				<div className='flex items-center gap-1 text-xs text-gray-400 mt-1'>
// 					<ClockIcon className='w-3 h-3' />
// 					<span>
// 						{project.lastModified.toLocaleDateString(undefined, {
// 							year: 'numeric',
// 							month: 'short',
// 							day: 'numeric',
// 						})}
// 					</span>
// 				</div>
// 				<div className='mt-2 pt-2 border-t border-gray-700/50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
// 					<span className='text-xs text-blue-400 flex items-center'>
// 						Open Project
// 						<ArrowRightIcon className='w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300' />
// 					</span>
// 				</div>
// 			</div>
// 		</div>
// 	)
// );
// ProjectCard.displayName = 'ProjectCard';

// const ViewAllCard = React.memo(() => (
// 	<Link
// 		href='/dashboard/ad-studio/projects'
// 		className='border border-gray-700/50 rounded-lg flex flex-col items-center justify-center h-full p-4 hover:bg-gray-700/50 transition-all duration-300 bg-gray-800/50 backdrop-blur-sm group'>
// 		<div className='w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mb-2 group-hover:bg-gray-600/50 transition-colors duration-300'>
// 			<PlusIcon className='h-6 w-6 text-gray-400 group-hover:text-gray-200 transition-colors duration-300' />
// 		</div>
// 		<span className='text-xs font-medium text-gray-100 group-hover:text-gray-200 transition-colors duration-300'>
// 			View All Projects
// 		</span>
// 	</Link>
// ));
// ViewAllCard.displayName = 'ViewAllCard';

// // New component for creating a project with reduced size
// const CreateProjectCard = React.memo(() => (
// 	<Link
// 		href='/dashboard/ad-studio/projects/new'
// 		className='border border-gray-700/50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm hover:from-blue-800/40 hover:to-indigo-800/40 group'>
// 		<div className='p-4 flex flex-col items-center justify-center h-full'>
// 			<div className='w-12 h-12 rounded-full bg-blue-700/50 flex items-center justify-center mb-2 group-hover:bg-blue-600/50 transition-colors duration-300'>
// 				<PlusIcon className='h-6 w-6 text-blue-200 group-hover:text-white transition-colors duration-300' />
// 			</div>
// 			<span className='text-xs font-medium text-gray-100 group-hover:text-white transition-colors duration-300'>
// 				Create New Project
// 			</span>
// 			<p className='text-xs text-gray-400 mt-1 text-center'>
// 				Start building your next ad campaign
// 			</p>
// 		</div>
// 	</Link>
// ));
// CreateProjectCard.displayName = 'CreateProjectCard';

// const RecentProjects: React.FC<RecentProjectsProps> = ({ limit = 3 }) => {
// 	const { loadProject, setProjectId } = useAdStudio();
// 	const [projects, setProjects] = useState<Project[]>([]);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [searchTerm, setSearchTerm] = useState('');

// 	useEffect(() => {
// 		// Mock function to fetch recent projects
// 		const fetchRecentProjects = async () => {
// 			try {
// 				setIsLoading(true);
// 				await new Promise((resolve) => setTimeout(resolve, 600));

// 				const mockProjects: Project[] = [
// 					{
// 						id: 'proj-1',
// 						name: 'Facebook Campaign Q1',
// 						lastModified: new Date(2025, 2, 8),
// 						thumbnail: '/images/project-thumbnail-1.jpg',
// 						nodeCount: 5,
// 					},
// 					{
// 						id: 'proj-2',
// 						name: 'Instagram Product Launch',
// 						lastModified: new Date(2025, 2, 5),
// 						thumbnail: '/images/project-thumbnail-2.jpg',
// 						nodeCount: 8,
// 					},
// 					{
// 						id: 'proj-3',
// 						name: 'Google Ads Retargeting',
// 						lastModified: new Date(2025, 1, 15),
// 						thumbnail: '/images/project-thumbnail-3.jpg',
// 						nodeCount: 4,
// 					},
// 					{
// 						id: 'proj-4',
// 						name: 'LinkedIn B2B Campaign',
// 						lastModified: new Date(2025, 1, 10),
// 						thumbnail: '/images/project-thumbnail-4.jpg',
// 						nodeCount: 6,
// 					},
// 				];

// 				setProjects(mockProjects);
// 			} catch (error) {
// 				console.error('Error fetching recent projects:', error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchRecentProjects();
// 	}, []);

// 	const filteredProjects = projects
// 		.filter((project) =>
// 			project.name.toLowerCase().includes(searchTerm.toLowerCase())
// 		)
// 		.slice(0, limit);

// 	const handleSelectProject = useCallback(
// 		async (projectId: string) => {
// 			try {
// 				setIsLoading(true);
// 				await new Promise((resolve) => setTimeout(resolve, 500));

// 				const projectData = {
// 					nodes: [
// 						{
// 							id: 'node-1',
// 							type: 'create-ad',
// 							position: { x: 100, y: 100 },
// 							data: { label: 'Create Ad' },
// 						},
// 					],
// 					connections: [],
// 				};

// 				loadProject(projectData);
// 				setProjectId(projectId);
// 			} catch (error) {
// 				console.error('Error loading project:', error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		},
// 		[loadProject, setProjectId]
// 	);

// 	if (isLoading) {
// 		return (
// 			<div className='space-y-4 max-w-4xl mx-auto'>
// 				<div className='flex justify-between items-center'>
// 					<div className='h-6 w-40 bg-gray-700/50 rounded-md animate-pulse'></div>
// 					<div className='h-8 w-48 bg-gray-700/50 rounded-lg animate-pulse'></div>
// 				</div>
// 				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse'>
// 					{Array(limit + 1)
// 						.fill(0)
// 						.map((_, index) => (
// 							<div
// 								key={index}
// 								className='h-52 bg-gray-700/50 rounded-lg backdrop-blur-sm'></div>
// 						))}
// 				</div>
// 			</div>
// 		);
// 	}

// 	if (projects.length === 0) {
// 		return (
// 			<div className='text-center py-10 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/50 max-w-4xl mx-auto'>
// 				<div className='flex justify-center mb-3'>
// 					<div className='p-3 bg-gray-700/50 rounded-full'>
// 						<svg
// 							xmlns='http://www.w3.org/2000/svg'
// 							className='h-10 w-10 text-gray-400'
// 							fill='none'
// 							viewBox='0 0 24 24'
// 							stroke='currentColor'>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth={1.5}
// 								d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
// 							/>
// 						</svg>
// 					</div>
// 				</div>
// 				<h3 className='text-lg font-medium text-gray-100 mb-2'>
// 					No projects found
// 				</h3>
// 				<p className='text-gray-400 mb-4 max-w-md mx-auto text-sm'>
// 					Start creating your first ad campaign project to optimize your
// 					marketing efforts
// 				</p>
// 				<Link
// 					href='/dashboard/ad-studio/projects/new'
// 					className='px-4 py-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all font-medium text-sm'>
// 					Create Your First Project
// 				</Link>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className='space-y-4 max-w-4xl mx-auto ml-64'>
// 			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
// 				<h2 className='text-lg font-semibold text-gray-100'>Recent Projects</h2>
// 				<div className='relative w-full sm:w-auto'>
// 					<input
// 						type='text'
// 						placeholder='Search projects...'
// 						className='pl-8 pr-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent w-full sm:w-52 backdrop-blur-sm'
// 						value={searchTerm}
// 						onChange={(e) => setSearchTerm(e.target.value)}
// 					/>
// 					<SearchIcon className='absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-500' />
// 				</div>
// 			</div>

// 			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
// 				<CreateProjectCard />
// 				{filteredProjects.map((project) => (
// 					<ProjectCard
// 						key={project.id}
// 						project={project}
// 						onSelect={handleSelectProject}
// 					/>
// 				))}
// 				{projects.length > 0 && <ViewAllCard />}
// 			</div>
// 		</div>
// 	);
// };

// export default RecentProjects;
