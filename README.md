# Anas Eddanfor

Personal CV and portfolio website of Anas Mokhtar Eddanfor, Control & Automation Engineer, Data Center Engineer and graphic designer.

Built with React and Vite, set in Thmanyah Sans.

## Run locally

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Edit content

All text (experience, skills, certificates and so on) lives in `src/data.js`. The photo, CV PDF and logo are in `public/assets/`.

## Publish

`.github/workflows/deploy.yml` builds the site and deploys it to GitHub Pages on every push to `main`. One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Backend (Supabase)

The contact form saves messages to the `contact_messages` table in the Supabase project `Anas_Eddanfor`. Visitors can only insert; reading happens in the Supabase dashboard (**Table Editor → contact_messages**). The schema is in `supabase/migrations/`.

The client lives in `src/lib/supabase.js`. The project URL and publishable key are built in and can be overridden with `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in a local `.env`.
