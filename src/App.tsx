import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpenCheck, BriefcaseBusiness, Building2, ChevronDown, CircleDollarSign, ExternalLink, Factory, FileCheck2, Landmark, Lightbulb, Mail, MapPin, Menu, Phone, Scale, ShieldCheck, TrendingUp, X } from 'lucide-react';

const SITE_URL = 'https://www.jeffreysuffian.com';
const GTM_ID = 'Google Tag Manager ID';
const GA4_ID = 'GA4 Measurement ID';
const SEARCH_CONSOLE_ID = 'Google Search Console verification';
const GOOGLE_ADS_ID = 'Google Ads conversion ID';
const GOOGLE_ADS_LABEL = 'Google Ads conversion label';
const trackingAttributeReference = [
  'data-event="request_consultation_click"',
  'data-event="phone_click"',
  'data-event="contact_form_submit"',
  'data-event="service_page_cta_click"',
  'data-event="partner_profile_view"',
  'data-event="blog_cta_click"',
  'data-event="email_click"'
].join(' ');

type PageMeta = {
  path: string;
  title: string;
  description: string;
  h1: string;
};

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
  phone: '03 7660 3915 / 3917',
  phoneInternational: '+603-7660 3915/3917',
  phoneHref: 'tel:+60376603915',
  hours: 'Monday to Friday, 9:00am - 5:00pm',
  address: 'Unit 805, Blok E, Phileo Damansara 1, Jalan 16/11, 46350 Petaling Jaya, Selangor, Malaysia',
  status: 'Approved audit firm and tax agency firm licensed by Ministry of Finance.',
  member: 'Member firm of the Malaysian Institute of Accountants.'
};

const encodedAddress = encodeURIComponent(firm.address);
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;

const nav = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Our People', '/our-people'],
  ['Industries', '/industries'],
  ['Insights', '/insights'],
  ['Contact', '/contact']
];

