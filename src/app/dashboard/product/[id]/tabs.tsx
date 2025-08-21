'use client';

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
	PieChart,
	Pie,
	Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import {
	Eye,
	Heart,
	ArrowUpRight,
	MapPin,
	Users as UsersIcon,
	MessageCircle,
	Star,
	User,
} from 'lucide-react';
import Image from 'next/image';
// import { ProductDetails } from './interfaces';
import { ProductDetails, TabProps, MetricCardProps } from './interfaces';
import { MetricCard } from './components';
import { useState } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const PerformanceTab = ({
	metrics,
}: {
	metrics?: ProductDetails['performanceMetrics'];
}) => {
	const demoData = [
		{ day: 'Mon', views: 320, interactions: 120, conversions: 22 },
		{ day: 'Tue', views: 380, interactions: 150, conversions: 28 },
		{ day: 'Wed', views: 410, interactions: 170, conversions: 32 },
		{ day: 'Thu', views: 360, interactions: 135, conversions: 25 },
		{ day: 'Fri', views: 450, interactions: 190, conversions: 38 },
		{ day: 'Sat', views: 490, interactions: 210, conversions: 42 },
		{ day: 'Sun', views: 380, interactions: 160, conversions: 30 },
	];

	const data = metrics?.daily || demoData;

	return (
		<div className='space-y-8'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
				<MetricCard
					icon={Eye}
					label='Total Views'
					value='2,790'
					color='text-blue-400'
				/>
				<MetricCard
					icon={Heart}
					label='Engagement Rate'
					value='6.8%'
					color='text-red-400'
				/>
				<MetricCard
					icon={ArrowUpRight}
					label='Conversion Rate'
					value='2.3%'
					color='text-green-400'
				/>
			</div>

			<div className='bg-slate-700/50 rounded-xl p-4 border border-slate-600'>
				<h3 className='text-lg font-medium mb-2 text-white'>
					Performance Trends
				</h3>
				<div className='h-64'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart
							data={data}
							margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
							<CartesianGrid strokeDasharray='3 3' stroke='#4b5563' />
							<XAxis dataKey='day' stroke='#9ca3af' />
							<YAxis stroke='#9ca3af' />
							<Tooltip
								contentStyle={{
									backgroundColor: 'rgba(30, 41, 59, 0.9)',
									border: '1px solid rgba(255, 255, 255, 0.2)',
									borderRadius: '8px',
									color: '#fff',
								}}
							/>
							<Legend />
							<Line
								type='monotone'
								dataKey='views'
								stroke='#4ade80'
								activeDot={{ r: 8 }}
								strokeWidth={2}
							/>
							<Line
								type='monotone'
								dataKey='interactions'
								stroke='#60a5fa'
								strokeWidth={2}
							/>
							<Line
								type='monotone'
								dataKey='conversions'
								stroke='#f472b6'
								strokeWidth={2}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export const DemographicsTab = ({
	metrics,
}: {
	metrics?: ProductDetails['performanceMetrics'];
}) => {
	const demoAgeData = [
		{ name: '18-24', value: 25 },
		{ name: '25-34', value: 35 },
		{ name: '35-44', value: 20 },
		{ name: '45-54', value: 12 },
		{ name: '55+', value: 8 },
	];

	return (
		<div className='space-y-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='bg-slate-700/50 rounded-xl p-4 border border-slate-600'>
					<h3 className='text-lg font-medium mb-4 text-white'>
						Age Distribution
					</h3>
					<div className='h-64 flex items-center justify-center'>
						<ResponsiveContainer width='100%' height='100%'>
							<PieChart>
								<Pie
									data={demoAgeData}
									cx='50%'
									cy='50%'
									labelLine={false}
									outerRadius={80}
									fill='#8884d8'
									dataKey='value'
									label={({ name, percent }) =>
										`${name} ${(percent * 100).toFixed(0)}%`
									}>
									{demoAgeData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: 'rgba(30, 41, 59, 0.9)',
										border: '1px solid rgba(255, 255, 255, 0.2)',
										borderRadius: '8px',
										color: '#fff',
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className='bg-slate-700/50 rounded-xl p-4 border border-slate-600'>
					<h3 className='text-lg font-medium mb-4 text-white'>Top Locations</h3>
					<div className='space-y-4'>
						{[
							{ country: 'United States', value: 42 },
							{ country: 'United Kingdom', value: 18 },
							{ country: 'Canada', value: 12 },
							{ country: 'Australia', value: 8 },
							{ country: 'Germany', value: 6 },
						].map((location) => (
							<div
								key={location.country}
								className='flex items-center justify-between text-slate-300'>
								<div className='flex items-center gap-2'>
									<MapPin className='w-4 h-4 text-blue-400' />
									<span>{location.country}</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-32 h-2 bg-slate-600 rounded-full overflow-hidden'>
										<div
											className='h-full bg-blue-500 rounded-full'
											style={{ width: `${location.value}%` }}
										/>
									</div>
									<span className='text-slate-400 text-sm'>
										{location.value}%
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const ReviewsTab = ({
	reviews,
}: {
	reviews?: ProductDetails['reviews'];
}) => {
	const demoReviews = [
		{
			id: '1',
			user: 'Alex Johnson',
			userAvatar: '/api/placeholder/32/32',
			rating: 4.5,
			comment:
				'This ad campaign significantly increased our conversions. Well worth the investment.',
			date: '2025-03-15',
		},
		{
			id: '2',
			user: 'Sarah Miller',
			userAvatar: '/api/placeholder/32/32',
			rating: 5,
			comment:
				'Exceptional results with this campaign. Targeting was spot on and the ROI was impressive.',
			date: '2025-03-10',
		},
		{
			id: '3',
			user: 'David Chen',
			userAvatar: '/api/placeholder/32/32',
			rating: 3.5,
			comment:
				'Good campaign overall, but took a bit longer than expected to see results.',
			date: '2025-03-05',
		},
	];

	const displayReviews = reviews || demoReviews;

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h3 className='text-lg font-medium text-white'>Client Reviews</h3>
				<button className='text-purple-400 hover:text-purple-300 text-sm'>
					Write a Review
				</button>
			</div>

			{displayReviews.length > 0 ? (
				<div className='space-y-4'>
					{displayReviews.map((review) => (
						<motion.div
							key={review.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className='p-4 bg-slate-700/50 rounded-xl border border-slate-600'>
							<div className='flex justify-between items-start mb-3'>
								<div className='flex items-center gap-3'>
									<div className='w-8 h-8 rounded-full overflow-hidden bg-slate-600'>
										{review.userAvatar ? (
											<Image
												src={review.userAvatar}
												alt={review.user}
												width={32}
												height={32}
												className='object-cover'
											/>
										) : (
											<User className='w-8 h-8 p-1 text-slate-400' />
										)}
									</div>
									<div>
										<div className='font-medium text-white'>{review.user}</div>
										<div className='text-slate-400 text-sm'>
											{new Date(review.date).toLocaleDateString()}
										</div>
									</div>
								</div>
								<div className='flex items-center'>
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-4 h-4 ${
												i < Math.floor(review.rating)
													? 'text-yellow-400 fill-current'
													: i < review.rating
														? 'text-yellow-400'
														: 'text-slate-500'
											}`}
										/>
									))}
								</div>
							</div>
							<p className='text-slate-300'>{review.comment}</p>
						</motion.div>
					))}
				</div>
			) : (
				<div className='text-center py-8 text-slate-400'>No reviews yet</div>
			)}
		</div>
	);
};

export const TabSystem = ({ tabs }: { tabs: TabProps[] }) => {
	const [activeTab, setActiveTab] = useState(tabs[0]?.label || '');

	return (
		<div className='mt-8'>
			<div className='border-b border-slate-600 flex overflow-x-auto'>
				{tabs.map(({ label, icon: Icon }) => (
					<button
						key={label}
						onClick={() => setActiveTab(label)}
						className={`px-4 py-3 flex items-center gap-2 whitespace-nowrap transition-colors ${
							activeTab === label
								? 'border-b-2 border-purple-500 text-purple-400'
								: 'text-slate-400 hover:text-slate-200'
						}`}>
						<Icon className='w-4 h-4' />
						{label}
					</button>
				))}
			</div>
			<div className='py-6'>
				{tabs.find((tab) => tab.label === activeTab)?.content}
			</div>
		</div>
	);
};
