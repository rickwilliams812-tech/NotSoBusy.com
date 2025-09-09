// app/og/route.tsx
import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title =
    (searchParams.get('title') || 'NotSoBusy').slice(0, 80);
  const subtitle =
    (searchParams.get('subtitle') || "Go when it's Not So Busy").slice(0, 120);

  return new ImageResponse(
    (
      <div
        style={{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px',
          background:
            'radial-gradient(1000px 700px at -10% -10%, #e0f2fe 0%, rgba(224,242,254,0) 60%),' +
            'radial-gradient(900px 600px at 110% 0%, #fae8ff 0%, rgba(250,232,255,0) 55%),' +
            'radial-gradient(800px 600px at 20% 120%, #fef9c3 0%, rgba(254,249,195,0) 50%),' +
            '#ffffff',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Top badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#0f172a',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            NSB
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: -0.5,
            }}
          >
            NotSoBusy.com
          </div>
        </div>

        {/* Title / Subtitle */}
        <div style={{ marginTop: 24 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: -2,
              color: '#0f172a',
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 36,
              fontWeight: 500,
              color: '#334155',
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div
          style={{
            width: '100%',
            height: 10,
            borderRadius: 8,
            background:
              'linear-gradient(90deg, #0891b2 0%, #a21caf 50%, #d97706 100%)',
          }}
        />
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        // helps some crawlers
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      },
    }
  );
}
