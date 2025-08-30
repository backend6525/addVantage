'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Twitter,
	Linkedin,
	Instagram,
	Youtube,
	Facebook,
	ChevronLeft,
	Share2,
	Star,
	Clock,
	BarChart2,
	Target,
	User,
	Heart,
	ExternalLink,
	Award,
	MessageCircle,
	Info,
	MapPin,
	DollarSign,
	Zap,
	Users as UsersIcon,
	TrendingUp,
	Flag,
	Send,
	Eye,
	Download,
	ArrowUpRight,
	Calendar,
	Settings,
	HelpCircle,
	Play,
	Pause,
	Volume2,
	Maximize,
	Copy,
	Check,
	Bookmark,
	BookmarkCheck,
	Shield,
	Verified,
	Bell,
	BellOff,
	ThumbsUp,
	ThumbsDown,
	MoreVertical,
	Filter,
	SortDesc,
	Search,
} from 'lucide-react';

// User interface to match your API response
interface UserData {
	id: string;
	_id: string;
	kindeId: string;
	convexId: string;
	email: string;
	given_name: string;
	family_name: string;
	name: string;
	picture: string;
	roles: string[];
	dailyAdCount: number;
	weeklyAdCount: number;
	dailyAdLimit: number;
	weeklyAdLimit: number;
	credits: number;
	accountType: 'free' | 'premium' | 'pro';
	hasCredits: boolean;
	onboardingCompleted: boolean;
	lastLimitReset: string;
}

interface ProductDetails {
	id: string;
	title: string;
	description: string;
	adResourceUrl: string;
	type: string;
	costPerView: string;
	publishDate: string;
	numberOfDaysRunning: number;
	rating: number;
	totalViews: number;
	isOnline: boolean;
	isPublished: boolean;
	targetAudienceDescription: string;
	targetAudience: string[];
	tags: string[];
	adCampaignDetails: {
		objective: string;
		platform: string;
		budget: string;
		startDate: string;
		endDate: string;
		status: string;
	};
	performanceMetrics: {
		impressions: number;
		clicks: number;
		conversions: number;
		ctr: number;
		conversionRate: number;
		costPerClick: number;
		costPerConversion: number;
		reach: number;
		engagement: number;
	};
	publisher: {
		id: string;
		name: string;
		email: string;
		location: string;
		logoUrl: string;
		totalAds: number;
		rating: number;
		verified: boolean;
		bio: string;
		socialLinks: Array<{ platform: string; url: string }>;
	};
	reviews: Array<{
		id: number;
		user: string;
		rating: number;
		comment: string;
		date: string;
	}>;
	relatedAds: Array<{
		id: string;
		title: string;
		thumbnailUrl: string;
	}>;
	createdBy: string;
}

const LoadingState = () => (
	<div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center'>
		<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500'></div>
	</div>
);

const ErrorState = ({ error }: { error: string | null }) => (
	<div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center'>
		<div className='text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700/30'>
			<div className='text-red-400 text-2xl mb-4'>⚠️</div>
			<h2 className='text-xl font-semibold text-white mb-2'>
				Something went wrong
			</h2>
			<p className='text-slate-300 mb-4'>
				{error || 'An unexpected error occurred'}
			</p>
			<button
				onClick={() => window.location.reload()}
				className='px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors'>
				Try Again
			</button>
		</div>
	</div>
);

