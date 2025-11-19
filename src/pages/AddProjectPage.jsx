import { useState } from 'react';
import { supabase, tables } from '../lib/supabaseClient.js';
import { CheckCircle2, Tag, Wand2, Link2 } from 'lucide-react';

const categories = ['Web', 'Mobile', 'Game', 'AI', 'Design'];

function AddProjectPage({ session }) {
  const [form, setForm] = useState({ title: '', description: '', category: 'Web', tags: [], tech_stack: [], demo_url: '' });
  const [uploading, setUploading] = useState(false);
  const [screenshots, setScreenshots] = useState([]);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { data, error } = await supabase.storage.from('screenshots').upload(`public/${Date.now()}-${file.name}`, file);
    if (!error && data) {
      const { data: urlData } = supabase.storage.from('screenshots').getPublicUrl(data.path);
      setScreenshots((prev) => [...prev, urlData.publicUrl]);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from(tables.projects).insert({
      ...form,
      tags: form.tags,
      tech_stack: form.tech_stack,
      screenshots,
      demo_url: form.demo_url,
      author_id: session?.user?.id,
    });
  };

  const addToken = (field, value) => {
    if (!value) return;
    setForm((prev) => ({ ...prev, [field]: [...new Set([...(prev[field] || []), value])], input: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="glass-panel p-4 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Wand2 size={16} /> Add new project
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200">
            Title
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            Category
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-200 block">
          Description
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
          />
        </label>
        <div className="grid gap-3 md:grid-cols-2">
          <TokenInput label="Tags" icon={<Tag size={14} />} values={form.tags} onAdd={(value) => addToken('tags', value)} />
          <TokenInput label="Tech stack" icon={<Wand2 size={14} />} values={form.tech_stack} onAdd={(value) => addToken('tech_stack', value)} />
        </div>
        <label className="space-y-2 text-sm text-slate-200 block">
          Live demo URL
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
            <Link2 size={14} />
            <input
              value={form.demo_url}
              onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
              placeholder="https://"
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Screenshots (Supabase Storage)
          <input type="file" onChange={handleUpload} className="rounded-xl border border-dashed border-slate-700 bg-slate-900 px-3 py-2" />
          <div className="flex flex-wrap gap-2">
            {screenshots.map((shot) => (
              <img key={shot} src={shot} className="h-16 w-24 rounded-lg object-cover" alt="Screenshot" />
            ))}
            {uploading && <span className="text-xs text-secondary">Uploading…</span>}
          </div>
        </label>
        <button type="submit" className="button-primary text-sm">
          <CheckCircle2 size={16} /> Save project
        </button>
      </div>
    </form>
  );
}

function TokenInput({ label, icon, values, onAdd }) {
  const [value, setValue] = useState('');
  return (
    <div className="space-y-2 text-sm text-slate-200">
      <div className="flex items-center gap-2 font-semibold text-white">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onAdd(value);
              setValue('');
            }
          }}
          placeholder="Type and press Enter"
          className="flex-1 bg-transparent text-sm outline-none"
        />
        <button
          type="button"
          onClick={() => {
            onAdd(value);
            setValue('');
          }}
          className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-white"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((item) => (
          <span key={item} className="rounded-full bg-slate-800 px-3 py-1 text-xs">{item}</span>
        ))}
      </div>
    </div>
  );
}

export default AddProjectPage;
