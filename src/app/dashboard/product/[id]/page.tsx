"use client"; // Enable client-side rendering

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Review {
	user: string;
	rating: number;
	comment: string;
}

interface Product {
	name: string;
	developer: string;
	description: string;
	updatedOn: string;
	ratings: number;
	reviews: Review[];
	similarApps: string[];
}

const ProductDetail = () => {
	const params = useParams();
	const id = Array.isArray(params.id) ? params.id.join("") : params.id;
	console.log("Product ID:", id);

	const [product, setProduct] = useState<Product | null>(null);

	useEffect(() => {
		if (id) {
			fetchProductDetails(id);
		}
	}, [id]);

	const fetchProductDetails = async (productId: string) => {
		try {
			const response = await fetch(`/api/products/${productId}`);
			const data = await response.json();
			console.log("Fetched Product Data:", data);
			setProduct(data);
		} catch (error) {
			console.error("Error fetching product details:", error);
		}
	};

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div className="bg-gray-100 min-h-screen p-8">
			<div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
				<div className="flex items-center mb-6">
					<div className="w-24 h-24 bg-gray-300 rounded-full mr-4"></div>
					<div>
						<h1 className="text-3xl font-bold">{product.name}</h1>
						<p className="text-gray-600">{product.developer}</p>
					</div>
				</div>

				<div className="mb-6">
					<h2 className="text-2xl font-bold mb-2">About this app</h2>
					<p>{product.description}</p>
					<p className="text-gray-600 mt-2">Updated on: {product.updatedOn}</p>
				</div>

				<div className="mb-6">
					<h2 className="text-2xl font-bold mb-2">Ratings and Reviews</h2>
					<div className="flex items-center mb-4">
						<div className="text-yellow-500 mr-2">
							{"★".repeat(Math.floor(product.ratings))}
							{"☆".repeat(5 - Math.floor(product.ratings))}
						</div>
						<p>{product.ratings} out of 5</p>
					</div>
					{product.reviews.map((review, index) => (
						<div key={index} className="mb-4">
							<p className="font-bold">{review.user}</p>
							<div className="text-yellow-500">
								{"★".repeat(review.rating)}
								{"☆".repeat(5 - review.rating)}
							</div>
							<p>{review.comment}</p>
						</div>
					))}
				</div>

				<div className="mb-6">
					<h2 className="text-2xl font-bold mb-2">App Support</h2>
					<p>If you need help, please contact our support team.</p>
				</div>

				<div>
					<h2 className="text-2xl font-bold mb-2">Similar Apps</h2>
					<ul>
						{product.similarApps.map((app, index) => (
							<li key={index}>{app}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
