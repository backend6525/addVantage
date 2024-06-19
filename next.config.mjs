/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode:true,
   remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
};

export default nextConfig;
