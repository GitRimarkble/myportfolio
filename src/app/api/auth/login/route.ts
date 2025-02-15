import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
	try {
		const { username, password } = await request.json();

		if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
			// Create token
			const token = Buffer.from(JSON.stringify({ 
				username, 
				role: 'admin',
				exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
			})).toString('base64');
			
			// Create the response
			const response = NextResponse.json({ success: true });
			
			// Set cookie in the response
			response.cookies.set('auth-token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 // 24 hours
			});

			return response;
		}

		return NextResponse.json(
			{ error: 'Invalid credentials' },
			{ status: 401 }
		);
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}