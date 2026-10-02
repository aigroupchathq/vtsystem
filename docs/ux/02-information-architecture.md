# 02 — Information Architecture: VEDIC TREE OS

## 1. Global Hierarchy and Structural Topology

VEDIC TREE OS employs an **Enterprise Strict-Hierarchical Multi-Tenant Topology** reflecting physical education operational structures.

```
Organization (Vedic Tree Worldwide / Foundation)
   │
   ├── Region (e.g., North India, West India, Middle East, Southeast Asia)
   │     │
   │     ├── School (e.g., Vedic Tree International School Pune)
   │     │     │
   │     │     ├── Campus (e.g., Kothrud Campus, Baner Campus)
   │     │     │     │
   │     │     │     ├── Academic Years (e.g., AY 2026-2027)
   │     │     │     │     ├── Grades / Classes (e.g., Grade 6)
   │     │     │     │     │     ├── Divisions / Sections (e.g., Section A, Section B)
   │     │     │     │     │     └── Subject Tracks & Curriculum
   │     │     │     │     │
   │     │     │     │     ├── Operational Wings
   │     │     │     │     │     ├── Academics & Timetables
   │     │     │     │     │     ├── Admissions & Enrollment
   │     │     │     │     │     ├── Fee Management & Accounts
   │     │     │     │     │     ├── Human Resources & Staff Management
   │     │     │     │     │     ├── Facilities, Transport & Fleet
   │     │     │     │     │     └── Communication & Portals
```

---

## 2. Global Tenant Scoping & Inheritance Model

All data access, navigation, and entity queries are dynamically bounded by the active **Tenant Context Selector** residing in the persistent global navigation bar:

1. **Global HQ Context**: Top-level visibility across all regions, schools, franchises, and financial flows. Aggregated dashboards with deep drill-down capabilities.
2. **Regional Context**: Aggregated visibility across all schools in a geographic territory. Regional curriculum standards, regional compliance, regional hiring.
3. **School Context**: Standard operational entity. Policies, fee structures, academic terms, and master databases belong here.
4. **Campus Context**: Physical site level. Physical classrooms, live biometric gates, bus routes, inventory assets, cafeteria, and local campus events.

---

## 3. High-Level Modular Site Map

```
VEDIC TREE OS
├── 01. Dashboard Hub
│     ├── Executive / HQ Command Center
│     ├── Principal Daily Briefing
│     ├── Teacher Classroom Control Center
│     ├── Parent Family Portal
│     └── Student Academic Hub
│
├── 02. Admissions & CRM
│     ├── Inquiry & Lead Capture (WhatsApp / Web / Walk-in)
│     ├── Application Tracker & Document Vault
│     ├── Entrance Assessments & Interview Slots
│     └── Offer Letters & Enrollment Conversion
│
├── 03. Academic Lifecycle
│     ├── Curriculum & Lesson Planning
│     ├── Timetable Engine & Substitution Matrix
│     ├── Gradebook, Assessments & Moderation
│     ├── Report Card Publishing Engine
│     └── Student Attendance (Biometric / App)
│
├── 04. Student & Guardian Information System (SIS)
│     ├── Student Master Records (Medical, Academic, Behavioral)
│     ├── Guardian Relationships & Authorized Pickups
│     ├── Transfer Certificates (TC) & Bonafide Generation
│     └── Disciplinary Tracking & Counselor Notes
│
├── 05. Staff & HRMS
│     ├── Employee Directory & Service Books
│     ├── Attendance, Biometric Sync & Leaves
│     ├── Timetable Workload Distribution
│     └── Staff Appraisals & Professional Development
│
├── 06. Fee & Financial Operations
│     ├── Fee Structure & Concession Policies
│     ├── Student Invoicing & Multi-Installment Schedules
│     ├── Fee Counter POS (Cash, Cheque, UPI, Cards)
│     ├── Defaulter Management & Dunning Automated Notices
│     └── Franchise Royalty Calculation & Invoicing
│
├── 07. Logistics, Transport & Campus Assets
│     ├── Bus Routes, Vehicle GPS & Stop Manifests
│     ├── Real-time Guardian Transport Tracker
│     ├── Asset & Equipment Inventory
│     └── Facilities Maintenance Tickets
│
├── 08. Communication & Notification Hub
│     ├── Broadcasts & Circulars (WhatsApp, Push, SMS, Email)
│     ├── Two-way Parent-Teacher Messaging
│     ├── Emergency Broadcast System
│     └── School Calendar & Event RSVPs
│
└── 09. Governance, Security & Settings
      ├── User Access Control (RBAC + CASL)
      ├── Audit Logs & Data Modification History
      ├── System Configurations & Academic Calendars
      └── Integrations (Payment Gateways, Biometric, WhatsApp API)
```

---

## 4. Entity Relationship Hierarchy & Context Propagation

Every entity strictly inherits its parent scoping:
- `Student` belongs to `Campus`, which belongs to `School`, which belongs to `Region`, which belongs to `Organization`.
- Users possess one or more **Role Assignments** linked to a specific node in this tree.
- When an administrator switches context from "Vedic Tree Baner" to "Vedic Tree Kothrud", the application state invalidates all cached entity lists, re-establishing strict query boundaries.
