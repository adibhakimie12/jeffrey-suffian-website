# Official brand and homepage photography

Local update using client-supplied files (15 October 2026).

- Official logo source: `C:/Users/Adib Hakimi/Desktop/JS logo new 2020.png`. Extracted artwork bounding box x104, y232, width749, height128. Removed blue annotation pixels; retained the original wordmark, grey lettering, AF1963 and black/red/yellow mark. No generative reconstruction.
- Shared header/footer and AccountingService schema use `/assets/jeffrey-suffian-logo.png`, now 749 x 128. Navbar no longer uses a separate text-based imitation. Footer keeps original colours against a white plate.
- Browser icon derives from the official mark (crop x106, y239, 61 x105), padded to 128 x128. Replaces the earlier generic SVG favicon.
- Hero sources: client `2.png` (1131 x1391) and `5.png` (1086 x1448). WebP assets are 1000 x1230 (about190 KB) and1000 x1333 (about229 KB), quality85. No people or photo contents regenerated.
- HeroSlideshow: stable portrait frame on mobile, maximum620px image height on desktop, crossfade and gentle zoom. Service links are below the photograph so faces remain visible. Next/previous, photo selectors and play/pause controls are keyboard accessible. Manual selection pauses autoplay. Hover/focus and hidden documents pause the timer. Reduced motion stops autoplay and transitions.
- Desktop and mobile control checks confirm both pictures load and manual navigation changes the active slide. Viewports375px and320px have no horizontal overflow;320px logo is160px wide and all controls remain in the image frame. Shared brand is used on every page.
- Production build, TypeScript and all9 existing SEO checks passed, including image dimensions and prerendered content. Included in the GitHub/Vercel release authorized on15 October2026.
