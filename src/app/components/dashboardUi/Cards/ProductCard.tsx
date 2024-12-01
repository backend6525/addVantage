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
