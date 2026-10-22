import { ExternalLink, Star } from 'lucide-react';

// Manually checked on the business's Google Maps listing, 22 October 2026.
// A dated snapshot, not a live Places API feed or review rich-result schema.
export function GoogleReviewBadge() {
  return <a href="https://www.google.com/maps/?cid=2129129874842452030" target="_blank" rel="noopener noreferrer" aria-label="Rated 5 out of 5 from 4 Google reviews. Read on Google Maps (opens in a new tab)" title="Google rating checked 22 October 2026" className="inline-flex max-w-full min-h-11 flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-charcoal/10 bg-white/90 px-4 py-3 text-charcoal shadow-sm transition-colors hover:border-champagne/70">
    <span aria-hidden="true" className="flex gap-0.5 text-[#ad7600]">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</span>
    <span className="text-sm font-bold text-obsidian">5.0<span className="font-normal text-charcoal/65"> / 5</span></span>
    <span className="inline-flex items-center gap-2 text-xs font-medium">Google &middot; 4 reviews<ExternalLink aria-hidden="true" className="h-3 w-3" /></span>
  </a>;
}
