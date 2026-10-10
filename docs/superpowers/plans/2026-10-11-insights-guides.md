# Insights guides implementation

User approved three complete guides and requested research and an attractive local implementation. Apply the brainstorming-approved editorial direction with UI/UX Pro Max guidance: clear reading hierarchy, visible sources, restrained motion, existing brand/fonts, no invented credentials or statistics.

## Design and files
- Create src/content/insights.ts: three original practical guides, source links, key points, sections, FAQ, related services and image metadata.
- Create src/components/InsightsPages.tsx: editorial index, complete article pages, table of contents, accessible lists/comparison, related reading and consultation links. Use existing optimized illustrative images.
- Update App.tsx: remove six service-link placeholders, register three article routes, breadcrumbs and truthful BlogPosting/FAQ/collection schema.
- Update seo.ts: article-specific OG metadata, image and alt support, consistent in SSR and client hydration.
- Existing prerender automatically produces 18 routes and includes guides in sitemap.

Sources checked 11 October 2026: SSM Audit Exemption page; IAASB ISA 700 page; HASiL e-Services; business.gov.au Buy an existing business (general transaction concepts only, not Malaysian legal/tax requirements).

## Tasks
- [x] Add build tests for three real guides, source links, parent breadcrumbs, schema/visible FAQ consistency and unique article previews.
- [x] Write content and implement the index/article templates.
- [x] Wire routes and metadata with no fake individual author, professional reviewer or publication date.
- [x] Build, lint, SEO verification and browser checks on desktop and mobile, including article navigation and table-of-contents anchors.

Scope: local preview only. No deployment or promise of rankings/AI citations. Practical checklists are editorial suggestions, not mandatory statutory lists. Do not provide exemption thresholds or tax deadlines that this content does not need.
