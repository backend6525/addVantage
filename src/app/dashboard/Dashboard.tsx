'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/app/components/ui/toast/use-toast';
import { Product, DashboardProps } from '@/app/dashboard/types/dashboard_types';
import { useMediaQuery } from '@/hooks/use-media-query';
import { DashboardHeader } from './components/dashboardHeader';
import { ExtendAdModal } from './components/extendAdModel';
import { ExpiringAdsAlert } from './components/expiringAdsAlert';
import { DashboardStats } from './components/dashboardStarts';
import { DashboardTabs } from './components/dashboardTabs';
import { SettingsPanel } from './components/SettingsPanel';

export default function Dashboard({ isMenuOpen, user }: DashboardProps) {
	const router = useRouter();
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

	const fetchUserData = useCallback(async () => {
		try {
			setIsRefreshing(true);
			const response = await fetch('/api/auth/user');
			if (!response.ok) throw new Error('Failed to fetch user data');

			const userData = await response.json();
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
		async (email: string) => {
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
		async (email: string) => {
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
				return await response.json();
			} catch (error) {
				console.error('Error fetching published ads:', error);
				throw error;
			}
		},
		[activeTimeframe]
	);

	const refreshProductsData = useCallback(async () => {
		if (!userData?.email) return;
		try {
			console.log('Refreshing products data...');
			const productsData = await fetchProducts(userData.email);
			setProducts(productsData);
			const publishedAdsData = await fetchPublishedAds(userData.email);
			setPublishedAds(publishedAdsData);
		} catch (error) {
			console.error('Error refreshing products:', error);
		}
	}, [userData?.email, fetchProducts, fetchPublishedAds]);

	useEffect(() => {
		const handleAdCreated = () => {
			console.log('Ad created event received, refreshing dashboard...');
			refreshProductsData();
		};

		window.addEventListener('adCreated', handleAdCreated);
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

	useEffect(() => {
		// Show ads expiring in 7 days or less, but not already expired
		const expiring = products.filter(
			(ad) =>
				typeof ad.daysRemaining === 'number' &&
				ad.daysRemaining > 0 &&
				ad.daysRemaining <= 7
		);
		setExpiringAds(expiring);
	}, [products]);

	const refreshData = async () => {
		try {
			setIsRefreshing(true);
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

			if (!response.ok) throw new Error('Failed to extend ad');
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
					body: JSON.stringify({
						id,
						isPublished: !product.isPublished,
						userEmail: user.email,
					}),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.error ||
							`Failed to ${product.isPublished ? 'unpublish' : 'publish'} product`
					);
				}

				const result = await response.json();
				if (!result.success)
					throw new Error(result.message || 'Failed to update ad status');

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

	const handleCreateVideoAd = () => {
		router.push('/dashboard/create-ad?type=video');
	};

	const handleProductClick = (productId: string) => {
		router.push(`/dashboard/product/${productId}`);
	};

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

				{selectedExpiringAd && (
					<ExtendAdModal
						ad={selectedExpiringAd}
						onClose={() => setSelectedExpiringAd(null)}
						onExtend={handleExtendAd}
					/>
				)}

				<div className='flex-1 overflow-hidden'>
					<div className='h-full overflow-y-auto'>
						<div
							className={`p-4 md:p-6 space-y-4 md:space-y-6 ${isMobile ? 'pb-20' : ''}`}>
							<DashboardStats
								loading={loading}
								totalViews={totalViews}
								totalClicks={totalClicks}
								averageCTR={averageCTR}
								bestPerformingAd={bestPerformingAd}
							/>

							<div className='flex flex-col gap-4 items-center'>
								<div className='w-full'>
									<ExpiringAdsAlert
										expiringAds={expiringAds}
										onSelectAd={setSelectedExpiringAd}
									/>
								</div>
							</div>

							<DashboardTabs
								isMobile={isMobile}
								products={products}
								publishedAds={publishedAds}
								loading={loading}
								error={error}
								filteredProducts={filteredProducts}
								handleTogglePublish={handleTogglePublish}
								handleDelete={handleDelete}
								user={user}
								handleCreateVideoAd={handleCreateVideoAd}
								handleProductClick={handleProductClick}
								refreshData={refreshData}
							/>
						</div>
					</div>
				</div>
			</div>

			<SettingsPanel
				isConfigOpen={isConfigOpen}
				isMobile={isMobile}
				onClose={() => setIsConfigOpen(false)}
			/>
		</div>
	);
}
