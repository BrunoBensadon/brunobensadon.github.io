# Claude Design — brief for brunobensadon.github.io

Paste the prompt below into **Claude Design**. It deliberately gives a rich picture of who Bruno is and a few hard constraints, then hands real creative authority over to the tool — we want its judgment and point of view, not a transcription of ours. Whatever it returns drops cleanly onto the existing `assets/css/style.css`, which is token-based.

---

## PROMPT (copy from here)

I'd like you to design — and improve on — a **personal website and project hub** for **Bruno Bensadon**. Treat this as a collaboration: I'm giving you who he is and a short list of things that can't change, and I genuinely want your design judgment on everything else. Push back on anything weak, propose ideas I haven't asked for, and tell me what to cut.

### Who he is
Bruno is an **economics undergraduate at FGV São Paulo (EESP)**, graduating in 2027. He's a **deliberate generalist** — the kind of person whose interests overlap rather than compete:

- **Training & youth leadership** is his deepest body of work. Within CISV (a global peace-education network) he is the **National Junior Representative** for Brazil, sits on an **international training-strategy committee**, has managed educational programmes and financial oversight, and designs and facilitates curricula. Themes: facilitation, program management, organizational development, peace education.
- **Research** in economics: trade and tax policy and applied methods — an econometric study of how U.S. tariffs move Brazilian exports, a conversational assistant for Brazil's tax reform, and a Scientific Initiation (PIC) project.
- **Photography** — a small, growing portfolio shot on Fujifilm.
- He's **multilingual** (Portuguese native; English and Spanish fluent), with side interests in music production. He has programmed since childhood — but treat coding as *one supporting craft among several*, never the headline.

**Tone of the person, and of the site:** literate, understated, unhurried. He believes the work should speak for itself, so copy is **austere** — short, plain, never performative. The challenge is making an eclectic range of pursuits feel like **one coherent, credible person**, not a scattered résumé.

### What can't change (everything else is yours)
1. **Bilingual EN / Brazilian-Portuguese**, with a header toggle that remembers the choice. Design for PT running ~15–20% longer than EN.
2. Ships as **static HTML/CSS + a little vanilla JS** for **GitHub Pages** — no framework, no build step, no dependencies beyond Google Fonts.
3. Must cover five surfaces: **Home/About, Research, Training, Photography, and CV & Contact.** Photography needs room to grow into a real gallery.
4. **Accessible (WCAG AA), responsive, fast**, and quiet enough that the photography can carry visual weight when it arrives.

### Where I want your judgment
- **Aesthetic direction.** Our working hypothesis is a *"paper-like academic"* feel — warm paper, typeset serif, hairline rules, restrained accent. Treat that as a *starting point, not a mandate*: refine it, reinterpret it, or argue for something better and show me why. Own the type system, palette, spacing, grid, and motion.
- **Information architecture.** Is five surfaces right? Should the home page lead with an index, a statement, an image, or something else? Improve it.
- **A signature idea.** Propose one tasteful detail that gives the site a point of view without breaking the restraint (a margin-note column, a footnote motif, a film-frame caption style, a letterpress rule — or your own invention).
- **Editing.** Suggest where copy should be even shorter, and what to remove entirely.

### Deliverables
- A cohesive **visual system** (type scale, color tokens as CSS custom properties, spacing, the treatment of headers, tags, links, buttons, the portrait, captions).
- **Layout concepts** for all five surfaces, desktop and mobile — with special care for the home page and the future photography gallery + lightbox.
- A **short rationale** for your big choices, and your signature idea.
- Keep it implementable in plain CSS.

**Tone words:** considered, literate, warm-minimal, credible, unhurried.
**Please avoid:** corporate gradients, glassmorphism, neon, heavy drop-shadows, dark-mode-by-default, generic portfolio-template feel, and any framing that makes coding or "AI" the headline.

## (end prompt)

---

### After Claude Design returns
Hand the concept back here and I'll implement it against the current files (`assets/css/style.css` is the single source of visual truth, so a token-based concept drops in cleanly).
