'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/app/blog/types';

export default function AdminBlogPage() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({
		title: '',
		excerpt: '',
		content: '',
		tags: '',
		slug: '',
		author: '',
		readTime: 5
	});

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			const response = await fetch('/api/blog');
			const data = await response.json();
			setPosts(data);
		} catch (error) {
			console.error('Failed to fetch posts:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/blog', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					tags: formData.tags.split(',').map(tag => tag.trim()),
				}),
			});
			
			if (response.ok) {
				setFormData({
					title: '',
					excerpt: '',
					content: '',
					tags: '',
					slug: '',
					author: '',
					readTime: 5
				});
				fetchPosts();
			}
		} catch (error) {
			console.error('Failed to create post:', error);
		}
	};

	const handleDelete = async (slug: string) => {
		if (window.confirm('Are you sure you want to delete this post?')) {
			try {
				const response = await fetch(`/api/blog/${slug}`, {
					method: 'DELETE',
				});
				
				if (response.ok) {
					fetchPosts();
				}
			} catch (error) {
				console.error('Failed to delete post:', error);
			}
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Blog Management</h1>
			
			{/* Create Post Form */}
			<div className="card bg-base-200 mb-8">
				<div className="card-body">
					<h2 className="card-title mb-4">Create New Post</h2>
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
							<label className="label">Slug</label>
							<input
								type="text"
								className="input input-bordered"
								value={formData.slug}
								onChange={(e) => setFormData({...formData, slug: e.target.value})}
								required
							/>
						</div>
						
						<div className="form-control">
							<label className="label">Excerpt</label>
							<textarea
								className="textarea textarea-bordered"
								value={formData.excerpt}
								onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
								required
							/>
						</div>
						
						<div className="form-control">
							<label className="label">Content</label>
							<textarea
								className="textarea textarea-bordered h-32"
								value={formData.content}
								onChange={(e) => setFormData({...formData, content: e.target.value})}
								required
							/>
						</div>
						
						<div className="form-control">
							<label className="label">Tags (comma-separated)</label>
							<input
								type="text"
								className="input input-bordered"
								value={formData.tags}
								onChange={(e) => setFormData({...formData, tags: e.target.value})}
								required
							/>
						</div>
						
						<div className="form-control">
							<label className="label">Author</label>
							<input
								type="text"
								className="input input-bordered"
								value={formData.author}
								onChange={(e) => setFormData({...formData, author: e.target.value})}
								required
							/>
						</div>
						
						<div className="form-control">
							<label className="label">Read Time (minutes)</label>
							<input
								type="number"
								className="input input-bordered"
								value={formData.readTime}
								onChange={(e) => setFormData({...formData, readTime: parseInt(e.target.value)})}
								required
							/>
						</div>
						
						<button type="submit" className="btn btn-primary">
							Create Post
						</button>
					</form>
				</div>
			</div>
			
			{/* Posts List */}
			<div className="space-y-4">
				<h2 className="text-2xl font-bold mb-4">Existing Posts</h2>
				{loading ? (
					<div>Loading...</div>
				) : (
					posts.map((post) => (
						<div key={post.slug} className="card bg-base-100 shadow-xl">
							<div className="card-body">
								<h3 className="card-title">{post.title}</h3>
								<p className="text-sm opacity-70">{post.excerpt}</p>
								<div className="card-actions justify-end">
									<button 
										className="btn btn-error btn-sm"
										onClick={() => handleDelete(post.slug)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}