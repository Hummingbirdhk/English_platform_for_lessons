# Architecture Rules

## Runtime

The application is a static React + TypeScript SPA deployed to GitHub Pages. The foundation has no backend, database, SSR, Docker requirement, or server runtime. Routing uses `HashRouter`.

## Dependency direction

```text
app (composition root)
  -> pages
      -> entities
          -> features
              -> content/shared
```

`content` may depend only on `shared`. `shared` must not depend on higher layers.

The one deliberate upward bridge is a feature controller importing typed hooks from `src/app/store/hooks.ts`. Presentation UI never uses that bridge.

## Feature structure

```text
features/<name>/
  ui/          # pure presentation components
  controller/  # state/application adapter
  model/       # Redux Toolkit state/actions/selectors/thunks/listeners
  lib/         # pure business logic
  types.ts
  index.ts
```

## React / Redux boundary

React component files (`.tsx`) do not import `@reduxjs/toolkit` or `react-redux` directly. The only allowed infrastructure exception is `src/app/providers/AppProviders.tsx`, which mounts the application Redux Provider.

Feature controllers may use typed hooks from `src/app/store/hooks.ts`. Feature model files may use Redux Toolkit. React components consume controller outputs, props, callbacks, and view-model data instead.

## Presentation boundary

Files under `ui/` or `components/` consume props and callbacks only. In addition to the global React/Redux rule, they must not import store modules, slices, reducers, thunks, listeners, model internals, or raw selectors.

A presentation component must work in tests without a Redux Provider.

## Store composition

`src/app/store/store.ts` may import feature reducers directly for composition. That exception must not leak to pages or UI.

## Declarative content

Normal lessons are data under `src/content`, not one-off React pages. Interactive code is selected through `src/features/registry/featureRegistry.tsx`. Allowed content keys live in `src/shared/config/featureKeys.ts`.

## Enforcement

`npm run check:architecture`, `npm run check:ui-redux`, ESLint, tests, and `npm run verify` are executable requirements, not suggestions.

The direct Redux-import rule is intentionally enforced twice: by ESLint and by `scripts/check-ui-redux-imports.mjs`. The independent checker has an executable regression fixture in `tests/architecture`.
