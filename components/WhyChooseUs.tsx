'use client';

import { useRef, useState } from 'react';
import { Settings, HeadphonesIcon, Pause, Play } from 'lucide-react';

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
        <rect x="0" y="2" width="9" height="8" rx="2" fill="#2D5BE3" />
        <rect x="13" y="2" width="9" height="8" rx="2" fill="#2D5BE3" opacity="0.4" />
      </svg>
      <span className="text-xs font-bold uppercase tracking-[3px]" style={{ color: '#2D5BE3' }}>
        {children}
      </span>
    </div>
  );
}

const featureCards = [
  {
    icon: Settings,
    title: 'Best Services',
    desc: 'Scelerisque augue the consequat sodales',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Call Support',
    desc: 'Scelerisque augue the consequat sodales',
  },
];

const skills = [
  { label: 'Information Technology', pct: 80 },
  { label: 'Technology Consultant', pct: 95 },
];

export function WhyChooseUs() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Left — light content */}
        <div className="py-20 px-8 lg:px-16 xl:px-20" style={{ backgroundColor: '#F3F6FF' }}>
          <SectionBadge>Why Choose Us</SectionBadge>

          <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-8" style={{ color: '#0D1B2A' }}>
            Elevate Your Achievements
            <br />
            Using Premier IT Solutions
          </h2>

          {/* Feature icon cards */}
          <div className="grid grid-cols-2 gap-5 mb-10">
            {featureCards.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-5 shadow-sm">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#EEF2FF' }}
                >
                  <Icon size={22} style={{ color: '#2D5BE3' }} />
                </div>
                <h4 className="font-bold text-sm mb-1" style={{ color: '#0D1B2A' }}>
                  {title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div className="space-y-6">
            {skills.map(({ label, pct }) => (
              <div key={label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-semibold" style={{ color: '#0D1B2A' }}>
                    {label}
                  </span>
                  <span className="text-sm font-bold" style={{ color: '#2D5BE3' }}>
                    {pct}%
                  </span>
                </div>
                <div className="h-2 rounded-full" style={{ backgroundColor: '#E2E8F0' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: '#2D5BE3' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — video panel */}
        <div className="relative min-h-[420px] lg:min-h-0 bg-black">
          <video
            ref={videoRef}
            src="/why-choose-us.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            onEnded={() => setPlaying(false)}
          />

          {/* Dark overlay — fades out when playing */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ backgroundColor: 'rgba(10,25,55,0.35)', opacity: playing ? 0 : 1, pointerEvents: 'none' }}
          />

          {/* Blue curved accent at bottom — hides when playing */}
          {!playing && (
            <div
              className="absolute bottom-0 left-0 right-0 h-28 rounded-tl-[60%] pointer-events-none"
              style={{ backgroundColor: 'rgba(45,91,227,0.5)' }}
            />
          )}

          {/* Play / Pause button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-200"
              style={{ opacity: playing ? 0.25 : 1 }}
              aria-label={playing ? 'Pause video' : 'Play video'}
            >
              {playing
                ? <Pause size={20} fill="#2D5BE3" style={{ color: '#2D5BE3' }} />
                : (
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                    <path d="M2 2L18 11L2 20V2Z" fill="#2D5BE3" />
                  </svg>
                )
              }
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
