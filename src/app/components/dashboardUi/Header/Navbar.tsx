// "use client";
// import React, { useState, useCallback } from "react";
// import Link from "next/link";
// import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// // Navigation data
// const navItems = [
// 	{ href: "/tasks", label: "Tasks" },
// 	{ href: "/billing", label: "Billing" },
// 	{ href: "/analytics", label: "Analytics" },
// 	{ href: "/messages", label: "Messages" },
// 	{ href: "/help", label: "Help" },
// ];

// // Dropdown options data
// const dropdownOptions = [
// 	{ href: "/profile", label: "Profile" },
// 	{ href: "/settings", label: "Settings" },
// 	{ href: "/purchase-history", label: "Purchase history" },
// 	{ href: "/get-help", label: "Get help" },
// 	{ href: "/suggest-improvement", label: "Suggest improvement" },
// 	{ href: "/get-apps", label: "Get the Canva Apps" },
// 	{ href: "/refer-friends", label: "Refer friends" },
// 	{ href: "/create-team", label: "Create a team" },
// 	{ href: "/report-content", label: "Report content" },
// 	{ href: "/privacy-policy", label: "Privacy policy" },
// 	{ href: "/logout", label: "Sign out" },
// ];

// type NavbarProps = {
// 	search: { placeholder: string };
// 	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const Navbar: React.FC<NavbarProps> = ({ search, setIsMenuOpen }) => {
// 	const { user } = useKindeBrowserClient();
// 	const [dropdownOpen, setDropdownOpen] = useState(false);

// 	// Toggle dropdown state with memoized function
// 	const toggleDropdown = useCallback(() => {
// 		setDropdownOpen((prev) => !prev);
// 	}, []);

// 	// Render dropdown options
// 	const renderDropdown = () => (
// 		<div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 backdrop-blur-lg bg-opacity-70">
// 			{dropdownOptions.map((option, index) => (
// 				<div key={index} className="px-4 py-2">
// 					{option.label === "Sign out" ? (
// 						<LogoutLink>
// 							<button className="text-white bg-black w-full flex items-center py-2">
// 								{option.label}
// 							</button>
// 						</LogoutLink>
// 					) : (
// 						<Link
// 							href={option.href}
// 							className="text-gray-800 hover:bg-gray-200">
// 							{option.label}
// 						</Link>
// 					)}
// 				</div>
// 			))}
// 		</div>
// 	);

// 	return (
// 		<nav className="flex items-center justify-between bg-gray-900 p-4 sm:p-6 lg:p-8 w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-opacity-60 border border-gray-700 shadow-lg rounded-lg">
// 			<ul className="flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 xl:space-x-12 pl-[18rem]">
// 				{navItems.map((item) => (
// 					<li key={item.label} className="text-white hover:text-gray-300">
// 						<Link href={item.href}>{item.label}</Link>
// 					</li>
// 				))}
// 			</ul>

// 			{/* Search, Notification, and User Profile */}
// 			<div className="flex items-center ml-4">
// 				{/* Search Input */}
// 				<input
// 					type="search"
// 					aria-label="Search"
// 					{...search}
// 					className="p-2 bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 rounded sm:w-48 md:w-64 lg:w-80 xl:w-96 backdrop-blur-md"
// 				/>

// 				{/* Notification Icon */}
// 				<button
// 					className="text-white hover:text-gray-300 ml-2"
// 					aria-label="Notifications">
// 					<svg
// 						xmlns="http://www.w3.org/2000/svg"
// 						className="h-6 w-6"
// 						fill="none"
// 						viewBox="0 0 24 24"
// 						stroke="currentColor">
// 						<path
// 							strokeLinecap="round"
// 							strokeLinejoin="round"
// 							strokeWidth={2}
// 							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.002 7.002 0 00-5-6.708V4a1 1 0 10-2 0v.292A7.002 7.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m0 0a3.001 3.001 0 006 0M9 21h6"
// 						/>
// 					</svg>
// 				</button>

