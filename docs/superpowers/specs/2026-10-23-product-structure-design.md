# Product Structure Design

Date: 2026-10-23  
Repository: `Zhopasobaki1998/English_platform_for_lessons`  
Branch: `feature/product-structure`

## Intent

Turn the current lesson-only prototype into a small teacher-owned learning environment built around three primary areas:

1. **Materials** — reusable educational resources.
2. **Lessons** — curated sequences that reuse those resources.
3. **Students** — non-sensitive learning profiles that help the teacher organise what a student is studying, has completed, and should revisit.

The product remains a static GitHub Pages application. No backend is introduced in this phase.

## Product principles

- A material is not a lesson.
- A lesson references reusable materials instead of duplicating their content.
- The same vocabulary or grammar material can be used in multiple lessons.
- Student-facing screens should feel like learning content, not an LMS dashboard.
- Teacher-facing organisation can be structured, searchable, and filterable.
- Content remains fixed in the repository and validated before deployment.
- No sensitive student data is stored in the public repository.

## Primary navigation

The application has four primary destinations:

- Home
- Materials
- Lessons
- Students

Home is a lightweight dashboard linking to the three content areas.

## Materials

Materials are standalone reusable resources. Initial supported material types:

- `grammar`
- `vocabulary`
- `reading`
- `video`

The schema must remain extensible for future types such as audio, worksheet, speaking deck, or custom interactive material.

### Shared material metadata

Every material has:

- `id`
- `type`
- `title`
- `grade`
- `level`
- `topic`
- `tags`
- `summary`

### Grammar material

Grammar material includes:

- short meaning/use summary;
- bilingual explanation blocks;
- form examples;
- positive/negative/question examples where relevant;
- common mistakes;
- optional related exercise IDs.

### Vocabulary material

Vocabulary material includes reusable vocabulary items:

- English term or phrase;
- Russian translation;
- optional phonetic pronunciation;
- English example;
- Russian translation of the example;
- optional image URL;
- optional collocations.

The same vocabulary set can later power multiple study modes such as flashcards, picture quiz, matching, spelling, and tests.

### Reading material

Reading material includes:

- pre-reading vocabulary;
- title;
- body text;
- comprehension questions;
- optional related exercise IDs.

### Video material

Video material includes:

- provider (`youtube` initially);
- provider video ID;
- pre-watch prompts;
- optional vocabulary;
- post-watch questions.

The video must render inside the platform when embedding is supported.

## Material library

The Materials page provides:

- type tabs or chips;
- level filter;
- topic filter;
- search by title/topic/tag;
- reusable material cards;
- links to material detail pages.

Filtering is client-side because the dataset is static.

## Lessons

A lesson is a curated sequence, not a unique copy of content.

Lesson sections may contain:

- inline intro text;
- references to material IDs;
- references to interactive exercise IDs.

A lesson may therefore reuse:
- one grammar material;
- one vocabulary set;
- one reading text;
- one video;
- several exercises.

The initial existing Present Simple lesson is migrated to demonstrate material references.

## Students

The Students section is teacher-facing organisation for static, non-sensitive learning data.

Allowed fields in this phase:

- pseudonymous/display name;
- grade;
- level;
- curriculum label;
- current focus;
- completed topic IDs/labels;
- revision topic IDs/labels;
- assigned material IDs;
- assigned lesson IDs.

Do not store:
- surname/full legal name;
- email;
- phone;
- address;
- school identifiers;
- medical or behavioural information;
- private teacher notes;
- credentials.

A later authenticated backend can introduce private student data without changing the presentation architecture.

## Routes

- `#/` — Home
- `#/materials` — Materials library
- `#/materials/:materialId` — Material detail
- `#/lessons` — Lessons library
- `#/lesson/:lessonId` — Lesson detail
- `#/students` — Student list
- `#/students/:studentId` — Student learning profile

## Content architecture

Extend the existing content bundle:

```ts
type ContentBundle = {
  lessons: Lesson[];
  exercises: ExerciseDefinition[];
  materials: Material[];
  students: StudentProfile[];
}
```

Static loaders use Vite `import.meta.glob`.

Zod remains the canonical runtime validation layer.

## Reference integrity

Content validation must reject:

- duplicate IDs across content collections where IDs are expected to be globally unique;
- lesson references to missing material IDs;
- lesson references to missing exercise IDs;
- student assignments referencing missing lesson/material IDs;
- unknown feature keys;
- malformed material-specific data;
- unsupported video providers.

## UI structure

Use Ant Design but keep the interface editorial and learning-oriented.

Shared UI components introduced in this phase:

- application shell/header navigation;
- page heading;
- resource card;
- metadata tags;
- empty state;
- material-type badge.

Material detail rendering is delegated by material type.

## Visual direction

- light neutral background;
- white content surfaces;
- restrained single primary accent;
- generous spacing;
- clear hierarchy;
- rounded but not toy-like cards;
- readable 16px+ body text;
- responsive layout;
- clear active navigation;
- no dense admin tables in the first version.

## Static hosting constraint

All content is public in the built site. Therefore the Students area is a learning-planning surface only, with pseudonymous and non-sensitive content.

Future private accounts/progress may use Supabase or another backend while preserving the React presentation/controller boundaries.

## Non-goals for this phase

- authentication;
- private teacher notes;
- cloud progress persistence;
- student login;
- analytics;
- scheduling;
- payments;
- chat/video calls;
- complex gamification;
- full content authoring UI.
