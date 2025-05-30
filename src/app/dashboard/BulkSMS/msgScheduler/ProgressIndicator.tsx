// import React from 'react';

// interface ProgressIndicatorProps {
// 	currentStep: number;
// 	totalSteps: number;
// }

// export default function ProgressIndicator({
// 	currentStep,
// }: ProgressIndicatorProps) {
// 	return (
// 		<div className='flex justify-between px-8 pt-4'>
// 			<div
// 				className={`flex flex-col items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
// 				<div
// 					className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-200'} flex items-center justify-center text-white`}>
// 					1
// 				</div>
// 				<span className='text-sm mt-1'>When</span>
// 			</div>
// 			<div className='flex-1 flex items-center'>
// 				<div
// 					className={`h-1 w-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
// 			</div>
// 			<div
// 				className={`flex flex-col items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
// 				<div
// 					className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'} flex items-center justify-center text-white`}>
// 					2
// 				</div>
// 				<span className='text-sm mt-1'>Recurrence</span>
// 			</div>
// 			<div className='flex-1 flex items-center'>
// 				<div
// 					className={`h-1 w-full ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
// 			</div>
// 			<div
// 				className={`flex flex-col items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
// 				<div
// 					className={`w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'} flex items-center justify-center text-white`}>
// 					3
// 				</div>
// 				<span className='text-sm mt-1'>Audience</span>
// 			</div>
// 		</div>
// 	);
// }

import React from 'react';

interface ProgressIndicatorProps {
	currentStep: number;
	totalSteps: number;
	steps?: Array<{
		label: string;
		description?: string;
	}>;
	activeColor?: string;
	onClick?: (stepIndex: number) => void;
}

export default function ProgressIndicator({
	currentStep,
	totalSteps,
	steps = [{ label: 'When' }, { label: 'Recurrence' }, { label: 'Audience' }],
	activeColor = 'blue',
	onClick,
}: ProgressIndicatorProps) {
	// Ensure steps array matches totalSteps if provided
	const stepsArray =
		steps?.length === totalSteps
			? steps
			: Array(totalSteps)
					.fill(0)
					.map((_, i) => steps[i] || { label: `Step ${i + 1}` });

	return (
		<div className='w-full py-6 bg-gray-900 rounded-lg px-6'>
			<div className='flex items-center justify-between'>
				{stepsArray.map((step, index) => (
					<div key={index} className='flex flex-col items-center'>
						<div className='flex-1 flex items-center'>
							{/* Line before first step is hidden */}
							{index > 0 && (
								<div
									className={`h-1 w-16 rounded
                  ${currentStep > index ? `bg-${activeColor}-600` : 'bg-gray-700'}
                `}></div>
							)}

							{/* Step indicator */}
							<button
								onClick={() => onClick && onClick(index + 1)}
								disabled={!onClick}
								className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-200 ease-in-out z-10
                  ${
										currentStep >= index + 1
											? `bg-${activeColor}-600 text-gray-100 hover:bg-${activeColor}-500`
											: 'bg-gray-700 text-gray-400'
									}
                  ${onClick ? 'cursor-pointer focus:ring-2 focus:ring-${activeColor}-400 focus:ring-offset-1 focus:ring-offset-gray-900' : ''}
                `}
								aria-current={currentStep === index + 1 ? 'step' : undefined}
								aria-label={`Step ${index + 1}: ${step.label}`}>
								{index + 1}
							</button>

							{/* Line after last step is hidden */}
							{index < stepsArray.length - 1 && (
								<div
									className={`h-1 w-16 rounded
                  ${currentStep > index + 1 ? `bg-${activeColor}-600` : 'bg-gray-700'}
                `}></div>
							)}
						</div>

						{/* Label positioned below */}
						<div className='mt-3 text-center'>
							<span
								className={`
                text-sm font-medium block
                ${currentStep >= index + 1 ? `text-${activeColor}-400` : 'text-gray-500'}
              `}>
								{step.label}
							</span>

							{/* Optional description */}
							{step.description && (
								<p
									className={`
                  text-xs mt-1
                  ${currentStep >= index + 1 ? `text-${activeColor}-300` : 'text-gray-600'}
                `}>
									{step.description}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
