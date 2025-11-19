import React, { useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} className="pro-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Create blog post</h2>
        <p className="text-xs text-slate-500">Posts stored in Firestore posts collection</p>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Markdown content"
        className="w-full h-40 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800"
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800"
      />
      <button type="submit" className="w-full py-3 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
        Publish
      </button>
      {saved && <p className="text-emerald-500 font-semibold">Saved to Firestore (mock).</p>}
    </form>
  );
};

export default CreatePost;
