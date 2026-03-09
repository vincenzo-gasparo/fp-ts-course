# my-courses

A pnpm monorepo for publishing structured MDX courses as static sites on GitHub Pages. All course UI, components, and logic live once in a shared package — adding a new course is just content and config.

## Courses

| Course | Path | Description |
|--------|------|-------------|
| [fp-ts Course](apps/fp-ts-course) | `apps/fp-ts-course` | 16-day structured course on functional TypeScript with fp-ts |
| [Next.js Course](apps/nextjs-course) | `apps/nextjs-course` | 16-day Next.js course from zero (React included) |

## Monorepo Structure

```
apps/
  home/                  # Landing page listing all courses
  fp-ts-course/          # Course app — only content + config
    src/content/lessons/ # MDX lesson files (day-00.mdx … day-15.mdx)
    course.config.ts     # Title, description, localStorage key
    astro.config.mjs     # Astro config with shared integration
    tests/               # Playwright E2E tests
  nextjs-course/         # Same structure as fp-ts-course
packages/
  course-ui/             # Shared framework (@courses/ui)
    src/integration.ts   # Astro integration — injects routes + virtual module
    src/pages/           # Shared index and lesson pages
    src/components/      # React components (progress, quiz, TOC, …)
    src/lib/             # Progress helpers, utilities + unit tests
    src/styles/          # Global CSS + Tailwind theme
```

## Getting Started

```bash
pnpm install

# Run a specific course in dev mode
pnpm dev:fp-ts    # localhost:3000
pnpm dev:nextjs   # localhost:3001
```

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev:home` | Dev server for home landing page |
| `pnpm dev:fp-ts` | Dev server for fp-ts-course (port 3000) |
| `pnpm dev:nextjs` | Dev server for nextjs-course (port 3001) |
| `pnpm dev:all` | Dev servers for all apps in parallel |
| `pnpm build:all` | Production build for all apps |
| `pnpm preview:fp-ts` | Serve fp-ts-course build locally (localhost:3000) |
| `pnpm preview:nextjs` | Serve nextjs-course build locally (localhost:3001) |
| `pnpm preview:all` | Build all + serve all locally in parallel |
| `pnpm test:all` | Unit tests + typecheck + lint (full CI suite) |
| `pnpm test:unit` | Vitest unit tests (`packages/course-ui`) |
| `pnpm typecheck` | TypeScript check across all apps and packages |
| `pnpm lint:all` | ESLint across all apps |
| `pnpm clean` | Remove all build artifacts (`dist`, `.astro`) |

### E2E tests (per course)

E2E tests require the dev server to be running first:

```bash
pnpm dev:fp-ts

# In a second terminal:
pnpm --filter fp-ts-course exec playwright test
```

## Deployment

All apps deploy to a single GitHub Pages site on every push to `main`:

```
username.github.io/<repo>/              ← home
username.github.io/<repo>/fp-ts-course/
username.github.io/<repo>/nextjs-course/
```

Each course is built with `CI=true`, which sets the correct `base` path and switches home page links from localhost URLs to relative paths. See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Adding a New Course

1. **Copy the scaffold:**
   ```bash
   cp -r apps/fp-ts-course apps/my-new-course
   ```

2. **Edit `course.config.ts`:**
   ```ts
   export default {
     title: 'My New Course',
     description: 'Course description.',
     storageKey: 'my-new-course:progress',
   }
   ```

3. **Replace `src/content/lessons/*.mdx`** with your own lesson files.

4. **Update `astro.config.mjs`** — change `base` path to `/my-new-course`.

5. **Add to `deploy.yml`** — duplicate the build + cp lines.

6. **Add a dev script** to root `package.json`:
   ```json
   "dev:my-new-course": "pnpm --filter my-new-course dev"
   ```

## Tech Stack

- [Astro 5](https://astro.build) — static site generation, content collections, MDX
- [React 19](https://react.dev) — interactive components (progress, quizzes)
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [Expressive Code](https://expressive-code.com) — syntax-highlighted code blocks
- [nanostores](https://github.com/nanostores/nanostores) — lightweight state management
- [Playwright](https://playwright.dev) — E2E tests
- [Vitest](https://vitest.dev) — unit tests
- [pnpm workspaces](https://pnpm.io/workspaces) — monorepo
