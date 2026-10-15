# Organic hero image provenance

Built-in imagegen edited the backgrounds of the two client-supplied team photographs. The office setting is illustrative, not documentary evidence of the actual office. The outputs were visually checked against the original people, clothing and activity; no exact pixel identity guarantee is implied by an AI edit. Original client photos remain unchanged.

## Final project assets

- `public/assets/hero-office-collaboration.webp` — 1400 × 933, about149 KB.
- `public/assets/hero-office-advisory.webp` — 1400 × 933, about172 KB.
- Each also has640px and960px responsive WebP siblings, selected through srcset/sizes. The640px files are about39 KB and46 KB.

## Prompts

### heroOfficeCollaboration

Source: `C:/Users/Adib Hakimi/Desktop/2.png`

Edit target: attached photo of three Malaysian team members with laptop and notebook. Create a high-resolution 3:2 landscape editorial photograph for the RIGHT HALF of a premium accounting firm's website hero. Preserve these exact three people's identity, facial features, glasses, hairstyles, skin tones, batik patterns, black blazer, poses and activity as faithfully as possible; no new people, no beauty retouching. Replace ONLY the original grey wall, artwork, ceiling and sofa setting with a soft-focus contemporary glass-office interior in warm ivory, taupe and subtle gold daylight, glass partitions, a discreet green plant. Group all three people naturally close together, their heads entirely visible in the right two-thirds, the laptop and notebook visible below. Left quarter is softly blurred light ivory office negative space for a seamless CSS fade. Crop upper body at the lower edge, not heads or hands. Natural realistic photographic lighting. No text, no logos, no UI, no borders, no watermarks. This is a background adaptation of the real supplied team photo, not a new stock team. Output just the edited photograph.

### heroOfficeAdvisory

Source: `C:/Users/Adib Hakimi/Desktop/5.png`

Edit target: attached photo of a Malaysian woman in beige hijab with two male team members reviewing documents at a laptop. Create a high-resolution 3:2 landscape editorial photograph for the RIGHT HALF of a premium accounting firm's website hero. Preserve these exact three people's identity, facial features, glasses, hairstyles, skin tones, beige hijab, batik patterns, black blazer, poses and activity as faithfully as possible; no additional people, no beauty retouching. Replace ONLY the original grey wall and office background with a soft-focus contemporary glass-office interior in warm ivory, taupe and subtle gold daylight, glass partitions and a discreet green plant. Group the people naturally close, all heads fully visible in right two-thirds, their document and laptop visible below. Left quarter is softly blurred light ivory office negative space for a seamless CSS fade. Crop upper body at the lower edge, not heads or hands. Natural realistic photographic lighting. No text, no logos, no UI, no borders, no watermarks. This is a background adaptation of the real supplied team photo, not a new stock team. Output just the edited photograph.

## Layout and checks

React renders real HTML hero copy and links. Curved SVG photo mask, ivory frame, thin gold contour and a left-side recess with Services/Team/Contact shortcuts on desktop. Compact service links stay visible on both slides. Existing text typing, image zoom and crossfade remain. Autoplay is3000ms; browser observation confirmed first photo changed to second after3100ms. Focus/hover/hidden-document and reduced-motion controls remain.

Responsive checks: actual320×740,375×812,768×1024,1024×768,1366×768 and1440×900 viewports. No horizontal overflow; both service links fit in every viewport; photos load. Phones/tablets use stacked copy and photos, with the optional side rail hidden below1024px. Desktop uses the integrated curve and rail. These are viewport checks, not physical Safari/iOS or Android device tests.

GitHub and Vercel release authorized by the user on 15 October 2026.
