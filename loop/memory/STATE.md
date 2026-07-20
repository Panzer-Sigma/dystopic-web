# STATE — dystopic-website

## Stack
Next.js 16 (App Router) + React 19 + Tailwind 4 + TypeScript. Code in `dystopic-front/`.
Gate: `cd dystopic-front && npm run lint && npm run build`. No automated tests exist.
Deploy: GitHub `Panzer-Sigma/dystopic-web` → Vercel (preview per branch).

## Target folder structure (canonical: repo-root `filetree-to-update-as-following.md`)
Under `dystopic-front/`:
- `app/` — routes only: `page.tsx` (hub), `layout.tsx`, `globals.css`, `loja/page.tsx`,
  `loja/product/[slug]/page.tsx`, `archival/page.tsx`, `mapa/page.tsx`.
- `components/ui/`, `components/layout/` — reusable UI + layout chrome.
- `features/<hub|loja|archival|mapa>/{components,api}` + `index.ts` — per-section code.
- `lib/`, `services/`, `store/`, `types/` — cross-cutting.
- Imports use the `@/*` alias (→ `dystopic-front` root).
The empty skeleton dirs already exist (.gitkeep). Routes/pages are added as they are built.

## Done
- Hub (home) page: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/components/HubButton.tsx` (not yet moved).
- Assets exported to `public/assets/` (bg, icons, title, text PNGs).
- Target directory skeleton scaffolded (empty, .gitkeep).

## In progress / next (in order)
1. Move `app/components/HubButton.tsx` → `components/ui/HubButton.tsx`; update the import in
   `app/page.tsx` to `@/components/ui/HubButton`; remove the empty `app/components/`. (structural)
2. Fix hub responsiveness (mobile + desktop).

## Not started
- archival route (`app/archival/page.tsx`) — design PNGs in `DESIGN/` (desktop + mobile).
- loja/store route (`app/loja/`) — no design; replicate golfwang STRUCTURE first (refs in `DESIGN/references/`), style later.
- mapa/map route (`app/mapa/`) — BLOCKED: no design or reference yet.

## Constraints
- Never add npm deps or edit package.json / next.config.ts / .env* / .vercel / tsconfig.json without human approval.
- New pages/sections are design-sensitive → queue as drafts for human review; the gate cannot verify visual/responsive correctness.
