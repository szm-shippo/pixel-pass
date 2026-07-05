---
name: issue-writer
description: Draft clear GitHub issues from repository context using a consistent Markdown structure with purpose, completion criteria, and test method. Use when a user wants a reusable issue-writing standard rather than issue decomposition.
---

# Issue Writing Guide

## Purpose

Write GitHub issues that are easy to scan, implement, and verify.

## Workflow

1. Read the local context needed to name the issue accurately.
2. Choose the issue type and the smallest useful scope.
3. Use the Markdown structure below.
4. Keep the body concrete, testable, and free of filler.
5. Preserve unknowns explicitly as assumptions or open questions.
6. When creating issues, use the repository's GitHub toolchain and report the issue number or URL, title, and any assumptions made.

## Markdown Structure

Prefer this shape unless the issue type clearly needs less:

```markdown
# <Title>

## Purpose

## Background

## Scope

## Completion Criteria

- [ ]

## Test Method

- [ ]

## Out of Scope

## Open Questions

## Notes
```

## Section Guidance

- `Purpose`: why this issue exists in one or two sentences.
- `Background`: source doc, bug context, or implementation reason.
- `Scope`: what must be changed.
- `Completion Criteria`: observable checks that define done.
- `Test Method`: how to verify the work, including manual checks when relevant.
- `Out of Scope`: explicitly excluded work.
- `Open Questions`: unresolved product or implementation decisions.
- `Notes`: assumptions, links, or implementation hints.

## Rules

- Use a single top-level `#` heading.
- Keep headings short and consistent.
- Prefer checklist items for completion criteria and test steps.
- Do not mix implementation details into the purpose.
- Do not hide uncertainty; write it down.
- If the issue is documentation-only, keep the same structure but shorten `Scope` and `Test Method`.
