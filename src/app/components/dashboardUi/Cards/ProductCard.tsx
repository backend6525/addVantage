// import React, { useState } from 'react';
// import Link from 'next/link';
// import './styles/productcard.css';

// interface Product {
// 	id: string;
// 	type: string; // Type to distinguish ad types
// 	videoSrc?: string;
// 	imageSrc?: string;
// 	audioSrc?: string;
// 	title: string;
// 	description: string;
// 	size?: string; // Size for banners or other variations
// }

// const ProductGrid = ({ products }: { products: Product[] }) => {
// 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// 		null
// 	);

// 	const handleProductClick = (productId: string) => {
// 		setSelectedProductId(productId); // Capture clicked product ID
// 		console.log('Selected Product ID:', productId);
// 	};

// 	return (
// 		<div className='productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8'>
// 			{products.map((product: Product, index: number) => (
// 				<Link
// 					key={index}
// 					href={product.id ? `/dashboard/product/${product.id}` : '#'}
// 					onClick={() => handleProductClick(product.id)}
// 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// 						selectedProductId === product.id ? 'selected-card' : ''
// 					} ${product.size ? `size-${product.size}` : ''}`}>
// 					{product.type === 'video' && product.videoSrc && (
// 						<video
// 							src={product.videoSrc}
// 							className='rounded-lg mb-4 w-full h-48 object-cover video'
// 							onPlay={(e) => e.currentTarget.classList.add('video-playing')}
// 							onPause={(e) => e.currentTarget.classList.remove('video-playing')}
// 							controls
// 						/>
// 					)}
// 					{product.type === 'Poster' && product.imageSrc && (
// 						<img
// 							src={product.imageSrc}
// 							className='rounded-lg mb-4 w-full h-48 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'banner' && product.imageSrc && (
// 						<img
// 							src={product.imageSrc}
// 							className='rounded-lg mb-4 w-full h-24 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'audio' && product.audioSrc && (
// 						<audio
// 							src={product.audioSrc}
// 							className='rounded-lg mb-4 w-full'
// 							controls
// 						/>
// 					)}
// 					<h3 className='text-lg font-semibold text-white'>{product.title}</h3>
// 					<p className='text-gray-300 mt-2'>{product.description}</p>
// 				</Link>
// 			))}

// 			{selectedProductId && (
// 				<div className='mt-4 text-white'>
// 					<p>Selected Product ID: {selectedProductId}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProductGrid;

// import React, { useState } from 'react';
// import Link from 'next/link';
// import './styles/productcard.css';

// interface Product {
// 	id: string;
// 	type: string; // Type to distinguish ad types
// 	videoSrc?: string;
// 	imageSrc?: string;
// 	audioSrc?: string;
// 	title: string;
// 	description: string;
// 	size?: string; // Size for banners or other variations
// }

// const ProductGrid = ({ products }: { products: Product[] }) => {
// 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// 		null
// 	);

// 	const handleProductClick = (productId: string) => {
// 		setSelectedProductId(productId); // Capture clicked product ID
// 		console.log('Selected Product ID:', productId);
// 	};

// 	// Assume backendProducts is the response from your backend
// 	const backendProducts = [
// 		{
// 			_id: '1',
// 			AdName: 'Ad 1',
// 			AdResource: 'video',
// 			adResourceUrl: 'https://example.com/video.mp4',
// 			costPerView: 0.5,
// 			createdBy: 'user1',
// 			numberOfDaysRunning: 7,
// 			teamId: 'team1',
// 			Type: 'video',
// 			_creationTime: '2023-06-25T21:42:29Z',
// 		},
// 		// More products...
// 	];

// 	// Map backend data to Product interface
// 	const mappedProducts: Product[] = backendProducts.map((ad) => ({
// 		id: ad._id,
// 		type: ad.Type,
// 		videoSrc: ad.Type === 'video' ? ad.adResourceUrl : undefined,
// 		imageSrc: ad.Type === 'image' ? ad.adResourceUrl : undefined,
// 		audioSrc: ad.Type === 'audio' ? ad.adResourceUrl : undefined,
// 		title: ad.AdName,
// 		description: `${ad.createdBy} - ${ad.costPerView} per view`,
// 		size: ad.Type === 'banner' ? 'banner' : undefined,
// 	}));

