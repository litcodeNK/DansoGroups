'use client';

interface PhoneMockupProps {
  alt: string;
  onClick?: () => void;
  className?: string;
}

export function PhoneMockup({ alt, onClick, className = '' }: PhoneMockupProps) {
  return (
    <div
      onClick={onClick}
      className={`relative ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      aria-label={alt}
    >
      {/* Soft accent glow behind the phone */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #E8650A 0%, transparent 70%)' }}
      />

      {/* Real device photo — radial mask fades white background edges into the dark page */}
      <img
        src="/phone-real.jpeg"
        alt={alt}
        draggable={false}
        className="relative w-full h-auto object-contain select-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 82% 92% at 50% 50%, black 55%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 82% 92% at 50% 50%, black 55%, transparent 100%)',
          filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.55))',
        }}
      />
    </div>
  );
}
