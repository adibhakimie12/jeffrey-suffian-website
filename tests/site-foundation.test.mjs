import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const index = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const analytics = readFileSync(new URL('../analytics-events.md', import.meta.url), 'utf8');

assert.doesNotMatch(index, /My Google AI Studio App/);
assert.match(index, /Jeffrey Suffian \| Chartered Accountants in Petaling Jaya/);
assert.match(index, /Partner-led audit, tax and advisory services for Malaysian businesses/);

const routes = [
  '/',
  '/about',
  '/services',
  '/services/statutory-audit-assurance',
  '/services/tax-compliance-advisory',
  '/services/business-advisory',
  '/services/due-diligence-valuation',
  '/services/corporate-recovery',
  '/services/corporate-finance',
  '/services/sme-advisory',
  '/our-people',
  '/industries',
  '/insights',
  '/contact',
  '/privacy-policy'
];

for (const route of routes) {
  assert.match(app, new RegExp(route.replaceAll('/', '\\/')));
}

for (const term of [
  "['Home', '/']",
  'Certified & Trusted Accountants',
  'assurance, taxation, business advisory, due diligence review',
  'Organization',
  'LocalBusiness',
  'ProfessionalService',
  'BreadcrumbList',
  'FAQPage',
  'data-event="request_consultation_click"',
  'data-event="contact_form_submit"',
  'data-event="service_page_cta_click"',
  'Google Tag Manager ID',
  'GA4 Measurement ID'
]) {
  assert.match(app, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

for (const file of [
  '../public/sitemap.xml',
  '../public/robots.txt',
  '../analytics-events.md',
  '../seo-roadmap.md',
  '../README.md'
]) {
  assert.equal(existsSync(new URL(file, import.meta.url)), true, `${file} should exist`);
}

for (const term of [
  'Statutory Audit & Assurance Services Malaysia | Jeffrey Suffian',
  'Tax Compliance & Advisory Malaysia | Jeffrey Suffian',
  'Business Advisory Services Malaysia | Jeffrey Suffian',
  'Due Diligence & Business Valuation Malaysia | Jeffrey Suffian',
  'Corporate Recovery & Liquidation Services Malaysia | Jeffrey Suffian',
  'Corporate Finance Advisory Malaysia | Jeffrey Suffian',
  'SME Advisory Services Malaysia | Jeffrey Suffian',
  'Need an audit, tax or advisory partner?',
  'Practical updates for business owners, directors and decision-makers.',
  'View Insights',
  'insightIcons',
  'industryIcons',
  'contactIcons',
  'data-event="service_page_cta_click"'
]) {
  assert.match(app, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

assert.match(analytics, /Recommended GA4 conversion status/);
assert.match(analytics, /request_consultation_click/);
assert.match(analytics, /scroll_75/);
