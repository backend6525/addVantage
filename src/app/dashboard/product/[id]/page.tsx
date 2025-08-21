'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
// Removed Kinde direct import - using user API instead
import {
	LoadingState,
	ErrorState,
	MetricCard,
	SocialLinks,
	ReportAdModal,
} from './components';
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
} from 'lucide-react';
import { PerformanceTab, DemographicsTab, ReviewsTab, TabSystem } from './tabs';
import { ProductDetails, TabProps } from './interfaces';
import OnlineStatus from '@/app/components/online/OnlineStatus';

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

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const [product, setProduct] = useState<ProductDetails | null>(null);
	const [user, setUser] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const [userLoading, setUserLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isLiked, setIsLiked] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isPublished, setIsPublished] = useState(false);
	const [isCurrentUserPublisher, setIsCurrentUserPublisher] = useState(false);
	const [showReportModal, setShowReportModal] = useState(false);
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

				// Create mock publisher using user data
				const publisher = {
					id: data.createdBy,
					name: data.createdBy,
					email: data.createdBy,
					location: 'Unknown Location', // You can add location to your user API later
					logoUrl: user.picture || '/api/placeholder/64/64',
					totalAds: 0, // This should come from your database
					rating: 0, // This should come from your database
					bio: 'Leading digital advertising agency specializing in high-performance campaigns across all platforms.',
					socialLinks: [],
				};

				const enhancedData: ProductDetails = {
					...data,
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

	// Show loading state while user data is loading
	if (userLoading || loading) return <LoadingState />;

	// Show error state if there's an error or missing data
	if (error || !product || !user) return <ErrorState error={error} />;

	const tabContents: TabProps[] = [
		{
			label: 'Overview',
			icon: Info,
			content: (
				<div className='space-y-6'>
					<p className='text-lg text-slate-300 leading-relaxed'>
						{product.description}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
						<div className='p-6 rounded-xl bg-slate-700/50 border border-slate-600'>
							<h3 className='text-xl font-semibold mb-4 flex items-center gap-2 text-white'>
								<Award className='text-amber-500' />
								Ad Details
							</h3>
							<div className='space-y-4 text-slate-300'>
								<div className='flex items-center justify-between'>
									<span className='flex items-center gap-2'>
										<DollarSign className='w-4 h-4 text-green-400' />
										Cost per View
									</span>
									<span>{product.costPerView || 'N/A'}</span>
								</div>
								<div className='flex items-center justify-between'>
									<span className='flex items-center gap-2'>
										<Info className='w-4 h-4 text-blue-400' />
										Type
									</span>
									<span>{product.type}</span>
								</div>
								<div className='flex items-center justify-between'>
									<span className='flex items-center gap-2'>
										<Clock className='w-4 h-4 text-purple-400' />
										Published
									</span>
									<span>{product.publishDate || 'Not specified'}</span>
								</div>
								<div className='flex items-center justify-between'>
									<span className='flex items-center gap-2'>
										<Clock className='w-4 h-4 text-yellow-400' />
										Duration
									</span>
									<span>{product.numberOfDaysRunning || 'N/A'} days</span>
								</div>
							</div>
						</div>

						{product.adCampaignDetails && (
							<div className='p-6 rounded-xl bg-slate-700/50 border border-slate-600'>
								<h3 className='text-xl font-semibold mb-4 flex items-center gap-2 text-white'>
									<Target className='text-cyan-500' />
									Campaign
								</h3>
								<div className='space-y-4 text-slate-300'>
									<div className='flex items-center justify-between'>
										<span className='flex items-center gap-2'>
											<Zap className='w-4 h-4 text-yellow-400' />
											Objective
										</span>
										<span>{product.adCampaignDetails.objective}</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='flex items-center gap-2'>
											<UsersIcon className='w-4 h-4 text-pink-400' />
											Platform
										</span>
										<span>{product.adCampaignDetails.platform}</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='flex items-center gap-2'>
											<TrendingUp className='w-4 h-4 text-green-400' />
											Budget
										</span>
										<span>{product.adCampaignDetails.budget}</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='flex items-center gap-2'>
											<Calendar className='w-4 h-4 text-blue-400' />
											Timeline
										</span>
										<span>
											{product.adCampaignDetails.startDate} -{' '}
											{product.adCampaignDetails.endDate}
										</span>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className='p-6 rounded-xl bg-slate-700/50 border border-slate-600 mt-6'>
						<h3 className='text-xl font-semibold mb-4 flex items-center gap-2 text-white'>
							<Target className='text-indigo-400' />
							Target Audience
						</h3>
						<p className='text-slate-300'>
							{product.targetAudienceDescription ||
								'No specific audience defined'}
						</p>

						{product.targetAudience && product.targetAudience.length > 0 && (
							<div className='mt-4 flex flex-wrap gap-2'>
								{product.targetAudience.map((target, index) => (
									<span
										key={index}
										className='px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm'>
										{target}
									</span>
								))}
							</div>
						)}
					</div>

					{product.tags && product.tags.length > 0 && (
						<div className='mt-6'>
							<h3 className='text-lg font-medium mb-2 text-white'>Tags</h3>
							<div className='flex flex-wrap gap-2'>
								{product.tags.map((tag, index) => (
									<span
										key={index}
										className='px-3 py-1 bg-slate-600 text-slate-300 rounded-full text-sm'>
										{tag}
									</span>
								))}
							</div>
						</div>
					)}

					{/* User Account Info Section - Using data from your API */}
					<div className='p-6 rounded-xl bg-slate-700/50 border border-slate-600 mt-6'>
						<h3 className='text-xl font-semibold mb-4 flex items-center gap-2 text-white'>
							<User className='text-purple-400' />
							Account Information
						</h3>
						<div className='grid grid-cols-2 gap-4 text-slate-300'>
							<div className='flex items-center justify-between'>
								<span>Account Type</span>
								<span
									className={`px-2 py-1 rounded text-sm ${
										user.accountType === 'free'
											? 'bg-gray-500/20 text-gray-300'
											: user.accountType === 'premium'
												? 'bg-blue-500/20 text-blue-300'
												: 'bg-purple-500/20 text-purple-300'
									}`}>
									{user.accountType.toUpperCase()}
								</span>
							</div>
							<div className='flex items-center justify-between'>
								<span>Credits</span>
								<span>{user.credits}</span>
							</div>
							<div className='flex items-center justify-between'>
								<span>Daily Ads</span>
								<span>
									{user.dailyAdCount}/{user.dailyAdLimit}
								</span>
							</div>
							<div className='flex items-center justify-between'>
								<span>Weekly Ads</span>
								<span>
									{user.weeklyAdCount}/{user.weeklyAdLimit}
								</span>
							</div>
						</div>
					</div>
				</div>
			),
		},
		{
			label: 'Performance',
			icon: BarChart2,
			content: <PerformanceTab metrics={product.performanceMetrics} />,
		},
		{
			label: 'Demographics',
			icon: UsersIcon,
			content: <DemographicsTab metrics={product.performanceMetrics} />,
		},
		{
			label: 'Reviews',
			icon: MessageCircle,
			content: <ReviewsTab reviews={product.reviews} />,
		},
	];

	return (
		<div className='flex h-screen bg-slate-800/70'>
			<AnimatePresence>
				{showReportModal && (
					<ReportAdModal
						isOpen={showReportModal}
						onClose={() => setShowReportModal(false)}
						onSubmit={handleReportSubmit}
					/>
				)}
			</AnimatePresence>

			<div className='flex-1 flex flex-col overflow-hidden mt-16'>
				<div className='p-4 border-b border-slate-700/50 bg-slate-800/90'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<button
								onClick={() => router.back()}
								className='flex items-center text-slate-400 hover:text-white transition-colors'>
								<ChevronLeft className='w-5 h-5 mr-1' />
								Back
							</button>
							<h1 className='text-xl font-semibold text-white'>
								Product Details
							</h1>
						</div>
						<div className='flex items-center space-x-2'>
							<div className='text-sm text-slate-400'>
								Welcome, {user.name || user.given_name}
							</div>
							<button className='p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50'>
								<Settings className='h-5 w-5' />
							</button>
							<button className='p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50'>
								<HelpCircle className='h-5 w-5' />
							</button>
						</div>
					</div>
				</div>

				<div className='flex-1 overflow-auto p-6'>
					<div className='max-w-7xl mx-auto'>
						<div className='flex flex-col lg:flex-row gap-8'>
							<div className='w-full lg:w-8/12'>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
									className='relative aspect-video rounded-xl overflow-hidden bg-slate-700/50 border border-slate-600 flex items-center justify-center'>
									{product.adResourceUrl ? (
										<div className='w-full h-full'>
											<Image
												src={product.adResourceUrl}
												alt={product.title}
												layout='fill'
												objectFit='cover'
											/>
										</div>
									) : (
										<div className='text-slate-400 text-center p-4'>
											<ExternalLink className='w-16 h-16 mx-auto mb-2 opacity-50' />
											<p>Ad content preview not available</p>
										</div>
									)}

									<div className='absolute bottom-4 right-4 flex gap-2'>
										<button className='p-2 rounded-full bg-slate-800/70 hover:bg-slate-700/50 transition-colors'>
											<Download className='w-5 h-5 text-slate-300' />
										</button>
										<button className='p-2 rounded-full bg-slate-800/70 hover:bg-slate-700/50 transition-colors'>
											<ExternalLink className='w-5 h-5 text-slate-300' />
										</button>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.1 }}
									className='mt-6'>
									<div className='flex justify-between items-center'>
										<h1 className='text-2xl font-bold text-white'>
											{product.title}
										</h1>
										<div className='flex items-center gap-2'>
											{isCurrentUserPublisher && (
												<button
													onClick={handleTogglePublish}
													disabled={isSubmitting}
													className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
														isPublished
															? 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30'
															: 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
													}`}>
													{isSubmitting
														? 'Processing...'
														: isPublished
															? 'Unpublish'
															: 'Publish'}
												</button>
											)}

											<button
												onClick={() => setIsLiked(!isLiked)}
												className='p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors'>
												<Heart
													className={`w-5 h-5 ${
														isLiked
															? 'fill-red-500 text-red-500'
															: 'text-slate-400'
													}`}
												/>
											</button>

											<button
												onClick={() => setShowReportModal(true)}
												className='p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors'>
												<Flag className='w-5 h-5 text-slate-400' />
											</button>

											<button className='p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors'>
												<Share2 className='w-5 h-5 text-slate-400' />
											</button>
										</div>
									</div>

									<div className='flex items-center mt-3 gap-4'>
										<OnlineStatus
											isOnline={product.isOnline || false}
											isOwner={false}
											resourceId={product.id}
											resourceType='product'
										/>
										<div className='flex items-center text-slate-300'>
											<Star className='w-5 h-5 text-yellow-400 fill-current' />
											<span className='ml-1'>{product.rating || '4.5'}</span>
										</div>
										<div className='flex items-center text-slate-400'>
											<Eye className='w-5 h-5' />
											<span className='ml-1'>
												{product.totalViews || '1,432'} views
											</span>
										</div>
									</div>
								</motion.div>

								<TabSystem tabs={tabContents} />
							</div>

							<div className='w-full lg:w-4/12'>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									className='p-6 rounded-xl bg-slate-700/50 border border-slate-600 sticky top-6'>
									<div className='flex items-center gap-4 mb-4'>
										<div className='w-16 h-16 rounded-full overflow-hidden bg-slate-600'>
											{product.publisher?.logoUrl ? (
												<Image
													src={product.publisher.logoUrl}
													alt={product.publisher.name}
													width={64}
													height={64}
													className='object-cover'
												/>
											) : (
												<User className='w-16 h-16 p-4 text-slate-400' />
											)}
										</div>
										<div>
											<h3 className='text-xl font-semibold text-white'>
												{product.publisher?.name}
											</h3>
											<div className='flex items-center text-slate-400 text-sm mt-1'>
												<MapPin className='w-4 h-4 mr-1' />
												{product.publisher?.location ||
													'Location not specified'}
											</div>
										</div>
									</div>

									{product.publisher?.bio && (
										<p className='text-slate-300 mb-4'>
											{product.publisher.bio}
										</p>
									)}

									<div className='grid grid-cols-2 gap-4 mb-6'>
										<div className='text-center p-3 bg-slate-700 rounded-lg'>
											<div className='text-xl font-bold text-white'>
												{product.publisher?.totalAds || '0'}
											</div>
											<div className='text-slate-400 text-sm'>Total Ads</div>
										</div>
										<div className='text-center p-3 bg-slate-700 rounded-lg'>
											<div className='text-xl font-bold flex items-center justify-center text-white'>
												{product.publisher?.rating || '4.5'}
												<Star className='w-4 h-4 text-yellow-400 fill-current ml-1' />
											</div>
											<div className='text-slate-400 text-sm'>Rating</div>
										</div>
									</div>

									<SocialLinks links={product.publisher?.socialLinks} />

									<div className='mt-6 space-y-3'>
										<button
											onClick={handleSendMessage}
											disabled={isSubmitting}
											className='w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center justify-center gap-2 text-white'>
											<Send className='w-5 h-5' />
											Contact Publisher
										</button>

										<a
											href={`/publisher/${product.publisher?.id}`}
											className='w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2 text-white'>
											<User className='w-5 h-5' />
											View Profile
										</a>
									</div>
								</motion.div>

								{product.relatedAds && product.relatedAds.length > 0 && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.3 }}
										className='mt-6 p-6 rounded-xl bg-slate-700/50 border border-slate-600'>
										<h3 className='text-xl font-semibold mb-4 text-white'>
											Related Ads
										</h3>
										<div className='space-y-4'>
											{product.relatedAds.map((ad) => (
												<Link
													key={ad.id}
													href={`/product/${ad.id}`}
													className='block p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors'>
													<div className='flex items-center gap-3'>
														<div className='w-12 h-12 rounded-md bg-slate-600 overflow-hidden flex-shrink-0'>
															{ad.thumbnailUrl ? (
																<Image
																	src={ad.thumbnailUrl}
																	alt={ad.title}
																	width={48}
																	height={48}
																	className='object-cover'
																/>
															) : (
																<div className='w-full h-full flex items-center justify-center'>
																	<ExternalLink className='w-6 h-6 opacity-50 text-slate-400' />
																</div>
															)}
														</div>
														<div className='flex-1 min-w-0'>
															<h4 className='font-medium text-white truncate'>
																{ad.title}
															</h4>
														</div>
													</div>
												</Link>
											))}
										</div>
									</motion.div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsPage;
