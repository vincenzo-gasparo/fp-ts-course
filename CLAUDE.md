# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev        # Start Next.js dev server at localhost:3000
npm run build      # Static export to /out (runs Velite then Next.js)
npm run lint       # ESLint

# E2E tests (requires dev server running on port 3000)
npx playwright test
npx playwright test tests/smoke.spec.ts   # Run a single test file

# Unit tests
npx vitest
npx vitest src/lib/progress.test.ts       # Run a single test file
```

## Architecture

This is a **Next.js 15 App Router** site with **static export** (no server runtime). All pages are pre-rendered at build time.

### Content pipeline

Lesson content lives in `content/lessons/day-NN.mdx`. **Velite** (`velite.config.ts`) processes these files at build time and outputs typed data to `.velite/` (gitignored). The MDX pipeline applies:
1. `extractRaw` — captures raw code text before Shiki transforms
2. `rehype-pretty-code` (Shiki, `one-dark-pro` theme) — syntax highlighting
3. `attachRaw` — re-attaches raw text to `<pre>` for the copy button
4. `rehype-slug` — adds `id` attributes to headings for TOC anchor links

Each lesson frontmatter schema (defined in `velite.config.ts`):
```
title, day (number), description?, slug (auto), body (MDX), quiz[]?
```

Quiz items: `{ question, options: string[], correct: number, explanation }`.

### Key data flow

```
content/lessons/*.mdx
  → Velite build → .velite/ (generated types + data)
    → imported as: import { lessons } from '.velite'
      → lessons/[slug]/page.tsx renders MDXContent + Quiz + MarkCompleteButton + TableOfContents
```

### Progress tracking

- `src/lib/progress.ts` — SSR-safe `loadProgress()`/`saveProgress()` using `localStorage` key `fp-ts-course:progress` (stores `Set<number>` as JSON array)
- `src/components/progress-provider.tsx` — React Context (`ProgressProvider` + `useProgress` hook) wrapping the whole app in `layout.tsx`; hydrates from localStorage in `useEffect` to avoid SSR mismatch
- `src/components/mark-complete-button.tsx` — consumes `useProgress`
- `src/components/progress-bar.tsx` — consumes `useProgress`

### Static export constraint

Every dynamic route (`/lessons/[slug]`) must export `generateStaticParams()`. Velite data must be built before `next build` — the build script handles this automatically.

### Testing setup

- **Playwright** (`tests/`) — E2E tests require dev server running; test IDs use `data-testid` attributes (e.g., `[data-testid="day-card"]`, `[data-testid="explanation"]`) and `data-day` on day cards
- **Vitest** (`src/lib/progress.test.ts`) — unit tests for localStorage helpers

### Adding a new lesson

1. Create `content/lessons/day-NN.mdx` with required frontmatter (`title`, `day`, optional `description` and `quiz` array)
2. Velite picks it up automatically — no config change needed
3. Update smoke tests if lesson count assertions exist (`tests/smoke.spec.ts` checks for 16 cards)
