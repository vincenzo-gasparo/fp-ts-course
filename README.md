# my-courses

A pnpm monorepo for publishing structured MDX courses as static sites on GitHub Pages. All course UI, components, and logic live once in a shared package — adding a new course is just content and config.

## Courses

| Course | Path | Description |
|--------|------|-------------|
| [fp-ts Course](apps/fp-ts-course) | `apps/fp-ts-course` | 15-day structured course on functional TypeScript with fp-ts |

## Monorepo Structure

```
apps/
  fp-ts-course/          # Course app — only content + config
    content/lessons/     # MDX lesson files (day-00.mdx … day-15.mdx)
    course.config.ts     # Title, description, localStorage key
    src/app/             # Next.js App Router pages (thin wrappers)
    tests/               # Playwright E2E + Vitest unit tests
packages/
  course-ui/             # Shared framework — components, lib, styles
    src/components/      # CourseLayout, Quiz, ProgressBar, TOC, …
    src/lib/             # MDX renderer, progress helpers, Velite plugins
```

## Getting Started

```bash
pnpm install

# Run a specific course in dev mode
pnpm dev:fp-ts
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev:fp-ts` | Dev server for fp-ts-course |
| `pnpm build:all` | Production build for all courses |
| `pnpm lint:all` | Lint all course apps |
| `pnpm test:unit` | Run Vitest unit tests across all apps |
| `pnpm typecheck` | TypeScript check across all apps and packages |
| `pnpm clean` | Remove all build artifacts (`.next`, `out`, `.velite`) |

### E2E tests (per course)

E2E tests require the dev server to be running first:

```bash
pnpm dev:fp-ts

# In a second terminal:
pnpm --filter fp-ts-course exec playwright test
```

## Deployment

All courses deploy to a single GitHub Pages site on every push to `main`:

```
username.github.io/<repo>/fp-ts-course
username.github.io/<repo>/rust-course   # future courses
```

Each course is built with its own `basePath` and merged into one deployment directory. See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

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

3. **Replace `content/lessons/*.mdx`** with your own lesson files.

4. **Update `next.config.mjs`** — change `basePath` to `/my-new-course`.

5. **Add to `deploy.yml`** — uncomment and duplicate the build + cp lines.

6. **Add a dev script** to root `package.json`:
   ```json
   "dev:my-new-course": "pnpm --filter my-new-course dev"
   ```

## Tech Stack

- [Next.js 15](https://nextjs.org) — App Router, static export
- [Velite](https://velite.js.org) — MDX content pipeline
- [Tailwind CSS v4](https://tailwindcss.com)
- [rehype-pretty-code](https://rehype-pretty-code.netlify.app) + [Shiki](https://shiki.style) — syntax highlighting
- [Playwright](https://playwright.dev) — E2E tests
- [Vitest](https://vitest.dev) — unit tests
- [pnpm workspaces](https://pnpm.io/workspaces) — monorepo
