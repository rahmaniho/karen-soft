import { SERVICES, PROCESS_STEPS, FAQS } from "@/lib/constants";
import { PageHero, ContentSection, InfoGrid, Points, ContactCTA } from "@/components/site/page-parts";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
export const metadata=pageMeta({title:"خدمات کارن سافت",description:"طراحی وب، نرم‌افزار اختصاصی، اتوماسیون و امنیت",path:"/services"});
export default function Page(){return <><PageHero eyebrow="OUR EXPERTISE" title="از ایده تا یک محصول قابل اتکا." description="طراحی، توسعه و پشتیبانی را یکپارچه پیش می‌بریم؛ با دامنه روشن و تحویل مرحله‌ای."/>{SERVICES.map(s=><ContentSection key={s.slug} id={s.slug} title={s.title}><div className="grid gap-8 md:grid-cols-2"><p className="lead">{s.desc}</p><div className="surface-card p-8"><Points items={s.bullets}/><ButtonLink className="mt-6" href="/contact" variant="soft">گفت‌وگو درباره این خدمت</ButtonLink></div></div></ContentSection>)}<ContentSection title="مسیر همکاری"><InfoGrid items={PROCESS_STEPS}/></ContentSection><ContentSection title="پرسش‌های متداول"><Accordion items={FAQS}/></ContentSection><ContactCTA/></>}
