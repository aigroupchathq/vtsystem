# 13 — Dashboard Architecture & Widgets: VEDIC TREE OS

## 1. Dashboard Layout Philosophy

Dashboards in VEDIC TREE OS are **Action-Oriented Cockpits**, not passive chart scrapbooks. Every widget must drive a decision or prompt an operational action.

---

## 2. Standard Dashboard Anatomy

```
+---------------------------------------------------------------------------------------+
| GREETING & CONTEXT: "Good Morning, Principal Meenakshi • Pune Baner Campus"          |
+---------------------------------------------------------------------------------------+
| KPI METRIC ROW (4 Cards):                                                             |
| [ Student Attendance ] [ Teacher Attendance ] [ Today's Fee Inflow ] [ Open Alerts ]  |
| [    95.2% (+1.1%)   ] [    98.0% (2 Sub)   ] [  ₹4,20,500 (POS)   ] [   3 Critical ]  |
+---------------------------------------------------------------------------------------+
| PRIMARY OPERATIONAL WORKSPACE (8 Cols)        | CONTEXT & ACTIONS PANEL (4 Cols)      |
| [ Live Campus Timetable & Class Status     ]  | [ Morning Action Checklist         ]  |
| - Grade 6A: Science (Lab 2)                   | - [ ] Approve 2 Teacher Substitutions |
| - Grade 7B: Math (Room 104)                   | - [ ] Review Bus 14 Waterlogging Route|
| - Grade 8A: History (Room 201)                | - [ ] Sign 12 Transfer Certificates   |
|                                               |                                       |
| [ Real-Time Attendance Stream              ]  | [ Quick Launcher                   ]  |
| - Class 5B marked complete (08:12 AM)         | - [+ New Admission Inquiry]           |
| - Class 9A marked complete (08:14 AM)         | - [Collect Fee Counter POS]           |
+---------------------------------------------------------------------------------------+
```

---

## 3. Standard Widget Types

1. **Metric Stat Card**: Large numerical display with trend percentage and sparkline.
2. **Action Checklist Widget**: Interactive checkboxes for daily administrative tasks with direct deep-links.
3. **Timeline / Feed Widget**: Chronological stream of campus events (attendance submitted, fee collected, circular published).
4. **Data Visualization Chart**: Powered by Recharts/Visx using accessible brand color tokens. Avoid 3D charts or complex multi-layer radar graphs.
