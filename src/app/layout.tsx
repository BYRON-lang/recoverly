import type { Metadata } from "next";
import { Inter_Tight, Instrument_Sans } from 'next/font/google';
import "./globals.css";
import { Providers } from "@/components/providers";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ['400', '500', '600', '700'],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Recoverly - Cybersecurity & Account Recovery",
  description: "Professional help to recover and secure your online accounts. Connect with certified cybersecurity experts 24/7.",
  keywords: ["account recovery", "cybersecurity", "hacked account", "digital security"],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

// ThemeWatcher is now handled within ThemeProvider

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${instrumentSans.variable} antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
