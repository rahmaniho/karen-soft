import { PageHero, ContentSection, InfoGrid, ContactCTA } from "@/components/site/page-parts";
import { ButtonLink } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({
  title: "وضعیت سرویس‌های کارن سافت",
  description: "این صفحه در حال حاضر به سامانه پایش زنده متصل نیست؛ برای گزارش اختلال سرویس یا پیگیری پشتیبانی با کارن سافت تماس بگیرید.",
  path: "/status",
  noIndex: true,
});
const items=[{"title": "وضعیت فعلی: تأییدنشده", "desc": "در حال حاضر داده‌ای از پایش خودکار زیرساخت دریافت نمی‌شود. نمایش این صفحه نشانه سلامت سرویس‌های عملیاتی نیست."}, {"title": "گزارش اختلال", "desc": "نام سرویس، زمان رخداد و شرح خطا را به پشتیبانی ارسال کنید. رمز عبور و اطلاعات محرمانه را در پیام قرار ندهید."}, {"title": "سرویس اختصاصی شما", "desc": "وضعیت میزبانی و زمان پاسخ‌گویی پشتیبانی بر اساس قرارداد هر پروژه تعیین می‌شود."}];
export default function Page(){return <><PageHero eyebrow="KAREN SOFT / INFORMATION" title="وضعیت سرویس‌ها" description="این صفحه به سامانه پایش زنده متصل نیست."/><ContentSection title="آنچه باید بدانید"><InfoGrid items={items}/><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/demo">بررسی دموها</ButtonLink><ButtonLink href="/products" variant="outline">همه محصولات</ButtonLink></div></ContentSection><ContactCTA/></>}