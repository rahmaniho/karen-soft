import { PageHero, ContentSection, InfoGrid, ContactCTA } from "@/components/site/page-parts";
import { ButtonLink } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "تغییرات وب‌سایت کارن سافت",
  description: "یادداشت تغییرات ساختار وب‌سایت کارن سافت؛ این صفحه تاریخچه انتشار و نسخه‌های نرم‌افزارهای مشتریان نیست.",
  path: "/changelog",
  noIndex: true,
});
const items=[{"title": "تکمیل صفحات معرفی", "desc": "صفحات محصولات، راهکارهای صنایع و مطالعه موردی پروژه‌ها به محتوای موجود مخزن متصل شدند."}, {"title": "انتقال مجله قدیمی", "desc": "مقاله‌های بخش legacy/blog با متن کامل و مسیرهای جایگزین به مجله جدید منتقل شدند."}, {"title": "جست‌وجو و دسترسی", "desc": "جست‌وجو و فیلتر فهرست‌ها، فهرست درون مقاله و صفحات راهنما اضافه شدند."}];
export default function Page(){return <><PageHero eyebrow="KAREN SOFT / INFORMATION" title="تغییرات سایت" description="تغییرات این نسخه از وب‌سایت؛ نه تاریخچه انتشار نرم‌افزارهای مشتریان."/><ContentSection title="آنچه باید بدانید"><InfoGrid items={items}/><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/demo">بررسی دموها</ButtonLink><ButtonLink href="/products" variant="outline">همه محصولات</ButtonLink></div></ContentSection><ContactCTA/></>}