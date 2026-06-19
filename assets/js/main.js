/* Bruno Bensadon — site behavior (vanilla, no deps) */
(function () {
  "use strict";

  /* ---------- Language ---------- */
  var STORE = "bb-lang";
  var root = document.documentElement;

  function preferred() {
    try {
      var saved = localStorage.getItem(STORE);
      if (saved === "en" || saved === "pt") return saved;
    } catch (e) {}
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("pt") === 0 ? "pt" : "en";
  }

  function setLang(lang, persist) {
    if (lang !== "en" && lang !== "pt") lang = "en";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    // update any title that carries data-title-en / data-title-pt
    var t = document.querySelector("title");
    if (t && t.getAttribute("data-" + lang)) document.title = t.getAttribute("data-" + lang);
    // toggle buttons state
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    if (persist) { try { localStorage.setItem(STORE, lang); } catch (e) {} }
  }

  // apply ASAP (data-lang may already be set inline to avoid flash)
  setLang(root.getAttribute("data-lang") || preferred(), false);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".lang-toggle button");
    if (btn) { setLang(btn.dataset.lang, true); }
  });

  /* ---------- Sticky nav border on scroll ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links.collapsible");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
