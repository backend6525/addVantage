// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
// import { useConvex, useMutation, useQuery } from 'convex/react';
// import { api } from '../../../convex/_generated/api';
// import {
// 	HeaderCard,
// 	ProductGrid,
// 	CreateAdd,
// } from '../components/dashboardUi/Cards';

// interface DashboardProps {
// 	isMenuOpen: boolean;
// 	user: any;
// }

// export default function Dashboard({ isMenuOpen, user }: DashboardProps) {
// 	const { user: kindeUser } = useKindeBrowserClient();
// 	const createUser = useMutation(api.user.createUser);
// 	const convex = useConvex();
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [products, setProducts] = useState<any[]>([]);

// 	const ads = useQuery(
// 		api.ads.list,
// 		{ email: user?.email || '' },
// 		{ enabled: Boolean(user?.email) }
// 	);

// 	useEffect(() => {
// 		if (ads) {
// 			setProducts(ads);
// 			setIsLoading(false);
// 		}
// 	}, [ads]);

// 	// Check if the user exists, if not, create one
// 	const checkUser = async () => {
// 		const result = await convex.query(api.user.getUser, { email: user?.email });
// 		if (!result?.length) {
// 			createUser({
// 				name: user.given_name,
// 				email: user.email,
// 				picture: user.picture,
// 			});
// 		}
// 	};
// 	//console.log('this is the:', products);

// 	if (isLoading) return <div>Loading...</div>;

// 	return (
// 		<div
// 			className={`pt-[6.2rem] pl-[2rem] overflow-hidden transition-all duration-300 ${
// 				isMenuOpen
// 					? 'lg:pl-[2.6rem] md:pl-[0.1rem]'
// 					: 'lg:pl-[2rem] md:pl-[0.1rem]'
// 			} sm:pl-0`}
// 			id='dashboard-content'>
// 			<HeaderCard />
// 			<CreateAdd />
// 			<ProductGrid products={products} />
// 		</div>
// 	);
// }

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
// import { useConvex, useMutation, useQuery } from 'convex/react';
// import { api } from '../../../convex/_generated/api';
// import {
// 	HeaderCard,
// 	ProductGrid,
// 	CreateAdd,
// } from '../components/dashboardUi/Cards';

// interface DashboardProps {
// 	isMenuOpen: boolean;
// 	user: any;
// }

// export default function Dashboard({ isMenuOpen, user }: DashboardProps) {
// 	const { user: kindeUser } = useKindeBrowserClient();
// 	const createUser = useMutation(api.user.createUser);
// 	const convex = useConvex();
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [products, setProducts] = useState<any[]>([]);

// 	const ads = useQuery(
// 		api.ads.list,
// 		{ email: user?.email || '' },
// 		{ enabled: Boolean(user?.email) }
// 	);

// 	useEffect(() => {
// 		if (ads) {
// 			console.log('Fetched ads data:', ads); // Log all data to verify fields
// 			setProducts(ads);
// 			setIsLoading(false);
// 		}
// 	}, [ads]);

// 	// Check if the user exists, if not, create one
// 	const checkUser = async () => {
// 		const result = await convex.query(api.user.getUser, { email: user?.email });
// 		if (!result?.length) {
// 			createUser({
// 				name: user.given_name,
// 				email: user.email,
// 				picture: user.picture,
// 			});
// 		}
// 	};
// 	console.log('this is the:', products);
// 	if (isLoading) return <div>Loading...</div>;

// 	return (
// 		<div
// 			className={`pt-[6.2rem] pl-[2rem] overflow-hidden transition-all duration-300 ${
// 				isMenuOpen
// 					? 'lg:pl-[2.6rem] md:pl-[0.1rem]'
// 					: 'lg:pl-[2rem] md:pl-[0.1rem]'
// 			} sm:pl-0`}
// 			id='dashboard-content'>
// 			<HeaderCard />
// 			<CreateAdd />
// 			<ProductGrid products={products} />
// 		</div>
// 	);
// }

'use client';
import React, { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import {
	HeaderCard,
	ProductGrid,
	CreateAdd,
} from '../components/dashboardUi/Cards';

// Type definitions for better safety and clarity
interface DashboardProps {
	isMenuOpen: boolean;
	user: { email?: string; given_name?: string; picture?: string } | null;
}

interface Ad {
	id: string;
	title: string;
	description: string;
	price: number;
	createdAt: string;
	type: string; // Add the missing 'type' property
}

export default function Dashboard({ isMenuOpen, user }: DashboardProps) {
	const { user: kindeUser } = useKindeBrowserClient();
	const createUser = useMutation(api.user.createUser);
	const convex = useConvex();

	// Ensure products state matches the expected type
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<Ad[]>([]);

	// Combine parameters into a single object
	const ads = useQuery(api.ads.list, {
		email: user?.email || '',
		// enabled: Boolean(user?.email),
	});

	useEffect(() => {
		if (ads) {
			console.log('Fetched ads data:', ads); // Log all data to verify fields
			setProducts(ads);
			setIsLoading(false);
		}
	}, [ads]);

	// Check if the user exists, if not, create one
	const checkUser = async () => {
		const result = await convex.query(api.user.getUser, { email: user?.email });
		if (!result?.length) {
			createUser({
				name: user?.given_name || '',
				email: user?.email || '',
				picture: user?.picture || '',
			});
		}
	};

	console.log('This is the:', products);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div
			className={`pt-[6.2rem] pl-[2rem] overflow-hidden transition-all duration-300 ${
				isMenuOpen
					? 'lg:pl-[2.6rem] md:pl-[0.1rem]'
					: 'lg:pl-[2rem] md:pl-[0.1rem]'
			} sm:pl-0`}
			id='dashboard-content'>
			<HeaderCard />
			<CreateAdd />
			<ProductGrid products={products} />
		</div>
	);
}
