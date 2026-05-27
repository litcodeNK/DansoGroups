'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-col', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.footer-col', start: 'top 90%' },
      });
      gsap.from('.footer-copy', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.footer-copy', start: 'top 95%' },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-dark text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="footer-col">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 border-2 border-white flex items-center justify-center mr-3">
                <span className="text-xl font-bold font-serif">D</span>
              </div>
              <span className="text-xl font-bold tracking-widest">DANSO GROUP</span>
            </div>
            <p className="text-white/60 max-w-xs">
              Innovating the future through software, security, and solutions.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="text-lg font-bold mb-6 font-serif">Contact Us</h4>
            <ul className="space-y-3 text-white/60">
              <li>123 Innovation Drive</li>
              <li>East Legon, Accra, Ghana</li>
              <li className="pt-2">+233 54 123 4567</li>
              <li>info@dansogroup.com</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="text-lg font-bold mb-6 font-serif">More Links</h4>
            <ul className="space-y-3 text-white/60">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-accent transition-colors">{l}</a>
                </li>
              ))}
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-copy pt-8 border-t border-white/10 text-center md:text-left text-white/40 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2024 Danso Group of Companies | All Rights Reserved</p>
          <p className="mt-2 md:mt-0">Designed with precision.</p>
        </div>
      </div>
    </footer>
  );
}
