# brunobensadon.github.io

Personal website and project hub for **Bruno Bensadon** — economics, data & AI,
youth-leadership training, and photography. Bilingual (EN / PT-BR), paper-like
academic design, no build step.

## Stack
- Plain **HTML + CSS + a little vanilla JS** — no framework, no bundler.
- Fonts: **Spectral** (serif) + **IBM Plex Mono** (metadata), via Google Fonts.
- Hosted on **GitHub Pages** (served straight from `main`).

## Structure
```
index.html          About / Home + Curriculum & Contact  (v1 — built)
research.html        Research index (3 projects seeded)   (scaffold)
training.html        Training & facilitation              (scaffold)
photography.html     Photography portfolio                (coming soon)
assets/
  css/style.css      Design system (all visual tokens live here)
  js/main.js         Language toggle, nav, scroll reveals
  img/               portrait + favicon (web-optimized)
cv/                  CV in PDF + .docx
CLAUDE_DESIGN_PROMPT.md   Brief to push the design further in Claude Design
```

## Bilingual content
Every translatable element ships both languages inline:
```html
<span class="en">Research</span><span class="pt">Pesquisa</span>
```
CSS shows only the active language based on `<html data-lang="en|pt">`.
`assets/js/main.js` flips `data-lang`, remembers the choice in `localStorage`,
and defaults to the browser language. **To add content, always add both `.en`
and `.pt` spans.**

## Editing tips
- All colors, type and spacing are CSS variables at the top of `style.css`.
- New page? Copy a scaffold page (e.g. `training.html`) — it already has the
  nav, language toggle and footer wired up. Set `aria-current="page"` on its nav link.
- Replace the portrait at `assets/img/portrait.jpg` (+ `@2x`); keep the 4:5 ratio.
- Photography: drop web-optimized images into `assets/img/` (long edge ≈ 1600px,
  quality ~82, EXIF stripped) and build a gallery grid in `photography.html`.

## Roadmap
- [ ] Research: full write-ups, abstracts, repo + paper links
- [ ] Training: downloadable session outlines & curricula
- [ ] Photography: curated, optimized gallery with lightbox
- [ ] Optional: dark "night paper" theme (tokens are already centralized)

## Local preview
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
