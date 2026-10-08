# Vedic Tree OS — Premium UI/UX Art Direction Specification
**Document ID:** `DOC-VT-ARTDIR-2026-06`  
**Classification:** Product Experience & Visual System Standard  
**Mandate:** Prompt 06 — Premium UI/UX Art-Direction Pass  
**Guiding Principle:** *"Indian wisdom. Modern learning. Calm. Human. Intelligent. Editorial. Trustworthy. Modern. Distinctive."*

---

## 1. Executive Intent & Design Character

Vedic Tree OS is not a generic school ERP, a whimsical children's app, or a standard Tailwind/shadcn SaaS admin dashboard. It is an **institutional education operating system** that simultaneously serves:
1. **The warmth and developmental energy** of a holistic school (educators, parents, learners).
2. **The institutional credibility, maturity, and authority** of an enterprise platform (founders, principals, regulators, investors).

### What We Are Eliminating
- ❌ Excessive rounded rectangles (`rounded-3xl` everywhere)
- ❌ Excessive heavy borders and stacked borders
- ❌ Heavy drop shadows and generic "AI glow" effects
- ❌ Identical, modular card grids (the "4-card row followed by 3-card row" trap)
- ❌ "Cards inside cards inside cards" (containeritis)
- ❌ Debug tags and noisy badges (`[SOURCE]`, `[ENABLER]`, `M-01`, `v2.0`) in everyday primary navigation
- ❌ Oversized neon KPI numbers
- ❌ Radar / polar charts (strictly eliminated per Prompt 05 decision)

### What We Are Establishing
-  **Editorial Page Composition:** Open canvases with whitespace, clear typographic scale, and hairline dividers (`#E6DFD1`) instead of heavy card prisons.
-  **Three-Tier Surface Hierarchy:** Level 1 Open Canvas (`#FBF8EF`) → Level 2 Subtle Grouping Surface (`#FFFFFF` with `#E6DFD1` boundary) → Level 3 Elevated Surface (strictly for active dialogs/flyouts).
-  **Dual Typographic Hierarchy:** Prestigious Classical Serif (*Playfair Display* / *Cormorant Garamond*) for executive headings, whole-child titles, and editorial narrative; High-clarity Geometric Sans (*Plus Jakarta Sans*) for operational tables and interactive inputs; Tabular Monospace (*JetBrains Mono*) for fee amounts, dates, and quantitative student metrics.
-  **Linear Developmental Continuum:** A quiet, horizontal progression model (*Emerging → Developing → Proficient → Exemplary*) that visually illustrates an individual learning trajectory without competitive percentiles, normative polygons, or composite scoring.

---

## 2. Baseline Preservation Audit (Strict Content Lock)

Per non-negotiable Prompt 06 rules, **zero product content, scope, or workflows may change**:

| Dimension | Baseline State | Preserved Implementation |
|---|---|---|
| **Routes & Nav Keys** | `overview`, `student-360`, `students`, `attendance`, `admissions`, `academics`, `finance`, `operations`, `hrms`, `communication`, `platform-security` | 100% Unchanged |
| **Permissions & RBAC** | `HQ_ADMIN`, `PRINCIPAL`, `TEACHER`, `PARENT`, `STUDENT`, `FRANCHISEE` | 100% Unchanged |
| **Campus Tenancy Barrier** | Strict multi-tenant isolation (Baner cannot access Kothrud; Parent can only view assigned ward) | 100% Unchanged |
| **Financial Separation** | Parent/SPV corporate fee boundary isolation (§14 of Constitution); Fee masking for Teachers and Students | 100% Unchanged |
| **Developmental Model** | 4 cardinal areas (*Character & Values*, *Academic Excellence*, *Life Skills & Agency*, *Mindfulness, Composure & Reflection*) | 100% Unchanged |
| **Safeguarding Mandate** | Strict non-clinical terminology rules; mandatory safeguarding disclaimer banner (*Invariant II*) | 100% Unchanged |
| **Data Integrity** | Real operational metrics (e.g., Math 38/40, Attendance 96.7%, Fee ₹0 Due) | 100% Unchanged |

---

## 3. Surface & Spatial Hierarchy (Prompt 08 Structural Reconstruction)

