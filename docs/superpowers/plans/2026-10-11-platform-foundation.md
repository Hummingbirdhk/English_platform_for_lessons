# Platform Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static React + Redux Toolkit + Ant Design teaching platform that renders validated lesson content, supports custom interactive features, enforces UI/business-logic decoupling, and deploys safely to GitHub Pages.

**Architecture:** Most lessons are declarative JSON validated by Zod. Interactive features expose a small public API and split presentation UI from controller/view-model and Redux model code. Hermetic repository checks enforce dependency direction, ban direct RTK/React Redux imports from presentation components, validate all content, and run identically locally and in GitHub Actions.

**Tech Stack:** React, TypeScript, Vite, Redux Toolkit, React Redux, Ant Design, React Router, Zod, Vitest, React Testing Library, ESLint, Prettier, dependency-cruiser, GitHub Actions, GitHub Pages, npm.

**Spec:** `docs/superpowers/specs/2026-10-11-platform-foundation-design.md`

## Global Constraints

- Static SPA deployable to GitHub Pages; no backend, database, SSR, Docker, or server runtime.
- Routing uses `HashRouter`.
- Presentation components must not import `@reduxjs/toolkit`, `react-redux`, store modules, slices, reducers, thunks, listeners, or raw selectors.
- Redux may appear only behind controller/application boundaries and app-store composition.
- Most lessons are JSON; unusual interactions are custom feature modules registered in a central feature registry.
- `npm run verify` is the canonical hermetic check and requires no network, secrets, remote APIs, or external services after `npm ci`.
- GitHub Actions must call the same repository scripts used locally.
- GitHub Pages base path is `/English_platform_for_lessons/`.
- Existing educational rules remain authoritative: Grade 6, A2 by default, early B1 only when appropriate, accurate modern English, natural Russian translations, no filler/gibberish/placeholders.

## Review Focus

- A lesson references an unknown feature key: validation must fail before build/deploy.
- Two content objects reuse the same ID: validation must fail deterministically.
- A presentation component imports `react-redux` or `@reduxjs/toolkit`: at least two independent architecture gates must fail.
- The app is opened on a nested lesson route under GitHub Pages: HashRouter/base-path behavior must still render the lesson.
- Runtime content/feature rendering throws: students must see a safe fallback, not stack traces or internal paths.

---

## File Map

### Application shell

- `package.json` — dependency list and canonical scripts.
- `package-lock.json` — deterministic dependency resolution.
- `vite.config.ts` — Vite build/test aliases and GitHub Pages base path.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — strict TypeScript configuration.
- `src/main.tsx` — mounts providers and application.
- `src/app/App.tsx` — top-level route shell.
- `src/app/providers/AppProviders.tsx` — Ant Design, Redux, and router composition.
- `src/app/store/store.ts` — Redux store creation and root reducer composition.
- `src/app/store/hooks.ts` — typed Redux hooks available to controllers only.
- `src/app/routing/routes.tsx` — route declarations using HashRouter.
- `src/pages/home/HomePage.tsx` — lesson index.
- `src/pages/lesson/LessonPage.tsx` — route-level lesson loader.
- `src/pages/not-found/NotFoundPage.tsx` — missing route/lesson fallback.
- `src/shared/ui/AppErrorBoundary.tsx` — student-safe runtime error boundary.

### Content system

- `src/content/schema/lessonSchema.ts` — Zod schemas for lesson metadata and sections.
- `src/content/schema/exerciseSchema.ts` — Zod schemas for standard exercise definitions.
- `src/content/schema/contentSchema.ts` — root content schema and allowed level/grade constants.
- `src/content/types.ts` — inferred content types.
- `src/content/loadContent.ts` — static JSON import/glob loader.
- `src/content/validateContent.ts` — duplicate-ID, reference-integrity, and schema checks.
- `src/content/validate-cli.ts` — CLI entry point used by repository verification.
- `src/content/lessons/grade-6/present-simple/lesson.json` — starter declarative lesson.
- `src/content/exercises/present-simple-basics.json` — starter exercise data.
- `tests/content/content-validation.test.ts` — schema/reference/duplicate tests.

### Feature architecture

