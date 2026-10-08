# VEDIC TREE OS — CURRENT VISUAL MODEL
## Forensic Read-Only Audit of the Active Implementation

**Date:** October 8, 2026  
**Audit Scope:** Full codebase inspection of `saas-engine-studio` (Application Shell, Design Tokens, Shared Primitives, Flagship Modules, Legacy Operational Views, Typography, Geometry, Responsive Breakpoints).  
**Status:** READ-ONLY FORENSIC BASELINE (No code or visual assets modified).

---

## 1. Executive Visual Summary

The current VEDIC TREE OS application exists in a **bifurcated visual state**. A dedicated art-direction pass (Prompt 06) successfully overhauled the **global application shell** and **four flagship views** (Executive/Centre Overview, Student 360, Admissions CRM, and Academics Hub) into an editorial, warm ivory, deep forest, and antique gold aesthetic. However, **the remaining six operational modules** (Student Master Directory, Staff HRMS Directory, Attendance Hub, Finance & Fees Hub, School Operations & Facilities, RBAC Vault, and Audit Trail) as well as **several core design primitives** (Forms, Inputs, Modals, Drawers, Alerts, and Empty States) were left in their legacy state: an inky-black, developer-centric dark slate dashboard (`#0F172A` / `#131D31` / `#24324D`).

As a result, navigating through the product creates an immediate visual disconnect:
- In the **Flagship Experience**, the user sees an editorial canvas with Warm Ivory (`#FBF8EF`), hairline dividers (`#E6DFD1`), *Playfair Display* serif headings, *Plus Jakarta Sans* body text, continuous analytical ribbons, and restrained gold/sage markers.
- In the **Operational Experience**, the user encounters dark slate cards, neon emerald status text (`text-emerald-400`), rigid question-style debug banners (`"WHERE AM I? • SIS / Student Master Directory"`), and generic dashed-border empty boxes.
- Furthermore, `src/design-system/tokens.js` was never synchronized with `src/index.css`: the token file continues to export generic Tailwind green/slate swatches and declares `Inter` as the primary font, while `index.css` and `index.html` load and apply *Playfair Display*, *Plus Jakarta Sans*, and client custom properties.

---

## 2. Actual Typography System

### 2.1 Font Stack Declarations

| Font Role | Declared in `index.html` (Google Fonts) | Declared in `src/index.css` | Declared in `tokens.js` | Actually Applied in Browser |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Sans** | `Plus Jakarta Sans` (weights 400–800) | `'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif` | `'Inter', -apple-system, ...` | `Plus Jakarta Sans` (fallback `Inter`) |
| **Display / Serif** | `Playfair Display` (500–700), `Cormorant Garamond` (500–700) | `'Playfair Display', 'Cormorant Garamond', Georgia, serif` | `'Inter', sans-serif` *(mismatch)* | `Playfair Display` (fallback `Cormorant Garamond`) |
| **Monospace** | `JetBrains Mono` (400–600) | `'JetBrains Mono', monospace` | `'JetBrains Mono', 'SF Mono', ...` | `JetBrains Mono` |
| **Global Body** | — | `body { font-family: var(--font-sans); }` | — | `Plus Jakarta Sans` |
| **Global Headings**| — | `h1, h2, h3, .font-display, .font-serif { font-family: var(--font-serif); }` | — | `Playfair Display` |

### 2.2 Forensic Type Hierarchy by Level

| Element Level | Font Family | Size (Mobile → Desktop) | Weight | Line Height | Letter Spacing | Text Transform | Evidence Source |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Page Title (Flagship)** | `Playfair Display` | 24px (`1.5rem`) → 30px (`1.875rem`) | 700 (`font-bold`) | 1.25 (`32px` / `36px`) | `-0.025em` (`tracking-tight`) | None | `OverviewDashboard.jsx` L120, `AdmissionsHub.jsx` L116 |
| **2. Page Title (Legacy)** | `Playfair Display` *(inherited by `h1`)* | 20px (`1.25rem`) | 700 (`font-bold`) | 1.25 (`28px`) | None | None | `StudentsDirectory.jsx` L52, `AttendanceHub.jsx` L166 |
| **3. Eyebrow / Context Tag (Flagship)** | `JetBrains Mono` | 10px (`0.625rem`) | 700 (`font-bold`) | 1.0 (`16px`) | `+0.05em` (`tracking-wider`) | `uppercase` | `OverviewDashboard.jsx` L103, `AdmissionsHub.jsx` L108 |
| **4. Eyebrow (Legacy)** | `JetBrains Mono` | 11px (`0.6875rem`) | 400 (`font-normal`) | 1.0 | `+0.05em` (`tracking-wider`) | `uppercase` | `StudentsDirectory.jsx` L49, `EmployeesDirectory.jsx` L44 |
| **5. Section Heading** | `Playfair Display` | 14px (`0.875rem`) → 16px (`1rem`) | 700 (`font-bold`) | 1.375 (`leading-snug`) | `-0.015em` (`tracking-tight`) | None | `OverviewDashboard.jsx` L206, `Student360View.jsx` L410 |
| **6. Body Text** | `Plus Jakarta Sans` | 12px (`0.75rem`) → 14px (`0.875rem`) | 400 (`font-normal`) | 1.5 (`leading-normal`) | None | None | `index.css` L74, `Card.jsx` L60 |
| **7. Sidebar Group Heading**| `JetBrains Mono` | 10px (`0.625rem`) | 700 (`font-bold`) | 1.0 | `+0.1em` (`tracking-widest`) | `uppercase` | `AppSidebar.jsx` L40 |
| **8. Sidebar Navigation Item**| `Plus Jakarta Sans` | 12px (`0.75rem`) | 600 (active) / 400 (inactive) | 1.25 (`leading-tight`) | None | None | `AppSidebar.jsx` L69 |
| **9. Metadata / Subtitle** | `Plus Jakarta Sans` | 10px (`0.625rem`) | 400 / 500 | 1.25 | None | None | `AppSidebar.jsx` L71, `Card.jsx` L60 |
| **10. KPI Number (Card)** | `Playfair Display` | 20px (`1.25rem`) → 24px (`1.5rem`) | 700 (`font-bold`) | 1.2 | `tabular-nums` | None | `KPICard.jsx` L64 |
| **11. KPI Number (Ribbon)** | Mixed `font-serif` + `font-mono` | 24px (`1.5rem`) → 30px (`1.875rem`) | 700 (`font-bold`) | 1.2 | `tabular-nums` / `-0.025em` | None | `OverviewDashboard.jsx` L350 *(clashing classes)* |
| **12. Table Header** | `JetBrains Mono` | 10px (`0.625rem`) | 700 (`font-bold`) | 1.0 | `+0.05em` (`tracking-wider`) | `uppercase` | `Table.jsx` L31, `Student360View.jsx` L429 |
| **13. Table Body** | `Plus Jakarta Sans` | 12px (`0.75rem`) | 400 (`font-normal`) | 1.5 | None | None | `Table.jsx` L66 |
| **14. Button Label** | `Plus Jakarta Sans` | 12px (`0.75rem`) for sm/md; 14px for lg | 600 (`font-semibold`) | 1.0 | None | None | `Button.jsx` L22–24 |
| **15. Badge Label** | `Plus Jakarta Sans` | 10px (`sm`) / 12px (`md`) | 500 (`font-medium`) | 1.0 | None | None | `Badge.jsx` L18–20 |
| **16. Input Field / Text** | `Plus Jakarta Sans` | 14px (`0.875rem`) | 400 (`font-normal`) | 1.4 | None | None | `FormField.jsx` L71 |
| **17. Mobile Heading** | `Playfair Display` | 20px (`1.25rem`) | 700 (`font-bold`) | 1.3 | `-0.02em` | None | `Student360View.jsx` L224 |

