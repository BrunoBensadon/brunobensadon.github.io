/* =================================================================
   Bruno Bensadon — site behaviour. Vanilla JS, no dependencies.
   ================================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var STORE = "bb-lang";

  /* ---------- 1. Language ---------- */
  function preferred() {
    try {
      var saved = localStorage.getItem(STORE);
      if (saved === "en" || saved === "pt") return saved;
    } catch (e) {}
    return (navigator.language || "en").toLowerCase().indexOf("pt") === 0 ? "pt" : "en";
  }

  function setLang(lang, persist) {
    if (lang !== "en" && lang !== "pt") lang = "en";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    var t = document.querySelector("title");
    if (t && t.getAttribute("data-" + lang)) document.title = t.getAttribute("data-" + lang);
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    if (persist) { try { localStorage.setItem(STORE, lang); } catch (e) {} }
  }

  setLang(root.getAttribute("data-lang") || preferred(), false);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".lang-toggle button");
    if (btn) setLang(btn.dataset.lang, true);
  });

  /* ---------- 2. Sticky-nav hairline ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 6); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 3. Mobile nav ---------- */
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

  /* ---------- 4. Reveal on scroll ----------
     Simple, dependency-free, and resilient: reveal anything within the
     viewport on load/scroll/resize, with a failsafe so content is never
     left hidden. CSS handles prefers-reduced-motion. */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reveals.length) {
    var checkReveals = function () {
      var h = window.innerHeight || document.documentElement.clientHeight;
      for (var i = reveals.length - 1; i >= 0; i--) {
        var el = reveals[i];
        var r = el.getBoundingClientRect();
        if (r.top < h * 0.92 && r.bottom > 0) {
          el.classList.add("in");
          reveals.splice(i, 1);
        }
      }
    };
    checkReveals();
    window.addEventListener("scroll", checkReveals, { passive: true });
    window.addEventListener("resize", checkReveals);
    window.addEventListener("load", checkReveals);
    // failsafe: force the end-state so content is never left hidden,
    // even if the compositor throttles the entrance transition.
    setTimeout(function () {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.style.transition = "none";
        el.classList.add("in");
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }, 900);
  }

  /* ---------- 5. Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- 6. Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var items = Array.prototype.slice.call(document.querySelectorAll(".plate-item"));
    var stageImg = lb.querySelector(".lb-stage img");
    var capN = lb.querySelector(".lb-cap .n");
    var capEn = lb.querySelector(".lb-cap .place .en");
    var capPt = lb.querySelector(".lb-cap .place .pt");
    var counter = lb.querySelector(".lb-count");
    var btnPrev = lb.querySelector(".lb-prev");
    var btnNext = lb.querySelector(".lb-next");
    var btnClose = lb.querySelector(".lb-close");
    var current = -1;
    var lastFocus = null;

    function render(i) {
      var el = items[i];
      if (!el) return;
      var full = el.getAttribute("data-full");
      var en = el.getAttribute("data-en") || "";
      var pt = el.getAttribute("data-pt") || en;
      var n = el.getAttribute("data-n") || String(i + 1).padStart(2, "0");
      stageImg.classList.remove("swap");
      // force reflow to retrigger the swap animation
      void stageImg.offsetWidth;
      stageImg.src = full;
      stageImg.alt = (root.getAttribute("data-lang") === "pt" ? pt : en);
      stageImg.classList.add("swap");
      capN.textContent = "Pl. " + n;
      capEn.textContent = en;
      capPt.textContent = pt;
      counter.textContent = String(i + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0");
      current = i;
    }

    function open(i) {
      lastFocus = document.activeElement;
      render(i);
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      btnClose.focus();
      document.addEventListener("keydown", onKey);
    }
    function close() {
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function next() { render((current + 1) % items.length); }
    function prev() { render((current - 1 + items.length) % items.length); }

    function onKey(e) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Tab") {
        // simple focus trap across the lightbox controls
        var f = [btnClose, btnPrev, btnNext];
        var idx = f.indexOf(document.activeElement);
        e.preventDefault();
        var dir = e.shiftKey ? -1 : 1;
        f[(idx + dir + f.length) % f.length].focus();
      }
    }

    items.forEach(function (el, i) {
      el.addEventListener("click", function () { open(i); });
    });
    btnNext.addEventListener("click", next);
    btnPrev.addEventListener("click", prev);
    btnClose.addEventListener("click", close);
    lb.addEventListener("click", function (e) {
      // click on the backdrop (not the image) closes
      if (e.target === lb || e.target.classList.contains("lb-stage")) close();
    });
  }
})();
