export function FloatingShapes({ variant = 'light' }: { variant?: 'dark' | 'light' }) {
  const o =
    variant === 'dark'
      ? { solid: 'rgba(45,91,227,0.22)', border: 'rgba(45,91,227,0.5)', wave: 'rgba(45,91,227,0.5)' }
      : { solid: 'rgba(45,91,227,0.07)', border: 'rgba(45,91,227,0.13)', wave: 'rgba(45,91,227,0.15)' };

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Top-right bordered square */}
      <div
        className="absolute top-8 right-8"
        style={{ animation: 'hsway 3.8s ease-in-out infinite' }}
      >
        <div className="w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-2" style={{ borderColor: o.border }} />
      </div>

      {/* Bottom-right solid square */}
      <div
        className="absolute bottom-10 right-14"
        style={{ animation: 'hspin 3.2s ease-in-out infinite' }}
      >
        <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14" style={{ backgroundColor: o.solid }} />
      </div>

      {/* Left-center wave path */}
      <div
        className="absolute left-4 sm:left-8"
        style={{ top: '42%', animation: 'hdrift 4.5s ease-in-out infinite' }}
      >
        <svg width="22" height="40" viewBox="0 0 40 68" fill="none">
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
        className="absolute bottom-10 left-10"
        style={{ animation: 'hfloat 5s ease-in-out infinite 1.5s' }}
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" style={{ backgroundColor: o.solid }} />
      </div>

      {/* Top-center small circle */}
      <div
        className="absolute top-12 left-1/3"
        style={{ animation: 'hfloat 4s ease-in-out infinite 0.8s' }}
      >
        <div
          className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full"
          style={{ backgroundColor: o.solid }}
        />
      </div>
    </div>
  );
}
