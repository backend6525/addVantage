'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TradeDeals from './TradeDeals';
import WithdrawFunds from './WithdrawFunds';
import BalanceDisplay from './Balance';
// import PortfolioItem from './EarningPortfolio';
import { TrendingUp, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import PaymentComponent from '@/app/components/paymentComponent';

// Simulated components (you'd replace these with actual implementations)
// function BalanceDisplay() {
// 	const [balance, setBalance] = useState(84597.45);

// 	return (
// 		<div className='space-y-4'>
// 			<div className='flex justify-between items-center'>
// 				<div className='flex items-center space-x-3'>
// 					<Wallet className='text-blue-400' />
// 					<h3 className='text-lg font-semibold text-gray-300'>Total Balance</h3>
// 				</div>
// 				<button className='text-gray-400 hover:text-white'>
// 					<RefreshCw className='w-5 h-5' />
// 				</button>
// 			</div>
// 			<div className='text-3xl font-bold text-white flex items-center space-x-2'>
// 				<span>${balance.toLocaleString()}</span>
// 				<span className='text-green-500 text-sm'>+2.5%</span>
// 			</div>
// 			<div className='text-sm text-gray-400'>Previous month: $82,345.12</div>
// 		</div>
// 	);
// }

function KeyMetrics() {
	const metrics = [
		{
			icon: <TrendingUp className='text-green-400' />,
			title: 'Total Profit',
			value: '$12,456.78',
			change: '+15.3%',
		},
		{
			icon: <CreditCard className='text-blue-400' />,
			title: 'Total Investments',
			value: '$67,890.22',
			change: '+8.7%',
		},
	];

	return (
		<div className='space-y-4'>
			<h3 className='text-lg font-semibold text-gray-300 flex items-center space-x-2'>
				<span>Key Metrics</span>
			</h3>
			<div className='space-y-4'>
				{metrics.map((metric, index) => (
					<div
						key={index}
						className='bg-gray-700/50 rounded-xl p-4 flex justify-between items-center'>
						<div className='flex items-center space-x-4'>
							{metric.icon}
							<div>
								<div className='text-white font-medium'>{metric.title}</div>
								<div className='text-gray-400 text-sm'>{metric.value}</div>
							</div>
						</div>
						<span className='text-green-500 text-sm'>{metric.change}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function PortfolioSection() {
	const [expandedPortfolio, setExpandedPortfolio] = useState(false);

	const portfolioItems = [
		{
			icon: '/usdc.png',
			name: 'Chaina TWN',
			value: '$36,029.56',
			amount: '36,029.0 USDC',
			change: -0.01,
		},
		{
			icon: '/avax.png',
			name: 'Avalanche',
			value: '$28,558.19',
			amount: '1,558.5 AVAX',
			change: 14.16,
		},
		{
			icon: '/ftt.png',
			name: 'FTX Token',
			value: '$10,000.00',
			amount: '409.71 FTT',
			change: 9.75,
		},
	];

	return (
		<div className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-bold text-white/90'>Portfolio Balance</h2>
				<button
					onClick={() => setExpandedPortfolio(!expandedPortfolio)}
					className='text-gray-400 hover:text-white flex items-center'>
					{expandedPortfolio ? <ChevronUp /> : <ChevronDown />}
					<span className='ml-2'>
						{expandedPortfolio ? 'Collapse' : 'Expand'}
					</span>
				</button>
			</div>
			<AnimatePresence>
				{(expandedPortfolio ? portfolioItems : portfolioItems.slice(0, 2)).map(
					(item, index) => (
						<motion.div
							key={item.name}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ delay: index * 0.2 }}
							className='bg-gray-700/50 rounded-xl p-4 mb-4 flex items-center space-x-4 transform transition-all hover:scale-[1.02] hover:bg-gray-700/70'>
							<img src={item.icon} alt={item.name} className='w-10 h-10' />
							<div className='flex-1'>
								<div className='text-white font-semibold'>{item.name}</div>
								<div className='text-gray-400 text-sm'>{item.amount}</div>
							</div>
							<div className='text-right'>
								<div className='text-white font-semibold'>{item.value}</div>
								<div
									className={`text-sm ${item.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
									{item.change}%
								</div>
							</div>
						</motion.div>
					)
				)}
			</AnimatePresence>
		</div>
	);
}

function Page() {
	return (
		<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen flex flex-col text-white'>
			<div className='container mx-auto px-4 pt-24'>
				<motion.div
					className='grid grid-cols-1 lg:grid-cols-3 gap-6'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}>
					{/* Left Column: Balance and Key Metrics */}
					<div className='lg:col-span-2 space-y-6'>
						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 gap-6'
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}>
							{/* Balance Display */}
							<motion.div
								className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 transform transition-all hover:scale-[1.02] hover:shadow-2xl'
								whileHover={{ scale: 1.02 }}>
								<BalanceDisplay />
							</motion.div>

							{/* Key Metrics */}
							<motion.div
								className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 transform transition-all hover:scale-[1.02] hover:shadow-2xl'
								whileHover={{ scale: 1.02 }}>
								<KeyMetrics />
							</motion.div>
						</motion.div>

						{/* Portfolio Section */}
						<PortfolioSection />
					</div>

					{/* Right Column: Trade Deals and Withdraw */}
					<div className='space-y-6'>
						{/* Trade Deals */}
						<motion.div
							className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7 }}>
							<TradeDeals />
						</motion.div>

						{/* Withdraw Funds */}
						<motion.div
							className='bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7 }}
							whileHover={{ scale: 1.02 }}>
							<WithdrawFunds />
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

export default Page;
