# Website audit and launch preparation

Goal: retain the existing design, bring original imagery into the repository, and repair verified search and lead-generation gaps for the existing domain.

Architecture: render every public route to static HTML during the Vite build and hydrate it in React. Keep metadata, schema, sitemap and crawler configuration consistent. Tracking and enquiry submission remain configurable and inactive until the client supplies account IDs and a working endpoint.

- [x] Establish failing output checks for readable HTML, canonical URLs, schema, portraits, contact fallback and 404.
- [x] Download verified original assets, optimise WebP images and record source provenance.
- [x] Render each existing route to HTML; generate sitemap/robots; preserve old WordPress paths with redirects.
- [x] Repair local portraits, contextual service imagery, dead links and contact interactions.
- [x] Add optional consent-based tracking, successful-enquiry-only lead events and documented configuration.
- [x] Verify build, types, generated output, desktop/mobile UI and dependency audit; write launch checklist and findings.
