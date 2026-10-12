# Content Schema Rules

Normal lessons are data, not bespoke React code.

Lesson JSON belongs under `src/content/lessons`. Exercise definitions belong under `src/content/exercises`.

Each content object requires a unique stable `id`. Lesson references to exercises and feature keys must resolve successfully.

Default learner metadata:

- grade: 6
- level: A2
- early B1 only when explicitly appropriate

`npm run validate:content` must pass before publication.

When introducing a new declarative section/exercise type, update its Zod schema, types, renderer, tests, and documentation together.
