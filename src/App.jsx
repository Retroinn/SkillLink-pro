import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectDetailsPage from './pages/ProjectDetailsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import AddProjectPage from './pages/AddProjectPage.jsx';
import PremiumPage from './pages/PremiumPage.jsx';
import PostsFeedPage from './pages/PostsFeedPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import PostViewPage from './pages/PostViewPage.jsx';
import { supabase } from './lib/supabaseClient.js';

function App() {
  const [session, setSession] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const layoutProps = useMemo(() => ({ session, theme, onThemeToggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }), [session, theme]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Layout {...layoutProps}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage session={session} />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage session={session} />} />
            <Route path="/profile/:id" element={<ProfilePage session={session} />} />
            <Route path="/explore" element={<ExplorePage session={session} />} />
            <Route path="/settings" element={<SettingsPage theme={theme} onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />} />
            <Route path="/add" element={<AddProjectPage session={session} />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/posts" element={<PostsFeedPage />} />
            <Route path="/posts/new" element={<CreatePostPage session={session} />} />
            <Route path="/posts/:id" element={<PostViewPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </div>
  );
}

export default App;
