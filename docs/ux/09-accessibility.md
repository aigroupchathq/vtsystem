# 09 — Accessibility & Inclusive Design: VEDIC TREE OS

## 1. Compliance Standard & Objective

VEDIC TREE OS targets strict adherence to **WCAG 2.1 Level AA** standards and Indian National Guidelines for Government Websites (GIGW) accessibility mandates.

In the education ecosystem, accessibility includes:
- Students and teachers with visual impairments or color blindness.
- Parents with varying levels of literacy and digital experience.
- School staff operating devices under intense glare in outdoor playgrounds or dim classrooms.

---

## 2. Core Accessibility Mandates

### 2.1 Color Contrast Ratios
- **Normal Text (< 18pt / 24px regular)**: Minimum contrast ratio of **4.5:1** against background.
- **Large Text (>= 18pt / 14pt bold)**: Minimum contrast ratio of **3.0:1**.
- **Interactive UI Components & Form Borders**: Minimum contrast ratio of **3.0:1**.
- **Information Not Dependent on Color Alone**: Status badges (e.g. Paid, Overdue, Absent) MUST always pair color with text labels or distinct icons (e.g., Green + Checkmark for Paid, Red + Triangle for Overdue).

### 2.2 Full Keyboard Navigation & Focus Management
- Every interactive element (buttons, links, table rows, dropdowns, inputs) is completely operable via keyboard alone (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Arrow Keys`, `Escape`).
- **Focus Rings**: A prominent, high-visibility 2px focus ring (`ring-2 ring-primary ring-offset-2`) is mandatory on all focused elements. Never use `outline: none` without a custom focus indicator.
- **Skip to Content Link**: Top-level hidden link that appears on first tab, allowing screen reader and keyboard users to bypass global navigation directly to `#main-content`.

### 2.3 Screen Reader Semantics (ARIA)
- Semantic HTML5 structure is used everywhere (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<section>`).
- Dynamic content updates (e.g. "Attendance saved", "Fee payment successful") are announced via `aria-live="polite"`.
- Modals trap focus completely until dismissed and restore focus to the triggering element upon close (`aria-modal="true"`).
- Icon-only buttons (close buttons, edit icons, action ellipses) must include explicit `aria-label` or visually hidden screen reader text (`sr-only`).

### 2.4 Typography & Readability
- Default body font size is minimum **16px (1rem)** to prevent auto-zooming on iOS devices and ensure effortless legibility.
- Line height is maintained at a minimum of **1.5** for body copy.
- Paragraph widths are constrained to maximum 75 characters for reading comfort.

### 2.5 Motor Accessibility & Touch Targets
- Minimum touch target area of **44 x 44 physical pixels** on touchscreens.
- Sufficient spacing (minimum 8px) between interactive elements to prevent accidental mis-taps by teachers moving swiftly through lists.

---

## 3. Accessibility Testing & Validation Checklist

Before any PR or screen is merged:
1. **Automated Scanner**: Run Axe DevTools / Lighthouse Accessibility audit -> must achieve **score 100/100**.
2. **Keyboard-Only Walkthrough**: Complete the primary task using only Tab, Arrow keys, Enter, and Space.
3. **Screen Reader Verification**: Test using VoiceOver (macOS/iOS) or NVDA (Windows) to verify natural reading flow and descriptive announcements.
4. **Color Blindness Simulator**: Inspect color palettes using Deuteranopia and Protanopia filters to verify status differentiability.
