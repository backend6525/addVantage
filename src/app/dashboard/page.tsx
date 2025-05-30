import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Dashboard from './Dashboard';
import { Suspense } from 'react';

export default async function DashboardPage() {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user) {
			redirect('/login');
		}

		// Create a simple user object for the dashboard
		const dashboardUser = {
			email: user.email!,
			name: `${user.given_name || ''} ${user.family_name || ''}`.trim(),
			picture: user.picture || '',
		};

		return (
			<Suspense fallback={<div>Loading...</div>}>
				<Dashboard isMenuOpen={false} user={dashboardUser} />
			</Suspense>
		);
	} catch (error) {
		console.error('Dashboard error:', error);
		redirect('/login');
	}
}
