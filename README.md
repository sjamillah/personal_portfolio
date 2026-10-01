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

Violet is the neutral, orange is the signal, lavender is the structure.

| Token | Light | Dark | Use it for |
|---|---|---|---|
| `paper` / `paper-raised` / `paper-sunk` | `#F7F5FA` / `#FFFFFF` / `#EFEBF6` | `#140F26` / `#1D1636` / `#271E47` | Page, cards, section bands |
| `ink` / `ink-soft` / `ink-faint` | `#231942` / `#463D6B` / `#665D8A` | `#F5EEF4` / `#D0C6DF` / `#A398C2` | Headings, body, metadata |
| `line` / `line-strong` | `#DDD6EA` / `#837AA8` | `#342A5C` / `#7F74AE` | Dividers / control borders (3:1) |
| `signal` + `on-signal` | `#FB6107` + `#231942` | same | Fills only: primary actions, awards, selection |
| `accent-display` | `#EA5600` | `#FB6107` | Large orange text (3:1 at display size) |
| `accent` | `#B84500` | `#FF7A2E` | Small orange text, active states, focus ring, data marks |
| `lavender` / `lavender-soft` | `#6E4F93` / `#E8DDF1` | `#BE95C4` / `#3A2C5E` | Section numbers, list markers, tags, diagram boxes |

Orange means "act" or "this is proof". If something is orange and is neither, it
should probably be lavender. `.night` (contact and footer) is violet `#231942` in
both themes.

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
