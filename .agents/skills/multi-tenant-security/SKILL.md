---
name: vtos-multi-tenant-security
description: >-
  Use this skill when implementing, reviewing, or auditing multi-tenant data
  isolation, CASL authorization, PostgreSQL Row Level Security, or any security
  control that protects tenant boundaries in VEDIC TREE OS. Activate when the
  user says "add authorization for", "check tenant isolation", "define CASL
  abilities", "add RLS policy", "permission check", or "security review".
---

# Skill: Multi-Tenant Security

## When to Use

- A new module is being built and CASL abilities for its resources need to be defined.
- A security review of an existing module is requested.
- RLS policies need to be written or updated for new database tables.
- Cross-tenant access patterns need to be audited.
- A bug report suggests that tenant isolation may have been breached.

## Prerequisites

- [ ] The module's resources are identified (e.g., `FeeInvoice`, `Student`).
- [ ] The roles that interact with the resource are known.
- [ ] The database schema for the resource exists (table has `organizationId`).
- [ ] Read `10-multi-tenancy.md` and `07-security.md` before starting.

## Execution Procedure

### Step 1 — Map Resource × Role Permissions

Create a permission matrix before writing any code.

```markdown
## Permission Matrix: FeeInvoice

| Action | HQ Admin | Principal | Finance Admin | Teacher | Parent | Student |
|---|---|---|---|---|---|---|
| create | ✅ all orgs | ✅ own school | ✅ own school | ❌ | ❌ | ❌ |
| read | ✅ all orgs | ✅ own school | ✅ own school | ❌ | ✅ own wards | ✅ own only |
| update | ✅ all orgs | ✅ own school | ✅ own school | ❌ | ❌ | ❌ |
| delete (soft) | ✅ all orgs | ❌ | ✅ own school | ❌ | ❌ | ❌ |
| waive | ✅ all orgs | ✅ own school | ❌ | ❌ | ❌ | ❌ |
```

Any cell marked ❌ means the ability is never granted — not even
an admin from a different organization.

### Step 2 — Implement CASL Ability Definitions

Abilities are defined in `apps/api/src/auth/abilities/ability.factory.ts`.

```typescript
// src/auth/abilities/ability.factory.ts
import { AbilityBuilder, createMongoAbility, type MongoAbility } from '@casl/ability';
import type { User } from '@prisma/client';

export type AppAbility = MongoAbility;

@Injectable()
export class AbilityFactory {
  createForUser(user: UserWithMembership): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    switch (user.role) {
      case Role.HQAdmin:
        // HQ Admin can manage everything
        can('manage', 'all');
        break;

      case Role.Principal:
        can(['create', 'read', 'update'], 'FeeInvoice', { schoolId: user.schoolId });
        can('waive', 'FeeInvoice', { schoolId: user.schoolId });
        // Cannot hard-delete — Finance Admin only
        cannot('delete', 'FeeInvoice');
        break;

      case Role.FinanceAdmin:
        can('manage', 'FeeInvoice', { schoolId: user.schoolId });
        // Cannot waive — Principal only
        cannot('waive', 'FeeInvoice');
        break;

      case Role.Parent:
        // Parent can only read invoices for their own wards
        can('read', 'FeeInvoice', { studentId: { $in: user.wardIds } });
        break;

      case Role.Student:
        // Student can only read their own invoices
        can('read', 'FeeInvoice', { studentId: user.studentId });
        break;

      default:
        // All other roles — no FeeInvoice access
        break;
    }

    return build();
  }
}
```

**Rules for ability definitions:**
- Use conditions (`{ schoolId: user.schoolId }`) rather than granting broad access.
- Always use `cannot` explicitly for important denied actions (makes code readable).
- Never use `can('manage', 'all')` except for HQ Admin.
- Group abilities by resource within each role block.

### Step 3 — Apply the AbilitiesGuard to Controllers

```typescript
@Controller('fee-invoices')
@UseGuards(JwtAuthGuard, AbilitiesGuard)    // Both guards required
export class FeeInvoicesController {

  @Post()
  @CheckAbilities({ action: 'create', subject: 'FeeInvoice' })
  async create(...) { ... }

  @Get(':id')
  @CheckAbilities({ action: 'read', subject: 'FeeInvoice' })
  async findOne(...) { ... }
}
```

