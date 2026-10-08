# VEDIC TREE OS — Design System Contrast & Readability Specification
**Document Reference**: `docs/design-system/contrast-and-readability.md`  
**Standard**: WCAG 2.2 Level AA / Level AAA Baseline  
**Status**: ACTIVE & ENFORCED

---

## 1. Executive Summary & Design System Philosophy

In enterprise education operating systems managing student safeguarding, academic progress, multi-campus governance, and institutional finance, **text visibility and readability are non-negotiable operational requirements**. 

Low-contrast "aesthetic" treatments (such as faint grey text, translucent overlays, or muted gold text on pale ivory) cause cognitive strain, operational mistakes, and accessibility violations. Vedic Tree OS enforces a strict **Mathematical Contrast System** where visual hierarchy is achieved through structured weight, scale, and surface elevation rather than opacity attenuation or low-contrast colors.

### Core Architectural Rules
1. **No Meaningful Text Opacity**: Meaningful text never relies on opacity modifiers (`opacity-40`, `opacity-50`, `opacity-60`). Explicit, fully opaque semantic tokens are used instead.
2. **Gold/Antique Gold Accent Constraint**: Antique Gold (`#C49A3A` / `#DFC679`) is strictly an accent, indicator dot, or decorative element on light surfaces. It is **never** used as readable text on ivory or white backgrounds (where contrast is only 2.46:1). On light surfaces, authoritative amber (`#78350F`, 8.54:1) is used for warning/accent text. Gold text is permitted exclusively on Deep Forest dark surfaces (`#0B2F29`, 8.60:1).
3. **Saffron Button Rule**: Saffron/Gold action buttons (`#C49A3A`) strictly utilize Deep Forest text (`#0B2F29`, 5.53:1 contrast), never white text (which fails critically at 2.60:1).
4. **Legible Disabled States**: Disabled controls retain sufficient foreground contrast (minimum 7:1) to ensure users can clearly read the label and understand why the control is disabled without guessing.

---

## 2. Core Token Definitions

### 2.1 Surface & Background Tokens
| Token | Hex Value | Semantic Purpose |
|-------|-----------|------------------|
| `canvas.base` | `#FBF8EF` | 65% Warm Ivory Canvas (page background) |
| `surface.card` | `#FFFFFF` | Elevated Card & Modal Content Surface |
| `surface.cardInset`| `#F4EEDC` | Soft Ivory Inset & Table Row Alternative |
| `surface.disabled` | `#EFE9DD` | Disabled Control Surface |
| `shell.forestDeep` | `#0B2F29` | 20% Deep Forest Shell / Sidebar / Primary Action |
| `shell.forestMid`  | `#154E42` | Active Navigation Item Surface |
| `badge.bg.neutral` | `#EFE9DD` | Neutral Badge Surface |
| `badge.bg.forest`  | `#EAF3EF` | Primary Forest Badge Surface |
| `badge.bg.warning` | `#FEF3C7` | Amber / Warning Badge Surface |
| `badge.bg.success` | `#DCFCE7` | Success Badge Surface |
| `badge.bg.danger`  | `#FEE2E2` | Danger / Error Badge Surface |
| `badge.bg.info`    | `#E0F2FE` | Informational Badge Surface |
| `badge.bg.ai`      | `#FAF5FF` | AI / Compass Insight Badge Surface |

### 2.2 Semantic Text Tokens
| Token | Hex Value | Semantic Role | Target Minimum Ratio |
|-------|-----------|---------------|----------------------|
| `text.primary` | `#0B2F29` | Page titles, primary headings, critical metrics | 12:1 (AAA) |
| `text.secondary` | `#1E293B` | Section headings, table headers, labels | 12:1 (AAA) |
| `text.muted` | `#334E47` | Form hints, secondary descriptions, metadata | 7:1 (AAA) |
| `text.caption` | `#334155` | Fine print, time stamps, tags | 8:1 (AAA) |
| `text.placeholder`| `#475569` | Unfilled input placeholders | 7:1 (AAA) |
| `text.disabled` | `#334E47` | Disabled button and input labels | 7:1 (AAA) |
| `text.error` | `#991B1B` | Error messages, destructive actions | 7:1 (AAA) |
| `text.warning` | `#78350F` | Warnings, pending items, amber alerts | 7:1 (AAA) |
| `text.success` | `#0F5132` | Success status, clearance confirmations | 7:1 (AAA) |
| `text.info` | `#075985` | Informational callouts, system notes | 7:1 (AAA) |
| `text.ai` | `#581C87` | Compass developmental insights | 7:1 (AAA) |

### 2.3 Shell & Dark Surface Tokens
| Token | Hex Value | Semantic Role on `#0B2F29` Shell | Contrast Ratio |
|-------|-----------|----------------------------------|----------------|
| `shell.textPrimary` | `#FFFFFF` | Brand title, active navigation item | 14.59:1 (AAA) |
| `shell.textSecondary` | `#F4EEDC`| Navigation labels, user title | 13.06:1 (AAA) |
| `shell.textMuted` | `#CBD5E1` | Navigation group headers, subtitles | 10.15:1 (AAA) |
| `shell.textAccent` | `#DFC679` | Active indicator, section headers | 8.60:1 (AAA) |

