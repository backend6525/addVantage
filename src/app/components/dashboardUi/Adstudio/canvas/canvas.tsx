// 'use client';
// import React, {
// 	useRef,
// 	useEffect,
// 	useState,
// 	MouseEvent,
// 	useCallback,
// } from 'react';
// import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
// import NodeComponent from './node';
// import ConnectionLine from './connection';
// import {
// 	ZoomIn as ZoomInIcon,
// 	ZoomOut as ZoomOutIcon,
// 	Grid as GridIcon,
// 	Maximize2 as FitViewIcon,
// } from 'lucide-react';

// const AdStudioCanvas: React.FC = () => {
// 	const { state, addNode, updateNode, selectNode, setZoom, addConnection } =
// 		useAdStudio();

// 	const { nodes, connections, selectedNodeId, zoom, isDragging } = state;

// 	const canvasRef = useRef<HTMLDivElement>(null);
// 	const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
// 	const [isConnecting, setIsConnecting] = useState(false);
// 	const [connectionStart, setConnectionStart] = useState<{
// 		nodeId: string;
// 		handleId: string;
// 		position: { x: number; y: number };
// 	} | null>(null);

// 	const [connectionEnd, setConnectionEnd] = useState<{
// 		x: number;
// 		y: number;
// 	} | null>(null);
// 	const [showGrid, setShowGrid] = useState(true);
// 	// Add a ref to get canvas bounds
// 	const canvasBoundsRef = useRef({ left: 0, top: 0 });

// 	// Update bounds on render
// 	useEffect(() => {
// 		if (canvasRef.current) {
// 			const rect = canvasRef.current.getBoundingClientRect();
// 			canvasBoundsRef.current = {
// 				left: rect.left,
// 				top: rect.top,
// 			};
// 		}
// 	}, [zoom]);

// 	// Add dragover handler
// 	const handleDragOver = useCallback((event: React.DragEvent) => {
// 		event.preventDefault();
// 		event.dataTransfer.dropEffect = 'move';
// 	}, []);

// 	// Add drop handler
// 	const handleDrop = useCallback(
// 		(event: React.DragEvent) => {
// 			event.preventDefault();

// 			// Get the node type from the dataTransfer
// 			const nodeType = event.dataTransfer.getData('application/reactflow');

// 			if (!nodeType) return;

// 			// Calculate the drop position in canvas coordinates
// 			const position = {
// 				x: (event.clientX - canvasBoundsRef.current.left) / zoom,
// 				y: (event.clientY - canvasBoundsRef.current.top) / zoom,
// 			};
// 			// Get metadata for the node (you can import or redefine nodeTypes here)
// 			const nodeTypeDefs = [
// 				{
// 					type: 'create-ad',
// 					label: 'Create Ad',
// 					description: 'Starting point',
// 					icon: '📝',
// 				},
// 				// Other node types...
// 			];

// 			const nodeTemplate = nodeTypeDefs.find((n) => n.type === nodeType);

// 			if (nodeTemplate) {
// 				addNode({
// 					type: nodeType,
// 					position,
// 					data: {
// 						label: nodeTemplate.label,
// 						description: nodeTemplate.description,
// 						icon: nodeTemplate.icon,
// 					},
// 				});
// 			}
// 		},
// 		[zoom, addNode]
// 	);

// 	// Track canvas position
// 	useEffect(() => {
// 		const updateCanvasOffset = () => {
// 			if (canvasRef.current) {
// 				const rect = canvasRef.current.getBoundingClientRect();
// 				setCanvasOffset({ x: rect.left, y: rect.top });
// 			}
// 		};

// 		updateCanvasOffset();
// 		window.addEventListener('resize', updateCanvasOffset);
// 		return () => window.removeEventListener('resize', updateCanvasOffset);
// 	}, []);

// 	// Handle mouse wheel for zooming
// 	const handleWheel = (e: React.WheelEvent) => {
// 		if (e.ctrlKey || e.metaKey) {
// 			e.preventDefault();
// 			const delta = e.deltaY > 0 ? -0.05 : 0.05;
// 			const newZoom = Math.max(0.1, Math.min(2, zoom + delta));
// 			setZoom(newZoom);
// 		}
// 	};

