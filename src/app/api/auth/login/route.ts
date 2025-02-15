import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
	try {
		const { username, password } = await request.json();

		// Verify credentials against environment variables
		if (
			username === process.env.ADMIN_USERNAME &&
			password === process.env.ADMIN_PASSWORD
		) {
			// Create JWT token
			const token = sign(
				{ username },
				process.env.JWT_SECRET!,
				{ expiresIn: '24h' }
			);

			// Set cookie
			const response = NextResponse.json(
				{ success: true },
				{ status: 200 }
			);

			response.cookies.set({
				name: 'auth-token',
				value: token,
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
		return NextResponse.json(
			{ error: 'Authentication failed' },
			{ status: 500 }
		);
	}
}