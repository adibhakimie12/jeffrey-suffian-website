import { useEffect, useRef, type ReactNode } from 'react';

/** Content stays visible before hydration and when animations are unavailable. */
export function ServiceMotion({ children, revealSelector = '[data-service-reveal]' }: { children: ReactNode; revealSelector?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (reduced.matches || !entry.target.animate) return;
        const animation = entry.target.animate(
          [{ opacity: 0.65, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 520, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' }
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.12 });
    root.current?.querySelectorAll(revealSelector).forEach((element) => observer.observe(element));
    const stop = () => { if (reduced.matches) animations.forEach((animation) => animation.cancel()); };
    reduced.addEventListener('change', stop);
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); reduced.removeEventListener('change', stop); };
  }, [revealSelector]);
  return <div ref={root} className="service-motion">{children}</div>;
}