---

## 3. Actual Color System

### 3.1 Hex / RGB Value Inventory

```
CANVAS & SURFACES
├─ App Canvas (Shell):            #FBF8EF  (rgb(251, 248, 239) — Warm Ivory)
├─ Subtle Inset Surface:          #F4EEDC  (rgb(244, 238, 220) — Soft Wheat / Warm Inset)
├─ Elevated Card Canvas:          #FFFFFF  (rgb(255, 255, 255) — Pure White)
├─ Legacy Module Canvas:          #0F172A  (rgb(15, 23, 42)    — Slate 900)
├─ Legacy Inset Card:             #141E33  (rgb(20, 30, 51)    — Dark Slate Navy)
└─ Legacy Alternate Banner:       #131D31  (rgb(19, 29, 49)    — Dark Slate Navy)

SHELL & NAVIGATION
├─ Sidebar Background:            #0B2F29  (rgb(11, 47, 41)   — Vedic Deep Forest Green)
├─ Sidebar Border Right:          rgba(21, 78, 66, 0.7)        — Mid-Forest Hairline
├─ Sidebar Active Nav Item:       #154E42  (rgb(21, 78, 66)   — Mid-Forest)
├─ Sidebar Active Border Marker:  #C49A3A  (rgb(196, 154, 58) — Antique Gold border-l-3)
├─ Sidebar Inactive Nav Item:     rgba(244, 238, 220, 0.8)     — Ivory at 80% opacity
├─ Sidebar Footer / Collapse:     #08221D  (rgb(8, 34, 29)    — Deep Obsidian Forest)
├─ Topbar Background:             #FFFFFF  (rgb(255, 255, 255) — Pure White)
└─ Topbar Hairline Border:        #E6DFD1  (rgb(230, 223, 209) — Hairline Warm Divider)

TYPOGRAPHY & CONTENT
├─ Primary Body / Ink:            #102625  (rgb(16, 38, 37)   — Deep Botanical Slate)
├─ Secondary Text:                #60706B  (rgb(96, 112, 107) — Muted Sage Grey)
├─ Muted / Dim Text:              #7E8D88  (rgb(126, 141, 136)— Subtle Slate Grey)
├─ Inverted Ivory Text:           #FBF8EF  (rgb(251, 248, 239)— Used on Deep Forest CTAs)
└─ Legacy Text:                   #FFFFFF  / #94A3B8 (slate-400) / #64748B (slate-500)

BORDERS & DIVIDERS
├─ Primary Card / Box Border:     #E6DFD1  (rgb(230, 223, 209) — Warm Hairline)
├─ Subtle Inner Divider:          #EFE9DD  (rgb(239, 233, 221) — Very Light Divider)
├─ Inset Gold Border:             rgba(223, 198, 121, 0.6)     — Soft Gold Hairline
└─ Legacy Box Border:             #24324D  (rgb(36, 50, 77)    — Slate Blue Line)

BRAND ACCENTS & SEMANTICS
├─ Antique Gold (Accent):         #C49A3A  (rgb(196, 154, 58) — 4% Primary Brand Accent)
├─ Soft Gold (Text / Badge):      #DFC679  (rgb(223, 198, 121)— High-contrast gold on dark)
├─ Accessible Gold (Light BG):    #8C6B1C  (rgb(140, 107, 28) — WCAG AA compliant text on ivory)
├─ Botanical Sage (Success):      #2D705C  (rgb(45, 112, 92)  — Formative Proficient / Verified)
├─ Learning Lime (Progress):      #87E51F  (rgb(135, 229, 31) — Exemplary stage dot marker)
├─ Coral / Error (Exceptions):    #E35D52  (rgb(227, 93, 82)  — Today's attention urgency)
├─ Vedic Violet (Reflection):     #5D27E8  / #6B4E71           — Pastoral & Dhyana accents
└─ Legacy Non-Conforming:         indigo-600, amber-500, sky-50, emerald-400
```

