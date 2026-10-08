# Vedic Tree OS — Executive & Centre Overview Architecture & UX Specification

> **Document Version:** 1.2.0 (Prompt 04.1 — Minimalist Analytical Control Room)  
> **Classification:** Flagship Operating Surface Architecture & UX Specification  
> **Source Authority Order:**  
> 1. Original Client Evidence (PDFs)  
> 2. Explicitly Approved Client Requirements  
> 3. Master Client Context (`VEDIC_TREE_MASTER_CLIENT_CONTEXT.md`)  
> 4. Approved Architecture & Product Decisions  
> 5. Proposed Extensions (Subject to validation)  

---

## 1. Executive Summary: The Minimalist Analytical Control Room

The **Executive & Centre Overview** is the flagship operating surface for **VEDIC TREE OS**. It translates Vedic Tree’s educational vision (integrating academic excellence with Gurukul-inspired character and holistic wellbeing) and multi-unit operating structure into a sophisticated, minimalist executive command environment.

### 1.1 Design Philosophy: Minimalist Analytical Control Room
Rather than presenting a dense, decorative ERP numbers wall or a generic card-heavy dashboard, the Overview operates as a **Minimalist Analytical Control Room**.

> **Design Directive (Prompt 04.1 Reference Aesthetic):**  
> The client has provided a Dribbble school-dashboard reference as visual inspiration. Use it only as inspiration for minimalist composition, information density, analytical visualisation, spacing, typography, hierarchy and dashboard polish. Do not copy its layout, branding, content, terminology, components or proprietary visual details. Do not remove or alter any Vedic Tree OS business content, metrics, governance, source classifications, workflows or financial/safeguarding boundaries merely to resemble the reference.

> **Core Principle:**  
> **Simple visual language + rich information density.**  
> Keep our Vedic Tree OS information architecture, business logic, governance and content exactly as defined — but raise the visual language and analytical sophistication to a premium minimalist school-operations dashboard.

> **The Target:**  
> Not a prettier dashboard, but a sophisticated executive operating surface where a large amount of school data feels effortless to understand.

The information architecture strictly adheres to a human operational flow:
```
WHAT IS HAPPENING
        ↓
WHAT NEEDS ATTENTION (Primary Hero)
        ↓
WHAT CHANGED (Audit & Pulse)
        ↓
WHAT ACTION FOLLOWS (Contextual Act Now)
```

### 1.2 Governance & Source Discipline
All metrics, dimensions, and operational elements maintain strict source hygiene:
- `[SOURCE]`: Explicitly grounded in provided client materials (e.g. Gurukul values, preschool / K-12 stages, MMR geography, admissions pipeline, fees, attendance).
- `[ENABLER]`: Technically required for operational robustness, tenant isolation, auditability, and SLA enforcement.
- `[PROPOSED]`: Recommended management interpretation requiring empirical validation with client stakeholders.

To prevent visual clutter, loud `[SOURCE]` / `[ENABLER]` / `[PROPOSED]` badges are removed from card titles. Instead, governance provenance is maintained via a clean **`ⓘ Metric provenance`** affordance that opens a comprehensive provenance ledger upon user interaction.

---

## 2. Operational Hero: "Today's Attention" & Contextual "Act Now"

### 2.1 The Attention Hero (`TodayAttentionHero`)
The primary visual hero on the page is the **Today's Attention** card, placed above the KPI strip. It synthesizes urgent operational exceptions requiring leadership intervention:
- **Header:** `TODAY — [N] THINGS NEED YOUR ATTENTION` (or `Everything is currently on track` when no items require escalation).
- **Structure per Attention Item:**
  - **Priority:** High / Medium / Low (visually distinct border and badge, WCAG compliant).
  - **Category:** Subsystem classification (Admissions, Attendance, Operations, Finance).
  - **Issue:** Precise operational summary (e.g., `4 enquiries require follow-up`, `Attendance requires review`).
  - **Scope:** Campus context (e.g., `Panvel Campus`, `Nagpur Campus`, `Network`).
  - **Reason / Context:** Concrete trigger (e.g., `Enquiries pending follow-up > 48h`, `Campus roll-call below configured benchmark (75%)`).
  - **Explicit Action CTA:** Direct navigation button with deep-link destination (e.g., `[Review Admissions]`, `[Review Attendance]`).
