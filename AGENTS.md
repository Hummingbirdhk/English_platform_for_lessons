# AGENTS.md

# Instructions for AI Agents

This repository contains an interactive English learning platform for Grade 6 students.

The main target level is A2.
Early B1 material may be used when appropriate, but lessons must remain clear, simple and age-appropriate.

This file defines how AI agents must work with this repository.

---

## 1. Before Making Any Changes

Before creating, editing or deleting anything:

1. Read `README.md`.
2. Read `rules/GENERAL_RULES.md`.
3. Read `rules/DESIGN.md`.
4. Read `rules/LESSON_STRUCTURE.md`.
5. Read `rules/GRAMMAR_RULES.md` if grammar is involved.
6. Read `rules/VOCABULARY_RULES.md` if vocabulary is involved.
7. Check relevant materials in `/references` if the task requires educational reference material.
8. Inspect the existing project structure before creating new files or components.

Do not start implementing changes before understanding the existing structure and relevant rules.

---

## 2. Follow Existing Project Rules

Do not invent a new structure when an existing structure already exists.

Reuse:

- existing components;
- existing lesson formats;
- existing styles;
- existing exercise types;
- existing naming conventions.

Do not redesign the platform unless explicitly requested.

Do not create duplicate components if an existing component can be reused.

---

## 3. Do Not Modify Unrelated Content

When asked to change one lesson, component or block:

change only what is necessary for that task.

Do not:

- rewrite unrelated lessons;
- rename unrelated files;
- reorganise the repository;
- delete existing content;
- change global styles without a reason;
- modify working functionality that is unrelated to the request.

Keep changes focused.

---

## 4. Educational Content Must Be Accurate

Never invent:

- grammar rules;
- vocabulary meanings;
- translations;
- pronunciations;
- usage examples;
- factual information.

If educational information is uncertain:

1. check the approved repository references;
2. check the relevant rules;
3. use reliable standard English;
4. do not guess.

If there is still uncertainty, flag it instead of inventing an answer.

---

## 5. Student Level

Default target:

- Grade 6;
- age approximately 11–13;
- English level A2;
- maximum usual difficulty: early B1.

Do not automatically use advanced vocabulary or grammar.

Avoid unnecessary:

- linguistic terminology;
- academic English;
- long explanations;
- complex sentence structures;
- rare grammar exceptions.

Teach the basic useful rule first.

---

## 6. Language Rules

Grammar explanations and important learning rules should normally be available in:

1. Russian;
2. English.

The Russian version must sound natural.

The English version must be simple enough for the student's level.

Important English examples should normally include a Russian translation when this helps understanding.

Example:

> She usually goes to school at 8.  
> Обычно она ходит в школу в 8 часов.

Do not use literal machine translation.

---

## 7. Grammar Tasks

If the task involves grammar:

read:

`rules/GRAMMAR_RULES.md`

before generating the content.

Grammar must:

- follow current standard English;
- be explained simply;
- remain technically correct;
- use natural examples;
- match the student's level.

Do not simplify grammar so much that the rule becomes false.

Do not overload the lesson with unnecessary exceptions.

---

## 8. Vocabulary Tasks

If the task involves vocabulary:

read:

`rules/VOCABULARY_RULES.md`

before generating the content.

Vocabulary should be:

- useful;
- modern;
- natural;
- age-appropriate;
- relevant to the lesson topic;
- approximately A2–B1.

Prefer useful phrases and collocations over isolated words.

---

## 9. Creating a New Lesson

Before creating a new lesson:

1. identify the lesson topic;
2. identify the student level;
3. identify the target grammar;
4. identify the target vocabulary;
5. check what relevant materials already exist;
6. check the lesson structure rules;
7. check grammar and vocabulary rules;
8. reuse existing components.

Do not create a completely new lesson structure if the platform already has a working one.

New lessons should follow:

`rules/LESSON_STRUCTURE.md`

---

## 10. Creating Exercises

Exercises must have clear instructions.

Automatically checked exercises must have a clearly correct answer.

Before finishing an exercise, verify:

- the answer is correct;
- there is no second valid answer unless multiple answers are intentionally allowed;
- the wording is clear;
- the level is appropriate;
- the answer is not accidentally revealed;
- spelling and grammar are correct.

Avoid ambiguous exercises.

---

## 11. User-Facing Text

Never show students:

- internal AI instructions;
- developer notes;
- implementation comments;
- debugging messages;
- placeholder text;
- unfinished content;
- file paths;
- technical error messages.

Student-facing text should be clean and understandable.

---

## 12. No Gibberish or Broken Content

Never leave:

- corrupted characters;
- random symbols;
- broken Cyrillic;
- placeholder text;
- Lorem Ipsum;
- unfinished AI output;
- duplicated text;
- meaningless labels.

Use UTF-8 throughout the project.

After generating content, check that Russian and English text display correctly.

---

## 13. Design Changes

Before changing interface design, read:

`rules/DESIGN.md`

Reuse the existing design system.

Do not introduce random:

- colours;
- fonts;
- button styles;
- spacing systems;
- card styles;
- animations.

New elements should look like part of the same platform.

---

## 14. Reference Materials

Reference materials are stored in:

`/references`

They may include:

- textbooks;
- workbooks;
- grammar references;
- teacher notes;
- curriculum notes.

Use them as educational references.

Do not copy large sections of copyrighted materials directly into lessons.

Create original explanations and exercises based on the learning objective.

---

## 15. Student Profiles

If a lesson is created for a specific student, check:

`/students`

before creating or modifying the lesson.

Use available information about:

- current level;
- previously studied topics;
- known difficulties;
- current curriculum;
- learning progress.

Do not invent student information that is not stored in the project or provided by the teacher.

---

## 16. Technical Changes

When modifying code:

1. inspect the existing implementation first;
2. make the smallest reasonable change;
3. preserve existing functionality;
4. reuse components;
5. avoid unnecessary dependencies;
6. avoid unnecessary architectural changes.

Do not introduce a new framework, library or backend unless explicitly requested or clearly necessary.

---

## 17. After Making Changes

Before considering the task complete, check:

- the requested change was actually implemented;
- existing lessons still work;
- buttons and interactive elements work;
- the layout is readable;
- there is no broken text;
- there are no obvious console or syntax errors;
- educational content is accurate;
- answers are correct;
- translations are natural;
- unrelated content was not changed.

---

## 18. If Something Is Unclear

Do not make large assumptions.

If the uncertainty affects:

- educational accuracy;
- lesson structure;
- student level;
- design;
- existing data;
- destructive changes;

ask for clarification or clearly identify the uncertainty.

Small implementation details may follow the existing project conventions.

---

## 19. Priority of Instructions

When instructions conflict, use this priority:

1. explicit instruction from the teacher/user for the current task;
2. `AGENTS.md`;
3. specific files in `/rules`;
4. `README.md`;
5. existing project conventions.

However, never intentionally introduce incorrect educational content even if a requested implementation appears inconsistent.

---

## 20. Core Working Principle

Before changing anything:

**Read → understand → check existing content → make the smallest necessary change → verify.**

The goal is not to generate as much content as possible.

The goal is to maintain a clear, accurate and consistent educational platform.
