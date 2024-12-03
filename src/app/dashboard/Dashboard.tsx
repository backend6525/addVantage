// 'use client';

// import React, { useEffect, useState } from 'react';
// import { HeaderCard, CreateAdd } from '../components/dashboardUi/Cards';
// import ProductGrid from '../components/dashboardUi/Cards/ProductCard';

// interface Product {
// 	id: string;
// 	type: string;
// 	adResourceUrl?: string;
// 	title: string;
// 	description: string;
// 	costPerView?: string;
// 	numberOfDaysRunning?: string;
// }

// interface KindeUser {
// 	email?: string;
// 	given_name?: string;
// 	family_name?: string;
// }

// interface DashboardProps {
// 	isMenuOpen: boolean;
// 	user: KindeUser;
// }

// const Dashboard: React.FC<DashboardProps> = ({ isMenuOpen, user }) => {
// 	const [products, setProducts] = useState<Product[]>([]);
// 	const [loading, setLoading] = useState<boolean>(true);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchProducts = async () => {
// 			if (!user.email) {
// 				setError('User email is missing.');
// 				return;
// 			}

// 			try {
// 				setLoading(true);
// 				setError(null);

// 				// Fetch products from the backend API
// 				const response = await fetch(
// 					`/api/product?email=${encodeURIComponent(user.email)}`
// 				);
// 				if (!response.ok) {
// 					throw new Error('Failed to fetch products');
// 				}

// 				const data: Product[] = await response.json();
// 				setProducts(data);
// 			} catch (err) {
// 				console.error('Error:', err);
// 				setError('Could not load products. Please try again later.');
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchProducts();
// 	}, [user.email]);

// 	return (
// 		<div className='p-20 bg-gray-50 dark:bg-gray-900 min-h-screen'>
// 			{/* Header Section */}
// 			<HeaderCard />

// 			{/* User Greeting */}
// 			<p className='text-gray-800 dark:text-gray-200 mb-4'>
// 				Welcome, <strong>{user.given_name || 'User'}</strong>!
// 			</p>

// 			{/* Create Ad Section */}
// 			<CreateAdd />

// 			{/* Product Grid Section */}
// 			<h2 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4'>
// 				Your Ads
// 			</h2>

// 			{/* Loading and Error States */}
// 			{loading ? (
// 				<p className='text-gray-600 dark:text-gray-400'>Loading ads...</p>
// 			) : error ? (
// 				<p className='text-red-500'>{error}</p>
// 			) : products.length > 0 ? (
// 				<ProductGrid products={products} />
// 			) : (
// 				<p className='text-gray-600 dark:text-gray-400'>No ads found.</p>
// 			)}
// 		</div>
// 	);
// };

// export default Dashboard;

// 'use client';

// import React, { useEffect, useState, Suspense } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
// 	PlusCircle,
// 	RefreshCw,
// 	Filter,
// 	Search,
// 	AlertCircle,
// 	ChevronDown,
// } from 'lucide-react';

// // Types
// interface Product {
// 	id: string;
// 	type: string;
// 	adResourceUrl?: string;
// 	title: string;
// 	description: string;
// 	costPerView?: string;
// 	numberOfDaysRunning?: string;
// 	performance?: {
// 		views: number;
// 		clicks: number;
// 		ctr: number;
// 	};
// }

// interface KindeUser {
// 	email?: string;
// 	given_name?: string;
// 	family_name?: string;
// }

// interface DashboardProps {
// 	isMenuOpen: boolean;
// 	user: KindeUser;
// }

// // Performance Card Component
// const PerformanceCard = ({
// 	performance,
// }: {
// 	performance?: Product['performance'];
// }) => {
// 	if (!performance) return null;

