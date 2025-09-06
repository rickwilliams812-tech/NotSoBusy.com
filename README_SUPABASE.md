# NotSoBusy — Supabase Waitlist Wiring

## Steps
1) Create a Supabase project → copy Project URL + **Service role key** (Settings → API).
2) In Supabase SQL editor, run `supabase_waitlist.sql`.
3) In Vercel env vars, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE` (server-only!)
4) Add these files to your Next.js app (App Router):
   - `app/api/waitlist/route.ts`
   - `lib/supabaseAdmin.ts`
   - `.env.example` (local reference)
5) Install dep: `npm i @supabase/supabase-js`
6) Update your form submit handler to POST to `/api/waitlist`.

## Example onSubmit
```tsx
onSubmit={async (e) => {
  e.preventDefault();
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, city, zip }),
  });
  if (res.ok) {
    setSubscribed(true);
    setEmail(""); setCity(""); setZip("");
  } else {
    const { error } = await res.json().catch(() => ({}));
    alert(error || "Failed to join");
  }
}}
```
