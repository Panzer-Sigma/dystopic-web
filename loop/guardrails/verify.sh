#!/usr/bin/env bash
# Final gate. The loop invokes this with cwd = worktree root (repo root copy).
# The Next.js app lives in dystopic-front/. `next build` runs the TypeScript
# typecheck as part of compilation, so build + lint is the full machine gate.
set -e
cd dystopic-front
npm run lint
npm run build
