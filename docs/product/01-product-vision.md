# 01 — Product Vision & Architecture: VEDIC TREE OS

## 1. Product Positioning

**VEDIC TREE OS** is an India-first, internationally scalable Education Operating System for Vedic Tree.

It unifies:
- **Education OS** (Central operating core)
- **School ERP** (Operational & campus management)
- **Admissions CRM** (Inquiry to enrollment funnel)
- **Student Information System (SIS)** (360-degree student & guardian lifecycle)
- **Academic Platform** (Curriculum, timetable, lesson planning, CBSE/ICSE/IB report cards)
- **Parent Platform** (Real-time bus tracking, UPI payments, circulars, digital diary)
- **Teacher Platform** (Sub-60s attendance, marks entry, substitution manager)
- **HRMS & Payroll** (Biometric sync, leave tracking, staff appraisals)
- **Finance & Accounting** (Fee counter POS, dynamic UPI QR, dunning automation, franchise royalties)
- **Franchise Management** (Multi-campus P&L, contract compliance, royalty settlement)

---

## 2. Multi-Tier Governance Model

```
Vedic Tree Headquarters (HQ)
   └── Regions (North, West, South, East, International)
         └── Schools (Self-Owned, Franchise, Partnership)
               └── Campuses (Physical operational sites)
                     ├── Principals & Vice Principals
                     ├── Heads of Department (HODs)
                     ├── Teachers & Academic Staff
                     ├── Administrative & HR Teams
                     ├── Finance & Fee Cashiers
                     ├── Students & Guardians
                     └── Franchise Owners & Logistics Partners
```

---

## 3. Core Phasing Roadmap

1. **Phase 1: Platform Foundation**: Multi-tenant repo, IAM, RBAC, tenant switching, PostgreSQL RLS, audit logs.
2. **Phase 2: Core SIS & HRMS (Module 01)**: Student, Guardian, Enrollment, Employee, Department, Designation.
3. **Phase 3: Academic Lifecycle**: Classrooms, Timetables, Attendance, Gradebooks, CBSE/ICSE Report Cards.
4. **Phase 4: Fee & Billing Engine**: Fee structures, Cashier POS, Dynamic UPI QR, Dunning, Franchise Royalties.
5. **Phase 5: Admissions CRM**: Leads, Campus Visits, Application Review, Automated Onboarding.
6. **Phase 6: Portals & Mobile Experience**: Parent Portal, Teacher Mobile Cockpit, Live Bus GPS Tracking.
