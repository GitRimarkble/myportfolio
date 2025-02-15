export interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	author: string;
	tags: string[];
	slug: string;
	readTime: number;
	image?: string;
}

export interface ShareLinks {
	twitter: string;
	linkedin: string;
	github: string;
}

export const generateShareLinks = (post: BlogPost, baseUrl: string): ShareLinks => {
	const url = `${baseUrl}/blog/${post.slug}`;
	const text = encodeURIComponent(post.title);
	
	return {
		twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
		github: `https://github.com/search?q=${encodeURIComponent(post.title)}`
	};
};