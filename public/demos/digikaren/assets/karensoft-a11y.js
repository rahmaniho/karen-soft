
function karensoftA11y(fn) {
  const run = () => { try { fn(document); } catch (e) { /* demo keeps working */ } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();
  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-hidden"] });
}

karensoftA11y(function (doc) {
  doc.querySelectorAll(".assurances").forEach(function (el) {
    if (el.scrollWidth > el.clientWidth + 1) {
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "region");
      el.setAttribute("aria-label", "مزایای خرید از دیجی‌کارن");
    }
  });
});
