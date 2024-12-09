'use client';

import React from 'react';
import Head from 'next/head';
import Footer from './ui/Footer';
import Navbar from './ui/Navbar';
import { usePathname } from 'next/navigation'; // Import the usePathname hook

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const pathname = usePathname();
	const showNavbar =
		!pathname.includes('/dashboard') && !pathname.includes('/onboarding'); // Determine whether to show the Navbar

	return (
		<>
			{showNavbar && (
				<Head>
					<title>adzpay</title>
					<meta
						name='description'
						content='Spread the Word, Earn Rewards: Share these ads with friends, family, followers – through social media, messaging apps, or word-of-mouth. For every successful referral and every view, you earn a commission'
					/>
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
			)}
			{showNavbar && <Navbar />}

			{/* Conditionally render the Navbar */}
			<main>{children}</main>
			{showNavbar && <Footer />}
		</>
	);
};

export default Layout;
