// 'use client';

// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import OnlineStatus from '@/app/components/online/OnlineStatus';
// import {
// 	ChevronLeft,
// 	Share2,
// 	Star,
// 	Clock,
// 	BarChart2,
// 	Target,
// 	User,
// 	Heart,
// 	ExternalLink,
// 	Award,
// 	MessageCircle,
// 	Info,
// 	Globe,
// 	MapPin,
// 	DollarSign,
// 	Zap,
// 	Users,
// 	TrendingUp,
// 	Flag,
// 	Twitter,
// 	Linkedin,
// 	Instagram,
// 	Youtube,
// 	Facebook,
// 	Send,
// 	Eye,
// 	Download,
// 	ArrowUpRight,
// 	LucideIcon,
// 	Calendar,
// } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import {
// 	LineChart,
// 	Line,
// 	XAxis,
// 	YAxis,
// 	CartesianGrid,
// 	Tooltip,
// 	ResponsiveContainer,
// 	Legend,
// 	PieChart,
// 	Pie,
// 	Cell,
// } from 'recharts';

// interface Publisher {
// 	id: string;
// 	name: string;
// 	email?: string;
// 	location?: string;
// 	logoUrl?: string;
// 	totalAds?: number;
// 	rating?: number;
// 	bio?: string;
// 	socialLinks?: {
// 		platform: string;
// 		url: string;
// 		icon: LucideIcon;
// 	}[];
// }

// interface Product {
// 	id: string;
// 	type: string;
// 	adResourceUrl?: string;
// 	title: string;
// 	description: string;
// 	createdBy?: string;
// 	costPerView?: string;
// 	numberOfDaysRunning?: string;
// 	publisher?: Publisher;
// 	isPublished?: boolean;
// }

// interface ProductDetails extends Product {
// 	publishDate?: string;
// 	interestedUsers?: string[];
// 	rating?: number;
// 	totalViews?: number;
// 	isOnline?: boolean;
// 	targetAudience?: string[];
// 	targetAudienceDescription?: string;
// 	adCampaignDetails?: {
// 		objective: string;
// 		budget: string;
// 		platform: string;
// 		startDate?: string;
// 		endDate?: string;
// 		status?: string;
// 	};
// 	tags?: string[];
// 	isPublished?: boolean;
// 	reviews?: {
// 		id: string;
// 		user: string;
// 		userAvatar?: string;
// 		rating: number;
// 		comment: string;
// 		date: string;
// 	}[];
// 	performanceMetrics?: {
// 		daily: {
// 			date: string;
// 			views: number;
// 			interactions: number;
// 			conversions: number;
// 		}[];
// 		demographics?: {
// 			age: { group: string; value: number }[];
// 			gender: { group: string; value: number }[];
// 			location: { country: string; value: number }[];
// 		};
// 	};
// 	relatedAds?: {
// 		id: string;
// 		title: string;
// 		thumbnailUrl?: string;
// 	}[];
// }

// interface MetricCardProps {
// 	icon: LucideIcon;
// 	label: string;
// 	value: string | number;
// 	color: string;
// }

// interface TabProps {
// 	label: string;
// 	icon: LucideIcon;
// 	content: React.ReactNode;
// }

// const LoadingState = () => (
// 	<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white flex items-center justify-center'>
// 		<motion.div
// 			initial={{ opacity: 0, scale: 0.9 }}
// 			animate={{ opacity: 1, scale: 1 }}
// 			transition={{ duration: 0.5 }}
// 			className='text-xl md:text-2xl font-semibold flex items-center space-x-3 md:space-x-4'>
// 			<span className='animate-pulse'>Loading details...</span>
// 		</motion.div>
// 	</div>
// );

// const ErrorState = ({ error }: { error: string | null }) => (
// 	<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white flex items-center justify-center'>
// 		<motion.div className='text-center px-4'>
// 			<div className='text-3xl md:text-4xl text-red-500 mb-3 md:mb-4'>
// 				Oops!
// 			</div>
// 			<div className='text-xl md:text-2xl text-red-400'>
// 				{error || 'Product not found'}
// 			</div>
// 			<button
// 				onClick={() => window.history.back()}
// 				className='mt-6 md:mt-8 px-5 py-2.5 md:px-6 md:py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-sm md:text-base'>
// 				Go Back
// 			</button>
// 		</motion.div>
// 	</div>
// );

// const MetricCard = ({ icon: Icon, label, value, color }: MetricCardProps) => (
// 	<motion.div
// 		whileHover={{ scale: 1.03 }}
// 		className='p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
// 		<div className='text-white/60 text-xs md:text-sm mb-1 flex items-center gap-1.5 md:gap-2'>
// 			<Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${color}`} />
// 			{label}
// 		</div>
// 		<div className='text-lg md:text-xl font-semibold'>{value}</div>
// 	</motion.div>
// );

// const SocialLinks = ({ links }: { links: Publisher['socialLinks'] }) => {
// 	if (!links || links.length === 0) return null;

// 	return (
// 		<div className='flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-4'>
// 			{links.map(({ platform, url, icon: Icon }) => (
// 				<motion.a
// 					key={platform}
// 					href={url}
// 					target='_blank'
// 					rel='noopener noreferrer'
// 					whileHover={{ scale: 1.1 }}
// 					whileTap={{ scale: 0.95 }}
// 					className='p-1.5 md:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors'
// 					aria-label={`Visit ${platform}`}>
// 					<Icon className='w-4 h-4 md:w-5 md:h-5' />
// 				</motion.a>
// 			))}
// 		</div>
// 	);
// };

// const TabSystem = ({ tabs }: { tabs: TabProps[] }) => {
// 	const [activeTab, setActiveTab] = useState(tabs[0]?.label || '');

// 	return (
// 		<div className='mt-4 md:mt-6'>
// 			<div className='border-b border-white/20 flex overflow-x-auto pb-0.5'>
// 				{tabs.map(({ label, icon: Icon }) => (
// 					<button
// 						key={label}
// 						onClick={() => setActiveTab(label)}
// 						className={`px-3 py-2.5 flex items-center gap-1 whitespace-nowrap transition-colors text-sm md:text-base ${
// 							activeTab === label
// 								? 'border-b-2 border-blue-500 text-blue-400'
// 								: 'text-white/60 hover:text-white/90'
// 						}`}>
// 						<Icon className='w-3.5 h-3.5 md:w-4 md:h-4' />
// 						<span>{label}</span>
// 					</button>
// 				))}
// 			</div>
// 			<div className='py-4 md:py-6'>
// 				{tabs.find((tab) => tab.label === activeTab)?.content}
// 			</div>
// 		</div>
// 	);
// };

// const ReportAdModal = ({
// 	isOpen,
// 	onClose,
// 	onSubmit,
// }: {
// 	isOpen: boolean;
// 	onClose: () => void;
// 	onSubmit: (reason: string, description: string) => void;
// }) => {
// 	const [reason, setReason] = useState('');
// 	const [description, setDescription] = useState('');

// 	if (!isOpen) return null;

// 	return (
// 		<motion.div
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			exit={{ opacity: 0 }}
// 			className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 '>
// 			<motion.div
// 				initial={{ scale: 0.9, opacity: 0 }}
// 				animate={{ scale: 1, opacity: 1 }}
// 				exit={{ scale: 0.9, opacity: 0 }}
// 				className='bg-gray-800 rounded-xl p-4 md:p-6 max-w-md w-full'>
// 				<h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4'>
// 					Report Ad
// 				</h3>

// 				<div className='mb-3 md:mb-4'>
// 					<label className='block text-white/70 mb-1 md:mb-2 text-sm'>
// 						Reason for reporting
// 					</label>
// 					<select
// 						value={reason}
// 						onChange={(e) => setReason(e.target.value)}
// 						className='w-full p-2.5 md:p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base'>
// 						<option value=''>Select a reason</option>
// 						<option value='inappropriate'>Inappropriate content</option>
// 						<option value='misleading'>Misleading information</option>
// 						<option value='offensive'>Offensive content</option>
// 						<option value='spam'>Spam</option>
// 						<option value='other'>Other</option>
// 					</select>
// 				</div>

// 				<div className='mb-4 md:mb-6'>
// 					<label className='block text-white/70 mb-1 md:mb-2 text-sm'>
// 						Additional details
// 					</label>
// 					<textarea
// 						value={description}
// 						onChange={(e) => setDescription(e.target.value)}
// 						className='w-full p-2.5 md:p-3 bg-white/5 border border-white/10 rounded-lg h-28 md:h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base'
// 						placeholder='Please provide more details about the issue...'
// 					/>
// 				</div>

// 				<div className='flex justify-end gap-2 md:gap-3'>
// 					<button
// 						onClick={onClose}
// 						className='px-3 py-1.5 md:px-4 md:py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm md:text-base'>
// 						Cancel
// 					</button>
// 					<button
// 						onClick={() => {
// 							onSubmit(reason, description);
// 							onClose();
// 						}}
// 						disabled={!reason}
// 						className={`px-3 py-1.5 md:px-4 md:py-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors text-sm md:text-base ${
// 							!reason ? 'opacity-50 cursor-not-allowed' : ''
// 						}`}>
// 						Submit Report
// 					</button>
// 				</div>
// 			</motion.div>
// 		</motion.div>
// 	);
// };

