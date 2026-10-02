# VEDIC TREE OS — Project Audit

> **Role:** Principal Product Architect & Engineering Lead
> **Audit Date:** 2026-10-02
> **Auditor:** Antigravity (Principal Engineering Agent)
> **Repository:** https://github.com/aigroupchathq/bramha.git
> **Local Path:** C:\Users\vD\.gemini\antigravity-ide\scratch\saas-engine-studio
> **Status:** AUDIT COMPLETE — Pre-Development Phase

---

## 1. Executive Summary

The repository that exists is **not** VEDIC TREE OS.

It is a fully different product: a standalone, client-side React demo application called **BRAMHA** ("Autonomous Creation Engine"), built to demonstrate a solo SaaS-building methodology using autonomous AI loops, water conservation case studies, and programmatic SEO marketing concepts.

**The target product — VEDIC TREE OS — does not yet exist in any form in this repository.**

This audit treats the existing BRAMHA application as the starting repository context and documents everything that must be built, decided, and put in place before any Vedic Tree OS feature development can begin.

---

## 2. Files Inspected

| File / Path | Size | Description |
|---|---|---|
| package.json | 654 B | Project manifest — BRAMHA demo |
| package-lock.json | 68.9 KB | Dependency lockfile |
| vite.config.js | 234 B | Vite build config |
| .gitignore | 253 B | Standard Vite gitignore |
| .oxlintrc.json | 231 B | Oxlint rules (React hooks) |
| index.html | 1.2 KB | Root HTML — "Sovereign Foundry" branding |
| README.md | 1.0 KB | Default Vite+React README (not product-specific) |
| REFERENCES.md | 20.0 KB | Scientific references for BRAMHA concepts |
| commit_msg.txt | 42 B | Single commit message: "Initial commit: BRAMHA creation engine" |
| src/main.jsx | 229 B | React entry point |
| src/App.jsx | 9.7 KB | Root application — BRAMHA tabs, state, navigation |
| src/App.css | 2.9 KB | Legacy Vite template CSS (unused by app) |
| src/index.css | 3.5 KB | Tailwind v4 import + monochrome design tokens |
| src/data/presets.js | 12.3 KB | Static SaaS preset data (BRAMHA/AquaVeda/HyperSEO) |
| src/components/Navbar.jsx | 6.6 KB | Navigation bar with tab switching |
| src/components/ExportModal.jsx | 5.2 KB | Modal with simulated CLI export + confetti |
| src/components/ControlRoom.jsx | 12.4 KB | ORPHANED — not wired in App.jsx |
| src/components/GsdCompiler.jsx | 10.6 KB | Blueprint/spec compiler UI |
| src/components/KnowledgeBase.jsx | 31.3 KB | Concept hub — largest component |
| src/components/MarketingEngine.jsx | 15.7 KB | Programmatic SEO matrix UI |
| src/components/ParticleBackground.jsx | 3.6 KB | Canvas-based particle VFX |
| src/components/ProofStudio.jsx | 29.0 KB | Origin/proof page |
| src/components/RalphRunner.jsx | 12.4 KB | Autonomous loop simulator UI |
| src/components/StatisticalLab.jsx | 10.7 KB | Solo vs team comparison charts |
| src/components/University.jsx | 14.3 KB | Learning modules |
| src/components/WaterSolutions.jsx | 20.4 KB | AquaVeda case study page |
| src/assets/ | — | hero.png, react.svg, vite.svg |
| public/ | — | favicon.svg, icons.svg |
| dist/ | — | COMMITTED build bundle — should not be in git |

No docs/, tests/, backend/, database/, or configuration directories existed prior to this audit.

---

## 3. Current Architecture Assessment

### 3.1 What the BRAMHA Repository Is

| Dimension | Current State |
|---|---|
| Type | Client-side SPA demo (no backend) |
| Framework | React 19 + Vite 8 |
| Language | JavaScript (.jsx) — no TypeScript |
| Styling | Tailwind CSS v4 + custom CSS tokens |
| State | Local React useState only — no state manager |
| Routing | Manual tab-switching via setActiveTab — no router |
| API Layer | None — all data is static hardcoded mock data |
| Backend | None |
| Database | None (Prisma schemas exist as display strings in JS only) |
| Auth | None |
| Testing | None — zero test files exist |
| CI/CD | None — no GitHub Actions workflows |
| Environment Config | None — no .env files, no environment abstraction |
| Deployment | None — no Docker, no Cloud Run, no Terraform |
| TypeScript | None — pure JavaScript |
| Multi-tenancy | None |
| i18n / l10n | None |
| Mobile | None — web only |
| AI Integration | None — simulated only (fake terminal logs) |

### 3.2 Design System

The BRAMHA UI has a coherent monochrome black design system with:
- Custom CSS variables: --black-canvas, --mono-white, etc.
- Utility classes: .mono-card, .btn-mono-primary, .btn-mono-secondary
- VFX animations: shimmer, glow pulse, beam line
- Typography: Inter (body), Outfit (headings), JetBrains Mono (code)

