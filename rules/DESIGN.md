# Design Rules

The MVP visual source of truth is the Figma file:

`https://www.figma.com/design/XPmPIZt8Mj3cdstqyXpUPG/Untitled`

Use the page `English Platform — MVP` as the current reference for layout, hierarchy and visual language.

## MVP visual system

Core palette:

- Lessons / primary purple: `#9999FF`
- Materials / orange: `#FF6632`
- Students / lemon: `#FFFF99`
- Ink: `#111114`
- Paper: `#FFFFFF`
- App background: `#F7F7F4`

Typography target:

- TT Travels Next for display and interface typography.
- Do not commit trial or unlicensed font binaries to this public repository.
- Until a licensed webfont is available, use the configured fallback stack while preserving the Figma spacing and hierarchy.

Shape language:

- hero surfaces: approximately 36px radius;
- primary cards: approximately 28px radius;
- chips and navigation items: full pill radius;
- generous whitespace and light neutral page backgrounds.

Decorative artifacts:

- four-point sparks;
- fire;
- smile/blob forms;
- organic sticker headings.

Artifacts are accents. Use roughly 1–3 visible artifacts per major screen and keep them near primary learning actions or section identity. Do not scatter decorative shapes everywhere.

## Product color coding

The primary product areas are color-coded consistently:

- Materials → orange;
- Lessons → purple;
- Students → lemon.

Learning content inside these areas should remain predominantly white/light for readability.

## Application shell

Use one persistent rounded navigation shell for the MVP:

- ENGLISH CLUB brand;
- Home;
- Materials;
- Lessons;
- Students;
- compact profile marker.

Active navigation is dark/black. Inactive navigation uses a light neutral pill.

## Home

Home is not a dense LMS dashboard.

It should contain:

- a large purple orientation hero;
- three prominent product entry cards;
- one continue-learning card;
- one secondary library/action card.

## Materials

Materials uses:

- orange hero;
- search and explicit filters;
- type tabs/chips;
- reusable 3-column material cards on desktop;
- semantic color tags for grammar, vocabulary, reading and video.

## Lessons

Lesson pages use:

- purple lesson hero;
- level/grade chips;
- visible progress;
- a clear vertical learning sequence;
- predominantly white content blocks.

Do not make every embedded material look like a full standalone page. Embedded lesson content should remain visually subordinate to the lesson flow.

## Students

Student screens use:

- lemon identity hero;
- clear current-focus and revision blocks;
- assigned-material list;
- simple progress summary.

Avoid dense tables and CRM/admin-dashboard aesthetics.

## Responsive behavior

Desktop layouts may use 3-column libraries and 2-column profile sections.

On small screens:

- collapse grids to one column;
- retain horizontal scrolling for compact navigation/type controls where needed;
- preserve large tap targets;
- keep hero decoration away from core text.

## Ant Design

Use Ant Design as the behavior/accessibility foundation, but theme and compose it to match the Figma system.

Do not expose default Ant Design dashboard aesthetics when a product-specific component exists.

## Avoid

- arbitrary new brand colors;
- tiny text;
- excessive shadows;
- overly dense admin tables;
- decorative clutter;
- inconsistent radii;
- new local styling that ignores the Figma source of truth;
- storing or distributing unlicensed font files.

Correct/incorrect feedback must be unmistakable and should not rely on color alone.
