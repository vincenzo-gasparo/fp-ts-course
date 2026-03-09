# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo structure

This is a **pnpm workspace monorepo**. All commands should be run from the repo root unless noted.

```
apps/
  home/                # Landing page listing all courses
  fp-ts-course/        # fp-ts course — content + thin config only
  nextjs-course/       # Next.js course — content + thin config only
packages/
  course-ui/           # Shared framework (@courses/ui) — all components, pages, and integration
```

## Commands

```bash
# Development (run from repo root)
pnpm dev:home          # Dev server for home landing page
pnpm dev:fp-ts         # Dev server for fp-ts-course at localhost:3000
pnpm dev:nextjs        # Dev server for nextjs-course at localhost:3001
pnpm dev:all           # All apps in parallel

# Build & preview
pnpm build:all         # Production build for all apps (CI=true sets base paths)
pnpm preview:fp-ts     # Serve fp-ts-course dist/ locally at localhost:3000
pnpm preview:nextjs    # Serve nextjs-course dist/ locally at localhost:3001
pnpm preview:all       # Build all + serve all locally in parallel

# Tests
pnpm test:all          # Unit tests + typecheck + lint (full CI suite)
pnpm test:unit         # Vitest unit tests (packages/course-ui only)
pnpm typecheck         # tsc --noEmit across all apps and packages
pnpm lint:all          # ESLint across all apps

# E2E tests (requires dev server running — run from apps/fp-ts-course)
npx playwright test
npx playwright test tests/smoke.spec.ts

# Cleanup
pnpm clean             # Remove dist and .astro build artifacts
```

## Architecture

Each course app is an **Astro 5** site with **static output** (no server runtime). All pages are pre-rendered at build time.

### Shared package: `@courses/ui`

Lives in `packages/course-ui/src/`. Import as `@courses/ui` from any app.

- **Astro integration** — `courseIntegration(config)` injects shared routes and virtual module
- **Pages** — `@courses/ui/pages/index.astro`, `@courses/ui/pages/lesson.astro` (injected via integration)
- **Components** — `ProgressInit`, `MarkCompleteButton`, `ProgressBar`, `DayCardList`, `TableOfContents`, `Quiz`, `ThemeToggle`
- **Lib** — `loadProgress(storageKey)`, `saveProgress(storageKey, days)`, `cn`

Fonts and global CSS live in the shared package; apps only need `course.config.ts` and MDX content.

### Per-app files (in each `apps/*/`)

- `course.config.ts` — `{ title, description, storageKey }` passed to the integration
- `src/content/config.ts` — Astro content collection schema (identical across apps)
- `src/content/lessons/day-NN.mdx` — lesson MDX files
- `astro.config.mjs` — imports `courseIntegration`, sets `base` path from `CI` env var

### Content pipeline

```
apps/*/src/content/lessons/*.mdx
  → Astro content collections (built-in, no extra build step)
    → pages injected by courseIntegration:
        /                    → @courses/ui/pages/index.astro
        /lessons/[slug]      → @courses/ui/pages/lesson.astro
```

Each lesson frontmatter schema (defined in `src/content/config.ts`):
```
title, day (number), description?, quiz[]?
```

Quiz items: `{ question, options: string[], correct: number, explanation }`.

### Virtual module: `virtual:course-config`

The integration registers a Vite virtual module that exposes `course.config.ts` data to shared pages and components:

```ts
import courseConfig from 'virtual:course-config'
// → { title, description, storageKey }
```

TypeScript types are declared in `packages/course-ui/src/virtual.d.ts`.

### Progress tracking

- `packages/course-ui/src/lib/progress.ts` — SSR-safe `loadProgress(storageKey)` / `saveProgress(storageKey, days)`
- `packages/course-ui/src/components/progress-provider.tsx` — nanostores-based; `ProgressInit` hydrates from localStorage
- `storageKey` flows from `course.config.ts` → virtual module → `ProgressInit`

### Testing setup

- **Playwright** (`apps/*/tests/`) — E2E tests require dev server running; test IDs use `data-testid` attributes
- **Vitest** (`packages/course-ui/src/lib/progress.test.ts`) — unit tests for localStorage helpers

### Deployment (GitHub Pages)

All courses deploy to one GitHub Pages site under subdirectory paths:
```
username.github.io/<repo>/          ← home
username.github.io/<repo>/fp-ts-course/
username.github.io/<repo>/nextjs-course/
```
See `.github/workflows/deploy.yml`. Each course app sets `base` via `CI=true` in `astro.config.mjs`. The home app links to courses using relative paths (`./fp-ts-course/`) when `CI=true`, and localhost URLs otherwise — matching the same `CI` convention.

Local preview (`pnpm preview:all`) serves apps on their respective ports with no base path. Home page links automatically point to localhost in this mode.

### Adding a new lesson

1. Create `apps/fp-ts-course/src/content/lessons/day-NN.mdx` with frontmatter (`title`, `day`, optional `description` and `quiz`)
2. Astro picks it up automatically — no config change needed
3. Update smoke tests if lesson count assertions exist

### Adding a new course

1. Copy `apps/fp-ts-course` → `apps/new-course`
2. Edit `course.config.ts`, replace `src/content/lessons/*.mdx`
3. Update `base` path in `astro.config.mjs`
4. Add build step in `.github/workflows/deploy.yml`
5. Add `"dev:new-course": "pnpm --filter new-course dev"` to root `package.json`

### Existing courses

| App | Port | Topic | Days |
|-----|------|-------|------|
| `fp-ts-course` | 3000 | Functional TypeScript with fp-ts | 16 (day-00 → day-15) |
| `nextjs-course` | 3001 | Next.js from zero (React included) | 16 (day-00 → day-15) |