- **Empty State:** If zero attention items exist, renders a dignified empty state: `"Everything is currently on track. No operational exceptions or SLA breaches require immediate leadership attention across this scope."` Urgency is never manufactured.

### 2.2 Contextual "Act Now" Action Bar
Replaces generic decorative quick action clusters with tight action coupling derived directly from current attention items:
- Displays immediate action buttons linked to active exceptions:
  - `Follow up [N] enquiries`
  - `Review attendance exception`
  - `Resolve [N] maintenance items`
- Derived dynamically from real underlying service state.
- Subordinates general shortcuts (e.g., `+ New Enquiry`, `Record Attendance`, `Student Directory`) into secondary utility controls.

---

## 3. Subordinated Executive KPI Strip

Positioned below the Attention Hero, the KPI strip provides a rapid operational health snapshot without dominating the cognitive space:
- **Active Centres `[SOURCE]`:** Verified count of operational physical campuses (Network scope only).
- **Students `[SOURCE]`:** Headcount of enrolled students across the scope.
- **Teachers / Faculty `[SOURCE]`:** Academic staff headcount across the scope.
- **Admissions / Leads `[SOURCE]`:** Total open enquiries in the pipeline.
- **Attendance Rate `[SOURCE]`:** Today's roll-call attendance percentage.
- **School Collections `[SOURCE]`:** Total reconciled school tuition fees collected.

---

## 4. Demo Environment Signal

To guarantee executive transparency while reviewing demonstration or staging data, a persistent, subtle, and dignified indicator is displayed in the dashboard header:
```
DEMO ENVIRONMENT · Sample operational data
```
- Restrained styling: muted emerald/slate pill with a gentle pulse indicator.
- Non-disruptive, accessible, and fully responsive across all breakpoints.
- Avoids alarmist warning banners while upholding institutional integrity.

---

## 5. Geographic & Campus Operating Scope Reconciliation

The system reconciles all four configured demo/seed campus records without deleting, renaming, or falsely homogenizing regional geography:
- **Mumbai MMR Operating Scope:**
  - `Panvel Campus` (Flagship / Demo Centre)
  - `Kharghar Campus`
  - `Thane Campus`
- **Nagpur — Future / Strategic Growth Geography [SOURCE]:**
  - Configured Seed Record: `Demo Campus — Nagpur`
  - Provenance: `[DEMO / PROPOSED — not a verified operating Vedic Tree campus]`
  - Any specific campus name, address, operating status or partnership model remains `[PROPOSED]` unless separately evidenced by the client.

The Network Overview's **Centre Health** table explicitly distinguishes campuses by geographic scope (`Mumbai MMR Operating Scope` vs `Nagpur — Future / Strategic Growth Geography [SOURCE]`), preventing misleading assumptions that all campuses reside within the Mumbai metropolitan region or that Nagpur is a verified operating campus.

---

## 6. Regulatory Source Hygiene: Attendance Benchmark

All attendance references maintain strict regulatory accuracy:
- **Forbidden:** Describing system thresholds as "CBSE minimum benchmark" or statutory mandates unless backed by client evidence.
- **Enforced Language:**
  ```
  Attendance: 78.4%
  Configured benchmark: 75%
  ```
- Uses dynamic configuration (`configuredBenchmarkPct: 75`) from the service layer rather than hardcoded assertions.

---

## 7. Student Development Pulse (Reduced Compass)

The broad Vedic Tree Development Compass is focused on the Overview into a concise **Student Development Pulse**:
- **Four Core Dimensions:**
  1. *Academics* (Foundational literacy, numeracy, curriculum progression).
  2. *Character & Values* (Gurukul morning prayers, seva, ethical growth).
  3. *Wellbeing & Sports* (Physical activity, yoga, nutrition habits).
  4. *Life Skills* (Practical boards, creative expression, environmental care).
