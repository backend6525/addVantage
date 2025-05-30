// 'use client';

// import { useState, useEffect } from 'react';
// import {
// 	XIcon,
// 	ChevronRightIcon,
// 	ChevronLeftIcon,
// 	CalendarIcon,
// 	ClockIcon,
// 	BellIcon,
// 	UsersIcon,
// 	RepeatIcon,
// 	CheckIcon,
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
// 	ScheduleData,
// 	RecurrenceType,
// 	ScheduleOption,
// } from './types/schedulerTypes';
// import { SEGMENT_OPTIONS } from './constants/SchedulerConstants';
// import {
// 	formatDateForInput,
// 	generateRandomCount,
// 	isStepComplete,
// } from './utils/SchedulerUtils';
// import ProgressIndicator from './ProgressIndicator';
// import StepWhen from './StepWhen';
// import StepRecurrence from './StepRecurrence';
// import StepAudience from './StepAudience';
// import MessagePreview from './MessagePreview';

// interface SchedulerProps {
// 	contacts: string[];
// 	message: string;
// 	onSchedule: (scheduleData: ScheduleData) => void;
// 	onCancel: () => void;
// }

// interface ProgressIndicatorProps {
// 	currentStep: 1 | 2 | 3;
// 	totalSteps: number;
// }

// export default function MessageScheduler({
// 	contacts,
// 	message,
// 	onSchedule,
// 	onCancel,
// }: SchedulerProps) {
// 	const [step, setStep] = useState<1 | 2 | 3>(1);
// 	const [scheduledDate, setScheduledDate] = useState<string>('');
// 	const [scheduledTime, setScheduledTime] = useState<string>('');
// 	const [timeZone, setTimeZone] = useState<string>('UTC-8');
// 	const [recurrence, setRecurrence] = useState<RecurrenceType>('once');
// 	const [customInterval, setCustomInterval] = useState<number>(1);
// 	const [customUnit, setCustomUnit] = useState<'day' | 'week' | 'month'>('day');
// 	const [endAfterOccurrences, setEndAfterOccurrences] = useState<number | null>(
// 		null
// 	);
// 	const [endDate, setEndDate] = useState<string>('');
// 	const [sendOutsideBusinessHours, setSendOutsideBusinessHours] =
// 		useState<boolean>(false);
// 	const [enableNotifications, setEnableNotifications] = useState<boolean>(true);
// 	const [segmented, setSegmented] = useState<boolean>(false);
// 	const [segments, setSegments] = useState<number>(1);
// 	const [segmentInterval, setSegmentInterval] = useState<number>(15);
// 	const [selectedSegments, setSelectedSegments] = useState<
// 		{ segmentId: string; name: string; count: number }[]
// 	>([]);
// 	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

// 	// Set default date to tomorrow
// 	useEffect(() => {
// 		const tomorrow = new Date();
// 		tomorrow.setDate(tomorrow.getDate() + 1);
// 		setScheduledDate(formatDateForInput(tomorrow));

// 		// Set default time to current time
// 		const now = new Date();
// 		setScheduledTime(
// 			`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
// 		);
// 	}, []);

// 	// Toggle segment selection
// 	const toggleSegment = (segment: ScheduleOption) => {
// 		setSelectedSegments((prev) => {
// 			const exists = prev.some((s) => s.segmentId === segment.id);
// 			if (exists) {
// 				return prev.filter((s) => s.segmentId !== segment.id);
// 			} else {
// 				return [
// 					...prev,
// 					{
// 						segmentId: segment.id,
// 						name: segment.name,
// 						count: generateRandomCount(),
// 					},
// 				];
// 			}
// 		});
// 	};

// 	// Calculate total recipients
// 	const totalRecipients = segmented
// 		? selectedSegments.reduce((sum, segment) => sum + segment.count, 0)
// 		: contacts.length;

// 	// Handle submission
// 	const handleSubmit = () => {
// 		setIsSubmitting(true);

// 		// Create date from inputs
// 		const dateTimeParts = `${scheduledDate}T${scheduledTime}`;
// 		const scheduledDateTime = new Date(dateTimeParts);

// 		// Create schedule data object
// 		const scheduleData: ScheduleData = {
// 			scheduledTime: scheduledDateTime,
// 			recurrence,
// 			timeZone,
// 			notifications: enableNotifications,
// 			sendOutsideBusinessHours,
// 		};

