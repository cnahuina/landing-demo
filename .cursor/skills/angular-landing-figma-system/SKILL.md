---
name: angular-landing-figma-system
description: Build and maintain a professional Angular landing platform with a Design System and Figma MCP workflow. Use when creating or updating landing pages, implementing sections from Figma, or standardizing UI tokens/components.
disable-model-invocation: true
---

# Angular Landing Figma System

## Scope
Use this skill when the task involves:
- Building a full landing in Angular.
- Translating Figma designs into Angular components.
- Establishing or extending a Design System in the same codebase.

## Workflow
Follow this order:

1. **Design intake**
   - Parse Figma URL (`fileKey`, `nodeId`) if present.
   - Pull design context from Figma MCP before coding.
   - Identify repeated patterns and convert them into reusable components.

2. **Design System first**
   - Create tokens for color, typography, spacing, radius, shadow, and breakpoints.
   - Store tokens in global styles (CSS variables) and typed TS constants where needed.
   - Define primitive UI components (button, card, input, section container, heading).

3. **Landing assembly**
   - Compose sections from primitives and tokens:
     - Header/Nav
     - Hero
     - Logos/Social proof
     - Features
     - CTA
     - FAQ
     - Footer
   - Prioritize semantic HTML and accessibility.

4. **Quality gates**
   - Ensure responsive behavior for mobile, tablet, desktop.
   - Keep contrast and keyboard navigation compliant (WCAG AA baseline).
   - Run lint and type checks; fix introduced issues.

## Implementation rules
- Avoid hardcoded visual values when tokenized alternatives exist.
- Favor standalone components and clear feature boundaries.
- Keep selectors and file names consistent and descriptive.
- Prefer composition over duplicated markup.

## Done criteria
- A coherent Design System exists and is used by landing sections.
- The page looks consistent with Figma intent.
- Core UX interactions work (navigation, mobile menu, lead form validation).
- Build/lint checks pass.
