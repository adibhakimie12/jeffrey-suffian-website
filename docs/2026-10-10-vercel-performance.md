# Vercel deployment and performance — 10 October 2026

Production: https://jeffrey-suffian-website.vercel.app/

Project: `prj_EvRwt0ULacosVYrxG3Kh5fnEG4fw` in `adibhakimi19-9443s-projects`.
Final deployment: `dpl_2DeH7ioaUsuksKFreririjrrpatA`, READY, production alias verified.
The local directory is now linked through ignored `.vercel/project.json`. Deployment used the Vercel CLI; source changes have not been committed or pushed to GitHub. The original domain and DNS were not changed.

## PageSpeed Insights results

Reports captured at 22:10 MYT on 10 October 2026 using Lighthouse 13.5.0.

| Page / device | Performance | FCP | LCP | TBT | CLS | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage / mobile | 97 | 1.5 s | 2.1 s | 0 ms | 0 | 4.0 s |
| Homepage / desktop | 100 | 0.3 s | 0.4 s | 0 ms | 0 | 0.7 s |
| Services / mobile | 100 | 1.4 s | 1.7 s | 0 ms | 0 | 1.4 s |

- [Homepage mobile report](https://pagespeed.web.dev/analysis/https-jeffrey-suffian-website-vercel-app/0szov80dij?form_factor=mobile)
- [Homepage desktop report](https://pagespeed.web.dev/analysis/https-jeffrey-suffian-website-vercel-app/0szov80dij?form_factor=desktop)
- [Services mobile report](https://pagespeed.web.dev/analysis/https-jeffrey-suffian-website-vercel-app-services/auy4hgj1wm?form_factor=mobile)

Mobile tests emulate Moto G Power on Slow 4G; desktop uses Lighthouse desktop settings. Each is one lab run. PageSpeed reported no real-user field data. TBT is not a measured INP result. Results vary with network, device, geography, cache and future third-party tags. These tests are not a concurrency/load test.

## Improvement made after initial deployment

The first homepage mobile run scored 87, with FCP 2.7 s and LCP 3.1 s. The render-blocking audit identified Google Fonts CSS (750 ms resource duration; total estimated render-blocking savings 1,330 ms).

Libre Baskerville and Manrope WOFF2 font files are now served from `/fonts/`, with `font-display: swap` and preloads for the two normal faces. The external Google Fonts stylesheet and connections were removed. Normal serif, italic serif and variable sans styles are retained; OFL license notices accompany the fonts. Font sources were Google Fonts CSS / fonts.gstatic.com; license sources were the google/fonts repository's ofl/librebaskerville and ofl/manrope directories.

After redeployment, homepage mobile improved to 97 and LCP 2.1 s. This before/after comparison is indicative, not a controlled guarantee: lab runs have variability. Remaining diagnostics include small image-delivery savings and unused JavaScript; no further optional tuning was required to establish good lab performance.

## Live deployment checks

- All 15 sitemap routes return HTTP 200 with exactly one H1.
- Unknown route returns HTTP 404 and the custom not-found HTML.
- `/our-services` returns HTTP 308 to `/services`.
- Sitemap, robots, current navbar, typewriter heading and local WebP hero verified live.
- Fonts are present in live HTML and the Google Fonts stylesheet is absent.
- Explicit homepage headers were added after the wildcard header rule did not apply at `/`; the live homepage now returns `X-Content-Type-Options: nosniff` and the intended `X-Robots-Tag`.
- Local production build, TypeScript, 6 output/SEO tests and 2 attribution tests passed before deployment.

## Search and account status

The vercel.app hostname intentionally returns `X-Robots-Tag: noindex, nofollow` to avoid competing with the client's original domain. This produces a Lighthouse SEO score of 69 on the preview hostname (the failed check is indexing). Do not remove this merely to improve the score. The original-domain configuration permits indexing, but actual domain setup, HTTPS, redirects and Search Console must be checked when that domain is moved.

Accessibility scored 95 and Best Practices 100 in these reports. Automatic checks are not full accessibility certification. Form delivery and measurement remain inactive until the client supplies an endpoint and account IDs.

Core Web Vitals guidance: https://web.dev/articles/vitals
