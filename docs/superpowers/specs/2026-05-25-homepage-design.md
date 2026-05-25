# Homepage Design

## Goal
Build the first homepage pass for Jeffrey Suffian Chartered Accountants using the official logo and core business information from https://jeffreysuffian.com/.

## Scope
This round covers the homepage only. It should feel premium, trustworthy, and focused on audit, tax, accounts, and business advisory services for Malaysian businesses and individuals.

## Source Information
- Firm name: Jeffrey Suffian
- Registration: AF001963
- Positioning: approved audit firm and tax agency firm licensed by the Ministry of Finance
- Location: Unit 805, Blok E Phileo Damansara 1, Jalan 16/11, 46350 Petaling Jaya, Selangor
- Phone: +603-7660 3915/3917
- Hours: Monday to Friday, 9.00 am to 5.00 pm
- Official tagline: A member firm of the Malaysian Institute of Accountants
- Official logo asset: `public/assets/jeffrey-suffian-logo.png`

## Design
Use a corporate premium style: dark navy, warm gold, ivory surfaces, restrained typography, and clear professional hierarchy.

The first viewport includes:
- Official logo
- Header navigation for Home, Services, About, Contact
- Main headline for audit, tax, accounts, and advisory services
- Primary CTA: Request Consultation
- Secondary CTA: Explore Services
- Credibility panel with AF001963, MIA member firm, approved audit firm, tax agency firm, and Petaling Jaya base

Below the first viewport:
- A concise trusted firm section based on the official description
- Three service cards: Accounts & Taxation, Statutory Audit, Business Advisory
- Contact strip with phone, office, and opening hours

## Non-Goals
- Do not polish partner profiles, calculator, modals, or deep service pages in this round.
- Do not add a CMS, backend, or real appointment submission.
- Do not redesign the whole application beyond homepage-focused content.

## Verification
- The homepage source test must confirm the official logo, trust signals, and contact information are present.
- `npm run lint` and `npm run build` must pass.
