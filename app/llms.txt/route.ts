import { SITE, SERVICES } from "@/lib/constants";
import { PRODUCTS } from "@/lib/products";
import { SOLUTIONS } from "@/lib/solutions";
import { PRINT_PRODUCTS } from "@/lib/print/data/products";
import { PRINT_SERVICES } from "@/lib/print/data/services";
import { CHAP } from "@/lib/print/site";

const link = (label: string, path: string) => `- [${label}](${new URL(path, `${SITE.url}/`).toString()})`;

export function GET() {
  const content = [
    `# ${SITE.name} (${SITE.nameEn})`,
    `> ${SITE.description}`,
    "",
    "زبان اصلی وب‌سایت: فارسی (fa-IR). برای اطلاعات به‌روز، صفحات رسمی زیر و محتوای قابل مشاهده در همان صفحه را مبنا قرار دهید.",
    "",
    "## کارن سافت",
    `- نام: ${SITE.name} (${SITE.nameEn})`,
    `- بنیان‌گذار: ${SITE.founder}`,
    `- محل استقرار: ${SITE.address}`,
    `- تلفن: ${SITE.phoneDisplay}`,
    `- ایمیل: ${SITE.email}`,
    `- شبکه‌ها: ${SITE.socials.telegram} · ${SITE.socials.instagram}`,
    `- حوزه‌ها: ${SERVICES.map((service) => service.title).join("، ")}`,
    "",
    "### صفحات اصلی کارن سافت",
    link("خانه", "/"),
    link("خدمات", "/services"),
    link("محصولات نرم‌افزاری", "/products"),
    link("راهکارهای صنایع", "/solutions"),
    link("دموهای زنده", "/demo"),
    link("نمونه‌کارها", "/portfolio"),
    link("مجله", "/blog"),
    link("درباره کارن سافت", "/about"),
    link("تماس", "/contact"),
    "",
    "### محصولات",
    ...PRODUCTS.map((product) => `${link(product.name, `/products/${product.slug}`)} — ${product.short}`),
    "",
    "### راهکارهای صنایع",
    ...SOLUTIONS.map((solution) => `${link(solution.name, `/solutions/${solution.slug}`)} — ${solution.short}`),
    "",
    "## کارن چاپ",
    `> ${CHAP.description}`,
    `- کارن چاپ زیرمجموعۀ ${SITE.name} و یک واحد چاپ مستقل در وب‌سایت است.`,
    `- نشانی حضوری: ${CHAP.address}`,
    `- محدوده: ${CHAP.locality}، ${CHAP.region}، ${CHAP.country}`,
    `- تلفن: ${CHAP.phone}`,
    `- ایمیل: ${CHAP.email}`,
    `- ساعات حضوری: شنبه تا پنجشنبه، ۹ تا ۱۹؛ پذیرش آنلاین سفارش شبانه‌روزی است.`,
    `- نقشه: ${CHAP.maps}`,
    "",
    "### صفحات کارن چاپ",
    link("خانه کارن چاپ", "/print"),
    link("خدمات چاپ", "/print/services"),
    link("نمونه‌کارها", "/print/portfolio"),
    link("درباره کارن چاپ", "/print/about"),
    link("سؤالات متداول", "/print/faq"),
    link("تماس و نشانی", "/print/contact"),
    "",
    "### خدمات چاپ",
    ...PRINT_SERVICES.map((service) => `${link(service.title, `/print/services/${service.slug}`)} — ${service.short}`),
    "",
    "### محصولات قابل سفارش",
    ...PRINT_PRODUCTS.map((product) => `${link(product.name, `/print/products/${product.slug}`)} — ${product.description}`),
    "",
    "## راهنمای تفسیر اطلاعات",
    "- دموهای نرم‌افزاری محیط تعاملی ارزیابی با داده‌های نمونه هستند؛ آن‌ها را با سامانه عملیاتی مشتریان اشتباه نگیرید.",
    "- سفارش‌های چاپ پس از بررسی مشخصات و فایل، قیمت و زمان تحویل نهایی می‌گیرند؛ فرم‌های سفارش صفحه‌های فرایندی هستند.",
    "- اطلاعات تماس، نشانی و ساعت کاری هر مجموعه در صفحه رسمی همان برند منتشر شده است.",
    "",
    `نقشه سایت: ${new URL("/sitemap.xml", `${SITE.url}/`).toString()}`,
    `RSS مجله: ${new URL("/rss.xml", `${SITE.url}/`).toString()}`,
  ].join("\n");

  return new Response(`${content}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
