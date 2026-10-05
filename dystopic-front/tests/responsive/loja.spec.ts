import { test, expect } from "@playwright/test";

// Responsiveness, cart and checkout flow for the loja.
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

  test("cart holds one piece per size and survives a reload", async ({ page }) => {
    await page.locator('section a[href^="/loja/product/"]').first().click();
    // First visit compiles the route on the slow /mnt/d dev server.
    await expect(page.locator("article h1")).toBeVisible({ timeout: 60_000 });

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, "product page must not scroll sideways").toBeLessThanOrEqual(0);

    await page.getByRole("button", { name: "M", exact: true }).click();
    await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();

    const drawer = page.getByRole("dialog", { name: "Seu carrinho" });
    await expect(drawer.getByText("Tam. M")).toBeVisible();
    await expect(drawer.getByRole("button", { name: "Aumentar quantidade" })).toBeDisabled();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Já está no carrinho" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Abrir carrinho, 1 item/ })).toBeVisible();

    await page.reload();
    await expect(page.getByRole("button", { name: /Abrir carrinho, 1 item/ })).toBeVisible();
  });

  test("checkout sends the order to WhatsApp and offers tracking", async ({ page }) => {
    // Record the wa.me URL instead of opening WhatsApp.
    await page.addInitScript(() => {
      window.open = (url) => {
        (window as unknown as { openedUrl: string }).openedUrl = String(url);
        return null;
      };
    });
    await page.goto("/loja/product/camiseta-apocalypse");
    await page.getByRole("button", { name: "P", exact: true }).click({ timeout: 60_000 });
    await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
    await page.getByRole("dialog", { name: "Seu carrinho" }).getByRole("link", { name: ">Checkout" }).click();

    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible({ timeout: 60_000 });
    await page.getByLabel("Nome").fill("Teste");
    await page.getByLabel("Endereço de entrega").fill("Rua Teste, 1");
    await page.getByRole("button", { name: ">Finalizar no WhatsApp" }).click();

    const opened = await page.evaluate(() => (window as unknown as { openedUrl: string }).openedUrl);
    expect(opened).toMatch(/^https:\/\/wa\.me\/5511934281706\?text=/);
    expect(decodeURIComponent(opened)).toContain("Camiseta T-Shirt _apocalypse_ — Tam. P");

    await expect(page.getByRole("heading", { name: "Pedido enviado" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Rastrear pedido no WhatsApp" })).toHaveAttribute("href", /wa\.me\/5511934281706.*rastrear/);
  });
});
