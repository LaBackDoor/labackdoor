# la backdoor design system

Identity: **terminal noir, editorial layout**. A calm, dense, readable page that keeps the
hacker personality in small, deliberate touches (mono eyebrows, `$` prompts, phosphor accent,
hairline borders). Never default-looking, never decorative for its own sake.

All UI uses the tokens in `src/app/globals.css` and the components in `src/components/ui/`.
No inline colours, no one-off font sizes, no new spacing numbers. If a pattern is missing, add
it here and to `globals.css`, then use it.

## Tokens

| Group | Tokens |
| --- | --- |
| Surface | `--bg`, `--bg-elev`, `--bg-sunk`, `--border`, `--border-strong` |
| Text | `--fg`, `--fg-muted`, `--fg-faint` |
| Accent | `--accent` (phosphor green / forest), `--accent-2` (link blue), `--accent-soft` (tint), `--gold` (awards) |
| Type | `--font-sans` Inter, `--font-mono` JetBrains Mono; scale `--fs-xs 12` `--fs-sm 14` `--fs-md 16` `--fs-lg 20` `--fs-xl 28` `--fs-2xl 40` `--fs-hero clamp(36px,6vw,64px)` |
| Space (4pt) | `--s-1 4` `--s-2 8` `--s-3 12` `--s-4 16` `--s-5 24` `--s-6 32` `--s-7 48` `--s-8 72` |
| Radius | `--r-sm 6` `--r-md 10` `--r-lg 16` `--r-pill 999` |
| Elevation | borders first; `--shadow-sm`, `--shadow-md` only on hover or overlays |
| Motion | `--t-fast 120ms`, `--t-med 200ms`, ease-out; disabled under `prefers-reduced-motion` |

Colour distribution is 60-30-10: surfaces 60, text and borders 30, accent 10. Accent marks
action and status only.

## Layout

`.container` max 1080px, 16px gutter (24px at 720px+). `.container-narrow` 760px for prose.
`.section` is a vertical block with `--s-8` rhythm and an `.eyebrow` heading. `.grid-cards` is
an auto-fit grid (min 280px). One `h1` per page.

## Components (`src/components/ui`)

| Component | Use |
| --- | --- |
| `Section` | Titled page block: eyebrow (`$ cmd`), heading, optional "view all" link |
| `Hero` | Home hero: name, role line, availability pill, CTA row, stat strip |
| `ButtonLink` | `primary`, `secondary`, `ghost`; verb-first labels |
| `Card` | Bordered surface, optional media, hover lift, whole-card link |
| `Badge` | Mono pill for tags, status (`accent`, `gold`, `muted`) |
| `Stat` | Big number and label for impact metrics |
| `Timeline` / `TimelineItem` | Year-led rail for awards, talks, experience |
| `AwardCard` | Place badge, title, issuer, year, note |
| `TalkCard` | Venue, date, type badge, abstract, slides and video links |
| `Prompt` | Mono `$ command` line used as page subtitle |

## Rules

1. Hierarchy: one `h1`, section eyebrows in mono, headings in sans 600.
2. Every interactive element has a visible `:focus-visible` ring (2px accent, 2px offset).
3. Touch targets are at least 40px tall on mobile. Layouts must work at 375px with no
   horizontal scroll.
4. Buttons start with a verb (Download CV, View Slides, Email Me).
   Headings, buttons, pills, badges, stat labels and nav use Title Case ("Open to Summer 2027 Internships · Detection & Response, AI Security"). Only running prose stays sentence case.
5. Both themes are first class. Test light and dark for every new component.
6. Motion is limited to colour, opacity and 2px translate on hover; none under reduced motion.
7. Prefer real pages and links over iframes and overlays.
