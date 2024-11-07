// "use client"; // Enables client-side behavior

// import React, { useEffect, useState } from "react";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import { useConvex, useMutation, useQuery } from "convex/react";
// import { api } from "../../../convex/_generated/api";
// import {
// 	HeaderCard,
// 	ProductGrid,
// 	CreateAdd,
// } from "../components/dashboardUi/Cards";

// interface DashboardProps {
// 	isMenuOpen: boolean; // State of the side menu
// 	user: any; // User object from Kinde session
// }

// export default function Dashboard({ isMenuOpen, user }: DashboardProps) {
// 	const createUser = useMutation(api.user.createUser);
// 	const convex = useConvex();

// 	const [isLoading, setIsLoading] = useState(true); // Loading state
// 	const [products, setProducts] = useState([]); // Products state

// 	// Check if the user exists in the Convex database
// 	const checkUser = async () => {
// 		const result = await convex.query(api.user.getUser, { email: user?.email });
// 		if (!result?.length) {
// 			createUser({
// 				name: user.given_name,
// 				email: user.email,
// 				picture: user.picture,
// 				phone: user.phone,
// 				location: user.location,
// 			}).then((resp) => {
// 				console.log("User created:", resp);
// 			});
// 		}
// 	};

// 	// Fetch data when the user is available
// 	useEffect(() => {
// 		if (user && user.email) {
// 			setIsLoading(false);
// 			checkUser();
// 		}
// 	}, [user]);

// 	// Fetch ads related to the user’s email
// 	const ads = useQuery(
// 		api.ads.list,
// 		{ email: user?.email || "" },
// 		{
// 			enabled: Boolean(user?.email), // Only run the query when user email exists
// 		}
// 	);

// 	// Update products when ads are fetched
// 	useEffect(() => {
// 		if (ads) {
// 			if (ads.length > 0) {
// 				setProducts(ads);
// 				setIsLoading(false);
// 			} else {
// 				console.log("No ads found.");
// 			}
// 		}
// 	}, [ads]);

// 	if (isLoading) {
// 		return (
// 			<div className="flex justify-center items-center h-screen">
// 				<p>Loading...</p>
// 			</div>
// 		);
// 	}

// 	// Render the dashboard with products
// 	return (
// 		<div
// 			className={`pt-[6.2rem] overflow-hidden transition-all duration-300 id="dashboard-content" className="transition-all duration-300${
// 				isMenuOpen
// 					? "lg:pl-[16.1rem] md:pl-[0.1rem]"
// 					: "lg:pl-[5rem] md:pl-[0.1rem]"
// 			} sm:pl-0`}>
// 			<HeaderCard />
// 			<div>
// 				<div className="py-4 md:py-6 sm:px-4">
// 					<CreateAdd />
// 				</div>
// 				<div className="">
// 					<ProductGrid products={products} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

"use client";

import React, { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
	HeaderCard,
	ProductGrid,
	CreateAdd,
} from "../components/dashboardUi/Cards";

interface DashboardProps {
	isMenuOpen: boolean;
	user: any;
}

export default function Dashboard({ isMenuOpen, user }: DashboardProps) {
	const { user: kindeUser } = useKindeBrowserClient();
	const createUser = useMutation(api.user.createUser);
	const convex = useConvex();

	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		if (user && user.email) {
			setIsLoading(false);
			checkUser();
		}
	}, [user]);

	const ads = useQuery(
		api.ads.list,
		{ email: user?.email || "" },
		{ enabled: Boolean(user?.email) }
	);

	useEffect(() => {
		if (ads) {
			setProducts(ads);
			setIsLoading(false);
		}
	}, [ads]);

	const checkUser = async () => {
		const result = await convex.query(api.user.getUser, { email: user?.email });
		if (!result?.length) {
			createUser({
				name: user.given_name,
				email: user.email,
				picture: user.picture,
			});
		}
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<div
			className={`pt-[6.2rem] pl-[2rem] overflow-hidden transition-all duration-300 id="dashboard-content" className="transition-all duration-300${
				isMenuOpen
					? "lg:pl-[2.6rem] md:pl-[0.1rem]"
					: "lg:pl-[2rem] md:pl-[0.1rem]"
			} sm:pl-0`}>
			<HeaderCard />
			<CreateAdd />
			<ProductGrid products={products} />
		</div>
	);
}
