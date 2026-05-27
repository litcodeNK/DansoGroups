'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Download } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { items } from '@/lib/items';
import { CyclingBackground } from './CyclingBackground';

const PRODUCTS_IMAGES = [
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
];

export function Products() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const apps = items.filter((item) => item.type === 'app');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header clip-path reveal
      gsap.from('.products-header', {
        clipPath: 'inset(100% 0 0 0)',
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.products-header',
          start: 'top 85%',
        },
      });

      // Underline width expand
      gsap.from('.products-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.products-line',
          start: 'top 85%',
        },
      });

      // Sub-copy
      gsap.from('.products-sub', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.products-sub',
          start: 'top 88%',
        },
      });

      // Cards staggered
      gsap.from('.product-card', {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.product-card',
          start: 'top 85%',
        },
      });

      // Card image parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set('.product-img', { y: self.progress * -30 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="relative text-white py-24 overflow-hidden">
      <CyclingBackground
        images={PRODUCTS_IMAGES}
        interval={4000}
        overlay="bg-gradient-to-b from-dark via-dark/95 to-dark"
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-24">
        <div className="text-center mb-20">
          <h2 className="products-header text-4xl font-serif font-bold mb-4">OUR PRODUCTS</h2>
          <div className="products-line w-24 h-[1px] bg-accent mx-auto" />
          <p className="products-sub text-white/60 mt-6 max-w-xl mx-auto">
            Digital tools built for the African market — powerful, reliable, and designed for scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {apps.map((app) => (
            <div
              key={app.slug}
              className="product-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={app.image}
                  alt={app.name}
                  className="product-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 h-56 bg-gradient-to-b from-transparent to-dark/80" />
              </div>

              <div className="p-8">
                <div className="inline-block px-2 py-0.5 bg-accent/20 text-accent rounded text-[10px] font-bold uppercase tracking-widest mb-3">
                  {app.type}
                </div>
                <h3 className="text-2xl font-bold mb-3">{app.name}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{app.description}</p>

                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => router.push(`/app/${app.slug}`)}
                    className="inline-flex items-center text-accent font-bold hover:text-white transition-colors group/btn"
                  >
                    Learn More
                    <ArrowRight
                      size={18}
                      className="ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                  {app.playStoreUrl && (
                    <a
                      href={app.playStoreUrl}
                      className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                    >
                      <Download size={14} />
                      Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
