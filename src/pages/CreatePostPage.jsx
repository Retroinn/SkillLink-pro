import { useState } from 'react';
import { supabase, tables } from '../lib/supabaseClient.js';
import { CheckCircle2, Hash, Pen } from 'lucide-react';

function CreatePostPage({ session }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from(tables.posts).insert({ title, content_markdown: content, tags, author_id: session?.user?.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="glass-panel p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Pen size={16} /> Create post
        </div>
        <label className="space-y-2 text-sm text-slate-200 block">
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm" />
        </label>
        <label className="space-y-2 text-sm text-slate-200 block">
          Content (Markdown)
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm" />
        </label>
        <div className="space-y-2 text-sm text-slate-200">
          <div className="flex items-center gap-2 font-semibold text-white"><Hash size={14} /> Tags</div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setTags((prev) => [...new Set([...prev, tagInput])]);
                  setTagInput('');
                }
              }}
              placeholder="Type and hit Enter"
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setTags((prev) => [...new Set([...prev, tagInput])]);
                setTagInput('');
              }}
              className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-white"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs">{tag}</span>
            ))}
          </div>
        </div>
        <button type="submit" className="button-primary text-sm">
          <CheckCircle2 size={16} /> Publish
        </button>
      </div>
    </form>
  );
}

export default CreatePostPage;
