// import { redirect } from "next/navigation";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import Dashboard from "./Dashboard"; // Client-side component

// export default async function DashboardPage() {
// 	const session = await getKindeServerSession(); // Fetch session

// 	// Check if the user is authenticated
// 	const user = await session.getUser();

// 	if (!user) {
// 		redirect("/login"); // Redirect if not authenticated
// 	}

// 	// Pass the user to the client-side component
// 	return <Dashboard isMenuOpen={false} user={user} />;
// }

import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Dashboard from './Dashboard'; // Client-side component

export default async function DashboardPage() {
	try {
		const session = await getKindeServerSession();
		const user = await session.getUser();

		// Robust authentication check
		if (!user || !user.id) {
			redirect('/login');
		}

		// Pass the user to the client-side component
		return <Dashboard user={user} />;
	} catch (error) {
		console.error('Authentication session error:', error);
		redirect('/login');
	}
}
