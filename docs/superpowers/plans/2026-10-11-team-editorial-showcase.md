# Our Team editorial showcase

**Goal:** Replace the basic equal-card layout on Our Team with a professional editorial composition. Preserve every displayed name, role, credential, biography, portrait and profile anchor. Keep homepage partner cards unchanged.

**Design:** Staggered arched portrait triptych in the hero; three substantial partner profiles with alternating image placement on desktop and consistent image-first order on phones. Two compact portrait-and-name team cards follow. Plain reading surfaces, restrained dots on the secondary team section, existing dark-grid contact CTA. No fake statistics, social links or hidden hover-only biographies.

References:
- https://21st.dev/@ravikatiyar162/components/team-showcase (staggered portrait composition and restrained entrance/hover motion)
- https://za.pinterest.com/rodemarais03/brand-managing/ (editorial team layout discovery; direct page access returned 403)

## Work

- [x] Review the existing team data and research reference concepts.
- [x] Create `src/components/TeamShowcase.tsx`, preserving existing data and anchor IDs.
- [x] Integrate into PeoplePage with existing ServiceMotion and contact CTA.
- [x] Add hover motion gated on hover support and reduced-motion preference.
- [x] Inspect desktop, phone and anchor navigation; confirm names and bios remain visible.
- [x] Run lint, build and existing SEO checks; save preview.

No added packages, generated people, invented biographical claims or deployment.

## Verification

- Desktop 1336px: hero composition and alternating partner profiles inspected.
- Phone 320px and 375px: no horizontal overflow; all five names and portraits retained. Adjusted mobile heading to 36px for a more compact introduction.
- Hero Eddy portrait link navigates to #eddy-suffian, with the profile below the fixed navbar; other existing member IDs remain intact.
- `npm run lint`, `npm run build`, `npm run test:seo` pass (9 tests).
- Saved preview: team-editorial-hero.png in the task visualizations directory.