const trustBadges = ['AF001963', 'MIA Member Firm', 'Ministry of Finance Licensed', 'Petaling Jaya, Selangor'];
const serviceIcons = [FileCheck2, CircleDollarSign, BriefcaseBusiness, Scale, ShieldCheck, Landmark, BriefcaseBusiness];
const insightIcons = [BookOpenCheck, FileCheck2, CircleDollarSign, Scale, TrendingUp, Landmark];
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
    support: ['Accounting advisory', 'Management support', 'Process review', 'Financial analysis', 'Business decision support'],
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
    title: 'Corporate Recovery & Liquidation Services Malaysia | Jeffrey Suffian',
    description: 'Corporate recovery, turnaround, voluntary winding up, liquidation, receivership and debt restructuring advisory support.',
    h1: 'Corporate Recovery',
    seoFocus: 'corporate recovery Malaysia, liquidation services Malaysia',
    overview: 'Support for companies facing financial pressure, restructuring needs, recovery processes or closure-related matters.',
    support: ['Rehabilitation', 'Turnaround support', 'Strike-off', 'Voluntary winding up', 'Court-appointed liquidation', 'Receivership', 'Debt restructuring', 'Workout assistance'],
    audience: ['Companies under pressure', 'Directors', 'Creditors', 'Stakeholders reviewing recovery options'],
    faqs: [
      { q: 'Can recovery options be reviewed early?', a: 'Yes. Early review can help directors understand available routes and responsibilities.' },
      { q: 'Do you support winding up matters?', a: 'Yes. The firm supports closure-related matters including voluntary winding up.' },
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

const people = [
  {
    name: 'Jeffrey Bosra',
    role: 'Partner',
    credentials: 'C.A.(M), CPA(M), B.Acc (Hons), University of Kent',
    bio: 'Over 25 years of experience in external audit, internal audit, business advisory, corporate governance, risk management, due diligence, forensic and special review investigation.',
    image: 'https://jeffreysuffian.com/wp-content/uploads/2025/07/jeffreyb-325x300.jpg'
  },
  {
    name: 'Eddy Suffian Yusof',
    role: 'Partner',
    credentials: 'C.A.(M), B.Acc (Hons), International Islamic University Malaysia',
    bio: "Over 20 years of audit and advisory experience. Started career with KPMG with exposure to assurance, corporate finance, due diligence, valuation and listing reports.",
    image: 'https://jeffreysuffian.com/wp-content/uploads/2025/07/eddys-325x300.jpg'
  },
  {
    name: 'Kamarul Baharin',
    role: 'Partner',
    credentials: 'Audit and assurance specialist',
    bio: 'Audit and assurance experience with specialization in government and public sector engagements.',
    image: 'https://jeffreysuffian.com/wp-content/uploads/2025/07/kamarul-325x300.jpg'
  },
  { name: 'Nurul Elmi Abdul Razak', role: 'Leadership Team', credentials: 'Leadership Team', bio: 'Supports client service delivery and engagement coordination.', image: '' },
  { name: 'Noor Ain Mohd Noor', role: 'Leadership Team', credentials: 'Leadership Team', bio: 'Supports client service delivery and professional administration.', image: '' }
];

const industries = [
  ['Manufacturing', 'Audit, tax and advisory support for operating companies.', '/services/statutory-audit-assurance'],
  ['Property & Construction', 'Financial reporting and tax support for project-based businesses.', '/services/tax-compliance-advisory'],
  ['ICT & Technology', 'Support for technology companies and growth decisions.', '/services/sme-advisory'],
  ['Government & Public Sector', 'Audit and assurance experience for public sector engagements.', '/services/statutory-audit-assurance'],
  ['SMEs & Owner-Managed Businesses', 'Commercial guidance for practical business decisions.', '/services/sme-advisory'],
  ['Investment & Transaction Support', 'Due diligence and valuation support for transactions.', '/services/due-diligence-valuation']
];

const insights = [
  ['Audit & Assurance', 'Statutory Audit Requirements in Malaysia', 'A concise guide to audit obligations and preparation points.', '/insights'],
  ['Audit & Assurance', 'How to Prepare for Your Company Audit', 'Records, timelines and practical steps before fieldwork begins.', '/insights'],
  ['Tax Compliance', 'Tax Compliance Checklist for Malaysian SMEs', 'Key annual tax compliance items for SME owners.', '/insights'],
  ['Due Diligence & Valuation', 'Due Diligence Checklist Before Buying a Business', 'A buyer-focused view of financial and operational review points.', '/insights'],
  ['Due Diligence & Valuation', 'Business Valuation Methods for Malaysian Companies', 'Common valuation approaches and when they may be used.', '/insights'],
  ['Audit & Assurance', 'Choosing an Audit Firm in Petaling Jaya', 'What directors should consider when appointing an audit firm.', '/insights']
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
    title: 'Our People | Jeffrey Suffian',
    description: 'Meet the partners and leadership team of Jeffrey Suffian Chartered Accountants.',
    h1: 'Our People'
  },
  '/industries': {
    path: '/industries',
    title: 'Industries and Engagements | Jeffrey Suffian',
    description: 'Industries and engagements supported by Jeffrey Suffian audit, tax and advisory services.',
    h1: 'Industries and Engagements We Support'
  },
  '/insights': {
    path: '/insights',
    title: 'Insights | Jeffrey Suffian',
    description: 'Audit, tax, advisory and finance insights for Malaysian businesses.',
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

const allPages = [...Object.values(basePages), ...services];

function currentPath() {
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
    const canonical = `${SITE_URL}${page.path === '/' ? '' : page.path}`;
    document.title = page.title;
    setMeta('description', page.description);
    setMeta('og:title', page.title, 'property');
    setMeta('og:description', page.description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('google-site-verification', SEARCH_CONSOLE_ID);
    setMeta('google-ads-conversion-id', GOOGLE_ADS_ID);
    setMeta('google-ads-conversion-label', GOOGLE_ADS_LABEL);
    setMeta('ga4-measurement-id', GA4_ID);
    setMeta('gtm-id', GTM_ID);

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

function schemaFor(page: PageMeta, service?: Service) {
  const org = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    name: firm.name,
    url: SITE_URL,
    telephone: firm.phone,
    address: { '@type': 'PostalAddress', streetAddress: 'Unit 805, Blok E, Phileo Damansara 1, Jalan 16/11', addressLocality: 'Petaling Jaya', addressRegion: 'Selangor', postalCode: '46350', addressCountry: 'MY' }
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...(page.path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.h1, item: `${SITE_URL}${page.path}` }])
    ]
  };
  const list: object[] = [org, breadcrumb];
  if (service) {
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
    list.push({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: people.map((person, index) => ({ '@type': 'Person', position: index + 1, name: person.name, jobTitle: person.role })) });
  }
  if (page.path === '/insights') {
    list.push({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: insights.map((article, index) => ({ '@type': 'Article', position: index + 1, headline: article[1], articleSection: article[0] })) });
  }
  return list;
}