// 	// Handle node selection
// 	const handleCanvasClick = (e: MouseEvent) => {
// 		if (e.target === canvasRef.current) {
// 			selectNode(null);
// 		}
// 	};

// 	// Handle connection start
// 	const handleConnectionStart = useCallback(
// 		(nodeId: string, handleId: string, position: { x: number; y: number }) => {
// 			setIsConnecting(true);
// 			setConnectionStart({ nodeId, handleId, position });
// 			setConnectionEnd(position);
// 		},
// 		[]
// 	);

// 	// Handle connection movement
// 	const handleMouseMove = useCallback(
// 		(e: MouseEvent) => {
// 			if (isConnecting && connectionStart) {
// 				const x = (e.clientX - canvasOffset.x) / zoom;
// 				const y = (e.clientY - canvasOffset.y) / zoom;
// 				setConnectionEnd({ x, y });
// 			}
// 		},
// 		[isConnecting, connectionStart, canvasOffset, zoom]
// 	);

// 	// Handle connection end
// 	const handleConnectionEnd = useCallback(
// 		(targetNodeId: string, targetHandleId: string) => {
// 			if (connectionStart && targetNodeId !== connectionStart.nodeId) {
// 				addConnection({
// 					sourceId: connectionStart.nodeId,
// 					targetId: targetNodeId,
// 					sourceHandle: connectionStart.handleId,
// 					targetHandle: targetHandleId,
// 				});
// 			}

// 			setIsConnecting(false);
// 			setConnectionStart(null);
// 			setConnectionEnd(null);
// 		},
// 		[connectionStart, addConnection]
// 	);

// 	// Handle canvas mouse up (cancel connection)
// 	const handleMouseUp = useCallback(() => {
// 		if (isConnecting) {
// 			setIsConnecting(false);
// 			setConnectionStart(null);
// 			setConnectionEnd(null);
// 		}
// 	}, [isConnecting]);

// 	// Custom zoom controls
// 	const zoomIn = useCallback(() => {
// 		const newZoom = Math.min(2, zoom + 0.1);
// 		setZoom(newZoom);
// 	}, [zoom, setZoom]);

// 	const zoomOut = useCallback(() => {
// 		const newZoom = Math.max(0.1, zoom - 0.1);
// 		setZoom(newZoom);
// 	}, [zoom, setZoom]);

// 	const resetZoom = useCallback(() => {
// 		setZoom(1);
// 	}, [setZoom]);

// 	// Fit view to see all nodes
// 	const fitView = useCallback(() => {
// 		if (nodes.length === 0 || !canvasRef.current) return;

// 		// Calculate bounds
// 		let minX = Infinity,
// 			minY = Infinity,
// 			maxX = -Infinity,
// 			maxY = -Infinity;

// 		nodes.forEach((node) => {
// 			const nodeX = node.position.x;
// 			const nodeY = node.position.y;
// 			const nodeWidth = 150; // Approximate node width
// 			const nodeHeight = 40; // Approximate node height

// 			minX = Math.min(minX, nodeX);
// 			minY = Math.min(minY, nodeY);
// 			maxX = Math.max(maxX, nodeX + nodeWidth);
// 			maxY = Math.max(maxY, nodeY + nodeHeight);
// 		});

// 		// Add padding
// 		const padding = 50;
// 		minX -= padding;
// 		minY -= padding;
// 		maxX += padding;
// 		maxY += padding;

// 		// Calculate required zoom
// 		const canvasWidth = canvasRef.current.clientWidth;
// 		const canvasHeight = canvasRef.current.clientHeight;
// 		const contentWidth = maxX - minX;
// 		const contentHeight = maxY - minY;

// 		const zoomX = canvasWidth / contentWidth;
// 		const zoomY = canvasHeight / contentHeight;
// 		const newZoom = Math.min(Math.min(zoomX, zoomY), 1);

// 		setZoom(newZoom);
// 	}, [nodes, setZoom]);