// Fixed MetricCard component with optional change prop
const MetricCard = ({
	icon: Icon,
	label,
	value,
	change,
	color = 'blue',
}: {
	icon: any;
	label: any;
	value: any;
	change?: any;
	color?: string;
}) => {
	const colorClasses = {
		blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300',
		green:
			'from-green-500/20 to-green-600/20 border-green-500/30 text-green-300',
		purple:
			'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-300',
		orange:
			'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-300',
	};

	return (
		<motion.div
			whileHover={{ scale: 1.02, y: -2 }}
			className={`p-6 rounded-xl bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-sm`}>
			<div className='flex items-center justify-between mb-2'>
				<Icon className='w-6 h-6' />
				{change !== undefined && (
					<span
						className={`text-xs px-2 py-1 rounded-full ${change > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
						{change > 0 ? '+' : ''}
						{change}%
					</span>
				)}
			</div>
			<div className='text-2xl font-bold text-white mb-1'>{value}</div>
			<div className='text-sm opacity-80'>{label}</div>
		</motion.div>
	);
};

const TabButton = ({
	active,
	onClick,
	icon: Icon,
	children,
	count,
}: {
	active: boolean;
	onClick: () => void;
	icon: any;
	children: React.ReactNode;
	count?: number;
}) => (
	<button
		onClick={onClick}
		className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
			active
				? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
				: 'text-slate-400 hover:text-white hover:bg-slate-700/50'
		}`}>
		<Icon className='w-4 h-4' />
		{children}
		{count !== undefined && (
			<span className='text-xs bg-slate-600 px-2 py-1 rounded-full'>
				{count}
			</span>
		)}
	</button>
);

const ReviewCard = ({
	review,
}: {
	review: {
		id: number;
		user: string;
		rating: number;
		comment: string;
		date: string;
	};
}) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		className='p-4 bg-slate-700/30 rounded-xl border border-slate-600/30'>
		<div className='flex items-start justify-between mb-3'>
			<div className='flex items-center gap-3'>
				<div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold'>
					{review.user.charAt(0)}
				</div>
				<div>
					<div className='font-medium text-white'>{review.user}</div>
					<div className='text-sm text-slate-400'>{review.date}</div>
				</div>
			</div>
			<div className='flex items-center gap-1'>
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`}
					/>
				))}
			</div>
		</div>
		<p className='text-slate-300'>{review.comment}</p>
		<div className='flex items-center gap-4 mt-3 pt-3 border-t border-slate-600/30'>
			<button className='flex items-center gap-1 text-sm text-slate-400 hover:text-white'>
				<ThumbsUp className='w-4 h-4' />
				Helpful
			</button>
			<button className='flex items-center gap-1 text-sm text-slate-400 hover:text-white'>
				<Flag className='w-4 h-4' />
				Report
			</button>
		</div>
	</motion.div>
);

const OnlineStatus = ({
	isOnline,
	isOwner,
	resourceId,
	resourceType,
}: {
	isOnline: boolean;
	isOwner: boolean;
	resourceId: string;
	resourceType: string;
}) => (
	<div className='flex items-center'>
		<div
			className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}
		/>
		<span className='text-sm text-slate-400'>
			{isOnline ? 'Online' : 'Offline'}
		</span>
	</div>
);

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const [product, setProduct] = useState<ProductDetails | null>(null);
	const [user, setUser] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const [userLoading, setUserLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState('overview');
	const [isLiked, setIsLiked] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isPublished, setIsPublished] = useState(false);
	const [isCurrentUserPublisher, setIsCurrentUserPublisher] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);
	const [showReportModal, setShowReportModal] = useState(false);
	const [copySuccess, setCopySuccess] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [publisherData, setPublisherData] = useState(null);
	const [publisherLoading, setPublisherLoading] = useState(false);
	const [publisherError, setPublisherError] = useState(null);
	const router = useRouter();

	// Fetch user data from your API
	useEffect(() => {
		const fetchUser = async () => {
			try {
				setUserLoading(true);
				console.log('Fetching user data from API...');

				const response = await fetch('/api/auth/user');

				if (!response.ok) {
					if (response.status === 404) {
						console.log('User not found in session, redirecting to signin');
						router.push('/auth/signin');
						return;
					}
					throw new Error(`Failed to fetch user: ${response.status}`);
				}

				const userData: UserData = await response.json();
				console.log('User data fetched successfully:', userData);

				setUser(userData);
			} catch (err) {
				console.error('Error fetching user:', err);
				setError(
					err instanceof Error ? err.message : 'Failed to fetch user data'
				);

				// If there's an auth error, redirect to signin
				if (err instanceof Error && err.message.includes('404')) {
					router.push('/auth/signin');
				}
			} finally {
				setUserLoading(false);
			}
		};

		// Fetch user data immediately on component mount
		fetchUser();
	}, [router]);

	useEffect(() => {
		const handleError = (error: ErrorEvent) => {
			console.error('Global error:', error);
			setError('An unexpected error occurred');
		};

		window.addEventListener('error', handleError);
		return () => window.removeEventListener('error', handleError);
	}, []);

	// First define the fetchPublisherData function BEFORE the useEffect
	const fetchPublisherData = async (adId: string) => {
		try {
			setPublisherLoading(true);
			setPublisherError(null);

			const response = await fetch(`/api/publisher?adId=${adId}`);

			if (!response.ok) {
				if (response.status === 404) {
					console.log('Publisher not found or ad not published');
					return null;
				}
				throw new Error(`Failed to fetch publisher: ${response.status}`);
			}

			const publisher = await response.json();
			console.log('This is the response:', publisher);
			setPublisherData(publisher);
			return publisher;
		} catch (err) {
			console.error('Error fetching publisher:', err);
			setPublisherError(err instanceof Error ? err.message : 'Unknown error');
			return null;
		} finally {
			setPublisherLoading(false);
		}
	};

	// Then the corrected useEffect
	useEffect(() => {
		const fetchProductDetails = async () => {
			if (!user?.email) return;

			try {
				setLoading(true);
				console.log('Fetching product details...');

				const response = await fetch(
					`/api/product?id=${id}&email=${encodeURIComponent(user.email)}`
				);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.error || `HTTP error! status: ${response.status}`
					);
				}

				const data = await response.json();
				console.log('Product details fetched successfully:', data);

				// Fetch actual publisher data using the ad ID
				let publisher = await fetchPublisherData(data.id);

				// Fallback to mock data if API fails or ad is not published
				if (!publisher) {
					console.log('Using fallback publisher data');
					publisher = {
						id: data.createdBy || 'unknown',
						name: data.createdBy || 'Unknown Publisher',
						email: data.createdBy || '',
						location: 'Unknown Location',
						logoUrl: user.picture || '/api/placeholder/64/64',
						totalAds: 0,
						rating: 0,
						verified: false,
						bio: 'Publisher information unavailable',
						socialLinks: [],
					};
				}

				// Enhanced data with fallback values
				const enhancedData: ProductDetails = {
					...data,
					totalViews: data.totalViews || 0,
					rating: data.rating || 0,
					publisher: publisher,
					targetAudienceDescription:
						data.targetAudienceDescription ||
						'Tech-savvy professionals aged 25-45 with interests in digital innovation and early adoption of new technologies.',
					tags: [...(data.tags || []), 'High ROI', 'Tech', 'Innovation'],
					adCampaignDetails: {
						...(data.adCampaignDetails || {}),
						startDate: data.adCampaignDetails?.startDate || '2025-03-01',
						endDate: data.adCampaignDetails?.endDate || '2025-05-01',
						status: data.adCampaignDetails?.status || 'Active',
					},
					performanceMetrics: data.performanceMetrics || {
						impressions: 0,
						clicks: 0,
						conversions: 0,
						ctr: 0,
						conversionRate: 0,
						costPerClick: 0,
						costPerConversion: 0,
						reach: 0,
						engagement: 0,
					},
					reviews: data.reviews || [],
					relatedAds: data.relatedAds || [],
					isOnline: data.isOnline || false,
					isPublished: data.isPublished || false,
					targetAudience: data.targetAudience || [],
					description: data.description || 'No description available',
					type: data.type || 'Unknown Type',
					costPerView: data.costPerView || 'N/A',
					publishDate: data.publishDate || 'Not specified',
					numberOfDaysRunning: data.numberOfDaysRunning || 0,
				};

				setProduct(enhancedData);
				setIsPublished(enhancedData.isPublished || false);
				setIsCurrentUserPublisher(user.email === data.createdBy);
			} catch (err) {
				console.error('Error fetching product details:', err);
				setError(
					err instanceof Error ? err.message : 'An unexpected error occurred'
				);
			} finally {
				setLoading(false);
			}
		};

		// Only fetch product details if we have user data
		if (user) {
			fetchProductDetails();
		}
	}, [id, user]);

	const handleTogglePublish = async () => {
		try {
			setIsSubmitting(true);
			const response = await fetch(`/api/product/${id}/toggle-publish`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ isPublished: !isPublished }),
			});

			if (!response.ok) {
				throw new Error('Failed to toggle publish status');
			}

			const updatedProduct = await response.json();
			setIsPublished(updatedProduct.isPublished);
			setProduct((prev) =>
				prev ? { ...prev, isPublished: updatedProduct.isPublished } : null
			);
		} catch (error) {
			console.error('Error toggling publish status:', error);
			setError('Failed to update publish status');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSendMessage = async () => {
		if (!user || !product) return;

		try {
			setIsSubmitting(true);
			console.log('Starting handleSendMessage with user data:', user);

			const notificationData = {
				type: 'new_message',
				message: `Someone is interested in your listing "${product.title}"`,
				adId: product.id,
				requesterId: user._id || user.convexId,
				status: 'pending',
				action: 'create',
			};

			console.log('Sending notification data:', notificationData);
			console.log('Publisher ID (recipient):', product.publisher?.id);

			const notificationResponse = await fetch('/api/notifications', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-user-email': product.publisher?.email || '',
				},
				body: JSON.stringify(notificationData),
			});

			console.log(
				'Notification API response status:',
				notificationResponse.status
			);

			const responseText = await notificationResponse.text();
			console.log('Notification API response body:', responseText);

			if (!notificationResponse.ok) {
				throw new Error(`Failed to send notification: ${responseText}`);
			}

			console.log('Message sent successfully');
		} catch (error) {
			console.error('Operation failed:', error);
			setError('Failed to connect with seller');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleReportSubmit = async (reason: string, description: string) => {
		try {
			console.log('Report submitted:', { reason, description, productId: id });
			// TODO: Implement actual report submission to your API
		} catch (error) {
			console.error('Failed to submit report:', error);
			setError('Failed to submit report');
		}
	};

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopySuccess(true);
			setTimeout(() => setCopySuccess(false), 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: Info, count: null },
		{ id: 'performance', label: 'Analytics', icon: BarChart2, count: '8' },
		{ id: 'demographics', label: 'Audience', icon: UsersIcon, count: null },
		{
			id: 'reviews',
			label: 'Reviews',
			icon: MessageCircle,
			count: product?.reviews?.length,
		},
	];

	const renderTabContent = () => {
		if (!product) return null;

		switch (activeTab) {
			case 'overview':
				return (
					<div className='space-y-8'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className='prose prose-invert max-w-none'>
							<p className='text-lg text-slate-300 leading-relaxed mb-6'>
								{product.description}
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							<MetricCard
								icon={DollarSign}
								label='Cost per View'
								value={product.costPerView}
								color='green'
							/>
							<MetricCard
								icon={Clock}
								label='Days Running'
								value={`${product.numberOfDaysRunning}`}
								color='blue'
							/>
							<MetricCard
								icon={Eye}
								label='Total Views'
								value={(product.totalViews ?? 0).toLocaleString()}
								change={15}
								color='purple'
							/>
						</div>

						{product.adCampaignDetails && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
								className='p-8 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 backdrop-blur-sm'>
								<h3 className='text-2xl font-bold mb-6 flex items-center gap-3 text-white'>
									<Target className='text-cyan-400' />
									Campaign Details
								</h3>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									{Object.entries(product.adCampaignDetails).map(
										([key, value]) => (
											<div
												key={key}
												className='flex items-center justify-between p-4 bg-slate-700/30 rounded-xl'>
												<span className='capitalize text-slate-300 font-medium'>
													{key.replace(/([A-Z])/g, ' $1').trim()}
												</span>
												<span className='text-white font-semibold'>
													{value}
												</span>
											</div>
										)
									)}
								</div>
							</motion.div>
						)}

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className='p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20'>
							<h3 className='text-2xl font-bold mb-4 flex items-center gap-3 text-white'>
								<Target className='text-indigo-400' />
								Target Audience
							</h3>
							<p className='text-slate-300 mb-6'>
								{product.targetAudienceDescription}
							</p>
							<div className='flex flex-wrap gap-3'>
								{product.targetAudience.map((target, index) => (
									<span
										key={index}
										className='px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30'>
										{target}
									</span>
								))}
							</div>
						</motion.div>
					</div>
				);

			case 'performance':
				return (
					<div className='space-y-8'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							<MetricCard
								icon={Eye}
								label='Impressions'
								value={(
									product.performanceMetrics?.impressions ?? 0
								).toLocaleString()}
								change={8}
								color='blue'
							/>
							<MetricCard
								icon={TrendingUp}
								label='Click Rate'
								value={`${product.performanceMetrics?.ctr ?? 0}%`}
								change={12}
								color='green'
							/>
							<MetricCard
								icon={Target}
								label='Conversion Rate'
								value={`${product.performanceMetrics?.conversionRate ?? 0}%`}
								change={-3}
								color='purple'
							/>
							<MetricCard
								icon={DollarSign}
								label='Cost per Click'
								value={`$${product.performanceMetrics?.costPerClick ?? 0}`}
								change={-8}
								color='green'
							/>
							<MetricCard
								icon={UsersIcon}
								label='Reach'
								value={(
									product.performanceMetrics?.reach ?? 0
								).toLocaleString()}
								change={15}
								color='orange'
							/>
							<MetricCard
								icon={Heart}
								label='Engagement'
								value={(
									product.performanceMetrics?.engagement ?? 0
								).toLocaleString()}
								change={22}
								color='purple'
							/>
						</div>
					</div>
				);

			case 'demographics':
				return (
					<div className='space-y-6'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className='p-6 rounded-2xl bg-slate-700/30 border border-slate-600/30'>
							<h3 className='text-xl font-bold text-white mb-4'>
								Audience Insights
							</h3>
							<p className='text-slate-300'>
								Detailed demographic data will be displayed here once analytics
								are fully implemented.
							</p>
						</motion.div>
					</div>
				);

			case 'reviews':
				return (
					<div className='space-y-6'>
						<div className='flex items-center justify-between'>
							<h3 className='text-xl font-bold text-white'>
								Reviews & Feedback
							</h3>
							<div className='flex items-center gap-2'>
								<button className='px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors'>
									<Filter className='w-4 h-4 inline mr-2' />
									Filter
								</button>
								<button className='px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors'>
									<SortDesc className='w-4 h-4 inline mr-2' />
									Sort
								</button>
							</div>
						</div>

						<div className='space-y-4'>
							{product.reviews?.map((review) => (
								<ReviewCard key={review.id} review={review} />
							))}
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	// Show loading state while user data is loading
	// if (userLoading || loading) return <LoadingState />;
	if (userLoading || loading || publisherLoading) return <LoadingState />;

	// Show error state if there's an error or missing data
	if (error || !product || !user) return <ErrorState error={error} />;

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
			{/* Fixed Header - Removed account info and settings */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='sticky top-16 z-50 p-4 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50'>
				<div className='max-w-7xl mx-auto flex items-center justify-between'>
					<div className='flex items-center space-x-4'>
						<motion.button
							whileHover={{ x: -2 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => router.back()}
							className='flex items-center text-slate-400 hover:text-white transition-all duration-200 group'>
							<ChevronLeft className='w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform' />
							Back to Browse
						</motion.button>
						<div className='h-6 w-px bg-slate-700' />
						<h1 className='text-xl font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent'>
							Product Details
						</h1>
					</div>
					{/* Removed account info and settings from header */}
				</div>
			</motion.div>

			<div className='max-w-7xl mx-auto p-20'>
				<div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
					{/* Main Content */}
					<div className='xl:col-span-2 space-y-8'>
						{/* Enhanced Media Section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className='relative group'>
							<div className='aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 backdrop-blur-sm'>
								{product.adResourceUrl ? (
									<img
										src={product.adResourceUrl}
										alt={product.title}
										className='w-full h-full object-cover'
									/>
								) : (
									<div className='w-full h-full flex items-center justify-center text-slate-400'>
										<ExternalLink className='w-16 h-16 opacity-50' />
										<p>Ad content preview not available</p>
									</div>
								)}

								{/* Media Controls Overlay */}
								<div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'>
									<div className='flex items-center gap-4'>
										<motion.button
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											onClick={() => setIsPlaying(!isPlaying)}
											className='p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors'>
											{isPlaying ? (
												<Pause className='w-6 h-6' />
											) : (
												<Play className='w-6 h-6' />
											)}
										</motion.button>
									</div>
								</div>

								{/* Action Buttons */}
								<div className='absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className='p-2 bg-slate-900/70 backdrop-blur-sm rounded-full text-white hover:bg-slate-800/70 transition-colors'>
										<Download className='w-4 h-4' />
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className='p-2 bg-slate-900/70 backdrop-blur-sm rounded-full text-white hover:bg-slate-800/70 transition-colors'>
										<Maximize className='w-4 h-4' />
									</motion.button>
								</div>

								{/* Status Badge */}
								<div className='absolute top-4 left-4'>
									<OnlineStatus
										isOnline={product.isOnline || false}
										isOwner={isCurrentUserPublisher}
										resourceId={product.id}
										resourceType='product'
									/>
								</div>
							</div>
						</motion.div>

						{/* Enhanced Title & Actions */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className='space-y-4'>
							<div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
								<div className='space-y-2'>
									<h1 className='text-3xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent'>
										{product.title}
									</h1>
									<div className='flex items-center gap-4 text-sm'>
										<div className='flex items-center gap-1 text-yellow-400'>
											<Star className='w-4 h-4 fill-current' />
											<span className='font-medium'>{product.rating ?? 0}</span>
										</div>
										<div className='flex items-center gap-1 text-slate-400'>
											<Eye className='w-4 h-4' />
											<span>
												{(product.totalViews ?? 0).toLocaleString()} views
											</span>
										</div>
										<div className='flex items-center gap-1 text-slate-400'>
											<Clock className='w-4 h-4' />
											<span>
												Published {product.publishDate || 'Not specified'}
											</span>
										</div>
									</div>
								</div>

								{/* Enhanced Action Buttons */}
								<div className='flex items-center gap-2'>
									{isCurrentUserPublisher && (
										<motion.button
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={handleTogglePublish}
											disabled={isSubmitting}
											className={`px-3 py-2 rounded-xl transition-all duration-200 ${
												isPublished
													? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
													: 'bg-green-500/20 text-green-300 border border-green-500/30'
											}`}>
											{isSubmitting
												? 'Processing...'
												: isPublished
													? 'Unpublish'
													: 'Publish'}
										</motion.button>
									)}

									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => setIsLiked(!isLiked)}
										className={`p-3 rounded-xl transition-all duration-200 ${
											isLiked
												? 'bg-red-500/20 text-red-400 border border-red-500/30'
												: 'bg-slate-700/50 text-slate-400 hover:text-white border border-slate-600/30'
										}`}>
										<Heart
											className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
										/>
									</motion.button>

									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => setIsBookmarked(!isBookmarked)}
										className={`p-3 rounded-xl transition-all duration-200 ${
											isBookmarked
												? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
												: 'bg-slate-700/50 text-slate-400 hover:text-white border border-slate-600/30'
										}`}>
										{isBookmarked ? (
											<BookmarkCheck className='w-5 h-5' />
										) : (
											<Bookmark className='w-5 h-5' />
										)}
									</motion.button>

									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => setShowShareModal(true)}
										className='p-3 rounded-xl bg-slate-700/50 text-slate-400 hover:text-white border border-slate-600/30 transition-all duration-200'>
										<Share2 className='w-5 h-5' />
									</motion.button>

									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => setShowReportModal(true)}
										className='p-3 rounded-xl bg-slate-700/50 text-slate-400 hover:text-white border border-slate-600/30 transition-all duration-200'>
										<Flag className='w-5 h-5' />
									</motion.button>
								</div>
							</div>

							{/* Tags */}
							<div className='flex flex-wrap gap-2'>
								{product.tags?.map((tag, index) => (
									<motion.span
										key={index}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: index * 0.1 }}
										className='px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-slate-300 rounded-full text-sm font-medium border border-purple-500/20 backdrop-blur-sm'>
										{tag}
									</motion.span>
								))}
							</div>
						</motion.div>

						{/* Enhanced Tab System */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className='space-y-6'>
							<div className='flex gap-2 p-2 bg-slate-800/50 rounded-2xl border border-slate-700/30 backdrop-blur-sm overflow-x-auto'>
								{tabs.map((tab) => (
									<TabButton
										key={tab.id}
										active={activeTab === tab.id}
										onClick={() => setActiveTab(tab.id)}
										icon={tab.icon}
										count={
											typeof tab.count === 'number' ? tab.count : undefined
										}>
										{tab.label}
									</TabButton>
								))}
							</div>

							<motion.div
								key={activeTab}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className='min-h-[400px]'>
								{renderTabContent()}
							</motion.div>
						</motion.div>
					</div>

					{/* Enhanced Sidebar */}
					<div className='space-y-6'>
						{/* Publisher Card - Added account info and settings */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
							className='p-8 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 backdrop-blur-sm'>
							{/* Publisher Quick Info Section */}
							{(() => {
								const displayPublisher = publisherData || product.publisher;
								const hasRealPublisherData = !!publisherData;

								return (
									displayPublisher && (
										<div className='flex items-center justify-between mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50'>
											<div className='flex items-center gap-3'>
												<div className='w-10 h-10 rounded-full overflow-hidden'>
													<img
														src={
															displayPublisher.logoUrl ||
															'/api/placeholder/40/40'
														}
														alt={displayPublisher.name}
														className='w-full h-full object-cover'
													/>
												</div>
												<div>
													<div className='text-sm text-slate-300 font-medium flex items-center gap-2'>
														{displayPublisher.name}
														{displayPublisher.verified && (
															<Verified className='w-3 h-3 text-blue-400' />
														)}
													</div>
													<div className='text-xs text-slate-500'>
														{hasRealPublisherData
															? 'Verified Publisher'
															: 'Publisher'}
													</div>
												</div>
											</div>
											<div className='flex items-center gap-2'>
												{hasRealPublisherData && (
													<div
														className='w-2 h-2 bg-green-400 rounded-full animate-pulse'
														title='Live publisher data'
													/>
												)}
												<motion.button
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													className='p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-700/50 transition-all'>
													<User className='h-4 w-4' />
												</motion.button>
											</div>
										</div>
									)
								);
							})()}

							{/* Publisher Loading State */}
							{publisherLoading && (
								<div className='flex items-center justify-center py-8'>
									<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500'></div>
									<span className='ml-3 text-slate-300'>
										Loading publisher info...
									</span>
								</div>
							)}

							{/* Publisher Content */}
							{!publisherLoading && (
								<>
									{/* Publisher Info with fallback display logic */}
									{(() => {
										const displayPublisher = publisherData || product.publisher;
										const hasRealPublisherData = !!publisherData;

										return (
											<>
												<div className='flex items-center gap-4 mb-6'>
													<div className='relative'>
														{/* <div className='w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 p-0.5'>
															{displayPublisher?.logoUrl ? (
																<img
																	src={displayPublisher.logoUrl}
																	alt={displayPublisher.name}
																	className='w-full h-full object-cover rounded-2xl'
																/>
															) : (
																<User className='w-full h-full p-4 text-slate-400' />
															)}
														</div> */}
														{displayPublisher?.verified && (
															<div className='absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
																<Verified className='w-4 h-4 text-white' />
															</div>
														)}
														{!hasRealPublisherData && (
															<div
																className='absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center'
																title='Limited publisher info available'>
																<HelpCircle className='w-3 h-3 text-white' />
															</div>
														)}
													</div>
													<div className='flex-1'>
														<h3 className='text-xl font-bold text-white flex items-center gap-2'>
															{/* {displayPublisher?.name} */}
															{!hasRealPublisherData && (
																<span className='text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full border border-yellow-400/20'>
																	Limited Info
																</span>
															)}
														</h3>
														<div className='flex items-center text-slate-400 text-sm mt-1 gap-2'>
															<MapPin className='w-4 h-4' />
															{displayPublisher?.location ||
																'Location not specified'}
														</div>
													</div>
												</div>

												<p className='text-slate-300 mb-6 text-sm leading-relaxed'>
													{displayPublisher?.bio || 'No bio available'}
												</p>

												{/* Stats Grid */}
												<div className='grid grid-cols-2 gap-4 mb-6'>
													<div className='text-center p-4 bg-slate-700/30 rounded-xl border border-slate-600/20'>
														<div className='text-2xl font-bold text-white mb-1'>
															{displayPublisher?.totalAds || 0}
														</div>
														<div className='text-slate-400 text-sm'>
															{hasRealPublisherData
																? 'Published Ads'
																: 'Total Ads'}
														</div>
													</div>
													<div className='text-center p-4 bg-slate-700/30 rounded-xl border border-slate-600/20'>
														<div className='text-2xl font-bold flex items-center justify-center text-white mb-1'>
															{displayPublisher?.rating || 0}
															<Star className='w-4 h-4 text-yellow-400 fill-current ml-1' />
														</div>
														<div className='text-slate-400 text-sm'>Rating</div>
													</div>
												</div>

												{/* Social Links */}
												{displayPublisher?.socialLinks &&
													displayPublisher.socialLinks.length > 0 && (
														<div className='flex justify-center gap-3 mb-6'>
															{displayPublisher.socialLinks.map(
																(link, index) => {
																	const getSocialIcon = (platform) => {
																		switch (platform.toLowerCase()) {
																			case 'twitter':
																				return Twitter;
																			case 'linkedin':
																				return Linkedin;
																			case 'instagram':
																				return Instagram;
																			case 'youtube':
																				return Youtube;
																			case 'facebook':
																				return Facebook;
																			default:
																				return ExternalLink;
																		}
																	};
																	const Icon = getSocialIcon(link.platform);
																	return (
																		<motion.a
																			key={index}
																			href={link.url}
																			target='_blank'
																			rel='noopener noreferrer'
																			whileHover={{ scale: 1.1, y: -2 }}
																			whileTap={{ scale: 0.9 }}
																			className='p-3 bg-slate-700/50 rounded-xl text-slate-400 hover:text-white transition-all duration-200 border border-slate-600/30'>
																			<Icon className='w-5 h-5' />
																		</motion.a>
																	);
																}
															)}
														</div>
													)}

												{/* Publisher Data Status Indicator */}
												{hasRealPublisherData && (
													<div className='flex items-center justify-center gap-2 mb-4 p-2 bg-green-500/10 rounded-lg border border-green-500/20'>
														<Verified className='w-4 h-4 text-green-400' />
														<span className='text-xs text-green-300'>
															Verified publisher information
														</span>
													</div>
												)}

												{publisherError && (
													<div className='flex items-center justify-center gap-2 mb-4 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20'>
														<HelpCircle className='w-4 h-4 text-yellow-400' />
														<span className='text-xs text-yellow-300'>
															Using limited publisher information
														</span>
													</div>
												)}
											</>
										);
									})()}
								</>
							)}

							{/* Action Buttons */}
							<div className='space-y-3'>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={handleSendMessage}
									disabled={isSubmitting || publisherLoading}
									className='w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 flex items-center justify-center gap-3 text-white font-semibold shadow-lg shadow-purple-500/25'>
									<Send className='w-5 h-5' />
									{isSubmitting
										? 'Processing...'
										: publisherLoading
											? 'Loading...'
											: 'Contact Publisher'}
								</motion.button>

								<div className='grid grid-cols-2 gap-3'>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setIsFollowing(!isFollowing)}
										disabled={publisherLoading}
										className={`py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
											isFollowing
												? 'bg-green-500/20 text-green-300 border border-green-500/30'
												: 'bg-slate-700/50 text-slate-300 hover:text-white border border-slate-600/30'
										}`}>
										{isFollowing ? (
											<BellOff className='w-4 h-4' />
										) : (
											<Bell className='w-4 h-4' />
										)}
										{isFollowing ? 'Following' : 'Follow'}
									</motion.button>

									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										disabled={publisherLoading}
										className='py-3 px-4 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-slate-300 hover:text-white font-medium border border-slate-600/30'>
										<User className='w-4 h-4' />
										Profile
									</motion.button>
								</div>
							</div>
						</motion.div>
						{/* Account Info Card - Made sticky */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4 }}
							className='p-6 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 backdrop-blur-sm sticky top-24'>
							<h3 className='text-lg font-semibold mb-4 flex items-center gap-2 text-white'>
								<Shield className='text-green-400' />
								Your Account
							</h3>
							<div className='space-y-3'>
								<div className='flex items-center justify-between p-3 bg-slate-700/30 rounded-xl'>
									<span className='text-slate-300'>Plan</span>
									<span
										className={`px-3 py-1 rounded-full text-sm font-medium ${
											user.accountType === 'premium'
												? 'bg-purple-500/20 text-purple-300'
												: 'bg-gray-500/20 text-gray-300'
										}`}>
										{user.accountType.toUpperCase()}
									</span>
								</div>
								<div className='flex items-center justify-between p-3 bg-slate-700/30 rounded-xl'>
									<span className='text-slate-300'>Credits</span>
									<span className='text-white font-semibold'>
										{user.credits}
									</span>
								</div>
								<div className='space-y-2'>
									<div className='flex justify-between text-sm'>
										<span className='text-slate-400'>Daily Usage</span>
										<span className='text-slate-300'>
											{user.dailyAdCount}/{user.dailyAdLimit}
										</span>
									</div>
									<div className='w-full bg-slate-700/50 rounded-full h-2'>
										<div
											className='bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500'
											style={{
												width: `${(user.dailyAdCount / user.dailyAdLimit) * 100}%`,
											}}
										/>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Related Ads */}
						{product.relatedAds && product.relatedAds.length > 0 && (
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5 }}
								className='p-6 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 backdrop-blur-sm'>
								<h3 className='text-lg font-semibold mb-4 text-white'>
									Similar Ads
								</h3>
								<div className='space-y-3'>
									{product.relatedAds.map((ad) => (
										<motion.div
											key={ad.id}
											whileHover={{ scale: 1.02, x: 4 }}
											onClick={() => router.push(`/product/${ad.id}`)}
											className='flex items-center gap-3 p-4 bg-slate-700/30 hover:bg-slate-600/30 rounded-xl transition-all duration-200 cursor-pointer border border-slate-600/20 hover:border-slate-500/30'>
											<div className='w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 overflow-hidden flex-shrink-0 border border-purple-500/20'>
												{ad.thumbnailUrl ? (
													<img
														src={ad.thumbnailUrl}
														alt={ad.title}
														className='w-full h-full object-cover'
													/>
												) : (
													<div className='w-full h-full flex items-center justify-center'>
														<ExternalLink className='w-6 h-6 text-purple-400' />
													</div>
												)}
											</div>
											<div className='flex-1 min-w-0'>
												<h4 className='font-medium text-white truncate mb-1'>
													{ad.title}
												</h4>
												<div className='flex items-center gap-2 text-xs text-slate-400'>
													<Star className='w-3 h-3 text-yellow-400 fill-current' />
													<span>4.2</span>
													<span>•</span>
													<span>1.2k views</span>
												</div>
											</div>
											<ArrowUpRight className='w-4 h-4 text-slate-400 flex-shrink-0' />
										</motion.div>
									))}
								</div>
							</motion.div>
						)}
					</div>
				</div>
			</div>

			{/* Share Modal */}
			<AnimatePresence>
				{showShareModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
						onClick={() => setShowShareModal(false)}>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className='bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700'
							onClick={(e) => e.stopPropagation()}>
							<h3 className='text-xl font-bold text-white mb-4'>
								Share this ad
							</h3>

							<div className='grid grid-cols-4 gap-3 mb-6'>
								{[
									{
										icon: Twitter,
										label: 'Twitter',
										color: 'hover:bg-blue-500/20',
									},
									{
										icon: Facebook,
										label: 'Facebook',
										color: 'hover:bg-blue-600/20',
									},
									{
										icon: Linkedin,
										label: 'LinkedIn',
										color: 'hover:bg-blue-700/20',
									},
									{
										icon: Instagram,
										label: 'Instagram',
										color: 'hover:bg-pink-500/20',
									},
								].map(({ icon: Icon, label, color }) => (
									<motion.button
										key={label}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className={`p-4 rounded-xl bg-slate-700/50 ${color} transition-all duration-200 flex flex-col items-center gap-2 text-slate-300 hover:text-white border border-slate-600/30`}>
										<Icon className='w-6 h-6' />
										<span className='text-xs'>{label}</span>
									</motion.button>
								))}
							</div>

							<div className='flex gap-2 mb-4'>
								<input
									type='text'
									value={
										typeof window !== 'undefined' ? window.location.href : ''
									}
									readOnly
									className='flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/30 rounded-xl text-slate-300 text-sm'
								/>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={handleCopyLink}
									className='px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white transition-colors'>
									{copySuccess ? (
										<Check className='w-5 h-5' />
									) : (
										<Copy className='w-5 h-5' />
									)}
								</motion.button>
							</div>

							{copySuccess && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className='text-green-400 text-sm text-center'>
									Link copied to clipboard!
								</motion.div>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Report Modal */}
			<AnimatePresence>
				{showReportModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
						onClick={() => setShowReportModal(false)}>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className='bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700'
							onClick={(e) => e.stopPropagation()}>
							<h3 className='text-xl font-bold text-white mb-4'>
								Report this ad
							</h3>
							<p className='text-slate-300 text-sm mb-6'>
								Help us maintain quality by reporting inappropriate content.
							</p>

							<div className='space-y-3 mb-6'>
								{[
									'Inappropriate content',
									'Misleading information',
									'Copyright violation',
									'Spam or scam',
									'Other',
								].map((reason) => (
									<label
										key={reason}
										className='flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-600/30 transition-colors cursor-pointer border border-slate-600/20'>
										<input
											type='radio'
											name='report-reason'
											className='text-purple-500'
										/>
										<span className='text-slate-300'>{reason}</span>
									</label>
								))}
							</div>

							<textarea
								placeholder='Additional details (optional)'
								className='w-full p-4 bg-slate-700/50 border border-slate-600/30 rounded-xl text-slate-300 placeholder-slate-400 mb-6 resize-none'
								rows={3}
							/>

							<div className='flex gap-3'>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setShowReportModal(false)}
									className='flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-300 transition-colors'>
									Cancel
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => {
										const selectedReason = document.querySelector(
											'input[name="report-reason"]:checked'
										);
										const description =
											document.querySelector('textarea').value;
										handleReportSubmit(
											selectedReason?.parentElement?.textContent.trim() ||
												'Other',
											description
										);
										setShowReportModal(false);
									}}
									className='flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white transition-colors'>
									Submit Report
								</motion.button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ProductDetailsPage;
