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

const products = [
  { label: 'DansoSecure',  img: '/danso-secure-hero.jpg',    accent: '#2D5BE3' },
  { label: 'Danso Mall',   img: '/danso-mall-home.jpg',       accent: '#0891B2' },
  { label: 'PrimeTrack',   img: '/primetrack-clockin.jpg',    accent: '#059669' },
  { label: 'DansoSecure',  img: '/danso-secure-services.jpg', accent: '#2D5BE3' },
  { label: 'Danso Mall',   img: '/danso-mall-categories.jpg', accent: '#0891B2' },
  { label: 'PrimeTrack',   img: '/primetrack-sales.jpg',      accent: '#059669' },
];

function OfferingsSection() {
  const ticker = [...products, ...products];

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

        {/* Scrolling ticker */}
        <div className="overflow-hidden">
          <div
            style={{
              display: 'flex',
              gap: '16px',
              width: 'max-content',
              animation: 'scroll-left 18s linear infinite',
            }}
          >
            {ticker.map((p, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-4 py-8 rounded-lg cursor-pointer group transition-colors shrink-0"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  width: '160px',
                }}
              >
                <div
                  className="w-16 h-16 rounded-full overflow-hidden group-hover:scale-110 transition-transform"
                  style={{ border: `2px solid ${p.accent}` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={p.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-bold text-sm text-center">{p.label}</span>
              </div>
            ))}
          </div>
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
