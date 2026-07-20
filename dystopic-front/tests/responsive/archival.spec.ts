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

  test("archive feed renders three entries, each linking to its own route", async ({ page }) => {
    const entries = page.locator('section a[href^="/archival/"]');
    await expect(entries).toHaveCount(3);
    await expect(entries.first()).toBeVisible();
    await expect(entries.first().locator("img")).toBeVisible();
  });

  test("feed entry opens its own page", async ({ page }) => {
    const first = page.locator('section a[href^="/archival/"]').first();
    const href = await first.getAttribute("href");
    await first.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator("article h1")).toBeVisible();
  });

  test("page scrolls vertically", async ({ page }) => {
    const scrollable = await page.evaluate(
      () => document.documentElement.scrollHeight > document.documentElement.clientHeight,
    );
    expect(scrollable, "archival feed must be scrollable").toBe(true);

    // `body { overflow: hidden }` once made the feed unscrollable, stranding the
    // pagination below the fold — scrolling must actually move the viewport.
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(300);
    const scrolled = await page.evaluate(() => window.scrollY);
    expect(scrolled, "wheel scrolling must move the page").toBeGreaterThan(0);
  });

  test("pagination is reachable and changes the page", async ({ page }) => {
    const avancar = page.locator('button:has(img[alt="Avançar"])');
    await avancar.scrollIntoViewIfNeeded();

    // Nothing may cover the button: the element at its centre must be the button itself.
    const covered = await avancar.evaluate((btn) => {
      const r = btn.getBoundingClientRect();
      const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return !el || !btn.contains(el);
    });
    expect(covered, "pagination button must not be overlapped by feed entries").toBe(false);

    const firstBefore = await page.locator('section a[href^="/archival/"]').first().getAttribute("href");
    await avancar.click();
    await expect(page).toHaveURL(/\/archival$/);
    const firstAfter = await page.locator('section a[href^="/archival/"]').first().getAttribute("href");
    expect(firstAfter).not.toBe(firstBefore);
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
