'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';

interface SidebarProps {
  activeSection: string;
}

const navLinks = [
  { name: 'HOME',     href: '#home' },
  { name: 'PRODUCTS', href: '#products' },
  { name: 'BOOKS',    href: '#books' },
  { name: 'SERVICES', href: '#services' },
  { name: 'ABOUT',    href: '#about' },
  { name: 'CONTACT',  href: '#contact' },
];

export function Sidebar({ activeSection }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router   = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  // Entrance animation on mount
  useEffect(() => {
    if (!sidebarRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.sidebar-logo', { x: -40, opacity: 0, duration: 0.9, ease: 'expo.out', delay: 0.3 });
      gsap.from('.sidebar-link', {
        x: -30,
        opacity: 0,
        stagger: 0.07,
        duration: 0.7,
        ease: 'expo.out',
        delay: 0.5,
      });
      gsap.from('.sidebar-cta', { scale: 0.85, opacity: 0, duration: 0.6, ease: 'back.out(2)', delay: 1.0 });
      gsap.from('.sidebar-contact', { y: 20, opacity: 0, duration: 0.6, ease: 'expo.out', delay: 1.2 });
    }, sidebarRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    if (pathname !== '/') {
      router.push(`/${href}`);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Content = () => (
    <div className="flex flex-col h-full justify-between py-10 px-8">
      <div>
        <div
          className="sidebar-logo mb-16 cursor-pointer"
          onClick={() => scrollTo('#home')}
        >
          <div className="w-12 h-12 border-2 border-white flex items-center justify-center mb-2 hover:border-accent transition-colors duration-300">
            <span className="text-2xl font-bold font-serif">D</span>
          </div>
          <span className="text-xl font-bold tracking-widest">DANSO</span>
        </div>

        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => {
            const active = pathname === '/' && activeSection === link.href.substring(1);
            return (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`sidebar-link relative text-left text-sm font-semibold tracking-widest transition-colors duration-300 group ${
                  active ? 'text-accent' : 'text-white hover:text-accent/80'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent transition-all duration-300 ${
                    active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => scrollTo('#contact')}
          className="sidebar-cta mt-12 bg-accent hover:bg-accent/90 text-white text-sm font-bold py-3 px-6 rounded-full tracking-wider transition-all w-full hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.03]"
        >
          GET IN TOUCH
        </button>
      </div>

      <div className="sidebar-contact mt-12">
        <h4 className="text-accent font-bold text-sm mb-2">Accra, Ghana</h4>
        <p className="text-white/70 text-sm leading-relaxed">
          +233 54 123 4567
          <br />
          info@dansogroup.com
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-dark rounded-md text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop sidebar */}
      <aside
        ref={sidebarRef}
        className="hidden lg:block fixed top-0 left-0 w-[240px] h-screen bg-dark border-r border-white/10 z-40"
      >
        <Content />
      </aside>

      {/* Mobile backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 w-[280px] h-screen bg-dark z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Content />
      </aside>
    </>
  );
}
