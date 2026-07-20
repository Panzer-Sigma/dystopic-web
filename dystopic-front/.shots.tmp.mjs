import { chromium } from "@playwright/test";

const OUT = "/tmp/claude-1001/-home-gui-r/a0963686-7703-43fc-840d-29e6933c703e/scratchpad";
const targets = [
  { path: "/", name: "hub" },
  { path: "/archival", name: "archival" },
];
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 800 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  for (const t of targets) {
    await page.goto(`http://localhost:3000${t.path}`, { waitUntil: "load", timeout: 180000 });
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `${OUT}/${t.name}-${vp.name}.png`, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`${t.name}-${vp.name}: overflow=${overflow}px`);
  }
  await ctx.close();
}
await browser.close();
console.log("done");
