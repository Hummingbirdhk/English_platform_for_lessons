# Platform Foundation — Architecture Design

Date: 2026-10-11  
Repository: `Zhopasobaki1998/English_platform_for_lessons`  
Branch: `feature/platform-foundation`

## 1. Goal

Build a static interactive web service for an English teacher. The platform must be deployable to GitHub Pages with no backend and must be safe to extend through an AI coding agent.

The project must support two kinds of educational content:

1. **Declarative content** for most lessons and exercises. These are stored as validated JSON data.
2. **Custom interactive features** for unusual exercises or games that cannot be expressed cleanly as JSON.

The teacher should be able to request new lessons, new content, or new interactive features from an agent without requiring manual architectural decisions each time.

The repository must make incorrect architectural changes difficult to introduce and easy to detect automatically.

---

## 2. Fixed Technical Stack

- React
- TypeScript
- Redux Toolkit
- React Redux
- Ant Design
- Vite
- Vitest
- React Testing Library
- ESLint
- Prettier
- Zod
- dependency-cruiser
- GitHub Actions
- GitHub Pages
- npm with committed `package-lock.json`

The application is a static SPA.

Routing will use `HashRouter` so routes work reliably on GitHub Pages without requiring server-side rewrite rules.

No backend, database, Docker, SSR, Next.js, or server runtime is part of the foundation.

---

## 3. Core Architectural Rule

React presentation components must not know how Redux is implemented.

The required dependency flow is:

```text
static content
    ↓
content validation / repositories
    ↓
feature controller / view-model
    ↓
presentational React UI
```

Redux Toolkit is allowed behind the controller/application boundary.

Presentational components consume only props and callbacks.

They must not:

- import `@reduxjs/toolkit`;
- import `react-redux`;
- import Redux store instances;
- import slices;
- import reducers;
- import thunks;
- import listeners;
- import selectors that expose raw store structure;
- call `dispatch`;
- know Redux state paths.

Example of allowed UI:

```tsx
type Props = {
  answer: string;
  status: 'idle' | 'correct' | 'incorrect';
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
};

export function FillGapExercise({
  answer,
  status,
  onAnswerChange,
  onSubmit,
}: Props) {
  // render only
}
```

The component remains valid if Redux is later restructured or replaced.

---

## 4. Project Structure

```text
src/
├── app/
│   ├── providers/
│   ├── routing/
│   └── store/
│
├── pages/
│   ├── home/
│   ├── lesson/
│   └── not-found/
│
├── features/
│   ├── multiple-choice/
│   ├── matching/
│   ├── sentence-builder/
│   ├── flashcards/
│   └── custom-feature-name/
│
├── entities/
│   ├── lesson/
│   ├── exercise/
│   └── student/
│
├── shared/
│   ├── ui/
│   ├── lib/
│   ├── types/
│   ├── config/
│   └── testing/
│
├── content/
│   ├── lessons/
│   ├── grammar/
│   ├── vocabulary/
│   └── students/
│
└── main.tsx

scripts/
├── check-architecture.mjs
├── check-ui-redux-imports.mjs
├── validate-content.mjs
└── verify-repository.mjs

tests/
├── architecture/
└── content/

rules/
├── GENERAL_RULES.md
├── DESIGN.md
├── LESSON_STRUCTURE.md
├── GRAMMAR_RULES.md
├── VOCABULARY_RULES.md
├── ARCHITECTURE.md
├── CODE_QUALITY.md
├── CONTENT_SCHEMA.md
└── FEATURE_CREATION.md

.github/
└── workflows/
    ├── ci.yml
    └── deploy-pages.yml
```

---

## 5. Feature Structure

Every interactive feature uses the same internal shape.

Example:

```text
features/matching/
├── ui/
│   └── MatchingExercise.tsx
├── controller/
│   └── useMatchingExercise.ts
├── model/
│   ├── slice.ts
│   ├── selectors.ts
│   ├── thunks.ts
│   └── listeners.ts
├── lib/
│   └── evaluateMatching.ts
├── types.ts
└── index.ts
```

### Responsibilities

### `ui/`

Pure presentation.

Allowed:

- React
- Ant Design
- feature types
- callbacks
- view-model data

Forbidden:

- Redux Toolkit
- React Redux
- dispatch
- raw selectors
- store access
- slice imports
- thunk imports
- listener imports

### `controller/`

Adapter between application state and UI.

Allowed:

- typed Redux hooks;
- selectors;
- actions;
- thunks;
- transformation of state into view-models;
- stable callbacks passed to UI.

The controller hides Redux structure from UI.

### `model/`

Redux Toolkit and business state.

Contains:

- slices;
- reducers;
- selectors;
- thunks;
- listeners.

### `lib/`

Pure business logic.

Prefer pure functions here whenever logic does not require Redux.

---

## 6. Public APIs

Each feature exposes a small public API through its `index.ts`.

Other layers must not deep-import internal feature files.

