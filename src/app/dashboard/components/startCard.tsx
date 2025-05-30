// components/StatsCard.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
	icon: React.ComponentType;
	label: string;
	value: string | number;
	trend?: number;
}

export const StatsCard = ({
	icon: Icon,
	label,
	value,
	trend,
}: StatsCardProps) => (
	<motion.div
		whileHover={{ y: -5 }}
		className='bg-gradient-to-br from-white/10 to-transparent p-6 rounded-xl border border-white/10'>
		{/* ... existing StatsCard content ... */}
	</motion.div>
);
