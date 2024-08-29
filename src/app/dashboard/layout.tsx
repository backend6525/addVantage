"use client";

// layouts/DashboardLayout.tsx
import React, { ReactNode, useState } from "react";
import Header from "../components/dashboardUi/Header";
import SideMenu from "../components/dashboardUi/SideMenu";
// import Footer from '../components/dashboardUi/Footer'; // Make sure you have a Footer component

interface DashboardLayoutProps {
	children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Define searchProps based on your requirements
	const searchProps = {
		placeholder: "Search...",
		// ... other properties
	};

	return (
		<div className="dark:bg-black dark:text-bodydark min-h-screen flex flex-col overflow-hidden">
			<div className="sticky top-0 z-10">
				<Header />
			</div>

			<div className="flex flex-1 overflow-hidden">
				<SideMenu
					isMenuOpen={isMenuOpen}
					userEmail="info.fiberlinknet@gmail.com"
				/>
				<main className="flex-1 overflow-auto p-4">{children}</main>
			</div>
			{/* <Footer /> */}
		</div>
	);
};

export default DashboardLayout;
