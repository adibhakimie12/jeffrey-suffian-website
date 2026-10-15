import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

const slides = [
  { src: '/assets/hero-office-collaboration.webp', width: 1400, height: 933, alt: 'Team members working together with a laptop and notebook', title: 'Clarity starts with a conversation.', label: 'Working together' },
  { src: '/assets/hero-office-advisory.webp', width: 1400, height: 933, alt: 'Team members reviewing documents together at a laptop', title: 'A shared focus on your business.', label: 'A personal approach' },
];

export function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  const running = playing && !reducedMotion && !hovered && !focused && visible;
  useEffect(() => {
    if (!running) return;
    const timeout = window.setTimeout(() => setActive(index => (index + 1) % slides.length), 3000);
    return () => window.clearTimeout(timeout);
  }, [active, running]);

  const select = (index: number) => {
    setActive((index + slides.length) % slides.length);
    setPlaying(false);
  };

  return (
    <section aria-label="Our team at work" aria-roledescription="carousel" className="hero-visual mobile-hero-visual"
      onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <svg aria-hidden="true" width="0" height="0" className="absolute"><defs><clipPath id="hero-photo-curve" clipPathUnits="objectBoundingBox"><path d="M.32 0 H.94 Q1 0 1 .08 V.77 C1 .9 .86 .93 .72 .95 L.08 1 Q0 1 0 .9 V.4 C0 .3 .12 .29 .16 .19 C.19 .09 .21 .02 .32 0Z" /></clipPath></defs></svg>
      <div className="hero-photo-window">
        {slides.map((slide, index) => (
          <div key={slide.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slide.label}`} aria-hidden={index !== active}
            className={`hero-photo-slide absolute inset-0 ${index === active ? 'is-active' : ''}`}>
            <img src={slide.src} srcSet={`${slide.src.replace('.webp', '-640.webp')} 640w, ${slide.src.replace('.webp', '-960.webp')} 960w, ${slide.src} 1400w`} sizes="(min-width: 1600px) 1000px, (min-width: 1024px) 65vw, (min-width: 640px) calc(100vw - 96px), calc(100vw - 64px)" alt={slide.alt} width={slide.width} height={slide.height} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'low'} decoding="async" className="hero-photo-image h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <svg aria-hidden="true" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="hero-photo-frame"><path className="hero-photo-frame-band" d="M320 0 H940 Q1000 0 1000 80 V770 C1000 900 860 930 720 950 L80 1000 Q0 1000 0 900 V400 C0 300 120 290 160 190 C190 90 210 20 320 0Z" vectorEffect="non-scaling-stroke" /><path className="hero-photo-frame-line" d="M320 0 H940 Q1000 0 1000 80 V770 C1000 900 860 930 720 950 L80 1000 Q0 1000 0 900 V400 C0 300 120 290 160 190 C190 90 210 20 320 0Z" vectorEffect="non-scaling-stroke" /></svg>
      <div className="hero-carousel-controls" role="group" aria-label="Slideshow controls">
        {!reducedMotion && <button type="button" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} className="hero-control-button">
          {playing ? <Pause aria-hidden="true" className="h-3.5 w-3.5" /> : <Play aria-hidden="true" className="h-3.5 w-3.5" />}
        </button>}
        <button type="button" aria-label="Previous team photograph" onClick={() => select(active - 1)} className="hero-control-button"><ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" /></button>
        <div className="flex items-center" role="group" aria-label="Choose a team photograph">
          {slides.map((slide, index) => <button key={slide.src} type="button" aria-label={`Show photograph ${index + 1}: ${slide.label}`} aria-pressed={index === active} onClick={() => select(index)} className="flex h-11 w-9 cursor-pointer items-center justify-center">
            <span aria-hidden="true" className={`h-1 rounded-full transition-all ${index === active ? 'w-5 bg-signature-red' : 'w-2 bg-charcoal/30'}`} />
          </button>)}
        </div>
        <button type="button" aria-label="Next team photograph" onClick={() => select(active + 1)} className="hero-control-button"><ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></button>
      </div>
      <div className="hero-service-links">
        <a id="hero-widget-audit" href="/services/statutory-audit-assurance" className="hero-service-link">Statutory Audit <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-signature-red" /></a>
        <a id="hero-widget-tax" href="/services/tax-compliance-advisory" className="hero-service-link">Tax Advisory <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-signature-red" /></a>
      </div>
    </section>
  );
}
