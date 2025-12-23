import { supabase } from '../lib/supabaseClient.js';
import { useState } from 'react';
import { ShieldCheck, SunMoon, Upload } from 'lucide-react';

function SettingsPage({ theme, onThemeToggle }) {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await supabase.auth.signInAnonymously();
    setLoading(false);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="glass-panel p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Theme</p>
            <p className="text-xs text-slate-400">Local storage persistence</p>
          </div>
          <button onClick={onThemeToggle} className="button-ghost text-sm">
            <SunMoon size={16} /> {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          </button>
        </div>
      </div>
      <div className="glass-panel p-4 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <ShieldCheck size={16} /> Account
        </div>
        <p className="text-sm text-slate-300">Supabase Auth handles sessions—no backend required.</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleSignIn} className="button-primary text-sm" disabled={loading}>{loading ? 'Signing in…' : 'Demo anonymous sign-in'}</button>
          <button onClick={() => supabase.auth.signOut()} className="button-ghost text-sm">Sign out</button>
        </div>
      </div>
      <div className="glass-panel p-4 space-y-4 md:col-span-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Upload size={16} /> Storage buckets
        </div>
        <p className="text-sm text-slate-300">Upload banners, avatars, screenshots, project files, and videos directly from the client.</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs text-slate-200">
          {['avatars', 'banners', 'screenshots', 'project_files', 'videos'].map((bucket) => (
            <div key={bucket} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 capitalize">{bucket}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
