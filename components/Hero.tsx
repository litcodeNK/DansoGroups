'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { items } from '@/lib/items';
import { PhoneMockup } from './PhoneMockup';
import { CyclingBackground } from './CyclingBackground';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2067&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
];

export function Hero() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  const danso = items.find((i) => i.slug === 'danso-mall')!;
  const book  = items.find((i) => i.slug === 'future-of-african-tech')!;
  const prime = items.find((i) => i.slug === 'primetrack')!;
  const showcase = [
    { item: prime, scale: 0.78, y: 40, rotate: -4, cls: 'phone-0' },
    { item: book,  scale: 1.00, y: 0,  rotate:  0, cls: 'phone-1' },
    { item: danso, scale: 0.78, y: 40, rotate:  4, cls: 'phone-2' },
  ];

  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Scroll indicator dots
      tl.from('.hero-dot', {
        scaleY: 0,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(2)',
      });

      // Headline — each word clips up from below
      tl.from(
        '.hero-word',
        { y: 90, opacity: 0, stagger: 0.1, duration: 0.85, ease: 'expo.out' },
        '-=0.3'
      );

      // Tagline
      tl.from(
        '.hero-tagline',
        { y: 30, opacity: 0, duration: 0.7, ease: 'expo.out' },
        '-=0.4'
      );

      // Body copy
      tl.from(
        '.hero-body',
        { y: 20, opacity: 0, duration: 0.6, ease: 'expo.out' },
        '-=0.35'
      );

      // CTA
      tl.from(
        '.hero-cta',
        { scale: 0.85, opacity: 0, duration: 0.5, ease: 'back.out(2)' },
        '-=0.3'
      );

      // Phones — fly up from below with slight rotation
      tl.from(
        '.phone-0',
        { y: 120, opacity: 0, rotation: -10, duration: 1.1, ease: 'expo.out' },
        '-=0.9'
      );
      tl.from(
        '.phone-1',
        { y: 80, opacity: 0, duration: 1, ease: 'expo.out' },
        '<0.15'
      );
      tl.from(
        '.phone-2',
        { y: 120, opacity: 0, rotation: 10, duration: 1.1, ease: 'expo.out' },
        '<0.1'
      );

      // Perpetual gentle float on phones
      gsap.to('.phone-0, .phone-2', {
        y: '+=10',
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
      gsap.to('.phone-1', {
        y: '-=8',
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });

      // Scroll-triggered parallax on hero section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set('.hero-content', { y: self.progress * 60 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-0 pb-12 lg:pb-0"
    >
      <CyclingBackground
        images={HERO_IMAGES}
        interval={5000}
        overlay="bg-gradient-to-r from-dark via-dark/85 to-dark/40"
      />

      {/* Scroll dots */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`hero-dot rounded-full transition-all duration-500 ${
              i === 3
                ? 'w-4 h-4 border-2 border-accent bg-transparent'
                : 'w-1.5 h-1.5 bg-white/30'
            }`}
          />
        ))}
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 -z-10" />
      </div>

      <div className="hero-content container mx-auto px-6 lg:px-24 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-4 overflow-hidden">
            {'Innovating'.split(' ').map((w, i) => (
              <span key={i} className="hero-word inline-block font-normal mr-4">{w}</span>
            ))}
            <br />
            {'the Future'.split(' ').map((w, i) => (
              <span key={i} className="hero-word inline-block font-extrabold mr-4">{w}</span>
            ))}
          </h1>

          <p className="hero-tagline text-2xl md:text-3xl font-serif text-white/90 mb-6">
            Software. Security. Solutions.
          </p>
          <p className="hero-body text-lg text-white/60 mb-10 max-w-lg">
            Empowering African businesses with world-class technology to scale, secure, and
            succeed in the digital era.
          </p>
          <button
            onClick={scrollToProducts}
            className="hero-cta bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-accent/20"
          >
            Explore Our Ecosystem
          </button>
        </div>

        {/* Phones */}
        <div className="flex-1 w-full max-w-xl lg:max-w-2xl relative">
          <div className="relative flex items-end justify-center gap-0 md:gap-2">
            {showcase.map(({ item, scale, y, rotate, cls }) => (
              <div
                key={item.slug}
                className={`${cls} origin-bottom flex-1 max-w-[200px]`}
                style={{ transform: `translateY(${y}px) rotate(${rotate}deg) scale(${scale})` }}
              >
                <PhoneMockup
                  alt={item.name}
                  onClick={() => router.push(`/app/${item.slug}`)}
                />
                <div className="mt-2 text-center">
                  <div className="inline-block px-2 py-0.5 bg-accent/20 text-accent rounded text-[9px] font-bold uppercase tracking-widest mb-1">
                    {item.type}
                  </div>
                  <h3 className="text-white text-sm md:text-base font-semibold">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
