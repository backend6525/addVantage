'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Brand from '@/app/components/ui/Brand';

export default function LoginPage() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to Kinde's server-side login endpoint
		router.push('/api/auth/login');
	}, [router]);

	return (
		<main className='w-full h-screen flex flex-col items-center justify-center px-4'>
			<div className='max-w-sm w-full text-gray-300'>
				<div className='text-center'>
					<Brand className='mx-auto w-32' />
					<div className='mt-5 space-y-2'>
						<h1 className='text-white text-2xl font-bold sm:text-3xl'>
							Logging you in...
						</h1>
						<p className=''>
							Please wait while we redirect you to the login page.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
