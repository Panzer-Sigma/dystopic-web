import { test, expect } from "@playwright/test";

// Responsiveness suite for the archival page.
// Runs in the same mobile/desktop projects as the hub suite.

test.describe("archival page responsiveness", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/archival");
  });

  test("renders without horizontal overflow", async ({ page }) => {
    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return el.scrollWidth - el.clientWidth;
    });
    expect(overflow, "documentElement.scrollWidth must not exceed clientWidth").toBeLessThanOrEqual(0);
  });

  test("body content fits the viewport width", async ({ page }) => {
    const { bodyWidth, viewportWidth } = await page.evaluate(() => ({
      bodyWidth: document.body.scrollWidth,
      viewportWidth: window.innerWidth,
    }));
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("chain nav links to loja, archival and mapa", async ({ page }) => {
    await expect(page.locator('nav a[href="/loja"]')).toBeVisible();
    await expect(page.locator('nav a[href="/archival"]')).toBeVisible();
    await expect(page.locator('nav a[href="/mapa"]')).toBeVisible();
  });

  test("archive feed renders its items", async ({ page }) => {
    const feedImages = page.locator('section img[alt^="Registro"]');
    await expect(feedImages).toHaveCount(5);
    await expect(feedImages.first()).toBeVisible();
  });

  test("pagination buttons are visible", async ({ page }) => {
    await expect(page.locator('button:has(img[alt="Voltar"])')).toBeVisible();
    await expect(page.locator('button:has(img[alt="Avançar"])')).toBeVisible();
  });

  test("all images stay inside the viewport horizontally", async ({ page }) => {
    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();
    const boxes = await page.locator("img:visible").evaluateAll((imgs) =>
      imgs.map((img) => {
        const r = img.getBoundingClientRect();
        return { left: r.left, right: r.right };
      }),
    );
    for (const box of boxes) {
      expect(box.left).toBeGreaterThanOrEqual(-1);
      expect(box.right).toBeLessThanOrEqual(viewport!.width + 1);
    }
  });

  test("interactive elements meet minimum touch-target height on mobile", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "touch-target check is mobile-only");
    const targets = await page
      .locator("a:visible, button:visible")
      .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
    for (const h of targets) {
      expect(h).toBeGreaterThanOrEqual(24);
    }
  });
});
