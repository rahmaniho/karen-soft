import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PRODUCTS } from "../../lib/products";
import { CASE_STUDIES } from "../../lib/portfolio";

const noOverflow = async (page: import("@playwright/test").Page) =>
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), { timeout: 3000 }).toBe(true);

test("catalog cards have one tab stop, an accessible empty state and a working reset", async ({ page }) => {
  await page.goto("/blog");
  const catalog = page.locator('[data-catalog="blog"]');
  const total = await catalog.locator("article").count();
  expect(total).toBeGreaterThan(0);
  await expect(catalog.locator("article").first().locator("a")).toHaveCount(1);
  await page.getByPlaceholder("جست‌وجو…").fill("عبارتی که وجود ندارد");
  await expect(catalog.getByRole("heading", { name: "نتیجه‌ای پیدا نشد" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await page.getByRole("button", { name: "پاک کردن فیلترها" }).click();
  await expect(catalog.locator("article")).toHaveCount(total);
  await expect(page.getByPlaceholder("جست‌وجو…")).toBeFocused();
  await catalog.locator("article").first().getByRole("link").focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/blog\/[^/]+$/);
});

test("catalog query from the URL survives hydration and category filters expose pressed state", async ({ page }) => {
  await page.goto("/products?q=کتابچه");
  const catalog = page.locator('[data-catalog="products"]');
  await expect(page.getByPlaceholder("جست‌وجو…")).toHaveValue("کتابچه");
  await expect(catalog.locator("article")).toHaveCount(1);
  await expect(catalog.locator("article")).toContainText("کتابچه قانون");
  const all = catalog.getByRole("button", { name: "همه", exact: true });
  await expect(all).toHaveAttribute("aria-pressed", "true");
  await catalog.getByRole("button", { name: "فعال", exact: true }).click();
  await expect(all).toHaveAttribute("aria-pressed", "false");
  await expect(catalog.locator("article")).toHaveCount(1);
});

test("resource cards and filters stay inside a 320px viewport with 44px controls", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/portfolio");
  const catalog = page.locator('[data-catalog="portfolio"]');
  await expect(catalog.locator("article")).toHaveCount(CASE_STUDIES.length);
  await noOverflow(page);
  for (const button of await catalog.getByRole("group", { name: "فیلتر دسته‌بندی" }).getByRole("button").all()) {
    expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.html) }))).toEqual([]);
});

test("product screenshot tabs support RTL arrows, Home/End and addressable hidden panels", async ({ page }) => {
  const product = PRODUCTS.find(item => item.slug === "law-office")!;
  await page.goto(`/products/${product.slug}`);
  const gallery = page.locator("[data-product-screenshots]");
  const tabs = gallery.getByRole("tab");
  await expect(tabs).toHaveCount(product.screenshots!.length);
  await tabs.first().scrollIntoViewIfNeeded();
  await tabs.first().focus();
  await page.keyboard.press("ArrowLeft");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  const panelId = await tabs.nth(1).getAttribute("aria-controls");
  await expect(page.locator(`[id="${panelId}"]`)).toBeVisible();
  await expect(gallery.locator('[role="tabpanel"]')).toHaveCount(product.screenshots!.length);
  await expect(gallery.locator('[role="tabpanel"][hidden]')).toHaveCount(product.screenshots!.length - 1);
  await page.keyboard.press("End");
  await expect(tabs.last()).toBeFocused();
  await page.keyboard.press("Home");
  await expect(tabs.first()).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.last()).toBeFocused();
  await page.setViewportSize({ width: 320, height: 800 });
  await noOverflow(page);
});

test("FAQ accordion supports vertical roving focus and explicit expansion", async ({ page }) => {
  await page.goto("/services");
  const faq = page.locator("section").filter({ has: page.getByRole("heading", { name: "پرسش‌های متداول", exact: true }) });
  const all = faq.locator('button[aria-controls][aria-expanded]');
  await expect(all.locator('[aria-expanded="true"]')).toHaveCount(0);
  await expect(faq.getByRole("button", { expanded: true })).toHaveCount(1);
  const first = all.first();
  await first.scrollIntoViewIfNeeded();
  await first.focus();
  await page.keyboard.press("ArrowDown");
  await expect(all.nth(1)).toBeFocused();
  await page.keyboard.press("End");
  await expect(all.last()).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(all.last()).toHaveAttribute("aria-expanded", "true");
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Home");
  await expect(all.first()).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await expect(all.last()).toBeFocused();
});

