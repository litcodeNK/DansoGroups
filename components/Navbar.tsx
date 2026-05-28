'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, Mail, Phone, ArrowRight, BookOpen, Home, Info, Wrench, FileText, Phone as PhoneIcon } from 'lucide-react';
import { FloatingShapes } from './FloatingShapes';

/* ─── Searchable page index ─────────────────────────────── */

interface SearchResult {
  label: string;
  href: string;
  desc: string;
  icon: React.ReactNode;
  tags: string[];
}

const SEARCH_INDEX: SearchResult[] = [
  {
    label: 'Home',
    href: '/',
    desc: 'DansoGroups — We Convert Concepts Into Technology',
    icon: <Home size={16} />,
    tags: ['home', 'main', 'landing', 'dansogroups'],
  },
  {
    label: 'About Us',
    href: '/about',
    desc: 'Our story, mission, and the team behind DansoGroups',
    icon: <Info size={16} />,
    tags: ['about', 'company', 'team', 'mission', 'history', 'who we are', 'founder'],
  },
  {
    label: 'Services',
    href: '/services',
    desc: 'IT management, web development, cybersecurity, SEO, and more',
    icon: <Wrench size={16} />,
    tags: ['services', 'it', 'technology', 'solutions', 'what we do'],
  },
  {
    label: 'Web Development',
    href: '/services',
    desc: 'Custom websites and web applications built for your business',
    icon: <Wrench size={16} />,
    tags: ['web', 'development', 'website', 'app', 'frontend', 'backend'],
  },
  {
    label: 'Cybersecurity',
    href: '/services',
    desc: 'Protect your business from digital threats and data breaches',
    icon: <Wrench size={16} />,
    tags: ['security', 'cyber', 'protection', 'hacking', 'data', 'breach', 'firewall'],
  },
  {
    label: 'IT Management',
    href: '/services',
    desc: 'End-to-end IT infrastructure management and support',
    icon: <Wrench size={16} />,
    tags: ['it management', 'infrastructure', 'systems', 'support', 'network'],
  },
  {
    label: 'SEO Optimization',
    href: '/services',
    desc: 'Improve your search rankings and grow organic traffic',
    icon: <Wrench size={16} />,
    tags: ['seo', 'search engine', 'google', 'ranking', 'traffic', 'marketing'],
  },
  {
    label: 'Data Security',
    href: '/services',
    desc: 'Enterprise data protection, backup, and recovery solutions',
    icon: <Wrench size={16} />,
    tags: ['data', 'security', 'backup', 'recovery', 'encryption', 'cloud'],
  },
  {
    label: 'Books',
    href: '/books',
    desc: 'Published books by DansoGroups — hardcopy and digital editions',
    icon: <BookOpen size={16} />,
    tags: ['books', 'bookshop', 'reading', 'publish', 'order', 'literature'],
  },
  {
    label: 'Be A Ghanaian',
    href: '/books',
    desc: 'Liberate the Mind, Build the Nation — by Asante Danso (2026)',
    icon: <BookOpen size={16} />,
    tags: ['be a ghanaian', 'ghanaian', 'asante danso', 'mind liberation', 'ghana', 'patriotism', 'build', 'nation', 'book'],
  },
  {
    label: 'Blog',
    href: '/blog',
    desc: 'Latest news, insights, and articles from DansoGroups',
    icon: <FileText size={16} />,
    tags: ['blog', 'news', 'articles', 'insights', 'posts', 'updates'],
  },
  {
    label: 'Contact Us',
    href: '/contact',
    desc: 'Get in touch — email, phone, or visit our office',
    icon: <PhoneIcon size={16} />,
    tags: ['contact', 'email', 'phone', 'reach', 'get in touch', 'office', 'address', 'location'],
  },
  {
    label: 'Get A Quote',
    href: '/contact',
    desc: 'Request a free consultation and project estimate',
    icon: <PhoneIcon size={16} />,
    tags: ['quote', 'pricing', 'cost', 'estimate', 'proposal', 'consultation', 'free'],
  },
];

