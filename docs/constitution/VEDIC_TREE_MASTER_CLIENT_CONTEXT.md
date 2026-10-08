# VEDIC TREE — MASTER CLIENT / PRODUCT / BUSINESS CONTEXT

> **Status**: Canonical Strategic & Business Context Document  
> **Source Authority Order**:
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
> 
> This is our product architecture interpretation, not a verbatim client claim.

---

## 1. Organisation
- **Organisation**: Vedic Tree / Vedic Tree International School
- **Core Positioning**: *"Indian wisdom. Modern learning."*
- **Broader Educational Proposition**: Combines modern education, technology, academic development, and hybrid learning with values, character development, and elements inspired by the traditional Gurukul philosophy.
- **Classification**: NOT merely a conventional school, LMS, ERP, admissions CRM, or online platform. Our product interpretation translates this into a **Multi-Centre Education Operating System**.

---

## 2. Primary Educational Vision
Vedic Tree's educational philosophy combines:
1. Academic excellence
2. Core human values (honesty, love, respect, compassion, family/human responsibility)
3. Character development
4. Technology-enabled education
5. Hybrid physical + digital learning
6. Practical / experiential education
7. Socio-emotional development
8. Personality development
9. Life skills
10. Parent participation
11. Cultural learning
12. Community involvement
13. Affordability
14. Wider access to quality education
15. Leadership development

---

## 3. Problems Vedic Tree Believes It Is Solving
1. **Insufficient Admission Capacity**: Responded by developing additional modern educational infrastructure.
2. **High Fees & Donation-Based Barriers**: Responded by providing affordable and ultra-affordable schooling models, including hybrid delivery.
3. **Education Narrowly Focused on Academic Marks**: Responded by integrating value-based character development into the core curriculum.
4. **Education Halting at School Boundary**: Responded by creating a hybrid learning ecosystem extending into home and community.

---

## 4. Educational Differentiators & Safeguarding Rules

### 4.1 Experiential Learning
Hands-on activities, practical learning boards, field-based observations.

### 4.2 Socio-Emotional Development (CRITICAL SAFEGUARDING RULE)
- Socio-emotional behaviour, psychometric indicators, and personality development must **NOT** be interpreted as medical diagnoses, mental health diagnoses, or deterministic clinical labelling.
- The software must explicitly distinguish:
  - Direct teacher observation
  - Educational formative assessment
  - Self / teacher-reported indicators
  - Validated psychometric instruments (when formally administered)
  - Clinical conclusions (strictly out of scope for school software)

### 4.3 Value-Based Education
Yoga, meditation, life skills, group discussions, prayer, parenting guidance, cultural learning, community seva.

### 4.4 EQ + IQ + SQ Framework
Client educational framework. Do **not** assume a scientifically validated clinical measurement model without formal psychometric standardization. Represent evidence transparently without claiming unverified scientific precision.

---

## 5. Gurukul-Inspired Education
Restoring Gurukul principles: Traditional values + moral development + modern curriculum + modern infrastructure + technology + individual passion-driven learning. Learning develops the whole human being, not merely commercial outcomes.

---

## 6. Student Experience
Covers Academic Development, Character Development, Skills, Physical Development, Creativity, Culture, Social Development, and Community Participation.
- **Sports**: Cricket, football, swimming, volleyball, athletics, table tennis, tennis, chess.
- **Arts & Craft**: Dance, painting, music, origami, pottery, karate, farming, field visits.
- **Values & Life**: Yoga, meditation, life skills, group discussions, cultural learning, seva.

---

## 7. Ecosystem Participants & Roles
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

## 8. Operating Models & Corporate Hierarchy
```text
VEDIC TREE PARENT / PLATFORM
│
├── Brand / Curriculum / Technology / Online Learning / Franchise IP
│
└── Operating Entities
     ├── SPV / School Portfolio
     │    ├── School
     │    └── Campus
     └── Other authorised operating models (Owned, Partner, Franchise)
```
- **System Implication**: Multi-entity, multi-tenant architecture. The software domain model must **not** assume that `organisation → campus` represents legal ownership. Different operating entities maintain distinct legal entities, balance sheets, fee schedules, contracts, and data-access rights.

