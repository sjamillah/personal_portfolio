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

## Visual system

**Colour.** Forest green and orange, tuned to the portrait: the green family
shares the hue of `#0A3200` (the jacket), the warm sand band echoes the studio
backdrop, and orange is the single accent.

| Token | Light | Dark | Use it for |
|---|---|---|---|
| `paper` / `paper-sunk` | `#F9F8F3` / `#F8F0E2` | `#091407` / `#0A3200` | Page / the hero, experience and contact bands |
| `ink` / `ink-soft` / `ink-faint` | `#0A3200` / `#424F3F` / `#5F6A5C` | `#F2F0E7` / `#CCCDBF` / `#A5AB96` | Headings, body, metadata |
| `brand` + `on-brand` | `#0A3200` + `#F9F8F3` | `#90D280` + `#0A3200` | Buttons and the monogram |
| `accent` | `#EE5B00` | `#F7721A` | The headline italic, stars, markers, focus. Large type and graphics only |
| `green` | `#396C2C` | `#90D280` | Numbering and small structural accents |
| `line` / `line-strong` | `#DADACF` / `#758272` | `#2C3A29` / `#768672` | Hairlines / control borders (3:1) |

Green fills, orange marks. Text never sits on an orange fill, so buttons are green
and orange is reserved for emphasis. Every pair meets WCAG AA; orange meets 3:1
on every surface.

**Type.** Newsreader (an editorial serif designed for screens) for headings,
Geist for text and interface, and Geist Mono only inside architecture diagrams.

**Layout.** Open typography over components: hairline rules and whitespace
instead of cards, plain lists instead of pills.

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
