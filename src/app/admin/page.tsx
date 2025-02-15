'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
	const [stats, setStats] = useState({
		blogPosts: 0,
		projects: 0,
		skills: 0,
		lastUpdated: new Date()
	});

	useEffect(() => {
		// Fetch dashboard statistics
		async function fetchStats() {
			try {
				const [blogResponse, projectsResponse, skillsResponse] = await Promise.all([
					fetch('/api/blog'),
					fetch('/api/projects'),
					fetch('/api/skills') // Assuming you'll create this endpoint
				]);

				const blogPosts = await blogResponse.json();
				const projects = await projectsResponse.json();
				const skills = await skillsResponse.json();

				setStats({
					blogPosts: blogPosts.length,
					projects: projects.length,
					skills: skills.length,
					lastUpdated: new Date()
				});
			} catch (error) {
				console.error('Failed to fetch dashboard stats:', error);
			}
		}

		fetchStats();
	}, []);

	const statCards = [
		{ 
			title: 'Blog Posts', 
			value: stats.blogPosts, 
			icon: '📝',
			color: 'primary'
		},
		{ 
			title: 'Projects', 
			value: stats.projects, 
			icon: '🚀',
			color: 'secondary'
		},
		{ 
			title: 'Skills', 
			value: stats.skills, 
			icon: '💡',
			color: 'accent'
		}
	];

	return (
		<div>
			<h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
			
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{statCards.map((card, index) => (
					<motion.div 
						key={card.title}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2 }}
					>
						<div className={`card bg-${card.color} text-${card.color}-content shadow-xl`}>
							<div className="card-body">
								<div className="flex justify-between items-center">
									<div>
										<h3 className="text-xl font-semibold">{card.title}</h3>
										<p className="text-3xl font-bold">{card.value}</p>
									</div>
									<div className="text-4xl">{card.icon}</div>
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<p>Last Updated: {stats.lastUpdated.toLocaleString()}</p>
						{/* Add more detailed recent activity log if needed */}
					</div>
				</div>
			</div>
		</div>
	);
}