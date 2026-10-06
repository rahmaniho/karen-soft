import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { Catalog } from "@/components/site/catalog";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({title:"از مسئله تا نتیجه.",description:"نگاهی نزدیک به پروژه‌ها، چالش‌ها و راه‌حل‌های کارن سافت.",path:"/portfolio"});
export default function Page() { return <><PageHero eyebrow="SELECTED WORK" title="از مسئله تا نتیجه." description="نگاهی نزدیک به پروژه‌ها، چالش‌ها و راه‌حل‌های کارن سافت."/><ContentSection title="پروژه‌های منتخب"><Catalog kind="portfolio"/></ContentSection><ContactCTA/></>; }
