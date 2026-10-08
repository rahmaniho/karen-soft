/** Keep the original inbound URLs alive without serving legacy scripts/styles. */
export const legacyRedirects = [
  ["/index.html", "/"], ["/contact.html", "/contact"],
  ["/products.html", "/products"], ["/portfolio.html", "/portfolio"],
  ["/print.html", "/print"], ["/blog.html", "/blog"],
  ["/blog/index.html", "/blog"], ["/blog/archive.html", "/blog"],
  ["/law-office.html", "/products/law-office"],
  ["/taxi.html", "/demo/taxi-management"],
  ["/download-law-software.html", "/download-law-software"],
  // نمونه‌کارهای حذف‌شده (سالن زیبایی قبلی) به فهرست نمونه‌کارها هدایت می‌شوند.
  ["/najafisahar.html", "/portfolio"], ["/saharnajafi.html", "/portfolio"],
  ["/najafisahar", "/portfolio"], ["/saharnajafi", "/portfolio"],
  ["/portfolio/najafisahar", "/portfolio"], ["/portfolio/sahar-najafi-nails", "/portfolio"],
  ["/blog/automation.html", "/blog/office-automation"],
  ["/blog/direct_to_cell.html", "/blog/direct-to-cell"],
  ["/blog/growth-strategies.html", "/blog/growth-strategies"],
  ["/blog/law-management.html", "/blog/legal-case-management"],
  ["/blog/online-store.html", "/blog/online-store"],
  ["/blog/remote-teams.html", "/blog/remote-teams"],
  ["/blog/security.html", "/blog/security"],
  ["/blog/smart-case-management.html", "/blog/smart-case-management"],
  ["/blog/taxi.html", "/blog/taxi-management"],
  ["/blog/why-lawyer-needs-website.html", "/blog/why-lawyer-needs-website"],
] as const;
