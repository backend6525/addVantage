// import React from 'react';
// import { ScheduleOption } from './types/schedulerTypes';

// interface SegmentSelectorProps {
// 	segmentOptions: ScheduleOption[];
// 	selectedSegments: {
// 		segmentId: string;
// 		name: string;
// 		count: number;
// 	}[];
// 	toggleSegment: (segment: ScheduleOption) => void;
// 	totalRecipients: number;
// }

// export default function SegmentSelector({
// 	segmentOptions,
// 	selectedSegments,
// 	toggleSegment,
// 	totalRecipients,
// }: SegmentSelectorProps) {
// 	return (
// 		<div className='border border-gray-200 rounded-md'>
// 			<div className='p-3 border-b bg-gray-50'>
// 				<div className='font-medium'>Select audience segments</div>
// 			</div>
// 			<div className='p-2'>
// 				{segmentOptions.map((segment) => (
// 					<div
// 						key={segment.id}
// 						className={`p-2 rounded-md cursor-pointer mb-2 ${
// 							selectedSegments.some((s) => s.segmentId === segment.id)
// 								? 'bg-blue-50 border border-blue-200'
// 								: 'hover:bg-gray-50'
// 						}`}
// 						onClick={() => toggleSegment(segment)}>
// 						<div className='flex items-center'>
// 							<input
// 								type='checkbox'
// 								checked={selectedSegments.some(
// 									(s) => s.segmentId === segment.id
// 								)}
// 								onChange={() => {}}
// 								className='mr-3'
// 							/>
// 							<div>
// 								<div className='font-medium'>{segment.name}</div>
// 								<div className='text-sm text-gray-600'>
// 									{segment.description}
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				))}
// 			</div>

// 			{selectedSegments.length > 0 && (
// 				<div className='p-3 border-t bg-blue-50'>
// 					<div className='font-medium'>
// 						Selected {selectedSegments.length} segments
// 					</div>
// 					<div className='text-sm'>Estimated {totalRecipients} recipients</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

import React from 'react';
import { CheckCircle2, Users, Info } from 'lucide-react';

interface ScheduleOption {
	id: string;
	name: string;
	description: string;
	count?: number;
}

interface SegmentSelectorProps {
	segmentOptions: ScheduleOption[];
	selectedSegments: {
		segmentId: string;
		name: string;
		count: number;
	}[];
	toggleSegment: (segment: ScheduleOption) => void;
	totalRecipients: number;
	maxSelections?: number;
}

export default function SegmentSelector({
	segmentOptions,
	selectedSegments,
	toggleSegment,
	totalRecipients,
	maxSelections,
}: SegmentSelectorProps) {
	const hasReachedMax = maxSelections
		? selectedSegments.length >= maxSelections
		: false;

	return (
		<div className='bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden'>
			{/* Header */}
			<div className='p-4 border-b border-gray-700 bg-gray-800 flex items-center justify-between'>
				<div>
					<h3 className='font-medium text-gray-100'>
						Select audience segments
					</h3>
					<p className='text-sm text-gray-400 mt-1'>
						Choose the audience segments for your campaign
					</p>
				</div>
				<div className='flex items-center text-gray-400 text-sm'>
					<Users size={16} className='mr-2' />
					<span>{segmentOptions.length} available</span>
				</div>
			</div>

			{/* Segment List */}
			<div className='p-3 max-h-96 overflow-y-auto'>
				{segmentOptions.map((segment) => {
					const isSelected = selectedSegments.some(
						(s) => s.segmentId === segment.id
					);
					const isDisabled = hasReachedMax && !isSelected;

					return (
						<div
							key={segment.id}
							className={`relative p-3 rounded-lg transition-all duration-200 mb-2 
                ${
									isSelected
										? 'bg-blue-900/30 border border-blue-700'
										: 'border border-gray-700 hover:border-gray-600'
								}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
							<label
								className='flex items-start w-full cursor-pointer'
								onClick={(e) => {
									if (isDisabled) {
										e.preventDefault();
										return;
									}
								}}>
								<div className='flex-shrink-0 mt-0.5'>
									<input
										type='checkbox'
										checked={isSelected}
										onChange={() => !isDisabled && toggleSegment(segment)}
										disabled={isDisabled}
										className='sr-only'
										id={`segment-${segment.id}`}
									/>
									<div
										className={`w-5 h-5 rounded border flex items-center justify-center
                    ${
											isSelected
												? 'bg-blue-600 border-blue-600'
												: 'border-gray-500 bg-gray-800'
										}`}>
										{isSelected && (
											<CheckCircle2 size={16} className='text-white' />
										)}
									</div>
								</div>

								<div className='ml-3 flex-1'>
									<div className='font-medium text-gray-200'>
										{segment.name}
									</div>
									<div className='text-sm text-gray-400 mt-1'>
										{segment.description}
									</div>

									{segment.count !== undefined && (
										<div className='flex items-center mt-2 text-gray-400 text-xs'>
											<Users size={14} className='mr-1' />
											<span>{segment.count.toLocaleString()} recipients</span>
										</div>
									)}
								</div>
							</label>
						</div>
					);
				})}
			</div>

			{/* Footer Summary */}
			<div
				className={`p-4 border-t border-gray-700 transition-all duration-300
        ${selectedSegments.length > 0 ? 'bg-blue-900/20' : 'bg-gray-800'}`}>
				{selectedSegments.length > 0 ? (
					<div className='flex justify-between items-center'>
						<div>
							<div className='font-medium text-gray-200'>
								{selectedSegments.length}{' '}
								{selectedSegments.length === 1 ? 'segment' : 'segments'}{' '}
								selected
							</div>
							<div className='text-sm text-gray-400 mt-1'>
								Estimated {totalRecipients.toLocaleString()} recipients
							</div>
						</div>

						{maxSelections && (
							<div className='text-sm text-gray-400'>
								{selectedSegments.length}/{maxSelections} max
							</div>
						)}
					</div>
				) : (
					<div className='flex items-center text-gray-400 text-sm'>
						<Info size={16} className='mr-2' />
						<span>Select at least one segment to continue</span>
					</div>
				)}
			</div>
		</div>
	);
}
