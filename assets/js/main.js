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

  /* ---------- 6. Gallery from manifest ----------
     A .gallery[data-manifest] is built at runtime from a Markdown table
     (file | place | year | caption). This keeps photo management to a single
     .md file — no HTML editing. See assets/img/photography/photos.md. */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function parseManifest(text) {
    var rows = [];
    text.split(/\r?\n/).forEach(function (line) {
      if (line.indexOf("|") === -1) return;            // not a table row
      var cells = line.split("|").map(function (c) { return c.trim(); });
      if (cells[0] === "") cells.shift();              // leading pipe
      if (cells.length && cells[cells.length - 1] === "") cells.pop(); // trailing pipe
      if (cells.length < 4) return;
      var file = cells[0];
      if (file.toLowerCase() === "file" || /^:?-+:?$/.test(file)) return; // header / divider
      rows.push({ file: file, place: cells[1], year: cells[2], caption: cells[3] });
    });
    return rows;
  }

  function buildGallery(gallery, rows) {
    var dir = gallery.getAttribute("data-manifest").replace(/[^\/]*$/, ""); // manifest folder
    gallery.innerHTML = rows.map(function (r, i) {
      var n = String(i + 1).padStart(2, "0");
      var placeYear = r.place + (r.year ? " · " + r.year : "");
      return '<button class="plate-item" type="button"' +
        ' data-full="' + esc(dir + r.file + "-full.jpg") + '"' +
        ' data-n="' + n + '" data-caption="' + esc(r.caption) + '">' +
          '<span class="shot"><img src="' + esc(dir + r.file + "-display.jpg") +
            '" loading="lazy" alt="' + esc(r.caption) + '"></span>' +
          '<figcaption class="plate"><span class="n">Pl. ' + n + '</span> ' +
            '<span class="place">' + esc(placeYear) + '</span></figcaption>' +
        '</button>';
    }).join("");
  }

  var gallery = document.querySelector(".gallery[data-manifest]");
  if (gallery) {
    fetch(gallery.getAttribute("data-manifest"))
      .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
      .then(function (text) { buildGallery(gallery, parseManifest(text)); initLightbox(); })
      .catch(function () { /* leave gallery empty; the note below still invites email */ });
  } else {
    initLightbox();
  }

  /* ---------- 7. Lightbox ---------- */
  function initLightbox() {
    var lb = document.getElementById("lightbox");
    if (!lb) return;
    var items = Array.prototype.slice.call(document.querySelectorAll(".plate-item"));
    if (!items.length) return;
    var stageImg = lb.querySelector(".lb-stage img");
    var capN = lb.querySelector(".lb-cap .n");
    var capPlace = lb.querySelector(".lb-cap .place");
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
      var caption = el.getAttribute("data-caption") || "";
      var n = el.getAttribute("data-n") || String(i + 1).padStart(2, "0");
      stageImg.classList.remove("swap");
      // force reflow to retrigger the swap animation
      void stageImg.offsetWidth;
      stageImg.src = full;
      stageImg.alt = caption;
      stageImg.classList.add("swap");
      capN.textContent = "Pl. " + n;
      capPlace.textContent = caption;
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
