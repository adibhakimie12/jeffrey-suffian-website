import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

assert.match(app, /\/assets\/jeffrey-suffian-logo\.png/);
assert.match(app, /AF001963/);
assert.match(app, /Malaysian Institute of Accountants/);
assert.match(app, /approved audit firm and tax agency firm/i);
assert.match(app, /\+603-7660 3915\/3917/);
assert.match(app, /Petaling Jaya/);
assert.match(app, /Partner-Led/);
assert.match(app, /hero-widget-audit/);
assert.match(app, /Our Partners/);
assert.match(app, /Need an audit, tax or advisory partner/);
assert.match(app, /mario-gogh-office\.jpg/);
assert.match(app, /animate-float-subtle/);
assert.match(app, /trust-marquee/);
assert.match(app, /animate-trust-marquee/);
assert.match(app, /jeffrey-suffian-office-signage\.png/);
assert.doesNotMatch(app, /Professional\s*<\/p>/);
assert.match(css, /--color-signature-yellow:\s*#F2B705/i);
assert.match(css, /--color-signature-red:\s*#B51E23/i);
assert.match(app, /brand-accent-strip/);
assert.match(app, /bg-paper/);
