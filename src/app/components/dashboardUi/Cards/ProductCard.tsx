// // import React, { useState } from "react";
// // import Link from "next/link";
// // import "./styles/productcard.css";
// // interface Product {
// // 	id: string;
// // 	videoSrc: string;
// // 	title: string;
// // 	description: string;
// // }

// // const ProductGrid = ({ products }: { products: Product[] }) => {
// // 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// // 		null
// // 	);

// // 	const handleProductClick = (productId: string) => {
// // 		setSelectedProductId(productId); // Capture the clicked product ID
// // 		console.log("Selected Product ID:", productId); // Optionally log it
// // 	};

// // 	return (
// // 		<div className=" productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8">
// // 			{products.map((product: Product, index: number) => (
// // 				<Link
// // 					key={index}
// // 					href={product.id ? `/dashboard/product/${product.id}` : "#"}
// // 					onClick={() => handleProductClick(product.id)}
// // 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// // 						selectedProductId === product.id ? "selected-card" : ""
// // 					}`}>
// // 					<video
// // 						src={product.videoSrc}
// // 						className="rounded-lg mb-4 w-full h-48 object-cover video"
// // 						onPlay={(e) => e.currentTarget.classList.add("video-playing")}
// // 						onPause={(e) => e.currentTarget.classList.remove("video-playing")}
// // 						controls
// // 					/>
// // 					<h3 className="text-lg font-semibold text-white">{product.title}</h3>
// // 					<p className="text-gray-300 mt-2">{product.description}</p>
// // 				</Link>
// // 			))}

// // 			{selectedProductId && (
// // 				<div className="mt-4 text-white">
// // 					<p>Selected Product ID: {selectedProductId}</p>
// // 				</div>
// // 			)}
// // 		</div>
// // 	);
// // };

// // export default ProductGrid;

// // import React, { useState } from "react";
// // import Link from "next/link";
// // import "./styles/productcard.css";

// // interface Product {
// // 	id: string;
// // 	type: string; // Add a type property to distinguish ad types
// // 	videoSrc?: string;
// // 	imageSrc?: string;
// // 	title: string;
// // 	description: string;
// // 	size?: string; // Add a size property to handle different sizes
// // }

// // const ProductGrid = ({ products }: { products: Product[] }) => {
// // 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// // 		null
// // 	);

// // 	const handleProductClick = (productId: string) => {
// // 		setSelectedProductId(productId); // Capture the clicked product ID
// // 		console.log("Selected Product ID:", productId); // Optionally log it
// // 	};

// // 	return (
// // 		<div className="productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8">
// // 			{products.map((product: Product, index: number) => (
// // 				<Link
// // 					key={index}
// // 					href={product.id ? `/dashboard/product/${product.id}` : "#"}
// // 					onClick={() => handleProductClick(product.id)}
// // 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// // 						selectedProductId === product.id ? "selected-card" : ""
// // 					} ${product.size ? `size-${product.size}` : ""}`} // Apply size class
// // 				>
// // 					{product.type === "video" && product.videoSrc && (
// // 						<video
// // 							src={product.videoSrc}
// // 							className="rounded-lg mb-4 w-full h-48 object-cover video"
// // 							onPlay={(e) => e.currentTarget.classList.add("video-playing")}
// // 							onPause={(e) => e.currentTarget.classList.remove("video-playing")}
// // 							controls
// // 						/>
// // 					)}
// // 					{product.type === "image" && product.imageSrc && (
// // 						<img
// // 							src={product.imageSrc}
// // 							className="rounded-lg mb-4 w-full h-48 object-cover"
// // 							alt={product.title}
// // 						/>
// // 					)}
// // 					{product.type === "banner" && product.imageSrc && (
// // 						<img
// // 							src={product.imageSrc}
// // 							className="rounded-lg mb-4 w-full h-24 object-cover" // Adjust height for banners
// // 							alt={product.title}
// // 						/>
// // 					)}
// // 					<h3 className="text-lg font-semibold text-white">{product.title}</h3>
// // 					<p className="text-gray-300 mt-2">{product.description}</p>
// // 				</Link>
// // 			))}

// // 			{selectedProductId && (
// // 				<div className="mt-4 text-white">
// // 					<p>Selected Product ID: {selectedProductId}</p>
// // 				</div>
// // 			)}
// // 		</div>
// // 	);
// // };

// // export default ProductGrid;

// import React, { useState } from "react";
// import Link from "next/link";
// import "./styles/productcard.css";

// interface Product {
// 	id: string;
// 	type: string; // Add a type property to distinguish ad types
// 	videoSrc?: string;
// 	imageSrc?: string;
// 	audioSrc?: string; // Add an audioSrc property for audio files
// 	title: string;
// 	description: string;
// 	size?: string; // Add a size property to handle different sizes
// }

