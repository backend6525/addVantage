// import React from 'react';
// import { CalendarIcon, ClockIcon } from 'lucide-react';
// import { TIME_ZONE_OPTIONS } from './constants/SchedulerConstants';
// import { formatDateForInput } from './utils/SchedulerUtils';

// interface StepWhenProps {
// 	scheduledDate: string;
// 	scheduledTime: string;
// 	timeZone: string;
// 	sendOutsideBusinessHours: boolean;
// 	setScheduledDate: (date: string) => void;
// 	setScheduledTime: (time: string) => void;
// 	setTimeZone: (tz: string) => void;
// 	setSendOutsideBusinessHours: (value: boolean) => void;
// 	onDateChange: (date: string) => void;
// 	onTimeChange: (time: string) => void;
// 	onTimeZoneChange: (zone: string) => void;
// 	onSendOutsideHoursChange: (send: boolean) => void;
// }

// export default function StepWhen({
// 	scheduledDate,
// 	setScheduledDate,
// 	scheduledTime,
// 	setScheduledTime,
// 	timeZone,
// 	setTimeZone,
// 	sendOutsideBusinessHours,
// 	setSendOutsideBusinessHours,
// }: StepWhenProps) {
// 	return (
// 		<div className='space-y-6'>
// 			<div>
// 				<h3 className='text-lg font-medium mb-4'>
// 					When should this message be sent?
// 				</h3>

// 				<div className='flex flex-col md:flex-row gap-4'>
// 					<div className='flex-1'>
// 						<label className='block text-sm font-medium text-gray-700 mb-1'>
// 							Date
// 						</label>
// 						<div className='relative'>
// 							<input
// 								type='date'
// 								value={scheduledDate}
// 								onChange={(e) => setScheduledDate(e.target.value)}
// 								className='w-full border border-gray-300 rounded-md p-2 pl-10'
// 								min={formatDateForInput(new Date())}
// 							/>
// 							<CalendarIcon
// 								size={18}
// 								className='absolute left-3 top-3 text-gray-500'
// 							/>
// 						</div>
// 					</div>

// 					<div className='flex-1'>
// 						<label className='block text-sm font-medium text-gray-700 mb-1'>
// 							Time
// 						</label>
// 						<div className='relative'>
// 							<input
// 								type='time'
// 								value={scheduledTime}
// 								onChange={(e) => setScheduledTime(e.target.value)}
// 								className='w-full border border-gray-300 rounded-md p-2 pl-10'
// 							/>
// 							<ClockIcon
// 								size={18}
// 								className='absolute left-3 top-3 text-gray-500'
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium text-gray-700 mb-1'>
// 					Time Zone
// 				</label>
// 				<select
// 					value={timeZone}
// 					onChange={(e) => setTimeZone(e.target.value)}
// 					className='w-full border border-gray-300 rounded-md p-2'>
// 					{TIME_ZONE_OPTIONS.map((tz) => (
// 						<option key={tz} value={tz}>
// 							{tz}
// 						</option>
// 					))}
// 				</select>
// 			</div>

// 			<div className='flex items-center'>
// 				<input
// 					type='checkbox'
// 					id='businessHours'
// 					checked={sendOutsideBusinessHours}
// 					onChange={(e) => setSendOutsideBusinessHours(e.target.checked)}
// 					className='mr-2'
// 				/>
// 				<label htmlFor='businessHours' className='text-sm text-gray-700'>
// 					Allow sending outside business hours (9am-5pm)
// 				</label>
// 			</div>
// 		</div>
// 	);
// }

import React from 'react';
import {
	CalendarIcon,
	ClockIcon,
	GlobeIcon,
	Info,
	AlarmCheck,
} from 'lucide-react';
import { TIME_ZONE_OPTIONS } from './constants/SchedulerConstants';
import { formatDateForInput } from './utils/SchedulerUtils';

interface StepWhenProps {
	scheduledDate: string;
	scheduledTime: string;
	timeZone: string;
	sendOutsideBusinessHours: boolean;
	setScheduledDate: (date: string) => void;
	setScheduledTime: (time: string) => void;
	setTimeZone: (tz: string) => void;
	setSendOutsideBusinessHours: (value: boolean) => void;
	onDateChange: (date: string) => void;
	onTimeChange: (time: string) => void;
	onTimeZoneChange: (zone: string) => void;
	onSendOutsideHoursChange: (send: boolean) => void;
}

