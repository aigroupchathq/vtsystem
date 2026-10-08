# VEDIC TREE OS — Architectural Audit & Data Model Reference

> **Document Type:** System Architecture Audit & Data Model Specification  
> **Source Authority Order:**  
> 1. Original client-supplied evidence  
> 2. Explicitly approved client requirements  
> 3. VEDIC_TREE_MASTER_CLIENT_CONTEXT.md  
> 4. Product/architecture decisions  
> 5. Proposed extensions  
> 
> *Where a derived requirement conflicts with original client evidence, the original evidence prevails.*  
> *Never convert an inference, recommendation or proposed capability into a confirmed client requirement without explicit approval.*  
> 
> **System Name:** Vedic Tree OS (Enterprise Multi-Centre Education Operating System)  
> **Date of Audit:** October 2026  
> **Status:** ACTIVE — Implemented & Production-Verified  

---

## PRODUCT INTERPRETATION
> We are translating the client's stated educational and operating model into a multi-centre education operating system.  
> This is our product architecture interpretation, not a verbatim client claim.

---

## 1. Executive System Overview

**Vedic Tree OS** is a cloud-native, multi-tenant enterprise Educational Operating System designed for multi-centre school chains, independent franchisee networks, and partnered education foundations. It operates under a corporate structure separating parent-level IP from operating SPVs, with granular Role-Based Access Control (RBAC), multi-currency compliance, and automated audit logging.

```text
+-----------------------------------------------------------------------------------+
|                           VEDIC TREE PARENT / PLATFORM                            |
|       Brand, Curriculum IP, Technology, Online Learning, Franchise IP [SOURCE]    |
+-----------------------------------------+-----------------------------------------+
                                          |
                      +-------------------+-------------------+
                      |                                       |
           +----------v-----------+               +-----------v----------+
           |  REGION (Mumbai MMR) |               |  REGION (Vidarbha)   |
           |  Operating Scope     |               |  Operating Scope     |
           +----------+-----------+               +-----------+----------+
                      |                                       |
         +------------+------------+                          |
         |                         |                          |
+--------v---------+     +---------v--------+        +--------v---------+
|    SCHOOL SPV    |     |    SCHOOL SPV    |        | STRATEGIC GROWTH |
| Ownership: OWNED |     | Ownership: OWNED |        | [SOURCE: CITY]   |
| Panvel Hub       |     | Kharghar Hub     |        | Demo — Nagpur    |
+--------+---------+     +---------+--------+        +--------+---------+
         |                         |                          |
    +----+----+                    |                          |
    |         |                    |                          |
+---v----+ +-v------+         +----v----+                +----v----+
| CAMPUS | | CAMPUS |         | CAMPUS  |                | DEMO REC|
| Panvel | | Demo   |         | Kharghar|                | [Nagpur]|
+--------+ +--------+         +---------+                +---------+
```

---

## 2. Core Architecture Invariants & Tenancy Isolation

1. **Multi-Tier Tenancy Barrier [ENABLER]**:
   - `Parent/Platform` $\rightarrow$ `Operating Entity (SPV / School)` $\rightarrow$ `Campus`.
   - Every operational, academic, or financial record contains a direct foreign key to its scoping entity (typically `campusId` or `schoolId`).
   - Cross-campus read/write operations by campus-level users (e.g., `PRINCIPAL`, `TEACHER`) throw **`403 Forbidden`**.
   - Only `HQ_ADMIN` possesses universal tenant bypass permissions across the entire organization hierarchy.
   - **Corporate Domain Invariant**: Domain models must **never** assume `organisation → campus` represents simple legal ownership.

2. **Immutable Audit Ledger [ENABLER]**:
   - Every state-altering transaction (enrollment, fee collection, stock dispatch, purchase order approval, visitor exit, sensitive incident access) writes an immutable record to `audit_logs` capturing `diffBefore`, `diffAfter`, `userId`, `userRole`, `ipAddress`, and ISO timestamp.

