import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Settings = () => {
  const { theme, setTheme } = useOutletContext();

  return (
    <div className="pro-card p-6 space-y-4">
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Appearance</p>
          <p className="text-sm text-slate-500">Toggle between light and dark mode. Persisted in localStorage.</p>
        </div>
        <button
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="pro-card p-4">
          <p className="font-semibold">Account</p>
          <p className="text-sm text-slate-500">Connect Firebase Auth for Google sign-in and secure sessions.</p>
        </div>
        <div className="pro-card p-4">
          <p className="font-semibold">Notifications</p>
          <p className="text-sm text-slate-500">Realtime updates pulled from Firestore notifications collection.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