### 3.2 Approximate Visual Palette Distribution

#### Flagship Screens (Prompt 06):
- **Warm Ivory / Off-White (`#FBF8EF` / `#FFFFFF` / `#F4EEDC`):** ~65%
- **Deep Forest Green (`#0B2F29` / `#154E42`):** ~20%
- **Botanical Sage (`#2D705C`):** ~7%
- **Antique Gold (`#C49A3A` / `#DFC679` / `#8C6B1C`):** ~4%
- **Semantic Accents (Coral `#E35D52`, Lime `#87E51F`, Violet `#6B4E71`):** ~4%

#### Legacy Operational Screens:
- **Dark Slate Navy / Black (`#0F172A` / `#131D31` / `#141E33`):** ~75%
- **Slate Text & Muted Borders (`slate-400`, `#24324D`):** ~15%
- **Neon Terminal Accents (`emerald-400`, `amber-400`, `indigo-400`):** ~10%

---

## 4. Spacing & Geometry

### 4.1 Spacing Scale & Physical Dimensions

| Layout Dimension | Measured CSS Value | Pixel Equivalent | Implementation Source |
| :--- | :--- | :--- | :--- |
| **Sidebar Width (Desktop)** | `w-64` | `256px` | `AppSidebar.jsx` L30 |
| **Sidebar Width (Collapsed)**| `w-16` | `64px` | `AppSidebar.jsx` L30 |
| **Topbar Height** | `h-16` | `64px` | `AppTopbar.jsx` L42 |
| **Global Page Padding** | `p-3.5 sm:p-6 lg:p-8` | `14px` → `24px` → `32px` | `AppShell.jsx` L74 |
| **Max Content Canvas Width** | `max-w-7xl` | `1280px` centered | `AppShell.jsx` L74 |
| **Card Normal Padding** | `p-5 sm:p-6` | `20px` → `24px` | `Card.jsx` L76 |
| **Card Compact Padding** | `p-3 sm:p-4` | `12px` → `16px` | `Card.jsx` L75 |
| **Attention Item Grid Gap** | `gap-3.5` | `14px` | `OverviewDashboard.jsx` L245 |
| **KPI Ribbon Cell Padding** | `p-4 sm:p-5` | `16px` → `20px` | `OverviewDashboard.jsx` L341 |
| **Table Cell Padding** | `px-4 py-3` | `16px` horiz, `12px` vert | `Table.jsx` L66 |
| **Button Height (sm / md / lg)**| `h-8` / `h-9` / `h-11` | `32px` / `36px` / `44px` | `Button.jsx` L22–24 |
| **Input Height** | `py-2` + font line-height | ~`38px` | `FormField.jsx` L75 |
| **Mobile Bottom Nav Height** | `px-3 py-2` | ~`56px` fixed | `MobileNav.jsx` L70 |

### 4.2 Geometry & Shape Language

- **Primary Container Radius:** `rounded-2xl` (`16px`). Used uniformly across `Card`, `Table` wrappers, `KPICard`, `Modal`, `Drawer`, `OverviewDashboard` action centers, and `Student360` identity ribbons.
- **Secondary Interactive Radius:** `rounded-xl` (`12px`). Used for search boxes, navigation items, buttons (`lg`), and attention cards.
- **Tertiary Interactive Radius:** `rounded-lg` (`8px`). Used for standard buttons (`sm`/`md`), icon boxes, and segmented control tabs.
- **Pill Geometry:** `rounded-full` (`9999px`). Used for status badges, stage indicators, filter pills, and avatars.
- **Border Thickness:** Strict `1px` hairlines (`border`). No 2px or 3px container borders, except the active sidebar item indicator which uses `border-l-3` (`3px` accent strip).
- **Shadow Profiles:**
  - `shadow-2xs` (`0 1px rgb(0 0 0 / 0.05)`) on standard cards and tables.
  - `shadow-xs` on raised / hovered interactive cards.
  - `shadow-xl` / `shadow-2xl` on modals and notifications.

---

## 5. Sidebar Forensic

### 5.1 Structure & Layout
- **Fixed Position:** Desktop uses `sticky top-16 h-[calc(100vh-64px)] z-20`. Mobile uses fixed slide-out drawer (`-left-64` to `left-0`, `z-40`).
- **Width:** `256px` (`w-64`) when open; `64px` (`w-16`) when collapsed.
- **Background:** Deep Forest Green (`#0B2F29`).
- **Right Border:** Hairline `#154E42/70` (`rgba(21, 78, 66, 0.7)`).
- **Brand Absence:** The school logo is **not** in the sidebar. It is housed in the Topbar, leaving the sidebar entirely dedicated to navigation hierarchy.

