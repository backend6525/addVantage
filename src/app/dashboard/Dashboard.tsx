'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	PlusCircle,
	RefreshCw,
	Filter,
	Search,
	AlertCircle,
	Eye,
	ToggleLeft,
	ToggleRight,
	User,
	Clock,
	MessageCircle,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/Tabs/Tabs';

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/app/components/ui/DialogPopup/dialog';
import { Button } from '@/components/ui/Button/Button';
import Input from '@/app/components/ui/Input/Input';
import { Label } from '@radix-ui/react-label';
import { useToast } from '@/app/components/ui/toast/use-toast';

// Types
interface Product {
	id: string;
	type: string;
	adResourceUrl?: string;
	title: string;
	description: string;
	costPerView?: string;
	numberOfDaysRunning?: string;
	isPublished?: boolean;
	performance?: {
		views: number;
		clicks: number;
		ctr: number;
	};
	createdBy: string;
	startDate?: string;
	duration: number;
	isActive: boolean;
	daysRemaining?: number;
}

interface KindeUser {
	email?: string;
	given_name?: string;
	family_name?: string;
}

interface DashboardProps {
	isMenuOpen: boolean;
	user: KindeUser;
}

// Performance Card Component
const PerformanceCard = ({
	performance,
}: {
	performance?: Product['performance'];
}) => {
	if (!performance) return null;

	return (
		<div className='bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-2'>
			<h3 className='text-lg font-semibold text-white/80 mb-2'>
				Ad Performance
			</h3>
			<div className='grid grid-cols-3 gap-2'>
				<div className='text-center'>
					<div className='text-xl font-bold text-blue-400'>
						{performance.views}
					</div>
					<div className='text-xs text-white/60'>Views</div>
				</div>
				<div className='text-center'>
					<div className='text-xl font-bold text-green-400'>
						{performance.clicks}
					</div>
					<div className='text-xs text-white/60'>Clicks</div>
				</div>
				<div className='text-center'>
					<div className='text-xl font-bold text-purple-400'>
						{performance.ctr.toFixed(2)}%
					</div>
					<div className='text-xs text-white/60'>CTR</div>
				</div>
			</div>
		</div>
	);
};

