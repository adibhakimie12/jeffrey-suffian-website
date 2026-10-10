import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Verified against the original homepage and About Us page on 2026-10-10.
const remote = 'https://jeffreysuffian.com/wp-content/uploads/';
const images = [
  ['2025/07/jeffreyb-300x300.jpg', 'jeffrey-bosra', 300],
  ['2025/07/eddys-300x300.jpg', 'eddy-suffian-yusof', 300],
  ['2025/07/kamarul-300x300.jpg', 'kamarul-baharin', 300],
  ['2025/07/elmi-300x300.jpg', 'nurul-elmi-abdul-razak', 300],
  ['2025/07/ain-300x300.jpg', 'noor-ain-mohd-noor', 300],
  ['2019/10/rotate-businessadvisor.jpg', 'business-advisory-original', 640],
  ['2019/10/rotate-audit.jpg', 'audit-original', 640],
  ['2019/10/rotate-tax.jpg', 'tax-original', 640],
  ['2019/10/jeffsuff-hero-img.jpg', 'accounting-original', 1200],
  ['2019/10/towers-sq.jpg', 'malaysia-towers-original', 780],
  ['2019/10/accountants-report-1500x500.jpg', 'accountants-report-original', 1200],
];
await mkdir('public/assets', { recursive: true });
const manifest = [];
for (const [path, name, width] of images) {
  const response = await fetch(`${remote}${path}`);
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Cannot import ${path}`);
  const original = Buffer.from(await response.arrayBuffer());
  const output = await sharp(original).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  await writeFile(`public/assets/${name}.webp`, output);
  manifest.push({ source: `${remote}${path}`, file: `/assets/${name}.webp`, originalBytes: original.length, bytes: output.length });
}
// Optimise the existing office photograph, preserving the original source file.
const signage = await readFile('public/assets/jeffrey-suffian-office-signage.png');
await sharp(signage).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 82 }).toFile('public/assets/jeffrey-suffian-office-signage.webp');
await writeFile('docs/original-image-sources.json', JSON.stringify({ retrieved: '2026-10-10', images: manifest }, null, 2) + '\n');
console.log(`Imported ${manifest.length} verified original images; ${manifest.reduce((sum, item) => sum + item.bytes, 0)} bytes total.`);