// 	return (
// 		<div className='bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-2'>
// 			<h3 className='text-lg font-semibold text-white/80 mb-2'>
// 				Ad Performance
// 			</h3>
// 			<div className='grid grid-cols-3 gap-2'>
// 				<div className='text-center'>
// 					<div className='text-xl font-bold text-blue-400'>
// 						{performance.views}
// 					</div>
// 					<div className='text-xs text-white/60'>Views</div>
// 				</div>
// 				<div className='text-center'>
// 					<div className='text-xl font-bold text-green-400'>
// 						{performance.clicks}
// 					</div>
// 					<div className='text-xs text-white/60'>Clicks</div>
// 				</div>
// 				<div className='text-center'>
// 					<div className='text-xl font-bold text-purple-400'>
// 						{performance.ctr.toFixed(2)}%
// 					</div>
// 					<div className='text-xs text-white/60'>CTR</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// // Product Card Component
// const ProductCard = ({ product }: { product: Product }) => {
// 	return (
// 		<motion.div
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ duration: 0.3 }}
// 			className='bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-4 hover:border-blue-500/50 transition-all group'>
// 			<div className='flex justify-between items-start'>
// 				<div>
// 					<h3 className='text-lg font-semibold text-white/90 group-hover:text-blue-400 transition-colors'>
// 						{product.title}
// 					</h3>
// 					<p className='text-sm text-white/60 mt-1'>{product.type}</p>
// 				</div>
// 				<span
// 					className={`px-2 py-1 rounded-full text-xs font-medium ${
// 						product.numberOfDaysRunning &&
// 						parseInt(product.numberOfDaysRunning) > 7
// 							? 'bg-green-500/20 text-green-400'
// 							: 'bg-yellow-500/20 text-yellow-400'
// 					}`}>
// 					{product.numberOfDaysRunning} Days
// 				</span>
// 			</div>
// 			<p className='text-sm text-white/70'>{product.description}</p>
// 			<div className='flex justify-between items-center'>
// 				<div className='text-sm text-white/60'>
// 					Cost per View:{' '}
// 					<span className='font-semibold'>{product.costPerView}</span>
// 				</div>
// 				<button className='text-blue-400 hover:text-blue-300 transition-colors'>
// 					View Details
// 				</button>
// 			</div>
// 		</motion.div>
// 	);
// };

// // Loading Skeleton
// const ProductGridSkeleton = () => (
// 	<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
// 		{[...Array(3)].map((_, index) => (
// 			<div
// 				key={index}
// 				className='bg-white/5 animate-pulse rounded-xl p-4 space-y-4'>
// 				<div className='h-6 bg-white/10 rounded w-3/4'></div>
// 				<div className='h-4 bg-white/10 rounded w-1/2'></div>
// 				<div className='h-20 bg-white/10 rounded'></div>
// 			</div>
// 		))}
// 	</div>
// );

// // Main Dashboard Component
// const Dashboard: React.FC<DashboardProps> = ({ isMenuOpen, user }) => {
// 	const [products, setProducts] = useState<Product[]>([]);
// 	const [loading, setLoading] = useState<boolean>(true);
// 	const [error, setError] = useState<string | null>(null);
// 	const [filter, setFilter] = useState<string>('');

// 	useEffect(() => {
// 		const fetchProducts = async () => {
// 			if (!user.email) {
// 				setError('User email is missing.');
// 				return;
// 			}

// 			try {
// 				setLoading(true);
// 				setError(null);

// 				const response = await fetch(
// 					`/api/product?email=${encodeURIComponent(user.email)}`
// 				);
// 				if (!response.ok) {
// 					throw new Error('Failed to fetch products');
// 				}

// 				const data: Product[] = await response.json();
// 				setProducts(data);
// 			} catch (err) {
// 				console.error('Error:', err);
// 				setError('Could not load products. Please try again later.');
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchProducts();
// 	}, [user.email]);

// 	const filteredProducts = products.filter(
// 		(product) =>
// 			product.title.toLowerCase().includes(filter.toLowerCase()) ||
// 			product.type.toLowerCase().includes(filter.toLowerCase())
// 	);

// 	return (
// 		<div className='bg-gradient-to-br from-gray-900 to-black min-h-screen text-white p-8 md:p-16 lg:p-20'>
// 			<div className='max-w-7xl mx-auto'>
// 				{/* Header & User Greeting */}
// 				<div className='flex justify-between items-center mb-8'>
// 					<div>
// 						<h1 className='text-3xl font-bold text-white/90 mb-2'>Dashboard</h1>
// 						<p className='text-white/70'>
// 							Welcome back, <strong>{user.given_name || 'User'}</strong>! Let's
// 							manage your ads effectively.
// 						</p>
// 					</div>
// 					<div className='flex items-center space-x-4'>
// 						<button className='bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 p-2 rounded-full'>
// 							<PlusCircle />
// 						</button>
// 						<button className='bg-gray-700/50 text-white/70 hover:bg-gray-700/70 p-2 rounded-full'>
// 							<RefreshCw />
// 						</button>
// 					</div>
// 				</div>

// 				{/* Performance Overview */}
// 				<div className='grid md:grid-cols-3 gap-6 mb-8'>
// 					<div className='md:col-span-2'>
// 						<PerformanceCard
// 							performance={{
// 								views: products.reduce(
// 									(sum, p) => sum + (p.performance?.views || 0),
// 									0
// 								),
// 								clicks: products.reduce(
// 									(sum, p) => sum + (p.performance?.clicks || 0),
// 									0
// 								),
// 								ctr:
// 									products.reduce(
// 										(sum, p) => sum + (p.performance?.ctr || 0),
// 										0
// 									) / products.length,
// 							}}
// 						/>
// 					</div>
// 					<div>
// 						<div className='relative'>
// 							<input
// 								type='text'
// 								placeholder='Filter ads...'
// 								value={filter}
// 								onChange={(e) => setFilter(e.target.value)}
// 								className='w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 focus:border-blue-500 transition-colors'
// 							/>
// 							<Search
// 								className='absolute left-3 top-1/2 -translate-y-1/2 text-white/50'
// 								size={20}
// 							/>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Ads Section */}
// 				<div>
// 					<div className='flex justify-between items-center mb-6'>
// 						<h2 className='text-2xl font-bold text-white/90'>Your Ads</h2>
// 						<button className='flex items-center text-white/70 hover:text-white'>
// 							<Filter className='mr-2' size={16} />
// 							Filter
// 						</button>
// 					</div>

