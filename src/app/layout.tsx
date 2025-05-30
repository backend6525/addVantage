import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/app/components/ui/toast/toaster';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AdzPay - Revolutionizing Digital Marketing',
	description:
		'Join the future of digital marketing with AdzPay. Share ads, earn rewards, and connect brands with their perfect audience.',
	keywords:
		'digital marketing, advertising, rewards, social sharing, affiliate marketing, brand engagement',
	openGraph: {
		title: 'AdzPay - Revolutionizing Digital Marketing',
		description: 'Share ads you love and earn rewards with AdzPay.',
		url: 'https://adzpay.net',
		siteName: 'AdzPay',
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'AdzPay - Revolutionizing Digital Marketing',
		description: 'Share ads, earn rewards. Join AdzPay today!',
	},
	robots: 'index, follow',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
