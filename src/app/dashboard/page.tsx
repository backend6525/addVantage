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
import Dashboard from './Dashboard';

export default async function DashboardPage() {
	const session = await getKindeServerSession();

	// Fetch user information from the session
	const user = await session.getUser();

	if (!user) {
		redirect('/login');
	}

	// Pass the required props to the Dashboard component
	return <Dashboard isMenuOpen={false} user={user} />;
}
