import { BLOG_POSTS } from "@/lib/blog";
import { SITE } from "@/lib/constants";
const xml = (value: string) => value.replace(/[<>&"']/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"}[c]!));
export function GET() {
  const items = [...BLOG_POSTS].sort((a,b)=>b.date.localeCompare(a.date)).map(p=>`<item><title>${xml(p.title)}</title><link>${SITE.url}/blog/${p.slug}</link><guid>${SITE.url}/blog/${p.slug}</guid><description>${xml(p.excerpt)}</description><pubDate>${new Date(p.date).toUTCString()}</pubDate></item>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE.name}</title><link>${SITE.url}/blog</link><description>${xml(SITE.description)}</description><language>fa-IR</language>${items}</channel></rss>`,{headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, max-age=3600"}});
}
