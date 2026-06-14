# la backdoor — Portfolio & Lab Website Design

**Date:** 2026-06-14
**Status:** Approved (design phase)

## Overview

A personal portfolio and security-lab website for **la backdoor** (systems & malware
research, AI security, IDS). The signature experience is a **terminal-first homepage**:
an interactive, real-feeling shell ("the desktop") that visitors can navigate with
`ls`, `cd`, `cat`, `open`, etc. Opening content launches it in a draggable-feeling
**window** with close/minimize/maximize controls. A thin GUI nav bar is always present
as a fast escape hatch for recruiters, and every page is also a real, pre-rendered URL
so the site is fully usable (and indexable) without the terminal.

## Goals

- Distinctive "hacker OS" aesthetic that signals technical depth.
- Recruiters can reach any information in seconds via the GUI nav and real pages.
- Blog/research and per-member CV pages are genuine, well-typeset web pages.
- Easy multi-author content workflow (lab members contribute via Git/PRs).
- Deployable as static files to Hostinger Business (shared hosting).

## Non-Goals (v1)

- No headless CMS or visual editor (MDX-in-repo only; revisit later if needed).
- No full multi-window desktop (single active window + dock only).
- No server-side features (API routes, auth, on-demand rendering, comments).

## Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Homepage direction | **Terminal-first** (hero = terminal, thin GUI nav on top) | Maximum on-brand; nav keeps recruiters from bouncing |
| Terminal depth | **Real shell sim** (parser + virtual filesystem) | Genuinely explorable, matches the terminal-first promise |
| Framework | **Next.js (App Router) + React + TypeScript** | Stateful terminal fits React; static export for shared hosting |
| Package manager | **bun** | Per user preference |
| Content | **MDX files in repo**, members contribute via PR | Git-native, version-controlled, reviewable, zero cost |
| Content page aesthetic | **Modern dark editorial** (GitHub-dark, Inter body + mono accents) | Readable for long writeups & CVs, still hacker-flavored |
| Windowing | **Single active window + dock** (close/min/max, restore from dock) | Authentic OS feel without z-index/mobile/SEO chaos |
| Theming | **Light + dark, default to system pref, toggle to override** | Accessibility + polish |
| Hosting | **Hostinger Business** → Next.js **static export** (`output: 'export'`) | Shared hosting serves static files only |

## Architecture

Two layers over one set of content:

1. **The desktop (client-side):** terminal shell + window manager. Pure React state,
   no server.
2. **Real pages (pre-rendered):** every route (`/`, `/lab`, `/team`, `/team/<member>`,
   `/blog`, `/blog/<slug>`, `/projects`, `/contact`) is statically generated to HTML.

**Single source of truth:** MDX in `content/` is compiled at build time into (a) the
real pages and (b) the data that backs the terminal's **virtual filesystem (VFS)**.

**Routing bridge:** terminal `open <path>` and GUI nav links navigate to the same
routes. On desktop the target page mounts inside a window; on mobile it renders as a
normal full-screen page. Direct URL hits always render the standalone real page.

```
content/ (MDX)  ──build──▶  ┌─ real pre-rendered pages (/blog/<slug>, /team/<m> …)
                            └─ VFS tree (JSON) ─▶ terminal shell + cat/ls/open
```

## Components

### 1. Terminal shell (`src/terminal/`)
- **Command parser**: tokenizes input, resolves command + args.
- **Commands:** `help`, `ls`, `cd`, `pwd`, `cat`, `open`, `clear`, `whoami`,
  `theme [light|dark|system]`, `history`. Plus 1–2 easter eggs (`neofetch`-style lab
  banner, `secret`).
- **VFS module**: in-memory tree built from generated content data. Supports path
  resolution, traversal, and node typing (dir/file).
- **Input UX:** tab-completion (paths + commands), arrow-key history recall, blinking
  cursor, command history buffer.
- **`cat`** renders an inline styled preview in the terminal; **`open`** dispatches to
  the window manager / router.

