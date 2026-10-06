// Run against `npm start` or an existing preview: node scripts/check-routes.mjs
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const sitemap=await (await fetch(`${base}/sitemap.xml`)).text();
const paths=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const failures=[]; const linked=new Set();
for (const path of paths){
 const response=await fetch(base+path);const html=await response.text();
 if(!response.ok)failures.push(`${path}: ${response.status}`);
 for(const m of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g))if(!m[1].startsWith('/_next/'))linked.add(m[1].split('#')[0].replaceAll('&amp;','&'));
}
for(const path of linked){const r=await fetch(base+path);if(!r.ok)failures.push(`linked ${path}: ${r.status}`);}
const old=await fetch(base+'/blog/automation.html',{redirect:'manual'});
if(old.status!==308 || !old.headers.get('location')?.endsWith('/blog/office-automation'))failures.push('legacy redirect failed');
const missing=await fetch(base+'/products/not-a-product');if(missing.status!==404)failures.push('unknown product must be 404');
const invalid=await fetch(base+'/api/contact',{method:'POST',headers:{'content-type':'application/json'},body:'{}'});if(invalid.status!==422)failures.push('invalid contact payload accepted');
console.log(`Checked ${paths.length} sitemap routes and ${linked.size} linked routes/assets.`);
if(failures.length){console.error([...new Set(failures)].join('\n'));process.exitCode=1;}else console.log('All checks passed.');
