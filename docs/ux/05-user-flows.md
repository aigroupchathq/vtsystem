# 05 — Critical User Flows & State Machines: VEDIC TREE OS

## 1. Flow 1: Complete Admission Lifecycle Flow

From initial walk-in / online inquiry to enrolled student with generated invoice.

```mermaid
graph TD
    A[Inquiry Received: Walk-in / Web / WhatsApp] --> B[Admissions CRM: Lead Created]
    B --> C{Campus Tour Scheduled?}
    C -->|Yes| D[Campus Visit Completed]
    C -->|No| E[Follow-up Automation WhatsApp/SMS]
    E --> C
    D --> F[Formal Application Submitted + Docs Uploaded]
    F --> G[Entrance Assessment & Principal Interview]
    G --> H{Assessment Result}
    H -->|Rejected| I[Rejection Letter + Feedback Sent]
    H -->|Waitlisted| J[Waitlist Queue Management]
    H -->|Approved| K[Offer Letter & Fee Proforma Generated]
    K --> L[Parent Pays Admission / Seat Confirmation Fee]
    L --> M[System Transitions Lead to Student Record]
    M --> N[Prisma Transaction: Student, Guardian, Enrollment, Invoice Generated]
    N --> O[Welcome Kit & ERP Parent Credentials Auto-Dispatched]
```

---

## 2. Flow 2: Automated Fee Invoicing and Payment Flow

```mermaid
graph TD
    A[Term Fee Schedule Triggered by Academic Calendar] --> B[Batch Invoice Generation Worker]
    B --> C[Invoices Generated with Unique QR & Dynamic UPI Reference]
    C --> D[WhatsApp & Email Notification with One-Click Payment Link]
    D --> E{Parent Payment Channel}
    E -->|Online UPI/Card/Netbanking| F[Payment Gateway Webhook]
    E -->|Physical School Cashier Desk| G[Cashier POS: UPI Dynamic QR / Cash / Cheque]
    F --> H{Transaction Verification}
    G --> H
    H -->|Success| I[Generate Digital GST Compliant Receipt]
    I --> J[Update Student Outstanding Balance to ₹0]
    I --> K[Send WhatsApp Receipt PDF to Guardian]
    H -->|Failed / Bounced| L[Mark Invoice Unpaid & Trigger Retry Notification]
    D --> M{Due Date Exceeded?}
    M -->|Yes| N[Automated Late Fee Calculation & Escalation Notice]
```

---

## 3. Flow 3: Student Attendance & Parent Automated Alert Flow

```mermaid
graph TD
    A[Teacher Opens Period / Morning Attendance] --> B[Default: All Students Set to Present]
    B --> C[Teacher Toggles Absentees & Latecomers]
    C --> D[Review Summary: 38 Present, 2 Absent]
    D --> E[Teacher Clicks Submit Attendance]
    E --> F[Persist to Local DB & Push to API]
    F --> G{Background Dispatcher}
    G --> H[Check: Is Absence Approved Leave on File?]
    H -->|Yes| I[Mark Excused Absence - No SMS Alert]
    H -->|No| J[Mark Unexcused Absence]
    J --> K[Trigger Immediate WhatsApp/SMS to Guardian Phone]
    K --> L[Parent Receives Alert with Instant Acknowledgement / Reason Button]
```

---

## 4. Flow 4: Exam Marks Entry, Moderation & Report Card Publishing

```mermaid
graph TD
    A[HOD / Exam Controller Publishes Assessment Template] --> B[Subject Teacher Marks Entry Grid]
    B --> C[Teacher Enters Component Marks: Theory, Practical, Internal]
    C --> D[Automated Boundary Validation: Marks <= Max Marks]
    D --> E[Teacher Submits Marks to HOD for Moderation]
    E --> F{HOD Review}
    F -->|Revision Required| G[Returned to Teacher with In-line Feedback]
    G --> C
    F -->|Approved| H[Principal Digital Sign-off & Lock]
    H --> I[Automated Grading & Co-scholastic Aggregation Engine]
    I --> J[CBSE / ICSE / IB Compliant PDF Report Card Generation]
    J --> K[Scheduled Batch Publish to Parent & Student Portals]
```
