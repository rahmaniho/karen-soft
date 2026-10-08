import { SITE } from "@/lib/constants";
import { ContactForm } from "@/components/sections/contact-form";
import { PageHero, ContentSection } from "@/components/site/page-parts";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "تماس با کارن سافت | مشاوره طراحی سایت و نرم‌افزار",
  description: "برای مشاوره طراحی وب‌سایت، نرم‌افزار مدیریتی یا اتوماسیون با کارن سافت در قزوین تماس بگیرید؛ تلفن، ایمیل و فرم درخواست همکاری.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="LET’S TALK"
        title="برای ایده بعدی‌تان، اینجاییم."
        description="درباره کسب‌وکار، چالش‌ها و انتظارتان بنویسید. برای شروع لازم نیست همه جزئیات فنی را بدانید."
      />
      <ContentSection title="راه‌های ارتباط">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <aside className="surface-card space-y-7 p-8">
            <div>
              <h3>تماس مستقیم</h3>
              <a className="text-brand-600 dark:text-brand-300" href={`tel:${SITE.phone}`} dir="ltr">
                {SITE.phoneDisplay}
              </a>
            </div>
            <div>
              <h3>ایمیل</h3>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
            <div>
              <h3>نشانی</h3>
              <p className="text-muted">{SITE.address}</p>
            </div>
            <div>
              <h3>ساعات پاسخ‌گویی</h3>
              <p className="text-muted">شنبه تا چهارشنبه: {SITE.workingHours.satWed}</p>
              <p className="text-muted">پنج‌شنبه: {SITE.workingHours.thu}</p>
              <p className="text-muted">جمعه: تعطیل</p>
            </div>
            <a href={SITE.socials.telegram} className="block text-brand-600 dark:text-brand-300">
              گفت‌وگو در تلگرام ←
            </a>
          </aside>
          <ContactForm />
        </div>
      </ContentSection>
      <JsonLd
        data={[
          webPageSchema({
            type: "ContactPage",
            name: "تماس با کارن سافت",
            description: "راه‌های تماس با کارن سافت در قزوین برای مشاوره طراحی وب‌سایت و توسعه نرم‌افزار.",
            path: "/contact",
            mainEntity: { "@id": `${SITE.url}/#business` },
          }),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "تماس", path: "/contact" },
          ]),
        ]}
      />
    </>
  );
}
