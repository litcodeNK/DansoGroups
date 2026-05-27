import { PageHero } from '@/components/PageHero';
import { About } from '@/components/About';
import { Partners } from '@/components/Partners';

function SectionBadge({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
        <rect x="0" y="2" width="9" height="8" rx="2" fill={light ? 'rgba(255,255,255,0.9)' : '#2D5BE3'} />
        <rect x="13" y="2" width="9" height="8" rx="2" fill={light ? 'rgba(255,255,255,0.4)' : '#2D5BE3'} opacity={light ? 1 : 0.4} />
      </svg>
      <span
        className="text-xs font-bold uppercase tracking-[3px]"
        style={{ color: light ? 'rgba(255,255,255,0.85)' : '#2D5BE3' }}
      >
        {children}
      </span>
    </div>
  );
}

const offerings = [
  { icon: '🌐', label: 'Website' },
  { icon: '📱', label: 'Android' },
  { icon: '🍎', label: 'IOS' },
  { icon: '⌚', label: 'Watch' },
  { icon: '📺', label: 'Tv' },
  { icon: '🚀', label: 'IOT' },
];

function OfferingsSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: '#060D18' }}
    >
      {/* Circuit overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#2D5BE3 0,#2D5BE3 1px,transparent 0,transparent 50%),' +
            'repeating-linear-gradient(90deg,#2D5BE3 0,#2D5BE3 1px,transparent 0,transparent 50%)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <SectionBadge light>Our Offering</SectionBadge>
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Enhance And Pioneer Using
              <br />
              Technology Trends
            </h2>
          </div>
          <a
            href="/services"
            className="flex items-center gap-2 text-white text-sm font-bold px-7 py-3.5 transition-opacity hover:opacity-80 shrink-0"
            style={{ backgroundColor: '#2D5BE3' }}
          >
            Explore More <span className="text-base">→</span>
          </a>
        </div>

        {/* Icon cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {offerings.map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-4 py-8 rounded-lg transition-colors hover:border-blue-500 cursor-pointer group"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                style={{ backgroundColor: 'rgba(45,91,227,0.18)' }}
              >
                {icon}
              </div>
              <span className="text-white font-bold text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" breadcrumb="About Us" />
      <About />
      <OfferingsSection />
      <Partners />
    </>
  );
}