Preferred:

```ts
import { MatchingExerciseFeature } from '@/features/matching';
```

Forbidden:

```ts
import { matchingReducer } from '@/features/matching/model/slice';
```

except inside the application composition/store layer where explicit model integration is required.

This preserves freedom to refactor internal feature structure.

---

## 7. Layer Dependency Rules

Allowed direction:

```text
app
↓
pages
↓
features
↓
entities
↓
shared
```

`content` is data and schemas consumed by application/feature/entity layers.

Rules:

- `shared` cannot import from `entities`, `features`, `pages`, or `app`.
- `entities` cannot import from `features`, `pages`, or `app`.
- `features` cannot import from `pages` or `app`.
- `pages` cannot import from `app/store` directly.
- feature-to-feature imports are forbidden unless routed through a deliberately shared entity/shared abstraction.
- UI directories cannot import model/store code.
- deep imports into another feature's internals are forbidden.

These rules are enforced by dependency-cruiser and custom repository checks.

---

## 8. Redux Integration

The Redux store exists only as application infrastructure.

Store setup lives in:

```text
src/app/store/
```

Typed hooks such as `useAppDispatch` and `useAppSelector` also live in the infrastructure boundary.

Presentational UI must not import those hooks.

Controller hooks may use them.

Selectors should expose stable feature-oriented view-model data rather than leaking nested store structure into UI.

A Redux refactor should usually require changes only in:

- `model/`;
- `controller/`;
- app store composition.

It should not require rewriting presentational components.

---

## 9. Declarative Lesson Content

Most lessons are stored as JSON.

Example:

```text
src/content/lessons/grade-6/present-simple/lesson.json
```

Example shape:

```json
{
  "id": "present-simple-01",
  "title": "Present Simple",
  "grade": 6,
  "level": "A2",
  "sections": [
    {
      "type": "grammar",
      "contentId": "present-simple-basics"
    },
    {
      "type": "multiple-choice",
      "exerciseId": "present-simple-ex-01"
    }
  ]
}
```

Content is validated before test/build/deploy.

Invalid content must fail CI.

---

## 10. Content Schemas

Zod schemas are the canonical runtime validation layer.

Schemas cover:

- lesson metadata;
- lesson sections;
- grammar blocks;
- vocabulary items;
- exercise definitions;
- custom feature references;
- student profiles where present.

Validation must reject:

- missing required fields;
- duplicate IDs;
- unknown section types;
- references to non-existent content;
- references to unregistered custom features;
- invalid answer structures;
- invalid level values;
- malformed translations where required by repository rules.

The validation script scans the entire content tree in one deterministic run.

No network calls are permitted.

---

## 11. Feature Registry

Custom and reusable exercise types are resolved through a central registry.

Conceptual example:

```ts
export const featureRegistry = {
  'multiple-choice': MultipleChoiceFeature,
  matching: MatchingFeature,
  'sentence-builder': SentenceBuilderFeature,
  flashcards: FlashcardsFeature,
};
```

Declarative lesson content refers to registry keys, not direct component paths.

This creates a stable contract between lesson data and interactive code.

A custom feature must be registered before content may reference it.

The content validator must fail if a lesson references a missing registry entry.

---

## 12. Ant Design Boundary

Ant Design is the base UI library.

Where practical, common visual primitives are wrapped in `shared/ui`.

Examples:

- `AppButton`
- `AppCard`
- `ExerciseCard`
- `FeedbackMessage`
- `SectionTitle`

This gives the project one place to centralize design behavior and reduces random per-feature styling.

Features may use Ant Design when a wrapper would add no value, but they must follow `rules/DESIGN.md`.

---

## 13. Agent Safety Rules

`AGENTS.md` remains the mandatory entry point for coding agents.

It must require agents to read the relevant rule files before changing code or educational content.

Technical rule files will include:

- `rules/ARCHITECTURE.md`
- `rules/CODE_QUALITY.md`
- `rules/CONTENT_SCHEMA.md`
- `rules/FEATURE_CREATION.md`

Agents must not treat prose rules as optional. The repository's executable checks are authoritative.

When adding a feature, an agent must:

1. inspect existing features;
2. reuse existing primitives where possible;
3. define data/types;
4. implement pure business logic;
5. add controller/view-model integration;
6. add pure UI;
7. register the feature;
8. add tests;
9. run full repository verification.

---

## 14. Hermetic Quality Gates

All mandatory checks must run locally with repository files and installed npm dependencies only.

They must not require:

- external APIs;
- web access;
- remote databases;
- secrets;
- browser SaaS services.

The canonical command will be:

```bash
npm run verify
```

It must run, in deterministic order:

1. formatting check;
2. ESLint;
3. TypeScript typecheck;
4. architecture checks;
5. UI/Redux import checks;
6. content validation;
7. unit/component tests;
8. production build.

If any stage fails, verification fails.

GitHub Actions runs the same command rather than reimplementing different CI logic.