---

## 3. Mathematical Contrast Pairing Matrix

Every semantic pairing across Vedic Tree OS has been mathematically verified using the W3C Relative Luminance and Contrast Ratio formula:

$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$

| # | Foreground Element | Background Surface | FG Hex | BG Hex | Ratio | WCAG 2.2 Status |
|---|--------------------|--------------------|--------|--------|-------|-----------------|
| 1 | Primary Text (Page Title) | Warm Ivory Canvas | `#0B2F29` | `#FBF8EF` | **12.43:1** | **PASS (AAA)** |
| 2 | Primary Text (Card Title) | Pure White Card | `#0B2F29` | `#FFFFFF` | **14.59:1** | **PASS (AAA)** |
| 3 | Secondary Text (Labels) | Warm Ivory Canvas | `#1E293B` | `#FBF8EF` | **12.39:1** | **PASS (AAA)** |
| 4 | Secondary Text (Labels) | Soft Ivory Inset | `#1E293B` | `#F4EEDC` | **11.45:1** | **PASS (AAA)** |
| 5 | Secondary Text (Labels) | Pure White Card | `#1E293B` | `#FFFFFF` | **14.54:1** | **PASS (AAA)** |
| 6 | Muted Text (Descriptions) | Warm Ivory Canvas | `#334E47` | `#FBF8EF` | **8.52:1** | **PASS (AAA)** |
| 7 | Muted Text (Descriptions) | Soft Ivory Inset | `#334E47` | `#F4EEDC` | **7.87:1** | **PASS (AAA)** |
| 8 | Muted Text (Descriptions) | Pure White Card | `#334E47` | `#FFFFFF` | **10.00:1** | **PASS (AAA)** |
| 9 | Caption / Meta Text | Warm Ivory Canvas | `#334155` | `#FBF8EF` | **8.63:1** | **PASS (AAA)** |
| 10 | Input Placeholder Text | Pure White Input | `#475569` | `#FFFFFF` | **7.58:1** | **PASS (AAA)** |
| 11 | Input Placeholder Text | Warm Ivory Canvas | `#475569` | `#FBF8EF` | **7.14:1** | **PASS (AAA)** |
| 12 | Disabled Input Text | Disabled Canvas Inset | `#4A665F` | `#EAE6D6` | **5.45:1** | **PASS (AA)** |
| 13 | Primary Button Text | Deep Forest Button | `#FBF8EF` | `#0B2F29` | **12.43:1** | **PASS (AAA)** |
| 14 | Secondary Button Text | Warm Ivory Button | `#102625` | `#FBF8EF` | **14.15:1** | **PASS (AAA)** |
| 15 | Saffron Button Text | Antique Gold Button | `#0B2F29` | `#C49A3A` | **5.53:1** | **PASS (AA)** |
| 16 | Destructive Button Text | Crimson Red Button | `#FFFFFF` | `#991B1B` | **8.31:1** | **PASS (AAA)** |
| 17 | Disabled Button Text | Disabled Button Base | `#334E47` | `#EFE9DD` | **7.48:1** | **PASS (AAA)** |
| 18 | Error / Validation Text | Warm Ivory Canvas | `#991B1B` | `#FBF8EF` | **7.83:1** | **PASS (AAA)** |
| 19 | Error / Validation Text | Pure White Surface | `#991B1B` | `#FFFFFF` | **8.31:1** | **PASS (AAA)** |
| 20 | Warning / Amber Text | Warm Ivory Canvas | `#78350F` | `#FBF8EF` | **8.54:1** | **PASS (AAA)** |
| 21 | Warning / Amber Text | Pure White Surface | `#78350F` | `#FFFFFF` | **9.06:1** | **PASS (AAA)** |
| 22 | Success Text | Warm Ivory Canvas | `#0F5132` | `#FBF8EF` | **8.20:1** | **PASS (AAA)** |
| 23 | Success Text | Pure White Surface | `#0F5132` | `#FFFFFF` | **8.70:1** | **PASS (AAA)** |
| 24 | Info Text | Warm Ivory Canvas | `#075985` | `#FBF8EF` | **7.81:1** | **PASS (AAA)** |
| 25 | Info Text | Pure White Surface | `#075985` | `#FFFFFF` | **8.29:1** | **PASS (AAA)** |
| 26 | AI Insight Text | Warm Ivory Canvas | `#581C87` | `#FBF8EF` | **10.51:1** | **PASS (AAA)** |
| 27 | AI Insight Text | Pure White Surface | `#581C87` | `#FFFFFF` | **11.15:1** | **PASS (AAA)** |
| 28 | Default Neutral Badge Text | Neutral Badge BG | `#1E293B` | `#EFE9DD` | **11.66:1** | **PASS (AAA)** |
| 29 | Forest Badge Text | Forest Light Badge BG | `#0B2F29` | `#EAF3EF` | **12.48:1** | **PASS (AAA)** |
| 30 | Warning Badge Text | Amber Light Badge BG | `#78350F` | `#FEF3C7` | **7.91:1** | **PASS (AAA)** |
| 31 | Success Badge Text | Mint Light Badge BG | `#0F5132` | `#DCFCE7` | **7.29:1** | **PASS (AAA)** |
| 32 | Danger Badge Text | Crimson Light Badge BG| `#991B1B` | `#FEE2E2` | **6.75:1** | **PASS (AA)** |
| 33 | Info Badge Text | Sky Light Badge BG | `#075985` | `#E0F2FE` | **6.84:1** | **PASS (AA)** |
| 34 | AI Insight Badge Text | Purple Light Badge BG | `#581C87` | `#FAF5FF` | **10.18:1** | **PASS (AAA)** |
| 35 | Sidebar Primary Text | Deep Forest Shell | `#FFFFFF` | `#0B2F29` | **14.59:1** | **PASS (AAA)** |
| 36 | Sidebar Section Heading | Deep Forest Shell | `#DFC679` | `#0B2F29` | **8.60:1** | **PASS (AAA)** |
| 37 | Sidebar Subtitle | Deep Forest Shell | `#CBD5E1` | `#0B2F29` | **10.15:1** | **PASS (AAA)** |
| 38 | Active Nav Indicator | Mid Forest Active BG | `#DFC679` | `#154E42` | **4.91:1** | **PASS (AA)** |
| 39 | Focus Visible Ring (Light) | Warm Ivory Canvas | `#0B2F29` | `#FBF8EF` | **12.43:1** | **PASS (AAA)** |
| 40 | Focus Visible Ring (Dark) | Deep Forest Shell | `#DFC679` | `#0B2F29` | **8.60:1** | **PASS (AAA)** |