// 	return (
// 		<div className='w-full h-full flex flex-col bg-gray-900 overflow-hidden'>
// 			{/* Canvas toolbar */}
// 			<div className='bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 p-2 flex items-center justify-between'>
// 				<div className='flex items-center space-x-1'>
// 					<button
// 						onClick={zoomIn}
// 						className='p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors'
// 						title='Zoom in'>
// 						<ZoomInIcon className='w-4 h-4' />
// 					</button>
// 					<button
// 						onClick={zoomOut}
// 						className='p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors'
// 						title='Zoom out'>
// 						<ZoomOutIcon className='w-4 h-4' />
// 					</button>
// 					<button
// 						onClick={resetZoom}
// 						className='px-2 py-1 text-xs text-gray-400 hover:text-gray-200 bg-gray-700/50 rounded-md transition-colors'
// 						title='Reset zoom'>
// 						{Math.round(zoom * 100)}%
// 					</button>
// 					<button
// 						onClick={fitView}
// 						className='p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors'
// 						title='Fit view'>
// 						<FitViewIcon className='w-4 h-4' />
// 					</button>
// 				</div>
// 				<div className='flex items-center space-x-1'>
// 					<button
// 						onClick={() => setShowGrid(!showGrid)}
// 						className={`p-1.5 ${showGrid ? 'text-blue-400' : 'text-gray-400'} hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors`}
// 						title='Toggle grid'>
// 						<GridIcon className='w-4 h-4' />
// 					</button>
// 				</div>
// 			</div>

// 			{/* Canvas area */}
// 			<div
// 				className='flex-1 bg-gray-800/30 overflow-hidden'
// 				style={{ cursor: isDragging ? 'grabbing' : 'default' }}
// 				onWheel={handleWheel}
// 				onClick={handleCanvasClick}
// 				onMouseMove={handleMouseMove}
// 				onMouseUp={handleMouseUp}
// 				onDragOver={handleDragOver}
// 				onDrop={handleDrop}>
// 				<div
// 					ref={canvasRef}
// 					className='w-full h-full relative'
// 					style={{
// 						transform: `scale(${zoom})`,
// 						transformOrigin: '0 0',
// 					}}>
// 					{/* Render nodes */}
// 					{nodes.map((node) => (
// 						<NodeComponent
// 							key={node.id}
// 							node={{
// 								...node,
// 								label: node.label || '', // Ensure label exists
// 								description: node.description || 'No description', // Ensure description exists
// 							}}
// 							isSelected={node.id === selectedNodeId}
// 							onConnectionStart={handleConnectionStart}
// 							onConnectionEnd={handleConnectionEnd}
// 						/>
// 					))}

// 					{/* Render connections */}
// 					<svg className='absolute top-0 left-0 w-full h-full pointer-events-none'>
// 						{connections.map((connection) => {
// 							const sourceNode = nodes.find(
// 								(n) => n.id === connection.sourceId
// 							);
// 							const targetNode = nodes.find(
// 								(n) => n.id === connection.targetId
// 							);

// 							if (!sourceNode || !targetNode) return null;

// 							// Calculate connection positions (simplified - would need actual handle positions)
// 							const sourceX = sourceNode.position.x + 150; // Assuming right side of node
// 							const sourceY = sourceNode.position.y + 20; // Assuming middle of node
// 							const targetX = targetNode.position.x;
// 							const targetY = targetNode.position.y + 20; // Assuming middle of node

// 							return (
// 								<ConnectionLine
// 									key={connection.id}
// 									id={connection.id}
// 									sourceX={sourceX}
// 									sourceY={sourceY}
// 									targetX={targetX}
// 									targetY={targetY}
// 								/>
// 							);
// 						})}

// 						{/* Render connection being created */}
// 						{isConnecting && connectionStart && connectionEnd && (
// 							<ConnectionLine
// 								id='temp-connection'
// 								sourceX={connectionStart.position.x}
// 								sourceY={connectionStart.position.y}
// 								targetX={connectionEnd.x}
// 								targetY={connectionEnd.y}
// 								isCreating
// 							/>
// 						)}
// 					</svg>

// 					{/* Grid background - optional */}
// 					{showGrid && (
// 						<div
// 							className='absolute inset-0 pointer-events-none'
// 							style={{
// 								backgroundImage:
// 									'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
// 								backgroundSize: '20px 20px',
// 							}}
// 						/>
// 					)}

