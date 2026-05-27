'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Package, Smartphone, ArrowRight, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────── */

const AD_BOOKS = [
  {
    id: 'be-a-ghanaian',
    title: 'Be A Ghanaian',
    author: 'Asante Danso',
    cover: '/book-be-a-ghanaian-cover.jpg',
    hardcopyPrice: 'GH₵ 85',
    softcopyPrice: 'GH₵ 45',
    rating: 5.0,
    reviews: 18,
    badge: 'NEW RELEASE',
    badgeColor: '#D4A843',
    badgeBg: 'rgba(212,168,67,0.15)',
    tagline: 'Dare to stay and build',
  },
  {
    id: 'future-of-african-tech',
    title: 'The Future of African Tech',
    author: 'Asante Danso',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
    hardcopyPrice: 'GH₵ 89',
    softcopyPrice: 'GH₵ 45',
    rating: 4.9,
    reviews: 0,
    badge: 'COMING SOON',
    badgeColor: '#94A3B8',
    badgeBg: 'rgba(148,163,184,0.1)',
    tagline: "Charts Africa's digital decade",
  },
  {
    id: 'cybersecurity-for-african-enterprises',
    title: 'Cybersecurity for African Enterprises',
    author: 'Asante Danso',
    cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    hardcopyPrice: 'GH₵ 75',
    softcopyPrice: 'GH₵ 38',
    rating: 4.8,
    reviews: 0,
    badge: 'COMING SOON',
    badgeColor: '#94A3B8',
    badgeBg: 'rgba(148,163,184,0.1)',
    tagline: 'Protect your business online',
  },
];

/* ─── Star row ───────────────────────────────────────────── */

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={10} fill="#F59E0B" style={{ color: '#F59E0B' }} />
      ))}
    </span>
  );
}

/* ─── Single ad card ─────────────────────────────────────── */

function AdCard({ book }: { book: typeof AD_BOOKS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/books"
      className="group flex-shrink-0 flex flex-col overflow-hidden"
      style={{
        width: '220px',
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,168,67,0.25)'
          : '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover */}
      <div className="relative overflow-hidden" style={{ height: '160px' }}>
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover"
          style={{
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
          sizes="220px"
        />
        {/* Spine shadow */}
        <div
          className="absolute top-0 left-0 bottom-0 w-4 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)' }}
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(6,10,28,0.85) 0%, transparent 55%)' }}
        />
        {/* Badge */}
        <span
          className="absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5"
          style={{
            backgroundColor: book.badgeBg,
            color: book.badgeColor,
            border: `1px solid ${book.badgeColor}40`,
          }}
        >
          {book.badge}
        </span>
        {/* Tagline bottom-left of cover */}
        <p
          className="absolute bottom-3 left-3 right-3 text-[10px] italic leading-tight"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          "{book.tagline}"
        </p>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h4
          className="text-xs font-bold leading-snug line-clamp-2"
          style={{ color: '#F1F5F9', fontFamily: 'Playfair Display, serif' }}
        >
          {book.title}
        </h4>
        <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
          by {book.author}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <Stars rating={book.rating} />
          <span className="text-[10px] font-bold" style={{ color: '#F59E0B' }}>{book.rating}</span>
          <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>({book.reviews})</span>
        </div>

        {/* Prices */}
        <div
          className="flex items-center justify-between py-2 mt-auto"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-1">
            <Package size={9} style={{ color: '#D4A843' }} />
            <span className="text-[10px] font-bold" style={{ color: '#D4A843' }}>{book.hardcopyPrice}</span>
          </div>
          <div className="w-px h-3 self-center" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
          <div className="flex items-center gap-1">
            <Smartphone size={9} style={{ color: '#94A3B8' }} />
            <span className="text-[10px] font-bold" style={{ color: '#94A3B8' }}>{book.softcopyPrice}</span>
          </div>
        </div>

        {/* CTA */}
        <div
          className="flex items-center justify-center gap-1.5 py-2 text-[10px] font-extrabold uppercase tracking-widest text-white transition-opacity group-hover:opacity-90"
          style={{ backgroundColor: '#2D5BE3' }}
        >
          Order Now <ArrowRight size={10} />
        </div>
      </div>
    </Link>
  );
}

/* ─── Main export ────────────────────────────────────────── */

export function BookAds() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 'left' | 'right') {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -240 : 240, behavior: 'smooth' });
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #060D18 0%, #0B1426 100%)' }}
    >
      {/* Subtle gold divider line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.4), transparent)' }}
      />

      {/* Background texture dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8">

        {/* ── Header row ── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Animated book icon */}
            <div
              className="w-8 h-8 flex items-center justify-center shrink-0"
              style={{
                background: 'linear-gradient(135deg, #D4A843, #8B6B14)',
                clipPath: 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div>
              <p
                className="text-[9px] font-bold uppercase tracking-[4px] leading-none mb-0.5"
                style={{ color: 'rgba(212,168,67,0.7)' }}
              >
                DansoGroups Publishing
              </p>
              <h3
                className="text-sm font-extrabold leading-none"
                style={{ color: '#F1F5F9', letterSpacing: '0.02em' }}
              >
                Our Published Books
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Scroll arrows — visible on mobile/tablet */}
            <div className="flex gap-1.5 lg:hidden">
              <button
                onClick={() => scroll('left')}
                className="w-7 h-7 flex items-center justify-center transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
                aria-label="Scroll left"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-7 h-7 flex items-center justify-center transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
                aria-label="Scroll right"
              >
                <ChevronRightIcon size={14} />
              </button>
            </div>

            <Link
              href="/books"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
              style={{ color: '#D4A843' }}
            >
              View All Books <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* ── Book cards row ── */}
        <div className="relative">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-6 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #060D18, transparent)' }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-6 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0B1426, transparent)' }}
          />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {AD_BOOKS.map((book) => (
              <AdCard key={book.id} book={book} />
            ))}

            {/* "See More" end card */}
            <Link
              href="/books"
              className="flex-shrink-0 flex flex-col items-center justify-center gap-3 w-[140px] transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'rgba(45,91,227,0.08)',
                border: '1px dashed rgba(45,91,227,0.35)',
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(45,91,227,0.15)' }}
              >
                <ArrowRight size={18} style={{ color: '#2D5BE3' }} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-center px-3" style={{ color: '#2D5BE3' }}>
                Browse Full Bookshop
              </p>
            </Link>
          </div>
        </div>

        {/* ── Bottom strip ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span className="flex items-center gap-1.5">
              <Package size={10} style={{ color: '#D4A843' }} /> Hardcopy delivery nationwide
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone size={10} style={{ color: '#94A3B8' }} /> Instant PDF access
            </span>
          </div>
          <Link
            href="/books"
            className="sm:hidden flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: '#D4A843' }}
          >
            View All Books <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Subtle gold divider line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.2), transparent)' }}
      />
    </div>
  );
}
