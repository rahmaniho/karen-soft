import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage']}: {})});
const xml=await(await fetch(base+'/sitemap.xml')).text();
const paths=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const report=[];
await mkdir('.cache/audit',{recursive:true});
for(const theme of ['light','dark']) for(const width of [320,390,768,1024,1440]){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
 await context.addInitScript(theme=>localStorage.setItem('theme',theme),theme);
 const page=await context.newPage();let errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 for(const path of paths){
  errors=[];await page.goto(base+path,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);
  const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,h1:document.querySelectorAll('h1').length,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')),title:document.title}));
  if(result.overflow||result.h1!==1||result.broken.length||errors.length)report.push({path,width,theme,...result,errors:[...errors]});
  if([390,1440].includes(width) && ['/','/products','/blog','/blog/smart-case-management','/print','/contact','/demo/law-office'].includes(path)){
   await page.screenshot({path:`.cache/audit/${path.replaceAll('/','_')||'home'}-${width}-${theme}.png`});

  }
 }
 await context.close();
}
await browser.close();await writeFile('.cache/audit/report.json',JSON.stringify(report,null,2));
console.log(`Audited ${paths.length} routes at five widths in both themes; ${report.length} findings.`);console.log(JSON.stringify(report));

if(report.length) process.exitCode=1;
