import { useParams } from 'react-router-dom';
import { mockPosts } from '../data/mockData.js';
import { Calendar, Tag } from 'lucide-react';

function PostViewPage() {
  const { id } = useParams();
  const post = mockPosts.find((p) => p.id === id) || mockPosts[0];

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Blog post</p>
          <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar size={14} />
          {post.created_at}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-300">
        {post.tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1"><Tag size={12} /> {tag}</span>
        ))}
      </div>
      <article className="prose prose-invert max-w-none text-slate-100">
        {post.content_markdown}
      </article>
    </div>
  );
}

export default PostViewPage;
