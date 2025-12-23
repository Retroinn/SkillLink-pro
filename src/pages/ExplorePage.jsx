import { useMemo, useState } from 'react';
import { mockProjects } from '../data/mockData.js';
import ProjectCard from '../components/ProjectCard.jsx';
import { Filter } from 'lucide-react';

const categories = ['All', 'Web', 'Mobile', 'Game', 'AI', 'Design'];

function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');

  const projects = useMemo(() => {
    return mockProjects.filter((project) => {
      const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
      const tagMatch = !selectedTag || project.tags?.includes(selectedTag);
      return categoryMatch && tagMatch;
    });
  }, [selectedCategory, selectedTag]);

  return (
    <div className="space-y-4">
      <div className="glass-panel p-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Filter size={16} /> Filter
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm ${selectedCategory === category ? 'bg-primary text-white' : 'bg-slate-800 text-slate-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
        <input
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          placeholder="Search tags, skills, tech"
          className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-primary/70"
        />
      </div>
      <div className="card-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
