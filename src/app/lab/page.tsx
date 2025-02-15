'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './components/ProjectCard';
import { Project, ProjectFilter, categories, technologies, statuses } from './types';

export default function LabPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ProjectFilter>({});
  const [isAdmin, setIsAdmin] = useState(false); // In real app, check auth status

  useEffect(() => {
    fetchProjects();
    // Check if user is admin (in real app, verify auth token)
    const authToken = localStorage.getItem('auth-token');
    setIsAdmin(!!authToken);
  }, []);

  const fetchProjects = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filter.category) queryParams.append('category', filter.category);
      if (filter.technology) queryParams.append('technology', filter.technology);
      if (filter.status) queryParams.append('status', filter.status);

      const response = await fetch(`/api/projects?${queryParams}`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Lab Projects</h1>
          {isAdmin && (
            <a href="/admin/projects" className="btn btn-primary">
              Manage Projects
            </a>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-semibold">Filters</h2>
          <div className="flex flex-wrap gap-4">
            <select 
              className="select select-bordered"
              value={filter.category || ''}
              onChange={(e) => setFilter({ ...filter, category: e.target.value || undefined })}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select 
              className="select select-bordered"
              value={filter.technology || ''}
              onChange={(e) => setFilter({ ...filter, technology: e.target.value || undefined })}
            >
              <option value="">All Technologies</option>
              {technologies.map((tech) => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>

            <select 
              className="select select-bordered"
              value={filter.status || ''}
              onChange={(e) => setFilter({ ...filter, status: e.target.value || undefined })}
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Projects */}
        {projects.some(p => p.featured) && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter(p => p.featured)
                .map((project) => (
                  <ProjectCard 
                    key={project.id}
                    project={project}
                    isAdmin={isAdmin}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </section>
        )}

        {/* All Projects */}
        <section>
          <h2 className="text-2xl font-bold mb-4">All Projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter(p => !p.featured)
              .map((project) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        </section>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-base-content/70">
              Try adjusting your filters or check back later for new projects.
            </p>
          </div>
        )}
      </motion.div>
    </main>
  );
}
