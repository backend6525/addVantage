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
		<div className="dark:bg-black dark:text-bodydark min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr]">
			<div
				className="row-span-1 col-span-2"
				style={{ position: "sticky", top: 0 }}>
				<Header />
			</div>
			<div className="row-span-2 col-span-1">
				<SideMenu
					isMenuOpen={isMenuOpen}
					userEmail="info.fiberlinknet@gmail.com"
				/>
			</div>

			<main className="row-span-2 col-span-1">{children}</main>

			{/* Your footer component */}
			{/* <Footer className="row-span-1 col-span-2" /> */}
		</div>
	);
};

export default DashboardLayout;
