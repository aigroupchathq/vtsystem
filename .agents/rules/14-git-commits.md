# Rule: Git and Commit Standards

Trigger: always_on
Scope: Entire repository — all branches and commits

---

## Branching Strategy: Trunk-Based Development

The `main` branch is always deployable to production. All work happens
on short-lived feature branches that are merged back to `main` within
2 working days maximum.

### Branch Naming

Format: `<type>/<short-description>`

| Type | When to use | Example |
|---|---|---|
| `feat/` | New feature or user-facing capability | `feat/student-attendance-marking` |
| `fix/` | Bug fix | `fix/cross-tenant-data-leak-students` |
| `chore/` | Infrastructure, config, tooling (no user impact) | `chore/setup-prisma-migrations` |
| `docs/` | Documentation only | `docs/api-authentication-guide` |
| `test/` | Test additions or fixes | `test/fee-invoice-integration-tests` |
| `refactor/` | Code restructuring (no behavior change) | `refactor/extract-notification-service` |
| `security/` | Security-related fixes | `security/rotate-jwt-signing-algorithm` |

Branch names must be:
- All lowercase
- Hyphen-separated words (no underscores, no spaces, no camelCase)
- Descriptive enough to understand the purpose without opening the PR
- Maximum 60 characters

---

## Commit Messages

Use the **Conventional Commits** specification.

Format:
```
<type>(<scope>): <imperative summary>

[optional body — explain WHY, not WHAT]

[optional footer — breaking changes, closes issues]
```

### Types

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation change only |
| `style` | Code style (formatting, missing semi) — no logic change |
| `refactor` | Code restructuring — no feature or fix |
| `test` | Adding or fixing tests |
| `chore` | Build process, config, dependencies |
| `perf` | Performance improvement |
| `ci` | CI/CD pipeline changes |
| `security` | Security fix |
| `revert` | Revert a previous commit |

### Scope

The scope is the module or app affected. Use the module names from the
architecture rule:

`feat(students)`, `fix(finance)`, `test(auth)`, `chore(infra)`, `docs(api)`

### Summary rules
- Imperative mood: "add student export" not "added" or "adds"
- Maximum 72 characters
- No period at the end
- No "WIP" commits in main (squash before merging)

### Examples

```
feat(admissions): add bulk student import via CSV upload

Teachers and admins can now import up to 500 students at once
using a CSV template. The import is processed asynchronously
via BullMQ and the admin receives a WhatsApp notification on
completion.

Closes #87
```

```
fix(auth): rotate refresh token on every use to prevent replay attacks

The previous implementation reused refresh tokens until expiry,
allowing a stolen token to be used indefinitely within its TTL.
Each successful refresh now invalidates the old token and issues
a new one, invalidating the stolen token on its next use.

SECURITY: All existing refresh tokens for affected users should
be invalidated on deploy.
```

```
chore(infra): add Cloud SQL read replica to Terraform config

Closes #102
```

---

## Pull Requests

### PR Title
Must follow the same Conventional Commits format as commit messages.

### PR Description Template

Every PR must include:

```markdown
## What
[1-3 sentence summary of what this PR does]

## Why
[Why this change is needed — link to the ADR or issue]

## How
[Brief notes on implementation approach for reviewers]

## Testing
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Tested manually in local development
- [ ] Tested for edge cases: [list them]

## Checklist
- [ ] No hardcoded strings — all user-facing text uses i18n
- [ ] Tenant scope enforced in all new queries
- [ ] Authorization checked for all new endpoints
- [ ] No secrets committed
- [ ] OpenAPI spec updated (if API changed)
- [ ] CHANGELOG.md updated (if user-visible change)
- [ ] ADR created if architectural decision was made
```

### Review Requirements

- Minimum 1 approval from a team member before merge
- CI must pass (lint, type-check, tests, build)
- No unresolved review comments

### Merge Strategy

- Use **Squash and Merge** for feature and fix branches — this keeps
  `main` history clean and readable.
- Use **Merge Commit** for release branches (when applicable).
- Never force-push to `main`.

---

## What Must Never Be Committed

- `.env` files (use `.env.example` with placeholder values)
- `node_modules/`
- `dist/` or `build/` outputs
- API keys, passwords, private keys
- Database dump files containing real data
- `*.log` files
- OS files (`.DS_Store`, `Thumbs.db`)
- Editor configs that are developer-specific (`.vscode/settings.json` —
  only `.vscode/extensions.json` may be committed as team recommendation)

The `.gitignore` at the repository root enforces these. If something
is committed by mistake that contains a secret, treat it as compromised
immediately and rotate the secret before doing anything else.

---

## Commit Signing

All commits must be signed with a GPG or SSH key. Configure in git:

```bash
git config --global commit.gpgsign true
git config --global user.signingkey <YOUR_KEY_ID>
```

GitHub is configured to require signed commits on the `main` branch.
