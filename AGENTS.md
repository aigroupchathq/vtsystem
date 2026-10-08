# VEDIC TREE OS — Engineering Governance & Development Guidelines

> **Authority Order:**
> 1. Original client-supplied evidence
> 2. Explicitly approved client requirements
> 3. VEDIC_TREE_MASTER_CLIENT_CONTEXT.md
> 4. Product/architecture decisions
> 5. Proposed extensions
> 
> *Where a derived requirement conflicts with original client evidence, the original evidence prevails.*  
> *Never convert an inference, recommendation or proposed capability into a confirmed client requirement without explicit approval.*

---

## PRODUCT INTERPRETATION
> We are translating the client's stated educational and operating model into a multi-centre education operating system.  
> This is our product architecture interpretation, not a verbatim client claim.

---

## 0. Master Client Context & Strategic North Star

All agents must adhere to the Master Client Context:
> *"Create the digital operating infrastructure that allows Vedic Tree to deliver, measure, govern and scale its academic, character-based, experiential and hybrid education model consistently across a multi-centre network."*

### Critical Architectural Boundaries
1. **Parent Company Platform / IP vs School SPVs**:
   - Parent retains: Brand, franchise business, online learning, Gurukul pedagogy, curriculum IP, technology platform, marketing IP.
   - School SPVs encompass: Physical campus operations, student enrollments, campus fees, local staff, local reporting.
   - **No Parent Equity in SPVs**. Enforce clean digital separation between Parent IP and School SPV operating records.
2. **AI Principle (Optional Future Enabling Layer)**:
   - **AI is an optional future enabling layer.** The shell may reserve a non-dominant extension point for AI, but AI capabilities must **not** be represented as existing, client-approved or operational until separately validated.
   - The client PDFs establish technology, hybrid learning, and online learning, but do not mention AI.
   - In Prompt 03, the visible AI Copilot is removed from the primary shell view.
3. **Socio-Emotional & EQ+IQ+SQ Safeguarding**:
   - The EQ+IQ+SQ model and socio-emotional metrics represent an educational framework, **not** clinical or psychiatric diagnoses.
   - Distinguish: Direct Teacher Observation $\rightarrow$ Formative Educational Assessment $\rightarrow$ Self/Teacher-Reported Indicators $\rightarrow$ Formally Validated Instruments. Never generate deterministic psychiatric labels.
4. **Financial & Planning Provenance**:
   - Projections and investor exit sensitivities (₹15 Cr package, 5-year milestones) are **Management Planning Assumptions**, not audited facts. Financial ledgers in the OS must track audited double-entry reality.
5. **Capability Classification Standard**:
   - `[SOURCE]`: Explicitly supported by client documents (curriculum, technology, HR/training, branding, legal, marketing, finance/accounts, admissions, administration, events, parent partnership, extracurricular development, employee safety, housekeeping, maintenance).
   - `[ENABLER]`: Technically required to make an explicit requirement function reliably (authentication, multi-tenant isolation, audit trail, role authorization, data persistence).
   - `[PROPOSED]`: Recommended product capability requiring validation (WhatsApp, procurement, transport, visitor management, inventory, reconciliation, performance management, invoices, ledger, counselling pipeline, campus visits, AI extensions).

## 1. Product Identity & Sovereign Hierarchy

```
VEDIC TREE PARENT / PLATFORM
│
├── Brand / Curriculum / Technology / Online Learning / Franchise IP
│
└── Operating Entities
     ├── SPV / School Portfolio
     │    ├── School (CBSE / ICSE / Pre-school)
     │    └── Campus (Panvel, Kharghar, Thane, Dombivli, Kalyan, etc.)
     │         └── Cohort / Class / Division
     │              └── Student
     │                   └── Learning + Total Development
     └── Other Authorised Operating Models (Owned, Partner, Franchise)
```

The domain model must **never** assume that `organisation → campus` represents simple single-entity legal ownership.

### PROPOSED SYSTEM PERSONAS — subject to client validation:
The 12 personas (HQ Admin, Director, Principal, HOD, Teacher, Counsellor, HR/Admin, Finance, Parent, Student, Partner, Franchise Owner) are proposed role abstractions for system modeling, subject to client validation. Source-backed participants are Students, Parents, Teachers, Management, Partners/Franchisees, and Central Functions.

---

## 2. The Four Non-Negotiable Invariants

