# VEDIC TREE OS: Enterprise Design System

> **Source Authority Order:**  
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

> **"Serious enough to run an education network. Human enough to put the child at the centre."**

This document specifies the design philosophy, design tokens, component architecture, and accessibility standards for the **VEDIC TREE OS** enterprise application suite.

---

## 1. Design Philosophy: Minimalist Analytical Control Room

VEDIC TREE OS rejects the visual clutter, heavy card borders, and generic layouts of legacy school ERPs. It draws design discipline from modern minimalist analytical operating surfaces (**Linear, Stripe, Notion**) while honoring its distinct Vedic Tree educational identity:

> **Design Directive (Prompt 04.1 Reference Aesthetic):**  
> The client has provided a Dribbble school-dashboard reference as visual inspiration. Use it only as inspiration for minimalist composition, information density, analytical visualisation, spacing, typography, hierarchy and dashboard polish. Do not copy its layout, branding, content, terminology, components or proprietary visual details. Do not remove or alter any Vedic Tree OS business content, metrics, governance, source classifications, workflows or financial/safeguarding boundaries merely to resemble the reference.

1. **Simple Visual Language + Rich Information Density**: A sophisticated executive operating surface where a large amount of school data feels effortless to understand.
2. **Minimalist Analytical Composition**: Restrained borders, generous whitespace, unified surface rhythm, and crisp typographic contrast instead of nested, card-heavy ERP boxes.
3. **Clarity Over Decoration**: Every surface, metric, and button must communicate purpose. No decorative or non-actionable dashboard widgets.
4. **Information Hierarchy**: Answer immediately: *Where am I? What matters? What changed? What needs attention? What can I do next?*
5. **Child-Centric Architecture**: The core unit of value is the holistic growth of the child (**Development Compass**), not merely invoices or timestamps.
6. **Data with Context**: Present metrics as an actionable sequence: **Metric $\rightarrow$ Interpretation $\rightarrow$ Next Best Action**.
7. **Progressive Disclosure**: Clear drill-down from executive summary $\rightarrow$ operational detail without cognitive overload.
8. **India-First, Globally Scalable**: Native formatting for INR (₹ Lakhs & Crores), Indian telephone standards, UPI payment workflows, and WhatsApp communication, built on internationalized abstractions.
9. **Accessibility (WCAG 2.2 AA)**: High contrast, keyboard focus indicators, screen reader accessibility, and semantic HTML structure.

---

## 2. Design Tokens

### 2.1 Color Architecture

| Token Name | Hex Code | Semantic Role |
| :--- | :--- | :--- |
| `brand-900` (`--vt-green`) | `#0F4C35` | Primary executive green (stability, growth, institutional trust) |
| `brand-800` (`--vt-green-light`) | `#16654A` | Interactive hover & active state for primary actions |
| `accent-600` (`--vt-saffron`) | `#D97706` | Vedic Heritage saffron-gold accent (character, values, highlights) |
| `slate-950` (`--bg-canvas-dark`) | `#090D16` | Enterprise night mode canvas |
| `slate-50` (`--color-bg-canvas`) | `#F8FAF8` | Executive daylight canvas (calm sandstone tone) |
| `slate-900` (`--color-text-primary`) | `#0F172A` | Deep charcoal ink for primary typography |
| `slate-500` (`--color-text-muted`) | `#64748B` | Secondary captions, timestamps, and metadata |
| `semantic-success` | `#15803D` | Active status, positive attendance, admissions confirmed |
| `semantic-warning` | `#B45309` | SLA alerts, pending fees, verification queues |
| `semantic-danger` | `#B91C1C` | Safeguarding incidents, overdue fees, compliance expirations |
| `semantic-extension` | `#7E22CE` | Optional future extension indicators [PROPOSED] |

### 2.2 Typography Scale

- **Display**: `text-3xl sm:text-4xl font-bold tracking-tight` (Hero statements & network headlines)
- **H1 (Page Title)**: `text-2xl sm:text-3xl font-bold tracking-tight`
- **H2 (Section Title)**: `text-xl sm:text-2xl font-semibold tracking-tight`
- **H3 (Card Title)**: `text-lg sm:text-xl font-semibold`
- **Body**: `text-sm sm:text-base leading-normal`
- **Body-Small / Caption**: `text-xs sm:text-sm text-slate-500`
- **Numeric Typography**: `tabular-nums font-bold tracking-tight` (Ensures numerical columns and currency stay aligned)

---

## 3. Signature VEDIC TREE Components

### 3.1 The Development Compass (`DevelopmentCompass.jsx`)
Unlike typical ERPs that record only test marks, the **Vedic Tree Development Compass** visualizes the 4-quadrant holistic progress of a student:
- **Academics** (Intellectual mastery, curiosity, problem solving)
- **Character & Values** (Integrity, humility, seva, ethical leadership)
- **Wellbeing** (Physical vigor, daily yoga, meditation, emotional resilience)
- **Life Skills** (Collaboration, communication, agency, financial literacy)

*Usage:*
```jsx
import { DevelopmentCompass } from '@/design-system';

<DevelopmentCompass
  studentName="Aarav Sharma"
  data={{
    academics: { score: 88, trend: '+4%', level: 'Proficient', skills: [...] },
    character: { score: 94, trend: '+6%', level: 'Exemplary', skills: [...] },
    wellbeing: { score: 91, trend: '+2%', level: 'Strong', skills: [...] },
    lifeSkills: { score: 85, trend: '+5%', level: 'Developing', skills: [...] }
  }}
  onQuadrantClick={(quadrant) => openObservationPortfolio(quadrant)}
/>
```

