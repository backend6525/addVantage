// import React from "react";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

function KeyMetrics() {
	const metricsData = [
		{
			icon: <Activity className='w-6 h-6 text-blue-400' />,
			title: 'Trades',
			value: '140',
			change: '+5%',
			changeType: 'positive',
			period: '/ 24h',
		},
		{
			icon: <TrendingUp className='w-6 h-6 text-green-400' />,
			title: 'Revenue',
			value: '$1,790.00',
			change: '+4.29%',
			changeType: 'positive',
		},
		{
			icon: <TrendingDown className='w-6 h-6 text-red-400' />,
			title: 'Marginal Profit',
			value: '$1,000.95',
			change: '-2.85%',
			changeType: 'negative',
		},
	];

	return (
		<div className='grid grid-cols-3 gap-4'>
			{metricsData.map((metric, index) => (
				<motion.div
					key={metric.title}
					className='bg-gray-800 text-white p-4 rounded-lg relative overflow-hidden group'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
						delay: index * 0.2,
					}}
					whileHover={{ scale: 1.05 }}>
					{/* Background Accent */}
					<motion.div
						className='absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300'
						style={{
							backgroundImage:
								metric.changeType === 'positive'
									? 'from-green-500 to-green-700'
									: 'from-red-500 to-red-700',
						}}
					/>

					{/* Icon */}
					<div className='absolute top-2 right-2 text-white/20'>
						{metric.icon}
					</div>

					{/* Content */}
					<div className='relative z-10'>
						<h3 className='text-sm text-white/60 mb-1 uppercase tracking-wider'>
							{metric.title}
						</h3>
						<p className='text-2xl font-semibold flex items-center'>
							{metric.value}
							<span className='ml-2'>
								{metric.changeType === 'positive' ? '↑' : '↓'}
							</span>
						</p>
						<p
							className={`text-sm ${
								metric.changeType === 'positive'
									? 'text-green-400'
									: 'text-red-400'
							}`}>
							{metric.change} {metric.period || ''}
						</p>
					</div>
				</motion.div>
			))}
		</div>
	);
}

export default KeyMetrics;
