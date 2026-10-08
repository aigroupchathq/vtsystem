---
name: vtos-code-review
description: >-
  Use this skill when reviewing pull requests, code changes, or proposed architectures in
  VEDIC TREE OS. Covers multi-tenant security verification, TypeScript strictness,
  API contract adherence, database index checks, design system compliance, and testing rigor.
---

# Skill: Code Review and Architectural Auditing

## When to Use

- Reviewing any PR or set of file changes before merging into the main branch.
- Conducting architectural compliance checks against established project rules in `.agents/rules/`.
- Verifying multi-tenant isolation, authorization guards, and input sanitization on new endpoints.
- Reviewing frontend pull requests for accessibility, design system tokens, and performance.

## Prerequisites

- [ ] Git diff or file change set available for inspection (`git diff` or PR files).
- [ ] Product specification and API contract documents exist for context.
- [ ] Automated CI checks (tests, linter, typecheck) have completed or are accessible.

## Execution Procedure

### Step 1 — Review Checklist by Domain

Verify each area methodically:

#### 1. Multi-Tenant Security & Isolation (BLOCKER)
- [ ] Does every query that accesses tenant-scoped data filter by `tenantId` (or rely on verified RLS)?
- [ ] Are route handlers decorated with appropriate `@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)`?
- [ ] Can a user from Tenant A manipulate an ID parameter (IDOR) to access Tenant B's records?
- [ ] Are audit logs emitted for create, update, and delete actions on sensitive entities?

#### 2. TypeScript & NestJS Backend
- [ ] No `any` types; all inputs and outputs strictly typed with DTOs and interfaces.
- [ ] All input DTOs validate incoming data via `class-validator` or Zod schemas.
- [ ] Business logic resides in injectable services, NOT in controllers.
- [ ] Database operations use transactions (`$transaction`) when multiple related rows are modified.
- [ ] No hardcoded configuration, secrets, or magic numbers.

#### 3. Frontend & UI Design System
- [ ] Consumes shared UI components from `@vtos/ui` rather than custom unstyled primitives.
- [ ] Proper state handling: Default, Loading (skeletons), Error (toasts/banners), and Empty states.
- [ ] Respects responsive breakpoints (Mobile 375px, Tablet 768px, Desktop 1280px).
- [ ] Accessibility: all buttons have accessible labels, interactive elements keyboard navigable.
- [ ] All user-facing strings are wrapped with i18n translation hooks (`useTranslation`).

#### 4. Database & Performance
- [ ] Any new foreign key has a corresponding composite or single-column index.
- [ ] No N+1 queries in service methods; queries utilize `include` or batching judiciously.
- [ ] Soft-deleted records (`deletedAt IS NULL`) are filtered appropriately in queries.

#### 5. Testing Rigor
- [ ] Unit tests cover all core branch logic and edge cases in newly created services.
- [ ] Integration tests verify authorization denial (401/403) and cross-tenant isolation.
- [ ] Test coverage meets project thresholds (>80% on business logic).

### Step 2 — Construct Constructive Review Feedback

Structure code review feedback with clear severity levels:
- **[BLOCKER]**: Critical security, tenant leakage, data corruption, or missing tests. Must fix before merge.
- **[WARNING]**: Performance optimization, edge-case handling, or design system divergence.
- **[SUGGESTION]**: Code clarity, naming improvements, or non-critical refactoring ideas.
- **[PRAISE]**: Clean architecture, thorough tests, or elegant solutions.

## Validation Procedure

- [ ] All [BLOCKER] comments are resolved by the author.
- [ ] Re-run static analysis (`npm run lint` and `npm run typecheck`) to confirm clean build.
- [ ] Verify test suite passes without regressions.

## Definition of Done

1. PR reviewed against all five domains with documented findings.
2. Zero unresolved blockers or security vulnerabilities.
3. CI status verified green.
4. Formal review verdict provided: Approved, Changes Requested, or Commented.
