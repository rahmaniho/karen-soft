import { PageHero, ContentSection, InfoGrid, ContactCTA } from "@/components/site/page-parts";
import { ButtonLink } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "دریافت و نصب نرم‌افزار مدیریت دفتر وکالت | کارن سافت",
  description: "پیش از درخواست نسخه نصب‌شدنی نرم‌افزار مدیریت دفتر وکالت، پرونده‌ها، تقویم جلسات و امکانات آن را در صفحهٔ محصول بررسی کنید.",
  path: "/download-law-software",
});
const items=[{"title": "معرفی محصول", "desc": "امکانات مدیریت دفتر وکالت — پرونده، تقویم جلسات، مالی و دستیار هوش مصنوعی — در صفحهٔ محصول فهرست شده است."}, {"title": "درخواست نسخه نصب‌شدنی", "desc": "در حال حاضر فایل نصب تأییدشده‌ای برای دریافت عمومی ارائه نشده است. برای اطلاع از نسخۀ مناسب و شرایط آزمایش با کارن سافت تماس بگیرید."}, {"title": "انتقال اطلاعات و راه‌اندازی", "desc": "پیش از نصب، تعداد کاربران، شیوه پشتیبان‌گیری و نیاز به انتقال پرونده‌های قبلی را با تیم بررسی کنید."}];
export default function Page(){return <><PageHero eyebrow="KAREN SOFT / INFORMATION" title="دریافت نرم‌افزار دفتر وکالت" description="پیش از دریافت نسخه نصب‌شدنی، امکانات و نمونه‌های نرم‌افزار را بررسی کنید."/><ContentSection title="آنچه باید بدانید"><InfoGrid items={items}/><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/portfolio">دیدن نمونه‌کارها</ButtonLink><ButtonLink href="/products" variant="outline">همه محصولات</ButtonLink></div></ContentSection><ContactCTA/></>}