'use client';

import React from 'react';
import Footer from './ui/Footer';
import Navbar from './ui/Navbar';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/app/components/themProvider';
import ConvexClientProvider from '../ConvexClientProvider';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const pathname = usePathname();
	const showNavbar =
		!pathname?.includes('/dashboard') && !pathname?.includes('/onboarding');

	return (
		<ConvexClientProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='dark'
				enableSystem
				disableTransitionOnChange>
				{showNavbar && <Navbar />}
				<main>{children}</main>
				{showNavbar && <Footer />}
			</ThemeProvider>
		</ConvexClientProvider>
	);
};

export default Layout;