function AppLink({ href, children, className = '', event }: { href: string; children: React.ReactNode; className?: string; event?: string }) {
  return <a href={href} className={className} data-event={event}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-charcoal/10 bg-white/95 shadow-sm shadow-charcoal/5 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/" className="text-left">
          <span className="block font-serif text-xl font-semibold leading-none text-obsidian">Jeffrey Suffian</span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-signature-red">{firm.descriptor}</span>
          <span className="brand-accent-strip mt-2 block h-1 w-16 rounded-full" />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map(([label, href]) => <a key={href} href={href} className="text-xs font-semibold text-charcoal/72 transition hover:text-signature-red">{label}</a>)}
        </nav>
        <AppLink href="/contact" event="request_consultation_click" className="hidden min-h-11 items-center rounded bg-signature-yellow px-5 text-xs font-bold uppercase tracking-wide text-obsidian transition hover:bg-goldline md:inline-flex">Request Consultation</AppLink>
        <button onClick={() => setOpen(!open)} className="min-h-11 min-w-11 rounded border border-charcoal/10 p-2 text-obsidian md:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-charcoal/10 bg-white px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {nav.map(([label, href]) => <a key={href} href={href} className="text-sm text-charcoal/80">{label}</a>)}
            <AppLink href="/contact" event="request_consultation_click" className="mt-2 flex min-h-11 items-center justify-center rounded bg-signature-yellow px-5 text-xs font-bold uppercase tracking-wide text-obsidian">Request Consultation</AppLink>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-obsidian py-12 text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <img src="/assets/jeffrey-suffian-logo.png" alt="Jeffrey Suffian Chartered Accountants" loading="lazy" className="mb-5 h-12 w-auto rounded bg-white px-3 py-2" />
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
  return <div className="mb-5 text-xs text-charcoal/45"><a href="/">Home</a><span className="mx-2">/</span><span>{page.h1}</span></div>;
}

