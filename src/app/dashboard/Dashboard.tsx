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
// 	user: {
// 		email?: string;
// 		given_name?: string;
// 		picture?: string;
// 	} | null;
// }

// interface Ad {
// 	id: string;
// 	title: string;
// 	description: string;
// 	price: number;
// 	createdAt: string;
// 	type: string;
// }

// export default function Dashboard({ user }: DashboardProps) {
// 	const { user: kindeUser } = useKindeBrowserClient();
// 	const createUser = useMutation(api.user.createUser);
// 	const convex = useConvex();

// 	// State for products and loading
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [products, setProducts] = useState<Ad[]>([]);

// 	// Fetch Ads
// 	const ads = useQuery(api.ads.list, {
// 		email: user?.email || kindeUser?.email || '',
// 	});

// 	// Ensure user exists in the database
// 	useEffect(() => {
// 		const ensureUserExists = async () => {
// 			try {
// 				const currentUser = user || kindeUser;
// 				if (currentUser?.email) {
// 					const result = await convex.query(api.user.getUser, {
// 						email: currentUser.email,
// 					});
// 					if (!result?.length) {
// 						await createUser({
// 							name: currentUser.given_name || '',
// 							email: currentUser.email,
// 							picture: currentUser.picture || '',
// 						});
// 					}
// 				}
// 			} catch (error) {
// 				console.error('Error checking/creating user:', error);
// 			}
// 		};
// 		ensureUserExists();
// 	}, [user, kindeUser, createUser, convex]);

// 	// Update product state when ads are fetched
// 	useEffect(() => {
// 		if (ads) {
// 			setProducts(ads);
// 			setIsLoading(false);
// 		}
// 	}, [ads]);

// 	// Loading state UI
// 	if (isLoading) {
// 		return (
// 			<div className='flex justify-center items-center min-h-screen dark:bg-gray-900 dark:text-white'>
// 				<div className='spinner-border animate-spin'>Loading...</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div
// 			id='dashboard-content'
// 			className='w-full pt-16 space-y-6 transition-all duration-300 dark:bg-black dark:text-white min-h-screen'>
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
// 	user: {
// 		email?: string;
// 		given_name?: string;
// 		picture?: string;
// 	} | null;
// }

// interface Ad {
// 	id: string;
// 	title: string;
// 	description: string;
// 	price: number;
// 	createdAt: string;
// 	type: string;
// }

// export default function Dashboard({ user }: DashboardProps) {
// 	const { user: kindeUser } = useKindeBrowserClient();
// 	const createUser = useMutation(api.user.createUser);
// 	const convex = useConvex();

// 	// State for products and loading
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [products, setProducts] = useState<Ad[]>([]);

// 	// Fetch Ads
// 	const ads = useQuery(api.ads.list, {
// 		email: user?.email || kindeUser?.email || '',
// 	});

// 	// Ensure user exists in the database
// 	useEffect(() => {
// 		const ensureUserExists = async () => {
// 			try {
// 				const currentUser = user || kindeUser;
// 				if (currentUser?.email) {
// 					const result = await convex.query(api.user.getUser, {
// 						email: currentUser.email,
// 					});
// 					if (!result?.length) {
// 						await createUser({
// 							name: currentUser.given_name || '',
// 							email: currentUser.email,
// 							picture: currentUser.picture || '',
// 						});
// 					}
// 				}
// 			} catch (error) {
// 				console.error('Error checking/creating user:', error);
// 			}
// 		};
// 		ensureUserExists();
// 	}, [user, kindeUser, createUser, convex]);

// 	// Update product state when ads are fetched
// 	useEffect(() => {
// 		if (ads) {
// 			setProducts(ads);
// 			setIsLoading(false);
// 		}
// 	}, [ads]);

// 	// Loading state UI
// 	if (isLoading) {
// 		return (
// 			<div className='flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white'>
// 				<div className='flex flex-col items-center space-y-4'>
// 					<div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
// 					<p className='text-gray-600 dark:text-gray-300'>
// 						Loading your dashboard...
// 					</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div
// 			id='dashboard-content'
// 			className='w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white'>
// 			<div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 space-y-8'>
// 				<div className='grid gap-6'>
// 					<HeaderCard />
// 					<CreateAdd />
// 					<ProductGrid products={products} />
// 				</div>
// 			</div>
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
// 	user: {
// 		email?: string;
// 		given_name?: string;
// 		picture?: string;
// 	} | null;
// }

