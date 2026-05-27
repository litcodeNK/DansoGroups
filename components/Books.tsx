'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  X, Package, Smartphone, Star, Check, Phone, Mail,
  MessageCircle, ShieldCheck, Truck, BookOpen, ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

/* ─── Book catalogue ─────────────────────────────────────── */

interface BookItem {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorTitle: string;
  description: string;
  cover: string;
  hardcopyPrice: string;
  softcopyPrice: string;
  pages: number;
  edition: string;
  year: string;
  rating: number;
  reviews: number;
  categories: string[];
  badge?: string;
  featured?: boolean;
  features?: string[];
  pullQuote?: string;
}

const BOOKS: BookItem[] = [
  {
    id: 'be-a-ghanaian',
    title: 'Be A Ghanaian',
    subtitle: 'Liberate the Mind, Build the Nation',
    author: 'Asante Danso',
    authorTitle: 'Founder, DansoGroups | Author & Entrepreneur',
    description:
      'A revolutionary call to action for every Ghanaian to dare to stay and build. From a deeply personal awakening — studying belief systems, uncovering pre-colonial history, and wrestling with Ghana\'s potential — Asante Danso writes an unflinching manifesto for mind liberation and national development. Read it with an open heart. Question everything. Then go build something.',
    cover: '/book-be-a-ghanaian-cover.jpg',
    hardcopyPrice: 'GH₵ 85.00',
    softcopyPrice: 'GH₵ 45.00',
    pages: 220,
    edition: '1st Edition',
    year: '2026',
    rating: 5.0,
    reviews: 18,
    categories: ['Mind Liberation', 'Ghana', 'Leadership', 'Patriotism'],
    badge: 'NEW RELEASE',
    featured: true,
    pullQuote: '"Read this with an open heart. Question everything. Then go build something."',
    features: [
      'A personal awakening — from partial to complete consciousness',
      'Ghana\'s rich history before colonial contact',
      'How unity creates collective power and national control',
      'Rewiring the African mindset after centuries of conditioning',
      'Leadership in Ghana — honest diagnosis and bold vision',
      'Mind liberation through intentional mass education',
      'Your first three concrete steps to start building tomorrow',
    ],
  },
  {
    id: 'future-of-african-tech',
    title: 'The Future of African Tech',
    author: 'Asante Danso',
    authorTitle: 'Founder, DansoGroups | Tech Strategist',
    description:
      'An in-depth exploration of how technology is reshaping African economies, transforming industries, and creating new opportunities for the next generation of entrepreneurs. Drawing on research across 12 African nations and insights from leading tech founders and policymakers.',
    cover:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
    hardcopyPrice: 'GH₵ 89.00',
    softcopyPrice: 'GH₵ 45.00',
    pages: 320,
    edition: '1st Edition',
    year: '2025',
    rating: 4.9,
    reviews: 0,
    categories: ['Technology', 'Business', 'Africa'],
    badge: 'COMING SOON',
  },
  {
    id: 'cybersecurity-for-african-enterprises',
    title: 'Cybersecurity for African Enterprises',
    author: 'Asante Danso',
    authorTitle: 'Founder, DansoGroups | Cybersecurity Expert',
    description:
      'A comprehensive guide to protecting your business in Africa\'s rapidly evolving digital landscape — covering threats, compliance, and resilience strategies tailored for the continent\'s unique operating environments.',
    cover:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    hardcopyPrice: 'GH₵ 75.00',
    softcopyPrice: 'GH₵ 38.00',
    pages: 280,
    edition: '1st Edition',
    year: '2025',
    rating: 4.8,
    reviews: 0,
    categories: ['Cybersecurity', 'Enterprise', 'Technology'],
    badge: 'COMING SOON',
  },
  {
    id: 'building-tech-in-africa',
    title: "Building Tech in Africa: A Founder's Guide",
    author: 'Abena Mensah-Danso',
    authorTitle: 'Co-Founder, DansoGroups | Startup Mentor',
    description:
      'The definitive playbook for building, funding, and scaling technology startups across Africa — from ideation through Series A and beyond. Packed with first-hand accounts and actionable frameworks.',
    cover:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop',
    hardcopyPrice: 'GH₵ 79.00',
    softcopyPrice: 'GH₵ 40.00',
    pages: 295,
    edition: '2nd Edition',
    year: '2023',
    rating: 4.7,
    reviews: 203,
    categories: ['Startups', 'Entrepreneurship', 'Funding'],
  },
];

