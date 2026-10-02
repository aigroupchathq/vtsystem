# Rule: Documentation

Trigger: always_on
Scope: Entire repository — all code and documentation files

---

## Architecture Decision Records (ADRs)

All significant architectural decisions are recorded in `docs/00-decisions.md`.
An ADR must be created whenever:

- A new library or framework is introduced
- A module boundary or responsibility is redefined
- A security control is added or modified
- The database schema has a breaking change
- A new external service provider is selected
- A feature touches multi-tenancy or auth in a non-standard way

ADR template:

```markdown
## D-XXX — Decision Title

**Status:** OPEN | PROPOSED | DECIDED | SUPERSEDED
**Date Raised:** YYYY-MM-DD
**Blocking:** YES | NO | Near-term

### Context
Why is this decision needed?

### Options Considered
**Option A:**
- Pros:
- Cons:

**Option B:**
- Pros:
- Cons:

### Recommendation
Preferred option and reasoning.

### Decision
[ ] TO BE CONFIRMED  /  ✅ CONFIRMED: Option X

### Consequences
What changes as a result of this decision?
```

---

## Code Comments

### When to comment
Comments explain **why**, not **what**. The code already says what.

```typescript
// ✅ Good — explains WHY
// We return 404 instead of 403 here to prevent resource enumeration.
// Attackers should not be able to determine whether a resource exists
// by probing endpoints they are not authorised to access.
if (!student) throw new NotFoundException();

// ❌ Bad — restates what the code already says
// Find the student by ID
const student = await this.prisma.student.findFirst({ where: { id } });
```

### JSDoc for public API surfaces
All exported functions, classes, and types in `packages/types` and
`packages/ui` require JSDoc:

```typescript
/**
 * Finds a student by their ID, scoped to the requesting tenant.
 *
 * @param tenant - The tenant context extracted from the authenticated request.
 * @param id - The student's UUID.
 * @returns The student record, or null if not found within the tenant.
 * @throws {ForbiddenException} If the requesting user lacks permission to view students.
 */
async findById(tenant: TenantContext, id: string): Promise<Student | null>
```

### TODO comments
Use structured TODO comments that can be tracked:

```typescript
// TODO(D-005): Replace with Razorpay once D-005 is decided. Currently using mock.
// TODO(feat/fee-reminders): Add WhatsApp reminder trigger here.
// FIXME: Race condition when two teachers submit attendance simultaneously — see GitHub #123.
```

---

## README Standards

### Repository root `README.md`
Must contain:
- Project name and one-sentence description
- Link to `docs/00-project-audit.md` and `docs/00-decisions.md`
- Prerequisites (Node version, pnpm version, Docker)
- Local development setup (step-by-step)
- Environment variable setup (reference to `.env.example`)
- Running tests
- Available npm/pnpm scripts
- Architecture overview (link to `docs/architecture/`)
- Contributing guidelines link

### App-level `README.md`
Each app in `apps/` has its own README covering:
- What this app does
- How to run it in isolation
- Key environment variables for this app
- How to run the app's tests

### Package `README.md`
Each package in `packages/` has a README covering:
- What the package exports
- How to consume it in another app
- Example usage

---

## Documentation Directory

```
docs/
├── 00-project-audit.md         # Initial state assessment
├── 00-decisions.md             # Architecture Decision Register
├── architecture/               # System architecture diagrams and explanations
│   ├── overview.md
│   ├── module-boundaries.md
│   └── data-flow.md
├── product/                    # Product requirements by module
│   ├── admissions.md
│   ├── academics.md
│   ├── finance.md
│   └── ...
├── ux/                         # UX research, user journey maps, wireframes
├── ui/                         # Design system documentation
├── database/                   # Schema documentation, ERDs
│   ├── schema-overview.md
│   └── data-dictionary.md
├── api/                        # API documentation (openapi.json lives here)
│   └── openapi.json
├── security/                   # Security policies, threat models
│   ├── threat-model.md
│   └── data-classification.md
├── testing/                    # Test strategy and coverage reports
│   └── test-strategy.md
└── deployment/                 # Infrastructure, deployment, runbooks
    ├── local-setup.md
    ├── gcp-architecture.md
    └── incident-runbook.md
```

---

## Changelog

Maintain `CHANGELOG.md` at the repository root. Use the
[Keep a Changelog](https://keepachangelog.com) format with semantic
versioning sections: `Added`, `Changed`, `Deprecated`, `Removed`,
`Fixed`, `Security`.

Update `CHANGELOG.md` in every PR that includes a user-visible change.

---

## OpenAPI Spec

The OpenAPI spec (`docs/api/openapi.json`) is generated automatically
by the NestJS Swagger module during the build process. It is committed
to the repository so that:
- Frontend developers can see the API contract without running the backend
- External partners can review the integration surface
- The spec diff in PRs shows API contract changes

Never edit `docs/api/openapi.json` manually — it is generated code.