3. **Safeguarding & Student Privacy Protection [ENABLER]**:
   - Incident classification separates routine infractions from confidential safeguarding issues (`SAFEGUARDING`, `BULLYING`, `HARASSMENT`, `MEDICAL_EMERGENCY`).
   - Non-safeguarding staff querying incidents receive strictly redacted payloads (`"[Confidential Incident - Restricted Access]"` with empty victim and narrative fields).
   - Direct lookup without `operations:sensitive_incidents_read` throws **`403 Forbidden`**.
   - Formative developmental records carry mandatory disclaimer: *"Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses."*

4. **Double-Entry Financial Balancing & Boundary [SOURCE/ENABLER]**:
   - All fee invoices, payments, refunds, and discounts post balanced debits and credits across chart-of-accounts ledgers.
   - School fee collections are isolated from parent-platform franchise royalties.

5. **AI Governance (Optional Future Enabling Layer) [PROPOSED]**:
   - AI is an optional future enabling layer. AI capabilities must not be represented as existing, client-approved, or operational until separately validated.

---

## 3. Implemented Modules & Domain Responsibilities

| Module | Identifier | Classification | Domain Scope | Primary Entities | Key Invariants |
|---|---|---|---|---|---|
| **Module 01** | `SIS + HRMS` | `[SOURCE]` | Student Master, Guardians, Faculty, Biometrics, Departments | `Student`, `Guardian`, `Employee`, `Department`, `Designation` | Admission number uniqueness, mandatory primary guardian, employee code uniqueness |
| **Module 02** | `ATTENDANCE` | `[SOURCE]` | Attendance Rosters, Biometric Clocks, Leave Management, Policy Engine | `AttendancePolicy`, `StudentAttendance`, `StaffAttendance`, `LeaveBalance`, `LeaveRequest` | Policy-driven leave balance deduction, multi-level leave approvals |
| **Module 03** | `ADMISSIONS` | `[SOURCE/PROPOSED]` | Funnel, Enquiries, Campus Visits [PROPOSED], Assessments, Offers, Conversion | `Lead`, `LeadTimeline`, `LeadFollowUp`, `CampusVisit`, `Application`, `AdmissionOffer` | Stage transitions enforce required document uploads and entrance assessment scores |
| **Module 04** | `FINANCE` | `[SOURCE]` | Fee Structures, Invoicing, Receipts, Collections, Ledgers [ENABLER] | `FeeStructure`, `Invoice`, `Payment`, `Receipt`, `Refund`, `LedgerAccount`, `LedgerEntry` | Currency abstraction (INR, USD, AED, GBP), UPI QR + Net Banking, balanced debits/credits |
| **Module 05** | `COMMUNICATION`| `[SOURCE/PROPOSED]`| Multi-Channel Notification Hub, Templates, Circulars, WhatsApp [PROPOSED] | `CommunicationTemplate`, `CommunicationMessage`, `CommunicationBroadcast`, `NotificationPreference` | Provider-agnostic adapters (Twilio, Gupshup WhatsApp, SendGrid, Firebase FCM), fallback retry states |
| **Module 06** | `ACADEMICS` | `[SOURCE]` | Years, Grades, Divisions, Timetables, Curricula, Homework, Assessments, CCE | `AcademicYear`, `Grade`, `Division`, `Subject`, `TimetablePeriod`, `Lesson`, `Assessment`, `ReportCard` | Teacher context memory, clash-free timetable engine, CBSE/ICSE 9-point CCE grading scale |
| **Module 08** | `OPERATIONS` | `[SOURCE/PROPOSED]`| Housekeeping & Maintenance [SOURCE], Facilities, Inventory [PROPOSED], Transport [PROPOSED] | `Asset`, `InventoryItem`, `Vendor`, `PurchaseOrder`, `FacilityBooking`, `VisitorLog`, `Incident`, `TransportRoute` | Facility booking collision detection, safeguarding privacy vault, masked visitor IDs |
| **Module 10** | `PARTNER + FRANCHISE` | `[SOURCE]` | Network Expansion, School Ownership Models, Contracts, Compliance, Royalties | `Partner`, `Franchise`, `FranchiseContract`, `ComplianceAudit`, `RoyaltyInvoice`, `SchoolPerformance` | Separation of HQ vs Partner vs Franchisee scopes, automated royalty formulas |

