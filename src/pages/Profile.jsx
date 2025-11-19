import React from 'react';
import { useParams } from 'react-router-dom';
import { mockProjects, mockUser } from '../data/mock';
import ProjectCard from '../components/ProjectCard';

const Profile = () => {
  const { id } = useParams();
  const user = mockUser;

  return (
    <div className="space-y-6">
      <div className="pro-card overflow-hidden">
        <div className="relative">
          <img src={user.banner} alt="Banner" className="w-full h-56 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
            <div className="text-white">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-slate-100">{user.bio}</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-3">
            {user.skills.map((skill) => (
              <span key={skill} className="badge">
                {skill}
              </span>
            ))}
            <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">Add skill</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {user.badges.map((badge) => (
              <span
                key={badge.id}
                className={`badge ${
                  badge.tone === 'emerald'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200'
                }`}
              >
                {badge.label}
              </span>
            ))}
            {user.premium && <span className="badge bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200">Gold</span>}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="pro-card p-4 text-center">
              <p className="text-xs text-slate-500">Followers</p>
              <p className="text-2xl font-bold">{user.stats.followers}</p>
            </div>
            <div className="pro-card p-4 text-center">
              <p className="text-xs text-slate-500">Following</p>
              <p className="text-2xl font-bold">{user.stats.following}</p>
            </div>
            <div className="pro-card p-4 text-center">
              <p className="text-xs text-slate-500">Saved</p>
              <p className="text-2xl font-bold">{user.stats.saves}</p>
            </div>
          </div>
          <div className="pro-card p-4">
            <h3 className="font-semibold mb-3">Featured projects</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {mockProjects.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
          <div className="pro-card p-4">
            <h3 className="font-semibold mb-3">Saved projects</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {mockProjects.slice(1).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
