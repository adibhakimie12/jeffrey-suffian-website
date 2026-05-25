import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'tablet-768', width: 768, height: 1024 }
];

for (const viewport of viewports) {
  test(viewport.name, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });

    const data = await page.evaluate(() => {
      const doc = document.documentElement;
      const cta = document.querySelector('a[data-event="request_consultation_click"].fixed');
      const rect = cta?.getBoundingClientRect();

      return {
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
        stickyVisible: !!rect && rect.bottom <= window.innerHeight && rect.top >= 0 && getComputedStyle(cta).display !== 'none',
        stickyHeight: rect?.height ?? 0
      };
    });

    expect(data.hasHorizontalOverflow).toBe(false);
    if (viewport.width < 768) {
      expect(data.stickyVisible).toBe(true);
      expect(data.stickyHeight).toBeGreaterThanOrEqual(44);
    }
  });
}