// 					{/* Empty state for no nodes */}
// 					{nodes.length === 0 && (
// 						<div className='absolute inset-0 flex flex-col items-center justify-center text-gray-400'>
// 							<svg
// 								xmlns='http://www.w3.org/2000/svg'
// 								className='h-12 w-12 mb-3'
// 								fill='none'
// 								viewBox='0 0 24 24'
// 								stroke='currentColor'>
// 								<path
// 									strokeLinecap='round'
// 									strokeLinejoin='round'
// 									strokeWidth={1.5}
// 									d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
// 								/>
// 							</svg>
// 							<span className='text-sm font-medium'>No nodes in canvas</span>
// 							<p className='text-xs mt-2 text-gray-500 max-w-sm text-center'>
// 								Click the Add Node button in the sidebar to start building your
// 								ad flow
// 							</p>
// 						</div>
// 					)}
// 				</div>
// 			</div>

// 			{/* Status bar */}
// 			<div className='bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/50 px-3 py-1 text-xs text-gray-400 flex justify-between items-center'>
// 				<div>
// 					{nodes.length} nodes · {connections.length} connections
// 				</div>
// 				{selectedNodeId && <div>Selected: {selectedNodeId}</div>}
// 			</div>
// 		</div>
// 	);
// };

// export default AdStudioCanvas;

'use client';
import React, {
	useRef,
	useEffect,
	useState,
	MouseEvent,
	useCallback,
} from 'react';
import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
import NodeComponent from './node';
import ConnectionLine from './connection';
import {
	ZoomIn as ZoomInIcon,
	ZoomOut as ZoomOutIcon,
	Grid as GridIcon,
	Maximize2 as FitViewIcon,
} from 'lucide-react';

// Import the node types from the same place as the toolbox
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

