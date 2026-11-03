
function karensoftA11y(fn) {
  const run = () => { try { fn(document); } catch (e) { /* demo keeps working */ } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();
  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-hidden"] });
}

karensoftA11y(function (doc) {
  doc.querySelectorAll("dl").forEach(function (dl) {
    if (dl.dataset.karensoftDl === "1") return;
    var groups = [];
    Array.from(dl.children).forEach(function (wrapper) {
      var dt = wrapper.querySelector("dt");
      var dd = wrapper.querySelector("dd");
      if (!dt || !dd) return;
      var group = document.createElement("div");
      var icon = wrapper.querySelector("div:first-child");
      if (icon && icon !== dt.parentElement) dt.prepend(icon);
      group.appendChild(dt);
      group.appendChild(dd);
      groups.push(group);
    });
    if (groups.length) {
      dl.replaceChildren.apply(dl, groups);
      dl.dataset.karensoftDl = "1";
    }
  });
});
