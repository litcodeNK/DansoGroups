import Image from 'next/image';
import Link from 'next/link';
import { FloatingShapes } from './FloatingShapes';

interface Props {
  title: string;
  breadcrumb: string;
  image?: string;
}

const DEFAULT_IMG =
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1920&auto=format&fit=crop';

export function PageHero({ title, breadcrumb, image }: Props) {
  return (
    <section className="relative flex items-end" style={{ minHeight: '380px' }}>
      {/* Background image */}
      <Image
        src={image ?? DEFAULT_IMG}
        alt={title}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Dark blue overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(6,18,52,0.75)' }}
      />

      <FloatingShapes variant="dark" />

      {/* Geometric blue triangle bottom-left */}
      <div className="absolute bottom-0 left-0 pointer-events-none">
        <svg width="160" height="130" viewBox="0 0 160 130" fill="none">
          <polygon points="0,130 160,130 0,0" fill="#2D5BE3" opacity="0.9" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-14 pt-20 w-full">
        <h1 className="text-5xl font-extrabold text-white mb-3">{title}</h1>
        <nav className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>»</span>
          <span style={{ color: 'rgba(255,255,255,0.85)' }}>{breadcrumb}</span>
        </nav>
      </div>
    </section>
  );
}
