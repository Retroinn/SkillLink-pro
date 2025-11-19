import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import StatWidget from '../components/StatWidget';
import { mockProjects, mockUser } from '../data/mock';

const Home = () => (
  <div className="space-y-8">
    <div className="grid gap-4 sm:grid-cols-2">
      <StatWidget label="Followers" value={mockUser.stats.followers} accent="sky" />
      <StatWidget label="Project likes" value={mockUser.stats.likes} accent="amber" />
    </div>

    <div className="pro-card p-6 flex flex-col sm:flex-row items-start gap-6">
      <div className="flex-1 space-y-3">
        <p className="text-sm uppercase tracking-wide text-slate-500">Welcome back</p>
        <h1 className="text-3xl font-bold">Build, share, and monetize your portfolio</h1>
        <p className="text-slate-500 max-w-2xl">
          SkillLink Pro is a realtime creator hub built on Firebase. Share interactive code snippets, showcase premium themes, and
          keep your followers engaged with live notifications.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">Realtime sync</span>
          <span className="badge bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">Premium boosts</span>
          <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200">Storage uploads</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full sm:w-80">
        {['/profilePhotos', '/screenshots', '/projectFiles', '/banners'].map((folder) => (
          <div key={folder} className="pro-card p-3 text-center">
            <p className="text-xs text-slate-500">Storage</p>
            <p className="font-semibold">{folder}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">Featured projects</h2>
      <p className="text-sm text-slate-500">Realtime feed powered by Firestore</p>
    </div>

    <motion.div layout className="grid gap-6 md:grid-cols-2">
      {mockProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  </div>
);

export default Home;
