import { test, expect } from "@playwright/test";

// Responsiveness suite for the hub (home) page.
// Runs in two projects (see playwright.config.ts):
//   mobile  — iPhone 14 viewport (390x844)
//   desktop — 1280x800
// Assertions are layout-behavioral: the page must render, key elements must be
// visible, and nothing may force a horizontal scroll at the given viewport.

test.describe("hub page responsiveness", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
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

  test("main content is visible", async ({ page }) => {
    // The hub page renders images (logo/title assets) and hub buttons.
    const images = page.locator("img");
    await expect(images.first()).toBeVisible();
  });

  test("all images stay inside the viewport horizontally", async ({ page }) => {
    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();
    await page.waitForLoadState("networkidle");
    // Dev-server Fast Refresh can tear down the execution context mid-evaluate;
    // retry once instead of failing on a spurious reload.
    const boxes = await page
      .locator("img:visible")
      .evaluateAll((imgs) =>
        imgs.map((img) => {
          const r = img.getBoundingClientRect();
          return { left: r.left, right: r.right };
        }),
      )
      .catch(async () => {
        await page.waitForLoadState("networkidle");
        return page.locator("img:visible").evaluateAll((imgs) =>
          imgs.map((img) => {
            const r = img.getBoundingClientRect();
            return { left: r.left, right: r.right };
          }),
        );
      });
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
      // 24px is a pragmatic floor (WCAG 2.2 AA target-size minimum).
      expect(h).toBeGreaterThanOrEqual(24);
    }
  });
});
