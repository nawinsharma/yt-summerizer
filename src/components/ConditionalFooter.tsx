"use client";
import { usePathname } from 'next/navigation';
import Footer from '@/components/landing/footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Only show footer on the home page
  if (pathname === '/') {
    return <Footer />;
  }
  
  return null;
} 