// 					{loading ? (
// 						<ProductGridSkeleton />
// 					) : error ? (
// 						<div className='bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center'>
// 							<AlertCircle className='mr-4 text-red-500' />
// 							<p className='text-red-400'>{error}</p>
// 						</div>
// 					) : filteredProducts.length > 0 ? (
// 						<motion.div
// 							layout
// 							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
// 							<AnimatePresence>
// 								{filteredProducts.map((product) => (
// 									<ProductCard key={product.id} product={product} />
// 								))}
// 							</AnimatePresence>
// 						</motion.div>
// 					) : (
// 						<div className='text-center py-16 text-white/60'>
// 							<p>No ads found. Create your first ad!</p>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Dashboard;

'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	PlusCircle,
	RefreshCw,
	Filter,
	Search,
	AlertCircle,
	ChevronDown,
} from 'lucide-react';

// Types
interface Product {
	id: string;
	type: string;
	adResourceUrl?: string;
	posterUrl?: string; // Added poster URL
	title: string;
	description: string;
	costPerView?: string;
	numberOfDaysRunning?: string;
	performance?: {
		views: number;
		clicks: number;
		ctr: number;
	};
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
const ProductCard = ({ product }: { product: Product }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className='bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-4 hover:border-blue-500/50 transition-all group'>
			{/* Poster Image */}
			{product.adResourceUrl && (
				<div className='mb-4 rounded-lg overflow-hidden'>
					<img
						src={product.adResourceUrl}
						alt={product.title}
						className='w-full h-48 object-cover'
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
					className={`px-2 py-1 rounded-full text-xs font-medium ${
						product.numberOfDaysRunning &&
						parseInt(product.numberOfDaysRunning) > 7
							? 'bg-green-500/20 text-green-400'
							: 'bg-yellow-500/20 text-yellow-400'
					}`}>
					{product.numberOfDaysRunning} Days
				</span>
			</div>
			<p className='text-sm text-white/70'>{product.description}</p>
			<div className='flex justify-between items-center'>
				<div className='text-sm text-white/60'>
					Cost per View:{' '}
					<span className='font-semibold'>{product.costPerView}</span>
				</div>
				<button className='text-blue-400 hover:text-blue-300 transition-colors'>
					View Details
				</button>
			</div>
		</motion.div>
	);
};

// Loading Skeleton
const ProductGridSkeleton = () => (
	<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
		{[...Array(3)].map((_, index) => (
			<div
				key={index}
				className='bg-white/5 animate-pulse rounded-xl p-4 space-y-4'>
				<div className='h-48 bg-white/10 rounded w-full'></div>
				<div className='h-6 bg-white/10 rounded w-3/4'></div>
				<div className='h-4 bg-white/10 rounded w-1/2'></div>
				<div className='h-20 bg-white/10 rounded'></div>
			</div>
		))}
	</div>
);

// Main Dashboard Component
const Dashboard: React.FC<DashboardProps> = ({ isMenuOpen, user }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [filter, setFilter] = useState<string>('');

	useEffect(() => {
		const fetchProducts = async () => {
			if (!user.email) {
				setError('User email is missing.');
				return;
			}

			try {
				setLoading(true);
				setError(null);

				const response = await fetch(
					`/api/product?email=${encodeURIComponent(user.email)}`
				);
				if (!response.ok) {
					throw new Error('Failed to fetch products');
				}

				const data: Product[] = await response.json();
				setProducts(data);
			} catch (err) {
				console.error('Error:', err);
				setError('Could not load products. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [user.email]);

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
							Welcome back, <strong>{user.given_name || 'User'}</strong>! Let's
							manage your ads effectively.
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

				{/* Ads Section */}
				<div>
					<div className='flex justify-between items-center mb-6'>
						<h2 className='text-2xl font-bold text-white/90'>Your Ads</h2>
						<button className='flex items-center text-white/70 hover:text-white'>
							<Filter className='mr-2' size={16} />
							Filter
						</button>
					</div>

					{loading ? (
						<ProductGridSkeleton />
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
									<ProductCard key={product.id} product={product} />
								))}
							</AnimatePresence>
						</motion.div>
					) : (
						<div className='text-center py-16 text-white/60'>
							<p>No ads found. Create your first ad!</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
