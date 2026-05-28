'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Package, Smartphone, ArrowRight } from 'lucide-react';

/* ─── Slide types ───────────────────────────────────────── */

type RegularSlide = {
  type?: 'regular';
  tagline: string;
  title: string;
  subtitle: string;
  bg: string;
};

type BookSlide = {
  type: 'book';
  bg: string;
  badge: string;
  title: string;
  author: string;
  quote: string;
  rating: number;
  reviews: number;
  hardcopyPrice: string;
  softcopyPrice: string;
  cover: string;
  bookHref: string;
};

type AppSlide = {
  type: 'app';
  bg: string;
  badge: string;
  accentColor: string;
  accentLight: string;
  appName: string;
  tagline: string;
  subtitle: string;
  features: string[];
  cta: string;
  ctaHref: string;
  mockupImg: string;
};

type Slide = RegularSlide | BookSlide | AppSlide;

const slides: Slide[] = [
  {
    tagline: 'TECHNOLOGY SOLUTIONS CONSULTANCY',
    title: 'We Convert Concepts\nInto Technology',
    subtitle:
      'Empowering African businesses with world-class software, security, and solutions for a digital future.',
    bg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop',
  },
  {
    tagline: 'DRIVING DIGITAL TRANSFORMATION',
    title: 'Innovating Africa\nOne Solution at a Time',
    subtitle:
      'From Accra to the world — we build, secure, and scale technology that matters for African enterprises.',
    bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop',
  },
  {
    type: 'app',
    bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop',
    badge: 'DANSO SECURE',
    accentColor: '#2D5BE3',
    accentLight: '#93B4FF',
    appName: 'DansoSecure',
    tagline: 'Hire with Confidence.\nProtect Your Business.',
    subtitle:
      "Ghana's first all-in-one employee verification, CCTV installation, and legal contract platform.",
    features: ['Background Checks', 'Employment Contracts', 'CCTV Installation', 'Digital Signatures'],
    cta: 'Request Background Check',
    ctaHref: '/services',
    mockupImg: '/danso-secure-hero.jpg',
  },
  {
    type: 'app',
    bg: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1920&auto=format&fit=crop',
    badge: 'DANSO MALL',
    accentColor: '#0891B2',
    accentLight: '#67E8F9',
    appName: 'DansoMall',
    tagline: 'Shop Everything.\nDelivered to You.',
    subtitle:
      "Ghana's marketplace for phones, fashion, electronics, gaming, appliances, and more. Import-grade quality.",
    features: ['10,000+ Products', 'Flash Sales Daily', 'MoMo Payments', 'Nationwide Delivery'],
    cta: 'Browse the Mall',
    ctaHref: '/products',
    mockupImg: '/danso-mall-home.jpg',
  },
  {
    type: 'app',
    bg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop',
    badge: 'PRIMETRACK',
    accentColor: '#059669',
    accentLight: '#6EE7B7',
    appName: 'PrimeTrack',
    tagline: 'Track Your Team.\nGrow Your Sales.',
    subtitle:
      'Real-time employee clock-in, GPS location verification, and daily sales recording — all in one app.',
    features: ['GPS Clock In/Out', 'Sales Recording', 'Location Tracking', 'Daily Reports'],
    cta: 'Get PrimeTrack',
    ctaHref: '/products',
    mockupImg: '/primetrack-clockin.jpg',
  },
  {
    type: 'book',
    bg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1920&auto=format&fit=crop',
    badge: '✦  NEW RELEASE  ·  2026',
    title: 'Be A\nGhanaian',
    author: 'Asante Danso',
    quote:
      '"Read this with an open heart. Question everything. Then go build something."',
    rating: 5.0,
    reviews: 18,
    hardcopyPrice: 'GH₵ 85',
    softcopyPrice: 'GH₵ 45',
    cover: '/book-be-a-ghanaian-cover.jpg',
    bookHref: '/books',
  },
];

/* ─── Phone mockup ──────────────────────────────────────── */

