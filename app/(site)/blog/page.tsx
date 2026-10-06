import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { Catalog } from "@/components/site/catalog";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({title:"مجله کارن سافت",description:"یادداشت‌های کاربردی درباره فناوری، مدیریت و رشد کسب‌وکار؛ از تجربه تا اجرا.",path:"/blog"});
export default function Page() { return <><PageHero eyebrow="JOURNAL" title="مجله کارن سافت" description="یادداشت‌های کاربردی درباره فناوری، مدیریت و رشد کسب‌وکار؛ از تجربه تا اجرا."/><ContentSection title="آخرین مقاله‌ها"><Catalog kind="blog"/></ContentSection><ContactCTA/></>; }
