'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';

export default function AdminLayout({ 
	children 
}: { 
	children: React.ReactNode 
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Check authentication by making a request to a protected endpoint
		async function checkAuth() {
			try {
				const response = await fetch('/api/auth/verify', {
					credentials: 'include' // Important for cookie handling
				});

				if (!response.ok) {
					router.push('/login');
				}
			} catch (error) {
				console.error('Auth check failed:', error);
				router.push('/login');
			} finally {
				setIsLoading(false);
			}
		}

		checkAuth();
	}, [router]);

	if (isLoading) {
		return <div className="flex items-center justify-center min-h-screen">
			<div className="loading loading-spinner loading-lg"></div>
		</div>;
	}

	return (
		<div className="flex">
			<AdminSidebar />
			<main className="flex-1 p-8 bg-base-100 min-h-screen">
				{children}
			</main>
		</div>
	);
}