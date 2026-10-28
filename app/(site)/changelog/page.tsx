import { PageHero, ContentSection, InfoGrid, ContactCTA } from "@/components/site/page-parts";
import { ButtonLink } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "تغییرات وب‌سایت کارن سافت",
  description: "یادداشت تغییرات ساختار وب‌سایت کارن سافت؛ این صفحه تاریخچه انتشار و نسخه‌های نرم‌افزارهای مشتریان نیست.",
  path: "/changelog",
  noIndex: true,
});
const items=[{"title": "به‌روزرسانی دانلود حساب‌یار به نسخهٔ ۱٫۳٫۰", "desc": "بخش دانلود حساب‌یار اندروید به بیلد آزمایشی ۱٫۳٫۰ به‌روز شد: صندوق فروش با کسر خودکار موجودی، ثبت خودکار درآمد در دفتر مالی کسب‌وکار، ابطال فاکتور با دلیل و راهنمای تازهٔ صندوق و انبار."}, {"title": "به‌روزرسانی معرفی کتابچهٔ قانون", "desc": "محصول «کتابچه قانون» (PWA مطالعهٔ قوانین ایران، ۷۳ سند و ۱۱٬۱۳۲ ماده در ۱۰ دستهٔ موضوعی، آفلاین و قابل نصب روی اندروید، iOS و ویندوز) با ۱۰۰ آزمون اختبار در ۹ حوزه و دریافت اختیاری مجموعهٔ ۱٬۹۹۸ رأی قضایی معرفی می‌شود. قیمت نسخهٔ کامل ۹۵۰٬۰۰۰ تومان است."}, {"title": "تکمیل صفحات معرفی", "desc": "صفحات محصولات، راهکارهای صنایع و مطالعهٔ موردی پروژه‌ها یکپارچه و به‌روز شدند."}, {"title": "به‌روزرسانی مجله", "desc": "مقاله‌های منتخب با ساختار خواناتر و مسیرهای دسترسی به‌روز در دسترس قرار گرفتند."}, {"title": "جست‌وجو و دسترسی", "desc": "جست‌وجو و فیلتر فهرست‌ها، فهرست درون مقاله و صفحات راهنما اضافه شدند."}];
export default function Page(){return <><PageHero eyebrow="KAREN SOFT / INFORMATION" title="تغییرات سایت" description="تغییرات این نسخه از وب‌سایت؛ نه تاریخچه انتشار نرم‌افزارهای مشتریان."/><ContentSection title="آنچه باید بدانید"><InfoGrid items={items}/><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/demo">بررسی دموها</ButtonLink><ButtonLink href="/products" variant="outline">همه محصولات</ButtonLink></div></ContentSection><ContactCTA/></>}