# 02 — Relational Schema Specification: VEDIC TREE OS

## 1. Schema Conventions & Standard Columns

Every table across VEDIC TREE OS implements standard operational columns:
- `id`: UUIDv4 Primary Key (`id UUID PRIMARY KEY DEFAULT gen_random_uuid()`).
- `organization_id`: UUID Foreign Key to Organization (top-level tenant boundary).
- `school_id`: UUID Nullable Foreign Key to School.
- `campus_id`: UUID Nullable Foreign Key to Campus (physical boundary).
- `created_at`: `TIMESTAMPTZ NOT NULL DEFAULT NOW()`.
- `updated_at`: `TIMESTAMPTZ NOT NULL DEFAULT NOW()`.
- `deleted_at`: `TIMESTAMPTZ NULL` (Soft-delete support; active rows have `deleted_at IS NULL`).
- `version`: `INT NOT NULL DEFAULT 1` (Optimistic concurrency locking).

---

## 2. Complete Entity Definitions (45 Entities)

### 2.1 Tenancy & IAM Entities

#### 1. `organizations`
- `id` (PK, UUID), `name` (VARCHAR 255), `code` (VARCHAR 50 UNIQUE), `slug` (VARCHAR 100 UNIQUE), `logo_url` (TEXT), `settings` (JSONB), `status` (ENUM: ACTIVE, SUSPENDED), `created_at`, `updated_at`, `deleted_at`.
- *Tenant Boundary*: Root. *Audit*: High.

#### 2. `regions`
- `id` (PK, UUID), `organization_id` (FK), `name` (VARCHAR 100), `code` (VARCHAR 50), `country_code` (CHAR 2), `currency_code` (CHAR 3), `timezone` (VARCHAR 50), `created_at`, `updated_at`, `deleted_at`.
- *Unique*: `(organization_id, code)`.

#### 3. `schools`
- `id` (PK, UUID), `organization_id` (FK), `region_id` (FK), `name` (VARCHAR 255), `code` (VARCHAR 50 UNIQUE), `affiliation_number` (VARCHAR 100), `board_type` (ENUM: CBSE, ICSE, IB, CAMBRIDGE, STATE_BOARD), `ownership_type` (ENUM: SELF_OWNED, FRANCHISE, PARTNERSHIP), `created_at`, `updated_at`, `deleted_at`.

#### 4. `campuses`
- `id` (PK, UUID), `organization_id` (FK), `school_id` (FK), `name` (VARCHAR 255), `code` (VARCHAR 50), `address_line1` (TEXT), `city` (VARCHAR 100), `state` (VARCHAR 100), `postal_code` (VARCHAR 20), `phone` (VARCHAR 20), `email` (VARCHAR 255), `is_primary` (BOOLEAN), `created_at`, `updated_at`, `deleted_at`.
- *Unique*: `(school_id, code)`.

#### 5. `users`
- `id` (PK, UUID), `organization_id` (FK), `email` (VARCHAR 255 UNIQUE), `phone` (VARCHAR 20 UNIQUE), `password_hash` (TEXT), `first_name` (VARCHAR 100), `last_name` (VARCHAR 100), `avatar_url` (TEXT), `status` (ENUM: ACTIVE, INVITED, SUSPENDED, ARCHIVED), `mfa_enabled` (BOOLEAN), `last_login_at` (TIMESTAMPTZ), `created_at`, `updated_at`, `deleted_at`.

#### 6. `roles`
- `id` (PK, UUID), `organization_id` (FK), `name` (VARCHAR 100), `code` (VARCHAR 50), `scope_level` (ENUM: ORGANIZATION, REGION, SCHOOL, CAMPUS), `is_system` (BOOLEAN), `created_at`, `updated_at`, `deleted_at`.
- *Unique*: `(organization_id, code)`.

#### 7. `permissions`
- `id` (PK, UUID), `code` (VARCHAR 100 UNIQUE), `module` (VARCHAR 50), `action` (VARCHAR 50), `description` (TEXT), `created_at`.

#### 8. `user_roles`
- `id` (PK, UUID), `user_id` (FK), `role_id` (FK), `campus_id` (FK NULL), `school_id` (FK NULL), `region_id` (FK NULL), `created_at`.
- *Unique*: `(user_id, role_id, COALESCE(campus_id, '00000000-0000-0000-0000-000000000000'))`.

---

### 2.2 Human Resources & Staff Entities

#### 9. `departments`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `name` (VARCHAR 100), `code` (VARCHAR 50), `created_at`, `updated_at`, `deleted_at`.

#### 10. `designations`
- `id` (PK, UUID), `organization_id` (FK), `department_id` (FK), `title` (VARCHAR 100), `code` (VARCHAR 50), `pay_grade` (VARCHAR 20), `created_at`, `updated_at`, `deleted_at`.

