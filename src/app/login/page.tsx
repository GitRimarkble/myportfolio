'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const [credentials, setCredentials] = useState({
		username: '',
		password: ''
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
				credentials: 'include', // Important for cookie handling
			});

			if (response.ok) {
				router.push('/admin');
				router.refresh(); // Force a refresh to update auth state
			} else {
				const data = await response.json();
				setError(data.error || 'Login failed');
			}
		} catch (error) {
			setError('An error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="card bg-base-200 w-96">
				<div className="card-body">
					<h1 className="card-title text-2xl mb-4">Admin Login</h1>
					
					{error && (
						<div className="alert alert-error mb-4">
							{error}
						</div>
					)}
					
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="form-control">
							<label className="label">Username</label>
							<input
								type="text"
								className="input input-bordered"
								value={credentials.username}
								onChange={(e) => setCredentials({...credentials, username: e.target.value})}
								required
							/>
						</div>
						
						<div className="form-control">
							<label className="label">Password</label>
							<input
								type="password"
								className="input input-bordered"
								value={credentials.password}
								onChange={(e) => setCredentials({...credentials, password: e.target.value})}
								required
							/>
						</div>
						
						<button 
							type="submit" 
							className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
							disabled={loading}
						>
							{loading ? 'Logging in...' : 'Login'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}