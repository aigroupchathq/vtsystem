# 10 — Compound UI Patterns: VEDIC TREE OS

## 1. Overview of Standard Compound Patterns

Compound patterns combine primitive components into standardized operational layouts used across multiple modules.

---

## 2. Standard Pattern Catalog

### 2.1 The Page Header Pattern (`<PageHeader />`)
Standard top area of every major screen answering the 5 orientation questions:
```tsx
<PageHeader
  breadcrumbs={[
    { label: 'Academics', href: '/academics' },
    { label: 'Grade 6-A', href: '/academics/grades/6a' },
    { label: 'Attendance' }
  ]}
  title="Class 6-A Morning Attendance"
  subtitle="Academic Session 2026-2027 • 42 Total Students Enrolled"
  badge={<Badge variant="success">Submitted</Badge>}
  actions={
    <>
      <Button variant="outline" icon={<Download />}>Export CSV</Button>
      <Button variant="default" icon={<Save />}>Save Modifications</Button>
    </>
  }
/>
```

### 2.2 The Metric KPI Card Pattern (`<MetricCard />`)
Top-row dashboard indicators summarizing real-time metrics:
- Value (e.g. `₹18,45,200` or `94.8%`) in large bold font (`text-2xl font-bold font-mono`).
- Trend indicator (`+4.2% vs last month` in green/red).
- Semantic Icon in elevated circular badge.

### 2.3 The Entity Master-Detail Drawer Pattern
Clicking a table row in the directory opens a fast 420px slide-over drawer on desktop rather than a full page navigation, allowing rapid inspection while keeping table context intact.

### 2.4 The Confirmation & Danger Modal Pattern
Destructive actions (deleting an enrollment, revoking a staff role, voiding a receipt) require an explicit confirmation modal with:
- Warning icon in red.
- Clear description of the irreversible consequences.
- Explicit type-to-confirm input (e.g., "Type DELETE to confirm") for ultra-critical operations.
