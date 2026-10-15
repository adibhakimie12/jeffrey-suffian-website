import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpenCheck, BriefcaseBusiness, Building2, ChartNoAxesCombined, ChevronDown, CircleDollarSign, ExternalLink, Factory, FileCheck2, Landmark, Lightbulb, Mail, MapPin, Menu, MessageCircle, Phone, UsersRound, Scale, ShieldCheck, TrendingUp, X } from 'lucide-react';
import { SITE_URL, OG_IMAGE, canonicalFor, type PageMeta } from './seo';
import { AnalyticsConsent } from './components/AnalyticsConsent';
import { EnquiryForm } from './components/EnquiryForm';
import { HeroTypingWord } from './components/HeroTypingWord';
import { ServiceMotion } from './components/ServiceMotion';
import { insightGuides, insightsCheckedDate } from './content/insights';
import { InsightsHub, InsightArticlePage } from './components/InsightsPages';
import { TeamShowcase } from './components/TeamShowcase';
import { HeroSlideshow } from './components/HeroSlideshow';
import { FloatingContact } from './components/FloatingContact';
import { WhatsAppIcon } from './components/WhatsAppIcon';


type Service = PageMeta & {
  slug: string;
  seoFocus: string;
  overview: string;
  support: string[];
  audience: string[];
  faqs: { q: string; a: string }[];
};

const firm = {
  name: 'Jeffrey Suffian',
  descriptor: 'Chartered Accountants',
  firmNo: 'AF001963',
  phone: '03-7660 3915 / 3917',
  phoneInternational: '+603-7660 3915/3917',
  phoneHref: 'tel:+60376603915',
  email: 'info@jeffreysuffian.com',
  whatsApp: '017-632 9754',
  hours: 'Monday to Friday, 9:00am - 5:00pm',
  address: 'Unit 805, Blok E, Phileo Damansara 1, Jalan 16/11, 46350 Petaling Jaya, Selangor, Malaysia',
  status: 'Approved audit firm and tax agency firm licensed by Ministry of Finance.',
  member: 'Member firm of the Malaysian Institute of Accountants.'
};

const whatsAppUrl = `https://wa.me/60176329754?text=${encodeURIComponent('Hi Jeffrey Suffian, I would like to enquire about your services.')}`;
const encodedAddress = encodeURIComponent(firm.address);
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;

const nav = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Our Team', '/our-people'],
  ['Industries', '/industries'],
  ['Insights', '/insights'],
  ['Contact', '/contact']
];

const trustBadges = ['AF001963', 'MIA Member Firm', 'Ministry of Finance Licensed', 'Petaling Jaya, Selangor'];
const serviceIcons = [FileCheck2, CircleDollarSign, BriefcaseBusiness, Scale, ShieldCheck, Landmark, BriefcaseBusiness];
const industryIcons = [Factory, Building2, Lightbulb, Landmark, BriefcaseBusiness, Scale];
const contactIcons = { Address: MapPin, Phone, Hours: BookOpenCheck };

const services: Service[] = [
  {
    slug: 'statutory-audit-assurance',
    path: '/services/statutory-audit-assurance',
    title: 'Statutory Audit & Assurance Services Malaysia | Jeffrey Suffian',
    description: 'Partner-led statutory audit and assurance services for Malaysian businesses from a Chartered Accountants firm in Petaling Jaya.',
    h1: 'Statutory Audit & Assurance',
    seoFocus: 'statutory audit Malaysia, audit firm Petaling Jaya',
    overview: 'Independent audit and assurance services to support directors, shareholders and stakeholders with reliable financial reporting.',
    support: ['Statutory audit', 'Financial statement audit', 'Assurance engagements', 'Reporting compliance', 'Audit planning and review'],
    audience: ['Malaysian companies', 'SMEs', 'Directors and shareholders', 'Companies requiring statutory audit'],
    faqs: [
      { q: 'Who needs a statutory audit in Malaysia?', a: 'Many Malaysian companies require statutory audit depending on their structure and exemption status.' },
      { q: 'Can you support companies in Petaling Jaya?', a: 'Yes. The firm is based in Petaling Jaya and supports Malaysian businesses.' },
      { q: 'What happens before an audit starts?', a: 'We clarify scope, timelines, records required and reporting responsibilities before fieldwork begins.' }
    ]
  },
  {
    slug: 'tax-compliance-advisory',
    path: '/services/tax-compliance-advisory',
    title: 'Tax Compliance & Advisory Malaysia | Jeffrey Suffian',
    description: 'Tax compliance, tax computation, tax planning and advisory support for Malaysian companies and SMEs.',
    h1: 'Tax Compliance & Advisory',
    seoFocus: 'tax compliance Malaysia, tax agent Petaling Jaya',
    overview: 'Tax compliance and advisory support for Malaysian businesses, including tax returns, computations, planning and submission support.',
    support: ['Tax return preparation', 'Tax computations', 'Supporting schedules', 'Tax planning', 'Deductions and incentives', 'Transaction tax considerations'],
    audience: ['Companies', 'Directors', 'SMEs', 'Business owners reviewing tax positions'],
    faqs: [
      { q: 'Do you prepare company tax computations?', a: 'Yes. We support tax computations, returns and related schedules.' },
      { q: 'Can tax planning be included?', a: 'Yes. Planning can be considered alongside compliance and transaction matters.' },
      { q: 'Is the firm a tax agency firm?', a: 'Yes. Jeffrey Suffian is an approved audit firm and tax agency firm licensed by Ministry of Finance.' }
    ]
  },
  {
    slug: 'business-advisory',
    path: '/services/business-advisory',
    title: 'Business Advisory Services Malaysia | Jeffrey Suffian',
    description: 'Practical business advisory support for directors, management teams, shareholders and growing Malaysian businesses.',
    h1: 'Business Advisory',
    seoFocus: 'business advisory Malaysia',
    overview: 'Practical advisory support for directors, management teams and stakeholders making financial and operational decisions.',
    support: ['Internal audit', 'Special review & investigation (forensic auditing)', 'Accounting advisory', 'Management support', 'Process review', 'Financial analysis', 'Business decision support'],
    audience: ['Directors', 'Management teams', 'Owner-managed businesses', 'Companies reviewing financial controls'],
    faqs: [
      { q: 'Is advisory separate from audit?', a: 'Yes. Advisory work is scoped separately around management and business needs.' },
      { q: 'Can you review accounting processes?', a: 'Yes. We support practical process review and accounting advisory.' },
      { q: 'Is this suitable for SMEs?', a: 'Yes. Advisory can be shaped for SMEs and owner-managed businesses.' }
    ]
  },
  {
    slug: 'due-diligence-valuation',
    path: '/services/due-diligence-valuation',
    title: 'Due Diligence & Business Valuation Malaysia | Jeffrey Suffian',
    description: 'Financial due diligence, business valuation and transaction advisory support for acquisitions, investments and restructuring.',
    h1: 'Due Diligence & Business Valuation',
    seoFocus: 'due diligence Malaysia, business valuation Malaysia',
    overview: 'Transaction-focused support for acquisitions, investments, restructuring and business decisions.',
    support: ['Financial due diligence', 'Business valuation', 'Transaction review', 'Investment support', 'Acquisition advisory'],
    audience: ['Acquirers', 'Investors', 'Business owners', 'Companies considering restructuring'],
    faqs: [
      { q: 'When should due diligence start?', a: 'Before a transaction decision is finalised, so findings can inform negotiation and risk review.' },
      { q: 'Do you support valuation work?', a: 'Yes. We provide business valuation support for decision-making and transaction contexts.' },
      { q: 'Is this for buyers only?', a: 'No. Sellers, investors and management teams may also require due diligence support.' }
    ]
  },
  {
    slug: 'corporate-recovery',
    path: '/services/corporate-recovery',
    title: 'Corporate Recovery Services Malaysia | Jeffrey Suffian',
    description: 'Corporate recovery advisory support including rehabilitation, turnaround, strike-off, debt restructuring and workout assistance.',
    h1: 'Corporate Recovery',
    seoFocus: 'corporate recovery Malaysia, debt restructuring Malaysia',
    overview: 'Support for companies facing financial pressure, restructuring needs, recovery processes or closure-related matters.',
    support: ['Rehabilitation', 'Turnaround support', 'Strike-off', 'Debt restructuring', 'Workout assistance'],
    audience: ['Companies under pressure', 'Directors', 'Creditors', 'Stakeholders reviewing recovery options'],
    faqs: [
      { q: 'Can recovery options be reviewed early?', a: 'Yes. Early review can help directors understand available routes and responsibilities.' },
      { q: 'Do you support strike-off matters?', a: "Yes. Strike-off support is available as part of the firm's corporate recovery services." },
      { q: 'Is advice confidential?', a: 'Yes. Enquiries are handled professionally and confidentially.' }
    ]
  },
  {
    slug: 'corporate-finance',
    path: '/services/corporate-finance',
    title: 'Corporate Finance Advisory Malaysia | Jeffrey Suffian',
    description: 'Corporate finance advisory for mergers, acquisitions, restructuring, valuation and business growth decisions.',
    h1: 'Corporate Finance',
    seoFocus: 'corporate finance advisory Malaysia',
    overview: 'Advisory support for mergers, acquisitions, restructuring, valuation and growth decisions.',
    support: ['Mergers and acquisitions', 'Restructuring', 'Valuation', 'Business coaching', 'Transaction support'],
    audience: ['Directors', 'Shareholders', 'Growing companies', 'Businesses considering transactions'],
    faqs: [
      { q: 'What corporate finance matters do you support?', a: 'We support M&A, restructuring, valuation and transaction-related decision support.' },
      { q: 'Can this work alongside valuation?', a: 'Yes. Valuation often forms part of corporate finance advisory.' },
      { q: 'Is this suitable for private companies?', a: 'Yes. Private companies and owner-managed businesses can use this support.' }
    ]
  },
  {
    slug: 'sme-advisory',
    path: '/services/sme-advisory',
    title: 'SME Advisory Services Malaysia | Jeffrey Suffian',
    description: 'Financial and commercial advisory support for SMEs, owner-managed businesses and entrepreneurs in Malaysia.',
    h1: 'SME Advisory',
    seoFocus: 'SME advisory Malaysia, accounting advisory for SMEs',
    overview: 'Commercial and financial advisory support for SMEs and owner-managed businesses.',
    support: ['Financing matters', 'Operating strategies', 'Business expansion', 'Acquisitions and divestitures', 'Entrepreneurial advisory'],
    audience: ['SMEs', 'Owner-managed businesses', 'Entrepreneurs', 'Businesses planning growth'],
    faqs: [
      { q: 'Is this only for larger companies?', a: 'No. SME Advisory is designed for owner-managed and growing businesses.' },
      { q: 'Can financing matters be reviewed?', a: 'Yes. Financing matters can be reviewed as part of wider advisory support.' },
      { q: 'Can advisory be project-based?', a: 'Yes. Scope can be set around a specific business decision or timeline.' }
    ]
  }
];

