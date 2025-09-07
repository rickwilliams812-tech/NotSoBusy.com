// lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

// Prefer NEXT_PUBLIC_SUPABASE_URL for consistency, but fall back if you already set SUPABASE_URL.
// Service role must remain server-only.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL!;
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE!;

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: { headers: { 'X-Client-Info': 'NotSoBusy/Waitlist' } },
});
