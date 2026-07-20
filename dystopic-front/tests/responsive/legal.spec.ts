import { test, expect } from "@playwright/test";

// Legal pages carry long-form copy over the busy hub artwork; they must stay
// readable and scrollable at every viewport.

const pages = [
  { path: "/termos", name: "termos", heading: "Termos de Uso", sections: 12 },
  { path: "/privacidade", name: "privacidade", heading: "Política de Privacidade", sections: 8 },
];

for (const doc of pages) {
  test.describe(`${doc.name} page`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(doc.path);
    });

    test("renders without horizontal overflow", async ({ page }) => {
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("renders the full document", async ({ page }) => {
      await expect(page.locator("article h2")).toHaveCount(doc.sections);
      await expect(page.getByRole("img", { name: doc.heading })).toBeVisible();
      // Scoped to the header: section 7 of the privacy policy quotes the same phrase.
      await expect(page.locator("article header").getByText(/^Última atualização:/)).toBeVisible();
    });

    test("scrolls to the end of the document", async ({ page }) => {
      const scrollable = await page.evaluate(
        () => document.documentElement.scrollHeight > document.documentElement.clientHeight,
      );
      expect(scrollable, "legal copy must be scrollable").toBe(true);

      await page.mouse.wheel(0, 800);
      await page.waitForTimeout(300);
      expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    });

    test("contact email is a working mailto link", async ({ page }) => {
      const mail = page.locator('a[href^="mailto:"]').first();
      await expect(mail).toHaveAttribute("href", "mailto:dystopicstudio@gmail.com");
    });

    test("links back to the hub", async ({ page }) => {
      await page.locator('a[href="/"]').first().click();
      await expect(page).toHaveURL(/\/$/);
    });
  });
}
