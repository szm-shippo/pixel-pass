---
name: git-issue-creator
description: Draft and create well-structured GitHub Issues from short requests such as "Create issue for ...". Use when Codex needs to turn a bug report, feature idea, task, documentation request, refactor, or vague problem statement into a clear GitHub Issue with an actionable title, body, metadata, and follow-up questions when needed.
---

# Git Issue Creator

## Purpose

Create GitHub Issues that are easy for maintainers and contributors to triage, discuss, assign, implement, and close. Treat "Issue" as "GitHub Issue" unless the user explicitly says otherwise.

## Workflow

1. Inspect repository context before drafting:
   - Read `.github/templates/` when it exists.
   - Read `.github/ISSUE_TEMPLATE/` only when the repository uses GitHub's built-in issue template path.
   - Read nearby project docs only when needed to name product areas, components, labels, or constraints accurately.
   - Prefer repository conventions, but keep the final issue text in English.
2. Classify the request:
   - `bug`: broken behavior, regression, crash, incorrect output, unexpected state, flaky workflow, or user-visible failure.
   - `feature`: new capability, enhancement, UX improvement, product behavior, or API addition.
   - `task`: implementation work, cleanup, migration, configuration, dependency update, or operational follow-up.
   - `docs`: missing, incorrect, confusing, or outdated documentation.
   - `refactor`: internal code structure change with no intended user-visible behavior change.
   - `question`: investigation, decision, design discussion, or unclear report that is not ready for implementation.
3. Decide whether to ask a follow-up:
   - Ask before creating the GitHub Issue if missing information changes the issue type, expected behavior, user impact, reproduction path, or acceptance criteria.
   - Proceed without asking when reasonable assumptions can be stated in the issue body.
4. Draft the GitHub Issue:
   - Use a concise, searchable title.
   - Use the closest template from `.github/templates/` when available.
   - Include only the sections that fit the issue type.
   - Use checklists only for concrete acceptance criteria or task breakdowns.
   - Do not invent facts, logs, reproduction steps, versions, user impact, or product decisions.
5. Create the GitHub Issue with the available GitHub tool when the repository is known and the user asked to create it. Otherwise, return the title, labels, and Markdown body ready to paste into GitHub.

## Title Rules

- Start with a strong verb or concrete problem when useful: `Fix ...`, `Add ...`, `Document ...`, `Investigate ...`.
- Keep titles specific enough to search later.
- Avoid vague titles such as `Bug`, `Fix issue`, `Improve UI`, or `Update docs`.
- Use repository prefixes only when the repository already uses them, such as `[Bug]`, `[Feature]`, or component tags.

## Issue Body Structure

Use the smallest structure that captures the work clearly.

Bug reports:

```markdown
## Summary

## Steps to Reproduce

1.
2.
3.

## Expected Behavior

## Actual Behavior

## Impact

## Environment

## Additional Context
```

Feature requests:

```markdown
## Summary

## Problem

## Proposal

## Acceptance Criteria

- [ ]

## Scope

## Risks and Constraints

## Additional Context
```

Tasks and refactors:

```markdown
## Summary

## Background

## Work Required

- [ ]

## Acceptance Criteria

- [ ]

## Out of Scope

## Additional Context
```

Documentation issues:

```markdown
## Summary

## Current Documentation Problem

## Requested Change

## Affected Pages or Files

## Acceptance Criteria

- [ ]
```

Questions or investigations:

```markdown
## Summary

## Question

## Context

## Options to Consider

## Decision Needed
```

## Metadata Guidance

Suggest GitHub metadata when enough information is available:

- `labels`: choose likely labels such as `bug`, `enhancement`, `documentation`, `question`, `refactor`, `maintenance`, `good first issue`, or repository-specific labels.
- `assignees`: only suggest when the user names an owner or repo conventions make ownership obvious.
- `milestone`: only suggest when the user mentions a release, MVP, sprint, or roadmap target.
- `linked issues`: include `Closes #123`, `Related to #123`, or `Depends on #123` only when the relationship is explicit.

## Quality Bar

- Make every issue actionable: a maintainer should know what decision or change is needed.
- Separate observed facts from assumptions.
- Prefer concrete examples, files, screens, commands, logs, versions, and expected results when available.
- Keep issues concise; do not turn the issue body into a design document unless the user asks for that.
- Preserve uncertainty explicitly with `TBD` or `Assumption:` rather than silently filling gaps.
- When creating the GitHub Issue, report the issue URL or number, title, labels, and any assumptions made.