// 				{/* User Profile and Dropdown */}
// 				<div className="relative ml-4">
// 					<button
// 						className="flex items-center text-white hover:text-gray-300"
// 						onClick={toggleDropdown}
// 						aria-haspopup="true"
// 						aria-expanded={dropdownOpen}>
// 						<img
// 							src={user?.picture ?? undefined}
// 							alt="User"
// 							className="w-8 h-8 rounded-full"
// 						/>
// 					</button>

// 					{/* Conditional Dropdown Rendering */}
// 					{dropdownOpen && renderDropdown()}
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };

// // Memoize the component to avoid unnecessary re-renders
// export default React.memo(Navbar);

// import React, { useState, useCallback } from "react";
// import Link from "next/link";
// import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// const navItems = [
// 	{ href: "/tasks", label: "Tasks" },
// 	{ href: "/billing", label: "Billing" },
// 	// More items
// ];

// const dropdownOptions = [
// 	{ href: "/profile", label: "Profile" },
// 	{ href: "/logout", label: "Sign out" },
// ];

// type NavbarProps = {
// 	search: { placeholder: string };
// 	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const Navbar: React.FC<NavbarProps> = ({ search, setIsMenuOpen }) => {
// 	const { user } = useKindeBrowserClient();
// 	const [dropdownOpen, setDropdownOpen] = useState(false);

// 	const toggleDropdown = useCallback(() => {
// 		setDropdownOpen((prev) => !prev);
// 	}, []);

// 	return (
// 		<nav className="navbar">
// 			<ul>
// 				{navItems.map((item) => (
// 					<li key={item.href}>
// 						<Link href={item.href}>{item.label}</Link>
// 					</li>
// 				))}
// 			</ul>

// 			<input {...search} />

// 			<div>
// 				<button onClick={toggleDropdown}>
// 					<img src={user?.picture ?? "/default-profile.png"} alt="Profile" />
// 				</button>

// 				{dropdownOpen && (
// 					<div className="dropdown">
// 						{dropdownOptions.map((option) => (
// 							<div key={option.href}>
// 								{option.label === "Sign out" ? (
// 									<LogoutLink>
// 										<button>{option.label}</button>
// 									</LogoutLink>
// 								) : (
// 									<Link href={option.href}>{option.label}</Link>
// 								)}
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</div>
// 		</nav>
// 	);
// };

// export default Navbar;
// import React, { useState, useCallback } from "react";
// import Link from "next/link";
// import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// // Define the nav items and dropdown options
// const navItems = [
// 	{ href: "/tasks", label: "Tasks" },
// 	{ href: "/billing", label: "Billing" },
// ];

// const dropdownOptions = [
// 	{ href: "/profile", label: "Profile" },
// 	{ href: "/logout", label: "Sign out" },
// ];

// // Define the props expected by the Navbar component
// interface NavbarProps {
// 	search: { placeholder: string }; // Include search prop
// 	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>; // Include setIsMenuOpen prop
// }

// const Navbar: React.FC<NavbarProps> = ({ search, setIsMenuOpen }) => {
// 	const { user } = useKindeBrowserClient();
// 	const [dropdownOpen, setDropdownOpen] = useState(false);

// 	// Toggle the dropdown
// 	const toggleDropdown = useCallback(() => {
// 		setDropdownOpen((prev) => !prev);
// 	}, []);

// 	return (
// 		<nav className="navbar">
// 			<ul>
// 				{navItems.map((item) => (
// 					<li key={item.href}>
// 						<Link href={item.href}>{item.label}</Link>
// 					</li>
// 				))}
// 			</ul>

// 			{/* Search input */}
// 			<input {...search} />

// 			<div>
// 				<button onClick={toggleDropdown}>
// 					<img src={user?.picture ?? "/default-profile.png"} alt="Profile" />
// 				</button>

// 				{/* Dropdown menu */}
// 				{dropdownOpen && (
// 					<div className="dropdown">
// 						{dropdownOptions.map((option) => (
// 							<div key={option.href}>
// 								{option.label === "Sign out" ? (
// 									<LogoutLink>
// 										<button>{option.label}</button>
// 									</LogoutLink>
// 								) : (
// 									<Link href={option.href}>{option.label}</Link>
// 								)}
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</div>
// 		</nav>
// 	);
// };

