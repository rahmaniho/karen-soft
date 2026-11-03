
function karensoftA11y(fn) {
  const run = () => { try { fn(document); } catch (e) { /* demo keeps working */ } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();
  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-hidden"] });
}

karensoftA11y(function (doc) {
  doc.querySelectorAll(".stars[aria-label]").forEach(function (el) { el.setAttribute("role", "img"); });
  doc.querySelectorAll("a.brand[aria-label], button.split__panel[aria-label], a.coach-card__ig[aria-label], a.ks-credit[aria-label], a.scroll-cue[aria-label]").forEach(function (el) {
    el.removeAttribute("aria-label");
  });
});
