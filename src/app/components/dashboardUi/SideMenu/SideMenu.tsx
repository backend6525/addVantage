// export default SideMenu;
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BottomSidemenu from "./bottomSidemenu";
import { FiBell, FiHelpCircle } from "react-icons/fi";
import { Separator } from "@/app/components/separator";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import TeamDropDown from "./TeamDropDown";

import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import CreateAdd from "./create";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { User } from "lucide-react";

const navItems = [
	{ href: "/dashboard/addstudio", label: "AddStudio" },
	{ href: "/dashboard/earnings", label: "Earnings" },
	{ href: "/dashboard/teams/create", label: "create team" },
	{ href: "/dashboard/settings", label: "Settings" },
];

const comparisonData = {
	imageSrc: "https://via.placeholder.com/50",
	title: "Get Detailed Comparison Insights",
	description:
		"Its now possible, you can advertise on a daily charge of 1000ugx",
	buttonText: "Create Add",
};

interface SidebarProps {
	userEmail: string;
	isMenuOpen: boolean;
}

const SideMenu: React.FC<SidebarProps> = ({ isMenuOpen, userEmail }) => {
	const onCreateAdd = (fileName: string) => {
		console.log(fileName);
		// createAdd({
		//   fileName: fileName,
		//   teamId: '',
		//   createdBy: userEmail
		// });
	};

	const createAdd = useMutation(api.adds.createAdd);

	console.log("SideMenu userEmail:", userEmail); // Debugging log

	return (
		<aside
			className={`${isMenuOpen ? "block" : "hidden"} md:block md:w-64 bg-gray-800 p-4`}
			style={{ position: "fixed", top: "5.5rem", left: 0, height: "100vh" }}>
			<TeamDropDown userEmail={userEmail} />
			<ul className="py-28">
				{navItems.map((item) => (
					<li key={item.label} className="px-4 py-2">
						<Link href={item.href} className="text-white hover:text-gray-300">
							{item.label}
						</Link>
					</li>
				))}
			</ul>
			<div className="px-4 pt-35">
				<BottomSidemenu />
			</div>
			<div className="pt-[7rem]">
				<CreateAdd onCreateAdd={onCreateAdd} />
				<div className="pt-4">
					<div className="h-4 w-full bg-gray-300 rounded">
						<div className="h-4 w-[35%] bg-green-500 rounded"></div>
					</div>
				</div>
				<h2>
					<p className="text-sm pt-3">
						{" "}
						Upgrade Account to enjoy more features!{" "}
					</p>
				</h2>
			</div>
			<div className="pt-[3rem]">
				<div className="size-1 w-full bg-slate-500">
					<Separator />
				</div>
				<div className="flex justify-end space-x-6 py-3">
					<FiHelpCircle className="text-white cursor-pointer" size={24} />
					<FiBell className="text-white cursor-pointer" size={24} />
				</div>
			</div>
		</aside>
	);
};

export default SideMenu;