// interface Ad {
// 	id: string;
// 	title: string;
// 	description: string;
// 	price: number;
// 	createdAt: string;
// 	type: string;
// }

// export default function Dashboard({ user }: DashboardProps) {
// 	const { user: kindeUser } = useKindeBrowserClient();
// 	const createUser = useMutation(api.user.createUser);
// 	const convex = useConvex();

// 	// State for products and loading
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [products, setProducts] = useState<Ad[]>([]);

// 	// Fetch Ads
// 	const ads = useQuery(api.ads.list, {
// 		email: user?.email || kindeUser?.email || '',
// 	});

// 	// Ensure user exists in the database
// 	useEffect(() => {
// 		const ensureUserExists = async () => {
// 			try {
// 				const currentUser = user || kindeUser;
// 				if (currentUser?.email) {
// 					const result = await convex.query(api.user.getUser, {
// 						email: currentUser.email,
// 					});
// 					if (!result?.length) {
// 						await createUser({
// 							name: currentUser.given_name || '',
// 							email: currentUser.email,
// 							picture: currentUser.picture || '',
// 						});
// 					}
// 				}
// 			} catch (error) {
// 				console.error('Error checking/creating user:', error);
// 			}
// 		};
// 		ensureUserExists();
// 	}, [user, kindeUser, createUser, convex]);

// 	// Update product state when ads are fetched
// 	useEffect(() => {
// 		if (ads) {
// 			setProducts(ads);
// 			setIsLoading(false);
// 		}
// 	}, [ads]);

// 	// Loading state UI
// 	if (isLoading) {
// 		return (
// 			<div className='flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white'>
// 				<div className='flex flex-col items-center space-y-4'>
// 					<div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
// 					<p className='text-gray-600 dark:text-gray-300'>
// 						Loading your dashboard...
// 					</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div
// 			id='dashboard-content'
// 			className='w-full h-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white'>
// 			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
// 				<div className='space-y-6'>
// 					<HeaderCard />
// 					<CreateAdd />
// 					<ProductGrid products={products} />
// 				</div>
// 			</div>
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
// 	user: {
// 		email?: string;
// 		given_name?: string;
// 		picture?: string;
// 	} | null;
// }

// interface Ad {
// 	id: string;
// 	title: string;
// 	description: string;
// 	price: number;
// 	createdAt: string;
// 	type: string;
// }

// export default function Dashboard({ user }: DashboardProps) {
// 	const { user: kindeUser } = useKindeBrowserClient();
// 	const createUser = useMutation(api.user.createUser);
// 	const convex = useConvex();

// 	// State for products and loading
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [products, setProducts] = useState<Ad[]>([]);

// 	// Fetch Ads
// 	const ads = useQuery(api.ads.list, {
// 		email: user?.email || kindeUser?.email || '',
// 	});

// 	// Ensure user exists in the database
// 	useEffect(() => {
// 		const ensureUserExists = async () => {
// 			try {
// 				const currentUser = user || kindeUser;
// 				if (currentUser?.email) {
// 					const result = await convex.query(api.user.getUser, {
// 						email: currentUser.email,
// 					});
// 					if (!result?.length) {
// 						await createUser({
// 							name: currentUser.given_name || '',
// 							email: currentUser.email,
// 							picture: currentUser.picture || '',
// 						});
// 					}
// 				}
// 			} catch (error) {
// 				console.error('Error checking/creating user:', error);
// 			}
// 		};
// 		ensureUserExists();
// 	}, [user, kindeUser, createUser, convex]);

// 	// Update product state when ads are fetche
// 	useEffect(() => {
// 		if (ads) {
// 			setProducts(ads);
// 			setIsLoading(false);
// 		}
// 	}, [ads]);

// 	// Loading state UI
// 	if (isLoading) {
// 		return (
// 			<div className='flex justify-center items-center min-h-screen dark:bg-gray-900 dark:text-white'>
// 				<div className='flex flex-col items-center space-y-4'>
// 					<div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
// 					<p className='text-gray-600 dark:text-gray-300'>
// 						Loading your dashboard...
// 					</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div
// 			id='dashboard-content'
// 			className='w-full pt-16 space-y-6 transition-all duration-300 dark:bg-black dark:text-white min-h-screen'>
// 			<div className='px-4'>
// 				<HeaderCard />
// 				<CreateAdd />
// 				<ProductGrid products={products} />
// 			</div>
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
// 	user: {
// 		email?: string;
// 		given_name?: string;
// 		picture?: string;
// 	} | null;
// }

