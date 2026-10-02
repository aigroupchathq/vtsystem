# 04 — Typography System: VEDIC TREE OS

## 1. Font Family Stacks

VEDIC TREE OS uses a clean, modern, high-legibility type stack:

```css
/* Primary Interface Font (Latin / English) */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

/* Indic Script Fallbacks (Devanagari / Hindi / Marathi) */
--font-indic: 'Noto Sans Devanagari', 'Inter', sans-serif;

/* Tabular / Monospace (Numerical Data, Barcodes, Financial Tables) */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

---

## 2. Type Scale & Hierarchy

| Token | Class | Size (px / rem) | Line Height | Weight | Usage |
|---|---|---|---|---|---|
| `display` | `text-4xl` | `36px / 2.25rem` | `40px / 2.5rem` | Bold (700) | Welcome banners, landing headers |
| `h1` | `text-3xl` | `30px / 1.875rem` | `36px / 2.25rem` | SemiBold (600) | Primary page titles (one per screen) |
| `h2` | `text-2xl` | `24px / 1.5rem` | `32px / 2.0rem` | SemiBold (600) | Major section headers, card modal headers |
| `h3` | `text-xl` | `20px / 1.25rem` | `28px / 1.75rem` | Medium (500) | Sub-sections, drawer titles, widget heads |
| `h4` | `text-lg` | `18px / 1.125rem` | `26px / 1.625rem` | Medium (500) | Card titles, group dividers |
| `body-lg` | `text-base` | `16px / 1.0rem` | `24px / 1.5rem` | Regular (400) | Standard body copy, form inputs |
| `body-sm` | `text-sm` | `14px / 0.875rem` | `20px / 1.25rem` | Regular (400) | Table cells, helper descriptions, tooltips |
| `caption` | `text-xs` | `12px / 0.75rem` | `16px / 1.0rem` | Medium (500) | Status badges, timestamps, table headers |

---

## 3. Tabular Numerals for Financial & Assessment Tables

In data tables, fee receipts, and marks entry grids, numbers must always align vertically:
- Apply CSS class `font-mono tabular-nums` or `font-variant-numeric: tabular-nums;` to all currency totals, percentages, student roll numbers, and grades.
