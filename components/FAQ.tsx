'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';

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

const faqs = [
  {
    q: 'Where should I incorporate my business?',
    a: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.',
  },
  {
    q: 'What happens during the free trial?',
    a: 'During the free trial you get full access to all our services for 14 days with no credit card required. You can explore the platform, run tests, and consult with our team to ensure it is the right fit.',
  },
  {
    q: 'What is included in your services?',
    a: 'Our services cover software development, cybersecurity, IT consultancy, mobile app development, database management, cloud infrastructure, and 24/7 technical support.',
  },
  {
    q: 'What type of company is measured?',
    a: 'We serve businesses of all sizes — from startups and SMEs to large enterprises — across various industries including finance, logistics, healthcare, and e-commerce.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-24 overflow-hidden" style={{ backgroundColor: '#F3F6FF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — decorative image */}
          <div className="relative hidden lg:block h-[460px]">
            {/* Blue circle behind person */}
            <div
              className="absolute left-10 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full"
              style={{ backgroundColor: '#C7D7FF' }}
            />
            {/* Wavy decoration */}
            <div className="absolute left-0 top-16">
              <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
                <path
                  d="M30 8 C15 22, 45 36, 30 50 C15 64, 45 78, 30 92"
                  stroke="#2D5BE3"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            {/* Person image */}
            <div className="absolute left-16 top-12 w-72 h-[380px] overflow-hidden rounded-t-full">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop"
                alt="FAQ person"
                fill
                className="object-cover object-top"
                sizes="288px"
              />
            </div>
          </div>

          {/* Right — accordion */}
          <div className="relative">
            {/* Decorative circuit pattern top-right */}
            <div className="absolute -top-12 -right-12 opacity-20 hidden xl:block">
              <svg width="180" height="160" viewBox="0 0 180 160" fill="none">
                <circle cx="20" cy="20" r="4" fill="#2D5BE3" />
                <line x1="24" y1="20" x2="60" y2="20" stroke="#2D5BE3" strokeWidth="1.5" />
                <rect x="56" y="16" width="8" height="8" fill="#2D5BE3" opacity="0.5" />
                <line x1="64" y1="20" x2="90" y2="50" stroke="#2D5BE3" strokeWidth="1.5" />
                <circle cx="90" cy="50" r="4" fill="#2D5BE3" />
                <line x1="94" y1="50" x2="140" y2="50" stroke="#2D5BE3" strokeWidth="1.5" />
                <circle cx="140" cy="50" r="4" fill="#2D5BE3" />
                <line x1="140" y1="54" x2="140" y2="100" stroke="#2D5BE3" strokeWidth="1.5" />
                <rect x="136" y="96" width="8" height="8" fill="#2D5BE3" opacity="0.5" />
                <line x1="144" y1="100" x2="175" y2="100" stroke="#2D5BE3" strokeWidth="1.5" />
                <circle cx="175" cy="100" r="5" fill="none" stroke="#2D5BE3" strokeWidth="1.5" />
              </svg>
            </div>

            <SectionBadge>FAQ</SectionBadge>
            <h2 className="text-4xl font-extrabold mb-8" style={{ color: '#0D1B2A' }}>
              Most Common Question?
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden"
                  style={{ border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpen(open === i ? -1 : i)}
                  >
                    <span
                      className="text-sm font-semibold pr-4"
                      style={{ color: open === i ? '#2D5BE3' : '#0D1B2A' }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className="w-7 h-7 rounded flex items-center justify-center shrink-0"
                      style={{ backgroundColor: open === i ? '#2D5BE3' : '#EEF2FF' }}
                    >
                      {open === i ? (
                        <Minus size={14} className="text-white" />
                      ) : (
                        <Plus size={14} style={{ color: '#2D5BE3' }} />
                      )}
                    </span>
                  </button>
                  {open === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
