# VEDIC TREE OS — CONSTITUTION

> **Status:** RATIFIED & BINDING  
> **Source Authority Order:**  
> 1. Original client-supplied evidence  
> 2. Explicitly approved client requirements  
> 3. VEDIC_TREE_MASTER_CLIENT_CONTEXT.md  
> 4. Product/architecture decisions  
> 5. Proposed extensions  
> 
> *Where a derived requirement conflicts with original client evidence, the original evidence prevails.*  
> *Never convert an inference, recommendation or proposed capability into a confirmed client requirement without explicit approval.*  
> 
> **Applies To:** All Engineers, Product Architects, UX Designers, AI Agents, and Stakeholders  

---

## PRODUCT INTERPRETATION
> We are translating the client's stated educational and operating model into a multi-centre education operating system.  
> This is our product architecture interpretation, not a verbatim client claim.

---

## 1. Product Identity & Sovereign Hierarchy

**VEDIC TREE OS** is an India-first, globally-ready Education Operating System. It is designed to govern, operate, and scale learning institutions from the sovereign development of an individual child to the cross-regional operations of multi-campus educational networks.

```text
VEDIC TREE PARENT / PLATFORM
│
├── Brand / Curriculum / Technology / Online Learning / Franchise IP [SOURCE]
│
└── Operating Entities
     ├── SPV / School Portfolio [SOURCE]
     │    ├── School (Affiliation & Board Entity)
     │    └── Campus (Physical Facility: Panvel, Kharghar, Thane, Dombivli, Kalyan)
     │         └── Cohort / Class / Division
     │              └── Student
     │                   └── Learning + Total Development
     └── Other Authorised Operating Models (Owned, Partner, Franchise)
```

> **Critical Domain Invariant**: The domain model must **never** assume that `organisation → campus` represents simple single-entity legal ownership. The parent entity retains brand, curriculum, technology, and franchise IP, while operating SPVs and partner entities manage physical campus facilities, student enrollments, local staff, and campus collections.

---

## 2. Capability Classification Standard

Every module, workflow, and capability in Vedic Tree OS must be classified:
- `[SOURCE]`: Explicitly supported by client documents (curriculum, technology, HR/training, branding, legal, marketing, finance, admissions, administration, events, parent partnership, extracurricular development, employee safety, accounts/collections, housekeeping, maintenance).
- `[ENABLER]`: Technically required to make an explicit requirement function reliably (authentication, multi-tenant isolation, audit trail, role authorization, data persistence, double-entry ledger balance).
- `[PROPOSED]`: Recommended product capability requiring validation (WhatsApp, procurement, transport, visitor management, inventory, reconciliation, performance management, invoices, ledger, counselling pipeline, campus visits, optional AI extensions).

*Never convert an inference, recommendation, or proposed capability into a confirmed client requirement without explicit approval.*

---

## 3. The Five Fundamental Dimensions

Every workflow and user interface in Vedic Tree OS must serve one or more of these core dimensions:

```text
               ┌─────────────────────────────────────────┐
               │            LEARNING [SOURCE]            │
               │   Curriculum · Pedagogy · Assessments   │
               └────────────────────┬────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    │                               │                               │
┌───▼─────────────────┐   ┌─────────▼───────────┐   ┌───────────────▼───┐
│ CHARACTER & VALUES  │   │ STUDENT DEVELOPMENT │   │ PARENT ENGAGEMENT │
│ Yoga · Ethics · Seva│   │ Compass · Wellbeing │   │ Trust · Real-time │
│      [SOURCE]       │   │      [SOURCE]       │   │      [SOURCE]     │
└─────────────────────┘   └─────────────────────┘   └───────────────────┘
                                    │
               ┌────────────────────▼────────────────────┐
               │           OPERATIONS [SOURCE]           │
               │  Admissions · Fees · Assets · Logistics │
               └─────────────────────────────────────────┘
```

