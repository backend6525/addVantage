// import React from 'react';

// const ProductCard = ({ videoSrc, title, description }) => {
//   return (
//     <div className="bg-gray-900 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
//       <div className="relative pb-56 mb-3">
//         <iframe
//           className="absolute top-0 left-0 w-full h-full"
//           src={videoSrc}
//           title={title}
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//       </div>
//       <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-400">{description}</p>
//     </div>
//   );
// };

// const ProductGrid = ({ products }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       {products.map((product, index) => (
//         <ProductCard
//           key={index}
//           videoSrc={product.videoSrc}
//           title={product.title}
//           description={product.description}
//         />
//       ))}
//     </div>
//   );
// };

// export default ProductGrid;
import React from 'react';

interface Product {
  videoSrc: string;
  title: string;
  description: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
      <div className="relative pb-56 mb-3">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={product.videoSrc}
          title={product.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <h3 className="text-white text-xl font-semibold mb-2">{product.title}</h3>
      <p className="text-gray-400">{product.description}</p>
    </div>
  );
};

const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
