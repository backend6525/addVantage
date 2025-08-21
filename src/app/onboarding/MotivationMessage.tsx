import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface MotivationMessageProps {
	currentStep: number;
}

const MotivationMessage = ({ currentStep }: MotivationMessageProps) => {
	const messages = {
		2: 'Looking good! Keep going! 🚀',
		3: 'Great choices! Almost there! ⭐',
		4: "Perfect! You're doing amazing! �",
		5: 'Ready to launch! This is exciting! 🎊',
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className='fixed bottom-6 right-6 bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl shadow-lg border border-white/10'>
			<div className='flex items-center gap-2'>
				<motion.div
					animate={{ scale: [1, 1.2, 1] }}
					transition={{ duration: 2, repeat: Infinity }}>
					<Heart className='w-4 h-4 text-pink-300' />
				</motion.div>
				<span className='text-sm font-medium'>
					{messages[currentStep as keyof typeof messages]}
				</span>
			</div>
		</motion.div>
	);
};

export default MotivationMessage;