---

## 9 & 10. Centralized vs Centre-Level Governance
- **Central Management (HQ)**: Defines curriculum, infrastructure standards, technology platform, training, HR policies, branding, legal, marketing, and global financial standards.
- **Centre Operations**: Executes day-to-day delivery: admissions, classroom teaching, parent partnership, extracurriculars, employee safety, collections, maintenance, housekeeping.

---

## 11. Hybrid Learning Model
Education does not stop at the school walls. Interoperability between **Physical School + Home + Digital Learning + Parent Participation + Activities + Assessment + Portfolio Tracking**. Hybrid does not mean "video class"; it encompasses offline activities, homework, teacher feedback, and student development portfolios.

---

## 12 & 13. Scale Ambition & Geographic Growth
- **Strategic Targets**: Reach 5 crore children and 10,000 franchise/partner centres by 2034.
- **Source-Verified Geographic Scope**:
  - **Mumbai MMR Hubs**: Panvel, Dombivli, Kharghar, Bhiwandi, Vashi, Vasai, Airoli, Virar, Thane, Badlapur, Kalyan, Ambernath.
  - **Target Expansion**: Pune, Nagpur, Ahmedabad, Indore, Hyderabad, Bangalore, Delhi, etc.
  - **Nagpur — Future / Strategic Growth Geography [SOURCE]**: The client presentation references Nagpur as a nationwide growth-plan city, not a verified operating campus or affiliate. Any specific campus name, address, operating status or partnership model remains `[PROPOSED]`. Seed records must be labeled: `Demo Campus — Nagpur [DEMO / PROPOSED — not a verified operating Vedic Tree campus]`.
  - **Strict Geographic Rule**: **Do NOT invent or use unverified locations (such as Baner) as factual client sites**. Demo seeds must use either verified client locations (Panvel, Kharghar, Thane, Dombivli, Kalyan) or a neutral identifier (`Vedic Tree / Mumbai Region / [Demo Campus]`).

---

## 14 to 19. Investor Proposal, SPV Structure & Critical IP Boundary
- **Proposed SPV Package**: Indicative ₹15 Cr package (₹13 Cr primary operating capital into SPV + ₹2 Cr founder secondary).
- **Proposed SPV Scope**: 6-location school investment perimeter (Giravle, MahaMumbai, 3 preschools, current school).
- **CRITICAL CORPORATE / IP BOUNDARY**:
  - **Parent Company (Vedic Tree)** retains: Brand, franchise business, online learning, Gurukul pedagogy, curriculum IP, technology platform, and marketing IP.
  - **School SPVs**: Encompass physical campus operations, student enrollments, campus fees, local staff, and local reporting.
  - **NO PARENT EQUITY IN SPV**. Licences and service agreements govern interactions.
  - **Parent/SPV Boundary**: This view represents school/SPV operational collections only. Parent-level platform, brand, curriculum, technology and related IP economics are outside this view and must be accounted for according to the final legal and commercial structure.
  - **Software Architecture Requirement**: The digital platform must enforce clean separation between Parent IP/Platform and School SPV Operating Data.

---

## 20 to 27. Financial Planning Assumptions & Exit Sensitivities
- Projections (Y1: 1,150 students, ₹6.55 Cr rev $\rightarrow$ Y5: 7,650 students, ₹62.12 Cr rev) are **Management Planning Assumptions — Not Audited**.
- Exit sensitivities (Lower ₹40 Cr, Central ₹100 Cr, Higher ₹160 Cr) are modeled mathematical scenarios, not guaranteed buybacks or audited forecasts.
- Financial records in the operating system must reflect audited double-entry reality.

---

