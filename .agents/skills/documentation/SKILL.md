---
name: vtos-documentation
description: >-
  Use this skill when creating, updating, or maintaining technical documentation,
  Architectural Decision Records (ADRs), API specifications, database documentation,
  and developer guides for VEDIC TREE OS.
---

# Skill: Documentation and ADR Maintenance

## When to Use

- Writing or updating an Architecture Decision Record (ADR) under `/docs/architecture/adr/`.
- Documenting new API endpoints, request/response contracts, or error codes.
- Updating database ERD diagrams, schema guides, and data retention policies in `/docs/database/`.
- Writing user manuals, role guides, or onboarding instructions for developers.
- Updating screen inventories and UX specifications when workflows change.

## Prerequisites

- [ ] Technical architecture or feature requirements are understood and implemented/reviewed.
- [ ] Appropriate documentation category identified under `/docs/` (`api/`, `architecture/`, `database/`, `ux/`, `ui/`, `security/`, `testing/`, `deployment/`).
- [ ] Markdown and Mermaid diagram standards reviewed.

## Execution Procedure

### Step 1 — ADR Creation Format (When Making Architectural Choices)

When introducing a new architectural pattern, library, database approach, or security model, create `/docs/architecture/adr/ADR-XXX-<title>.md`:

```markdown
# ADR-XXX: Title of Decision

- **Status**: [Proposed | Accepted | Superseded | Deprecated]
- **Date**: YYYY-MM-DD
- **Author**: Engineering Lead / Architect
- **Context**: Problem statement, business requirements, technical drivers.

## Considered Options
1. Option A (Description, pros, cons)
2. Option B (Description, pros, cons)

## Decision
Chosen option and rationale for selection.

## Consequences
- Positive consequences.
- Negative tradeoffs or risks mitigated.
- Compliance and migration requirements.
```

### Step 2 — Technical Specifications and API Guides

1. **API Endpoints**: Include HTTP method, path, tenant header requirements, role permissions, request payload schemas, successful response (with 200/201 example), and error scenarios (400, 401, 403, 404, 409).
2. **Database Changes**: Document table name, columns, data types, nullability, foreign keys, unique constraints, and indexes. Maintain Mermaid ER diagrams for visual clarity.
3. **UX / UI Updates**: Maintain the 5 questions for every screen:
   - Where am I?
   - What am I seeing?
   - What matters?
   - What can I do?
   - What happens next?

### Step 3 — Diagrams & Cross-Linking

- Use Mermaid code blocks (`mermaid`) for flowcharts, sequence diagrams, and entity relationships.
- Ensure all file links use relative markdown links or clickable paths.
- Update `/docs/README.md` or category index files to ensure newly added documents are discoverable.

## Validation Procedure

- [ ] Markdown files are linted and formatted properly without broken links.
- [ ] Mermaid diagrams render without syntax errors.
- [ ] Code samples in documentation reflect current TypeScript / NestJS / Prisma conventions.
- [ ] No internal secrets, credentials, or production tokens are recorded in documentation.

## Definition of Done

1. Documentation accurately reflects current system behavior and design contracts.
2. ADRs filed and numbered sequentially for major architectural changes.
3. Index tables updated to cross-reference newly added documents.
