---
name: vtos-database-engineering
description: >-
  Use this skill when designing or modifying the VEDIC TREE OS PostgreSQL schema,
  writing Prisma models, creating migrations, designing indexes, or implementing
  PostgreSQL Row Level Security policies. Activate when the user says "design
  the schema for", "add a model", "create a migration", "add RLS", "design
  the data model", or "update the database".
---

# Skill: Database Engineering

## When to Use

- A product specification has been approved and requires new database models.
- A migration needs to be created, reviewed, or applied.
- Row Level Security policies need to be written or modified.
- Query performance needs to be diagnosed and indexes need to be added.
- A data model change requires a backwards-compatible migration strategy.

## Prerequisites

- [ ] A product specification exists for the feature (`docs/product/`).
- [ ] The Prisma schema is accessible at `apps/api/prisma/schema.prisma`.
- [ ] All decisions in `docs/00-decisions.md` that block the schema are DECIDED.
- [ ] For destructive changes: the multi-step strategy from `05-database.md` has been read.

## Execution Procedure

### Step 1 — Design the Data Model

Before writing Prisma code, design the model on paper (or in this skill step):

For each new model, determine:
- **Name** (PascalCase singular — `FeeInvoice`, not `FeeInvoices`)
- **Table name** (snake_case plural via `@@map`)
- **Primary key**: always `String @id @default(uuid())`
- **Tenant scoping**: which hierarchy level? (`organizationId`, `schoolId`, `campusId`)
- **Soft delete**: always `deletedAt DateTime?`
- **Timestamps**: always `createdAt DateTime @default(now())` and `updatedAt DateTime @updatedAt`
- **Relations**: what are the FK constraints?
- **Indexes**: what columns will appear in WHERE, JOIN, ORDER BY clauses?
- **Enums**: any status fields that need an enum type?

Document the data model design in `docs/database/` before writing schema.

### Step 2 — Write the Prisma Model

```prisma
// apps/api/prisma/schema.prisma

enum FeeInvoiceStatus {
  DRAFT
  ISSUED
  PARTIALLY_PAID
  PAID
  OVERDUE
  WAIVED
}

model FeeInvoice {
  id             String            @id @default(uuid())
  organizationId String
  schoolId       String
  studentId      String
  academicYear   String            // e.g., "2026-27"
  term           String            // e.g., "Term 1"
  dueDate        DateTime
  totalAmount    Decimal           @db.Decimal(12, 2)
  paidAmount     Decimal           @db.Decimal(12, 2) @default(0)
  status         FeeInvoiceStatus  @default(DRAFT)
  notes          String?
  createdAt      DateTime          @default(now())
  updatedAt      DateTime          @updatedAt
  deletedAt      DateTime?

  organization   Organization      @relation(fields: [organizationId], references: [id])
  school         School            @relation(fields: [schoolId], references: [id])
  student        Student           @relation(fields: [studentId], references: [id])
  lineItems      FeeLineItem[]
  payments       FeePayment[]

  @@index([organizationId, schoolId])
  @@index([studentId])
  @@index([status, dueDate])
  @@index([academicYear, term])
  @@map("fee_invoices")
}
```

**Field type rules:**
- Monetary amounts: `Decimal @db.Decimal(12, 2)` — never `Float`
- Percentage values: `Decimal @db.Decimal(5, 4)` (up to 999.9999%)
- Long text (notes, descriptions): `String?` — PostgreSQL TEXT, no max length
- Short text (names, codes): `String` — add `@db.VarChar(N)` if max length is known
- Dates without time: store as `DateTime` at midnight UTC — note in docs
- Phone numbers: `String` in E.164 format

### Step 3 — Generate and Review the Migration

```bash
cd apps/api
pnpm prisma migrate dev --name <descriptive-name>
```

**Review the generated SQL** in `prisma/migrations/<timestamp>/migration.sql`
before accepting. Verify:
- Table names are snake_case
- FK constraints are correct
- Indexes match the `@@index` declarations
- No unexpected drops

### Step 4 — Write RLS Policies (if new tenant-scoped table)

For every new table that stores tenant data, a RLS policy must be written.
After the migration is applied:

```sql
-- Enable RLS on the table
ALTER TABLE fee_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_invoices FORCE ROW LEVEL SECURITY;

-- Policy: users can only see rows matching their organization
CREATE POLICY tenant_isolation ON fee_invoices
  USING (organization_id = current_setting('app.current_organization_id')::uuid);
```

RLS policy files live in `apps/api/prisma/rls/`.
They are applied via a seed/setup script — not part of the migration itself.

### Step 5 — Update the Prisma Client

```bash
pnpm prisma generate
```

Verify the generated client reflects the new schema:
```bash
pnpm turbo run type-check --filter=api
```

### Step 6 — Update Seed Data (if required)

If the new model needs seed data (e.g., default fee categories, standard
grade scales), update `apps/api/prisma/seed/`:

```typescript
// apps/api/prisma/seed/fee-categories.ts
export async function seedFeeCategories(prisma: PrismaClient): Promise<void> {
  const categories = [
    { name: 'Tuition Fee', code: 'TUITION' },
    { name: 'Transport Fee', code: 'TRANSPORT' },
    { name: 'Lab Fee', code: 'LAB' },
  ];

  for (const cat of categories) {
    await prisma.feeCategory.upsert({
      where: { code: cat.code },
      update: {},
      create: cat,
    });
  }
}
```

Seed functions must be **idempotent** — safe to run multiple times.

### Step 7 — Update the Data Dictionary

Add or update the entry for the new model in `docs/database/data-dictionary.md`:

```markdown
## fee_invoices

| Column | Type | Nullable | Description |
|---|---|---|---|
| id | uuid | No | Primary key |
| organization_id | uuid | No | FK → organizations.id — tenant root |
| school_id | uuid | No | FK → schools.id — school scope |
| student_id | uuid | No | FK → students.id |
| total_amount | decimal(12,2) | No | Total amount due in tenant currency |
| status | enum | No | DRAFT / ISSUED / PARTIALLY_PAID / PAID / OVERDUE / WAIVED |
| deleted_at | timestamptz | Yes | Soft delete — NULL means active |
```

## Validation Procedure

- [ ] Prisma schema is syntactically valid: `pnpm prisma validate`
- [ ] Migration file has been reviewed (SQL is correct)
- [ ] Monetary fields use `Decimal`, not `Float`
- [ ] All tenant-scoped tables have `organizationId` and a covering index
- [ ] All new tables have `createdAt`, `updatedAt`, `deletedAt`
- [ ] RLS policy written for every new tenant-scoped table
- [ ] Seed data is idempotent
- [ ] Type check passes after `prisma generate`: `pnpm turbo run type-check --filter=api`
- [ ] Integration tests pass with new schema: `pnpm turbo run test --filter=api`
- [ ] Data dictionary updated in `docs/database/`

## Definition of Done

1. Migration file committed and applied to development database.
2. Prisma client regenerated and type-check passes.
3. RLS policy written (if applicable).
4. Seed data updated (if applicable).
5. Data dictionary updated.
6. All tests pass.
7. No `pnpm prisma validate` errors.
