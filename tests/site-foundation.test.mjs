import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');

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
