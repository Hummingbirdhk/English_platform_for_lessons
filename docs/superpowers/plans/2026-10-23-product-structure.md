# Product Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the static teaching platform from a lesson-only prototype into reusable Materials, Lessons, and Students sections with validated cross-references and a coherent navigation shell.

**Architecture:** Extend the existing Zod-backed static content bundle with materials and student learning profiles. Lessons reference reusable materials by ID, while page components consume repository data without introducing new Redux coupling. Material detail rendering is type-driven and all cross-references are validated hermetically.

**Tech Stack:** React, TypeScript, Vite, Ant Design, Redux Toolkit, Zod, Vitest, React Testing Library, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-23-product-structure-design.md`

## Global Constraints

- Keep the application static and GitHub Pages compatible.
- Do not add a backend or database.
- Do not store sensitive student data.
- Preserve existing React/Redux architecture boundaries.
- Use Zod for content validation.
- Run `npm run verify` before completion.

## Review Focus

- A lesson references a missing material: validation must fail.
- A student is assigned a missing lesson/material: validation must fail.
- A malformed material type: validation must fail.
- A missing route resource: show a safe not-found state.
- Mobile navigation and cards must remain usable.

---

### Task 1: Extend content schemas and loaders

**Files:**
- Create: `src/content/schema/materialSchema.ts`
- Create: `src/content/schema/studentSchema.ts`
- Modify: `src/content/schema/lessonSchema.ts`
- Modify: `src/content/schema/contentSchema.ts`
- Modify: `src/content/types.ts`
- Modify: `src/content/loadContent.ts`
- Modify: `src/content/validateContent.ts`
- Modify: `src/content/validate-cli.ts`
- Test: `tests/content/content-validation.test.ts`

**Interfaces:**
- Produces: `Material`, `StudentProfile`, extended `ContentBundle`, lesson `material` section type.
- Consumes: existing lesson/exercise schemas.

- [ ] Write failing validation tests for valid materials/students and broken references.
- [ ] Implement Zod schemas and inferred types.
- [ ] Extend static loaders and CLI validation.
- [ ] Make cross-reference validation pass.
- [ ] Run focused content tests.

### Task 2: Add representative static content

**Files:**
- Create: `src/content/materials/grammar/present-simple.json`
- Create: `src/content/materials/vocabulary/daily-routine.json`
- Create: `src/content/materials/reading/day-in-toms-life.json`
- Create: `src/content/materials/video/daily-routine-video.json`
- Create: `src/content/students/student-maya.json`
- Modify: `src/content/lessons/grade-6/present-simple/lesson.json`

- [ ] Add one valid resource of every supported material type.
- [ ] Migrate the starter lesson to reference reusable materials.
- [ ] Add one pseudonymous student profile using only non-sensitive data.
- [ ] Run `npm run validate:content`.

### Task 3: Add global application navigation

**Files:**
- Create: `src/shared/ui/AppShell.tsx`
- Create: `src/shared/ui/PageHeading.tsx`
- Modify: `src/app/providers/AppProviders.tsx`
- Modify: `src/app/routing/routes.tsx`
- Modify: `src/styles.css`
- Test: `tests/app/app-shell.test.tsx`

- [ ] Add navigation tests for Home, Materials, Lessons, Students.
- [ ] Implement responsive shell/header navigation.
- [ ] Register new routes.
- [ ] Run app-shell tests.

### Task 4: Build Materials library and detail renderers

**Files:**
- Create: `src/pages/materials/MaterialsPage.tsx`
- Create: `src/pages/materials/MaterialPage.tsx`
- Create: `src/entities/material/MaterialCard.tsx`
- Create: `src/entities/material/MaterialRenderer.tsx`
- Create: `src/entities/material/renderers/GrammarMaterial.tsx`
- Create: `src/entities/material/renderers/VocabularyMaterial.tsx`
- Create: `src/entities/material/renderers/ReadingMaterial.tsx`
- Create: `src/entities/material/renderers/VideoMaterial.tsx`
- Test: `tests/entities/material/MaterialRenderer.test.tsx`
- Test: `tests/pages/materials/MaterialsPage.test.tsx`

- [ ] Add tests for type rendering and filters.
- [ ] Implement searchable/filterable material library.
- [ ] Implement four type-specific material detail views.
- [ ] Embed YouTube with a privacy-conscious iframe URL.
- [ ] Run focused material tests.

### Task 5: Build Lessons library and material-reference rendering

**Files:**
- Create: `src/pages/lessons/LessonsPage.tsx`
- Modify: `src/entities/lesson/LessonRenderer.tsx`
- Modify: `src/entities/lesson/sectionRenderers.tsx`
- Modify: `src/pages/lesson/LessonPage.tsx`
- Test: `tests/entities/lesson/LessonRenderer.test.tsx`

- [ ] Add tests showing a lesson can reuse material IDs.
- [ ] Render material references inline via public material rendering API.
- [ ] Add a lessons library page.
- [ ] Preserve existing exercise rendering.
- [ ] Run lesson tests.

### Task 6: Build Students list and learning profile

**Files:**
- Create: `src/pages/students/StudentsPage.tsx`
- Create: `src/pages/students/StudentPage.tsx`
- Create: `src/entities/student/StudentCard.tsx`
- Test: `tests/pages/students/StudentsPage.test.tsx`

- [ ] Add tests for pseudonymous profile rendering and assigned-resource links.
- [ ] Implement student list.
- [ ] Implement learning profile with current focus, completed, revision, assigned materials/lessons.
- [ ] Keep the UI explicitly non-sensitive/static.
- [ ] Run student-page tests.

### Task 7: Rework Home into a product dashboard

**Files:**
- Modify: `src/pages/home/HomePage.tsx`
- Test: `tests/pages/home/HomePage.test.tsx`

- [ ] Test top-level entry points and resource counts.
- [ ] Replace lesson-only home with Materials/Lessons/Students overview.
- [ ] Keep the visual hierarchy simple and editorial.
- [ ] Run home tests.

### Task 8: Update product/design rules and verify

**Files:**
- Create: `rules/PRODUCT_STRUCTURE.md`
- Modify: `rules/DESIGN.md`
- Modify: `rules/LESSON_STRUCTURE.md`
- Modify: `rules/CONTENT_SCHEMA.md`
- Modify: `AGENTS.md`
- Modify: `README.md`

- [ ] Document Materials/Lessons/Students separation.
- [ ] Document reusable material rules and student privacy constraints.
- [ ] Update agent read-order for product structure work.
- [ ] Run `npm run verify`.
- [ ] Open PR into `main` after green CI.
