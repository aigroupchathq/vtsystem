# 01 — Design Principles: VEDIC TREE OS Design System

## 1. Vision & Purpose

The VEDIC TREE OS Design System is a unified, component-based token architecture built on **Tailwind CSS tokens, Radix UI accessibility primitives, and shadcn/ui architectural patterns**.

It provides an India-first, internationally refined visual language that delivers:
1. **Institutional Dignity**: A modern, authoritative aesthetic that reflects Vedic heritage while conveying technological sophistication.
2. **Cognitive Clarity**: Minimal visual noise, high information density without clutter, clear visual hierarchy.
3. **Extreme Consistency**: Every button, input, modal, badge, and table cell across all 11 user portals uses identical tokens, interaction physics, and state transitions.

---

## 2. Core Visual Principles

### 2.1 Cohesive Tokenization
All visual attributes—colors, typography, spacing, border radii, shadows, animations—are strictly derived from design tokens defined in `packages/ui/tokens/` or CSS variables in `@vtos/ui/styles/globals.css`. Hardcoded hex values or arbitrary Tailwind spacing classes (`p-[13px]`) are prohibited.

### 2.2 Intentional Contrast & Layering
We utilize a subtle 4-layer depth model:
- **Layer 0 (Canvas)**: Background canvas (`hsl(var(--background))`).
- **Layer 1 (Cards & Surfaces)**: Elevated content cards and panels (`hsl(var(--card))`).
- **Layer 2 (Overlays & Menus)**: Dropdown menus, popovers, sticky headers (`hsl(var(--popover))`).
- **Layer 3 (Modals & Sheets)**: Focus-trapping dialogs and bottom sheets (`hsl(var(--dialog))`).

### 2.3 Strict Reusability
Never create one-off components for a specific module. Every feature interface must be composed of the foundational building blocks documented in `09-components.md` and compound patterns in `10-patterns.md`.