export default function StepWhen({
	scheduledDate,
	setScheduledDate,
	scheduledTime,
	setScheduledTime,
	timeZone,
	setTimeZone,
	sendOutsideBusinessHours,
	setSendOutsideBusinessHours,
}: StepWhenProps) {
	// Format the date and time for display
	const formatSchedule = () => {
		try {
			const formattedDate = new Date(
				`${scheduledDate}T${scheduledTime}`
			).toLocaleDateString('en-US', {
				weekday: 'long',
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			});

			const formattedTime = new Date(
				`${scheduledDate}T${scheduledTime}`
			).toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
			});

			return `${formattedDate} at ${formattedTime} (${timeZone})`;
		} catch (e) {
			return 'Schedule pending';
		}
	};

	return (
		<div className='space-y-8 bg-gray-900 p-6 rounded-lg'>
			<div className='pb-4 border-b border-gray-700'>
				<h3 className='text-xl font-medium mb-2 text-gray-100 flex items-center'>
					<ClockIcon size={20} className='mr-2 text-blue-400' />
					Schedule Settings
				</h3>
				<p className='text-gray-400'>
					Define when your message should be delivered
				</p>
			</div>

			<div>
				<h4 className='text-gray-200 font-medium mb-4'>
					When should this message be sent?
				</h4>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
					<div className='bg-gray-800 border border-gray-700 rounded-lg p-4'>
						<label className='block text-sm font-medium text-gray-300 mb-3 flex items-center'>
							<CalendarIcon size={16} className='mr-2 text-blue-400' />
							Date
						</label>
						<div className='relative'>
							<input
								type='date'
								value={scheduledDate}
								onChange={(e) => setScheduledDate(e.target.value)}
								className='w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-md p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
								min={formatDateForInput(new Date())}
							/>
							<CalendarIcon
								size={18}
								className='absolute left-3 top-2.5 text-gray-400'
							/>
						</div>
					</div>

					<div className='bg-gray-800 border border-gray-700 rounded-lg p-4'>
						<label className='block text-sm font-medium text-gray-300 mb-3 flex items-center'>
							<ClockIcon size={16} className='mr-2 text-blue-400' />
							Time
						</label>
						<div className='relative'>
							<input
								type='time'
								value={scheduledTime}
								onChange={(e) => setScheduledTime(e.target.value)}
								className='w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-md p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
							/>
							<ClockIcon
								size={18}
								className='absolute left-3 top-2.5 text-gray-400'
							/>
						</div>
					</div>
				</div>

				<div className='bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6'>
					<label className='block text-sm font-medium text-gray-300 mb-3 flex items-center'>
						<GlobeIcon size={16} className='mr-2 text-blue-400' />
						Time Zone
					</label>
					<div className='relative'>
						<select
							value={timeZone}
							onChange={(e) => setTimeZone(e.target.value)}
							className='w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-md p-2 pl-10 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
							style={{ backgroundPosition: 'right 0.5rem center' }}>
							{TIME_ZONE_OPTIONS.map((tz) => (
								<option key={tz} value={tz}>
									{tz}
								</option>
							))}
						</select>
						<GlobeIcon
							size={18}
							className='absolute left-3 top-2.5 text-gray-400'
						/>
					</div>
				</div>

				<div className='bg-blue-900/20 border border-blue-800/30 p-4 rounded-lg mb-6'>
					<div className='flex items-start'>
						<Info
							size={18}
							className='mr-3 text-blue-400 mt-0.5 flex-shrink-0'
						/>
						<div className='text-gray-300'>
							<p className='font-medium mb-1'>Scheduled for:</p>
							<p>{formatSchedule()}</p>
						</div>
					</div>
				</div>

				<div className='bg-gray-800 border border-gray-700 rounded-lg p-4'>
					<div className='flex items-center'>
						<input
							type='checkbox'
							id='businessHours'
							checked={sendOutsideBusinessHours}
							onChange={(e) => setSendOutsideBusinessHours(e.target.checked)}
							className='rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700 h-4 w-4'
						/>
						<label
							htmlFor='businessHours'
							className='ml-2 text-gray-300 flex items-center'>
							<AlarmCheck size={16} className='mr-2 text-blue-400' />
							Allow sending outside business hours (9am-5pm)
						</label>
					</div>

					{!sendOutsideBusinessHours && (
						<div className='mt-3 ml-6 text-sm text-gray-400'>
							Your message will only be sent during business hours (9am-5pm) in
							the selected time zone.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
