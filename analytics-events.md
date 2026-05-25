# Analytics Events

## Placeholders

- Google Tag Manager ID: replace in `src/App.tsx`
- GA4 Measurement ID: replace in `src/App.tsx`
- Google Search Console verification: replace in `src/App.tsx`
- Google Ads conversion ID: replace in `src/App.tsx`
- Google Ads conversion label: replace in `src/App.tsx`

## Planned Events

| Event name | Trigger | Recommended GA4 conversion status | Where it appears |
| --- | --- | --- | --- |
| page_view | Route/page load | No | All pages |
| request_consultation_click | Primary Request Consultation CTA | Yes | Header, homepage hero, final CTA, mobile sticky CTA |
| contact_form_submit | Contact form submit button | Yes | `/contact` |
| phone_click | Phone number links | Yes | Footer, CTA blocks, contact page |
| email_click | Future email links | No | Future footer/contact links |
| service_page_cta_click | Service landing page CTA | Yes | All `/services/*` pages |
| partner_profile_view | Partner profile links | No | Homepage partner preview, `/our-people` |
| blog_cta_click | Insights card links and View Insights CTA | No | Homepage insights preview, `/insights` |
| scroll_75 | 75 percent page scroll | No | Future GTM scroll trigger |

## Data Attributes

- `data-event="request_consultation_click"`
- `data-event="contact_form_submit"`
- `data-event="phone_click"`
- `data-event="email_click"`
- `data-event="service_page_cta_click"`
- `data-event="partner_profile_view"`
- `data-event="blog_cta_click"`

Keep event names stable before connecting GA4 or Google Ads conversions.
