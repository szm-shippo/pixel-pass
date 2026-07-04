---
name: create-commit-message
description: Create a Conventional Commit message from the staged Git diff.
argument-hint: "[optional context]"
agent: agent
tools: ["terminal"]
---

Create an appropriate Git Conventional Commit message by inspecting only the currently staged changes.

Use this workflow:

1. Check the staged diff with `git diff --cached --stat` and `git diff --cached`.
2. If there are no staged changes, stop and tell the user that there are no staged changes to summarize.
3. Infer the most accurate Conventional Commit type from the staged diff.
4. Include a scope only when the changed area is clear and useful.
5. Write the subject in imperative mood, lower case after the type/scope, and no trailing period.
6. Add a body only when it materially clarifies why the change was made or calls out important behavior.
7. Add a footer only for breaking changes or issue references that are evident from the staged diff or user-provided context.

Allowed commit types:

- `feat`: a user-facing or product capability
- `fix`: a bug fix
- `docs`: documentation-only changes
- `style`: formatting-only changes
- `refactor`: code restructuring without behavior changes
- `test`: tests only
- `build`: build system or dependency changes
- `ci`: CI or GitHub workflow changes
- `chore`: maintenance that does not fit another type

Output format:

- Return exactly one recommended commit message in a Markdown code block.
- After the code block, add at most two short bullets explaining the chosen type and scope.
- Do not include unstaged changes.
- Do not run `git commit`.
