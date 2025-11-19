import React from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon, LinkIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { mockProjects } from '../data/mock';
import TechPill from '../components/TechPill';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id) || mockProjects[0];

  return (
    <div className="space-y-6">
      <div className="pro-card overflow-hidden">
        <div className="relative">
          <img src={project.cover} alt={project.title} className="w-full h-80 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white space-y-2">
            <p className="uppercase text-xs">{project.category}</p>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="max-w-2xl text-slate-100">{project.description}</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
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
          <div className="flex flex-wrap gap-3 items-center">
            <a
              href={project.demoUrl}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 inline-flex items-center gap-2"
            >
              <LinkIcon className="w-5 h-5" /> Live demo
            </a>
            <div className="inline-flex items-center gap-1 text-amber-500 font-semibold">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(project.rating) ? '' : 'opacity-30'}`} />
              ))}
              <span className="text-sm text-slate-500 dark:text-slate-300">{project.rating} rating</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {project.screenshots.map((shot) => (
              <img key={shot} src={shot} alt="Screenshot" className="rounded-xl object-cover w-full h-64" />
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="pro-card p-4 space-y-3">
              <h3 className="font-semibold">Code snippets</h3>
              {project.codeBlocks.map((code, idx) => (
                <details key={idx} className="rounded-xl bg-slate-100 dark:bg-slate-800 p-3">
                  <summary className="cursor-pointer font-semibold">Snippet {idx + 1}</summary>
                  <ReactMarkdown className="prose prose-slate dark:prose-invert text-sm mt-2">{code}</ReactMarkdown>
                </details>
              ))}
            </div>
            <div className="pro-card p-4 space-y-3">
              <h3 className="font-semibold">Owner</h3>
              <div className="flex items-center gap-3">
                <img src={project.author.avatar} alt={project.author.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{project.author.name}</p>
                  <p className="text-sm text-slate-500">{project.author.stats.followers} followers</p>
                </div>
                <button className="ml-auto px-3 py-2 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-100 inline-flex items-center gap-2">
                  <UserPlusIcon className="w-5 h-5" /> Follow
                </button>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Related projects</h4>
                <div className="flex flex-wrap gap-2">
                  {project.related.map((rid) => {
                    const rel = mockProjects.find((p) => p.id === rid);
                    return (
                      <span key={rid} className="badge">
                        {rel?.title || rid}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="pro-card p-4 space-y-3">
            <h3 className="font-semibold">Comments</h3>
            <div className="space-y-3">
              {['Love this workflow!', 'The analytics are super useful.', 'Premium theme looks clean!'].map((comment, i) => (
                <div key={comment} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-white grid place-items-center font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Community member</p>
                    <p className="text-sm text-slate-500">{comment}</p>
                  </div>
                </div>
              ))}
              <motion.div whileHover={{ scale: 1.01 }} className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3">
                <p className="text-sm text-slate-500">Realtime Firestore comments appear here.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