// const ProductGrid = ({ products }: { products: Product[] }) => {
// 	const [selectedProductId, setSelectedProductId] = useState<string | null>(
// 		null
// 	);

// 	const handleProductClick = (productId: string) => {
// 		setSelectedProductId(productId); // Capture the clicked product ID
// 		console.log("Selected Product ID:", productId); // Optionally log it
// 	};

// 	return (
// 		<div className="productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8">
// 			{products.map((product: Product, index: number) => (
// 				<Link
// 					key={index}
// 					href={product.id ? `/dashboard/product/${product.id}` : "#"}
// 					onClick={() => handleProductClick(product.id)}
// 					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
// 						selectedProductId === product.id ? "selected-card" : ""
// 					} ${product.size ? `size-${product.size}` : ""}`} // Apply size class
// 				>
// 					{product.type === "video" && product.videoSrc && (
// 						<video
// 							src={product.videoSrc}
// 							className="rounded-lg mb-4 w-full h-48 object-cover video"
// 							onPlay={(e) => e.currentTarget.classList.add("video-playing")}
// 							onPause={(e) => e.currentTarget.classList.remove("video-playing")}
// 							controls
// 						/>
// 					)}
// 					{product.type === "image" && product.imageSrc && (
// 						<img
// 							src={product.imageSrc}
// 							className="rounded-lg mb-4 w-full h-48 object-cover"
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === "banner" && product.imageSrc && (
// 						<img
// 							src={product.imageSrc}
// 							className="rounded-lg mb-4 w-full h-24 object-cover" // Adjust height for banners
// 							alt={product.title}
// 						/>
// 					)}
// 					{product.type === "audio" && product.audioSrc && (
// 						<audio
// 							src={product.audioSrc}
// 							className="rounded-lg mb-4 w-full"
// 							controls
// 						/>
// 					)}
// 					<h3 className="text-lg font-semibold text-white">{product.title}</h3>
// 					<p className="text-gray-300 mt-2">{product.description}</p>
// 				</Link>
// 			))}

// 			{selectedProductId && (
// 				<div className="mt-4 text-white">
// 					<p>Selected Product ID: {selectedProductId}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProductGrid;

import React, { useState } from "react";
import Link from "next/link";
import "./styles/productcard.css";

interface Product {
	id: string;
	type: string; // Type to distinguish ad types
	videoSrc?: string;
	imageSrc?: string;
	audioSrc?: string;
	title: string;
	description: string;
	size?: string; // Size for banners or other variations
}

const ProductGrid = ({ products }: { products: Product[] }) => {
	const [selectedProductId, setSelectedProductId] = useState<string | null>(
		null
	);

	const handleProductClick = (productId: string) => {
		setSelectedProductId(productId); // Capture clicked product ID
		console.log("Selected Product ID:", productId);
	};

	return (
		<div className="productcard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8">
			{products.map((product: Product, index: number) => (
				<Link
					key={index}
					href={product.id ? `/dashboard/product/${product.id}` : "#"}
					onClick={() => handleProductClick(product.id)}
					className={`glass-card p-6 transition-transform duration-300 ease-in-out fade-in ${
						selectedProductId === product.id ? "selected-card" : ""
					} ${product.size ? `size-${product.size}` : ""}`}>
					{product.type === "video" && product.videoSrc && (
						<video
							src={product.videoSrc}
							className="rounded-lg mb-4 w-full h-48 object-cover video"
							onPlay={(e) => e.currentTarget.classList.add("video-playing")}
							onPause={(e) => e.currentTarget.classList.remove("video-playing")}
							controls
						/>
					)}
					{product.type === "image" && product.imageSrc && (
						<img
							src={product.imageSrc}
							className="rounded-lg mb-4 w-full h-48 object-cover"
							alt={product.title}
						/>
					)}
					{product.type === "banner" && product.imageSrc && (
						<img
							src={product.imageSrc}
							className="rounded-lg mb-4 w-full h-24 object-cover"
							alt={product.title}
						/>
					)}
					{product.type === "audio" && product.audioSrc && (
						<audio
							src={product.audioSrc}
							className="rounded-lg mb-4 w-full"
							controls
						/>
					)}
					<h3 className="text-lg font-semibold text-white">{product.title}</h3>
					<p className="text-gray-300 mt-2">{product.description}</p>
				</Link>
			))}

			{selectedProductId && (
				<div className="mt-4 text-white">
					<p>Selected Product ID: {selectedProductId}</p>
				</div>
			)}
		</div>
	);
};

export default ProductGrid;