// const PerformanceTab = ({
// 	metrics,
// }: {
// 	metrics?: ProductDetails['performanceMetrics'];
// }) => {
// 	const demoData = [
// 		{ day: 'Mon', views: 320, interactions: 120, conversions: 22 },
// 		{ day: 'Tue', views: 380, interactions: 150, conversions: 28 },
// 		{ day: 'Wed', views: 410, interactions: 170, conversions: 32 },
// 		{ day: 'Thu', views: 360, interactions: 135, conversions: 25 },
// 		{ day: 'Fri', views: 450, interactions: 190, conversions: 38 },
// 		{ day: 'Sat', views: 490, interactions: 210, conversions: 42 },
// 		{ day: 'Sun', views: 380, interactions: 160, conversions: 30 },
// 	];

// 	const data = metrics?.daily || demoData;

// 	return (
// 		<div className='space-y-6 md:space-y-8'>
// 			<div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8'>
// 				<MetricCard
// 					icon={Eye}
// 					label='Total Views'
// 					value='2,790'
// 					color='text-blue-400'
// 				/>
// 				<MetricCard
// 					icon={Heart}
// 					label='Engagement Rate'
// 					value='6.8%'
// 					color='text-red-400'
// 				/>
// 				<MetricCard
// 					icon={ArrowUpRight}
// 					label='Conversion Rate'
// 					value='2.3%'
// 					color='text-green-400'
// 				/>
// 			</div>

// 			<div className='bg-white/5 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/10'>
// 				<h3 className='text-base md:text-lg font-medium mb-2 text-white/90'>
// 					Performance Trends
// 				</h3>
// 				<div className='h-48 md:h-64'>
// 					<ResponsiveContainer width='100%' height='100%'>
// 						<LineChart
// 							data={data}
// 							margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
// 							<CartesianGrid strokeDasharray='3 3' stroke='#444' />
// 							<XAxis dataKey='day' stroke='#888' />
// 							<YAxis stroke='#888' />
// 							<Tooltip
// 								contentStyle={{
// 									backgroundColor: 'rgba(20, 20, 30, 0.9)',
// 									border: '1px solid rgba(255, 255, 255, 0.2)',
// 									borderRadius: '8px',
// 									color: '#fff',
// 								}}
// 							/>
// 							<Legend />
// 							<Line
// 								type='monotone'
// 								dataKey='views'
// 								stroke='#4ade80'
// 								activeDot={{ r: 6 }}
// 								strokeWidth={2}
// 							/>
// 							<Line
// 								type='monotone'
// 								dataKey='interactions'
// 								stroke='#60a5fa'
// 								strokeWidth={2}
// 							/>
// 							<Line
// 								type='monotone'
// 								dataKey='conversions'
// 								stroke='#f472b6'
// 								strokeWidth={2}
// 							/>
// 						</LineChart>
// 					</ResponsiveContainer>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const DemographicsTab = ({
// 	metrics,
// }: {
// 	metrics?: ProductDetails['performanceMetrics'];
// }) => {
// 	const demoAgeData = [
// 		{ name: '18-24', value: 25 },
// 		{ name: '25-34', value: 35 },
// 		{ name: '35-44', value: 20 },
// 		{ name: '45-54', value: 12 },
// 		{ name: '55+', value: 8 },
// 	];

// 	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// 	return (
// 		<div className='space-y-4 md:space-y-8'>
// 			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
// 				<div className='bg-white/5 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/10'>
// 					<h3 className='text-base md:text-lg font-medium mb-3 md:mb-4 text-white/90'>
// 						Age Distribution
// 					</h3>
// 					<div className='h-48 md:h-64 flex items-center justify-center'>
// 						<ResponsiveContainer width='100%' height='100%'>
// 							<PieChart>
// 								<Pie
// 									data={demoAgeData}
// 									cx='50%'
// 									cy='50%'
// 									labelLine={false}
// 									outerRadius={60}
// 									fill='#8884d8'
// 									dataKey='value'
// 									label={({ name, percent }) =>
// 										`${name} ${(percent * 100).toFixed(0)}%`
// 									}>
// 									{demoAgeData.map((entry, index) => (
// 										<Cell
// 											key={`cell-${index}`}
// 											fill={COLORS[index % COLORS.length]}
// 										/>
// 									))}
// 								</Pie>
// 								<Tooltip
// 									contentStyle={{
// 										backgroundColor: 'rgba(20, 20, 30, 0.9)',
// 										border: '1px solid rgba(255, 255, 255, 0.2)',
// 										borderRadius: '8px',
// 										color: '#fff',
// 									}}
// 								/>
// 							</PieChart>
// 						</ResponsiveContainer>
// 					</div>
// 				</div>

// 				<div className='bg-white/5 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/10'>
// 					<h3 className='text-base md:text-lg font-medium mb-3 md:mb-4 text-white/90'>
// 						Top Locations
// 					</h3>
// 					<div className='space-y-3 md:space-y-4'>
// 						{[
// 							{ country: 'United States', value: 42 },
// 							{ country: 'United Kingdom', value: 18 },
// 							{ country: 'Canada', value: 12 },
// 							{ country: 'Australia', value: 8 },
// 							{ country: 'Germany', value: 6 },
// 						].map((location) => (
// 							<div
// 								key={location.country}
// 								className='flex items-center justify-between'>
// 								<div className='flex items-center gap-1.5 md:gap-2'>
// 									<MapPin className='w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400' />
// 									<span className='text-sm md:text-base'>
// 										{location.country}
// 									</span>
// 								</div>
// 								<div className='flex items-center gap-1.5 md:gap-2'>
// 									<div className='w-24 md:w-32 h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden'>
// 										<div
// 											className='h-full bg-blue-500 rounded-full'
// 											style={{ width: `${location.value}%` }}
// 										/>
// 									</div>
// 									<span className='text-white/70 text-xs md:text-sm'>
// 										{location.value}%
// 									</span>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const ReviewsTab = ({ reviews }: { reviews?: ProductDetails['reviews'] }) => {
// 	const demoReviews = [
// 		{
// 			id: '1',
// 			user: 'Alex Johnson',
// 			userAvatar: '/api/placeholder/32/32',
// 			rating: 4.5,
// 			comment:
// 				'This ad campaign significantly increased our conversions. Well worth the investment.',
// 			date: '2025-03-15',
// 		},
// 		{
// 			id: '2',
// 			user: 'Sarah Miller',
// 			userAvatar: '/api/placeholder/32/32',
// 			rating: 5,
// 			comment:
// 				'Exceptional results with this campaign. Targeting was spot on and the ROI was impressive.',
// 			date: '2025-03-10',
// 		},
// 		{
// 			id: '3',
// 			user: 'David Chen',
// 			userAvatar: '/api/placeholder/32/32',
// 			rating: 3.5,
// 			comment:
// 				'Good campaign overall, but took a bit longer than expected to see results.',
// 			date: '2025-03-05',
// 		},
// 	];

// 	const displayReviews = reviews || demoReviews;

// 	return (
// 		<div className='space-y-4 md:space-y-6'>
// 			<div className='flex justify-between items-center'>
// 				<h3 className='text-base md:text-lg font-medium text-white/90'>
// 					Client Reviews
// 				</h3>
// 				<button className='text-blue-400 hover:text-blue-300 text-xs md:text-sm'>
// 					Write a Review
// 				</button>
// 			</div>

// 			{displayReviews.length > 0 ? (
// 				<div className='space-y-3 md:space-y-4'>
// 					{displayReviews.map((review) => (
// 						<motion.div
// 							key={review.id}
// 							initial={{ opacity: 0, y: 10 }}
// 							animate={{ opacity: 1, y: 0 }}
// 							className='p-3 md:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10'>
// 							<div className='flex justify-between items-start mb-2 md:mb-3'>
// 								<div className='flex items-center gap-2 md:gap-3'>
// 									<div className='w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden bg-white/10'>
// 										{review.userAvatar ? (
// 											<Image
// 												src={review.userAvatar}
// 												alt={review.user}
// 												width={32}
// 												height={32}
// 												className='object-cover'
// 											/>
// 										) : (
// 											<User className='w-7 h-7 md:w-8 md:h-8 p-1' />
// 										)}
// 									</div>
// 									<div>
// 										<div className='font-medium text-sm md:text-base'>
// 											{review.user}
// 										</div>
// 										<div className='text-white/60 text-xs md:text-sm'>
// 											{new Date(review.date).toLocaleDateString()}
// 										</div>
// 									</div>
// 								</div>
// 								<div className='flex items-center'>
// 									{[...Array(5)].map((_, i) => (
// 										<Star
// 											key={i}
// 											className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
// 												i < Math.floor(review.rating)
// 													? 'text-yellow-400 fill-current'
// 													: i < review.rating
// 														? 'text-yellow-400'
// 														: 'text-white/20'
// 											}`}
// 										/>
// 									))}
// 								</div>
// 							</div>
// 							<p className='text-white/80 text-sm md:text-base'>
// 								{review.comment}
// 							</p>
// 						</motion.div>
// 					))}
// 				</div>
// 			) : (
// 				<div className='text-center py-6 md:py-8 text-white/60'>
// 					No reviews yet
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
// 	const { id } = params;
// 	const [product, setProduct] = useState<ProductDetails | null>(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);
// 	const [isLiked, setIsLiked] = useState(false);
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const [isPublished, setIsPublished] = useState(false);
// 	const [isCurrentUserPublisher, setIsCurrentUserPublisher] = useState(false);
// 	const [showReportModal, setShowReportModal] = useState(false);
// 	const router = useRouter();

