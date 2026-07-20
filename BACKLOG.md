# BACKLOG — DYSTOPIC-WEBSITE

Status legend: ✅ done · 🟡 partial / placeholder · ⛔ blocked · ⬜ not started

## Routes
| Route | Status | Notes |
|---|---|---|
| `/` hub | ✅ | Fluid diamond. Mobile flow / desktop grid. Desktop icons `clamp(150px,16vw,232px)`, rato `clamp(190px,20vw,300px)` — matches design proportions and grows on wide screens. |
| `/archival` | 🟡 | Chain nav + scrollable feed, 3 entries per page, images at native aspect, each links to its own route. Entries are placeholders (one example image reused). |
| `/archival/[slug]` | 🟡 | Per-entry page (image + title + year + description + back). Statically generated from `features/archival/data.ts`. Placeholder content. |
| `/loja` | 🟡 | Empty route: ChainNav + "abre em breve". Needs real store. |
| `/mapa` | 🟡 | Empty route: ChainNav + placeholder. ⛔ real content blocked (no design). |
| `/termos` | 🟡 | Placeholder legal page. Needs real copy. |
| `/privacidade` | 🟡 | Placeholder legal page. Needs real copy. |

## Done this round
- ✅ Backgrounds compressed PNG → WebP q88: 66MB → 4.9MB total (bg-mobile 21.5MB → 0.82MB, archival desktop 20.8MB → 1.37MB, archival mobile 20.9MB → 1.23MB, hub desktop 3.1MB → 1.44MB). All pages reference `.webp`. Original PNGs kept in `public/assets/` — safe to delete once verified in prod.
- ✅ Hub desktop button sizing raised to match the reference composite; mobile sizing untouched.
- ✅ Archival feed: 3 per page, entries link to `/archival/<slug>`, page scrolls at every width.
- ✅ Archival entry data extracted to `features/archival/data.ts` (single source for feed + routes + `generateStaticParams`).
- ✅ Empty `/loja` and `/mapa` routes with shared `ChainNav`.

## Open work (priority order)

### 1. Archival — real content
- Replace the 9 placeholder entries in `features/archival/data.ts` with real archive captures (slug, title, year, image, aspect, description).
- Add real images to `public/assets/archival/` (compress to WebP first — see the compression note below).
- Entry page layout may need a gallery/multi-image variant if entries have more than one capture.

### 2. Loja — store (golfwang.com STRUCTURE first)
- Structure references in `DESIGN/references/`. Replicate layout/flow before styling.
- Product listing on `/loja` + product detail `/loja/product/[slug]`.
- No store design PNG yet — structure now, visual pass when design lands.
- Cart/checkout scope TBD (likely external provider — any new dependency needs human approval).

### 3. Mapa — ⛔ blocked
- No design or reference exists. Needs design PNGs (desktop + mobile) before build.
- Route + placeholder shipped so nav works.

### 4. Legal pages — real copy
- `/termos` and `/privacidade` are themed placeholders awaiting actual legal text.

### 5. Structural / tech debt
- ✅ HubButton moved to `components/ui/`.
- ✅ Shared `ChainNav` in `components/layout/`.
- Extract a shared `SiteFooter` — footer markup is duplicated across archival, entry, loja, mapa, termos, privacidade.
- Delete the original background PNGs once WebP is confirmed good in production.
- Populate empty skeleton dirs (`lib/`, `services/`, `store/`, `types/`) as real code needs them.

### 6. Performance
- ✅ Background images compressed (the main load complaint).
- Consider `next/image` with `placeholder="blur"` for feed entries once real images land.
- Remaining PNGs (icons, text labels) are small; convert to WebP only if measurements justify it.

### 7. Testing
- ✅ Responsiveness suites for hub + archival (`tests/responsive/`).
- Add: archival pagination interaction (click Avançar → page 2 entries differ).
- Add: entry route renders (`/archival/colecao-dystopic-2022` → 200, image + title visible).
- Add suites for loja, mapa, termos, privacidade once they have real content.

## Environment reminders (see AI-GUIDE.md §4)
- Repo on `/mnt/d` (WSL2): hot reload dead — restart `npm run dev` after edits.
- Corrupted `.next` hangs compiles — `rm -rf .next` fixes it.
- Only the Chromium Playwright browser is installed.
- Image compression recipe: `sharp(src).resize({width}).webp({quality: 88, effort: 6})` — used for all backgrounds.