### 5.2 Navigation Item Presentation
- **Group Headings:** `text-[10px] font-bold tracking-widest text-[#DFC679]/90 uppercase font-mono px-3 mb-2`. Bracketed source tags (`[SOURCE]`, `[ENABLER]`, `[PROPOSED]`) are stripped via regex (`cleanGroupTitle`) so the UI renders clean titles (`EXECUTIVE VISIBILITY`, `CURRICULUM & ADMISSIONS`).
- **Active State:** Solid Mid-Forest pill (`bg-[#154E42]`), white text (`text-white`), font-semibold, with an Antique Gold left-accent border (`border-l-3 border-[#C49A3A]`). Icon shifts to soft gold (`text-[#DFC679]`).
- **Hover State:** Soft subtle tint (`hover:bg-[#154E42]/40 hover:text-white`).
- **Inactive State:** Cream/Ivory text at 80% opacity (`text-[#F4EEDC]/80`), icon at 60% opacity (`text-[#F4EEDC]/60`).
- **Secondary Descriptions:** Small 10px muted subtitle (`text-[10px] text-[#F4EEDC]/60 truncate mt-0.5`).
- **Badge Suppression:** Raw technical codes (`M-01`, `M-02`, etc.) are suppressed in `AppSidebar.jsx` (L49: `!item.badge.startsWith('M-')`), while semantic badges (`Live`, `v2.0`, `24`) render as subdued pills (`bg-[#154E42]/60`).

### 5.3 Collapse & Mobile Behavior
- **Collapse Mode:** Items condense to `justify-center px-0`, labels and subtitles hide, displaying only centered icons with native browser tooltips (`title={item.label}`).
- **Footer Bar:** `hidden md:flex p-3 border-t border-[#154E42]/70 items-center justify-between bg-[#08221D]`. Displays current role in gold monospace and a toggle icon (`ChevronLeft` / `ChevronRight`).
- **Mobile Drawer:** Triggered by topbar hamburger button. Dark backdrop blur `bg-slate-900/60 backdrop-blur-sm`.

---

## 6. Topbar Forensic

### 6.1 Layout & Visual Anchors
- **Height & Canvas:** Fixed `64px` (`h-16`), pure white background (`bg-white`), hairline warm border (`border-b border-[#E6DFD1]`), subtle elevation `shadow-2xs`.
- **Brand Treatment (Left):**
  - Monogram Box: `36×36px` (`w-9 h-9`) rounded-xl Deep Forest (`#0B2F29`) with gold hairline border (`border-[#C49A3A]/40`) and gold bold text `"VT"`.
  - Brand Heading (visible `xl:block`): `"VEDIC TREE OS"` in `Playfair Display` serif with small gold monospace `"ENTERPRISE"` tag and tagline `"Indian wisdom. Modern learning."` in 10px muted slate.
- **Sovereign Scope Selector:**
  - Visual Container: Rounded-xl button in Warm Ivory (`bg-[#FBF8EF] hover:bg-[#F4EEDC] border border-[#E6DFD1]`).
  - Icon: Sage green building icon (`text-[#2D705C]`).
  - Content: Two lines of text. Line 1: Active campus name (`Pune Baner Campus` or `All Campuses`), Line 2: Universal HQ or School Name (`Vedic Tree`). Truncates responsibly at `130px` (mobile), `200px` (tablet), `260px` (desktop).
  - Trailing Chevron: Subtle arrow indicating interactive modal trigger.

### 6.2 Global Controls (Center & Right)
- **Universal Command Search (Center):**
  - Input-style button (`hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#FBF8EF] border border-[#E6DFD1]`).
  - Placeholder: `"Search students, staff, actions..."`.
  - Keyboard Shortcut: `<kbd className="text-[10px] font-mono bg-[#F4EEDC] border border-[#E6DFD1]">⌘K</kbd>`.
- **Notifications Button:** Rounded-xl Warm Ivory icon button with active red counter pill (`#E35D52` with white text).
- **Persona Context Switcher (Right):**
  - Displays user avatar initials, user first name, and role code in gold monospace (`font-mono text-[#8C6B1C] font-bold`).
  - Dropdown menu allows 1-click persona switching (HQ Admin, Principal, Teacher, Parent, Student) for immediate role validation.

---

## 7. Component Language