These dimensions are reinforced by foundational platform enablers:
1. **TECHNOLOGY & TELEMETRY [SOURCE/ENABLER]**: Data-backed operational benchmarks, longitudinal growth tracking, and hybrid learning infrastructure.
2. **GOVERNANCE & MULTI-TENANCY [ENABLER]**: Strict multi-tenant boundaries, immutable audit ledgers, and regulatory compliance.
3. **AI POLICY (Optional Future Enabling Layer) [PROPOSED]**:
   > *"AI is an optional future enabling layer. The shell may reserve a non-dominant extension point for AI, but AI capabilities must not be represented as existing, client-approved or operational until separately validated."*  
   The client PDFs establish technology, hybrid learning, and online learning, but do not mention AI. AI is strictly a proposed capability and must not be represented as embedded in daily operations or mandatory for client workflows.

---

## 4. The Four Non-Negotiable Invariants

### I. Tenancy Invariant — Zero Cross-School Data Leakage [ENABLER]
- Data isolation is absolute across schools and campuses.
- A user operating in Campus A cannot query, view, or mutate student, staff, or financial records in Campus B under any circumstance unless holding an explicit universal `HQ_ADMIN` permission.
- Tenancy boundaries must be enforced at the data query layer, service layer, and API middleware—never solely in client-side UI filters.

### II. Privacy Invariant — Safeguarding Protection [ENABLER]
- Data concerning minors carries the highest sensitivity classification under applicable data protection mandates (including DPDP Act 2023).
- Sensitive safeguarding incidents (`SAFEGUARDING`, `BULLYING`, `HARASSMENT`, `MEDICAL_EMERGENCY`) are strictly segregated from general operational logs.
- Unauthorized staff members querying incident logs receive redacted summaries with identity and narrative fields masked.
- Direct unauthorized lookups throw `403 Forbidden` and trigger an automated audit log entry.
- Formative educational observations must carry the mandatory disclaimer:
  > *"Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses."*

### III. Financial Invariant — Auditable, Balanced Ledgers & Corporate Boundary [SOURCE/ENABLER]
- Every financial movement—invoicing, collection, concession, refund, or royalty—must adhere to double-entry ledger integrity.
- **Corporate Financial Boundary**: School tuition and fee collections represent school/SPV operational collections only. Parent-level platform, brand, curriculum, technology and related IP economics are outside this view and must be accounted for according to the final legal and commercial structure. The software must never conflate campus fee collections with parent platform revenues.

### IV. Ownership Model Invariant — Explicit Institutional Boundaries [SOURCE]
Vedic Tree OS recognizes distinct operating relationships:
- **`OWNED`**: Direct trust/corporate flagship schools with unified capital and operational control.
- **`PARTNER`**: Strategic joint ventures sharing capital expenditure, governance, and revenue distributions.
- **`FRANCHISE`**: Independent educational entrepreneurs operating under trademark license covenants, upfront licensing fees, and recurring royalties.

---

## 5. Ecosystem Participants & Roles

### Source-Backed Roles (Explicitly Supported by Client Evidence):
- **Student** [SOURCE]
- **Parent / Guardian** [SOURCE]
- **Teacher** [SOURCE]
- **Class / Cohort** [SOURCE]
- **School / Centre Management** [SOURCE]
- **Partners / Franchisees** [SOURCE]
- **Central Functions** (Curriculum, Technology, Training, Branding, Marketing, Accounts) [SOURCE]

### PROPOSED SYSTEM PERSONAS — subject to client validation:
The 12 granular persona titles (HQ Admin, Director, Principal, HOD, Teacher, Counsellor, HR/Admin, Finance, Parent, Student, Partner, Franchise Owner) represent **proposed system roles** created for UX and RBAC modeling. They are subject to direct client validation and must not be presented as fixed client specifications.

---

## 6. The Signature Concept: Student Development Compass [SOURCE / PROPOSED MATRIX]

Vedic Tree OS anchors student progress to the **Development Compass**, balancing modern academic excellence with Gurukul character and wellbeing.

### Core Pedagogical Principle: "Rich Evidence + Restrained Interpretation"
Student 360 is fundamentally about **individual growth over time**, not where a child ranks against other children. 

The system answers:
> *“What do we know about this learner, what evidence supports it, what development areas are being observed, and what should the authorised educator understand next?”*

It categorically rejects asking: *“What is this child's score?”*

