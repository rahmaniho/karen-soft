import { SITE, PROCESS_STEPS } from "@/lib/constants";
import { PageHero, ContentSection, InfoGrid, ContactCTA } from "@/components/site/page-parts";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "درباره کارن سافت | تیم توسعه نرم‌افزار در قزوین",
  description: "با کارن سافت آشنا شوید؛ تیم مستقر در قزوین برای طراحی وب‌سایت، توسعه نرم‌افزار مدیریتی و اتوماسیون فرایندهای کسب‌وکار.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT KAREN SOFT"
        title="فناوری پیچیده، رشد ساده."
        description="ما نرم‌افزار را برای حل مسائل واقعی کسب‌وکار می‌سازیم؛ ابزاری که کار روزمره را ساده‌تر و تصمیم‌گیری را روشن‌تر کند."
      />
      <ContentSection title="از شناخت مسئله شروع می‌کنیم">
        <div className="grid gap-10 md:grid-cols-2">
          <p className="lead">
            کارن سافت در سال ۱۴۰۴ (2024) در {SITE.city} بنیان‌گذاری شد. {SITE.founder} — بنیان‌گذار کارن سافت —
            فعالیت مجموعه را با تمرکز بر طراحی وب‌سایت، نرم‌افزارهای مدیریتی و اتوماسیون آغاز کرد. مجموعه محصولات و دموهای سایت، تصویری از حوزه‌های کاری و رویکرد اجرایی ماست.
          </p>
          <div className="surface-card p-8">
            <h3>پیش از تصمیم، تجربه کنید</h3>
            <p className="my-4 text-muted">
              دموهای مرورگری کمک می‌کنند پیش از شروع همکاری، جریان کار و امکانات موردنیازتان را بررسی کنید. اطلاعات دموها نمونه هستند.
            </p>
            <ButtonLink href="/demo" variant="soft">ورود به دموها</ButtonLink>
          </div>
        </div>
      </ContentSection>
      <ContentSection title="روش کار ما"><InfoGrid items={PROCESS_STEPS} /></ContentSection>
      <ContentSection title="یک مجموعه، دو حوزه مکمل">
        <p className="lead mb-6">در کنار خدمات نرم‌افزاری، کارن چاپ خدمات چاپ، مهر و صحافی را در یک بخش مستقل ارائه می‌کند.</p>
        <ButtonLink href="/print" variant="outline">آشنایی با کارن چاپ</ButtonLink>
      </ContentSection>
      <ContactCTA />
      <JsonLd
        data={[
          webPageSchema({
            type: "AboutPage",
            name: "درباره کارن سافت",
            description: "معرفی کارن سافت، خدمات نرم‌افزاری و رویکرد همکاری با کسب‌وکارها.",
            path: "/about",
            mainEntity: { "@id": `${SITE.url}/#organization` },
          }),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "درباره کارن سافت", path: "/about" },
          ]),
        ]}
      />
    </>
  );
}
