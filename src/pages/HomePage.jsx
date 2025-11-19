import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard.jsx';
import { mockProjects, mockPosts, sampleUser } from '../data/mockData.js';
import { supabase, tables } from '../lib/supabaseClient.js';
import { Link } from 'react-router-dom';
import { Sparkles, Users } from 'lucide-react';

function HomePage({ session }) {
  const [projects, setProjects] = useState(mockProjects);

  useEffect(() => {
    const channel = supabase
      .channel('projects-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: tables.projects }, (payload) => {
        setProjects((prev) => {
          const incoming = payload.new;
          const exists = prev.some((p) => p.id === incoming.id);
          if (exists) return prev.map((p) => (p.id === incoming.id ? { ...p, ...incoming } : p));
          return [incoming, ...prev];
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-6">
      <HeroBanner session={session} />
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Live projects</h2>
            <Link to="/explore" className="text-sm text-secondary hover:text-white">Explore all</Link>
          </div>
          <div className="card-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        <aside className="space-y-4">
          <div className="glass-panel p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles size={16} /> Premium perks
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Ad-free UI with exclusive themes</li>
              <li>Analytics on views, interactions, and countries</li>
              <li>Boost featured projects + gold badges</li>
            </ul>
            <Link to="/premium" className="button-primary w-full text-center text-sm">View premium</Link>
          </div>
          <div className="glass-panel p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Users size={16} /> Blog + community
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              {mockPosts.map((post) => (
                <li key={post.id} className="rounded-xl border border-slate-800 p-3 hover:border-primary/60">
                  <Link to={`/posts/${post.id}`} className="font-semibold text-white">{post.title}</Link>
                  <p className="text-xs text-slate-500">{post.tags.join(', ')} · {post.created_at}</p>
                </li>
              ))}
            </ul>
            <Link to="/posts/new" className="text-sm text-secondary hover:text-white">Write a post →</Link>
          </div>
        </aside>
      </section>
    </div>
  );
}

function HeroBanner({ session }) {
  return (
    <div className="glass-panel relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Portfolio + social</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Build, showcase, and monetize your skills.</h1>
            <p className="text-slate-300 text-sm md:text-base">
              SkillLink Pro connects developers and designers through real-time project feeds, premium analytics, and Supabase-powered collaboration—all frontend only.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link to="/add" className="button-primary text-sm">Start a project</Link>
              <Link to={session ? `/profile/${session.user.id}` : '/settings'} className="button-ghost text-sm">Update profile</Link>
            </div>
          </div>
          <div className="glass-panel bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <img src={sampleUser.avatar_url} alt={sampleUser.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="text-white font-semibold">{sampleUser.name}</p>
                <p className="text-xs text-slate-400">Premium creator · {sampleUser.followers} followers</p>
              </div>
            </div>
            <div className="mt-3 space-y-2 text-xs text-slate-300">
              <p>Skills: {sampleUser.skills.join(', ')}</p>
              <p>Badges: {sampleUser.badges.join(' • ')}</p>
              <p>Storage: avatars/, banners/, screenshots/, project_files/, videos/</p>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent" />
    </div>
  );
}

export default HomePage;
