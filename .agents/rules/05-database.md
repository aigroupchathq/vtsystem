# Rule: Database

Trigger: always_on
Scope: apps/api, infra/terraform, database schema

---

## ORM

**Prisma** is the only ORM. Do not use TypeORM, Sequelize, Drizzle, or
raw SQL drivers directly (except when Prisma cannot express a query).

The Prisma schema lives at: `apps/api/prisma/schema.prisma`

---

## Schema Conventions

### Naming
- Model names: `PascalCase` singular (`Student`, `FeeInvoice`, `SchoolCampus`)
- Field names: `camelCase` (`firstName`, `createdAt`)
- Table names: `snake_case` via `@@map` (`@@map("students")`)
- Junction tables: `ModelAModelB` sorted alphabetically

### IDs
All models use UUID primary keys:

```prisma
id  String  @id @default(uuid())
```

Never use auto-increment integers as primary keys. UUIDs prevent
enumeration attacks and are safe to expose in URLs.

### Timestamps
All models include audit timestamps:

```prisma
createdAt  DateTime  @default(now())
updatedAt  DateTime  @updatedAt
deletedAt  DateTime?  // soft delete — nullable
```

Use **soft deletes** for all user-facing data. Never hard-delete records
that may be referenced by other records or required for audit. Filter
`deletedAt: null` in all standard queries.

### Tenant Scoping
Every model that belongs to a tenant must have an explicit foreign key to
the appropriate level of the hierarchy:

```prisma
model Student {
  id           String   @id @default(uuid())
  organizationId String  // HQ tenant scope
  schoolId     String   // School-level scope
  // ...
  organization Organization @relation(fields: [organizationId], references: [id])
  school       School       @relation(fields: [schoolId], references: [id])
}
```

---

## Migration Rules

1. **Never edit a migration file after it has been applied** to any
   environment. If a migration is wrong, create a new migration to fix it.
2. All migrations must be reviewed before applying to staging or production.
3. Migrations are applied automatically in CI for the test database.
4. Production migrations are applied manually with approval from the
   Engineering Lead.
5. Every migration file must have a descriptive name:
   `20261002183000_add_student_enrollment_number`
6. Destructive changes (DROP COLUMN, DROP TABLE) require:
   - A separate migration that first makes the column optional/nullable
   - A code release that stops writing to the column
   - A second migration to remove the column (only after verified safe)

---

## Query Rules

### Always scope by tenant
Every query in a service method that retrieves tenant data must include
the tenant ID in the `where` clause. This is enforced by the Prisma
middleware, but services must also include it explicitly as defense-in-depth:

```typescript
// ✅ Correct
const student = await this.prisma.student.findFirst({
  where: {
    id: studentId,
    organizationId: tenant.organizationId,
    deletedAt: null,
  },
});

// ❌ Wrong — missing tenant scope
const student = await this.prisma.student.findFirst({
  where: { id: studentId },
});
```

### Select only needed fields
Always use `select` to fetch only required fields — never fetch entire
records when a subset is needed. This is especially important for large
records (e.g., Student profile with documents).

### Pagination
All list queries must be paginated. Use cursor-based pagination for
large datasets:

```typescript
const students = await this.prisma.student.findMany({
  where: { organizationId, deletedAt: null },
  take: limit,
  skip: cursor ? 1 : 0,
  cursor: cursor ? { id: cursor } : undefined,
  orderBy: { createdAt: 'desc' },
});
```

### Transactions
Use Prisma transactions for operations that must succeed or fail together:

```typescript
await this.prisma.$transaction(async (tx) => {
  const invoice = await tx.feeInvoice.create({ data: invoiceData });
  await tx.feeLineItem.createMany({ data: lineItems.map(l => ({ ...l, invoiceId: invoice.id })) });
  await tx.studentAccount.update({ where: { studentId }, data: { balance: { decrement: total } } });
});
```

---

## Indexing Strategy

All tables must have indexes on:
1. The primary key (`id`) — automatic.
2. The tenant scope columns (`organizationId`, `schoolId`).
3. Any foreign keys used in relations.
4. Any column used in `WHERE`, `ORDER BY`, or `JOIN` on large tables.
5. Composite indexes for common multi-column queries.

Add indexes to the Prisma schema using `@@index([...])`.

---

## PostgreSQL Extensions

The following extensions are enabled in Cloud SQL:
- `uuid-ossp` — UUID generation (fallback; Prisma uses `gen_random_uuid()`)
- `pgvector` — Vector similarity for AI/RAG features
- `pg_trgm` — Trigram indexes for full-text search on names

---

## Seed Data

Seed scripts live in `apps/api/prisma/seed/`. They are idempotent (safe
to run multiple times). Seeds create:
- System-level roles and permissions
- Default academic calendars for supported boards
- Test tenant data (development only, never in production)
