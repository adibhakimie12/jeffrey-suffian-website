# Analytics Events

## Placeholders

- Google Tag Manager ID: replace in `src/App.tsx`
- GA4 Measurement ID: replace in `src/App.tsx`
- Google Search Console verification: replace in `src/App.tsx`
- Google Ads conversion ID: replace in `src/App.tsx`
- Google Ads conversion label: replace in `src/App.tsx`

## Planned Events

| Event | Trigger | Attribute |
| --- | --- | --- |
| page_view | Page route changes | automatic future GA4 |
| contact_form_submit | Contact form submit button | `data-event="contact_form_submit"` |
| phone_click | Phone links | `data-event="phone_click"` |
| email_click | Future email links | `data-event="email_click"` |
| request_consultation_click | Primary CTA links | `data-event="request_consultation_click"` |
| service_page_cta_click | Service page CTA links | `data-event="service_page_cta_click"` |
| partner_profile_view | People profile links | `data-event="partner_profile_view"` |
| insight_article_view | Future article pages | route based |
| blog_cta_click | Insight cards | `data-event="blog_cta_click"` |
| scroll_75 | 75 percent scroll depth | future GTM trigger |

## Notes

Keep event names stable before connecting GA4 or Google Ads conversions.
