# 11 — Data Table System & Specifications: VEDIC TREE OS

## 1. Table Architecture Standard

Data tables are the core workhorse of VEDIC TREE OS. They are powered by **TanStack Table v8** wrapped in our accessible design tokens.

---

## 2. Table Specifications & Interactive Features

### 2.1 Anatomy of a High-Density Table
1. **Table Toolbar**: Search input, faceted filter dropdowns, column visibility selector, batch action buttons (when rows selected), and CSV export button.
2. **Sticky Header**: Headers remain locked to the top when scrolling through long student or invoice lists.
3. **Sortable Columns**: Visual indicators (`ChevronUp`, `ChevronDown`, or neutral sort icon) on sortable columns.
4. **Row States**:
   - `Default`: Subtle border separator (`border-b border-border`).
   - `Hover`: Light tint highlight (`hover:bg-muted/50`).
   - `Selected`: Accent background tint with checkbox checked.
5. **Sticky Action Column**: The rightmost action column (`[...]` menu or quick buttons) is horizontally pinned to ensure actions are always reachable regardless of table scroll.

---

## 3. Table Density Modes

Users can toggle table density to match their operational style:
- **Compact Density**: `py-1.5 px-3 text-xs` (Ideal for finance cashiers, fee audit, exam marks entry).
- **Default Density**: `py-3 px-4 text-sm` (Standard directory tables, admissions lists).
- **Relaxed Density**: `py-4 px-6 text-sm` (Executive reports, review lists).

---

## 4. Pagination & Infinite Virtualization

- Server-side pagination with selectable page sizes: `[10, 25, 50, 100 rows per page]`.
- For ultra-large datasets (>1,000 rows like biometric logs or audit trails), tables utilize `@tanstack/react-virtual` for 60fps smooth scrolling with minimal DOM node consumption.
