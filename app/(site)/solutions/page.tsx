import Link from "next/link";
import { SOLUTIONS } from "@/lib/solutions";
import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { pageMeta } from "@/lib/seo";
export const metadata=pageMeta({title:"راهکارهای تخصصی صنایع",description:"نرم‌افزار متناسب با فرایند واقعی هر صنعت",path:"/solutions"});
export default function Page(){return <><PageHero eyebrow="INDUSTRY SOLUTIONS" title="هر صنعت، راهکار خودش را دارد." description="از چاپخانه تا دفتر وکالت؛ ابزارهایی که با زبان کسب‌وکار شما صحبت می‌کنند."/><ContentSection title="صنعت خود را انتخاب کنید"><div className="grid gap-6 md:grid-cols-2">{SOLUTIONS.map(s=><Link key={s.slug} href={`/solutions/${s.slug}`} className="surface-card p-8 transition-transform hover:-translate-y-1"><span className="text-3xl">{s.emoji}</span><h2 className="text-2xl my-4">{s.name}</h2><p className="text-muted">{s.short}</p><p className="mt-6 text-brand-600 dark:text-brand-300">کشف راهکار ←</p></Link>)}</div></ContentSection><ContactCTA/></>}
