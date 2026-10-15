# Analytics and Google Ads setup

The integration is prepared but inactive until valid IDs are supplied. See .env.example. All VITE_ values are public build-time settings: never put secrets there. Rebuild after changing them.

## Choose one implementation

**Direct Google tag:** set VITE_GA4_ID, optionally VITE_GOOGLE_ADS_ID and VITE_GOOGLE_ADS_LEAD_LABEL. Leave VITE_GTM_ID blank. GA4 automatic page views are disabled in config because this app sends one explicit page_view per full page load after consent. Ordinary navigation uses real anchors and full document loads.

**Google Tag Manager:** set VITE_GTM_ID. Configure GA4, Google Ads and Conversion Linker inside the container. The application does not load direct tags in this mode. Use the dataLayer custom events below. Disable automatic GA4 page views if a GA4 page_view event tag uses the app's page_view trigger; otherwise two page views can be recorded. Add only one implementation of lead conversion (direct Ads tag OR imported GA4 key event) to avoid counting the same enquiry twice. Check container consent settings before publishing.

## Consent

No Google measurement scripts are loaded until the visitor accepts measurement cookies. The banner appears only when IDs are configured. Choices persist in localStorage; Cookie settings can reopen the banner. Declining after acceptance reloads the page to unload measurement scripts. ad_user_data and ad_personalization remain denied; enhanced conversions and remarketing are not implemented.

## Events

| Event | Actual trigger | Suggested role |
| --- | --- | --- |
| page_view | Page load after accepted consent | Reporting |
| generate_lead | First-party enquiry endpoint returns 2xx JSON with success: true | Primary conversion after delivery is validated |
| request_consultation_click | Consultation link click | Secondary intent signal |
| service_page_cta_click | Service consultation link click | Secondary intent signal |
| phone_click | Telephone link click | Secondary; a click does not prove a completed call |
| partner_profile_view | Profile anchor click | Navigation signal |
| blog_cta_click | Topic / related-service link click | Navigation signal |
| email_click | Email link click | Secondary intent signal |
| whatsapp_click | WhatsApp link click | Secondary intent signal; opening a chat is not a delivered message or accepted lead |

No contact_form_submit conversion is fired on a button click. scroll_75 is not currently implemented. Enhanced measurement form events, if enabled separately in GA4, must not be imported as accepted leads by mistake.

Direct-tag page_location preserves allowlisted UTM and Google click parameters; unrelated parameters and fragments are removed. Keep personal information out of all campaign URLs. Built-in dataLayer events carry only page_path, method and service. Do not configure GTM to read enquiry field values or send names, emails, phones or messages to analytics.

## Optional enquiry backend

Set VITE_ENQUIRY_ENDPOINT to a first-party path such as /api/enquiry after implementing it on the hosting platform. The static project contains the browser form; it does not include an email-delivery service.

The endpoint receives POST application/json containing name, company, email, phone, service, message, consent and website (honeypot). Validate and limit inputs on the server, check origin, rate-limit requests, reject the honeypot, store/deliver the enquiry securely and acknowledge only after accepting it. Return HTTP 2xx JSON { "success": true } on acceptance; use a non-2xx JSON error otherwise. The browser times out after 15 seconds, retains entries on error and prevents simultaneous resubmission. For network retries, implement server-side deduplication before enabling campaigns.

The form is always visible on /contact. Without a valid endpoint, it shows an availability notice, disables submission and offers two working phone links. No form data is transmitted or persisted in this state. Once a valid endpoint is configured and the site rebuilt, submission is enabled. It never pretends an enquiry has been sent.

## Activation checks

1. Create client-owned GA4, Ads and Search Console accounts and add the chosen IDs to Vercel environment variables.
2. Rebuild a preview and test consent decline/accept/revoke in a clean browser using Tag Assistant and GA4 DebugView.
3. Verify one page_view per navigation, no personal fields in requests, UTM attribution, and no generate_lead on invalid or failed submission.
4. Submit a controlled enquiry to the actual backend and confirm delivery before marking generate_lead as a primary conversion.
5. Link GA4 and Ads, enable Ads auto-tagging and verify gclid survives landing redirects. Configure Conversion Linker in GTM mode.
6. Use calls from ads / qualified call measurement separately if required. Do not bid on all CTA clicks as if they were new clients.

Sources: [Google Ads web conversions](https://support.google.com/google-ads/answer/16560108), [GA4 page views](https://developers.google.com/analytics/devguides/collection/ga4/views), [Campaign data collection](https://support.google.com/analytics/answer/11242841).