// 	useEffect(() => {
// 		const handleError = (error: ErrorEvent) => {
// 			console.error('Global error:', error);
// 			setError('An unexpected error occurred');
// 		};

// 		window.addEventListener('error', handleError);
// 		return () => window.removeEventListener('error', handleError);
// 	}, []);

// 	useEffect(() => {
// 		const fetchProductDetails = async () => {
// 			try {
// 				setLoading(true);
// 				const response = await fetch(`/api/product?id=${id}`);
// 				if (!response.ok) {
// 					throw new Error(`HTTP error! status: ${response.status}`);
// 				}

// 				const mockPublisher = {
// 					id: 'pub123',
// 					name: 'Digital Marketing Agency',
// 					email: 'contact@dma.com',
// 					location: 'Los Angeles, CA',
// 					logoUrl: '/api/placeholder/64/64',
// 					totalAds: 42,
// 					rating: 4.8,
// 					bio: 'Leading digital advertising agency specializing in high-performance campaigns across all platforms.',
// 					socialLinks: [
// 						{
// 							platform: 'Twitter',
// 							url: 'https://twitter.com/dma',
// 							icon: Twitter,
// 						},
// 						{
// 							platform: 'LinkedIn',
// 							url: 'https://linkedin.com/company/dma',
// 							icon: Linkedin,
// 						},
// 						{
// 							platform: 'Instagram',
// 							url: 'https://instagram.com/dma',
// 							icon: Instagram,
// 						},
// 						{
// 							platform: 'YouTube',
// 							url: 'https://youtube.com/dma',
// 							icon: Youtube,
// 						},
// 						{
// 							platform: 'Facebook',
// 							url: 'https://facebook.com/dma',
// 							icon: Facebook,
// 						},
// 					],
// 				};

// 				const data = await response.json();
// 				const enhancedData: ProductDetails = {
// 					...data,
// 					publisher: mockPublisher,
// 					targetAudienceDescription:
// 						'Tech-savvy professionals aged 25-45 with interests in digital innovation and early adoption of new technologies.',
// 					tags: [...(data.tags || []), 'High ROI', 'Tech', 'Innovation'],
// 					adCampaignDetails: {
// 						...(data.adCampaignDetails || {}),
// 						startDate: '2025-03-01',
// 						endDate: '2025-05-01',
// 						status: 'Active',
// 					},
// 				};

// 				setProduct(enhancedData);
// 				setIsPublished(enhancedData.isPublished || false);

// 				const currentUserId = localStorage.getItem('userId');
// 				setIsCurrentUserPublisher(currentUserId === enhancedData.createdBy);
// 			} catch (err) {
// 				setError(
// 					err instanceof Error ? err.message : 'An unexpected error occurred'
// 				);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchProductDetails();
// 	}, [id]);

// 	const handleTogglePublish = async () => {
// 		try {
// 			setIsSubmitting(true);
// 			const response = await fetch(`/api/product/${id}/toggle-publish`, {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({ isPublished: !isPublished }),
// 			});

// 			if (!response.ok) {
// 				throw new Error('Failed to toggle publish status');
// 			}

