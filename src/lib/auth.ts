interface TokenPayload {
	username: string;
	role: string;
}

export function validateToken(token: string): boolean {
	try {
		// Decode base64 token
		const decodedToken = Buffer.from(token, 'base64').toString();
		const payload = JSON.parse(decodedToken) as TokenPayload;

		// Check if token has required fields
		if (!payload.username || !payload.role) {
			return false;
		}

		// Check if role is admin
		if (payload.role !== 'admin') {
			return false;
		}

		return true;
	} catch (error) {
		return false;
	}
}