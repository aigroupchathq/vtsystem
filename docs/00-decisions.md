# VEDIC TREE OS — Architecture Decision Register (ADR)

> **Maintained by:** Principal Engineering Agent (Antigravity)
> **Format:** Each decision record includes: ID, Title, Status, Context, Options Considered, Recommendation, Decision, and Consequences.
> **Statuses:** OPEN (needs decision) | PROPOSED (recommendation made, awaiting confirmation) | DECIDED (confirmed) | SUPERSEDED

---

## How to Use This Register

1. New architectural questions are recorded here as OPEN.
2. Options and a recommendation are proposed.
3. The team reviews and confirms (or overrides) the recommendation.
4. Status changes to DECIDED with the confirmed choice recorded.
5. Consequences are documented.

No significant code that depends on an OPEN decision should be merged until that decision is DECIDED.

---

## D-001 — Monorepo Toolchain

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** YES — all scaffold work depends on this

### Context
VEDIC TREE OS requires at minimum three applications (Next.js web, NestJS API, React Native mobile) plus shared packages (types, UI, configs). A monorepo with toolchain support is required.

### Options Considered

**Option A: pnpm workspaces + Turborepo**
- Pros: Lightweight, excellent Next.js + NestJS support, fast caching, simple config, Vercel-backed (active development), widely adopted in 2025-2026
- Cons: Turborepo is less opinionated than Nx (both a pro and con)
- Fit: HIGH

**Option B: Nx**
- Pros: More batteries-included, powerful code generation, excellent monorepo tooling, strong TypeScript support
- Cons: Higher learning curve, more configuration overhead, Nx Cloud is paid for advanced features
- Fit: MEDIUM-HIGH

**Option C: Yarn workspaces + Lerna**
- Pros: Mature and well-understood
- Cons: Lerna is in maintenance mode, yarn v2/v3 adds complexity, less modern than pnpm
- Fit: LOW

### Recommendation
**Option A: pnpm workspaces + Turborepo**

Reasoning: Turborepo's build cache and pipeline model handles the Next.js + NestJS combination well. pnpm's strict hoisting prevents phantom dependency issues. This combination is the current industry standard for this class of project and has excellent documentation.

### Decision
[ ] TO BE CONFIRMED

### Consequences (if Option A is chosen)
- All developers must use pnpm (install via corepack)
- turbo.json defines build, test, lint pipelines
- pnpm-workspace.yaml defines package locations
- CI uses pnpm install + turbo run build

---

## D-002 — BRAMHA Repository: Archive vs Repurpose

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** YES — determines what happens to existing code

### Context
The repository currently contains the BRAMHA product (a different product). VEDIC TREE OS needs to be built. We must decide what relationship these two products have in this repository.

### Options Considered

**Option A: Repurpose this repository entirely for Vedic Tree OS**
- Archive BRAMHA components in a git branch (e.g., `archive/bramha-v1`)
- The main branch becomes the Vedic Tree OS monorepo
- BRAMHA code is preserved in history but not in the working tree
- Pros: Clean, single source of truth, simple
- Cons: BRAMHA loses its standalone identity in this repo

**Option B: Keep BRAMHA as a separate app in the monorepo**
- Add BRAMHA as `apps/bramha` alongside `apps/web` and `apps/api`
- BRAMHA continues to be developed as its own product
- Pros: Both products co-exist, shared packages are reused
- Cons: Adds complexity; the monorepo becomes multi-product

**Option C: Move BRAMHA to a separate repository**
- Fork or export BRAMHA to its own repository
- This repository becomes Vedic Tree OS only
- Pros: Complete separation, no complexity bleed
- Cons: Loses the existing remote URL; requires GitHub repo management

### Recommendation
**Option A: Repurpose this repository for Vedic Tree OS**

Reasoning: The BRAMHA product is a demo/concept tool, not a production SaaS competitor to Vedic Tree OS. Archiving it in a branch preserves all work while giving the main branch a clean slate. The remote URL (aigroupchathq/bramha) can be renamed on GitHub if desired.

### Decision
[ ] TO BE CONFIRMED

### Consequences (if Option A is chosen)
- Current code pushed to branch `archive/bramha-v1` before monorepo scaffold begins
- dist/ removed from git tracking
- README.md replaced with Vedic Tree OS project README
- New monorepo structure created on main branch

