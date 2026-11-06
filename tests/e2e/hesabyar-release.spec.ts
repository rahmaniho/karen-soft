import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const path of ["/", "/products", "/products/hesabyar"]) {
  test(`Karo branding and links replace old download on ${path}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(path);
    const section =
      path === "/products/hesabyar"
        ? page.locator("main")
        : page.locator("#hesabyar-download");
    await expect(section).toContainText("کارو");
    await expect(section).toContainText("روی سرور");
    await expect(
      section.getByRole("link", { name: "ورود به کارو", exact: true }),
    ).toHaveAttribute("href", "https://karo.karen-soft.ir/");
    await expect(
      page.locator('a[href*="hesabyar-"][href$=".apk"]'),
    ).toHaveCount(0);
    const image = section.locator('img[alt*="لوگوی رسمی"]').first();
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
  });
}

test("subscription calculator uses extra users, not total users, and validates input", async ({
  page,
}) => {
  await page.goto("/products/hesabyar#pricing");
  const users = page.getByLabel("تعداد کل کاربران");
  await users.fill("5");
  await expect(page.locator("#pricing").getByRole("status")).toContainText(
    "۱٬۰۸۰٬۰۰۰",
  );
  await page.getByLabel("پلن", { exact: true }).selectOption("pro");
  await expect(page.locator("#pricing").getByRole("status")).toContainText(
    "۱٬۴۴۰٬۰۰۰",
  );
  await page.getByLabel("پلن", { exact: true }).selectOption("pro-plus");
  await expect(page.locator("#pricing").getByRole("status")).toContainText(
    "۲٬۴۰۰٬۰۰۰",
  );
  await page.getByLabel("مدت اشتراک (ماه)").fill("3");
  await expect(page.locator("#pricing").getByRole("status")).toContainText(
    "۶۰۰٬۰۰۰",
  );
  await users.fill("0");
  await expect(page.locator("#pricing").getByRole("status")).toContainText(
    "عدد صحیح مثبت",
  );
  await users.fill("");
  await expect(page.locator("#pricing").getByRole("status")).toContainText(
    "عدد صحیح مثبت",
  );
  await users.fill("1");
  await expect(page.locator("#pricing").getByRole("status")).toContainText(
    "۳۶۰٬۰۰۰",
  );
});

for (const theme of ["light", "dark"] as const) {
  test(`Karo product fits mobile and passes axe in ${theme}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.addInitScript(
      (value) => localStorage.setItem("theme", value),
      theme,
    );
    await page.goto("/products/hesabyar");
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.html),
      })),
    ).toEqual([]);
  });
}