- `src/features/registry/featureRegistry.ts` — canonical registry of renderable feature keys.
- `src/features/registry/types.ts` — feature-renderer contract.
- `src/features/multiple-choice/types.ts` — feature-specific data/view-model types.
- `src/features/multiple-choice/lib/evaluateAnswer.ts` — pure answer evaluation.
- `src/features/multiple-choice/model/slice.ts` — Redux Toolkit state/actions.
- `src/features/multiple-choice/model/selectors.ts` — stable selector/view-model derivation.
- `src/features/multiple-choice/controller/useMultipleChoice.ts` — Redux-to-UI adapter.
- `src/features/multiple-choice/ui/MultipleChoiceExercise.tsx` — pure presentational component.
- `src/features/multiple-choice/MultipleChoiceFeature.tsx` — container composition.
- `src/features/multiple-choice/index.ts` — public API.
- `tests/features/multiple-choice/evaluateAnswer.test.ts` — pure logic test.
- `tests/features/multiple-choice/MultipleChoiceExercise.test.tsx` — props/callback-only UI test.
- `tests/features/multiple-choice/MultipleChoiceFeature.test.tsx` — controller/integration test.

### Lesson rendering

- `src/entities/lesson/LessonRenderer.tsx` — renders validated sections by type.
- `src/entities/lesson/sectionRenderers.tsx` — maps standard section types and custom feature registry.
- `tests/entities/lesson/LessonRenderer.test.tsx` — declarative + feature rendering tests.

### Quality gates

- `eslint.config.js` — lint rules including restricted imports for UI/component paths.
- `.prettierrc.json` — formatting rules.
- `.dependency-cruiser.cjs` — layer-boundary/deep-import/cycle rules.
- `scripts/check-ui-redux-imports.mjs` — independent direct-import scanner.
- `scripts/check-architecture.mjs` — runs dependency rules and repository-specific architecture checks.
- `scripts/verify-repository.mjs` — sequential canonical verifier.
- `tests/architecture/fixtures/illegal-ui-redux.tsx` — intentionally invalid fixture.
- `tests/architecture/fixtures/illegal-layer-import.ts` — intentionally invalid fixture.
- `tests/architecture/architecture-checks.test.ts` — proves the checkers reject invalid fixtures.

### Agent rules

- `AGENTS.md` — update mandatory technical workflow and verification obligations.
- `rules/ARCHITECTURE.md` — layer boundaries and controller/UI contract.
- `rules/CODE_QUALITY.md` — TDD, scripts, verification, dependency rules.
- `rules/CONTENT_SCHEMA.md` — content contracts and validation expectations.
- `rules/FEATURE_CREATION.md` — exact checklist for new custom features.
- Existing educational rule files remain separate and authoritative.

### CI/deployment

- `.github/workflows/ci.yml` — `npm ci` + `npm run verify` for PRs/pushes.
- `.github/workflows/deploy-pages.yml` — verified production build and GitHub Pages deployment from `main`.

---

### Task 1: Bootstrap the static application shell

**Files:**

- Create: `package.json`
- Create: `package-lock.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/providers/AppProviders.tsx`
- Create: `src/app/store/store.ts`
- Create: `src/app/store/hooks.ts`
- Create: `src/app/routing/routes.tsx`
- Create: `src/pages/home/HomePage.tsx`
- Create: `src/pages/lesson/LessonPage.tsx`
- Create: `src/pages/not-found/NotFoundPage.tsx`
- Create: `src/shared/ui/AppErrorBoundary.tsx`
- Test: `tests/app/app-shell.test.tsx`

**Interfaces:**

- Produces: `store`, `RootState`, `AppDispatch`, `useAppDispatch()`, `useAppSelector`, `AppProviders`, and working routes `#/ ` and `#/lesson/:lessonId`.
- Consumes: none.

- [ ] **Step 1: Write the failing application-shell test**

Create tests that assert:

- the home heading renders;
- navigating to `#/lesson/missing` renders the not-found/student-safe state;
- a component throwing under `AppErrorBoundary` renders a friendly fallback without exposing the thrown stack/message.

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- tests/app/app-shell.test.tsx`  
Expected: FAIL because the app shell/providers/routes do not exist yet.

- [ ] **Step 3: Implement the minimal Vite/React/AntD/Redux/HashRouter shell**

Use strict TypeScript. Configure Vite `base: '/English_platform_for_lessons/'`. Keep Redux infrastructure in `src/app/store`; no page component may directly dispatch application thunks or import slices.

- [ ] **Step 4: Run shell tests and production build**

Run: `npm test -- tests/app/app-shell.test.tsx && npm run typecheck && npm run build`  
Expected: PASS; `dist/` is produced.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig*.json index.html src tests/app
git commit -m "feat: bootstrap static React application shell"
```

