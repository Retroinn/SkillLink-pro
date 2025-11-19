import React from 'react';
import { Link } from 'react-router-dom';
import { mockPosts } from '../data/mock';

const Blog = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Blog feed</h2>
      <Link to="/blog/create" className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
        Create post
      </Link>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {mockPosts.map((post) => (
        <Link key={post.id} to={`/blog/${post.id}`} className="pro-card p-4 space-y-2 block">
          <p className="text-xs uppercase tracking-wide text-slate-500">{post.tags.join(', ')}</p>
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p className="text-sm text-slate-500">{post.excerpt}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default Blog;
