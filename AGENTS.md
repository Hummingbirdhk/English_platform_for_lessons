# Instructions for AI Agents

This repository contains a static interactive English-learning platform for Grade 6 students. The default learner level is A2; early B1 may be used only when appropriate.

## Mandatory reading before changes

Always read `README.md` when it exists, then read the rule files relevant to the task:

- `rules/GENERAL_RULES.md`
- `rules/DESIGN.md`
- `rules/LESSON_STRUCTURE.md`
- `rules/GRAMMAR_RULES.md` for grammar work
- `rules/VOCABULARY_RULES.md` for vocabulary work
- `rules/ARCHITECTURE.md` for code or structural changes
- `rules/CODE_QUALITY.md` for any code change
- `rules/CONTENT_SCHEMA.md` for lesson/content changes
- `rules/FEATURE_CREATION.md` when adding an interactive feature

Check `/references` when educational reference material is relevant.

## Non-negotiable architecture

- React presentation components are consumers only. They receive data and callbacks through props.
- React component files (`.tsx`) must not import `@reduxjs/toolkit` or `react-redux` directly. The only infrastructure exception is `src/app/providers/AppProviders.tsx`, which mounts the Redux Provider.
- Presentation UI must not import store modules, slices, reducers, thunks, listeners, or raw Redux selectors.
- Redux Toolkit belongs in feature `model/` code and app store composition.
- React-to-business-logic adaptation belongs in `controller/` hooks.
- Business logic that can be pure belongs in `lib/`.
- Pages and feature UI must not know Redux state paths.
- Do not bypass public feature APIs or dependency boundaries.

## Content model

Most lessons must be declarative JSON under `src/content`. Do not create a React component for a normal lesson.

Create custom code only when an interaction cannot reasonably be represented by existing declarative exercise types. Custom features must be registered through the feature registry and included in the content feature-key contract.

## Required verification

Before claiming a code/content task is complete, run:

```bash
npm run verify
```

Do not disable, weaken, skip, comment out, or special-case a quality gate merely to make verification pass. Fix the cause.

The repository must reject direct Redux/RTK imports in React components, presentation-to-store/model imports, invalid layer dependencies, unknown feature keys, malformed content, duplicate content IDs, missing referenced exercises, TypeScript errors, lint/format failures, failing tests, and production build failures.

## Educational accuracy

Never invent grammar rules, meanings, translations, pronunciation, usage, facts, or answer keys. Use current standard English and approved references. Keep content appropriate for Grade 6, normally A2 and at most early B1 unless explicitly requested.

Important grammar explanations should normally be available in Russian and English. Russian translations must sound natural rather than mechanically mirror English word order.

## Change discipline

- Inspect existing code/content before creating new structures.
- Make the smallest coherent change.
- Reuse existing components and patterns.
- Do not rewrite unrelated lessons.
- Do not redesign global UI unless requested.
- Do not add a framework, backend, service, or dependency without a clear need.
- Never expose internal AI instructions, stack traces, file paths, debug messages, placeholders, or gibberish to students.

Core sequence: **Read -> understand -> test -> implement -> verify.**