---

### Task 2: Add validated declarative content

**Files:**

- Create: `src/content/schema/lessonSchema.ts`
- Create: `src/content/schema/exerciseSchema.ts`
- Create: `src/content/schema/contentSchema.ts`
- Create: `src/content/types.ts`
- Create: `src/content/loadContent.ts`
- Create: `src/content/validateContent.ts`
- Create: `src/content/validate-cli.ts`
- Create: `src/content/lessons/grade-6/present-simple/lesson.json`
- Create: `src/content/exercises/present-simple-basics.json`
- Test: `tests/content/content-validation.test.ts`

**Interfaces:**

- Produces: `Lesson`, `ExerciseDefinition`, `loadAllContent(): ContentBundle`, `validateContent(bundle: ContentBundle, registeredFeatureKeys: ReadonlySet<string>): ValidationResult`.
- Consumes: registered feature keys will be supplied as a parameter so validation remains decoupled from React rendering.

- [ ] **Step 1: Write failing content-validation tests**

Tests must assert:

- valid A2 Grade-6 content passes;
- missing required lesson fields fail;
- an unknown section/feature key fails;
- duplicate IDs fail;
- missing referenced exercise IDs fail.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- tests/content/content-validation.test.ts`  
Expected: FAIL because schemas/loaders/validators do not exist.

- [ ] **Step 3: Implement Zod schemas, static loaders, and reference validation**

Canonical level values: `A1 | A2 | B1`. The starter lesson is Grade 6, level A2, and references one multiple-choice exercise. Validation errors must include the offending content ID/path but never be shown directly to students at runtime.

- [ ] **Step 4: Add CLI validation entry point and verify**

Run: `npm test -- tests/content/content-validation.test.ts && npm run validate:content`  
Expected: PASS and CLI exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/content tests/content package.json package-lock.json
git commit -m "feat: add validated declarative lesson content"
```

---

### Task 3: Implement the first decoupled interactive feature

**Files:**

- Create: `src/features/registry/types.ts`
- Create: `src/features/registry/featureRegistry.ts`
- Create: `src/features/multiple-choice/types.ts`
- Create: `src/features/multiple-choice/lib/evaluateAnswer.ts`
- Create: `src/features/multiple-choice/model/slice.ts`
- Create: `src/features/multiple-choice/model/selectors.ts`
- Create: `src/features/multiple-choice/controller/useMultipleChoice.ts`
- Create: `src/features/multiple-choice/ui/MultipleChoiceExercise.tsx`
- Create: `src/features/multiple-choice/MultipleChoiceFeature.tsx`
- Create: `src/features/multiple-choice/index.ts`
- Modify: `src/app/store/store.ts`
- Test: `tests/features/multiple-choice/evaluateAnswer.test.ts`
- Test: `tests/features/multiple-choice/MultipleChoiceExercise.test.tsx`
- Test: `tests/features/multiple-choice/MultipleChoiceFeature.test.tsx`

**Interfaces:**

- Produces: feature registry key `multiple-choice`; `MultipleChoiceExerciseProps`; controller return shape `{ selectedOptionId, status, selectOption(id), submit() }`; public `MultipleChoiceFeature`.
- Consumes: `useAppDispatch`, `useAppSelector`, validated exercise data.

- [ ] **Step 1: Write failing pure-logic and presentation tests**

Assert:

