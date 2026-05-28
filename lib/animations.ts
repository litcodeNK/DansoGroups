import { gsap, ScrollTrigger } from './gsap';

type TriggerEl = Element | null | undefined;

export function revealHeading(selector: string, triggerEl?: TriggerEl) {
  gsap.from(selector, {
    clipPath: 'inset(100% 0 0 0)',
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: { trigger: triggerEl ?? selector, start: 'top 85%' },
  });
}

export function fadeUp(
  selector: string,
  opts: { stagger?: number; delay?: number; triggerEl?: TriggerEl } = {}
) {
  gsap.from(selector, {
    y: 60,
    opacity: 0,
    duration: 0.85,
    stagger: opts.stagger ?? 0,
    delay: opts.delay ?? 0,
    ease: 'expo.out',
    scrollTrigger: { trigger: opts.triggerEl ?? selector, start: 'top 85%' },
  });
}

export function slideIn(
  selector: string,
  dir: 'left' | 'right',
  opts: { delay?: number; triggerEl?: TriggerEl } = {}
) {
  gsap.from(selector, {
    x: dir === 'left' ? -90 : 90,
    opacity: 0,
    duration: 0.95,
    delay: opts.delay ?? 0,
    ease: 'expo.out',
    scrollTrigger: { trigger: opts.triggerEl ?? selector, start: 'top 82%' },
  });
}

export function staggerCards(
  selector: string,
  triggerEl?: TriggerEl
) {
  gsap.from(selector, {
    y: 80,
    opacity: 0,
    rotation: 1.5,
    duration: 0.9,
    stagger: 0.15,
    ease: 'expo.out',
    transformOrigin: 'center bottom',
    scrollTrigger: { trigger: triggerEl ?? selector, start: 'top 82%' },
  });
}

export { ScrollTrigger };