function PhoneMockup({
  img,
  accentColor,
  appName,
  features,
}: {
  img: string;
  accentColor: string;
  appName: string;
  features: string[];
}) {
  return (
    <div
      className="relative shrink-0"
      style={{
        filter: `drop-shadow(0 40px 80px ${accentColor}55) drop-shadow(0 12px 32px rgba(0,0,0,0.75))`,
      }}
    >
      <div
        style={{
          width: '210px',
          background: 'linear-gradient(160deg, #1c2333, #0d1117)',
          borderRadius: '40px',
          border: '8px solid #232c3d',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        {/* Status bar + notch */}
        <div
          style={{
            background: '#0d1117',
            paddingTop: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              padding: '0 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '9px', fontWeight: 700 }}>
              9:41
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <svg width="10" height="8" viewBox="0 0 12 10" fill="rgba(255,255,255,0.65)">
                <rect x="0" y="3" width="2" height="7" rx="0.5"/>
                <rect x="3" y="2" width="2" height="8" rx="0.5"/>
                <rect x="6" y="0" width="2" height="10" rx="0.5"/>
                <rect x="9" y="1" width="2" height="9" rx="0.5"/>
              </svg>
              <svg width="11" height="8" viewBox="0 0 14 10" fill="none">
                <rect x="0.5" y="0.5" width="11" height="8" rx="2" stroke="rgba(255,255,255,0.65)" strokeWidth="1"/>
                <rect x="2" y="2" width="7" height="5" rx="1" fill="rgba(255,255,255,0.65)"/>
                <rect x="12" y="3" width="1.5" height="3.5" rx="0.75" fill="rgba(255,255,255,0.4)"/>
              </svg>
            </div>
          </div>
          {/* Notch */}
          <div
            style={{
              background: '#0d1117',
              borderRadius: '0 0 14px 14px',
              width: '64px',
              height: '18px',
            }}
          />
        </div>

        {/* App header */}
        <div
          style={{
            background: accentColor,
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              color: '#fff',
              fontWeight: 900,
              fontSize: '12px',
              letterSpacing: '1.5px',
            }}
          >
            {appName.toUpperCase()}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 1 ? '12px' : '16px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.85)',
                  borderRadius: '1px',
                }}
              />
            ))}
          </div>
        </div>

        {/* Screen */}
        <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
          <Image src={img} alt={appName} fill className="object-cover" sizes="210px" />
          {/* Bottom feature overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)',
              padding: '20px 12px 12px',
            }}
          >
            {features.slice(0, 2).map((f, i) => (
              <div
                key={f}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  marginBottom: i === 0 ? '6px' : 0,
                }}
              >
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5l2.5 2.5 3.5-4"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span style={{ color: '#fff', fontSize: '10px', fontWeight: 600 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Home indicator */}
        <div
          style={{
            background: '#0d1117',
            padding: '8px 0 10px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '3px',
              background: 'rgba(255,255,255,0.22)',
              borderRadius: '2px',
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Regular slide content ─────────────────────────────── */

function RegularContent({ slide, fade }: { slide: RegularSlide; fade: boolean }) {
  return (
    <div
      className="relative z-10 w-full text-center px-6 transition-opacity duration-500"
      style={{ opacity: fade ? 1 : 0 }}
    >
      <p
        className="text-sm font-semibold uppercase tracking-[4px] mb-6"
        style={{ color: 'rgba(255,255,255,0.65)' }}
      >
        {slide.tagline}
      </p>

      <h1
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
        style={{ whiteSpace: 'pre-line' }}
      >
        {slide.title}
      </h1>

      <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.65)' }}>
        {slide.subtitle}
      </p>

      <a
        href="/services"
        className="inline-flex items-center gap-3 text-white text-sm font-bold px-8 py-4 transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#2D5BE3' }}
      >
        Explore More
        <span
          className="w-5 h-5 border flex items-center justify-center text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.4)' }}
        >
          &#9633;
        </span>
      </a>
    </div>
  );
}

/* ─── App ad slide content ───────────────────────────────── */

function AppAdContent({ slide, fade }: { slide: AppSlide; fade: boolean }) {
  return (
    <div
      className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 transition-opacity duration-500"
      style={{ opacity: fade ? 1 : 0 }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-8">

        {/* Phone mockup */}
        <div className="shrink-0 order-2 lg:order-1">
          <PhoneMockup
            img={slide.mockupImg}
            accentColor={slide.accentColor}
            appName={slide.appName}
            features={slide.features}
          />
        </div>

        {/* Copy */}
        <div className="flex-1 text-white order-1 lg:order-2 text-center lg:text-left">

          {/* Badge */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
            <div className="h-px w-8 hidden lg:block" style={{ backgroundColor: slide.accentColor }} />
            <span
              className="text-xs font-extrabold uppercase tracking-[4px] px-3 py-1.5"
              style={{
                backgroundColor: `${slide.accentColor}22`,
                border: `1px solid ${slide.accentColor}55`,
                color: slide.accentLight,
              }}
            >
              ✦ {slide.badge}
            </span>
          </div>

          {/* Tagline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
            style={{ whiteSpace: 'pre-line' }}
          >
            {slide.tagline}
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg max-w-lg mx-auto lg:mx-0 mb-7"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {slide.subtitle}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 max-w-sm mx-auto lg:mx-0 mb-8">
            {slide.features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${slide.accentColor}30`,
                    border: `1px solid ${slide.accentColor}55`,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6l2.5 2.5 4.5-5"
                      stroke={slide.accentColor}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.82)' }}>
                  {f}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-sm font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: slide.accentColor }}
            >
              {slide.cta} <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-colors hover:bg-white/10"
              style={{ border: '2px solid rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.8)' }}
            >
              Get A Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Book ad slide content ──────────────────────────────── */

function BookAdContent({ slide, fade }: { slide: BookSlide; fade: boolean }) {
  return (
    <div
      className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 transition-opacity duration-500"
      style={{ opacity: fade ? 1 : 0 }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-8">

        {/* Book 3-D mockup */}
        <div className="shrink-0 order-2 lg:order-1 w-48 lg:w-56">
          <div
            className="relative"
            style={{
              filter:
                'drop-shadow(0 30px 60px rgba(212,168,67,0.35)) drop-shadow(0 10px 30px rgba(0,0,0,0.6))',
            }}
          >
            <div
              style={{
                transform: 'perspective(900px) rotateY(-14deg) rotateX(4deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Spine */}
              <div
                className="absolute top-0 left-0 bottom-0 w-5 z-10"
                style={{
                  background: 'linear-gradient(to right, #7A5C10, #D4A843, #B8870F)',
                  boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.45)',
                }}
              />
              {/* Cover */}
              <div
                className="ml-5 relative overflow-hidden"
                style={{ borderRadius: '0 3px 3px 0', height: '310px', width: '220px' }}
              >
                <Image
                  src={slide.cover}
                  alt={slide.title}
                  fill
                  className="object-cover object-center"
                  sizes="220px"
                  priority
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)',
                  }}
                />
              </div>
              {/* Shadow */}
              <div
                className="absolute -bottom-3 left-5 right-0 h-6 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)',
                  filter: 'blur(6px)',
                  transform: 'translateY(100%) scaleX(0.9)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Ad copy */}
        <div className="flex-1 text-white order-1 lg:order-2 text-center lg:text-left">

          {/* Badge */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
            <div className="h-px w-8 hidden lg:block" style={{ backgroundColor: '#D4A843' }} />
            <span
              className="text-xs font-extrabold uppercase tracking-[4px] px-3 py-1.5"
              style={{
                backgroundColor: 'rgba(212,168,67,0.15)',
                border: '1px solid rgba(212,168,67,0.4)',
                color: '#D4A843',
              }}
            >
              {slide.badge}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-3"
            style={{ fontFamily: 'Playfair Display, serif', whiteSpace: 'pre-line' }}
          >
            {slide.title}
          </h1>

          {/* Author */}
          <p className="text-base mb-4 font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
            By{' '}
            <span style={{ color: '#D4A843' }} className="font-bold">
              {slide.author}
            </span>
          </p>

          {/* Stars */}
          <div className="flex items-center gap-2 justify-center lg:justify-start mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} fill="#F59E0B" style={{ color: '#F59E0B' }} />
            ))}
            <span className="text-sm font-bold" style={{ color: '#F59E0B' }}>
              {slide.rating}
            </span>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              ({slide.reviews} reviews)
            </span>
          </div>

          {/* Quote */}
          <blockquote
            className="text-sm lg:text-base italic leading-relaxed mb-7 max-w-lg mx-auto lg:mx-0"
            style={{
              color: 'rgba(255,255,255,0.6)',
              borderLeft: '3px solid rgba(212,168,67,0.5)',
              paddingLeft: '16px',
            }}
          >
            {slide.quote}
          </blockquote>

          {/* Pricing */}
          <div className="flex items-center gap-6 justify-center lg:justify-start mb-8">
            <div className="flex items-center gap-2">
              <Package size={14} style={{ color: '#D4A843' }} />
              <span className="text-xs uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Hardcopy
              </span>
              <span
                className="text-lg font-extrabold"
                style={{ color: '#D4A843', fontFamily: 'Playfair Display, serif' }}
              >
                {slide.hardcopyPrice}
              </span>
            </div>
            <div className="w-px h-6" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <div className="flex items-center gap-2">
              <Smartphone size={14} style={{ color: '#D4A843' }} />
              <span className="text-xs uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>
                PDF
              </span>
              <span
                className="text-lg font-extrabold"
                style={{ color: '#D4A843', fontFamily: 'Playfair Display, serif' }}
              >
                {slide.softcopyPrice}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              href={slide.bookHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-sm font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#2D5BE3' }}
            >
              Order Your Copy <ArrowRight size={15} />
            </Link>
            <Link
              href={slide.bookHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-colors hover:bg-white/10"
              style={{ border: '2px solid rgba(212,168,67,0.6)', color: '#D4A843' }}
            >
              Preview a Chapter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Hero ─────────────────────────────────────────── */

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setFade(true);
      }, 400);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];
  const isBook = slide.type === 'book';
  const isApp = slide.type === 'app';

  function activeDotColor(idx: number) {
    const s = slides[idx];
    if (s.type === 'book') return '#D4A843';
    if (s.type === 'app') return (s as AppSlide).accentColor;
    return '#2D5BE3';
  }

  return (
    <section className="relative flex flex-col justify-center overflow-hidden min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-120px)]">

      {/* ── Keyframes injected directly so they always load ── */}
      <style>{`
        @keyframes hfloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-28px); }
        }
        @keyframes hsway {
          0%,100% { transform: translateY(0px) rotate(12deg); }
          25%     { transform: translateY(-20px) rotate(20deg); }
          75%     { transform: translateY(-10px) rotate(4deg); }
        }
        @keyframes hdrift {
          0%,100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33%     { transform: translateY(-22px) translateX(8px) rotate(8deg); }
          66%     { transform: translateY(-12px) translateX(-6px) rotate(-6deg); }
        }
        @keyframes hspin {
          0%,100% { transform: translateY(0px) rotate(45deg); }
          25%     { transform: translateY(-18px) rotate(70deg); }
          75%     { transform: translateY(-26px) rotate(20deg); }
        }
        @keyframes hgoldfloat {
          0%,100% { transform: translateY(0px) rotate(45deg) scale(1); }
          50%     { transform: translateY(-24px) rotate(30deg) scale(1.05); }
        }
        @keyframes hgoldsway {
          0%,100% { transform: translateY(0px) rotate(-12deg); }
          50%     { transform: translateY(-20px) rotate(4deg); }
        }
        @keyframes hpulse {
          0%,100% { transform: scale(1); opacity: 0.4; }
          50%     { transform: scale(1.12); opacity: 0.7; }
        }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${slide.bg})`, opacity: fade ? 1 : 0 }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: isBook
            ? 'rgba(6,10,28,0.88)'
            : isApp
            ? 'rgba(5,10,24,0.85)'
            : 'rgba(10,25,55,0.78)',
        }}
      />

      {/* Accent vignette — book */}
      {isBook && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 15% 50%, rgba(212,168,67,0.07) 0%, transparent 60%)',
          }}
        />
      )}

      {/* Accent vignette — app */}
      {isApp && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 85% 50%, ${(slide as AppSlide).accentColor}18 0%, transparent 65%)`,
          }}
        />
      )}

      {/* ── Decorative shapes: regular ── */}
      {!isBook && !isApp && (
        <>
          <div
            className="absolute top-24 right-12 hidden lg:block pointer-events-none"
            style={{ animation: 'hsway 3.8s ease-in-out infinite' }}
          >
            <div className="w-36 h-36 border-2" style={{ borderColor: 'rgba(45,91,227,0.55)' }} />
          </div>
          <div
            className="absolute bottom-32 right-24 hidden lg:block pointer-events-none"
            style={{ animation: 'hspin 3s ease-in-out infinite' }}
          >
            <div className="w-20 h-20" style={{ backgroundColor: 'rgba(45,91,227,0.25)' }} />
          </div>
          <div
            className="absolute top-1/3 left-16 hidden lg:block pointer-events-none"
            style={{ animation: 'hdrift 4.5s ease-in-out infinite' }}
          >
            <svg width="40" height="68" viewBox="0 0 40 68" fill="none">
              <path
                d="M20 4 C6 18, 34 28, 20 42 C6 56, 34 66, 20 78"
                stroke="#2D5BE3"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <div
            className="absolute bottom-24 left-10 hidden lg:block pointer-events-none"
            style={{ animation: 'hfloat 5s ease-in-out infinite 1.2s' }}
          >
            <div
              className="w-14 h-14 border-2"
              style={{ borderColor: 'rgba(45,91,227,0.4)', transform: 'rotate(45deg)' }}
            />
          </div>
          <div
            className="absolute top-32 left-8 hidden xl:block pointer-events-none"
            style={{ animation: 'hfloat 6s ease-in-out infinite 0.6s' }}
          >
            <div className="flex flex-col gap-2">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex gap-2">
                  {[0, 1, 2].map((col) => (
                    <div
                      key={col}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'rgba(45,91,227,0.4)' }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Decorative shapes: book ── */}
      {isBook && (
        <>
          <div
            className="absolute top-20 right-16 hidden lg:block pointer-events-none"
            style={{ animation: 'hgoldfloat 4s ease-in-out infinite' }}
          >
            <div className="w-28 h-28 border-2" style={{ borderColor: 'rgba(212,168,67,0.4)' }} />
          </div>
          <div
            className="absolute bottom-20 left-8 hidden lg:block pointer-events-none"
            style={{ animation: 'hgoldsway 3.5s ease-in-out infinite 0.9s' }}
          >
            <div className="w-16 h-16 border-2" style={{ borderColor: 'rgba(212,168,67,0.35)' }} />
          </div>
          <div
            className="absolute right-0 top-0 bottom-0 w-px hidden xl:block pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(212,168,67,0.15), transparent)',
            }}
          />
        </>
      )}

      {/* ── Decorative shapes: app ── */}
      {isApp && (
        <>
          <div
            className="absolute top-20 right-10 hidden lg:block pointer-events-none"
            style={{ animation: 'hfloat 4.2s ease-in-out infinite' }}
          >
            <div
              className="w-28 h-28 rounded-full border-2"
              style={{ borderColor: `${(slide as AppSlide).accentColor}45` }}
            />
          </div>
          <div
            className="absolute top-36 right-24 hidden xl:block pointer-events-none"
            style={{ animation: 'hpulse 3s ease-in-out infinite 0.6s' }}
          >
            <div
              className="w-12 h-12 rounded-full"
              style={{ backgroundColor: `${(slide as AppSlide).accentColor}25` }}
            />
          </div>
          <div
            className="absolute bottom-28 right-16 hidden lg:block pointer-events-none"
            style={{ animation: 'hsway 5s ease-in-out infinite 1.4s' }}
          >
            <div
              className="w-10 h-10 border-2"
              style={{ borderColor: `${(slide as AppSlide).accentColor}40` }}
            />
          </div>
        </>
      )}

      {/* Content */}
      {isBook ? (
        <BookAdContent slide={slide as BookSlide} fade={fade} />
      ) : isApp ? (
        <AppAdContent slide={slide as AppSlide} fade={fade} />
      ) : (
        <RegularContent slide={slide as RegularSlide} fade={fade} />
      )}

      {/* Slide dots */}
      <div className="relative z-10 flex items-center justify-center gap-3 mt-8 pb-8">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              backgroundColor: i === current ? activeDotColor(i) : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
