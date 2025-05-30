'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/app/components/ui/toast/use-toast';
import { Product, DashboardProps } from '@/app/dashboard/types/dashboard_types';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/Tabs/Tabs';
import { DashboardHeader } from './components/dashboardHeader';
import { YourAdsTab } from './components/yourAdsTab';
import { PublishedAdsTab } from './components/publishAdTab';
import { ExtendAdModal } from './components/extendAdModel';
import { ExpiringAdsAlert } from './components/expiringAdsAlert';
import { SearchFilter } from './components/searchFilter';
import { Badge } from '@/components/ui/badge';
import {
	Settings,
	Bell,
	LineChart,
	Calendar,
	ChevronDown,
	RefreshCw,
	Clock,
	ArrowUpRight,
	Activity,
	PieChart,
	TrendingUp,
	Eye,
	MousePointer,
	Percent,
	CheckCircle,
	X,
	HelpCircle,
	Info,
	ChevronRight,
	Zap,
	Crown,
	Star,
	Shield,
	BarChart2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC<DashboardProps> = ({ isMenuOpen, user }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [publishedAds, setPublishedAds] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [filter, setFilter] = useState<string>('');
	const [expiringAds, setExpiringAds] = useState<Product[]>([]);
	const [selectedExpiringAd, setSelectedExpiringAd] = useState<Product | null>(
		null
	);
	const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [userData, setUserData] = useState<any>(null);
	const [activeTimeframe, setActiveTimeframe] = useState('weekly');
	const [isRefreshing, setIsRefreshing] = useState(false);
	const { toast } = useToast();
	const [notification, setNotification] = useState<string | null>(null);
	const [showHelp, setShowHelp] = useState<boolean>(false);
	const isMobile = useMediaQuery('(max-width: 768px)');

	const StatCardSkeleton = () => (
		<motion.div
			className='bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 animate-pulse'
			initial={{ opacity: 0.5 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1.5, repeat: Infinity }}>
			<div className='flex justify-between items-start mb-3'>
				<div className='bg-slate-700/50 p-2 rounded-lg w-8 h-8' />
				<div className='bg-slate-700/50 w-12 h-3 rounded' />
			</div>
			<div className='bg-slate-700/50 w-3/4 h-6 rounded mb-2' />
			<div className='bg-slate-700/50 w-1/2 h-3 rounded' />
		</motion.div>
	);

	const ProductCardSkeleton = () => (
		<motion.div
			className='bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 animate-pulse'
			initial={{ opacity: 0.5 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1.5, repeat: Infinity }}>
			<div className='bg-slate-700/50 w-full h-32 rounded-lg mb-3' />
			<div className='bg-slate-700/50 w-3/4 h-4 rounded mb-2' />
			<div className='bg-slate-700/50 w-1/2 h-3 rounded mb-3' />
			<div className='bg-slate-700/50 w-full h-8 rounded-lg' />
		</motion.div>
	);

	const fetchUserData = useCallback(async () => {
		try {
			setIsRefreshing(true);
			const response = await fetch('/api/auth/user');
			if (!response.ok) throw new Error('Failed to fetch user data');

			const userData = await response.json();

			// Store token for later API calls
			sessionStorage.setItem('userToken', userData.idToken);
			sessionStorage.setItem('userRole', JSON.stringify(userData.roles));

			return userData;
		} catch (error) {
			console.error('Error fetching user data:', error);
			setError('Authentication failed');
			throw error;
		} finally {
			setIsRefreshing(false);
		}
	}, []);

	const fetchProducts = useCallback(
		async (email) => {
			try {
				const token = sessionStorage.getItem('userToken');
				const response = await fetch(
					`/api/product?email=${encodeURIComponent(email || '')}&timeframe=${activeTimeframe}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Cache-control': 'no-cache',
						},
					}
				);
				if (!response.ok) throw new Error('Failed to fetch products');
				const data = await response.json();
				return data.map((product: Product) => ({
					...product,
					isPublished: Boolean(product.isPublished),
				}));
			} catch (error) {
				console.error('Error fetching products:', error);
				throw error;
			}
		},
		[activeTimeframe]
	);

	const fetchPublishedAds = useCallback(
		async (email) => {
			try {
				const token = sessionStorage.getItem('userToken');

				const response = await fetch(
					`/api/publishProducts?timeframe=${activeTimeframe}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'x-user-email': email || '',
							'Cache-Control': 'no-cache',
						},
					}
				);
				if (!response.ok) throw new Error('Failed to fetch published ads');
				const data = await response.json();
				return data;
			} catch (error) {
				console.error('Error fetching published ads:', error);
				throw error;
			}
		},
		[activeTimeframe]
	);

	// Event-based refresh system for when ads are created
	const refreshProductsData = useCallback(async () => {
		if (!userData?.email) return;

		try {
			console.log('Refreshing products data...');
			const productsData = await fetchProducts(userData.email);
			setProducts(productsData);

			// Also refresh published ads to keep them in sync
			const publishedAdsData = await fetchPublishedAds(userData.email);
			setPublishedAds(publishedAdsData);
		} catch (error) {
			console.error('Error refreshing products:', error);
		}
	}, [userData?.email, fetchProducts, fetchPublishedAds]);

	// Listen for custom 'adCreated' event to refresh data
	useEffect(() => {
		const handleAdCreated = () => {
			console.log('Ad created event received, refreshing dashboard...');
			refreshProductsData();
		};

		// Add event listener for ad creation
		window.addEventListener('adCreated', handleAdCreated);

		// Cleanup event listener
		return () => {
			window.removeEventListener('adCreated', handleAdCreated);
		};
	}, [refreshProductsData]);

	useEffect(() => {
		const initializeData = async () => {
			if (isInitialized) return;

			try {
				setLoading(true);
				const fetchedUserData = await fetchUserData();
				setUserData(fetchedUserData);

				// Fetch both products and published ads
				const [productsData, publishedAdsData] = await Promise.all([
					fetchProducts(fetchedUserData.email),
					fetchPublishedAds(fetchedUserData.email),
				]);

				const publishedAdIds = new Set(
					publishedAdsData.map((ad: Product) => ad.id)
				);
				const updatedProducts = productsData.map((product: Product) => ({
					...product,
					isPublished: publishedAdIds.has(product.id),
				}));

				setProducts(updatedProducts);
				setPublishedAds(publishedAdsData);
				setIsInitialized(true);
			} catch (error) {
				setError('Failed to initialize dashboard');
				toast({
					title: 'Error',
					description: 'Failed to load dashboard data. Please try again.',
					variant: 'destructive',
				});
			} finally {
				setLoading(false);
			}
		};

		initializeData();
	}, [isInitialized, fetchProducts, fetchPublishedAds, fetchUserData, toast]);

	const refreshData = async () => {
		try {
			setIsRefreshing(true);
			// Refresh both products and published ads
			const [productsData, publishedAdsData] = await Promise.all([
				fetchProducts(userData?.email || ''),
				fetchPublishedAds(userData?.email || ''),
			]);

			const publishedAdIds = new Set(
				publishedAdsData.map((ad: Product) => ad.id)
			);
			const updatedProducts = productsData.map((product: Product) => ({
				...product,
				isPublished: publishedAdIds.has(product.id),
			}));

			setProducts(updatedProducts);
			setPublishedAds(publishedAdsData);

			toast({
				title: 'Data refreshed',
				description: 'Your dashboard data has been updated.',
			});
		} catch (error) {
			console.error('Error refreshing data:', error);
			toast({
				title: 'Refresh failed',
				description: 'Unable to refresh dashboard data. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setIsRefreshing(false);
		}
	};

	const handleExtendAd = async (adId: string, extensionDays: number) => {
		try {
			const response = await fetch('/api/extendAd', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: adId,
					extensionDays,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to extend ad');
			}

			// Refresh products data
			const updatedProductsResponse = await fetch(
				`/api/product?email=${encodeURIComponent(user.email)}`
			);
			const updatedProducts = await updatedProductsResponse.json();
			setProducts(updatedProducts);

			setExpiringAds(expiringAds.filter((ad) => ad.id !== adId));

			toast({
				title: 'Ad Extended',
				description: `Your ad has been extended by ${extensionDays} days.`,
			});
		} catch (error) {
			console.error('Error extending ad:', error);
			toast({
				title: 'Extension Failed',
				description: 'Unable to extend your ad. Please try again.',
				variant: 'destructive',
			});
		}
	};

	const handleTogglePublish = useCallback(
		async (id: string) => {
			if (!id) {
				toast({
					title: 'Invalid Product',
					description: 'No product ID provided.',
					variant: 'destructive',
				});
				return;
			}

			const product = products.find((p) => p.id === id);
			if (!product) {
				toast({
					title: 'Product Not Found',
					description: 'Unable to locate the specified product.',
					variant: 'destructive',
				});
				return;
			}

			if (!user?.email) {
				toast({
					title: 'Authentication Error',
					description: 'User email is required to perform this action.',
					variant: 'destructive',
				});
				return;
			}

			try {
				const requestBody = {
					id,
					isPublished: !product.isPublished,
					userEmail: user.email,
				};

				const token = sessionStorage.getItem('userToken');
				if (!token) {
					toast({
						title: 'Authentication Failed',
						description: 'No authentication token found.',
						variant: 'destructive',
					});
					return;
				}

				const response = await fetch('/api/publishProducts', {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
						'x-user-email': user.email,
					},
					body: JSON.stringify(requestBody),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.error ||
							`Failed to ${product.isPublished ? 'unpublish' : 'publish'} product`
					);
				}

				const result = await response.json();

				if (!result.success) {
					throw new Error(result.message || 'Failed to update ad status');
				}

				// Update products state
				const updatedProducts = products.map((p) =>
					p.id === id ? { ...p, isPublished: !p.isPublished } : p
				);
				setProducts(updatedProducts);

				const updatedPublishedAds = await fetchPublishedAds(user.email);
				setPublishedAds(updatedPublishedAds);

				toast({
					title: !product.isPublished ? 'Ad Published' : 'Ad Unpublished',
					description: !product.isPublished
						? 'Your ad is now live and visible to users.'
						: 'Your ad has been removed from the published list.',
					variant: 'default',
				});
			} catch (error) {
				console.error('Error toggling publish status:', error);

				toast({
					title: 'Action Failed',
					description:
						error instanceof Error
							? error.message
							: 'Unable to update ad status. Please try again.',
					variant: 'destructive',
				});

				setError(
					error instanceof Error
						? error.message
						: 'Failed to update publication status'
				);
			}
		},
		[products, user?.email, fetchPublishedAds, toast, setError]
	);

	const handleDelete = useCallback(
		async (id: string) => {
			if (!id) {
				toast({
					title: 'Invalid Product',
					description: 'No product ID provided.',
					variant: 'destructive',
				});
				return;
			}

			try {
				const token = sessionStorage.getItem('userToken');
				if (!token) {
					toast({
						title: 'Authentication Failed',
						description: 'No authentication token found.',
						variant: 'destructive',
					});
					return;
				}

				const response = await fetch(`/api/product?id=${id}`, {
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
						'x-user-email': user?.email || '',
					},
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Failed to delete product');
				}

				// Update local state
				setProducts(products.filter((p) => p.id !== id));
				setPublishedAds(publishedAds.filter((p) => p.id !== id));

				toast({
					title: 'Ad Deleted',
					description: 'Your ad has been successfully deleted.',
				});
			} catch (error) {
				console.error('Error deleting product:', error);
				toast({
					title: 'Delete Failed',
					description:
						error instanceof Error
							? error.message
							: 'Unable to delete ad. Please try again.',
					variant: 'destructive',
				});
			}
		},
		[products, publishedAds, user?.email, toast]
	);

	const filteredProducts = products.filter(
		(product) =>
			product.title.toLowerCase().includes(filter.toLowerCase()) ||
			product.type.toLowerCase().includes(filter.toLowerCase())
	);

	const totalViews = products.reduce(
		(sum, p) => sum + (p.performance?.views || 0),
		0
	);
	const totalClicks = products.reduce(
		(sum, p) => sum + (p.performance?.clicks || 0),
		0
	);
	const averageCTR = products.length
		? (
				products.reduce((sum, p) => sum + (p.performance?.ctr || 0), 0) /
				products.length
			).toFixed(2)
		: '0.00';

	const bestPerformingAd =
		products.length > 0
			? products.reduce(
					(max, p) =>
						(p.performance?.clicks || 0) > (max.performance?.clicks || 0)
							? p
							: max,
					products[0]
				)
			: null;

	return (
		<div className='min-h-screen bg-slate-900 dark:bg-slate-950 transition-all duration-300'>
			<div
				className={`flex flex-col h-full transition-all duration-300 ${
					isMenuOpen && !isMobile ? 'ml-[16rem]' : 'ml-0'
				} ${isMobile ? '' : 'mt-[60px]'}`}>
				<DashboardHeader
					userData={userData}
					onOpenSettings={() => setIsConfigOpen(!isConfigOpen)}
					isMobile={isMobile}
				/>

				<div className='flex-1 overflow-hidden'>
					<div className='h-full overflow-y-auto'>
						<div
							className={`p-4 md:p-6 space-y-4 md:space-y-6 ${isMobile ? 'pb-20' : ''}`}>
							{/* Stats Cards - Responsive Grid */}
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4'>
								{loading ? (
									Array(4)
										.fill(0)
										.map((_, i) => <StatCardSkeleton key={i} />)
								) : (
									<>
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3 }}
											className='bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md rounded-xl p-4 md:p-5 border border-slate-700/50 shadow-xl overflow-hidden relative group'>
											<div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
											<div className='flex justify-between items-start mb-2 md:mb-3'>
												<div className='bg-purple-500/20 p-2 rounded-lg'>
													<Eye className='h-4 w-4 md:h-5 md:w-5 text-purple-400' />
												</div>
												<span className='text-xs text-gray-400 flex items-center gap-1'>
													<TrendingUp className='h-3 w-3 text-green-400' />
													+12.5%
												</span>
											</div>
											<h3 className='text-xl md:text-2xl font-bold text-white'>
												{totalViews.toLocaleString()}
											</h3>
											<p className='text-xs md:text-sm text-gray-400'>
												Total Views
											</p>
											<div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300'></div>
										</motion.div>

										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: 0.1 }}
											className='bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md rounded-xl p-4 md:p-5 border border-slate-700/50 shadow-xl overflow-hidden relative group'>
											<div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
											<div className='flex justify-between items-start mb-2 md:mb-3'>
												<div className='bg-blue-500/20 p-2 rounded-lg'>
													<MousePointer className='h-4 w-4 md:h-5 md:w-5 text-blue-400' />
												</div>
												<span className='text-xs text-gray-400 flex items-center gap-1'>
													<TrendingUp className='h-3 w-3 text-green-400' />
													+8.3%
												</span>
											</div>
											<h3 className='text-xl md:text-2xl font-bold text-white'>
												{totalClicks.toLocaleString()}
											</h3>
											<p className='text-xs md:text-sm text-gray-400'>
												Total Clicks
											</p>
											<div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300'></div>
										</motion.div>

										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: 0.2 }}
											className='bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md rounded-xl p-4 md:p-5 border border-slate-700/50 shadow-xl overflow-hidden relative group'>
											<div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
											<div className='flex justify-between items-start mb-2 md:mb-3'>
												<div className='bg-green-500/20 p-2 rounded-lg'>
													<Percent className='h-4 w-4 md:h-5 md:w-5 text-green-400' />
												</div>
												<span className='text-xs text-gray-400 flex items-center gap-1'>
													<TrendingUp className='h-3 w-3 text-green-400' />
													+2.1%
												</span>
											</div>
											<h3 className='text-xl md:text-2xl font-bold text-white'>
												{averageCTR}%
											</h3>
											<p className='text-xs md:text-sm text-gray-400'>
												Average CTR
											</p>
											<div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300'></div>
										</motion.div>

										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: 0.3 }}
											className='bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md rounded-xl p-4 md:p-5 border border-slate-700/50 shadow-xl overflow-hidden relative group'>
											<div className='absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
											<div className='flex justify-between items-start mb-2 md:mb-3'>
												<div className='bg-amber-500/20 p-2 rounded-lg'>
													<Activity className='h-4 w-4 md:h-5 md:w-5 text-amber-400' />
												</div>
												<span className='text-xs text-gray-400'>
													{products.length} live
												</span>
											</div>
											<h3 className='text-base md:text-lg font-bold text-white truncate'>
												{bestPerformingAd?.title || 'No data'}
											</h3>
											<p className='text-xs md:text-sm text-gray-400'>
												Top Performing Ad
											</p>
											<div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300'></div>
										</motion.div>
									</>
								)}
							</div>

							{/* Expiring Ads Alert */}
							<div className='flex flex-col gap-4 items-center'>
								<div className='w-full'>
									<ExpiringAdsAlert
										expiringAds={expiringAds}
										onSelectAd={setSelectedExpiringAd}
									/>
								</div>
							</div>

							{/* Main Tabs Section */}
							<div className='mt-6 md:mt-8'>
								<Tabs defaultValue='your-ads' className='w-full'>
									<div
										className={`sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md`}>
										<div className='w-full bg-gradient-to-r from-slate-800/90 via-slate-850/90 to-slate-900/90 shadow-2xl rounded-xl overflow-hidden relative border border-slate-700/50'>
											<div className='absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.2)_50%,transparent_75%)] bg-[length:400%_400%] animate-shine'></div>
											<TabsList className='w-full flex bg-transparent p-0 gap-1 rounded-t-lg border-b border-slate-700/50'>
												{[
													{
														value: 'your-ads',
														label: isMobile ? 'Ads' : 'Your Ads',
														icon: <Eye className='w-3.5 h-3.5 md:w-4 md:h-4' />,
														notification: 0,
													},
													{
														value: 'published',
														label: isMobile ? 'Published' : 'Published Ads',
														icon: (
															<ArrowUpRight className='w-3.5 h-3.5 md:w-4 md:h-4' />
														),
														notification: 2,
													},
													{
														value: 'billboard',
														label: 'Billboards',
														icon: (
															<Activity className='w-3.5 h-3.5 md:w-4 md:h-4' />
														),
														notification: 0,
														comingSoon: true,
													},
													{
														value: 'tv_radio',
														label: isMobile ? 'TV/Radio' : 'TV & Radio',
														icon: (
															<PieChart className='w-3.5 h-3.5 md:w-4 md:h-4' />
														),
														notification: 0,
														comingSoon: true,
													},
													{
														value: 'campaign',
														label: 'Campaigns',
														icon: (
															<Calendar className='w-3.5 h-3.5 md:w-4 md:h-4' />
														),
														notification: 0,
														comingSoon: true,
													},
												].map((tab) => (
													<TabsTrigger
														key={tab.value}
														value={tab.value}
														disabled={tab.comingSoon}
														className='group relative flex items-center justify-center min-w-[100px] px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-slate-700/30 data-[state=active]:bg-slate-900/70 text-slate-400 hover:text-white data-[state=active]:text-white border-b-2 border-transparent data-[state=active]:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed'>
														<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-purple-500/10 to-transparent'></div>
														<div className='flex items-center gap-1.5 md:gap-2'>
															{tab.icon}
															<span className='whitespace-nowrap'>
																{tab.label}
															</span>
															{tab.notification > 0 && (
																<span className='flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white'>
																	{tab.notification}
																</span>
															)}
															{tab.comingSoon && (
																<span className='absolute -top-1 -right-1 flex h-3 w-3'>
																	<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75'></span>
																	<span className='relative inline-flex rounded-full h-3 w-3 bg-purple-500'></span>
																</span>
															)}
														</div>
													</TabsTrigger>
												))}
											</TabsList>
										</div>
									</div>

									<div className='w-full mt-4 overflow-x-hidden'>
										<AnimatePresence mode='wait'>
											<TabsContent
												value='your-ads'
												className='data-[state=active]:animate-fadeIn'>
												<div className='overflow-x-hidden'>
													<YourAdsTab
														products={products}
														loading={loading}
														skeletonComponent={ProductCardSkeleton}
														error={error}
														filteredProducts={filteredProducts}
														handleTogglePublish={handleTogglePublish}
														handleDelete={handleDelete}
														user={user}
														isMobile={isMobile}
													/>
												</div>
											</TabsContent>

											<TabsContent
												value='published'
												className='data-[state=active]:animate-fadeIn'>
												<div className='overflow-x-hidden'>
													<PublishedAdsTab
														publishedAds={publishedAds}
														handleTogglePublish={handleTogglePublish}
														user={user}
														isMobile={isMobile}
													/>
												</div>
											</TabsContent>

											{['billboard', 'tv_radio', 'campaign'].map((tab) => (
												<TabsContent
													key={tab}
													value={tab}
													className='data-[state=active]:animate-fadeIn'>
													<div className='flex flex-col items-center justify-center py-6 md:py-8 px-4 text-center'>
														<div className='bg-gradient-to-b from-slate-800/70 to-slate-900/70 p-6 md:p-8 rounded-xl border border-slate-700/50 mb-4 shadow-lg w-full max-w-md mx-auto'>
															<div className='flex flex-col items-center gap-4'>
																<div className='relative'>
																	<div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt'></div>
																	<div className='relative px-7 py-4 bg-black rounded-full leading-none flex items-center'>
																		<span className='flex items-center space-x-5'>
																			<span className='pr-6 text-gray-100'>
																				Coming Soon
																			</span>
																			<span className='w-px h-6 bg-gray-700'></span>
																			<span className='pl-6 text-purple-400'>
																				Stay Tuned!
																			</span>
																		</span>
																	</div>
																</div>
																<p className='text-gray-400 text-sm md:text-base'>
																	We&apos;re working hard to bring you exciting
																	new features. Check back soon!
																</p>
															</div>
														</div>
													</div>
												</TabsContent>
											))}
										</AnimatePresence>
									</div>
								</Tabs>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Settings Panel */}
			<AnimatePresence>
				{isConfigOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='fixed inset-0 bg-black/30 z-40'
							onClick={() => setIsConfigOpen(false)}
						/>

						<motion.div
							initial={{ x: isMobile ? '100%' : 320, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: isMobile ? '100%' : 320, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className={`fixed right-0 ${isMobile ? 'top-0' : 'top-[60px]'} bottom-0 w-full ${
								isMobile ? '' : 'md:w-[320px]'
							} bg-gray-800/70 backdrop-blur-md overflow-y-auto z-[100] border-l border-gray-700/50`}>
							<div className='p-4'>
								<div className='flex items-center justify-between mb-4 md:mb-6'>
									<h2 className='text-lg md:text-xl font-bold text-white flex items-center gap-2'>
										<Settings className='w-4 h-4 md:w-5 md:h-5 text-purple-400' />
										<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>
											Dashboard Settings
										</span>
									</h2>
									<button
										onClick={() => setIsConfigOpen(false)}
										className='p-1 md:p-2 hover:bg-gray-700/50 rounded-full transition-colors'>
										<X className='w-4 h-4 md:w-5 md:h-5 text-gray-400' />
									</button>
								</div>

								<div className='space-y-4'>
									{/* Theme Settings */}
									<div className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-600/30 shadow-lg'>
										<h3 className='text-xs md:text-sm font-semibold text-white mb-2 md:mb-3 flex items-center gap-2'>
											<span className='h-2 w-2 md:h-3 md:w-3 rounded-full bg-purple-500'></span>
											Theme Settings
										</h3>

										<div className='space-y-2 md:space-y-3'>
											<div className='flex items-center justify-between'>
												<span className='text-xs text-gray-300'>Dark Mode</span>
												<div className='w-8 h-4 md:w-10 md:h-5 bg-gray-600/50 rounded-full relative'>
													<div className='absolute left-0.5 top-0.5 md:left-1 md:top-1 bg-purple-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
												</div>
											</div>

											<div className='flex items-center justify-between'>
												<span className='text-xs text-gray-300'>
													Animations
												</span>
												<div className='w-8 h-4 md:w-10 md:h-5 bg-purple-500/50 rounded-full relative'>
													<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-purple-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
												</div>
											</div>

											<div className='pt-1 md:pt-2'>
												<p className='text-xs text-gray-400 mb-1 md:mb-2'>
													Color Theme
												</p>
												<div className='flex gap-1 md:gap-2'>
													{['purple', 'blue', 'green', 'amber', 'rose'].map(
														(color) => (
															<button
																key={color}
																className={`w-5 h-5 md:w-6 md:h-6 rounded-full ${
																	color === 'purple'
																		? 'bg-purple-500 ring-1 md:ring-2 ring-purple-300 ring-offset-1 ring-offset-gray-800'
																		: color === 'blue'
																			? 'bg-blue-500'
																			: color === 'green'
																				? 'bg-green-500'
																				: color === 'amber'
																					? 'bg-amber-500'
																					: 'bg-rose-500'
																}`}></button>
														)
													)}
												</div>
											</div>
										</div>
									</div>

									{/* Ad Settings */}
									<div className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-600/30 shadow-lg'>
										<h3 className='text-xs md:text-sm font-semibold text-white mb-2 md:mb-3 flex items-center gap-2'>
											<span className='h-2 w-2 md:h-3 md:w-3 rounded-full bg-blue-500'></span>
											Ad Settings
										</h3>

										<div className='space-y-2 md:space-y-3'>
											<div className='flex items-center justify-between'>
												<span className='text-xs text-gray-300'>
													Auto-extend Ads
												</span>
												<div className='w-8 h-4 md:w-10 md:h-5 bg-gray-600/50 rounded-full relative'>
													<div className='absolute left-0.5 top-0.5 md:left-1 md:top-1 bg-gray-400 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
												</div>
											</div>

											<div className='flex items-center justify-between'>
												<span className='text-xs text-gray-300'>
													Ad Analytics
												</span>
												<div className='w-8 h-4 md:w-10 md:h-5 bg-blue-500/50 rounded-full relative'>
													<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-blue-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
												</div>
											</div>

											<div className='pt-1 md:pt-2'>
												<p className='text-xs text-gray-400 mb-1 md:mb-2'>
													Default Ad Duration
												</p>
												<select className='w-full bg-gray-700/50 border border-gray-600/30 rounded-md text-xs p-1 md:p-2 text-gray-300 focus:ring-1 md:focus:ring-2 focus:ring-blue-500 focus:outline-none'>
													<option>7 days</option>
													<option>14 days</option>
													<option>30 days</option>
													<option>60 days</option>
												</select>
											</div>
										</div>
									</div>

									{/* Notification Preferences */}
									<div className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-600/30 shadow-lg'>
										<h3 className='text-xs md:text-sm font-semibold text-white mb-2 md:mb-3 flex items-center gap-2'>
											<span className='h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-500'></span>
											Notification Preferences
										</h3>

										<div className='space-y-2 md:space-y-3'>
											<div className='flex items-center justify-between'>
												<span className='text-xs text-gray-300'>
													Email Alerts
												</span>
												<div className='w-8 h-4 md:w-10 md:h-5 bg-green-500/50 rounded-full relative'>
													<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-green-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
												</div>
											</div>

											<div className='flex items-center justify-between'>
												<span className='text-xs text-gray-300'>
													Push Notifications
												</span>
												<div className='w-8 h-4 md:w-10 md:h-5 bg-green-500/50 rounded-full relative'>
													<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-green-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
												</div>
											</div>

											<div className='flex items-center justify-between'>
												<span className='text-xs text-gray-300'>
													Expiring Ads Alert
												</span>
												<div className='w-8 h-4 md:w-10 md:h-5 bg-green-500/50 rounded-full relative'>
													<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-green-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
												</div>
											</div>
										</div>
									</div>

									{/* Premium Features - Enhanced Section */}
									<div className='bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-3 md:p-4 rounded-xl border border-gray-600/30 shadow-lg'>
										<div className='flex items-start justify-between mb-2 md:mb-3'>
											<div>
												<h3 className='text-xs md:text-sm font-semibold text-white flex items-center gap-2'>
													<span className='h-2 w-2 md:h-3 md:w-3 rounded-full bg-amber-500'></span>
													Premium Features
												</h3>
												<p className='text-xs text-gray-400 mt-1'>
													Upgrade to unlock powerful tools
												</p>
											</div>
											<Badge className='bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs'>
												<Crown className='w-3 h-3 mr-1' />
												PRO
											</Badge>
										</div>

										<div className='space-y-2 md:space-y-3'>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-2'>
													<Zap className='w-4 h-4 text-amber-400' />
													<span className='text-xs text-gray-300'>
														Advanced Analytics
													</span>
												</div>
												<div className='w-8 h-4 md:w-10 md:h-5 bg-amber-500/50 rounded-full relative'>
													<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-amber-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
												</div>
											</div>

											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-2'>
													<Star className='w-4 h-4 text-amber-400' />
													<span className='text-xs text-gray-300'>
														AI Recommendations
													</span>
												</div>
												<div className='w-8 h-4 md:w-10 md:h-5 bg-amber-500/50 rounded-full relative'>
													<div className='absolute right-0.5 top-0.5 md:right-1 md:top-1 bg-amber-500 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
												</div>
											</div>

											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-2'>
													<BarChart2 className='w-4 h-4 text-gray-400' />
													<span className='text-xs text-gray-300'>
														Campaign Automation
													</span>
												</div>
												<div className='w-8 h-4 md:w-10 md:h-5 bg-gray-600/50 rounded-full relative'>
													<div className='absolute left-0.5 top-0.5 md:left-1 md:top-1 bg-gray-400 w-3 h-3 md:w-4 md:h-4 rounded-full transition-all'></div>
												</div>
											</div>

											<div className='pt-2'>
												<Button
													variant='outline'
													className='w-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 hover:text-white hover:bg-amber-500/30 text-xs md:text-sm'>
													<Shield className='w-4 h-4 mr-2' />
													Upgrade to Premium
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Dashboard;
