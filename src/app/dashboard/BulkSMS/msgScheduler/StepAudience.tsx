// import React from 'react';
// import { UsersIcon } from 'lucide-react';
// import { ScheduleOption } from './types/schedulerTypes';
// import SegmentSelector from './SegmentSelector';
// import {
// 	BATCH_OPTIONS,
// 	INTERVAL_OPTIONS,
// } from './constants/SchedulerConstants';

// interface StepAudienceProps {
// 	contacts: string[];
// 	segmented: boolean;
// 	segments: number;
// 	setSegmented: (value: boolean) => void;
// 	segmentInterval: number;
// 	setSegments: (value: number) => void;
// 	setSegmentInterval: (value: number) => void;
// 	selectedSegments: { segmentId: string; name: string; count: number }[];
// 	segmentOptions: { id: string; name: string; description: string }[];
// 	onSegmentedChange: (segmented: boolean) => void;
// 	onSegmentIntervalChange: (interval: number) => void;
// 	onToggleSegment: (segment: ScheduleOption) => void;
// 	toggleSegment: (segment: ScheduleOption) => void;
// 	totalRecipients: number;
// 	enableNotifications: boolean;
// 	onEnableNotificationsChange: (enable: boolean) => void;
// }

// export default function StepAudience({
// 	segmented,
// 	setSegmented,
// 	contacts,
// 	segmentOptions,
// 	selectedSegments,
// 	toggleSegment,
// 	totalRecipients,
// 	segments,
// 	setSegments,
// 	segmentInterval,
// 	setSegmentInterval,
// }: StepAudienceProps) {
// 	return (
// 		<div className='space-y-6'>
// 			<div>
// 				<h3 className='text-lg font-medium mb-4'>
// 					Who should receive this message?
// 				</h3>

// 				<div className='flex items-center gap-4 mb-4'>
// 					<div className='flex-1'>
// 						<div
// 							className={`border rounded-md p-3 cursor-pointer ${
// 								!segmented
// 									? 'border-blue-500 bg-blue-50 text-blue-700'
// 									: 'border-gray-300'
// 							}`}
// 							onClick={() => setSegmented(false)}>
// 							<div className='flex items-center'>
// 								<UsersIcon size={18} className='mr-2' />
// 								<div>
// 									<div className='font-medium'>All selected contacts</div>
// 									<div className='text-sm'>{contacts.length} recipients</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					<div className='flex-1'>
// 						<div
// 							className={`border rounded-md p-3 cursor-pointer ${
// 								segmented
// 									? 'border-blue-500 bg-blue-50 text-blue-700'
// 									: 'border-gray-300'
// 							}`}
// 							onClick={() => setSegmented(true)}>
// 							<div className='flex items-center'>
// 								<UsersIcon size={18} className='mr-2' />
// 								<div>
// 									<div className='font-medium'>Segment audience</div>
// 									<div className='text-sm'>Target specific groups</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>

// 				{segmented && (
// 					<SegmentSelector
// 						segmentOptions={segmentOptions}
// 						selectedSegments={selectedSegments}
// 						toggleSegment={toggleSegment}
// 						totalRecipients={totalRecipients}
// 					/>
// 				)}
// 			</div>

// 			{segmented && selectedSegments.length > 1 && (
// 				<div>
// 					<h4 className='font-medium mb-2'>Send schedule</h4>
// 					<div className='flex items-center gap-2 mb-2'>
// 						<select
// 							value={segments}
// 							onChange={(e) => setSegments(parseInt(e.target.value))}
// 							className='border border-gray-300 rounded-md p-2'>
// 							{BATCH_OPTIONS.map((option) => (
// 								<option key={option.value} value={option.value}>
// 									{option.label}
// 								</option>
// 							))}
// 						</select>

// 						{segments > 1 && (
// 							<>
// 								<span>with</span>
// 								<select
// 									value={segmentInterval}
// 									onChange={(e) => setSegmentInterval(parseInt(e.target.value))}
// 									className='border border-gray-300 rounded-md p-2'>
// 									{INTERVAL_OPTIONS.map((option) => (
// 										<option key={option.value} value={option.value}>
// 											{option.label}
// 										</option>
// 									))}
// 								</select>
// 								<span>between batches</span>
// 							</>
// 						)}
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

