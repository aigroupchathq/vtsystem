# 11 — Search, Filtering & Discovery Strategy: VEDIC TREE OS

## 1. Search Objectives & Cognitive Model

In a school operating system managing thousands of students, fee transactions, and staff records, search is not an auxiliary feature—it is the **primary navigation accelerator**.

Staff members think in terms of:
- A child's name ("Aarav Sharma")
- An admission number ("VT-2026-042")
- A guardian's mobile phone ("9823012345")
- A vehicle number plate ("MH 12 AB 1234")
- A receipt number ("REC-2026-8891")

The search architecture provides instant resolution across all these entity vectors without requiring users to navigate to specific sub-modules first.

---

## 2. Universal Command Palette (`Cmd + K` / `Ctrl + K`)

Accessible from every screen via keyboard shortcut or prominent topbar search input.

```
+-------------------------------------------------------------------------------+
| Q  aarav sh                                                                   |
+-------------------------------------------------------------------------------+
| STUDENTS (2)                                                                  |
|   Aarav Sharma     • Grade 6-A  • Adm: VT-2026-042  • Pune Campus             |
|   Aarav Shinde     • Grade 2-B  • Adm: VT-2026-118  • Baner Campus            |
|                                                                               |
| GUARDIANS (1)                                                                 |
|   Dr. Vikram Sharma (Father of Aarav Sharma) • +91 98230 12345                |
|                                                                               |
| INVOICES (1)                                                                  |
|   INV-2026-0891    • ₹18,500    • Aarav Sharma (Due: 10 Aug 2026)             |
|                                                                               |
| ACTIONS (Quick Commands)                                                      |
|   > Collect Fee from Aarav Sharma                                             |
|   > View Attendance History for Aarav Sharma                                  |
+-------------------------------------------------------------------------------+
| [Tab] Navigate   [Enter] Open Profile   [Esc] Dismiss   [Cmd+Enter] Open Tab  |
+-------------------------------------------------------------------------------+
```

---

## 3. High-Performance Filtering Mechanics for Data Tables

For directory views (Student Master, Staff Directory, Invoices, Fee Counter):

### 3.1 Quick Filter Chips & Facets
- Persistent horizontal filter chips above the table:
  - `Grade: [All Grades v]`
  - `Division: [All v]`
  - `Status: [Active v]`
  - `Fee Status: [Overdue (42) x]`
  - `Gender: [All v]`
- One-click "Clear All Filters" button when >= 1 filter is active.

### 3.2 Instant In-Memory + Debounced Server Filtering
- Table text input filters matching locally cached columns in `< 50ms`.
- Server searches debounce at `300ms` to prevent unnecessary database load.
- Preserves filter parameters in URL search string (`?grade=6&division=A&feeStatus=overdue`).

---

## 4. Search Ranking & Tenant Isolation Guarantees

1. **Strict Tenant Bounding**: Universal search queries ALWAYS include `tenantId` in the indexing filter. A school cashier at Campus A will NEVER see students or invoices from Campus B unless explicitly in HQ multi-campus mode.
2. **Fuzzy Matching & Phonetic Tolerance**: Indian names frequently have multiple Romanized spellings (e.g., Choudhary / Chaudhary / Chowdhary / Choudhury). The search backend leverages PostgreSQL `pg_trgm` (trigram) indexing to provide phonetic similarity matching.
3. **Audit Logging on Sensitive Searches**: Searching for sensitive student medical or disciplinary records is logged in the compliance audit trail.
