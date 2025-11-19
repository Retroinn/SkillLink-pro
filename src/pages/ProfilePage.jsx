import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockProjects, sampleUser } from '../data/mockData.js';
import { BadgeCheck, Camera, Film, Link2, Sparkles, Users } from 'lucide-react';
import ProjectCard from '../components/ProjectCard.jsx';

function ProfilePage() {
  const { id } = useParams();
  const [user] = useState(sampleUser);
  const featured = useMemo(() => mockProjects.filter((p) => p.is_featured), []);
  const saved = useMemo(() => mockProjects.slice(0, 2), []);

  return (
    <div className="space-y-6">
      <div className="glass-panel overflow-hidden">
        <div className="relative">
          <img src={user.banner_url} alt="Banner" className="h-48 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <img src={user.avatar_url} alt={user.name} className="h-16 w-16 rounded-full border-4 border-slate-900 object-cover" />
            <div>
              <p className="text-xl font-bold text-white">{user.name}</p>
              <p className="text-sm text-slate-300">@{user.username} · {user.is_premium ? 'Premium' : 'Free'}</p>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1"><Users size={14} /> {user.followers} followers</span>
                <span className="inline-flex items-center gap-1">{user.following} following</span>
                <span className="inline-flex items-center gap-1 text-premium"><BadgeCheck size={14} /> Gold badge</span>
              </div>
            </div>
            <button className="ml-auto rounded-full bg-secondary/20 px-3 py-1 text-xs text-secondary">Follow</button>
          </div>
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-4">
          <div className="md:col-span-3 space-y-3">
            <p className="text-sm text-slate-200">{user.bio}</p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              {user.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-slate-900 px-3 py-1">{skill}</span>
              ))}
            </div>
            <div className="glass-panel p-4">
              <div className="flex items-center justify-between text-sm font-semibold text-white">
                <span>Portfolio video</span>
                <Film size={16} />
              </div>
              <p className="mt-2 text-xs text-slate-400">Embed your Dribbble, Loom, or YouTube preview here.</p>
              <div className="mt-3 h-40 rounded-xl bg-slate-900/70" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-200">
              <p className="font-semibold text-white">Premium perks</p>
              <p className="text-xs text-slate-400">Unlimited saved projects, ad-free UI, extra storage, exclusive badges.</p>
              <div className="mt-2 flex items-center gap-2 text-secondary"><Sparkles size={14} /> Platinum ready</div>
            </div>
            <button className="w-full rounded-xl border border-slate-800 px-4 py-2 text-sm text-slate-100 hover:border-primary/60">
              <Camera size={14} className="inline" /> Edit banner
            </button>
          </div>
        </div>
      </div>

      <Section title="Featured projects" icon={<Sparkles size={16} />}>
        <div className="card-grid">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      <Section title="Saved projects" icon={<Link2 size={16} />}>
        <div className="card-grid">
          {saved.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </section>
  );
}

export default ProfilePage;
