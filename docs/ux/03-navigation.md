# 03 — Navigation System: VEDIC TREE OS

## 1. Multi-Tier Navigation Anatomy

VEDIC TREE OS employs a dual-axis navigation system:
1. **Persistent Global Topbar**: Global tenant scoping, universal search, notifications, quick actions, and user profile.
2. **Left Collapsible Sidebar**: Role-specific modular navigation with hierarchical nesting and keyboard accelerators.
3. **In-Page Contextual Sub-navigation**: Horizontal tabs for entity sub-records (e.g., Student Profile: Overview, Academics, Fees, Attendance, Documents, Audit).
4. **Mobile Bottom Navigation Bar**: Core mobile-first tabs for parents, teachers, and field operators.

```
+-------------------------------------------------------------------------------------------------------+
| [=] VEDIC TREE OS  | [School: Pune Baner Campus v] | [Q Search anything... /] | [Quick +] [Bell 3] [User] |
+--------------------+----------------------------------------------------------+-----------------------+
|  ACADEMICS         |  Dashboard > Students > Grade 6A > Aarav Sharma                                   |
|  * Overview        |  +-----------------------------------------------------------------------------+ |
|  * Timetable       |  | [Overview]  [Academics]  [Attendance]  [Fees]  [Documents]  [Audit Log]      | |
|  * Gradebook       |  +-----------------------------------------------------------------------------+ |
|  * Lesson Plans    |                                                                                 |
|                    |  WHERE AM I?       Student 360 > Aarav Sharma (Adm No: VT-2026-042)             |
|  STUDENTS          |  WHAT AM I SEEING? Comprehensive student academic, fee, and guardian profile    |
|  * Directory       |  WHAT MATTERS?     1 Fee Installment Overdue (₹18,500) | Attendance: 94.2%      |
|  * Admissions      |  WHAT CAN I DO?    [Collect Fee] [Send Notice] [Edit Details] [...]             |
|  * Attendance      |  WHAT HAPPENS NEXT?Receipt printed / WhatsApp confirmation dispatched           |
|                    |                                                                                 |
+--------------------+---------------------------------------------------------------------------------+
```

---

## 2. Global Tenant & Campus Switcher

The Tenant Switcher is the most critical contextual control in the OS.
- **Location**: Topbar, prominent left-center position.
- **Selector Hierarchy**: Dropdown grouping:
  - HQ / Global Network View (for authorized roles)
  - Region (North, West, South, International)
  - School Entity
  - Campus / Branch
  - Academic Session Switcher (e.g., `2026-27 (Current)`, `2025-26 (Archived)`)
- **Visual Feedback**: The tenant banner clearly changes color accents or badges if working in an archived year (Amber alert badge: "ARCHIVED SESSION - READ ONLY").

---

## 3. Sidebar Organization by Role

### 3.1 HQ Executive & Regional Director
1. Network Overview & Health
2. School Performance & Ranking
3. Financial Aggregation & Franchise Royalties
4. Academic Quality & Standards Audit
5. Network Staffing & Leadership
6. Master System Governance & Policies

### 3.2 School Admin & Principal
1. Daily Operations Dashboard
2. Admissions CRM & Enrollment Funnel
3. Student Master Information System
4. Academics & Examination Controller
5. Staff Directory, Biometrics & Leaves
6. Fee Billing, Counter & Receipts
7. Fleet Transport & Safety Tracking
8. Official Circulars & Disciplinary Records

### 3.3 Teacher
1. Today's Timetable & Class Schedule
2. Quick Attendance (Instant Tap)
3. Gradebook & Assessment Entry
4. Lesson Plans & Homework Manager
5. Parent Communications & Diary Notes
6. My Leaves & Payslips

### 3.4 Parent & Student (Portal & Mobile)
1. Child Overview (Multi-child switcher if >1 enrolled child)
2. Live Bus GPS Tracker
3. Digital School Diary & Daily Updates
4. Instant Fee Payment & Receipts Vault
5. Exam Schedules & Interactive Report Cards
6. Teacher Chat & Leave Application

---

## 4. Universal Keyboard Navigation & Command Palette

VEDIC TREE OS features a comprehensive Command Palette (`Cmd + K` on Mac, `Ctrl + K` on Windows):
- **Universal Search**: Type `/` from anywhere to jump into search.
- **Instant Entity Jump**: Search by student name, admission number, roll number, or employee ID.
- **Action Shortcuts**:
  - `> new student` -> Opens quick admission modal.
  - `> pay fee` -> Opens fee counter search.
  - `> mark attendance` -> Navigates straight to teacher's current period attendance.
  - `> switch campus` -> Triggers campus selector modal.

---

## 5. Breadcrumb & Contextual State Restoration

- Breadcrumbs always reflect the conceptual hierarchy, not just browser history:
  `Organization > Region > School Campus > Academic Module > Specific Record`
- Deep linking: Every filter state, active tab, and table pagination is encoded in URL search parameters (`?tab=attendance&term=term1&page=2`), allowing instant bookmarking and reliable back-button behavior.