/* ─── 3-D page navigator faces ──────────────────────────── */
const PAGE_FACES = [
  { label: 'Home',     href: '/',         img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop' },
  { label: 'About',    href: '/about',    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop' },
  { label: 'Services', href: '/services', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop' },
  { label: 'Books',    href: '/books',    img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=400&auto=format&fit=crop' },
  { label: 'Blog',     href: '/blog',     img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=400&auto=format&fit=crop' },
  { label: 'Contact',  href: '/contact',  img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=400&auto=format&fit=crop' },
];

function scoreResult(item: SearchResult, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  let score = 0;
  if (item.label.toLowerCase() === q) score += 10;
  else if (item.label.toLowerCase().startsWith(q)) score += 6;
  else if (item.label.toLowerCase().includes(q)) score += 4;
  if (item.desc.toLowerCase().includes(q)) score += 2;
  if (item.tags.some((t) => t === q)) score += 5;
  else if (item.tags.some((t) => t.startsWith(q) || t.includes(q))) score += 3;
  return score;
}

/* ─── Search overlay ────────────────────────────────────── */

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [spinning, setSpinning] = useState(true);
  const [dims, setDims] = useState({ w: 150, h: 320, r: 130 });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const update = () =>
      setDims(window.innerWidth < 640 ? { w: 110, h: 150, r: 95 } : { w: 150, h: 320, r: 130 });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    const q = query.trim();
    if (!q) { setResults([]); setActiveIdx(0); return; }
    const scored = SEARCH_INDEX
      .map((item) => ({ item, score: scoreResult(item, q) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
    setResults(scored.slice(0, 6));
    setActiveIdx(0);
  }, [query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      router.push(results[activeIdx].href);
      onClose();
    }
  }

  function highlight(text: string, query: string) {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} style={{ backgroundColor: 'rgba(255,255,255,0.3)', color: '#fff', borderRadius: '2px', padding: '0 2px' }}>{part}</mark>
        : part
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ backgroundColor: 'rgba(30,58,180,0.95)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close button */}
      <div className="flex justify-end p-6 lg:p-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest"
          aria-label="Close search"
        >
          Close <X size={20} />
        </button>
      </div>

      {/* Search input */}
      <div className="flex-1 flex flex-col items-center justify-start pt-16 lg:pt-20 px-6">
        <div className="w-full max-w-2xl">

          {/* Prompt label */}
          <p
            className="text-xs font-bold uppercase tracking-[4px] mb-6 text-center"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Search pages &amp; content
          </p>

          {/* Input */}
          <div className="relative">
            <Search
              size={22}
              className="absolute left-0 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="w-full bg-transparent text-white text-3xl lg:text-4xl font-light outline-none pl-10 pb-4"
              style={{
                borderBottom: '2px solid rgba(255,255,255,0.35)',
                caretColor: '#fff',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                aria-label="Clear"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Results */}
          {results.length > 0 && (
            <ul className="mt-8 space-y-1">
              {results.map((item, i) => (
                <li key={item.label + item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 py-3.5 transition-colors"
                    style={{
                      backgroundColor: i === activeIdx ? 'rgba(255,255,255,0.12)' : 'transparent',
                      borderLeft: i === activeIdx ? '3px solid rgba(255,255,255,0.8)' : '3px solid transparent',
                    }}
                    onMouseEnter={() => setActiveIdx(i)}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.6)' }} className="shrink-0">
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-base leading-snug">
                        {highlight(item.label, query)}
                      </p>
                      <p className="text-sm truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {highlight(item.desc, query)}
                      </p>
                    </div>
                    <ArrowRight size={14} className="shrink-0 ml-auto" style={{ color: 'rgba(255,255,255,0.35)' }} />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* No results */}
          {query.trim() && results.length === 0 && (
            <div className="mt-12 text-center">
              <p className="text-2xl" style={{ color: 'rgba(255,255,255,0.3)' }}>No results for</p>
              <p className="text-3xl font-bold text-white mt-1">"{query}"</p>
              <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Try: services, books, contact, cybersecurity, web development…
              </p>
            </div>
          )}

          {/* 3-D cylinder page navigator — shown when no query */}
          {!query && (
            <div className="mt-8">
              <p
                className="text-xs font-bold uppercase tracking-[3px] mb-6 text-center"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Browse Pages
              </p>

              {/* Perspective container — hover/touch pauses spin */}
              <div
                style={{ perspective: '700px', display: 'flex', justifyContent: 'center' }}
                onMouseEnter={() => setSpinning(false)}
                onMouseLeave={() => setSpinning(true)}
                onTouchStart={() => setSpinning(false)}
                onTouchEnd={() => setSpinning(true)}
              >
                <div
                  style={{
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    willChange: 'transform',
                    width: `${dims.w}px`,
                    height: `${dims.h}px`,
                    position: 'relative',
                    animation: 'cylinder-spin 12s linear infinite',
                    animationPlayState: spinning ? 'running' : 'paused',
                  }}
                >
                  {PAGE_FACES.map((face, i) => (
                    <Link
                      key={face.href}
                      href={face.href}
                      onClick={onClose}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        transform: `rotateY(${i * 60}deg) translateZ(${dims.r}px)`,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        overflow: 'hidden',
                        borderRadius: '6px',
                        border: '1.5px solid rgba(255,255,255,0.3)',
                        display: 'block',
                        cursor: 'pointer',
                      }}
                    >
                      <Image
                        src={face.img}
                        fill
                        alt={face.label}
                        className="object-cover"
                        sizes={`${dims.w}px`}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(13,27,42,0.88) 0%, rgba(13,27,42,0.15) 55%, transparent 100%)',
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 10,
                          left: 10,
                          right: 10,
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {face.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <p className="text-xs text-center mt-5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Hover to pause · Click a face to navigate
              </p>
            </div>
          )}

          {/* Keyboard hint */}
          <p className="mt-12 text-center text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            ↑ ↓ to navigate · Enter to open · Esc to close
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Consultation drawer ───────────────────────────────── */

const SERVICES = [
  'App Development',
  'Cybersecurity / DansoSecure',
  'E-Commerce / Danso Mall',
  'Workforce Tracking / PrimeTrack',
  'IT Consultancy',
  'Database Security',
  'Other',
];

function ConsultationDrawer({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputCls = 'w-full px-4 py-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-white/40 placeholder:text-white/30';
  const inputStyle = {
    border: '1px solid rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    backdropFilter: 'blur(4px)',
  } as React.CSSProperties;
  const labelCls = 'block text-xs font-bold uppercase tracking-wider mb-1.5';
  const labelStyle = { color: 'rgba(255,255,255,0.8)' };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[150]"
        style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 h-full z-[160] overflow-hidden flex flex-col"
        style={{
          width: '460px',
          maxWidth: '100vw',
          animation: 'slide-in-right 0.35s ease forwards',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover object-center"
          sizes="460px"
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(13,27,42,0.93) 0%, rgba(45,91,227,0.88) 100%)' }}
        />

        {/* Animated shapes */}
        <FloatingShapes variant="dark" />

        {/* Scrollable content — sits above layers */}
        <div className="relative z-10 flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between p-7 shrink-0">
            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Free Consultation
              </p>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Book A<br />Consultation
              </h3>
              <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Tell us about your project — we&apos;ll get back to you within 24 hours.
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 mt-1 text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>

          {/* Divider */}
          <div className="mx-7 shrink-0" style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.12)' }} />

          {/* Body */}
          <div className="flex-1 p-7">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 className="text-xl font-extrabold mb-2 text-white">
                  Consultation Booked!
                </h4>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Thank you, <strong>{form.name}</strong>. We&apos;ve received your request and will reach out to <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="text-white text-sm font-bold px-7 py-3 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#2D5BE3' }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className={labelCls} style={labelStyle}>Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Kwame Mensah"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={labelCls} style={labelStyle}>Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={labelCls} style={labelStyle}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+233 54 000 0000"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>

                {/* Service */}
                <div>
                  <label className={labelCls} style={labelStyle}>Service Interested In *</label>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => set('service', e.target.value)}
                    className={inputCls}
                    style={{ ...inputStyle, appearance: 'auto' }}
                  >
                    <option value="" style={{ color: '#0D1B2A', backgroundColor: '#fff' }}>Select a service…</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s} style={{ color: '#0D1B2A', backgroundColor: '#fff' }}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className={labelCls} style={labelStyle}>Tell Us About Your Project</label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your goals or challenges…"
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    className={inputCls}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white text-sm font-bold py-4 transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#2D5BE3' }}
                >
                  Book Consultation <ArrowRight size={16} />
                </button>

                <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Your information is kept private and never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Nav links ─────────────────────────────────────────── */

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Books', href: '/books' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

function SocialBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-7 h-7 flex items-center justify-center rounded transition-colors hover:bg-white/20"
      style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.8)' }}
    >
      {children}
    </a>
  );
}

/* ─── Navbar ─────────────────────────────────────────────── */

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const openSearch = useCallback(() => { setSearchOpen(true); setMobileOpen(false); }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openBooking = useCallback(() => { setBookingOpen(true); setMobileOpen(false); }, []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* ── Top bar ── */}
        <div className="hidden lg:block relative overflow-hidden" style={{ backgroundColor: '#0B1A38' }}>
          <FloatingShapes variant="dark" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-10">
              <div className="flex items-center gap-7">
                <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <Mail size={11} className="shrink-0" /> info@dansogroup.com
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <Phone size={11} className="shrink-0" /> +233 54 123 4567
                </span>
              </div>
              <div className="flex items-center gap-2">
                <SocialBtn href="#">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </SocialBtn>
                <SocialBtn href="#">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </SocialBtn>
                <SocialBtn href="#">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H8v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                  </svg>
                </SocialBtn>
                <SocialBtn href="#">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="white" />
                  </svg>
                </SocialBtn>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main nav bar ── */}
        <div className="relative bg-white shadow-sm">

          {/* Diagonal blue left half */}
          <div
            className="absolute top-0 left-0 h-full pointer-events-none"
            style={{
              width: '300px',
              backgroundColor: '#2D5BE3',
              clipPath: 'polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex items-center h-20">

            {/* Logo — sits on the blue section; its own white bg forms a clean plate */}
            <Link
              href="/"
              className="shrink-0 flex items-center"
              style={{ width: '230px' }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  padding: '5px 10px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
                }}
              >
                <Image
                  src="/logo.jpg"
                  alt="DansoGroups"
                  width={1280}
                  height={921}
                  priority
                  style={{ height: '50px', width: 'auto' }}
                  className="object-contain"
                />
              </span>
            </Link>

            {/* Gap between logo zone and nav links */}
            <div className="hidden lg:block shrink-0 w-10" />

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-7 flex-1">
              {navLinks.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  className="text-sm font-medium transition-colors duration-200 hover:opacity-60 whitespace-nowrap"
                  style={{ color: '#0D1B2A' }}
                >
                  {l.name}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-5 ml-auto">
              <button
                onClick={openSearch}
                aria-label="Open search"
                className="transition-opacity hover:opacity-50"
                style={{ color: '#0D1B2A' }}
              >
                <Search size={18} />
              </button>
              <button
                onClick={openBooking}
                className="flex items-center gap-2 text-white text-sm font-bold px-6 py-3 transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: '#2D5BE3' }}
              >
                Book A Consultation <span className="text-base leading-none">→</span>
              </button>
            </div>

            {/* Mobile: search + hamburger */}
            <div className="lg:hidden ml-auto flex items-center gap-3">
              <button
                onClick={openSearch}
                aria-label="Open search"
                style={{ color: '#0D1B2A' }}
              >
                <Search size={20} />
              </button>
              <button
                className="p-2"
                style={{ color: '#0D1B2A' }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t px-6 pb-6" style={{ borderColor: '#E2E8F0' }}>
            <div className="py-4 border-b" style={{ borderColor: '#E2E8F0' }}>
              <Image
                src="/logo.jpg"
                alt="DansoGroups"
                width={1280}
                height={921}
                style={{ height: '44px', width: 'auto' }}
                className="object-contain"
              />
            </div>
            {navLinks.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="block py-3 text-sm font-medium border-b transition-opacity hover:opacity-60"
                style={{ color: '#0D1B2A', borderColor: '#E2E8F0' }}
                onClick={() => setMobileOpen(false)}
              >
                {l.name}
              </Link>
            ))}
            <button
              onClick={openBooking}
              className="block w-full mt-4 text-white text-sm font-bold px-5 py-3 text-center"
              style={{ backgroundColor: '#2D5BE3' }}
            >
              Book A Consultation →
            </button>
          </div>
        )}
      </header>

      {/* Search overlay — rendered outside header so it covers the full viewport */}
      {searchOpen && <SearchOverlay onClose={closeSearch} />}

      {/* Consultation drawer */}
      {bookingOpen && <ConsultationDrawer onClose={closeBooking} />}
    </>
  );
}
