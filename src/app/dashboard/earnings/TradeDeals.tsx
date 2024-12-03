// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import {
// 	Chart,
// 	CategoryScale,
// 	LinearScale,
// 	PointElement,
// 	LineElement,
// 	Title,
// 	Tooltip,
// 	Legend,
// } from 'chart.js';

// Chart.register(
// 	CategoryScale,
// 	LinearScale,
// 	PointElement,
// 	LineElement,
// 	Title,
// 	Tooltip,
// 	Legend
// );

// const TradeDeals = () => {
// 	const data = {
// 		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
// 		datasets: [
// 			{
// 				label: 'Trade Performance',
// 				data: [5, 15, 9, 20, 18, 25],
// 				fill: false,
// 				backgroundColor: 'rgba(75,192,192,0.2)',
// 				borderColor: 'rgba(75,192,192,1)',
// 			},
// 		],
// 	};

// 	const options = {
// 		maintainAspectRatio: false,
// 		responsive: true,
// 	};

// 	return (
// 		<div className='bg-gray-800 text-white p-4 rounded-lg'>
// 			<h3 className='mb-2'>Trade deals</h3>
// 			<div style={{ height: '200px' }}>
// 				<Line data={data} options={options} />
// 			</div>
// 			<div className='flex mt-4 space-x-2'>
// 				<button className='bg-red-500 p-2 rounded'>Close position</button>
// 				<button className='bg-yellow-500 p-2 rounded'>Adjust leverage</button>
// 				<button className='bg-green-500 p-2 rounded'>Stop profit</button>
// 			</div>
// 		</div>
// 	);
// };

// export default TradeDeals;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
	Chart,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { XCircle, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const TradeDeals = () => {
	const [activeTab, setActiveTab] = useState('performance');

	const performanceData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		datasets: [
			{
				label: 'Trade Performance',
				data: [5, 15, 9, 20, 18, 25],
				fill: false,
				backgroundColor: 'rgba(34, 197, 94, 0.2)',
				borderColor: 'rgba(34, 197, 94, 1)',
				tension: 0.4,
			},
		],
	};

	const options = {
		maintainAspectRatio: false,
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				backgroundColor: 'rgba(0,0,0,0.7)',
				titleColor: 'white',
				bodyColor: 'rgba(255,255,255,0.8)',
			},
		},
		scales: {
			x: {
				grid: {
					color: 'rgba(255,255,255,0.1)',
				},
				ticks: {
					color: 'rgba(255,255,255,0.6)',
				},
			},
			y: {
				grid: {
					color: 'rgba(255,255,255,0.1)',
				},
				ticks: {
					color: 'rgba(255,255,255,0.6)',
				},
			},
		},
	};

	const actionButtons = [
		{
			icon: <XCircle className='w-5 h-5' />,
			label: 'Close Position',
			color: 'bg-red-500',
			hoverColor: 'hover:bg-red-600',
		},
		{
			icon: <BarChart2 className='w-5 h-5' />,
			label: 'Adjust Leverage',
			color: 'bg-yellow-500',
			hoverColor: 'hover:bg-yellow-600',
		},
		{
			icon: <TrendingUp className='w-5 h-5' />,
			label: 'Stop Profit',
			color: 'bg-green-500',
			hoverColor: 'hover:bg-green-600',
		},
	];

	const tabs = [
		{
			key: 'performance',
			label: 'Performance',
			icon: <TrendingUp className='w-5 h-5 mr-2' />,
		},
		{
			key: 'risk',
			label: 'Risk',
			icon: <AlertTriangle className='w-5 h-5 mr-2' />,
		},
	];

	return (
		<div className='bg-gray-800 text-white p-6 rounded-2xl space-y-4'>
			{/* Tabs */}
			<div className='flex space-x-4 mb-4'>
				{tabs.map((tab) => (
					<motion.button
						key={tab.key}
						className={`
							flex items-center px-4 py-2 rounded-lg transition-all
							${
								activeTab === tab.key
									? 'bg-green-500/20 text-green-300'
									: 'text-white/60 hover:bg-gray-700'
							}
						`}
						onClick={() => setActiveTab(tab.key)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}>
						{tab.icon}
						{tab.label}
					</motion.button>
				))}
			</div>

			{/* Chart */}
			<div className='h-48 w-full'>
				<Line data={performanceData} options={options} />
			</div>

			{/* Action Buttons */}
			<div className='grid grid-cols-3 gap-3'>
				{actionButtons.map((button) => (
					<motion.button
						key={button.label}
						className={`
							flex items-center justify-center space-x-2 p-3 rounded-lg
							${button.color} ${button.hoverColor}
							transition-all duration-300
						`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}>
						{button.icon}
						<span className='text-sm'>{button.label}</span>
					</motion.button>
				))}
			</div>
		</div>
	);
};

export default TradeDeals;
