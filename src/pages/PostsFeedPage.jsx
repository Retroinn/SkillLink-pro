import { Link } from 'react-router-dom';
import { mockPosts } from '../data/mockData.js';
import { Pen, Tag } from 'lucide-react';

function PostsFeedPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Blog</p>
          <h1 className="text-2xl font-bold text-white">Community posts</h1>
        </div>
        <Link to="/posts/new" className="button-primary text-sm"><Pen size={14} /> Write</Link>
      </div>
      <div className="space-y-3">
        {mockPosts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`} className="glass-panel block p-4 hover:border-primary/60 border border-slate-800">
            <p className="text-lg font-semibold text-white">{post.title}</p>
            <p className="text-sm text-slate-400 line-clamp-2">{post.content_markdown}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1"><Tag size={12} /> {tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PostsFeedPage;
