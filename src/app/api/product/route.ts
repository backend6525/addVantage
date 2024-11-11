import { NextApiRequest, NextApiResponse } from 'next';

// const products = [
// 	{
// 		id: 'jd75x6qqkggwxndrs5rjc69wxn703p8w',
// 		videoSrc: '/videos/product1.mp4',
// 		title: 'Product 1',
// 		description: 'Description 1',
// 		about: 'About Product 1',
// 		ratings: 4.5,
// 		reviews: [{ user: 'John Doe', rating: 5, comment: 'Great product!' }],
// 		similarApps: [
// 			'TikTok Lite - Save Data',
// 			'Xender - Share Music Transfer',
// 			'WhatsApp Business',
// 		],
// 	},
// 	// Add more products as needed
// ];

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
// 	const { id } = req.query;
// 	const product = products.find((product) => product.id === id);
// 	if (product) {
// 		res.status(200).json(product);
// 	} else {
// 		res.status(404).json({ message: 'Product not found' });
// 	}
// }
