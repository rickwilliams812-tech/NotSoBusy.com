import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NotSoBusy.com — Go when it’s Not So Busy",
  description: "Real-time alerts when your favorite restaurants have short waits and happy staff.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