// 		// Add custom recurrence if needed
// 		if (recurrence === 'custom') {
// 			scheduleData.customRecurrence = {
// 				interval: customInterval,
// 				unit: customUnit,
// 			};

// 			if (endAfterOccurrences) {
// 				scheduleData.customRecurrence.endAfter = endAfterOccurrences;
// 			}

// 			if (endDate) {
// 				scheduleData.customRecurrence.endDate = new Date(endDate);
// 			}
// 		}

// 		// Add segments if using them
// 		if (segmented && selectedSegments.length > 0) {
// 			scheduleData.segments = selectedSegments;
// 			scheduleData.segmentInterval = segmentInterval;
// 		}

// 		// Simulate loading for smoother UX
// 		setTimeout(() => {
// 			// Pass schedule data to parent
// 			onSchedule(scheduleData);
// 			setIsSubmitting(false);
// 		}, 800);
// 	};

// 	// Navigate to next step
// 	const handleNext = () => {
// 		if (step < 3) {
// 			setStep((prevStep) => (prevStep + 1) as 1 | 2 | 3);
// 		} else {
// 			handleSubmit();
// 		}
// 	};

// 	// Navigate to previous step
// 	const handlePrevious = () => {
// 		if (step > 1) {
// 			setStep((prevStep) => (prevStep - 1) as 1 | 2 | 3);
// 		}
// 	};

// 	// Check if current step is complete
// 	const isCurrentStepComplete = () => {
// 		switch (step) {
// 			case 1:
// 				return isStepComplete(step, {
// 					scheduledDate,
// 					scheduledTime,
// 					timeZone,
// 					recurrence,
// 					customInterval,
// 					endAfterOccurrences: endAfterOccurrences || 0,
// 					endDate,
// 					segmented,
// 					selectedSegments,
// 				} as {
// 					scheduledDate: string;
// 					scheduledTime: string;
// 					timeZone: string;
// 					recurrence: string;
// 					customInterval: number;
// 					endAfterOccurrences: number;
// 					endDate: string;
// 					segmented: boolean;
// 					selectedSegments: any[];
// 				});
// 			case 2:
// 				if (recurrence === 'custom') {
// 					return (
// 						customInterval > 0 &&
// 						customUnit &&
// 						(endAfterOccurrences !== null || endDate !== '')
// 					);
// 				}
// 				return true;
// 			case 3:
// 				if (segmented) {
// 					return selectedSegments.length > 0 && segmentInterval > 0;
// 				}
// 				return true;
// 			default:
// 				return false;
// 		}
// 	};

// 	// Step titles and icons for the header
// 	const stepInfo = [
// 		{
// 			title: 'When to Send',
// 			icon: <CalendarIcon className='text-purple-400' size={18} />,
// 		},
// 		{
// 			title: 'Recurrence Pattern',
// 			icon: <RepeatIcon className='text-purple-400' size={18} />,
// 		},
// 		{
// 			title: 'Audience Selection',
// 			icon: <UsersIcon className='text-purple-400' size={18} />,
// 		},
// 	];

// 	return (
// 		<motion.div
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
// 			<motion.div
// 				initial={{ scale: 0.9, opacity: 0 }}
// 				animate={{ scale: 1, opacity: 1 }}
// 				transition={{ type: 'spring', damping: 20 }}
// 				className='backdrop-blur-md bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 shadow-2xl rounded-xl w-full max-w-5xl overflow-hidden flex flex-col h-auto max-h-[85vh]'>
// 				{/* Header */}
// 				<div className='bg-slate-900/80 p-3 border-b border-slate-700/60 flex-shrink-0'>
// 					<div className='flex justify-between items-center'>
// 						<div className='flex items-center gap-3'>
// 							<h2 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-500'>
// 								Schedule Message
// 							</h2>
// 						</div>
// 						<button
// 							onClick={onCancel}
// 							className='p-2 rounded-full hover:bg-slate-700/70 text-slate-400 hover:text-slate-300 transition-colors'
// 							aria-label='Close'>
// 							<XIcon size={16} />
// 						</button>
// 					</div>
// 				</div>

