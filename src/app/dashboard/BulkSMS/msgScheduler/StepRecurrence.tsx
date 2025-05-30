// import React from 'react';
// import { RepeatIcon, BellIcon } from 'lucide-react';
// import { RecurrenceType } from './types/schedulerTypes';
// import { formatDateForInput } from './utils/SchedulerUtils';

// interface StepRecurrenceProps {
// 	recurrence: RecurrenceType;
// 	customInterval: number;
// 	customUnit: 'day' | 'week' | 'month';
// 	setCustomUnit: (unit: 'day' | 'week' | 'month') => void;
// 	setCustomInterval: (interval: number) => void;
// 	endAfterOccurrences: number;
// 	endDate: string;
// 	onRecurrenceChange: (value: RecurrenceType) => void;
// 	onCustomIntervalChange: (value: number) => void;
// 	onCustomUnitChange: (value: 'day' | 'week' | 'month') => void;
// 	onEndAfterOccurrencesChange: (value: number | null) => void;
// 	onEndDateChange: (value: string) => void;
// 	setEndAfterOccurrences: (value: number | null) => void;
// 	setEndDate: (date: string) => void;
// 	enableNotifications: boolean;
// 	setEnableNotifications: (value: boolean) => void;
// 	scheduledDate: string;
// }

// export default function StepRecurrence({
// 	recurrence,
// 	onRecurrenceChange,
// 	customInterval,
// 	setCustomInterval,
// 	customUnit,
// 	setCustomUnit,
// 	endAfterOccurrences,
// 	setEndAfterOccurrences,
// 	endDate,
// 	setEndDate,
// 	enableNotifications,
// 	setEnableNotifications,
// 	scheduledDate,
// }: StepRecurrenceProps) {
// 	return (
// 		<div className='space-y-6'>
// 			<div>
// 				<h3 className='text-lg font-medium mb-4'>
// 					How often should this message repeat?
// 				</h3>

// 				<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
// 					{(['once', 'daily', 'weekly', 'monthly'] as RecurrenceType[]).map(
// 						(type) => (
// 							<button
// 								key={type}
// 								onClick={() => onRecurrenceChange(type)}
// 								className={`border rounded-md p-3 text-center capitalize ${
// 									recurrence === type
// 										? 'border-blue-500 bg-blue-50 text-blue-700'
// 										: 'border-gray-300'
// 								}`}>
// 								<div className='flex justify-center mb-1'>
// 									<RepeatIcon size={18} />
// 								</div>
// 								{type}
// 							</button>
// 						)
// 					)}
// 					<button
// 						onClick={() => onRecurrenceChange('custom')}
// 						className={`border rounded-md p-3 text-center ${
// 							recurrence === 'custom'
// 								? 'border-blue-500 bg-blue-50 text-blue-700'
// 								: 'border-gray-300'
// 						}`}>
// 						<div className='flex justify-center mb-1'>
// 							<RepeatIcon size={18} />
// 						</div>
// 						Custom
// 					</button>
// 				</div>
// 			</div>

// 			{recurrence === 'custom' && (
// 				<div className='space-y-4 p-4 border border-gray-200 rounded-md bg-gray-50'>
// 					<div className='flex items-center gap-2'>
// 						<span>Repeat every</span>
// 						<input
// 							type='number'
// 							min='1'
// 							value={customInterval}
// 							onChange={(e) => setCustomInterval(parseInt(e.target.value) || 1)}
// 							className='w-16 border border-gray-300 rounded-md p-1 text-center'
// 						/>
// 						<select
// 							value={customUnit}
// 							onChange={(e) =>
// 								setCustomUnit(e.target.value as 'day' | 'week' | 'month')
// 							}
// 							className='border border-gray-300 rounded-md p-1'>
// 							<option value='day'>day(s)</option>
// 							<option value='week'>week(s)</option>
// 							<option value='month'>month(s)</option>
// 						</select>
// 					</div>

// 					<div>
// 						<div className='mb-2'>Ends</div>
// 						<div className='space-y-3'>
// 							<div className='flex items-center gap-2'>
// 								<input
// 									type='radio'
// 									id='endAfter'
// 									name='endType'
// 									checked={endAfterOccurrences !== null && !endDate}
// 									onChange={() => {
// 										setEndAfterOccurrences(10);
// 										setEndDate('');
// 									}}
// 								/>
// 								<label htmlFor='endAfter' className='flex items-center gap-2'>
// 									<span>After</span>
// 									<input
// 										type='number'
// 										min='1'
// 										value={endAfterOccurrences || 1}
// 										onChange={(e) =>
// 											setEndAfterOccurrences(parseInt(e.target.value) || 1)
// 										}
// 										disabled={endAfterOccurrences === null}
// 										className='w-16 border border-gray-300 rounded-md p-1 text-center'
// 									/>
// 									<span>occurrences</span>
// 								</label>
// 							</div>