/* ─── Hardcopy Order Modal ───────────────────────────────── */

interface HardcopyForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  quantity: number;
  notes: string;
}

const EMPTY_FORM: HardcopyForm = {
  fullName: '', email: '', phone: '', address: '',
  city: '', region: '', country: 'Ghana', quantity: 1, notes: '',
};

function HardcopyModal({
  book,
  onClose,
}: {
  book: BookItem;
  onClose: () => void;
}) {
  const [form, setForm] = useState<HardcopyForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof HardcopyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const required = ['fullName', 'email', 'phone', 'address', 'city', 'country'] as const;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    for (const key of required) {
      if (!form[key].toString().trim()) {
        toast.error(`Please fill in "${key.replace(/([A-Z])/g, ' $1').toLowerCase()}"`);
        return;
      }
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <ModalShell onClose={onClose} title="">
        <div className="py-12 flex flex-col items-center text-center gap-5">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#ECFDF5' }}
          >
            <Check size={40} style={{ color: '#10B981' }} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#0D2A55', fontFamily: 'Playfair Display, serif' }}>
              Order Received!
            </h3>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#64748B' }}>
              Thank you, <strong>{form.fullName}</strong>. We've received your order for{' '}
              <em>{book.title}</em>. Our team will contact you at{' '}
              <strong>{form.email}</strong> within 24 hours to confirm delivery details and payment.
            </p>
          </div>
          <div
            className="rounded-lg p-4 w-full max-w-xs text-sm"
            style={{ backgroundColor: '#F0F4FF', border: '1px solid #BFCFFF' }}
          >
            <p style={{ color: '#2D5BE3' }} className="font-semibold mb-1">Delivery address on file:</p>
            <p style={{ color: '#334155' }}>{form.address}, {form.city}{form.region ? `, ${form.region}` : ''}, {form.country}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-2 px-8 py-3 text-white text-sm font-bold"
            style={{ backgroundColor: '#2D5BE3' }}
          >
            Done
          </button>
        </div>
      </ModalShell>
    );
  }

  const inputCls = 'w-full px-4 py-3 text-sm outline-none transition-colors bg-white';
  const inputStyle = {
    border: '1.5px solid #E2E8F0',
    color: '#0D1B2A',
  };
  const labelCls = 'block text-xs font-semibold uppercase tracking-wide mb-1.5';
  const labelStyle = { color: '#475569' };

  return (
    <ModalShell onClose={onClose} title={`Order Hardcopy — ${book.title}`}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Order summary */}
        <div
          className="flex items-center gap-4 rounded-lg p-4"
          style={{ backgroundColor: '#F8FAFF', border: '1px solid #E0E7FF' }}
        >
          <div className="relative w-12 h-16 shrink-0 overflow-hidden rounded-sm shadow-md">
            <Image src={book.cover} alt={book.title} fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm truncate" style={{ color: '#0D2A55' }}>{book.title}</p>
            <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{book.author}</p>
            <p className="text-sm font-bold mt-1" style={{ color: '#2D5BE3' }}>{book.hardcopyPrice} / copy</p>
          </div>
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} style={labelStyle}>Full Name <span style={{ color: '#EF4444' }}>*</span></label>
            <input value={form.fullName} onChange={set('fullName')} placeholder="John Mensah" className={inputCls} style={inputStyle} />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Email Address <span style={{ color: '#EF4444' }}>*</span></label>
            <input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" className={inputCls} style={inputStyle} />
          </div>
        </div>

        {/* Phone + Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} style={labelStyle}>Phone Number <span style={{ color: '#EF4444' }}>*</span></label>
            <input value={form.phone} onChange={set('phone')} placeholder="+233 XX XXX XXXX" className={inputCls} style={inputStyle} />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Quantity</label>
            <div className="flex items-center" style={{ border: '1.5px solid #E2E8F0' }}>
              <button
                type="button"
                className="px-4 py-3 text-lg font-bold transition-colors hover:bg-gray-100"
                style={{ color: '#2D5BE3' }}
                onClick={() => setForm((f) => ({ ...f, quantity: Math.max(1, f.quantity - 1) }))}
              >−</button>
              <span className="flex-1 text-center text-sm font-bold" style={{ color: '#0D2A55' }}>{form.quantity}</span>
              <button
                type="button"
                className="px-4 py-3 text-lg font-bold transition-colors hover:bg-gray-100"
                style={{ color: '#2D5BE3' }}
                onClick={() => setForm((f) => ({ ...f, quantity: Math.min(20, f.quantity + 1) }))}
              >+</button>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <label className={labelCls} style={labelStyle}>Delivery Address <span style={{ color: '#EF4444' }}>*</span></label>
          <input value={form.address} onChange={set('address')} placeholder="House No. 12, East Legon" className={inputCls} style={inputStyle} />
        </div>

        {/* City + Region + Country */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls} style={labelStyle}>City <span style={{ color: '#EF4444' }}>*</span></label>
            <input value={form.city} onChange={set('city')} placeholder="Accra" className={inputCls} style={inputStyle} />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Region / State</label>
            <input value={form.region} onChange={set('region')} placeholder="Greater Accra" className={inputCls} style={inputStyle} />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Country <span style={{ color: '#EF4444' }}>*</span></label>
            <select value={form.country} onChange={set('country')} className={inputCls} style={inputStyle}>
              {['Ghana','Nigeria','Kenya','South Africa','Tanzania','Uganda','Rwanda','Cameroon','Côte d\'Ivoire','Ethiopia','Other'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className={labelCls} style={labelStyle}>Special Instructions <span style={{ color: '#94A3B8' }}>(optional)</span></label>
          <textarea
            value={form.notes}
            onChange={set('notes')}
            rows={3}
            placeholder="Any specific delivery instructions or notes for our team..."
            className={`${inputCls} resize-none`}
            style={inputStyle}
          />
        </div>

        {/* Trust badge */}
        <div
          className="flex items-center gap-3 rounded-lg px-4 py-3"
          style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}
        >
          <ShieldCheck size={18} style={{ color: '#10B981' }} className="shrink-0" />
          <p className="text-xs" style={{ color: '#166534' }}>
            Your information is secure. We will contact you to confirm payment before dispatching your order.
          </p>
        </div>

        {/* Total + Submit */}
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: '#E2E8F0' }}>
          <div>
            <p className="text-xs" style={{ color: '#64748B' }}>Estimated Total</p>
            <p className="text-xl font-bold" style={{ color: '#0D2A55', fontFamily: 'Playfair Display, serif' }}>
              {book.hardcopyPrice.replace('.00', '')} × {form.quantity}
            </p>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-8 py-4 text-white text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: '#2D5BE3' }}
          >
            {submitting ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing…
              </>
            ) : (
              <>Place Order <ChevronRight size={16} /></>
            )}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* ─── Softcopy Info Modal ────────────────────────────────── */

