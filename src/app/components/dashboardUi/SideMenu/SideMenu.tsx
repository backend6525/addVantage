import React from "react";
import Link from "next/link";
import BottomSidemenu from "./bottomSidemenu";
import {
	FiBell,
	FiHelpCircle,
	FiHome,
	FiSettings,
	FiDollarSign,
	FiPlusCircle,
	FiUsers,
} from "react-icons/fi";
import { Separator } from "@/app/components/separator";
import CreateAdd from "./create";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import TeamDropDown from "./TeamDropDown";

const navItems = [
	{ href: "/dashboard", label: "Dashboard", icon: <FiHome size={20} /> },
	{
		href: "/dashboard/addstudio",
		label: "Add Studio",
		icon: <FiPlusCircle size={20} />,
	},
	{
		href: "/dashboard/earnings",
		label: "Earnings",
		icon: <FiDollarSign size={20} />,
	},
	{
		href: "/dashboard/teams/create",
		label: "Create Team",
		icon: <FiUsers size={20} />,
	},
	{
		href: "/dashboard/settings",
		label: "Settings",
		icon: <FiSettings size={20} />,
	},
];

interface SidebarProps {
	userEmail: string;
	isMenuOpen: boolean;
}

const SideMenu: React.FC<SidebarProps> = ({ isMenuOpen, userEmail }) => {
	const createAdd = useMutation(api.adds.createAdd);

	const onCreateAdd = (fileName: string) => {
		console.log(fileName);
		// Implement your logic here
	};

	return (
		<aside
			className={`${isMenuOpen ? "block" : "hidden"} 
                md:block md:w-64 bg-gray-900 text-white p-6 shadow-lg`} // Reverted to original width
			style={{ position: "fixed", top: "5.5rem", left: 0, height: "100vh" }}>
			{/* Team Selection Dropdown */}
			<div className="mb-8">
				<TeamDropDown userEmail={userEmail} />
			</div>

			{/* Navigation Items */}
			<ul className="space-y-2">
				{navItems.map((item) => (
					<li key={item.label} className="group">
						<Link
							href={item.href}
							className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
							<span className="mr-3">{item.icon}</span>
							{item.label}
						</Link>
					</li>
				))}
			</ul>

			{/* Bottom Side Menu */}
			<div className="mt-10">
				<BottomSidemenu />
			</div>

			{/* Additional Actions */}
			<div className="mt-auto">
				<CreateAdd onCreateAdd={onCreateAdd} />

				<div className="mt-4">
					<div className="h-4 w-full bg-gray-700 rounded overflow-hidden">
						<div
							className="h-4 bg-green-500 rounded"
							style={{ width: "35%" }}></div>
					</div>
					<p className="text-xs text-gray-400 mt-2 text-center">
						Upgrade Account to enjoy more features!
					</p>
				</div>
			</div>

			{/* Separator and Footer Actions */}
			<div className="mt-8">
				<Separator className="bg-gray-600" />
				<div className="flex justify-between py-4">
					<FiHelpCircle
						className="text-gray-400 cursor-pointer hover:text-white transition-colors"
						size={24}
					/>
					<FiBell
						className="text-gray-400 cursor-pointer hover:text-white transition-colors"
						size={24}
					/>
				</div>
			</div>
		</aside>
	);
};

export default SideMenu;
