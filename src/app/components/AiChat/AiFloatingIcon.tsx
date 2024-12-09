'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface AIFloatingIconProps {
	onClick: () => void;
}

export const AIFloatingIcon: React.FC<AIFloatingIconProps> = ({ onClick }) => {
	return (
		<motion.div
			className='fixed bottom-6 right-6 z-50'
			initial={{ scale: 0.8, opacity: 0.7 }}
			animate={{
				scale: [0.8, 1.1, 1],
				opacity: [0.7, 1],
				transition: {
					duration: 1,
					repeat: Infinity,
					repeatType: 'reverse',
				},
			}}
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9 }}
			onClick={onClick}>
			<div className='bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl cursor-pointer'>
				<MessageCircle color='white' size={32} />
			</div>
		</motion.div>
	);
};
