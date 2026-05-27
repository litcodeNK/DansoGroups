'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { items } from '@/lib/items';

export function Books() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const books = items.filter((item) => item.type === 'book');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.books-header', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.books-header', start: 'top 85%' },
      });
      gsap.from('.books-line', {
        scaleX: 0,
        transformOrigin: 'center',
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.books-line', start: 'top 85%' },
      });

      // Book cover — slides in from left
      gsap.from('.book-cover', {
        x: -80,
        opacity: 0,
        rotation: -6,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.book-cover', start: 'top 80%' },
      });

      // Book details — slides in from right
      gsap.from('.book-detail', {
        x: 80,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.book-detail', start: 'top 80%' },
      });

      // Badge + title pop
      gsap.from('.book-badge', {
        scale: 0.7,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.book-badge', start: 'top 85%' },
      });

      // Buttons stagger
      gsap.from('.book-btn', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.book-btn', start: 'top 90%' },
      });

      // 3-D tilt on book cover via mouse move
      document.querySelectorAll<HTMLElement>('.book-tilt').forEach((el) => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
          const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -18;
          gsap.to(el, {
            rotateY: x,
            rotateX: y,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 600,
          });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="books" ref={sectionRef} className="bg-light text-dark py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center mb-20">
          <h2 className="books-header text-4xl font-serif font-bold mb-4">RESOURCES</h2>
          <div className="books-line w-24 h-[1px] bg-dark/20 mx-auto" />
        </div>

        <div className="space-y-24">
          {books.map((book) => (
            <div key={book.slug} className="flex flex-col md:flex-row gap-12 items-center">
              {/* Cover */}
              <div
                className="book-cover book-tilt w-full md:w-1/3 lg:w-1/4 shrink-0 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => router.push(`/app/${book.slug}`)}
              >
                <div className="relative shadow-2xl">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-full h-auto object-cover rounded-r-md border-l-4 border-dark/10"
                  />
                  <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent" />
                </div>
              </div>

              {/* Details */}
              <div className="book-detail w-full md:w-2/3 lg:w-3/4">
                <p className="book-badge inline-block text-accent font-bold uppercase tracking-widest mb-2 text-sm">
                  A New Bestseller
                </p>
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight cursor-pointer hover:text-accent transition-colors"
                  onClick={() => router.push(`/app/${book.slug}`)}
                >
                  {book.name}
                </h3>
                <p className="text-xl text-dark/60 font-serif italic mb-6">By {book.author}</p>
                <p className="text-lg text-dark/80 leading-relaxed mb-10 max-w-3xl">
                  {book.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={book.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-btn bg-accent hover:bg-accent/90 text-white font-bold py-3 px-8 rounded-full transition-colors"
                  >
                    Buy Now
                  </a>
                  <button
                    onClick={() => router.push(`/app/${book.slug}`)}
                    className="book-btn bg-transparent border-2 border-dark text-dark hover:bg-dark hover:text-white font-bold py-3 px-8 rounded-full transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
