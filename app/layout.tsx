// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://www.notsobusy.com';
const ogImage = `${siteUrl}/og.png?v=5`; // bump the version to bust caches on platforms

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'NotSoBusy — Go when it’s Not So Busy',
  description:
    'Real-time alerts when your favorite restaurants have short waits and happy staff. Dine better — without the crowds.',
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'NotSoBusy',
    title: 'NotSoBusy — Go when it’s Not So Busy',
    description:
      'Real-time alerts when your favorite restaurants have short waits and happy staff. Dine better — without the crowds.',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@notsobusy',
    title: 'NotSoBusy — Go when it’s Not So Busy',
    description:
      'Real-time alerts when your favorite restaurants have short waits and happy staff. Dine better — without the crowds.',
    images: [ogImage],
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
