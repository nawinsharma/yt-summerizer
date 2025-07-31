import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/navbar";
import GlobalBackground from '@/components/GlobalBackground';
import ConditionalFooter from '@/components/ConditionalFooter';
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "SumTube",
  description: "SumTube is a tool that allows you to summarize YouTube videos in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
