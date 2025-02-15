'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
	const pathname = usePathname();

	const menuItems = [
		{ 
			label: 'Dashboard', 
			href: '/admin', 
			icon: '📊'
		},
		{ 
			label: 'Blog Management', 
			href: '/admin/blog', 
			icon: '📝'
		},
		{ 
			label: 'Lab Projects', 
			href: '/admin/projects', 
			icon: '🧪'
		},
		{ 
			label: 'Professional Journey', 
			href: '/admin/journey', 
			icon: '🚀'
		},
		{ 
			label: 'Core Competencies', 
			href: '/admin/skills', 
			icon: '💡'
		},
		{ 
			label: 'Site Settings', 
			href: '/admin/settings', 
			icon: '⚙️'
		}
	];

	return (
		<div className="w-64 bg-base-200 min-h-screen p-4">
			<div className="mb-8 text-center">
				<h2 className="text-2xl font-bold">Admin Dashboard</h2>
			</div>
			<ul className="menu">
				{menuItems.map((item) => (
					<li key={item.href}>
						<Link 
							href={item.href} 
							className={`flex items-center ${pathname === item.href ? 'active' : ''}`}
						>
							<span className="mr-2">{item.icon}</span>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
			<div className="divider"></div>
			<div className="p-4">
				<button 
					className="btn btn-error w-full"
					onClick={() => {
						// Implement logout functionality
						localStorage.removeItem('auth-token');
						window.location.href = '/login';
					}}
				>
					Logout
				</button>
			</div>
		</div>
	);
}