import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import WelcomeEmail from '@/emails/WelcomeEmail';

// --- Supabase admin client (server-only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- Resend client (server-only)
const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const { email, city, zip } = await req.json();

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    // Try to insert. Unique index on lower(email) will throw on dupes.
    const { data: row, error } = await supabase
      .from('waitlist')
      .insert({ email, city, zip })
      .select('id,email,created_at')
      .single();

    if (error) {
      // Postgres duplicate key error
      if ((error as any).code === '23505') {
        return NextResponse.json({ ok: true, duplicate: true, message: 'Already subscribed' });
      }
      console.error('WAITLIST_INSERT_ERROR', error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // Send welcome email ONLY for brand-new signups
    const from = process.env.RESEND_FROM || 'NotSoBusy <hello@updates.notsobusy.com>';

    const { error: emailError, data: sent } = await resend.emails.send({
      from,
      to: email,
      subject: 'Welcome to NotSoBusy 🎉',
      react: WelcomeEmail({ email, city }),
      // (Optional) also include a plain-text fallback:
      text:
        `Welcome to NotSoBusy!\n\n` +
        `Thanks for joining${city ? ` from ${city}` : ''}. ` +
        `We’ll let you know when your favorite spots are not so busy.\n\n` +
        `— The NotSoBusy team`,
    });

    if (emailError) {
      console.error('RESEND_SEND_ERROR', emailError);
      // Don’t fail the whole request if the email fails
      return NextResponse.json({ ok: true, inserted: row, emailSent: false, emailError: emailError.message });
    }

    return NextResponse.json({ ok: true, inserted: row, emailSent: true, emailId: sent?.id });
  } catch (err: any) {
    console.error('WAITLIST_POST_FATAL', err);
    return NextResponse.json({ ok: false, error: err?.message ?? 'Server error' }, { status: 500 });
  }
}
