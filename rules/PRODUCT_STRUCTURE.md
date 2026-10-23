# Product Structure Rules

The platform is organised around three reusable product areas:

1. **Materials** — standalone learning resources.
2. **Lessons** — curated sequences that reference materials and exercises.
3. **Students** — non-sensitive learning profiles used for planning.

## Materials

A normal grammar rule, vocabulary set, reading text, or video belongs in `src/content/materials`.

Do not duplicate the same grammar explanation or vocabulary set inside multiple lessons. Create one reusable material and reference its `id`.

Supported initial material types:

- `grammar`
- `vocabulary`
- `reading`
- `video`

Vocabulary datasets should be reusable by future study modes such as flashcards, picture quiz, matching, spelling, and tests.

## Lessons

A lesson is a sequence of references and interactive tasks, not a copy of all source content.

Prefer:

```text
Lesson
→ vocabulary material
→ grammar material
→ exercise
→ reading material
→ video material
```

instead of hardcoding equivalent content into a bespoke lesson component.

## Students

The static Students area is for learning organisation only.

Allowed:

- pseudonymous display name;
- grade and level;
- curriculum label;
- current learning focus;
- completed topics;
- revision topics;
- assigned material IDs;
- assigned lesson IDs.

Do not store sensitive or identifying student information in the public repository, including full legal names, contact details, school identifiers, credentials, medical/behavioural notes, or private teacher notes.

Private accounts and private progress require an authenticated backend and are a later architectural phase.

## Navigation

Primary destinations are:

- Home
- Materials
- Lessons
- Students

Student-facing material detail pages should prioritise the learning content. Teacher-facing library/list pages may expose filtering and organisational metadata without becoming dense admin dashboards.

## Validation

All cross-references must be validated by `npm run validate:content`.

Missing material, lesson, exercise, or feature references must fail verification before deployment.
