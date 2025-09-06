import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using the SERVICE ROLE KEY.
// ⚠️ Never expose the service role in the browser. Keep it only in server code and Vercel env vars.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
  {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "X-Client-Info": "NotSoBusy/Waitlist" } },
  }
);
