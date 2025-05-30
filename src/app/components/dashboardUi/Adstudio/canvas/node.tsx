// // @/app/components/dashboardUi/Adstudio/canvas/node.tsx
// import React, { useState, useRef, useEffect, MouseEvent } from 'react';
// import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
// import { NodeData } from '@/app/lib/types/ad-studio-types';

// interface NodeProps {
// 	node: NodeData;
// 	isSelected: boolean;
// 	onConnectionStart: (
// 		nodeId: string,
// 		handleId: string,
// 		position: { x: number; y: number }
// 	) => void;
// 	onConnectionEnd: (targetNodeId: string, targetHandleId: string) => void;
// }

// const NodeComponent: React.FC<NodeProps> = ({
// 	node,
// 	isSelected,
// 	onConnectionStart,
// 	onConnectionEnd,
// }) => {
// 	const { updateNode, selectNode } = useAdStudio();
// 	const [isDragging, setIsDragging] = useState(false);
// 	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
// 	const nodeRef = useRef<HTMLDivElement>(null);

// 	// Handle node selection
// 	const handleNodeClick = (e: MouseEvent) => {
// 		e.stopPropagation();
// 		selectNode(node.id);
// 	};

// 	// Handle node dragging
// 	const handleMouseDown = (e: MouseEvent) => {
// 		if (e.button !== 0) return; // Only respond to left mouse button
// 		e.stopPropagation();

// 		selectNode(node.id);
// 		setIsDragging(true);

// 		// Calculate the offset from the mouse position to the node position
// 		// This ensures the node doesn't jump to have its top-left corner at the mouse position
// 		if (nodeRef.current) {
// 			const rect = nodeRef.current.getBoundingClientRect();
// 			setDragOffset({
// 				x: e.clientX - rect.left,
// 				y: e.clientY - rect.top,
// 			});
// 		}
// 	};

// 	// Handle connector handle mouse down
// 	const handleConnectorMouseDown = (
// 		e: MouseEvent,
// 		handleId: string,
// 		isInput: boolean
// 	) => {
// 		e.stopPropagation();

// 		// Only allow starting connections from output handles
// 		if (isInput) return;

// 		// Calculate the handle position in canvas coordinates
// 		if (nodeRef.current) {
// 			const rect = nodeRef.current.getBoundingClientRect();
// 			const handleX = rect.left + (isInput ? 0 : rect.width);
// 			const handleY = rect.top + 20; // Assuming the handle is at y=20 of the node

// 			onConnectionStart(node.id, handleId, {
// 				x: handleX,
// 				y: handleY,
// 			});
// 		}
// 	};

// 	// Handle connector handle mouse up (potential connection end)
// 	const handleConnectorMouseUp = (
// 		e: MouseEvent,
// 		handleId: string,
// 		isInput: boolean
// 	) => {
// 		e.stopPropagation();

// 		// Only allow ending connections on input handles
// 		if (!isInput) return;

// 		onConnectionEnd(node.id, handleId);
// 	};

// 	// Setup global mouse handlers for dragging
// 	useEffect(() => {
// 		const handleMouseMove = (e: globalThis.MouseEvent) => {
// 			if (!isDragging) return;

// 			// Update node position based on mouse movement and initial offset
// 			updateNode(node.id, {
// 				position: {
// 					x: e.clientX - dragOffset.x,
// 					y: e.clientY - dragOffset.y,
// 				},
// 			});
// 		};

// 		const handleMouseUp = () => {
// 			setIsDragging(false);
// 		};

// 		if (isDragging) {
// 			document.addEventListener('mousemove', handleMouseMove);
// 			document.addEventListener('mouseup', handleMouseUp);
// 		}

// 		return () => {
// 			document.removeEventListener('mousemove', handleMouseMove);
// 			document.removeEventListener('mouseup', handleMouseUp);
// 		};
// 	}, [isDragging, dragOffset, node.id, updateNode]);

// 	// Determine node type styling
// 	const getNodeTypeClass = () => {
// 		switch (node.type) {
// 			case 'input':
// 				return 'bg-blue-50 border-blue-300';
// 			case 'transform':
// 				return 'bg-purple-50 border-purple-300';
// 			case 'output':
// 				return 'bg-green-50 border-green-300';
// 			default:
// 				return 'bg-gray-50 border-gray-300';
// 		}
// 	};

