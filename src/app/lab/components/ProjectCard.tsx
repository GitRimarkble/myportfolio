'use client';

import { Project } from '../types';
import { motion } from 'framer-motion';

interface ProjectCardProps {
	project: Project;
	onEdit?: (project: Project) => void;
	onDelete?: (id: string) => void;
	isAdmin?: boolean;
}

export default function ProjectCard({ project, onEdit, onDelete, isAdmin = false }: ProjectCardProps) {
	const statusColors = {
		'completed': 'badge-success',
		'in-progress': 'badge-warning',
		'planned': 'badge-info'
	};

	return (
		<motion.div 
			className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{project.imageUrl && (
				<figure>
					<img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
				</figure>
			)}
			<div className="card-body">
				<h2 className="card-title">
					{project.title}
					{project.featured && <div className="badge badge-secondary">Featured</div>}
				</h2>
				
				<div className="flex flex-wrap gap-2 mb-2">
					<div className={`badge ${statusColors[project.status]}`}>
						{project.status}
					</div>
					{project.technologies.map((tech) => (
						<div key={tech} className="badge badge-outline">{tech}</div>
					))}
				</div>
				
				<p>{project.description}</p>
				
				<div className="card-actions justify-end mt-4">
					{isAdmin && (
						<>
							<button 
								className="btn btn-sm btn-primary"
								onClick={() => onEdit?.(project)}
							>
								Edit
							</button>
							<button 
								className="btn btn-sm btn-error"
								onClick={() => onDelete?.(project.id)}
							>
								Delete
							</button>
						</>
					)}
					
					{project.githubUrl && (
						<a 
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-sm btn-outline"
						>
							GitHub
						</a>
					)}
					
					{project.liveUrl && (
						<a 
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-sm btn-primary"
						>
							Live Demo
						</a>
					)}
				</div>
			</div>
		</motion.div>
	);
}