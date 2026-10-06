import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {writeFile} from 'node:fs/promises';
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox'],headless:true});
const context=await b.newContext({reducedMotion:"reduce"});const p=await context.newPage();const results=[];
for(const width of [320,768,1024,1280]){
 await p.setViewportSize({width,height:900});
 for(const path of ['/','/products','/blog','/print','/contact','/demo/law-office']){
 await p.goto('http://localhost:3000'+path);await p.evaluate(()=>document.fonts.ready);
 const geometry=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('header a,header button')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.left<0||r.right>innerWidth)}).map(el=>el.textContent)}));
 if(geometry.overflow||geometry.clipped.length)results.push({path,width,...geometry});
 }
}
await p.setViewportSize({width:1440,height:1000});
for(const theme of ['light','dark'])for(const path of ['/','/products','/blog','/contact','/print','/print/order/bizcard','/demo/law-office']){
 await p.goto('http://localhost:3000'+path);await p.evaluate(theme=>localStorage.setItem('theme',theme),theme);await p.reload();await p.evaluate(()=>document.fonts.ready);
 const a=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 results.push({path,theme,violations:a.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length,nodes:v.nodes.slice(0,5).map(n=>({html:n.html,summary:n.failureSummary}))}))});
}
await writeFile('.cache/audit/a11y.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));await b.close();
