# Vedic Tree OS — Visual Reconstruction Specification (Prompt 08)

**Document ID:** `DOC-VT-VISUAL-RECON-2026-08`  
**Classification:** Operational Art Direction & Architectural Design Standard  
**Mandate:** PROMPT 08 — Structural Visual Reconstruction  
**Philosophy:** *"Indian wisdom. Modern learning. Calm. Human. Intelligent. Editorial. Trustworthy. Modern. Distinctive."*

---

## 1. Executive Summary & Problem Diagnosis

Before Prompt 08, Vedic Tree OS possessed deep domain modeling, strict safeguarding, and comprehensive test coverage across all ten modules. However, the visual experience suffered from standard UI kit artifacts:
1. **"Container Lasagna":** Deeply nested rectangular containers (`canvas → card → card → card → button → badge`) that crowded data and made pages feel like boxed compartments rather than an open editorial canvas.
2. **Generic SaaS Geometry:** Overuse of heavy rounded corners (`rounded-2xl`, 16px) and artificial drop shadows (`shadow-xs`, `shadow-2xs`), producing a generic tech-startup aesthetic inconsistent with an authoritative educational institution.
3. **Sidebar Label Truncation:** A constrained `w-64` (256px) sidebar forced long institutional terminology (such as `Development Compass`, `Institutional Standards`) to truncate prematurely (`Development Com...`), especially when paired with inline badge pills.
4. **Topbar Control Inconsistency:** Scope selectors, search bars, and persona buttons varied across arbitrary heights (`h-8`, `h-10`, `py-1.5`), causing visual jitter along the horizontal baseline.
5. **Call-to-Action Duplication:** The Executive Overview displayed duplicate button triggers for the same four quick actions across multiple tiers of the screen.

Prompt 08 executed a **system-wide structural reconstruction** eliminating these defects while upholding an **absolute product content lock**.

---

## 2. Core Visual Principles Implemented

### Principle 1: 3-Tier Surface Hierarchy
- **Level 1 — Canvas (`#FBF8EF` Warm Ivory):** Unbounded, generous spatial ground. Page headers, briefing context, and major division lines sit directly on this canvas.
- **Level 2 — Quiet Operational Surface (`#FFFFFF` or `#F4EEDC`/40 with `#E6DFD1` hairline border):** Logical groupings (such as Developmental Continuum tables, Admissions Kanbans, or Attendance ledgers) live on flat Level 2 surfaces. Artificial drop shadows are strictly banned.
- **Level 3 — Elevated Surface (Reserved for Overlays):** Used exclusively for modals, dropdown flyouts, and command palettes with high backdrop blur and disciplined `rounded-xl` bounds.

### Principle 2: Disciplined Structural Geometry
- **Surfaces & Cards:** Standardized strictly to `rounded-lg` (8px) or `rounded-xl` (12px).
- **Interactive Controls:** Buttons, inputs, and selects standardized to `rounded-md` (6px) or `rounded-lg` (8px).
- **Zero Drop Shadows:** Eliminated `shadow-xs`, `shadow-2xs`, and heavy drop shadows in favor of crisp 1px hairline borders (`border-[#E6DFD1]`).

### Principle 3: Expanded Institutional Sidebar (`w-72` / 288px)
- Desktop sidebar width expanded from 256px to 288px.
- Navigation item flex layout refactored so metadata badges sit quietly without truncating or squeezing label text.
- Active item indicator refined with a quiet `bg-[#154E42]/70` backing and a 2px Antique Gold (`#C49A3A`) left accent.

### Principle 4: Unified Control Baseline (`h-9` / 36px)
- Topbar campus scope dropdown, global search input, notification bell trigger, and persona selector aligned strictly to `h-9` (36px).
- Filter controls and primary page actions unified to the same 36px vertical cadence.

### Principle 5: Balanced 2×2 Editorial Briefing
- "Today's Attention" on the Overview dashboard reconstructed into a balanced 2×2 editorial card layout with inline action links and zero duplicate CTA button rows.

