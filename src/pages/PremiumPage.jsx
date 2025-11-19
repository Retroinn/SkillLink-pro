import { CheckCircle2, Crown, Rocket, Shield } from 'lucide-react';

const perks = [
  'Ad-free UI + premium themes',
  'Boost projects as featured',
  'Unlimited saved projects',
  'Upload PDFs, ZIPs, videos to project_files/',
  'Advanced analytics by country + timeline',
  'Exclusive gold/platinum badges',
  'Premium comment formatting',
];

function PremiumPage() {
  return (
    <div className="space-y-4">
      <div className="glass-panel p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Premium</p>
          <h1 className="text-3xl font-bold text-white">Upgrade for analytics + boosts</h1>
          <p className="text-slate-300 text-sm">Stripe checkout via payment link. Supabase stores is_premium boolean.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-right">
          <p className="text-4xl font-bold text-white">$12<span className="text-sm text-slate-400">/mo</span></p>
          <p className="text-xs text-slate-400">Cancel anytime</p>
          <a href="https://stripe.com" target="_blank" rel="noreferrer" className="button-primary mt-3 inline-flex">Checkout</a>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {perks.map((perk) => (
          <div key={perk} className="glass-panel p-4 flex items-start gap-3">
            <CheckCircle2 className="text-secondary" size={18} />
            <p className="text-sm text-slate-200">{perk}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-panel p-4">
          <h3 className="flex items-center gap-2 text-white font-semibold"><Rocket size={16} /> Featured boosts</h3>
          <p className="text-sm text-slate-300">Mark projects as is_featured to surface across the home feed.</p>
        </div>
        <div className="glass-panel p-4">
          <h3 className="flex items-center gap-2 text-white font-semibold"><Shield size={16} /> Exclusive badges</h3>
          <p className="text-sm text-slate-300">Tables badges + user_badges manage achievements.</p>
        </div>
      </div>
      <div className="glass-panel p-4 flex items-center gap-3">
        <Crown className="text-premium" size={20} />
        <p className="text-sm text-slate-200">Gold/Platinum members get premium comment highlighting and custom portfolio themes.</p>
      </div>
    </div>
  );
}

export default PremiumPage;