### The Three Surface Levels
```text
┌────────────────────────────────────────────────────────────────────────┐
│ LEVEL 1: OPEN CANVAS (#FBF8EF — Warm Ivory)                            │
│ Ground foundation for all views. Generous whitespace, no borders.      │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ LEVEL 2: QUIET OPERATIONAL SURFACE                             │   │
│   │ (#FFFFFF / #FBF8EF with hairline border #E6DFD1)               │   │
│   │ Surfaces: rounded-lg (8px) or rounded-xl (12px).               │   │
│   │ NO ARTIFICIAL DROP SHADOWS (shadow-xs/shadow-2xs removed).     │   │
│   │ Hairline dividers, calm contrast, high data density.           │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ LEVEL 3: ELEVATED SURFACE (Strictly Dialogs, Flyouts, Drawers) │   │
│   │ Rounded-xl, hairline border #E6DFD1, soft backdrop-blur.       │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

### Eliminating "Container Lasagna"
- **Strictly Flattened Hierarchy:** We ban `canvas → card → card → card → button → badge` nesting.
- **Direct Canvas Anchoring:** Page titles, context eyebrows, and briefing summaries sit directly on the **Level 1 Canvas**, anchored by editorial typography and subtle hairline rules (`border-b border-[#E6DFD1]`).
- **Hairline Dividers Over Boxes:** Sub-panels, metrics, and list items within an operational module are separated by hairlines (`divide-y divide-[#E6DFD1]` or `border-b border-[#E6DFD1]`) rather than encapsulated in independent nested cards.
- **Restrained Geometry:**
  - Surfaces / Containers: `rounded-lg` (8px) or `rounded-xl` (12px).
  - Interactive Controls (Buttons, Inputs, Selects): `rounded-md` (6px) or `rounded-lg` (8px).
  - Control Height: Standardized to `h-9` (36px) baseline across Topbar, Filters, and standard actions.
- **Sidebar Breathing Room:** Expanded to `w-72` (288px) on desktop to guarantee zero label truncation on long institutional descriptors (e.g., `Development Compass`, `Safeguarding Ledger`), rendering badges as subordinate muted metadata.

---

## 4. Palette Grammar & Balance

The interface adheres to the 65 / 20 / 7 / 4 / 2 / 1 / 1 distribution:

```text
  ┌───────────────────────────────┬────────────┬──────┬───┬─┬┬┐
  │ 65% Warm Ivory Canvas         │ 20% Forest │ 7%   │ 4%│211│
  │ #FBF8EF                       │ #0B2F29    │ Sage │Gld│L V C
  └───────────────────────────────┴────────────┴──────┴───┴─┴┬┘
                                                       L = Lime (2%)
                                                       V = Violet (1%)
                                                       C = Coral (1%)
```

- **Canvas & Backing (65%):** `#FBF8EF` (Warm Ivory).
- **Brand Shell & Anchor (20%):** `#0B2F29` (Deep Forest) on sidebar and modal framing; `#154E42` for active item pills and primary buttons.
- **Structural Sage (7%):** `#2D705C` / `#60706B` for subtitles, secondary borders, verified checkmarks.
- **Restrained Gold (4%):** `#C49A3A` / `#DFC679` for active navigation indicator pips, milestone markers, and the Parent/SPV corporate boundary outline.
- **Learning Lime (2%):** `#87E51F` for subtle progress accents.
- **Vedic Violet (1%):** `#5D27E8` for mindfulness, reflection, and Dhyana contexts.
- **Coral / Critical (1%):** `#E35D52` strictly for unexcused absences or urgent work orders.

---

## 5. Typographic Architecture

1. **Eyebrow:** Small (10px–11px), uppercase, tracked (`tracking-widest`), muted slate (`#60706B`), sans-serif or mono.
2. **Page Title:** Editorial serif (`font-serif`, 24px–32px), deep ink (`#102625`), tight tracking (`tracking-tight`).
3. **Supporting Description:** 13px–14px, muted earthy slate (`#60706B`), generous line height (`leading-relaxed`).
4. **Section Heading:** 16px–18px serif or semi-bold sans, restrained, accompanied by hairline divider.
5. **Data & Metrics:** Tabular mono (`font-mono`, `tabular-nums`), proportional, never shouting.
6. **Metadata:** 11px–12px, soft slate, instant scannability.

---

## 6. Shell & Navigation Art Direction

### AppSidebar
- **Brand Block:** Deep Forest `#0B2F29` with elegant serif "Vedic Tree OS" monogram, soft gold subtitle "Indian wisdom. Modern learning."
- **Navigation Groups:** Clean, unbracketed group titles (`EXECUTIVE OVERVIEW`, `GOVERNANCE & STANDARDS`, `ACADEMICS & LEARNING`, `CAMPUS OPERATIONS`, `SECURITY`).
- **Elimination of Clutter:** Removed repetitive, distracting `[SOURCE]`, `[ENABLER]`, `M-01` badge pills from every nav row. Nav labels are clean, readable, with quiet iconography.
- **Active State:** Clean `#154E42` background pill with a 3px Antique Gold `#C49A3A` left edge indicator and soft ivory text.

### AppTopbar
- **Quiet Identity:** Contextual campus indicator (`Panvel Campus [Demo Campus]`) in warm ivory pill.
- **Global Search:** Restrained search field with subtle hairline border and keyboard shortcut chip (`⌘K`).
- **Attention Notification:** Minimal bell icon with notification count indicator.
- **Persona Context:** Clean user pill with initials and active role.

---

## 7. Flagship Screen Refinements

### A. Student 360 View — The Whole Learner
- **Identity Banner:** Clean, open layout. Deep Forest avatar shield (`KD`), serif student name, admission metadata, and quiet 4-item operational summary (Attendance, Grade, Fees, Pickup) separated by vertical hairlines rather than nested boxes.
- **Linear Developmental Continuum Matrix:**
  - Four cardinal areas (*Character & Values*, *Academic Excellence*, *Life Skills & Agency*, *Mindfulness, Composure & Reflection*).
  - Horizontal progress continuum bar representing:
    `Emerging ───── Developing ───── Proficient ───── Exemplary`
    with an active glowing marker on the student's documented stage.
  - Verified observation counts and educator scaffolding notes.
- **Granular Facet Ledger:** Subtle warm cards displaying authentic Vedic dimensions (*Truthfulness & Satya*, *Humility & Vinaya*, *Campus Shramdaan & Seva*) alongside exact teacher quotes.
- **Safeguarding Disclaimer:** Elegant bottom notification reinforcing non-clinical educational observation standards.

### B. Executive & Centre Overview Dashboard
- **Operational Hero ("Today's Attention"):** Asymmetric editorial layout highlighting pending exceptions without looking like a generic alert banner.
- **Continuous KPI Ribbon:** Clean horizontal band with proportional tabular numerals.
- **Campus Health Table:** High-density institutional typography with warm ivory headers and clear corporate boundary footnotes.

---

## 8. Validation Matrix

1. **Test Suite:** Zero test regressions (249/249 unit and RBAC tests passing).
2. **Build:** `npm run build` succeeds cleanly in < 3s.
3. **Cross-Device Inspection:**
   - Desktop (1440 × 900)
   - Laptop (1280 × 800)
   - Tablet (1024 × 768)
   - Mobile (390 × 844)
