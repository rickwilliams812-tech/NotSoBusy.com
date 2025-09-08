export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { head: true, count: 'exact' });
    if (error) return NextResponse.json({ ok: false, stage: 'select', error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, stage: 'select', count });
  } catch (e: any) {
    return NextResponse.json({ ok: false, stage: 'env/client', error: e?.message }, { status: 500 });
  }
}
