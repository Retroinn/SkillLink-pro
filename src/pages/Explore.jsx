import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { mockProjects } from '../data/mock';

const filters = {
  category: ['Web', 'Mobile', 'Game', 'AI'],
  stack: ['React', 'Tailwind', 'Firebase', 'Framer Motion', 'OpenAI'],
  skills: ['UI', 'Backend', 'DevOps', 'Analytics'],
};

const Explore = () => {
  const [selected, setSelected] = useState({ category: '', stack: '', skills: '' });

  const filtered = mockProjects.filter(
    (p) =>
      (!selected.category || p.category === selected.category) &&
      (!selected.stack || p.tech.includes(selected.stack)) &&
      (!selected.skills || p.tags.includes(selected.skills.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <div className="pro-card p-4 flex flex-wrap gap-3">
        {Object.entries(filters).map(([key, options]) => (
          <div key={key} className="flex items-center gap-2">
            <p className="text-sm font-semibold capitalize">{key}</p>
            <select
              value={selected[key]}
              onChange={(e) => setSelected((prev) => ({ ...prev, [key]: e.target.value }))}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800"
            >
              <option value="">Any</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
