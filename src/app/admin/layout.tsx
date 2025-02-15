'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';

export default function AdminLayout({ 
	children 
}: { 
	children: React.ReactNode 
}) {
	const router = useRouter();

	useEffect(() => {
		// Check authentication
		const authToken = localStorage.getItem('auth-token');
		if (!authToken) {
			router.push('/login');
		}
	}, [router]);

	return (
		<div className="flex">
			<AdminSidebar />
			<main className="flex-1 p-8 bg-base-100 min-h-screen">
				{children}
			</main>
		</div>
	);
}