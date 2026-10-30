import { PageHero, ContentSection, InfoGrid, ContactCTA } from "@/components/site/page-parts";
import { ButtonLink } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "راهنمای استفاده از محصولات کارن سافت",
  description: "راهنمای شروع کار با محصولات کارن سافت، بررسی ماژول‌ها و آماده‌سازی نیازمندی‌های پیش از استقرار سامانه.",
  path: "/docs",
});
const items=[{"title": "شروع از صفحه محصول", "desc": "هر محصول صفحه اختصاصی خودش را دارد: امکانات، ماژول‌ها، قیمت پایه و نمونه‌های مرتبط. برای آشنایی با نرم‌افزارهای مالی، صفحه حساب‌یار کامل‌ترین نمونه است."}, {"title": "بررسی ماژول‌ها", "desc": "در صفحه هر محصول، بخش‌های سفارش، مشتریان، گزارش‌ها و تنظیمات فهرست شده است. نمونه‌کارهای زنده هم جریان کار واقعی یک فروشگاه یا دفتر وکالت را نشان می‌دهند."}, {"title": "از بررسی تا استقرار", "desc": "پس از بررسی، فرایندهای موردنیاز، تعداد کاربران و یکپارچه‌سازی‌ها را برای تیم ارسال کنید. آموزش و شرایط پشتیبانی در پیشنهاد پروژه مشخص می‌شود."}];
export default function Page(){return <><PageHero eyebrow="KAREN SOFT / INFORMATION" title="راهنمای استفاده" description="شروع کار با محصولات و نمونه‌کارهای کارن سافت."/><ContentSection title="آنچه باید بدانید"><InfoGrid items={items}/><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/portfolio">دیدن نمونه‌کارها</ButtonLink><ButtonLink href="/products" variant="outline">همه محصولات</ButtonLink></div></ContentSection><ContactCTA/></>}