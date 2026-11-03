import { test, expect } from "@playwright/test";

for (const [theme, width] of [["light", 1440], ["dark", 320]] as const) {
  test(`Digikaren admin variant loads without runtime errors (${theme}, ${width})`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(value => localStorage.setItem("theme", value), theme);
    const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
    await page.route("**/*", route => {
      const url = new URL(route.request().url());
      return url.origin === new URL(base).origin || url.protocol === "data:" ? route.continue() : route.abort();
    });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      if (message.type() === "error" && /Minified React error #(418|423|425)|Hydration|hydrating/i.test(message.text())) errors.push(message.text());
    });

    await page.goto("/portfolio/digikaren", { waitUntil: "domcontentloaded" });
    const admin = page.getByRole("tab", { name: "داشبورد ادمین" });
    await admin.scrollIntoViewIfNeeded();
    await expect(admin).toBeVisible();
    await expect(page.locator("iframe").first()).toHaveAttribute("src", "/demos/digikaren/index.html");
    await page.waitForTimeout(400);
    await admin.click();
    await expect(admin).toHaveAttribute("aria-selected", "true", { timeout: 10_000 });
    const frame = page.locator("iframe").first();
    await expect(frame).toHaveAttribute("src", "/demos/digikaren/index.html?admin=overview");
    await frame.scrollIntoViewIfNeeded();
    const handle = await frame.elementHandle();
    const content = await handle?.contentFrame();
    expect(content).toBeTruthy();
    await expect(content!.locator(".admin-app")).toBeVisible();
    await page.waitForTimeout(800);
    expect(errors).toEqual([]);
  });
}
