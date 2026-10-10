# Jeffrey Suffian Website

Premium React/Vite website foundation for Jeffrey Suffian, Chartered Accountants.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content Updates

Primary page, service, people, industry and insight content lives in `src/App.tsx`.

Official information used:
- Firm: Jeffrey Suffian, Chartered Accountants
- Firm number: AF001963
- Address: Unit 805, Blok E, Phileo Damansara 1, Jalan 16/11, 46350 Petaling Jaya, Selangor, Malaysia
- Phone: 03 7660 3915 / 3917

## Insights guides

Insights contains three complete local guide routes, defined in `src/content/insights.ts` and rendered by `src/components/InsightsPages.tsx`. Guides are included in `allPages` for static HTML and sitemap generation. Article metadata uses individual images, BlogPosting, visible FAQ content and a parent Insights breadcrumb. Source checks are dated; no named professional reviewer, individual author or publication date is invented. Add those fields only when confirmed. The guides are included in the deployment build. Source provenance and verification are recorded in `docs/2026-10-11-insights-review.md`.

## Analytics and enquiries

Configure public build-time values from .env.example when client accounts exist. Choose VITE_GTM_ID OR direct VITE_GA4_ID / VITE_GOOGLE_ADS_ID. Set VITE_SEARCH_CONSOLE_VERIFICATION for verification and VITE_GOOGLE_ADS_LEAD_LABEL for accepted enquiries in direct-tag mode. Rebuild after changing environment variables. Never put private API keys in VITE_ settings.

Tracking is inactive without valid IDs. Measurement scripts load after cookie consent. See analytics-events.md for event semantics, GTM configuration and activation checks.

The contact form is always visible. VITE_ENQUIRY_ENDPOINT enables submission to a separately provisioned first-party backend, which must accept a lead and return 2xx JSON { "success": true }. Without it, submission is disabled with an availability notice and two working telephone links.

## SEO Files

- `public/sitemap.xml`
- `public/robots.txt`
- `seo-roadmap.md`

## Deploy

```bash
npm run build
```

The build prerenders 18 routes into dist with visible HTML, unique metadata and structured data, and generates sitemap/robots from the route list. The canonical origin is https://jeffreysuffian.com. React hydrates the rendered HTML; the dev server uses client rendering for edits.

Deploy dist using vercel.json: static routes, a real 404 and redirects for observed WordPress URLs. Do not add a catch-all rewrite to the homepage. Vite preview does not apply Vercel redirects or headers.

Verification: npm run lint, npm run build, npm run test:seo, npm run test:measurement, npm audit.

Original image provenance: docs/original-image-sources.json. Regeneration script: scripts/import-original-images.mjs. Audit and client launch checklist: docs/2026-10-10-website-audit.md.
