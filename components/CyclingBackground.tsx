'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface CyclingBackgroundProps {
  images: string[];
  interval?: number;
  overlay?: string;
  className?: string;
}

export function CyclingBackground({
  images,
  interval = 4500,
  overlay = 'bg-gradient-to-b from-dark/70 via-dark/60 to-dark',
  className = '',
}: CyclingBackgroundProps) {
  const slotA = useRef<HTMLDivElement>(null);
  const slotB = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const activeRef = useRef<'A' | 'B'>('A');

  useEffect(() => {
    if (!slotA.current || !slotB.current || images.length < 1) return;

    // Set initial image on slot A, preload slot B with image[1]
    slotA.current.style.backgroundImage = `url(${images[0]})`;
    slotB.current.style.backgroundImage = `url(${images[1] ?? images[0]})`;
    gsap.set(slotA.current, { opacity: 1 });
    gsap.set(slotB.current, { opacity: 0 });

    const tick = () => {
      indexRef.current = (indexRef.current + 1) % images.length;
      const nextIndex = (indexRef.current + 1) % images.length;

      const incoming = activeRef.current === 'A' ? slotB.current! : slotA.current!;
      const outgoing = activeRef.current === 'A' ? slotA.current! : slotB.current!;

      // Preload next
      incoming.style.backgroundImage = `url(${images[indexRef.current]})`;

      // Ken Burns on incoming
      gsap.fromTo(
        incoming,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.inOut' }
      );
      gsap.to(outgoing, { opacity: 0, duration: 1.6, ease: 'power2.inOut' });

      // Preload the one after
      setTimeout(() => {
        const preload = new Image();
        preload.src = images[nextIndex];
      }, 1000);

      activeRef.current = activeRef.current === 'A' ? 'B' : 'A';
    };

    // Ken Burns on first image
    gsap.fromTo(slotA.current, { scale: 1.08 }, { scale: 1, duration: 6, ease: 'power1.out' });

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [images, interval]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ zIndex: 0 }}>
      <div
        ref={slotA}
        className="absolute inset-0 bg-center bg-cover will-change-transform"
        style={{ opacity: 1 }}
      />
      <div
        ref={slotB}
        className="absolute inset-0 bg-center bg-cover will-change-transform"
        style={{ opacity: 0 }}
      />
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
