import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';           // ensure Node runtime
export const dynamic = 'force-dynamic';    // prevent static optimization/prerender

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

    const supabase = getSupabaseAdmin(); // ← create at runtime
    const { error } = await supabase.from('waitlist').insert([
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
      // unique violation -> treat as success
      if ((error as any).code === '23505') {
        return NextResponse.json({ ok: true, note: 'Already subscribed' }, { status: 200 });
      }
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Bad request' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: 'Not allowed' }, { status: 405 });
}
