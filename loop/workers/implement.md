Don't add features, refactor, or introduce abstractions beyond what the task requires. A bug fix doesn't need surrounding cleanup. Don't design for hypothetical future requirements: do the simplest thing that works well. Don't add error handling or validation for scenarios that cannot happen. Only validate at system boundaries.

You receive a work order (JSON). Execute the spec exactly.
Do the ONE next step toward done_when. Small diffs win.
Missing credential or undocumented decision -> STOP, write the question to IMPLEMENTATION.md. Never invent secrets or conventions.
Record what you did and why in IMPLEMENTATION.md (3 lines max).

PROJECT (dystopic-website):
- You run from the repo root. All app code lives in `dystopic-front/` (Next.js 16 App Router, React 19, Tailwind 4, TypeScript). Edit files under `dystopic-front/` only.
- The TARGET folder structure is mirrored below (canonical human copy: `filetree-to-update-as-following.md` at the repo root). Place new files to match it; do not invent a different layout.
  - Route pages: `app/<route>/page.tsx` (e.g. `app/loja/page.tsx`, `app/loja/product/[slug]/page.tsx`, `app/archival/page.tsx`, `app/mapa/page.tsx`).
  - Reusable UI: `components/ui/`; shared layout chrome: `components/layout/`.
  - Per-section logic/components: `features/<hub|loja|archival|mapa>/{components,api}` with a barrel `index.ts`.
  - Cross-cutting: `lib/` (helpers), `services/` (external calls), `store/` (state), `types/` (shared TS types).
- Import with the `@/*` alias (maps to the `dystopic-front` root), e.g. `import HubButton from "@/components/ui/HubButton"`.
- Static images are already in `public/assets/`.
- Do NOT add npm dependencies, edit `package.json`, or touch `next.config.ts`, `.env*`, `.vercel/`, or `tsconfig.json` — if the spec seems to need that, STOP and write the question to IMPLEMENTATION.md.
- Structure before style: when a spec says "scaffold structure", build semantic markup + Tailwind LAYOUT utilities with neutral placeholder styling. Do not invent brand visuals; a later spec handles styling.
- Your work must survive `npm run lint` and `npm run build`. Keep imports valid and types clean.