function PageHero({ page, eyebrow = 'Jeffrey Suffian' }: { page: PageMeta; eyebrow?: string }) {
  return (
    <section className="bg-paper pt-28 text-charcoal">
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
  const bg = tone === 'navy' ? 'bg-charcoal text-ivory' : tone === 'white' ? 'bg-white text-charcoal' : 'bg-ivory text-charcoal';
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
      <section id="home" className="bg-paper pt-20 text-charcoal">
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
          <div>
            <div className="brand-accent-strip mb-7 h-1.5 w-28 rounded-full" />
            <div className="mb-7 inline-flex rounded border border-signature-red/15 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-signature-red shadow-sm">MIA Member Firm AF001963</div>
            <h1 className="max-w-2xl font-serif text-5xl font-bold leading-[1.08] text-obsidian sm:text-6xl lg:text-[4.35rem]">
              Partner-Led<span className="block text-signature-red">Audit, Tax &amp;</span><span className="block text-champagne">Advisory</span><span className="block">for Malaysian</span><span className="block">Businesses.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[1.02rem] font-medium leading-8 text-charcoal/70">We provide statutory audit, comprehensive tax compliance and strategic advisory to Malaysian businesses demanding clarity and institutional confidence.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AppLink href="/contact" event="request_consultation_click" className="flex min-h-11 items-center justify-center rounded bg-signature-yellow px-7 text-xs font-extrabold uppercase tracking-wide text-obsidian shadow-lg shadow-signature-yellow/20">Request Consultation</AppLink>
              <AppLink href="/services" className="inline-flex min-h-11 items-center justify-center rounded border border-charcoal/14 bg-white px-7 text-xs font-extrabold uppercase tracking-wide text-charcoal hover:border-signature-red/40">Explore Services <ArrowRight className="ml-2 h-4 w-4" /></AppLink>
            </div>
          </div>
          <div className="relative hidden min-h-[420px] lg:block">
            <div className="absolute inset-0 overflow-hidden rounded-lg border border-charcoal/10 bg-white shadow-2xl shadow-charcoal/10">
              <img src="/assets/mario-gogh-office.jpg" alt="Modern office meeting room" className="h-full w-full object-cover opacity-86" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_42%,rgba(242,183,5,0.22),transparent_32%),linear-gradient(90deg,rgba(250,247,240,0.88),rgba(250,247,240,0.18)_50%,rgba(43,43,43,0.34))]" />
            </div>
            <button id="hero-widget-audit" className="animate-float-subtle absolute left-[-18px] top-28 w-52 rounded-md border border-signature-red/15 bg-white/86 p-4 text-left shadow-xl shadow-charcoal/10 backdrop-blur-md">
              <p className="text-sm font-bold text-obsidian">Statutory Audit</p><p className="mt-1 text-xs font-medium leading-5 text-charcoal/58">Rigorous compliance &amp; assurance.</p>
            </button>
            <button id="hero-widget-tax" className="animate-float-subtle-slow absolute right-[-12px] top-60 w-52 rounded-md border border-champagne/30 bg-white/86 p-4 text-left shadow-xl shadow-charcoal/10 backdrop-blur-md">
              <p className="text-sm font-bold text-obsidian">Tax Advisory</p><p className="mt-1 text-xs font-medium leading-5 text-charcoal/58">Strategic tax planning &amp; compliance.</p>
            </button>
          </div>
        </div>
        <div id="trust-marquee" className="relative overflow-hidden border-y border-charcoal/10 bg-white py-5">
          <div className="animate-trust-marquee flex w-max gap-4 px-4">
            {[...trustBadges, 'Approved Audit Firm', 'Tax Agency Firm', ...trustBadges, 'Approved Audit Firm', 'Tax Agency Firm'].map((item, index) => (
              <span key={`${item}-${index}`} className="flex min-w-max items-center gap-3 rounded-full border border-charcoal/10 bg-paper px-5 py-3 text-[11px] font-extrabold uppercase tracking-wide text-charcoal/72"><span className="h-2 w-2 rounded-full bg-signature-red" />{item}</span>
            ))}
          </div>
        </div>
      </section>
      <Section><div className="mx-auto max-w-5xl text-center"><h2 className="font-serif text-3xl leading-tight text-obsidian sm:text-5xl">Built for businesses that need <span className="italic text-champagne">clarity, compliance</span> and board-level confidence.</h2><p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-charcoal/65">{firm.status} {firm.member}</p></div></Section>
      <Section tone="white"><ServiceCards limit={3} /></Section>
      <WhySection />
      <PeoplePreview />
      <Section tone="navy"><CTA dark /></Section>
      <InsightsPreview />
    </>
  );
}

