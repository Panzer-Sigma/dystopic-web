# README — DYSTOPIC-WEBSITE

Read this first. What this project is, how it is organized, what the rules are, and which environment traps will waste your time.

---

## 1. What this project is

**Dystopic** is a dark, glitch-aesthetic transmedia platform website ("Plataforma Transmidiática Regenerativa") built as a Next.js app. The visual identity is 100% image-driven: backgrounds, titles, buttons, and labels are exported PNG art pieces, not styled text. Fidelity to the design PNGs is the top priority.

- **App code:** `dystopic-front/` — Next.js 16 (App Router, Turbopack) + React 19 + Tailwind 4 + TypeScript.
- **Design source of truth:** `DESIGN/.EXPORT PARTES/` — folders `HUB DESKTOP`, `HUB MOBILE`, `ARCHIVAL DESKTOP`, `ARCHIVAL MOBILE`. Each contains a `fullscreen` composite (the target look — files starting with `.` are hidden, use `ls -a`) plus individually exported parts (icons, text labels, backgrounds, arrows). Store references in `DESIGN/references/`. Font: `zrnic rg.otf`.
- **Deploy:** Vercel, project `dystopic-hub`, prod alias `https://dystopic-hub.vercel.app`. GitHub repo `Panzer-Sigma/dystopic-web`.

### Routes
| Route | Status | Notes |
|---|---|---|
| `/` (hub) | done | Diamond of 3 buttons (Archival left, Loja right, Mapa bottom) around the rato logo. Mobile = vertical flow; `md+` = 3-col grid diamond. |
| `/archival` | done (placeholder feed) | Chain nav header (LOJA/ARCHIVAL/MAPA), vertical image feed, working Voltar/Avançar pagination (client component), footer. Feed uses `example-single.png` placeholders — real content pipeline not built yet. |
| `/loja` | not started | No design; replicate golfwang.com STRUCTURE first (refs in `DESIGN/references/`), style later. Needs `loja/product/[slug]`. |
| `/mapa` | BLOCKED | No design or reference exists yet. |
| `/termos`, `/privacidade` | not started | Footer links point to them. |

### Code layout (target structure in root `filetree-to-update-as-following.md`)
- `app/` — routes only (`page.tsx`, `layout.tsx`, `globals.css`, route dirs).
- `components/ui/`, `components/layout/` — reusable UI. (`HubButton.tsx` currently still at `app/components/` — moving it to `components/ui/` is a pending task.)
- `features/<hub|loja|archival|mapa>/{components,api}` + `index.ts` — per-section code. Example: `features/archival/components/ArchivalFeed.tsx` (client component, paginated feed).
- `lib/`, `services/`, `store/`, `types/` — cross-cutting. Mostly empty skeletons (`.gitkeep`).
- Imports use `@/*` alias (→ `dystopic-front` root).
- Assets live in `public/assets/` (hub) and `public/assets/archival/`. Copy from DESIGN with clean kebab-case names; never reference DESIGN paths at runtime.

---

## 2. Hard rules

1. **Never** add npm dependencies or edit `package.json`, `next.config.ts`, `tsconfig.json`, `.env*`, `.vercel` without explicit human approval.
2. **Gate for any change:** `cd dystopic-front && npm run lint && npm run build` must pass.
3. **Tests:** `npx playwright test` — responsiveness suites in `tests/responsive/` (hub + archival), projects `mobile` (iPhone 14 viewport on Chromium — WebKit is not installed) and `desktop` (1280×800). Config: `playwright.config.ts` (auto-starts dev server, 120s timeout — often too short here, start the server yourself first; it reuses an existing one).
4. **Design-sensitive work** (new pages, visual changes) should be reviewed by the human against the DESIGN PNGs; automated gates cannot judge visuals.
5. Never merge to main / deploy prod without human instruction. Preview deploys per branch via Vercel are the norm.
6. Responsiveness is a standing requirement: every screen must work from 320px phones to wide desktops, both orientations. Verify with screenshots at multiple viewports (320/390/768/1024/1280/1600), check horizontal overflow == 0 and no element overlaps.

