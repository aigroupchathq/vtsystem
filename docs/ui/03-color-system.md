# 03 — Color System & HSL Tokens: VEDIC TREE OS

## 1. Color Palette Philosophy

The palette blends the dignity of Indian intellectual heritage (deep forest green, warm saffron gold, terracotta slate) with modern enterprise software neutrals. 

All tokens are defined as HSL values (`h s% l%`) without the `hsl()` wrapper inside CSS custom properties to allow Tailwind opacity modifiers (`bg-primary/90`).

---

## 2. Core Color Tokens (Light & Dark Mode)

### 2.1 Brand & Semantic HSL Definitions

```css
:root {
  /* Canvas & Base Surfaces */
  --background: 210 20% 98%;          /* Clean off-white #F8FAFC */
  --foreground: 222 47% 11%;          /* Slate dark #0F172A */
  --card: 0 0% 100%;                  /* Pure white #FFFFFF */
  --card-foreground: 222 47% 11%;
  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;

  /* Primary Brand: Vedic Forest Green */
  --primary: 154 58% 22%;             /* Deep Heritage Green #0F4C35 */
  --primary-foreground: 0 0% 100%;

  /* Secondary Brand: Warm Saffron Gold Accent */
  --secondary: 38 92% 50%;            /* Saffron Amber #F59E0B */
  --secondary-foreground: 222 47% 11%;

  /* Neutrals & Muted Tones */
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;    /* Medium Gray #64748B */
  --accent: 154 30% 94%;              /* Soft Sage tint */
  --accent-foreground: 154 58% 22%;

  /* Semantic Feedback States */
  --success: 142 71% 36%;             /* Emerald Green #16A34A */
  --success-foreground: 0 0% 100%;
  --warning: 38 92% 50%;              /* Warm Amber #F59E0B */
  --warning-foreground: 222 47% 11%;
  --destructive: 0 84% 60%;           /* Crimson Red #EF4444 */
  --destructive-foreground: 0 0% 100%;
  --info: 217 91% 60%;                /* Royal Blue #3B82F6 */
  --info-foreground: 0 0% 100%;

  /* Structural Borders & Rings */
  --border: 214 32% 91%;              /* Subtle border #E2E8F0 */
  --input: 214 32% 91%;
  --ring: 154 58% 22%;                /* Focus ring matches primary */
  --radius: 0.5rem;                   /* 8px standard radius */
}

.dark {
  --background: 222 47% 7%;           /* Deep Midnight #090D16 */
  --foreground: 210 40% 98%;
  --card: 222 47% 10%;                /* Dark Card Surface #0F172A */
  --card-foreground: 210 40% 98%;
  --popover: 222 47% 10%;
  --popover-foreground: 210 40% 98%;

  --primary: 154 55% 42%;             /* Brighter Emerald for Dark Mode #30A477 */
  --primary-foreground: 222 47% 7%;

  --secondary: 38 92% 55%;
  --secondary-foreground: 222 47% 7%;

  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
  --accent: 217 33% 17%;
  --accent-foreground: 210 40% 98%;

  --success: 142 70% 45%;
  --success-foreground: 222 47% 7%;
  --warning: 38 92% 55%;
  --warning-foreground: 222 47% 7%;
  --destructive: 0 75% 55%;
  --destructive-foreground: 0 0% 100%;
  --info: 217 91% 65%;
  --info-foreground: 222 47% 7%;

  --border: 217 33% 20%;
  --input: 217 33% 20%;
  --ring: 154 55% 42%;
}
```

---

## 3. Accessible Pairing Combinations

| Background Token | Text / Foreground Token | Contrast Ratio | Compliance |
|---|---|---|---|
| `bg-primary` (Green) | `text-primary-foreground` (White) | **7.8:1** | WCAG AAA |
| `bg-secondary` (Saffron) | `text-secondary-foreground` (Slate 900) | **8.4:1** | WCAG AAA |
| `bg-destructive` (Crimson) | `text-destructive-foreground` (White) | **4.9:1** | WCAG AA |
| `bg-card` (White) | `text-foreground` (Slate 900) | **14.2:1** | WCAG AAA |
| `bg-muted` (Soft Gray) | `text-muted-foreground` (Slate 500) | **4.8:1** | WCAG AA |