const servicesFaqs = [
  { q: 'What services does Jeffrey Suffian provide?', a: 'Jeffrey Suffian provides statutory audit and assurance, tax compliance and advisory, business advisory, due diligence and business valuation, corporate recovery, corporate finance and SME advisory.' },
  { q: 'Where is the firm based?', a: 'Jeffrey Suffian is based in Petaling Jaya, Selangor, Malaysia. The office is at Unit 805, Blok E, Phileo Damansara 1, Jalan 16/11, 46350 Petaling Jaya.' },
  { q: 'How do I choose the right service?', a: 'Use the service pages to review the scope and intended audience. If your requirements involve more than one area, contact the team with a short outline of your business needs and any relevant deadline.' },
  { q: 'What should I include in an initial enquiry?', a: 'Share your company name, the service you are considering and any relevant deadline. Fees, scope, required records and timing need to be discussed for your engagement. Avoid sending confidential financial documents in an initial enquiry.' }
];

const people = [
  {
    name: 'Jeffrey Bosra',
    role: 'Partner',
    credentials: 'C.A.(M), CPA(M), B.Acc (Hons), University of Kent',
    bio: 'Over 25 years of experience in external audit, internal audit, business advisory, corporate governance, risk management, due diligence, forensic and special review investigation.',
    career: 'Jeffrey started his career with Arthur Andersen and later moved to Ernst & Young before setting up his own firm and founded Jeffrey Suffian.',
    image: '/assets/jeffrey-bosra.webp', id: 'jeffrey-bosra'
  },
  {
    name: 'Eddy Suffian Yusof',
    role: 'Partner',
    credentials: 'C.A.(M), B.Acc (Hons), International Islamic University Malaysia',
    bio: "Over 20 years of audit and advisory experience. Started career with KPMG with exposure to assurance, corporate finance, due diligence, valuation and listing reports.",
    image: '/assets/eddy-suffian-yusof.webp', id: 'eddy-suffian'
  },
  {
    name: 'Kamarul Baharin',
    role: 'Partner',
    credentials: 'Audit and assurance specialist',
    bio: 'Audit and assurance experience with specialization in government and public sector engagements.',
    career: 'Kamarul was a partner at Deloitte prior to joining the team at Jeffrey Suffian.',
    image: '/assets/kamarul-baharin.webp', id: 'kamarul-baharin'
  },
  { name: 'Nurul Elmi Abdul Razak', role: 'Leadership Team', credentials: 'Leadership Team', bio: 'Contact the firm for professional enquiries and engagement coordination.', image: '/assets/nurul-elmi-abdul-razak.webp', id: 'nurul-elmi' },
  { name: 'Noor Ain Mohd Noor', role: 'Leadership Team', credentials: 'Leadership Team', bio: 'Contact the firm for professional enquiries and engagement coordination.', image: '/assets/noor-ain-mohd-noor.webp', id: 'noor-ain' }
];

const industries = [
  { id: 'manufacturing', name: 'Manufacturing', description: 'Manufacturing businesses may need to bring together inventory records, production costs and financial reporting. Discuss audit preparation, tax compliance and business decisions with the team.', image: '/assets/industry-manufacturing-illustrative.webp', alt: 'Illustrative manufacturing floor with machinery and organised metal components', width: 768, height: 512, servicePaths: ['/services/statutory-audit-assurance', '/services/tax-compliance-advisory'] },
  { id: 'property-construction', name: 'Property & Construction', description: 'Project-based businesses need clear records of project income, costs and supporting documentation. Explore audit and tax services for your reporting and compliance requirements.', image: '/assets/industry-property-illustrative.webp', alt: 'Illustrative commercial property development with buildings and a construction crane', width: 768, height: 512, servicePaths: ['/services/statutory-audit-assurance', '/services/tax-compliance-advisory'] },
  { id: 'ict-technology', name: 'ICT & Technology', description: 'Technology businesses face reporting, cash flow and growth decisions as they develop. Explore SME advisory and business advisory to discuss your operating needs and next steps.', image: '/assets/industry-technology-illustrative.webp', alt: 'Illustrative technology workspace with computers and server equipment', width: 768, height: 512, servicePaths: ['/services/sme-advisory', '/services/business-advisory'] },
  { id: 'public-sector', name: 'Government & Public Sector', description: 'Accountability and reliable financial records are central to public sector reporting. Our partner backgrounds include audit and assurance experience in government and public services; discuss the scope of your engagement with the team.', image: '/assets/malaysia-towers-original.webp', alt: 'Kuala Lumpur skyline in Malaysia', width: 300, height: 300, servicePaths: ['/services/statutory-audit-assurance'] },
  { id: 'sme-businesses', name: 'SMEs & Owner-Managed Businesses', description: 'Business owners may need support across tax compliance, financial planning and day-to-day commercial decisions. Start with your business priorities to identify the relevant advisory scope.', image: '/assets/about-accounting-workspace-ai.webp', alt: 'Illustrative accounting workspace with a laptop, reports and calculator', width: 1200, height: 800, servicePaths: ['/services/sme-advisory', '/services/tax-compliance-advisory'] },
  { id: 'investment-transactions', name: 'Investment & Transaction Support', description: 'Buying, selling or investing in a business calls for a clear understanding of its financial position. Explore due diligence and valuation services before discussing the records and objectives of your transaction.', image: '/assets/service-advisory-illustrative.webp', alt: 'Illustrative business planning desk with financial charts and a notebook', width: 768, height: 512, servicePaths: ['/services/due-diligence-valuation', '/services/business-advisory'] }
];

const industriesFaqs = [
  { q: 'What is the difference between industries and services?', a: 'Industries describe the type of business or organisation, such as manufacturing or technology. Services describe the work required, such as audit, tax compliance or business advisory. One business may need several services.' },
  { q: 'Can I enquire if my industry is not listed?', a: 'Yes. Contact Jeffrey Suffian with your business activity and the support you need. The team can discuss whether the engagement fits its experience and available service scope.' },
  { q: 'What information should I prepare for an industry-related enquiry?', a: 'Prepare a short description of your business activity, the issue or service you need, and any relevant deadline. The team can then discuss which financial records and supporting documents may be required.' },
  { q: 'Where is Jeffrey Suffian based?', a: 'Jeffrey Suffian is a Chartered Accountants firm based in Petaling Jaya, Selangor, Malaysia. Contact the office to discuss audit, tax or advisory requirements for your organisation.' }
];

