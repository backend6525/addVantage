// @/app/components/dashboardUi/Adstudio/canvas/connection-line.tsx
import React from 'react';

interface ConnectionLineProps {
	id: string;
	sourceX: number;
	sourceY: number;
	targetX: number;
	targetY: number;
	isCreating?: boolean;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	isCreating = false,
}) => {
	// Calculate control points for a bezier curve
	// This creates a nice curved line between nodes
	const dx = Math.abs(targetX - sourceX);
	const controlPointX = dx / 2;

	// Path for a bezier curve
	const path = `
    M ${sourceX} ${sourceY}
    C ${sourceX + controlPointX} ${sourceY}, 
      ${targetX - controlPointX} ${targetY}, 
      ${targetX} ${targetY}
  `;

	return (
		<g>
			{/* Drop shadow filter for the connection line */}
			<defs>
				<filter
					id={`shadow-${id}`}
					x='-20%'
					y='-20%'
					width='140%'
					height='140%'>
					<feDropShadow dx='0' dy='1' stdDeviation='2' floodOpacity='0.1' />
				</filter>
			</defs>

			{/* The actual connection line */}
			<path
				d={path}
				fill='none'
				stroke={isCreating ? '#9ca3af' : '#6366f1'}
				strokeWidth='2'
				strokeDasharray={isCreating ? '5,5' : 'none'}
				markerEnd={`url(#arrow-${id})`}
				filter={`url(#shadow-${id})`}
			/>

			{/* Arrow marker for the end of the line */}
			<defs>
				<marker
					id={`arrow-${id}`}
					viewBox='0 0 10 10'
					refX='5'
					refY='5'
					markerWidth='6'
					markerHeight='6'
					orient='auto-start-reverse'>
					<path
						d='M 0 0 L 10 5 L 0 10 z'
						fill={isCreating ? '#9ca3af' : '#6366f1'}
					/>
				</marker>
			</defs>

			{/* Optional: Add interactive elements */}
			{!isCreating && (
				<>
					{/* Invisible wider path for easier hover/click */}
					<path
						d={path}
						stroke='transparent'
						strokeWidth='10'
						fill='none'
						className='cursor-pointer'
					/>

					{/* Visual feedback for hovering over connection */}
					<circle
						cx={(sourceX + targetX) / 2}
						cy={(sourceY + targetY) / 2}
						r='4'
						fill='#ffffff'
						stroke='#6366f1'
						strokeWidth='1'
						className='opacity-0 hover:opacity-100 cursor-pointer'
					/>
				</>
			)}
		</g>
	);
};

export default ConnectionLine;
