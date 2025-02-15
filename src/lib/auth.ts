import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function verifyAuth(request: NextRequest) {
	const token = request.cookies.get('auth-token')?.value;
	
	if (!token) {
		return false;
	}

	try {
		verify(token, process.env.JWT_SECRET!);
		return true;
	} catch (error) {
		return false;
	}
}