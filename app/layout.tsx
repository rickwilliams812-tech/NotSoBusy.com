// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.notsobusy.com'),
  title: {
    default: 'NotSoBusy — Go when it’s Not So Busy',
    template: '%s · NotSoBusy',
  },
  description:
    'Real-time alerts when your favorite restaurants have short waits and happy staff. Dine better — without the crowds.',
  openGraph: {
    type: 'website',
    url: 'https://www.notsobusy.com',
    siteName: 'NotSoBusy',
    title: 'NotSoBusy — Go when it’s Not So Busy',
    description:
      'Real-time alerts when your favorite restaurants have short waits and happy staff. Dine better — without the crowds.',
    images: [
      {
        url: '/og.png', // <-- static OG image in /public
        width: 1200,
        height: 630,
        alt: 'NotSoBusy — Less Busy, Happy Staff, Short Waits',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@notsobusy', // optional if you have a handle
    title: 'NotSoBusy — Go when it’s Not So Busy',
    description:
      'Real-time alerts when your favorite restaurants have short waits and happy staff. Dine better — without the crowds.',
    images: ['/og.png'], // <-- static OG image in /public
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* No manual <meta> tags needed; Next.js generates them from `metadata` */}
      <body>{children}</body>
    </html>
  );
}
