# Brief: gluten-free trials pages and home-page entry card

**For:** Cursor, working on this repo (Next.js 16 app, single home page in `components/DirectionA.tsx`).
**From:** SD, drafted with Claude on 24 Nov 2026.
**Branch:** `claude/gf-trials-brief`. Build on this branch or branch from it.

## Goal

Publish SD's gluten-free sourdough trials on crispycrustboule.com without crowding the home page:

1. **Home page:** add one simple entry card as section **05** (the number is free today) that links to the trials.
2. **`/gluten-free`:** a timeline of every trial, newest first, with the current best pinned at the top.
3. **`/gluten-free/[slug]`:** one page per trial with photos, what changed in that trial, how it baked, and the full recipe folded away.

SD approved the structure (IA) on a claude.ai draft. That draft used placeholder fonts and colours. **Build it in this site's own scrapbook look**, described below, not the draft's look.

## Before you start

- `AGENTS.md` applies: this Next.js version has breaking changes. Read the routing, dynamic routes, `generateStaticParams`, `params` and metadata guides in `node_modules/next/dist/docs/` before writing route code.
- Don't change existing sections' content or styling, except inserting section 05.

## What's in this package

| Path | What it is |
| --- | --- |
| `docs/gf-trials/BRIEF.md` | This brief. |
| `docs/gf-trials/gf-trials.json` | **Source of truth for all content.** Five trials, newest first, with every number, step and result. Use it as is. |
| `public/images/gf/v1-3-top.jpg`, `v1-3-side.jpg` | SD's only bake photos so far (v1.3, 639×1136 portrait). Already in their final place. |
| `docs/gf-trials/reference/timeline-draft.html` | The approved claude.ai draft, for **structure and behaviour only**. Open it in a browser to click through. |
| `docs/gf-trials/reference/entry-card-draft.html` | First draft of the home-page card, for **copy and structure only**. |

## Content rules

- Every fact comes from `gf-trials.json`. Don't invent results, dates, or numbers, and don't round anything.
- Five entries: v1.4, v1.3, v1.2, v1, v0. **v1.1 is folded into v1** (it only added the starter feed to the card). Its note is in v1's `includes` field. There is no `/gluten-free/v1-1` page.
- `status` values: `up-next` (v1.4, not baked yet), `current-best` (v1.3), `past`, `baseline` (v0).
- `tone` values drive the result tag colour: `good`, `problem`, `pending`.
- Ingredient rows and method steps can carry `tag` ("New" or "Changed") and `was` (the old value). Show these only on that trial's page. They mark what changed in **that** trial.
- These loaves use their own gluten-free starter (light buckwheat, sorghum and brown rice flour), **not Oho**. Oho is rye and all-purpose flour. Say this on the trials page.
- Import the JSON directly (`resolveJsonModule` is on), or move it to `lib/gf-trials.ts` with types. Either way keep one source of truth, because SD will update it after each bake.

## Look and feel: reuse the site's system

Use what `components/DirectionA.tsx` already does:

- **Colours:** ink `#2a1f17`, rust `#a64b2a`, sage `#7a8b5c`, muted `#5a4a32`, paper `#e8dcc4`, light paper `#f4ebd9`, tan `#d4a574`, dark ground `#1a140d`.
- **Type:** DM Serif Display for headings (with an italic rust phrase, as in "3 days, mostly *waiting.*"), Work Sans for body, JetBrains Mono for small uppercase labels (`· 04 · THE PROCESS ·`, 11px, 0.25em tracking, rust), Caveat for hand-written notes and dates (sage).
- **Atoms:** `Paper`, `Tape`, `Stamp`, `StarDoodle`, `Squiggle`, `Reveal`, and the polaroid style used in `LoafCard`.
- **Refactor (needed to share them):** move these atoms, plus the font loader, from `DirectionA.tsx` into `components/scrapbook.tsx` and import them back. The home page must look exactly the same afterwards.
- **Mobile:** follow the existing `isMobile` (< 768px) pattern, or plain responsive CSS. Keep at least 16px side gutters. Tables scroll inside their own container, never the page.

### Suggested treatments

- **Result tags:** a small `Stamp`. `good` uses sage, `problem` uses rust, and `pending` uses muted with a dashed border.
- **Current best card:** light paper card with a `Tape` strip across the top, a slight tilt like the loaf cards, and the v1.3 top photo as a polaroid.
- **Timeline:** a vertical rule like the red margin line in the Process section, with one dot per trial. Version in DM Serif, date in Caveat.
- **Detail photos:** polaroids, as in `LoafCard`. Trials without photos show `photoNote` in Caveat inside a dashed frame. Don't use stock images.
- **Folded recipe:** a `<details>`/`<summary>` styled like the Process section's lined paper.

