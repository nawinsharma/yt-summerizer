import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/navbar";
import GlobalBackground from '@/components/GlobalBackground';
import ConditionalFooter from '@/components/ConditionalFooter';
import StructuredData from '@/components/StructuredData';
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: {
    default: "SumTube - YouTube Video Summarizer",
    template: "%s | SumTube"
  },
  description: "SumTube is an AI-powered tool that allows you to summarize YouTube videos in seconds. Get instant video summaries, key points, and insights from any YouTube video.",
  keywords: [
    "YouTube summarizer",
    "video summarizer",
    "AI video summary",
    "YouTube video summary",
    "video content analysis",
    "YouTube transcript",
    "video key points",
    "AI video processing"
  ],
  authors: [{ name: "Nawin" }],
  metadataBase: new URL('https://sumtube.nawin.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "SumTube - YouTube Video Summarizer",
    description: "Get instant AI-powered summaries of any YouTube video. Save time and extract key insights from video content.",
    url: 'https://sumtube.nawin.xyz',
    siteName: 'SumTube',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SumTube - YouTube Video Summarizer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SumTube - YouTube Video Summarizer",
    description: "Get instant AI-powered summaries of any YouTube video. Save time and extract key insights from video content.",
    images: ['/og-image.png'],
    creator: '@nawinscript',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology and fast learning',
  classification: 'AI Video Summarizer',
  other: {
    'msapplication-TileColor': '#FF6B6B',
    'theme-color': '#FF6B6B',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'SumTube',
    'application-name': 'SumTube',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon Implementation - Comprehensive */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#FF6B6B" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#FF6B6B" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for analytics and external services */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Structured Data for SEO */}
        <StructuredData type="website" />
        <StructuredData type="webapplication" />
        <StructuredData type="organization" />
      </head>
      <body className="dark antialiased">
        <Analytics />
        <GlobalBackground />
        <NextTopLoader showSpinner={false} height={6} color="#000000" />
        <main className="h-screen">
          <Nav />
          <Toaster richColors position="top-right" />
          {children}
          <ConditionalFooter />
        </main>
      </body>
    </html>
  );
}