#### 11. `employees`
- `id` (PK, UUID), `organization_id` (FK), `school_id` (FK), `campus_id` (FK), `user_id` (FK UNIQUE), `department_id` (FK), `designation_id` (FK), `employee_code` (VARCHAR 50 UNIQUE), `date_of_joining` (DATE), `biometric_id` (VARCHAR 50), `aadhaar_last_four` (CHAR 4), `pan_number_masked` (VARCHAR 20), `status` (ENUM: ACTIVE, PROBATION, NOTICE_PERIOD, TERMINATED, RETIRED), `created_at`, `updated_at`, `deleted_at`.

#### 12. `leaves`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `employee_id` (FK), `leave_type` (ENUM: SICK, CASUAL, MATERNITY, EARNED, UNPAID), `start_date` (DATE), `end_date` (DATE), `total_days` (NUMERIC 4,1), `reason` (TEXT), `status` (ENUM: PENDING, APPROVED, REJECTED, CANCELLED), `approved_by_id` (FK User), `created_at`, `updated_at`, `deleted_at`.

#### 13. `policies`
- `id` (PK, UUID), `organization_id` (FK), `school_id` (FK NULL), `title` (VARCHAR 255), `policy_type` (ENUM: ACADEMIC, HR, ATTENDANCE, SAFETY, FEE), `content` (TEXT), `effective_from` (DATE), `is_active` (BOOLEAN), `created_at`, `updated_at`, `deleted_at`.

#### 14. `workflows`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `name` (VARCHAR 100), `trigger_event` (VARCHAR 100), `step_definitions` (JSONB), `is_enabled` (BOOLEAN), `created_at`, `updated_at`, `deleted_at`.

---

### 2.3 Student Information System (SIS) Entities

#### 15. `academic_years`
- `id` (PK, UUID), `organization_id` (FK), `school_id` (FK), `name` (VARCHAR 50), `code` (VARCHAR 50), `start_date` (DATE), `end_date` (DATE), `is_current` (BOOLEAN), `is_locked` (BOOLEAN), `created_at`, `updated_at`, `deleted_at`.
- *Unique*: `(school_id, code)`.

#### 16. `grades`
- `id` (PK, UUID), `organization_id` (FK), `school_id` (FK), `name` (VARCHAR 50), `level_order` (INT), `created_at`, `updated_at`, `deleted_at`.

#### 17. `divisions`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `grade_id` (FK), `name` (VARCHAR 50), `capacity` (INT), `room_number` (VARCHAR 50), `created_at`, `updated_at`, `deleted_at`.

#### 18. `students`
- `id` (PK, UUID), `organization_id` (FK), `school_id` (FK), `campus_id` (FK), `user_id` (FK NULL), `admission_number` (VARCHAR 50 UNIQUE), `first_name` (VARCHAR 100), `last_name` (VARCHAR 100), `dob` (DATE), `gender` (ENUM: MALE, FEMALE, OTHER), `blood_group` (VARCHAR 10), `aadhaar_last_four` (CHAR 4), `emergency_contact_phone` (VARCHAR 20), `status` (ENUM: ACTIVE, PROMOTED, TRANSFERRED, EXPELLED, ALUMNI), `created_at`, `updated_at`, `deleted_at`.

#### 19. `guardians`
- `id` (PK, UUID), `organization_id` (FK), `user_id` (FK NULL), `first_name` (VARCHAR 100), `last_name` (VARCHAR 100), `relation` (ENUM: FATHER, MOTHER, LEGAL_GUARDIAN), `phone` (VARCHAR 20), `email` (VARCHAR 255), `occupation` (VARCHAR 100), `annual_income_bracket` (VARCHAR 50), `created_at`, `updated_at`, `deleted_at`.

#### 20. `student_guardians`
- `id` (PK, UUID), `student_id` (FK), `guardian_id` (FK), `is_primary` (BOOLEAN), `is_authorized_pickup` (BOOLEAN), `created_at`.
- *Unique*: `(student_id, guardian_id)`.

#### 21. `enrollments`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `student_id` (FK), `academic_year_id` (FK), `grade_id` (FK), `division_id` (FK), `roll_number` (INT), `status` (ENUM: ENROLLED, COMPLETED, WITHDRAWN, TRANSFERRED), `created_at`, `updated_at`, `deleted_at`.
- *Unique*: `(division_id, academic_year_id, roll_number)`.

---

### 2.4 Academics & Timetable Entities

#### 22. `subjects`
- `id` (PK, UUID), `organization_id` (FK), `school_id` (FK), `name` (VARCHAR 100), `code` (VARCHAR 50), `is_elective` (BOOLEAN), `created_at`, `updated_at`, `deleted_at`.

