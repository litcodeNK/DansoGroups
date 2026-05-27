'use client';

import { useEffect, useRef } from 'react';
import { Code, Shield, Smartphone, ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { CyclingBackground } from './CyclingBackground';

const SERVICES_IMAGES = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
];

const services = [
  {
    title: 'Software Development',
    icon: Code,
    description:
      'Custom enterprise software, scalable web applications, and cloud-native solutions tailored to your unique business requirements and operational workflows.',
  },
  {
    title: 'Cybersecurity',
    icon: Shield,
    description:
      'Comprehensive security audits, penetration testing, and robust infrastructure protection to safeguard your digital assets against evolving threats.',
  },
  {
    title: 'Mobile App Development',
    icon: Smartphone,
    description:
      'High-performance, intuitive iOS and Android applications that deliver exceptional user experiences and drive customer engagement.',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.srv-header', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.srv-header', start: 'top 85%' },
      });

      gsap.from('.srv-line', {
        scaleX: 0,
        transformOrigin: 'center',
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.srv-line', start: 'top 85%' },
      });

      // Icon boxes — pop in with rotation
      gsap.from('.srv-icon', {
        scale: 0,
        rotation: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.srv-icon', start: 'top 85%' },
      });

      // Card text
      gsap.from('.srv-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.srv-card', start: 'top 85%' },
      });

      // Accent underline width animates on hover (GSAP)
      document.querySelectorAll('.srv-link').forEach((el) => {
        const line = el.querySelector('.srv-link-line') as HTMLElement;
        if (!line) return;
        el.addEventListener('mouseenter', () =>
          gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'expo.out' })
        );
        el.addEventListener('mouseleave', () =>
          gsap.to(line, { scaleX: 0, duration: 0.3, ease: 'expo.in' })
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative text-white py-24 overflow-hidden">
      <CyclingBackground
        images={SERVICES_IMAGES}
        interval={4200}
        overlay="bg-gradient-to-br from-dark via-dark/90 to-dark/80"
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-24">
        <div className="text-center mb-20">
          <h2 className="srv-header text-4xl font-serif font-bold mb-4">SERVICES</h2>
          <div className="srv-line w-24 h-[1px] bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {services.map(({ title, icon: Icon, description }, index) => (
            <div key={index} className="srv-card flex flex-col">
              <div className="srv-icon mb-6 bg-white/5 w-20 h-20 rounded-2xl flex items-center justify-center border border-white/10 hover:border-accent/40 transition-colors duration-300">
                <Icon size={40} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{title}</h3>
              <p className="text-white/60 leading-relaxed mb-8 flex-grow">{description}</p>
              <a
                href="#contact"
                className="srv-link relative inline-flex items-center text-accent font-bold hover:text-white transition-colors group"
              >
                Get a Quote
                <ArrowRight
                  size={18}
                  className="ml-2 transform group-hover:translate-x-1 transition-transform"
                />
                <span className="srv-link-line absolute bottom-0 left-0 h-[1px] w-full bg-accent origin-left scale-x-0" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