1. **Tenancy Invariant (Zero Cross-School Leakage)**: Every database query, service call, and component MUST enforce `campusId` / `schoolId` scoping. Foreign lookups throw `403 Forbidden`. Only `HQ_ADMIN` holds universal cross-campus visibility.
2. **Privacy Invariant (Safeguarding Vault)**: Sensitive child protection incidents (`SAFEGUARDING`, `BULLYING`, `HARASSMENT`, `MEDICAL_EMERGENCY`) are strictly redacted for non-safeguarding staff (`TEACHER`, general employees). Direct unauthorized lookups throw `403 Forbidden` and trigger an immutable audit entry.
3. **Financial Invariant (Balanced Ledgers)**: Every fee invoice, payment, refund, and royalty adheres to balanced double-entry accounting. Multi-currency architecture with first-class India/UPI abstractions.
4. **Ownership Invariant (Distinct Operating Models)**: `OWNED`, `PARTNER`, and `FRANCHISE` represent fundamentally distinct contractual, financial, and governance relationships.

---

## 3. The Six Demonstration Pillars

Every feature in the presentation must reinforce these six pillars:

1. **Executive Command Center**: Network overview (Schools, Students, Staff, Admissions, Collections, Attendance), Network Health indicators, and "Needs Attention" items.
2. **School Operations**: Fixed physical assets, live inventory dispatch guards, collision-free facility booking, and gated visitor passes.
3. **Student 360 (Hero Experience)**: Centered on **Aarav Sharma** (Grade 7A), featuring the **Vedic Tree Development Compass** (Academics, Character & Values, Emotional Wellbeing, Physical Wellbeing, Life Skills).
4. **Teacher / Academic Workflow**: **Teacher My Day**, frictionless attendance logging, timetable schedule, lesson objectives, and CCE 9-point grading.
5. **Admissions → Enrollment**: 10-stage funnel with WhatsApp-first qualification, campus visits, entrance assessments, and instant student conversion.
6. **Parent Experience**: **My Child** portal displaying real-time attendance, homework, report cards, teacher communication, and UPI fee clearance.

---

## 4. Controlled Product Development Sequence

Development proceeds strictly in controlled stages:

```text
PROMPT 01: Project Initialization & Constitution Skeleton (Current)
     ↓
PROMPT 02: Design System (Typography, Spacing, Cards, Surfaces, Tokens)
     ↓
PROMPT 03: Application Shell & Unified Navigation (HQ, Principal, Teacher, Parent)
     ↓
PROMPT 04: Flagship Experience 1 — HQ Command Center & Next Best Action
     ↓
PROMPT 05: Flagship Experience 2 — Student 360 & Vedic Tree Development Compass
     ↓
PROMPT 06: Flagship Experience 3 — Admissions Funnel & Commercial Engine
     ↓
PROMPT 07: Testing, Polish & End-to-End Rehearsal
```

---

## 5. Technology Stack & Operational Baseline

- **Runtime & Build**: Node.js, Vite, React 19, ESNext / TypeScript standards.
- **Design System**: Vanilla CSS tokens + Tailwind v4 utilities, dark slate palette (`#0F172A`), high-contrast typography (Outfit, Inter, JetBrains Mono), Lucide React icons.
- **Data Engine**: Multi-tenant Prisma schema (`prisma/schema.prisma`), persistent memory database (`src/database/db.js`), Canonical Seed Fixtures (`src/database/seed-data.js`).
- **Test Framework**: Native Node test runner (`node --test`), 186+ unit and integration tests across 42 suites with 100% pass rate.
- **Quality Gates**: `oxlint` (0 errors), `npm test` (0 failures), `vite build` (clean bundle).

---

## 6. Directory Structure & Documentation Map

```text
├── .agents/
│   ├── rules/          # 14 specialized architectural & security rule sets
│   └── skills/         # Automated engineering skills & workflows
├── docs/
│   ├── constitution/   # VEDIC_TREE_OS_CONSTITUTION.md (Highest authority)
│   ├── product/        # Product vision, personas, module specifications
│   ├── ux/             # UX strategy, user journeys, role experiences
│   ├── ui/             # Design principles, color tokens, typography, components
│   ├── architecture/   # Architecture overview, ADRs (D-001 to D-023), audit models
│   ├── database/       # Schema documentation, ERDs, tenancy model, indexing
│   ├── security/       # Data classification, RBAC matrices, safeguarding rules
│   ├── testing/        # Test strategies, integration suites, test inventory
│   └── deployment/     # Local runbook, environment config, cloud deployment
├── prisma/             # Multi-tenant schema definition (40+ models)
├── src/
│   ├── components/     # Enterprise UI components & flagship modules
│   ├── database/       # Core transactional engine & canonical seed fixtures
│   └── modules/        # Domain-driven service layers (SIS, Finance, Academics, Operations, etc.)
└── tests/              # 42 automated test suites (186 tests)
```

---

*Maintainer: Lead Product Architect & Principal Engineer*  
*Last Updated: October 2026*
