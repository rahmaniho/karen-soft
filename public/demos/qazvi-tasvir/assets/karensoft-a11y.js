
function karensoftA11y(fn) {
  const run = () => { try { fn(document); } catch (e) { /* demo keeps working */ } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();
  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-hidden"] });
}

karensoftA11y(function (doc) {
  var drawer = doc.getElementById("mobile-drawer");
  if (drawer) {
    if (drawer.getAttribute("aria-hidden") === "true") drawer.setAttribute("inert", "");
    else drawer.removeAttribute("inert");
  }
  doc.querySelectorAll("a.top-bar__phone-link[aria-label]").forEach(function (el) { el.removeAttribute("aria-label"); });
});