// 							<div className='flex items-center gap-2'>
// 								<input
// 									type='radio'
// 									id='endDate'
// 									name='endType'
// 									checked={!!endDate && endAfterOccurrences === null}
// 									onChange={() => {
// 										setEndAfterOccurrences(null);
// 										// Set default end date to 30 days from now
// 										const thirtyDaysLater = new Date();
// 										thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
// 										setEndDate(formatDateForInput(thirtyDaysLater));
// 									}}
// 								/>
// 								<label htmlFor='endDate' className='flex items-center gap-2'>
// 									<span>On</span>
// 									<input
// 										type='date'
// 										value={endDate}
// 										onChange={(e) => setEndDate(e.target.value)}
// 										disabled={!endDate}
// 										className='border border-gray-300 rounded-md p-1'
// 										min={scheduledDate}
// 									/>
// 								</label>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			)}

// 			<div className='flex items-center'>
// 				<input
// 					type='checkbox'
// 					id='notifications'
// 					checked={enableNotifications}
// 					onChange={(e) => setEnableNotifications(e.target.checked)}
// 					className='mr-2'
// 				/>
// 				<label
// 					htmlFor='notifications'
// 					className='text-sm text-gray-700 flex items-center'>
// 					<BellIcon size={16} className='mr-1' />
// 					Receive notifications when this message is sent
// 				</label>
// 			</div>
// 		</div>
// 	);
// }

import React from 'react';
import { RepeatIcon, BellIcon, CalendarIcon, Clock, Info } from 'lucide-react';
import { RecurrenceType } from './types/schedulerTypes';
import { formatDateForInput } from './utils/SchedulerUtils';

interface StepRecurrenceProps {
	recurrence: RecurrenceType;
	customInterval: number;
	customUnit: 'day' | 'week' | 'month';
	setCustomUnit: (unit: 'day' | 'week' | 'month') => void;
	setCustomInterval: (interval: number) => void;
	endAfterOccurrences: number;
	endDate: string;
	onRecurrenceChange: (value: RecurrenceType) => void;
	onCustomIntervalChange: (value: number) => void;
	onCustomUnitChange: (value: 'day' | 'week' | 'month') => void;
	onEndAfterOccurrencesChange: (value: number | null) => void;
	onEndDateChange: (value: string) => void;
	setEndAfterOccurrences: (value: number | null) => void;
	setEndDate: (date: string) => void;
	enableNotifications: boolean;
	setEnableNotifications: (value: boolean) => void;
	scheduledDate: string;
}

