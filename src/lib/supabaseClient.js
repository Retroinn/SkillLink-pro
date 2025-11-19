import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase credentials are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Netlify environment variables (Site settings → Build & deploy → Environment). Both values must start with https:// and use the project anon public key.'
  );
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export const tables = {
  users: 'users',
  projects: 'projects',
  comments: 'comments',
  posts: 'posts',
  notifications: 'notifications',
  follows: 'follows',
  bookmarks: 'bookmarks',
  ratings: 'ratings',
  badges: 'badges',
  userBadges: 'user_badges',
  analyticsViews: 'analytics_views',
  analyticsInteractions: 'analytics_interactions',
  analyticsCountries: 'analytics_countries',
};