test("contact form shows busy feedback, prevents duplicate submits and preserves data on failure", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("نام و نام خانوادگی").fill("کاربر آزمایشی");
  await page.getByLabel("شماره تماس").fill("۰۹۱۲۳۴۵۶۷۸۹");
  await page.getByLabel("موضوع", { exact: true }).selectOption("website");
  await page.getByLabel("توضیحات پروژه").fill("درخواست طراحی وب‌سایت شرکتی");
  let requests = 0;
  await page.route("**/api/contact", async route => {
    requests += 1;
    await new Promise(resolve => setTimeout(resolve, 500));
    await route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, error: "ارسال آنلاین فعال نیست." }) });
  });
  const submit = page.getByRole("button", { name: "ارسال پیام", exact: true });
  await submit.click();
  await expect(submit).toBeDisabled();
  await expect(submit).toHaveAttribute("aria-busy", "true");
  await expect(page.locator("#contact-feedback")).toContainText("در حال ارسال پیام");
  await expect(page.locator("#contact-feedback")).toHaveAttribute("role", "status");
  await expect(page.locator("#contact-feedback")).toContainText("ارسال آنلاین فعال نیست.");
  await expect(submit).toBeEnabled();
  await expect(page.getByLabel("توضیحات پروژه")).toHaveValue("درخواست طراحی وب‌سایت شرکتی");
  expect(requests).toBe(1);
});

test("print contact form maps validation to fields and announces provider errors", async ({ page }) => {
  await page.goto("/print/contact");
  await page.getByRole("button", { name: "ارسال پیام", exact: true }).click();
  await expect(page.locator("#chap-name")).toBeFocused();
  await expect(page.locator("#chap-name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#chap-name-error")).toBeVisible();
  await page.getByLabel("نام و نام خانوادگی").fill("کاربر آزمایشی");
  await page.getByLabel("شماره تماس").fill("۰۹۱۲۳۴۵۶۷۸۹");
  await page.getByLabel("توضیح سفارش یا پرسش").fill("درخواست چاپ کارت ویزیت برای آزمایش");
  await page.route("**/api/contact", route => route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, error: "ارسال آنلاین فعال نیست." }) }));
  await page.getByRole("button", { name: "ارسال پیام", exact: true }).click();
  const feedback = page.locator("#chap-feedback");
  await expect(feedback).toHaveAttribute("role", "alert");
  await expect(feedback).toContainText("ارسال آنلاین فعال نیست.");
  await expect(page.getByLabel("توضیح سفارش یا پرسش")).toHaveValue("درخواست چاپ کارت ویزیت برای آزمایش");
});

test("newsletter uses unique field IDs and a stable live region", async ({ page }) => {
  await page.goto("/");
  const email = page.getByLabel("ایمیل شما", { exact: true });
  await email.scrollIntoViewIfNeeded();
  const emailId = await email.getAttribute("id");
  const feedbackId = await email.getAttribute("aria-describedby");
  expect(emailId).toBeTruthy();
  expect(feedbackId).toBeTruthy();
  await expect(page.locator(`[id="${emailId}"]`)).toHaveCount(1);
  await page.getByRole("button", { name: "عضویت", exact: true }).click();
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator(`[id="${feedbackId}"]`)).toHaveAttribute("role", "alert");
  await email.fill("reader@example.com");
  await page.route("**/api/newsletter", route => route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ error: "عضویت خبرنامه هنوز فعال نیست." }) }));
  await page.getByRole("button", { name: "عضویت", exact: true }).click();
  await expect(page.locator(`[id="${feedbackId}"]`)).toContainText("عضویت خبرنامه هنوز فعال نیست.");
  await expect(email).toHaveValue("reader@example.com");
});

test("404 pages offer recovery links and keep one main heading", async ({ page }) => {
  for (const path of ["/this-route-does-not-exist", "/print/this-route-does-not-exist"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("link", { name: /بازگشت به خانه|صفحه اصلی/ }).first()).toBeVisible();
    await noOverflow(page);
  }
});
