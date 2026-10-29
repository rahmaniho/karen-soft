# seo-kit — چارچوب سئوی کارن سافت

`lib/seo-kit` یک چارچوب کوچک و بدون وابستگی است که کارهای تکراری سئوی سایت را در یک جا جمع می‌کند:
ساخت متادیتا، داده‌ساخت‌یافتهٔ JSON-LD، نقشهٔ سایت و بازرسی خروجی واقعی. همهٔ صفحه‌ها، نقشه و
گزارش سئو از همین یک منبع استفاده می‌کنند تا قاعده‌ها در سه جا تکرار نشوند.

```
lib/seo-kit/
  text.ts       قاعده‌های طول متن، نرمال‌سازی مسیر، تاریخ ISO
  metadata.ts   buildMetadata + inspectMetadata
  jsonld.ts     گره‌های استاندارد (SoftwareApplication، FAQ، Breadcrumb) + اعتبارسنجی گراف
  sitemap.ts    defineSitemap + inspectSitemap (اعتبارسنجی و خطا در زمان build)
  audit.ts      auditHtmlDocument + summarizeAudit (بازرسی HTML واقعی)
scripts/seo-audit.ts   CLI بازرسی سایت ساخته‌شده
```

## ۱) متادیتا

```ts
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "حساب‌یار؛ صندوق فروش و حسابداری اندروید و وب کارن سافت",
  description: "…",
  path: "/products/hesabyar",
  images: ["/images/hesabyar/hesabyar-android.jpg"],
}, { maxTitle: 65 });
```

- عنوان همیشه یک `absolute` است؛ نام برند فقط اگر از سقف طول (`maxTitle`) رد نشویم اضافه می‌شود.
- canonical مطلق، `robots` صریح و تصویر اجتماعی همیشه ساخته می‌شوند.
- صفحه‌های noindex (فرم سفارش، status، roadmap، changelog) canonical نمی‌گیرند.
- برای مقاله‌های بلند، `metaTitle` کوتاه در `lib/blog.ts` تعیین می‌شود؛ تیتر H1 تغییر نمی‌کند.

## ۲) داده‌ساخت‌یافته

```ts
import { breadcrumbNode, faqNode, jsonLdGraph, softwareApplicationNode } from "@/lib/seo-kit";

<JsonLd data={jsonLdGraph([
  softwareApplicationNode({ id, name, description, url, baseUrl, operatingSystem, offers, organizationId }),
  breadcrumbNode([...], SITE.url),
  faqNode(faqs),
])} />
```

`validateJsonLd` گره‌های بدون `@type`، نشانی نامعتبر و مقدار خالی را می‌گیرد؛ ارجاع‌های خالص
(`{"@id": …}`) مجاز هستند. قیمت‌ها در JSON-LD به **ریال** و با `priceCurrency: "IRR"` ثبت می‌شوند
(تومان فقط در متن نمایش داده می‌شود).

## ۳) نقشهٔ سایت

```ts
export function sitemapEntries() {
  return defineSitemap({ baseUrl: SITE.url, routes: publicRoutes(), excluded: NOINDEX_PATHS });
}
```

`defineSitemap` مسیر تکراری، `priority` بیرون از ۰ تا ۱، تاریخ نامعتبر و مسیر noindex داخل نقشه را
با خطا متوقف می‌کند؛ پس نقشهٔ خراب منتشر نمی‌شود. `lastmod` فقط برای محتوایی منتشر می‌شود که
تاریخ تحریریهٔ واقعی دارد.

## ۴) بازرسی خروجی واقعی (CLI)

```bash
npm run build
npm run start -- -p 3000 &
npm run seo:audit                                   # کل آدرس‌های نقشه
npm run seo:audit -- --path /products/hesabyar       # یک صفحه
npm run seo:audit -- --json seo-report.json -v       # گزارش JSON + یادداشت‌ها
```

هر صفحه از این منظرها بررسی می‌شود: کد پاسخ، وجود و طول عنوان، وجود و طول توضیح متا، canonical
(مطلق و برابر مسیر همان صفحه)، `noindex` ناخواسته، تعداد H1، وجود JSON-LD و اعتبار آن، و عنوان/توضیح
تکراری بین صفحه‌ها. خطا ⇒ کد خروج ۱ (مناسب CI)؛ هشدار فقط گزارش می‌شود.

> در بازرسی محلی، اشارهٔ canonical به دامنهٔ اصلی (`karen-soft.ir`) طبیعی است و به‌صورت یادداشت
> نشان داده می‌شود، نه خطا.

## وضعیت فعلی

آخرین اجرا روی خروجی ساخته‌شده: **۱۰۹ صفحه · ۰ خطا · ۰ هشدار**.
