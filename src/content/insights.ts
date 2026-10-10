import type { PageMeta } from '../seo';

type Source = { id: string; label: string; url: string; note: string };
type GuideSection = { id: string; title: string; paragraphs: string[]; bullets?: string[]; sourceIds?: string[]; table?: { headings: string[]; rows: string[][] } };
export type InsightGuide = PageMeta & {
  category: string; format: string; audience: string; image: string; imageAlt: string;
  answer: string; takeaways: string[]; sections: GuideSection[];
  faqs: { q: string; a: string }[]; sources: Source[];
  relatedService: { path: string; title: string }; nextStep: string;
};

const ssm: Source = { id: 'ssm', label: 'SSM: Audit exemption for private companies', url: 'https://www.ssm.com.my/Pages/Legal_Framework/Audit-Exemption.aspx', note: 'Malaysian audit exemption guidance and Practice Directive 10/2024.' };
const iaasb: Source = { id: 'iaasb', label: 'IAASB: ISA 700 — the auditor’s opinion', url: 'https://www.iaasb.org/publications/international-standard-auditing-isa-700-revised-forming-opinion-and-reporting-financial-statements', note: 'Explains the auditor’s responsibility to form and report an opinion on financial statements.' };
const hasil: Source = { id: 'hasil', label: 'HASiL: Tax e-Services', url: 'https://www.hasil.gov.my/en/e-Perkhidmatan/', note: 'Official Malaysian information on tax registration, estimates and return submission services.' };

export const insightsCheckedDate = '2026-10-11';
export const insightsCheckedLabel = '11 October 2026';

