# CLAUDE.md — dystopic-website

## PROJECT
- Next.js 16 (App Router) + React 19 + Tailwind 4 + TypeScript. All app code is in `dystopic-front/`.
- The machine gate is `cd dystopic-front && npm run lint && npm run build`. Build includes the TypeScript typecheck. There are no unit tests.
- Deploys via GitHub `Panzer-Sigma/dystopic-web` to Vercel. Every branch gets a preview URL — that is where humans verify how a page looks and how it responds.

## STRUCTURE (target = repo-root `filetree-to-update-as-following.md`)
- Under `dystopic-front/`: `app/` holds routes only (`<route>/page.tsx`); reusable UI in
  `components/ui/`, layout chrome in `components/layout/`; per-section code in
  `features/<hub|loja|archival|mapa>/{components,api}` + `index.ts`; cross-cutting in
  `lib/`, `services/`, `store/`, `types/`.
- Import with the `@/*` alias (→ `dystopic-front` root), e.g. `@/components/ui/HubButton`.
- New files MUST land in their target home above. Never invent a different layout.
- Migrate incrementally, one gate-verifiable issue at a time — never restructure everything
  in one diff. The empty skeleton already exists so each file has a correct home.

## NEVER
- Never exceed 350 changed lines in one commit without asking.
- Never touch auth, billing, migrations, or prod config unattended.
- Never add an npm dependency. Propose it in loop/memory/STATE.md and stop.
- Never edit package.json, next.config.ts, tsconfig.json, .env*, or .vercel/ unattended.
- Never report work as done from your own assessment. Done means `npm run lint` and `npm run build` both passed.
- Never invent a secret, an endpoint, a design, or a convention. Stop and ask.
- Never exceed effort high inside any loop.
- Never edit or delete a check to make it pass. That is a fail, always.
- Never echo or explain your internal reasoning in response text.

## WORDS
- "done" means lint and build both pass, nothing else
- "small" means under 50 changed lines
- "structure" means semantic markup + Tailwind layout only, neutral placeholder styling, no brand visuals
- "cleanup" means behavior identical, gate green before and after

## DONE
- Every task has a machine-checkable done condition (lint + build, and the target route/file exists) before work starts.
- Visual and responsive correctness is NOT machine-checkable here; a human confirms it on the Vercel preview.
- A fresh agent that saw neither plan nor draft verifies the diff against the spec.
- The verify script (lint + build) has the final vote.
- Maker and checker disagree twice, stop and queue for a human.