#### 23. `teacher_assignments`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `employee_id` (FK), `subject_id` (FK), `division_id` (FK), `academic_year_id` (FK), `created_at`, `updated_at`, `deleted_at`.

#### 24. `timetables`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `division_id` (FK), `teacher_assignment_id` (FK), `day_of_week` (ENUM: MON, TUE, WED, THU, FRI, SAT, SUN), `period_number` (INT), `start_time` (TIME), `end_time` (TIME), `is_substitution` (BOOLEAN), `substitute_employee_id` (FK NULL), `created_at`, `updated_at`, `deleted_at`.

#### 25. `attendances`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `student_id` (FK), `division_id` (FK), `date` (DATE), `status` (ENUM: PRESENT, ABSENT, TARDY, HALF_DAY, EXCUSED), `remarks` (TEXT), `marked_by_id` (FK User), `created_at`, `updated_at`, `deleted_at`.
- *Unique*: `(student_id, date)`.

---

### 2.5 Admissions CRM Entities

#### 26. `leads`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `student_name` (VARCHAR 150), `guardian_name` (VARCHAR 150), `phone` (VARCHAR 20), `email` (VARCHAR 255), `target_grade` (VARCHAR 50), `lead_source` (ENUM: WALK_IN, WEBSITE, WHATSAPP, REFERRAL, EVENT), `stage` (ENUM: NEW, CONTACTED, VISIT_SCHEDULED, APPLIED, OFFERED, ENROLLED, LOST), `created_at`, `updated_at`, `deleted_at`.

#### 27. `applications`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `lead_id` (FK NULL), `application_number` (VARCHAR 50 UNIQUE), `academic_year_id` (FK), `grade_id` (FK), `submission_date` (DATE), `status` (ENUM: DRAFT, SUBMITTED, UNDER_REVIEW, SHORTLISTED, REJECTED, ACCEPTED), `created_at`, `updated_at`, `deleted_at`.

#### 28. `campus_visits`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `lead_id` (FK), `scheduled_at` (TIMESTAMPTZ), `assigned_staff_id` (FK Employee), `feedback` (TEXT), `status` (ENUM: SCHEDULED, COMPLETED, NO_SHOW, RESCHEDULED), `created_at`, `updated_at`, `deleted_at`.

#### 29. `admissions`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `application_id` (FK UNIQUE), `student_id` (FK UNIQUE), `admission_date` (DATE), `admission_fee_paid` (NUMERIC 12,2), `status` (ENUM: CONFIRMED, PROVISIONAL, CANCELLED), `created_at`, `updated_at`, `deleted_at`.

---

### 2.6 Finance & Franchise Entities

#### 30. `fee_structures`
- `id` (PK, UUID), `organization_id` (FK), `school_id` (FK), `campus_id` (FK NULL), `academic_year_id` (FK), `grade_id` (FK), `name` (VARCHAR 100), `total_amount` (NUMERIC 12,2), `frequency` (ENUM: ANNUAL, SEMESTER, QUARTERLY, MONTHLY), `created_at`, `updated_at`, `deleted_at`.

#### 31. `invoices`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `student_id` (FK), `fee_structure_id` (FK), `invoice_number` (VARCHAR 50 UNIQUE), `due_date` (DATE), `subtotal` (NUMERIC 12,2), `discount_amount` (NUMERIC 12,2), `late_fee` (NUMERIC 12,2), `total_due` (NUMERIC 12,2), `status` (ENUM: UNPAID, PARTIALLY_PAID, PAID, OVERDUE, VOID), `created_at`, `updated_at`, `deleted_at`.

#### 32. `payments`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `invoice_id` (FK), `transaction_reference` (VARCHAR 100 UNIQUE), `amount` (NUMERIC 12,2), `payment_method` (ENUM: UPI, NETBANKING, CARD, CASH, CHEQUE, DD), `gateway_provider` (VARCHAR 50), `status` (ENUM: INITIATED, SUCCESS, FAILED, REFUNDED), `created_at`, `updated_at`.

#### 33. `receipts`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `payment_id` (FK UNIQUE), `receipt_number` (VARCHAR 50 UNIQUE), `issued_at` (TIMESTAMPTZ), `tax_invoice_url` (TEXT), `collected_by_id` (FK User), `created_at`.

#### 34. `franchises`
- `id` (PK, UUID), `organization_id` (FK), `school_id` (FK UNIQUE), `owner_name` (VARCHAR 255), `entity_name` (VARCHAR 255), `gstin` (VARCHAR 20), `status` (ENUM: ACTIVE, PROBATION, TERMINATED), `created_at`, `updated_at`, `deleted_at`.

