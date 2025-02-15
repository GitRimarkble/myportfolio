'use client';

import { useState, useEffect } from 'react';
import { Project, categories, technologies, statuses } from '@/app/lab/types';

export default function AdminProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingProject, setEditingProject] = useState<Project | null>(null);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		technologies: [] as string[],
		imageUrl: '',
		githubUrl: '',
		liveUrl: '',
		category: 'web',
		featured: false,
		status: 'planned',
		completionDate: new Date().toISOString().split('T')[0]
	});

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const response = await fetch('/api/projects');
			const data = await response.json();
			setProjects(data);
		} catch (error) {
			console.error('Failed to fetch projects:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const url = editingProject 
				? `/api/projects/${editingProject.id}`
				: '/api/projects';
			
			const response = await fetch(url, {
				method: editingProject ? 'PUT' : 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			
			if (response.ok) {
				setFormData({
					title: '',
					description: '',
					technologies: [],
					imageUrl: '',
					githubUrl: '',
					liveUrl: '',
					category: 'web',
					featured: false,
					status: 'planned',
					completionDate: new Date().toISOString().split('T')[0]
				});
				setEditingProject(null);
				fetchProjects();
			}
		} catch (error) {
			console.error('Failed to save project:', error);
		}
	};

	const handleEdit = (project: Project) => {
		setEditingProject(project);
		setFormData({
			...project,
			completionDate: new Date(project.completionDate).toISOString().split('T')[0]
		});
	};

	const handleDelete = async (id: string) => {
		if (window.confirm('Are you sure you want to delete this project?')) {
			try {
				const response = await fetch(`/api/projects/${id}`, {
					method: 'DELETE',
				});
				
				if (response.ok) {
					fetchProjects();
				}
			} catch (error) {
				console.error('Failed to delete project:', error);
			}
		}
	};

	if (loading) {
		return <div className="text-center py-8">Loading...</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Project Management</h1>
			
			{/* Project Form */}
			<div className="card bg-base-200 mb-8">
				<div className="card-body">
					<h2 className="card-title mb-4">
						{editingProject ? 'Edit Project' : 'Create New Project'}
					</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="form-control">
							<label className="label">Title</label>
							<input
								type="text"
								className="input input-bordered"
								value={formData.title}
								onChange={(e) => setFormData({...formData, title: e.target.value})}
								required
							/>
						</div>
						
						<div className="form-control">
							<label className="label">Description</label>
							<textarea
								className="textarea textarea-bordered h-24"
								value={formData.description}
								onChange={(e) => setFormData({...formData, description: e.target.value})}
								required
							/>
						</div>
						
						<div className="form-control">
							<label className="label">Technologies</label>
							<div className="flex flex-wrap gap-2">
								{technologies.map((tech) => (
									<label key={tech} className="cursor-pointer">
										<input
											type="checkbox"
											className="checkbox mr-2"
											checked={formData.technologies.includes(tech)}
											onChange={(e) => {
												const newTech = e.target.checked
													? [...formData.technologies, tech]
													: formData.technologies.filter(t => t !== tech);
												setFormData({...formData, technologies: newTech});
											}}
										/>
										{tech}
									</label>
								))}
							</div>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="form-control">
								<label className="label">Category</label>
								<select
									className="select select-bordered"
									value={formData.category}
									onChange={(e) => setFormData({...formData, category: e.target.value})}
									required
								>
									{categories.map((category) => (
										<option key={category} value={category}>{category}</option>
									))}
								</select>
							</div>
							
							<div className="form-control">
								<label className="label">Status</label>
								<select
									className="select select-bordered"
									value={formData.status}
									onChange={(e) => setFormData({...formData, status: e.target.value})}
									required
								>
									{statuses.map((status) => (
										<option key={status} value={status}>{status}</option>
									))}
								</select>
							</div>
						</div>
						
						<div className="form-control">
							<label className="label">Image URL</label>
							<input
								type="url"
								className="input input-bordered"
								value={formData.imageUrl}
								onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
							/>
						</div>
						
						<div className="form-control">
							<label className="label">GitHub URL</label>
							<input
								type="url"
								className="input input-bordered"
								value={formData.githubUrl}
								onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
							/>
						</div>
						
						<div className="form-control">
							<label className="label">Live Demo URL</label>
							<input
								type="url"
								className="input input-bordered"
								value={formData.liveUrl}
								onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
							/>
						</div>
						
						<div className="form-control">
							<label className="label cursor-pointer">
								<span className="label-text">Featured Project</span>
								<input
									type="checkbox"
									className="checkbox"
									checked={formData.featured}
									onChange={(e) => setFormData({...formData, featured: e.target.checked})}
								/>
							</label>
						</div>
						
						<div className="form-control">
							<label className="label">Completion Date</label>
							<input
								type="date"
								className="input input-bordered"
								value={formData.completionDate}
								onChange={(e) => setFormData({...formData, completionDate: e.target.value})}
								required
							/>
						</div>
						
						<div className="flex gap-4">
							<button type="submit" className="btn btn-primary">
								{editingProject ? 'Update Project' : 'Create Project'}
							</button>
							{editingProject && (
								<button
									type="button"
									className="btn btn-outline"
									onClick={() => {
										setEditingProject(null);
										setFormData({
											title: '',
											description: '',
											technologies: [],
											imageUrl: '',
											githubUrl: '',
											liveUrl: '',
											category: 'web',
											featured: false,
											status: 'planned',
											completionDate: new Date().toISOString().split('T')[0]
										});
									}}
								>
									Cancel Edit
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
			
			{/* Projects List */}
			<div className="space-y-4">
				<h2 className="text-2xl font-bold mb-4">Existing Projects</h2>
				{projects.map((project) => (
					<div key={project.id} className="card bg-base-100 shadow-xl">
						<div className="card-body">
							<h3 className="card-title">{project.title}</h3>
							<p className="text-sm opacity-70">{project.description}</p>
							<div className="card-actions justify-end">
								<button 
									className="btn btn-sm btn-primary"
									onClick={() => handleEdit(project)}
								>
									Edit
								</button>
								<button 
									className="btn btn-sm btn-error"
									onClick={() => handleDelete(project.id)}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}