// 				{/* Main content - Horizontal layout */}
// 				<div className='flex flex-row flex-1 overflow-hidden'>
// 					{/* Left sidebar with steps */}
// 					<div className='w-52 bg-slate-900/90 border-r border-slate-700/60 p-3 flex flex-col overflow-hidden'>
// 						<div className='space-y-2 mb-3'>
// 							{stepInfo.map((info, index) => (
// 								<button
// 									key={index}
// 									onClick={() => setStep((index + 1) as 1 | 2 | 3)}
// 									className={`flex items-center w-full gap-2 p-2 rounded-md text-left transition-all ${
// 										step === index + 1
// 											? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
// 											: 'text-slate-400 hover:bg-slate-800 hover:text-slate-300'
// 									}`}>
// 									<div className='flex-shrink-0'>{info.icon}</div>
// 									<span className='text-sm font-medium truncate'>
// 										{info.title}
// 									</span>
// 								</button>
// 							))}
// 						</div>

// 						{/* Message preview section */}
// 						<div className='mt-1 flex flex-col overflow-hidden flex-1'>
// 							<div className='text-xs uppercase text-slate-500 font-semibold mb-2 px-1 flex items-center'>
// 								<BellIcon size={12} className='mr-1 text-slate-400' />
// 								<span>Message Preview</span>
// 							</div>
// 							<div className='p-2 rounded-lg bg-slate-800/60 border border-slate-700/40 overflow-y-auto flex-1 text-sm'>
// 								<MessagePreview
// 									message={message}
// 									recipients={totalRecipients}
// 									segmented={segmented}
// 									selectedSegments={selectedSegments}
// 									contacts={contacts}
// 									totalRecipients={totalRecipients}
// 								/>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Right content area */}
// 					<div className='flex-1 overflow-hidden flex flex-col'>
// 						{/* Step progress indicator */}
// 						<div className='p-3 border-b border-slate-700/30 bg-slate-800/20 flex-shrink-0'>
// 							<ProgressIndicator currentStep={step} totalSteps={3} />
// 						</div>

// 						{/* Step content */}
// 						<div className='flex-1 overflow-hidden flex flex-col'>
// 							<div className='p-4 flex-1 overflow-hidden'>
// 								<AnimatePresence mode='wait'>
// 									<motion.div
// 										key={step}
// 										initial={{ opacity: 0, x: 20 }}
// 										animate={{ opacity: 1, x: 0 }}
// 										exit={{ opacity: 0, x: -20 }}
// 										transition={{ duration: 0.3 }}
// 										className='overflow-y-auto h-full pr-1 custom-scrollbar'>
// 										<div className='space-y-4'>
// 											{step === 1 && (
// 												<StepWhen
// 													scheduledDate={scheduledDate}
// 													scheduledTime={scheduledTime}
// 													timeZone={timeZone}
// 													sendOutsideBusinessHours={sendOutsideBusinessHours}
// 													onDateChange={setScheduledDate}
// 													onTimeChange={setScheduledTime}
// 													onTimeZoneChange={setTimeZone}
// 													onSendOutsideHoursChange={setSendOutsideBusinessHours}
// 													setScheduledDate={setScheduledDate}
// 													setScheduledTime={setScheduledTime}
// 													setTimeZone={setTimeZone}
// 													setSendOutsideBusinessHours={
// 														setSendOutsideBusinessHours
// 													}
// 												/>
// 											)}

// 											{step === 2 && (
// 												<StepRecurrence
// 													recurrence={recurrence}
// 													customInterval={customInterval}
// 													customUnit={customUnit}
// 													endAfterOccurrences={endAfterOccurrences}
// 													endDate={endDate}
// 													onRecurrenceChange={setRecurrence}
// 													onCustomIntervalChange={setCustomInterval}
// 													onCustomUnitChange={setCustomUnit}
// 													onEndAfterOccurrencesChange={setEndAfterOccurrences}
// 													onEndDateChange={setEndDate}
// 													setCustomUnit={setCustomUnit}
// 													setCustomInterval={setCustomInterval}
// 													setEndAfterOccurrences={setEndAfterOccurrences}
// 													setEndDate={setEndDate}
// 													enableNotifications={enableNotifications}
// 													setEnableNotifications={setEnableNotifications}
// 													scheduledDate={scheduledDate}
// 												/>
// 											)}

