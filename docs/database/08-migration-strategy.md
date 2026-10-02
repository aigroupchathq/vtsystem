# 08 — Database Migration Strategy: VEDIC TREE OS

## 1. Migration Principles & Tooling

VEDIC TREE OS uses **Prisma Migrate** (`prisma migrate dev` / `prisma migrate deploy`) with strict zero-downtime guidelines.

---

## 2. Zero-Downtime Migration Pattern (Expand / Contract)

Database schema changes must never break running application pods during rolling deployments:

```
[Phase 1: Expand]
  * Add new nullable columns or tables.
  * Deploy migration before releasing new application code.
  * Database supports both old and new code versions simultaneously.

[Phase 2: Deploy New App Version]
  * Application begins writing to both old and new structures (dual writing).
  * Application reads preferentially from new structures.

[Phase 3: Backfill Background Worker]
  * Background worker copies historical records into new format in batches of 1,000.

[Phase 4: Contract]
  * Application reads exclusively from new structures.
  * In a subsequent release (at least 7 days later), deploy migration dropping deprecated columns.
```

---

## 3. Seed Data & Local Development Fixtures

The seeding pipeline (`prisma/seed.ts`) generates a complete, realistic multi-tier school hierarchy:
- 1 Organization ("Vedic Tree Foundation")
- 2 Regions ("West India", "North India")
- 3 Schools ("Vedic Tree International School Pune", "Vedic Tree Academy Mumbai", "Vedic Tree Delhi")
- 4 Campuses (e.g. "Baner Campus", "Kothrud Campus")
- Complete RBAC roles with system permissions
- Seed users: HQ Super Admin, School Principal, 5 Teachers, 2 Cashiers, 20 Students with Guardians, Active Timetables and Sample Invoices.
