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
