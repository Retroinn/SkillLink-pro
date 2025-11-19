import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProjects } from '../data/mock';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/blog', label: 'Blog' },
  { to: '/premium', label: 'Premium' },
  { to: '/analytics', label: 'Analytics' },
];

const Navbar = ({ theme, onThemeToggle }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = mockProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.tech.some((skill) => skill.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/70 dark:border-slate-800/70">
      <div className="max-w-6xl mx-auto flex items-center gap-4 px-4 sm:px-8 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <span className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 grid place-items-center text-white font-bold shadow-lg">
            S
          </span>
          SkillLink Pro
        </Link>
        <nav className="hidden md:flex items-center gap-3 ml-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-sm font-semibold transition ${
                  isActive ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200' : 'text-slate-600 dark:text-slate-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex-1 flex items-center gap-3">
          <div className="relative flex-1 max-w-lg">
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people, skills, tags"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-sky-400 outline-none text-sm"
            />
            <AnimatePresence>
              {query && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-3 space-y-2 z-20"
                >
                  {results.length ? (
                    results.map((res) => (
                      <button
                        key={res.id}
                        onClick={() => {
                          navigate(`/projects/${res.id}`);
                          setQuery('');
                        }}
                        className="flex items-center gap-3 w-full text-left hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg px-2 py-2"
                      >
                        <img src={res.cover} alt={res.title} className="w-10 h-10 rounded-md object-cover" />
                        <div>
                          <p className="font-semibold text-sm">{res.title}</p>
                          <p className="text-xs text-slate-500">{res.tech.join(', ')}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No matches yet</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={onThemeToggle}
            className="hidden sm:inline-flex px-3 py-2 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800"
          >
            {theme === 'dark' ? 'Light' : 'Dark'} mode
          </button>
          <Link
            to="/add"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg"
          >
            <PlusIcon className="w-5 h-5" />
            Post project
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
