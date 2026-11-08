# QA harness

Adapted from [frontend_for_website](https://github.com/Hummingbirdhk/frontend_for_website) to the existing English Platform architecture.

## Main gate

Run `npm run qa` before merging. It runs the existing `npm run verify`
(Prettier, ESLint, TypeScript, dependency-cruiser, Redux/UI boundaries,
content validation, Vitest and Vite production build), plus:

- `npm run qa:architecture` — additional layer boundary checks for the
  actual `app/pages/entities/features/content/shared` dependency graph;
- `npm run qa:architecture:test` — positive and negative regression fixtures;
- `npm run qa:security` — TypeScript AST scan for eval, Function constructor,
  string timers, dangerous JSX HTML and javascript: URLs;
- `npm run qa:security:test` — positive and negative security fixtures;
- `npm run qa:audit` — fail-closed dependency audit using the existing npm lockfile.

## Browser smoke tests

`npm run qa:browser` runs Playwright against a local Vite server and covers
navigation, lesson interactions and a public login form. Install browser binaries
first with `npx playwright install chromium`.

Browser checks do not need student credentials or access to private Supabase
records. They deliberately do not assert that uploads or teacher dashboards
work against a live database; those require separate authenticated integration tests.

## Structure

```
tools/qa/
  architecture/check.mjs
  architecture/check.test.mjs
  security/check.mjs
  security/check.test.mjs
  README.md
tests/browser/
  public-navigation.spec.ts
  irregular-lesson.spec.ts
playwright.config.ts
```

The reference repository's `maintainer-console`, API routes, Redux store layout,
Yarn lockfile, and backend-specific tests are **not** copied into the English
teaching platform. The existing lesson, teacher and student routes are preserved.
