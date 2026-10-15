# WhatsApp contact

Added the client-supplied WhatsApp number017-6329754, normalized to60176329754 for https://wa.me/ . The prefilled message is a draft; the website does not send a message automatically. Account registration or message delivery has not been tested.

- Shared FloatingContact component appears on all pages. Updated to a fixed44px icon-only circle on desktop and phone, including hover and keyboard focus. No automatic popup or sound. A visible soft green2.8s breathing glow surrounds the button, pauses on hover/focus, and is disabled for reduced-motion preferences. Keyboard focus uses a green outline instead of the global red.
- Existing mobile Consult action shares the dock row after scrolling, keeping an8px gap. Contact page only shows WhatsApp. Safe-area bottom inset is included.
- Dock hides while an input, textarea or select is focused, and restores after leaving the field. Verified with the Contact Full name field.
- Contact office panel and footer contain direct WhatsApp links. The official office phone numbers remain unchanged.
- whatsapp_click is a consent-gated secondary intent event, never an accepted enquiry conversion. Tracking remains inactive without configured IDs/consent.
- WhatsApp icon source: Simple Icons, CC0, https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/whatsapp.svg . Stored as a local inline SVG component, no icon library or external runtime request added.
- Updated the existing mobile QA selectors to follow the consultation link inside the shared dock instead of assuming the anchor itself is fixed.
- User approved pushing to main and deploying to production after reviewing the icon-only green glow version.
