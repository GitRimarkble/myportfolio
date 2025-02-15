export interface Project {
	id: string;
	title: string;
	description: string;
	technologies: string[];
	imageUrl?: string;
	githubUrl?: string;
	liveUrl?: string;
	category: 'web' | 'mobile' | 'ai' | 'other';
	featured: boolean;
	completionDate: string;
	status: 'completed' | 'in-progress' | 'planned';
}

export interface ProjectFilter {
	category?: string;
	technology?: string;
	status?: string;
}

export const categories = ['web', 'mobile', 'ai', 'other'] as const;
export const statuses = ['completed', 'in-progress', 'planned'] as const;

export const technologies = [
	'React',
	'Next.js',
	'TypeScript',
	'Node.js',
	'MongoDB',
	'TailwindCSS',
	'Python',
	'AI/ML',
	'Mobile Development',
	'Cloud Computing'
] as const;