// 	return (
// 		<div
// 			ref={nodeRef}
// 			className={`absolute rounded-md border-2 p-3 shadow-md w-[300px] ${
// 				isSelected
// 					? 'border-indigo-500 ring-2 ring-indigo-200'
// 					: getNodeTypeClass()
// 			} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
// 			style={{
// 				left: `${node.position.x}px`,
// 				top: `${node.position.y}px`,
// 			}}
// 			onClick={handleNodeClick}
// 			onMouseDown={handleMouseDown}>
// 			{/* Node header */}
// 			<div className='font-medium text-gray-800 mb-2'>{node.label}</div>

// 			{/* Node content */}
// 			<div className='text-sm text-gray-600'>{node.description}</div>

// 			{/* Input handles */}
// 			{node.inputHandles &&
// 				node.inputHandles.map((handle) => (
// 					<div
// 						key={`input-${handle.id}`}
// 						className='absolute w-3 h-3 rounded-full bg-blue-500 hover:bg-blue-600 left-0 top-6 transform -translate-x-1/2 cursor-crosshair'
// 						onMouseDown={(e) => handleConnectorMouseDown(e, handle.id, true)}
// 						onMouseUp={(e) => handleConnectorMouseUp(e, handle.id, true)}
// 					/>
// 				))}

// 			{/* Output handles */}
// 			{node.outputHandles &&
// 				node.outputHandles.map((handle) => (
// 					<div
// 						key={`output-${handle.id}`}
// 						className='absolute w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 right-0 top-6 transform translate-x-1/2 cursor-crosshair'
// 						onMouseDown={(e) => handleConnectorMouseDown(e, handle.id, false)}
// 						onMouseUp={(e) => handleConnectorMouseUp(e, handle.id, false)}
// 					/>
// 				))}
// 		</div>
// 	);
// };

// export default NodeComponent;

import React, { useState } from 'react';
import { useAdStudio } from '@/app/lib/providers/ad-studio-provider';
import {
	X as CloseIcon,
	Edit as EditIcon,
	MoreHorizontal as MoreIcon,
} from 'lucide-react';

// CSS for the connection handles
const handleStyle = {
	input:
		'absolute w-3 h-3 bg-gray-400 rounded-full border border-gray-700 hover:bg-blue-500 cursor-crosshair transition-colors duration-300 z-10',
	output:
		'absolute w-3 h-3 bg-gray-400 rounded-full border border-gray-700 hover:bg-blue-500 cursor-crosshair transition-colors duration-300 z-10',
};

