# 03 — Multi-Tenancy Architecture & Row Level Security: VEDIC TREE OS

## 1. Tenancy Model: Shared-Database, Row-Level-Isolated

VEDIC TREE OS implements a **Shared-Database, Tenant-Partitioned Architecture** enforced at two independent layers:
1. **Application Layer**: NestJS Tenant Interceptor + Prisma Client Middleware injecting `organization_id` / `campus_id` into every query.
2. **PostgreSQL Kernel Layer**: Native **PostgreSQL Row Level Security (RLS)** using connection session variables (`app.current_organization_id`, `app.current_campus_id`).

---

## 2. PostgreSQL Row Level Security (RLS) Implementation

### 2.1 Setting the Tenant Context Per Request
Before executing any query on a pooled database connection, the application sets session variables inside a transaction:

```sql
-- Executed per HTTP request inside Prisma interactive transaction or connection hook
SET LOCAL app.current_organization_id = 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d';
SET LOCAL app.current_campus_id = 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e';
```

### 2.2 Table RLS Policy Definition Pattern
```sql
-- Enable RLS on students table
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE students FORCE ROW LEVEL SECURITY;

-- Campus-level policy: Users can only see/modify rows for their active campus
CREATE POLICY campus_isolation_policy ON students
  FOR ALL
  USING (
    campus_id = NULLIF(current_setting('app.current_campus_id', true), '')::UUID
    OR
    (
      -- HQ Executive Bypass: if app.current_campus_id is empty, check organization_id
      current_setting('app.current_campus_id', true) = ''
      AND organization_id = NULLIF(current_setting('app.current_organization_id', true), '')::UUID
    )
  )
  WITH CHECK (
    campus_id = NULLIF(current_setting('app.current_campus_id', true), '')::UUID
  );
```

---

## 3. Defense-in-Depth Isolation Matrix

| Layer | Enforcement Mechanism | Failure Mode Protected Against |
|---|---|---|
| **API Gateway / Guard** | JWT validation & CASL role check | Unauthenticated access, expired token, role mismatch |
| **Prisma Query Middleware** | Auto-inject `where: { campusId }` | Developer forgetting `where` clause in service code |
| **PostgreSQL RLS** | Kernel-level row filter | Direct SQL injection, compromised service layer |
| **Audit Trigger** | Append-only audit table | Unauthorized tampering by privileged database users |
