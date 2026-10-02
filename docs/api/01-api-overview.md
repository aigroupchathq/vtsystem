# 01 — REST API Architecture & Standards: VEDIC TREE OS

## 1. API Architecture Overview

The VEDIC TREE OS API follows RESTful principles with strictly enforced multi-tenant scoping headers, CASL-based authorization guards, and OpenAPI (Swagger) documentation.

---

## 2. Global Headers & Context Injection

Every authenticated request to the API must include:
- `Authorization`: `Bearer <jwt_token>`
- `x-tenant-id`: UUID of active Organization or School
- `x-campus-id`: UUID of selected physical Campus (mandatory for campus-level operations)
- `x-correlation-id`: UUID generated client-side for distributed tracing

---

## 3. Standard Response Formats

### 3.1 Success Envelope
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 25,
    "total": 142
  }
}
```

### 3.2 Error Envelope
```json
{
  "success": false,
  "error": {
    "code": "TENANT_ACCESS_DENIED",
    "message": "User does not have access to campus b2c3d4e5-...",
    "details": [],
    "timestamp": "2026-10-02T19:00:00Z"
  }
}
```

---

## 4. Core Endpoint Groups

1. `POST /api/v1/auth/login` - Authenticate user, return JWT and available tenant scopes.
2. `POST /api/v1/auth/switch-tenant` - Issue tenant-scoped session token.
3. `GET /api/v1/tenants/hierarchy` - Retrieve Organization > Region > School > Campus hierarchy.
4. `GET /api/v1/students` - Query students with multi-tenant filtering.
5. `POST /api/v1/students` - Admit student, record enrollment, emit audit log.
6. `GET /api/v1/employees` - Staff directory query.
7. `POST /api/v1/finance/payments/upi-qr` - Generate dynamic UPI QR string for cashier POS.
