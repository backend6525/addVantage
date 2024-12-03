// import React from 'react';
// import { FileImage, FileVideo, FileAudio } from 'lucide-react';

// const comparisonData = {
// 	imageSrc: 'https://via.placeholder.com/60',
// 	title: 'Get Detailed Comparison Insights',
// 	description: "It's now possible to advertise on a daily charge of 1000 UGX.",
// 	buttonText: 'Create Ad',
// };

// const ComparisonCard = () => {
// 	return (
// 		<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 '>
// 			<div className='flex items-center p-2 space-x-6'>
// 				{/* Icon */}
// 				<img
// 					src={comparisonData.imageSrc}
// 					alt='Comparison Icon'
// 					className='w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-600 object-cover'
// 				/>

// 				{/* Content */}
// 				<div className='flex-grow'>
// 					<h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 mb-1'>
// 						{comparisonData.title}
// 					</h2>
// 					<p className='text-sm text-gray-600 dark:text-gray-400'>
// 						{comparisonData.description}
// 					</p>
// 				</div>

// 				{/* Media Type Buttons */}
// 				<div className='flex items-center space-x-4'>
// 					<div className='flex items-center space-x-2'>
// 						<button
// 							className='p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors'
// 							aria-label='Image File Ad'>
// 							<FileImage size={20} />
// 						</button>
// 						<button
// 							className='p-2 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition-colors'
// 							aria-label='Video File Ad'>
// 							<FileVideo size={20} />
// 						</button>
// 						<button
// 							className='p-2 rounded-md bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors'
// 							aria-label='Audio File Ad'>
// 							<FileAudio size={20} />
// 						</button>
// 					</div>

// 					{/* Create Ad Button */}
// 					<button className='ml-6 flex items-center px-4 py-2 bg-black text-white text-sm font-semibold rounded-md shadow-md hover:bg-gray-800 transition-colors group'>
// 						<svg
// 							xmlns='http://www.w3.org/2000/svg'
// 							className='h-5 w-5 mr-2 group-hover:rotate-90 transition-transform'
// 							fill='none'
// 							viewBox='0 0 24 24'
// 							stroke='currentColor'>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth={2}
// 								d='M12 4v16m8-8H4'
// 							/>
// 						</svg>
// 						{comparisonData.buttonText}
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ComparisonCard;

// import React from 'react';
// import { FileImage, FileVideo, FileAudio } from 'lucide-react';

// const comparisonData = {
// 	imageSrc: 'https://via.placeholder.com/60',
// 	title: 'Get Detailed Comparison Insights',
// 	description: "It's now possible to advertise on a daily charge of 1000 UGX.",
// 	buttonText: 'Create Ad',
// };

// const ComparisonCard = () => {
// 	return (
// 		<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105 hover:shadow-xl'>
// 			<div className='flex items-center p-2 space-x-6'>
// 				{/* Icon */}
// 				<img
// 					src={comparisonData.imageSrc}
// 					alt='Comparison Icon'
// 					className='w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover'
// 				/>

// 				{/* Content */}
// 				<div className='flex-grow'>
// 					<h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 mb-1'>
// 						{comparisonData.title}
// 					</h2>
// 					<p className='text-sm text-gray-600 dark:text-gray-400'>
// 						{comparisonData.description}
// 					</p>
// 				</div>

// 				{/* Media Type Buttons */}
// 				<div className='flex items-center space-x-3'>
// 					{/* Individual Media Type Buttons */}
// 					<button
// 						className='p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 focus:ring-2 focus:ring-blue-300 transition-all'
// 						aria-label='Image File Ad'>
// 						<FileImage size={24} />
// 					</button>
// 					<button
// 						className='p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 focus:ring-2 focus:ring-green-300 transition-all'
// 						aria-label='Video File Ad'>
// 						<FileVideo size={24} />
// 					</button>
// 					<button
// 						className='p-2 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 focus:ring-2 focus:ring-purple-300 transition-all'
// 						aria-label='Audio File Ad'>
// 						<FileAudio size={24} />
// 					</button>
// 				</div>
// 			</div>

// 			{/* Create Ad Button */}
// 			<div className='flex justify-end px-4 pb-4'>
// 				<button className='flex items-center px-4 py-2 bg-black text-white text-sm font-semibold rounded-md shadow-md hover:bg-gray-800 transition-all group'>
// 					<svg
// 						xmlns='http://www.w3.org/2000/svg'
// 						className='h-5 w-5 mr-2 group-hover:rotate-90 transition-transform'
// 						fill='none'
// 						viewBox='0 0 24 24'
// 						stroke='currentColor'>
// 						<path
// 							strokeLinecap='round'
// 							strokeLinejoin='round'
// 							strokeWidth={2}
// 							d='M12 4v16m8-8H4'
// 						/>
// 					</svg>
// 					{comparisonData.buttonText}
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default ComparisonCard;

import React from 'react';
import { FileImage, FileVideo, FileAudio } from 'lucide-react';

const comparisonData = {
	imageSrc: 'https://via.placeholder.com/60',
	title: 'Get Detailed Comparison Insights',
	description: "It's now possible to advertise on a daily charge of 1000 UGX.",
	buttonText: 'Create Ad',
};

const ComparisonCard = () => {
	return (
		<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 flex items-center space-x-6'>
			{/* Icon */}
			<img
				src={comparisonData.imageSrc}
				alt='Comparison Icon'
				className='w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover'
			/>

			{/* Content */}
			<div className='flex-grow'>
				<h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
					{comparisonData.title}
				</h2>
				<p className='text-sm text-gray-600 dark:text-gray-400'>
					{comparisonData.description}
				</p>
			</div>

			{/* Media Type Buttons */}
			<div className='flex space-x-3'>
				<button
					className='p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 focus:ring-2 focus:ring-blue-300 transition-all'
					aria-label='Image File Ad'>
					<FileImage size={20} />
				</button>
				<button
					className='p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 focus:ring-2 focus:ring-green-300 transition-all'
					aria-label='Video File Ad'>
					<FileVideo size={20} />
				</button>
				<button
					className='p-2 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 focus:ring-2 focus:ring-purple-300 transition-all'
					aria-label='Audio File Ad'>
					<FileAudio size={20} />
				</button>
			</div>

			{/* Create Ad Button */}
			<div>
				<button className='flex items-center px-4 py-2 bg-black text-white text-sm font-semibold rounded-md shadow-md hover:bg-gray-800 transition-all group'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5 mr-2 group-hover:rotate-90 transition-transform'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 4v16m8-8H4'
						/>
					</svg>
					{comparisonData.buttonText}
				</button>
			</div>
		</div>
	);
};

export default ComparisonCard;
