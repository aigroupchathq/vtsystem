# Rule: API

Trigger: always_on
Scope: apps/api — all REST API endpoints

---

## REST Conventions

### URL Design

Use **plural nouns** for resource collections. Use **kebab-case** for
multi-word resource names. Never use verbs in URLs.

```
# ✅ Correct
GET    /api/v1/students
GET    /api/v1/students/:id
POST   /api/v1/students
PATCH  /api/v1/students/:id
DELETE /api/v1/students/:id

GET    /api/v1/fee-invoices
POST   /api/v1/fee-invoices/:id/payments

# ❌ Wrong
GET    /api/v1/getStudent
POST   /api/v1/student/create
GET    /api/v1/FeeInvoice
```

### Tenant Scoping in URLs

Tenant context is extracted from the JWT and middleware — it is **not**
a URL segment for standard operations. Exception: HQ-level admin endpoints
that operate across tenants use `/api/v1/admin/organizations/:orgId/...`.

### Nested Resources

Use one level of nesting for related resources. Do not nest more than
one level deep:

```
# ✅ One level
GET /api/v1/students/:studentId/attendance

# ❌ Too deep
GET /api/v1/schools/:schoolId/classes/:classId/students/:studentId/grades
```

For deeply nested access, use query parameters: `GET /api/v1/grades?studentId=&classId=`

---

## HTTP Status Codes

| Situation | Code |
|---|---|
| Successful read | `200 OK` |
| Resource created | `201 Created` with `Location` header |
| Async job accepted | `202 Accepted` with job ID |
| No content (DELETE success) | `204 No Content` |
| Validation error | `400 Bad Request` |
| Unauthenticated | `401 Unauthorized` |
| Authenticated but forbidden | `403 Forbidden` |
| Resource not found | `404 Not Found` |
| Conflict (duplicate) | `409 Conflict` |
| Server error | `500 Internal Server Error` |

Never return `200 OK` for errors. Never return `400` for auth failures.

---

## Versioning

All API routes are prefixed with `/api/v1/`. When a breaking change is
required, a new version prefix `/api/v2/` is introduced and `/api/v1/`
is maintained for a deprecation window (minimum 3 months).

Non-breaking changes (new optional fields, new endpoints) do not require
a version bump.

---

## Response Envelope

All list responses use a consistent envelope:

```json
{
  "data": [...],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "nextCursor": "student-uuid-xyz"
  }
}
```

Single resource responses return the resource directly (no envelope):

```json
{
  "id": "...",
  "firstName": "Arjun",
  "lastName": "Sharma"
}
```

Error responses follow the standard error shape defined in `04-backend.md`.

---

## OpenAPI / Swagger

Every endpoint must be documented with OpenAPI decorators. The Swagger
UI is available at `/api/docs` in development.

Required decorators on every endpoint:

```typescript
@ApiOperation({ summary: 'Create a new student' })
@ApiBody({ type: CreateStudentDto })
@ApiResponse({ status: 201, type: StudentEntity, description: 'Student created' })
@ApiResponse({ status: 400, description: 'Validation error' })
@ApiResponse({ status: 403, description: 'Insufficient permissions' })
```

The OpenAPI spec (`openapi.json`) is generated as part of the build and
committed to `docs/api/openapi.json`. This is the contract for frontend
clients and external integrations.

---

## Rate Limiting

All API endpoints are rate-limited via NestJS Throttler:

| Endpoint type | Limit |
|---|---|
| Public auth endpoints (login, register) | 5 req/min per IP |
| Standard API endpoints | 100 req/min per user |
| Bulk/export endpoints | 5 req/min per user |
| Webhook receivers | 1000 req/min per sender IP |

Rate limit headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`,
`X-RateLimit-Reset`) must be returned on all responses.

---

## Idempotency

For mutating operations that may be retried (payments, enrolments, bulk
imports), implement idempotency keys:

- Client sends `Idempotency-Key: <uuid>` header
- Server stores the result keyed by `(idempotency_key, user_id)`
- If the same key is received again within 24 hours, return the cached
  result without re-executing the operation

---

## Webhooks (Inbound)

Inbound webhooks (Razorpay, WhatsApp, etc.) must:
1. Verify the webhook signature before processing.
2. Return `200 OK` immediately after signature verification.
3. Process the event asynchronously via a BullMQ job.
4. Be idempotent — store processed event IDs to prevent double-processing.

---

## CORS

CORS is configured at the NestJS application level. Allowed origins are
read from the `CORS_ALLOWED_ORIGINS` environment variable (comma-separated
list). Never use `origin: '*'` in production.