// Product Card Component
const ProductCard = ({
	product,
	onTogglePublish,
	isPublishedView = false,
	creatorEmail,
	user,
}: {
	product: Product;
	onTogglePublish: (id: string) => void;
	isPublishedView?: boolean;
	creatorEmail?: string;
	user: KindeUser;
}) => {
	const router = useRouter();
	const [showExpiredMessage, setShowExpiredMessage] = useState(false);
	const { toast } = useToast();

	const handleViewDetails = () => {
		if (isPublishedView && !product.isActive) {
			setShowExpiredMessage(true);
			return;
		}
		console.log('Navigating to product ID:', product.id);
		router.push(`/dashboard/product/${product.id}`);
	};

	const handlePublishToggle = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!isPublishedView) {
			onTogglePublish(product.id);
		}
	};

	const handleRequestAccess = async (e: React.MouseEvent) => {
		e.stopPropagation();
		try {
			if (!user?.email) {
				toast({
					title: 'Error',
					description: 'You must be logged in to request access.',
					variant: 'destructive',
				});
				return;
			}

			const response = await fetch('/api/adRequest', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-user-email': user.email,
				},
				body: JSON.stringify({
					adId: product.id,
					publisherId: product.createdBy,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				toast({
					title: 'Request Sent',
					description: 'Your request has been sent to the publisher.',
					variant: 'default',
				});
			} else {
				throw new Error(data.error || 'Failed to send request');
			}
		} catch (error) {
			console.error('Error sending request:', error);
			toast({
				title: 'Error',
				description:
					error instanceof Error
						? error.message
						: 'Failed to send request. Please try again.',
				variant: 'destructive',
			});
		}
	};

	// Calculate time display
	const getTimeDisplay = () => {
		if (product.isPublished && product.startDate) {
			const daysRemaining = product.daysRemaining || 0;
			return {
				text: `${daysRemaining} Days Left`,
				className:
					daysRemaining > 5
						? 'bg-green-500/20 text-green-400'
						: daysRemaining > 0
							? 'bg-yellow-500/20 text-yellow-400'
							: 'bg-red-500/20 text-red-400',
				isExpired: daysRemaining <= 0,
			};
		} else {
			const days = parseInt(product.numberOfDaysRunning || '0');
			return {
				text: `${days} Days`,
				className:
					days > 7
						? 'bg-green-500/20 text-green-400'
						: 'bg-yellow-500/20 text-yellow-400',
				isExpired: false,
			};
		}
	};

	const timeDisplay = getTimeDisplay();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className={`bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-4 
						${timeDisplay.isExpired ? 'opacity-75' : 'hover:border-blue-500/50'} 
						transition-all group relative`}
			onMouseEnter={() => timeDisplay.isExpired && setShowExpiredMessage(true)}
			onMouseLeave={() => setShowExpiredMessage(false)}>
			{/* Expired Message Overlay */}
			{showExpiredMessage && timeDisplay.isExpired && (
				<div className='absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-20'>
					<div className='text-center p-4'>
						<AlertCircle className='w-8 h-8 text-yellow-500 mx-auto mb-2' />
						<p className='text-white font-medium'>
							This ad has expired and is no longer active
						</p>
					</div>
				</div>
			)}

			{/* Publish Toggle */}
			{!isPublishedView && (
				<div
					className='absolute top-0.5 right-4 z-10 cursor-pointer group/toggle
							  bg-black/20 backdrop-blur-sm p-1 rounded-full
							  hover:bg-black/40 transition-all duration-200'
					onClick={handlePublishToggle}>
					{product.isPublished === true ? (
						<>
							<ToggleRight className='text-green-400 w-5 h-5' />
							<span
								className='absolute right-0 -top-8 bg-black/90 text-white text-xs px-2 py-1
										   rounded opacity-0 group-hover/toggle:opacity-100 transition-opacity
										   whitespace-nowrap'>
								Published
							</span>
						</>
					) : (
						<>
							<ToggleLeft className='text-gray-500 w-5 h-5' />
							<span
								className='absolute right-0 -top-8 bg-black/90 text-white text-xs px-2 py-1
										   rounded opacity-0 group-hover/toggle:opacity-100 transition-opacity
										   whitespace-nowrap'>
								Unpublished
							</span>
						</>
					)}
				</div>
			)}

			{/* Request Access Button for Active Published Ads */}
			{isPublishedView && !timeDisplay.isExpired && (
				<div className='absolute top-0.5 right-4 z-10'>
					<button
						onClick={handleRequestAccess}
						className='bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-2 rounded-full
								 transition-all duration-200 group/request'>
						<MessageCircle className='w-5 h-5' />
						<span
							className='absolute right-0 -top-8 bg-black/90 text-white text-xs px-2 py-1
									   rounded opacity-0 group-hover/request:opacity-100 transition-opacity
									   whitespace-nowrap'>
							Request Access
						</span>
					</button>
				</div>
			)}

			{/* Poster Image */}
			{product.adResourceUrl && (
				<div className='mb-4 rounded-lg overflow-hidden'>
					<Image
						src={product.adResourceUrl}
						alt={product.title}
						width={400}
						height={192}
						className='w-full h-48 object-cover'
						priority={false}
						quality={75}
					/>
				</div>
			)}

			<div className='flex justify-between items-start'>
				<div>
					<h3 className='text-lg font-semibold text-white/90 group-hover:text-blue-400 transition-colors'>
						{product.title}
					</h3>
					<p className='text-sm text-white/60 mt-1'>{product.type}</p>
				</div>
				<span
					className={`px-2 py-1 rounded-full text-xs font-medium ${timeDisplay.className}`}>
					{timeDisplay.text}
				</span>
			</div>

			<p className='text-sm text-white/70'>{product.description}</p>

			<div className='flex justify-between items-center'>
				<div className='text-sm text-white/60'>
					Cost per View:{' '}
					<span className='font-semibold'>{product.costPerView || 'N/A'}</span>
				</div>
				<button
					onClick={handleViewDetails}
					className='flex items-center gap-2 px-4 py-2 rounded-lg
							  bg-blue-500/10 hover:bg-blue-500/20
							  text-blue-400 hover:text-blue-300
							  border border-blue-500/20 hover:border-blue-500/30
							  transition-all duration-200 group'>
					<Eye className='w-4 h-4 group-hover:scale-110 transition-transform' />
					<span className='text-sm font-medium'>View Details</span>
				</button>
			</div>

			{isPublishedView && creatorEmail && (
				<div className='mt-4 pt-4 border-t border-white/10'>
					<p className='text-sm text-white/60 flex items-center gap-2'>
						<User className='w-4 h-4' />
						Published by: {creatorEmail}
					</p>
				</div>
			)}
		</motion.div>
	);
};