export default function StepRecurrence({
	recurrence,
	onRecurrenceChange,
	customInterval,
	setCustomInterval,
	customUnit,
	setCustomUnit,
	endAfterOccurrences,
	setEndAfterOccurrences,
	endDate,
	setEndDate,
	enableNotifications,
	setEnableNotifications,
	scheduledDate,
}: StepRecurrenceProps) {
	return (
		<div className='space-y-8 bg-gray-900 p-6 rounded-lg'>
			<div className='pb-4 border-b border-gray-700'>
				<h3 className='text-xl font-medium mb-2 text-gray-100 flex items-center'>
					<RepeatIcon size={20} className='mr-2 text-blue-400' />
					Recurring Schedule
				</h3>
				<p className='text-gray-400'>
					Define how often this message should repeat
				</p>
			</div>

			<div>
				<h4 className='text-gray-200 font-medium mb-4'>
					How often should this message repeat?
				</h4>

				<div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
					{(
						['once', 'daily', 'weekly', 'monthly', 'custom'] as RecurrenceType[]
					).map((type) => (
						<div
							key={type}
							onClick={() => onRecurrenceChange(type)}
							className={`rounded-lg transition-all duration-200 cursor-pointer border ${
								recurrence === type
									? 'bg-blue-800/30 border-2 border-blue-600 shadow-lg shadow-blue-900/20'
									: 'bg-gray-800 border-gray-700 hover:border-gray-600'
							}`}>
							<div className='p-4 flex flex-col items-center'>
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
										recurrence === type ? 'bg-blue-600' : 'bg-gray-700'
									}`}>
									<RepeatIcon
										size={16}
										className={
											recurrence === type ? 'text-white' : 'text-gray-400'
										}
									/>
								</div>
								<span className='text-gray-100 capitalize'>{type}</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{recurrence === 'custom' && (
				<div className='pt-6 border-t border-gray-700 animate-fadeIn'>
					<h4 className='text-gray-200 font-medium mb-4 flex items-center'>
						<Clock size={18} className='mr-2 text-blue-400' />
						Custom Frequency
					</h4>

					<div className='bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-6'>
						<div className='flex items-center gap-3'>
							<span className='text-gray-300'>Repeat every</span>
							<div className='flex items-center bg-gray-700 rounded-md px-3 py-2'>
								<input
									type='number'
									min='1'
									value={customInterval}
									onChange={(e) =>
										setCustomInterval(parseInt(e.target.value) || 1)
									}
									className='w-12 bg-gray-700 text-gray-200 border-none focus:outline-none focus:ring-0 p-0 text-center'
								/>
							</div>
							<div className='flex items-center bg-gray-700 rounded-md pl-3 pr-1'>
								<select
									value={customUnit}
									onChange={(e) =>
										setCustomUnit(e.target.value as 'day' | 'week' | 'month')
									}
									className='bg-gray-700 text-gray-200 py-2 pl-1 pr-8 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500'
									style={{ backgroundPosition: 'right 0.5rem center' }}>
									<option value='day'>day(s)</option>
									<option value='week'>week(s)</option>
									<option value='month'>month(s)</option>
								</select>
							</div>
						</div>

						<div className='space-y-4'>
							<h5 className='text-gray-300 font-medium'>Ends</h5>

							<div className='space-y-4'>
								<div
									className={`rounded-lg transition-all duration-200 cursor-pointer p-4 ${
										endAfterOccurrences !== null && !endDate
											? 'bg-blue-800/20 border border-blue-700'
											: 'bg-gray-800 border border-gray-700 hover:border-gray-600'
									}`}
									onClick={() => {
										setEndAfterOccurrences(10);
										setEndDate('');
									}}>
									<div className='flex items-center'>
										<div
											className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
												endAfterOccurrences !== null && !endDate
													? 'border-blue-500 bg-blue-500'
													: 'border-gray-500'
											}`}>
											{endAfterOccurrences !== null && !endDate && (
												<div className='w-2 h-2 rounded-full bg-white'></div>
											)}
										</div>

										<span className='text-gray-200 mr-3'>After</span>

										<div className='flex items-center bg-gray-700 rounded-md px-3 py-2'>
											<input
												type='number'
												min='1'
												value={endAfterOccurrences || 1}
												onChange={(e) =>
													setEndAfterOccurrences(parseInt(e.target.value) || 1)
												}
												disabled={endAfterOccurrences === null}
												className='w-12 bg-gray-700 text-gray-200 border-none focus:outline-none focus:ring-0 p-0 text-center'
											/>
										</div>

										<span className='text-gray-200 ml-3'>occurrences</span>
									</div>
								</div>

								<div
									className={`rounded-lg transition-all duration-200 cursor-pointer p-4 ${
										!!endDate && endAfterOccurrences === null
											? 'bg-blue-800/20 border border-blue-700'
											: 'bg-gray-800 border border-gray-700 hover:border-gray-600'
									}`}
									onClick={() => {
										setEndAfterOccurrences(null);
										// Set default end date to 30 days from now
										const thirtyDaysLater = new Date();
										thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
										setEndDate(formatDateForInput(thirtyDaysLater));
									}}>
									<div className='flex items-center'>
										<div
											className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
												!!endDate && endAfterOccurrences === null
													? 'border-blue-500 bg-blue-500'
													: 'border-gray-500'
											}`}>
											{!!endDate && endAfterOccurrences === null && (
												<div className='w-2 h-2 rounded-full bg-white'></div>
											)}
										</div>

										<span className='text-gray-200 mr-3'>On</span>

										<div className='flex items-center bg-gray-700 rounded-md pl-3 pr-1'>
											<CalendarIcon size={16} className='text-gray-400 mr-2' />
											<input
												type='date'
												value={endDate}
												onChange={(e) => setEndDate(e.target.value)}
												disabled={!endDate}
												className='bg-gray-700 text-gray-200 py-2 pl-1 pr-1 rounded-md border-0 focus:outline-none focus:ring-1 focus:ring-blue-500'
												min={scheduledDate}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='flex items-start text-sm bg-blue-900/20 border border-blue-800/30 p-3 rounded-md text-gray-300'>
							<Info
								size={16}
								className='mr-2 text-blue-400 mt-0.5 flex-shrink-0'
							/>
							<div>
								Your message will repeat {customInterval} {customUnit}(s){' '}
								{endAfterOccurrences !== null && !endDate
									? `for ${endAfterOccurrences} occurrences`
									: endDate
										? `until ${new Date(endDate).toLocaleDateString()}`
										: ''}
								.
							</div>
						</div>
					</div>
				</div>
			)}

			<div className='pt-3'>
				<div className='flex items-center bg-gray-800 rounded-lg p-3 border border-gray-700'>
					<input
						type='checkbox'
						id='notifications'
						checked={enableNotifications}
						onChange={(e) => setEnableNotifications(e.target.checked)}
						className='rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700 h-4 w-4'
					/>
					<label
						htmlFor='notifications'
						className='ml-2 text-gray-300 flex items-center'>
						<BellIcon size={16} className='mr-2 text-blue-400' />
						Receive notifications when this message is sent
					</label>
				</div>
			</div>
		</div>
	);
}
