interface TokenPayload {
	username: string;
	role: string;
	exp: number;
}

export function validateToken(token: string): boolean {
	try {
		// Decode base64 token
		const decodedToken = Buffer.from(token, 'base64').toString();
		const payload = JSON.parse(decodedToken) as TokenPayload;

		// Check if token has required fields
		if (!payload.username || !payload.role || !payload.exp) {
			return false;
		}

		// Check if token is expired
		if (Date.now() > payload.exp) {
			return false;
		}

		// Check if role is admin
		if (payload.role !== 'admin') {
			return false;
		}

		return true;
	} catch (error) {
		console.error('Token validation error:', error);
		return false;
	}
}