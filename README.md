# Jamillah Ssozi — Portfolio

Personal portfolio for Jamillah Ssozi, Software Engineer (Backend, Full-Stack & AI).
Built with Next.js (App Router), TypeScript and Tailwind CSS. Deployed at
https://jamillah-ssozi.netlify.app.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build, every route is prerendered
npm run lint
npm run typecheck
```

## Where things live

| Path | What it holds |
|---|---|
| `content/` | Every fact on the site: profile, experience, projects, skills, certifications |
| `content/projects.ts` | Case studies and their architecture diagram specs |
| `app/page.tsx` | Homepage: Hero, About, Experience, Projects, Skills, Contact |
| `app/projects/[slug]/` | Case-study template, statically generated per project |
| `components/home/` | One component per homepage section |
| `components/diagrams/` | SVG diagram renderer and the interactive Darkroom explorer |
| `app/globals.css` | Design tokens (light, dark and the violet `.night` scope) |
| `lib/brand.ts` | The few brand values used outside CSS: share image, favicon, browser theme colour |

To change what the site says, edit `content/`. Components only render it.

## Adding a project

Add an entry to `projects` in `content/projects.ts`. The case-study page, sitemap
entry and homepage row are generated from it. Architecture diagrams are
`DiagramSpec` objects: boxes positioned on a fixed canvas, and edges drawn as
polylines between them, so a diagram can be adjusted without design tools.

## Colour system

Violet is the neutral, orange is the only accent, lavender is the structure. Every
violet shares one hue (that of `#231942`), so blues and pinks never drift apart, and
the neutrals carry a trace of warmth so they sit with the orange and the portrait.

| Token | Light | Dark | Use it for |
|---|---|---|---|
| `paper` / `paper-raised` / `paper-sunk` | `#FAF5F7` / `#FFFFFF` / `#F1ECF2` | `#120D24` / `#1A152D` / `#221D36` | Page, cards, section bands |
| `ink` / `ink-soft` / `ink-faint` | `#231942` / `#484168` / `#655F82` | `#F3EEF4` / `#D0CBDA` / `#A6A0B9` | Headings, body, metadata |
| `line` / `line-strong` | `#DED8E1` / `#807B9C` | `#332F48` / `#7A7596` | Dividers / control borders (3:1) |
| `accent` + `on-accent` | `#EE5702` + `#231942` | `#FB6107` + `#231942` | Buttons, awards, large orange type, marks, focus |
| `lavender` / `lavender-soft` | `#6B578F` / `#EEE6F1` | `#BBAADE` / `#312941` | Section numbers, list markers, tags, diagram boxes |

There is one orange per theme. In light mode it passes 3:1 on every surface, so it is
used for large type, fills and graphics, never for small text. Orange means "act" or
"this is proof"; anything else is lavender. `.night` is the violet `#231942` scope used
by the hero cover, the contact block, the footer and the monogram, in both themes.

## Accessibility

- Semantic landmarks, a skip link and a visible focus ring everywhere.
- Colour tokens meet WCAG AA contrast in both themes.
- Diagrams have a title and description for screen readers, plus a
  "read as a list" alternative on every case study.
- The Darkroom explorer follows the ARIA tabs pattern, including arrow keys.
- Motion is limited to reveal-on-scroll and hover, and is disabled under
  `prefers-reduced-motion`. Content is visible without JavaScript.

axe-core reports no violations on any page, in either theme, at desktop or
mobile widths.
