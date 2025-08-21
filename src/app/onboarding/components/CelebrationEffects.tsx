import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationEffectsProps {
	show: boolean;
}

const CelebrationEffects: React.FC<CelebrationEffectsProps> = ({ show }) => {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 pointer-events-none flex items-center justify-center'>
					{/* Celebration animation content */}
					{[...Array(12)].map((_, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 1, y: 0, x: 0, scale: 0 }}
							animate={{
								opacity: 0,
								y: -200 + Math.random() * 400,
								x: -200 + Math.random() * 400,
								scale: 1,
							}}
							transition={{ duration: 2, delay: i * 0.1 }}
							className='absolute w-3 h-3 rounded-full'
							style={{
								backgroundColor: ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981'][
									i % 4
								],
							}}
						/>
					))}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default CelebrationEffects;
