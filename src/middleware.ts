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
			const loginUrl = new URL('/login', request.url);
			// Add the original URL as a redirect parameter
			loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
			
			const response = NextResponse.redirect(loginUrl);
			// Clear any invalid auth token
			if (authToken) {
				response.cookies.delete('auth-token');
			}
			
			return response;
		}

		// Add security headers for admin routes
		const response = NextResponse.next();
		response.headers.set('X-Frame-Options', 'DENY');
		response.headers.set('X-Content-Type-Options', 'nosniff');
		response.headers.set('Referrer-Policy', 'same-origin');
		
		return response;
	}
	
	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*', '/login']
};
