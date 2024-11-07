"use client";
import React, { ReactNode, useState, useEffect } from "react";
import Header from "../components/dashboardUi/Header";
import SideMenu from "../components/dashboardUi/SideMenu";

interface DashboardLayoutProps {
	children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Search props example (you can adjust based on your actual search logic)
	const searchProps = {
		placeholder: "Search...",
		// Other properties can be passed here
	};

	// Dynamically adjust the main content margin based on sidebar state on larger screens
	useEffect(() => {
		const mainContent = document.getElementById("main-content");
		if (mainContent && window.innerWidth >= 768) {
			// Adjust only on medium and larger screens
			mainContent.style.marginLeft = isMenuOpen ? "16rem" : "5rem";
		}
	}, [isMenuOpen]);

	return (
		<div className="dark:bg-black dark:text-bodydark min-h-screen flex flex-col overflow-hidden">
			{/* Sticky Header */}
			<div className="sticky top-0 z-10">
				<Header />
			</div>

			{/* Sidebar and Main Content Layout */}
			<div className="flex flex-1 overflow-hidden">
				{/* Side Menu */}
				<div
					className={`md:block ${
						isMenuOpen ? "block" : "hidden"
					} md:static fixed inset-0 bg-gray-800 z-20 transition-all duration-300 md:w-auto w-64 top-5`}>
					<SideMenu
						isMenuOpen={isMenuOpen}
						setIsMenuOpen={setIsMenuOpen}
						userEmail="info.fiberlinknet@gmail.com"
					/>
				</div>

				{/* Main Content */}
				<main
					id="main-content"
					className={`flex-1 transition-all duration-300 overflow-auto p-4 ${
						isMenuOpen && window.innerWidth < 768 ? "opacity-25" : "opacity-100"
					}`}>
					{children}
				</main>
			</div>

			{/* Uncomment if you have a Footer component */}
			{/* <Footer /> */}
		</div>
	);
};

export default DashboardLayout;
