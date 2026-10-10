# Services review — local preview

## Changes

- Subtle one-time viewport entrance animations via IntersectionObserver and Web Animations, with no hidden content before hydration. Reduced-motion users receive static content; listeners and animations are cleaned up.
- Pointer hover lift on services cards; no animation dependency or new remote assets.
- Larger overview, scope, audience and FAQ text on seven service pages.
- Services hub: direct firm/location summary, enquiry preparation guidance and four FAQs using a shared content source for HTML and JSON-LD.
- Seven-item service catalog JSON-LD on the hub; Service and FAQPage retained on each detail page.
- Three-level service breadcrumbs in both visible navigation and schema; two relevant internal service links per detail page.

## Verification

- Build, TypeScript and seven SEO/build tests passed.
- All eight services routes inspected in browser at desktop, 375 and 320 CSS pixel widths: one H1, no horizontal overflow.
- FAQ expansion and related-service navigation tested in browser.
- FAQ schema checked against readable prerendered questions and answers, catalog checked for seven destinations, detail breadcrumb positions checked.

## SEO / AEO / GEO limits

Pages remain prerendered, internally linked and included in the original-domain sitemap. Unique metadata, canonical URLs and firm entity/address details are present. This supports discovery and understanding; it does not guarantee rankings, indexing, rich results or citations in AI answers.

Google says its existing SEO fundamentals apply to AI Overviews and AI Mode, and no special AI schema or machine-readable file is required: https://developers.google.com/search/docs/appearance/ai-features

Existing service categories checked against https://jeffreysuffian.com/our-services/. Introductory and FAQ copy is explanatory website copy and should be confirmed by the firm before launch; it is not a verbatim reproduction of all original text or personalised regulatory advice.

Local changes only. No production deployment in this iteration. The Vercel preview remains intentionally noindex; the original domain and Search Console still need launch verification.
