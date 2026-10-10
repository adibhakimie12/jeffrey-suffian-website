# Background surfaces

**Goal:** Add restrained visual texture to the local website while preserving the approved layouts, readable content and enquiry flow.

**Direction:** Fading charcoal dots with a warm gold wash on page introductions; a faint ledger grid on shared dark sections. Keep cards, form controls and article bodies clean. Use original CSS rather than installing a third-party component.

Reference: https://news.21st.dev/blog/react-background-pattern-components

Alternatives considered: animated particles add distraction and runtime; full-page grids compete with long text. The selected static, localized patterns suit the existing ivory, red and gold identity.

## Implementation

- [x] Inspect homepage, shared page hero, About, Insights and Contact layouts.
- [x] Add reusable, non-interactive CSS pseudo-elements with scoped stacking contexts; fade decoration away from text.
- [x] Apply dots to introductions and grids to shared dark sections; preserve existing responsive layouts and motion settings.
- [x] Check desktop and narrow mobile views, navigation and form focus.
- [x] Run lint, production build and existing SEO checks; save a local preview.

No additional images, dependencies, network calls or animation loops. This is visual polish, not evidence of improved conversion or ranking.

## User refinement: selective patterns

The first dots were too faint for the user's display. Increase hero dot definition and use a light grid on the Home introduction. The user subsequently emphasized avoiding grids everywhere, so light Section surfaces are plain by default. Explicitly selected card sections use faint dots: homepage partners, Services catalog, team partners, industry business contexts, Insights recommendations, related service cards and the area around Contact form cards. The approved dark grid stays unchanged. About, Privacy and long article bodies retain plain reading sections; their introductions provide the decoration. Insights featured card and footer CTA also remain on plain surfaces.

Reference collection: https://21st.dev/community/components/explore/background-ui-components

## Verification

- Desktop homepage and Contact visually inspected; dark grid checked on homepage approach section.
- Homepage at 320 CSS pixels, Contact and Insights at 375 CSS pixels: no horizontal overflow.
- Contact navigation works; full-name input accepts focus/text with 16px type. Test value cleared by reload.
- Decorative pseudo-elements use pointer-events:none and negative stacking within isolated sections.
- `npm run lint`, `npm run build`, `npm run test:seo`: passed (9 SEO checks).
- Production CSS gzip 11.12kB (previous 10.88kB); no background assets or runtime added.
- Preview saved as home-background-refined.png in the task visualizations directory. Changes remain local.
