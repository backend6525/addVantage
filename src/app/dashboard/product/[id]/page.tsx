// 'use client';

// import React, { useEffect, useState } from 'react';
// import { notFound } from 'next/navigation';

// interface Product {
// 	id: string;
// 	type: string;
// 	adResourceUrl?: string;
// 	title: string;
// 	description: string;
// 	createdBy?: string;
// 	costPerView?: string;
// 	numberOfDaysRunning?: string;
// }

// interface Props {
// 	params: { id: string };
// }

// const ProductPage = ({ params }: Props) => {
// 	const { id } = params;
// 	const [product, setProduct] = useState<Product | null>(null);
// 	const [loading, setLoading] = useState<boolean>(true);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchProduct = async () => {
// 			try {
// 				setLoading(true);
// 				setError(null);

// 				const response = await fetch(`/api/products/${id}`);
// 				if (!response.ok) {
// 					throw new Error('Product not found');
// 				}

// 				const data = await response.json();
// 				setProduct(data);
// 			} catch (err) {
// 				console.error(err);
// 				setError('Failed to load product details. Please try again.');
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchProduct();
// 	}, [id]);

// 	if (loading) {
// 		return (
// 			<div className='p-8 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center'>
// 				<p className='text-gray-700 dark:text-gray-300'>
// 					Loading product details...
// 				</p>
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div className='p-8 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center'>
// 				<p className='text-red-500'>{error}</p>
// 			</div>
// 		);
// 	}

// 	if (!product) {
// 		notFound();
// 		return null;
// 	}

// 	return (
// 		<div className='p-8 bg-white dark:bg-gray-900 min-h-screen'>
// 			{/* Product Title */}
// 			<h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
// 				{product.title}
// 			</h1>

// 			{/* Media Display */}
// 			<div className='mb-4'>
// 				{product.type === 'video' && product.adResourceUrl && (
// 					<video
// 						src={product.adResourceUrl}
// 						className='rounded-lg w-full h-64 object-cover'
// 						controls
// 					/>
// 				)}
// 				{['Poster', 'banner'].includes(product.type || '') &&
// 					product.adResourceUrl && (
// 						<img
// 							src={product.adResourceUrl}
// 							className='rounded-lg w-full h-64 object-cover'
// 							alt={product.title}
// 						/>
// 					)}
// 				{product.type === 'audio' && product.adResourceUrl && (
// 					<audio src={product.adResourceUrl} className='w-full' controls />
// 				)}
// 			</div>

// 			{/* Product Description */}
// 			<p className='text-gray-700 dark:text-gray-300 mb-4'>
// 				{product.description}
// 			</p>

// 			{/* Additional Product Details */}
// 			{product.costPerView && (
// 				<p className='text-gray-600 dark:text-gray-400'>
// 					<strong>Cost Per View:</strong> {product.costPerView}
// 				</p>
// 			)}
// 			{product.numberOfDaysRunning && (
// 				<p className='text-gray-600 dark:text-gray-400'>
// 					<strong>Days Running:</strong> {product.numberOfDaysRunning}
// 				</p>
// 			)}

// 			{/* Product Creator */}
// 			<div className='flex items-center mt-4'>
// 				<span className='text-gray-500 dark:text-gray-400 text-sm'>
// 					Created by:
// 				</span>
// 				<span className='ml-2 font-medium text-gray-800 dark:text-gray-200'>
// 					{product.createdBy || 'Unknown'}
// 				</span>
// 			</div>
// 		</div>
// 	);
// };

// export default ProductPage;

'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

interface Product {
	id: string;
	type: string;
	adResourceUrl?: string;
	title: string;
	description: string;
	createdBy?: string;
	costPerView?: string;
	numberOfDaysRunning?: string;
}

interface Props {
	params: { id: string };
}

const ProductPage = ({ params }: Props) => {
	const { id } = params;
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await fetch(`/api/product?id=${id}`); // Adjusted to match the API
				if (!response.ok) {
					throw new Error('Product not found');
				}

				const data = await response.json();
				setProduct(data);
			} catch (err) {
				console.error(err);
				setError('Failed to load product details. Please try again.');
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (loading) {
		return (
			<div className='p-8 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center'>
				<p className='text-gray-700 dark:text-gray-300'>
					Loading product details...
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='p-8 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center'>
				<p className='text-red-500'>{error}</p>
			</div>
		);
	}

	if (!product) {
		notFound();
		return null;
	}

	return (
		<div className='p-8 bg-white dark:bg-gray-900 min-h-screen'>
			<h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
				{product.title}
			</h1>

			{/* Media Display */}
			<div className='mb-4'>
				{product.type === 'video' && product.adResourceUrl && (
					<video
						src={product.adResourceUrl}
						className='rounded-lg w-full h-64 object-cover'
						controls
					/>
				)}
				{['Poster', 'banner'].includes(product.type || '') &&
					product.adResourceUrl && (
						<img
							src={product.adResourceUrl}
							className='rounded-lg w-full h-64 object-cover'
							alt={product.title}
						/>
					)}
				{product.type === 'audio' && product.adResourceUrl && (
					<audio src={product.adResourceUrl} className='w-full' controls />
				)}
			</div>

			<p className='text-gray-700 dark:text-gray-300 mb-4'>
				{product.description}
			</p>
		</div>
	);
};

export default ProductPage;
