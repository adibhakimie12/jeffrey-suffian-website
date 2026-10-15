import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

const slides = [
  { src: '/assets/hero-team-collaboration.webp', width: 1000, height: 1230, alt: 'Team members working together with a laptop and notebook', title: 'Clarity starts with a conversation.', label: 'Working together' },
  { src: '/assets/hero-team-advisory.webp', width: 1000, height: 1333, alt: 'Team members reviewing documents together at a laptop', title: 'A shared focus on your business.', label: 'A personal approach' },
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
    const timeout = window.setTimeout(() => setActive(index => (index + 1) % slides.length), 6500);
    return () => window.clearTimeout(timeout);
  }, [active, running]);

  const select = (index: number) => {
    setActive((index + slides.length) % slides.length);
    setPlaying(false);
  };

  return (
    <section aria-label="Our team at work" aria-roledescription="carousel" className="mobile-hero-visual relative mt-8 min-w-0 lg:mt-0"
      onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="relative isolate aspect-[4/5] w-full max-h-[620px] overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-charcoal shadow-[0_24px_70px_-24px_rgba(43,43,43,0.35)]">
        {slides.map((slide, index) => (
          <div key={slide.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slide.label}`} aria-hidden={index !== active}
            className={`hero-photo-slide absolute inset-0 ${index === active ? 'is-active' : ''}`}>
            <img src={slide.src} alt={slide.alt} width={slide.width} height={slide.height} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'low'} decoding="async" className="hero-photo-image h-full w-full object-cover object-center" />
          </div>
        ))}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:left-6 sm:top-6">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signature-yellow" /> Our team at work
        </div>
        {!reducedMotion && <button type="button" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/60">
          {playing ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
        </button>}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-signature-yellow">{slides[active].label}</p>
          <p className="max-w-lg font-serif text-xl leading-tight sm:text-2xl">{slides[active].title}</p>
          <div className="mt-5 flex items-center justify-between border-t border-white/25 pt-3">
            <div className="flex items-center gap-1" role="group" aria-label="Choose a team photograph">
              {slides.map((slide, index) => <button key={slide.src} type="button" aria-label={`Show photograph ${index + 1}: ${slide.label}`} aria-pressed={index === active} onClick={() => select(index)} className="flex h-11 w-11 cursor-pointer items-center justify-center">
                <span aria-hidden="true" className={`h-1 rounded-full transition-all ${index === active ? 'w-8 bg-signature-yellow' : 'w-4 bg-white/45'}`} />
              </button>)}
              <span aria-hidden="true" className="ml-2 hidden text-[11px] tabular-nums text-white/70 min-[360px]:inline">0{active + 1} / 02</span>
            </div>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous team photograph" onClick={() => select(active - 1)} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/35 transition-colors hover:bg-white/15"><ArrowLeft aria-hidden="true" className="h-4 w-4" /></button>
              <button type="button" aria-label="Next team photograph" onClick={() => select(active + 1)} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/35 transition-colors hover:bg-white/15"><ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <a id="hero-widget-audit" href="/services/statutory-audit-assurance" className="flex min-h-14 items-center justify-between gap-2 rounded-xl border border-charcoal/10 bg-white/80 px-4 py-3 text-xs font-bold text-obsidian transition-colors hover:border-signature-red/40">Statutory Audit <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-signature-red" /></a>
        <a id="hero-widget-tax" href="/services/tax-compliance-advisory" className="flex min-h-14 items-center justify-between gap-2 rounded-xl border border-charcoal/10 bg-white/80 px-4 py-3 text-xs font-bold text-obsidian transition-colors hover:border-signature-red/40">Tax Advisory <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-signature-red" /></a>
      </div>
    </section>
  );
}
