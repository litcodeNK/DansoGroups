import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

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

const checks = [
  'Technology Consultancy',
  'Maintenance And Support',
  'We Provide Best Services',
  'Requirements Gathering',
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — overlapping images */}
          <div className="relative h-[520px]">
            {/* Large circle behind */}
            <div
              className="absolute left-0 top-10 w-72 h-72 rounded-full"
              style={{ backgroundColor: '#EEF2FF' }}
            />
            {/* Dot grid decoration */}
            <div className="absolute right-8 top-8 grid grid-cols-5 gap-1.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: '#CBD5E1' }}
                />
              ))}
            </div>
            {/* Main big image */}
            <div className="absolute left-8 top-16 w-64 h-80 overflow-hidden rounded-lg shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=600&auto=format&fit=crop"
                alt="Professional at work"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
            {/* Blue accent bar behind main image */}
            <div
              className="absolute left-4 top-14 w-8 h-80 rounded-lg"
              style={{ backgroundColor: '#2D5BE3' }}
            />
            {/* Secondary smaller image */}
            <div className="absolute right-4 bottom-12 w-52 h-44 overflow-hidden rounded-lg shadow-xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop"
                alt="Team collaboration"
                fill
                className="object-cover"
                sizes="208px"
              />
            </div>
            {/* Small blue square accent */}
            <div
              className="absolute left-64 bottom-28 w-10 h-10"
              style={{ backgroundColor: '#2D5BE3' }}
            />
          </div>

          {/* Right — text content */}
          <div>
            <SectionBadge>Who We Are</SectionBadge>

            <h2 className="text-4xl font-extrabold leading-tight mb-5" style={{ color: '#0D1B2A' }}>
              Ensuring Your Success
              <br />
              Through Reliable IT Solutions
            </h2>

            <p className="text-base leading-relaxed mb-8" style={{ color: '#64748B' }}>
              Danso Group of Companies is a pan-African technology firm headquartered in Accra, Ghana.
              We build software, secure infrastructure, and deliver IT solutions that help businesses
              grow in an increasingly digital world. Our engineers and consultants bring deep expertise
              and a genuine understanding of the African business landscape.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {checks.map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <CheckCircle2 size={18} style={{ color: '#2D5BE3' }} className="shrink-0" />
                  <span className="text-sm font-medium" style={{ color: '#334155' }}>
                    {c}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA + signature row */}
            <div className="flex items-center gap-8">
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-white text-sm font-bold px-7 py-3.5 transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#2D5BE3' }}
              >
                Explore More <span className="text-base">→</span>
              </a>
              <div style={{ fontFamily: 'cursive', fontSize: '1.6rem', color: '#0D2A55', opacity: 0.7 }}>
                Signature
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