```text
                               CHARACTER & VALUES [SOURCE]
                                           ▲
                                           │
                                           │
MINDFULNESS & REFLECTION [SOURCE] ◄────────┼────────► ACADEMIC EXCELLENCE [SOURCE]
                                           │
                                           │
                                           ▼
                               LIFE SKILLS & AGENCY [SOURCE]
```

### Absolute Prohibitions in Holistic Visualization
1. **NO Benchmark Polygon or Class Averages**: No peer comparisons, percentiles, cohort ranking, or grade-level benchmark lines across developmental virtues.
2. **NO Virtue Percentage Scoring**: Qualitative developmental continuum only (**`Emerging` → `Developing` → `Proficient` → `Exemplary`**), backed by verified observation counts. Objective quantitative metrics are preserved only where mathematically authentic (exam marks like 38/40, attendance percentages).
3. **NO Pseudo-Clinical Radar / Spider Charts**: Replaced by the **Linear Developmental Continuum Matrix**.
4. **Mandatory Non-Clinical Safeguarding Notice**: Every view must display:
   > *"Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses."*

### The 4 Cardinal Areas & 8 Observed Dimensions:
1. **Academic Excellence** [SOURCE]: Curricular Mastery (Math, Sciences, Languages) & Creativity/Expression (Arts, Rhetoric, Shlokas).
2. **Character & Values** [SOURCE]: Character & Values (Truthfulness/Satya, Humility/Vinaya) & Social Responsibility/Seva (Shramdaan, Community).
3. **Life Skills & Agency** [SOURCE]: Life Skills & Practical Problem Solving & Leadership/Collaboration (Peer Mentoring, Teamwork).
4. **Mindfulness, Composure & Reflection** [SOURCE]: Physical Wellbeing (Daily Yoga, Athletics) & Mindfulness/Reflection (Pranayama, Assembly Dhyana, Composure).

---

## 7. The Operational Paradigm: "Next Best Action" [PROPOSED]

Vedic Tree OS is designed as a calm control room leading with operational triage: **"What requires my attention today?"**

| Persona (Proposed) | Flagship Surface | Operational Focus |
|---|---|---|
| **HQ Executive** | Executive Overview | Network health deviations, admissions movement, collections, critical incidents |
| **Principal** | Centre Overview | Daily roll-call exceptions, walk-in enquiries, safety alerts, campus maintenance |
| **Teacher** | Teacher My Day | Active period roster, lesson objectives, pending submissions, parent messages |
| **Parent** | My Child Portal | Today's presence, assignments, developmental milestones, fee clearance receipts |
| **Student** | My Learning Portal | Daily timetable, assignment deadlines, extracurricular projects, personal growth |

---

## 8. Verified Geographic Scope vs Seed Data Discipline

- **Authoritative Client Geographic Hubs**: Panvel, Dombivli, Kharghar, Bhiwandi, Vashi, Vasai, Airoli, Virar, Thane, Badlapur, Kalyan, Ambernath.
- **Verified Target Expansion Cities**: Pune, Nagpur, Ahmedabad, Indore, Hyderabad, Bangalore, Delhi.
- **Nagpur — Future / Strategic Growth Geography [SOURCE]**: The client presentation references Nagpur as a nationwide growth-plan city, not a verified operating campus or affiliate. Any specific campus name, address, operating status or partnership model remains `[PROPOSED]`. Seed records must be labeled: `Demo Campus — Nagpur [DEMO / PROPOSED — not a verified operating Vedic Tree campus]`.
- **Strict Geographic Rule**: **Do NOT invent or use unverified locations (such as Baner) as factual client sites**. Demo seeds must use either verified client locations (Panvel, Kharghar, Thane, Dombivli, Kalyan) or a neutral identifier (`Vedic Tree / Mumbai Region / [Demo Campus]`).

---

## 9. Architectural Integrity Mandate

- **Design System**: Calm, premium, modern dark slate (`#0F172A`), high-contrast typography (Outfit, Inter, JetBrains Mono), responsive cards, and clean visual hierarchies.
- **Code Standards**: Strict TypeScript / ESNext clean code with zero unused variables, no dead code, and comprehensive automated test coverage.
- **No Gimmicks**: AI is NOT embedded into daily operations. It is strictly an optional, uncommitted future extension point.