// 											{step === 3 && (
// 												<StepAudience
// 													contacts={contacts}
// 													segmented={segmented}
// 													segments={segments}
// 													segmentInterval={segmentInterval}
// 													selectedSegments={selectedSegments}
// 													segmentOptions={SEGMENT_OPTIONS}
// 													setSegmented={setSegmented}
// 													setSegments={setSegments}
// 													setSegmentInterval={setSegmentInterval}
// 													toggleSegment={toggleSegment}
// 													onSegmentedChange={setSegmented}
// 													onSegmentIntervalChange={setSegmentInterval}
// 													onToggleSegment={toggleSegment}
// 													totalRecipients={totalRecipients}
// 													enableNotifications={enableNotifications}
// 													onEnableNotificationsChange={setEnableNotifications}
// 												/>
// 											)}
// 										</div>
// 									</motion.div>
// 								</AnimatePresence>
// 							</div>
// 						</div>

// 						{/* Footer with navigation buttons */}
// 						<div className='flex justify-between items-center p-3 border-t border-slate-700/60 bg-slate-900/40 flex-shrink-0'>
// 							<motion.button
// 								whileHover={{ x: -2 }}
// 								onClick={handlePrevious}
// 								className='flex items-center font-medium text-purple-400 disabled:text-slate-600 transition-colors'
// 								disabled={step === 1}>
// 								<ChevronLeftIcon size={16} className='mr-1' />
// 								Back
// 							</motion.button>

// 							<motion.button
// 								whileHover={{ scale: isCurrentStepComplete() ? 1.03 : 1 }}
// 								whileTap={{ scale: isCurrentStepComplete() ? 0.98 : 1 }}
// 								onClick={handleNext}
// 								disabled={!isCurrentStepComplete() || isSubmitting}
// 								className={`flex items-center px-4 py-2 rounded-md font-medium transition-all duration-200 ${
// 									isCurrentStepComplete()
// 										? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/20'
// 										: 'bg-slate-800 text-slate-500'
// 								}`}>
// 								{isSubmitting ? (
// 									<span className='flex items-center'>
// 										<svg
// 											className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
// 											xmlns='http://www.w3.org/2000/svg'
// 											fill='none'
// 											viewBox='0 0 24 24'>
// 											<circle
// 												className='opacity-25'
// 												cx='12'
// 												cy='12'
// 												r='10'
// 												stroke='currentColor'
// 												strokeWidth='4'></circle>
// 											<path
// 												className='opacity-75'
// 												fill='currentColor'
// 												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
// 										</svg>
// 										Processing...
// 									</span>
// 								) : (
// 									<>
// 										{step === 3 ? (
// 											<span className='flex items-center'>
// 												<CheckIcon size={16} className='mr-1.5' />
// 												Schedule Message
// 											</span>
// 										) : (
// 											<>
// 												<span>Continue</span>
// 												<ChevronRightIcon size={16} className='ml-1.5' />
// 											</>
// 										)}
// 									</>
// 								)}
// 							</motion.button>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Add custom scrollbar styles */}
// 				<style jsx global>{`
// 					.custom-scrollbar::-webkit-scrollbar {
// 						width: 6px;
// 					}

// 					.custom-scrollbar::-webkit-scrollbar-track {
// 						background: rgba(15, 23, 42, 0.2);
// 						border-radius: 6px;
// 					}

// 					.custom-scrollbar::-webkit-scrollbar-thumb {
// 						background-color: rgba(99, 102, 241, 0.3);
// 						border-radius: 6px;
// 						border: 2px solid transparent;
// 					}

// 					.custom-scrollbar::-webkit-scrollbar-thumb:hover {
// 						background-color: rgba(99, 102, 241, 0.5);
// 					}
// 				`}</style>
// 			</motion.div>
// 		</motion.div>
// 	);
// }

'use client';

import { useState, useEffect } from 'react';
import {
	XIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
	CalendarIcon,
	ClockIcon,
	BellIcon,
	UsersIcon,
	RepeatIcon,
	CheckIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ScheduleData,
	RecurrenceType,
	ScheduleOption,
} from './types/schedulerTypes';
import { SEGMENT_OPTIONS } from './constants/SchedulerConstants';
import {
	formatDateForInput,
	generateRandomCount,
	isStepComplete,
} from './utils/SchedulerUtils';
import ProgressIndicator from './ProgressIndicator';
import StepWhen from './StepWhen';
import StepRecurrence from './StepRecurrence';
import StepAudience from './StepAudience';
import MessagePreview from './MessagePreview';

