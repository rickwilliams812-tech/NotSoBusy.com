// app/api/waitlist/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin'; // ← alias, see tsconfig note below

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { email, city, zip } = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    const zip5 = typeof zip === 'string' ? zip.trim().slice(0, 10) : null;
    const userAgent = req.headers.get('user-agent') || null;
    const referer = req.headers.get('referer') || null;

    const { error } = await supabaseAdmin.from('waitlist').insert([
      {
        email: String(email).trim().toLowerCase(),
        city: city ? String(city).trim() : null,
        zip: zip5,
        source: 'notsobusy.com',
        user_agent: userAgent,
        referer,
      },
    ]);

    if (error) {
      // Gracefully handle unique-violation (email already signed up)
      if ((error as any).code === '23505') {
        return NextResponse.json({ ok: true, note: 'Already subscribed' }, { status: 200 });
      }
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Bad request' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: 'Not allowed' }, { status: 405 });
}