function InsightsPreview() {
  return (
    <Section tone="ivory" className="py-12 lg:py-14">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-champagne">Insights</p>
          <h2 className="mt-2 font-serif text-2xl text-obsidian">Practical updates for business owners, directors and decision-makers.</h2>
        </div>
        <AppLink href="/insights" event="blog_cta_click" className="text-xs font-bold uppercase tracking-wider text-obsidian underline decoration-champagne decoration-2 underline-offset-8">View Insights</AppLink>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {insights.slice(0, 3).map(([category, title, excerpt, href], index) => {
          const Icon = insightIcons[index] ?? BookOpenCheck;
          return (
          <article key={title} className="border border-champagne/15 bg-white/70 p-5">
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded border border-champagne/20 bg-champagne/10 text-champagne"><Icon className="h-3.5 w-3.5" /></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-champagne">{category}</p>
            <h3 className="mt-3 font-serif text-lg text-obsidian">{title}</h3>
            <p className="mt-2 text-xs leading-6 text-charcoal/58">{excerpt}</p>
            <a href={href} data-event="blog_cta_click" className="mt-4 inline-flex text-[10px] font-bold uppercase tracking-wider text-obsidian">Read More</a>
          </article>
          );
        })}
      </div>
    </Section>
  );
}

function ServiceCards({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <div>
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><p className="text-[11px] font-bold uppercase tracking-widest text-champagne">Our Expertise</p><h2 className="mt-3 font-serif text-4xl text-obsidian">Comprehensive Professional Services</h2></div>
        <p className="max-w-xl text-sm leading-7 text-charcoal/62">Partner-led services for compliance, tax efficiency and practical corporate growth.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((service, index) => {
          const Icon = serviceIcons[index] ?? FileCheck2;
          return <a key={service.path} href={service.path} className="group border border-gray-100 bg-white p-8 shadow-sm transition hover:border-champagne/40">
            <div className="mb-7 flex h-10 w-10 items-center justify-center rounded border border-champagne/20 bg-champagne/10 text-champagne"><Icon className="h-4.5 w-4.5" /></div>
            <h3 className="font-serif text-xl text-obsidian">{service.h1}</h3><p className="mt-4 min-h-20 text-xs leading-6 text-charcoal/62">{service.overview}</p><span className="mt-6 inline-flex items-center text-[11px] font-bold uppercase tracking-wider text-obsidian">Learn More <ArrowRight className="ml-2 h-3.5 w-3.5" /></span>
          </a>;
        })}
      </div>
    </div>
  );
}

function WhySection() {
  return <Section tone="navy"><div className="grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center"><div><p className="text-[11px] font-bold uppercase tracking-widest text-champagne">The JS Advantage</p><h2 className="mt-3 font-serif text-4xl">Why Businesses Work With Jeffrey Suffian</h2><div className="mt-8 space-y-6">{['Partner-led engagements', 'Commercial pragmatism', 'Institutional quality standard'].map((item) => <div key={item}><h3 className="font-semibold text-ivory">{item}</h3><p className="mt-1 text-xs leading-6 text-ivory/55">Clear support for compliance, governance and business decisions.</p></div>)}</div></div><div className="relative min-h-[390px] overflow-hidden rounded-lg border border-white/8 bg-obsidian"><img src="/assets/jeffrey-suffian-office-signage.png" alt="Jeffrey Suffian office signage" loading="lazy" className="h-full min-h-[390px] w-full object-cover object-center opacity-82" /><div className="absolute inset-0 bg-gradient-to-r from-obsidian/88 via-obsidian/18 to-transparent" /></div></div></Section>;
}

function PeoplePreview() {
  return <Section><div className="text-center"><p className="text-[11px] font-bold uppercase tracking-widest text-champagne">Leadership</p><h2 className="mt-3 font-serif text-4xl text-obsidian">Our Partners</h2></div><div className="mt-10 grid gap-6 md:grid-cols-3">{people.slice(0, 3).map((person) => <React.Fragment key={person.name}><PersonCard person={person} /></React.Fragment>)}</div></Section>;
}

