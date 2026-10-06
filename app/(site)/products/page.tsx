import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { Catalog } from "@/components/site/catalog";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta({title:"نرم‌افزارهایی برای کار واقعی.",description:"محصول متناسب با کسب‌وکارتان را پیدا کنید؛ قابلیت‌ها را بررسی کنید و پیش از تصمیم، دموی زنده را ببینید.",path:"/products"});
export default function Page() { return <><PageHero eyebrow="OUR PRODUCTS" title="نرم‌افزارهایی برای کار واقعی." description="محصول متناسب با کسب‌وکارتان را پیدا کنید؛ قابلیت‌ها را بررسی کنید و پیش از تصمیم، دموی زنده را ببینید."/><ContentSection title="همه محصولات"><Catalog kind="products"/></ContentSection><ContactCTA/></>; }
