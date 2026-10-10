# Audit Jeffrey Suffian — 10 Oktober 2026

Audit meliputi kod lokal, output production, gambar dan URL website asal. Susulan pada 10 Oktober 2026: folder dipautkan ke projek Vercel dan perubahan dideploy ke production melalui CLI. Source belum dicommit/push ke GitHub. Akaun Vercel CLI: adibhakimi19-9443; projek: jeffrey-suffian-website. Keputusan live dan PageSpeed direkod dalam [laporan deployment/performance](2026-10-10-vercel-performance.md).

## Status selepas pembaikan

| Perkara | Dapatan asal | Keadaan kod selepas audit |
| --- | --- | --- |
| SEO teknikal | Title/description/canonical ada, tetapi hanya homepage dalam HTML asal | 15 halaman diprarender dengan kandungan, H1, title, description dan canonical masing-masing |
| Sitemap / robots | Ada fail manual dengan domain www | Build menjana kedua-duanya daripada senarai route menggunakan https://jeffreysuffian.com |
| Structured data | Organisasi, breadcrumb dan FAQ melalui JS; senarai artikel belum wujud | AccountingService dengan alamat, telefon, logo dan waktu operasi; Service + FAQ pada servis; ListItem/Person yang betul pada people; markup Article yang tidak mempunyai artikel dibuang |
| Gambar | 3 potret remote, 2 potret kosong, hero 4.6 MB | 11 gambar asal disimpan sebagai WebP sekitar 200 KB jumlah; 5 potret lokal; hero sekitar 64 KB; signage 1.65 MB menjadi sekitar 36 KB |
| Social previews | Tiada og:image / Twitter image | OG image, locale, site name dan Twitter summary_large_image |
| URL lama | Catch-all rewrite menghidangkan homepage dan status 200 | Redirect kekal bagi URL utama WordPress dan profil; fail 404 tersendiri; catch-all homepage dibuang |
| Google Ads / GA4 | ID placeholder dalam meta tag; tiada tag sebenar | Konfigurasi GTM atau direct Google tag, persetujuan cookies, page_view dan event klik; belum aktif tanpa ID |
| Lead generation | Butang borang tidak menghantar apa-apa | Borang sentiasa kelihatan; tanpa endpoint, penghantaran disabled dengan notis dan pautan telefon; lead direkod hanya selepas pengesahan penerimaan |
| Insights | Read More kembali ke /insights; tiada artikel penuh | Topik memaut ke servis berkaitan; tidak lagi berpura-pura mempunyai artikel penuh |
| Mobile / accessibility | Header tablet terlalu rapat; widget hero ialah butang tanpa tindakan | Menu hingga breakpoint desktop; widget memaut servis; skip link, fokus keyboard, aria-expanded dan reduced motion |
| Dependencies | npm audit melaporkan 12 isu termasuk 1 critical | Kemas kini serasi dalam lockfile; npm audit melaporkan 0 isu ketika audit |

Sumber gambar direkod dalam original-image-sources.json. Gambar ilustrasi yang asalnya stock tidak dilabel sebagai gambar team sebenar.

### Asal kandungan servis

