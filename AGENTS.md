# VEDIC TREE OS — Engineering Principles

This file governs every AI-assisted development session in this repository.
Read it in full before writing any code.

---

## Product Identity

**VEDIC TREE OS** is an India-first, internationally scalable Education
Operating System. It is:

- An Education OS
- A School ERP
- An Admissions CRM
- A Student Information System
- An Academic Platform
- A Parent Platform
- A Teacher Platform
- An HRMS
- A Finance Platform
- An Operations Platform
- A Partner/Franchise Platform
- An Analytics and AI Platform

It is **not** a simple school management tool. Every decision must reflect
the full scope and the multi-role, multi-tenant, multi-country nature of this
product.

---

## Non-Negotiable Principles

These apply to every file, every session, every task.

### 1. TypeScript Everywhere
All source code is TypeScript. No `.js` or `.jsx` files in `apps/` or
`packages/`. Use `.ts` and `.tsx`. Strict mode is always on.

### 2. One Platform, Many Experiences
There is one data model, one authorization model, and one design system.
Role-specific experiences are surfaces of the same underlying product — not
separate applications. Never duplicate data models or API endpoints across
roles.

### 3. Multi-Tenancy Is Not Optional
Every database query, every API call, every UI component must respect the
tenant boundary. Tenant isolation is enforced at multiple layers:
PostgreSQL RLS + application middleware + CASL abilities. A bug that allows
cross-tenant data leakage is a critical security incident.

### 4. Authorization Before Features
Never build a feature that involves user data without first confirming the
authorization model for that operation. If the ability is not yet defined in
the CASL ability definitions, define it first.

### 5. No Hardcoded Locale
All user-facing strings use the i18n system (t() from next-intl). All
dates, numbers, currencies, and addresses use locale-aware formatting.
India is the primary locale (en-IN, hi, mr). Do not hardcode English strings,
Indian phone number formats, INR symbols, or dd/mm/yyyy formats into
components.

### 6. Privacy by Design
VEDIC TREE OS handles data of minors. Every feature that collects, stores,
or displays personal data must be designed with the minimum necessary data
principle. Student PII has the highest protection classification. No
student data is ever logged in plaintext. Review data handling against
DPDP Act 2023 (India) before implementing any new data collection.

### 7. Modular Monolith — No Premature Extraction
The backend is a NestJS modular monolith. Do not suggest extracting a
microservice without an Architecture Decision Record (ADR) in
`docs/architecture/`. Internal module boundaries must be respected:
modules communicate through service injection or internal events — never
by directly importing another module's repository or database layer.

### 8. Test Coverage Is Mandatory
No feature PR may be merged without unit tests for business logic, and
integration tests for API endpoints. E2E tests are required for critical
user journeys. The test suite must pass on every PR.

### 9. Decisions Are Recorded
If a task requires a significant architectural choice that is not already
documented in `docs/00-decisions.md`, stop and add an ADR entry before
proceeding. Do not make architectural decisions silently.

### 10. Do Not Overwrite Working Code
Do not rewrite existing working code solely because you prefer a different
implementation style. If a rewrite is necessary, explain why in the PR
description or in an ADR.

---

## Repository Layout

```
vedic-tree-os/
├── apps/
│   ├── web/          # Next.js 14+ — App Router, TypeScript, Tailwind, shadcn
│   ├── api/          # NestJS — TypeScript, Prisma, REST, OpenAPI
│   └── mobile/       # React Native + Expo (v1.1 — placeholder only in v1)
├── packages/
│   ├── types/        # Shared TypeScript types and Zod schemas
│   ├── ui/           # Shared component library (shadcn/ui base)
│   └── config/       # Shared ESLint, TypeScript, Tailwind configs
├── infra/            # Terraform — Google Cloud infrastructure
├── docs/             # Architecture, product, UX, API, security, testing docs
├── .agents/          # AI governance: rules and skills
│   ├── rules/        # Domain-specific rule files (always loaded)
│   └── skills/       # On-demand procedural skills
└── .github/          # GitHub Actions workflows
```

---

## Technology Decisions (Confirmed)

| Layer | Technology |
|---|---|
| Frontend | Next.js 14+ · React 18 · TypeScript · Tailwind CSS · shadcn/ui · Radix UI |
| Data Fetching | TanStack Query (server state) · React Hook Form + Zod (forms) |
| Backend | NestJS · TypeScript · REST · OpenAPI · Prisma ORM |
| Database | PostgreSQL (Cloud SQL) · pgvector (AI features) |
| Auth | JWT access tokens + refresh tokens · NestJS Guards · CASL |
| Caching | Redis (Memorystore) · BullMQ (job queues) |
| Infrastructure | Google Cloud · Cloud Run · Cloud SQL · Cloud Storage · Pub/Sub |
| IaC | Terraform |
| Observability | OpenTelemetry · Google Cloud Monitoring · Sentry |
| AI | Gemini · Vertex AI · RAG pipeline |
| Communications | WhatsApp Business · SMS (MSG91) · Email (AWS SES) · FCM |
| Payments | Razorpay (India) · Stripe (international) |
| Mobile | React Native · Expo (v1.1) |
| Testing | Vitest · React Testing Library · Supertest · Playwright · k6 |
| CI/CD | GitHub Actions |
| i18n | next-intl (web) · i18n-js (mobile) |

---

## Detailed Rules

Domain-specific rules are in `.agents/rules/`. They are always loaded.

- `01-architecture.md` — Modular monolith structure, module boundaries
- `02-typescript.md` — TypeScript strictness, type patterns
- `03-frontend.md` — Next.js, component patterns, styling
- `04-backend.md` — NestJS modules, services, pipes
- `05-database.md` — Prisma, migrations, query patterns
- `06-api.md` — REST conventions, OpenAPI, versioning
- `07-security.md` — Auth, secrets, input validation, OWASP
- `08-testing.md` — Test structure, coverage, naming
- `09-ux-ui.md` — Design system, accessibility, interaction
- `10-multi-tenancy.md` — Tenant isolation, CASL, RLS
- `11-internationalization.md` — i18n, locale, formatting
- `12-ai-safety.md` — AI usage, prompt safety, data handling
- `13-documentation.md` — Code comments, ADRs, README standards
- `14-git-commits.md` — Branch naming, commit messages, PR standards

---

## Audit and Decisions Register

- `docs/00-project-audit.md` — Initial state assessment
- `docs/00-decisions.md` — Architecture Decision Register (ADR)

All open decisions (status: OPEN) in `docs/00-decisions.md` must be
resolved before the features that depend on them are implemented.

---

*Maintainer: Principal Engineering Lead*
*Last updated: 2026-10-02*
