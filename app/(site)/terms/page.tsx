import { PageHero, ContentSection, InfoGrid, ContactCTA } from "@/components/site/page-parts";
import { ButtonLink } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "شرایط استفاده از وب‌سایت کارن سافت",
  description: "شرایط استفاده از وب‌سایت کارن سافت؛ توضیح نمونه‌کارها، قیمت‌های پایه، حدود خدمات و تعیین دامنه پروژه در قرارداد.",
  path: "/terms",
});
const items=[{"title": "نمونه‌کار و محتوای معرفی", "desc": "نمونه‌کارهای زنده برای ارزیابی تجربه کاربری و طراحی هستند و جایگزین سامانه عملیاتی، مشاوره حقوقی یا حسابداری نیستند."}, {"title": "قیمت و دامنه خدمات", "desc": "قیمت‌های معرفی‌شده پایه و غیرقطعی هستند. امکانات، هزینه نهایی، زمان تحویل و شرایط پشتیبانی پس از بررسی نیاز در قرارداد مشخص می‌شوند."}, {"title": "مالکیت و مسئولیت", "desc": "شرایط تحویل کد و دارایی‌ها تابع قرارداد پروژه است. کاربران نباید داده‌های واقعی و محرمانه را در محیط‌های نمایشی یا فرم‌های عمومی وارد کنند."}];
export default function Page(){return <><PageHero eyebrow="KAREN SOFT / INFORMATION" title="شرایط استفاده" description="توضیحات استفاده از وب‌سایت و نمونه‌کارهای کارن سافت."/><ContentSection title="آنچه باید بدانید"><InfoGrid items={items}/><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/portfolio">دیدن نمونه‌کارها</ButtonLink><ButtonLink href="/products" variant="outline">همه محصولات</ButtonLink></div></ContentSection><ContactCTA/></>}