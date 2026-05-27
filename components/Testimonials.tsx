'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { toast } from 'sonner';

function SectionBadge({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
        <rect
          x="0" y="2" width="9" height="8" rx="2"
          fill={light ? 'rgba(255,255,255,0.9)' : '#2D5BE3'}
        />
        <rect
          x="13" y="2" width="9" height="8" rx="2"
          fill={light ? 'rgba(255,255,255,0.4)' : '#2D5BE3'}
          opacity={light ? 1 : 0.4}
        />
      </svg>
      <span
        className="text-xs font-bold uppercase tracking-[3px]"
        style={{ color: light ? 'rgba(255,255,255,0.85)' : '#2D5BE3' }}
      >
        {children}
      </span>
    </div>
  );
}

const testimonials = [
  {
    rating: 4,
    text: '" Consectetur adipiscing elit. Integer nunc viverra laoreet est the is porta pretium metus aliquam eget maecenas porta is nunc viverra Aenean pulvinar maximus leo "',
    name: 'Kathryn Murphy',
    role: 'Web Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
  },
  {
    rating: 5,
    text: '" Outstanding cybersecurity services. The team identified vulnerabilities we had overlooked and provided a clear remediation path. Integer nunc viverra Aenean pulvinar maximus leo "',
    name: 'Kwame Asante',
    role: 'CTO, FinTech Ghana',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
  },
  {
    rating: 4,
    text: '" The mobile app they built exceeded every expectation. Clean UI, robust backend, and the team was responsive throughout the whole project engagement "',
    name: 'Abena Mensah',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop',
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const t = testimonials[idx];

  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Message sent! We\'ll be in touch soon.');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* ── Left: contact mini-form with background image ── */}
        <div className="relative py-16 px-8 lg:px-14 flex flex-col justify-center min-h-[560px]">
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop"
            alt="Team working"
            fill
            className="object-cover"
            sizes="50vw"
          />
          {/* Blue overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(45,91,227,0.90)' }} />

          <div className="relative z-10">
            <SectionBadge light>Talk To Us</SectionBadge>
            <h2 className="text-3xl font-extrabold text-white mb-7 leading-tight">
              How May We Help You!
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 rounded px-4 py-3 text-sm outline-none focus:border-white/70 transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 rounded px-4 py-3 text-sm outline-none focus:border-white/70 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Subject"
                  className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 rounded px-4 py-3 text-sm outline-none focus:border-white/70 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 rounded px-4 py-3 text-sm outline-none focus:border-white/70 transition-colors"
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder="Write Message"
                className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 rounded px-4 py-3 text-sm outline-none focus:border-white/70 transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full text-white text-sm font-bold py-3.5 rounded transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: '#060D18' }}
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* ── Right: testimonial slider ── */}
        <div className="py-16 px-8 lg:px-14 flex flex-col justify-center bg-white">
          <SectionBadge>Clients Review</SectionBadge>
          <h2 className="text-4xl font-extrabold leading-tight mb-5" style={{ color: '#0D1B2A' }}>
            What They Say About Our
          </h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: '#64748B' }}>
            It is a long established fact that a reader will be distracted the readable content of a
            page when looking at layout the point of using lorem the is Ipsum less normal
            distribution of letters.
          </p>

          {/* Testimonial card */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-base" style={{ color: '#0D1B2A' }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: '#64748B' }}>
                      {t.role}
                    </p>
                    <div className="flex gap-0.5 mt-1.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          size={14}
                          fill={si < t.rating ? '#2D5BE3' : 'transparent'}
                          style={{ color: si < t.rating ? '#2D5BE3' : '#CBD5E1' }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Quote icon */}
                  <svg width="34" height="26" viewBox="0 0 34 26" fill="none" className="shrink-0 opacity-80">
                    <path
                      d="M0 26V15C0 6.67 5 2 15 0L17 4C12.33 5.33 10 8 10 11H15V26H0ZM19 26V15C19 6.67 24 2 34 0L36 4C31.33 5.33 29 8 29 11H34V26H19Z"
                      fill="#2D5BE3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed italic" style={{ color: '#64748B' }}>
              {t.text}
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1" style={{ backgroundColor: '#E2E8F0' }} />
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-colors hover:border-blue-400"
              style={{ borderColor: '#CBD5E1', color: '#64748B' }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#2D5BE3', color: '#fff' }}
            >
              <ChevronRight size={18} />
            </button>
            <div className="h-px flex-1" style={{ backgroundColor: '#E2E8F0' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
