# 06 — Comprehensive Screen Inventory: VEDIC TREE OS

## 1. Screen Categorization Matrix

Every screen in the inventory is mapped to its primary route, target roles, responsive profile, and the 5 critical orientation questions.

---

## 2. Platform Core & Administrative Screens

| Screen ID | Route | Screen Name | Roles | 5 Questions Answered |
|---|---|---|---|---|
| **SCR-COR-01** | `/login` | Multi-Tenant Login & SSO | All | Identity verification, school domain detection, MFA |
| **SCR-COR-02** | `/select-tenant` | Organization & Campus Switcher | Multi-role Staff | Lists accessible schools/campuses, sets session token |
| **SCR-COR-03** | `/settings/organization` | Organization & Master Settings | HQ Admin | Top-tier company branding, global currency, academic terms |
| **SCR-COR-04** | `/settings/roles` | RBAC & Permissions Matrix | HQ / School Admin | Displays granular module permissions, active user counts |
| **SCR-COR-05** | `/settings/audit-logs` | Security & Compliance Audit Log | Compliance Officer | Immutable log of user actions, timestamps, IP addresses |

---

## 3. Student & Guardian Information Screens (SIS)

| Screen ID | Route | Screen Name | Roles | 5 Questions Answered |
|---|---|---|---|---|
| **SCR-SIS-01** | `/students` | Student Master Directory | Admin, Principal, Teacher | Filterable table by grade, section, status; batch actions |
| **SCR-SIS-02** | `/students/new` | Multi-Step Admission & Enrollment | Admissions, Admin | Step 1: Bio, Step 2: Parents, Step 3: Academics, Step 4: Docs |
| **SCR-SIS-03** | `/students/[id]` | Student 360 Profile | Admin, Principal, Teacher | 360 overview: Academics, Attendance %, Fee balance, Guardian |
| **SCR-SIS-04** | `/students/[id]/documents`| Student Document Vault | Admin, Compliance | Birth cert, Aadhaar, previous marksheets, medical record |
| **SCR-SIS-05** | `/students/tc-generator`| Transfer Certificate (TC) Engine | Principal, Admin | TC generation, clearance checklist, auto-serial numbering |

---

## 4. Academic & Classroom Screens

| Screen ID | Route | Screen Name | Roles | 5 Questions Answered |
|---|---|---|---|---|
| **SCR-ACA-01** | `/academics/attendance` | Classroom Attendance Grid | Teacher, HOD | Grid of student photos, toggle attendance, submit in <45s |
| **SCR-ACA-02** | `/academics/timetable` | Master Timetable & Substitutions | Principal, HOD, Teacher| Dynamic weekly grid, detects teacher conflicts, substitute matrix |
| **SCR-ACA-03** | `/academics/gradebook` | Marks Entry & Assessment Sheet | Subject Teacher, HOD | Spreadsheet-like fast input, autosave, max-mark validation |
| **SCR-ACA-04** | `/academics/lesson-plans`| Lesson Plans & Curriculum Pacing| Teacher, HOD | Weekly milestones, syllabus progress %, resource attachment |
| **SCR-ACA-05** | `/academics/report-cards`| Report Card Designer & Publisher| Principal, Exam Head | CBSE/ICSE format selector, principal signature, PDF batch emit |

---

## 5. Finance & Fee Operations Screens

| Screen ID | Route | Screen Name | Roles | 5 Questions Answered |
|---|---|---|---|---|
| **SCR-FIN-01** | `/finance/counter` | Fast Fee Collection POS Desk | Cashier, Accounts Head | Instant student lookup, dynamic UPI QR display, receipt print |
| **SCR-FIN-02** | `/finance/invoices` | Student Invoices & Billing | Finance Manager | Bulk invoice generation, status filters (Paid, Partial, Overdue) |
| **SCR-FIN-03** | `/finance/structures`| Fee Master Structures & Categories| Finance Head | Tuition, transport, lab, admission fee components by grade |
| **SCR-FIN-04** | `/finance/defaulters`| Defaulters & Dunning Management | Accounts Head, Principal | Overdue aging brackets (30/60/90 days), automated WhatsApp notice |
| **SCR-FIN-05** | `/finance/royalties` | Franchise Royalty Settlements | HQ Finance, Franchisee | Gross revenue calculation, royalty %, payment reconciliation |

---

## 6. Staff & Human Resources Screens (HRMS)

| Screen ID | Route | Screen Name | Roles | 5 Questions Answered |
|---|---|---|---|---|
| **SCR-HR-01** | `/staff` | Employee Master Directory | HR Admin, Principal | Teaching and non-teaching staff, designations, biometric IDs |
| **SCR-HR-02** | `/staff/attendance` | Daily Staff Biometric & Leaves | HR Admin, Principal | Biometric machine sync log, manual override, on-duty approval |
| **SCR-HR-03** | `/staff/leaves` | Leave Applications & Approvals | All Staff / Managers | Leave balance breakdown, application form, one-click approval |
| **SCR-HR-04** | `/staff/payroll` | Monthly Salary & Pay Slip Engine | HR / Finance | Attendance calculation, PF/ESI deductions, payslip PDF emit |

---

## 7. Parent & Student Mobile Portals

| Screen ID | Route | Screen Name | Roles | 5 Questions Answered |
|---|---|---|---|---|
| **SCR-PAR-01** | `/portal/home` | Parent Child Dashboard | Parent, Guardian | Multi-child switcher, today's schedule, fee alert, bus tracker |
| **SCR-PAR-02** | `/portal/fees` | One-Click UPI Fee Payment | Parent | Outstanding fees, breakdown, direct UPI pay button, receipt history |
| **SCR-PAR-03** | `/portal/bus` | Live School Bus GPS Tracker | Parent | Real-time map, driver contact, ETA, delay notifications |
| **SCR-PAR-04** | `/portal/diary` | Digital School Diary & Homework | Parent, Student | Daily teacher notes, homework assignments, submission status |
| **SCR-PAR-05** | `/portal/results` | Digital Progress & Report Cards | Parent, Student | Term-wise visual charts, teacher remarks, download official PDF |
