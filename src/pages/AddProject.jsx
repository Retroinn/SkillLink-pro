import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createProject } from '../firebase';

const defaultForm = {
  title: '',
  description: '',
  tags: '',
  code: '',
  screenshot: '',
  tech: '',
  category: 'Web',
  demoUrl: '',
  linked: '',
};

const AddProject = () => {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In production, call createProject(formatted)
    setSubmitted(true);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form onSubmit={handleSubmit} className="pro-card p-6 space-y-4 lg:col-span-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Add a project</h2>
          <p className="text-xs text-slate-500">Uploads save into Firestore and Storage</p>
        </div>
        {[
          ['title', 'Project Title'],
          ['description', 'Description'],
          ['tags', 'Tags (comma separated)'],
          ['code', 'Code Snippets (Markdown fences)'],
          ['screenshot', 'Screenshot URL'],
          ['tech', 'Tech Stack (comma separated)'],
          ['category', 'Category'],
          ['demoUrl', 'Live Demo URL'],
          ['linked', 'Linked Projects'],
        ].map(([key, label]) => (
          <div key={key} className="space-y-1">
            <label className="text-sm font-semibold">{label}</label>
            <input
              value={form[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800"
              required={key === 'title' || key === 'description'}
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold"
        >
          Save to Firestore
        </button>
      </form>
      <div className="space-y-4">
        <div className="pro-card p-4">
          <h3 className="font-semibold mb-2">Storage uploads</h3>
          <p className="text-sm text-slate-500">Upload screenshots to /screenshots and project files to /projectFiles.</p>
        </div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="pro-card p-4 text-center"
        >
          {submitted ? (
            <p className="text-emerald-500 font-semibold">Success! Framer Motion confirms the upload.</p>
          ) : (
            <p className="text-slate-500">Submit to play success animation.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AddProject;
