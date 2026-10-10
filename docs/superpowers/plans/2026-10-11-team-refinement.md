# Team page refinement

User approved the proposed design with “ok go”. Local implementation only.

## Goal and design
Menu: Our Team. Page title: Our Partners & Team. Keep /our-people and existing profile anchors. Separate the three partners from the remaining team members, preserve circular photos and existing verified biographies, remove repeated credentials and generic filler from the team presentation. Increase profile readability only on this page, leaving the homepage presentation intact. Use the existing lightweight reveal animation with reduced-motion support and server-visible content.

## Implementation and verification
- [x] Update navigation and page metadata in src/App.tsx.
- [x] Add a detailed profile presentation and two labelled sections.
- [x] Make the existing motion wrapper accept a reveal selector; reuse it for team cards.
- [x] Run build, lint and SEO checks; inspect desktop and narrow mobile in the browser.

No new titles, qualifications or experience will be invented. No deployment.