function PersonCard({ person }: { person: (typeof people)[number] }) {
  return <article className="bg-white p-7 shadow-sm"><div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-champagne/20 bg-champagne/10 text-xl font-serif text-obsidian">{person.image ? <img src={person.image} alt={person.name} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-cover grayscale" /> : person.name.split(' ').map((x) => x[0]).join('').slice(0, 2)}</div><h2 className="mt-5 font-serif text-xl text-obsidian">{person.name}</h2><p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-champagne">{person.role}</p><p className="mt-3 text-xs leading-6 text-charcoal/58">{person.credentials}</p><p className="mt-3 text-xs leading-6 text-charcoal/58">{person.bio}</p><a href="/our-people" data-event="partner_profile_view" className="mt-5 inline-flex text-[11px] font-bold uppercase tracking-wider text-obsidian">View Profile</a></article>;
}

function AboutPage({ page }: { page: PageMeta }) {
  return <><PageHero page={page} /><Section><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><h2 className="font-serif text-3xl text-obsidian">Certified & Trusted Accountants</h2><div className="space-y-5 text-sm leading-7 text-charcoal/65"><p>JEFFREY SUFFIAN (AF001963) is an approved audit firm and tax agency firm licensed by the Ministry of Finance. We provide various professional services that include assurance, taxation, business advisory, due diligence review, liquidation, corporate recovery and investigation, internal audit and other related financial advisory engagements.</p><p>{firm.member} Based in Petaling Jaya, Selangor.</p><TrustBadges /></div></div></Section><Section tone="white"><div className="grid gap-5 md:grid-cols-3">{[
    ['Direct senior involvement', ShieldCheck],
    ['Clear compliance guidance', FileCheck2],
    ['Concise commercial advice', Landmark]
  ].map(([item, Icon]) => <div key={item as string} className="border border-gray-100 bg-white p-7"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded border border-champagne/20 bg-champagne/10 text-champagne">{React.createElement(Icon as typeof ShieldCheck, { className: 'h-4.5 w-4.5' })}</div><h2 className="font-serif text-xl">{item as string}</h2></div>)}</div></Section><Section tone="navy"><CTA dark /></Section></>;
}

function ServicesHub({ page }: { page: PageMeta }) {
  return <><PageHero page={page} /><Section tone="white"><p className="mb-10 max-w-3xl text-sm leading-7 text-charcoal/65">Partner-led professional services for statutory audit, tax compliance, advisory, due diligence, valuation, corporate recovery and SME support.</p><ServiceCards /></Section><Section tone="navy"><CTA dark /></Section></>;
}

function ServicePage({ service }: { service: Service }) {
  return <><PageHero page={service} eyebrow={service.seoFocus} /><Section><div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><h2 className="font-serif text-3xl text-obsidian">Service overview</h2><p className="text-sm leading-7 text-charcoal/65">{service.overview}</p></div></Section><Section tone="white"><TwoColumn title="What We Support" items={service.support} title2="Who This Is For" items2={service.audience} /></Section><Section><FAQ faqs={service.faqs} /></Section><Section tone="navy"><CTA dark event="service_page_cta_click" /></Section></>;
}

function TwoColumn({ title, items, title2, items2 }: { title: string; items: string[]; title2: string; items2: string[] }) {
  return <div className="grid gap-5 md:grid-cols-2"><ListBlock title={title} items={items} /><ListBlock title={title2} items={items2} /></div>;
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="border border-gray-100 bg-white p-8"><h2 className="font-serif text-2xl text-obsidian">{title}</h2><ul className="mt-5 space-y-3 text-sm text-charcoal/65">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

function FAQ({ faqs }: { faqs: Service['faqs'] }) {
  return <div><h2 className="font-serif text-3xl text-obsidian">FAQ</h2><div className="mt-6 divide-y divide-charcoal/10 border-y border-charcoal/10">{faqs.map((faq) => <details key={faq.q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-obsidian">{faq.q}<ChevronDown className="h-4 w-4" /></summary><p className="mt-3 max-w-2xl text-sm leading-7 text-charcoal/62">{faq.a}</p></details>)}</div></div>;
}

function PeoplePage({ page }: { page: PageMeta }) {
  return <><PageHero page={page} /><Section><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{people.map((person) => <React.Fragment key={person.name}><PersonCard person={person} /></React.Fragment>)}</div></Section><Section tone="navy"><CTA dark /></Section></>;
}

function IndustriesPage({ page }: { page: PageMeta }) {
  return <><PageHero page={page} /><Section tone="white"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{industries.map(([name, desc, href], index) => { const Icon = industryIcons[index] ?? BriefcaseBusiness; return <a key={name} href={href} className="border border-gray-100 bg-white p-7"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded border border-champagne/20 bg-champagne/10 text-champagne"><Icon className="h-4.5 w-4.5" /></div><h2 className="font-serif text-xl text-obsidian">{name}</h2><p className="mt-3 text-xs leading-6 text-charcoal/62">{desc}</p><span className="mt-5 inline-flex text-[11px] font-bold uppercase tracking-wider">Relevant Services</span></a>; })}</div></Section></>;
}

function InsightsPage({ page }: { page: PageMeta }) {
  return <><PageHero page={page} /><Section><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{insights.map(([category, title, excerpt, href], index) => {
    const relatedService = services[index % services.length];
    const Icon = insightIcons[index] ?? BookOpenCheck;
    return <article key={title} className="border border-champagne/20 bg-white p-7"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded border border-champagne/20 bg-champagne/10 text-champagne"><Icon className="h-4.5 w-4.5" /></div><p className="text-[11px] font-bold uppercase tracking-widest text-champagne">{category}</p><h2 className="mt-3 font-serif text-xl text-obsidian">{title}</h2><p className="mt-3 text-xs leading-6 text-charcoal/62">{excerpt}</p><div className="mt-5 flex flex-wrap gap-4"><a href={href} data-event="blog_cta_click" className="inline-flex text-[11px] font-bold uppercase tracking-wider">Read More</a><a href={relatedService.path} className="inline-flex text-[11px] font-bold uppercase tracking-wider text-charcoal/55">Related Service</a></div></article>;
  })}</div></Section></>;
}

function ContactPage({ page }: { page: PageMeta }) {
  return <><PageHero page={page} /><Section><div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]"><form className="grid gap-4" data-event="contact_form_submit"><FormInput label="Name" /><FormInput label="Company" /><FormInput label="Email" type="email" /><FormInput label="Phone" /><label className="text-sm font-bold text-obsidian">Service Required<select className="mt-2 min-h-11 w-full rounded border border-charcoal/10 bg-white px-4"><option>Statutory Audit & Assurance</option><option>Tax Compliance & Advisory</option><option>Business Advisory</option><option>Corporate Recovery</option></select></label><label className="text-sm font-bold text-obsidian">Message<textarea className="mt-2 min-h-32 w-full rounded border border-charcoal/10 bg-white px-4 py-3" /></label><button type="button" data-event="contact_form_submit" className="min-h-11 rounded bg-champagne px-6 text-xs font-bold uppercase tracking-wide text-obsidian">Request Consultation</button></form><div className="space-y-5"><Info title="Address" body={firm.address} /><Info title="Phone" body={firm.phone} link={firm.phoneHref} /><Info title="Hours" body={firm.hours} /><LocationPanel /><p className="text-xs leading-6 text-charcoal/55">Your enquiry will be handled professionally and confidentially by our team.</p></div></div></Section></>;
}

function FormInput({ label, type = 'text' }: { label: string; type?: string }) {
  return <label className="text-sm font-bold text-obsidian">{label}<input type={type} className="mt-2 min-h-11 w-full rounded border border-charcoal/10 bg-white px-4" /></label>;
}

function Info({ title, body, link }: { title: string; body: string; link?: string }) {
  const Icon = contactIcons[title as keyof typeof contactIcons] ?? Mail;
  return <div className="border border-champagne/20 bg-white p-6"><div className="mb-4 flex h-9 w-9 items-center justify-center rounded border border-champagne/20 bg-champagne/10 text-champagne"><Icon className="h-4 w-4" /></div><h2 className="text-xs font-bold uppercase tracking-widest text-champagne">{title}</h2>{link ? <a href={link} data-event="phone_click" className="mt-2 block text-sm leading-6 text-charcoal/70">{body}</a> : <p className="mt-2 text-sm leading-6 text-charcoal/70">{body}</p>}</div>;
}

function LocationPanel() {
  return (
    <div className="overflow-hidden border border-champagne/20 bg-white">
      <a href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Open Jeffrey Suffian office location in Google Maps" className="group block min-h-44 bg-[radial-gradient(circle_at_18%_20%,rgba(200,164,93,0.18),transparent_28%),linear-gradient(135deg,#050B14,#07111F_55%,#121826)] p-6 text-ivory">
        <div className="flex h-full min-h-32 flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-champagne/12 text-champagne"><MapPin className="h-4.5 w-4.5" /></div>
            <ExternalLink className="h-4 w-4 text-ivory/45 transition group-hover:text-champagne" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-champagne">Office Location</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-ivory/75">Phileo Damansara 1, Petaling Jaya</p>
          </div>
        </div>
      </a>
      <div className="grid gap-3 border-t border-champagne/15 p-4 sm:grid-cols-2">
        <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded border border-champagne/30 px-4 text-xs font-bold uppercase tracking-wide text-obsidian">Open Google Maps</a>
        <a href={wazeUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded bg-obsidian px-4 text-xs font-bold uppercase tracking-wide text-ivory">Open Waze</a>
      </div>
    </div>
  );
}

function PrivacyPage({ page }: { page: PageMeta }) {
  return <><PageHero page={page} /><Section><div className="max-w-3xl space-y-6 text-sm leading-7 text-charcoal/65"><p>Jeffrey Suffian handles enquiry information professionally and confidentially.</p><p>Information submitted through this website may be used to respond to enquiries, coordinate consultations and maintain professional records.</p><p>For privacy-related questions, contact the firm using the details on the contact page.</p></div></Section></>;
}

function NotFoundPage() {
  const page = { path: currentPath(), title: 'Page Not Found | Jeffrey Suffian', description: 'The page could not be found.', h1: 'Page Not Found' };
  return <><PageHero page={page} /><Section><AppLink href="/" className="text-sm font-bold text-obsidian">Return Home</AppLink></Section></>;
}

function App() {
  const [path, setPath] = useState(currentPath());
  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const service = services.find((item) => item.path === path);
  const page = service ?? basePages[path] ?? { path, title: 'Page Not Found | Jeffrey Suffian', description: 'The page could not be found.', h1: 'Page Not Found' };
  const schema = useMemo(() => schemaFor(page, service), [page, service]);
  useRouteMeta(page, schema);

  return (
    <div className="min-h-screen bg-ivory font-sans text-charcoal antialiased selection:bg-champagne/30 selection:text-obsidian">
      <Header />
      <main>
        {path === '/' && <HomePage />}
        {path === '/about' && <AboutPage page={page} />}
        {path === '/services' && <ServicesHub page={page} />}
        {service && <ServicePage service={service} />}
        {path === '/our-people' && <PeoplePage page={page} />}
        {path === '/industries' && <IndustriesPage page={page} />}
        {path === '/insights' && <InsightsPage page={page} />}
        {path === '/contact' && <ContactPage page={page} />}
        {path === '/privacy-policy' && <PrivacyPage page={page} />}
        {!service && !basePages[path] && <NotFoundPage />}
      </main>
      <Footer />
      <a href="/contact" data-event="request_consultation_click" className="fixed inset-x-4 bottom-4 z-40 flex min-h-11 items-center justify-center rounded bg-champagne text-xs font-bold uppercase tracking-wide text-obsidian shadow-xl md:hidden">Request Consultation</a>
    </div>
  );
}

export default App;