### 7.1 Refactored Components (Warm Editorial System)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Card (Card.jsx)                                                        │
│ • Container: rounded-2xl bg-white border border-[#E6DFD1] shadow-2xs   │
│ • Header: px-5 py-4 border-b border-[#EFE9DD] bg-[#FBF8EF]/50          │
│ • Title: font-serif font-bold text-[#102625] text-sm/base              │
│ • Icon Box: 32×32px rounded-lg bg-[#F4EEDC] border-[#DFC679]/60        │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ KPICard (KPICard.jsx)                                                  │
│ • Container: rounded-2xl bg-white border border-[#E6DFD1] p-5 shadow-2xs│
│ • Eyebrow: text-[10px] font-mono uppercase tracking-wider text-[#60706B]│
│ • Value: font-serif font-bold text-xl/2xl text-[#0B2F29] tabular-nums   │
│ • Trend: inline pill text-[#2D705C] bg-[#2D705C]/10                    │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ Table (Table.jsx)                                                      │
│ • Container: rounded-2xl bg-white border border-[#E6DFD1] overflow-x   │
│ • Header Row: border-b border-[#E6DFD1] bg-[#FBF8EF]                   │
│ • Column Header: text-[10px] font-mono font-bold uppercase #60706B     │
│ • Data Row: divide-y divide-[#EFE9DD] hover:bg-[#FBF8EF]/45            │
│ • Numeric Cells: font-mono tabular-nums text-right                     │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ Button (Button.jsx)                                                    │
│ • Primary: bg-[#0B2F29] hover:bg-[#154E42] text-[#FBF8EF] border       │
│ • Secondary: bg-[#FBF8EF] hover:bg-[#EFE9DD] text-[#102625] border-warm│
│ • Focus Ring: ring-2 ring-[#0B2F29] ring-offset-[#FBF8EF]              │
│ • Sizes: sm (h-8, rounded-lg), md (h-9, rounded-lg), lg (h-11, r-xl)   │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ Badge (Badge.jsx)                                                      │
│ • Geometry: rounded-full inline-flex items-center select-none          │
│ • Default: bg-[#EFE9DD] text-[#60706B] border border-[#E6DFD1]         │
│ • Accent / Gold: bg-[#F4EEDC] text-[#8C6B1C] border-[#DFC679]/60       │
│ • Success / Sage: bg-[#2D705C]/15 text-[#2D705C] border-[#2D705C]/30   │
│ • Danger / Coral: bg-[#E35D52]/10 text-[#E35D52] border-[#E35D52]/25   │
└────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Un-Refactored Components (Generic Tailwind Slate System)

```
┌────────────────────────────────────────────────────────────────────────┐
│ FormField & TextInput (FormField.jsx)                                  │
│ • Label: text-xs font-semibold uppercase text-slate-700 dark:slate-300  │
│ • Input: rounded-lg bg-white dark:bg-slate-900 border-slate-300        │
│ • Focus: focus:border-[#0F4C35] focus:ring-[#0F4C35]                   │
│ • Status: INCONSISTENT with Warm Ivory design system.                  │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ EmptyState (EmptyState.jsx)                                            │
│ • Container: border-2 border-dashed border-slate-200 dark:slate-800    │
│ • Background: bg-slate-50/50 dark:bg-slate-900/30 p-8 sm:p-12          │
│ • Icon: 48×48px bg-slate-100 text-slate-400                           │
│ • Status: Generic CRUD template empty box.                             │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ Modal & Drawer (Modal.jsx, Drawer.jsx)                                 │
│ • Overlay: bg-slate-900/60 backdrop-blur-sm fixed inset-0              │
│ • Dialog Box: rounded-2xl bg-white dark:bg-slate-900 border-slate-200  │
│ • Footer: bg-slate-50 dark:bg-slate-800/40                             │
│ • Status: Generic Tailwind dark-mode dialog box.                       │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ Alert (Alert.jsx)                                                      │
│ • Variants: bg-sky-50 / bg-emerald-50 / bg-amber-50 / bg-rose-50       │
│ • Status: Standard Bootstrap/Tailwind alert boxes.                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Page Composition

### 8.1 Executive / Network Overview (`OverviewDashboard.jsx`)
- **Visual Rhythm:** Top Header → Operational Hero → Continuous 6-Column Pulse → Dual Split Panels (Funnel vs Health) → Activity Ledger → Legal Separation Footnote.
- **Hero Treatment:** The page opens with an actionable exception center: `"TODAY — 4 THINGS NEED YOUR ATTENTION"` (`OverviewDashboard.jsx` L206). Each exception card pairs a priority tag, issue headline, context description, responsible role, and action CTA button.
- **Metric Presentation:** 6 discrete KPI boxes were collapsed into a single unified continuous strip (`OverviewDashboard.jsx` L336) with hairline column dividers (`divide-x divide-[#EFE9DD]`).
- **Data Density:** High, but organized into distinct visual tiers.
- **Aesthetic Feel:** Highly editorial, calm, and institutional.

### 8.2 Student 360 (`Student360View.jsx`)
- **Visual Rhythm:** Back Navigation & View Indicator → Student Monogram Ribbon → Continuous 4-Cell Vital Signs Strip → Role-Filtered Perspective Tabs → Tab Content (Developmental Continuum) → Evidence Drawer → Non-Clinical Safeguarding Disclaimer.
- **Identity Presentation:** Monogram box `KD` in `#0B2F29` with gold border, student name in 24px *Playfair Display*, placement subtitle (`Grade 7-A`), DOB, and formative observation counter.
- **Vital Signs Strip:** 4-cell continuous grid: Attendance percentage (96.7%), Exam score (A1 93.3%), School fees status (₹0 Due, or redacted for teachers), Emergency contact.
- **Developmental Continuum:** No radar charts, polar plots, or benchmark polygons. Consists of a clean table with 4 cardinal rows (Character, Academics, Agency, Mindfulness). Each row displays an orientation badge, qualitative stage pill, verified evidence count, last observed date, educator next step, and an interactive **horizontal 4-point progression line** (*Emerging ───── Developing ───── Proficient ───── Exemplary*) with active dot marker.
- **Aesthetic Feel:** Prestigious, humane, evidence-based, whole-learner presentation.

### 8.3 Admissions Hub (`AdmissionsHub.jsx`)
- **Visual Rhythm:** Header Banner → 4-Cell Funnel Ribbon → Perspective Tabs → 10-Stage Kanban Pipeline → Pluggable WhatsApp Console.
- **Kanban Board:** 10 continuous columns representing the candidate journey (Lead → Enquiry → Counselling → Visit → Application → Assessment → Offer → Admission → Fee → Student).
- **Communication Console:** Dedicated panel proving provider-agnostic WhatsApp dispatch with live provider switcher (Gupshup, Karix, Twilio, Meta, Mock).
- **Aesthetic Feel:** Operational yet restrained; avoids sales-dashboard neon colors.

### 8.4 Academics Hub & Teacher My Day (`AcademicsHub.jsx`, `TeacherMyDay.jsx`)
- **Visual Rhythm:** Institutional Header → Remembered Context Selector (Grade/Sec/Subject) → Day Picker Ribbon (Mon–Fri) → 3-Metric Daily Pulse → Period-by-Period Schedule Timeline → Active Lesson Plan Cards → Priority Grading Queue.
- **Aesthetic Feel:** Highly organized academic schedule; calm ivory surfaces with dark forest action buttons.

### 8.5 Legacy Operational Screens (`StudentsDirectory.jsx`, `AttendanceHub.jsx`, `FinanceHub.jsx`, etc.)
- **Visual Rhythm:** Giant Dark Slate Banner (`bg-[#0F172A]`) → 4 Generic Dark Stat Cards (`bg-[#141E33]`) → Raw Table with Dark Headers (`bg-slate-900/80`).
- **Aesthetic Feel:** Standard open-source developer dashboard; stark contrast with the warm ivory shell.

---

## 9. Responsive Visual Model

| Breakpoint | Sidebar Behavior | Topbar Behavior | Content Layout | Data Tables & Grids |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop (1440 × 900)** | Full `256px` expanded sticky sidebar with labels and subtitles. | Full brand text, full enterprise badge, full search box (`320px`), full scope selector. | Max width `1280px` (`max-w-7xl`), `32px` page padding (`lg:px-8`). | 6-column KPI ribbon, 3-column attention cards, 10-column admissions Kanban with smooth scroll. |
| **Laptop (1280 × 800)** | Full `256px` sidebar. | Brand title text hides (`hidden xl:block`), brand monogram remains. Search box narrows to `256px`. | Max width `1280px`, `24px` page padding (`sm:px-6`). | 6-column KPI ribbon breaks into 3×2 grid (`md:grid-cols-3`). Attention items break into 2 columns. |
| **Tablet (1024 × 768)** | `256px` sidebar (collapsible to `64px` icon rail via toggle). | Search box remains; scope selector text truncates at `200px`. | `24px` page padding. | Student 360 vital signs strip breaks into 2×2 grid (`md:grid-cols-4` → 2 columns). |
| **Mobile (390 × 844)** | **Hidden completely** off-screen (`-left-64`). Accessible via slide-out drawer with backdrop blur. | Brand text and search bar hidden. Scope selector truncates at `130px`. Hamburger button active. | `14px` page padding (`px-3.5`). Bottom padded `80px` (`pb-20`) for bottom nav. | **Fixed Bottom Navigation Bar active (`MobileNav.jsx`).** Attention items stack into 1 column. KPI ribbon stacks into 2 columns. Tables scroll horizontally (`overflow-x-auto`). |

---

## 10. Iconography

- **Library:** `lucide-react` (version `^1.49.0`).
- **Style:** Uniform geometric outline icons with clean 2px strokes (`stroke-width: 2`).
- **Color Mapping:**
  - Active navigation & primary gold markers: `#C49A3A` / `#DFC679`.
  - Verified / Success / Sage indicators: `#2D705C`.
  - Alert / Urgency icons: `#E35D52`.
  - Inactive / Secondary icons: `#60706B` (ivory canvas) or `#F4EEDC/60` (sidebar).
- **Scale:**
  - Micro-actions / table headers: `14×14px` (`w-3.5 h-3.5`).
  - Standard buttons / nav items: `16×16px` (`w-4 h-4`).
  - Hero section status icons: `16×16px` to `20×20px` (`w-4 h-4` / `w-5 h-5`).
  - Empty state icons: `24×24px` (`w-6 h-6`).
- **Coherence Assessment:** Highly uniform in weight and line style. In flagship screens, icons serve purely as orienting anchors. In legacy screens, decorative icons remain overused across every table column and stat box.

---

## 11. Visual Personality

Based strictly on the codebase implementation, the current visual personality can be described by the following **10 precise adjectives**:

1. **Bifurcated:** The application is split between two conflicting visual worlds — an editorial warm ivory identity on the shell and flagship screens, and a developer dark-slate identity on the remaining screens.
2. **Institutional:** Deep Forest Green (`#0B2F29`) and Antique Gold (`#C49A3A`) anchors convey formal enterprise and educational governance rather than consumer software.
3. **Editorial (Flagship):** *Playfair Display* serif titles, hairline dividers (`#E6DFD1`), and Warm Ivory canvas (`#FBF8EF`) evoke the feel of a published institutional report.
4. **Developer-Centric (Legacy):** Question-style debugging headers (`"WHERE AM I?"`), raw terminal greens (`emerald-400`), and dark slate containers (`#0F172A`) reflect early engineering prototype scaffolding.
5. **Over-Rounded:** Almost every card, modal, and table wrapper defaults to `rounded-2xl` (16px), creating a soft bubble geometry that slightly undermines the crisp hairline borders and serif typography.
6. **Restrained (Flagship Palette):** Saturated rainbow colors have been purged in favor of muted sage (`#2D705C`), soft gold (`#DFC679`), and deep forest green (`#0B2F29`).
7. **Dense:** High information throughput with 10-stage admissions pipelines, detailed curriculum schedules, and comprehensive student dossiers.
8. **Calm (Flagship):** Flashy animations, bouncy transitions, and polar/radar charts are absent, creating a quiet, non-distracting work environment.
9. **Role-Aware:** The topbar, sidebar, and mobile shell adjust their navigation and perspective based on role permissions (HQ Admin, Principal, Teacher, Parent, Student).
10. **Unreconciled:** The underlying design token file (`tokens.js`) has not been updated to reflect the active CSS design system (`index.css`).

---

## 12. Generic vs Distinctive Analysis

### 12.1 Aspects that Look Generic SaaS / Template-Like
1. **The Legacy Operational Screens (`StudentsDirectory`, `AttendanceHub`, `FinanceHub`, etc.):** Hardcoded `#0F172A` black backgrounds with standard Tailwind slate borders and neon green badges look like a template CRUD admin panel.
2. **Dashed-Border Empty State:** `EmptyState.jsx` renders a standard `border-2 border-dashed border-slate-200` box with generic text (*"No records found"*).
3. **Tailwind Default Form Fields:** `FormField.jsx` and `TextInput` still use `border-slate-300`, `dark:bg-slate-900`, and `focus:ring-[#0F4C35]`.
4. **Generic Tailwind Dialogs:** `Modal.jsx` and `Drawer.jsx` use generic dark slate containers and heavy `shadow-2xl` drop shadows.
5. **Repetitive `rounded-2xl` Radius:** Ubiquitous 16px border-radius on every element creates a cookie-cutter SaaS template geometry.

### 12.2 Aspects that are Genuinely Distinctive to VEDIC TREE OS
1. **Bespoke Color Signature (Deep Forest + Warm Ivory + Antique Gold):** Avoids standard "SaaS Blue" or "Stripe Purple" entirely; creates an authentic, prestigious Indian educational identity without being ornamental.
2. **Linear Developmental Continuum:** Replaces polar radar charts and composite benchmark scoring with a qualitative 4-point progression matrix (*Emerging ───── Developing ───── Proficient ───── Exemplary*) backed by formative evidence and educator scaffolding steps.
3. **Continuous Analytical Ribbons:** Fusing isolated KPI cards into unified horizontal strips with hairline dividers eliminates visual card clutter.
4. **Operational "Today's Attention" Center:** Focuses executive and campus leaders on actionable exceptions coupled to responsible roles, rather than decorative metrics.
5. **Sovereign Scope Architecture:** The persistent Topbar Scope Selector with multi-level hierarchical switching (universal network, school, and campus) seamlessly reflects multi-campus operational reality.

---

## 13. Design System Consistency Audit

| Subsystem Component | Consistency Rating | Forensic Evidence / Discrepancy |
| :--- | :--- | :--- |
| **`tokens.js` vs `index.css`** | **INCONSISTENT** | `tokens.js` declares `Inter`, green 900 (`#0F4C35`), and slate neutrals. `index.css` declares `Playfair Display`, `Plus Jakarta Sans`, Deep Forest (`#0B2F29`), Warm Ivory (`#FBF8EF`), and Antique Gold (`#C49A3A`). |
| **Shell vs Flagship Screens** | **CONSISTENT** | `AppShell`, `AppSidebar`, `AppTopbar`, `OverviewDashboard`, `Student360View`, `AdmissionsHub`, and `AcademicsHub` all share `#FBF8EF`, `#E6DFD1`, `#0B2F29`, and `Playfair Display`. |
| **Flagship vs Operational Screens** | **INCONSISTENT** | `StudentsDirectory`, `EmployeesDirectory`, `AttendanceHub`, `FinanceHub`, `OperationsHub`, `RbacMatrixView`, and `AuditLogsView` use dark slate (`#0F172A`), neon greens, and dark tables. |
| **Shared Primitives: Surfaces** | **INCONSISTENT** | `Card.jsx`, `KPICard.jsx`, and `Table.jsx` use warm ivory and hairline tokens. `Modal.jsx` and `Drawer.jsx` use dark slate and Tailwind gray tokens. |
| **Shared Primitives: Inputs & Forms**| **INCONSISTENT** | `FormField.jsx`, `TextInput`, and `SearchInput` use standard Tailwind `slate-300` / `dark:slate-900` rather than the warm ivory system. |
| **Shared Primitives: Feedback** | **INCONSISTENT** | `Alert.jsx` uses Tailwind `sky-50`, `emerald-50`, `amber-50`, `rose-50`. `EmptyState.jsx` uses dashed slate borders. |
| **Typography Element Mapping** | **INCONSISTENT** | `index.css` maps all `h1, h2, h3` to `font-serif`. Consequently, un-refactored dark slate module headings (`<h1>Student Information System</h1>`) render in classical serif font on dark terminal backgrounds. |
| **KPI Numeric Styling** | **INCONSISTENT** | In `OverviewDashboard.jsx` L350, ribbon numbers have both `font-serif` and `font-mono` on the same class list (`font-serif font-bold text-[#0B2F29] font-mono tabular-nums`). |
| **Responsive Shell System** | **CONSISTENT** | Breakpoint adaptations at 1440px, 1280px, 1024px, and 390px operate uniformly across the shell with dedicated mobile navigation (`MobileNav.jsx`). |

---

## 14. Current Strengths

1. **Prestigious Brand Palette in Flagship Screens:** The combination of Deep Forest (`#0B2F29`), Warm Ivory (`#FBF8EF`), and Antique Gold (`#C49A3A`) gives the shell and key views an elevated, calm, and distinctive educational presence.
2. **Pedagogically Sound Student 360:** The Linear Developmental Continuum successfully eliminates harmful benchmark polygons, radar scoring, and composite rankings, replacing them with evidence-based formative progression lines and scaffolding steps.
3. **Unified Continuous Metric Ribbons:** The replacement of disconnected KPI cards with fused analytical strips (in Overview, Student 360, Admissions, and Teacher My Day) establishes a quiet, cohesive visual rhythm.
4. **Action-Coupled Operational Hero:** The "Today's Attention" center organizes real operational exceptions by urgency, context, and responsible role with direct action buttons.
5. **Robust Responsive Shell & Mobile Architecture:** The application adapts intelligently from a 1440px multi-column layout down to a 390px mobile viewport with an automatic bottom navigation bar (`MobileNav.jsx`) tailored to user roles.

---

## 15. Current Weaknesses

1. **Severe Visual Bipolarity:** Navigating from the warm ivory flagship pages to operational screens (Students Directory, Attendance, Finance, Operations, RBAC, Audit) causes a sudden, jarring shift to an inky-black, developer-style admin panel.
2. **Un-Refactored Input and Form Primitives:** Form fields, text inputs, selects, modals, drawers, alerts, and empty states still use standard Tailwind slate classes (`slate-300`, `dark:bg-slate-900`, dashed borders).
3. **Decoupled Design Tokens File:** `tokens.js` was never updated to match `index.css` and `index.html`, leaving two conflicting token declarations in the project.
4. **Global Heading Serif Bleed:** Globally styling all `h1, h2, h3` elements with `font-serif` in `index.css` causes un-refactored technical modules (RBAC matrix, Audit log, HRMS directory) to display classical serif headings inside dark slate terminal boxes.
5. **Overuse of `rounded-2xl` Geometry:** The repetitive application of 16px corner radius across nearly all surfaces, cards, and tables creates a generic SaaS template feel that softens what could otherwise be a sharp, editorial layout.

---

## 16. Unknowns / Requires Browser Verification

1. **Font Download Latency on Slow Connections:** Because `Playfair Display` and `Plus Jakarta Sans` are fetched via external Google Fonts CDN links in `index.html`, the system exhibits a brief Flash of Unstyled Text (FOUT) on slow networks before falling back to Georgia/Inter.
2. **Horizontal Table Scroll Indicator on Mobile:** While data tables in `Table.jsx` and `AdmissionsHub.jsx` are wrapped in `overflow-x-auto`, there are no subtle gradient fades or scroll hints indicating horizontal scrollability on touch devices.
3. **High-DPI Font Contrast on Secondary Labels:** Muted label text using `#60706B` on `#FBF8EF` Warm Ivory background has a contrast ratio of ~4.8:1 (exceeding WCAG AA 4.5:1), but at smaller sizes (`10px` font-mono) it may be difficult to read on lower-resolution screens.

---

## 17. Evidence / Source Files Inspected

1. `package.json` — Tailwind v4, React 19, Lucide React dependencies.
2. `index.html` — Google Fonts preconnect and font stylesheet imports.
3. `src/index.css` — Root CSS custom properties, global font-family rules, custom scrollbars, institutional badges.
4. `src/design-system/tokens.js` — Original design token declarations.
5. `src/design-system/layout/Card.jsx` — 3-level card hierarchy, elevation classes, padding tokens.
6. `src/design-system/data/KPICard.jsx` — KPI card structure, tabular numerals, trend indicators.
7. `src/design-system/data/Table.jsx` — Table container, header styling, row dividers, empty messages.
8. `src/design-system/actions/Button.jsx` — Button variants (primary, secondary, outline, ghost, danger, saffron), sizes, focus rings.
9. `src/design-system/foundations/Badge.jsx` — Badge variants, dot markers, trend indicators.
10. `src/design-system/input/FormField.jsx` — FormField wrapper and TextInput input styling.
11. `src/design-system/input/SearchInput.jsx` — SearchInput and Select input styling.
12. `src/design-system/feedback/Alert.jsx` — Alert container variants and iconography.
13. `src/design-system/feedback/EmptyState.jsx` — Dashed empty state box, loading spinners, skeleton pulses.
14. `src/design-system/layout/Modal.jsx` — Modal dialog and Drawer slide-out containers.
15. `src/design-system/foundations/Avatar.jsx` — Avatar initials monogram and size mapping.
16. `src/design-system/foundations/Typography.jsx` — Heading, Text, and NumericText components.
17. `src/design-system/people/PersonRow.jsx` — PersonRow and StudentAvatar components.
18. `src/components/shell/AppShell.jsx` — AppShell composition, toast banners, modal controllers.
19. `src/components/shell/AppSidebar.jsx` — Sidebar container, active item styling, badge suppression, collapse mechanics.
20. `src/components/shell/AppTopbar.jsx` — Topbar layout, brand mark, scope selector, search bar, notifications, persona switcher.
21. `src/components/shell/MobileNav.jsx` — Role-specific fixed bottom navigation bar.
22. `src/components/shell/navConfig.js` — Role navigation matrices and capability classification tags.
23. `src/components/overview/OverviewDashboard.jsx` — Network and Centre Overview views, attention hero, 6-column pulse ribbon.
24. `src/components/sis/Student360View.jsx` — Student 360 profile, vital signs strip, Linear Developmental Continuum matrix table.
25. `src/components/sis/StudentsDirectory.jsx` — Un-refactored student directory.
26. `src/components/hrms/EmployeesDirectory.jsx` — Un-refactored employee directory.
27. `src/components/attendance/AttendanceHub.jsx` — Un-refactored attendance hub.
28. `src/components/admissions/AdmissionsHub.jsx` — Refactored admissions hub, 10-stage Kanban, WhatsApp gateway console.
29. `src/components/academics/AcademicsHub.jsx` — Refactored academics hub.
30. `src/components/academics/TeacherMyDay.jsx` — Refactored teacher daily workspace, day-picker, 3-metric ribbon, timetable rows.
31. `src/components/finance/FinanceHub.jsx` — Un-refactored finance hub.
32. `src/components/operations/OperationsHub.jsx` — Un-refactored operations hub.
33. `src/components/platform/RbacMatrixView.jsx` — Un-refactored RBAC matrix.
34. `src/components/platform/AuditLogsView.jsx` — Un-refactored audit trail.
35. `src/components/platform/TenantHierarchyView.jsx` — Un-refactored multi-tenant topology view.
36. `src/components/communication/CommunicationHub.jsx` — Un-refactored communication center.
37. `src/App.jsx` — Main application routing, session resolution, modal orchestration.
38. `tests/overview.test.js`, `tests/student-360.test.js`, `tests/shell.test.js`, etc. — Complete 249-test suite.
