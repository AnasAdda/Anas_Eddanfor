import { createClient } from '@supabase/supabase-js';

// The publishable key is meant to ship in browser code; row level security
// on each table decides what it can do. Override both with a local .env if needed.
const url = import.meta.env.VITE_SUPABASE_URL ?? 'https://xrotaqrhopmvdzvwzzua.supabase.co';
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? 'sb_publishable_ApPCw3HqptS2KpKj0OS3HQ_BZnQGmBT';

export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});
