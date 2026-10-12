# Creating Interactive Features

Create a custom feature only when existing declarative exercise types cannot express the interaction cleanly.

Required sequence:

1. inspect existing features and shared UI;
2. define the content/data contract;
3. write a failing test for new behavior;
4. place pure behavior in `lib/`;
5. add Redux model code only when persistent interactive state is needed;
6. expose state/commands through a `controller/` view-model hook;
7. build `ui/` components from props and callbacks only;
8. export the feature through `index.ts`;
9. register its renderer in `src/features/registry/featureRegistry.tsx`;
10. add its declarative key to `src/shared/config/featureKeys.ts`;
11. update Zod schemas and content tests when the data contract changes;
12. run `npm run verify`.

A feature is incomplete if presentation UI imports Redux directly or if content can reference it without validation.
