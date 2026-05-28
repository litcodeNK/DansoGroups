import Image from 'next/image';
import { Shield, ShoppingBag, Smartphone, BookOpen, ArrowRight } from 'lucide-react';

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
    category: 'Cybersecurity',
    title: 'DansoSecure',
    desc: "Ghana's first all-in-one employee verification, CCTV, and legal contract platform.",
    accentColor: '#2D5BE3',
    img: '/danso-secure-services.jpg',
    icon: Shield,
  },
  {
    category: 'E-Commerce',
    title: 'Danso Mall',
    desc: 'A marketplace for phones, fashion, electronics, gaming, and appliances across Ghana.',
    accentColor: '#0891B2',
    img: '/danso-mall-categories.jpg',
    icon: ShoppingBag,
  },
  {
    category: 'Mobile App',
    title: 'PrimeTrack',
    desc: 'Real-time employee attendance with GPS clock-in, location verification, and sales recording.',
    accentColor: '#059669',
    img: '/primetrack-sales.jpg',
    icon: Smartphone,
  },
  {
    category: 'Publishing',
    title: 'Be A Ghanaian',
    desc: 'A manifesto for mind liberation and national development by Asante Danso — 2026.',
    accentColor: '#D4A843',
    img: '/book-be-a-ghanaian-cover.jpg',
    icon: BookOpen,
  },
];

export function CaseStudies() {
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
            View All Cases <span className="text-base">→</span>
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {cases.map(({ category, title, desc, accentColor, img, icon: Icon }) => (
            <div
              key={title}
              className="bg-white rounded-xl overflow-hidden flex flex-col group hover:shadow-xl transition-shadow"
              style={{ border: '1px solid #E2E8F0' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '180px' }}>
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: accentColor }} />
              </div>

              {/* Icon badge */}
              <div className="px-5 -mt-6 relative z-10">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-sm shadow-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  <Icon size={24} className="text-white" />
                </div>
              </div>

              {/* Body */}
              <div className="px-5 pt-3 pb-6 flex flex-col flex-1">
                <p className="text-xs font-semibold mb-1" style={{ color: accentColor }}>
                  {category}
                </p>
                <h3 className="font-bold text-base mb-2" style={{ color: '#0D1B2A' }}>
                  {title}
                </h3>
                <p className="text-xs leading-relaxed flex-1 line-clamp-3" style={{ color: '#64748B' }}>
                  {desc}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-bold mt-4 transition-opacity hover:opacity-70"
                  style={{ color: accentColor }}
                >
                  View Case Study <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
