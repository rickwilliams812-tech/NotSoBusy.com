import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { email, city, zip } = await req.json();
    console.log('WAITLIST_POST_INCOMING', { email, city, zip });

    if (!email || !isValidEmail(email)) {
      console.error('WAITLIST_INVALID_EMAIL', { email });
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const zip5 = typeof zip === 'string' ? zip.trim().slice(0, 10) : null;
    const userAgent = req.headers.get('user-agent') || null;
    const referer = req.headers.get('referer') || null;

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{
        email: String(email).trim().toLowerCase(),
        city: city ? String(city).trim() : null,
        zip: zip5,
        source: 'notsobusy.com',
        user_agent: userAgent,
        referer,
      }])
      .select('id,email,created_at')
      .single();

    if (error) {
      console.error('WAITLIST_INSERT_ERROR', { code: (error as any).code, message: error.message });
      if ((error as any).code === '23505') {
        return NextResponse.json({ ok: true, note: 'Already subscribed' }, { status: 200 });
      }
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    console.log('WAITLIST_INSERT_OK', data);
    return NextResponse.json({ ok: true, inserted: data }, { status: 201 });
  } catch (e: any) {
    console.error('WAITLIST_POST_EXCEPTION', e?.message);
    return NextResponse.json({ ok: false, error: e?.message ?? 'Bad request' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: 'Not allowed' }, { status: 405 });
}
