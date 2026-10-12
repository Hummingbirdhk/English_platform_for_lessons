# Code Quality Rules

## Canonical verification

Run `npm run verify` before completion. It runs formatting, linting, TypeScript, architecture checks, UI/Redux import checks, content validation, tests, and production build.

## Tests

Use test-first development for new behavior and bug fixes. Prefer pure unit tests for business logic and React Testing Library for visible component behavior.

Presentation-component tests must not require a Redux Provider.

## TypeScript

- strict mode stays enabled;
- avoid `any` unless an external boundary makes it unavoidable and the reason is documented;
- prefer Zod-derived content types;
- do not expose raw store structure as UI props.

## Dependencies

Do not add dependencies to solve problems already covered by the current stack.

## Quality gates

Never modify tests/checkers solely to hide a violation. If an architecture rule genuinely changes, update the documentation and executable checker together.
