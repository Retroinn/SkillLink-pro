# SkillLink Pro (Frontend Only)

This app is a Vite + React + Tailwind + Framer Motion frontend that talks directly to Supabase for auth, database, and storage. There is no custom backend.

## Netlify deployment checklist (connection issues)
If the deployed site cannot connect to Supabase, verify these steps:

1. **Environment variables** (Netlify → Site settings → Build & deploy → Environment):
   - `VITE_SUPABASE_URL` must be your project URL (e.g., `https://xyzcompany.supabase.co`).
   - `VITE_SUPABASE_ANON_KEY` must be the **anon** public key (not the service role key).
   - Variables must be prefixed with `VITE_` so Vite exposes them to the browser at build time.
2. **Allow the Netlify domain in Supabase**:
   - In Supabase Dashboard → Authentication → URL configuration, add your Netlify domain (and preview URLs) to **Redirect URLs** and **Allowed Origins**.
3. **HTTPS only**:
   - Supabase rejects non-HTTPS origins; ensure the Netlify site uses `https://`.
4. **Redeploy after env changes**:
   - Changes to Netlify environment variables require a fresh deploy to take effect.

## Running locally
```
npm install
npm run dev
```

Create a local `.env` with the same keys as `.env.example` before starting the dev server.
