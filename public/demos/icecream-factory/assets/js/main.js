/* ============================================================
   جاوااسکریپت اصلی لندینگ «زعفرونی»
   بخش‌ها:
   ۱) تنظیمات کلی (شماره واتساپ و فهرست محصولات)
   ۲) ابزارهای کمکی (اعداد فارسی، فرمت پول، توست)
   ۳) هدر: منوی موبایل، سایه اسکرول، نوار پیشرفت
   ۴) انیمیشن ظهور هنگام اسکرول + لینک فعال منو
   ۵) سبد سفارش: خرده / عمده، تخفیف پلکانی، جمع کل
   ۶) فرم سفارش: اعتبارسنجی + ساخت پیام واتساپ
   ۷) دکمه‌های شناور واتساپ و بازگشت به بالا
============================================================ */

/* ---------- ۱) تنظیمات کلی ---------- */
// ⚠️ شماره واتساپ کارگاه را اینجا جایگزین کنید (فرمت بین‌المللی، بدون + و فاصله)
const WHATSAPP_NUMBER = '989123456789';
const WHATSAPP_DEFAULT_MSG = 'سلام! از وب‌سایت زعفرونی پیام می‌دهم 🍨';

// فهرست محصولات (قیمت هر بسته یک‌کیلویی / هر کیلوگرم به تومان)
const PRODUCTS = {
  sonnati:   { name: 'بستنی سنتی',              price: 450000, img: 'assets/img/p-sonnati.jpg'   },
  zaferani:  { name: 'بستنی زعفرانی',           price: 520000, img: 'assets/img/p-zaferani.jpg'  },
  gerdoo:    { name: 'زعفرانی با مغز گردو',     price: 560000, img: 'assets/img/p-gerdoo.jpg'    },
  pedste:    { name: 'زعفرانی با مغز پسته',     price: 590000, img: 'assets/img/p-pedste.jpg'    },
  badam:     { name: 'زعفرانی با مغز بادام',    price: 560000, img: 'assets/img/p-badam.jpg'     },
};

// پله‌های تخفیف عمده بر حسب مجموع کیلوگرم
const WHOLESALE_TIERS = [
  { min: 100, off: 0.15 },
  { min: 50,  off: 0.10 },
  { min: 20,  off: 0.05 },
];
const WHOLESALE_MIN_KG = 20; // حداقل سفارش عمده

/* ---------- ۲) ابزارهای کمکی ---------- */
// تبدیل ارقام انگلیسی به فارسی
const faDigits = (v) => String(v).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
// تبدیل ارقام فارسی به انگلیسی (برای اعتبارسنجی ورودی کاربر)
const enDigits = (v) => String(v).replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
// فرمت پول با جداکننده و ارقام فارسی
const faMoney = (n) => faDigits(Number(n).toLocaleString('en-US')) + ' تومان';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// نمایش اعلان کوتاه (توست)
function showToast(message) {
  const box = $('#toast-box');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  box.appendChild(el);
  setTimeout(() => {
    el.classList.add('leaving');
    setTimeout(() => el.remove(), 320);
  }, 2600);
}

/* ---------- ۳) هدر: منوی موبایل، سایه، نوار پیشرفت ---------- */
const header = $('#header');
const menuBtn = $('#menu-btn');
const mobileMenu = $('#mobile-menu');

// باز و بسته کردن منوی موبایل
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden') === false;
  menuBtn.setAttribute('aria-expanded', String(open));
  $('#icon-open').classList.toggle('hidden', open);
  $('#icon-close').classList.toggle('hidden', !open);
});
// بستن منو پس از کلیک روی هر لینک
$$('#mobile-menu a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
    $('#icon-open').classList.remove('hidden');
    $('#icon-close').classList.add('hidden');
  })
);

// سایه هدر + نوار پیشرفت اسکرول + دکمه بازگشت به بالا
const progressBar = $('#scroll-progress');
const toTop = $('#to-top');
function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('shadow-soft', y > 10);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  // نمایش دکمه بازگشت به بالا بعد از ۶۰۰ پیکسل
  const show = y > 600;
  toTop.classList.toggle('opacity-0', !show);
  toTop.classList.toggle('pointer-events-none', !show);
  toTop.classList.toggle('flex', show);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- ۴) انیمیشن ظهور + لینک فعال منو ---------- */