function SoftcopyModal({ book, onClose }: { book: BookItem; onClose: () => void }) {
  return (
    <ModalShell onClose={onClose} title={`Get Digital Copy — ${book.title}`}>
      <div className="space-y-6">
        {/* Book + price */}
        <div
          className="flex items-center gap-4 rounded-lg p-4"
          style={{ backgroundColor: '#F8FAFF', border: '1px solid #E0E7FF' }}
        >
          <div className="relative w-12 h-16 shrink-0 overflow-hidden rounded-sm shadow-md">
            <Image src={book.cover} alt={book.title} fill className="object-cover" />
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: '#0D2A55' }}>{book.title}</p>
            <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Digital PDF · Instant delivery</p>
            <p className="text-lg font-bold mt-1" style={{ color: '#2D5BE3' }}>{book.softcopyPrice}</p>
          </div>
        </div>

        {/* Steps */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
            How It Works
          </p>
          {[
            { step: '01', text: 'Choose your preferred payment method below' },
            { step: '02', text: 'Make payment and save the receipt / screenshot' },
            { step: '03', text: 'Send proof of payment to us via WhatsApp or Email' },
            { step: '04', text: 'Receive your PDF download link within 24 hours' },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-4 mb-3">
              <span
                className="w-8 h-8 shrink-0 flex items-center justify-center text-xs font-extrabold rounded-full"
                style={{ backgroundColor: '#EEF2FF', color: '#2D5BE3' }}
              >
                {step}
              </span>
              <p className="text-sm pt-1.5" style={{ color: '#475569' }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Payment options */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
            Payment Options
          </p>
          <div className="space-y-3">
            {[
              { label: 'MTN Mobile Money', number: '055 123 4567', name: 'Danso Groups Ltd' },
              { label: 'Vodafone Cash', number: '020 123 4567', name: 'Danso Groups Ltd' },
              { label: 'AirtelTigo Money', number: '027 123 4567', name: 'Danso Groups Ltd' },
            ].map(({ label, number, name }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg px-4 py-3"
                style={{ border: '1.5px solid #E2E8F0', backgroundColor: '#FAFAFA' }}
              >
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0D2A55' }}>{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{name}</p>
                </div>
                <span className="text-sm font-bold tabular-nums" style={{ color: '#2D5BE3' }}>{number}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact after payment */}
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}
        >
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#92400E' }}>
            After Payment — Contact Us
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <MessageCircle size={16} style={{ color: '#10B981' }} className="shrink-0" />
              <span className="text-sm" style={{ color: '#475569' }}>WhatsApp: <strong>+233 54 123 4567</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} style={{ color: '#2D5BE3' }} className="shrink-0" />
              <span className="text-sm" style={{ color: '#475569' }}>Email: <strong>books@dansogroup.com</strong></span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="https://wa.me/233541234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-white text-sm font-bold rounded-none"
            style={{ backgroundColor: '#10B981' }}
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>
          <a
            href="mailto:books@dansogroup.com"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold"
            style={{ border: '2px solid #2D5BE3', color: '#2D5BE3' }}
          >
            <Mail size={16} />
            Send Email
          </a>
        </div>
      </div>
    </ModalShell>
  );
}

/* ─── Shared modal shell ─────────────────────────────────── */

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(10,20,50,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl"
        style={{ border: '1px solid #E2E8F0' }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white"
          style={{ borderBottom: '1px solid #E2E8F0' }}
        >
          <div className="flex items-center gap-3">
            <Package size={18} style={{ color: '#2D5BE3' }} className="shrink-0" />
            <h3 className="text-sm font-bold leading-snug" style={{ color: '#0D2A55', maxWidth: '380px' }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="ml-3 shrink-0 p-1.5 transition-colors hover:bg-gray-100 rounded-full"
            aria-label="Close"
          >
            <X size={18} style={{ color: '#64748B' }} />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

/* ─── Star rating ────────────────────────────────────────── */

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          fill={i <= Math.round(rating) ? '#F59E0B' : 'none'}
          style={{ color: '#F59E0B' }}
        />
      ))}
    </div>
  );
}

