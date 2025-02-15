import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
	try {
		const { username, password } = await request.json();

		if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
			// In a real application, you would use proper JWT signing
			const token = Buffer.from(JSON.stringify({ username, role: 'admin' })).toString('base64');
			
			// Set the token in cookies
			cookies().set('auth-token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // 24 hours
			});

			return NextResponse.json({ success: true });
		}

		return NextResponse.json(
			{ error: 'Invalid credentials' },
			{ status: 401 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}