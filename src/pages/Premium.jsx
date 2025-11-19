import React from 'react';

const perks = [
  'Premium profile themes',
  'Project boosting across feeds',
  'Advanced analytics and geo insights',
  'Unlimited saved projects',
  'Upload PDFs, ZIPs, and videos',
  'Gold / Platinum badges',
  'Premium highlighted comments',
  'Ad-free experience',
];

const Premium = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <div className="pro-card p-6 space-y-3">
      <p className="text-sm uppercase tracking-wide text-slate-500">Premium</p>
      <h1 className="text-3xl font-bold">Unlock the SkillLink Pro suite</h1>
      <p className="text-slate-500">
        Payments can be wired to Stripe or mocked in the frontend. We store premium status as <code>isPremium: true</code> in the
        Firestore users collection.
      </p>
      <div className="space-y-2">
        {perks.map((perk) => (
          <div key={perk} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <p className="text-sm">{perk}</p>
          </div>
        ))}
      </div>
      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold">
        Buy Premium
      </button>
    </div>
    <div className="pro-card p-6 space-y-3">
      <h3 className="text-xl font-bold">Featured boosts</h3>
      <p className="text-sm text-slate-500">Premium creators can mark a project as boosted to place it on the home and explore feeds.</p>
      <div className="grid grid-cols-2 gap-3">
        {['Homepage spotlight', 'Explore highlight', 'Category hero', 'Analytics unlock'].map((item) => (
          <div key={item} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
            <p className="text-sm font-semibold">{item}</p>
            <p className="text-xs text-slate-500">Instantly elevated visibility.</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Premium;
