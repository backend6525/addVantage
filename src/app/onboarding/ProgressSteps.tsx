import { motion } from 'framer-motion';

interface ProgressStepsProps {
	currentStep: number;
	completedSteps: number[];
	steps: any[];
}

const ProgressSteps = ({
	currentStep,
	completedSteps,
	steps,
}: ProgressStepsProps) => {
	const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

	return (
		<div className='max-w-5xl mx-auto mb-12'>
			<div className='flex justify-between relative'>
				{steps.map((step, index) => {
					const StepIcon = step.icon;
					const isCompleted = completedSteps.includes(index + 1);
					const isCurrent = currentStep === index + 1;

					return (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className='flex flex-col items-center relative z-10'>
							<motion.div
								whileHover={{ scale: 1.1 }}
								className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
									isCompleted
										? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
										: isCurrent
											? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white ring-4 ring-purple-400/30 shadow-lg shadow-purple-400/50'
											: 'bg-gray-800 text-gray-400 border-2 border-gray-600'
								}`}>
								{isCompleted ? (
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: 'spring', duration: 0.5 }}>
										<step.celebrationIcon className='w-7 h-7' />
									</motion.div>
								) : (
									<StepIcon className='w-7 h-7' />
								)}
							</motion.div>
							<div className='mt-3 text-center'>
								<div
									className={`text-sm font-semibold transition-colors ${
										isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
									}`}>
									{step.title}
								</div>
								<div className='text-xs text-gray-500 mt-1 max-w-20'>
									Step {index + 1}
								</div>
							</div>
						</motion.div>
					);
				})}

				<div className='absolute top-7 left-0 right-0 h-[3px] bg-gray-800 rounded-full -z-10'>
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${progressPercentage}%` }}
						transition={{ duration: 0.8, ease: 'easeInOut' }}
						className='h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative overflow-hidden'>
						<motion.div
							animate={{ x: ['-100%', '100%'] }}
							transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
							className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent'
						/>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ProgressSteps;