export const insightGuides: InsightGuide[] = [
  {
    path: '/insights/prepare-for-company-audit',
    ogType: 'article',
    title: 'Company Audit Preparation Checklist | Jeffrey Suffian',
    h1: 'Your first company audit? Start with these 7 records.',
    description: 'A practical audit preparation checklist for Malaysian business owners: seven record groups, a simple folder structure and questions to ask your auditor.',
    category: 'Audit preparation', format: 'Practical checklist', audience: 'For directors and finance teams',
    image: '/assets/service-audit-illustrative.webp', imageAlt: 'Illustrative financial review workspace with reports and a magnifying glass',
    answer: 'Start with a complete accounting file, bank records and schedules supporting the main balances. Then agree the document list, contact person and timeline with your auditor. Preparation means making the figures traceable, not just collecting more PDFs.',
    takeaways: ['Organise seven record groups before the first discussion.', 'Reconcile balances and explain missing information early.', 'Confirm the audit scope and timing for your own company.'],
    sections: [
      { id: 'confirm-scope', title: 'First, confirm what your company actually needs', paragraphs: ['Before collecting documents, confirm the financial year, the engagement and any reporting deadline. An audit involves an auditor forming an opinion on financial statements; preparing those statements is a separate task.', 'SSM provides exemption criteria for certain private companies. Eligibility needs a company-specific assessment: do not assume that being a small business automatically removes the need for an audit.'], sourceIds: ['iaasb', 'ssm'] },
      { id: 'seven-records', title: 'The seven record groups to organise', paragraphs: ['Use this as a starting checklist, then adapt it to the list your auditor requests. Some records will not apply to your business; others may need more detail.'], bullets: ['Accounting file: trial balance, general ledger and draft financial statements, where available.', 'Bank and financing: statements, reconciliations, loan schedules and facility agreements.', 'Sales and customers: invoices, credit notes, customer balances and receipts after year end.', 'Purchases and suppliers: invoices, supplier balances, payment records and expense schedules.', 'Assets and inventory: fixed-asset register, purchase or disposal records and stock-count information where relevant.', 'Payroll and tax: payroll summaries, tax computations, submitted returns and relevant correspondence.', 'Company and agreements: relevant resolutions, ownership information, major contracts and related-party balances.'] },
      { id: 'folder-structure', title: 'Make your folder easy for someone else to understand', paragraphs: ['Create one main folder for the financial year and a subfolder for each record group. Use filenames that identify the document and period, such as Bank-Reconciliation-March. Keep the original accounting export separate from later revisions.', 'Add a short index with the owner of each folder and a note about outstanding items. A small amount of structure makes it easier to explain what has changed when more than one person is preparing the file.'] },
      { id: 'check-balances', title: 'Check the connections between the numbers', paragraphs: ['Before sending the file, compare each schedule with the trial balance. If a bank balance, customer listing or asset schedule does not agree, record the difference and the work still needed. Avoid silently replacing one version with another.', 'Separate an explanation from its evidence. A note saying that a customer paid is more useful when the receipt can also be located. Ask how the auditor would like documents transferred; agree a suitable channel before sharing confidential records.'] },
      { id: 'first-discussion', title: 'Bring these questions to your first discussion', paragraphs: ['Your preparation is useful even if some records are incomplete. A clear list of gaps gives the team something specific to discuss.'], bullets: ['Which records are required for our business and financial year?', 'Who will answer queries, and who approves adjustments?', 'Are any stock counts, confirmations or other arrangements needed?', 'What information is missing, and how might that affect timing?'] }
    ],
    faqs: [
      { q: 'Is this the exact document list every auditor requires?', a: 'No. It is a practical starting checklist. The requested records depend on the business, its balances, the financial year and the agreed audit scope.' },
      { q: 'Can I contact the auditor before all records are ready?', a: 'Yes. Explain what is available and what is outstanding so the team can discuss preparation and timing. Incomplete information may affect when the work can proceed.' }
    ], sources: [ssm, iaasb],
    relatedService: { path: '/services/statutory-audit-assurance', title: 'Statutory Audit & Assurance' },
    nextStep: 'Tell us your financial year, business activity and which records are already available. Our Petaling Jaya team can discuss the audit requirements and next steps.'
  },
  {
    path: '/insights/accounting-audit-tax-differences',
    ogType: 'article',
    title: 'Accounting vs Audit vs Tax: What Do You Need? | Jeffrey Suffian',
    h1: 'Accounting, audit or tax: which service do you need?',
    description: 'Understand the difference between accounting, audit and tax work, with a simple comparison and practical examples for Malaysian business owners.',
    category: 'Business essentials', format: 'Simple explainer', audience: 'For business owners',
    image: '/assets/service-tax-illustrative.webp', imageAlt: 'Illustrative accounting desk with a calculator and organised financial worksheets',
    answer: 'Accounting organises and reports financial activity. Audit provides an independent opinion on financial statements. Tax work addresses tax calculations, returns and related obligations. Your business may need more than one, so begin with the outcome you are trying to achieve.',
    takeaways: ['Match the service to the result you need.', 'An audit and a tax return serve different purposes.', 'Confirm responsibilities, independence and deliverables before appointing a firm.'],
    sections: [
      { id: 'comparison', title: 'Three services, three different questions', paragraphs: ['The easiest way to separate them is to ask what you want the work to answer. A service name alone does not define the full engagement.'], table: { headings: ['Area', 'Main question', 'Typical work'], rows: [['Accounting', 'What happened in the business?', 'Recording transactions, reconciling balances and preparing financial information.'], ['Audit', 'What opinion can an independent auditor give?', 'Examining evidence and reporting an opinion on financial statements.'], ['Tax', 'What tax work needs to be addressed?', 'Tax computations, return preparation and discussion of tax obligations.']] }, sourceIds: ['iaasb', 'hasil'] },
      { id: 'accounting', title: 'Start with accounting when the records need attention', paragraphs: ['If bank balances do not reconcile, invoices are missing or you cannot see what customers owe, the immediate issue may be the underlying accounting records. Preparing a useful set of accounts starts with complete information and a consistent process.', 'For your enquiry, describe the records you maintain and the software you use. Ask whether the engagement includes bookkeeping, adjustments or financial-statement preparation. Confirm availability and scope rather than assuming all of those tasks are included.'] },
      { id: 'audit', title: 'Choose audit for the independent opinion', paragraphs: ['An audit has a distinct reporting purpose. IAASB’s ISA 700 addresses the auditor’s opinion and report on financial statements. That is different from recording transactions or submitting a tax return.', 'For a Malaysian private company, check the applicable audit requirements and any SSM exemption criteria for its circumstances. If you need an audit, discuss who prepares the accounts and how the auditor’s independence will be maintained.'], sourceIds: ['iaasb', 'ssm'] },
      { id: 'tax', title: 'Choose tax support for tax-specific work', paragraphs: ['Tax calculations and submissions use financial information but have their own purpose. HASiL’s official e-Services include facilities for tax registration, estimates and income tax return submission. The applicable obligations depend on the taxpayer and circumstances.', 'Bring your business structure, financial year, previous submissions and any HASiL correspondence to the discussion. Ask which calculations, submissions and follow-up work the proposed scope covers.'], sourceIds: ['hasil'] },
      { id: 'example', title: 'One business can need all three', paragraphs: ['Consider an owner who says, “My year-end accounts are unfinished, I need to know whether an audit applies, and I have a tax enquiry.” Those are connected issues, but they should not be treated as one undefined task.', 'A useful first conversation identifies the state of the records, the reporting requirement and the tax question separately. Agree who is responsible for each task, what information is needed and how the work will be sequenced.'], bullets: ['Describe the result you need, not just “I need an accountant”.', 'Ask for written scope, deliverables, responsibilities and fees.', 'Confirm what is excluded and who handles any additional work.'] }
    ],
    faqs: [
      { q: 'Does an audit replace a tax return?', a: 'No. An audit opinion and a tax return serve different purposes. Discuss the applicable audit and tax work separately for your business.' },
      { q: 'Can the same firm handle every part?', a: 'Ask the firm which services it can provide and how professional independence and other requirements apply. Do not assume bookkeeping, audit and tax work are all included in one engagement.' }
    ], sources: [iaasb, hasil, ssm],
    relatedService: { path: '/services/tax-compliance-advisory', title: 'Tax Compliance & Advisory' },
    nextStep: 'Describe the outcome you need and any deadline or correspondence. Our team can help you identify which service scope to discuss.'
  },
  {
    path: '/insights/buying-business-financial-questions',
    ogType: 'article',
    title: 'Buying a Business: 5 Financial Questions | Jeffrey Suffian',
    h1: 'Buying a business? Ask these 5 financial questions first.',
    description: 'Five financial questions to discuss before buying a business: earnings, cash flow, liabilities, customer concentration and the basis of the purchase price.',
    category: 'Buying a business', format: 'Decision guide', audience: 'For buyers and investors',
    image: '/assets/service-advisory-illustrative.webp', imageAlt: 'Illustrative transaction planning workspace with financial charts and a notebook',
    answer: 'Look beyond the asking price. Ask whether earnings are repeatable, how cash moves, what obligations exist, how dependent the business is on key relationships and what the price includes. Use the answers to define due diligence and valuation work before making a binding commitment.',
    takeaways: ['A profitable business can still need additional cash.', 'Due diligence and valuation answer different questions.', 'Turn unclear answers into specific requests for evidence.'],
    sections: [
      { id: 'earnings', title: '1. Do the earnings tell a consistent story?', paragraphs: ['Compare financial statements with recent management accounts and the explanations behind unusual results. Ask which income or costs are one-off, and what might change when the current owner leaves.', 'Write down every adjustment used to present the business as more profitable. Your enquiry should explain what the seller says the adjustment represents and what evidence is available. An unexplained adjustment is a question to investigate, rather than a figure to accept automatically.'], sourceIds: ['bdc'] },
      { id: 'cash', title: '2. How much cash does the business need to operate?', paragraphs: ['Review cash flow alongside profit. Customer payment patterns, supplier terms and inventory can influence how much money is tied up in operations. Ask what working capital would be needed after completion.', 'For the first discussion, make a separate list of the purchase price, expected transaction costs and the operating cash you believe will be needed. Keeping those questions separate helps an adviser understand the decision you are actually trying to make.'], sourceIds: ['bdc'] },
      { id: 'obligations', title: '3. What obligations are you taking on?', paragraphs: ['Request information about borrowings, unpaid balances, contracts, leases and relevant tax matters. The Australian Government’s business-buying guidance recommends reviewing financial, operational and legal records before a purchase; those general checks are useful prompts, not Malaysian legal requirements.', 'Clarify what is being acquired and involve Malaysian legal and tax advisers for the proposed structure. Record what is known, what is missing and which adviser will investigate each issue.'], sourceIds: ['business-au'] },
      { id: 'relationships', title: '4. How dependent is the business on a few relationships?', paragraphs: ['Understand how much revenue depends on major customers and whether key supplier or owner relationships will continue after a sale. BDC identifies customer concentration as a due diligence consideration.', 'Ask the seller to describe the transition plan in concrete terms. Who will introduce customers? Who knows the operating process? Put questions that remain unanswered into the due diligence request list.'], sourceIds: ['bdc'] },
      { id: 'price', title: '5. What supports the price, and what does it include?', paragraphs: ['Identify the assets, inventory, contracts and other items included in the proposed purchase. Due diligence investigates information and risks; valuation considers value using an agreed basis and relevant assumptions. Neither should be reduced to the asking price alone.', 'Before your adviser meeting, prepare a short deal summary: target business, proposed acquisition, seller’s price, available records and your main concerns. You do not need a polished investment presentation to begin a useful conversation.'], sourceIds: ['business-au', 'value-au'] },
      { id: 'next-steps', title: 'Turn the five questions into a request list', paragraphs: ['Use a simple note with three columns: question, evidence requested and person responsible. Mark unanswered items clearly. This turns a broad concern such as “Are the numbers reliable?” into a discussion that can be scoped.'], bullets: ['Bring the seller’s information pack and available financial records.', 'Explain your intended purchase and financing assumptions.', 'Agree the due diligence and valuation scope with the relevant advisers.', 'Discuss findings and unresolved issues before making a binding commitment.'] }
    ],
    faqs: [
      { q: 'Is due diligence the same as a business valuation?', a: 'No. Due diligence investigates information and risks. Valuation considers value on an agreed basis and assumptions. A transaction may require both, alongside legal and tax advice.' },
      { q: 'Can these five questions confirm that a purchase is safe?', a: 'No. They are prompts for an initial discussion, not a complete investigation or a guarantee. The work required depends on the business, proposed transaction and information available.' }
    ],
    sources: [
      { id: 'business-au', label: 'Australian Government: Buy an existing business', url: 'https://business.gov.au/Planning/New-businesses/Buy-an-existing-business', note: 'General due diligence concepts only. Australian legal, tax and registration requirements do not apply to Malaysian transactions.' },
      { id: 'value-au', label: 'Australian Government: Value your business', url: 'https://business.gov.au/finance/funding/value-your-business', note: 'General valuation concepts and the financial information used to support a valuation; not Malaysian legal or tax guidance.' },
      { id: 'bdc', label: 'BDC: Conducting due diligence when buying a business', url: 'https://www.bdc.ca/en/articles-tools/start-buy-business/buy-business/buying-business-conducting-due-diligence', note: 'General acquisition and risk concepts from the Business Development Bank of Canada; not Malaysian legal or tax guidance.' }
    ],
    relatedService: { path: '/services/due-diligence-valuation', title: 'Due Diligence & Business Valuation' },
    nextStep: 'Share a brief description of the target business, the proposed transaction and the information available. Our team can discuss the scope of due diligence or valuation support.'
  }
];

export function readingMinutes(guide: InsightGuide) {
  const text = [guide.answer, ...guide.sections.flatMap(section => [...section.paragraphs, ...(section.bullets ?? []), ...(section.table?.rows.flat() ?? [])]), ...guide.faqs.map(faq => `${faq.q} ${faq.a}`)].join(' ');
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}
