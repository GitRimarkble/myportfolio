'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost, generateShareLinks } from '../types';
import Link from 'next/link';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
	const [post, setPost] = useState<BlogPost | null>(null);
	const [loading, setLoading] = useState(true);
	const [shareLinks, setShareLinks] = useState<{ twitter: string; linkedin: string; github: string } | null>(null);

	useEffect(() => {
		fetchPost();
	}, [params.slug]);

	const fetchPost = async () => {
		try {
			const response = await fetch(`/api/blog/${params.slug}`);
			if (!response.ok) {
				throw new Error('Post not found');
			}
			const data = await response.json();
			setPost(data);
			setShareLinks(generateShareLinks(data, window.location.origin));
		} catch (error) {
			console.error('Failed to fetch post:', error);
			setPost(null);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">Loading...</div>
			</div>
		);
	}

	if (!post) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Post not found</h1>
					<Link href="/blog" className="btn btn-primary">
						Back to Blog
					</Link>
				</div>
			</div>
		);
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<motion.article
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-4xl mx-auto"
			>
				{post.image && (
					<img 
						src={post.image} 
						alt={post.title} 
						className="w-full h-64 object-cover rounded-lg mb-8"
					/>
				)}
				
				<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
				
				<div className="flex flex-wrap gap-2 mb-6">
					{post.tags.map(tag => (
						<span key={tag} className="badge badge-primary">{tag}</span>
					))}
				</div>

				<div className="flex items-center gap-4 text-sm opacity-70 mb-8">
					<span>{post.author}</span>
					<span>•</span>
					<span>{new Date(post.date).toLocaleDateString()}</span>
					<span>•</span>
					<span>{post.readTime} min read</span>
				</div>

				{/* Article content */}
				<div className="prose max-w-none mb-8">
					{post.content}
				</div>

				{/* Share buttons */}
				{shareLinks && (
					<div className="flex gap-4 justify-center border-t pt-8">
						<a 
							href={shareLinks.twitter}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-outline"
						>
							Share on Twitter
						</a>
						<a 
							href={shareLinks.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-outline"
						>
							Share on LinkedIn
						</a>
						<a 
							href={shareLinks.github}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-outline"
						>
							View on GitHub
						</a>
					</div>
				)}

				<div className="text-center mt-8">
					<Link href="/blog" className="btn btn-primary">
						Back to Blog
					</Link>
				</div>
			</motion.article>
		</main>
	);
}