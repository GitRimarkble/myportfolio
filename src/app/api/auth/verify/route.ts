import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateToken } from '@/lib/auth';

export async function GET() {
	try {
		const authToken = cookies().get('auth-token')?.value;

		if (!authToken || !validateToken(authToken)) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		return NextResponse.json({ authenticated: true });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}