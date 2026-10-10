# Contact form and responsive review

## Design

Keep the firm's existing typography, ivory background and black/red/yellow brand accents. Use a white form card with labelled fields, a short introduction and an office information column. On phones, stack the form and office information. Inputs use 16px text, email/tel keyboards, autocomplete and touch targets of at least 44px. Keep required fields to name, email, service, message and response consent; company and phone are optional.

The form stays visible without a backend. Show an availability notice before the fields, disable submission and offer both office numbers. Do not transmit, save or count a lead in this state. A valid first-party endpoint enables submission after rebuilding. Use AbortController with a timer for browser compatibility rather than AbortSignal.timeout.

Reference discovery: [Mocounta accounting contact page on Pinterest](https://www.pinterest.com/pin/842102830351930058/). The public pin was found, but Pinterest displayed a login overlay, limiting visual inspection. No reference assets were copied.

## Imagery and writing

Use a small number of purposeful images: a hero image, real partner portraits, verified office photos and relevant service illustrations. Keep team imagery authentic; do not present stock or generated people as staff. Avoid a gallery of generic calculators and handshakes. Pair each section with a clear headline, a short paragraph and practical bullets. Detailed service pages can contain more text where it answers client questions; do not add filler for SEO or rely on a rigid image/text percentage.

## Verification

- Production build, TypeScript, 6 SEO/output tests and 2 attribution tests passed.
- Browser DOM checks: all 15 public routes at approximately 320, 375, 768 and 1440 CSS pixels (actual widths 319, 375, 767, 1439): 60 checks, no horizontal page overflow, broken loaded images or missing/duplicate H1.
- Contact checked at seven viewport settings spanning small phones, larger phones, tablet and laptops: no overflow; visible form controls stayed within the viewport and used 16px text.
- Native labels, required fields, email validation, consent checkbox and disabled unconfigured submission inspected in the browser.

These checks used the available desktop browser. Safari/WebKit on a real MacBook/iPhone and Chrome on a real Android device have not been tested. Browser width checks do not certify every operating system or browser version. Before launch, smoke-test navigation, native service selector, keyboard/autofill, zoom, telephone/maps links and real enquiry delivery on those devices. Changes are local and have not been deployed to Vercel.
