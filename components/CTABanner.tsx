function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
        <rect x="0" y="2" width="9" height="8" rx="2" fill="rgba(255,255,255,0.9)" />
        <rect x="13" y="2" width="9" height="8" rx="2" fill="rgba(255,255,255,0.4)" />
      </svg>
      <span className="text-xs font-bold uppercase tracking-[3px] text-white/80">{children}</span>
    </div>
  );
}

export function CTABanner() {
  return (
    <section
      className="relative overflow-hidden mx-6 lg:mx-8 my-14 rounded-sm"
      style={{ backgroundColor: '#2D5BE3' }}
    >
      {/* Circuit-like grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 40%),' +
            'repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 40%)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-8 lg:px-14 py-14 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <SectionBadge>Get In Touch</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              We Take Care Of Your
              <br />
              Technology
            </h2>
          </div>
          <a
            href="/contact"
            className="shrink-0 flex items-center gap-2 text-white text-sm font-bold px-8 py-4 rounded-sm transition-colors hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.55)' }}
          >
            Get A Quote <span className="text-base leading-none">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