const basePages: Record<string, PageMeta> = {
  '/': {
    path: '/',
    title: 'Jeffrey Suffian | Chartered Accountants in Petaling Jaya',
    description: 'Jeffrey Suffian is a Chartered Accountants firm in Petaling Jaya providing statutory audit, tax compliance, business advisory, due diligence, valuation and corporate recovery services.',
    h1: 'Partner-Led Audit, Tax & Advisory for Malaysian Businesses.'
  },
  '/about': {
    path: '/about',
    title: 'About Jeffrey Suffian | Chartered Accountants',
    description: 'About Jeffrey Suffian, a Chartered Accountants firm based in Petaling Jaya providing audit, tax and advisory services.',
    h1: 'About Jeffrey Suffian'
  },
  '/services': {
    path: '/services',
    title: 'Audit, Tax & Advisory Services | Jeffrey Suffian',
    description: 'Audit, tax, advisory, due diligence, valuation, corporate recovery and SME support services for Malaysian businesses.',
    h1: 'Audit, Tax & Advisory Services'
  },
  '/our-people': {
    path: '/our-people',
    title: 'Our Partners & Team | Jeffrey Suffian',
    description: 'Meet the partners and leadership team of Jeffrey Suffian Chartered Accountants.',
    h1: 'Our Partners & Team'
  },
  '/industries': {
    path: '/industries',
    title: 'Industries | Audit, Tax & Advisory | Jeffrey Suffian',
    description: 'Explore industry needs and related audit, tax and advisory services from Jeffrey Suffian in Petaling Jaya, Malaysia, including manufacturing, property and ICT.',
    h1: 'Industries and Engagements We Support'
  },
  '/insights': {
    path: '/insights',
    title: 'Business Guides & Insights | Jeffrey Suffian',
    description: 'Practical guides for Malaysian business owners: prepare for a company audit, understand accounting, audit and tax, and ask better questions before buying a business.',
    h1: 'Insights'
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Jeffrey Suffian | Request Consultation',
    description: 'Request a confidential consultation with Jeffrey Suffian Chartered Accountants in Petaling Jaya.',
    h1: 'Request Consultation'
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Privacy Policy | Jeffrey Suffian',
    description: 'Privacy policy for Jeffrey Suffian Chartered Accountants.',
    h1: 'Privacy Policy'
  }
};

export const allPages = [...Object.values(basePages), ...services, ...insightGuides];

function currentPath() {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname;
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

function setMeta(name: string, value: string, attr: 'name' | 'property' = 'name') {
  let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.content = value;
}

function useRouteMeta(page: PageMeta, schema: object[]) {
  useEffect(() => {
    const canonical = canonicalFor(page.path);
    document.title = page.title;
    setMeta('description', page.description);
    setMeta('og:title', page.title, 'property');
    setMeta('og:description', page.description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:type', page.ogType ?? 'website', 'property');
    setMeta('og:image', page.image ? `${SITE_URL}${page.image}` : OG_IMAGE, 'property');
    setMeta('og:image:alt', page.imageAlt ?? 'Business discussion and financial reporting', 'property');
    setMeta('og:site_name', firm.name, 'property');
    setMeta('og:locale', 'en_MY', 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', page.title);
    setMeta('twitter:description', page.description);
    setMeta('twitter:image', page.image ? `${SITE_URL}${page.image}` : OG_IMAGE);
    setMeta('robots', allPages.some((item) => item.path === page.path) ? 'index,follow,max-image-preview:large' : 'noindex,follow');
    if (import.meta.env.VITE_SEARCH_CONSOLE_VERIFICATION) setMeta('google-site-verification', import.meta.env.VITE_SEARCH_CONSOLE_VERIFICATION);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    document.querySelector('#structured-data')?.remove();
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [page, schema]);
}

export function schemaFor(page: PageMeta, service = services.find((item) => item.path === page.path)) {
  const article = insightGuides.find(item => item.path === page.path);
  const org = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    '@id': `${SITE_URL}/#firm`,
    name: firm.name,
    url: SITE_URL,
    telephone: ['+60376603915', '+60376603917'],
    email: firm.email,
    logo: `${SITE_URL}/assets/jeffrey-suffian-logo.png`,
    image: `${SITE_URL}/assets/jeffrey-suffian-office-signage.webp`,
    identifier: firm.firmNo,
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => `https://schema.org/${day}`), opens: '09:00', closes: '17:00' }],
    address: { '@type': 'PostalAddress', streetAddress: 'Unit 805, Blok E, Phileo Damansara 1, Jalan 16/11', addressLocality: 'Petaling Jaya', addressRegion: 'Selangor', postalCode: '46350', addressCountry: 'MY' }
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...(service ? [{ '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` }] : []),
      ...(article ? [{ '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_URL}/insights` }] : []),
      ...(page.path === '/' ? [] : [{ '@type': 'ListItem', position: service || article ? 3 : 2, name: page.h1, item: `${SITE_URL}${page.path}` }])
    ]
  };
  const list: object[] = [org, breadcrumb];
  if (page.path === '/insights') {
    list.push({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: page.h1, url: canonicalFor(page.path), description: page.description, mainEntity: { '@type': 'ItemList', itemListElement: insightGuides.map((guide,index) => ({ '@type': 'ListItem', position: index + 1, url: canonicalFor(guide.path), name: guide.h1 })) } });
  }
  if (article) {
    list.push({ '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': `${canonicalFor(article.path)}#article`, headline: article.h1, description: article.description, image: `${SITE_URL}${article.image}`, mainEntityOfPage: canonicalFor(article.path), dateModified: insightsCheckedDate, inLanguage: 'en-MY', articleSection: article.category, publisher: { '@id': `${SITE_URL}/#firm` }, citation: article.sources.map(source => source.url) });
    list.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: article.faqs.map(faq => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) });
  }
  if (page.path === '/industries') {
    list.push({ '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': `${SITE_URL}/industries#page`, name: page.h1, description: page.description, url: canonicalFor(page.path), publisher: { '@id': `${SITE_URL}/#firm` }, about: industries.slice(0, 4).map(industry => ({ '@type': 'Thing', name: industry.name })), hasPart: industries.map(industry => ({ '@type': 'WebPageElement', '@id': `${SITE_URL}/industries#${industry.id}`, name: industry.name, description: industry.description })) });
    list.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: industriesFaqs.map(faq => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) });
  }
  if (page.path === '/services') {
    list.push({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Jeffrey Suffian professional services', itemListElement: services.map((item, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'Service', '@id': `${SITE_URL}${item.path}#service`, name: item.h1, url: canonicalFor(item.path), description: item.overview, provider: { '@id': `${SITE_URL}/#firm` } } })) });
    list.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: servicesFaqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) });
  }
  if (service) {
    list.push({ '@context': 'https://schema.org', '@type': 'Service', '@id': `${SITE_URL}${service.path}#service`, name: service.h1, serviceType: service.h1, description: service.overview, url: canonicalFor(service.path), provider: { '@id': `${SITE_URL}/#firm` }, areaServed: { '@type': 'Country', name: 'Malaysia' } });
    list.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a }
      }))
    });
  }
  if (page.path === '/our-people') {
    list.push({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: people.map((person, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'Person', name: person.name, jobTitle: person.role, image: `${SITE_URL}${person.image}`, url: `${SITE_URL}/our-people#${person.id}`, worksFor: { '@id': `${SITE_URL}/#firm` } } })) });
  }
  return list;
}

function AppLink({ href, children, className = '', event }: { href: string; children: React.ReactNode; className?: string; event?: string }) {
  return <a href={href} className={className} data-event={event}>{children}</a>;
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);
  return (
    <><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-white focus:p-4">Skip to content</a><header className="fixed inset-x-0 top-4 z-50 px-3 sm:px-5 lg:px-8">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 rounded-full border border-charcoal/5 bg-white/95 px-5 py-3 shadow-[0_8px_30px_rgba(17,17,17,0.10)] backdrop-blur-xl xl:px-7 xl:py-2">
        <a href="/" className="shrink-0 text-left">
          <img src="/assets/jeffrey-suffian-logo.png" alt="Jeffrey Suffian Chartered Accountants, AF1963" width="749" height="128" className="h-auto w-[160px] min-[360px]:w-[190px] sm:w-[230px] xl:w-[250px]" />
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex">
          {nav.map(([label, href]) => <a key={href} href={href} aria-current={isActive(href) ? 'page' : undefined} className={`nav-pill-link relative flex min-h-14 items-center px-3 text-xs font-semibold transition-colors hover:text-signature-red ${isActive(href) ? 'text-signature-red' : 'text-charcoal/75'}`}>{label}</a>)}
        </nav>
        <AppLink href="/contact" event="request_consultation_click" className="hidden min-h-12 shrink-0 items-center rounded-full bg-signature-yellow px-5 text-xs font-bold uppercase tracking-wide text-obsidian shadow-sm transition hover:bg-goldline xl:inline-flex">Request Consultation</AppLink>
        <button onClick={() => setOpen(!open)} className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-paper text-obsidian transition-colors hover:bg-champagne/20 xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile navigation" id="mobile-menu" className="mx-auto mt-3 max-h-[calc(100dvh-7rem)] max-w-7xl overflow-y-auto rounded-3xl border border-charcoal/5 bg-white p-4 shadow-[0_12px_32px_rgba(17,17,17,0.14)] xl:hidden">
          <div className="flex flex-col gap-1">
            {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} aria-current={isActive(href) ? 'page' : undefined} className={`flex min-h-11 items-center rounded-xl px-4 text-sm font-semibold transition-colors hover:bg-paper ${isActive(href) ? 'bg-signature-red/5 text-signature-red' : 'text-charcoal/80'}`}>{label}</a>)}
            <AppLink href="/contact" event="request_consultation_click" className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-signature-yellow px-5 text-xs font-bold uppercase tracking-wide text-obsidian">Request Consultation</AppLink>
          </div>
        </nav>
      )}
    </header></>
  );
}

