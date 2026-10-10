export const SITE_URL = 'https://jeffreysuffian.com';
export const OG_IMAGE = `${SITE_URL}/assets/accounting-original.webp`;
export type PageMeta = { path: string; title: string; description: string; h1: string; image?: string; imageAlt?: string; ogType?: 'website' | 'article' };
export const canonicalFor = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`;
const escape = (value: string) => value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export function renderHead(page: PageMeta, schema: object[], noindex = false) {
  const canonical = canonicalFor(page.path);
  const image = page.image ? `${SITE_URL}${page.image}` : OG_IMAGE;
  const verification = import.meta.env.VITE_SEARCH_CONSOLE_VERIFICATION;
  return `<title>${escape(page.title)}</title>
    <meta name="description" content="${escape(page.description)}" />
    <meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}" />
    <link rel="canonical" href="${escape(canonical)}" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${escape(canonical)}" />
    <meta property="og:type" content="${page.ogType ?? 'website'}" />
    <meta property="og:site_name" content="Jeffrey Suffian" />
    <meta property="og:locale" content="en_MY" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="${escape(page.imageAlt ?? 'Business discussion and financial reporting')}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="${image}" />
    ${verification ? `<meta name="google-site-verification" content="${escape(verification)}" />` : ''}
    <script id="structured-data" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
}
