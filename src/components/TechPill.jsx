import React from 'react';
import { LightningBoltIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

const colorMap = {
  React: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200',
  Firebase: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200',
  Tailwind: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-200',
  'Framer Motion': 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-200',
};

const TechPill = ({ tech }) => (
  <span className={clsx('badge', colorMap[tech])}>
    <LightningBoltIcon className="w-4 h-4" />
    {tech}
  </span>
);

export default TechPill;