// 	return (
// 		<div className='productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8'>
// 			{mappedProducts.map((product: Product, index: number) => (
// 				<Link
// 					key={index}
// 					href={product.id ? `/dashboard/product/${product.id}` : '#'}
// 					onClick={() => handleProductClick(product.id)}
// 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// 						selectedProductId === product.id ? 'selected-card' : ''
// 					} ${product.size ? `size-${product.size}` : ''}`}>
// 					{product.type === 'video' && product.videoSrc && (
// 						<video
// 							src={product.videoSrc}
// 							className='rounded-lg mb-4 w-full h-48 object-cover video'
// 							onPlay={(e) => e.currentTarget.classList.add('video-playing')}
// 							onPause={(e) => e.currentTarget.classList.remove('video-playing')}
// 							controls
// 						/>
// 					)}
// 					{product.type === 'Poster' && product.imageSrc && (
// 						<img
// 							src={product.imageSrc}
// 							className='rounded-lg mb-4 w-full h-48 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'banner' && product.imageSrc && (
// 						<img
// 							src={product.imageSrc}
// 							className='rounded-lg mb-4 w-full h-24 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'audio' && product.audioSrc && (
// 						<audio
// 							src={product.audioSrc}
// 							className='rounded-lg mb-4 w-full'
// 							controls
// 						/>
// 					)}
// 					<h3 className='text-lg font-semibold text-white'>{product.title}</h3>
// 					<p className='text-gray-300 mt-2'>{product.description}</p>
// 				</Link>
// 			))}

// 			{selectedProductId && (
// 				<div className='mt-4 text-white'>
// 					<p>Selected Product ID: {selectedProductId}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProductGrid;

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import './styles/productcard.css';

// // Product interface definition
// interface Product {
// 	id: string;
// 	type: string; // Type to distinguish ad types
// 	videoSrc?: string;
// 	imageSrc?: string;
// 	audioSrc?: string;
// 	title: string;
// 	description: string;
// 	size?: string; // Size for banners or other variations
// }

// // Fetch products from backend
// const fetchProducts = async () => {
// 	const response = await fetch('/api/products'); // Update the URL to your backend endpoint
// 	const data = await response.json();
// 	return data;
// };

// const ProductGrid = () => {
// 	const [products, setProducts] = useState<Product[]>([]);
// 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// 		null
// 	);

// 	useEffect(() => {
// 		const getProducts = async () => {
// 			const backendProducts = await fetchProducts();

// 			// Map backend data to Product interface
// 			const mappedProducts: Product[] = backendProducts.map((ad) => ({
// 				id: ad._id,
// 				type: ad.Type,
// 				videoSrc: ad.Type === 'video' ? ad.adResourceUrl : undefined,
// 				imageSrc: ad.Type === 'Poster' ? ad.adResourceUrl : undefined,
// 				audioSrc: ad.Type === 'audio' ? ad.adResourceUrl : undefined,
// 				title: ad.AdName,
// 				description: `${ad.createdBy} - ${ad.costPerView} per view`,
// 				size: ad.Type === 'banner' ? 'banner' : undefined,
// 			}));

// 			setProducts(mappedProducts);
// 		};

// 		getProducts();
// 	}, []);

// 	const handleProductClick = (productId: string) => {
// 		setSelectedProductId(productId);
// 		console.log('Selected Product ID:', productId);
// 	};

// 	return (
// 		<div className='productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8'>
// 			{products.map((product: Product, index: number) => (
// 				<Link
// 					key={index}
// 					href={product.id ? `/dashboard/product/${product.id}` : '#'}
// 					onClick={() => handleProductClick(product.id)}
// 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// 						selectedProductId === product.id ? 'selected-card' : ''
// 					} ${product.size ? `size-${product.size}` : ''}`}>
// 					{product.type === 'video' && product.videoSrc && (
// 						<video
// 							src={product.videoSrc}
// 							className='rounded-lg mb-4 w-full h-48 object-cover video'
// 							onPlay={(e) => e.currentTarget.classList.add('video-playing')}
// 							onPause={(e) => e.currentTarget.classList.remove('video-playing')}
// 							controls
// 						/>
// 					)}
// 					{product.type === 'Poster' && product.imageSrc && (
// 						<img
// 							src={product.imageSrc}
// 							className='rounded-lg mb-4 w-full h-48 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'banner' && product.imageSrc && (
// 						<img
// 							src={product.imageSrc}
// 							className='rounded-lg mb-4 w-full h-24 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'audio' && product.audioSrc && (
// 						<audio
// 							src={product.audioSrc}
// 							className='rounded-lg mb-4 w-full'
// 							controls
// 						/>
// 					)}
// 					<h3 className='text-lg font-semibold text-white'>{product.title}</h3>
// 					<p className='text-gray-300 mt-2'>{product.description}</p>
// 				</Link>
// 			))}