- `evaluateAnswer(selectedId, correctId)` returns `correct` or `incorrect`;
- `MultipleChoiceExercise` renders only from props and invokes `onSelect`/`onSubmit`;
- the UI test does not need a Redux Provider.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- tests/features/multiple-choice`  
Expected: FAIL because feature code does not exist.

- [ ] **Step 3: Implement pure UI, model, controller, container, and public API**

Only `controller/`, `model/`, and app-store composition may import Redux APIs. `ui/MultipleChoiceExercise.tsx` accepts data/callback props only.

- [ ] **Step 4: Add controller/integration test and verify**

Assert that selecting/submitting through the feature container updates rendered status while the UI file remains independently renderable.

Run: `npm test -- tests/features/multiple-choice`  
Expected: PASS.

- [ ] **Step 5: Register `multiple-choice` and verify content validation**

Run: `npm run validate:content`  
Expected: PASS; the starter lesson's feature key is registered.

- [ ] **Step 6: Commit**

```bash
git add src/features src/app/store tests/features
git commit -m "feat: add decoupled multiple choice feature"
```

---

### Task 4: Render lessons through the feature registry

**Files:**

- Create: `src/entities/lesson/sectionRenderers.tsx`
- Create: `src/entities/lesson/LessonRenderer.tsx`
- Modify: `src/pages/home/HomePage.tsx`
- Modify: `src/pages/lesson/LessonPage.tsx`
- Test: `tests/entities/lesson/LessonRenderer.test.tsx`
- Modify: `tests/app/app-shell.test.tsx`

**Interfaces:**

- Produces: `LessonRenderer({ lesson, exercises })` and a lesson page that resolves `lessonId` from static content.
- Consumes: validated content loaders and feature registry.

- [ ] **Step 1: Write failing renderer tests**

Assert:

- the starter Present Simple lesson title renders;
- the registered multiple-choice section renders from JSON;
- an unrenderable section produces a student-safe fallback;
- navigating to the nested hash route for the starter lesson works.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- tests/entities/lesson/LessonRenderer.test.tsx tests/app/app-shell.test.tsx`  
Expected: FAIL because the lesson renderer is not wired.

- [ ] **Step 3: Implement registry-based lesson rendering**

Do not import feature internals from lesson entities; consume registry/public APIs only.

- [ ] **Step 4: Run renderer/app tests and build**

Run: `npm test -- tests/entities/lesson/LessonRenderer.test.tsx tests/app/app-shell.test.tsx && npm run build`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/entities src/pages tests/entities tests/app
git commit -m "feat: render declarative lessons through feature registry"
```

---

### Task 5: Add hermetic architecture and code-quality gates

**Files:**

- Create: `eslint.config.js`
- Create: `.prettierrc.json`
- Create: `.dependency-cruiser.cjs`
- Create: `scripts/check-ui-redux-imports.mjs`
- Create: `scripts/check-architecture.mjs`
- Create: `scripts/verify-repository.mjs`
- Create: `tests/architecture/fixtures/illegal-ui-redux.tsx`
- Create: `tests/architecture/fixtures/illegal-layer-import.ts`
- Create: `tests/architecture/architecture-checks.test.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**

- Produces npm scripts: `format:check`, `lint`, `typecheck`, `check:ui-redux`, `check:architecture`, `validate:content`, `test:run`, `build`, `verify`.
- Consumes repository source files only; no network or secrets.

- [ ] **Step 1: Write failing architecture-check tests**

Tests execute checkers against fixtures and assert:

