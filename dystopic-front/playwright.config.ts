import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  // Repo lives on /mnt/d (WSL2 drvfs): dev-server responses are slow, especially
  // on first compile — default 30s per-test timeout causes spurious goto failures.
  timeout: 120_000,
  workers: 2,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "mobile",
      // iPhone 14 defaults to WebKit, which is not installed in this environment;
      // keep the mobile viewport/UA but run on Chromium.
      use: { ...devices["iPhone 14"], browserName: "chromium" },
    },
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
  ],
});
