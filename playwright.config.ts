import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:3000",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    launchOptions: process.env.CHROMIUM_PATH ? {executablePath: process.env.CHROMIUM_PATH, args: ["--no-sandbox", "--disable-dev-shm-usage"]} : {},
  },
  workers: 2,
  // The full-site audit still records occasional transient React #418 reports under load.
  // Retry once in CI so a single flaky attempt does not hide the deterministic gate result;
  // the github reporter surfaces the failing test as a PR annotation.
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["line"]] : [["list"]],
  webServer: process.env.TEST_BASE_URL ? undefined : {command:"npm start",url:"http://127.0.0.1:3000",reuseExistingServer:!process.env.CI},
});