- `illegal-ui-redux.tsx` is rejected for `react-redux` and `@reduxjs/toolkit`;
- `illegal-layer-import.ts` is rejected for reverse/deep dependency;
- valid production source passes.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- tests/architecture/architecture-checks.test.ts`  
Expected: FAIL because checkers/configuration do not exist.

- [ ] **Step 3: Implement ESLint restricted imports**

For `**/ui/**/*.tsx` and `**/components/**/*.tsx`, forbid:

- `@reduxjs/toolkit`;
- `react-redux`;
- imports matching app-store/model/slice/reducer/thunk/listener paths.

- [ ] **Step 4: Implement independent UI import scanner**

`node scripts/check-ui-redux-imports.mjs` must scan presentation paths and exit non-zero with file/import details on violation.

- [ ] **Step 5: Implement dependency-cruiser layer rules and architecture wrapper**

Enforce the spec's app/pages/features/entities/shared direction, UI-to-model/store prohibition, feature-internal deep-import rules, and relevant cycles.

- [ ] **Step 6: Implement canonical verifier**

`node scripts/verify-repository.mjs` runs, in order:

1. Prettier check;
2. ESLint;
3. TypeScript;
4. architecture checks;
5. UI/Redux scanner;
6. content validation;
7. Vitest;
8. Vite production build.

Stop on first failure and preserve child exit code.

- [ ] **Step 7: Verify architecture fixtures and full repository**

Run: `npm test -- tests/architecture/architecture-checks.test.ts && npm run verify`  
Expected: fixture tests PASS because violations are detected; production verification exits 0.

- [ ] **Step 8: Commit**

```bash
git add eslint.config.js .prettierrc.json .dependency-cruiser.cjs scripts tests/architecture package.json package-lock.json
git commit -m "chore: enforce hermetic architecture quality gates"
```

---

### Task 6: Encode agent-facing technical rules

**Files:**

- Modify: `AGENTS.md`
- Create: `rules/ARCHITECTURE.md`
- Create: `rules/CODE_QUALITY.md`
- Create: `rules/CONTENT_SCHEMA.md`
- Create: `rules/FEATURE_CREATION.md`
- Modify: `README.md`
- Test: `tests/architecture/repository-rules.test.ts`

**Interfaces:**

- Produces: mandatory agent workflow tied to executable checks.
- Consumes: exact scripts and boundaries created in Task 5.

- [ ] **Step 1: Write failing repository-rules test**

Assert required files exist and `AGENTS.md` explicitly requires:

- reading architecture/code-quality/content/feature rules when relevant;
- running `npm run verify` before completion;
- no direct Redux imports in presentation UI;
- no bypass/disable of quality gates to make CI pass.

- [ ] **Step 2: Run test and verify failure**

Run: `npm test -- tests/architecture/repository-rules.test.ts`  
Expected: FAIL because technical rule files do not exist yet.

- [ ] **Step 3: Write concise technical rule documents and update AGENTS/README**

Keep educational rules separate. Technical docs must reference executable commands rather than duplicating implementation details inconsistently.

- [ ] **Step 4: Run documentation contract and full verification**

Run: `npm test -- tests/architecture/repository-rules.test.ts && npm run verify`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add AGENTS.md README.md rules tests/architecture/repository-rules.test.ts
git commit -m "docs: codify agent architecture and quality rules"
```

---

### Task 7: Add GitHub CI and Pages deployment

**Files:**

- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/deploy-pages.yml`
- Test: `tests/architecture/workflows.test.ts`

**Interfaces:**

- Produces: PR/push CI and verified Pages deployment from `main`.
- Consumes: `npm ci`, `npm run verify`, and Vite `dist/`.

- [ ] **Step 1: Write failing workflow-contract tests**

Parse workflow YAML and assert:

- CI runs on pull requests and invokes `npm ci` then `npm run verify`;
- deploy workflow is restricted to `main`;
- deployment verifies before uploading `dist/`;
- Pages permissions are minimal and explicit.

- [ ] **Step 2: Run test and verify failure**

Run: `npm test -- tests/architecture/workflows.test.ts`  
Expected: FAIL because workflows do not exist.

- [ ] **Step 3: Implement CI and Pages workflows**

Use official GitHub Actions for checkout, Node setup, Pages configuration/artifact upload/deploy. Do not duplicate lint/test commands individually; call `npm run verify`.

- [ ] **Step 4: Run workflow-contract tests and full verification**

Run: `npm test -- tests/architecture/workflows.test.ts && npm run verify`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add .github/workflows tests/architecture/workflows.test.ts
git commit -m "ci: add verification and GitHub Pages deployment"
```

---

### Task 8: Final branch verification and pull request

**Files:**

- Modify only files required by failures found during final verification.

**Interfaces:**

- Produces: reviewable foundation branch and PR into `main`.
- Consumes: all previous tasks.

- [ ] **Step 1: Run the canonical hermetic verification from a clean dependency install**

Run:

```bash
rm -rf node_modules dist
npm ci
npm run verify
```

Expected: PASS with no network use after `npm ci`.

- [ ] **Step 2: Inspect the production artifact**

Verify `dist/` exists, contains the static app, and asset URLs use the repository base path.

- [ ] **Step 3: Review changed-file scope**

Confirm no unrelated educational content was rewritten and no source file bypasses public APIs or architecture rules.

- [ ] **Step 4: Commit only necessary final fixes**

If no fixes are required, do not create an empty commit.

- [ ] **Step 5: Open a pull request**

Title: `Build platform foundation with hermetic architecture checks`

PR body must summarize:

- static React/RTK/AntD architecture;
- declarative content + feature registry;
- UI/Redux decoupling;
- content/architecture validation;
- GitHub Actions and Pages deployment;
- final `npm run verify` result.
