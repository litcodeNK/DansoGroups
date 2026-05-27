'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { Sidebar } from '@/components/Sidebar';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Hero } from '@/components/Hero';
import { Products } from '@/components/Products';
import { Books } from '@/components/Books';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ScrollTopButton } from '@/components/ScrollTopButton';

const SECTIONS = ['home', 'products', 'books', 'services', 'about', 'contact'];

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark w-full flex">
      <Toaster position="bottom-right" richColors />
      {/* Three.js particle layer — sits behind everything */}
      <ParticleBackground />
      <Sidebar activeSection={activeSection} />
      <main className="flex-1 lg:ml-[240px] relative" style={{ zIndex: 1 }}>
        <Hero />
        <Products />
        <Books />
        <Services />
        <About />
        <Contact />
        <Footer />
      </main>
      <ScrollTopButton />
    </div>
  );
}
