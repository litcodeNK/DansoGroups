export function FloatingShapes({ variant = 'light' }: { variant?: 'dark' | 'light' }) {
  const o =
    variant === 'dark'
      ? { solid: 'rgba(45,91,227,0.22)', border: 'rgba(45,91,227,0.5)', wave: 'rgba(45,91,227,0.5)' }
      : { solid: 'rgba(45,91,227,0.07)', border: 'rgba(45,91,227,0.13)', wave: 'rgba(45,91,227,0.15)' };

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block"
      aria-hidden="true"
    >
      {/* Top-right bordered square */}
      <div
        className="absolute top-10 right-10"
        style={{ animation: 'hsway 3.8s ease-in-out infinite' }}
      >
        <div className="w-24 h-24 border-2" style={{ borderColor: o.border }} />
      </div>

      {/* Bottom-right solid square */}
      <div
        className="absolute bottom-14 right-20"
        style={{ animation: 'hspin 3.2s ease-in-out infinite' }}
      >
        <div className="w-14 h-14" style={{ backgroundColor: o.solid }} />
      </div>

      {/* Left-center wave path */}
      <div
        className="absolute left-8"
        style={{ top: '42%', animation: 'hdrift 4.5s ease-in-out infinite' }}
      >
        <svg width="28" height="50" viewBox="0 0 40 68" fill="none">
          <path
            d="M20 4 C6 18, 34 28, 20 42 C6 56, 34 66, 20 78"
            stroke={o.wave}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom-left solid square */}
      <div
        className="absolute bottom-12 left-14"
        style={{ animation: 'hfloat 5s ease-in-out infinite 1.5s' }}
      >
        <div className="w-10 h-10" style={{ backgroundColor: o.solid }} />
      </div>

      {/* Top-left small circle */}
      <div
        className="absolute top-16 left-1/3"
        style={{ animation: 'hfloat 4s ease-in-out infinite 0.8s' }}
      >
        <div
          className="w-5 h-5 rounded-full"
          style={{ backgroundColor: o.solid, transform: 'scale(1)' }}
        />
      </div>
    </div>
  );
}