#### 35. `contracts`
- `id` (PK, UUID), `organization_id` (FK), `franchise_id` (FK), `contract_number` (VARCHAR 50 UNIQUE), `start_date` (DATE), `end_date` (DATE), `royalty_percentage` (NUMERIC 5,2), `min_annual_guarantee` (NUMERIC 14,2), `status` (ENUM: ACTIVE, EXPIRED, TERMINATED), `created_at`, `updated_at`, `deleted_at`.

#### 36. `royalties`
- `id` (PK, UUID), `organization_id` (FK), `franchise_id` (FK), `billing_period_start` (DATE), `billing_period_end` (DATE), `gross_collected` (NUMERIC 14,2), `royalty_due` (NUMERIC 14,2), `status` (ENUM: INVOICED, PAID, OVERDUE, DISPUTED), `created_at`, `updated_at`, `deleted_at`.

---

### 2.7 Examinations & Progress Entities

#### 37. `assessments`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `academic_year_id` (FK), `grade_id` (FK), `subject_id` (FK), `title` (VARCHAR 150), `assessment_type` (ENUM: FORMATIVE, SUMMATIVE, PERIODIC_TEST, HALF_YEARLY, ANNUAL), `max_marks` (NUMERIC 5,2), `passing_marks` (NUMERIC 5,2), `date` (DATE), `created_at`, `updated_at`, `deleted_at`.

#### 38. `results`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `assessment_id` (FK), `student_id` (FK), `marks_obtained` (NUMERIC 5,2), `grade_letter` (VARCHAR 5), `remarks` (TEXT), `is_absent` (BOOLEAN), `created_at`, `updated_at`, `deleted_at`.
- *Unique*: `(assessment_id, student_id)`.

#### 39. `report_cards`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `student_id` (FK), `academic_year_id` (FK), `term` (VARCHAR 50), `summary_json` (JSONB), `pdf_url` (TEXT), `published_at` (TIMESTAMPTZ NULL), `principal_signed_by_id` (FK User NULL), `created_at`, `updated_at`, `deleted_at`.

---

### 2.8 Logistics, Assets, Events & Auditing Entities

#### 40. `assets`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `name` (VARCHAR 255), `asset_tag` (VARCHAR 100 UNIQUE), `category` (ENUM: LAB_EQUIPMENT, FURNITURE, IT, SPORTS, VEHICLE), `purchase_date` (DATE), `purchase_cost` (NUMERIC 12,2), `status` (ENUM: OPERATIONAL, UNDER_MAINTENANCE, RETIRED), `created_at`, `updated_at`, `deleted_at`.

#### 41. `inventories`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `item_name` (VARCHAR 255), `sku` (VARCHAR 100 UNIQUE), `quantity_on_hand` (INT), `reorder_threshold` (INT), `unit_price` (NUMERIC 10,2), `created_at`, `updated_at`, `deleted_at`.

#### 42. `maintenances`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `asset_id` (FK), `issue_description` (TEXT), `scheduled_date` (DATE), `cost` (NUMERIC 10,2), `status` (ENUM: REPORTED, IN_PROGRESS, RESOLVED), `created_at`, `updated_at`, `deleted_at`.

#### 43. `events` & `activities`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `title` (VARCHAR 255), `description` (TEXT), `start_time` (TIMESTAMPTZ), `end_time` (TIMESTAMPTZ), `target_audience` (ENUM: ALL, STUDENTS, PARENTS, STAFF), `created_at`, `updated_at`, `deleted_at`.

#### 44. `communications` & `notifications`
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK), `sender_id` (FK User), `channel` (ENUM: WHATSAPP, SMS, PUSH, EMAIL), `template_name` (VARCHAR 100), `payload` (JSONB), `status` (ENUM: QUEUED, SENT, DELIVERED, FAILED), `created_at`.

#### 45. `partners`
- `id` (PK, UUID), `organization_id` (FK), `name` (VARCHAR 255), `partner_type` (ENUM: TRANSPORT_VENDOR, CATERING, UNIFORMS, BOOKS, TECHNOLOGY), `contact_email` (VARCHAR 255), `contact_phone` (VARCHAR 20), `status` (ENUM: ACTIVE, INACTIVE), `created_at`, `updated_at`, `deleted_at`.

#### 46. `audit_logs` (Append-Only Immutable Ledger)
- `id` (PK, UUID), `organization_id` (FK), `campus_id` (FK NULL), `user_id` (FK NULL), `action` (VARCHAR 50), `entity_name` (VARCHAR 100), `entity_id` (UUID), `diff_before` (JSONB NULL), `diff_after` (JSONB NULL), `ip_address` (INET), `user_agent` (TEXT), `created_at` (TIMESTAMPTZ DEFAULT NOW()).
- *Policy*: NO `updated_at`, NO `deleted_at`. Strictly immutable.
