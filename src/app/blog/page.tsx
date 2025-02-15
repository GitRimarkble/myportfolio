'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './components/BlogCard';
import { BlogPost } from './types';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

  // Get unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  // Filter posts based on selected tag
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        {/* Tags filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter by Topic</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className={`btn btn-sm ${!selectedTag ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setSelectedTag(null)}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`btn btn-sm ${selectedTag === tag ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog posts grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-base-content/70">
              {selectedTag 
                ? 'No blog posts match your selected filter. Try selecting a different topic.'
                : 'No blog posts available at the moment.'}
            </p>
          </div>
        )}
      </motion.div>
    </main>
  );
}
