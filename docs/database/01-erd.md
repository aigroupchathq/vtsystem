# 01 — Entity Relationship Diagram (ERD): VEDIC TREE OS

## 1. Domain Groupings & Architecture Overview

The VEDIC TREE OS database is structured into 8 cohesive domain boundaries centered around a multi-tier tenant model:
1. **Tenancy & IAM**: Organization, Region, School, Campus, User, Role, Permission, UserRole.
2. **Staff & HRMS**: Employee, Department, Designation, Leave, Policy.
3. **Student & Guardian SIS**: Student, Guardian, StudentGuardian, Enrollment, AcademicYear, Grade, Division.
4. **Academics & Timetables**: Subject, TeacherAssignment, Timetable, Attendance.
5. **Admissions CRM**: Lead, Application, CampusVisit, Workflow.
6. **Finance & Billing**: FeeStructure, Invoice, Payment, Receipt, Franchise, Contract, Royalty.
7. **Examinations & Progress**: Assessment, Result, ReportCard.
8. **Operations & Governance**: Event, Activity, Asset, Inventory, Maintenance, Communication, Notification, Partner, AuditLog.

---

## 2. Mermaid Entity Relationship Diagrams

### 2.1 Core Tenancy, IAM & HRMS Structure

```mermaid
erDiagram
    Organization ||--o{ Region : has
    Region ||--o{ School : contains
    School ||--o{ Campus : operates
    Campus ||--o{ User : registers
    User ||--o{ UserRole : assigns
    Role ||--o{ UserRole : grants
    Role ||--o{ RolePermission : contains
    Permission ||--o{ RolePermission : defines

    Campus ||--o{ Department : organizes
    Department ||--o{ Designation : defines
    Campus ||--o{ Employee : employs
    Designation ||--o{ Employee : classifies
    Employee ||--o{ Leave : requests
    User ||--o| Employee : links
```

### 2.2 Student Information System (SIS) & Academics

```mermaid
erDiagram
    Campus ||--o{ AcademicYear : conducts
    Campus ||--o{ Grade : offers
    Grade ||--o{ Division : sections
    Campus ||--o{ Student : enrolls
    Student ||--o{ StudentGuardian : connects
    Guardian ||--o{ StudentGuardian : represents
    Student ||--o{ Enrollment : tracks
    AcademicYear ||--o{ Enrollment : spans
    Division ||--o{ Enrollment : places

    Campus ||--o{ Subject : teaches
    Employee ||--o{ TeacherAssignment : assigns
    Division ||--o{ TeacherAssignment : receives
    Subject ||--o{ TeacherAssignment : covers
    TeacherAssignment ||--o{ Timetable : schedules
    Division ||--o{ Attendance : marks
    Student ||--o{ Attendance : logs
```

### 2.3 Admissions CRM, Finance & Examinations

```mermaid
erDiagram
    Campus ||--o{ Lead : captures
    Lead ||--o{ CampusVisit : schedules
    Lead ||--o| Application : submits
    Application ||--o| Student : converts_to

    Campus ||--o{ FeeStructure : configures
    Student ||--o{ Invoice : billed_to
    FeeStructure ||--o{ Invoice : applies
    Invoice ||--o{ Payment : receives
    Payment ||--o{ Receipt : generates
    School ||--o{ Franchise : licenses
    Franchise ||--o{ Contract : governs
    Franchise ||--o{ Royalty : owes

    Campus ||--o{ Assessment : schedules
    Assessment ||--o{ Result : evaluates
    Student ||--o{ Result : achieves
    Student ||--o{ ReportCard : receives
```

### 2.4 Logistics, Operations & Auditing

```mermaid
erDiagram
    Campus ||--o{ Asset : owns
    Asset ||--o{ Inventory : stocks
    Asset ||--o{ Maintenance : logs
    Campus ||--o{ Communication : broadcasts
    User ||--o{ Notification : receives
    Organization ||--o{ Partner : engages
    Organization ||--o{ AuditLog : records
```
