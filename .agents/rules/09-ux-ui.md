# Rule: UX and UI Design

Trigger: always_on
Scope: apps/web, packages/ui

---

## Design Principles

### 1. Role-First Design
Every screen is designed from the perspective of the role that will use
it. Roles have fundamentally different mental models and tasks:

| Role | Primary Task | Key Metric |
|---|---|---|
| Principal | Oversight and decisions | School performance at a glance |
| Teacher | Attendance, grades, communication | Today's class, pending actions |
| Student | My academics, schedule, fees | Today's timetable, results |
| Parent | My child's progress | Attendance, fees due, updates |
| Finance Admin | Fee collection and accounts | Outstanding dues, recent payments |
| HR Admin | Staff management | Leave approvals, payroll status |
| Franchise Owner | Multi-school overview | Revenue, enrolment trends |

No single role sees more than they need to. Default dashboards are
contextual, not generic.

### 2. Information Density — Calibrated per Role
- Operations staff (Finance, HR, Admin): Dense, data-rich tables are
  appropriate. They are power users.
- Students and Parents: Clean, approachable layouts with generous white
  space. Mobile-first.
- Executives and Principals: Summary cards with drill-down. Charts over
  tables as the default entry point.

### 3. Action-First Navigation
Place the most frequent action for each role within one click of the
dashboard. Do not bury primary actions in nested menus.

---

## Design System

### Colour Tokens
All colours are defined as CSS custom properties in the design system.
Source of truth: `packages/config/tailwind.config.base.ts`.

Do not use raw hex values (`#E6580A`) in component className — always
use semantic tokens (`text-primary`, `bg-surface-elevated`).

Token structure:
```
--color-primary          # Brand primary
--color-primary-subtle   # Tinted background for primary
--color-secondary        # Brand secondary
--color-destructive      # Error / danger actions
--color-warning          # Caution states
--color-success          # Confirmed / positive states
--color-surface          # Page background
--color-surface-elevated # Card / panel background
--color-border           # Default border
--color-border-strong    # Focused / hover border
--color-text-primary     # High contrast text
--color-text-secondary   # Muted / helper text
--color-text-disabled    # Disabled state text
```

Both light and dark mode values are required for every token.

### Typography Scale
```
--text-xs      12px / 16px line-height   # Labels, captions, badges
--text-sm      14px / 20px               # Body small, table cells
--text-base    16px / 24px               # Body, descriptions
--text-lg      18px / 28px               # Section headings
--text-xl      20px / 28px               # Page headings
--text-2xl     24px / 32px               # Card headings
--text-3xl+    32px+                      # Hero / marketing only
```

Font families:
- Headings: `Plus Jakarta Sans` (or brand-approved alternative)
- Body: `Inter`
- Code / Mono: `JetBrains Mono`

### Spacing
Use the Tailwind 4-based spacing scale. All spacing values must be
multiples of 4px. Do not use odd pixel values.

### Border Radius
- Small elements (badges, tags): `rounded` (4px)
- Buttons, inputs: `rounded-lg` (8px)
- Cards, panels: `rounded-xl` (12px)
- Modals, large panels: `rounded-2xl` (16px)

---

## Component Standards

### Interactive States
Every interactive element must have distinct visual states:
- Default
- Hover
- Active (pressed)
- Focus (keyboard-visible focus ring)
- Disabled
- Loading

Never remove focus rings. Replace `outline: none` only with a custom
`ring` implementation visible at 3:1 contrast ratio minimum.

### Loading States
Use skeleton loaders (not spinners) for content that loads in place.
Use a spinner only for a primary action (form submission, page transition).

### Empty States
Every list, table, or data view must have a designed empty state with:
- An illustrative icon or image
- A brief explanation of why it is empty
- A primary action CTA where relevant (e.g., "Add your first student")

### Error States
Every data view must handle the error state gracefully:
- A clear, human-readable error message
- A retry action where possible
- Never expose raw error messages or stack traces to users

### Form Design
- Labels above inputs (not inside as placeholders)
- Helper text below inputs for context
- Error messages immediately below the field that caused them
- Required fields indicated clearly (not just with asterisk alone —
  also describe in the form's introduction)
- Submit buttons at the bottom-left for desktop, full-width at bottom
  for mobile

---

## Responsive Design

All screens are designed mobile-first. The responsive breakpoints are:

| Breakpoint | Min Width | Typical device |
|---|---|---|
| `sm` | 640px | Large mobile / small tablet |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape / small laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

Parents and Students primarily access via mobile. Admin, Finance, and
HR users primarily access via desktop. Both must work well on both.

---

## Accessibility Baseline (WCAG 2.1 AA)

- Colour contrast: 4.5:1 minimum for body text; 3:1 for large text
- All form inputs have associated labels
- All images have `alt` text
- All interactive elements are reachable via keyboard (Tab order is logical)
- Screen reader announcements for async operations (live regions)
- No motion for users who have `prefers-reduced-motion` enabled
- Touch targets minimum 44×44px on mobile

Run accessibility audit with `@axe-core/playwright` in the E2E suite
on every PR. Block merge if any `critical` or `serious` violations are found.

---

## Communication Language

All UI copy is written in clear, warm, professional language appropriate
for an educational context. Tone guidelines:

- Professional but not cold
- Encouraging for students and parents
- Efficient and actionable for admin staff
- No jargon in student/parent-facing screens
- Use active voice
- Errors should explain what happened and what to do next — not just
  "An error occurred"

All copy goes through the i18n system — even if only English is
implemented initially, the string must live in `messages/en.json`.