import React from 'react';
import { UsersIcon, Users2, UserCog, Clock, Send, Info } from 'lucide-react';
import { ScheduleOption } from './types/schedulerTypes';
import SegmentSelector from './SegmentSelector';
import {
	BATCH_OPTIONS,
	INTERVAL_OPTIONS,
} from './constants/SchedulerConstants';

interface StepAudienceProps {
	contacts: string[];
	segmented: boolean;
	segments: number;
	setSegmented: (value: boolean) => void;
	segmentInterval: number;
	setSegments: (value: number) => void;
	setSegmentInterval: (value: number) => void;
	selectedSegments: { segmentId: string; name: string; count: number }[];
	segmentOptions: { id: string; name: string; description: string }[];
	onSegmentedChange?: (segmented: boolean) => void;
	onSegmentIntervalChange?: (interval: number) => void;
	onToggleSegment: (segment: ScheduleOption) => void;
	toggleSegment: (segment: ScheduleOption) => void;
	totalRecipients: number;
	enableNotifications?: boolean;
	onEnableNotificationsChange?: (enable: boolean) => void;
}

export default function StepAudience({
	segmented,
	setSegmented,
	contacts,
	segmentOptions,
	selectedSegments,
	toggleSegment,
	totalRecipients,
	segments,
	setSegments,
	segmentInterval,
	setSegmentInterval,
	onSegmentedChange,
	onSegmentIntervalChange,
	enableNotifications = false,
	onEnableNotificationsChange,
}: StepAudienceProps) {
	// Handle segmented change with callback
	const handleSegmentedChange = (value: boolean) => {
		setSegmented(value);
		onSegmentedChange?.(value);
	};

	// Handle segment interval change with callback
	const handleSegmentIntervalChange = (value: number) => {
		setSegmentInterval(value);
		onSegmentIntervalChange?.(value);
	};

	return (
		<div className='space-y-8 bg-gray-900 p-6 rounded-lg'>
			<div className='pb-4 border-b border-gray-700'>
				<h3 className='text-xl font-medium mb-2 text-gray-100 flex items-center'>
					<UsersIcon size={20} className='mr-2 text-blue-400' />
					Audience Selection
				</h3>
				<p className='text-gray-400'>Define who should receive this message</p>
			</div>

			<div>
				<h4 className='text-gray-200 font-medium mb-4'>
					Who should receive this message?
				</h4>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
					{/* All contacts option */}
					<div
						className={`rounded-lg transition-all duration-200 cursor-pointer 
              ${
								!segmented
									? 'bg-blue-800/30 border-2 border-blue-600 shadow-lg shadow-blue-900/20'
									: 'bg-gray-800 border border-gray-700 hover:border-gray-600'
							}`}
						onClick={() => handleSegmentedChange(false)}>
						<div className='p-4'>
							<div className='flex items-center mb-3'>
								<div
									className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2
                  ${!segmented ? 'border-blue-500 bg-blue-500' : 'border-gray-500'}`}>
									{!segmented && (
										<div className='w-2 h-2 rounded-full bg-white'></div>
									)}
								</div>
								<h5 className='font-medium text-gray-100'>All contacts</h5>
							</div>

							<div className='ml-7'>
								<div className='flex items-center text-gray-300 mb-2'>
									<Users2 size={16} className='mr-2 text-gray-400' />
									Send to all selected contacts
								</div>
								<div className='flex items-center bg-gray-700/50 text-blue-300 text-sm py-1 px-2 rounded'>
									<UsersIcon size={14} className='mr-1' />
									{contacts.length.toLocaleString()} recipients
								</div>
							</div>
						</div>
					</div>

					{/* Segmented option */}
					<div
						className={`rounded-lg transition-all duration-200 cursor-pointer
              ${
								segmented
									? 'bg-blue-800/30 border-2 border-blue-600 shadow-lg shadow-blue-900/20'
									: 'bg-gray-800 border border-gray-700 hover:border-gray-600'
							}`}
						onClick={() => handleSegmentedChange(true)}>
						<div className='p-4'>
							<div className='flex items-center mb-3'>
								<div
									className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2
                  ${segmented ? 'border-blue-500 bg-blue-500' : 'border-gray-500'}`}>
									{segmented && (
										<div className='w-2 h-2 rounded-full bg-white'></div>
									)}
								</div>
								<h5 className='font-medium text-gray-100'>Segment audience</h5>
							</div>

							<div className='ml-7'>
								<div className='flex items-center text-gray-300 mb-2'>
									<UserCog size={16} className='mr-2 text-gray-400' />
									Target specific audience segments
								</div>
								{segmented && selectedSegments.length > 0 && (
									<div className='flex items-center bg-gray-700/50 text-blue-300 text-sm py-1 px-2 rounded'>
										<UsersIcon size={14} className='mr-1' />
										{selectedSegments.length} segments selected
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{segmented && (
					<div className='mt-6 animate-fadeIn'>
						<SegmentSelector
							segmentOptions={segmentOptions}
							selectedSegments={selectedSegments}
							toggleSegment={toggleSegment}
							totalRecipients={totalRecipients}
						/>
					</div>
				)}
			</div>

			{segmented && selectedSegments.length > 1 && (
				<div className='pt-6 border-t border-gray-700 animate-fadeIn'>
					<h4 className='text-gray-200 font-medium mb-4 flex items-center'>
						<Clock size={18} className='mr-2 text-blue-400' />
						Send Schedule
					</h4>

					<div className='bg-gray-800 border border-gray-700 rounded-lg p-4'>
						<div className='flex flex-wrap items-center gap-3 mb-4'>
							<div className='flex items-center bg-gray-700 rounded-md pl-3 pr-1'>
								<Send size={16} className='text-gray-400 mr-2' />
								<select
									value={segments}
									onChange={(e) => setSegments(parseInt(e.target.value))}
									className='bg-gray-700 text-gray-200 py-2 pl-1 pr-8 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500'
									style={{ backgroundPosition: 'right 0.5rem center' }}>
									{BATCH_OPTIONS.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>

							{segments > 1 && (
								<>
									<span className='text-gray-400'>with</span>
									<div className='flex items-center bg-gray-700 rounded-md pl-3 pr-1'>
										<Clock size={16} className='text-gray-400 mr-2' />
										<select
											value={segmentInterval}
											onChange={(e) =>
												handleSegmentIntervalChange(parseInt(e.target.value))
											}
											className='bg-gray-700 text-gray-200 py-2 pl-1 pr-8 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500'
											style={{ backgroundPosition: 'right 0.5rem center' }}>
											{INTERVAL_OPTIONS.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</select>
									</div>
									<span className='text-gray-400'>between batches</span>
								</>
							)}
						</div>

						<div className='flex items-start text-sm bg-blue-900/20 border border-blue-800/30 p-3 rounded-md text-gray-300'>
							<Info
								size={16}
								className='mr-2 text-blue-400 mt-0.5 flex-shrink-0'
							/>
							<div>
								{segments > 1
									? `Your message will be sent in ${segments} batches with ${segmentInterval} minutes between each batch.`
									: 'Your message will be sent to all selected segments at once.'}
								{segments > 1 && selectedSegments.length > 0 && (
									<span className='block mt-1'>
										Estimated completion time:{' '}
										{Math.floor(((segments - 1) * segmentInterval) / 60)} hours
										and {((segments - 1) * segmentInterval) % 60} minutes
									</span>
								)}
							</div>
						</div>
					</div>

					{onEnableNotificationsChange && (
						<div className='mt-4 flex items-center'>
							<input
								type='checkbox'
								id='enable-notifications'
								checked={enableNotifications}
								onChange={(e) => onEnableNotificationsChange(e.target.checked)}
								className='rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700 h-4 w-4'
							/>
							<label
								htmlFor='enable-notifications'
								className='ml-2 text-gray-300 text-sm'>
								Notify me when all batches have been sent
							</label>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