NOTE: This is BRAMHA's identity. VEDIC TREE OS requires a completely different brand identity. A new design system must be defined and approved before development begins.

### 3.3 Orphaned Code

ControlRoom.jsx (12.4 KB) is present in src/components/ but is never imported in App.jsx. Its purpose is unclear and it is dead code.

---

## 4. What Already Exists (Usable Assets)

| Asset | Reuse Assessment |
|---|---|
| Git repository + remote | REUSE — remote at github.com/aigroupchathq/bramha.git |
| lucide-react icons | REUSE — compatible with target stack |
| .oxlintrc.json lint config | REUSE AND EXTEND — add TypeScript rules |
| canvas-confetti | EVALUATE — may be useful for celebration moments |
| Tailwind v4 token concept | REFERENCE ONLY — new brand palette required |
| ParticleBackground.jsx | OPTIONAL — canvas VFX may be reused for landing pages |
| Vite + React scaffold | BASE ONLY — must migrate to Next.js |

All BRAMHA-specific components, data, and copy are NOT applicable to Vedic Tree OS.

---

## 5. What Is Missing (Full Gap Analysis)

### 5.1 Project Foundation
- No VEDIC TREE OS project directory or monorepo structure
- No TypeScript — entire codebase is JavaScript
- No tsconfig.json
- No .env.example / environment variable documentation
- No AGENTS.md / GEMINI.md / .agents/ directory
- No Architecture Decision Register
- No CONTRIBUTING.md
- No LICENSE file

### 5.2 Frontend
- No Next.js application (required by tech baseline)
- No TypeScript
- No shadcn/ui component library
- No Radix UI primitives
- No TanStack Query
- No React Hook Form + Zod
- No App Router routing
- No role-based UI rendering
- No internationalization framework
- No locale support (en-IN, hi, mr)
- No accessibility baseline (WCAG 2.1 AA)

### 5.3 Backend
- No NestJS application (zero backend exists)
- No REST API with OpenAPI/Swagger
- No authentication system
- No authorization system (RBAC)
- No multi-tenant data isolation
- No request validation
- No rate limiting
- No API versioning

### 5.4 Database
- No PostgreSQL configuration
- No Prisma schema for Vedic Tree OS domain
- No migrations, seeding scripts
- No pgvector for AI features

### 5.5 Infrastructure
- No Docker / docker-compose
- No Terraform for Google Cloud
- No Cloud Run, Cloud SQL, Cloud Storage config
- No Pub/Sub, Secret Manager integration

### 5.6 CI/CD
- No GitHub Actions workflows
- No environment strategy (dev/staging/production)

### 5.7 Testing
- Zero test files exist
- No Vitest, React Testing Library, Supertest, Playwright, k6

### 5.8 Observability
- No OpenTelemetry
- No Sentry
- No structured logging

### 5.9 Communications
- No WhatsApp Business Platform integration
- No SMS provider abstraction
- No email provider abstraction

### 5.10 Payments
- No India payment gateway (Razorpay/PayU/Cashfree)
- No UPI support
- No international gateway (Stripe)

### 5.11 AI
- No Gemini / Vertex AI integration
- No RAG pipeline

### 5.12 Domain Features (VEDIC TREE OS)
None of the following exist:
- Organization hierarchy (HQ/Region/School/Campus)
- Multi-tenant school management
- Student Information System
- Academic calendar engine
- Course/curriculum management
- Attendance tracking, Gradebook, Assessment
- Admissions CRM
- Parent portal, Teacher platform
- HRMS, Finance module
- Partner/Franchise platform
- Analytics & reporting

---

## 6. Technical Debt

| Item | Severity | Detail |
|---|---|---|
| No TypeScript | CRITICAL | Full rewrite required before shared types can exist |
| Vite SPA vs Next.js | CRITICAL | New Next.js app must be bootstrapped |
| Monolithic components | HIGH | KnowledgeBase (31KB), ProofStudio (29KB) — not reusable |
| No router | HIGH | Tab state via useState; proper routing required |
| No testing | HIGH | Zero test files — must be greenfield from day one |
| Static mock data | HIGH | No API integration pattern exists |
| dist/ committed to git | MEDIUM | Build artifacts pollute history — remove from tracking |
| ControlRoom.jsx orphaned | LOW | Dead code — unclear purpose |
| No .env.example | MEDIUM | No documentation of required environment variables |
| commit_msg.txt in repo root | LOW | Should not be version-controlled |
| React 19 (cutting edge) | NOTE | Verify shadcn/ui and Radix UI compatibility |

---

## 7. Security Concerns

