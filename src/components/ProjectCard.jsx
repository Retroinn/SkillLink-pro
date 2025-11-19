import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, Star } from 'lucide-react';

function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className="glass-panel overflow-hidden"
    >
      <div className="relative">
        <img src={project.screenshots?.[0]} alt={project.title} className="h-44 w-full object-cover" />
        {project.is_featured && (
          <span className="absolute top-3 left-3 rounded-full bg-premium/90 px-3 py-1 text-xs font-semibold text-slate-900">Featured</span>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-secondary">{project.category}</p>
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Star size={16} />
            <span className="text-sm">{project.rating}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
          {project.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-800 px-3 py-1">{tag}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-slate-400">
          {project.tech_stack?.map((tech) => (
            <span key={tech} className="rounded-lg border border-slate-800 px-2 py-1">{tech}</span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <img src={project.author?.avatar_url} alt={project.author?.name} className="h-9 w-9 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-white">{project.author?.name}</p>
              <p className="text-xs text-slate-400">@{project.author?.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="inline-flex items-center gap-1"><Heart size={14} className="text-primary" /> {project.likes}</span>
            <Link to={`/projects/${project.id}`} className="text-secondary hover:text-white" aria-label="View project">
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
