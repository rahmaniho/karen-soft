import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Button, ButtonLink } from "../components/ui/button";
import { SurfaceCard } from "../components/ui/card";
import { ResourceCard } from "../components/shared/resource-card";
import { Breadcrumbs } from "../components/ui/breadcrumbs";
import { EmptyState, StatePanel } from "../components/ui/state-panel";
import { FormField, Input } from "../components/ui/field";
import { FormFeedback } from "../components/ui/form-feedback";
import { Accordion } from "../components/ui/accordion";
import { ProductScreenshots } from "../components/site/product-screenshots";
import { DemoTabs } from "../components/site/demo-tabs";
import SiteError from "../app/(site)/error";
import { PRODUCTS } from "../lib/products";
import { CASE_STUDIES } from "../lib/portfolio";

const h = React.createElement;
const render = (element: React.ReactElement) => renderToStaticMarkup(element);

describe("Stage 3 shared design-system primitives", () => {
  it("buttons default to type=button and expose a disabled busy state without changing their name", () => {
    const idle = render(h(Button, null, "ارسال پیام"));
    expect(idle).toContain('type="button"');
    expect(idle).not.toContain('disabled=""');
    const busy = render(h(Button, { type: "submit", loading: true }, "ارسال پیام"));
    expect(busy).toContain('type="submit"');
    expect(busy).toContain("disabled");
    expect(busy).toContain('aria-busy="true"');
    expect(busy).toContain("ارسال پیام");
    expect(busy).toContain('aria-hidden="true"');
    expect(render(h(ButtonLink, { href: "/contact" }, "درخواست مشاوره"))).toContain('href="/contact"');
  });

  it("separates informational surfaces from interactive cards and keeps one named resource link", () => {
    expect(render(h(SurfaceCard, { as: "article" }, "اطلاعات"))).not.toContain("surface-card-interactive");
    const html = render(h(ResourceCard, { href: "/portfolio", category: "نمونه‌کار", title: "پروژه‌های اجراشده", description: "نمونه‌های واقعی" }));
    expect(html).toContain("surface-card-interactive");
    expect(html.match(/<a /g)).toHaveLength(1);
    expect(html).toContain('href="/portfolio"');
    expect(html).toContain("after:absolute");
    expect(html).toContain("پروژه‌های اجراشده");
  });

  it("breadcrumbs mark only the current page and do not link it", () => {
    const html = render(h(Breadcrumbs, { items: [{ name: "خانه", path: "/" }, { name: "محصولات", path: "/products" }, { name: "حساب‌یار" }] }));
    expect(html).toContain('aria-label="مسیر صفحه"');
    expect(html).toContain("<ol");
    expect(html.match(/aria-current="page"/g)).toHaveLength(1);
    expect(html).toContain('<span aria-current="page"');
    expect(html).not.toContain('href="/products" aria-current');
  });

  it("state panels keep heading hierarchy and live-region semantics distinct", () => {
    const empty = render(h(EmptyState));
    expect(empty).toContain("<h3");
    expect(empty).not.toContain("<h1");
    expect(empty).toContain("نتیجه‌ای پیدا نشد");
    const error = render(h(StatePanel, { role: "alert", title: "خطا", description: "توضیح" }));
    expect(error).toContain('role="alert"');
    expect(error).toContain("<h1");
    const boundary = render(h(SiteError, { error: new Error("test"), reset: () => {} }));
    expect(boundary).toContain('role="alert"');
    expect(boundary).toContain("تلاش دوباره");
  });

  it("form fields wire hint/error IDs and feedback announces errors assertively", () => {
    const html = render(h(FormField, {
      id: "phone",
      label: "تلفن",
      hint: "۱۱ رقم",
      error: "شماره معتبر نیست",
      children: props => h(Input, { ...props, name: "phone" }),
    }));
    expect(html).toContain('for="phone"');
    expect(html).toContain('aria-describedby="phone-hint phone-error"');
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('id="phone-error"');
    expect(render(h(FormFeedback, { tone: "error", id: "feedback" }, "خطا"))).toContain('role="alert"');
    expect(render(h(FormFeedback, { tone: "success", id: "feedback" }, "ثبت شد"))).toContain('role="status"');
    expect(render(h(FormFeedback, null, "خطا"))).toContain('data-tone="idle"');
  });

  it("accordion SSR opens the first answer and keeps every control/region pair addressable", () => {
    const items = [{ q: "پرسش یک", a: "پاسخ یک" }, { q: "پرسش دو", a: "پاسخ دو" }];
    const html = render(h(Accordion, { items }));
    expect(html.match(/aria-expanded="true"/g)).toHaveLength(1);
    expect(html.match(/aria-expanded="false"/g)).toHaveLength(1);
    expect(html.match(/hidden=""/g)).toHaveLength(1);
    for (const match of html.matchAll(/aria-controls="([^"]+)"/g)) expect(html).toContain(`id="${match[1]}"`);
  });

  it("product screenshots expose real panels, one roving tab stop and hidden inactive images", () => {
    const product = PRODUCTS.find(item => item.slug === "law-office")!;
    const shots = product.screenshots!;
    const html = render(h(ProductScreenshots, { screenshots: shots, appName: product.name }));
    expect(html.match(/role="tab"/g)).toHaveLength(shots.length);
    expect(html.match(/role="tabpanel"/g)).toHaveLength(shots.length);
    expect(html.match(/tabindex="0"/g)).toHaveLength(2); // active tab + its panel
    expect(html.match(/tabindex="-1"/g)).toHaveLength(shots.length - 1);
    expect(html.match(/hidden=""/g)).toHaveLength(shots.length - 1);
    for (const match of html.matchAll(/aria-controls="([^"]+)"/g)) expect(html).toContain(`id="${match[1]}"`);
    expect(html).toContain('aria-label="نماهای محیط نرم‌افزار"');
  });

  it("demo variants share one panel and leave iframe focus order unchanged", () => {
    const study = CASE_STUDIES.find(item => item.slug === "digikaren")!;
    const html = render(h(DemoTabs, { variants: study.demoVariants! }));
    const controls = [...html.matchAll(/aria-controls="([^"]+)"/g)].map(match => match[1]);
    expect(controls).toHaveLength(2);
    expect(new Set(controls).size).toBe(1);
    expect(html).toContain(`id="${controls[0]}"`);
    expect(html).toContain('tabindex="-1"');
  });
});
