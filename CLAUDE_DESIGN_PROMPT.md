# Claude Design — brief for brunobensadon.github.io

Paste the prompt below into **Claude Design** (or any strong design/codegen tool)
when you want to push the visual direction further than the shipped v1. It is
written to produce an art-directed concept you can then hand back to me to
implement against the existing codebase.

---

## PROMPT (copy from here)

You are designing a **personal website and project hub** for **Bruno Bensadon**, an
economics undergraduate at FGV-SP (São Paulo) who works at the **intersection of
economics, data and AI**, is a **youth-leadership trainer** in CISV's global
network, and is a **photographer**. He is a deliberate generalist — "jack of all
trades" — and the site must make an eclectic range of interests feel *coherent and
serious*, not scattered.

**Goal:** a clean, professional, timeless personal site that an Itaú recruiter, an
academic, and a photo editor would each respect. It is linked from his CV.

**Aesthetic direction — "paper-like academic":**
- Warm off-white paper background, near-black warm ink, a single restrained accent
  (oxblood / brick red). Think a beautifully typeset journal or a Tufte/Edward-Tufte
  handout, not a SaaS landing page.
- Serif for headings and body (reference: Spectral, Source Serif 4, or Freight
  Text). Monospace (IBM Plex Mono) only for metadata: kickers, dates, tags, section
  numbers.
- Hairline rules, generous margins, numbered sections (01 / 02), small-caps mono
  eyebrows. Quiet by default so **photography pops** against it.
- Motion is subtle: soft fade/slide-ins, link underline transitions. Respect
  `prefers-reduced-motion`.

**Hard constraints:**
- **Bilingual EN / PT-BR** with a header toggle (persisted). Design must accommodate
  text expansion (PT runs ~15–20% longer).
- Ships as **static HTML/CSS + minimal vanilla JS** for **GitHub Pages** — no
  framework, no build step, no external deps beyond Google Fonts.
- Fully responsive; excellent typography on mobile; AA contrast; keyboard accessible.

**Information architecture (5 surfaces):**
1. **Home / About** — name, one-line positioning ("Economics · Data · AI"), a short
   bio, a professional portrait (4:5), and an **index of areas** linking out.
2. **Research** — applied-AI + economics work: a Reforma Tributária NLP chatbot
   (Python/RAG), an econometric study of Brazilian coffee & auto-parts exports vs
   U.S. tariffs (R), and a Scientific Initiation (PIC) project. Each needs: title,
   abstract, methods/tags, links to code + PDF.
3. **Training** — CISV facilitation & curriculum design: sessions led, curricula
   delivered (Essentials of Peace Education), authored templates; downloadable
   materials.
4. **Photography** — a quiet, image-forward gallery (Fujifilm work) with a lightbox;
   must coexist with the academic tone without feeling like a different website.
5. **Curriculum & Contact** — CV highlights, PDF/DOCX download, email, LinkedIn
   (/in/brunobensadon), GitHub (@brunobensadon), São Paulo.

**Deliverables I want from you:**
- A cohesive **visual system**: type scale, color tokens, spacing scale, the
  treatment of section headers, tags/eyebrows, links, buttons, and the portrait
  frame.
- **Layout concepts** for all 5 surfaces above (desktop + mobile), with special
  attention to (a) the home "areas index" and (b) the photography gallery + lightbox.
- A proposal for **one tasteful signature detail** that gives the site personality
  without breaking the academic restraint (e.g. a footnote motif, a margin-note
  column, a letterpress-style section rule, a film-frame caption style).
- Keep it implementable in plain CSS. Output tokens as CSS custom properties.

**Tone words:** considered, literate, warm-minimal, credible, unhurried.
**Avoid:** corporate gradients, glassmorphism, neon, heavy drop-shadows, dark-mode-
by-default, generic portfolio-template feel.

## (end prompt)

---

### After Claude Design returns
Hand the concept back here and I'll implement it against the current files
(`assets/css/style.css` is the single source of visual truth, so a token-based
concept drops in cleanly).
