# 06 — Grid, Layout Containers & Shell: VEDIC TREE OS

## 1. Application Shell Structure

The standard authenticated application layout uses a 3-part grid layout:

```
+---------------------------------------------------------------------------------------+
| TOPBAR (h-16 / 64px fixed)                                                            |
+-------------------+-------------------------------------------------------------------+
| SIDEBAR           | MAIN CONTENT AREA (Scrollable, min-h-[calc(100vh-64px)])          |
| (w-64 / 256px     |                                                                   |
|  or w-16 / 64px   |  PAGE HEADER (Breadcrumbs, Title, Actions)                        |
|  collapsible)     |  ---------------------------------------------------------------  |
|                   |  KPI METRIC CARDS (Grid: 1 col mob -> 2 col tab -> 4 col desk)   |
|                   |  ---------------------------------------------------------------  |
|                   |  PRIMARY WORKSPACE (Data Table / Form / Split-Pane / Kanban)      |
|                   |                                                                   |
+-------------------+-------------------------------------------------------------------+
```

---

## 2. Standard 12-Column Responsive Dashboard Grid

Dashboard pages utilize a fluid 12-column grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6`):
- **Full Width Widget**: `col-span-12` (e.g. Master Student Table, Fee Invoices Table).
- **Two-Thirds Primary Area**: `col-span-12 lg:col-span-8` (e.g. Class Attendance Grid, Exam Marksheet).
- **One-Third Secondary Context Panel**: `col-span-12 lg:col-span-4` (e.g. Student Summary Card, Recent Activity Log).
- **Four KPI Cards Row**: `col-span-12 sm:col-span-6 lg:col-span-3` (e.g. Total Students, Fee Collected, Staff Present, Transport Alerts).

---

## 3. Container Max-Widths

- Dense Data Views (Tables, Gradebooks, Timetables): `max-w-none w-full px-6` (fluid to maximize horizontal screen real estate).
- Form Workflows & Profile Details: `max-w-6xl mx-auto px-4 sm:px-6` (constrained to preserve ergonomic line lengths).
- Authentication & Auth Portals: `max-w-md mx-auto` (centered, focused single-task layout).
