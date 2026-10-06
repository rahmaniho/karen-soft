import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('mobile menu, Escape, theme persistence and no overflow',async({page})=>{
 await page.setViewportSize({width:320,height:800});await page.goto('/');
 await page.getByRole('button',{name:'باز کردن منو',exact:true}).click();
 await expect(page.getByRole('navigation',{name:'منوی موبایل',exact:true})).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('navigation',{name:'منوی موبایل',exact:true})).not.toBeVisible();
 await page.getByRole('button',{name:'تغییر به حالت تیره'}).click();await page.reload();await expect(page.locator('html')).toHaveClass(/dark/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.goto('/print');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('catalog search has an empty state and can reset',async({page})=>{
 await page.goto('/products');await page.getByPlaceholder('جست‌وجو…').fill('هیچ محصولی با این نام نیست');
 await expect(page.getByRole('heading',{name:'نتیجه‌ای پیدا نشد'})).toBeVisible();
 await page.getByRole('button',{name:'پاک کردن فیلترها'}).click();await expect(page.locator('main article')).toHaveCount(10);
});

test('contact validation focuses first error and preserves message on provider failure',async({page})=>{
 await page.goto('/contact');await page.getByRole('button',{name:'ارسال پیام',exact:true}).click();
 await expect(page.locator('#name')).toBeFocused();await expect(page.locator('#name-error')).toBeVisible();
 await page.getByLabel('نام و نام خانوادگی').fill('کاربر آزمایشی');await page.getByLabel('شماره تماس').fill('۰۹۱۲۳۴۵۶۷۸۹');
 await page.getByLabel('موضوع',{exact:true}).selectOption('website');await page.getByLabel('توضیحات پروژه').fill('درخواست طراحی وب‌سایت شرکتی');
 await page.route('**/api/contact',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'ارسال آنلاین فعال نیست.'})}));
 await page.getByRole('button',{name:'ارسال پیام',exact:true}).click();await expect(page.getByText('ارسال آنلاین فعال نیست.',{exact:true})).toBeVisible();
 await expect(page.getByLabel('توضیحات پروژه')).toHaveValue('درخواست طراحی وب‌سایت شرکتی');
});

test('print draft is explicitly not a confirmed order',async({page})=>{
 await page.goto('/print/order/bizcard');await page.getByLabel('نام و نام خانوادگی').fill('کاربر آزمایشی');await page.getByLabel('شماره تماس').fill('09123456789');
 await page.getByLabel('توضیح طرح',{exact:true}).fill('کارت ویزیت با رنگ آبی و نوشته‌های فارسی');
 await page.getByRole('button',{name:'آماده‌سازی سفارش برای ارسال'}).click();
 await expect(page.getByRole('dialog',{name:'سفارش آماده ارسال است'})).toBeVisible();
 await expect(page.getByText(/هنوز برای چاپخانه ارسال نشده/)).toBeVisible();
 await expect(page.getByRole('link',{name:'ارسال در واتساپ'})).toHaveAttribute('href',/^https:\/\/wa.me\//);
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog',{name:'سفارش آماده ارسال است'})).not.toBeVisible();
});

test('demo keeps the selected module after reload',async({page})=>{
 await page.goto('/demo/law-office');await page.getByRole('button',{name:'بعدی',exact:true}).click();
 await expect(page.locator('aside button[aria-current="page"]')).toContainText('پرونده');
 await page.reload();await expect(page.locator('aside button[aria-current="page"]')).toContainText('پرونده');
});

for(const theme of ['light','dark'])for(const path of ['/','/products','/blog','/contact','/print','/print/order/bizcard','/demo/law-office']){
 test(`accessibility ${theme} ${path}`,async({page})=>{
  await page.addInitScript(theme=>localStorage.setItem('theme',theme),theme);
  await page.goto(path);await page.evaluate(()=>document.fonts.ready);
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.html)}))).toEqual([]);
 });
}

for(const product of ['printing-management','law-office','taxi-management','smart-building','real-estate','restaurant','auto-parts','gym','online-store','karen-net']){
 test(`all demo modules render: ${product}`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.setViewportSize({width:1440,height:900});await page.goto(`/demo/${product}`);
  const modules=page.locator('aside li button');const count=await modules.count();expect(count).toBeGreaterThan(0);
  for(let i=0;i<count;i++){
   await modules.nth(i).click();await expect(modules.nth(i)).toHaveAttribute('aria-current','page');
   await expect(page.getByRole('heading',{level:2}).first()).toBeVisible();
  }
  expect(errors).toEqual([]);
 });
}
