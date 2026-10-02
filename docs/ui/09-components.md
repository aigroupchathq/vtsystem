# 09 — Component Library Primitives: VEDIC TREE OS

## 1. Component Architecture Standard

All components are housed in `packages/ui` and re-exported for consumption by `apps/web`. They are built on top of **Radix UI Primitives** styled with Tailwind CSS, following the shadcn/ui composable API pattern.

---

## 2. Core Primitives Inventory

### 2.1 Button (`<Button />`)
- **Variants**:
  - `default`: Solid Forest Green (`bg-primary text-primary-foreground hover:bg-primary/90`)
  - `secondary`: Warm Saffron Gold (`bg-secondary text-secondary-foreground hover:bg-secondary/90`)
  - `destructive`: Crimson Red (`bg-destructive text-destructive-foreground hover:bg-destructive/90`)
  - `outline`: Bordered with neutral line (`border border-input bg-background hover:bg-accent hover:text-accent-foreground`)
  - `ghost`: Transparent, hover highlight only (`hover:bg-accent hover:text-accent-foreground`)
  - `link`: Underlined text style
- **Sizes**: `sm` (h-8 px-3 text-xs), `default` (h-10 px-4 text-sm), `lg` (h-12 px-8 text-base), `icon` (h-10 w-10).
- **Loading State**: Automatically shows `<Loader2 className="animate-spin mr-2 h-4 w-4" />` and disables click interactions.

### 2.2 Input & Textarea (`<Input />`, `<Textarea />`)
- Standardized height (`h-10` for input), subtle border (`border-input`), smooth focus ring (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
- Integrated error state: Red border (`border-destructive focus-visible:ring-destructive`) paired with `<ErrorMessage />` text.

### 2.3 Status Badge (`<Badge />`)
- Pill badges for status indicators:
  - `success`: Green bg + green text (`bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400`)
  - `warning`: Amber bg + amber text (`bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400`)
  - `destructive`: Red bg + red text (`bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-400`)
  - `neutral`: Slate bg + slate text (`bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300`)

### 2.4 Card Surface (`<Card />`, `<CardHeader />`, `<CardContent />`, `<CardFooter />`)
- Clean white/dark slate background, rounded 8px corners (`rounded-lg`), subtle border (`border border-border`), elevation shadow (`shadow-sm`).

### 2.5 Modal Dialog & Sheet (`<Dialog />`, `<Sheet />`)
- Radix-powered, focus-trapping modal with accessible title, description, and action buttons.
- On viewports `< 768px`, dialogs dynamically render as bottom-anchored sheets.

### 2.6 Table Primitives (`<Table />`, `<TableHeader />`, `<TableBody />`, `<TableRow />`, `<TableCell />`)
- Semantic HTML tables optimized for high-density rendering, hover highlights, sticky headers, and tabular numerical data.
