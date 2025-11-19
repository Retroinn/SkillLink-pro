import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NotificationBell from '../components/NotificationBell';
import { mockNotifications } from '../data/mock';

const AppLayout = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="fixed top-4 right-4 z-50">
        <NotificationBell notifications={mockNotifications} />
      </div>
      <Navbar theme={theme} onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main className="pt-24 pb-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <Outlet context={{ theme, setTheme }} />
      </main>
    </div>
  );
};

export default AppLayout;
