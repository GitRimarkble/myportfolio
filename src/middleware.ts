import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(request: NextRequest) {
	// Paths that require authentication
	const protectedPaths = ['/admin', '/api/admin'];
	const path = request.nextUrl.pathname;

	if (protectedPaths.some(prefix => path.startsWith(prefix))) {
		const isAuthenticated = await verifyAuth(request);

		if (!isAuthenticated) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*', '/api/admin/:path*']
};