// export default Navbar;

"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Brand from "../../ui/Brand";
const navItems = [
	{ href: "/tasks", label: "Tasks" },
	{ href: "/billing", label: "Billing" },
	{ href: "/analytics", label: "Analytics" },
	{ href: "/messages", label: "Messages" },
	{ href: "/help", label: "Help" },
];

const dropdownOptions = [
	{ href: "/profile", label: "Profile" },
	{ href: "/settings", label: "Settings" },
	{ href: "/purchase-history", label: "Purchase history" },
	{ href: "/get-help", label: "Get help" },
	{ href: "/suggest-improvement", label: "Suggest improvement" },
	{ href: "/get-apps", label: "Get the Canva Apps" },
	{ href: "/refer-friends", label: "Refer friends" },
	{ href: "/create-team", label: "Create a team" },
	{ href: "/report-content", label: "Report content" },
	{ href: "/privacy-policy", label: "Privacy policy" },
	{ href: "/logout", label: "Sign out" },
];

type NavbarProps = {
	search: { placeholder: string };
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ search, setIsMenuOpen }) => {
	const { user } = useKindeBrowserClient();
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = useCallback(() => {
		setDropdownOpen((prev) => !prev);
	}, []);

	const renderDropdown = () => (
		<div
			className={`absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 backdrop-blur-lg bg-opacity-100 transition-all duration-500 ease-in-out ${
				dropdownOpen ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
			} overflow-hidden`}>
			{dropdownOptions.map((option, index) => (
				<div key={index} className="px-4 py-2">
					{option.label === "Sign out" ? (
						<LogoutLink>
							<button className="text-white bg-black w-full flex justify-center items-center py-2 rounded ">
								{option.label}
							</button>
						</LogoutLink>
					) : (
						<Link
							href={option.href}
							className="text-gray-800 hover:bg-gray-200">
							{option.label}
						</Link>
					)}
				</div>
			))}
		</div>
	);

	return (
		<nav className="flex items-center justify-between bg-gray-900 p-4 sm:p-6 lg:p-8 w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-opacity-60 border border-gray-700 shadow-lg ">
			<div className="flex items-center text-white text-xl pl-2 pb-0 pt-2">
				<Brand className="w-8 h-8" />
				<span className="ml-8">adzpay</span>
			</div>
			<ul className="flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 xl:space-x-12 pl-[18rem]">
				{navItems.map((item) => (
					<li
						key={item.label}
						className="text-white hover:text-gray-300 transition-all duration-300 ease-in-out hover:scale-110">
						<Link href={item.href}>{item.label}</Link>
					</li>
				))}
			</ul>

			{/* Search, Notification, and User Profile */}
			<div className="flex items-center ml-4">
				{/* Search Input */}
				<input
					type="search"
					aria-label="Search"
					{...search}
					className="p-2 bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 rounded sm:w-48 md:w-64 lg:w-80 xl:w-96 backdrop-blur-md transition-all duration-300 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				/>

				{/* Notification Icon */}
				<button
					className="text-white hover:text-gray-300 ml-2"
					aria-label="Notifications">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.002 7.002 0 00-5-6.708V4a1 1 0 10-2 0v.292A7.002 7.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m0 0a3.001 3.001 0 006 0M9 21h6"
						/>
					</svg>
				</button>

				{/* User Profile and Dropdown */}
				<div className="relative ml-4">
					<button
						className="flex items-center text-white hover:text-gray-300"
						onClick={toggleDropdown}
						aria-haspopup="true"
						aria-expanded={dropdownOpen}>
						<img
							src={user?.picture ?? undefined}
							alt="User"
							className="w-8 h-8 rounded-full"
						/>
					</button>

					{/* Animated Dropdown */}
					{renderDropdown()}
				</div>
			</div>
		</nav>
	);
};

export default React.memo(Navbar);
