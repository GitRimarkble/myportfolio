import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateToken } from './lib/auth';

export function middleware(request: NextRequest) {
	// Check if it's an admin route
	if (request.nextUrl.pathname.startsWith('/admin')) {
		// Get the authentication token from the cookies
		const authToken = request.cookies.get('auth-token')?.value;
		
		// If there's no token or token is invalid, redirect to login
		if (!authToken || !validateToken(authToken)) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}
	
	return NextResponse.next();
}

export const config = {
	matcher: '/admin/:path*',
};