- **Executive Pulse:** High-level cohort progress indicators and concise observations. Deep individual rubrics and diagnostic charts are deferred to the dedicated Student 360 module.
- **Exploration CTA:** `"View Development Pulse →"`
- **Mandatory Safeguarding Notice:**
  > *"Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses."*

---

## 8. Network Scope vs Centre Scope Experience

The information hierarchy adapts intentionally based on active administrative scope:

| Dimension | Network Scope (`NETWORK`) | Centre Scope (`CENTRE`) |
| :--- | :--- | :--- |
| **Primary Audience** | CEO, Trustees, Central Operations Team | Principal, Centre Director, Campus Admin |
| **Core Question** | "How is the entire network performing?" | "What must I manage at this campus today?" |
| **Hero Focus** | Network-wide SLA bottlenecks & multi-campus alerts | Local campus exceptions (unmarked roll-calls, walk-in leads) |
| **Hierarchy** | 1. Network Attention Hero<br>2. Subordinate KPI Strip<br>3. Centre Health & Regional Matrix<br>4. Admissions Pipeline<br>5. Attendance & Collections<br>6. Network Audit Feed | 1. Campus Attention Hero<br>2. Subordinate KPI Strip<br>3. Daily Attendance & Classroom Roster<br>4. Local Admissions & Enquiries<br>5. Campus Facilities & Maintenance<br>6. Local Fee Collections & Receipts |
| **Scope Isolation** | Aggregates all permitted campuses | Strictly locked to active campus context (HTTP 403 on breach) |

---

## 9. Corporate & Financial Boundary

A strict corporate boundary is enforced in all financial representations:
- **School / Campus Collections:** Represents institutional tuition, activity, and transport receipts collected by the school entity for local operations.
- **Parent Platform / IP Boundary:**
  > *"Parent/SPV Boundary: This view represents school/SPV operational collections only. Parent-level platform, brand, curriculum, technology and related IP economics are outside this view and must be accounted for according to the final legal and commercial structure."*

---

## 10. Metric Provenance Architecture

The metric provenance system is fully preserved but made unobtrusive:
- Activated via `ⓘ Metric provenance` button in the header.
- Opens an executive governance modal detailing all 9 core capabilities:
  - Metric Name & Scope
  - Data Source (`db.campuses`, `db.students`, `db.payments`, etc.)
  - Classification (`[SOURCE]`, `[ENABLER]`, `[PROPOSED]`)
  - Verification & Governance Notes

---

## 11. Responsive Design & Accessibility (WCAG 2.2 AA)

- **Breakpoints:**
  - *Desktop (1440px):* Multi-column balanced grid, expansive attention hero, side-by-side operational deep-dives.
  - *Tablet (768–1024px):* 2-column stacked layout, scrollable comparison tables, touch-friendly CTA buttons.
  - *Mobile (390px):* Vertical stack prioritizing Today's Attention hero, responsive font wrapping, full-width Act Now buttons, and simplified tables with horizontal overflow prevention.
- **Accessibility:**
  - Contrast ratios $\ge 4.5:1$ in both light and dark themes.
  - Color is never used as the sole indicator of status (always paired with badges and icons).
  - Visible focus rings (`focus:ring-2 focus:ring-[#0F4C35]`).
  - Screen reader attributes (`aria-label`, semantic `<section>` and `<table>` elements).

---

## 12. Verification & Build Integrity

- **Automated Tests:** 224 tests passing across 59 test suites (0 failures).
- **TypeScript:** `npx tsc --noEmit` passing with 0 diagnostics.
- **Production Bundle:** `npm run build` clean build in $< 2\text{s}$.
- **Browser Validation:** Verified visually across 4 viewpoints (Desktop 1440px and Mobile 390px for both Network and Centre Panvel scopes).