### Responsive patterns that work here (learned the hard way)
- Avoid absolute `%` positioning for interactive clusters — causes overlaps at mid widths. Use flow layout on mobile and CSS grid on `md+` (see `app/page.tsx`).
- Size image buttons fluidly: `w-[24vw] min-w-[84px] max-w-[176px] md:w-[min(24vw,17vh)]` — the `vh` term prevents vertical overflow on short/wide screens.
- Full-viewport pages: `min-h-dvh` (not `h-screen` — mobile browser chrome clips it).
- Backgrounds swap per breakpoint: `bg-[url('/assets/…-mobile.png')] md:bg-[url('/assets/…-desktop.png')]`.
- Interactive elements ≥ 24px tall (WCAG 2.2 target size; enforced by tests).

---

## 3. The loop system (`loop/`)

Semi-autonomous dev loop with role separation. **The Conductor never edits files** — file edits belong to the Worker/Verifier subagents only (human override possible).

- `make plan` (`plan.sh`): budget check → free Gemini triage of git log + GitHub issues → assembles `conductor-input.md` (STATE + TRUST + CONTRACT + TRIAGE).
- **Conductor (Fable)** reads `conductor-input.md`, writes ONE decision to `work-order.json`: `{action: execute|queue|stop, item, skill, spec, done_when[]}`. Spec must be gate-verifiable — never visual judgement in `done_when`.
- `make exec` (`execute.sh`): spawns Worker (Sonnet, headless claude CLI, second account) in a git worktree branch `fable-exec-<skill>-<ts>`, then Verifier (Opus), then the lint+build gate. PASS keeps the branch for human review; FAIL deletes it. Trust ledger per skill (`scripts/trust-log.sh`); CONTRACT queues anything contract-sensitive, design-heavy, or >400-line diffs for the human.
- Key files: `loop/conductor.md`, `loop/contract.md`, `loop/memory/STATE.md` (keep updated!), `loop/triage.md`, `loop/workers/`.
- Known infra fix: worktrees must `npm ci` their own `node_modules` — symlinking the main checkout's breaks Turbopack ("Symlink [project]/node_modules is invalid").

---

## 4. Environment traps (WSL2 + Windows drive) — READ OR SUFFER

The repo lives on `/mnt/d` (Windows NTFS mounted in WSL2). Consequences:

1. **Hot reload does NOT work.** WSL2 cannot inotify-watch Windows drives. After editing files, the dev server keeps serving stale code — **restart `npm run dev`** to see changes. (Screenshots/browsers showing "old" UI after a fix is almost always this.)
2. **Everything filesystem-heavy is slow**: `next dev` cold start 1–3 min, `next build` can exceed 5 min, `npm ci` is slow. Set generous timeouts; run long commands in the background.
3. **Corrupted `.next` cache hangs compiles** (symptom: "Compiling / ..." forever while other routes work, no panic log). Fix: kill server, `rm -rf dystopic-front/.next`, restart.
4. Port 3000 stale processes: free with `fuser -k 3000/tcp`. Do NOT `pkill -f "next dev"` from a command whose own cmdline contains that string (it kills itself).
5. npm registry access sometimes times out; Playwright browsers: only Chromium is installed (`~/.cache/ms-playwright`).
6. Dark Reader browser extension causes React hydration-mismatch console errors (`data-darkreader-*` attributes). Mitigated with `suppressHydrationWarning` on `<html>`; it is extension noise, not an app bug.

### Verification workflow that works
```bash
cd dystopic-front
fuser -k 3000/tcp; rm -rf .next && npm run dev &   # fresh server
# wait for 200: curl -sf --retry 60 --retry-delay 5 --retry-all-errors http://localhost:3000/
npx playwright test                                 # suites reuse the running server
# visual check: headless-Chromium screenshots at 6 viewports, then look at them
```

---

## 5. What is needed next (priority order)

1. **Move `app/components/HubButton.tsx` → `components/ui/HubButton.tsx`**, update import in `app/page.tsx`, delete empty dir (structural; long-queued in the loop).
2. **`/termos` and `/privacidade` pages** — footer links currently 404.
3. **Archival real content** — replace placeholder feed with actual archive images + data source; wire pagination to it.
4. **`/loja`** — golfwang-structure store: listing page + `product/[slug]`; structure first, styling after design exists.
5. **`/mapa`** — blocked on design.
6. Keep `loop/memory/STATE.md` and this guide updated when any of the above changes.
