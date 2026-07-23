# DYSTOPIC-WEBSITE

_EM FASE DEV_

Dark, glitch-aesthetic transmedia platform ("Plataforma Transmidiática Regenerativa") built with Next.js and deployed on Vercel. The visual identity is image-driven: backgrounds, titles, buttons, and labels are handmade exported PNG/WebP art pieces, not styled text.

## Structure

- **App code:** `dystopic-front/` — Next.js 16 (App Router, Turbopack), React 19, Tailwind 4, TypeScript.
- **Design source:** `DESIGN/.EXPORT PARTES/` — `HUB DESKTOP`, `HUB MOBILE`, `ARCHIVAL DESKTOP`, `ARCHIVAL MOBILE` composites and exported parts.
- **Deploy:** Vercel project `dystopic-hub`.

## Routes

| Route | Status | Notes |
|---|---|---|
| `/` (hub) | done | Diamond layout of 3 buttons (Archival, Loja, Mapa) around the logo. |
| `/archival` | in progress | Paginated feed with placeholder entries. |
| `/loja` | to do | Store, structure TBD. |
| `/mapa` | to do | Awaiting design. |
| `/termos`, `/privacidade` | done | Legal pages, placeholder copy. |

## Development

```bash
cd dystopic-front
npm install
npm run dev
```

```bash
npm run lint
npm run build
npx playwright test
```

See `BACKLOG.md` for current work status.
