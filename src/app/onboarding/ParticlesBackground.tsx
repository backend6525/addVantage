import { motion } from 'framer-motion';

const ParticlesBackground = () => {
	return (
		<div className='fixed inset-0 pointer-events-none overflow-hidden'>
			{[...Array(20)].map((_, i) => (
				<motion.div
					key={i}
					animate={{
						y: [0, -100, 0],
						opacity: [0, 1, 0],
						scale: [0, 1, 0],
					}}
					transition={{
						duration: 8 + Math.random() * 4,
						repeat: Infinity,
						delay: Math.random() * 5,
						ease: 'easeInOut',
					}}
					className='absolute w-2 h-2 bg-purple-500/20 rounded-full'
					style={{
						left: `${Math.random() * 100}%`,
						bottom: 0,
					}}
				/>
			))}
		</div>
	);
};

export default ParticlesBackground;
