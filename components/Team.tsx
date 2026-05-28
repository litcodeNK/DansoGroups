import Image from 'next/image';
import { User, ArrowRight } from 'lucide-react';

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

const team = [
  {
    name: 'Kwame Asante',
    role: 'Lead Developer',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop',
  },
  {
    name: 'Abena Mensah',
    role: 'Customer Support',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
  },
  {
    name: 'Emmanuel Darko',
    role: 'UI/UX Designer',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&auto=format&fit=crop',
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <div className="flex justify-center">
            <SectionBadge>Our Team</SectionBadge>
          </div>
          <h2 className="text-4xl font-extrabold" style={{ color: '#0D1B2A' }}>
            Our Leadership Team
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map(({ name, role, img }) => (
            <div
              key={name}
              className="bg-white rounded-xl overflow-hidden flex flex-col group hover:shadow-xl transition-shadow"
              style={{ border: '1px solid #E2E8F0' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '260px' }}>
                <Image
                  src={img}
                  alt={name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>

              {/* Icon badge */}
              <div className="px-6 -mt-6 relative z-10">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-sm shadow-lg"
                  style={{ backgroundColor: '#2D5BE3' }}
                >
                  <User size={26} className="text-white" />
                </div>
              </div>

              {/* Body */}
              <div className="px-6 pt-3 pb-7 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-1" style={{ color: '#0D1B2A' }}>
                  {name}
                </h3>
                <p className="text-sm mb-5" style={{ color: '#64748B' }}>
                  {role}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-80"
                  style={{ color: '#2D5BE3' }}
                >
                  View Profile <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative circuit dots */}
        <div className="flex justify-end mt-8 opacity-30">
          <svg width="160" height="60" viewBox="0 0 160 60" fill="none">
            <circle cx="10" cy="30" r="3" fill="#2D5BE3" />
            <line x1="13" y1="30" x2="40" y2="30" stroke="#2D5BE3" strokeWidth="1" />
            <circle cx="40" cy="30" r="3" fill="#2D5BE3" />
            <line x1="43" y1="30" x2="70" y2="10" stroke="#2D5BE3" strokeWidth="1" />
            <circle cx="70" cy="10" r="3" fill="#2D5BE3" />
            <line x1="73" y1="10" x2="110" y2="10" stroke="#2D5BE3" strokeWidth="1" />
            <circle cx="110" cy="10" r="3" fill="#2D5BE3" />
            <line x1="110" y1="13" x2="110" y2="50" stroke="#2D5BE3" strokeWidth="1" />
            <circle cx="110" cy="50" r="3" fill="#2D5BE3" />
            <line x1="113" y1="50" x2="155" y2="50" stroke="#2D5BE3" strokeWidth="1" />
            <circle cx="155" cy="50" r="5" fill="none" stroke="#2D5BE3" strokeWidth="1.5" />
            <rect cx="40" cy="30" x="36" y="26" width="8" height="8" fill="#2D5BE3" opacity="0.4" />
          </svg>
        </div>
      </div>
    </section>
  );
}
