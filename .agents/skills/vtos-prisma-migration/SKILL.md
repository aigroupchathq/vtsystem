---
name: vtos-prisma-migration
description: >-
  Use this skill when creating, reviewing, or applying Prisma database migrations
  in VEDIC TREE OS. Covers schema changes, migration naming, safe destructive changes,
  applying to test and production environments, and verifying tenant isolation is preserved.
  Activate when the user asks to "create a migration", "update the schema", "add a column",
  "run migrations", or any task involving the Prisma schema file.
---

# Skill: Prisma Migration Workflow

## Rules Summary (from 05-database.md)

- Never edit an applied migration file
- Destructive changes require a multi-step process
- Production migrations require Engineering Lead approval

## Steps

### 1. Edit the Prisma schema

Modify `apps/api/prisma/schema.prisma` following the conventions in
`05-database.md` (naming, timestamps, tenant scoping, indexes).

### 2. Generate the migration

```bash
cd apps/api
pnpm prisma migrate dev --name <descriptive-name>
# Example: pnpm prisma migrate dev --name add_student_enrollment_number
```

Review the generated SQL in `prisma/migrations/<timestamp>_<name>/migration.sql`
before accepting.

### 3. Verify tenant isolation is preserved

Check that any new tenant-scoped model includes `organizationId` and the
corresponding `@@index([organizationId])`.

### 4. Update the Prisma client

```bash
pnpm prisma generate
```

### 5. Update seed data if needed

If the schema change affects seed data, update `apps/api/prisma/seed/`.

### 6. Run the test suite

```bash
pnpm turbo run test --filter=api
```

The integration test suite runs against the test database with the
new migration applied automatically.

### 7. For destructive changes (DROP COLUMN or DROP TABLE)

Step 1: Make the column nullable (separate migration + deploy)
Step 2: Stop writing to the column (code change + deploy)
Step 3: Verify no reads of the column in production (monitoring)
Step 4: Create migration to remove the column (separate migration + deploy)

Never skip these steps.

### 8. Production deployment

Production migrations are run by the CI/CD pipeline via:
```bash
pnpm prisma migrate deploy
```

This is executed as part of the Cloud Run deployment, before the new
application version starts.
