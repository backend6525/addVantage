// import React from 'react';

// interface MessagePreviewProps {
// 	message: string;
// 	segmented: boolean;
// 	selectedSegments: {
// 		segmentId: string;
// 		name: string;
// 		count: number;
// 	}[];
// 	contacts: string[];
// 	totalRecipients: number;

// 	recipients: number;
// }

// export default function MessagePreview({
// 	message,
// 	segmented,
// 	selectedSegments,
// 	contacts,
// 	totalRecipients,
// }: MessagePreviewProps) {
// 	return (
// 		<div className='p-4 border-t border-b bg-gray-50'>
// 			<div className='text-sm text-gray-700 font-medium mb-1'>Preview:</div>
// 			<div className='bg-white p-3 border border-gray-200 rounded-md text-sm'>
// 				<div className='mb-1'>
// 					<span className='font-medium'>To:</span>{' '}
// 					{segmented
// 						? `${totalRecipients} recipients in ${selectedSegments.length} segments`
// 						: `${contacts.length} contacts`}
// 				</div>
// 				<div>
// 					<span className='font-medium'>Message:</span>{' '}
// 					{message.length > 100 ? message.substring(0, 100) + '...' : message}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import React from 'react';
import { Mail, Users, MessageSquare, Eye } from 'lucide-react';

interface MessagePreviewProps {
	message: string;
	segmented: boolean;
	selectedSegments: {
		segmentId: string;
		name: string;
		count: number;
	}[];
	contacts: string[];
	totalRecipients: number;
	recipients: number;
}

export default function MessagePreview({
	message,
	segmented,
	selectedSegments,
	contacts,
	totalRecipients,
}: MessagePreviewProps) {
	return (
		<div className='bg-gray-900 p-6 rounded-lg space-y-4'>
			<div className='pb-3 border-b border-gray-700 flex items-center justify-between'>
				<div className='flex items-center'>
					<Eye size={20} className='mr-2 text-blue-400' />
					<h3 className='text-xl font-medium text-gray-100'>Message Preview</h3>
				</div>
				<div className='bg-blue-600/20 text-blue-400 px-3 py-1 rounded-md text-sm font-medium'>
					{segmented ? selectedSegments.length : 1}{' '}
					{segmented ? 'segments' : 'segment'}
				</div>
			</div>

			<div className='bg-gray-800 border border-gray-700 rounded-lg overflow-hidden'>
				<div className='p-4 border-b border-gray-700 flex items-center bg-gray-800/70'>
					<Mail size={16} className='mr-2 text-blue-400' />
					<span className='text-gray-300 font-medium'>Message Details</span>
				</div>

				<div className='p-4 space-y-4'>
					<div className='flex'>
						<div className='w-24 text-gray-400 flex items-center'>
							<Users size={16} className='mr-2' />
							<span>To:</span>
						</div>
						<div className='text-gray-200 flex-1'>
							{segmented ? (
								<div className='flex items-center'>
									<span className='bg-blue-900/30 text-blue-300 px-2 py-1 rounded mr-2 text-sm'>
										{totalRecipients.toLocaleString()} recipients
									</span>
									<span className='text-gray-400 text-sm'>
										in {selectedSegments.length} segment
										{selectedSegments.length !== 1 ? 's' : ''}
									</span>
								</div>
							) : (
								<div className='flex items-center'>
									<span className='bg-blue-900/30 text-blue-300 px-2 py-1 rounded mr-2 text-sm'>
										{contacts.length.toLocaleString()} contacts
									</span>
								</div>
							)}
						</div>
					</div>

					<div className='flex'>
						<div className='w-24 text-gray-400 flex items-center'>
							<MessageSquare size={16} className='mr-2' />
							<span>Message:</span>
						</div>
						<div className='text-gray-200 flex-1'>
							<div className='bg-gray-700/50 p-3 rounded-md border border-gray-700'>
								{message.length > 100 ? (
									<>
										{message.substring(0, 100)}
										<span className='text-gray-400'>...</span>
										<div className='mt-2 flex justify-end'>
											<button className='text-blue-400 text-sm hover:text-blue-300 transition-colors'>
												Show full message
											</button>
										</div>
									</>
								) : (
									message
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{selectedSegments.length > 0 && segmented && (
				<div className='bg-gray-800 border border-gray-700 rounded-lg p-4'>
					<div className='flex items-center mb-3'>
						<Users size={16} className='mr-2 text-blue-400' />
						<span className='text-gray-300 font-medium'>Selected Segments</span>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
						{selectedSegments.map((segment) => (
							<div
								key={segment.segmentId}
								className='flex items-center justify-between bg-gray-700/50 p-2 rounded border border-gray-700'>
								<span className='text-gray-300'>{segment.name}</span>
								<span className='text-sm bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded'>
									{segment.count.toLocaleString()} contacts
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