// ظهور تدریجی عناصر دارای کلاس .reveal هنگام اسکرول
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty('--reveal-delay', `${entry.target.dataset.delay || 0}ms`);
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
$$('.reveal').forEach((el) => revealObserver.observe(el));

// روشن نگه‌داشتن لینک منوی بخش جاری
const sections = $$('main section[id]');
const navObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      $$('.nav-link').forEach((link) =>
        link.classList.toggle('nav-active', link.getAttribute('href') === `#${entry.target.id}`)
      );
    }),
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => navObserver.observe(s));

/* ---------- ۵) سبد سفارش (خرده / عمده) ---------- */
let orderMode = 'retail';            // 'retail' | 'wholesale'
const cart = new Map();              // شناسه محصول -> تعداد (بسته یا کیلوگرم)

const cartItemsEl = $('#cart-items');
const cartEmptyEl = $('#cart-empty');
const cartSummaryEl = $('#cart-summary');
const cartBadge = $('#cart-badge');

// واحد شمارش بر اساس حالت سفارش
const unitLabel = () => (orderMode === 'wholesale' ? 'کیلوگرم' : 'بسته یک‌کیلویی');

// محاسبه تخفیف پلکانی عمده بر حسب مجموع کیلوگرم
function discountRate(totalKg) {
  if (orderMode !== 'wholesale') return 0;
  const tier = WHOLESALE_TIERS.find((t) => totalKg >= t.min);
  return tier ? tier.off : 0;
}

// افزودن محصول به سبد (از دکمه کارت‌ها)
function addToCart(id) {
  const step = orderMode === 'wholesale' ? 5 : 1; // در حالت عمده، افزودن پیش‌فرض ۵ کیلویی
  cart.set(id, (cart.get(id) || 0) + step);
  renderCart();
  showToast(`«${PRODUCTS[id].name}» به سبد اضافه شد 🍨`);
}

// تغییر تعداد یک قلم
function changeQty(id, delta) {
  const next = (cart.get(id) || 0) + delta;
  if (next <= 0) cart.delete(id);
  else cart.set(id, next);
  renderCart();
}

