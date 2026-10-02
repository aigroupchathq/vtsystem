---
name: vtos-product-specification
description: >-
  Use this skill when translating a product area, feature request, or user
  story into a formal VEDIC TREE OS Product Specification document. Covers
  stakeholder identification, requirement decomposition, acceptance criteria,
  and placing the spec in docs/product/. Activate when the user says
  "write a spec", "define requirements for", "document the feature", or
  "product specification for [module]".
---

# Skill: Product Specification

## When to Use

- A new module or feature is being planned and no written specification exists.
- A vague feature request needs to be turned into actionable engineering requirements.
- Acceptance criteria for a feature are missing or ambiguous.
- The engineering team needs a shared definition of what "done" looks like.

## Prerequisites

- [ ] The feature area belongs to a defined bounded context (see `01-architecture.md` module map).
- [ ] At least one open ADR in `docs/00-decisions.md` does NOT block this feature,
      or all blocking decisions are resolved.
- [ ] The relevant role(s) from the VEDIC TREE OS role hierarchy are identified.

## Execution Procedure

### Step 1 — Identify the Specification Context

Determine:
- **Module**: Which bounded context does this belong to? (e.g., `AdmissionsModule`)
- **Roles**: Which personas interact with this feature? (Principal, Teacher, Parent, etc.)
- **Tier**: Is this HQ-level, School-level, Campus-level, or Student-level?

### Step 2 — Create the Specification File

Output file: `docs/product/<module-name>/<feature-slug>.md`

Use this template:

```markdown
# [Feature Name] — Product Specification

**Module:** [Module name]
**Roles:** [Comma-separated list of roles]
**Status:** DRAFT | REVIEW | APPROVED
**Author:** [name]
**Date:** [YYYY-MM-DD]
**Related ADRs:** [D-XXX]

---

## 1. Problem Statement
[What problem does this solve? For whom?]

## 2. Goals
- [Goal 1 — measurable]
- [Goal 2]

## 3. Non-Goals (Out of Scope for this spec)
- [Explicitly state what is NOT being built]

## 4. User Stories

### [Role A]
- As a [Role], I want to [action] so that [outcome].
- As a [Role], I want to [action] so that [outcome].

### [Role B]
- As a [Role], I want to [action] so that [outcome].

## 5. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | [Requirement] | Must Have |
| FR-002 | [Requirement] | Should Have |
| FR-003 | [Requirement] | Could Have |

Priority uses MoSCoW: Must Have, Should Have, Could Have, Won't Have.

## 6. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | [e.g., list loads < 2s for up to 1,000 records] |
| Security | [e.g., only Principal and Admin can access] |
| Multi-tenancy | [e.g., scoped to school; no cross-school access] |
| i18n | [e.g., all labels must support en, hi, mr] |
| Accessibility | [e.g., WCAG 2.1 AA] |

## 7. Data Model Impact
[What new tables, columns, or relations are needed?]

## 8. API Impact
[What new endpoints or changes to existing endpoints are needed?]

## 9. Acceptance Criteria

- [ ] [Criterion 1 — testable]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## 10. Open Questions
| # | Question | Owner | Resolved? |
|---|---|---|---|
| 1 | [Question] | [Name] | No |

## 11. Dependencies
- [Other feature or module that must be complete first]
```

### Step 3 — Review Against VEDIC TREE OS Principles

Before saving, verify:
- Are all roles correctly scoped? (refer to `10-multi-tenancy.md`)
- Are all acceptance criteria testable?
- Is PII handling addressed in the NFRs? (refer to `07-security.md`)
- Are i18n implications noted?

### Step 4 — Link from the Module's Index

If `docs/product/<module-name>/README.md` exists, add a link to the new spec.
If it does not exist, create it with a table of contents for the module.

## Validation Procedure

- [ ] Spec file exists at the correct path under `docs/product/`
- [ ] All sections are populated (no placeholder text remaining)
- [ ] At least 3 testable acceptance criteria are written
- [ ] Roles and data scope are explicitly stated
- [ ] Open questions section is present (even if empty)

## Definition of Done

The specification is complete when:
1. All mandatory sections are filled in.
2. At least one engineer (other than the author) has reviewed and commented.
3. Status is changed from DRAFT to REVIEW or APPROVED.
4. The spec is committed to `main` under `docs/product/`.
