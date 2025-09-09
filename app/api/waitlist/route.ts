import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
email?: string;
city?: string;
zip?: string;
};

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const RESEND_FROM = process.env.RESEND_FROM ?? 'NotSoBusy hello@notsobusy.com
';

function ensureEnv() {
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
throw new Error('Missing Supabase env vars (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).');
}
if (!RESEND_API_KEY) {
throw new Error('Missing Resend env var (RESEND_API_KEY).');
}
}

function isValidEmail(v: string) {
return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(v);
}

function escapeHtml(s: string) {
return s.replace(/[&<>"']/g, (c) => ({
'&': '&',
'<': '<',
'>': '>',
'"': '"',
"'": ''',
}[c]!));
}

function welcomeHtml(toEmail: string) {
const safe = escapeHtml(toEmail);
return <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5"> <h2>Welcome to NotSoBusy 🎉</h2> <p>Hi ${safe}, thanks for joining the waitlist!</p> <p>You’ll get updates when your favorite spots are <strong>not so busy</strong>, plus early access invites.</p> <p style="margin-top:16px">— Team NotSoBusy</p> </div> ;
}

// POST /api/waitlist
export async function POST(req: Request) {
try {
ensureEnv();

const { email = '', city = '', zip = '' } = (await req.json().catch(() => ({}))) as Body;

const e = email.trim().toLowerCase();
const c = city?.trim() || null;
const z = zip?.trim() || null;

if (!isValidEmail(e)) {
  return NextResponse.json({ ok: false, error: 'Invalid email.' }, { status: 400 });
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

let duplicate = false;
let inserted: { id: string; email: string; created_at: string } | null = null;

const { data, error } = await supabase
  .from('waitlist')
  .insert([{ email: e, city: c, zip: z }])
  .select('id,email,created_at')
  .single();

if (error) {
  // Unique violation from Postgres (duplicate email)
  if ((error as any).code === '23505') {
    duplicate = true;
  } else {
    console.error('WAITLIST_INSERT_ERROR', error);
    return NextResponse.json({ ok: false, error: 'Database error.' }, { status: 500 });
  }
} else {
  inserted = data!;
}

// Send welcome email only for brand-new signups
if (!duplicate) {
  try {
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: RESEND_FROM,
      to: e,
      subject: 'Welcome to NotSoBusy 🎉',
      html: welcomeHtml(e),
    });
  } catch (mailErr) {
    console.error('RESEND_SEND_ERROR', mailErr);
    // We don’t fail the request just because the email didn’t send
  }
}

return NextResponse.json({ ok: true, duplicate, inserted });


} catch (err: any) {
console.error('WAITLIST_ROUTE_FATAL', err);
return NextResponse.json({ ok: false, error: err?.message ?? 'Unexpected error.' }, { status: 500 });
}
}

// GET /api/waitlist (health)
export async function GET() {
try {
ensureEnv();
return NextResponse.json({ ok: true, hasSupabase: true, hasResend: true });
} catch (e: any) {
return NextResponse.json({ ok: false, error: e?.message ?? 'Missing envs' }, { status: 500 });
}
}
