import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, BookmarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import TechPill from './TechPill';

const ProjectCard = ({ project }) => (
  <motion.div
    layout
    whileHover={{ y: -4 }}
    className="pro-card overflow-hidden flex flex-col"
  >
    <div className="relative">
      <img src={project.cover} alt={project.title} className="h-52 w-full object-cover" />
      {project.boost && (
        <span className="absolute top-3 left-3 badge bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200">
          Boosted
        </span>
      )}
      <div className="absolute bottom-3 right-3 flex gap-2">
        <span className="badge bg-white/80 dark:bg-slate-900/80 shadow">{project.category}</span>
      </div>
    </div>
    <div className="p-4 flex-1 flex flex-col gap-3">
      <Link to={`/projects/${project.id}`} className="font-semibold text-lg line-clamp-1">
        {project.title}
      </Link>
      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="badge">
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <TechPill key={tech} tech={tech} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-2">
          <img src={project.author.avatar} alt={project.author.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold">{project.author.name}</p>
            <p className="text-xs text-slate-500">{project.author.stats.followers} followers</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <span className="inline-flex items-center gap-1 text-sm font-semibold">
            <HeartIcon className="w-5 h-5 text-rose-500" /> {project.likes}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold">
            <BookmarkIcon className="w-5 h-5 text-amber-500" /> {project.saves}
          </span>
        </div>
      </div>
      <Link
        to={project.demoUrl}
        className="inline-flex justify-center mt-3 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
      >
        Live Demo
      </Link>
    </div>
  </motion.div>
);

export default ProjectCard;
