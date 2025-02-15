import { validateToken } from '../lib/auth.js';
import 'dotenv/config';
import fetch from 'node-fetch';

async function testLogin() {
	try {
		// Simulate login request
		const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: process.env.ADMIN_USERNAME,
				password: process.env.ADMIN_PASSWORD
			})
		});

		const loginData = await loginResponse.json();
		console.log('Login Response:', loginData);

		// In a real scenario, you'd extract the token from cookies
		// For this test, we'll simulate token generation
		const token = Buffer.from(JSON.stringify({ 
			username: process.env.ADMIN_USERNAME, 
			role: 'admin' 
		})).toString('base64');

		// Validate the token
		const isValidToken = validateToken(token);
		console.log('Token Validation:', isValidToken);

		// Test invalid token scenarios
		const invalidTokens = [
			'', 
			'invalid_token', 
			Buffer.from(JSON.stringify({ username: 'hacker', role: 'user' })).toString('base64')
		];

		console.log('Invalid Token Tests:');
		invalidTokens.forEach(invalidToken => {
			console.log(`Token: ${invalidToken} - Valid: ${validateToken(invalidToken)}`);
		});

	} catch (error) {
		console.error('Login Test Failed:', error);
	}
}

testLogin();