import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase, tables } from '../lib/supabaseClient.js';
import { mockProjects, mockComments } from '../data/mockData.js';
import CodeBlock from '../components/CodeBlock.jsx';
import { ExternalLink, Heart, ImageIcon, MessageSquare, Star, Tag, Users } from 'lucide-react';

function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(() => mockProjects.find((p) => p.id === id) || mockProjects[0]);
  const [comments, setComments] = useState(mockComments);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  useEffect(() => {
    const channel = supabase
      .channel(`project-${id}-comments`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tables.comments, filter: `project_id=eq.${id}` }, (payload) => {
        setComments((prev) => [...prev, payload.new]);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [id]);

  if (!project) return null;

  return (
    <div className="space-y-6">
      <div className="glass-panel overflow-hidden">
        <div className="relative">
          <img src={project.screenshots?.[0]} alt={project.title} className="h-72 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-white">
            <div>
              <p className="text-sm text-secondary">{project.category}</p>
              <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
              <p className="max-w-3xl text-slate-200">{project.description}</p>
            </div>
            <a href={project.demo_url} className="button-primary" target="_blank" rel="noreferrer">
              <ExternalLink size={16} /> Live demo
            </a>
          </div>
        </div>
        <div className="grid gap-4 border-t border-slate-800 p-4 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Tech stack</p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              {project.tech_stack?.map((tech) => (
                <span key={tech} className="rounded-lg border border-slate-800 px-3 py-1">{tech}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              {project.tags?.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-900 px-3 py-1 inline-flex items-center gap-1"><Tag size={12} /> {tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <span className="inline-flex items-center gap-1"><Heart size={14} className="text-primary" /> {project.likes} likes</span>
              <span className="inline-flex items-center gap-1"><Star size={14} className="text-premium" /> {project.rating} rating</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 p-3">
              <img src={project.author?.avatar_url} className="h-10 w-10 rounded-full" alt={project.author?.name} />
              <div>
                <p className="text-white font-semibold">{project.author?.name}</p>
                <p className="text-xs text-slate-400">@{project.author?.username}</p>
              </div>
              <button className="ml-auto rounded-full bg-secondary/20 px-3 py-1 text-xs text-secondary">Follow</button>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <ScreenshotGallery screenshots={project.screenshots} onSelect={setSelectedScreenshot} />
            <CodeBlock
              label="Code block"
              content={`// Markdown + inline code\nconst supabase = createClient(url, key);\nconst { data } = await supabase.from('projects').select('*');`}
            />
            <div className="glass-panel p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <MessageSquare size={16} /> Comments
              </div>
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className={`rounded-xl border border-slate-800 p-3 ${comment.is_premium ? 'bg-primary/10' : 'bg-slate-900/80'}`}>
                    <div className="flex items-center gap-2 text-sm text-white">
                      <img src={comment.author.avatar_url} className="h-8 w-8 rounded-full" alt={comment.author.name} />
                      <p className="font-semibold">{comment.author.name}</p>
                      {comment.is_premium && <span className="rounded-full bg-premium/20 px-2 py-0.5 text-[11px] text-premium">Premium</span>}
                    </div>
                    <p className="mt-2 text-sm text-slate-200">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnalyticsPanel projectId={id} />
      <ScreenshotModal screenshot={selectedScreenshot} onClose={() => setSelectedScreenshot(null)} />
    </div>
  );
}

function ScreenshotGallery({ screenshots = [], onSelect }) {
  return (
    <div className="glass-panel p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <ImageIcon size={16} /> Screenshots
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
        {screenshots.map((shot) => (
          <button key={shot} className="group relative overflow-hidden rounded-xl" onClick={() => onSelect(shot)}>
            <img src={shot} alt="Screenshot" className="h-32 w-full object-cover transition duration-300 group-hover:scale-105" />
            <span className="absolute inset-0 bg-slate-950/30 opacity-0 transition group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ScreenshotModal({ screenshot, onClose }) {
  return (
    <AnimatePresence>
      {screenshot && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }} className="relative max-w-4xl w-full">
            <img src={screenshot} alt="Full screenshot" className="w-full rounded-2xl object-contain" />
            <button onClick={onClose} className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-sm text-white">Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnalyticsPanel({ projectId }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="glass-panel p-4">
        <p className="text-sm font-semibold text-white">Analytics views</p>
        <p className="text-2xl font-bold text-secondary">1,204</p>
        <p className="text-xs text-slate-400">Countries table: analytics_countries</p>
      </div>
      <div className="glass-panel p-4">
        <p className="text-sm font-semibold text-white">Interactions</p>
        <p className="text-2xl font-bold text-primary">384</p>
        <p className="text-xs text-slate-400">Table: analytics_interactions</p>
      </div>
      <div className="glass-panel p-4">
        <p className="text-sm font-semibold text-white">Timeline</p>
        <p className="text-xs text-slate-400">Realtime signals via Supabase channels for project {projectId}</p>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
