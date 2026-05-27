'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

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

const cases = [
  {
    category: 'Security',
    title: 'Network Security',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
  },
  {
    category: 'Solution',
    title: 'IT Management',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
  },
  {
    category: 'Technology',
    title: 'Platform Integration',
    img: 'https://images.unsplash.com/photo-1573495612937-f01934eeaaa7?q=80&w=600&auto=format&fit=crop',
  },
  {
    category: 'Solution',
    title: 'Web Development',
    img: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=600&auto=format&fit=crop',
  },
  {
    category: 'Cloud',
    title: 'Cloud Migration',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
  },
  {
    category: 'Mobile',
    title: 'Mobile App Launch',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop',
  },
];

const VISIBLE = 4;

export function CaseStudies() {
  const [start, setStart] = useState(0);

  const canPrev = start > 0;
  const canNext = start < cases.length - VISIBLE;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SectionBadge>From Our Case Studies</SectionBadge>
            <h2 className="text-4xl font-extrabold" style={{ color: '#0D1B2A' }}>
              We Delivered Best Solution
            </h2>
          </div>
          <a
            href="#"
            className="shrink-0 flex items-center gap-2 text-white text-sm font-bold px-7 py-3.5 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#2D5BE3' }}
          >
            View All Case <span className="text-base">→</span>
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cases.slice(start, start + VISIBLE).map(({ category, title, img }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-lg group"
              style={{ height: '340px' }}
            >
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width:768px) 50vw, 25vw"
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(5,12,30,0.85) 0%, rgba(5,12,30,0.2) 60%, transparent 100%)',
                }}
              />
              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs font-semibold mb-1.5" style={{ color: '#7BA7FF' }}>
                  {category}
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-base">{title}</h3>
                  <button
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors hover:bg-white/20"
                    style={{ backgroundColor: '#2D5BE3' }}
                    aria-label={`View ${title}`}
                  >
                    <ArrowRight size={15} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot pagination */}
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: cases.length - VISIBLE + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setStart(i)}
              aria-label={`Page ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === start ? '28px' : '10px',
                height: '10px',
                backgroundColor: i === start ? '#2D5BE3' : '#CBD5E1',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
