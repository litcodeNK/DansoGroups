'use client';

import { useEffect, useRef } from 'react';
import { Globe, Users, Award } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { CyclingBackground } from './CyclingBackground';

const ABOUT_IMAGES = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop',
];

const stats = [
  { icon: Globe,  value: 12, suffix: '+', label: 'Countries Served' },
  { icon: Users,  value: 200, suffix: '+', label: 'Clients Worldwide' },
  { icon: Award,  value: 8,  suffix: '+', label: 'Years of Excellence' },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left text block slides in
      gsap.from('.about-left', {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.about-left', start: 'top 80%' },
      });

      // Stat cards stagger in from right
      gsap.from('.stat-card', {
        x: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.stat-card', start: 'top 80%' },
      });

      // Count-up animation for each stat
      stats.forEach(({ value, suffix }, i) => {
        const el = document.querySelector<HTMLElement>(`.stat-value-${i}`);
        if (!el) return;

        const obj = { v: 0 };
        gsap.to(obj, {
          v: value,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.v) + suffix;
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative text-white py-24 overflow-hidden">
      <CyclingBackground
        images={ABOUT_IMAGES}
        interval={5000}
        overlay="bg-gradient-to-l from-dark via-dark/90 to-dark/80"
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="about-left">
            <p className="text-accent font-bold uppercase tracking-widest mb-4 text-sm">
              Who We Are
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
              Driving Digital Transformation Across Africa
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              Danso Group of Companies is a pan-African technology firm headquartered in Accra,
              Ghana. We build software, secure infrastructure, and develop mobile products that help
              businesses grow in an increasingly digital world.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mb-10">
              Our team of engineers, designers, and security experts brings deep expertise and a
              genuine understanding of the African business landscape — giving our clients a
              competitive edge from day one.
            </p>
            <a
              href="#contact"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105"
            >
              Work With Us
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6">
            {stats.map(({ icon: Icon, suffix, label }, i) => (
              <div
                key={i}
                className="stat-card flex items-center gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-accent/40 hover:bg-white/10 transition-all duration-300"
              >
                <div className="bg-accent/15 p-4 rounded-xl shrink-0">
                  <Icon size={32} className="text-accent" />
                </div>
                <div>
                  <div
                    className={`stat-value-${i} text-4xl font-extrabold font-serif text-white`}
                  >
                    0{suffix}
                  </div>
                  <div className="text-white/60 font-medium mt-1">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
