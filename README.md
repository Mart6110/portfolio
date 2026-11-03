# Portfolio

Personal portfolio and CV for Martinus Mortensen, in English and Danish, with light and dark themes.

Built with Next.js 16, React 19, Tailwind CSS v4 and [SmoothUI](https://smoothui.dev) components on its orange theme.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` makes a production build and `npm run lint` runs ESLint.

## Where things live

| Path | What |
| --- | --- |
| `src/lib/i18n/dictionary.ts` | All page text, in English and Danish (CV, skills, section titles) |
| `src/lib/projects.ts` | The projects shown in the Projects section, with both translations |
| `src/app/globals.css` | Theme tokens. Brand colors are `--brand*`; `--brand-strong` is the darker shade for orange text |
| `src/components/` | One component per section, plus `Section`, `Timeline` and `Reveal` (scroll-in fade) |
| `src/components/CodeGlobe.tsx` | The rotating word globe in the hero, drawn on a canvas in the `--brand` color |
| `src/components/smoothui/` | SmoothUI components (see below) |

To add a project, append it to `projects` in `src/lib/projects.ts`. The filter tabs and their counts follow from each project's `category`. A project with a `screenshot` (light and dark WebP files in `public/projects/`, 1440×900) is also shown large in the Featured list above the tabs.

## Intro and cursor

- `src/app/page.tsx` runs the page preloader (the "words" variant) for 1.8 s, then lifts it. It is controlled rather than self-timed so the hero can start its entrance as the panel lifts; `HeroSection` and its `Reveal`s take a `ready` prop for that. With reduced motion it lifts at once.
- `src/components/CustomCursor.tsx` replaces the system cursor with a dot and a trailing ring, for a mouse only. Touch, pen and reduced-motion users keep the system cursor. It adds the `custom-cursor` class to `<html>` while it's on screen, which is what hides the system cursor (`globals.css`).

## Theme

The theme is the `data-theme` attribute on `<html>` (`light` or `dark`), stored in `localStorage` under `theme` and otherwise taken from the system setting. An inline script in `layout.tsx` sets it before first paint, and Tailwind's `dark:` variant is keyed to it in `globals.css`.

## SmoothUI

SmoothUI is a shadcn registry, configured in `components.json` as `@smoothui`. Components are copied into `src/components/smoothui/` and excluded from linting, because `shadcn add` overwrites local edits. So don't edit them in place; wrap or style them from outside. To add one:

```bash
npx shadcn@latest add @smoothui/<name>
```

Used here: floating-navbar, drawer, theme-toggle, toggle-group, tabs, smooth-button, badge, glow-hover-card, soft-blur-in, button-copy, scroll-progress, page-preloader, parallax-layers (hero background) and scroll-image-reveal (Featured screenshots), plus the theme-orange tokens.

Things to know when building on them:

- `GlowHover` draws its glow by rendering a second copy of every card in an `aria-hidden` overlay. Cards with links must make that copy `inert`, or its links end up in the tab order. `ProjectCard` does this by checking for the `glow-overlay-item` class GlowHover adds.
- `SoftBlurIn` turns every character into an inline-block, so text can wrap mid-word. The hero animates word by word inside no-wrap spans to avoid that.
- `ScrollImageReveal` makes the image 2 × `parallax` taller than its frame, so with `object-cover` a frame of the screenshot's own aspect ratio crops its sides. The Featured frames are 48px (2 × 24) shorter than 16:10 to keep the whole screenshot width; change both numbers together.
- The preloader's word is restyled from outside with arbitrary variants on its `className` (larger, dark ink on orange). Re-adding `page-preloader` with `shadcn add` can change the class names those target.