// 			{selectedProductId && (
// 				<div className='mt-4 text-white'>
// 					<p>Selected Product ID: {selectedProductId}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProductGrid;

// import React, { useState } from 'react';
// import Link from 'next/link';
// import './styles/productcard.css';

// interface Product {
// 	id: string;
// 	type: string; // Type to distinguish ad types
// 	adResource?: string;
// 	adResourceUrl?: string;
// 	title: string;
// 	description: string;
// 	size?: string; // Size for banners or other variations
// }

// const ProductGrid = ({ products }: { products: Product[] }) => {
// 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// 		null
// 	);

// 	const handleProductClick = (productId: string) => {
// 		setSelectedProductId(productId);
// 		console.log('Selected Product ID:', productId);
// 	};

// 	return (
// 		<div className='productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8'>
// 			{products.map((product: Product, index: number) => (
// 				<Link
// 					key={index}
// 					href={product.id ? `/dashboard/product/${product.id}` : '#'}
// 					onClick={() => handleProductClick(product.id)}
// 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// 						selectedProductId === product.id ? 'selected-card' : ''
// 					} ${product.size ? `size-${product.size}` : ''}`}>
// 					{product.type === 'video' && product.adResourceUrl && (
// 						<video
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-48 object-cover video'
// 							onPlay={(e) => e.currentTarget.classList.add('video-playing')}
// 							onPause={(e) => e.currentTarget.classList.remove('video-playing')}
// 							controls
// 						/>
// 					)}
// 					{product.type === 'Poster' && product.adResourceUrl && (
// 						<img
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-48 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'banner' && product.adResourceUrl && (
// 						<img
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-24 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'audio' && product.adResourceUrl && (
// 						<audio
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full'
// 							controls
// 						/>
// 					)}
// 					<h3 className='text-lg font-semibold text-white'>{product.title}</h3>
// 					<p className='text-gray-300 mt-2'>{product.description}</p>
// 				</Link>
// 			))}

// 			{selectedProductId && (
// 				<div className='mt-4 text-white'>
// 					<p>Selected Product ID: {selectedProductId}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProductGrid;

// import React, { useState } from 'react';
// import Link from 'next/link';
// import './styles/productcard.css';

// interface Product {
// 	id: string;
// 	type: string; // Type to distinguish ad types
// 	adResource?: string;
// 	adResourceUrl?: string;
// 	title: string;
// 	description: string;
// 	size?: string; // Size for banners or other variations
// }

// const ProductGrid = ({ products }: { products: Product[] }) => {
// 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// 		null
// 	);

// 	const handleProductClick = (productId: string) => {
// 		setSelectedProductId(productId);
// 		console.log('Selected Product ID:', productId);
// 	};

// 	return (
// 		<div className='productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8'>
// 			{products.map((product: Product, index: number) => (
// 				<Link
// 					key={index}
// 					href={product.id ? `/dashboard/product/${product.id}` : '#'}
// 					onClick={() => handleProductClick(product.id)}
// 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// 						selectedProductId === product.id ? 'selected-card' : ''
// 					} ${product.size ? `size-${product.size}` : ''}`}>
// 					{product.type === 'video' && product.adResourceUrl && (
// 						<video
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-48 object-cover video'
// 							onPlay={(e) => e.currentTarget.classList.add('video-playing')}
// 							onPause={(e) => e.currentTarget.classList.remove('video-playing')}
// 							controls
// 						/>
// 					)}
// 					{product.type === 'Poster' && product.adResourceUrl && (
// 						<img
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-48 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'banner' && product.adResourceUrl && (
// 						<img
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-24 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'audio' && product.adResourceUrl && (
// 						<audio
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full'
// 							controls
// 						/>
// 					)}
// 					<h3 className='text-lg font-semibold text-white'>{product.title}</h3>
// 					<p className='text-gray-300 mt-2'>{product.description}</p>
// 				</Link>
// 			))}

// 			{selectedProductId && (
// 				<div className='mt-4 text-white'>
// 					<p>Selected Product ID: {selectedProductId}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProductGrid;

// import React, { useState } from 'react';
// import Link from 'next/link';
// import './styles/productcard.css';

// interface Product {
// 	id: string;
// 	type: string; // Type to distinguish ad types
// 	adResource?: string;
// 	adResourceUrl?: string;
// 	title: string;
// 	description: string;
// 	size?: string; // Size for banners or other variations
// }

// const ProductGrid = ({ products }: { products: Product[] }) => {
// 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// 		null
// 	);

// 	const handleProductClick = (productId: string) => {
// 		setSelectedProductId(productId);
// 		console.log('Selected Product ID:', productId);
// 	};

// 	return (
// 		<div className='productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8'>
// 			{products.map((product: Product, index: number) => (
// 				<Link
// 					key={index}
// 					href={product.id ? `/dashboard/product/${product.id}` : '#'}
// 					onClick={() => handleProductClick(product.id)}
// 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// 						selectedProductId === product.id ? 'selected-card' : ''
// 					} ${product.size ? `size-${product.size}` : ''}`}>
// 					{product.type === 'video' && product.adResourceUrl && (
// 						<video
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-48 object-cover video'
// 							onPlay={(e) => e.currentTarget.classList.add('video-playing')}
// 							onPause={(e) => e.currentTarget.classList.remove('video-playing')}
// 							controls
// 						/>
// 					)}
// 					{product.type === 'Poster' && product.adResourceUrl && (
// 						<img
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-48 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'banner' && product.adResourceUrl && (
// 						<img
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-24 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'audio' && product.adResourceUrl && (
// 						<audio
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full'
// 							controls
// 						/>
// 					)}
// 					<h3 className='text-lg font-semibold text-white'>{product.title}</h3>

// 					{product.adResourceUrl && product.type === 'Poster' && (
// 						<div className='image-container'>
// 							<img
// 								src={product.adResourceUrl}
// 								className='rounded-lg mb-4 w-full h-48 object-cover'
// 								alt={product.title}
// 							/>
// 						</div>
// 					)}

// 					<p className='text-gray-300 mt-2'>{product.description}</p>
// 				</Link>
// 			))}

// 			{selectedProductId && (
// 				<div className='mt-4 text-white'>
// 					<p>Selected Product ID: {selectedProductId}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProductGrid;

// import React, { useState } from 'react';
// import Link from 'next/link';
// import './styles/productcard.css';

// interface Product {
// 	id: string;
// 	type: string;
// 	adResource?: string;
// 	title: string;
// 	description: string;
// 	size?: string;
// }

// const ProductGrid = ({ products }: { products: Product[] }) => {
// 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// 		null
// 	);

// 	const handleProductClick = (productId: string) => {
// 		setSelectedProductId(productId);
// 		console.log('Selected Product ID:', productId);
// 	};

// 	return (
// 		<div className='productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8'>
// 			{products.map((product: Product, index: number) => (
// 				<Link
// 					key={index}
// 					href={product.id ? `/dashboard/product/${product.id}` : '#'}
// 					onClick={() => handleProductClick(product.id)}
// 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// 						selectedProductId === product.id ? 'selected-card' : ''
// 					} ${product.size ? `size-${product.size}` : ''}`}>
// 					{/* Conditional rendering based on product type */}
// 					{product.type === 'video' && product.adResource && (
// 						<video
// 							src={product.adResource}
// 							className='rounded-lg mb-4 w-full h-48 object-cover'
// 							controls
// 						/>
// 					)}
// 					{product.type === 'Poster' && product.adResource && (
// 						<img
// 							src={product.adResource}
// 							className='rounded-lg mb-4 w-full h-48 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'banner' && product.adResource && (
// 						<img
// 							src={product.adResource}
// 							className='rounded-lg mb-4 w-full h-24 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'audio' && product.adResource && (
// 						<audio
// 							src={product.adResource}
// 							className='rounded-lg mb-4 w-full'
// 							controls
// 						/>
// 					)}

// 					{/* Display title and description */}
// 					<h3 className='text-lg font-semibold text-white'>{product.title}</h3>
// 					{product.adResource && product.type === 'Poster' && (
// 						<div className='image-container'>
// 							<img
// 								src={product.adResource}
// 								className='rounded-lg mb-4 w-full h-48 object-cover'
// 								alt={product.title}
// 							/>
// 						</div>
// 					)}
// 					<p className='text-gray-300 mt-2'>{product.adResource}</p>
// 				</Link>
// 			))}
// 			{selectedProductId && (
// 				<div className='mt-4 text-white'>
// 					<p>Selected Product ID: {selectedProductId}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProductGrid;

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import './styles/productcard.css';

// interface Product {
// 	id: string;
// 	type: string; // Type to distinguish ad types
// 	adResource?: string;
// 	adResourceUrl?: string;
// 	title: string;
// 	description: string;
// 	size?: string; // Size for banners or other variations
// }

// const ProductGrid = ({ products }: { products: Product[] }) => {
// 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// 		null
// 	);

// 	useEffect(() => {
// 		console.log('Products:', products); // Log the products prop
// 	}, [products]);

// 	const handleProductClick = (productId: string) => {
// 		setSelectedProductId(productId);
// 		console.log('Selected Product ID:', productId);
// 	};

// 	return (
// 		<div className='productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8'>
// 			{products.map((product: Product, index: number) => (
// 				<Link
// 					key={index}
// 					href={product.id ? `/dashboard/product/${product.id}` : '#'}
// 					onClick={() => handleProductClick(product.id)}
// 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// 						selectedProductId === product.id ? 'selected-card' : ''
// 					} ${product.size ? `size-${product.size}` : ''}`}>
// 					{product.type === 'video' && product.adResourceUrl && (
// 						<video
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-48 object-cover video'
// 							onPlay={(e) => e.currentTarget.classList.add('video-playing')}
// 							onPause={(e) => e.currentTarget.classList.remove('video-playing')}
// 							controls
// 						/>
// 					)}
// 					{product.type === 'Poster' && product.adResourceUrl && (
// 						<img
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-48 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'banner' && product.adResourceUrl && (
// 						<img
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-24 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'audio' && product.adResourceUrl && (
// 						<audio
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full'
// 							controls
// 						/>
// 					)}
// 					{/* <h3 className='text-lg font-semibold text-white'>{product.title}</h3> */}

// 					{/* {product.adResourceUrl && product.type === 'Poster' && (
// 						<div className='image-container'>
// 							<img
// 								src={product.adResourceUrl}
// 								className='rounded-lg mb-4 w-full h-48 object-cover'
// 								alt={product.title}
// 							/>
// 						</div>
// 					)} */}

// 					{/* <p className='text-gray-300 mt-2'>{product.description}</p> */}
// 				</Link>
// 			))}

// 			{selectedProductId && (
// 				<div className='mt-4 text-white'>
// 					<p>Selected Product ID: {selectedProductId}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProductGrid;

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import './styles/productcard.css';
// import { FaUserCircle, FaThumbsUp } from 'react-icons/fa';
// import { MdRequestQuote } from 'react-icons/md';

// interface Product {
// 	id: string;
// 	type: string; // Type to distinguish ad types
// 	adResource?: string;
// 	adResourceUrl?: string;
// 	title: string;
// 	description: string;
// 	size?: string; // Size for banners or other variations
// }

// const ProductGrid = ({ products }: { products: Product[] }) => {
// 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// 		null
// 	);

// 	useEffect(() => {
// 		console.log('Products:', products); // Log the products prop
// 	}, [products]);

// 	const handleProductClick = (productId: string) => {
// 		setSelectedProductId(productId);
// 		console.log('Selected Product ID:', productId);
// 	};

// 	return (
// 		<div className='productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8'>
// 			{products.map((product: Product, index: number) => (
// 				<Link
// 					key={index}
// 					href={product.id ? `/dashboard/product/${product.id}` : '#'}
// 					onClick={() => handleProductClick(product.id)}
// 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// 						selectedProductId === product.id ? 'selected-card' : ''
// 					} ${product.size ? `size-${product.size}` : ''}`}>
// 					{/* Card Title */}
// 					<h3 className='text-lg font-semibold text-white mb-2'>
// 						{product.title}
// 					</h3>

// 					{/* Media Content */}
// 					{product.type === 'video' && product.adResourceUrl && (
// 						<video
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-48 object-cover video'
// 							onPlay={(e) => e.currentTarget.classList.add('video-playing')}
// 							onPause={(e) => e.currentTarget.classList.remove('video-playing')}
// 							controls
// 						/>
// 					)}
// 					{product.type === 'Poster' && product.adResourceUrl && (
// 						<img
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-48 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'banner' && product.adResourceUrl && (
// 						<img
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full h-24 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === 'audio' && product.adResourceUrl && (
// 						<audio
// 							src={product.adResourceUrl}
// 							className='rounded-lg mb-4 w-full'
// 							controls
// 						/>
// 					)}

// 					{/* Bottom Icons Row */}
// 					<div className='flex items-center justify-between mt-4 text-gray-300'>
// 						{/* Created By Icon */}
// 						<div className='flex items-center'>
// 							<FaUserCircle className='mr-2 text-2xl' />
// 							<span>Created by</span>
// 						</div>

// 						{/* Like Icon */}
// 						<div className='flex items-center'>
// 							<FaThumbsUp className='mr-2 text-xl' />
// 							<span>Like</span>
// 						</div>

// 						{/* Request Button */}
// 						<button className='flex items-center bg-blue-500 text-white rounded px-3 py-1 text-sm hover:bg-blue-600'>
// 							<MdRequestQuote className='mr-1' />
// 							Request
// 						</button>
// 					</div>
// 				</Link>
// 			))}

// 			{selectedProductId && (
// 				<div className='mt-4 text-white'>
// 					<p>Selected Product ID: {selectedProductId}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProductGrid;

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUserCircle, FaHeart, FaEnvelope } from 'react-icons/fa'; // Icons for user, like, and request button
import './styles/productcard.css';

interface Product {
	id: string;
	type: string;
	adResourceUrl?: string;
	title: string;
	description: string;
	size?: string;
}

const ProductGrid = ({ products }: { products: Product[] }) => {
	const [selectedProductId, setSelectedProductId] = useState<string | null>(
		null
	);

	useEffect(() => {
		console.log('Products:', products);
	}, [products]);

	const handleProductClick = (productId: string) => {
		setSelectedProductId(productId);
		console.log('Selected Product ID:', productId);
	};

	return (
		<div className='productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8'>
			{products.map((product: Product, index: number) => (
				<Link
					key={index}
					href={product.id ? `/dashboard/product/${product.id}` : '#'}
					onClick={() => handleProductClick(product.id)}
					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
						selectedProductId === product.id ? 'selected-card' : ''
					} ${product.size ? `size-${product.size}` : ''}`}>
					{/* Card Title */}
					<h3 className='text-lg font-semibold text-white mb-2'>
						{product.title}
					</h3>

					{/* Display Media */}
					{product.type === 'video' && product.adResourceUrl && (
						<video
							src={product.adResourceUrl}
							className='rounded-lg mb-4 w-full h-48 object-cover video'
							onPlay={(e) => e.currentTarget.classList.add('video-playing')}
							onPause={(e) => e.currentTarget.classList.remove('video-playing')}
							controls
						/>
					)}
					{product.type === 'Poster' && product.adResourceUrl && (
						<img
							src={product.adResourceUrl}
							className='rounded-lg mb-4 w-full h-48 object-cover'
							alt={product.title}
						/>
					)}
					{product.type === 'banner' && product.adResourceUrl && (
						<img
							src={product.adResourceUrl}
							className='rounded-lg mb-4 w-full h-24 object-cover'
							alt={product.title}
						/>
					)}
					{product.type === 'audio' && product.adResourceUrl && (
						<audio
							src={product.adResourceUrl}
							className='rounded-lg mb-4 w-full'
							controls
						/>
					)}

					{/* Icons Row at Bottom */}
					<div className='flex justify-between items-center mt-4'>
						{/* User Icon */}
						<FaUserCircle className='text-white text-2xl' title='Created by' />

						{/* Like Icon */}
						<FaHeart
							className='text-red-500 text-xl cursor-pointer hover:text-red-600'
							title='Like'
						/>

						{/* Request Button */}
						<button
							className='text-white bg-violet-600 hover:bg-violet-700 text-sm px-3 py-1 rounded'
							title='Request'>
							Request
						</button>
					</div>
				</Link>
			))}

			{selectedProductId && (
				<div className='mt-4 text-white'>
					<p>Selected Product ID: {selectedProductId}</p>
				</div>
			)}
		</div>
	);
};

export default ProductGrid;
