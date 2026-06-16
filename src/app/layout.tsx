import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Adelle Sans — headings & body (the design's primary typeface).
const adelleSans = localFont({
  variable: "--font-adelle-sans",
  src: [
    { path: "../fonts/AdelleSans-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/AdelleSans-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../fonts/AdelleSansBold.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

// The inbox UI uses SF Pro Text in the design. That face is proprietary and not
// bundled here, so we map the UI role to Adelle Sans too (and fall back to the
// system San-Francisco stack on macOS). Drop SFProText-*.otf into src/fonts and
// add a second localFont() with `variable: "--font-sf-pro"` to restore it.

export const metadata: Metadata = {
  title: "Superhuman — Organize your Inbox",
  description:
    "FTUE prototype · Chapter 2: Auto Archive & Split Inbox onboarding flow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${adelleSans.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
