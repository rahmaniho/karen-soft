import { LAWBOOK_INFO } from "@/lib/lawbook-info";
import { HESABYAR_FAQS, HESABYAR_PLANS, HESABYAR_WEB_URL } from "@/lib/hesabyar";
import { HESABYAR_ARTICLE_PATH } from "@/lib/hesabyar-article";
import { SITE, SERVICES } from "@/lib/constants";
import { PRODUCTS } from "@/lib/products";
import { SOLUTIONS } from "@/lib/solutions";
import { PRINT_PRODUCTS } from "@/lib/print/data/products";
import { PRINT_SERVICES } from "@/lib/print/data/services";
import { CHAP } from "@/lib/print/site";
import { formatNumber } from "@/lib/utils";

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
    link("نمونه‌کارها", "/portfolio"),
    link("مجله", "/blog"),
    link("درباره کارن سافت", "/about"),
    link("تماس", "/contact"),
    "",
    "### محصولات",
    ...PRODUCTS.map((product) => `${link(product.name, `/products/${product.slug}`)} — ${product.short}`),
    "",
    "### کارو (نرم‌افزار حسابداری آنلاین)",
    "کارو نام جدید حساب‌یار است. نسخه فعلی کاملاً آنلاین است؛ اطلاعات روی سرور ذخیره می‌شود و از دستگاه‌های مختلف قابل ثبت و مشاهده است.",
    link("صفحه رسمی کارو و محاسبه تعرفه اشتراک", "/products/hesabyar"),
    link("مقاله معرفی کارو", HESABYAR_ARTICLE_PATH),
    `- ورود به برنامه: ${HESABYAR_WEB_URL}`,
    ...HESABYAR_PLANS.map((plan) => `- ${plan.title}: ماهانه ${formatNumber(plan.price)} تومان، سالانه یک کاربر ${formatNumber(plan.yearly)} تومان؛ کاربر اضافه در ماه ${formatNumber(plan.extraUserMonthly)} تومان.`),
    "- هر پلن شامل یک کاربر است. مبلغ نهایی = (هزینه ماهانه پلن + تعداد کاربران اضافه × هزینه ماهانه هر کاربر اضافه) × تعداد ماه‌ها.",
    "- سالانه معادل ۱۲ ماه، بدون تخفیف خودکار. فعال‌سازی پس از پرداخت موفق خودکار است؛ پایان اشتراک باعث حذف اطلاعات نمی‌شود.",
    ...HESABYAR_FAQS.map((item) => `- ${item.q} ${item.a}`),
    "",
    "### کتابچه قانون ایران",
    LAWBOOK_INFO.summary,
    LAWBOOK_INFO.credit,
    LAWBOOK_INFO.optionalCases,
    LAWBOOK_INFO.sources,
    link("آزمون اختبار", "/products/law-book#lawbook-exams"),
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
    "- نمونه‌کارهای زندهٔ سایت، نمایش طراحی و تجربهٔ کاربری با دادهٔ نمونه‌اند؛ آن‌ها را با سامانهٔ عملیاتی مشتریان اشتباه نگیرید.",
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