---

### 3.2 Next Best Action (`NextBestAction.jsx`)
Replaces passive dashboards with proactive operational intelligence. Every priority role (HQ, Principal, Teacher, Parent) is presented with contextual directives:
- **Priority**: Urgent / High / Medium / Info
- **Context**: Entity / Campus / Department
- **Action Title**: What must be done
- **Reason & Impact**: Why this matters and operational ROI
- **Direct CTA Button**: One-click execution

*Usage:*
```jsx
import { NextBestAction } from '@/design-system';

<NextBestAction
  priority="urgent"
  context="Admissions Pipeline • Baner Campus"
  actionTitle="27 enquiries have not received follow-up within 24 hours"
  reason="Historical conversion drops 48% when initial outreach exceeds 24h SLA."
  impactMetric="+₹14.2 L Projected Admissions Value"
  ctaText="Dispatch WhatsApp Nudge"
  onAction={handleDispatchNudge}
/>
```

---

### 3.3 Network Health Matrix (`NetworkHealth.jsx`)
Executive telemetry monitoring the 5 core operating pillars across all campuses:
1. **Academics**
2. **Attendance**
3. **Collections**
4. **Parent Engagement**
5. **Staff Stability**

*Usage:*
```jsx
import { NetworkHealth } from '@/design-system';

<NetworkHealth onMetricClick={(metric) => drillDownToCampusVariance(metric)} />
```

---

### 3.4 Contextual AI Insight (`AIInsight.jsx`)
Provides generative insights while maintaining enterprise trust by strictly separating **AI-generated reasoning** from **Verified System Telemetry**:
- Labeled with distinctive purple sparkle badge
- Shows confidence rating
- Highlights immutable audit-backed data points
- Provides single-click remediation plan

---

## 4. Component Library Inventory

| Category | Component | Description |
| :--- | :--- | :--- |
| **Foundations** | `Heading`, `Text`, `NumericText` | Calibrated typography with tabular numeral alignment |
| | `Avatar` | Initials fallback, role badge, online/status dot |
| | `Badge`, `StatusBadge`, `TrendIndicator` | Semantic pill badges with up/down delta indicators |
| | `Divider`, `Tooltip` | Visual separation and accessible keyboard tooltips |
| **Actions** | `Button`, `IconButton` | Primary, secondary, saffron, danger, ghost, loading & disabled |
| | `Dropdown`, `DropdownItem` | Accessible popover action menu with Esc and click-outside |
| **Layout** | `Card`, `CardHeader`, `CardBody`, `CardFooter` | Enterprise container with flat, bordered, and raised elevations |
| | `Grid`, `Stack`, `Section` | Responsive spacing primitives (1 to 12 cols) |
| | `Modal`, `Drawer` | Focus-trapped dialogs and sliding drawers |
| **Data** | `KPICard`, `Metric` | Executive metric displays with trend deltas and drill-downs |
| | `Table` | Accessible data table with sortable columns and custom renderers |
| | `ProgressIndicator`, `Timeline` | Milestone trackers and horizontal multi-tone progress bars |
| **Input** | `FormField`, `TextInput` | Accessible inputs with error validation, prefix/suffix and icons |
| | `SearchInput`, `Select` | Search field with `⌘K` badge and enterprise select |
| **Feedback** | `Alert` | Info, success, warning, and safeguarding alert banners |
| | `EmptyState`, `LoadingState`, `Skeleton` | Shimmer loaders and clear zero-data guidance |
| **Visualizations** | `BarChart`, `DonutChart`, `FunnelChart` | Lightweight responsive charts for admissions and finance |
| **People** | `PersonRow`, `StudentAvatar` | Unified avatar rows for students, teachers, and guardians |

---

## 5. Do's and Don'ts

| Do | Don't |
| :--- | :--- |
| **Do** use `NumericText` and `tabular-nums` for roll numbers, fees, and marks. | **Don't** use standard proportional fonts for numbers in financial or academic tables. |
| **Do** connect every KPI to a drill-down or Next Best Action. | **Don't** build static decorative widgets with no operational workflow behind them. |
| **Do** use `#0F4C35` (Vedic Green) and `#D97706` (Saffron Gold) purposefully. | **Don't** use neon gradients, generic purple SaaS colors, or excessive glassmorphism. |
| **Do** distinguish AI hypotheses from verified database records. | **Don't** present ungrounded LLM completions as authoritative student records. |
| **Do** use semantic spacing tokens (`gap-3`, `p-5`, `rounded-xl`). | **Don't** write ad-hoc inline pixel margins or random border colors. |

---

## 6. Verification and Accessibility Checklist

- [x] WCAG 2.2 AA color contrast compliant across text and background surfaces.
- [x] Interactive components support visible focus ring via `.focus-ring` or `focus-visible`.
- [x] Modals and Drawers trap focus and dismiss gracefully on `Escape`.
- [x] Fluidly responsive from mobile ($375\text{px}$) to widescreen desktop ($1920\text{px}$).
- [x] Light mode executive presentation configured as the primary visual mode, with dark mode token parity.
