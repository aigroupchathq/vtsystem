# 05 — Constraints & Data Integrity: VEDIC TREE OS

## 1. Relational Integrity Architecture

Data corruption or duplicate records in an education OS (duplicate admission numbers, duplicate fee receipts, overlapping timetables) cause massive operational panic. Integrity is enforced via strict database-level constraints.

---

## 2. Key Unique & Foreign Key Constraints

### 2.1 Multi-Tenant Unique Constraints (Compound Keys)
- **Admission Number**: Must be unique globally or within the school:
  `ALTER TABLE students ADD CONSTRAINT uq_student_admission_no UNIQUE (admission_number);`
- **Employee Code**: Must be unique across the organization:
  `ALTER TABLE employees ADD CONSTRAINT uq_employee_code UNIQUE (organization_id, employee_code);`
- **Roll Number per Division**: Only one student can hold Roll No 12 in Division 6-A for Academic Year 2026-27:
  `ALTER TABLE enrollments ADD CONSTRAINT uq_enrollment_roll UNIQUE (division_id, academic_year_id, roll_number);`
- **One Attendance Record per Student per Day**:
  `ALTER TABLE attendances ADD CONSTRAINT uq_student_daily_attendance UNIQUE (student_id, date);`
- **One Exam Result per Student per Assessment**:
  `ALTER TABLE results ADD CONSTRAINT uq_assessment_student_result UNIQUE (assessment_id, student_id);`
- **Unique Receipt Number**:
  `ALTER TABLE receipts ADD CONSTRAINT uq_receipt_number UNIQUE (receipt_number);`

---

## 3. CHECK Constraints & Data Domain Rules

```sql
-- 1. Financial Amounts Non-Negative
ALTER TABLE invoices ADD CONSTRAINT chk_invoice_positive_amounts 
  CHECK (subtotal >= 0 AND total_due >= 0 AND discount_amount >= 0 AND late_fee >= 0);

ALTER TABLE payments ADD CONSTRAINT chk_payment_amount_positive 
  CHECK (amount > 0);

-- 2. Date Sequence Constraints
ALTER TABLE academic_years ADD CONSTRAINT chk_academic_year_dates 
  CHECK (end_date > start_date);

ALTER TABLE leaves ADD CONSTRAINT chk_leave_dates 
  CHECK (end_date >= start_date);

-- 3. Marks Boundary Constraints
ALTER TABLE assessments ADD CONSTRAINT chk_assessment_marks 
  CHECK (max_marks > 0 AND passing_marks <= max_marks);

ALTER TABLE results ADD CONSTRAINT chk_result_marks_bound 
  CHECK (marks_obtained >= 0);
```

---

## 4. Foreign Key Cascade Rules

- **Strict Restrict on Core Master Entities**: Deleting an `organization`, `school`, or `campus` CANNOT cascade delete students or financial invoices. Foreign keys use `ON DELETE RESTRICT`.
- **Cascade on Dependent Child Records**: Deleting a draft `assessment` cascades to delete unsaved draft `results` (`ON DELETE CASCADE`).
