import React from 'react';
import { mockProjects } from '../data/mock';
import StatWidget from '../components/StatWidget';

const Analytics = () => (
  <div className="space-y-6">
    <div className="grid sm:grid-cols-3 gap-4">
      <StatWidget label="Project views" value="12,430" accent="emerald" />
      <StatWidget label="Countries" value="24" accent="sky" />
      <StatWidget label="Avg rating" value="4.6" accent="amber" />
    </div>
    <div className="pro-card p-6 space-y-4">
      <h3 className="text-xl font-bold">Top projects</h3>
      <div className="grid md:grid-cols-3 gap-3">
        {mockProjects.map((p) => (
          <div key={p.id} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
            <p className="text-sm font-semibold">{p.title}</p>
            <p className="text-xs text-slate-500">Views spike timeline • premium owners unlock deeper analytics</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Analytics;
