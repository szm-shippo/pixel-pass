---
name: commit-writer
description: Draft Git Conventional Commit messages from repository diffs, status, or short change descriptions. Use when Codex needs to turn a code change into a clear commit message with the right type, optional scope, and concise subject line.
---

# Conventional Commit Writer

## Purpose

Create commit messages that follow the Git Conventional Commits format and accurately describe the change.

## Workflow

1. Inspect repository context before drafting:
   - Read `git diff`, `git status`, or the changed files when available.
   - Read nearby project docs only when they help identify the affected area or repo convention.
   - Prefer repository conventions, but keep the final message in English.
2. Classify the change:
   - `feat`: new capability or user-facing enhancement.
   - `fix`: bug fix or regression fix.
   - `docs`: documentation-only change.
   - `refactor`: internal restructure with no intended behavior change.
   - `test`: test-only change.
   - `chore`: maintenance, dependency, tooling, or cleanup.
   - `build`: build system or packaging change.
   - `ci`: CI workflow change.
   - `perf`: performance improvement.
   - `revert`: revert a previous commit.
3. Pick a scope only when it adds clarity:
   - Use the smallest meaningful scope, such as `ui`, `api`, `auth`, or `deps`.
   - Omit the scope when it is not obvious.
4. Draft the commit message:
   - Use the Conventional Commit form: `<type>(<scope>): <subject>`.
   - Keep the subject imperative, specific, and concise.
   - Use `!` when the change is breaking.
   - Add a body only when the change needs extra context, tradeoffs, or migration notes.
5. If the diff is ambiguous, ask one focused question before guessing the type or scope.

## Commit Rules

- Prefer one best message unless the user asks for alternatives.
- Keep the subject lowercase unless repo convention says otherwise.
- Aim for a subject under 72 characters.
- Do not mention files or implementation details unless they are the point of the change.
- If the change is broad, summarize the primary outcome rather than listing every file.

## Output Format

Return the commit message only, or a short list of candidates when useful.
