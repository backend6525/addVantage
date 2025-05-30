'use client';

import { ReactNode } from 'react';
import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<KindeProvider
			domain={process.env.NEXT_PUBLIC_KINDE_DOMAIN as string}
			clientId={process.env.NEXT_PUBLIC_KINDE_CLIENT_ID as string}
			redirectUri={process.env.NEXT_PUBLIC_KINDE_REDIRECT_URI as string}
			audience={process.env.NEXT_PUBLIC_KINDE_CLIENT_ID as string}>
			<ConvexProvider client={convex}>{children}</ConvexProvider>
		</KindeProvider>
	);
}