**Important:** The `AbilitiesGuard` checks abilities against the CASL definition,
but it uses the **subject instance** (the actual database record) for condition
evaluation. Ensure the guard fetches the record before evaluating conditions.

### Step 4 — Implement PostgreSQL Row Level Security

For every new tenant-scoped table, RLS must be enabled and a policy written.

```sql
-- apps/api/prisma/rls/fee_invoices.sql

-- 1. Enable RLS
ALTER TABLE fee_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_invoices FORCE ROW LEVEL SECURITY;

-- 2. Create isolation policy (uses session variable set by Prisma middleware)
CREATE POLICY tenant_isolation_policy ON fee_invoices
  AS PERMISSIVE
  FOR ALL
  TO PUBLIC
  USING (organization_id = current_setting('app.current_organization_id', TRUE)::uuid);

-- 3. Bypass for super-admin (service account used for migrations/seeds only)
CREATE POLICY superadmin_bypass ON fee_invoices
  AS PERMISSIVE
  FOR ALL
  TO vedic_tree_admin    -- dedicated DB role for service operations
  USING (TRUE);
```

The Prisma middleware that sets the session variable:
```typescript
// src/prisma/prisma.middleware.ts
export function createTenantMiddleware(tenantContext: TenantContextService): Prisma.Middleware {
  return async (params, next) => {
    const orgId = tenantContext.getOrganizationId();
    if (orgId) {
      await prisma.$executeRaw`
        SELECT set_config('app.current_organization_id', ${orgId}, TRUE)
      `;
    }
    return next(params);
  };
}
```

### Step 5 — Cross-Tenant Isolation Audit

For every service method that queries the database, verify:

**Checklist (per service method):**
- [ ] `organizationId` is in the `where` clause
- [ ] If the query accepts a user-supplied ID (e.g., `studentId`), the query
      verifies that ID belongs to the same tenant (not just that it exists)
- [ ] The query does NOT use `findUnique` with just a primary key — use
      `findFirst` with `organizationId` filter
- [ ] `deletedAt: null` is included (no soft-deleted records leaking)

Example of a correctly scoped query:
```typescript
// ✅ Correct — verifies ownership
const invoice = await this.prisma.feeInvoice.findFirst({
  where: {
    id: invoiceId,
    organizationId: tenant.organizationId, // tenant scope
    deletedAt: null,                        // soft delete filter
  },
});
if (!invoice) throw new NotFoundException();

// ❌ Wrong — ID not verified against tenant
const invoice = await this.prisma.feeInvoice.findUnique({
  where: { id: invoiceId },
});
```

### Step 6 — Write Cross-Tenant Security Tests

Every module must have at least one integration test that explicitly
verifies tenant isolation:

```typescript
// tests/fee-invoices.security.spec.ts
describe('FeeInvoices — Tenant Isolation', () => {
  it('should return 404 when Finance Admin from Tenant B requests Tenant A invoice', async () => {
    const tenantA = await createTestTenant();
    const tenantB = await createTestTenant();
    const invoice = await createFeeInvoice(tenantA);
    const tokenB = await loginAsFinanceAdmin(tenantB);

    await request(app.getHttpServer())
      .get(`/api/v1/fee-invoices/${invoice.id}`)
      .set('Authorization', `Bearer ${tokenB}`)
      .expect(404); // Not 403 — prevents enumeration
  });
});
```

## Validation Procedure

- [ ] Permission matrix is documented (in `docs/security/` or the module's docs)
- [ ] CASL abilities defined for all roles in `ability.factory.ts`
- [ ] Every controller route has `@UseGuards(JwtAuthGuard, AbilitiesGuard)`
- [ ] Every controller route has `@CheckAbilities(...)`
- [ ] Every service query includes `organizationId` in the `where` clause
- [ ] No `findUnique` calls that accept user-supplied IDs without tenant verification
- [ ] RLS policy written and applied to all new tenant-scoped tables
- [ ] Tenant isolation test exists and passes
- [ ] No student PII is included in application logs (search for `console.log` with `studentId`)

## Definition of Done

1. Permission matrix documented and reviewed.
2. CASL abilities complete and tested.
3. All controller routes guarded.
4. RLS policies applied to all new tables.
5. Cross-tenant isolation integration test passes.
6. Security review checklist completed by a second engineer.
