import { chromium } from "@playwright/test";

const browser = await chromium.launch();
for (const vp of [{ width: 1512, height: 850 }, { width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: vp });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/archival", { waitUntil: "domcontentloaded", timeout: 180000 });
  await page.waitForTimeout(3000);

  const firstHref = await page.locator('section a[href^="/archival/"]').first().getAttribute("href");

  // scroll to the pagination and click Avançar for real
  const avancar = page.locator('button:has(img[alt="Avançar"])');
  await avancar.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  const scrolledY = await page.evaluate(() => window.scrollY);
  const hitBy = await avancar.evaluate((b) => {
    const r = b.getBoundingClientRect();
    const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return el ? `${el.tagName}${el.closest("a") ? " inside A" : ""}${el.closest("button") ? " inside BUTTON" : ""}` : "null";
  });

  await avancar.click({ timeout: 5000 });
  await page.waitForTimeout(600);
  const afterHref = await page.locator('section a[href^="/archival/"]').first().getAttribute("href");
  const url = page.url();

  console.log(`\n== ${vp.width}x${vp.height} ==`);
  console.log(`scrollY after scrolling to pagination: ${scrolledY} (0 means page could not scroll)`);
  console.log(`element at Avançar center: ${hitBy}`);
  console.log(`first entry before: ${firstHref}`);
  console.log(`first entry after click: ${afterHref}  -> ${firstHref !== afterHref ? "PAGE CHANGED ✓" : "NO CHANGE ✗"}`);
  console.log(`url still on feed: ${url.endsWith("/archival") ? "yes ✓" : "NAVIGATED AWAY ✗ " + url}`);
  await ctx.close();
}
await browser.close();
