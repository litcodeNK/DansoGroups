'use client';

import { Toaster } from 'sonner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollTopButton } from '@/components/ScrollTopButton';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="bottom-right" richColors />
      <Navbar />
      {/* pt accounts for top-bar (40px desktop) + main-nav (80px) = 120px desktop, 80px mobile */}
      <main className="pt-20 lg:pt-[120px]">{children}</main>
      <Footer />
      <ScrollTopButton />
    </div>
  );
}