## 1. Home page entry card (section 05)

Insert it in `DirectionA.tsx` between the `{/* PROCESS */}` and `{/* CONTACT */}` blocks, wrapped in `<Reveal>`, with the same outer margins as Process.

- **Label:** `· 05 · GLUTEN-FREE TRIALS ·`
- **Heading:** "Gluten-free, *slowly.*" (italic rust on "slowly.")
- **Text:** "Working toward a gluten-free sourdough loaf, one trial at a time. These loaves use their own gluten-free starter, not Oho."
- **Two facts,** read from the JSON so they update themselves:
  - Current best: `v1.3 · best loaf yet`
  - Up next: `v1.4 · not baked yet`
- **Link:** "see every trial →" to `/gluten-free`. Make the whole card one link (`next/link`).
- Keep it simple. No photo on this card.

## 2. `/gluten-free`: trials timeline

`app/gluten-free/page.tsx`, on a `Paper` ground like the home page.

1. **Top:** "← back to CrispyCrustBoule" link to `/` (JetBrains Mono, muted).
2. **Intro:**
   - Kicker: `· gluten-free field notes ·`
   - Title: "Gluten-free, *slowly.*"
   - Line: "Every trial at a gluten-free sourdough loaf, newest first. Tap one to see what changed, how it baked, and the full recipe."
   - The starter note (own GF starter, not Oho).
3. **Current best (pinned):** the `current-best` trial as a larger card showing version, date, summary, result tag, and "open trial →".
4. **All trials (newest first):** one card per trial with version, date, `summary` (one line), and result tag. Flag v1.4 "Up next", v1.3 "Current best", and v0 "Baseline". v1's card adds a small line: "Includes v1.1, which only added the starter feed."
   - **No photos on these cards** (SD's call).
   - Each card links to `/gluten-free/[slug]`.
5. **Footer:** the same footer as the home page.

**Metadata:** title "Gluten-free trials · CrispyCrustBoule".

## 3. `/gluten-free/[slug]`: trial detail

`app/gluten-free/[slug]/page.tsx`. Generate the five pages statically from the JSON. An unknown slug returns 404.

In order:

1. "← all trials" link to `/gluten-free`.
2. **Header:**
   - Kicker: `· {status label} · {dateLabel} ·`
   - Big version in DM Serif, with the result Stamp beside it.
   - `summary` as the lede.
   - `meta` as a row of label/value pairs.
3. **Photos:** `photos` as polaroids (`next/image` with the given width and height), with `caption` in Caveat. If there are none, show `photoNote`.
4. **"What changed in {version}":**
   - `changes` as a list, with each `lead` in bold followed by its `text`.
   - Then "Why:" followed by `why`.
   - Then "Everything else carries over from {older version}", linked to that trial.
   - v0 has `intro` instead of `changes`. Use the heading "Where it started".
5. **`includes` (v1 only):** a small note block headed with its `label`.
6. **"How it baked":** `result`.
7. **Full recipe,** folded by default (`<details>`):
   - Starter build (if present): table with Grams and % of flour columns, then its steps and foot note.
   - Ingredients: table with Grams and Baker's % columns, then the foot note. Group rows (`group`) are sub-headers, and `note` rows are muted.
   - Method: numbered steps, each with a bold title and text, an optional `tag` chip, and an optional muted `note`.
   - Numbers are right-aligned with tabular figures.
8. **Pager:** "← newer trial" and "older trial →", each showing the neighbouring version and linking to it.

**Metadata:** title "{version} · Gluten-free trials · CrispyCrustBoule".

## Done when

- [ ] Home page looks unchanged apart from the new section 05 card, at desktop and phone widths.
- [ ] The card links to `/gluten-free`. Its facts come from the JSON.
- [ ] `/gluten-free` lists v1.4, v1.3, v1.2, v1, v0 in that order, with v1.3 pinned. No photos on the cards.
- [ ] Each of the five detail pages shows the right photos or photo note, this trial's changes only, its result, the folded recipe, and working newer/older links. v1.4 has no "newer" link and v0 has no "older" link.
- [ ] No horizontal page scroll at 375px wide.
- [ ] Every number matches `gf-trials.json`.
- [ ] `npm run lint` and `npm run build` pass.

## Out of scope

- Comments, search, or any CMS. The JSON is the editing surface for now.
- Changing other copy on the site.
