# Content Schema Rules

Normal educational content is data, not bespoke React code.

Repository locations:

- lessons: `src/content/lessons`
- exercises: `src/content/exercises`
- reusable materials: `src/content/materials`
- non-sensitive learning profiles: `src/content/students`

Each content object requires a unique stable `id`.

## Materials

Initial material types:

- grammar
- vocabulary
- reading
- video

Material-specific structure is defined in Zod schemas. Add a new material type only with its schema, renderer, tests and documentation.

## References

The validator must resolve:

- lesson → material;
- lesson → exercise;
- material → exercise where supported;
- student → material;
- student → lesson;
- feature key → registered feature.

Missing or duplicate references fail `npm run validate:content`.

## Student privacy

Static student files must contain only pseudonymous, non-sensitive learning data.

Do not place private teacher notes, full identifying information, contact information, credentials or health/behaviour data in the public repository.

## Learner metadata

Default:

- grade: 6
- level: A2
- early B1 only when explicitly appropriate

When introducing a new declarative content type, update its Zod schema, inferred types, renderer, validation tests and documentation together.