### 2. Window manager (`src/desktop/`)
- State machine: `closed → open → (minimized | maximized) → restored/closed`.
- One active window at a time; minimized windows park as **dock** pills (bottom),
  restorable on click.
- Title bar: traffic-light controls (close / minimize / maximize) + title
  (`~/blog/<slug>.mdx — la_backdoor`).
- Window body hosts the real page component, styled per direction B.
- Mobile: chrome collapses; content renders full-screen.

### 3. GUI navigation (`src/components/Nav`)
- Always-visible top bar: Lab · Team · Research · Contact + **theme toggle**.
- Semantic `<nav>`; the recruiter fast path. Links route the same as terminal `open`.

### 4. Theming (`src/theme/`)
- CSS-variable token system; `light` and `dark` variants for both terminal and pages.
- **No-flash init:** inline `<head>` script reads `localStorage` → falls back to
  `prefers-color-scheme`, sets the theme class before first paint.
- Toggle (nav) and `theme` command both update the class + persist to `localStorage`
  (`light` / `dark` / `system`).
- Dark: phosphor-green-on-black terminal + GitHub-dark pages. Light: "paper" terminal
  (dark text on warm off-white, muted accents) + light editorial pages.

### 5. Content layer (`content/` + `src/content/`)
- `content/blog/*.mdx` — frontmatter: `title, date, authors, tags, summary`.
- `content/team/*.mdx` — frontmatter: `name, role, avatar, links, skills`; body = bio/CV.
- `content/lab.mdx`, `content/projects/*.mdx`.
- Build-time loader: parse frontmatter, validate, generate listing data + VFS tree.
- **Add content = drop an MDX file + open a PR.**

## Routes / Pages (v1)

| Route | Description |
|---|---|
| `/` | Terminal-first desktop (hero) + GUI nav |
| `/lab` | Lab overview: mission, research areas, active projects |
| `/team` | Member grid |
| `/team/<member>` | Per-member CV/resume page |
| `/blog` | Post listing |
| `/blog/<slug>` | Full blog/research post |
| `/projects` | Projects (optional in v1 if time allows) |
| `/contact` | Contact info / links |

## Data Flow

1. Author drops/edits an MDX file in `content/`.
2. Build parses & validates frontmatter, generates: (a) static pages, (b) VFS JSON,
   (c) listing/index data.
3. Client boots terminal with the VFS; nav + terminal both route to real pages;
   desktop wraps pages in windows.

## Error & Edge Handling

- Unknown command → friendly `command not found` + hint to run `help`.
- Bad path in `cd`/`cat`/`open` → `no such file or directory`.
- Invalid/missing MDX frontmatter → **build fails** with a clear message (fail fast).
- JS disabled → content pages fully readable (terminal degrades to a static notice).
- Mobile → windows become full-screen pages; terminal simplified.

## Theming Requirements (explicit)

- Default to system preference on first visit (no flash).
- Persisted user override via nav toggle and `theme` command.
- Both terminal and content pages fully themed in light and dark.

## Testing Strategy

- **Unit:** command parser, VFS traversal/resolution, tab-completion, window-manager
  state machine, theme resolution/persistence.
- **Component:** theme toggle behavior, window open/close/min/max/restore, dock restore.
- **Build check:** every MDX file has valid required frontmatter.
- Follow TDD where practical for the logic-heavy shell + window-manager modules.

## Non-Functionals

- **Accessibility:** keyboard navigable; window focus trap + `Esc` to close; respects
  `prefers-reduced-motion`; semantic nav/landmarks.
- **SEO:** per-page `<title>`/meta, sitemap, real pre-rendered HTML.
- **Performance:** heavy JS confined to terminal + window manager; content pages light.
- **Deploy:** `next build` + static export → upload `out/` to Hostinger `public_html`.

## Open Items / Future

- Projects page may slip past v1 if scope tightens.
- Possible later: search command, RSS for blog, CMS option for non-technical authors.
