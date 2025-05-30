'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth<P extends object>(
	WrappedComponent: React.ComponentType<P>
) {
	return function WithAuthComponent(props: P) {
		const { user, isLoading } = useKindeBrowserClient();
		const router = useRouter();

		useEffect(() => {
			if (!isLoading && !user) {
				router.push('/auth/signin');
			}
		}, [isLoading, user, router]);

		if (isLoading) {
			return (
				<div className='flex items-center justify-center h-screen'>
					Loading...
				</div>
			);
		}

		if (!user) {
			return null;
		}

		return <WrappedComponent {...props} />;
	};
}
