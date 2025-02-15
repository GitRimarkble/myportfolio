import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	// Check if it's an admin route
	if (request.nextUrl.pathname.startsWith('/admin')) {
		// Get the authentication token from the cookies
		const authToken = request.cookies.get('auth-token')?.value;
		
		// If there's no token, redirect to login
		if (!authToken) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
		
		// You can add more token validation here
		// For now, we'll just check if it exists
	}
	
	return NextResponse.next();
}

export const config = {
	matcher: '/admin/:path*',
};