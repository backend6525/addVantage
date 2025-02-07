/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ['lh3.googleusercontent.com', 'd8wj16t6dyh1c.cloudfront.net'],
	},
	//  remotePatterns: [
	//     {
	//       protocol: 'https',
	//       hostname: 'via.placeholder.com',
	//       port: '',
	//       pathname: '/**',
	//     },
	//   ],
};

export default nextConfig;
