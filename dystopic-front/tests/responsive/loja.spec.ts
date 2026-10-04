import { test, expect } from "@playwright/test";

// Responsiveness + cart flow for the loja.
// Runs in the same mobile/desktop projects as the hub suite.

test.describe("loja", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/loja");
  });

  test("grid renders without horizontal overflow", async ({ page }) => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("grid shows six products, each linking to its page", async ({ page }) => {
    const cards = page.locator('section a[href^="/loja/product/"]');
    await expect(cards).toHaveCount(6);
    await expect(cards.first().locator("img")).toBeVisible();
  });

  test("adding a product opens the cart and updates the count", async ({ page }) => {
    await page.locator('section a[href^="/loja/product/"]').first().click();
    // First visit compiles the route on the slow /mnt/d dev server.
    await expect(page.locator("article h1")).toBeVisible({ timeout: 60_000 });

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, "product page must not scroll sideways").toBeLessThanOrEqual(0);

    await page.getByRole("button", { name: "M", exact: true }).click();
    await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();

    const drawer = page.getByRole("dialog", { name: "Seu carrinho" });
    await expect(drawer.getByText("Tam. M")).toBeVisible();
    await drawer.getByRole("button", { name: "Aumentar quantidade" }).click();
    await expect(drawer.getByText("2", { exact: true })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: /Abrir carrinho, 2 itens/ })).toBeVisible();

    // Cart survives a reload (localStorage).
    await page.reload();
    await expect(page.getByRole("button", { name: /Abrir carrinho, 2 itens/ })).toBeVisible();
  });
});
