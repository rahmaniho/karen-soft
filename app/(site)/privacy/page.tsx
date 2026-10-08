import { PageHero, ContentSection, InfoGrid, ContactCTA } from "@/components/site/page-parts";
import { ButtonLink } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "حریم خصوصی کارن سافت | داده‌های فرم تماس و دموها",
  description: "سیاست حریم خصوصی کارن سافت: اطلاعاتی که از فرم تماس دریافت می‌شود، نحوۀ استفاده از داده‌های دمو و راه درخواست حذف اطلاعات.",
  path: "/privacy",
});
const items=[{"title": "اطلاعات تماس", "desc": "فرم تماس نام، شماره تماس، ایمیل اختیاری و شرح درخواست را برای پاسخ‌گویی دریافت می‌کند. هنگام فعال بودن سرویس ایمیل، پیام برای تیم ارسال می‌شود."}, {"title": "داده‌های مرورگر", "desc": "تنظیمات نمایش و بعضی داده‌های نمونه دمو ممکن است در مرورگر شما نگهداری شوند. از وارد کردن اطلاعات واقعی موکل، بیمار یا مشتری در دمو خودداری کنید."}, {"title": "گفت‌وگوی آنلاین", "desc": "چت آنلاین با سرویس Crisp ارائه می‌شود. متن گفت‌وگوها در سامانهٔ Crisp نگهداری می‌شود و Crisp ممکن است برای تشخیص بازگشت شما کوکی یا داده‌ای در مرورگر ذخیره کند. اطلاعات حساس را در چت ننویسید."}, {"title": "درخواست درباره اطلاعات", "desc": "برای پرسش درباره اطلاعات ارسالی یا درخواست حذف آن‌ها، از ایمیل رسمی کارن سافت استفاده کنید. اطلاعات محرمانه را از طریق فرم عمومی ارسال نکنید."}];
export default function Page(){return <><PageHero eyebrow="KAREN SOFT / INFORMATION" title="حریم خصوصی" description="راهنمای داده‌های فرم‌ها و دموهای این وب‌سایت."/><ContentSection title="آنچه باید بدانید"><InfoGrid items={items}/><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/demo">بررسی دموها</ButtonLink><ButtonLink href="/products" variant="outline">همه محصولات</ButtonLink></div></ContentSection><ContactCTA/></>}