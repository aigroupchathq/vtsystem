# 06 — Audit Trail & Event Logging: VEDIC TREE OS

## 1. Compliance Mandates

Under Indian Data Protection (DPDP Act 2023) and international education regulatory standards (FERPA / GDPR), all access and modifications to student records, marks, and financial transactions require **immutable, non-repudiable audit logging**.

---

## 2. Audit Table Schema & Immutability Guarantees

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  campus_id UUID REFERENCES campuses(id) ON DELETE RESTRICT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_role VARCHAR(100) NOT NULL,
  action VARCHAR(50) NOT NULL,            -- 'INSERT', 'UPDATE', 'DELETE', 'VIEW_SENSITIVE'
  entity_name VARCHAR(100) NOT NULL,      -- 'Student', 'Invoice', 'Result', 'Leave'
  entity_id UUID NOT NULL,
  diff_before JSONB NULL,                 -- Full JSON snapshot prior to edit
  diff_after JSONB NULL,                  -- Full JSON snapshot after edit
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Deny UPDATE and DELETE on audit_logs table via PostgreSQL Trigger or Rule
CREATE RULE audit_logs_no_update AS ON UPDATE TO audit_logs DO INSTEAD NOTHING;
CREATE RULE audit_logs_no_delete AS ON DELETE TO audit_logs DO INSTEAD NOTHING;
```

---

## 3. Automated Auditing via Prisma Middleware & Database Triggers

1. **Prisma Middleware**: Automatically captures `userId`, `tenantId`, and `action` from the AsyncLocalStorage request context and writes to `audit_logs` inside the same database transaction.
2. **Critical Financial Triggers**: In addition to application middleware, database-level triggers on `payments` and `receipts` ensure that even manual DBA queries generate audit entries.
