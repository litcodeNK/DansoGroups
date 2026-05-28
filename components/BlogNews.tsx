'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { User, MessageCircle, ArrowRight } from 'lucide-react';
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

const posts = [
  {
    day: '10', month: 'Dec',
    title: 'Necessity May Give us Best Virtual Court',
    img: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=700&auto=format&fit=crop',
    comments: '0 Comments',
  },
  {
    day: '12', month: 'Dec',
    title: 'Tackling the Changes of Retail Industry',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=700&auto=format&fit=crop',
    comments: '0 Comments',
  },
  {
    day: '15', month: 'Dec',
    title: 'Easy and Most Powerful Server and Platform',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=700&auto=format&fit=crop',
    comments: '0 Comments',
  },
];

export function BlogNews() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-badge', {
        x: -40, opacity: 0, duration: 0.75, ease: 'expo.out',
        scrollTrigger: { trigger: '.blog-badge', start: 'top 85%' },
      });
      gsap.from('.blog-heading', {
        clipPath: 'inset(100% 0 0 0)', y: 24, opacity: 0,
        duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.blog-heading', start: 'top 85%' },
      });
      gsap.from('.blog-cta', {
        x: 40, opacity: 0, duration: 0.75, ease: 'expo.out',
        scrollTrigger: { trigger: '.blog-cta', start: 'top 88%' },
      });
      gsap.from('.blog-card', {
        y: 80, opacity: 0, rotation: 1.5, duration: 0.9,
        stagger: 0.16, ease: 'expo.out', transformOrigin: 'center bottom',
        scrollTrigger: { trigger: '.blog-card', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      <FloatingShapes variant="light" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="blog-badge"><SectionBadge>Blog &amp; News</SectionBadge></div>
            <h2 className="blog-heading text-4xl font-extrabold" style={{ color: '#0D1B2A' }}>
              Explore Blogs And News
            </h2>
          </div>
          <a
            href="/blog"
            className="blog-cta hidden md:flex items-center gap-2 text-white text-sm font-bold px-7 py-3.5 transition-opacity hover:opacity-90 shrink-0"
            style={{ backgroundColor: '#0D2A55' }}
          >
            View All News <span className="text-base">→</span>
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((post, i) => (
            <article
              key={i}
              className="blog-card bg-white rounded-tl-3xl rounded-br-3xl overflow-hidden flex flex-col group hover:shadow-lg transition-shadow"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              </div>
              <div className="px-6 -mt-6 relative z-10">
                <div className="w-14 h-14 flex flex-col items-center justify-center rounded-sm shadow-lg" style={{ backgroundColor: '#2D5BE3' }}>
                  <p className="text-xl font-extrabold text-white leading-none">{post.day}</p>
                  <p className="text-[10px] font-semibold text-white mt-0.5">{post.month}</p>
                </div>
              </div>
              <div className="px-6 pt-3 pb-7 flex flex-col flex-1">
                <div className="flex items-center gap-5 mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#64748B' }}>
                    <User size={12} /> By Admin
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#64748B' }}>
                    <MessageCircle size={12} /> {post.comments}
                  </span>
                </div>
                <hr style={{ borderColor: '#E2E8F0' }} className="mb-3" />
                <h3 className="font-bold text-base leading-snug mb-5 flex-1 line-clamp-2" style={{ color: '#0D1B2A' }}>
                  {post.title}
                </h3>
                <a href="/blog" className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-70" style={{ color: '#2D5BE3' }}>
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