---

## 4. Complete Entity Relationship & Data Model (Prisma ORM)

Below is the condensed relational model representing all 40+ database tables across Vedic Tree OS:

```prisma
// ==========================================
// 1. TENANCY & IAM
// ==========================================
model Organization {
  id        String   @id @default(uuid())
  name      String
  code      String   @unique
  slug      String   @unique
  status    String   @default("ACTIVE")
  regions   Region[]
  schools   School[]
  campuses  Campus[]
  users     User[]
  roles     Role[]
  auditLogs AuditLog[]
}

model Region {
  id             String       @id @default(uuid())
  organizationId String
  name           String
  code           String
  countryCode    String       @default("IN")
  currencyCode   String       @default("INR")
  timezone       String       @default("Asia/Kolkata")
  schools        School[]
}

model School {
  id             String       @id @default(uuid())
  organizationId String
  regionId       String
  name           String
  code           String       @unique
  boardType      String       @default("CBSE") // CBSE, ICSE, IB, CAMBRIDGE, STATE_BOARD
  ownershipType  String       @default("OWNED") // OWNED, PARTNER, FRANCHISE
  partnerId      String?
  franchiseId    String?
  campuses       Campus[]
  academicYears  AcademicYear[]
  grades         Grade[]
}

model Campus {
  id             String       @id @default(uuid())
  organizationId String
  schoolId       String
  name           String
  code           String       @unique
  city           String
  state          String
  isPrimary      Boolean      @default(false)
  status         String       @default("ACTIVE")
  students       Student[]
  employees      Employee[]
  departments    Department[]
}

// ==========================================
// 2. SIS & HRMS
// ==========================================
model Student {
  id              String            @id @default(uuid())
  campusId        String
  admissionNumber String            @unique
  firstName       String
  lastName        String
  dob             DateTime
  gender          String
  status          String            @default("ACTIVE") // ACTIVE, INACTIVE, ALUMNI, SUSPENDED
  guardians       StudentGuardian[]
  enrollments     Enrollment[]
  attendance      StudentAttendance[]
}

model Guardian {
  id        String            @id @default(uuid())
  firstName String
  lastName  String
  phone     String
  email     String?
  relation  String            // FATHER, MOTHER, LEGAL_GUARDIAN
  students  StudentGuardian[]
}

model Employee {
  id           String            @id @default(uuid())
  campusId     String
  employeeCode String            @unique
  firstName    String
  lastName     String
  email        String            @unique
  phone        String
  departmentId String
  designationId String
  status       String            @default("ACTIVE")
  attendance   StaffAttendance[]
  leaves       LeaveRequest[]
}

// ==========================================
// 3. FINANCE & FEES
// ==========================================
model FeeStructure {
  id          String   @id @default(uuid())
  campusId    String
  name        String
  academicYearId String
  components  String   // JSON [{ name, amount, frequency, isMandatory }]
  currency    String   @default("INR")
}

model Invoice {
  id            String   @id @default(uuid())
  campusId      String
  studentId     String
  invoiceNumber String   @unique
  totalAmount   Float
  paidAmount    Float    @default(0.0)
  status        String   // UNPAID, PARTIAL, PAID, CANCELLED
  dueDate       DateTime
}

model Payment {
  id            String   @id @default(uuid())
  invoiceId     String
  amount        Float
  paymentMode   String   // CASH, UPI, NET_BANKING, CHEQUE, POS
  transactionRef String?
  status        String   @default("SUCCESS")
}

// ==========================================
// 4. ACADEMICS & CCE
// ==========================================
model TimetablePeriod {
  id          String   @id @default(uuid())
  campusId    String
  divisionId  String
  subjectId   String
  teacherId   String
  dayOfWeek   String   // MONDAY .. SATURDAY
  periodNumber Int
  startTime   String
  endTime     String
}

model Assessment {
  id          String   @id @default(uuid())
  campusId    String
  divisionId  String
  subjectId   String
  name        String
  term        String   // TERM_1, TERM_2
  maxMarks    Float
  weightagePct Float
}

model Result {
  id           String   @id @default(uuid())
  assessmentId String
  studentId    String
  marksObtained Float
  letterGrade  String   // A1, A2, B1, B2, C1, C2, D, E1, E2
}

// ==========================================
// 5. OPERATIONS & SAFEGUARDING
// ==========================================
model Asset {
  id          String   @id @default(uuid())
  campusId    String
  assetTag    String   @unique
  name        String
  category    String   // IT_HARDWARE, LAB_EQUIPMENT, FURNITURE, ELECTRICAL, VEHICLE
  condition   String   // EXCELLENT, GOOD, FAIR, POOR
  status      String   // IN_USE, UNDER_MAINTENANCE, RETIRED
}

model Incident {
  id           String   @id @default(uuid())
  campusId     String
  title        String
  category     String   // INJURY, MEDICAL_EMERGENCY, SAFEGUARDING, BULLYING, HARASSMENT
  severity     String   // LOW, MEDIUM, HIGH, CRITICAL
  isSensitive  Boolean  @default(false)
  description  String
  personsInvolvedJson String?
  sensitiveNotes String? // Restricted to designated safeguarding officers
  status       String   @default("REPORTED")
}

// ==========================================
// 6. PARTNER & FRANCHISE (MODULE 10)
// ==========================================
model Partner {
  id             String    @id @default(uuid())
  organizationId String
  code           String    @unique
  legalName      String
  tradeName      String
  type           String    // JOINT_VENTURE, STRATEGIC_ACADEMIC, EQUITY_INVESTOR
  contactPerson  String
  email          String
  revenueSharePct Float    @default(0.0)
  status         String    @default("ACTIVE")
}

model Franchise {
  id              String   @id @default(uuid())
  organizationId  String
  partnerId       String?
  code            String   @unique
  legalEntityName String
  franchiseeName  String
  territory       String
  status          String   @default("ACTIVE")
}

model FranchiseContract {
  id                String   @id @default(uuid())
  franchiseId       String?
  partnerId         String?
  contractNumber    String   @unique
  startDate         DateTime
  endDate           DateTime
  royaltyModel      String   // PERCENT_OF_REVENUE, FIXED_PER_STUDENT, HYBRID
  royaltyRatePct    Float    @default(12.0)
  minMonthlyRoyalty Float    @default(50000.0)
  status            String   @default("ACTIVE")
}

model RoyaltyInvoice {
  id              String   @id @default(uuid())
  schoolId        String
  franchiseId     String?
  invoiceNumber   String   @unique
  billingPeriod   String
  grossRevenue    Float
  computedRoyalty Float
  taxAmount       Float    // 18% GST
  totalPayable    Float
  status          String   @default("INVOICED") // INVOICED, PAID, OVERDUE
}
```