| Concern | Risk | Recommendation |
|---|---|---|
| No authentication | CRITICAL | Full JWT + refresh token + session system required before any user data is handled |
| No authorization | CRITICAL | Multi-role, multi-tenant RBAC is the most complex architectural decision. Must be decided in ADR first. |
| Secrets management | CRITICAL | All GCP secrets must flow through Secret Manager — never hardcoded |
| No rate limiting | HIGH | Required before any public API endpoints are exposed |
| No input validation | HIGH | Must be enforced via Zod + NestJS pipes from day one |
| No CORS configuration | MEDIUM | Required before frontend and backend are deployed separately |
| No CSP headers | MEDIUM | Required for a production education platform |
| Student / minor data | HIGH | VEDIC TREE OS handles minors' data. Indian DPDP Act 2023, IT Act, and international equivalents apply. Privacy-by-design required from schema design. |

---

## 8. Recommended Changes (Pre-Development)

### Immediate (Before Any Code)

1. Resolve blocking architecture decisions (D-001 through D-004, D-009, D-013)
2. Establish monorepo structure:
   vedic-tree-os/
   ├── apps/web        (Next.js)
   ├── apps/api        (NestJS)
   ├── apps/mobile     (React Native + Expo)
   ├── packages/types  (Shared TypeScript types)
   ├── packages/ui     (Shared component library)
   ├── packages/config (Shared configs)
   ├── infra/          (Terraform)
   ├── docs/           (This directory)
   └── .github/        (GitHub Actions)
3. Create AGENTS.md / GEMINI.md at repo root
4. Bootstrap Next.js app (apps/web) with TypeScript, Tailwind, shadcn/ui, App Router
5. Bootstrap NestJS app (apps/api) with TypeScript, Prisma, OpenAPI
6. Define Prisma schema v1 — core multi-tenant model
7. Remove dist/ from git tracking
8. Create .env.example
9. Define VEDIC TREE OS brand identity and design system

### Short-Term (First Sprint)

10. Implement Organization Hierarchy in Prisma (Organization, Region, School, Campus, User)
11. Implement RBAC/authorization model — highest-complexity decision
12. Set up GitHub Actions (lint → type-check → test → build, deploy-to-staging)
13. Set up Docker Compose for local development

---

## 9. Questions Requiring Decisions

All recorded in docs/00-decisions.md.

| # | Question | Blocking? |
|---|---|---|
| D-001 | Monorepo toolchain: pnpm + Turborepo vs Nx | YES |
| D-002 | BRAMHA: archive vs repurpose repository | YES |
| D-003 | Authorization model: RBAC vs ABAC vs hybrid, library | YES |
| D-004 | Prisma multi-tenant isolation strategy | YES |
| D-005 | India payment gateway choice | Near-term |
| D-006 | WhatsApp Business provider | Near-term |
| D-007 | SMS provider | Near-term |
| D-008 | Email provider | Near-term |
| D-009 | VEDIC TREE OS brand identity | YES |
| D-010 | Indian education boards at launch (CBSE, ICSE, state?) | High |
| D-011 | React 19 vs React 18 for ecosystem stability | Near-term |
| D-012 | Subdomain vs path-based multi-tenant routing | Near-term |
| D-013 | GCP data residency region (asia-south1 Mumbai?) | YES |
| D-014 | Mobile app (React Native + Expo) in scope for v1? | High |
| D-015 | Git branching strategy | Near-term |

---

## 10. Risk Register

| ID | Risk | Probability | Impact |
|---|---|---|---|
| R-001 | Authorization model under-designed — permission bugs in production | High | CRITICAL |
| R-002 | Multi-tenant data isolation failure — schools seeing each other's data | Medium | CRITICAL |
| R-003 | Student/minor data protection non-compliance (DPDP Act 2023) | Medium | CRITICAL |
| R-004 | Premature microservice extraction from misunderstood module boundary | Low | High |
| R-005 | Design system not defined before frontend development — visual debt | High | High |
| R-006 | JavaScript habits from BRAMHA carry into TypeScript codebase | Medium | Medium |
| R-007 | dist/ in git grows repository and slows clones | Low | Low |
| R-008 | Payment gateway complexity — UPI, QR, recurring fees | Medium | High |
| R-009 | WhatsApp Business API approval delays (Meta verification: weeks) | High | Medium |
| R-010 | i18n not built in from day one — retroactive localization expensive | High | Medium |

---

## 11. Summary

| Category | Status |
|---|---|
| Repository exists | YES (BRAMHA product — different product) |
| Vedic Tree OS code | NONE |
| Backend | NONE |
| Database | NONE (schemas exist as display strings only) |
| Auth | NONE |
| Tests | NONE |
| CI/CD | NONE |
| TypeScript | NONE |
| Documentation | NONE (this audit is the first) |
| Design system | BRAMHA monochrome exists — new brand required |
| Frontend scaffold | Vite + React (must migrate to Next.js) |
| Git history | Single commit — clean slate |
| Remote | github.com/aigroupchathq/bramha.git |

The project is a genuine greenfield build. VEDIC TREE OS must be built from the ground up as a new monorepo in this repository.

---

Generated by Antigravity — Principal Engineering Agent
Next document: 00-decisions.md
