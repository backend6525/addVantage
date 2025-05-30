import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const { isAuthenticated } = getKindeServerSession();

	// Check if user is authenticated
	const isUserAuthenticated = await isAuthenticated();

	// Define protected routes
	const protectedRoutes = [
		'/dashboard',
		'/settings',
		'/onboarding',
		'/api/auth/user',
		'/api/auth/user/userLimits',
		'/api/auth/user/creditStatus',
	];

	// Check if the current path is a protected route
	const isProtectedRoute = protectedRoutes.some((route) =>
		request.nextUrl.pathname.startsWith(route)
	);

	// If not authenticated and trying to access protected routes, redirect to login
	if (!isUserAuthenticated && isProtectedRoute) {
		const loginUrl = new URL('/login', request.url);
		loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
		return NextResponse.redirect(loginUrl);
	}

	// Let the request proceed
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		'/dashboard/:path*',
		'/settings/:path*',
		'/onboarding',
		'/api/auth/user/:path*',
	],
};
