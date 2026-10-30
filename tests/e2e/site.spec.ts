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
 await page.getByRole('button',{name:'پاک کردن فیلترها'}).click();await expect(page.locator('main article')).toHaveCount(11);
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

test('law book page shows the topic catalogue instead of a live preview',async({page})=>{
 await page.goto('/products/law-book');
 await expect(page.getByRole('heading',{level:2,name:'چه موضوعاتی در کتابچه قانون هست؟'})).toBeVisible();
 await expect(page.locator('.lb-topic-card')).toHaveCount(10);
 await expect(page.getByText('حقوق مدنی',{exact:true})).toBeVisible();
 await expect(page.getByText('قانون مدنی',{exact:true})).toBeVisible();
 await expect(page.getByRole('link',{name:/نسخهٔ زنده|پیش‌نمایش/})).toHaveCount(0);
});

test('removed demo hub redirects to the portfolio',async({page})=>{
 await page.goto('/demo');
 await expect(page).toHaveURL(/\/portfolio$/);
 await page.goto('/demo/law-office');
 await expect(page).toHaveURL(/\/portfolio$/);
});

test('law firm portfolio case opens its own hosted preview',async({page})=>{
 await page.goto('/portfolio/leyla-abkeh');
 const frame=page.locator('iframe[title*="لیلا آبکه"]');
 await expect(frame).toBeVisible();
 await expect(frame).toHaveAttribute('src','/demos/leyla-abkeh/index.html');
});

for(const theme of ['light','dark'])for(const path of ['/','/products','/blog','/contact','/print','/print/order/bizcard','/portfolio/leyla-abkeh']){
 test(`accessibility ${theme} ${path}`,async({page})=>{
  await page.addInitScript(theme=>localStorage.setItem('theme',theme),theme);
  await page.goto(path);await page.evaluate(()=>document.fonts.ready);
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.html)}))).toEqual([]);
 });
}

for(const slug of ['leyla-abkeh','hanis','digikaren']){
 test(`portfolio preview renders without page errors: ${slug}`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.setViewportSize({width:1440,height:900});await page.goto(`/portfolio/${slug}`);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await expect(page.locator('iframe').first()).toBeVisible();
  expect(errors).toEqual([]);
 });
}
