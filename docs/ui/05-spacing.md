# 05 — Spacing & Elevation System: VEDIC TREE OS

## 1. 4px / 8px Base Spacing Scale

All layout padding, margins, gaps, and component dimensions adhere strictly to an **8-point spatial grid** (with a 4px half-step for micro-alignment).

| Token | Class | Value (px) | Primary Application |
|---|---|---|---|
| `space-1` | `p-1 / gap-1` | `4px` | Micro-spacing: Icon to label, badge internal padding |
| `space-2` | `p-2 / gap-2` | `8px` | Compact button padding, input internal padding |
| `space-3` | `p-3 / gap-3` | `12px` | Table cell vertical padding, dropdown menu items |
| `space-4` | `p-4 / gap-4` | `16px` | Standard card internal padding, form row spacing |
| `space-6` | `p-6 / gap-6` | `24px` | Modal dialog padding, dashboard widget margins |
| `space-8` | `p-8 / gap-8` | `32px` | Section dividers, page container padding |
| `space-12` | `p-12 / gap-12` | `48px` | Large hero banners, empty state vertical gutters |

---

## 2. Elevation & Shadow Hierarchy

Elevations are rendered via clean, soft ambient shadows avoiding harsh dark borders:

```css
/* Elevation Level 0: Flat Canvas */
--shadow-none: none;

/* Elevation Level 1: Cards & Panels */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Elevation Level 2: Interactive Hover & Popovers */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07);

/* Elevation Level 3: Dropdowns & Command Palette */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08);

/* Elevation Level 4: Modals, Drawers & Sheets */
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10);
```

---

## 3. Border Radii Tokens

- `rounded-sm`: `2px` (micro badges, checkboxes)
- `rounded-md`: `6px` (buttons, text inputs, select dropdowns)
- `rounded-lg`: `8px` (cards, content panels - default `--radius`)
- `rounded-xl`: `12px` (modal dialogs, floating action sheets)
- `rounded-full`: `9999px` (avatar circles, status pill badges)
