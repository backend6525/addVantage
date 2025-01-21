import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Dashboard from './Dashboard';
import { Suspense } from 'react';

export default async function DashboardPage() {
	const { getUser } = await getKindeServerSession();
	const user = await getUser();

	if (!user) {
		redirect('/login');
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Dashboard isMenuOpen={false} user={user} />
		</Suspense>
	);
}
