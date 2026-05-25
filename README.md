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

## Adding Blog Articles Later

Use the `insights` array in `src/App.tsx` to add article cards first. For full article pages, create a dedicated article data array with slug, title, category, excerpt and content, then add routes under `/insights/<slug>`.

## Analytics Placeholders

Replace these placeholders in `src/App.tsx` when accounts are ready:
- `Google Tag Manager ID`
- `GA4 Measurement ID`
- `Google Search Console verification`
- `Google Ads conversion ID`
- `Google Ads conversion label`

Tracked event attributes are documented in `analytics-events.md`.

## SEO Files

- `public/sitemap.xml`
- `public/robots.txt`
- `seo-roadmap.md`

## Deploy

```bash
npm run build
```

Deploy the generated `dist` folder to a static host that supports SPA fallback to `index.html`.