This prevents local and CI rules from drifting apart.

---

## 15. Direct RTK Import Protection

The repository will use multiple independent protections.

### Layer 1: ESLint

For files under UI/component paths, `no-restricted-imports` forbids:

- `@reduxjs/toolkit`;
- `react-redux`;
- app store modules;
- feature model modules;
- slice/reducer/thunk/listener modules.

### Layer 2: custom hermetic script

`scripts/check-ui-redux-imports.mjs` scans source files directly.

It fails if presentation files contain forbidden imports.

The script is intentionally independent of ESLint so disabling or misconfiguring one rule does not silently remove the protection.

### Layer 3: dependency-cruiser

Dependency-cruiser enforces that UI paths cannot depend on model/store paths and validates global layer boundaries.

A direct Redux import in UI therefore has to bypass multiple independent gates to enter the project.

---

## 16. Architecture Check Protection

`scripts/check-architecture.mjs` and dependency-cruiser will detect:

- reverse layer dependencies;
- cross-feature internal imports;
- UI importing model/store;
- pages importing store internals;
- illegal deep imports;
- cyclic dependencies where prohibited.

The architecture test suite also includes fixtures that intentionally violate rules so the checker itself is tested.

---

## 17. Test Strategy

### Pure business logic

Vitest unit tests.

Examples:

- answer evaluation;
- matching validation;
- scoring;
- lesson navigation logic.

### Presentation components

React Testing Library.

Test only behavior visible through props and callbacks.

Do not mock Redux for presentational component tests because Redux must not be a dependency.

### Controllers

Controller tests verify state-to-view-model adaptation and command dispatching.

### Content

Content tests validate all repository content against schemas and reference integrity.

### Architecture

Architecture tests confirm forbidden imports and invalid layer dependencies are rejected.

---

## 18. GitHub Actions

### CI workflow

Runs on pull requests and pushes to the main development branches.

Uses:

```bash
npm ci
npm run verify
```

No deployment occurs if verification fails.

### GitHub Pages deployment

Runs after successful verification for `main`.

Flow:

```text
main
↓
npm ci
↓
npm run verify
↓
npm run build
↓
GitHub Pages artifact
↓
deploy
```

The Vite base path is configured for:

```text
/English_platform_for_lessons/
```

---

## 19. Branching and Change Safety

Foundation work is performed on:

```text
feature/platform-foundation
```

The main branch is not used as a scratch branch.

Changes should reach `main` through pull requests after CI passes.

This protects the published version from incomplete agent edits.

---

## 20. Educational Rules

The existing educational principles remain authoritative:

- primary audience: Grade 6;
- default level: A2;
- early B1 only when appropriate;
- grammar must be accurate and current;
- vocabulary must be natural and age-appropriate;
- Russian explanations/translations must be natural;
- important grammar explanations should be available in Russian and English;
- content must not contain AI filler, gibberish, placeholders, or broken text.

Technical architecture must not weaken these content rules.

---

## 21. Error Handling

Static content errors are build-time errors whenever possible.

Examples:

- invalid lesson schema → verification fails;
- unknown feature key → verification fails;
- duplicate content ID → verification fails;
- missing referenced content → verification fails.

Runtime UI errors use a small error boundary and student-safe fallback.

Technical stack traces, internal file paths, or developer messages must not be shown to students.

---

## 22. Adding a New Standard Lesson

Expected workflow:

1. create or update JSON content;
2. reuse existing section/feature types;
3. run content validation;
4. run `npm run verify`;
5. open PR;
6. CI must pass.

A standard lesson should not require writing React components.

---

## 23. Adding a New Custom Feature

Expected workflow:

1. create `src/features/<feature-name>/`;
2. define types/data contract;
3. implement pure logic;
4. implement model only if state is needed;
5. implement controller/view-model;
6. implement presentation-only UI;
7. export through feature public API;
8. register feature;
9. add tests;
10. add or update content schema if necessary;
11. run `npm run verify`.

The feature is incomplete until architecture and content checks pass.

---

## 24. Non-Goals for Foundation

The first foundation does not include:

- authentication;
- cloud student accounts;
- server-side storage;
- teacher admin backend;
- Supabase/Firebase;
- payments;
- real-time collaboration;
- SSR;
- complex analytics.

These can be added later behind new architectural decisions.

---

## 25. Definition of Done

The platform foundation is complete when:

- React + TypeScript + Vite runs;
- Redux Toolkit is integrated behind controllers;
- Ant Design is integrated;
- GitHub Pages production build works;
- at least one declarative lesson renders;
- at least one reusable interactive feature renders;
- content schemas validate repository content;
- UI cannot directly import RTK/React Redux without failing checks;
- layer violations fail checks;
- tests run hermetically;
- `npm run verify` passes locally and in CI;
- GitHub Actions validates pull requests;
- GitHub Pages deploy workflow exists;
- agent-facing architecture/code-quality/content rules are present and consistent.
