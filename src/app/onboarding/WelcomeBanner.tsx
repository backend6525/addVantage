import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

const WelcomeBanner = () => {
	return (
		<div className='text-center mb-12'>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='flex items-center justify-center gap-3 mb-4'>
				<motion.div
					animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
					transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
					<Rocket className='w-8 h-8 text-purple-400' />
				</motion.div>
				<h1 className='text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-400 to-pink-400'>
					Welcome to AdzPay
				</h1>
				<motion.div
					animate={{ rotate: [0, -360], scale: [1, 1.2, 1] }}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 1.5,
					}}>
					<Sparkles className='w-8 h-8 text-pink-400' />
				</motion.div>
			</motion.div>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className='text-gray-400 max-w-2xl mx-auto text-lg'>
				Let&apos;s create your perfect setup in just a few steps. Your journey
				to success starts here! ✨
			</motion.p>
		</div>
	);
};

export default WelcomeBanner;
