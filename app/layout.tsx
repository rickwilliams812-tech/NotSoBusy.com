// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

const title = 'NotSoBusy — Go when it’s Not So Busy';
const description =
  'Real-time alerts when your favorite restaurants have short waits and happy staff. Dine better — without the crowds.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.notsobusy.com'),
  title: {
    default: title,
    template: '%s · NotSoBusy',
  },
  description,
  // Open Graph for iMessage, WhatsApp, Facebook, Slack, Discord, Telegram, etc.
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'NotSoBusy',
    title,
    description,
    images: [
      // Put a 1200x630 image at public/og-image.png (or change the path below)
      { url: '/og-image.png', width: 1200, height: 630, alt: 'NotSoBusy preview' },
    ],
    locale: 'en_US',
  },
  // Twitter / X card
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    // Optional: set your handle if you have one, e.g. '@notsobusy'
    // creator: '@notsobusy',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png', // 180x180 in /public
  },
  themeColor: '#ffffff',
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Next injects the meta tags from `metadata` into <head> */}
      <body className="antialiased">{children}</body>
    </html>
  );
}
