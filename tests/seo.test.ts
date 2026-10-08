import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { GET as getLlmsTxt } from "../app/llms.txt/route";
import { SITE } from "../lib/constants";
import { CHAP } from "../lib/print/site";
import { chapBusinessSchema } from "../lib/schema";
import { chapPageMeta, pageMeta } from "../lib/seo";

const pathOf = (url: string) => new URL(url).pathname;

describe("technical SEO and GEO foundations", () => {
  it("builds unique canonical and social metadata for indexable pages", () => {
    const metadata = pageMeta({
      title: "مدیریت چاپخانه",
      description: "سامانه مدیریت سفارش و تولید چاپخانه.",
      path: "/products/printing-management",
      images: ["/images/karenchap.png"],
    });

    expect(metadata.title).toEqual({ absolute: `مدیریت چاپخانه | ${SITE.name}` });
    expect(metadata.alternates?.canonical).toBe(`${SITE.url}/products/printing-management`);
    expect(metadata.robots).toEqual({ index: true, follow: true });
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      locale: "fa_IR",
      url: `${SITE.url}/products/printing-management`,
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("keeps Karen Chap distinct in page metadata and avoids canonicals on noindex forms", () => {
    const chap = chapPageMeta({
      title: "چاپ کارت ویزیت در قزوین",
      description: "سفارش کارت ویزیت در کارن چاپ.",
      path: "/print/products/bizcard",
    });
    const form = chapPageMeta({
      title: "ثبت سفارش آنلاین",
      description: "پیکربند سفارش چاپ.",
      path: "/print/order",
      noIndex: true,
    });

    expect(chap.title).toEqual({ absolute: "چاپ کارت ویزیت در قزوین | کارن چاپ" });
    expect(chap.openGraph?.siteName).toBe("کارن چاپ");
    expect(chap.alternates?.canonical).toBe(`${SITE.url}/print/products/bizcard`);
    expect(form.alternates).toBeUndefined();
    expect(form.robots).toEqual({ index: false, follow: true });
  });

  it("describes Karen Chap as a distinct local business without inventing coordinates", () => {
    const business = chapBusinessSchema();
    const serialized = JSON.stringify(business);
    const address = business.address as Record<string, unknown>;

    expect(business.name).toBe(CHAP.name);
    expect(business.url).toBe(`${SITE.url}${CHAP.path}`);
    expect(business.parentOrganization).toEqual({ "@id": `${SITE.url}/#organization` });
    expect(address.addressLocality).toBe(CHAP.locality);
    expect(address.addressRegion).toBe(CHAP.region);
    expect(business.hasMap).toBe(CHAP.maps);
    expect(serialized).not.toContain("GeoCoordinates");
  });

  it("publishes only canonical, indexable routes in the sitemap", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    const paths = urls.map(pathOf);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => new URL(url).origin === SITE.url)).toBe(true);
    expect(paths).toContain("/print");
    expect(paths).toContain("/print/products/tract");
    expect(paths).toContain("/print/services/stamp");
    expect(paths).toContain("/products/printing-management");
    expect(paths).toContain("/blog");
    expect(paths).not.toContain("/print/order");
    expect(paths.some((path) => path.startsWith("/print/order/"))).toBe(false);
    expect(paths.some((path) => path.startsWith("/demo/industries/"))).toBe(false);
    expect(paths).not.toContain("/about/careers");
    expect(paths).not.toContain("/status");
    expect(paths).not.toContain("/roadmap");
    expect(paths).not.toContain("/changelog");
    expect(entries.every((entry) => entry.lastModified === undefined || !Number.isNaN(new Date(entry.lastModified).getTime()))).toBe(true);
  });

  it("points robots and answer engines to the canonical sitemap", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const publicRule = rules.find((rule) => rule.userAgent === "*");
    const answerEngineRule = rules.find((rule) => Array.isArray(rule.userAgent) && rule.userAgent.includes("OAI-SearchBot"));

    expect(result.sitemap).toBe(`${SITE.url}/sitemap.xml`);
    expect(publicRule?.allow).toBe("/");
    expect(publicRule?.disallow).toContain("/api/");
    expect(answerEngineRule?.allow).toBe("/");
  });

  it("serves a curated, up-to-date plain-text entity and page index for answer engines", async () => {
    const response = getLlmsTxt();
    const content = await response.text();

    expect(response.headers.get("content-type")).toContain("text/plain");
    expect(content).toContain("# کارن سافت");
    expect(content).toContain("## کارن چاپ");
    expect(content).toContain("/print/contact");
    expect(content).toContain("/products/printing-management");
    expect(content).toContain(CHAP.address);
    expect(content).toContain("داده‌های نمونه");
  });
});