---

## 3. Shared Design System Primitives Modified

| Component File | Key Changes Made |
|---|---|
| [`src/design-system/layout/Card.jsx`](file:///C:/Users/vD/.gemini/antigravity-ide/scratch/saas-engine-studio/src/design-system/layout/Card.jsx) | Replaced `rounded-2xl` with `rounded-lg sm:rounded-xl`; mapped 3-level surface tokens (`flat`, `bordered`, `raised`, `interactive`); removed artificial drop shadows (`shadow-xs`, `shadow-2xs`). |
| [`src/design-system/actions/Button.jsx`](file:///C:/Users/vD/.gemini/antigravity-ide/scratch/saas-engine-studio/src/design-system/actions/Button.jsx) | Enforced strict heights (`h-8`, `h-9`, `h-10`); refined geometry to `rounded-md` / `rounded-lg`; removed `shadow-2xs`; added clean `link` variant. |
| [`src/design-system/foundations/Badge.jsx`](file:///C:/Users/vD/.gemini/antigravity-ide/scratch/saas-engine-studio/src/design-system/foundations/Badge.jsx) | Standardized default badge geometry to `rounded-md` (`pill={false}`); restricted pills exclusively to semantic status indicators. |
| [`src/design-system/data/Table.jsx`](file:///C:/Users/vD/.gemini/antigravity-ide/scratch/saas-engine-studio/src/design-system/data/Table.jsx) | Updated table wrapper to `rounded-lg sm:rounded-xl`; removed artificial drop shadows; standardized header background to warm ivory `#F4EEDC`/70 with hairline `#E6DFD1` dividers. |
| [`src/design-system/layout/Modal.jsx`](file:///C:/Users/vD/.gemini/antigravity-ide/scratch/saas-engine-studio/src/design-system/layout/Modal.jsx) | Configured as Level 3 Elevated Surface with `rounded-xl`, hairline `#E6DFD1` border, warm ivory header/footer, and backdrop blur. |
| [`src/design-system/data/KPICard.jsx`](file:///C:/Users/vD/.gemini/antigravity-ide/scratch/saas-engine-studio/src/design-system/data/KPICard.jsx) | Refined geometry to `rounded-lg sm:rounded-xl`; removed drop shadows; standardized typography for metrics and labels. |
| [`src/design-system/input/FormField.jsx`](file:///C:/Users/vD/.gemini/antigravity-ide/scratch/saas-engine-studio/src/design-system/input/FormField.jsx) | Updated input controls to `h-9` baseline, `rounded-md`, hairline `#E6DFD1` borders, and `#0B2F29` focus ring. |
| [`src/design-system/input/SearchInput.jsx`](file:///C:/Users/vD/.gemini/antigravity-ide/scratch/saas-engine-studio/src/design-system/input/SearchInput.jsx) | Replaced dark slate styling with Vedic Tree design tokens (`#0B2F29`, `#102625`, `#E6DFD1`), `h-9` height, and `rounded-lg` geometry. |

---

## 4. Shell & Flagship Screen Reconstructions

### A. Shell Components
- **`AppSidebar.jsx`**: Expanded desktop width to `w-72` (288px). Eliminated text-truncation on label and subtitle. Badges are positioned as subordinate metadata on the right edge. Active nav indicator features a 2px Antique Gold left border and `#154E42` tint.
- **`AppTopbar.jsx`**: Standardized all header controls (Scope Selector, Search Bar, Notifications Trigger, Persona Switcher) to a uniform `h-9` (36px) baseline and `rounded-lg` corners.

### B. Flagship Pages
- **Overview Dashboard (`OverviewDashboard.jsx`):**
  - Rebuilt page header with editorial serif title and context eyebrow.
  - Reconstructed "Today's Attention" into an open 2×2 editorial briefing grid with inline contextual action links.
  - Removed duplicate bottom CTA row.
  - Converted Metric Pulse strip into a continuous Level 2 surface with tabular typography.
  - Restructured Network and Centre Scope cards to `rounded-xl` with hairline dividers and zero drop shadows.
- **Student 360 View (`Student360View.jsx`):**
  - Updated learner identity banner and vital stats ribbon to disciplined `rounded-xl` geometry.
  - Refactored Developmental Continuum Matrix table (`rounded-xl`, `border-l-2 border-[#C49A3A]`).
  - Cleaned up detail pane facets and evidence ledger (`rounded-lg`).
  - Standardized Curricular, Attendance, Fee Ledger, Guardians Vault, Pastoral Dossier, and Formative Observation Modal to disciplined 8px–12px geometry with zero drop shadows.
- **Admissions Hub (`AdmissionsHub.jsx`):**
  - Reconstructed orientation banner, 5-stage metric pulse ribbon, and Kanban pipeline cards (`rounded-lg` / `rounded-md`).
  - Removed drop shadows from directory table, counselor task cards, and WhatsApp communication gateway.
- **Academics Hub (`AcademicsHub.jsx` & `TeacherMyDay.jsx`):**
  - Converted academic persona switcher, period cards, curriculum roadmap, and homework grading queue to calm Level 2 surfaces (`rounded-xl` / `rounded-lg`) with hairline borders.

---

## 5. Absolute Product Content Lock & Verification

Prompt 08 maintained 100% adherence to all non-negotiable content locks:
1. **Zero Route or Nav Key Changes:** All routes (`overview`, `student-360`, `students`, `admissions`, `academics`, `attendance`, `finance`, `operations`, `hrms`, `communication`, `platform-security`) preserved exactly.
2. **Zero RBAC / Permission Changes:** All 6 roles (`HQ_ADMIN`, `PRINCIPAL`, `TEACHER`, `PARENT`, `STUDENT`, `FRANCHISEE`) and tenant barriers intact.
3. **Whole-Child Continuum Lock:** The 4 qualitative stages (`Emerging → Developing → Proficient → Exemplary`) across the 4 cardinal areas remain strictly qualitative, with zero radar charts, composite scores, or percentiles.
4. **Safeguarding Mandate:** Non-clinical educational observation standards and mandatory safeguarding disclaimers preserved.
5. **Financial Isolation:** Parent/SPV corporate boundary isolation preserved.
6. **Test Suite Status:** 249/249 tests passing across all 69 test suites.
7. **Production Build:** `npm run build` exits cleanly with code 0 in ~2.2s.

---

## 6. Multi-Viewport Visual QA Summary

| Viewport | Device Class | Validation Focus | Status |
|---|---|---|---|
| **1440 × 900** | Desktop Standard | Full sidebar `w-72` visibility; no label truncation; 2×2 editorial layout in Overview; continuous Level 2 surfaces. | **Verified** |
| **1280 × 800** | Laptop / Compact Desktop | Sidebar label readability; table horizontal breathing room; no horizontal overflow. | **Verified** |
| **1024 × 768** | Tablet Landscape | Grid adaptations (2-column collapse); filter wrapping; touch target accessibility (min 36px–40px). | **Verified** |
| **390 × 844** | Mobile Portrait | Mobile drawer navigation; stacked card layouts; full-width action buttons; clear typographic hierarchy. | **Verified** |

---

## 7. Remaining Considerations & Maintenance Notes

1. **New Component Compliance:** When authoring future components, ensure they import `Card`, `Button`, `Badge`, and `Table` from `src/design-system/` to automatically inherit the 3-level surface model, hairline dividers, and disciplined geometry.
2. **Tailwind Class Guardrails:** Avoid ad-hoc `rounded-2xl`, `rounded-3xl`, `shadow-xs`, or `shadow-2xs` in page files. Prefer `rounded-lg` (8px), `rounded-xl` (12px), and hairline borders (`border border-[#E6DFD1]`).
