'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Skill {
	id?: string;
	name: string;
	level: number;
	category?: string;
}

export default function AdminSkillsPage() {
	const [skills, setSkills] = useState<Skill[]>([]);
	const [newSkill, setNewSkill] = useState<Skill>({
		name: '',
		level: 50,
		category: ''
	});

	useEffect(() => {
		// Fetch existing skills
		async function fetchSkills() {
			try {
				const response = await fetch('/api/skills');
				const data = await response.json();
				setSkills(data);
			} catch (error) {
				console.error('Failed to fetch skills:', error);
			}
		}

		fetchSkills();
	}, []);

	const handleAddSkill = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/skills', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newSkill)
			});

			if (response.ok) {
				const addedSkill = await response.json();
				setSkills([...skills, addedSkill]);
				// Reset form
				setNewSkill({ name: '', level: 50, category: '' });
			}
		} catch (error) {
			console.error('Failed to add skill:', error);
		}
	};

	const handleDeleteSkill = async (skillId: string) => {
		try {
			const response = await fetch(`/api/skills/${skillId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				setSkills(skills.filter(skill => skill.id !== skillId));
			}
		} catch (error) {
			console.error('Failed to delete skill:', error);
		}
	};

	const skillCategories = [
		'Technical Skills',
		'Soft Skills',
		'Marketing Skills',
		'Management Skills'
	];

	return (
		<div>
			<h1 className="text-3xl font-bold mb-8">Core Competencies Management</h1>

			{/* Add New Skill Form */}
			<div className="card bg-base-200 mb-8">
				<div className="card-body">
					<h2 className="card-title">Add New Skill</h2>
					<form onSubmit={handleAddSkill} className="space-y-4">
						<div className="form-control">
							<label className="label">Skill Name</label>
							<input
								type="text"
								className="input input-bordered"
								value={newSkill.name}
								onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
								required
							/>
						</div>

						<div className="form-control">
							<label className="label">Skill Level</label>
							<input
								type="range"
								min="0"
								max="100"
								className="range range-primary"
								value={newSkill.level}
								onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
							/>
							<div className="w-full flex justify-between text-xs px-2">
								<span>0</span>
								<span>50</span>
								<span>100</span>
							</div>
						</div>

						<div className="form-control">
							<label className="label">Category</label>
							<select
								className="select select-bordered"
								value={newSkill.category}
								onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
								required
							>
								<option value="">Select Category</option>
								{skillCategories.map(category => (
									<option key={category} value={category}>{category}</option>
								))}
							</select>
						</div>

						<button type="submit" className="btn btn-primary">
							Add Skill
						</button>
					</form>
				</div>
			</div>

			{/* Skills List */}
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{skills.map((skill) => (
					<motion.div 
						key={skill.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="card bg-base-100 shadow-xl"
					>
						<div className="card-body">
							<h3 className="card-title">{skill.name}</h3>
							<p className="text-sm opacity-70">{skill.category}</p>
							<div className="w-full bg-base-200 rounded-full h-2.5 mt-2">
								<div 
									className="bg-primary h-2.5 rounded-full" 
									style={{ width: `${skill.level}%` }}
								/>
							</div>
							<div className="card-actions justify-end mt-4">
								<button 
									className="btn btn-error btn-sm"
									onClick={() => handleDeleteSkill(skill.id || '')}
								>
									Delete
								</button>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}