---

## D-003 — Authorization Model

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** YES — all features with permissions depend on this

### Context
VEDIC TREE OS has an unusually complex authorization requirement. The platform has:
- Multiple tenant types (HQ, Region, Self-Owned School, Partnership School, Franchise School)
- Multiple roles per tenant (Principal, HOD, Teacher, HR/Admin, Finance, Student, Parent, Partner, Franchise Owner)
- Hierarchical permissions (HQ can see all; Region can see its schools; School can see itself)
- Resource-level permissions (a Teacher can edit their own classes but not another teacher's)
- Dynamic role assignments (a user may be a Teacher at one school and a Parent at another)

### Options Considered

**Option A: Custom NestJS Guards with RBAC**
- Build a custom permission system using NestJS Guards and decorators
- Define roles as an enum; permissions as a map of role → allowed actions
- Store role assignments in the database per tenant
- Pros: Full control, no third-party dependency, simple to understand
- Cons: Complex to implement correctly; risk of gaps as the permission matrix grows

**Option B: Casbin (Node.js — node-casbin)**
- Casbin is a well-established authorization library supporting RBAC and ABAC models
- Policy stored in database or config files
- Pros: Mature library, battle-tested, supports hierarchical roles, policy hot-reload
- Cons: Additional dependency; learning curve for the policy model (PERM model)

**Option C: CASL (ability-based authorization)**
- CASL is a popular JavaScript/TypeScript authorization library
- Defines "abilities" (can a user perform action X on resource Y?)
- Pros: TypeScript-native, excellent NestJS integration (@casl/nest), frontend integration possible (@casl/react)
- Cons: Ability definitions can grow complex; hierarchy support requires manual implementation

**Option D: PostgreSQL Row Level Security (RLS)**
- Enforce tenant isolation at the database level using PostgreSQL RLS policies
- Application layer sets the tenant context; database enforces isolation
- Pros: Isolation is enforced at the lowest level; application bugs cannot leak cross-tenant data
- Cons: Cannot express all authorization logic in RLS; complex queries can be difficult to debug; requires careful Prisma integration

### Recommendation
**Option C (CASL) for application-level authorization + Option D (RLS) for multi-tenant data isolation**

Reasoning:
- CASL provides excellent TypeScript integration, works in both NestJS (API) and React (client-side ability checks for UI rendering), and is widely adopted
- RLS provides a defense-in-depth guarantee that no application bug can allow cross-tenant data leakage
- These two layers serve different purposes and are complementary, not competing

The combination:
1. PostgreSQL RLS enforces tenant isolation at the data layer
2. CASL defines what authenticated users within a tenant can do at the application layer
3. NestJS Guards apply CASL policies to every API endpoint
4. React CASL hooks conditionally render UI based on the user's abilities

### Decision
[ ] TO BE CONFIRMED

### Consequences (if Recommendation is accepted)
- @casl/ability, @casl/nest, @casl/react added to dependencies
- Prisma middleware sets tenant context before each query
- RLS policies defined for all tenant-scoped tables
- Ability definitions maintained in a dedicated module (src/auth/abilities/)
- Every API endpoint decorated with @UseGuards(AbilitiesGuard) and @CheckAbilities(...)

---

## D-004 — Prisma Multi-Tenant Isolation Strategy

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** YES — impacts schema design, performance, and migration strategy

### Context
Multi-tenancy can be achieved in PostgreSQL with different isolation levels. The right choice affects data isolation guarantees, performance, cost, and operational complexity.

### Options Considered

**Option A: Shared Database, Shared Schema (Row-Level Tenancy)**
- Single PostgreSQL database, single schema
- Every tenant-scoped table has a tenantId column
- RLS policies enforce isolation
- Prisma middleware injects tenantId into every query
- Pros: Simplest to operate, lowest cost, easiest migrations
- Cons: Weaker isolation (relies on application/RLS), not suitable for enterprise clients requiring guaranteed data separation

**Option B: Shared Database, Separate Schemas (Schema-per-Tenant)**
- Single PostgreSQL database, one PostgreSQL schema per tenant
- search_path set per connection to scope queries to the tenant schema
- Pros: Better isolation than row-level; schema-per-tenant is auditable
- Cons: Prisma does not natively support schema-per-tenant; requires custom connection management; migrations are complex (must run on every tenant schema)

**Option C: Separate Databases (Database-per-Tenant)**
- Each tenant gets a separate Cloud SQL instance or database
- Pros: Maximum isolation; suitable for enterprise/compliance requirements
- Cons: Extremely expensive at scale; operational overhead is very high; not suitable for v1

### Recommendation
**Option A: Shared Database, Shared Schema with Row-Level Tenancy + PostgreSQL RLS**

Reasoning:
- VEDIC TREE OS at launch will not have enterprise clients requiring dedicated databases
- Row-level tenancy is well understood, easy to migrate, and the lowest operational cost
- PostgreSQL RLS provides a strong safety guarantee
- If a specific large-enterprise or government client later requires schema/database isolation, that client can be served on a separate Cloud SQL instance with the same application code

This decision should be revisited when enterprise onboarding begins.

### Decision
[ ] TO BE CONFIRMED

### Consequences (if Option A is chosen)
- All tenant-scoped models include organizationId (or schoolId, regionId as appropriate)
- RLS policies created for all tenant-scoped tables
- Prisma middleware enforces tenantId injection
- Index strategy: all tenant-scoped tables indexed on (tenantId, id) and (tenantId, relevant_filter_columns)
- Migrations: standard Prisma migrate workflow applies

---

## D-005 — India Payment Gateway

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** Near-term (required before fee collection is built)

### Context
VEDIC TREE OS handles school fee collection in India. The payment gateway must support:
- UPI (Unified Payments Interface)
- IMPS/NEFT bank transfers
- Debit/credit cards
- Recurring payments (fee installments)
- Refunds
- Split payments (multi-campus fee distribution)
- GST-compliant invoicing

### Options Considered

**Option A: Razorpay**
- Market leader in India for SaaS companies
- Full UPI, cards, net banking, wallet support
- Excellent webhook infrastructure
- Good documentation and SDKs (Node.js SDK available)
- Subscription/recurring billing support
- Cons: Pricing slightly higher than newer entrants

**Option B: Cashfree Payments**
- Strong UPI and payout support
- Used by many EdTech companies in India
- Auto-collect, payment links, and split payment support
- Cons: Less mature SDK ecosystem than Razorpay

**Option C: PayU**
- Older platform, widely used in education sector in India
- Cons: Documentation quality lower; legacy API design

**Option D: Juspay**
- Hypercheckout for unified payment experience
- Used by major Indian companies
- Cons: More complex to integrate; better suited for high-volume consumer apps

### Recommendation
**Option A: Razorpay**

Reasoning: Best-in-class developer experience, most comprehensive SDK, strongest subscription support, and widest adoption in Indian SaaS. The payment gateway must be abstracted behind an interface in the NestJS PaymentModule so that switching providers later does not require changes to business logic.

### Decision
[ ] TO BE CONFIRMED

---

## D-006 — WhatsApp Business Provider

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** Near-term

### Context
WhatsApp is the primary communication channel for schools, parents, and teachers in India. VEDIC TREE OS requires WhatsApp Business API for:
- Attendance notifications to parents
- Fee payment reminders and receipts
- Exam schedule and result notifications
- School circulars and announcements
- OTP delivery

### Options Considered

**Option A: Meta Cloud API (direct)**
- Direct integration with Meta's WhatsApp Business Platform
- No third-party dependency for message delivery
- Cons: Requires Meta Business Manager verification; no managed fallback; higher implementation complexity

**Option B: Interakt**
- Popular WhatsApp BSP (Business Solution Provider) in India
- Purpose-built for education and e-commerce use cases
- Managed API with webhook support
- Cons: Additional cost layer on top of Meta pricing

**Option C: Gupshup**
- Largest BSP in India by volume
- Multi-channel (WhatsApp + SMS + RCS)
- Pros: One provider for WhatsApp + SMS; bulk messaging support
- Cons: Interface is less developer-friendly than Interakt

**Option D: Twilio (WhatsApp via Twilio)**
- Twilio's WhatsApp Business API wrapper
- Excellent SDKs, global infrastructure
- Cons: Expensive for India; pricing in USD

### Recommendation
**Option B: Interakt for initial launch, with abstraction layer to switch**

Reasoning: Interakt is purpose-built for India markets, well-documented, and used by many education companies. Build the NotificationModule with a provider interface so that switching to Meta Cloud API direct or Gupshup is a configuration change, not a code change.

IMPORTANT: WhatsApp Business API requires Meta Business Manager verification. This process must begin immediately — approval can take 2-6 weeks.

### Decision
[ ] TO BE CONFIRMED

---

## D-007 — SMS Provider

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** Near-term

### Context
SMS is required as a fallback channel and for OTP delivery. Indian regulations require DLT (Distributed Ledger Technology) registration for all promotional and transactional SMS.

### Options Considered
- **MSG91** — Popular in India, good DLT compliance tooling, competitive pricing
- **Exotel** — Strong in voice + SMS, widely used in Indian startups
- **AWS SNS** — Global, but DLT compliance requires additional setup for India
- **Twilio** — Excellent API, expensive for India

### Recommendation
**MSG91** — best DLT compliance support, purpose-built for India, competitive pricing.

### Decision
[ ] TO BE CONFIRMED

---

## D-008 — Email Provider

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** Near-term

### Context
Email is required for:
- Account setup / password reset (transactional)
- Fee receipts and invoices (transactional)
- School newsletters and circulars (marketing/bulk)
- Staff communications

### Options Considered
- **AWS SES** — Lowest cost, high deliverability, requires suppression list management
- **SendGrid** — Excellent API, good transactional + marketing split, higher cost
- **Postmark** — Best-in-class transactional email, fast delivery, no marketing sending
- **Mailgun** — Good developer experience, competitive pricing

### Recommendation
**AWS SES for transactional + a dedicated marketing tool (decide separately for bulk campaigns)**

Reasoning: SES is cost-effective at scale for transactional email. Wrap behind an email provider abstraction in NestJS so the provider can be changed without business logic changes.

### Decision
[ ] TO BE CONFIRMED

---

## D-009 — VEDIC TREE OS Brand Identity

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** YES — all frontend development depends on design system

### Context
VEDIC TREE OS needs its own brand identity distinct from BRAMHA's monochrome black aesthetic. The brand must work for:
- An India-first Education OS serving schools, parents, teachers, students
- A premium, trusted product used by school principals and HR admins
- A product that feels modern and institutional — not generic

### Questions for the Business
1. What is the primary brand colour palette for VEDIC TREE OS?
2. Is there an existing logo or visual identity?
3. Should the design feel warm (educational, approachable) or cool (professional, enterprise)?
4. Is there a design team or designer who will own the design system?
5. What reference products should the design be inspired by? (e.g., Notion, Linear, Schoology, Blackboard, PowerSchool?)

### Recommendation
Until design is confirmed, development should use a placeholder design system. Recommendation:
- Primary: Deep saffron/amber (India cultural resonance + educational warmth) #E6580A
- Secondary: Deep blue/navy (trust, institutional) #1E3A8A
- Background: Near-white (clean, readable) #FAFAFA
- Typography: Inter (body) + Plus Jakarta Sans (headings)

This is a placeholder. The real design system must be confirmed by the business before any user-facing screens are built.

### Decision
[ ] TO BE CONFIRMED — REQUIRES BUSINESS INPUT

---

## D-010 — Education Boards at Launch

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** High (curriculum and academic calendar features)

### Context
Indian schools operate under different education boards with different curricula, grading systems, and academic calendars:
- CBSE (Central Board of Secondary Education) — most common
- ICSE / ISC (Council for the Indian School Certificate Examinations)
- State Boards (Maharashtra, Tamil Nadu, UP, etc.)
- IB (International Baccalaureate) — premium private schools
- Cambridge IGCSE

### Questions for the Business
1. Which boards do Vedic Tree's own schools operate under?
2. Which boards do partner and franchise schools operate under?
3. Should the platform support multiple boards simultaneously?

### Recommendation
Launch with CBSE + Maharashtra State Board as primary, ICSE as secondary. Design the curriculum/assessment model to be board-agnostic from day one — parameterized, not hardcoded.

### Decision
[ ] TO BE CONFIRMED — REQUIRES BUSINESS INPUT

---

## D-011 — React Version (v18 vs v19)

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** Near-term

### Context
The existing BRAMHA repository uses React 19. However, React 19 was released recently and some libraries in the target stack (shadcn/ui, Radix UI) may have compatibility issues.

### Recommendation
**Pin to React 18 for stability.** Upgrade to React 19 in a dedicated sprint after all dependencies are confirmed compatible.

### Decision
[ ] TO BE CONFIRMED

---

## D-012 — Multi-Tenant Routing Strategy

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** Near-term

### Context
Multi-tenant web applications typically use one of two URL routing strategies:

**Option A: Subdomain-based**
- Each school gets: springdale.vedictreedos.com
- Pros: Clear visual separation; school branding; can add custom domains
- Cons: Wildcard SSL certificate required; Next.js middleware complexity; DNS management

**Option B: Path-based**
- Each school at: vedictreedos.com/schools/springdale/
- Pros: Simpler infrastructure; no wildcard SSL; easier SEO control
- Cons: Less prestigious; cannot map to school's own domain

**Option C: Hybrid**
- Path-based initially, with optional custom domain support for premium tier

### Recommendation
**Option C: Hybrid** — path-based for v1 simplicity, with custom domain support as a premium feature.

### Decision
[ ] TO BE CONFIRMED

---

## D-013 — GCP Data Residency Region

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** YES — all infrastructure provisioning depends on this

### Context
India's DPDP Act 2023 and other regulations may require personal data of Indian citizens to be stored within India. Google Cloud has a data center in Mumbai (asia-south1) and Delhi (asia-south2).

### Recommendation
**Primary region: asia-south1 (Mumbai)**
- Closest to majority of Indian users
- Lowest latency for most of India
- Well-established GCP region with full service availability
- **Secondary/DR region: asia-south2 (Delhi)** for disaster recovery

Data residency must be confirmed with a legal review before launch.

### Decision
[ ] TO BE CONFIRMED — REQUIRES LEGAL INPUT

---

## D-014 — Mobile App in v1 Scope

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** High (affects monorepo structure)

### Context
The tech baseline includes React Native + Expo for mobile. However, building a mobile app alongside the web app significantly increases v1 complexity. The question is whether the mobile app is required for launch or can be deferred to v1.1.

### Options
- Include mobile (React Native + Expo) in v1 scope — full monorepo from day one
- Defer mobile to v1.1 — build web first, add mobile later

### Recommendation
**Defer mobile to v1.1.** Establish the monorepo structure with a placeholder `apps/mobile` directory (with README), but do not begin mobile development until the web app and API reach a stable v1. This reduces v1 complexity significantly.

Reserve shared TypeScript types in `packages/types` from day one so mobile can consume them without API changes when development starts.

### Decision
[ ] TO BE CONFIRMED

---

## D-015 — Git Branching Strategy

**Status:** OPEN
**Date Raised:** 2026-10-02
**Blocking:** Near-term (affects GitHub Actions design)

### Options

**Option A: Trunk-Based Development**
- Single main branch; all work in short-lived feature branches (< 2 days)
- Feature flags to hide incomplete work
- Pros: Fast integration; fewer merge conflicts; modern DevOps practice
- Cons: Requires discipline; incomplete features must be flag-gated

**Option B: GitFlow**
- Long-lived develop, main, hotfix, release branches
- Pros: Clear release management; familiar to many teams
- Cons: Slower integration; more merge conflicts; overhead for small teams

### Recommendation
**Option A: Trunk-Based Development with feature flags**

Reasoning: VEDIC TREE OS will be built by a small team. Trunk-based development minimizes merge pain and allows faster iteration. Feature flags (using a simple env-based config initially, upgrading to a proper feature flag service later) hide incomplete modules.

Branch naming convention:
- feat/short-description (features)
- fix/short-description (bugfixes)
- chore/short-description (infrastructure, config)
- docs/short-description (documentation only)

### Decision
[ ] TO BE CONFIRMED

---

## ADR Change Log

| Date | ID | Change |
|---|---|---|
| 2026-10-02 | D-001 to D-015 | Initial decision register created during project audit |

---

Generated by Antigravity — Principal Engineering Agent
Previous document: 00-project-audit.md
