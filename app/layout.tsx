import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Toolify — Free Online Tools",
    template: "%s | Toolify",
  },
  description:
    "Free online tools for developers, writers, and designers. No login required. Password generator, word counter, color palette, JSON formatter, and more.",
  keywords: [
    "free online tools",
    "developer tools",
    "productivity tools",
    "web tools",
  ],
  authors: [{ name: "Toolify" }],
  creator: "Toolify",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolify.vercel.app",
    siteName: "Toolify",
    title: "Toolify — Free Online Tools",
    description:
      "Free online tools for developers, writers, and designers. No login required.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Toolify — Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolify — Free Online Tools",
    description:
      "Free online tools for developers, writers, and designers. No login required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`,
              }}
            />
          </>
        )}
        {/* Google AdSense */}
        {ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
