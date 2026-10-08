# Rule: Multi-Tenancy

Trigger: always_on
Scope: apps/api, apps/web — all tenant-scoped code

---

## Tenant Hierarchy

VEDIC TREE OS has a five-level organizational hierarchy:

```
Organization (HQ / Vedic Tree Corporate)
  └── Region (Geographic region — North, South, Maharashtra, etc.)
       └── School (Individual school entity)
            ├── Type: SELF_OWNED | PARTNERSHIP | FRANCHISE
            └── Campus (Physical campus of a school)
```

Every entity in the system belongs to at least one level of this hierarchy.
The `organizationId` is the root tenant identifier that scopes all data.

---

## Tenant Context

### Backend — TenantContext

Every authenticated request carries a `TenantContext` object populated
by the `TenantMiddleware` from the JWT claims and the database:

```typescript
type TenantContext = {
  organizationId: string;
  userId: string;
  userRole: Role;
  schoolId?: string;   // Set for school-scoped users
  regionId?: string;   // Set for region-scoped users
  campusId?: string;   // Set for campus-scoped users
};
```

Access via `@CurrentTenant()` decorator on controller methods. Never
reconstruct tenant context from the request URL or body.

### Frontend — TenantProvider

A React `TenantProvider` wraps the authenticated layout and provides
tenant context via `useTenant()` hook. Components never read tenant data
from the URL directly.

```typescript
const { organizationId, schoolId, userRole } = useTenant();
```

---

## Data Isolation Rules

### Rule 1: Every query is scoped by tenant
No query that returns user-facing data may omit the `organizationId`
filter. No exceptions. The Prisma middleware enforces this automatically,
but service methods must also include it explicitly (defense-in-depth).

### Rule 2: Cross-tenant access is always explicit
HQ users who can view data across all schools must use dedicated
"admin scope" service methods — not the standard tenant-scoped methods.
Admin scope methods are guarded separately and logged.

### Rule 3: IDs are not sufficient as isolation
Never assume that an ID in a URL or request body belongs to the requesting
tenant without verifying it in the database:

```typescript
// ✅ Correct — verify ownership
const student = await this.prisma.student.findFirst({
  where: { id: dto.studentId, organizationId: tenant.organizationId },
});
if (!student) throw new NotFoundException();

// ❌ Wrong — ID not verified against tenant
const student = await this.prisma.student.findUnique({
  where: { id: dto.studentId },
});
```

### Rule 4: PostgreSQL RLS is always on
RLS policies are enabled on all tenant-scoped tables in Cloud SQL. The
application sets the `app.current_organization_id` session variable
via Prisma middleware before each query. This provides a second layer of
isolation at the database level.

```typescript
// Prisma middleware (applied globally)
prisma.$use(async (params, next) => {
  await prisma.$executeRaw`SELECT set_config('app.current_organization_id', ${context.organizationId}, true)`;
  return next(params);
});
```

---

## Permission Scope by Role

| Role | Data Scope |
|---|---|
| HQ Admin | All organizations, all schools |
| Regional Manager | All schools in their region |
| School Principal | All data within their school |
| HOD | Dept data within their school |
| Teacher | Their assigned classes and students |
| HR Admin | Staff data within their school |
| Finance Admin | Fee/financial data within their school |
| Student | Their own academic record only |
| Parent | Their child's data only |
| Partner | Their partnership school data |
| Franchise Owner | Their franchise school data |

CASL ability definitions in `apps/api/src/auth/abilities/` enforce these
scopes. The ability definitions are the authoritative source — never
implement scope filtering ad-hoc in service methods.

---

## Multi-School Users

A user may have accounts in multiple schools (e.g., a parent with
children in two different Vedic Tree schools, or a teacher who is also
a parent).

Each user–school relationship is a separate row in the `UserSchoolMembership`
table with its own role. The JWT contains the **currently active**
membership context. Users can switch their active context via an API call.

---

## Tenant Onboarding

New tenants (schools) are created by HQ Admin only. The onboarding flow:

1. HQ Admin creates an `Organization` (if new group) or selects existing.
2. HQ Admin creates a `Region` (if new) or selects existing.
3. HQ Admin creates a `School` with type (SELF_OWNED / PARTNERSHIP / FRANCHISE).
4. System provisions: default roles, default fee structures, default
   academic calendar based on the school's board selection.
5. HQ Admin invites the School Principal (system sends WhatsApp + email).
6. Principal completes profile and begins setup.

This flow is implemented in the `PartnerModule` and `OrganizationModule`.

---

## URL Strategy

Tenant routing uses path-based scoping for v1:

```
/dashboard                          # HQ Admin — all organizations
/dashboard/[orgSlug]               # Organization-level dashboard
/dashboard/[orgSlug]/schools       # All schools in organization
/dashboard/[orgSlug]/[schoolSlug]  # School-level dashboard
```

The `orgSlug` and `schoolSlug` are resolved to UUIDs via Next.js
middleware using a slug-to-id lookup table cached in Redis.
