
# GenAI CoE Summit 2027 — Build Plan

A Matrix-inspired, red/blue RGB-lit event site for the GenAI CoE Summit 2027 (IEM-UEM), January 2027 at STPI Sector V, Kolkata. 10 pages, site-wide falling code rain, N30 mascot, glitch typography, QR codes.

## Design system

- Background: `#000000`. Content panels: `rgba(0,0,0,0.85)`.
- Red accent: `#FF003C` (headings, CTA glow #1).
- Blue accent: `#00B8FF` (extensive RGB-lighting glow, CTA glow #2, borders).
- Minor green hint: `#00FF9C` used sparingly (a single line highlight, cursor blink).
- Tokens defined in `src/styles.css` under `@theme` (oklch equivalents) — `--color-neon-red`, `--color-neon-blue`, `--color-neon-green`, plus gradient/shadow tokens `--glow-red`, `--glow-blue`, `--rgb-border` (animated linear-gradient border).
- Fonts loaded via `<link>` in `__root.tsx`: Google Fonts "Big Shoulders Display" (headings, glitch layer on top), "Rajdhani" (subheads), "JetBrains Mono" (body).
- Global glitch/flicker keyframe utilities in `styles.css`: `.glitch-text` (RGB channel-split via `text-shadow` red/blue, layered `::before`/`::after` clip-path animation), `.scanlines` (repeating linear-gradient overlay), `.rgb-border` (animated conic/linear border shift red↔blue), `.float-idle` for mascot hover.

## Global structure

- Site-wide `<CodeRain />` component: fixed full-viewport `<canvas>`, `z-index: 0`, opacity 0.12, resizes on window resize, katakana + 0/1 glyphs falling. Rendered in `__root.tsx` behind `<Outlet />`. Present on entry gate too.
- Scanline overlay: fixed `pointer-events-none` div above rain, below content.
- All page content wrapped in `<PagePanel>` — max-width container with `bg-black/85` panel, `backdrop-blur-sm`, `z-10`.
- `<Navbar>` sticky, transparent → adds red↔blue animated glow border-bottom on scroll (IntersectionObserver / scroll listener). Left: logo slot (reserved empty box labeled "Gen AI CoE logo — TBA"). Links: Home, Hackathon, Project Showcase, Schedule, Speakers, N30, Venue, Contact. Mobile hamburger sheet.
- `<Footer>`: logo slot, contact placeholders, socials, "Meet N30" link to `/n30`, and a QR code encoding the homepage URL.
- Global motifs (`<MatrixMotifs>` component absolutely positioned within pages):
  - White rabbit tiny SVG icon in a corner of Home + About with caption "Curiosity is the first step through the door."
  - Bent spoon SVG on Mascot & About: "The spoon was never the point. The Summit is."
  - Agent silhouette faint background texture on Speakers page: "Something is always watching the code."
  - Oracle terminal typed line on Speakers page: `> The answer you seek already knows your name.`

## Entry gate (preserved as-is behavior)

- Route `/` renders `<EntryGate>` first (state stored in `sessionStorage` key `n30-entered`). Full black, code rain visible, terminal-typing "Wake up... The GenAI CoE Summit has you." Two glowing pill buttons — red / blue. Either click → glitch transition (200ms scale + RGB-split flicker) → sets sessionStorage → renders Home. Returning within session skips gate.

## Routes (TanStack Start, `src/routes/`)

Each route file has its own `head()` with unique title/description/og:title/og:description.

1. `index.tsx` — Home (entry gate + home content).
2. `hackathon.tsx` — Hackathon.
3. `hackathon.register.tsx` — Hackathon Registration.
4. `showcase.tsx` — Project Showcase.
5. `showcase.register.tsx` — Showcase Registration.
6. `schedule.tsx` — Schedule (Day 1 / Day 2 tabs).
7. `speakers.tsx` — Speakers & Panel.
8. `venue.tsx` — Venue (Google Maps `<iframe>` embed for STPI Sector V Kolkata).
9. `n30.tsx` — Mascot page (also aliased at `/mascot` via a second route file re-exporting the same component).
10. `contact.tsx` — Contact / About.

Root `__root.tsx` updates: replace default title/description with "GenAI CoE Summit 2027 — IEM-UEM"; add font `<link>` preconnects and stylesheet; add favicon → simplified N30 PNG at `/favicon.png` (delete `public/favicon.ico`); add site-wide `og:image` NO — per instructions, og:image only on leaf routes (put on home leaf as N30-on-black share image).

## Pages — detail

### Home (`index.tsx`)
- Hero: giant glitch title "GenAI CoE Summit 2027" (Big Shoulders Display + glitch layer), subtitle "Organized by Gen AI Center of Excellence, IEM-UEM", pill badge "January 2027 · STPI, Sector V, Kolkata · Exact dates to be announced".
- CTAs: `[ EXPLORE HACKATHON ]` (red glow hover → `/hackathon`), `[ VIEW SCHEDULE ]` (blue glow hover → `/schedule`).
- N30 mascot bottom-right of hero (hidden on very small screens, or moved below CTAs on mobile). `<N30Mascot>` component handles idle bob + click glitch + speech-bubble cycling lines: "Some doors only open once." / "The code remembers everything." / "Two days. One system. Choose wisely."
- About the Summit block.
- About Gen AI CoE / IEM-UEM block.
- Highlights: 4 cards (Hackathon / Project Showcase / Panel Discussions / Schedule) with lucide icons, RGB-alternating glow borders (odd = red, even = blue).
- Venue teaser: small static map thumbnail + "View Venue Details" → `/venue`.
- Footer QR block encoding home URL.

### Hackathon
Hero, Theme/Tracks/Timeline/Prizes/Rules TBA sections, FAQ accordion (shadcn Accordion), sticky bottom-right `[ REGISTER FOR HACKATHON ]` → `/hackathon/register`.

### Hackathon Registration
QR code at top (encodes `/hackathon/register` full URL) with red/blue animated border. Form (react-hook-form + zod, client-only, `onSubmit` shows success toast + small N30 with speech "Signal received. Welcome to the construct."):
- Team Name, Member Count (1–5), dynamic Member rows (name+email) via `useFieldArray`, College/Institution, Track dropdown (TBA options), Contact Number, `[ SUBMIT ENTRY ]`.
- No backend — client-side only; toast success state.

### Project Showcase
Intro copy ("6 flagship projects…"), Presentation Format section, 6 placeholder cards ("Details coming soon"), `[ REGISTER TO ATTEND ]` → `/showcase/register`.

### Showcase Registration
QR code (encodes its own URL), form: Name, Organization/College, Designation, Email, Phone, Reason dropdown (Investor / Industry / Student / Academic / Other). Success toast with N30.

### Schedule
Shadcn Tabs Day 1 / Day 2, each with placeholder rows "Session details to be finalized".

### Speakers & Panel
Panel intro, 6 placeholder speaker cards ("Speaker Name TBA"), Oracle terminal block near bottom:
```
> The answer you seek already knows your name.
```
Faint agent silhouette background texture, caption "Something is always watching the code."

### Venue
Google Maps `<iframe>` embed centered on STPI Sector V Kolkata, address block, directions placeholder, nearby landmarks placeholder.

### N30 Mascot (`/n30`)
Large N30 hero image with `float-idle` animation. Below it, terminal-readout bio panel:
```
> ACCESSING FILE...
NAME: N30
ROLE: Guide to the GenAI CoE Summit
ORIGIN: A construct born from the Summit's own systems, here to guide hackers,
builders, and dreamers through two days inside the machine.
```
Bent spoon SVG motif with caption. Never references "Neo" or "Matrix".

### Contact
About Gen AI CoE IEM-UEM copy, contact form (name/email/message, client-side), email/phone/social placeholders.

### 404
Root `notFoundComponent` swapped to N30 (shrug crop via CSS clip if not a separate asset) + "There is no page. Only the illusion of one." + link home.

## Components (`src/components/`)

- `CodeRain.tsx` — canvas rain, mount once in `__root.tsx`.
- `Scanlines.tsx` — overlay div.
- `Navbar.tsx`, `Footer.tsx`, `PagePanel.tsx`.
- `EntryGate.tsx` — pill choice + terminal typing.
- `GlitchTitle.tsx` — text with RGB-split layers.
- `N30Mascot.tsx` — image, idle animation, click glitch, speech bubble.
- `RgbBorderCard.tsx` — reusable glow-bordered card (variant red/blue/rgb).
- `QrBlock.tsx` — wraps `qrcode.react` with red/blue border + caption. Uses `window.location.href` on mount (client-only via `useHydrated`) as encoded value.
- `TerminalTyping.tsx` — typewriter effect for gate + Oracle line.
- `motifs/RabbitIcon.tsx`, `SpoonIcon.tsx`, `AgentSilhouette.tsx`.

## Assets

- Upload N30 image via `lovable-assets create` from `/mnt/user-uploads/ChatGPT_Image_Jul_23_2026_11_39_51_PM.png` → `src/assets/n30.png.asset.json`.
- Generate simplified N30 favicon PNG via imagegen (square crop, 512x512, transparent bg) → `public/favicon.png`; delete `public/favicon.ico`.
- Generate OG share image (N30 on black + summit title text) via `imagegen` premium (text legibility) → `src/assets/og-summit.jpg.asset.json`; wire absolute URL on home route only.
- Gen AI CoE logo: reserve empty slot in navbar + footer with label "Logo TBA" — user will provide separately.

## Dependencies

`bun add qrcode.react` (and `react-hook-form`, `zod`, `@hookform/resolvers` if not already present — check `package.json` first).

## Technical notes

- No backend. All forms are client-side with toast success. QR codes encode `window.location.origin + route path`.
- Fully mobile-first; code rain opacity fixed at ~12%, canvas resizes on `resize` event; disable rain animation on `prefers-reduced-motion`.
- All colors flow through `styles.css` tokens; no hardcoded hex in components except within the token file.
- `og:image` only at leaf routes (Home gets the N30 share image), never on `__root.tsx`.
- Route `/mascot` re-exports the same component as `/n30` for the alias.

## Out of scope (explicitly not built)

- B2B Roundtable page (removed per request).
- Any backend, database, or auth.
- Real speaker/project/schedule content (all TBA placeholders).
- Gen AI CoE logo asset (user will provide; slots reserved).