// 			const updatedProduct = await response.json();
// 			setIsPublished(updatedProduct.isPublished);
// 			setProduct((prev) =>
// 				prev ? { ...prev, isPublished: updatedProduct.isPublished } : null
// 			);
// 		} catch (error) {
// 			console.error('Error toggling publish status:', error);
// 			setError('Failed to update publish status');
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	const handleSendMessage = async () => {
// 		try {
// 			setIsSubmitting(true);
// 			const userResponse = await fetch('/api/auth/user');
// 			if (!userResponse.ok) {
// 				throw new Error('Failed to retrieve user information');
// 			}

// 			const userData = await userResponse.json();
// 			const notificationData = {
// 				type: 'new_message',
// 				message: `Someone is interested in your listing "${product?.title}"`,
// 				adId: product?.id,
// 				requesterId: userData._id,
// 				status: 'pending',
// 				action: 'create',
// 			};

// 			const notificationResponse = await fetch('/api/notifications', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					'x-user-email': product?.publisher?.id || '',
// 				},
// 				body: JSON.stringify(notificationData),
// 			});

// 			const responseText = await notificationResponse.text();
// 			if (!notificationResponse.ok) {
// 				throw new Error(`Failed to send notification: ${responseText}`);
// 			}

// 			// Show success message to user
// 			alert('Message sent successfully! The publisher will contact you soon.');
// 		} catch (error) {
// 			console.error('Operation failed:', error);
// 			setError('Failed to connect with seller');
// 			alert('Failed to send message. Please try again later.');
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	const handleReportSubmit = async (reason: string, description: string) => {
// 		try {
// 			setIsSubmitting(true);
// 			const reportData = {
// 				reason,
// 				description,
// 				productId: id,
// 			};
// 			const response = await fetch('/api/reports', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify(reportData),
// 			});

// 			if (!response.ok) {
// 				throw new Error('Failed to submit report');
// 			}

// 			// Show success notification
// 			alert('Report submitted successfully!');
// 		} catch (error: any) {
// 			console.error('Failed to submit report:', error);
// 			setError('Failed to submit report');
// 			alert('Failed to submit report. Please try again later.');
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	return (
// 		<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white pt-14 md:pt-16'>
// 			<AnimatePresence>
// 				{showReportModal && (
// 					<ReportAdModal
// 						isOpen={showReportModal}
// 						onClose={() => setShowReportModal(false)}
// 						onSubmit={handleReportSubmit}
// 					/>
// 				)}
// 			</AnimatePresence>

// 			<header className='sticky  z-10 backdrop-blur-md bg-black/50 border-b border-white/10 px-0 pt-10'>
// 				<div className='container mx-auto px-4 py-3 flex items-center justify-between'>
// 					<button
// 						onClick={() => router.back()}
// 						className='flex items-center text-white/70 hover:text-white transition-colors p-1'
// 						aria-label='Go back'>
// 						<ChevronLeft className='w-5 h-5' />
// 						<span className='sr-only md:not-sr-only md:ml-1'>Back</span>
// 					</button>

// 					<div className='flex items-center gap-2'>
// 						{isCurrentUserPublisher && (
// 							<button
// 								onClick={handleTogglePublish}
// 								disabled={isSubmitting}
// 								className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-colors ${
// 									isPublished
// 										? 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30'
// 										: 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
// 								}`}>
// 								{isSubmitting ? '...' : isPublished ? 'Unpublish' : 'Publish'}
// 							</button>
// 						)}

// 						<div className='flex items-center gap-1'>
// 							<button
// 								onClick={() => setIsLiked(!isLiked)}
// 								className='p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors'
// 								aria-label={isLiked ? 'Unlike this ad' : 'Like this ad'}>
// 								<Heart
// 									className={`w-4 h-4 ${
// 										isLiked ? 'fill-red-500 text-red-500' : 'text-white/70'
// 									}`}
// 								/>
// 							</button>

// 							<button
// 								onClick={() => setShowReportModal(true)}
// 								className='p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors'
// 								aria-label='Report this ad'>
// 								<Flag className='w-4 h-4 text-white/70' />
// 							</button>

// 							<button
// 								className='p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors'
// 								aria-label='Share this ad'>
// 								<Share2 className='w-4 h-4 text-white/70' />
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</header>

// 			<main className='container mx-auto px-4 py-6'>
// 				<div className='max-w-5xl mx-auto'>
// 					<div className='flex flex-col md:flex-row gap-4 md:gap-8'>
// 						{/* Left column - Product Preview */}
// 						<div className='w-full md:w-7/12 lg:w-8/12'>
// 							<motion.div
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								transition={{ duration: 0.5 }}
// 								className='relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center'>
// 								{product?.adResourceUrl ? (
// 									<div className='w-full h-full'>
// 										<Image
// 											src={product.adResourceUrl}
// 											alt={product.title || 'Ad Resource'}
// 											fill
// 											className='object-cover'
// 											priority
// 										/>
// 									</div>
// 								) : (
// 									<div className='text-white/30 text-lg'>
// 										No preview available
// 									</div>
// 								)}
// 							</motion.div>

// 							{/* Publisher Info */}
// 							<motion.div
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								transition={{ duration: 0.5, delay: 0.1 }}
// 								className='mt-4 md:mt-6 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
// 								<div className='flex items-start gap-3 md:gap-4'>
// 									<div className='relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-white/10'>
// 										{product?.publisher?.logoUrl ? (
// 											<Image
// 												src={product.publisher.logoUrl}
// 												alt={product.publisher.name}
// 												width={56}
// 												height={56}
// 												className='object-cover'
// 											/>
// 										) : (
// 											<User className='w-12 h-12 md:w-14 md:h-14 p-2' />
// 										)}
// 									</div>

// 									<div className='flex-1'>
// 										<div className='flex items-center justify-between'>
// 											<h3 className='text-lg md:text-xl font-semibold'>
// 												{product?.publisher?.name}
// 											</h3>
// 											<div className='flex items-center gap-1'>
// 												<Star className='w-4 h-4 text-yellow-400 fill-current' />
// 												<span className='text-sm md:text-base'>
// 													{product?.publisher?.rating?.toFixed(1) || '4.8'}
// 												</span>
// 											</div>
// 										</div>

// 										{product?.publisher?.location && (
// 											<div className='flex items-center gap-1 text-white/60 text-sm md:text-base mt-1'>
// 												<MapPin className='w-3.5 h-3.5 md:w-4 md:h-4' />
// 												<span>{product.publisher.location}</span>
// 											</div>
// 										)}

// 										{product?.publisher?.bio && (
// 											<p className='text-white/70 text-sm md:text-base mt-2'>
// 												{product.publisher.bio}
// 											</p>
// 										)}

// 										<SocialLinks links={product?.publisher?.socialLinks} />
// 									</div>
// 								</div>
// 							</motion.div>
// 						</div>

// 						{/* Right column - Product Details */}
// 						<div className='w-full md:w-5/12 lg:w-4/12'>
// 							<motion.div
// 								initial={{ opacity: 0, y: 20 }}
// 								animate={{ opacity: 1, y: 0 }}
// 								transition={{ duration: 0.5, delay: 0.2 }}
// 								className='sticky top-20 space-y-4 md:space-y-6'>
// 								<div>
// 									<div className='flex items-center justify-between'>
// 										<h1 className='text-xl md:text-2xl font-bold'>
// 											{product?.title}
// 										</h1>
// 										<div className='flex items-center gap-1'>
// 											<Star className='w-4 h-4 text-yellow-400 fill-current' />
// 											<span>{product?.rating?.toFixed(1) || '4.5'}</span>
// 										</div>
// 									</div>

// 									<p className='text-white/70 mt-2 text-sm md:text-base'>
// 										{product?.description}
// 									</p>
// 								</div>

// 								<div className='space-y-3 md:space-y-4'>
// 									<div className='flex items-center gap-2 text-sm md:text-base'>
// 										<Clock className='w-4 h-4 text-blue-400' />
// 										<span className='text-white/70'>Running for:</span>
// 										<span>{product?.numberOfDaysRunning || '15'} days</span>
// 									</div>

// 									<div className='flex items-center gap-2 text-sm md:text-base'>
// 										<DollarSign className='w-4 h-4 text-green-400' />
// 										<span className='text-white/70'>Cost per view:</span>
// 										<span>${product?.costPerView || '0.15'}</span>
// 									</div>

// 									<div className='flex items-center gap-2 text-sm md:text-base'>
// 										<Users className='w-4 h-4 text-purple-400' />
// 										<span className='text-white/70'>Total views:</span>
// 										<span>
// 											{product?.totalViews?.toLocaleString() || '2,790'}
// 										</span>
// 									</div>

// 									<div className='flex items-center gap-2 text-sm md:text-base'>
// 										<Calendar className='w-4 h-4 text-orange-400' />
// 										<span className='text-white/70'>Published:</span>
// 										<span>
// 											{product?.publishDate
// 												? new Date(product.publishDate).toLocaleDateString()
// 												: 'Mar 1, 2025'}
// 										</span>
// 									</div>

// 									<div className='flex items-center gap-2 text-sm md:text-base'>
// 										<Zap className='w-4 h-4 text-yellow-400' />
// 										<span className='text-white/70'>Status:</span>
// 										<span className='flex items-center gap-1'>
// 											<OnlineStatus
// 												isOnline={product?.isOnline || false}
// 												isOwner={false}
// 												resourceId={product?.id || 'default'}
// 												resourceType='product'
// 											/>
// 											{product?.isOnline ? 'Active' : 'Inactive'}
// 										</span>
// 									</div>
// 								</div>

// 								<div className='pt-2'>
// 									<h3 className='text-sm md:text-base font-medium text-white/90 mb-2'>
// 										Target Audience
// 									</h3>
// 									<p className='text-white/70 text-sm md:text-base'>
// 										{product?.targetAudienceDescription ||
// 											'Tech-savvy professionals aged 25-45 with interests in digital innovation and early adoption of new technologies.'}
// 									</p>
// 								</div>

// 								<div className='flex flex-wrap gap-2 pt-2'>
// 									{product?.tags?.map((tag) => (
// 										<span
// 											key={tag}
// 											className='px-2.5 py-1 text-xs bg-white/5 rounded-full'>
// 											{tag}
// 										</span>
// 									))}
// 								</div>

// 								<div className='pt-4'>
// 									<button
// 										onClick={handleSendMessage}
// 										disabled={isSubmitting}
// 										className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${
// 											isSubmitting
// 												? 'bg-blue-600/50 cursor-not-allowed'
// 												: 'bg-blue-600 hover:bg-blue-700'
// 										}`}>
// 										<Send className='w-4 h-4' />
// 										{isSubmitting ? 'Sending...' : 'Contact Publisher'}
// 									</button>
// 								</div>
// 							</motion.div>
// 						</div>
// 					</div>

// 					{/* Tabs Section */}
// 					<div className='mt-8 md:mt-12'>
// 						<TabSystem
// 							tabs={[
// 								{
// 									label: 'Performance',
// 									icon: BarChart2,
// 									content: (
// 										<PerformanceTab metrics={product?.performanceMetrics} />
// 									),
// 								},
// 								{
// 									label: 'Demographics',
// 									icon: Target,
// 									content: (
// 										<DemographicsTab metrics={product?.performanceMetrics} />
// 									),
// 								},
// 								{
// 									label: 'Reviews',
// 									icon: MessageCircle,
// 									content: <ReviewsTab reviews={product?.reviews} />,
// 								},
// 								{
// 									label: 'Campaign Details',
// 									icon: Info,
// 									content: (
// 										<div className='space-y-4 md:space-y-6'>
// 											<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
// 												<div className='p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
// 													<h3 className='text-base md:text-lg font-medium mb-3 text-white/90'>
// 														Campaign Objective
// 													</h3>
// 													<p className='text-white/70'>
// 														{product?.adCampaignDetails?.objective ||
// 															'Increase brand awareness and drive conversions'}
// 													</p>
// 												</div>

// 												<div className='p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
// 													<h3 className='text-base md:text-lg font-medium mb-3 text-white/90'>
// 														Budget
// 													</h3>
// 													<p className='text-white/70'>
// 														{product?.adCampaignDetails?.budget || '$5,000'}
// 													</p>
// 												</div>
// 											</div>

// 											<div className='p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
// 												<h3 className='text-base md:text-lg font-medium mb-3 text-white/90'>
// 													Platform
// 												</h3>
// 												<p className='text-white/70'>
// 													{product?.adCampaignDetails?.platform ||
// 														'Facebook, Instagram, Google Display Network'}
// 												</p>
// 											</div>

// 											<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
// 												<div className='p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
// 													<h3 className='text-base md:text-lg font-medium mb-3 text-white/90'>
// 														Start Date
// 													</h3>
// 													<p className='text-white/70'>
// 														{product?.adCampaignDetails?.startDate
// 															? new Date(
// 																	product.adCampaignDetails.startDate
// 																).toLocaleDateString()
// 															: 'Mar 1, 2025'}
// 													</p>
// 												</div>

// 												<div className='p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
// 													<h3 className='text-base md:text-lg font-medium mb-3 text-white/90'>
// 														End Date
// 													</h3>
// 													<p className='text-white/70'>
// 														{product?.adCampaignDetails?.endDate
// 															? new Date(
// 																	product.adCampaignDetails.endDate
// 																).toLocaleDateString()
// 															: 'May 1, 2025'}
// 													</p>
// 												</div>
// 											</div>

// 											<div className='p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
// 												<h3 className='text-base md:text-lg font-medium mb-3 text-white/90'>
// 													Status
// 												</h3>
// 												<div className='flex items-center gap-2'>
// 													<div
// 														className={`w-2 h-2 rounded-full ${
// 															product?.adCampaignDetails?.status === 'Active'
// 																? 'bg-green-500'
// 																: 'bg-gray-500'
// 														}`}
// 													/>
// 													<span>
// 														{product?.adCampaignDetails?.status || 'Active'}
// 													</span>
// 												</div>
// 											</div>
// 										</div>
// 									),
// 								},
// 							]}
// 						/>
// 					</div>
// 				</div>
// 			</main>
// 		</div>
// 	);
// };

// export default ProductDetailsPage;

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
// 	ChevronLeft,
// 	Share2,
// 	Star,
// 	Clock,
// 	BarChart2,
// 	Target,
// 	User,
// 	Heart,
// 	ExternalLink,
// 	Award,
// 	MessageCircle,
// 	Info,
// 	Globe,
// 	MapPin,
// 	DollarSign,
// 	Zap,
// 	Users as UsersIcon,
// 	TrendingUp,
// 	Flag,
// 	Twitter,
// 	Linkedin,
// 	Instagram,
// 	Youtube,
// 	Facebook,
// 	Send,
// 	Eye,
// 	Download,
// 	ArrowUpRight,
// 	Calendar,
// } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';
// import {
// 	LineChart,
// 	Line,
// 	XAxis,
// 	YAxis,
// 	CartesianGrid,
// 	Tooltip,
// 	ResponsiveContainer,
// 	Legend,
// 	PieChart,
// 	Pie,
// 	Cell,
// } from 'recharts';
// import OnlineStatus from '@/app/components/online/OnlineStatus';
// import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
// import { Settings, HelpCircle, LucideIcon } from 'lucide-react';

// // Interfaces remain the same as your original
// interface Publisher {
// 	id: string;
// 	name: string;
// 	email?: string;
// 	location?: string;
// 	logoUrl?: string;
// 	totalAds?: number;
// 	rating?: number;
// 	bio?: string;
// 	socialLinks?: {
// 		platform: string;
// 		url: string;
// 		icon: LucideIcon;
// 	}[];
// }

// interface Product {
// 	id: string;
// 	type: string;
// 	adResourceUrl?: string;
// 	title: string;
// 	description: string;
// 	createdBy?: string;
// 	costPerView?: string;
// 	numberOfDaysRunning?: string;
// 	publisher?: Publisher;
// 	isPublished?: boolean;
// }

// interface ProductDetails extends Product {
// 	publishDate?: string;
// 	interestedUsers?: string[];
// 	rating?: number;
// 	totalViews?: number;
// 	isOnline?: boolean;
// 	targetAudience?: string[];
// 	targetAudienceDescription?: string;
// 	adCampaignDetails?: {
// 		objective: string;
// 		budget: string;
// 		platform: string;
// 		startDate?: string;
// 		endDate?: string;
// 		status?: string;
// 	};
// 	tags?: string[];
// 	isPublished?: boolean;
// 	reviews?: {
// 		id: string;
// 		user: string;
// 		userAvatar?: string;
// 		rating: number;
// 		comment: string;
// 		date: string;
// 	}[];
// 	performanceMetrics?: {
// 		daily: {
// 			date: string;
// 			views: number;
// 			interactions: number;
// 			conversions: number;
// 		}[];
// 		demographics?: {
// 			age: { group: string; value: number }[];
// 			gender: { group: string; value: number }[];
// 			location: { country: string; value: number }[];
// 		};
// 	};
// 	relatedAds?: {
// 		id: string;
// 		title: string;
// 		thumbnailUrl?: string;
// 	}[];
// }

// interface MetricCardProps {
// 	icon: LucideIcon;
// 	label: string;
// 	value: string | number;
// 	color: string;
// }

// interface TabProps {
// 	label: string;
// 	icon: LucideIcon;
// 	content: React.ReactNode;
// }

// const LoadingState = () => (
// 	<div className='flex items-center justify-center h-screen bg-slate-800/70'>
// 		<motion.div
// 			initial={{ opacity: 0, scale: 0.9 }}
// 			animate={{ opacity: 1, scale: 1 }}
// 			transition={{ duration: 0.5 }}
// 			className='text-white text-2xl font-semibold flex items-center space-x-4'>
// 			<span className='animate-pulse'>Loading details...</span>
// 		</motion.div>
// 	</div>
// );

// const ErrorState = ({ error }: { error: string | null }) => (
// 	<div className='flex items-center justify-center h-screen bg-slate-800/70'>
// 		<motion.div className='text-center text-white'>
// 			<div className='text-4xl text-red-500 mb-4'>Oops!</div>
// 			<div className='text-2xl text-red-400'>
// 				{error || 'Product not found'}
// 			</div>
// 			<button
// 				onClick={() => window.history.back()}
// 				className='mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors'>
// 				Go Back
// 			</button>
// 		</motion.div>
// 	</div>
// );

// const MetricCard = ({ icon: Icon, label, value, color }: MetricCardProps) => (
// 	<motion.div
// 		whileHover={{ scale: 1.05 }}
// 		className='p-4 rounded-xl bg-slate-700/50 border border-slate-600'>
// 		<div className='text-slate-300 text-sm mb-1 flex items-center gap-2'>
// 			<Icon className={`w-4 h-4 ${color}`} />
// 			{label}
// 		</div>
// 		<div className='text-xl font-semibold text-white'>{value}</div>
// 	</motion.div>
// );

// const SocialLinks = ({ links }: { links: Publisher['socialLinks'] }) => {
// 	if (!links || links.length === 0) return null;

// 	return (
// 		<div className='flex flex-wrap gap-3 mt-4'>
// 			{links.map(({ platform, url, icon: Icon }) => (
// 				<motion.a
// 					key={platform}
// 					href={url}
// 					target='_blank'
// 					rel='noopener noreferrer'
// 					whileHover={{ scale: 1.1 }}
// 					whileTap={{ scale: 0.95 }}
// 					className='p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors'
// 					aria-label={`Visit ${platform}`}>
// 					<Icon className='w-5 h-5 text-slate-300' />
// 				</motion.a>
// 			))}
// 		</div>
// 	);
// };

// const TabSystem = ({ tabs }: { tabs: TabProps[] }) => {
// 	const [activeTab, setActiveTab] = useState(tabs[0]?.label || '');

// 	return (
// 		<div className='mt-8'>
// 			<div className='border-b border-slate-600 flex overflow-x-auto'>
// 				{tabs.map(({ label, icon: Icon }) => (
// 					<button
// 						key={label}
// 						onClick={() => setActiveTab(label)}
// 						className={`px-4 py-3 flex items-center gap-2 whitespace-nowrap transition-colors ${
// 							activeTab === label
// 								? 'border-b-2 border-purple-500 text-purple-400'
// 								: 'text-slate-400 hover:text-slate-200'
// 						}`}>
// 						<Icon className='w-4 h-4' />
// 						{label}
// 					</button>
// 				))}
// 			</div>
// 			<div className='py-6'>
// 				{tabs.find((tab) => tab.label === activeTab)?.content}
// 			</div>
// 		</div>
// 	);
// };

// const ReportAdModal = ({
// 	isOpen,
// 	onClose,
// 	onSubmit,
// }: {
// 	isOpen: boolean;
// 	onClose: () => void;
// 	onSubmit: (reason: string, description: string) => void;
// }) => {
// 	const [reason, setReason] = useState('');
// 	const [description, setDescription] = useState('');

// 	if (!isOpen) return null;

// 	return (
// 		<motion.div
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			exit={{ opacity: 0 }}
// 			className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
// 			<motion.div
// 				initial={{ scale: 0.9, opacity: 0 }}
// 				animate={{ scale: 1, opacity: 1 }}
// 				exit={{ scale: 0.9, opacity: 0 }}
// 				className='bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-700'>
// 				<h3 className='text-xl font-semibold mb-4 text-white'>Report Ad</h3>

// 				<div className='mb-4'>
// 					<label className='block text-slate-300 mb-2 text-sm'>
// 						Reason for reporting
// 					</label>
// 					<select
// 						value={reason}
// 						onChange={(e) => setReason(e.target.value)}
// 						className='w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white'>
// 						<option value=''>Select a reason</option>
// 						<option value='inappropriate'>Inappropriate content</option>
// 						<option value='misleading'>Misleading information</option>
// 						<option value='offensive'>Offensive content</option>
// 						<option value='spam'>Spam</option>
// 						<option value='other'>Other</option>
// 					</select>
// 				</div>

// 				<div className='mb-6'>
// 					<label className='block text-slate-300 mb-2 text-sm'>
// 						Additional details
// 					</label>
// 					<textarea
// 						value={description}
// 						onChange={(e) => setDescription(e.target.value)}
// 						className='w-full p-3 bg-slate-700 border border-slate-600 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white'
// 						placeholder='Please provide more details about the issue...'
// 					/>
// 				</div>

// 				<div className='flex justify-end gap-3'>
// 					<button
// 						onClick={onClose}
// 						className='px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white'>
// 						Cancel
// 					</button>
// 					<button
// 						onClick={() => {
// 							onSubmit(reason, description);
// 							onClose();
// 						}}
// 						disabled={!reason}
// 						className={`px-4 py-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors text-white ${
// 							!reason ? 'opacity-50 cursor-not-allowed' : ''
// 						}`}>
// 						Submit Report
// 					</button>
// 				</div>
// 			</motion.div>
// 		</motion.div>
// 	);
// };

// const PerformanceTab = ({
// 	metrics,
// }: {
// 	metrics?: ProductDetails['performanceMetrics'];
// }) => {
// 	const demoData = [
// 		{ day: 'Mon', views: 320, interactions: 120, conversions: 22 },
// 		{ day: 'Tue', views: 380, interactions: 150, conversions: 28 },
// 		{ day: 'Wed', views: 410, interactions: 170, conversions: 32 },
// 		{ day: 'Thu', views: 360, interactions: 135, conversions: 25 },
// 		{ day: 'Fri', views: 450, interactions: 190, conversions: 38 },
// 		{ day: 'Sat', views: 490, interactions: 210, conversions: 42 },
// 		{ day: 'Sun', views: 380, interactions: 160, conversions: 30 },
// 	];

// 	const data = metrics?.daily || demoData;

// 	return (
// 		<div className='space-y-8'>
// 			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
// 				<MetricCard
// 					icon={Eye}
// 					label='Total Views'
// 					value='2,790'
// 					color='text-blue-400'
// 				/>
// 				<MetricCard
// 					icon={Heart}
// 					label='Engagement Rate'
// 					value='6.8%'
// 					color='text-red-400'
// 				/>
// 				<MetricCard
// 					icon={ArrowUpRight}
// 					label='Conversion Rate'
// 					value='2.3%'
// 					color='text-green-400'
// 				/>
// 			</div>

// 			<div className='bg-slate-700/50 rounded-xl p-4 border border-slate-600'>
// 				<h3 className='text-lg font-medium mb-2 text-white'>
// 					Performance Trends
// 				</h3>
// 				<div className='h-64'>
// 					<ResponsiveContainer width='100%' height='100%'>
// 						<LineChart
// 							data={data}
// 							margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
// 							<CartesianGrid strokeDasharray='3 3' stroke='#4b5563' />
// 							<XAxis dataKey='day' stroke='#9ca3af' />
// 							<YAxis stroke='#9ca3af' />
// 							<Tooltip
// 								contentStyle={{
// 									backgroundColor: 'rgba(30, 41, 59, 0.9)',
// 									border: '1px solid rgba(255, 255, 255, 0.2)',
// 									borderRadius: '8px',
// 									color: '#fff',
// 								}}
// 							/>
// 							<Legend />
// 							<Line
// 								type='monotone'
// 								dataKey='views'
// 								stroke='#4ade80'
// 								activeDot={{ r: 8 }}
// 								strokeWidth={2}
// 							/>
// 							<Line
// 								type='monotone'
// 								dataKey='interactions'
// 								stroke='#60a5fa'
// 								strokeWidth={2}
// 							/>
// 							<Line
// 								type='monotone'
// 								dataKey='conversions'
// 								stroke='#f472b6'
// 								strokeWidth={2}
// 							/>
// 						</LineChart>
// 					</ResponsiveContainer>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const DemographicsTab = ({
// 	metrics,
// }: {
// 	metrics?: ProductDetails['performanceMetrics'];
// }) => {
// 	const demoAgeData = [
// 		{ name: '18-24', value: 25 },
// 		{ name: '25-34', value: 35 },
// 		{ name: '35-44', value: 20 },
// 		{ name: '45-54', value: 12 },
// 		{ name: '55+', value: 8 },
// 	];

// 	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// 	return (
// 		<div className='space-y-8'>
// 			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
// 				<div className='bg-slate-700/50 rounded-xl p-4 border border-slate-600'>
// 					<h3 className='text-lg font-medium mb-4 text-white'>
// 						Age Distribution
// 					</h3>
// 					<div className='h-64 flex items-center justify-center'>
// 						<ResponsiveContainer width='100%' height='100%'>
// 							<PieChart>
// 								<Pie
// 									data={demoAgeData}
// 									cx='50%'
// 									cy='50%'
// 									labelLine={false}
// 									outerRadius={80}
// 									fill='#8884d8'
// 									dataKey='value'
// 									label={({ name, percent }) =>
// 										`${name} ${(percent * 100).toFixed(0)}%`
// 									}>
// 									{demoAgeData.map((entry, index) => (
// 										<Cell
// 											key={`cell-${index}`}
// 											fill={COLORS[index % COLORS.length]}
// 										/>
// 									))}
// 								</Pie>
// 								<Tooltip
// 									contentStyle={{
// 										backgroundColor: 'rgba(30, 41, 59, 0.9)',
// 										border: '1px solid rgba(255, 255, 255, 0.2)',
// 										borderRadius: '8px',
// 										color: '#fff',
// 									}}
// 								/>
// 							</PieChart>
// 						</ResponsiveContainer>
// 					</div>
// 				</div>

// 				<div className='bg-slate-700/50 rounded-xl p-4 border border-slate-600'>
// 					<h3 className='text-lg font-medium mb-4 text-white'>Top Locations</h3>
// 					<div className='space-y-4'>
// 						{[
// 							{ country: 'United States', value: 42 },
// 							{ country: 'United Kingdom', value: 18 },
// 							{ country: 'Canada', value: 12 },
// 							{ country: 'Australia', value: 8 },
// 							{ country: 'Germany', value: 6 },
// 						].map((location) => (
// 							<div
// 								key={location.country}
// 								className='flex items-center justify-between text-slate-300'>
// 								<div className='flex items-center gap-2'>
// 									<MapPin className='w-4 h-4 text-blue-400' />
// 									<span>{location.country}</span>
// 								</div>
// 								<div className='flex items-center gap-2'>
// 									<div className='w-32 h-2 bg-slate-600 rounded-full overflow-hidden'>
// 										<div
// 											className='h-full bg-blue-500 rounded-full'
// 											style={{ width: `${location.value}%` }}
// 										/>
// 									</div>
// 									<span className='text-slate-400 text-sm'>
// 										{location.value}%
// 									</span>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const ReviewsTab = ({ reviews }: { reviews?: ProductDetails['reviews'] }) => {
// 	const demoReviews = [
// 		{
// 			id: '1',
// 			user: 'Alex Johnson',
// 			userAvatar: '/api/placeholder/32/32',
// 			rating: 4.5,
// 			comment:
// 				'This ad campaign significantly increased our conversions. Well worth the investment.',
// 			date: '2025-03-15',
// 		},
// 		{
// 			id: '2',
// 			user: 'Sarah Miller',
// 			userAvatar: '/api/placeholder/32/32',
// 			rating: 5,
// 			comment:
// 				'Exceptional results with this campaign. Targeting was spot on and the ROI was impressive.',
// 			date: '2025-03-10',
// 		},
// 		{
// 			id: '3',
// 			user: 'David Chen',
// 			userAvatar: '/api/placeholder/32/32',
// 			rating: 3.5,
// 			comment:
// 				'Good campaign overall, but took a bit longer than expected to see results.',
// 			date: '2025-03-05',
// 		},
// 	];

// 	const displayReviews = reviews || demoReviews;

// 	return (
// 		<div className='space-y-6'>
// 			<div className='flex justify-between items-center'>
// 				<h3 className='text-lg font-medium text-white'>Client Reviews</h3>
// 				<button className='text-purple-400 hover:text-purple-300 text-sm'>
// 					Write a Review
// 				</button>
// 			</div>

// 			{displayReviews.length > 0 ? (
// 				<div className='space-y-4'>
// 					{displayReviews.map((review) => (
// 						<motion.div
// 							key={review.id}
// 							initial={{ opacity: 0, y: 10 }}
// 							animate={{ opacity: 1, y: 0 }}
// 							className='p-4 bg-slate-700/50 rounded-xl border border-slate-600'>
// 							<div className='flex justify-between items-start mb-3'>
// 								<div className='flex items-center gap-3'>
// 									<div className='w-8 h-8 rounded-full overflow-hidden bg-slate-600'>
// 										{review.userAvatar ? (
// 											<Image
// 												src={review.userAvatar}
// 												alt={review.user}
// 												width={32}
// 												height={32}
// 												className='object-cover'
// 											/>
// 										) : (
// 											<User className='w-8 h-8 p-1 text-slate-400' />
// 										)}
// 									</div>
// 									<div>
// 										<div className='font-medium text-white'>{review.user}</div>
// 										<div className='text-slate-400 text-sm'>
// 											{new Date(review.date).toLocaleDateString()}
// 										</div>
// 									</div>
// 								</div>
// 								<div className='flex items-center'>
// 									{[...Array(5)].map((_, i) => (
// 										<Star
// 											key={i}
// 											className={`w-4 h-4 ${
// 												i < Math.floor(review.rating)
// 													? 'text-yellow-400 fill-current'
// 													: i < review.rating
// 														? 'text-yellow-400'
// 														: 'text-slate-500'
// 											}`}
// 										/>
// 									))}
// 								</div>
// 							</div>
// 							<p className='text-slate-300'>{review.comment}</p>
// 						</motion.div>
// 					))}
// 				</div>
// 			) : (
// 				<div className='text-center py-8 text-slate-400'>No reviews yet</div>
// 			)}
// 		</div>
// 	);
// };

// const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
// 	const { id } = params;
// 	const [product, setProduct] = useState<ProductDetails | null>(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);
// 	const [isLiked, setIsLiked] = useState(false);
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const [isPublished, setIsPublished] = useState(false);
// 	const [isCurrentUserPublisher, setIsCurrentUserPublisher] = useState(false);
// 	const [showReportModal, setShowReportModal] = useState(false);
// 	const [activeTab, setActiveTab] = useState('Overview');
// 	const router = useRouter();
// 	const { user, isLoading } = useKindeBrowserClient();

// 	useEffect(() => {
// 		const handleError = (error: ErrorEvent) => {
// 			console.error('Global error:', error);
// 			setError('An unexpected error occurred');
// 		};

// 		window.addEventListener('error', handleError);
// 		return () => window.removeEventListener('error', handleError);
// 	}, []);

// 	useEffect(() => {
// 		if (!isLoading && !user) {
// 			router.push('/auth/signin');
// 		}
// 	}, [isLoading, user, router]);

// 	useEffect(() => {
// 		const fetchProductDetails = async () => {
// 			try {
// 				setLoading(true);
// 				const userEmail = user?.email;

// 				if (!userEmail) {
// 					throw new Error('User email is required');
// 				}

// 				const response = await fetch(
// 					`/api/product?id=${id}&email=${encodeURIComponent(userEmail)}`
// 				);

// 				if (!response.ok) {
// 					const errorData = await response.json();
// 					throw new Error(
// 						errorData.error || `HTTP error! status: ${response.status}`
// 					);
// 				}

// 				const data = await response.json();
// 				const mockPublisher = {
// 					id: 'pub123',
// 					name: 'Digital Marketing Agency',
// 					email: 'contact@dma.com',
// 					location: 'Los Angeles, CA',
// 					logoUrl: '/api/placeholder/64/64',
// 					totalAds: 42,
// 					rating: 4.8,
// 					bio: 'Leading digital advertising agency specializing in high-performance campaigns across all platforms.',
// 					socialLinks: [
// 						{
// 							platform: 'Twitter',
// 							url: 'https://twitter.com/dma',
// 							icon: Twitter,
// 						},
// 						{
// 							platform: 'LinkedIn',
// 							url: 'https://linkedin.com/company/dma',
// 							icon: Linkedin,
// 						},
// 						{
// 							platform: 'Instagram',
// 							url: 'https://instagram.com/dma',
// 							icon: Instagram,
// 						},
// 						{
// 							platform: 'YouTube',
// 							url: 'https://youtube.com/dma',
// 							icon: Youtube,
// 						},
// 						{
// 							platform: 'Facebook',
// 							url: 'https://facebook.com/dma',
// 							icon: Facebook,
// 						},
// 					],
// 				};

// 				const enhancedData: ProductDetails = {
// 					...data,
// 					publisher: mockPublisher,
// 					targetAudienceDescription:
// 						'Tech-savvy professionals aged 25-45 with interests in digital innovation and early adoption of new technologies.',
// 					tags: [...(data.tags || []), 'High ROI', 'Tech', 'Innovation'],
// 					adCampaignDetails: {
// 						...(data.adCampaignDetails || {}),
// 						startDate: '2025-03-01',
// 						endDate: '2025-05-01',
// 						status: 'Active',
// 					},
// 				};

// 				setProduct(enhancedData);
// 				setIsPublished(enhancedData.isPublished || false);
// 				setIsCurrentUserPublisher(userEmail === enhancedData.createdBy);
// 			} catch (err) {
// 				console.error('Error fetching product details:', err);
// 				setError(
// 					err instanceof Error ? err.message : 'An unexpected error occurred'
// 				);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		if (user) {
// 			fetchProductDetails();
// 		}
// 	}, [id, user]);

// 	const handleTogglePublish = async () => {
// 		try {
// 			setIsSubmitting(true);
// 			const response = await fetch(`/api/product/${id}/toggle-publish`, {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({ isPublished: !isPublished }),
// 			});

// 			if (!response.ok) {
// 				throw new Error('Failed to toggle publish status');
// 			}

// 			const updatedProduct = await response.json();
// 			setIsPublished(updatedProduct.isPublished);
// 			setProduct((prev) =>
// 				prev ? { ...prev, isPublished: updatedProduct.isPublished } : null
// 			);
// 		} catch (error) {
// 			console.error('Error toggling publish status:', error);
// 			setError('Failed to update publish status');
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	const handleSendMessage = async () => {
// 		try {
// 			setIsSubmitting(true);
// 			console.log('Starting handleSendMessage');

// 			const userResponse = await fetch('/api/auth/user');
// 			console.log('User API response status:', userResponse.status);

// 			if (!userResponse.ok) {
// 				throw new Error('Failed to retrieve user information');
// 			}

// 			const userData = await userResponse.json();
// 			console.log('User data:', userData);
// 			console.log('Product data:', product);

// 			const notificationData = {
// 				type: 'new_message',
// 				message: `Someone is interested in your listing "${product?.title}"`,
// 				adId: product?.id,
// 				requesterId: userData._id,
// 				status: 'pending',
// 				action: 'create',
// 			};
// 			console.log('Sending notification data:', notificationData);
// 			console.log('Publisher ID (recipient):', product?.publisher?.id);

// 			const notificationResponse = await fetch('/api/notifications', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					'x-user-email': product?.publisher?.id || '',
// 				},
// 				body: JSON.stringify(notificationData),
// 			});

// 			console.log(
// 				'Notification API response status:',
// 				notificationResponse.status
// 			);

// 			const responseText = await notificationResponse.text();
// 			console.log('Notification API response body:', responseText);

// 			if (!notificationResponse.ok) {
// 				throw new Error(`Failed to send notification: ${responseText}`);
// 			}

// 			console.log('Message sent successfully');
// 		} catch (error) {
// 			console.error('Operation failed:', error);
// 			setError('Failed to connect with seller');
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	const handleReportSubmit = async (reason: string, description: string) => {
// 		try {
// 			console.log('Report submitted:', { reason, description, productId: id });
// 		} catch (error) {
// 			console.error('Failed to submit report:', error);
// 			setError('Failed to submit report');
// 		}
// 	};

// 	if (isLoading || loading) return <LoadingState />;
// 	if (error || !product) return <ErrorState error={error} />;
// 	if (!user) return null;

// 	const tabContents = [
// 		{
// 			label: 'Overview',
// 			icon: Info,
// 			content: (
// 				<div className='space-y-6'>
// 					<p className='text-lg text-slate-300 leading-relaxed'>
// 						{product.description}
// 					</p>

// 					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
// 						<div className='p-6 rounded-xl bg-slate-700/50 border border-slate-600'>
// 							<h3 className='text-xl font-semibold mb-4 flex items-center gap-2 text-white'>
// 								<Award className='text-amber-500' />
// 								Ad Details
// 							</h3>
// 							<div className='space-y-4 text-slate-300'>
// 								<div className='flex items-center justify-between'>
// 									<span className='flex items-center gap-2'>
// 										<DollarSign className='w-4 h-4 text-green-400' />
// 										Cost per View
// 									</span>
// 									<span>{product.costPerView || 'N/A'}</span>
// 								</div>
// 								<div className='flex items-center justify-between'>
// 									<span className='flex items-center gap-2'>
// 										<Info className='w-4 h-4 text-blue-400' />
// 										Type
// 									</span>
// 									<span>{product.type}</span>
// 								</div>
// 								<div className='flex items-center justify-between'>
// 									<span className='flex items-center gap-2'>
// 										<Clock className='w-4 h-4 text-purple-400' />
// 										Published
// 									</span>
// 									<span>{product.publishDate || 'Not specified'}</span>
// 								</div>
// 								<div className='flex items-center justify-between'>
// 									<span className='flex items-center gap-2'>
// 										<Clock className='w-4 h-4 text-yellow-400' />
// 										Duration
// 									</span>
// 									<span>{product.numberOfDaysRunning || 'N/A'} days</span>
// 								</div>
// 							</div>
// 						</div>

// 						{product.adCampaignDetails && (
// 							<div className='p-6 rounded-xl bg-slate-700/50 border border-slate-600'>
// 								<h3 className='text-xl font-semibold mb-4 flex items-center gap-2 text-white'>
// 									<Target className='text-cyan-500' />
// 									Campaign
// 								</h3>
// 								<div className='space-y-4 text-slate-300'>
// 									<div className='flex items-center justify-between'>
// 										<span className='flex items-center gap-2'>
// 											<Zap className='w-4 h-4 text-yellow-400' />
// 											Objective
// 										</span>
// 										<span>{product.adCampaignDetails.objective}</span>
// 									</div>
// 									<div className='flex items-center justify-between'>
// 										<span className='flex items-center gap-2'>
// 											<UsersIcon className='w-4 h-4 text-pink-400' />
// 											Platform
// 										</span>
// 										<span>{product.adCampaignDetails.platform}</span>
// 									</div>
// 									<div className='flex items-center justify-between'>
// 										<span className='flex items-center gap-2'>
// 											<TrendingUp className='w-4 h-4 text-green-400' />
// 											Budget
// 										</span>
// 										<span>{product.adCampaignDetails.budget}</span>
// 									</div>
// 									<div className='flex items-center justify-between'>
// 										<span className='flex items-center gap-2'>
// 											<Calendar className='w-4 h-4 text-blue-400' />
// 											Timeline
// 										</span>
// 										<span>
// 											{product.adCampaignDetails.startDate} -{' '}
// 											{product.adCampaignDetails.endDate}
// 										</span>
// 									</div>
// 								</div>
// 							</div>
// 						)}
// 					</div>

// 					<div className='p-6 rounded-xl bg-slate-700/50 border border-slate-600 mt-6'>
// 						<h3 className='text-xl font-semibold mb-4 flex items-center gap-2 text-white'>
// 							<Target className='text-indigo-400' />
// 							Target Audience
// 						</h3>
// 						<p className='text-slate-300'>
// 							{product.targetAudienceDescription ||
// 								'No specific audience defined'}
// 						</p>

// 						{product.targetAudience && product.targetAudience.length > 0 && (
// 							<div className='mt-4 flex flex-wrap gap-2'>
// 								{product.targetAudience.map((target, index) => (
// 									<span
// 										key={index}
// 										className='px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm'>
// 										{target}
// 									</span>
// 								))}
// 							</div>
// 						)}
// 					</div>

// 					{product.tags && product.tags.length > 0 && (
// 						<div className='mt-6'>
// 							<h3 className='text-lg font-medium mb-2 text-white'>Tags</h3>
// 							<div className='flex flex-wrap gap-2'>
// 								{product.tags.map((tag, index) => (
// 									<span
// 										key={index}
// 										className='px-3 py-1 bg-slate-600 text-slate-300 rounded-full text-sm'>
// 										{tag}
// 									</span>
// 								))}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			),
// 		},
// 		{
// 			label: 'Performance',
// 			icon: BarChart2,
// 			content: <PerformanceTab metrics={product.performanceMetrics} />,
// 		},
// 		{
// 			label: 'Demographics',
// 			icon: UsersIcon,
// 			content: <DemographicsTab metrics={product.performanceMetrics} />,
// 		},
// 		{
// 			label: 'Reviews',
// 			icon: MessageCircle,
// 			content: <ReviewsTab reviews={product.reviews} />,
// 		},
// 	];

// 	return (
// 		<div className='flex h-screen bg-slate-800/70'>
// 			<AnimatePresence>
// 				{showReportModal && (
// 					<ReportAdModal
// 						isOpen={showReportModal}
// 						onClose={() => setShowReportModal(false)}
// 						onSubmit={handleReportSubmit}
// 					/>
// 				)}
// 			</AnimatePresence>

// 			<div className='flex-1 flex flex-col overflow-hidden'>
// 				<div className='p-4 border-b border-slate-700/50 bg-slate-800/90'>
// 					<div className='flex items-center justify-between'>
// 						<div className='flex items-center space-x-4'>
// 							<button
// 								onClick={() => router.back()}
// 								className='flex items-center text-slate-400 hover:text-white transition-colors'>
// 								<ChevronLeft className='w-5 h-5 mr-1' />
// 								Back
// 							</button>
// 							<h1 className='text-xl font-semibold text-white'>
// 								Product Details
// 							</h1>
// 						</div>
// 						<div className='flex items-center space-x-2'>
// 							<button className='p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50'>
// 								<Settings className='h-5 w-5' />
// 							</button>
// 							<button className='p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50'>
// 								<HelpCircle className='h-5 w-5' />
// 							</button>
// 						</div>
// 					</div>
// 				</div>

// 				<div className='flex-1 overflow-auto p-6'>
// 					<div className='max-w-7xl mx-auto'>
// 						<div className='flex flex-col lg:flex-row gap-8'>
// 							<div className='w-full lg:w-8/12'>
// 								<motion.div
// 									initial={{ opacity: 0, y: 20 }}
// 									animate={{ opacity: 1, y: 0 }}
// 									transition={{ duration: 0.5 }}
// 									className='relative aspect-video rounded-xl overflow-hidden bg-slate-700/50 border border-slate-600 flex items-center justify-center'>
// 									{product.adResourceUrl ? (
// 										<div className='w-full h-full'>
// 											<Image
// 												src={product.adResourceUrl}
// 												alt={product.title}
// 												layout='fill'
// 												objectFit='cover'
// 											/>
// 										</div>
// 									) : (
// 										<div className='text-slate-400 text-center p-4'>
// 											<ExternalLink className='w-16 h-16 mx-auto mb-2 opacity-50' />
// 											<p>Ad content preview not available</p>
// 										</div>
// 									)}

// 									<div className='absolute bottom-4 right-4 flex gap-2'>
// 										<button className='p-2 rounded-full bg-slate-800/70 hover:bg-slate-700/50 transition-colors'>
// 											<Download className='w-5 h-5 text-slate-300' />
// 										</button>
// 										<button className='p-2 rounded-full bg-slate-800/70 hover:bg-slate-700/50 transition-colors'>
// 											<ExternalLink className='w-5 h-5 text-slate-300' />
// 										</button>
// 									</div>
// 								</motion.div>

// 								<motion.div
// 									initial={{ opacity: 0, y: 20 }}
// 									animate={{ opacity: 1, y: 0 }}
// 									transition={{ duration: 0.5, delay: 0.1 }}
// 									className='mt-6'>
// 									<div className='flex justify-between items-center'>
// 										<h1 className='text-2xl font-bold text-white'>
// 											{product.title}
// 										</h1>
// 										<div className='flex items-center gap-2'>
// 											{isCurrentUserPublisher && (
// 												<button
// 													onClick={handleTogglePublish}
// 													disabled={isSubmitting}
// 													className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
// 														isPublished
// 															? 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30'
// 															: 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
// 													}`}>
// 													{isSubmitting
// 														? 'Processing...'
// 														: isPublished
// 															? 'Unpublish'
// 															: 'Publish'}
// 												</button>
// 											)}

// 											<button
// 												onClick={() => setIsLiked(!isLiked)}
// 												className='p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors'>
// 												<Heart
// 													className={`w-5 h-5 ${
// 														isLiked
// 															? 'fill-red-500 text-red-500'
// 															: 'text-slate-400'
// 													}`}
// 												/>
// 											</button>

// 											<button
// 												onClick={() => setShowReportModal(true)}
// 												className='p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors'>
// 												<Flag className='w-5 h-5 text-slate-400' />
// 											</button>

// 											<button className='p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors'>
// 												<Share2 className='w-5 h-5 text-slate-400' />
// 											</button>
// 										</div>
// 									</div>

// 									<div className='flex items-center mt-3 gap-4'>
// 										<OnlineStatus
// 											isOnline={product.isOnline || false}
// 											isOwner={false}
// 											resourceId={product.id}
// 											resourceType='product'
// 										/>
// 										<div className='flex items-center text-slate-300'>
// 											<Star className='w-5 h-5 text-yellow-400 fill-current' />
// 											<span className='ml-1'>{product.rating || '4.5'}</span>
// 										</div>
// 										<div className='flex items-center text-slate-400'>
// 											<Eye className='w-5 h-5' />
// 											<span className='ml-1'>
// 												{product.totalViews || '1,432'} views
// 											</span>
// 										</div>
// 									</div>
// 								</motion.div>

// 								<TabSystem tabs={tabContents} />
// 							</div>

// 							<div className='w-full lg:w-4/12'>
// 								<motion.div
// 									initial={{ opacity: 0, y: 20 }}
// 									animate={{ opacity: 1, y: 0 }}
// 									transition={{ duration: 0.5, delay: 0.2 }}
// 									className='p-6 rounded-xl bg-slate-700/50 border border-slate-600 sticky top-6'>
// 									<div className='flex items-center gap-4 mb-4'>
// 										<div className='w-16 h-16 rounded-full overflow-hidden bg-slate-600'>
// 											{product.publisher?.logoUrl ? (
// 												<Image
// 													src={product.publisher.logoUrl}
// 													alt={product.publisher.name}
// 													width={64}
// 													height={64}
// 													className='object-cover'
// 												/>
// 											) : (
// 												<User className='w-16 h-16 p-4 text-slate-400' />
// 											)}
// 										</div>
// 										<div>
// 											<h3 className='text-xl font-semibold text-white'>
// 												{product.publisher?.name}
// 											</h3>
// 											<div className='flex items-center text-slate-400 text-sm mt-1'>
// 												<MapPin className='w-4 h-4 mr-1' />
// 												{product.publisher?.location ||
// 													'Location not specified'}
// 											</div>
// 										</div>
// 									</div>

// 									{product.publisher?.bio && (
// 										<p className='text-slate-300 mb-4'>
// 											{product.publisher.bio}
// 										</p>
// 									)}

// 									<div className='grid grid-cols-2 gap-4 mb-6'>
// 										<div className='text-center p-3 bg-slate-700 rounded-lg'>
// 											<div className='text-xl font-bold text-white'>
// 												{product.publisher?.totalAds || '0'}
// 											</div>
// 											<div className='text-slate-400 text-sm'>Total Ads</div>
// 										</div>
// 										<div className='text-center p-3 bg-slate-700 rounded-lg'>
// 											<div className='text-xl font-bold flex items-center justify-center text-white'>
// 												{product.publisher?.rating || '4.5'}
// 												<Star className='w-4 h-4 text-yellow-400 fill-current ml-1' />
// 											</div>
// 											<div className='text-slate-400 text-sm'>Rating</div>
// 										</div>
// 									</div>

// 									<SocialLinks links={product.publisher?.socialLinks} />

// 									<div className='mt-6 space-y-3'>
// 										<button
// 											onClick={handleSendMessage}
// 											disabled={isSubmitting}
// 											className='w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center justify-center gap-2 text-white'>
// 											<Send className='w-5 h-5' />
// 											Contact Publisher
// 										</button>

// 										<a
// 											href={`/publisher/${product.publisher?.id}`}
// 											className='w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2 text-white'>
// 											<User className='w-5 h-5' />
// 											View Profile
// 										</a>
// 									</div>
// 								</motion.div>

// 								{product.relatedAds && product.relatedAds.length > 0 && (
// 									<motion.div
// 										initial={{ opacity: 0, y: 20 }}
// 										animate={{ opacity: 1, y: 0 }}
// 										transition={{ duration: 0.5, delay: 0.3 }}
// 										className='mt-6 p-6 rounded-xl bg-slate-700/50 border border-slate-600'>
// 										<h3 className='text-xl font-semibold mb-4 text-white'>
// 											Related Ads
// 										</h3>
// 										<div className='space-y-4'>
// 											{product.relatedAds.map((ad) => (
// 												<Link
// 													key={ad.id}
// 													href={`/product/${ad.id}`}
// 													className='block p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors'>
// 													<div className='flex items-center gap-3'>
// 														<div className='w-12 h-12 rounded-md bg-slate-600 overflow-hidden flex-shrink-0'>
// 															{ad.thumbnailUrl ? (
// 																<Image
// 																	src={ad.thumbnailUrl}
// 																	alt={ad.title}
// 																	width={48}
// 																	height={48}
// 																	className='object-cover'
// 																/>
// 															) : (
// 																<div className='w-full h-full flex items-center justify-center'>
// 																	<ExternalLink className='w-6 h-6 opacity-50 text-slate-400' />
// 																</div>
// 															)}
// 														</div>
// 														<div className='flex-1 min-w-0'>
// 															<h4 className='font-medium text-white truncate'>
// 																{ad.title}
// 															</h4>
// 														</div>
// 													</div>
// 												</Link>
// 											))}
// 										</div>
// 									</motion.div>
// 								)}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ProductDetailsPage;
