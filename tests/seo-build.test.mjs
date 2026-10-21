import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import sharp from 'sharp';

const read = (path) => readFile(`dist/${path}`, 'utf8');
const sitemap = await read('sitemap.xml');
const routes = [...sitemap.matchAll(/<loc>https:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/');

test('insights has complete linked guides with article metadata, sources and readable answers', async () => {
  const hub = await read('insights.html');
  const guides = routes.filter(route => route.startsWith('/insights/'));
  assert.equal(guides.length, 3);
  const images = new Set();
  for (const route of guides) {
    assert.ok(hub.includes(`href="${route}"`));
    const html = await read(`${route.slice(1)}.html`);
    const schema = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const article = schema.find(item => item['@type'] === 'BlogPosting');
    assert.ok(article?.headline && article.mainEntityOfPage.endsWith(route));
    assert.ok(!article.author && !article.datePublished, 'no invented reviewer or publication date on local drafts');
    assert.match(html, /property="og:type" content="article"/);
    assert.ok(html.includes(`property="og:image" content="${article.image}"`));
    images.add(article.image);
    const breadcrumb = schema.find(item => item['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumb.itemListElement[1].item, 'https://jeffreysuffian.com/insights');
    const visible = html.replace(/<script[\s\S]*?<\/script>/g, '').replaceAll('&amp;', '&').replaceAll('&#x27;', "'");
    assert.match(visible, /Sources & further reading/);
    assert.match(visible, /Sources checked/);
    assert.ok([...visible.matchAll(/<h2[\s>]/g)].length >= 6);
    assert.match(visible, /href="https:\/\/(www\.)?(ssm\.com\.my|hasil\.gov\.my|iaasb\.org|business\.gov\.au)/);
    for (const faq of schema.find(item => item['@type'] === 'FAQPage').mainEntity) {
      assert.ok(visible.includes(faq.name));
      assert.ok(visible.includes(faq.acceptedAnswer.text));
    }
  }
  assert.equal(images.size, 3);
});

test('industries distinguishes sectors from business contexts with visible FAQ and matching schema', async () => {
  const html = await read('industries.html');
  const schema = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, '').replaceAll('&amp;', '&').replaceAll('&#x27;', "'");
  const collection = schema.find(item => item['@type'] === 'CollectionPage');
  assert.equal(collection?.about.length, 4);
  for (const sector of collection.about) assert.ok(visible.includes(sector.name));
  assert.ok(visible.includes('Business stages & transactions'));
  assert.equal([...visible.matchAll(/<article\b[^>]*data-industry-card=/g)].length, 6);
  assert.equal([...visible.matchAll(/alt="Illustrative /g)].length, 5);
  const faq = schema.find(item => item['@type'] === 'FAQPage');
  assert.ok(faq?.mainEntity.length >= 3);
  for (const question of faq.mainEntity) {
    assert.ok(visible.includes(question.name));
    assert.ok(visible.includes(question.acceptedAnswer.text));
  }
});

test('services catalog, breadcrumbs and FAQ schema match readable service content', async () => {
  for (const route of routes.filter((item) => item === '/services' || item.startsWith('/services/'))) {
    const html = await read(`${route.slice(1)}.html`);
    const schema = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const visible = html.replace(/<script[\s\S]*?<\/script>/g, '').replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"');
    const faq = schema.find((item) => item['@type'] === 'FAQPage');
    assert.ok(faq?.mainEntity.length >= 3, `${route}: useful FAQ`);
    for (const question of faq.mainEntity) {
      assert.ok(visible.includes(question.name), `${route}: visible question`);
      assert.ok(visible.includes(question.acceptedAnswer.text), `${route}: visible answer`);
    }
    if (route === '/services') {
      const catalog = schema.find((item) => item['@type'] === 'ItemList');
      assert.equal(catalog.itemListElement.length, 7);
      for (const entry of catalog.itemListElement) assert.ok(visible.includes(new URL(entry.item.url).pathname));
    } else {
      const breadcrumb = schema.find((item) => item['@type'] === 'BreadcrumbList');
      assert.deepEqual(breadcrumb.itemListElement.map((item) => item.position), [1, 2, 3]);
      assert.equal(breadcrumb.itemListElement[1].item, 'https://jeffreysuffian.com/services');
      assert.ok(schema.some((item) => item['@type'] === 'Service' && item.url.endsWith(route)));
      assert.ok(visible.includes('Related expertise'));
    }
  }
});

test('every sitemap URL has unique, readable HTML before JavaScript runs', async () => {
  const titles = new Set();
  for (const route of routes) {
    const html = await read(route === '/' ? 'index.html' : `${route.slice(1)}.html`);
    assert.match(html, /<h1[\s>]/, `${route} needs server-rendered page content`);
    assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, route);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), `${route}: unique title`);
    titles.add(title);
    const expected = `https://jeffreysuffian.com${route === '/' ? '/' : route}`;
    assert.ok(html.includes(`rel="canonical" href="${expected}"`), route);
    const json = html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    assert.ok(json, `${route}: schema available without JS`);
    assert.ok(JSON.parse(json).some((item) => item['@type'] === 'AccountingService'));
    for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
      assert.ok(match[1].startsWith('/assets/'), `External image on ${route}`);
      await access(`dist${match[1]}`);
    }
  }
  assert.ok(routes.length >= 15);
});

test('all five team members have local portraits', async () => {
  const html = await read('our-people.html');
  for (const name of ['Jeffrey Bosra', 'Eddy Suffian Yusof', 'Kamarul Baharin', 'Nurul Elmi Abdul Razak', 'Noor Ain Mohd Noor']) {
    assert.ok(html.includes(`alt="${name}"`), name);
  }
});

test('sitemap and robots use the original non-www domain', async () => {
  assert.ok(!sitemap.includes('www.jeffreysuffian.com'));
  assert.match(await read('robots.txt'), /Sitemap: https:\/\/jeffreysuffian\.com\/sitemap.xml/);
});

test('configured enquiry page exposes the form with consent and alternative phone contact', async () => {
  const html = await read('contact.html');
  assert.match(html, /href="tel:\+60376603915"/);
  assert.ok(!html.includes('data-event="contact_form_submit"'), 'do not count a button click as a submitted lead');
  assert.match(html, /Your details will be used to respond to your enquiry/);
  assert.match(html, /<form[^>]+aria-labelledby="enquiry-heading"/);
  for (const field of ['name', 'company', 'email', 'phone', 'service', 'message', 'consent']) {
    assert.ok(html.includes(`name="${field}"`), field);
  }
  assert.ok(!html.includes('Online enquiries are not available yet'));
  assert.ok(!/<button[^>]+type="submit"[^>]+disabled=""/.test(html));
});

test('404 is noindex and insights do not advertise missing articles', async () => {
  const html = await read('404.html');
  assert.match(html, /name="robots" content="noindex,follow"/);
  const insights = await read('insights.html');
  assert.ok(!insights.includes('Read More'));
  assert.ok(!insights.includes('"@type":"Article"'));
});

test('internal links resolve to generated routes and images declare their actual dimensions', async () => {
  const htmlByRoute = new Map(await Promise.all(routes.map(async (route) => [route, await read(route === '/' ? 'index.html' : `${route.slice(1)}.html`)])));
  for (const [route, html] of htmlByRoute) {
    for (const [, href] of html.matchAll(/<a[^>]+href="([^\"]+)"/g)) {
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const url = new URL(href.replaceAll('&amp;', '&'), `https://jeffreysuffian.com${route}`);
      const target = htmlByRoute.get(url.pathname);
      assert.ok(target, `${route} links to missing ${href}`);
      if (url.hash) assert.ok(target.includes(`id="${url.hash.slice(1)}"`), `Missing anchor ${href}`);
    }
    for (const [tag, src] of html.matchAll(/<img[^>]+src="([^\"]+)"[^>]*>/g)) {
      const metadata = await sharp(`dist${src}`).metadata();
      assert.equal(Number(tag.match(/\bwidth="(\d+)"/)?.[1]), metadata.width, `${src}: width`);
      assert.equal(Number(tag.match(/\bheight="(\d+)"/)?.[1]), metadata.height, `${src}: height`);
    }
  }
});
