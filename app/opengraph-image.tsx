import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 72,
          background:
            'linear-gradient(135deg, #ecfeff 0%, #fae8ff 50%, #fef9c3 100%)',
          color: '#0f172a',
          fontFamily:
            'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: '#0f172a',
              color: 'white',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
              fontSize: 28,
            }}
          >
            NSB
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>
            NotSoBusy<span style={{ color: '#64748b' }}>.com</span>
          </div>
        </div>

        <div style={{ height: 28 }} />

        <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.1 }}>
          Go when it&apos;s{' '}
          <span
            style={{
              backgroundImage:
                'linear-gradient(90deg, #0891b2, #a21caf, #d97706)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Not So Busy
          </span>
        </div>

        <div style={{ height: 16 }} />

        <div style={{ fontSize: 30, color: '#334155', maxWidth: 900 }}>
          Real-time alerts when your favorite restaurants have short waits and
          happy staff.
        </div>
      </div>
    ),
    size
  );
}
