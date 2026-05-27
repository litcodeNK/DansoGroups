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

type Slide = RegularSlide | BookSlide;

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
    tagline: 'YOUR TRUSTED IT PARTNER',
    title: 'Reliable IT Solutions\nFor Every Business',
    subtitle:
      'Our engineers and security experts deliver cutting-edge results, on time and within budget.',
    bg: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1920&auto=format&fit=crop',
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

/* ─── Book ad slide content ──────────────────────────────── */

function BookAdContent({ slide, fade }: { slide: BookSlide; fade: boolean }) {
  return (
    <div
      className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 transition-opacity duration-500"
      style={{ opacity: fade ? 1 : 0 }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-8">

        {/* ── Book 3-D mockup ── */}
        <div className="shrink-0 order-2 lg:order-1 w-48 lg:w-56">
          {/* Outer glow ring */}
          <div
            className="relative"
            style={{
              filter: 'drop-shadow(0 30px 60px rgba(212,168,67,0.35)) drop-shadow(0 10px 30px rgba(0,0,0,0.6))',
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
              {/* Cover — portrait frame crops any letterbox bars */}
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
                {/* Shine overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)',
                  }}
                />
              </div>
              {/* Bottom shadow */}
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

        {/* ── Ad copy ── */}
        <div className="flex-1 text-white order-1 lg:order-2 text-center lg:text-left">

          {/* Badge */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
            <div className="h-px w-8 hidden lg:block" style={{ backgroundColor: '#D4A843' }} />
            <span
              className="text-xs font-extrabold uppercase tracking-[4px] px-3 py-1.5"
              style={{ backgroundColor: 'rgba(212,168,67,0.15)', border: '1px solid rgba(212,168,67,0.4)', color: '#D4A843' }}
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
            <span style={{ color: '#D4A843' }} className="font-bold">{slide.author}</span>
          </p>

          {/* Star rating */}
          <div className="flex items-center gap-2 justify-center lg:justify-start mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} fill={i <= 5 ? '#F59E0B' : 'none'} style={{ color: '#F59E0B' }} />
            ))}
            <span className="text-sm font-bold" style={{ color: '#F59E0B' }}>{slide.rating}</span>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              ({slide.reviews} reviews)
            </span>
          </div>

          {/* Pull quote */}
          <blockquote
            className="text-sm lg:text-base italic leading-relaxed mb-7 max-w-lg mx-auto lg:mx-0"
            style={{ color: 'rgba(255,255,255,0.6)', borderLeft: '3px solid rgba(212,168,67,0.5)', paddingLeft: '16px' }}
          >
            {slide.quote}
          </blockquote>

          {/* Pricing row */}
          <div className="flex items-center gap-6 justify-center lg:justify-start mb-8">
            <div className="flex items-center gap-2">
              <Package size={14} style={{ color: '#D4A843' }} />
              <span className="text-xs uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>Hardcopy</span>
              <span className="text-lg font-extrabold" style={{ color: '#D4A843', fontFamily: 'Playfair Display, serif' }}>{slide.hardcopyPrice}</span>
            </div>
            <div className="w-px h-6" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <div className="flex items-center gap-2">
              <Smartphone size={14} style={{ color: '#D4A843' }} />
              <span className="text-xs uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>PDF</span>
              <span className="text-lg font-extrabold" style={{ color: '#D4A843', fontFamily: 'Playfair Display, serif' }}>{slide.softcopyPrice}</span>
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
      `}</style>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url(${slide.bg})`,
          opacity: fade ? 1 : 0,
        }}
      />

      {/* Overlay — deeper on book slide for legibility */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: isBook ? 'rgba(6,10,28,0.88)' : 'rgba(10,25,55,0.78)' }}
      />

      {/* Gold vignette on book slide */}
      {isBook && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 15% 50%, rgba(212,168,67,0.07) 0%, transparent 60%)',
          }}
        />
      )}

      {/* Decorative shapes — regular slides */}
      {!isBook && (
        <>
          {/* Large square outline — swings + floats */}
          <div
            className="absolute top-24 right-12 hidden lg:block pointer-events-none"
            style={{ animation: 'hsway 3.8s ease-in-out infinite' }}
          >
            <div
              className="w-36 h-36 border-2"
              style={{ borderColor: 'rgba(45,91,227,0.55)' }}
            />
          </div>

          {/* Small filled square — spins while floating */}
          <div
            className="absolute bottom-32 right-24 hidden lg:block pointer-events-none"
            style={{ animation: 'hspin 3s ease-in-out infinite' }}
          >
            <div
              className="w-20 h-20"
              style={{ backgroundColor: 'rgba(45,91,227,0.25)' }}
            />
          </div>

          {/* Wave SVG — drifts with rotation */}
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

          {/* Diamond — slow float, offset phase */}
          <div
            className="absolute bottom-24 left-10 hidden lg:block pointer-events-none"
            style={{ animation: 'hfloat 5s ease-in-out infinite 1.2s' }}
          >
            <div
              className="w-14 h-14 border-2"
              style={{ borderColor: 'rgba(45,91,227,0.4)', transform: 'rotate(45deg)' }}
            />
          </div>

          {/* Top-left small dot cluster */}
          <div
            className="absolute top-32 left-8 hidden xl:block pointer-events-none"
            style={{ animation: 'hfloat 6s ease-in-out infinite 0.6s' }}
          >
            <div className="flex flex-col gap-2">
              {[0,1,2].map((row) => (
                <div key={row} className="flex gap-2">
                  {[0,1,2].map((col) => (
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

      {/* Decorative shapes — book slide */}
      {isBook && (
        <>
          {/* Gold outline — floats + tilts */}
          <div
            className="absolute top-20 right-16 hidden lg:block pointer-events-none"
            style={{ animation: 'hgoldfloat 4s ease-in-out infinite' }}
          >
            <div
              className="w-28 h-28 border-2"
              style={{ borderColor: 'rgba(212,168,67,0.4)' }}
            />
          </div>

          {/* Small gold square — sways opposite phase */}
          <div
            className="absolute bottom-20 left-8 hidden lg:block pointer-events-none"
            style={{ animation: 'hgoldsway 3.5s ease-in-out infinite 0.9s' }}
          >
            <div
              className="w-16 h-16 border-2"
              style={{ borderColor: 'rgba(212,168,67,0.35)' }}
            />
          </div>

          {/* Subtle vertical line */}
          <div
            className="absolute right-0 top-0 bottom-0 w-px hidden xl:block pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,168,67,0.15), transparent)' }}
          />
        </>
      )}

      {/* Content */}
      {isBook ? (
        <BookAdContent slide={slide as BookSlide} fade={fade} />
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
              backgroundColor:
                i === current
                  ? isBook && i === current
                    ? '#D4A843'
                    : '#2D5BE3'
                  : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
