// import React from "react";
// interface Product {
// 	videoSrc: string;
// 	title: string;
// 	description: string;
// }
// const ProductGrid = ({ products }: any) => {
// 	return (
// 		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// 			{products.map((product: any, index: number) => (
// 				<div
// 					key={index}
// 					className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
// 					<video
// 						src={product.videoSrc}
// 						className="w-full h-48 object-cover rounded-lg mb-4"
// 						controls
// 					/>
// 					<h3 className="text-lg font-semibold">{product.title}</h3>
// 					<p className="text-gray-400">{product.description}</p>
// 				</div>
// 			))}
// 		</div>
// 	);
// };

// export default ProductGrid;

// import React from "react";

// interface Product {
// 	videoSrc: string;
// 	title: string;
// 	description: string;
// }

// const ProductGrid = ({ products }: { products: Product[] }) => {
// 	return (
// 		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
// 			{products.map((product, index) => (
// 				<div
// 					key={index}
// 					className="bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col">
// 					<video
// 						src={product.videoSrc}
// 						className="w-full h-48 object-cover rounded-lg mb-4"
// 						controls
// 					/>
// 					<h3 className="text-lg font-semibold mb-2">{product.title}</h3>
// 					<p className="text-gray-400">{product.description}</p>
// 				</div>
// 			))}
// 		</div>
// 	);
// };

// export default ProductGrid;
// ProductGrid Component

// import React from "react";

// interface Product {
// 	videoSrc: string;
// 	title: string;
// 	description: string;
// }

// const ProductGrid = ({ products }: { products: Product[] }) => {
// 	return (
// 		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
// 			{products.map((product, index) => (
// 				<div
// 					key={index}
// 					className="bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col">
// 					<video
// 						src={product.videoSrc}
// 						className="w-full h-48 object-cover rounded-lg mb-4"
// 						controls
// 					/>
// 					<h3 className="text-lg font-semibold mb-2">{product.title}</h3>
// 					<p className="text-gray-400">{product.description}</p>
// 				</div>
// 			))}
// 		</div>
// 	);
// };

// export default ProductGrid;
import React from "react";

interface Product {
	videoSrc: string;
	title: string;
	description: string;
}

const ProductGrid = ({ products }: { products: Product[] }) => {
	return (
		<>
			{products.map((product: Product, index: number) => (
				<div
					key={index}
					className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
					<video
						src={product.videoSrc}
						className="w-full h-48 object-cover rounded-lg mb-4"
						controls
					/>
					<h3 className="text-lg font-semibold">{product.title}</h3>
					<p className="text-gray-400">{product.description}</p>
				</div>
			))}
		</>
	);
};

export default ProductGrid;
