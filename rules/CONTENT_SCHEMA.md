# Content Schema Rules

Normal educational content is data, not bespoke React code.

Repository locations:

- lessons: `src/content/lessons`
- exercises: `src/content/exercises`
- reusable materials: `src/content/materials`
- non-sensitive learning profiles: `src/content/students`
- curriculum knowledge base: `src/content/knowledge`

Each content object requires a unique stable `id`.

## Materials

Initial material types:

- grammar
- vocabulary
- reading
- video

Material-specific structure is defined in Zod schemas. Add a new material type only with its schema, renderer, tests and documentation.

## Knowledge base

The knowledge base is the normalized curriculum/data layer used to generate or enrich reusable materials later. It is deliberately separate from lesson presentation.

Current knowledge document types:

- `grammar-topics` - grammar coverage and progression;
- `vocabulary-sets` - thematic A2/B1 vocabulary groups;
- `lexicon` - reusable cross-topic lists such as common verbs, adjectives, prepositions and phrasal verbs;
- `irregular-verbs` - base form, Past Simple, Past Participle, translation and level.

Knowledge sources may reference textbooks, teacher materials and external level guides, but the repository should store normalized original data rather than copied textbook exercises or full copyrighted wordlists.

Default vocabulary scope for Grade 6:

- A2 core;
- A2+/early B1 extension where pedagogically useful.

Dedicated lexicons should be kept separate when they are useful across multiple themes, especially:

- common verbs;
- common adjectives;
- prepositions;
- phrasal verbs;
- irregular verbs.

## References

The validator must resolve:

- lesson → material;
- lesson → exercise;
- material → exercise where supported;
- student → material;
- student → lesson;
- feature key → registered feature.

The knowledge validator must reject malformed documents, duplicate knowledge IDs and duplicate entries within dedicated lexicons/sets.

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