const StatsCard = ({ icon: Icon, label, value, trend }) => (
	<motion.div
		whileHover={{ y: -5 }}
		className='bg-gradient-to-br from-white/10 to-transparent p-6 rounded-xl border border-white/10'>
		<div className='flex justify-between items-start'>
			<div className='bg-blue-500/20 p-3 rounded-lg'>
				<Icon className='w-6 h-6 text-blue-400' />
			</div>
			{trend && (
				<span
					className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
					{trend}%
				</span>
			)}
		</div>
		<h4 className='text-2xl font-bold text-white mt-4'>{value}</h4>
		<p className='text-white/60 text-sm'>{label}</p>
	</motion.div>
);

const ExtendAdModal: React.FC<{
	ad: Product;
	onClose: () => void;
	onExtend: (id: string, days: number) => void;
}> = ({ ad, onClose, onExtend }) => {
	const [extensionDays, setExtensionDays] = useState(30);

	const handleExtend = () => {
		onExtend(ad.id, extensionDays);
		onClose();
	};

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ad Expiring Soon</DialogTitle>
					<DialogDescription>
						Your ad for {ad.title} will expire in {ad.daysRemaining} days
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='extension' className='text-right'>
							Extend by days:
						</Label>
						<Input
							id='extension'
							type='number'
							value={extensionDays}
							onChange={(e) => setExtensionDays(Number(e.target.value))}
							min={1}
							className='col-span-3'
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant='default' onClick={handleExtend}>
						Extend Ad
					</Button>
					<Button variant='destructive'>Deactivate Ad</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

// Main Dashboard Component
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
	const [isInitialized, setIsInitialized] = useState(false);

	const fetchProducts = useCallback(async () => {
		try {
			const response = await fetch(
				`/api/product?email=${encodeURIComponent(user?.email || '')}`
			);
			if (!response.ok) throw new Error('Failed to fetch products');
			const data = await response.json();

			// Ensure isPublished is explicitly boolean
			return data.map((product: Product) => ({
				...product,
				isPublished: Boolean(product.isPublished),
			}));
		} catch (error) {
			console.error('Error fetching products:', error);
			throw error;
		}
	}, [user?.email]);

	const fetchPublishedAds = useCallback(async () => {
		try {
			const response = await fetch('/api/publishProducts', {
				headers: {
					'x-user-email': user?.email || '',
					'Cache-Control': 'no-cache',
				},
			});
			if (!response.ok) throw new Error('Failed to fetch published ads');
			const data = await response.json();
			console.log('Published ads:', data);
			return data;
		} catch (error) {
			console.error('Error fetching published ads:', error);
			throw error;
		}
	}, [user?.email]);

	// Initialize data
	useEffect(() => {
		const initializeData = async () => {
			if (!user?.email || isInitialized) return;

			try {
				setLoading(true);
				const [productsData, publishedAdsData] = await Promise.all([
					fetchProducts(),
					fetchPublishedAds(),
				]);

				// Create a set of published ad IDs
				const publishedAdIds = new Set(
					publishedAdsData.map((ad: Product) => ad.id)
				);

				// Update products with correct published state
				const updatedProducts = productsData.map((product: Product) => ({
					...product,
					isPublished: publishedAdIds.has(product.id),
				}));

				setProducts(updatedProducts);
				setPublishedAds(publishedAdsData);
				setIsInitialized(true);
			} catch (error) {
				setError('Failed to initialize dashboard');
			} finally {
				setLoading(false);
			}
		};

		initializeData();
	}, [user?.email, isInitialized, fetchProducts, fetchPublishedAds]);

	// Check ad expirations
	useEffect(() => {
		const checkAdExpirations = async () => {
			try {
				const response = await fetch('/api/checkAdExpiration');
				const data = await response.json();
				const expiring = data.filter(
					(ad: Product) => ad.daysRemaining && ad.daysRemaining <= 5
				);
				setExpiringAds(expiring);
			} catch (error) {
				console.error('Error checking ad expirations:', error);
			}
		};

		// Initial check
		checkAdExpirations();

		// Check every 24 hours
		const intervalId = setInterval(checkAdExpirations, 24 * 60 * 60 * 1000);
		return () => clearInterval(intervalId);
	}, []);

	// Update handleTogglePublish
	const handleTogglePublish = async (productId: string) => {
		try {
			const currentProduct = products.find((p) => p.id === productId);
			if (!currentProduct) return;

			// Optimistic update
			setProducts((prev) =>
				prev.map((p) =>
					p.id === productId ? { ...p, isPublished: !p.isPublished } : p
				)
			);

			const response = await fetch('/api/publishProducts', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'x-user-email': user?.email || '',
				},
				body: JSON.stringify({
					id: productId,
					isPublished: !currentProduct.isPublished,
				}),
			});

			if (!response.ok) {
				// Revert on failure
				setProducts((prev) =>
					prev.map((p) =>
						p.id === productId
							? { ...p, isPublished: currentProduct.isPublished }
							: p
					)
				);
				throw new Error('Failed to update publish status');
			}

			// Refresh published ads
			const publishedAdsData = await fetchPublishedAds();
			setPublishedAds(publishedAdsData);
		} catch (error) {
			console.error('Error toggling publish status:', error);
		}
	};

	// New method to handle ad extension
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

			// Refresh the products list or update local state
			const updatedProductsResponse = await fetch(
				`/api/product?email=${encodeURIComponent(user.email)}`
			);
			const updatedProducts = await updatedProductsResponse.json();
			setProducts(updatedProducts);

			// Remove the ad from expiring ads
			setExpiringAds(expiringAds.filter((ad) => ad.id !== adId));
		} catch (error) {
			console.error('Error extending ad:', error);
		}
	};

	const filteredProducts = products.filter(
		(product) =>
			product.title.toLowerCase().includes(filter.toLowerCase()) ||
			product.type.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white p-8 md:p-16 lg:p-20'>
			<div className='max-w-7xl mx-auto'>
				{/* Header & User Greeting */}
				<div className='flex justify-between items-center mb-8'>
					<div>
						<h1 className='text-3xl font-bold text-white/90 mb-2'>Dashboard</h1>
						<p className='text-white/70'>
							Welcome back, <strong>{user.given_name || 'User'}</strong>!
							Let&#39;s manage your ads effectively.
						</p>
					</div>
					<div className='flex items-center space-x-4'>
						<button className='bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 p-2 rounded-full'>
							<PlusCircle />
						</button>
						<button className='bg-gray-700/50 text-white/70 hover:bg-gray-700/70 p-2 rounded-full'>
							<RefreshCw />
						</button>
					</div>
				</div>

				{/* Performance Overview */}
				<div className='grid md:grid-cols-3 gap-6 mb-8'>
					<div className='md:col-span-2'>
						<PerformanceCard
							performance={{
								views: products.reduce(
									(sum, p) => sum + (p.performance?.views || 0),
									0
								),
								clicks: products.reduce(
									(sum, p) => sum + (p.performance?.clicks || 0),
									0
								),
								ctr:
									products.reduce(
										(sum, p) => sum + (p.performance?.ctr || 0),
										0
									) / (products.length || 1),
							}}
						/>
					</div>
					<div>
						<div className='relative'>
							<input
								type='text'
								placeholder='Filter ads...'
								value={filter}
								onChange={(e) => setFilter(e.target.value)}
								className='w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 focus:border-blue-500 transition-colors'
							/>
							<Search
								className='absolute left-3 top-1/2 -translate-y-1/2 text-white/50'
								size={20}
							/>
						</div>
					</div>
				</div>

				{/* Expiring Ads Notification */}
				{expiringAds.length > 0 && (
					<div className='mb-6 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-center'>
						<Clock className='mr-4 text-yellow-500' />
						<div>
							<p className='text-yellow-400 font-semibold'>
								{expiringAds.length} Ad{expiringAds.length > 1 ? 's' : ''}{' '}
								Expiring Soon
							</p>
							<div className='flex space-x-2 mt-2'>
								{expiringAds.map((ad) => (
									<button
										key={ad.id}
										onClick={() => setSelectedExpiringAd(ad)}
										className='bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 px-3 py-1 rounded-full text-sm'>
										{ad.title} ({ad.daysRemaining} days left)
									</button>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Ads Section */}
				<div>
					<div className='flex justify-between items-center mb-6'>
						<h2 className='text-2xl font-bold text-white/90'>
							<Tabs defaultValue='your-ads' className='w-full'>
								<TabsList className='grid w-[400px] grid-cols-2'>
									<TabsTrigger value='your-ads'>Your Ads</TabsTrigger>
									<TabsTrigger value='published'>Published Ads</TabsTrigger>
								</TabsList>

								<TabsContent value='your-ads'>
									{/* Existing Your Ads Content */}
									{loading ? (
										<div>Loading...</div>
									) : error ? (
										<div className='bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center'>
											<AlertCircle className='mr-4 text-red-500' />
											<p className='text-red-400'>{error}</p>
										</div>
									) : filteredProducts.length > 0 ? (
										<motion.div
											layout
											className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
											<AnimatePresence>
												{filteredProducts.map((product) => (
													<ProductCard
														key={product.id}
														product={product}
														onTogglePublish={handleTogglePublish}
														user={user}
													/>
												))}
											</AnimatePresence>
										</motion.div>
									) : (
										<div className='text-center py-16 text-white/60'>
											<p>No ads found. Create your first ad!</p>
										</div>
									)}
								</TabsContent>

								<TabsContent value='published'>
									<motion.div
										layout
										className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
										<AnimatePresence>
											{publishedAds.map((product) => (
												<ProductCard
													key={product.id}
													product={product}
													onTogglePublish={handleTogglePublish}
													isPublishedView={true}
													creatorEmail={product.createdBy}
													user={user}
												/>
											))}
										</AnimatePresence>
									</motion.div>
								</TabsContent>
							</Tabs>
						</h2>
						{/* <button className='flex items-center text-white/70 hover:text-white'>
							<Filter className='mr-2' size={16} />
							Filter
						</button> */}
					</div>
				</div>
				{/* Extend Ad Modal */}
				{selectedExpiringAd && (
					<ExtendAdModal
						ad={selectedExpiringAd}
						onClose={() => setSelectedExpiringAd(null)}
						onExtend={handleExtendAd}
					/>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