function Footer() {
  return (
    <footer className="bg-obsidian pb-20 pt-12 text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <img src="/assets/jeffrey-suffian-logo.png" alt="Jeffrey Suffian Chartered Accountants" width="749" height="128" loading="lazy" className="mb-5 h-auto w-full max-w-[310px] rounded-lg bg-white p-4" />
          <p className="max-w-sm text-xs leading-6 text-ivory/50">Partner-led audit, tax and advisory services for Malaysian businesses.</p>
        </div>
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ivory">Services</h2>
          <div className="space-y-3 text-xs text-ivory/50">{services.slice(0, 5).map((service) => <p key={service.path}><a href={service.path}>{service.h1}</a></p>)}</div>
        </div>
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ivory">Office</h2>
          <div className="space-y-3 text-xs leading-6 text-ivory/50">
            <p>{firm.address}</p>
            <p><a href={firm.phoneHref} data-event="phone_click">{firm.phone}</a></p>
            <p><a href={`mailto:${firm.email}`} data-event="email_click" className="break-words hover:underline">{firm.email}</a></p>
            <p><a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" data-event="whatsapp_click" className="inline-flex items-center gap-2 hover:underline"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" />WhatsApp: {firm.whatsApp}</a></p>
            <p>{firm.hours}</p>
            <p><a href="/privacy-policy">Privacy Policy</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TrustBadges({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      {trustBadges.map((badge) => (
        <span key={badge} className={`rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wide ${dark ? 'border-charcoal/10 bg-white text-charcoal/70 shadow-sm' : 'border-champagne/20 bg-white text-charcoal/70'}`}>{badge}</span>
      ))}
    </div>
  );
}

function Breadcrumbs({ page }: { page: PageMeta }) {
  if (page.path === '/') return null;
  return <nav aria-label="Breadcrumb" className="mb-5 text-sm leading-6 text-charcoal/75"><a href="/" className="hover:underline">Home</a>{page.path.startsWith('/services/') && <><span className="mx-2" aria-hidden="true">/</span><a href="/services" className="hover:underline">Services</a></>}<span className="mx-2" aria-hidden="true">/</span><span aria-current="page">{page.h1}</span></nav>;
}

function PageHero({ page, eyebrow = 'Jeffrey Suffian' }: { page: PageMeta; eyebrow?: string }) {
  return (
    <section className="firm-backdrop bg-paper pt-28 text-charcoal">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <Breadcrumbs page={page} />
        <div className="brand-accent-strip mb-7 h-1 w-24 rounded-full" />
        <p className="text-[11px] font-bold uppercase tracking-widest text-signature-red">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight text-obsidian sm:text-5xl">{page.h1}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-charcoal/66">{page.description}</p>
        <div className="mt-7"><TrustBadges dark /></div>
        {page.path.startsWith('/services/') && (
          <div className="mt-7">
            <AppLink href="/contact" event="service_page_cta_click" className="inline-flex min-h-11 items-center rounded bg-signature-yellow px-6 text-xs font-bold uppercase tracking-wide text-obsidian">Request Consultation</AppLink>
          </div>
        )}
      </div>
    </section>
  );
}

function Section({ children, tone = 'ivory', className = '' }: { children: React.ReactNode; tone?: 'ivory' | 'white' | 'navy'; className?: string }) {
  const bg = tone === 'navy' ? 'firm-grid-backdrop bg-charcoal text-ivory' : tone === 'white' ? 'bg-white text-charcoal' : 'bg-ivory text-charcoal';
  return <section className={`${bg} py-16 lg:py-20 ${className}`}><div className="mx-auto max-w-7xl px-5 lg:px-8">{children}</div></section>;
}

function CTA({ dark = false, label = 'Need an audit, tax or advisory partner?', body = 'Speak with our team in Petaling Jaya to discuss your requirements.', event = 'request_consultation_click' }: { dark?: boolean; label?: string; body?: string; event?: string }) {
  return (
    <div className={`rounded-lg border p-8 ${dark ? 'border-white/10 bg-white/[0.035]' : 'border-champagne/20 bg-white'}`}>
      <h2 className="font-serif text-3xl">{label}</h2>
      <p className={`mt-3 max-w-2xl text-sm leading-7 ${dark ? 'text-ivory/62' : 'text-charcoal/62'}`}>{body}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <AppLink href="/contact" event={event} className="flex min-h-11 items-center justify-center rounded bg-signature-yellow px-6 text-xs font-bold uppercase tracking-wide text-obsidian">Request Consultation</AppLink>
        <a href={firm.phoneHref} data-event="phone_click" className={`flex min-h-11 items-center justify-center rounded border px-6 text-xs font-bold uppercase tracking-wide ${dark ? 'border-white/14 text-ivory' : 'border-charcoal/10 text-charcoal'}`}>{firm.phone}</a>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section id="home" className="signature-hero-section text-charcoal">
        <div className="signature-hero-shell">
        <div className="signature-hero-panel">
          <svg aria-hidden="true" width="0" height="0" className="absolute"><defs><clipPath id="hero-panel-notch" clipPathUnits="objectBoundingBox"><path d="M.035 0 H.965 Q1 0 1 .068 V.932 Q1 1 .965 1 H.035 Q0 1 0 .932 V.78 C0 .72 .055 .75 .055 .68 V.44 C.055 .36 0 .39 0 .31 V.068 Q0 0 .035 0Z" /></clipPath></defs></svg>
          <svg aria-hidden="true" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="hero-notch-outline"><path d="M0 310 C0 390 55 360 55 440 V680 C55 750 0 720 0 780" vectorEffect="non-scaling-stroke" /></svg>
          <svg aria-hidden="true" viewBox="0 0 1500 720" preserveAspectRatio="none" className="hero-contour-lines"><path d="M-80 100 C220 80 130 -100 420 -100 M-100 560 C140 450 80 810 420 740 S820 700 950 640 S1260 600 1540 520" /><path d="M-70 570 C150 460 90 820 430 750 S830 710 960 650 S1270 610 1550 530" /></svg>
          <div className="hero-copy">
            <div className="mb-7 inline-flex rounded border border-signature-red/15 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-signature-red shadow-sm">MIA Member Firm AF001963</div>
            <h1 className="hero-heading max-w-2xl font-serif font-bold leading-[1.02] text-obsidian">
              <span className="sr-only">Partner-Led Audit, Tax &amp; Advisory for Malaysian Businesses.</span>
              <span aria-hidden="true" className="block">Partner-Led</span><HeroTypingWord />
            </h1>
            <p className="mt-4 max-w-xl text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-charcoal/70 sm:text-[0.9rem]">for Malaysian Businesses.</p>
            <p className="hero-introduction mt-6 max-w-xl text-[1.02rem] font-medium leading-8 text-charcoal/80">Clarity for your accounts. Confidence in your next decision. Partner-led audit, tax and advisory support from our team in Petaling Jaya.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AppLink href="/contact" event="request_consultation_click" className="flex min-h-11 items-center justify-center rounded-full bg-signature-yellow px-7 text-xs font-extrabold uppercase tracking-wide text-obsidian shadow-lg shadow-signature-yellow/20">Request Consultation</AppLink>
              <AppLink href="/services" className="inline-flex min-h-11 items-center justify-center rounded-full border border-charcoal/14 bg-white px-7 text-xs font-extrabold uppercase tracking-wide text-charcoal hover:border-signature-red/40">Explore Services <ArrowRight className="ml-2 h-4 w-4" /></AppLink>
            </div>
          </div>
          <HeroSlideshow />
        </div>
        <nav aria-label="Hero shortcuts" className="hero-side-shortcuts">
          <a href="/services" aria-label="Explore our services" title="Services"><ChartNoAxesCombined aria-hidden="true" className="h-5 w-5" /></a>
          <a href="/our-people" aria-label="Meet our team" title="Our Team"><UsersRound aria-hidden="true" className="h-5 w-5" /></a>
          <a href="/contact" aria-label="Contact our office" title="Contact"><MessageCircle aria-hidden="true" className="h-5 w-5" /></a>
        </nav>
        </div>
        <div id="trust-marquee" className="relative overflow-hidden border-y border-charcoal/10 bg-white py-5">
          <div className="animate-trust-marquee trust-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="trust-group" aria-hidden={copy === 1 ? true : undefined}>
                {[...trustBadges, 'Approved Audit Firm', 'Tax Agency Firm', ...trustBadges, 'Approved Audit Firm', 'Tax Agency Firm'].map((item, index) => {
                  const Icon = item === 'AF001963' ? FileCheck2 : item === 'MIA Member Firm' ? UsersRound : item === 'Ministry of Finance Licensed' ? Landmark : item === 'Petaling Jaya, Selangor' ? MapPin : item === 'Approved Audit Firm' ? ShieldCheck : CircleDollarSign;
                  return <span key={`${item}-${index}`} aria-hidden={index >= 6 ? true : undefined} className="flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-charcoal/10 bg-paper px-5 py-3 text-[11px] font-extrabold uppercase tracking-wide text-charcoal/72"><Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-signature-red" />{item}</span>;
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Section tone="white"><ServiceCards limit={3} /></Section>
      <WhySection />
      <PeoplePreview />
      <EnquiryGuide />
      <InsightsPreview />
      <Section tone="navy"><CTA dark /></Section>
    </>
  );
}

function InsightsPreview() {
  const faqs = [
    { q: 'Can you help with both audit and tax?', a: 'Jeffrey Suffian provides statutory audit and assurance, tax compliance and advisory, alongside business advisory services. Contact the team to discuss the scope relevant to your company.' },
    { q: 'What should I prepare before making an enquiry?', a: 'Share your company name, the service you need and any relevant deadline. A short outline of your requirements helps the team understand your enquiry. Please avoid sending confidential financial documents through an initial enquiry.' },
    { q: 'Where is your office?', a: `${firm.address}. Office hours are ${firm.hours}. You can find directions and contact details on our Contact page.` }
  ];
  return <Section tone="white"><div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Common business questions</p><h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">A little clarity,<br /><span className="italic">before we speak.</span></h2><p className="mt-5 max-w-sm text-base leading-7 text-charcoal/80">Looking for the right support? Start here, or speak with our team about your requirements.</p><a href="/services" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-bold">Explore our services <ArrowRight className="h-4 w-4" /></a></div><div className="divide-y divide-charcoal/15 border-y border-charcoal/15">{faqs.map(faq => <details key={faq.q} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold text-obsidian">{faq.q}<ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" /></summary><p className="mt-4 pr-5 text-base leading-8 text-charcoal/80">{faq.a}</p></details>)}</div></div></Section>;
}

function EnquiryGuide() {
  return <Section><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Your next step</p><h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Start with<br />a conversation.</h2><p className="mt-5 max-w-sm text-base leading-7 text-charcoal/80">You do not need to have every answer ready. A clear outline is a useful place to begin.</p></div><ol className="space-y-0">{[['Tell us about your business', 'Share your company name and the type of support you are looking for.'], ['Outline your priorities', 'Mention your questions, relevant deadlines and what you would like to discuss.'], ['Get in touch', 'Call our Petaling Jaya office or visit Contact for enquiry options and directions.']].map(([title, body], i) => <li key={title} className="flex gap-5 border-t border-charcoal/15 py-6"><span className="font-serif text-2xl text-signature-red">0{i + 1}</span><div><h3 className="text-lg font-semibold text-obsidian">{title}</h3><p className="mt-2 text-base leading-7 text-charcoal/80">{body}</p>{i === 2 && <a href="/contact" className="mt-3 inline-flex min-h-11 items-center gap-3 text-sm font-bold">Contact our team <ArrowRight className="h-4 w-4" /></a>}</div></li>)}</ol></div></Section>;
}

const serviceCardVisuals: Record<string, { src: string; alt: string }> = {
  'statutory-audit-assurance': { src: '/assets/service-audit-illustrative.webp', alt: 'Illustrative financial report review with a magnifying glass and checklist' },
  'tax-compliance-advisory': { src: '/assets/service-tax-illustrative.webp', alt: 'Illustrative calculator and organised financial worksheets for tax computation' },
  'business-advisory': { src: '/assets/service-advisory-illustrative.webp', alt: 'Illustrative business planning with financial charts and a strategy notebook' }
};

function ServiceCards({ limit, visuals = false }: { limit?: number; visuals?: boolean }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <div>
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Our Expertise</p><h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-obsidian sm:text-4xl">{limit ? <>Clear support.<br />At every business stage.</> : 'Comprehensive Professional Services'}</h2></div>
        <div className="max-w-md"><p className="text-base leading-7 text-charcoal/80">Audit, tax and advisory expertise to help you understand your obligations and make informed business decisions.</p>{limit && <a href="/services" className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-obsidian">View all services <ArrowRight className="h-4 w-4" /></a>}</div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((service, index) => {
          const Icon = serviceIcons[index] ?? FileCheck2;
          const visual = visuals ? serviceCardVisuals[service.slug] : undefined;
          return <a key={service.path} href={service.path} data-service-reveal className={`service-card group flex flex-col overflow-hidden rounded-xl border border-charcoal/10 transition-colors hover:border-signature-red/40 ${limit && index === 1 ? 'bg-paper' : 'bg-white'}`}>
            {visual && <div className="aspect-[16/9] overflow-hidden bg-paper"><img src={visual.src} alt={visual.alt} width="768" height="512" loading="lazy" decoding="async" className="service-card-image h-full w-full object-cover" /></div>}
            <div className="flex grow flex-col p-7"><div className={`${visual ? 'mb-5' : 'mb-10'} flex items-center justify-between`}><span className="font-serif text-3xl text-signature-red">0{index + 1}</span><Icon className="h-6 w-6 text-charcoal/70" /></div>
            <h3 className="font-serif text-2xl leading-snug text-obsidian">{service.h1}</h3><p className="mt-4 grow text-base leading-7 text-charcoal/80">{service.overview}</p><span className="mt-8 inline-flex items-center justify-between border-t border-charcoal/15 pt-5 text-sm font-bold text-obsidian">Explore service <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </a>;
        })}
      </div>
    </div>
  );
}

function WhySection() {
  const benefits = [
    ['Partner-led support', 'Our partners bring experience across audit, taxation and financial advisory to business engagements.'],
    ['Support beyond compliance', 'Explore advisory, due diligence, valuation and corporate recovery services as your business needs evolve.'],
    ['A firm you can identify', 'An approved audit firm and tax agency firm, AF001963, and a member firm of the Malaysian Institute of Accountants.']
  ];
  return <Section tone="navy"><div className="grid items-center gap-12 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-yellow">The Jeffrey Suffian approach</p><h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Professional expertise.<br /><span className="italic text-signature-yellow">A personal connection.</span></h2><div className="mt-8">{benefits.map(([title, body], i) => <div key={title} className="flex gap-5 border-t border-white/15 py-6"><span className="pt-1 text-xs font-bold text-signature-yellow">0{i + 1}</span><div><h3 className="text-lg font-semibold text-ivory">{title}</h3><p className="mt-2 text-base leading-7 text-ivory/85">{body}</p></div></div>)}</div></div><figure className="overflow-hidden rounded-xl border border-white/15"><img src="/assets/jeffrey-suffian-office-signage.webp" width="1000" height="750" alt="Jeffrey Suffian office signage" loading="lazy" className="aspect-[4/3] w-full object-cover" /><figcaption className="flex flex-wrap items-center justify-between gap-3 bg-white/5 px-6 py-5"><span className="text-sm font-semibold">Jeffrey Suffian · Chartered Accountants</span><a href="/contact" className="inline-flex min-h-11 items-center gap-2 text-sm text-signature-yellow">Visit our office <ArrowRight className="h-4 w-4" /></a></figcaption></figure></div></Section>;
}

function PeoplePreview() {
  return <Section className="firm-section-dots"><div className="text-center"><p className="text-[11px] font-bold uppercase tracking-widest text-champagne">Leadership</p><h2 className="mt-3 font-serif text-4xl text-obsidian">Our Partners</h2></div><div className="mt-10 grid gap-6 md:grid-cols-3">{people.slice(0, 3).map((person) => <React.Fragment key={person.name}><PersonCard person={person} showTeamLink /></React.Fragment>)}</div></Section>;
}

function PersonCard({ person, showTeamLink = false, detailed = false }: { person: (typeof people)[number]; showTeamLink?: boolean; detailed?: boolean }) {
  if (detailed) {
    const isPartner = person.role === 'Partner';
    return <article id={person.id} data-team-reveal className="scroll-mt-28 rounded-xl border border-charcoal/10 bg-white p-6 sm:p-8"><img src={person.image} alt={person.name} width="300" height="300" loading="lazy" decoding="async" className="mx-auto h-32 w-32 rounded-full border border-champagne/25 object-cover" /><h3 className="mt-7 font-serif text-2xl leading-snug text-obsidian">{person.name}</h3><p className="mt-3 text-xs font-bold uppercase tracking-widest text-signature-red">{person.role}</p>{isPartner && <><p className="mt-5 text-sm leading-7 text-charcoal/85">{person.credentials}</p><p className="mt-5 border-t border-charcoal/10 pt-5 text-base leading-8 text-charcoal/85">{person.bio}</p></>}</article>;
  }
  return <article id={person.id} className="scroll-mt-28 bg-white p-7 shadow-sm"><div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-champagne/20 bg-champagne/10 text-xl font-serif text-obsidian">{person.image ? <img src={person.image} alt={person.name} width="300" height="300" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : person.name.split(' ').map((x) => x[0]).join('').slice(0, 2)}</div><h2 className="mt-5 font-serif text-xl text-obsidian">{person.name}</h2><p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-champagne">{person.role}</p><p className="mt-3 text-xs leading-6 text-charcoal/58">{person.credentials}</p><p className="mt-3 text-xs leading-6 text-charcoal/58">{person.bio}</p>{showTeamLink && <a href={`/our-people#${person.id}`} data-event="partner_profile_view" aria-label={`Meet our team: ${person.name}`} className="mt-5 inline-flex text-[11px] font-bold uppercase tracking-wider text-obsidian">Meet our team</a>}</article>;
}

function AboutPage({ page }: { page: PageMeta }) {
  const approach = [
    ['Direct senior involvement', 'Partner-led support draws on experience in audit, tax and financial advisory to address your business requirements.', ShieldCheck],
    ['Clear compliance guidance', 'Understand the audit and tax matters relevant to your company, with professional support for the scope of your engagement.', FileCheck2],
    ['A wider business perspective', 'Access advisory support for financial decisions, due diligence, valuation and corporate recovery alongside compliance services.', Landmark]
  ] as const;
  return <>
    <section className="firm-backdrop bg-paper pt-28 text-charcoal"><div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20"><Breadcrumbs page={page} /><div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"><div><div className="brand-accent-strip mb-7 h-1 w-24 rounded-full" /><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Get to know our firm</p><h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-obsidian sm:text-5xl">About Jeffrey Suffian</h1><p className="mt-6 text-lg leading-8 text-charcoal/85">Chartered Accountants in Petaling Jaya, supporting Malaysian businesses with audit, tax and financial advisory expertise.</p><p className="mt-5 text-base leading-8 text-charcoal/80">From statutory obligations to important business decisions, our partners bring professional experience and a practical perspective to your requirements.</p><a href="/our-people" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-obsidian">Meet our partners <ArrowRight className="h-4 w-4" /></a></div><figure className="overflow-hidden rounded-xl border border-charcoal/10 bg-white"><img src="/assets/about-accounting-workspace-ai.webp" width="1200" height="800" alt="Illustrative accounting workspace with financial reports, calculator and laptop" fetchPriority="high" className="aspect-[3/2] w-full object-cover" /><figcaption className="px-6 py-5 text-sm leading-6 text-charcoal/80">Audit, tax and advisory. Based in Petaling Jaya, Selangor.</figcaption></figure></div><div className="mt-10 border-t border-charcoal/15 pt-7"><TrustBadges /></div></div></section>
    <Section tone="white"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Our firm</p><h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Professional foundations.<br /><span className="italic">Practical support.</span></h2></div><div className="space-y-5 text-base leading-8 text-charcoal/80"><p>JEFFREY SUFFIAN (AF001963) is an approved audit firm and tax agency firm licensed by the Ministry of Finance. {firm.member}</p><p>Our professional services include assurance, taxation, business advisory, due diligence review, corporate recovery and investigation, internal audit and related financial advisory engagements.</p><p>Based in Petaling Jaya, Selangor, our team supports businesses with compliance requirements and financial decisions.</p><figure className="overflow-hidden rounded-lg border border-charcoal/10"><img src="/assets/accountants-report-original.webp" alt="Jeffrey Suffian accountants report and financial reporting documents" width="1200" height="221" loading="lazy" decoding="async" className="w-full" /></figure></div></div></Section>
    <Section><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Our expertise</p><h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Support for the decisions ahead.</h2></div><a href="/services" className="inline-flex min-h-11 items-center gap-3 text-sm font-bold">View all services <ArrowRight className="h-4 w-4" /></a></div><div className="mt-9 grid gap-5 md:grid-cols-3">{[
      ['Audit & assurance', 'Independent audit and assurance support for reliable financial reporting.', '/services/statutory-audit-assurance'],
      ['Tax compliance & advisory', 'Support with tax computations, returns, planning and compliance matters.', '/services/tax-compliance-advisory'],
      ['Business & financial advisory', 'Professional support for business decisions and financial requirements.', '/services/business-advisory']
    ].map(([title, body, href], i) => <a key={title} href={href} className="group flex flex-col rounded-xl border border-charcoal/10 bg-white p-7 transition-colors hover:border-signature-red/40"><span className="text-xs font-bold text-signature-red">0{i + 1}</span><h3 className="mt-5 font-serif text-xl leading-snug text-obsidian">{title}</h3><p className="mt-4 grow text-base leading-7 text-charcoal/80">{body}</p><span className="mt-6 inline-flex items-center justify-between border-t border-charcoal/15 pt-4 text-sm font-bold">Explore service <ArrowRight className="h-4 w-4" /></span></a>)}</div></Section>
    <Section tone="white"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Our approach</p><h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Expertise with your business in mind.</h2></div><div className="mt-10 grid gap-8 md:grid-cols-3">{approach.map(([title, body, Icon]) => <div key={title} className="border-t border-charcoal/20 pt-6"><Icon className="h-6 w-6 text-signature-red" /><h3 className="mt-5 text-lg font-semibold text-obsidian">{title}</h3><p className="mt-3 text-base leading-7 text-charcoal/80">{body}</p></div>)}</div></Section>
    <Section><div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">People behind the practice</p><h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Get to know our partners.</h2><p className="mt-5 max-w-xl text-base leading-8 text-charcoal/80">Meet the people behind Jeffrey Suffian and explore their professional backgrounds in audit, assurance and advisory.</p><a href="/our-people" className="mt-6 inline-flex min-h-12 items-center gap-3 rounded bg-signature-yellow px-6 text-sm font-bold text-obsidian">Meet our team <ArrowRight className="h-4 w-4" /></a></div><div className="grid grid-cols-3 gap-3">{people.slice(0, 3).map(person => <div key={person.id} className="text-center"><img src={person.image} alt={person.name} width="300" height="300" loading="lazy" decoding="async" className="mx-auto aspect-square w-full max-w-32 rounded-full border border-charcoal/10 object-cover" /><p className="mt-4 text-sm font-semibold leading-6 text-obsidian">{person.name}</p><p className="mt-1 text-xs text-charcoal/80">Partner</p></div>)}</div></div></Section>
    <Section tone="navy"><CTA dark /></Section>
  </>;
}

function ServicesHub({ page }: { page: PageMeta }) {
  return <ServiceMotion><PageHero page={page} /><Section tone="white" className="firm-section-dots"><div data-service-reveal className="mb-12 grid gap-6 border-b border-charcoal/15 pb-9 lg:grid-cols-[0.7fr_1.3fr]"><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Professional services in Malaysia</p><p className="max-w-3xl text-lg leading-8 text-charcoal/85">Jeffrey Suffian provides audit, tax and advisory services from Petaling Jaya, Selangor. Explore seven areas of expertise to find support for your company's reporting, compliance and business decisions.</p></div><ServiceCards visuals /></Section><Section><div data-service-reveal className="grid gap-8 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Not sure where to begin?</p><h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Start with your<br />business needs.</h2><p className="mt-5 text-base leading-8 text-charcoal/80">Your enquiry may span compliance, transactions and advisory. Tell the team what you are working towards so the relevant service scope can be discussed.</p><a href="/contact" className="mt-6 inline-flex min-h-12 items-center gap-3 rounded bg-signature-yellow px-6 text-sm font-bold">Discuss your requirements <ArrowRight className="h-4 w-4" /></a></div><div className="rounded-xl border border-charcoal/10 bg-white p-7"><h3 className="font-serif text-2xl">Useful details for your enquiry</h3><ul className="mt-5 space-y-4 text-base leading-7 text-charcoal/85">{['Your company and business activity', 'The service or issue you would like to discuss', 'Any relevant reporting or transaction deadline'].map(item => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signature-red" />{item}</li>)}</ul><p className="mt-6 border-t border-charcoal/15 pt-5 text-sm leading-7 text-charcoal/80">Scope, fees and timing depend on the engagement and should be confirmed with the team.</p></div></div></Section><Section tone="white"><div data-service-reveal><FAQ faqs={servicesFaqs} /></div></Section><Section tone="navy"><CTA dark /></Section></ServiceMotion>;
}

const serviceImages: Record<string, string> = { 'statutory-audit-assurance': '/assets/audit-original.webp', 'tax-compliance-advisory': '/assets/tax-original.webp', 'business-advisory': '/assets/business-advisory-original.webp' };
const relatedServiceSlugs: Record<string, string[]> = {
  'statutory-audit-assurance': ['tax-compliance-advisory', 'business-advisory'],
  'tax-compliance-advisory': ['statutory-audit-assurance', 'sme-advisory'],
  'business-advisory': ['sme-advisory', 'due-diligence-valuation'],
  'due-diligence-valuation': ['corporate-finance', 'business-advisory'],
  'corporate-recovery': ['corporate-finance', 'business-advisory'],
  'corporate-finance': ['due-diligence-valuation', 'sme-advisory'],
  'sme-advisory': ['tax-compliance-advisory', 'business-advisory']
};

function ServicePage({ service }: { service: Service }) {
  const related = services.filter(item => relatedServiceSlugs[service.slug]?.includes(item.slug));
  return <ServiceMotion><PageHero page={service} eyebrow="Professional services in Malaysia" /><Section><div data-service-reveal className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">At a glance</p><h2 className="mt-4 font-serif text-3xl text-obsidian">What is {service.h1.toLowerCase()}?</h2></div><div><p className="text-lg leading-8 text-charcoal/85">{service.overview}</p><p className="mt-5 text-base leading-8 text-charcoal/80">Provided by Jeffrey Suffian, Chartered Accountants in Petaling Jaya, Selangor. The scope, required records and timing should be discussed for your company's circumstances.</p>{serviceImages[service.slug] && <img src={serviceImages[service.slug]} alt={service.h1} width="640" height="427" loading="lazy" decoding="async" className="mt-7 w-full max-w-xl rounded-lg" />}</div></div></Section><Section tone="white"><div data-service-reveal><TwoColumn title="What We Support" items={service.support} title2="Who This Is For" items2={service.audience} /></div></Section><Section><div data-service-reveal><FAQ faqs={service.faqs} /></div></Section><Section tone="white" className="firm-section-dots"><div data-service-reveal><div className="flex flex-wrap items-center justify-between gap-5"><h2 className="font-serif text-3xl text-obsidian">Related expertise</h2><a href="/services" className="inline-flex min-h-11 items-center gap-3 text-sm font-bold">All services <ArrowRight className="h-4 w-4" /></a></div><div className="mt-7 grid gap-5 md:grid-cols-2">{related.map(item => <a key={item.path} href={item.path} className="service-card group rounded-xl border border-charcoal/15 p-7"><h3 className="font-serif text-xl text-obsidian">{item.h1}</h3><p className="mt-3 text-base leading-7 text-charcoal/80">{item.overview}</p><span className="mt-5 inline-flex items-center gap-3 text-sm font-bold">Explore service <ArrowRight className="h-4 w-4" /></span></a>)}</div></div></Section><Section tone="navy"><CTA dark event="service_page_cta_click" /></Section></ServiceMotion>;
}

function TwoColumn({ title, items, title2, items2 }: { title: string; items: string[]; title2: string; items2: string[] }) {
  return <div className="grid gap-5 md:grid-cols-2"><ListBlock title={title} items={items} /><ListBlock title={title2} items={items2} /></div>;
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-xl border border-charcoal/15 bg-white p-7 sm:p-8"><h2 className="font-serif text-2xl text-obsidian">{title}</h2><ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-7 text-charcoal/85">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

function FAQ({ faqs }: { faqs: Service['faqs'] }) {
  return <div><h2 className="font-serif text-3xl text-obsidian">FAQ</h2><div className="mt-6 divide-y divide-charcoal/10 border-y border-charcoal/10">{faqs.map((faq) => <details key={faq.q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold leading-7 text-obsidian">{faq.q}<ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" /></summary><p className="mt-3 max-w-3xl text-base leading-8 text-charcoal/85">{faq.a}</p></details>)}</div></div>;
}

function PeoplePage({ page }: { page: PageMeta }) {
  return <ServiceMotion revealSelector="[data-team-reveal]"><TeamShowcase title={page.h1} description={page.description} members={people} /><Section tone="navy"><CTA dark /></Section></ServiceMotion>;
}

function IndustriesPage({ page }: { page: PageMeta }) {
  const cards = (items: typeof industries) => items.map(industry => {
    const Icon = industryIcons[industries.indexOf(industry)] ?? BriefcaseBusiness;
    return <article key={industry.id} id={industry.id} data-industry-card data-industry-reveal className="group flex scroll-mt-28 flex-col overflow-hidden rounded-xl border border-charcoal/10 bg-white"><div className="aspect-video overflow-hidden bg-paper"><img src={industry.image} alt={industry.alt} width={industry.width} height={industry.height} loading="lazy" decoding="async" className="service-card-image h-full w-full object-cover" /></div><div className="flex grow flex-col p-6 sm:p-8"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-champagne/25 bg-champagne/10 text-obsidian"><Icon aria-hidden="true" className="h-5 w-5" /></div><h3 className="font-serif text-2xl leading-snug text-obsidian">{industry.name}</h3><p className="mt-4 text-base leading-8 text-charcoal/85">{industry.description}</p><div className="mt-auto pt-7"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-signature-red">Explore relevant services</p><div className="flex flex-col items-start">{industry.servicePaths.map(path => { const service = services.find(item => item.path === path)!; return <a key={path} href={path} className="inline-flex min-h-11 items-center gap-3 py-2 text-sm font-semibold text-obsidian underline decoration-charcoal/20 underline-offset-4 hover:decoration-signature-red">{service.h1}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>; })}</div></div></div></article>;
  });
  return <ServiceMotion revealSelector="[data-industry-reveal]"><PageHero page={page} eyebrow="Your sector. Your business priorities." /><Section tone="white"><div data-industry-reveal className="grid gap-8 border-b border-charcoal/15 pb-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Find the right support</p><h2 className="mt-4 font-serif text-3xl leading-tight text-obsidian sm:text-4xl">Different industries.<br />Different business needs.</h2></div><div><p className="text-lg leading-8 text-charcoal/85">Your industry describes what your organisation does. Our services describe how we can help with audit, tax and business decisions.</p><p className="mt-5 text-base leading-8 text-charcoal/85">Explore the sectors below, then follow the relevant service links to discuss your requirements with Jeffrey Suffian in Petaling Jaya, Selangor.</p><a href="/services" className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-bold">Browse all services <ArrowRight aria-hidden="true" className="h-4 w-4" /></a></div></div><div className="mt-10 mb-8 max-w-3xl"><h2 className="font-serif text-3xl text-obsidian">Industry perspectives</h2><p className="mt-4 text-base leading-8 text-charcoal/85">These sectors reflect our partners' published professional backgrounds, including experience gained before joining the firm. Engagement scope is discussed for each organisation.</p><a href="/our-people" className="mt-3 inline-flex min-h-11 items-center gap-3 text-sm font-semibold">Meet our partners and team <ArrowRight aria-hidden="true" className="h-4 w-4" /></a></div><div className="grid gap-6 md:grid-cols-2">{cards(industries.slice(0, 4))}</div></Section><Section className="firm-section-dots"><div className="mb-10 max-w-3xl"><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Across sectors</p><h2 className="mt-4 font-serif text-3xl text-obsidian sm:text-4xl">Business stages &amp; transactions</h2><p className="mt-5 text-base leading-8 text-charcoal/85">Your needs also depend on the size of your business and the decisions ahead. These situations can apply across many industries.</p></div><div className="grid gap-6 md:grid-cols-2">{cards(industries.slice(4))}</div><p className="mt-6 text-sm leading-7 text-charcoal/75">Industry and workspace images are illustrative; they do not identify firm clients or completed engagements.</p></Section><Section tone="white"><div data-industry-reveal><FAQ faqs={industriesFaqs} /></div></Section><Section tone="navy"><CTA dark /></Section></ServiceMotion>;
}

function ContactPage({ page }: { page: PageMeta }) {
  return <ServiceMotion revealSelector="[data-contact-reveal]">
    <section className="firm-backdrop bg-paper pt-28"><div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <Breadcrumbs page={page} />
      <div className="mt-9 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Contact Jeffrey Suffian</p><h1 className="mt-4 font-serif text-4xl leading-tight text-obsidian sm:text-5xl">Let’s talk about<br /><span className="italic text-signature-red">your business.</span></h1></div>
        <div><p className="max-w-xl text-lg leading-8 text-charcoal/85">An audit to prepare for. A tax question to work through. A business decision ahead. Start with what matters to you.</p><a href={firm.phoneHref} data-event="phone_click" className="mt-5 inline-flex min-h-12 items-center gap-3 rounded-full border border-charcoal/15 bg-white px-5 py-3 text-sm font-bold text-obsidian"><Phone aria-hidden="true" className="h-4 w-4 text-signature-red" />03-7660 3915<ArrowRight aria-hidden="true" className="h-4 w-4" /></a><p className="mt-3 text-sm leading-7 text-charcoal/80">{firm.hours}</p></div>
      </div>
    </div></section>
    <section className="firm-section-dots bg-paper pb-16 lg:pb-20"><div className="mx-auto grid max-w-7xl items-start gap-7 px-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-10 lg:px-8">
      <EnquiryForm email={firm.email} />
      <aside aria-label="Office and contact information" className="min-w-0 space-y-6 lg:sticky lg:top-28">
        <div data-contact-reveal className="overflow-hidden rounded-2xl border border-charcoal/15 bg-white">
          <img src="/assets/jeffrey-suffian-office-signage.webp" alt="Jeffrey Suffian Chartered Accountants office signage" width="1000" height="750" loading="lazy" decoding="async" className="aspect-[16/8] w-full object-cover" />
          <div className="p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Our office</p><h2 className="mt-4 font-serif text-3xl leading-snug text-obsidian">Based in Petaling Jaya.<br /><span className="italic">Here for your business.</span></h2>
            <div className="mt-6 flex items-start gap-3 border-t border-charcoal/10 pt-6"><MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-signature-red" /><div><h3 className="text-sm font-semibold">Visit us</h3><address className="mt-2 text-sm not-italic leading-7 text-charcoal/85">{firm.address}</address></div></div>
            <div className="mt-5 flex items-start gap-3"><BookOpenCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-signature-red" /><div><h3 className="text-sm font-semibold">Office hours</h3><p className="mt-2 text-sm leading-7 text-charcoal/85">{firm.hours}<br />Saturday &amp; Sunday: closed</p></div></div>
            <div className="mt-5 flex items-start gap-3"><Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-signature-red" /><div><h3 className="text-sm font-semibold">Prefer a conversation?</h3><div className="mt-1 flex flex-wrap items-center gap-x-3 text-sm font-semibold"><a href={firm.phoneHref} data-event="phone_click" className="inline-flex min-h-11 items-center underline underline-offset-4">03-7660 3915</a><span aria-hidden="true">/</span><a href="tel:+60376603917" data-event="phone_click" className="inline-flex min-h-11 items-center underline underline-offset-4">03-7660 3917</a></div></div></div>
            <div className="mt-4 flex items-start gap-3"><Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-signature-red" /><div className="min-w-0"><h3 className="text-sm font-semibold">Email our office</h3><a href={`mailto:${firm.email}`} data-event="email_click" className="mt-1 inline-flex min-h-11 max-w-full items-center break-all text-sm font-semibold underline underline-offset-4">{firm.email}</a></div></div>
            <div className="mt-4 flex items-start gap-3"><WhatsAppIcon className="mt-1 h-5 w-5 shrink-0 text-[#167d4d]" /><div><h3 className="text-sm font-semibold">WhatsApp our team</h3><a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" data-event="whatsapp_click" className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4">{firm.whatsApp}<ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></a></div></div>
          </div>
        </div>
        <LocationPanel />
        <p className="px-1 text-sm leading-7 text-charcoal/80">Planning to visit? Call ahead to discuss an appointment with the team.</p>
      </aside>
    </div></section>
    <Section tone="white"><div data-contact-reveal><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Before we speak</p><h2 className="mt-4 font-serif text-3xl text-obsidian sm:text-4xl">A little preparation.<br /><span className="italic text-signature-red">A clearer conversation.</span></h2></div><a href="/insights" className="inline-flex min-h-11 items-center gap-3 text-sm font-bold">Explore our practical guides <ArrowRight aria-hidden="true" className="h-4 w-4" /></a></div><div className="mt-9 grid gap-6 md:grid-cols-3">{[
      ['01', 'Your business', 'A short description of what your company does and the issue you want to discuss.'],
      ['02', 'Your priorities', 'The service you have in mind, or the decision you need help understanding. It is fine to be unsure.'],
      ['03', 'Your timing', 'Your financial year and any relevant deadline, so the conversation starts with useful context.']
    ].map(([number,title,description]) => <div key={number} className="rounded-xl border border-charcoal/10 bg-paper p-6 sm:p-8"><p aria-hidden="true" className="text-sm font-bold text-signature-red">{number}</p><h3 className="mt-4 font-serif text-2xl text-obsidian">{title}</h3><p className="mt-4 text-base leading-8 text-charcoal/85">{description}</p></div>)}</div></div></Section>
  </ServiceMotion>;
}

function Info({ title, body, link }: { title: string; body: string; link?: string }) {
  const Icon = contactIcons[title as keyof typeof contactIcons] ?? Mail;
  return <div className="border border-champagne/20 bg-white p-6"><div className="mb-4 flex h-9 w-9 items-center justify-center rounded border border-champagne/20 bg-champagne/10 text-champagne"><Icon className="h-4 w-4" /></div><h2 className="text-xs font-bold uppercase tracking-widest text-champagne">{title}</h2>{link ? <a href={link} data-event="phone_click" className="mt-2 block text-sm leading-6 text-charcoal/70">{body}</a> : <p className="mt-2 text-sm leading-6 text-charcoal/70">{body}</p>}</div>;
}

function LocationPanel() {
  return (
    <section id="office-location" aria-labelledby="office-location-heading" className="scroll-mt-28 overflow-hidden rounded-2xl border border-charcoal/15 bg-white">
      <div className="flex items-center gap-3 border-b border-charcoal/10 px-5 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signature-yellow/15 text-signature-red"><MapPin aria-hidden="true" className="h-5 w-5" /></span>
        <div><h3 id="office-location-heading" className="text-xs font-bold uppercase tracking-widest text-signature-red">Office location</h3><p className="mt-1 text-sm font-semibold leading-6 text-obsidian">Phileo Damansara 1, Petaling Jaya</p></div>
      </div>
      <div className="relative bg-paper">
        <a href={mapsUrl} target="_blank" rel="noreferrer" aria-label="View the Jeffrey Suffian office location on Google Maps" className="group block overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-signature-red">
          <img src="/assets/office-location-map.svg" alt="Map of Phileo Damansara 1 with a red pin marking Jeffrey Suffian in Blok E, beside Jalan 16/11" width="800" height="500" loading="lazy" decoding="async" className="block h-[280px] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]" />
        </a>
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="absolute bottom-1 right-1 rounded bg-ivory/95 px-1.5 py-1 text-[10px] text-charcoal/75 underline underline-offset-2">© OpenStreetMap contributors</a>
      </div>
      <div className="grid gap-3 border-t border-charcoal/10 p-4 sm:grid-cols-2">
        <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-champagne/40 px-4 text-xs font-bold uppercase tracking-wide text-obsidian transition-colors hover:bg-paper">Open Google Maps <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" /></a>
        <a href={wazeUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-obsidian px-4 text-xs font-bold uppercase tracking-wide text-ivory transition-colors hover:bg-charcoal">Open Waze <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" /></a>
      </div>
    </section>
  );
}

function PrivacyPage({ page }: { page: PageMeta }) {
  return <><PageHero page={page} /><Section><div className="max-w-3xl space-y-6 text-sm leading-7 text-charcoal/65"><p>Jeffrey Suffian handles enquiry information professionally and confidentially.</p><p>Information submitted through this website may be used to respond to enquiries, coordinate consultations and maintain professional records.</p><p>Where an online enquiry form is available, it requests your name, company, email address, telephone number, service required and message. Please do not include sensitive financial records in an initial enquiry.</p><p>Optional Google Analytics and advertising measurement, when enabled, are loaded after you accept measurement cookies. You can change your choice using Cookie settings. Your preference is stored in this browser. Enquiry names, email addresses, phone numbers and message contents are not included in the website analytics events.</p><p>This website serves font files locally. The Contact page displays a locally hosted location map based on OpenStreetMap data. Opening directions links takes you to Google Maps or Waze, which have their own privacy policies.</p><p>For privacy-related questions or requests about your enquiry information, contact the firm using the details on the contact page.</p></div></Section></>;
}

function NotFoundPage({ page }: { page: PageMeta }) {
  return <><PageHero page={page} /><Section><AppLink href="/" className="text-sm font-bold text-obsidian">Return Home</AppLink></Section></>;
}

function App({ initialPath }: { initialPath?: string }) {
  const [path, setPath] = useState(initialPath ?? currentPath());
  const [showMobileCta, setShowMobileCta] = useState(false);
  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  useEffect(() => {
    const onScroll = () => setShowMobileCta(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const service = services.find((item) => item.path === path);
  const article = insightGuides.find(item => item.path === path);
  const page = service ?? article ?? basePages[path] ?? { path, title: 'Page Not Found | Jeffrey Suffian', description: 'The page could not be found.', h1: 'Page Not Found' };
  const schema = useMemo(() => schemaFor(page, service), [page, service]);
  useRouteMeta(page, schema);

  return (
    <div className="min-h-screen overflow-x-hidden bg-ivory pb-24 font-sans text-charcoal antialiased selection:bg-champagne/30 selection:text-obsidian md:pb-0">
      <Header path={path} />
      <main id="main-content">
        {path === '/' && <HomePage />}
        {path === '/about' && <AboutPage page={page} />}
        {path === '/services' && <ServicesHub page={page} />}
        {service && <ServicePage service={service} />}
        {path === '/our-people' && <PeoplePage page={page} />}
        {path === '/industries' && <IndustriesPage page={page} />}
        {path === '/insights' && <InsightsHub />}
        {article && <InsightArticlePage guide={article} />}
        {path === '/contact' && <ContactPage page={page} />}
        {path === '/privacy-policy' && <PrivacyPage page={page} />}
        {!service && !article && !basePages[path] && <NotFoundPage page={page} />}
      </main>
      <Footer />
      <AnalyticsConsent />
      <FloatingContact href={whatsAppUrl} number={firm.whatsApp} showConsult={showMobileCta && path !== '/contact'} />
    </div>
  );
}

export default App;
