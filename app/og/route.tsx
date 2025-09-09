// app/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';            // Fast & cold-start friendly on Vercel Edge
export const contentType = 'image/png';   // Ensures correct Content-Type header
export const size = { width: 1200, height: 630 };

export async function GET() {
  // No external fonts to avoid fetch failures — uses platform defaults
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background:
            'linear-gradient(135deg, #e0f2fe 0%, #fae8ff 50%, #fef9c3 100%)',
        }}
      >
        {/* Left color bar */}
        <div
          style={{
            width: 16,
            height: '100%',
            background:
              'linear-gradient(180deg, #06b6d4 0%, #a21caf 50%, #f59e0b 100%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 60,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: '#0f172a',
                color: 'white',
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
                fontSize: 36,
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              NotSoBusy<span style={{ color: '#64748b' }}>.com</span>
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.1,
              fontWeight: 900,
              color: '#0f172a',
              marginBottom: 18,
            }}
          >
            Go when it’s{' '}
            <span
              style={{
                background:
                  'linear-gradient(90deg, #0891b2, #a21caf, #d97706)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Not So Busy
            </span>
          </div>

          {/* Subhead */}
          <div
            style={{
              fontSize: 32,
              color: '#334155',
              maxWidth: 900,
            }}
          >
            Real-time alerts when your favorite restaurants have short waits and
            happy staff.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