## 28 & 29. Product Hierarchy & Feature Development Discipline
Sovereign Hierarchy:
```text
VEDIC TREE PARENT / PLATFORM
    ↓
OPERATING ENTITY (Parent vs SPV vs Franchise)
    ↓
REGION / ZONE
    ↓
SCHOOL / CENTRE
    ↓
CENTRE / CAMPUS
    ↓
COHORT / CLASS
    ↓
STUDENT
    ↓
LEARNING + DEVELOPMENT RECORD
```

Every feature must answer the 18 development questions (Who is the user? What problem does it solve? What evidence is created? Who owns the data? Physical/digital/hybrid?).

---

## 30. Capability Classification Standard
Every capability, module, and navigation element must be classified:
- `[SOURCE]`: Explicitly supported by client documents (curriculum, technology, HR/training, branding, legal, marketing, finance, admissions, administration, events, parent partnership, extracurricular development, employee safety, accounts/collections, housekeeping, maintenance).
- `[ENABLER]`: Technically required to make an explicit requirement function reliably (authentication, multi-tenant isolation, audit trail, role authorization, data persistence).
- `[PROPOSED]`: Recommended product capability requiring validation (WhatsApp, procurement, transport, visitor management, inventory, reconciliation, performance management, invoices, ledger, counselling pipeline, campus visits, AI extensions).

*Strict Rule: Never convert an inference, recommendation, or proposed capability into a confirmed client requirement without explicit approval.*

---

## 31 & 32. AI Governance: Optional Future Enabling Layer
- **Mandatory Principle**:
  > **AI is an optional future enabling layer. The shell may reserve a non-dominant extension point for AI, but AI capabilities must not be represented as existing, client-approved or operational until separately validated.**
- The PDFs establish **technology, hybrid learning, and online learning**, but do not mention AI.
- AI must **NOT** be represented as a client requirement, a core operational pillar, or an embedded feature of the executive demo.
- In Prompt 03, the visible AI Copilot is removed from the primary shell view. Any future AI hook is strictly an uncommitted, non-dominant extension.


---

## 31 & 32. AI Development Rules & Safeguarding
- Preserve domain boundaries, multi-tenant isolation, and auditability.
- Do not invent client requirements, do not invent clinical child psychological labels, do not hard-code single-campus structures, and do not conflate Parent IP with SPV assets.
- Enforce strict safeguarding: sensitive student safeguarding data must never be exposed via general API queries or UI profiles.

---

## 33. Measurement Model: Input $\rightarrow$ Activity $\rightarrow$ Output $\rightarrow$ Outcome $\rightarrow$ Impact
- **Input**: Resources/programmes provided.
- **Activity**: What student participated in.
- **Output**: What was completed.
- **Outcome**: What observable development occurred.
- **Impact**: Long-term verified improvement.
- *Principle*: Software must capture verifiable evidence rather than manufacturing unproven claims.

---

## 34 & 35. Strategic North Star
> **"Create the digital operating infrastructure that allows Vedic Tree to deliver, measure, govern and scale its academic, character-based, experiential and hybrid education model consistently across a multi-centre network."**

---

## 36. Non-Negotiable Source Discipline
Always distinguish:
1. **Source Fact**: Explicitly stated in Vedic Tree source documents.
2. **Inference**: What logically follows.
3. **Recommendation**: What should be built.
4. **Assumption**: What remains unconfirmed.
5. **Research Requirement**: What requires external validation.
6. **Client Question**: What must be confirmed directly with Vedic Tree leadership.

---

## 37. Standard 18-Point Architecture Rubric
For every significant architecture or feature implementation, evaluate:
1. Client Objective
2. Problem Being Solved
3. User / Stakeholder
4. Source Requirement (A/B/C/D)
5. Proposed System Capability
6. Business Logic
7. Data Model Impact
8. Permissions / Security
9. Workflow
10. UX Requirements
11. Multi-Centre Considerations
12. Scalability
13. Compliance / Safeguarding
14. Analytics / Measurement
15. Failure Modes
16. Assumptions
17. Client Questions
18. Acceptance Criteria