// interface Ad {
// 	id: string;
// 	title: string;
// 	description: string;
// 	price: number;
// 	createdAt: string;
// 	type: string;
// }

// export default function Dashboard({ user }: DashboardProps) {
// 	const { user: kindeUser } = useKindeBrowserClient();
// 	const createUser = useMutation(api.user.createUser);
// 	const convex = useConvex();

// 	// State for products and loading
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [products, setProducts] = useState<Ad[]>([]);

// 	// Fetch Ads
// 	const ads = useQuery(api.ads.list, {
// 		email: user?.email || kindeUser?.email || '',
// 	});

// 	// Ensure user exists in the database
// 	useEffect(() => {
// 		const ensureUserExists = async () => {
// 			try {
// 				const currentUser = user || kindeUser;
// 				if (currentUser?.email) {
// 					const result = await convex.query(api.user.getUser, {
// 						email: currentUser.email,
// 					});
// 					if (!result?.length) {
// 						await createUser({
// 							name: currentUser.given_name || '',
// 							email: currentUser.email,
// 							picture: currentUser.picture || '',
// 						});
// 					}
// 				}
// 			} catch (error) {
// 				console.error('Error checking/creating user:', error);
// 			}
// 		};
// 		ensureUserExists();
// 	}, [user, kindeUser, createUser, convex]);

// 	// Update product state when ads are fetched
// 	useEffect(() => {
// 		if (ads) {
// 			setProducts(ads);
// 			setIsLoading(false);
// 		}
// 	}, [ads]);

// 	// Loading state UI
// 	if (isLoading) {
// 		return (
// 			<div className='flex justify-center items-center min-h-screen dark:bg-gray-900 dark:text-white'>
// 				<div className='flex flex-col items-center space-y-4'>
// 					<div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
// 					<p className='text-gray-600 dark:text-gray-300'>
// 						Loading your dashboard...
// 					</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div
// 			id='dashboard-content'
// 			className='w-full pt-16 space-y-6 transition-all duration-300 dark:bg-black dark:text-white min-h-screen'>
// 			<div className='px-4'>
// 				<HeaderCard />
// 				<CreateAdd />
// 				<ProductGrid products={products} />
// 			</div>
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

interface DashboardProps {
	user: {
		email?: string;
		given_name?: string;
		picture?: string;
	} | null;
}

interface Ad {
	id: string;
	title: string;
	description: string;
	price: number;
	createdAt: string;
	type: string;
}

export default function Dashboard({ user }: DashboardProps) {
	const { user: kindeUser } = useKindeBrowserClient();
	const createUser = useMutation(api.user.createUser);
	const convex = useConvex();

	// State for products and loading
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<Ad[]>([]);

	// Fetch Ads
	const ads = useQuery(api.ads.list, {
		email: user?.email || kindeUser?.email || '',
	});

	// Ensure user exists in the database
	useEffect(() => {
		const ensureUserExists = async () => {
			try {
				const currentUser = user || kindeUser;
				if (currentUser?.email) {
					const result = await convex.query(api.user.getUser, {
						email: currentUser.email,
					});
					if (!result?.length) {
						await createUser({
							name: currentUser.given_name || '',
							email: currentUser.email,
							picture: currentUser.picture || '',
						});
					}
				}
			} catch (error) {
				console.error('Error checking/creating user:', error);
			}
		};
		ensureUserExists();
	}, [user, kindeUser, createUser, convex]);

	// Update product state when ads are fetched
	useEffect(() => {
		if (ads) {
			setProducts(ads);
			setIsLoading(false);
		}
	}, [ads]);

	// Loading state UI
	if (isLoading) {
		return (
			<div className='flex justify-center items-center min-h-screen dark:bg-gray-900 dark:text-white'>
				<div className='flex flex-col items-center space-y-4'>
					<div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
					<p className='text-gray-600 dark:text-gray-300'>
						Loading your dashboard...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div
			id='dashboard-content'
			className='w-full pt-16 space-y-6 transition-all duration-300 	 dark:border-gray-800  dark:text-white min-h-screen pl-8 pr-2'>
			<HeaderCard />
			<CreateAdd />
			<ProductGrid products={products} />
		</div>
	);
}
