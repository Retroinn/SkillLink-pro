import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const toneClass = {
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
};

const StatWidget = ({ label, value, accent = 'sky' }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="pro-card p-4 flex items-center justify-between"
  >
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className={clsx('h-10 w-10 rounded-xl grid place-items-center font-semibold', toneClass[accent])}>•</div>
  </motion.div>
);

export default StatWidget;
