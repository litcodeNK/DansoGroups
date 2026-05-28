'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { FloatingShapes } from './FloatingShapes';
import { gsap } from '@/lib/gsap';

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
        <rect x="0" y="2" width="9" height="8" rx="2" fill="#2D5BE3" />
        <rect x="13" y="2" width="9" height="8" rx="2" fill="#2D5BE3" opacity="0.4" />
      </svg>
      <span className="text-xs font-bold uppercase tracking-[3px]" style={{ color: '#2D5BE3' }}>
        {children}
      </span>
    </div>
  );
}

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
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info', {
        x: -80, opacity: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-info', start: 'top 82%' },
      });
      gsap.from('.contact-form-wrap', {
        x: 80, opacity: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-form-wrap', start: 'top 82%' },
      });
      gsap.from('.contact-badge', {
        y: -30, opacity: 0, duration: 0.7, delay: 0.2, ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-badge', start: 'top 85%' },
      });
      gsap.from('.contact-heading', {
        clipPath: 'inset(100% 0 0 0)', y: 24, opacity: 0,
        duration: 1, delay: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-heading', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Message sent successfully! We will get back to you soon.');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      <FloatingShapes variant="light" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">

          {/* ── Left: Contact Information card with background image ── */}
          <div className="contact-info relative rounded-tl-3xl rounded-br-3xl overflow-hidden text-white" style={{ minHeight: '480px' }}>
            {/* Background image */}
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop"
              alt="Contact background"
              fill
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 40vw"
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, rgba(13,27,42,0.88) 0%, rgba(45,91,227,0.75) 100%)' }}
            />
            {/* Blue accent strip at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ backgroundColor: '#2D5BE3' }} />
            {/* Floating dot-grid decoration */}
            <div className="absolute top-6 right-6 grid grid-cols-4 gap-1.5 opacity-20 pointer-events-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 flex flex-col h-full" style={{ minHeight: '480px' }}>
              <h3 className="text-xl font-bold mb-3">Contact Information</h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Reach out to us — we&apos;re always ready to help your business grow and thrive with
                the right technology solutions.
              </p>

              <div className="space-y-6 mb-8 flex-1">
                {[
                  { Icon: Phone, label: 'Call Us 7/24', value: '+233 54 123 4567' },
                  { Icon: Mail, label: 'Email Us', value: 'info@dansogroup.com' },
                  { Icon: MapPin, label: 'Location', value: '123 Innovation Drive, Accra' },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ border: '1.5px dashed rgba(255,255,255,0.5)', backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        {label}
                      </p>
                      <p className="text-sm font-bold text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-sm font-bold mb-3">Follow Social:</p>
                <div className="flex gap-2">
                  {socials.map(({ label, svg }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/20 text-white"
                      style={{ border: '1px solid rgba(255,255,255,0.4)' }}
                    >
                      {svg}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Contact form ── */}
          <div className="contact-form-wrap">
            <div className="contact-badge"><SectionBadge>Get In Touch</SectionBadge></div>
            <h2 className="contact-heading text-4xl font-extrabold mb-4" style={{ color: '#0D1B2A' }}>
              Ready To Get Started?
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#64748B' }}>
              Nullam varius, erat quis iaculis dictum, eros urna varius eros, ut blandit felis odio
              in turpis. Quisque rhoncus, eros in auctor ultrices,
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: '#0D1B2A' }}>
                    Your Name*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full border rounded px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 bg-gray-50"
                    style={{ borderColor: '#E2E8F0' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: '#0D1B2A' }}>
                    Your Email*
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full border rounded px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 bg-gray-50"
                    style={{ borderColor: '#E2E8F0' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#0D1B2A' }}>
                  Write Message*
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="Write Message"
                  className="w-full border rounded px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 bg-gray-50 resize-none"
                  style={{ borderColor: '#E2E8F0' }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 text-white text-sm font-bold px-8 py-3.5 transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: '#2D5BE3' }}
              >
                {submitting ? 'Sending…' : 'Send Message'}{' '}
                <span className="text-base leading-none">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
