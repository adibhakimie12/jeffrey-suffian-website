# Contact location map

Replaced the decorative location placeholder with a real Google Maps satellite embed. The firm-specific query resolves to Jeffrey Suffian (AF1963), Phileo Damansara 1, Petaling Jaya; verified visually in the map. This is satellite imagery, not a full 3D scene. Avoided simulated buildings or fabricated geography.

- 280px fixed map height, responsive width, rounded card and labelled header.
- Preserved original Google Maps and Waze directions links and office address.
- Browser-native lazy loading, no map SDK, package or API key added.
- Privacy page now discloses the Google embed connection.
- Desktop map loads real imagery and business marker; map controls offer street-map view.
- Phone at 375px: map width 313.75px, height 280px, no page overflow.
- Build, TypeScript lint and 9 existing SEO checks passed.
- Screenshot: contact-satellite-map.png in the task visualizations directory.

Google business listing found during verification: https://www.google.com/maps/?cid=2129129874842452030

Changes are local only.


## Minimal map refinement (current local version)

Replaced only the map interior with an ivory and grey static location map, with a red office pin. The header, map height, Google Maps button and Waze button remain unchanged, including their destinations and classes.

- Road and building outlines come from real OpenStreetMap geometry, downloaded 2026-10-11 from https://api.openstreetmap.org/api/0.6/map?bbox=101.6390,3.1238,101.6473,3.1290 . Saved as `docs/office-map-source.osm`.
- Exact office pin verified from the original Google business listing: https://www.google.com/maps/?cid=2129129874842452030 , coordinates latitude 3.126508, longitude 101.6432902. This is a styled OSM map with a Google-verified pin, not a copy of Google map imagery or invented AI geography.
- Reproduce with `python scripts/generate-office-map.py`; generated `public/assets/office-location-map.svg`, 800 x 500, about 79 KB, real metre-based projection with north up and a 100 m scale.
- OpenStreetMap attribution remains visible and links to https://www.openstreetmap.org/copyright . No external map connection is needed to display it. Privacy copy updated accordingly.
- Whole map links to the existing Google Maps destination; the two original directions buttons remain exactly as before.
- Desktop visual review completed; 375px viewport map image is 313.75 x 280, office pin centred, no document horizontal overflow, both original direction destinations verified in DOM.
- Build and TypeScript lint passed; all 9 SEO checks passed. Desktop proof: contact-minimal-map.png in task visualizations.
- Local only.
