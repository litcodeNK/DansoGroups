'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Phone, MapPin } from 'lucide-react';
import { FloatingShapes } from './FloatingShapes';
import { gsap } from '@/lib/gsap';

const itSolution = [
  'IT Management',
  'SEO Optimization',
  'Web Development',
  'Cyber Security',
  'Data Security',
];

const quickLinks = [
  { label: 'About DansoGroups', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Pricing Plan', href: '/contact' },
  { label: 'Our Projects', href: '/services' },
  { label: 'Our Team', href: '/about' },
];

const socials = [
  {
    label: 'Facebook',
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H8v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="white" />
      </svg>
    ),
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-col', {
        y: 50, opacity: 0, duration: 0.85, stagger: 0.14, ease: 'expo.out',
        scrollTrigger: { trigger: '.footer-col', start: 'top 92%' },
      });
      gsap.from('.footer-bottom', {
        y: 20, opacity: 0, duration: 0.7, delay: 0.4, ease: 'expo.out',
        scrollTrigger: { trigger: '.footer-bottom', start: 'top 98%' },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={{ backgroundColor: '#060D18', color: '#ffffff' }} className="relative overflow-hidden">
      <FloatingShapes variant="dark" />
      {/* Decorative triangles */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-30">
        <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
          <polygon points="0,0 120,0 0,180" fill="#2D5BE3" />
        </svg>
      </div>
      <div className="absolute top-1/4 right-0 pointer-events-none opacity-20">
        <svg width="80" height="180" viewBox="0 0 80 180" fill="none">
          <polygon points="80,0 80,180 0,90" fill="#2D5BE3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Col 1 — brand */}
          <div className="footer-col">
            {/* Logo on dark bg — frosted white pill so it reads cleanly */}
            <Link href="/" className="inline-flex mb-5">
              <span
                className="inline-flex items-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.97)',
                  padding: '6px 12px 6px 8px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
                }}
              >
                <Image
                  src="/logo.jpg"
                  alt="DansoGroups"
                  width={1280}
                  height={921}
                  style={{ height: '42px', width: 'auto' }}
                  className="object-contain"
                />
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748B' }}>
              Empowering African businesses with world-class technology — software, security, and solutions for a digital future.
            </p>
            <div className="flex gap-2">
              {socials.map(({ svg, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded transition-colors hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — IT Solution */}
          <div className="footer-col">
            <h4 className="text-white font-bold text-base mb-6">IT Solution</h4>
            <ul className="space-y-3">
              {itSolution.map((item) => (
                <li key={item}>
                  <a
                    href="/services"
                    className="text-sm flex items-center gap-2 transition-colors hover:text-white"
                    style={{ color: '#64748B' }}
                  >
                    <span style={{ color: '#2D5BE3' }}>»</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Quick Links */}
          <div className="footer-col">
            <h4 className="text-white font-bold text-base mb-6">Quick Link</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm flex items-center gap-2 transition-colors hover:text-white"
                    style={{ color: '#64748B' }}
                  >
                    <span style={{ color: '#2D5BE3' }}>»</span> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div className="footer-col">
            <h4 className="text-white font-bold text-base mb-6">Contact Us</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#2D5BE3' }} />
                <p className="text-sm" style={{ color: '#64748B' }}>
                  4517 Washington Ave. Manchester,
                  <br />
                  Kentucky 39495
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="shrink-0 mt-0.5" style={{ color: '#2D5BE3' }} />
                <div>
                  <p className="text-sm font-semibold text-white">Opening Hours:</p>
                  <p className="text-sm" style={{ color: '#64748B' }}>
                    Mon – Sat: 10.00 AM – 4.00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="shrink-0 mt-0.5" style={{ color: '#2D5BE3' }} />
                <div>
                  <p className="text-sm font-semibold text-white">Phone Call:</p>
                  <p className="text-sm" style={{ color: '#64748B' }}>
                    +233 54 123 4567, +233 30 200 0000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: '#475569' }}
        >
          <p>
            © All Copyright 2026 by{' '}
            <span style={{ color: '#2D5BE3' }}>DansoGroups</span>
          </p>
          <div className="flex gap-6">
            <a href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Condition
            </a>
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
