'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Experience {
	id?: string;
	company: string;
	role: string;
	startDate: string;
	endDate?: string;
	description: string;
	isCurrent?: boolean;
}

export default function AdminJourneyPage() {
	const [experiences, setExperiences] = useState<Experience[]>([]);
	const [newExperience, setNewExperience] = useState<Experience>({
		company: '',
		role: '',
		startDate: '',
		description: '',
		isCurrent: false
	});

	useEffect(() => {
		// Fetch existing experiences
		async function fetchExperiences() {
			try {
				const response = await fetch('/api/journey');
				const data = await response.json();
				setExperiences(data);
			} catch (error) {
				console.error('Failed to fetch experiences:', error);
			}
		}

		fetchExperiences();
	}, []);

	const handleAddExperience = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/journey', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newExperience)
			});

			if (response.ok) {
				const addedExperience = await response.json();
				setExperiences([...experiences, addedExperience]);
				// Reset form
				setNewExperience({
					company: '',
					role: '',
					startDate: '',
					description: '',
					isCurrent: false
				});
			}
		} catch (error) {
			console.error('Failed to add experience:', error);
		}
	};

	const handleDeleteExperience = async (experienceId: string) => {
		try {
			const response = await fetch(`/api/journey/${experienceId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				setExperiences(experiences.filter(exp => exp.id !== experienceId));
			}
		} catch (error) {
			console.error('Failed to delete experience:', error);
		}
	};

	return (
		<div>
			<h1 className="text-3xl font-bold mb-8">Professional Journey Management</h1>

			{/* Add New Experience Form */}
			<div className="card bg-base-200 mb-8">
				<div className="card-body">
					<h2 className="card-title">Add New Experience</h2>
					<form onSubmit={handleAddExperience} className="space-y-4">
						<div className="form-control">
							<label className="label">Company</label>
							<input
								type="text"
								className="input input-bordered"
								value={newExperience.company}
								onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
								required
							/>
						</div>

						<div className="form-control">
							<label className="label">Role</label>
							<input
								type="text"
								className="input input-bordered"
								value={newExperience.role}
								onChange={(e) => setNewExperience({...newExperience, role: e.target.value})}
								required
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="form-control">
								<label className="label">Start Date</label>
								<input
									type="date"
									className="input input-bordered"
									value={newExperience.startDate}
									onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
									required
								/>
							</div>

							<div className="form-control">
								<label className="label">End Date</label>
								<input
									type="date"
									className="input input-bordered"
									value={newExperience.endDate || ''}
									onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
									disabled={newExperience.isCurrent}
								/>
							</div>
						</div>

						<div className="form-control">
							<label className="label cursor-pointer">
								<span className="label-text">Currently Working Here</span>
								<input
									type="checkbox"
									className="checkbox"
									checked={newExperience.isCurrent}
									onChange={(e) => {
										const isCurrent = e.target.checked;
										setNewExperience({
											...newExperience, 
											isCurrent,
											endDate: isCurrent ? undefined : newExperience.endDate
										});
									}}
								/>
							</label>
						</div>

						<div className="form-control">
							<label className="label">Description</label>
							<textarea
								className="textarea textarea-bordered h-24"
								value={newExperience.description}
								onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
								required
							/>
						</div>

						<button type="submit" className="btn btn-primary">
							Add Experience
						</button>
					</form>
				</div>
			</div>

			{/* Experiences List */}
			<div className="space-y-6">
				{experiences.map((experience) => (
					<motion.div 
						key={experience.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="card bg-base-100 shadow-xl"
					>
						<div className="card-body">
							<h3 className="card-title">{experience.role}</h3>
							<p className="font-medium">{experience.company}</p>
							<p className="text-sm opacity-70">
								{experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
							</p>
							<p className="mt-2">{experience.description}</p>
							<div className="card-actions justify-end mt-4">
								<button 
									className="btn btn-error btn-sm"
									onClick={() => handleDeleteExperience(experience.id || '')}
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