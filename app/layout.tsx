import type { Metadata } from 'next';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
  'https://www.notsobusy.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NotSoBusy — Go when it’s Not So Busy',
    template: '%s · NotSoBusy',
  },
  description:
    'Real-time alerts when your favorite restaurants have short waits and happy staff.',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'NotSoBusy',
    title: 'NotSoBusy — Go when it’s Not So Busy',
    description:
      'Real-time alerts when your favorite restaurants have short waits and happy staff.',
    images: [
      {
        url: '/og.png', // served from /public
        width: 1200,
        height: 630,
        alt: 'NotSoBusy — Go when it’s Not So Busy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NotSoBusy — Go when it’s Not So Busy',
    description:
      'Real-time alerts when your favorite restaurants have short waits and happy staff.',
    images: ['/og.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