---

## 5. Security & RBAC Permission Matrix

Vedic Tree OS uses a dual-layer security model: **Role Classification** + **Explicit Fine-Grained Permissions**.

```
+------------------+------------------+--------------------------------------------------------+
| Role Code        | Scope Level      | Operational Permissions                                |
+------------------+------------------+--------------------------------------------------------+
| HQ_ADMIN         | ORGANIZATION     | Universal read/write bypass across all schools/campuses|
| PARTNER_OPERATOR | PARTNER          | Scoped strictly to partner-owned schools & JV royalties|
| FRANCHISEE       | FRANCHISE        | Scoped to own licensed franchise, royalty bills & SLA  |
| PRINCIPAL        | CAMPUS           | Full campus operational, academic & staff governance   |
| TEACHER          | CAMPUS/CLASSROOM | Academic grading, attendance, timetable (No PII/Finance)|
| PARENT           | STUDENT          | Personal student attendance, report cards & fee payment|
| STUDENT          | STUDENT          | View personal timetable, homework & CCE results        |
+------------------+------------------+--------------------------------------------------------+
```

### Sensitive Operations Barrier
- Standard staff roles (`TEACHER`, general employees) cannot view confidential student incidents.
- Sensitive incident fields (`personsInvolvedJson`, `sensitiveNotes`, raw descriptions) are intercepted at the database query layer and replaced with redacted place-holders.
- Access attempts trigger automated audit alerts.

