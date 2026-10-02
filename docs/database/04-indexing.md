# 04 — Indexing Strategy & Performance: VEDIC TREE OS

## 1. Indexing Strategy Principles

In a multi-tenant system:
1. **Tenant-Prefixed Composite Indexes**: High-volume queries filter by `campus_id` or `organization_id` first. Composite indexes should place the tenant column as the leading column: `(campus_id, status)`, `(campus_id, academic_year_id)`.
2. **Partial Indexes on Soft-Deletes**: Queries almost universally include `WHERE deleted_at IS NULL`. Partial indexes (`WHERE deleted_at IS NULL`) reduce index tree size by 40-70% and keep cache lines warm.
3. **Trigram Indexes for Name Search**: Indian student and guardian name searches utilize GIN trigram indexes (`pg_trgm`) for sub-10ms fuzzy matching.

---

## 2. Core Index Definitions by Table

```sql
-- 1. Students Table
CREATE INDEX idx_students_campus_status 
  ON students(campus_id, status) 
  WHERE deleted_at IS NULL;

CREATE INDEX idx_students_admission_no 
  ON students(admission_number);

CREATE INDEX idx_students_name_trgm 
  ON students USING GIN ((first_name || ' ' || last_name) gin_trgm_ops) 
  WHERE deleted_at IS NULL;

-- 2. Enrollments Table
CREATE INDEX idx_enrollments_lookup 
  ON enrollments(campus_id, academic_year_id, grade_id, division_id) 
  WHERE deleted_at IS NULL;

CREATE INDEX idx_enrollments_student 
  ON enrollments(student_id);

-- 3. Invoices Table
CREATE INDEX idx_invoices_campus_status_due 
  ON invoices(campus_id, status, due_date) 
  WHERE deleted_at IS NULL;

CREATE INDEX idx_invoices_student 
  ON invoices(student_id, status) 
  WHERE deleted_at IS NULL;

-- 4. Attendance Table
CREATE INDEX idx_attendance_division_date 
  ON attendances(division_id, date) 
  WHERE deleted_at IS NULL;

CREATE INDEX idx_attendance_student_date 
  ON attendances(student_id, date);

-- 5. Audit Log Table (Time-Series Append-Only)
CREATE INDEX idx_audit_logs_org_created 
  ON audit_logs(organization_id, created_at DESC);

CREATE INDEX idx_audit_logs_entity 
  ON audit_logs(entity_name, entity_id);
```
