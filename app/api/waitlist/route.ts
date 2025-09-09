// app/api/waitlist/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Force Node runtime (Resend is Node-centric)
export const runtime = 'nodejs';

// ---- Env ----
const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const RESEND_FROM = process.env.RESEND_FROM ?? 'NotSoBusy <hello@notsobusy.com>';

function ensureEnv() {
  // Only hard-require Supabase here (email is optional)
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    // Log which one is missing without leaking values
    console.error('ENV_MISSING', {
      hasUrl: Boolean(SUPABASE_URL),
      hasServiceRole: Boolean(SUPABASE_SERVICE_ROLE_KEY),
    });
    throw new Error('Missing Supabase env vars (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).');
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c] as string),
  );
}

function welcomeHtml(toEmail: string) {
  const safe = escapeHtml(toEmail);
  return `
<!doctype html>
<html>
<head>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <meta charset="utf-8" />
  <title>Welcome to NotSoBusy</title>
  <style>
    .btn { background:#0ea5e9; color:#fff; padding:10px 14px; border-radius:10px; text-decoration:none; display:inline-block; }
  </style>
</head>
<body style="font-family:ui-sans-serif,system-ui;-webkit-font-smoothing:antialiased;line-height:1.5;">
  <h1>Welcome to NotSoBusy 🎉</h1>
  <p>Thanks for joining the waitlist with <strong>${safe}</strong>.</p>
  <p>We’ll ping you when your favorite spots are <em>not so busy</em> — short waits, happy staff.</p>
  <p><a class="btn" href="https://www.notsobusy.com">Open NotSoBusy</a></p>
  <p style="color:#64748b;font-size:12px">You’re receiving this because you signed up on our site. If this wasn’t you, just ignore this email.</p>
</body>
</html>`;
}

// ---- GET: health check ----
export async function GET() {
  const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
  const hasResend = Boolean(RESEND_API_KEY && RESEND_FROM);
  return NextResponse.json({ ok: true, hasSupabase, hasResend });
}

// ---- POST: create waitlist row + send welcome email ----
export async function POST(req: Request) {
  try {
    ensureEnv();

    const { email, city, zip } = (await req.json()) as {
      email?: string;
      city?: string;
      zip?: string;
    };

    const e = (email ?? '').trim().toLowerCase();
    const c = (city ?? '').trim();
    const z = (zip ?? '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      return NextResponse.json({ ok: false, error: 'Invalid email.' }, { status: 400 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Try to insert; treat unique violation as duplicate "success"
    let duplicate = false;
    let inserted: any = null;

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email: e, city: c || null, zip: z || null }])
      .select()
      .single();

    if (error) {
      // 23505 = unique violation (e.g., unique index on lower(email))
      if ((error as any).code === '23505' || /duplicate|unique/i.test(error.message)) {
        duplicate = true;
      } else {
        console.error('SUPABASE_INSERT_ERROR', { code: (error as any).code, message: error.message });
        return NextResponse.json({ ok: false, error: 'Database error.' }, { status: 500 });
      }
    } else {
      inserted = data;
    }

    // Fire-and-forget welcome email if Resend configured and not a duplicate
    if (!duplicate && RESEND_API_KEY) {
      try {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: RESEND_FROM,
          to: e,
          subject: 'Welcome to NotSoBusy 🎉',
          html: welcomeHtml(e),
        });
      } catch (mailErr: any) {
        // Don’t fail the signup if email fails
        console.error('RESEND_SEND_ERROR', { message: mailErr?.message });
      }
    }

    return NextResponse.json({ ok: true, duplicate, inserted: inserted ?? null });
  } catch (err: any) {
    console.error('WAITLIST_POST_FATAL', err?.message || err);
    return NextResponse.json({ ok: false, error: err?.message || 'Server error.' }, { status: 500 });
  }
}
