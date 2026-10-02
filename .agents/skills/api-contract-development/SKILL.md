---
name: vtos-api-contract-development
description: >-
  Use this skill when designing, documenting, or reviewing the REST API contract
  for a VEDIC TREE OS feature. Covers defining endpoints, request/response shapes,
  status codes, OpenAPI documentation, shared Zod schemas in packages/types, and
  the API versioning strategy. Activate when the user says "design the API for",
  "define the contract", "what endpoints do we need", "OpenAPI spec for",
  or "API schema for [feature]".
---

# Skill: API Contract Development

## When to Use

- A product specification has been approved and the API endpoints need to be
  formally designed before implementation begins.
- The frontend team needs to know the API shape before the backend is complete.
- A breaking API change needs to be assessed and versioned.
- The OpenAPI spec needs to be updated or reviewed.
- Shared TypeScript types and Zod schemas need to be added to `packages/types`.

## Prerequisites

- [ ] Product specification exists (`docs/product/`).
- [ ] Database schema is at least designed (models known, even if not migrated yet).
- [ ] The roles that will consume this API are identified.

## Execution Procedure

### Step 1 — Identify the Resources

From the product specification, extract the list of REST resources this feature
exposes. Map each resource to an HTTP endpoint group.

Document the resource list:

```
Resource: FeeInvoice
Base path: /api/v1/fee-invoices
Scoped by: School (via tenant context in JWT)
```

### Step 2 — Define Each Endpoint

For every endpoint, document:

| Field | Value |
|---|---|
| Method + Path | `POST /api/v1/fee-invoices` |
| Description | Creates a new fee invoice for a student |
| Auth | JWT required |
| Permission | `create:FeeInvoice` — Finance Admin, Principal |
| Request body | `CreateFeeInvoiceDto` |
| Success response | `201 Created` — `FeeInvoiceEntity` |
| Error responses | `400` validation, `403` forbidden, `404` student not found, `409` duplicate |
| Notes | Idempotent if `Idempotency-Key` header provided |

Write the full endpoint contract in `docs/api/<module>.md`:

```markdown
# Fee Invoices API

## POST /api/v1/fee-invoices

Creates a new fee invoice.

**Auth:** Bearer token required  
**Permission:** `create:FeeInvoice`  
**Allowed roles:** Finance Admin, Principal

### Request Body

\`\`\`json
{
  "studentId": "uuid",
  "academicYear": "2026-27",
  "term": "Term 1",
  "dueDate": "2026-10-31",
  "totalAmount": 12500.00
}
\`\`\`

### Responses

| Status | Description | Body |
|---|---|---|
| 201 | Invoice created | `FeeInvoice` object |
| 400 | Validation error | Error object |
| 403 | Insufficient permissions | Error object |
| 404 | Student not found | Error object |
| 409 | Invoice already exists for this student/term | Error object |

### Example Response (201)

\`\`\`json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "studentId": "...",
  "academicYear": "2026-27",
  "term": "Term 1",
  "dueDate": "2026-10-31T00:00:00.000Z",
  "totalAmount": "12500.00",
  "paidAmount": "0.00",
  "status": "DRAFT",
  "createdAt": "2026-10-02T18:00:00.000Z"
}
\`\`\`
```

### Step 3 — Write Shared Zod Schemas in packages/types

Zod schemas are the single source of truth shared between the frontend
(form validation) and backend (DTO validation).

```typescript
// packages/types/src/finance/fee-invoice.ts
import { z } from 'zod';

export const CreateFeeInvoiceSchema = z.object({
  studentId: z.string().uuid(),
  academicYear: z.string().regex(/^\d{4}-\d{2}$/, 'Format: 2026-27'),
  term: z.string().min(1).max(50),
  dueDate: z.string().datetime({ offset: true }),
  totalAmount: z.number().positive().multipleOf(0.01),
});

export const UpdateFeeInvoiceSchema = CreateFeeInvoiceSchema.partial().extend({
  status: z.enum(['DRAFT', 'ISSUED', 'WAIVED']).optional(),
});

export const FeeInvoiceSchema = CreateFeeInvoiceSchema.extend({
  id: z.string().uuid(),
  paidAmount: z.number().nonnegative(),
  status: z.enum(['DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'WAIVED']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Inferred TypeScript types
export type CreateFeeInvoiceDto = z.infer<typeof CreateFeeInvoiceSchema>;
export type UpdateFeeInvoiceDto = z.infer<typeof UpdateFeeInvoiceSchema>;
export type FeeInvoice = z.infer<typeof FeeInvoiceSchema>;
```

Export from the package index:
```typescript
// packages/types/src/index.ts
export * from './finance/fee-invoice';
```

### Step 4 — Define the Response Envelope for Lists

All list endpoints return the pagination envelope (from `06-api.md`):

```typescript
// packages/types/src/common/pagination.ts
import { z } from 'zod';

export const PaginationMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  nextCursor: z.string().nullable(),
});

export function paginatedSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema),
    meta: PaginationMetaSchema,
  });
}

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
```

### Step 5 — Assess Breaking vs Non-Breaking

For changes to an existing API:

**Non-breaking (no version bump needed):**
- Adding a new optional response field
- Adding a new optional request field
- Adding a new endpoint

**Breaking (requires `/api/v2/` planning):**
- Removing or renaming a field
- Changing a field's type
- Changing a status code for a scenario
- Removing an endpoint

If breaking: create an ADR entry in `docs/00-decisions.md` before proceeding.

### Step 6 — Update the OpenAPI Spec Placeholder

Before backend implementation, add a placeholder to `docs/api/openapi.json`
or document the endpoints in `docs/api/<module>.md` so the frontend team
can begin building against a known contract.

## Validation Procedure

- [ ] Every endpoint has a documented method, path, description, auth, and permission
- [ ] Every endpoint has at least one success and one error response documented
- [ ] Zod schemas exist in `packages/types` for all request and response shapes
- [ ] Types are inferred from Zod schemas (no duplicate type/schema pairs)
- [ ] Schemas are exported from `packages/types/src/index.ts`
- [ ] Type check passes: `pnpm turbo run type-check --filter=types`
- [ ] Breaking changes have an ADR entry
- [ ] All endpoints follow the naming and status code rules from `06-api.md`

## Definition of Done

1. API contract document committed to `docs/api/<module>.md`.
2. Zod schemas in `packages/types` — type-checked and exported.
3. Frontend can import types from `@types/<resource>` without depending on the API being live.
4. Backend developer can implement from this contract without needing further clarification.
5. No ambiguous fields — every field has a type, nullability, and example.
