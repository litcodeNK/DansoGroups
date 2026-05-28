'use client';

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Code, Shield, Smartphone, Settings, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FloatingShapes } from './FloatingShapes';
import { ParticleCanvas } from './ParticleCanvas';
import { gsap } from '@/lib/gsap';

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-5">
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

const services = [
  {
    title: 'App Development',
    icon: Code,
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop',
    desc: 'Custom mobile and web applications built for performance, scalability, and an exceptional user experience.',
  },
  {
    title: 'Database Security',
    icon: Shield,
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
    desc: 'End-to-end database protection, encryption strategies, and threat monitoring for your critical data.',
  },
  {
    title: 'IT Consultancy',
    icon: Settings,
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    desc: 'Strategic IT roadmaps, infrastructure planning, and expert guidance tailored to your business goals.',
  },
  {
    title: 'Mobile Solutions',
    icon: Smartphone,
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop',
    desc: 'Native and cross-platform mobile apps that engage users and drive measurable business growth.',
  },
];

export function Services() {
  const [start, setStart] = useState(0);
  const visible = 3;
  const sectionRef = useRef<HTMLElement>(null);

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(services.length - visible, s + 1));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.srv-badge', {
        x: -40, opacity: 0, duration: 0.75, ease: 'expo.out',
        scrollTrigger: { trigger: '.srv-badge', start: 'top 85%' },
      });
      gsap.from('.srv-heading', {
        clipPath: 'inset(100% 0 0 0)', y: 24, opacity: 0,
        duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.srv-heading', start: 'top 85%' },
      });
      gsap.from('.srv-card', {
        y: 80, opacity: 0, rotation: 1.5, duration: 0.9, stagger: 0.15, ease: 'expo.out',
        transformOrigin: 'center bottom',
        scrollTrigger: { trigger: '.srv-card', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: '#060D18' }}
    >
      <ParticleCanvas />
      <FloatingShapes variant="dark" />

      {/* Subtle mesh pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#2D5BE3 0,#2D5BE3 1px,transparent 0,transparent 50%),repeating-linear-gradient(90deg,#2D5BE3 0,#2D5BE3 1px,transparent 0,transparent 50%)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header row */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="srv-badge"><SectionBadge>Services We&apos;re Offering</SectionBadge></div>
            <h2 className="srv-heading text-4xl font-extrabold text-white">Exclusive IT Services</h2>
          </div>
          <div className="hidden lg:flex gap-3">
            <button
              onClick={prev}
              disabled={start === 0}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-accent transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              disabled={start >= services.length - visible}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-30"
              style={{ backgroundColor: '#2D5BE3' }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.slice(start, start + visible).map(({ title, icon: Icon, img, desc }) => (
            <div
              key={title}
              className="srv-card bg-white rounded-tl-3xl rounded-br-3xl overflow-hidden flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>

              {/* Icon badge */}
              <div className="px-6 -mt-6 relative z-10">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-sm shadow-lg"
                  style={{ backgroundColor: '#2D5BE3' }}
                >
                  <Icon size={26} className="text-white" />
                </div>
              </div>

              {/* Body */}
              <div className="px-6 pt-4 pb-7 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#0D1B2A' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#64748B' }}>
                  {desc}
                </p>
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-bold mt-5 transition-colors hover:opacity-80"
                  style={{ color: '#2D5BE3' }}
                >
                  Read More <ArrowRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile nav dots */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setStart(Math.min(i, services.length - visible))}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ backgroundColor: i === start ? '#2D5BE3' : 'rgba(255,255,255,0.3)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
