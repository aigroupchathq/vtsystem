# Rule: Architecture

Trigger: always_on
Scope: Entire repository

---

## Architectural Pattern: Modular Monolith

The backend (`apps/api`) is a **NestJS modular monolith**. This is a
deliberate starting point — not a limitation. The module structure must be
designed so that any module can be extracted into a standalone service in
the future if required, without rewriting business logic.

**Do not propose microservices.** If a case arises where extraction seems
necessary, create an ADR in `docs/architecture/` first.

---

## Module Boundary Rules

Each NestJS module encapsulates one bounded context. Current bounded contexts:

| Module | Responsibility |
|---|---|
| `AuthModule` | Authentication, JWT, sessions, refresh tokens |
| `OrganizationModule` | Tenant hierarchy: HQ, Regions, Schools, Campuses |
| `UserModule` | User accounts, profiles, role assignments |
| `StudentModule` | Student records, SIS |
| `AcademicsModule` | Courses, curriculum, timetables, gradebook |
| `AdmissionsModule` | Enquiries, applications, enrolment CRM |
| `AttendanceModule` | Daily/session attendance tracking |
| `HRModule` | Staff records, payroll, leave management |
| `FinanceModule` | Fee structure, invoices, payments, accounts |
| `CommunicationModule` | WhatsApp, SMS, email, notifications |
| `PartnerModule` | Franchise/partner onboarding and management |
| `AnalyticsModule` | Reports, dashboards, data exports |
| `AIModule` | Gemini integration, RAG, AI-generated content |
| `StorageModule` | Cloud Storage operations |

**Module rules:**

1. A module may only inject services from its own module or from explicitly
   shared modules (e.g., `PrismaModule`, `AuthModule`, `CommunicationModule`).
2. Never import a repository or Prisma model from a different module directly.
3. Cross-module communication that cannot be satisfied by direct service
   injection must use NestJS EventEmitter (internal events) or Pub/Sub
   (external async events).
4. Never add business logic to controllers. Controllers receive requests,
   validate inputs, call services, and return responses. All business logic
   belongs in services.
5. All database access goes through Prisma services — never raw SQL in
   controllers or service handlers (use `$queryRaw` only when Prisma ORM
   cannot express the query, and document why).

---

## Frontend Architecture (`apps/web`)

Use the **Next.js App Router** exclusively. Do not use the Pages Router.

```
apps/web/src/
├── app/                     # App Router pages and layouts
│   ├── (auth)/              # Auth route group (login, register, reset)
│   ├── (dashboard)/         # Authenticated dashboard route group
│   │   ├── [tenantSlug]/    # Tenant-scoped routes
│   │   │   ├── students/
│   │   │   ├── staff/
│   │   │   ├── academics/
│   │   │   ├── finance/
│   │   │   └── settings/
│   │   └── admin/           # HQ/system admin routes
│   └── api/                 # Next.js route handlers (thin proxy only)
├── components/
│   ├── ui/                  # shadcn/ui base components (generated, do not edit)
│   ├── shared/              # Shared composed components
│   └── [domain]/            # Domain-specific components
├── lib/
│   ├── auth/                # Auth utilities, session helpers
│   ├── api/                 # TanStack Query hooks (api clients)
│   └── utils/               # Generic utilities
├── hooks/                   # Custom React hooks
├── types/                   # Local frontend types (import shared from packages/types)
└── messages/                # i18n message files (en, hi, mr, etc.)
```

---

## Shared Packages

`packages/types` — the single source of truth for types shared between
web, api, and mobile. Do not duplicate type definitions across apps.

`packages/ui` — shared design-system component library. Components here
are consumed by `apps/web` and future `apps/mobile`.

`packages/config` — shared ESLint, TypeScript (`tsconfig.base.json`),
Tailwind (`tailwind.config.base.ts`), and Prettier configs. All apps
extend these — never maintain separate configs per app.

---

## Infrastructure Boundary

All Google Cloud infrastructure is defined in `infra/terraform/`. Do not
create cloud resources manually through the GCP console without also
creating the equivalent Terraform resource. Manual console changes that
are not captured in Terraform are considered infrastructure drift and will
be corrected.

---

## Event-Driven Patterns

For operations that cross module boundaries and must be decoupled:

- **Internal (same process):** `@nestjs/event-emitter` — fire events from
  one module, handle in another without direct coupling.
- **External (async, reliable, durable):** Google Cloud Pub/Sub — for
  operations that must survive process restarts (e.g., sending a fee
  receipt after payment confirmation).

Use Pub/Sub for: notifications, report generation, data exports, batch
operations. Do not use Pub/Sub for synchronous user-facing API calls.
