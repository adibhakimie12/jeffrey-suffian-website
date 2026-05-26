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

    const initial = await page.evaluate(() => {
      const doc = document.documentElement;
      const cta = document.querySelector('a[data-event="request_consultation_click"].fixed');
      const visual = document.querySelector('.mobile-hero-visual');
      const rect = cta?.getBoundingClientRect();
      const visualRect = visual?.getBoundingClientRect();

      return {
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
        stickyExists: !!cta,
        stickyWidth: rect?.width ?? 0,
        heroVisualVisible: !!visualRect && visualRect.height > 220 && visualRect.top < window.innerHeight
      };
    });

    expect(initial.hasHorizontalOverflow).toBe(false);
    expect(initial.heroVisualVisible).toBe(true);
    if (viewport.width < 768) {
      expect(initial.stickyExists).toBe(false);
    }

    await page.mouse.wheel(0, 720);
    await page.waitForTimeout(150);

    const afterScroll = await page.evaluate(() => {
      const cta = document.querySelector('a[data-event="request_consultation_click"].fixed');
      const rect = cta?.getBoundingClientRect();

      return {
        stickyVisible: !!rect && rect.bottom <= window.innerHeight && rect.top >= 0 && getComputedStyle(cta).display !== 'none',
        stickyHeight: rect?.height ?? 0,
        stickyWidth: rect?.width ?? 0,
        stickyText: cta?.textContent?.trim() ?? ''
      };
    });

    if (viewport.width < 768) {
      expect(afterScroll.stickyVisible).toBe(true);
      expect(afterScroll.stickyHeight).toBeGreaterThanOrEqual(44);
      expect(afterScroll.stickyWidth).toBeLessThan(190);
      expect(afterScroll.stickyText).toBe('Consult');
    }
  });
}