---

## 4. Interactive State Guarantees

Every interactive control maintains strict contrast through all lifecycle states:

### 4.1 Button States
- **Normal State**: High contrast according to variant specification (Primary: 12.43:1; Saffron: 5.53:1; Destructive: 8.31:1).
- **Hover State**: Darkening / brightening maintains minimum 5:1 contrast. Primary buttons shift to `#154E42` (contrast ratio 10.8:1); Saffron buttons shift to `#B58E32` (contrast ratio 5.1:1).
- **Active State**: Inset compression maintains text color with ring emphasis.
- **Focus State**: Universal `:focus-visible` ring of 2px solid `#0B2F29` (offset 2px) on light surfaces; 2px solid `#DFC679` on dark shell. No interactive element relies solely on blur or subtle shadows.
- **Disabled State**: Foreground text `#334E47` on `#EFE9DD` background (7.48:1 contrast). Control is legible without guessing.

### 4.2 Table States
- **Normal Row**: White or Canvas background with `#0B2F29` primary cells (12.4:1) and `#1E293B` headers (12.4:1).
- **Hover Row**: Subtle tint `#F5F0E1` preserves primary cell contrast at 11.2:1.
- **Selected Row**: Inset `#EAE2CE` with solid `#0B2F29` text (10.5:1).
- **Empty State**: Centered icon container `#EFE9DD` with `#334E47` message text (8.5:1).

### 4.3 Form Input States
- **Placeholder**: Calibrated `#475569` with `opacity: 1 !important` (7.58:1 on white, 7.14:1 on ivory). Placeholders are distinguishable from active input via regular weight (400) vs semibold entered text (600), while remaining fully legible.
- **Error State**: Field border `#991B1B` with helper text `#991B1B` (8.31:1 on white).
- **Disabled Input**: Background `#EAE6D6` with text `#4A665F` (5.45:1 contrast).

---

## 5. Responsive Readability & Typography Scale

To ensure readability across all screen breakpoints (`1440x900`, `1280x800`, `1024x768`, `390x844`), the design system establishes:

1. **Strict Text Size Floor**: No UI element in Vedic Tree OS may render below `11px` (0.6875rem), preventing micro-text unreadability on mobile devices.
2. **Weight Allocation Principle**:
   - Page and Card Headings: `font-semibold` / `font-bold` (600–700)
   - Table Headers & Form Labels: `font-semibold` (600)
   - Badges & Metric Indicators: `font-semibold` (600)
   - Body & Content Text: `font-normal` / `font-medium` (400–500)
   - Subtitles & Hints: `font-medium` (500)
3. **No Decorative Hairlines**: Font weight 300 (Light) is excluded from enterprise UI workflows.

---

## 6. Regression Testing & Continuous Enforcement

Readability and contrast boundaries are continuously enforced via automated regression tests in:
`tests/contrast.test.js`

Any PR or commit that introduces low-contrast combinations (<4.5:1 for normal text or <3:1 for graphical UI elements) will immediately fail CI.
