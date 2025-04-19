import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import CursorFollowWrapper from "@/components/util/cursor-follow-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ppRadioGrotesk = localFont({
  src: '../font/PPRadioGrotesk-Regular.woff2',
  display: 'swap',
  variable: '--font-pp-radio-grotesk',
})

const ppEditorialGrotesk = localFont({
  src: '../font/PPEditorialNew-Regular.woff2',
  display: 'swap',
  variable: '--font-pp-editorial-grotesk',
})

const interTight = localFont({
  src: '../font/InterTight-Regular.woff2',
  display: 'swap',
  variable: '--font-inter-tight',
})

const baseUrl = new URL(process.env.NEXT_APP_URL || 'https://animated-kangaroo.vercel.app/')

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_APP_URL || 'https://animated-kangaroo.vercel.app/'),
  title: "Animated Kangaroo",
  description: "Homepage clone of connectivity.valid.com",
  openGraph: {
    images: baseUrl + 'og.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ppRadioGrotesk.variable} ${ppEditorialGrotesk.variable} ${interTight.variable} antialiased`}
      >
        {children}
        <CursorFollowWrapper />
      </body>
    </html>
  );
}
