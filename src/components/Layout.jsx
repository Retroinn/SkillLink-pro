import { Link, useLocation } from 'react-router-dom';
import { Bell, Home, Plus, Search, Settings, Star, User, Wand2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import NotificationDropdown from './NotificationDropdown.jsx';
import { motion } from 'framer-motion';
import { sampleUser } from '../data/mockData.js';

const links = [
  { to: '/', label: 'Home', icon: <Home size={18} /> },
  { to: '/explore', label: 'Explore', icon: <Search size={18} /> },
  { to: '/posts', label: 'Blog', icon: <Wand2 size={18} /> },
  { to: '/premium', label: 'Premium', icon: <Star size={18} /> },
  { to: '/settings', label: 'Settings', icon: <Settings size={18} /> },
];

function Layout({ children, session, theme, onThemeToggle }) {
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const users = useMemo(() => [sampleUser], []);
  const results = useMemo(() => {
    if (!search) return [];
    const term = search.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.bio.toLowerCase().includes(term) ||
        user.skills.some((skill) => skill.toLowerCase().includes(term)),
    );
  }, [search, users]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <header className="sticky top-4 z-40">
        <div className="glass-panel flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-primary to-secondary" />
            <div>
              <p className="text-lg font-semibold">SkillLink Pro</p>
              <p className="text-xs text-slate-400">For developers & designers</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition ${location.pathname === link.to ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <Link to="/add" className="button-primary text-sm">
              <Plus size={16} /> Add Project
            </Link>
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users, skills"
                className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-primary/60"
              />
              <SearchDropdown results={results} onClose={() => setSearch('')} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNotificationsOpen((prev) => !prev)}
              className="relative rounded-xl border border-slate-800 p-2 text-slate-200 hover:border-primary/60 hover:text-primary"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-secondary" />
            </button>
            <button
              onClick={onThemeToggle}
              className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:border-primary/60 hover:text-primary"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <Link to={session ? `/profile/${session.user.id}` : '/settings'} className="rounded-xl bg-slate-800 px-3 py-2 text-sm flex items-center gap-2">
              <User size={16} /> {session ? 'Profile' : 'Sign in'}
            </Link>
          </div>
        </div>
        <NotificationDropdown open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      </header>
      <main className="mt-6 space-y-6">
        <AnimatePage>{children}</AnimatePage>
      </main>
      <BottomNav />
    </div>
  );
}

function AnimatePage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {children}
    </motion.div>
  );
}

function BottomNav() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-4 left-0 right-0 z-40 mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-2 backdrop-blur shadow-2xl md:hidden">
      <div className="grid grid-cols-5 text-xs text-slate-300">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className={`flex flex-col items-center gap-1 py-1 ${location.pathname === link.to ? 'text-primary' : ''}`}>
            {link.icon}
            {link.label}
          </Link>
        ))}
        <Link to="/add" className="flex flex-col items-center gap-1 py-1 text-secondary">
          <Plus size={18} />
          Add
        </Link>
      </div>
    </nav>
  );
}

function SearchDropdown({ results, onClose }) {
  if (!results.length) return null;
  return (
    <div className="absolute left-0 right-0 top-12 z-30">
      <div className="glass-panel divide-y divide-slate-800 overflow-hidden">
        {results.map((user) => (
          <Link
            key={user.id}
            to={`/profile/${user.id}`}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 text-sm text-slate-100 hover:bg-slate-900"
          >
            <img src={user.avatar_url} className="h-8 w-8 rounded-full" alt={user.name} />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-slate-400">{user.skills.join(', ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Layout;
