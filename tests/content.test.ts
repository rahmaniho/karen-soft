import { describe, expect, it } from "vitest";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { BLOG_POSTS } from "../lib/blog";
import { PRODUCTS } from "../lib/products";
import { SOLUTIONS } from "../lib/solutions";
import { CASE_STUDIES } from "../lib/portfolio";
import { legacyRedirects } from "../lib/legacy-redirects";
import { contactSchema } from "../lib/validations";
import legacy from "../lib/legacy-blog.json";
describe("legacy content migration",()=>{
 it("covers every original article and redirects every article URL",()=>{
  const files=readdirSync("legacy/blog").filter(f=>f.endsWith(".html")&&!['index.html','archive.html'].includes(f));
  expect(Object.keys(legacy)).toHaveLength(files.length);
  for(const file of files){
   const path=`/blog/${file}`;
   const post=BLOG_POSTS.find(p=>p.legacyPath===path);
   expect(post,path).toBeTruthy();
   expect(legacyRedirects.some(([from,to])=>from===path&&to===`/blog/${post!.slug}`),path).toBe(true);
   expect(post!.sections.length).toBeGreaterThan(1);
  }
 });
 it("preserves legacy sections rendered as non-paragraph cards",()=>{
  expect(JSON.stringify(legacy)).toContain('کاهش ارتباطات غیررسمی و تعاملات اجتماعی');
  expect(JSON.stringify(legacy)).toContain('حملات سایبری و هک');
  expect(JSON.stringify(legacy)).toContain('اطلاعاتت را می‌شناسی');
 });
 it("has all local cover images",()=>{
  for(const item of [...BLOG_POSTS,...CASE_STUDIES])expect(existsSync(resolve('public',item.cover.slice(1))),item.cover).toBe(true);
 });
 it("resolves product and solution relationships",()=>{
  for(const s of SOLUTIONS){expect(PRODUCTS.some(p=>p.slug===s.productSlug),s.slug).toBe(true);expect(PRODUCTS.some(p=>p.demoSlug===s.demoSlug),s.slug).toBe(true);}
  for(const p of PRODUCTS)if(p.solution)expect(SOLUTIONS.some(s=>s.slug===p.solution),p.slug).toBe(true);
 });
 it("has no duplicate slugs",()=>{
  for(const items of [BLOG_POSTS, PRODUCTS, SOLUTIONS, CASE_STUDIES])expect(new Set(items.map(x=>x.slug)).size).toBe(items.length);
 });
 it("normalizes Persian telephone digits",()=>{
  const result=contactSchema.safeParse({name:'کاربر آزمایشی',phone:'۰۹۱۲۳۴۵۶۷۸۹',email:'',subject:'website',message:'درخواست طراحی وب‌سایت شرکتی'});
  expect(result.success).toBe(true);if(result.success)expect(result.data.phone).toBe('09123456789');
 });
});