interface SchedulerProps {
	contacts: string[];
	message: string;
	onSchedule: (scheduleData: ScheduleData) => void;
	onCancel: () => void;
}

interface ProgressIndicatorProps {
	currentStep: 1 | 2 | 3;
	totalSteps: number;
}

export default function MessageScheduler({
	contacts,
	message,
	onSchedule,
	onCancel,
}: SchedulerProps) {
	const [step, setStep] = useState<1 | 2 | 3>(1);
	const [scheduledDate, setScheduledDate] = useState<string>('');
	const [scheduledTime, setScheduledTime] = useState<string>('');
	const [timeZone, setTimeZone] = useState<string>('UTC-8');
	const [recurrence, setRecurrence] = useState<RecurrenceType>('once');
	const [customInterval, setCustomInterval] = useState<number>(1);
	const [customUnit, setCustomUnit] = useState<'day' | 'week' | 'month'>('day');
	const [endAfterOccurrences, setEndAfterOccurrences] = useState<number | null>(
		null
	);
	const [endDate, setEndDate] = useState<string>('');
	const [sendOutsideBusinessHours, setSendOutsideBusinessHours] =
		useState<boolean>(false);
	const [enableNotifications, setEnableNotifications] = useState<boolean>(true);
	const [segmented, setSegmented] = useState<boolean>(false);
	const [segments, setSegments] = useState<number>(1);
	const [segmentInterval, setSegmentInterval] = useState<number>(15);
	const [selectedSegments, setSelectedSegments] = useState<
		{ segmentId: string; name: string; count: number }[]
	>([]);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	// Set default date to tomorrow
	useEffect(() => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		setScheduledDate(formatDateForInput(tomorrow));

		// Set default time to current time
		const now = new Date();
		setScheduledTime(
			`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
		);
	}, []);

	// Toggle segment selection
	const toggleSegment = (segment: ScheduleOption) => {
		setSelectedSegments((prev) => {
			const exists = prev.some((s) => s.segmentId === segment.id);
			if (exists) {
				return prev.filter((s) => s.segmentId !== segment.id);
			} else {
				return [
					...prev,
					{
						segmentId: segment.id,
						name: segment.name,
						count: generateRandomCount(),
					},
				];
			}
		});
	};

	// Calculate total recipients
	const totalRecipients = segmented
		? selectedSegments.reduce((sum, segment) => sum + segment.count, 0)
		: contacts.length;

	// Handle submission
	const handleSubmit = () => {
		setIsSubmitting(true);

		// Create date from inputs
		const dateTimeParts = `${scheduledDate}T${scheduledTime}`;
		const scheduledDateTime = new Date(dateTimeParts);

		// Create schedule data object
		const scheduleData: ScheduleData = {
			scheduledTime: scheduledDateTime,
			recurrence,
			timeZone,
			notifications: enableNotifications,
			sendOutsideBusinessHours,
		};

		// Add custom recurrence if needed
		if (recurrence === 'custom') {
			scheduleData.customRecurrence = {
				interval: customInterval,
				unit: customUnit,
			};

			if (endAfterOccurrences) {
				scheduleData.customRecurrence.endAfter = endAfterOccurrences;
			}

			if (endDate) {
				scheduleData.customRecurrence.endDate = new Date(endDate);
			}
		}

		// Add segments if using them
		if (segmented && selectedSegments.length > 0) {
			scheduleData.segments = selectedSegments;
			scheduleData.segmentInterval = segmentInterval;
		}

		// Simulate loading for smoother UX
		setTimeout(() => {
			// Pass schedule data to parent
			onSchedule(scheduleData);
			setIsSubmitting(false);
		}, 800);
	};

	// Navigate to next step
	const handleNext = () => {
		if (step < 3) {
			setStep((prevStep) => (prevStep + 1) as 1 | 2 | 3);
		} else {
			handleSubmit();
		}
	};

	// Navigate to previous step
	const handlePrevious = () => {
		if (step > 1) {
			setStep((prevStep) => (prevStep - 1) as 1 | 2 | 3);
		}
	};

	// Check if current step is complete
	const isCurrentStepComplete = () => {
		switch (step) {
			case 1:
				return isStepComplete(step, {
					scheduledDate,
					scheduledTime,
					timeZone,
					recurrence,
					customInterval,
					endAfterOccurrences: endAfterOccurrences || 0,
					endDate,
					segmented,
					selectedSegments,
				} as {
					scheduledDate: string;
					scheduledTime: string;
					timeZone: string;
					recurrence: string;
					customInterval: number;
					endAfterOccurrences: number;
					endDate: string;
					segmented: boolean;
					selectedSegments: any[];
				});
			case 2:
				if (recurrence === 'custom') {
					return (
						customInterval > 0 &&
						customUnit &&
						(endAfterOccurrences !== null || endDate !== '')
					);
				}
				return true;
			case 3:
				if (segmented) {
					return selectedSegments.length > 0 && segmentInterval > 0;
				}
				return true;
			default:
				return false;
		}
	};

	// Step titles and icons for the header
	const stepInfo = [
		{
			title: 'When to Send',
			icon: <CalendarIcon className='text-purple-400' size={18} />,
		},
		{
			title: 'Recurrence Pattern',
			icon: <RepeatIcon className='text-purple-400' size={18} />,
		},
		{
			title: 'Audience Selection',
			icon: <UsersIcon className='text-purple-400' size={18} />,
		},
	];

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: 'spring', damping: 20 }}
				className='backdrop-blur-md bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 shadow-2xl rounded-xl w-full max-w-5xl overflow-hidden flex flex-col h-auto max-h-[85vh]'>
				{/* Header */}
				<div className='bg-slate-900/80 p-3 border-b border-slate-700/60 flex-shrink-0'>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<h2 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-500'>
								Schedule Message
							</h2>
						</div>
						<button
							onClick={onCancel}
							className='p-2 rounded-full hover:bg-slate-700/70 text-slate-400 hover:text-slate-300 transition-colors'
							aria-label='Close'>
							<XIcon size={16} />
						</button>
					</div>
				</div>

				{/* Main content - Horizontal layout */}
				<div className='flex flex-row flex-1 overflow-hidden'>
					{/* Left sidebar with steps - INCREASED WIDTH FROM w-52 to w-72 */}
					<div className='w-auto bg-slate-900/90 border-r border-slate-700/60 p-3 flex flex-col overflow-hidden'>
						<div className='space-y-2 mb-3'>
							{stepInfo.map((info, index) => (
								<button
									key={index}
									onClick={() => setStep((index + 1) as 1 | 2 | 3)}
									className={`flex items-center w-full gap-2 p-2 rounded-md text-left transition-all ${
										step === index + 1
											? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
											: 'text-slate-400 hover:bg-slate-800 hover:text-slate-300'
									}`}>
									<div className='flex-shrink-0'>{info.icon}</div>
									<span className='text-sm font-medium truncate'>
										{info.title}
									</span>
								</button>
							))}
						</div>

						{/* Message preview section */}
						<div className='mt-1 flex flex-col overflow-hidden flex-1'>
							<div className='text-xs uppercase text-slate-500 font-semibold mb-2 px-1 flex items-center'>
								<BellIcon size={12} className='mr-1 text-slate-400' />
								<span>Message Preview</span>
							</div>
							<div className='p-2 rounded-lg bg-slate-800/60 border border-slate-700/40 overflow-y-auto flex-1 text-sm'>
								<MessagePreview
									message={message}
									recipients={totalRecipients}
									segmented={segmented}
									selectedSegments={selectedSegments}
									contacts={contacts}
									totalRecipients={totalRecipients}
								/>
							</div>
						</div>
					</div>

					{/* Right content area - UPDATED to account for wider left pane */}
					<div className='flex-1 overflow-hidden flex flex-col'>
						{/* Step progress indicator */}
						<div className='p-3 border-b border-slate-700/30 bg-slate-800/20 flex-shrink-0'>
							<ProgressIndicator currentStep={step} totalSteps={3} />
						</div>

						{/* Step content */}
						<div className='flex-1 overflow-hidden flex flex-col'>
							<div className='p-4 flex-1 overflow-hidden'>
								<AnimatePresence mode='wait'>
									<motion.div
										key={step}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}
										className='overflow-y-auto h-full pr-1 custom-scrollbar'>
										<div className='space-y-4'>
											{step === 1 && (
												<StepWhen
													scheduledDate={scheduledDate}
													scheduledTime={scheduledTime}
													timeZone={timeZone}
													sendOutsideBusinessHours={sendOutsideBusinessHours}
													onDateChange={setScheduledDate}
													onTimeChange={setScheduledTime}
													onTimeZoneChange={setTimeZone}
													onSendOutsideHoursChange={setSendOutsideBusinessHours}
													setScheduledDate={setScheduledDate}
													setScheduledTime={setScheduledTime}
													setTimeZone={setTimeZone}
													setSendOutsideBusinessHours={
														setSendOutsideBusinessHours
													}
												/>
											)}

											{step === 2 && (
												<StepRecurrence
													recurrence={recurrence}
													customInterval={customInterval}
													customUnit={customUnit}
													endAfterOccurrences={endAfterOccurrences}
													endDate={endDate}
													onRecurrenceChange={setRecurrence}
													onCustomIntervalChange={setCustomInterval}
													onCustomUnitChange={setCustomUnit}
													onEndAfterOccurrencesChange={setEndAfterOccurrences}
													onEndDateChange={setEndDate}
													setCustomUnit={setCustomUnit}
													setCustomInterval={setCustomInterval}
													setEndAfterOccurrences={setEndAfterOccurrences}
													setEndDate={setEndDate}
													enableNotifications={enableNotifications}
													setEnableNotifications={setEnableNotifications}
													scheduledDate={scheduledDate}
												/>
											)}

											{step === 3 && (
												<StepAudience
													contacts={contacts}
													segmented={segmented}
													segments={segments}
													segmentInterval={segmentInterval}
													selectedSegments={selectedSegments}
													segmentOptions={SEGMENT_OPTIONS}
													setSegmented={setSegmented}
													setSegments={setSegments}
													setSegmentInterval={setSegmentInterval}
													toggleSegment={toggleSegment}
													onSegmentedChange={setSegmented}
													onSegmentIntervalChange={setSegmentInterval}
													onToggleSegment={toggleSegment}
													totalRecipients={totalRecipients}
													enableNotifications={enableNotifications}
													onEnableNotificationsChange={setEnableNotifications}
												/>
											)}
										</div>
									</motion.div>
								</AnimatePresence>
							</div>
						</div>

						{/* Footer with navigation buttons */}
						<div className='flex justify-between items-center p-3 border-t border-slate-700/60 bg-slate-900/40 flex-shrink-0'>
							<motion.button
								whileHover={{ x: -2 }}
								onClick={handlePrevious}
								className='flex items-center font-medium text-purple-400 disabled:text-slate-600 transition-colors'
								disabled={step === 1}>
								<ChevronLeftIcon size={16} className='mr-1' />
								Back
							</motion.button>

							<motion.button
								whileHover={{ scale: isCurrentStepComplete() ? 1.03 : 1 }}
								whileTap={{ scale: isCurrentStepComplete() ? 0.98 : 1 }}
								onClick={handleNext}
								disabled={!isCurrentStepComplete() || isSubmitting}
								className={`flex items-center px-4 py-2 rounded-md font-medium transition-all duration-200 ${
									isCurrentStepComplete()
										? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/20'
										: 'bg-slate-800 text-slate-500'
								}`}>
								{isSubmitting ? (
									<span className='flex items-center'>
										<svg
											className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'></circle>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
										</svg>
										Processing...
									</span>
								) : (
									<>
										{step === 3 ? (
											<span className='flex items-center'>
												<CheckIcon size={16} className='mr-1.5' />
												Schedule Message
											</span>
										) : (
											<>
												<span>Continue</span>
												<ChevronRightIcon size={16} className='ml-1.5' />
											</>
										)}
									</>
								)}
							</motion.button>
						</div>
					</div>
				</div>

				{/* Add custom scrollbar styles */}
				<style jsx global>{`
					.custom-scrollbar::-webkit-scrollbar {
						width: 6px;
					}

					.custom-scrollbar::-webkit-scrollbar-track {
						background: rgba(15, 23, 42, 0.2);
						border-radius: 6px;
					}

					.custom-scrollbar::-webkit-scrollbar-thumb {
						background-color: rgba(99, 102, 241, 0.3);
						border-radius: 6px;
						border: 2px solid transparent;
					}

					.custom-scrollbar::-webkit-scrollbar-thumb:hover {
						background-color: rgba(99, 102, 241, 0.5);
					}
				`}</style>
			</motion.div>
		</motion.div>
	);
}