Kategori utama disemak terhadap [Our Services asal](https://jeffreysuffian.com/our-services/): assurance, business advisory, tax compliance/planning, corporate care/recovery, corporate finance dan entrepreneurial services. Website baharu menggabungkan tax compliance/planning, memisahkan due diligence/valuation daripada advisory, dan menggunakan SME Advisory untuk kandungan entrepreneurial. Internal audit dan special review/investigation (forensic auditing) kini dinyatakan dalam Business Advisory.

Penerangan ringkas, audience, FAQ, tajuk SEO dan CTA ialah olahan dalam kod; bukan petikan atau pengesahan client bagi setiap ayat. Client perlu menyemak skop khusus dan proses engagement sebelum launch. Rujukan nombor seksyen undang-undang lama pada laman asal tidak disalin sebagai panduan semasa. Semakan ini mengesahkan padanan kategori servis, bukan pemindahan verbatim seluruh kandungan lama.

## AEO dan GEO

Asas sudah ada: penerangan servis, soalan dan jawapan yang boleh dibaca dalam HTML, identiti firma, nombor firma, alamat, waktu operasi, potret dan internal links. Ini membantu pembaca dan enjin carian memahami perniagaan. Ia bukan jaminan halaman akan dipilih sebagai jawapan atau dipetik oleh AI.

Google menyatakan SEO biasa masih relevan untuk AI Overviews dan AI Mode; tiada schema khas atau fail AI yang diwajibkan. Oleh itu llms.txt tidak ditambah sebagai janji ranking. [Panduan Google AI features](https://developers.google.com/search/docs/appearance/ai-features).

FAQ schema boleh menyatakan kandungan soalan/jawapan, tetapi rich result FAQ Google biasanya dihadkan kepada laman kerajaan dan kesihatan yang berautoriti. Jangan jual feature ini sebagai jaminan rich snippet untuk firma akaun. [Panduan Google FAQ](https://developers.google.com/search/blog/2023/08/howto-faq-changes).

Kandungan servis masih ringkas. Untuk pertumbuhan organik, client patut meluluskan kandungan yang menerangkan proses engagement, dokumen yang diperlukan, jangkaan masa dan pengalaman yang boleh disahkan. Artikel audit/tax perlu penulis atau reviewer profesional, tarikh semakan sebenar dan pautan sumber SSM/LHDN/MIA yang berkaitan. Jangan reka kelayakan, testimoni, kadar kejayaan atau tarikh penerbitan. Halaman BM boleh dibina jika ada kandungan terjemahan sebenar dan semakan client; hreflang hanya selepas halaman itu wujud.

## Google Ads: apa yang membantu prestasi

Gunakan landing page servis khusus untuk padanan niat carian: audit -> statutory-audit-assurance, tax -> tax-compliance-advisory, due diligence/valuation -> due-diligence-valuation. Kekalkan mesej iklan selaras dengan servis, lokasi Petaling Jaya dan CTA yang jelas. Skop campaign, keyword, negative keyword, bajet, jadual dan sasaran lokasi perlu ditetapkan berdasarkan data serta kemampuan client mengendalikan enquiry.

Nilai primary conversion daripada enquiry diterima dan, apabila ada CRM, qualified lead. Klik telefon atau consultation ialah secondary signal. Bandingkan cost per qualified lead dan enquiry-to-client rate; CTR sahaja tidak menunjukkan keuntungan. Website tidak boleh menjamin ROAS, ranking atau Quality Score. [Panduan conversion Google Ads](https://support.google.com/google-ads/answer/16560108).

Kod tracking disediakan, tetapi GA4/Ads/GTM/Search Console belum dicipta dan tiada backend enquiry sebenar. Hanya selepas ID dipasang dan delivery diuji, tracking boleh dianggap aktif. Lihat ../analytics-events.md dan ../.env.example untuk setup.

## Sebelum domain asal dipindahkan

1. Sahkan Vercel deployment preview dahulu: deep URL terus dibuka, imej, menu, metadata, sitemap, robots dan 404. Vite preview tidak menjalankan peraturan redirect/header Vercel.
2. Tambah domain asal dan www ke projek Vercel dengan kebenaran pemilik. Sahkan DNS, HTTPS dan redirect www ke non-www. Jangan ubah DNS sebelum backup dan inventori URL lama siap.
3. Semak export WordPress / sitemap lama dan data Search Console. Redirect lain yang mempunyai trafik perlu dipetakan satu per satu. Semakan audit ini merangkumi URL utama dan profil yang ditemui, bukan seluruh sejarah URL/media WordPress.
4. Kekalkan atau redirect URL media lama jika ia sudah mendapat trafik / backlinks.
5. Semak semua kelayakan, skop servis, waktu, alamat dan polisi privasi dengan client. Client perlu menetapkan penerima enquiry, retention dan proses pengendalian data sebenar.
6. Cipta akaun measurement, pasang ID, sambung backend jika diperlukan dan lengkapkan pemeriksaan Tag Assistant/DebugView. Pastikan ujian dummy tidak masuk ke bidding production.
7. Sahkan domain dalam Search Console, submit https://jeffreysuffian.com/sitemap.xml dan periksa URL utama. Pantau Page indexing dan redirect errors.
8. Sahkan Google Business Profile milik client, kategori, alamat, telefon dan waktu. Gantikan pautan carian peta dengan listing rasmi yang disahkan apabila tersedia. Dapatkan reviews sebenar melalui proses client.
9. Uji semula PageSpeed Insights pada domain asal dan lihat data Core Web Vitals selepas data tersedia. Sasaran pengalaman Google: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 pada persentil ke-75. Susulan deployment telah mengukur Lighthouse pada vercel.app; data CWV lapangan masih belum tersedia. [Sumber ambang Core Web Vitals](https://web.dev/articles/vitals).
10. vercel.app diberi header noindex; domain asal menggunakan canonical dan robots yang membenarkan crawl. Pastikan protection/noindex tidak tersalah dibawa ke domain sebenar.

## Had penilaian

Pengesahan akhir: build production dan TypeScript lulus; 6 ujian SEO/output dan 2 ujian attribution lulus; npm audit melaporkan 0 vulnerabilities. Desktop, tablet dan mobile diperiksa. Output menggunakan fail `.html` untuk URL tanpa trailing slash, sejajar dengan `cleanUrls` Vercel; respons HTTP terus untuk halaman team, contact dan tax disahkan mempunyai tajuk halaman masing-masing.

Vercel CLI authenticated sebagai `adibhakimi19-9443`; folder kini linked dan production alias `jeffrey-suffian-website.vercel.app` sudah dikemas kini. GitHub belum dipush.

Build statik, ujian lokal dan pemeriksaan HTTP production mengesahkan struktur teknikal; PageSpeed mobile/desktop direkod dalam laporan susulan. Tiada data Search Console/GA4/Ads, ranking, backlink, qualified lead atau kos campaign untuk mengukur prestasi pemasaran sebenar. Redirect utama dan header vercel.app telah diperiksa; domain asal, redirect host www dan DNS masih perlu disahkan semasa perpindahan. DNS dan website asal tidak diubah.

[Dokumentasi konfigurasi Vercel](https://vercel.com/docs/project-configuration/vercel-json).
