import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error" && /Minified React error #(418|423|425)|Hydration|hydrating/i.test(message.text())) {
      errors.push(message.text());
    }
  });
  return errors;
}

const MAIN_ROUTES = [
  "/",
  "/products",
  "/products/online-store",
  "/products/karen-net",
  "/products/law-book",
  "/blog/remote-teams",
  "/download-law-software",
  "/portfolio/karensoft-hse",
  "/portfolio/gym",
  "/contact?subject=website",
];

for (const theme of ["light", "dark"] as const) {
  for (const reducedMotion of ["reduce", "no-preference"] as const) {
    test(`main site hydrates without React errors (${theme}, ${reducedMotion})`, async ({ page }) => {
      test.setTimeout(90_000);
      await page.addInitScript(value => localStorage.setItem("theme", value), theme);
      await page.emulateMedia({ reducedMotion });
      const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
      await page.route("**/*", route => {
        const url = new URL(route.request().url());
        return url.origin === new URL(base).origin || url.protocol === "data:" ? route.continue() : route.abort();
      });
      const errors = collectRuntimeErrors(page);
      for (const path of MAIN_ROUTES) {
        await page.goto(path, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(250);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      }
      expect(errors).toEqual([]);
    });
  }
}

for (const theme of ["light", "dark"] as const) {
  for (const width of [320, 1440]) {
    test(`Karenwood demo hydrates and passes axe inside its frame (${theme}, ${width})`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => {
        localStorage.setItem("theme", value);
        localStorage.setItem("karenwood-theme", value);
      }, theme);
      await page.route("**/*", route => {
        const url = new URL(route.request().url());
        return url.origin === "http://127.0.0.1:3000" || url.protocol === "data:" ? route.continue() : route.abort();
      });
      const errors = collectRuntimeErrors(page);
      await page.goto("/portfolio/karenwood", { waitUntil: "domcontentloaded" });
      const frame = page.locator('iframe[title*="کارن‌وود"], iframe[src*="karenwood"]').first();
      await frame.scrollIntoViewIfNeeded();
      await expect(frame).toBeVisible();
      await page.waitForTimeout(1800);
      expect(errors).toEqual([]);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(result.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => node.html) }))).toEqual([]);
    });
  }
}

test("reduced-motion preference does not branch the SSR tree (nav/reveal)", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
  await page.route("**/*", route => {
    const url = new URL(route.request().url());
    return url.origin === new URL(base).origin || url.protocol === "data:" ? route.continue() : route.abort();
  });
  const errors = collectRuntimeErrors(page);
  for (const path of ["/", "/products/hesabyar", "/portfolio/digikaren", "/blog/remote-teams"]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);
  }
  expect(errors).toEqual([]);
});

test("demo fullscreen is a keyboard-trapped dialog and restores focus on Escape", async ({ page }) => {
  await page.goto("/portfolio/leyla-abkeh");
  const toggle = page.getByRole("button", { name: "نمای تمام‌صفحه" });
  await toggle.scrollIntoViewIfNeeded();
  await toggle.click();
  const dialog = page.getByRole("dialog", { name: /نمای تمام‌صفحه/ });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(page.getByRole("button", { name: "بستن (Esc)" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator("iframe").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(toggle).toBeFocused();
});

test("demo variant tabs support RTL arrow keys, Home and End", async ({ page }) => {
  await page.goto("/portfolio/digikaren");
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(2);
  const store = tabs.nth(0);
  const admin = tabs.nth(1);
  await store.scrollIntoViewIfNeeded();
  await store.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(admin).toBeFocused();
  await expect(admin).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", await admin.getAttribute("id") ?? "");
  await page.keyboard.press("Home");
  await expect(store).toBeFocused();
  await expect(store).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(admin).toBeFocused();
});