// رندر کامل سبد و جمع‌ها
function renderCart() {
  cartItemsEl.innerHTML = '';
  const isEmpty = cart.size === 0;
  cartEmptyEl.classList.toggle('hidden', !isEmpty);
  cartSummaryEl.classList.toggle('hidden', isEmpty);

  // نشان تعداد اقلام در منوی هدر
  const totalUnits = [...cart.values()].reduce((a, b) => a + b, 0);
  cartBadge.textContent = faDigits(totalUnits);
  cartBadge.classList.toggle('hidden', totalUnits === 0);

  let subtotal = 0;
  cart.forEach((qty, id) => {
    const p = PRODUCTS[id];
    const rowTotal = p.price * qty;
    subtotal += rowTotal;

    const li = document.createElement('li');
    li.className = 'cart-row';
    li.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="flex-1 min-w-0">
        <p class="text-sm font-bold text-cocoa-900 truncate">${p.name}</p>
        <p class="text-[11px] text-cocoa-500 mt-0.5">${faMoney(p.price)} / ${unitLabel()}</p>
      </div>
      <div class="flex items-center gap-2" role="group" aria-label="تعداد ${p.name}">
        <button type="button" class="qty-btn" data-dec="${id}" aria-label="کاهش تعداد">−</button>
        <span class="w-8 text-center text-sm font-extrabold text-cocoa-800">${faDigits(qty)}</span>
        <button type="button" class="qty-btn" data-inc="${id}" aria-label="افزایش تعداد">+</button>
      </div>
      <p class="hidden min-[420px]:block w-24 lg:w-28 text-left text-xs font-extrabold text-saffron-700 shrink-0">${faMoney(rowTotal)}</p>
    `;
    cartItemsEl.appendChild(li);
  });

  // جمع‌ها و تخفیف عمده
  const rate = discountRate(totalUnits);
  const discount = Math.round(subtotal * rate);
  $('#sum-subtotal').textContent = faMoney(subtotal);
  $('#sum-discount-row').classList.toggle('hidden', rate === 0);
  $('#sum-discount-row').classList.toggle('flex', rate !== 0);
  $('#sum-discount-label').textContent = `تخفیف عمده (${faDigits(rate * 100)}٪)`;
  $('#sum-discount').textContent = '− ' + faMoney(discount);
  $('#sum-total').textContent = faMoney(subtotal - discount);

  // به‌روزرسانی نوار سفارش چسبان موبایل
  syncMobileBar(totalUnits, subtotal - discount);
}

// نوار چسبان پایین موبایل: نمایش جمع سبد و دکمه ادامه سفارش
let orderSectionInView = false; // آیا بخش سفارش الان در دید کاربر است؟
let lastCount = 0;              // آخرین تعداد اقلام سبد
let lastTotal = 0;              // آخرین مبلغ قابل پرداخت
function refreshMobileBar() {
  const bar = $('#mobile-order-bar');
  $('#mob-bar-count').textContent = faDigits(lastCount);
  $('#mob-bar-total').textContent = faMoney(lastTotal);
  document.body.classList.toggle('cart-open', lastCount > 0);
  // نوار فقط وقتی سبد پر است و کاربر در بخش سفارش نیست نمایش داده می‌شود
  bar.classList.toggle('show', lastCount > 0 && !orderSectionInView);
}
// از رندر سبد صدا زده می‌شود تا ارقام نوار همیشه دقیق بماند
function syncMobileBar(count, total) {
  lastCount = count;
  lastTotal = total;
  refreshMobileBar();
}
// وقتی کاربر به بخش سفارش می‌رسد، نوار چسبان پنهان می‌شود (خود بخش دیده می‌شود)
new IntersectionObserver(
  ([entry]) => {
    orderSectionInView = entry.isIntersecting;
    refreshMobileBar();
  },
  { threshold: 0.15 }
).observe($('#order'));

// کلیک‌های داخل سبد (افزایش/کاهش) با واگذاری رویداد
cartItemsEl.addEventListener('click', (e) => {
  const inc = e.target.closest('[data-inc]');
  const dec = e.target.closest('[data-dec]');
  if (inc) changeQty(inc.dataset.inc, +1);
  if (dec) changeQty(dec.dataset.dec, -1);
});

// دکمه‌های «افزودن به سفارش» روی کارت محصولات
$$('.add-btn').forEach((btn) => btn.addEventListener('click', () => addToCart(btn.dataset.product)));

// پاک کردن کل سبد
$('#clear-cart').addEventListener('click', () => {
  if (cart.size === 0) return;
  cart.clear();
  renderCart();
  showToast('سبد سفارش پاک شد');
});

/* ---------- تب‌های خرده / عمده ---------- */
const tabs = { retail: $('#tab-retail'), wholesale: $('#tab-wholesale') };
function setMode(mode) {
  orderMode = mode;
  Object.entries(tabs).forEach(([key, btn]) => {
    const active = key === mode;
    btn.setAttribute('aria-selected', String(active));
    btn.classList.toggle('text-saffron-800', active);
    btn.classList.toggle('bg-white', active);
    btn.classList.toggle('border-saffron-500', active);
    btn.classList.toggle('text-cocoa-500', !active);
    btn.classList.toggle('border-transparent', !active);
  });
  // نمایش شرایط عمده و فیلد نام مجموعه فقط در حالت عمده
  $('#wholesale-note').classList.toggle('hidden', mode !== 'wholesale');
  $('#shop-field').classList.toggle('hidden', mode !== 'wholesale');
  renderCart();
}
tabs.retail.addEventListener('click', () => setMode('retail'));
tabs.wholesale.addEventListener('click', () => setMode('wholesale'));

/* ---------- ۶) فرم سفارش: اعتبارسنجی + پیام واتساپ ---------- */
const form = $('#order-form');

// نمایش/پاک‌کردن خطای یک فیلد
function setFieldError(input, message) {
  const errEl = $(`[data-error-for="${input.id}"]`);
  if (errEl) {
    errEl.textContent = message || '';
    errEl.classList.toggle('visible', Boolean(message));
  }
  input.classList.toggle('input-error', Boolean(message));
}

// اعتبارسنجی فرم؛ در صورت موفقیت true برمی‌گرداند
function validateForm() {
  let ok = true;
  const name = $('#f-name');
  const phone = $('#f-phone');
  const city = $('#f-city');

  if (name.value.trim().length < 3) {
    setFieldError(name, 'لطفاً نام و نام خانوادگی را کامل وارد کنید.');
    ok = false;
  } else setFieldError(name, '');

  const phoneEn = enDigits(phone.value.trim()).replace(/[\s-]/g, '');
  if (!/^09\d{9}$/.test(phoneEn)) {
    setFieldError(phone, 'شماره موبایل معتبر وارد کنید (مثل ۰۹۱۲۳۴۵۶۷۸۹).');
    ok = false;
  } else setFieldError(phone, '');

  if (city.value.trim().length < 2) {
    setFieldError(city, 'نام شهر را وارد کنید.');
    ok = false;
  } else setFieldError(city, '');

  return ok;
}

// ساخت متن سفارش برای ارسال در واتساپ
function buildOrderMessage() {
  const totalUnits = [...cart.values()].reduce((a, b) => a + b, 0);
  const subtotal = [...cart.entries()].reduce((sum, [id, qty]) => sum + PRODUCTS[id].price * qty, 0);
  const rate = discountRate(totalUnits);
  const discount = Math.round(subtotal * rate);

  const lines = [];
  lines.push('🍨 سفارش جدید از وب‌سایت زعفرونی');
  lines.push(`نوع سفارش: ${orderMode === 'wholesale' ? 'عمده 📦' : 'خرده 🍨'}`);
  lines.push('──────────');
  let i = 1;
  cart.forEach((qty, id) => {
    lines.push(`${faDigits(i++)}) ${PRODUCTS[id].name} — ${faDigits(qty)} ${unitLabel()}`);
  });
  lines.push('──────────');
  lines.push(`جمع اقلام: ${faMoney(subtotal)}`);
  if (rate > 0) lines.push(`تخفیف عمده (${faDigits(rate * 100)}٪): − ${faMoney(discount)}`);
  lines.push(`مبلغ قابل پرداخت: ${faMoney(subtotal - discount)}`);
  lines.push('──────────');
  lines.push(`نام: ${$('#f-name').value.trim()}`);
  lines.push(`موبایل: ${faDigits(enDigits($('#f-phone').value.trim()))}`);
  if (orderMode === 'wholesale' && $('#f-shop').value.trim())
    lines.push(`کافه/فروشگاه: ${$('#f-shop').value.trim()}`);
  lines.push(`شهر: ${$('#f-city').value.trim()}`);
  if ($('#f-note').value.trim()) lines.push(`توضیحات: ${$('#f-note').value.trim()}`);
  return lines.join('\n');
}

// ارسال فرم: اعتبارسنجی، ساخت پیام و باز کردن واتساپ
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formError = $('#form-error');
  formError.classList.add('hidden');

  // بررسی خالی نبودن سبد
  if (cart.size === 0) {
    formError.textContent = 'سبد سفارش شما خالی است؛ حداقل یک محصول از بخش محصولات اضافه کنید.';
    formError.classList.remove('hidden');
    $('#products').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  // بررسی حداقل وزن سفارش عمده
  const totalKg = [...cart.values()].reduce((a, b) => a + b, 0);
  if (orderMode === 'wholesale' && totalKg < WHOLESALE_MIN_KG) {
    formError.textContent = `حداقل سفارش عمده ${faDigits(WHOLESALE_MIN_KG)} کیلوگرم است (مجموع فعلی شما: ${faDigits(totalKg)} کیلوگرم).`;
    formError.classList.remove('hidden');
    return;
  }

  if (!validateForm()) return;

  // ساخت لینک واتساپ با متن آماده و باز کردن آن
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage())}`;
  window.open(url, '_blank', 'noopener');
  showToast('در حال انتقال به واتساپ… 🍨');
});

// پاک شدن خطای فیلد هنگام تایپ
$$('#order-form .field-input').forEach((input) =>
  input.addEventListener('input', () => setFieldError(input, ''))
);

/* ---------- ۷) لینک‌های واتساپ شناور و دکمه‌ها ---------- */
const waDefaultUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MSG)}`;
['#whatsapp-float', '#whatsapp-cta', '#whatsapp-footer'].forEach((sel) => {
  const el = $(sel);
  if (el) el.href = waDefaultUrl;
});

/* ---------- رندر اولیه سبد ---------- */
renderCart();
