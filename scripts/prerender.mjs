import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

// Match the client build's React environment. Rendering does not need the
// development server plugins or the Tailwind compiler.
process.env.NODE_ENV = 'production';
const server = await createServer({ configFile: false, mode: 'production', server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' });
try {
  const { render, pages } = await server.ssrLoadModule('/src/entry-server.tsx');
  const template = await readFile('dist/index.html', 'utf8');
  for (const path of [...pages.map((page) => page.path), '/404']) {
    const { html, head } = render(path);
    const target = path === '/' ? 'dist/index.html' : `dist${path}.html`;
    await mkdir(dirname(target), { recursive: true });
    const output = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => head).replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
    if (!output.includes('<h1') || !output.includes('application/ld+json')) throw new Error(`Incomplete render: ${path}`);
    await writeFile(target, output);
  }
  const origin = 'https://jeffreysuffian.com';
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${origin}${page.path}</loc></url>`).join('\n')}\n</urlset>\n`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  console.log(`Prerendered ${pages.length} pages and a noindex 404; generated sitemap and robots.txt.`);
} finally { await server.close(); }
