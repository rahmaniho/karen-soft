(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-nav');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    mobileMenu.hidden = !willOpen;
    document.body.classList.toggle('menu-open', willOpen);
  });
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 1000) closeMenu(); });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    reveals.forEach((element) => observer.observe(element));
  }

  const faqItems = document.querySelectorAll('.accordion details');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach((other) => { if (other !== item) other.open = false; });
    });
  });

  const persianDigits = (value) => String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[digit]);
  const year = document.getElementById('year');
  if (year) {
    const gregorianYear = new Date().getFullYear();
    year.textContent = persianDigits(gregorianYear - 621);
  }

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const requiredFields = [...form.querySelectorAll('[required]')];
    requiredFields.forEach((field) => field.classList.toggle('invalid', !field.value.trim()));
    const firstInvalid = requiredFields.find((field) => !field.value.trim());
    if (firstInvalid) {
      status.textContent = 'لطفاً فیلدهای ضروری را کامل کنید.';
      status.className = 'form-status error';
      firstInvalid.focus();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const original = button.innerHTML;
    button.disabled = true;
    button.textContent = 'در حال ارسال...';
    status.textContent = '';
    status.className = 'form-status';

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: new FormData(form)
      });
      const data = await response.json();
      if (!response.ok || data.status !== 'success') throw new Error(data.message || 'خطا در ارسال درخواست');
      status.textContent = data.message || 'درخواست شما ثبت شد؛ به‌زودی با شما تماس می‌گیریم.';
      status.className = 'form-status success';
      form.reset();
    } catch (error) {
      status.textContent = error.message || 'ارسال انجام نشد. لطفاً با شماره ۰۹۱۵۲۵۲۱۱۶۶ تماس بگیرید.';
      status.className = 'form-status error';
    } finally {
      button.disabled = false;
      button.innerHTML = original;
    }
  });
})();