const NodeComponent = ({
	node,
	isSelected,
	onConnectionStart,
	onConnectionEnd,
}) => {
	const { updateNode, selectNode, dispatch } = useAdStudio();
	const [isEditing, setIsEditing] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [nodeData, setNodeData] = useState({
		label: node.label || '',
		description: node.description || '',
	});

	// Get the icon based on node type
	const getNodeIcon = () => {
		const iconMap = {
			'create-ad': '📝',
			designer: '🎨',
			platform: '📱',
			audience: '👥',
			budget: '💰',
			schedule: '📅',
			metrics: '📊',
		};

		return iconMap[node.type] || '📄';
	};

	// Handle node selection
	const handleNodeClick = (e) => {
		e.stopPropagation();
		selectNode(node.id);
	};

	// Handle node deletion
	const handleDeleteNode = (e) => {
		e.stopPropagation();
		dispatch({ type: 'REMOVE_NODE', payload: node.id });
	};

	// Handle node editing
	const handleEditNode = (e) => {
		e.stopPropagation();
		setIsEditing(true);
		setMenuOpen(false);
	};

	// Handle input change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNodeData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle save changes
	const handleSaveChanges = () => {
		updateNode(node.id, {
			...node,
			label: nodeData.label,
			description: nodeData.description,
		});
		setIsEditing(false);
	};

	// Handle drag start
	const handleDragStart = (e) => {
		e.stopPropagation();
		// Additional logic for drag can be added here
	};

	// Handle connection start
	const handleConnectionStart = (e, handleId) => {
		e.stopPropagation();
		const handleElement = e.currentTarget;
		const handleRect = handleElement.getBoundingClientRect();
		const x = handleRect.left + handleRect.width / 2;
		const y = handleRect.top + handleRect.height / 2;

		onConnectionStart(node.id, handleId, { x, y });
	};

	// Handle connection end
	const handleConnectionEnd = (e, handleId) => {
		e.stopPropagation();
		onConnectionEnd(node.id, handleId);
	};

	// Node style based on type
	const getNodeStyle = () => {
		const baseStyle =
			'rounded-lg border shadow-lg transition-all duration-300 cursor-move';

		const typeStyles = {
			'create-ad':
				'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30',
			designer:
				'bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border-purple-500/30',
			platform:
				'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30',
			audience:
				'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30',
			budget:
				'bg-gradient-to-r from-red-500/10 to-rose-500/10 border-red-500/30',
			schedule:
				'bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border-indigo-500/30',
			metrics:
				'bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/30',
		};

		return `${baseStyle} ${typeStyles[node.type] || 'bg-gray-800/90 border-gray-700/50'}`;
	};

	return (
		<div
			className={`absolute w-64 ${getNodeStyle()} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
			style={{
				left: node.position.x,
				top: node.position.y,
				zIndex: isSelected ? 10 : 1,
			}}
			onClick={handleNodeClick}
			onDragStart={handleDragStart}
			draggable>
			{/* Node header */}
			<div className='px-3 py-2 flex items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-t-lg border-b border-gray-700/30'>
				<div className='flex items-center'>
					<div className='w-6 h-6 flex items-center justify-center rounded-md bg-gray-700/50 mr-2 text-lg'>
						{getNodeIcon()}
					</div>
					{isEditing ? (
						<input
							type='text'
							name='label'
							value={nodeData.label}
							onChange={handleInputChange}
							className='bg-gray-700/50 border-none rounded px-2 py-0.5 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500'
							autoFocus
						/>
					) : (
						<h3 className='font-medium text-sm text-gray-100'>{node.label}</h3>
					)}
				</div>

				<div className='flex items-center space-x-1'>
					{isEditing ? (
						<button
							onClick={handleSaveChanges}
							className='p-1 text-xs text-blue-400 hover:text-blue-300'>
							Save
						</button>
					) : (
						<div className='relative'>
							<button
								onClick={() => setMenuOpen(!menuOpen)}
								className='p-1 text-gray-400 hover:text-gray-300 rounded-md'>
								<MoreIcon className='w-4 h-4' />
							</button>

							{menuOpen && (
								<div className='absolute right-0 mt-1 bg-gray-800 rounded-md shadow-lg z-20 border border-gray-700/50'>
									<button
										onClick={handleEditNode}
										className='flex items-center px-3 py-1.5 text-xs text-gray-300 hover:bg-gray-700 w-full text-left'>
										<EditIcon className='w-3 h-3 mr-2' /> Edit
									</button>
									<button
										onClick={handleDeleteNode}
										className='flex items-center px-3 py-1.5 text-xs text-red-400 hover:bg-gray-700 w-full text-left'>
										<CloseIcon className='w-3 h-3 mr-2' /> Delete
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Node content */}
			<div className='px-3 py-2 bg-gray-800/80'>
				{isEditing ? (
					<textarea
						name='description'
						value={nodeData.description}
						onChange={handleInputChange}
						className='w-full bg-gray-700/50 border-none rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none'
						rows={2}
					/>
				) : (
					<p className='text-xs text-gray-400'>{node.description}</p>
				)}

				{/* Node type specific content can be added here */}
				{node.type === 'create-ad' && (
					<div className='mt-2 bg-gray-700/30 rounded p-2'>
						<input
							type='text'
							placeholder='Ad Name'
							className='w-full bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2'
						/>
						<select className='w-full bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'>
							<option value=''>Select Ad Type</option>
							<option value='image'>Image Ad</option>
							<option value='video'>Video Ad</option>
							<option value='carousel'>Carousel Ad</option>
						</select>
					</div>
				)}

				{node.type === 'budget' && (
					<div className='mt-2 bg-gray-700/30 rounded p-2'>
						<div className='flex items-center mb-2'>
							<input
								type='number'
								placeholder='Budget'
								className='flex-1 bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
							/>
							<select className='ml-2 bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'>
								<option value='usd'>USD</option>
								<option value='eur'>EUR</option>
							</select>
						</div>
						<select className='w-full bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'>
							<option value='daily'>Daily Budget</option>
							<option value='lifetime'>Lifetime Budget</option>
						</select>
					</div>
				)}

				{node.type === 'audience' && (
					<div className='mt-2 bg-gray-700/30 rounded p-2'>
						<div className='flex items-center mb-2'>
							<span className='text-xs text-gray-400 mr-2'>Age:</span>
							<input
								type='number'
								placeholder='Min'
								className='w-14 bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
							/>
							<span className='text-xs text-gray-400 mx-2'>to</span>
							<input
								type='number'
								placeholder='Max'
								className='w-14 bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
							/>
						</div>
						<select className='w-full bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'>
							<option value=''>Select Demographic</option>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
							<option value='all'>All</option>
						</select>
					</div>
				)}

				{node.type === 'platform' && (
					<div className='mt-2 bg-gray-700/30 rounded p-2'>
						<div className='flex items-center space-x-2 mb-2'>
							<button className='flex-1 bg-blue-500/20 border border-blue-500/30 rounded px-2 py-1 text-xs text-blue-300 hover:bg-blue-500/30 transition-colors'>
								Facebook
							</button>
							<button className='flex-1 bg-sky-500/20 border border-sky-500/30 rounded px-2 py-1 text-xs text-sky-300 hover:bg-sky-500/30 transition-colors'>
								Twitter
							</button>
						</div>
						<div className='flex items-center space-x-2'>
							<button className='flex-1 bg-purple-500/20 border border-purple-500/30 rounded px-2 py-1 text-xs text-purple-300 hover:bg-purple-500/30 transition-colors'>
								Instagram
							</button>
							<button className='flex-1 bg-red-500/20 border border-red-500/30 rounded px-2 py-1 text-xs text-red-300 hover:bg-red-500/30 transition-colors'>
								YouTube
							</button>
						</div>
					</div>
				)}

				{node.type === 'schedule' && (
					<div className='mt-2 bg-gray-700/30 rounded p-2'>
						<div className='flex items-center mb-2'>
							<span className='text-xs text-gray-400 mr-2'>Start:</span>
							<input
								type='date'
								className='flex-1 bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
							/>
						</div>
						<div className='flex items-center'>
							<span className='text-xs text-gray-400 mr-2'>End:</span>
							<input
								type='date'
								className='flex-1 bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
							/>
						</div>
					</div>
				)}

				{node.type === 'metrics' && (
					<div className='mt-2 bg-gray-700/30 rounded p-2'>
						<div className='flex items-center space-x-2 mb-2'>
							<button className='flex-1 bg-green-500/20 border border-green-500/30 rounded px-2 py-1 text-xs text-green-300 hover:bg-green-500/30 transition-colors'>
								Impressions
							</button>
							<button className='flex-1 bg-blue-500/20 border border-blue-500/30 rounded px-2 py-1 text-xs text-blue-300 hover:bg-blue-500/30 transition-colors'>
								Clicks
							</button>
						</div>
						<div className='flex items-center space-x-2'>
							<button className='flex-1 bg-orange-500/20 border border-orange-500/30 rounded px-2 py-1 text-xs text-orange-300 hover:bg-orange-500/30 transition-colors'>
								Conversions
							</button>
							<button className='flex-1 bg-purple-500/20 border border-purple-500/30 rounded px-2 py-1 text-xs text-purple-300 hover:bg-purple-500/30 transition-colors'>
								ROI
							</button>
						</div>
					</div>
				)}

				{node.type === 'designer' && (
					<div className='mt-2 bg-gray-700/30 rounded p-2'>
						<div className='flex items-center mb-2'>
							<button className='flex-1 bg-purple-500/20 border border-purple-500/30 rounded px-2 py-1 text-xs text-purple-300 hover:bg-purple-500/30 transition-colors'>
								Upload Image
							</button>
						</div>
						<div className='flex items-center space-x-2 mb-2'>
							<input
								type='text'
								placeholder='Headline'
								className='flex-1 bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
							/>
						</div>
						<textarea
							placeholder='Ad description...'
							className='w-full bg-gray-700/50 border border-gray-600/30 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none'
							rows={2}
						/>
					</div>
				)}
			</div>

			{/* Connection handles */}
			<div
				className={`${handleStyle.input} left-0 top-1/2 -translate-x-1/2 -translate-y-1/2`}
				onMouseDown={(e) => handleConnectionStart(e, 'input')}
				onMouseUp={(e) => handleConnectionEnd(e, 'input')}
			/>
			<div
				className={`${handleStyle.output} right-0 top-1/2 translate-x-1/2 -translate-y-1/2`}
				onMouseDown={(e) => handleConnectionStart(e, 'output')}
				onMouseUp={(e) => handleConnectionEnd(e, 'output')}
			/>
		</div>
	);
};

export default NodeComponent;
