import { motion } from 'framer-motion';
import { ChevronRight, Rocket, ArrowLeft } from 'lucide-react';

interface OnboardingNavigationProps {
	currentStep: number;
	steps: any[];
	userType: 'influencer' | 'business' | null;
	isLoading: boolean;
	onNext: () => void;
	onPrev: () => void;
	onComplete: () => void;
}

const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
	currentStep,
	steps,
	userType,
	isLoading,
	onNext,
	onPrev,
	onComplete,
}) => {
	return (
		<div className='flex justify-between items-center pt-6 border-t border-gray-700/50'>
			<motion.button
				whileHover={{ scale: 1.05, x: -5 }}
				whileTap={{ scale: 0.95 }}
				onClick={onPrev}
				className={`flex items-center gap-3 px-6 py-3 rounded-xl ${
					currentStep > 1 ? 'bg-gray-700/70' : 'opacity-0 pointer-events-none'
				}`}>
				<ArrowLeft className='w-5 h-5' />
				<span className='font-medium'>Back</span>
			</motion.button>

			<div className='flex items-center gap-3'>
				{currentStep === steps.length ? (
					<motion.button
						whileHover={{ scale: 1.05, x: 5 }}
						whileTap={{ scale: 0.95 }}
						onClick={onComplete}
						disabled={isLoading}
						className='flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600'>
						{isLoading ? (
							'Launching...'
						) : (
							<>
								<span>Launch Dashboard</span>
								<Rocket className='w-5 h-5' />
							</>
						)}
					</motion.button>
				) : (
					<motion.button
						whileHover={{ scale: 1.05, x: 5 }}
						whileTap={{ scale: 0.95 }}
						onClick={onNext}
						disabled={currentStep === 1 && !userType}
						className={`flex items-center gap-3 px-6 py-3 rounded-xl ${
							currentStep === 1 && !userType
								? 'bg-gray-700/50 cursor-not-allowed'
								: 'bg-purple-600'
						}`}>
						<span>Continue</span>
						<ChevronRight className='w-5 h-5' />
					</motion.button>
				)}
			</div>
		</div>
	);
};

export default OnboardingNavigation;