const AdStudioCanvas: React.FC = () => {
	const { state, addNode, updateNode, selectNode, setZoom, addConnection } =
		useAdStudio();

	const { nodes, connections, selectedNodeId, zoom, isDragging } = state;

	const canvasRef = useRef<HTMLDivElement>(null);
	const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
	const [isConnecting, setIsConnecting] = useState(false);
	const [connectionStart, setConnectionStart] = useState<{
		nodeId: string;
		handleId: string;
		position: { x: number; y: number };
	} | null>(null);

	const [connectionEnd, setConnectionEnd] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const [showGrid, setShowGrid] = useState(true);
	// Add a ref to get canvas bounds
	const canvasBoundsRef = useRef({ left: 0, top: 0 });

	// Update bounds on render
	useEffect(() => {
		if (canvasRef.current) {
			const rect = canvasRef.current.getBoundingClientRect();
			canvasBoundsRef.current = {
				left: rect.left,
				top: rect.top,
			};
		}
	}, [zoom]);

	// Add dragover handler
	const handleDragOver = useCallback((event: React.DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	// Add drop handler - Fixed to support all node types
	const handleDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();

			// Get the node type from the dataTransfer
			const nodeType = event.dataTransfer.getData('application/reactflow');

			if (!nodeType) return;

			// Calculate the drop position in canvas coordinates
			const position = {
				x: (event.clientX - canvasBoundsRef.current.left) / zoom,
				y: (event.clientY - canvasBoundsRef.current.top) / zoom,
			};

			// Find the node template from our full list of node types
			const nodeTemplate = nodeTypes.find((n) => n.type === nodeType);

			if (nodeTemplate) {
				addNode({
					type: nodeType,
					position,
					data: {
						label: nodeTemplate.label,
						description: nodeTemplate.description,
						icon: nodeTemplate.icon,
					},
				});
			}
		},
		[zoom, addNode]
	);

	// Track canvas position
	useEffect(() => {
		const updateCanvasOffset = () => {
			if (canvasRef.current) {
				const rect = canvasRef.current.getBoundingClientRect();
				setCanvasOffset({ x: rect.left, y: rect.top });
			}
		};

		updateCanvasOffset();
		window.addEventListener('resize', updateCanvasOffset);
		return () => window.removeEventListener('resize', updateCanvasOffset);
	}, []);

	// Handle mouse wheel for zooming
	const handleWheel = (e: React.WheelEvent) => {
		if (e.ctrlKey || e.metaKey) {
			e.preventDefault();
			const delta = e.deltaY > 0 ? -0.05 : 0.05;
			const newZoom = Math.max(0.1, Math.min(2, zoom + delta));
			setZoom(newZoom);
		}
	};

	// Handle node selection
	const handleCanvasClick = (e: MouseEvent) => {
		if (e.target === canvasRef.current) {
			selectNode(null);
		}
	};

	// Handle connection start
	const handleConnectionStart = useCallback(
		(nodeId: string, handleId: string, position: { x: number; y: number }) => {
			setIsConnecting(true);
			setConnectionStart({ nodeId, handleId, position });
			setConnectionEnd(position);
		},
		[]
	);

	// Handle connection movement
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (isConnecting && connectionStart) {
				const x = (e.clientX - canvasOffset.x) / zoom;
				const y = (e.clientY - canvasOffset.y) / zoom;
				setConnectionEnd({ x, y });
			}
		},
		[isConnecting, connectionStart, canvasOffset, zoom]
	);

	// Handle connection end
	const handleConnectionEnd = useCallback(
		(targetNodeId: string, targetHandleId: string) => {
			if (connectionStart && targetNodeId !== connectionStart.nodeId) {
				addConnection({
					sourceId: connectionStart.nodeId,
					targetId: targetNodeId,
					sourceHandle: connectionStart.handleId,
					targetHandle: targetHandleId,
				});
			}

			setIsConnecting(false);
			setConnectionStart(null);
			setConnectionEnd(null);
		},
		[connectionStart, addConnection]
	);

	// Handle canvas mouse up (cancel connection)
	const handleMouseUp = useCallback(() => {
		if (isConnecting) {
			setIsConnecting(false);
			setConnectionStart(null);
			setConnectionEnd(null);
		}
	}, [isConnecting]);

	// Custom zoom controls
	const zoomIn = useCallback(() => {
		const newZoom = Math.min(2, zoom + 0.1);
		setZoom(newZoom);
	}, [zoom, setZoom]);

	const zoomOut = useCallback(() => {
		const newZoom = Math.max(0.1, zoom - 0.1);
		setZoom(newZoom);
	}, [zoom, setZoom]);

	const resetZoom = useCallback(() => {
		setZoom(1);
	}, [setZoom]);

	// Fit view to see all nodes
	const fitView = useCallback(() => {
		if (nodes.length === 0 || !canvasRef.current) return;

		// Calculate bounds
		let minX = Infinity,
			minY = Infinity,
			maxX = -Infinity,
			maxY = -Infinity;

		nodes.forEach((node) => {
			const nodeX = node.position.x;
			const nodeY = node.position.y;
			const nodeWidth = 150; // Approximate node width
			const nodeHeight = 40; // Approximate node height

			minX = Math.min(minX, nodeX);
			minY = Math.min(minY, nodeY);
			maxX = Math.max(maxX, nodeX + nodeWidth);
			maxY = Math.max(maxY, nodeY + nodeHeight);
		});

		// Add padding
		const padding = 50;
		minX -= padding;
		minY -= padding;
		maxX += padding;
		maxY += padding;

		// Calculate required zoom
		const canvasWidth = canvasRef.current.clientWidth;
		const canvasHeight = canvasRef.current.clientHeight;
		const contentWidth = maxX - minX;
		const contentHeight = maxY - minY;

		const zoomX = canvasWidth / contentWidth;
		const zoomY = canvasHeight / contentHeight;
		const newZoom = Math.min(Math.min(zoomX, zoomY), 1);

		setZoom(newZoom);
	}, [nodes, setZoom]);

	return (
		<div className='w-full h-full flex flex-col bg-gray-900 overflow-hidden'>
			{/* Canvas toolbar */}
			<div className='bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 p-2 flex items-center justify-between'>
				<div className='flex items-center space-x-1'>
					<button
						onClick={zoomIn}
						className='p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors'
						title='Zoom in'>
						<ZoomInIcon className='w-4 h-4' />
					</button>
					<button
						onClick={zoomOut}
						className='p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors'
						title='Zoom out'>
						<ZoomOutIcon className='w-4 h-4' />
					</button>
					<button
						onClick={resetZoom}
						className='px-2 py-1 text-xs text-gray-400 hover:text-gray-200 bg-gray-700/50 rounded-md transition-colors'
						title='Reset zoom'>
						{Math.round(zoom * 100)}%
					</button>
					<button
						onClick={fitView}
						className='p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors'
						title='Fit view'>
						<FitViewIcon className='w-4 h-4' />
					</button>
				</div>
				<div className='flex items-center space-x-1'>
					<button
						onClick={() => setShowGrid(!showGrid)}
						className={`p-1.5 ${showGrid ? 'text-blue-400' : 'text-gray-400'} hover:text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors`}
						title='Toggle grid'>
						<GridIcon className='w-4 h-4' />
					</button>
				</div>
			</div>

			{/* Canvas area */}
			<div
				className='flex-1 bg-gray-800/30 overflow-hidden'
				style={{ cursor: isDragging ? 'grabbing' : 'default' }}
				onWheel={handleWheel}
				onClick={handleCanvasClick}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onDragOver={handleDragOver}
				onDrop={handleDrop}>
				<div
					ref={canvasRef}
					className='w-full h-full relative'
					style={{
						transform: `scale(${zoom})`,
						transformOrigin: '0 0',
					}}>
					{/* Render nodes */}
					{nodes.map((node) => (
						<NodeComponent
							key={node.id}
							node={{
								...node,
								label: node.label || '', // Ensure label exists
								description: node.description || 'No description', // Ensure description exists
							}}
							isSelected={node.id === selectedNodeId}
							onConnectionStart={handleConnectionStart}
							onConnectionEnd={handleConnectionEnd}
						/>
					))}

					{/* Render connections */}
					<svg className='absolute top-0 left-0 w-full h-full pointer-events-none'>
						{connections.map((connection) => {
							const sourceNode = nodes.find(
								(n) => n.id === connection.sourceId
							);
							const targetNode = nodes.find(
								(n) => n.id === connection.targetId
							);

							if (!sourceNode || !targetNode) return null;

							// Calculate connection positions (simplified - would need actual handle positions)
							const sourceX = sourceNode.position.x + 150; // Assuming right side of node
							const sourceY = sourceNode.position.y + 20; // Assuming middle of node
							const targetX = targetNode.position.x;
							const targetY = targetNode.position.y + 20; // Assuming middle of node

							return (
								<ConnectionLine
									key={connection.id}
									id={connection.id}
									sourceX={sourceX}
									sourceY={sourceY}
									targetX={targetX}
									targetY={targetY}
								/>
							);
						})}

						{/* Render connection being created */}
						{isConnecting && connectionStart && connectionEnd && (
							<ConnectionLine
								id='temp-connection'
								sourceX={connectionStart.position.x}
								sourceY={connectionStart.position.y}
								targetX={connectionEnd.x}
								targetY={connectionEnd.y}
								isCreating
							/>
						)}
					</svg>

					{/* Grid background - optional */}
					{showGrid && (
						<div
							className='absolute inset-0 pointer-events-none'
							style={{
								backgroundImage:
									'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
								backgroundSize: '20px 20px',
							}}
						/>
					)}

					{/* Empty state for no nodes */}
					{/* Empty state for no nodes */}
					{nodes.length === 0 && (
						<div className='absolute inset-0 flex flex-col items-center justify-center text-gray-400'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-12 w-12 mb-3'
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
							<span className='text-sm font-medium'>No nodes in canvas</span>
							<p className='text-xs mt-2 text-gray-500 max-w-sm text-center'>
								Click the Add Node button in the sidebar to start building your
								ad flow
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Status bar */}
			<div className='bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/50 px-3 py-1 text-xs text-gray-400 flex justify-between items-center'>
				<div>
					{nodes.length} nodes · {connections.length} connections
				</div>
				{selectedNodeId && <div>Selected: {selectedNodeId}</div>}
			</div>
		</div>
	);
};

export default AdStudioCanvas;
