// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_NAME = 'NotSoBusy';
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
  'https://www.notsobusy.com';
const TITLE = "NotSoBusy — Go when it’s Not So Busy";
const DESCRIPTION =
  'Real-time alerts when your favorite restaurants have short waits and happy staff. Dine better — without the crowds.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og', // served by app/og/route.tsx
        width: 1200,
        height: 630,
        alt: 'NotSoBusy preview image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@', // add your handle if you have one
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      // Add PNG/SVG variants if you have them:
      // { url: '/icon.png', type: 'image/png', sizes: '32x32' }
    ],
    apple: [
      // { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  keywords: ['restaurants', 'wait times', 'alerts', 'dining', 'crowds'],
  robots: {
    index: true,
    follow: true,
    // Set these to false while in development/private beta if you prefer:
    // index: false,
    // follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
