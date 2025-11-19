import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { mockPosts } from '../data/mock';

const BlogDetail = () => {
  const { id } = useParams();
  const post = mockPosts.find((p) => p.id === id) || mockPosts[0];

  return (
    <div className="pro-card p-6 space-y-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{post.tags.join(', ')}</p>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="prose prose-slate dark:prose-invert">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDetail;