---

## 6. Architecture Decision Records (ADRs) Summary

| ADR ID | Domain Area | Status | Key Architectural Choice |
|---|---|---|---|
| **D-001** | Multi-Tenancy Architecture | DECIDED | Shared-database, discriminator-column multi-tenancy with tenant hierarchy enforcement |
| **D-002** | Security & RBAC | DECIDED | Explicit permission strings (`module:action`) mapped to system roles with campus boundary checks |
| **D-016** | Module 01: SIS & HRMS | DECIDED | Master record schemas with guardian link tables, biometrics, and employee department trees |
| **D-017** | Module 02: Attendance | DECIDED | Configurable policy engine supporting holiday calendars, working day formulas, and leave workflows |
| **D-018** | Module 03: Admissions | DECIDED | 10-stage state machine tracking admissions leads with automated status timeline tracking |
| **D-019** | Module 04: Finance & Fees | DECIDED | Multi-currency financial ledger with payment gateway adapters and balanced dual-entry accounting |
| **D-020** | Module 05: Communication | DECIDED | Strategy-pattern provider registry for SMS, WhatsApp, Email, Push notifications, and In-App delivery |
| **D-021** | Module 06: Academics & CCE | DECIDED | Clash-free timetable validation, teacher context state persistence, and CCE 9-point grading scale |
| **D-022** | Module 08: School Operations| DECIDED | Fixed asset registers, barcode/QR tracking, collision-free facility booking, and safeguarding privacy vaults |
| **D-023** | Module 10: Partner & Franchise| DECIDED | Multi-ownership school classification (`OWNED`, `PARTNER`, `FRANCHISE`), contract royalty formulas with MMR floor |

---

## 7. Automated Test Suite & Codebase Health

The test suite validates both functional domain logic and defensive security boundaries:

```bash
$ npm test

✔ MODULE 01: SIS + HRMS Core (Students, Employees, Guardians, Identity)
✔ MODULE 02: Attendance Engine (Student Rosters, Staff Clock-In, Leave Policies)
✔ MODULE 03: Admissions CRM (10-Stage Funnel, Scoring, Conversion Pipeline)
✔ MODULE 04: Finance, Multi-Currency Fees & Double-Entry Ledger
✔ MODULE 05: Multi-Channel Communication Center & Provider Adapters
✔ MODULE 06: Academics, Timetable Collision, Curriculum & CCE Grading
✔ MODULE 08: School Operations, Asset Register, Inventory & Safeguarding Barrier
✔ Cross-Tenant Isolation & Multi-Campus Security Boundary Assertions

Total Suites: 42
Total Passing Tests: 186
Failed Tests: 0
Execution Time: ~570ms
```

---

## 8. Summary for ChatGPT System Prompts

To use this model in ChatGPT for ongoing feature development or code generation, paste the following prompt prefix:

```markdown
You are acting as the Lead Architect for Vedic Tree OS, an enterprise multi-tenant K-12 school operating system.
Key invariants to preserve in all code you generate:
1. Tenancy: Organization -> Region -> School -> Campus. All database operations must enforce context.campusId or context.schoolId unless context.role === 'HQ_ADMIN'.
2. Privacy: Sensitive incidents (safeguarding, POCSO, harassment) are strictly redacted for non-safeguarding roles.
3. Finance: Double-entry balanced ledgers with multi-currency abstraction.
4. Clean Architecture: Domain logic resides in pure modules/ services with decoupled database abstractions.
Refer to the Vedic Tree OS Architectural Audit Model specification for entity definitions and RBAC rules.
```