/* ─── Featured Book ──────────────────────────────────────── */

function FeaturedBook({
  book,
  onHardcopy,
  onSoftcopy,
}: {
  book: BookItem;
  onHardcopy: (b: BookItem) => void;
  onSoftcopy: (b: BookItem) => void;
}) {
  return (
    <div
      className="relative overflow-hidden mb-20"
      style={{ backgroundColor: '#0D2A55' }}
    >
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
        <svg viewBox="0 0 400 400" fill="none">
          <circle cx="300" cy="100" r="250" fill="#2D5BE3" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-10">
        <svg width="160" height="130" viewBox="0 0 160 130">
          <polygon points="0,130 160,130 0,0" fill="#2D5BE3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Book cover — 3-D effect */}
        <div className="shrink-0 w-52 lg:w-64">
          <div
            className="relative shadow-2xl"
            style={{
              transform: 'perspective(900px) rotateY(-12deg) rotateX(3deg)',
              transformStyle: 'preserve-3d',
              boxShadow: '-18px 24px 60px rgba(0,0,0,0.55), 4px 8px 20px rgba(201,149,26,0.15)',
            }}
          >
            {/* Spine */}
            <div
              className="absolute top-0 left-0 bottom-0 w-5 z-10"
              style={{
                background: 'linear-gradient(to right, #8B6B14, #D4A843, #C9951A)',
                boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.4)',
              }}
            />
            {/* Cover image — portrait frame, crops letterbox bars */}
            <div
              className="relative ml-5 overflow-hidden"
              style={{ borderRadius: '0 2px 2px 0', height: '360px' }}
            >
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover object-center"
                sizes="256px"
              />
              {/* Page edge shine */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(255,255,255,0.08) 0%, transparent 40%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 text-white text-center lg:text-left">
          {book.badge && (
            <span
              className="inline-block text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 mb-5"
              style={{ backgroundColor: '#D4A843', color: '#0D1B2A' }}
            >
              {book.badge}
            </span>
          )}
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight mb-1"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {book.title}
          </h2>
          {book.subtitle && (
            <p
              className="text-lg italic mb-4"
              style={{ color: '#D4A843', fontFamily: 'Playfair Display, serif' }}
            >
              {book.subtitle}
            </p>
          )}
          <p className="text-base mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
            By{' '}
            <span style={{ color: '#D4A843' }} className="font-semibold">{book.author}</span>
            {' '}·{' '}
            <span style={{ color: 'rgba(255,255,255,0.45)' }} className="italic text-sm">{book.authorTitle}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 justify-center lg:justify-start mt-3 mb-5">
            <Stars rating={book.rating} />
            <span className="text-sm font-bold" style={{ color: '#F59E0B' }}>{book.rating}</span>
            {book.reviews > 0 && (
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>({book.reviews} reviews)</span>
            )}
          </div>

          <p className="text-sm lg:text-base leading-relaxed mb-5 max-w-xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {book.description}
          </p>

          {/* Pull quote */}
          {book.pullQuote && (
            <blockquote
              className="italic text-sm leading-relaxed mb-5 max-w-lg mx-auto lg:mx-0"
              style={{
                color: 'rgba(255,255,255,0.55)',
                borderLeft: '3px solid rgba(212,168,67,0.6)',
                paddingLeft: '14px',
              }}
            >
              {book.pullQuote}
            </blockquote>
          )}

          {/* Features list */}
          {book.features && book.features.length > 0 && (
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Inside this book
              </p>
              <ul className="space-y-1.5 text-center lg:text-left">
                {book.features.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-start gap-2 justify-center lg:justify-start">
                    <Check size={13} className="shrink-0 mt-0.5" style={{ color: '#D4A843' }} />
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap gap-5 justify-center lg:justify-start mb-8 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span className="flex items-center gap-1.5"><BookOpen size={13} /> {book.pages} pages</span>
            <span>·</span>
            <span>{book.edition}</span>
            <span>·</span>
            <span>{book.year}</span>
            <span>·</span>
            <span>{book.categories.join(', ')}</span>
          </div>

          {/* Pricing + CTA */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Hardcopy</p>
                <p className="text-2xl font-bold" style={{ color: '#D4A843', fontFamily: 'Playfair Display, serif' }}>{book.hardcopyPrice}</p>
              </div>
              <div className="w-px h-10 self-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Digital PDF</p>
                <p className="text-2xl font-bold" style={{ color: '#D4A843', fontFamily: 'Playfair Display, serif' }}>{book.softcopyPrice}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-2 sm:mt-0 sm:ml-4">
              <button
                onClick={() => onHardcopy(book)}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#2D5BE3' }}
              >
                <Package size={15} /> Order Hardcopy
              </button>
              <button
                onClick={() => onSoftcopy(book)}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-bold transition-colors"
                style={{ border: '2px solid rgba(212,168,67,0.7)', color: '#D4A843' }}
              >
                <Smartphone size={15} /> Get PDF
              </button>
            </div>
          </div>

          {/* Trust icons */}
          <div className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span className="flex items-center gap-1.5"><Truck size={13} /> Nationwide delivery</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> Secure checkout</span>
            <span className="flex items-center gap-1.5"><Check size={13} /> Satisfaction guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Book Card (grid) ───────────────────────────────────── */

function BookCard({
  book,
  onHardcopy,
  onSoftcopy,
}: {
  book: BookItem;
  onHardcopy: (b: BookItem) => void;
  onSoftcopy: (b: BookItem) => void;
}) {
  return (
    <div
      className="flex flex-col bg-white overflow-hidden group transition-shadow hover:shadow-xl"
      style={{ border: '1px solid #E8E3D8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
    >
      {/* Cover */}
      <div
        className="relative overflow-hidden"
        style={{ height: '280px', backgroundColor: '#F5F1EB' }}
      >
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Spine overlay */}
        <div
          className="absolute top-0 left-0 bottom-0 w-3"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.35), transparent)' }}
        />
        {book.badge && (
          <span
            className="absolute top-4 right-4 text-xs font-extrabold uppercase tracking-widest px-2.5 py-1"
            style={{ backgroundColor: '#D4A843', color: '#0D1B2A' }}
          >
            {book.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {book.categories.map((cat) => (
            <span
              key={cat}
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5"
              style={{ backgroundColor: '#EEF2FF', color: '#2D5BE3' }}
            >
              {cat}
            </span>
          ))}
        </div>
        <h3
          className="text-xl font-bold leading-snug mb-1 line-clamp-2"
          style={{ color: '#0D2A55', fontFamily: 'Playfair Display, serif' }}
        >
          {book.title}
        </h3>
        <p className="text-xs mb-3 font-medium" style={{ color: '#64748B' }}>
          By {book.author}
        </p>
        <div className="flex items-center gap-2 mb-4">
          <Stars rating={book.rating} />
          <span className="text-xs font-bold" style={{ color: '#F59E0B' }}>{book.rating}</span>
          <span className="text-xs" style={{ color: '#94A3B8' }}>({book.reviews})</span>
        </div>
        <p className="text-sm leading-relaxed flex-1 mb-5 line-clamp-3" style={{ color: '#64748B' }}>
          {book.description}
        </p>

        {/* Pricing */}
        <div
          className="flex items-center justify-between py-3 mb-5"
          style={{ borderTop: '1px solid #E8E3D8', borderBottom: '1px solid #E8E3D8' }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-wide font-bold" style={{ color: '#94A3B8' }}>Hardcopy</p>
            <p className="text-base font-bold" style={{ color: '#0D2A55', fontFamily: 'Playfair Display, serif' }}>{book.hardcopyPrice}</p>
          </div>
          <div className="w-px h-8 self-center" style={{ backgroundColor: '#E8E3D8' }} />
          <div>
            <p className="text-[10px] uppercase tracking-wide font-bold" style={{ color: '#94A3B8' }}>Digital PDF</p>
            <p className="text-base font-bold" style={{ color: '#0D2A55', fontFamily: 'Playfair Display, serif' }}>{book.softcopyPrice}</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onHardcopy(book)}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#2D5BE3' }}
          >
            <Package size={13} /> Hardcopy
          </button>
          <button
            onClick={() => onSoftcopy(book)}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-bold transition-colors"
            style={{ border: '2px solid #0D2A55', color: '#0D2A55' }}
          >
            <Smartphone size={13} /> Get PDF
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────── */

export function Books() {
  const [modal, setModal] = useState<{ type: 'hardcopy' | 'softcopy'; book: BookItem } | null>(null);

  const featured = BOOKS.find((b) => b.featured)!;
  const rest = BOOKS.filter((b) => !b.featured);

  return (
    <section style={{ backgroundColor: '#FAFAF8' }}>
      {/* ── Shop tagline bar ── */}
      <div
        className="py-4 border-b"
        style={{ backgroundColor: '#fff', borderColor: '#E8E3D8' }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm font-semibold" style={{ color: '#0D2A55' }}>
            DansoGroups Publishing — <span style={{ color: '#64748B' }}>Transforming knowledge into impact</span>
          </p>
          <div className="flex items-center gap-6 text-xs" style={{ color: '#94A3B8' }}>
            <span className="flex items-center gap-1.5"><Truck size={12} /> Nationwide delivery</span>
            <span className="flex items-center gap-1.5"><Smartphone size={12} /> Instant PDF access</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={12} /> Secure &amp; trusted</span>
          </div>
        </div>
      </div>

      {/* ── Featured book ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-10" style={{ backgroundColor: '#2D5BE3' }} />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: '#2D5BE3' }}>
              Editor's Pick
            </p>
            <h2 className="text-2xl font-bold" style={{ color: '#0D2A55', fontFamily: 'Playfair Display, serif' }}>
              Featured Title
            </h2>
          </div>
        </div>
      </div>

      <FeaturedBook book={featured} onHardcopy={(b) => setModal({ type: 'hardcopy', book: b })} onSoftcopy={(b) => setModal({ type: 'softcopy', book: b })} />

      {/* ── More books ── */}
      {rest.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1 h-10" style={{ backgroundColor: '#D4A843' }} />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: '#D4A843' }}>
                More Titles
              </p>
              <h2 className="text-2xl font-bold" style={{ color: '#0D2A55', fontFamily: 'Playfair Display, serif' }}>
                Browse the Collection
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {rest.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onHardcopy={(b) => setModal({ type: 'hardcopy', book: b })}
                onSoftcopy={(b) => setModal({ type: 'softcopy', book: b })}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Why buy from us ── */}
      <div style={{ backgroundColor: '#F0F4FF', borderTop: '1px solid #E0E7FF', borderBottom: '1px solid #E0E7FF' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <BookOpen size={24} />, title: 'Expert Authors', text: 'Written by practitioners who have lived and built across Africa.' },
            { icon: <Truck size={24} />, title: 'Fast Delivery', text: 'Hardcopies delivered nationwide. PDFs delivered within 24 hours.' },
            { icon: <ShieldCheck size={24} />, title: 'Secure Payment', text: 'Mobile Money, bank transfer, or cash on delivery — your choice.' },
            { icon: <Star size={24} />, title: 'Quality Guaranteed', text: 'Professionally edited, printed, and peer-reviewed for accuracy.' },
          ].map(({ icon, title, text }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full"
                style={{ backgroundColor: '#EEF2FF', color: '#2D5BE3' }}
              >
                {icon}
              </div>
              <h4 className="font-bold text-base" style={{ color: '#0D2A55' }}>{title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact strip ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold mb-1" style={{ color: '#0D2A55', fontFamily: 'Playfair Display, serif' }}>
            Have a question about an order?
          </h3>
          <p className="text-sm" style={{ color: '#64748B' }}>Our team is available Mon–Sat, 9 AM – 6 PM.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="tel:+233541234567"
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold"
            style={{ border: '2px solid #2D5BE3', color: '#2D5BE3' }}
          >
            <Phone size={15} /> Call Us
          </a>
          <a
            href="mailto:books@dansogroup.com"
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white"
            style={{ backgroundColor: '#2D5BE3' }}
          >
            <Mail size={15} /> Email Us
          </a>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal?.type === 'hardcopy' && (
        <HardcopyModal book={modal.book} onClose={() => setModal(null)} />
      )}
      {modal?.type === 'softcopy' && (
        <SoftcopyModal book={modal.book} onClose={() => setModal(null)} />
      )}
    </section>
  );
}
