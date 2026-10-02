---
name: vtos-deployment
description: >-
  Use this skill when managing deployments, CI/CD pipelines, containerization, environment
  configuration, database migrations, and infrastructure provisioning for VEDIC TREE OS.
  Covers Docker, Kubernetes/Cloud Run, PostgreSQL migrations, staging promotions, and zero-downtime releases.
---

# Skill: Deployment and Infrastructure Operations

## When to Use

- Building container images for `apps/web` (Next.js) or `apps/api` (NestJS).
- Running automated database migrations in staging or production environments.
- Configuring environment variables, secret managers, or connection pooling (PgBouncer).
- Setting up CI/CD workflows (GitHub Actions) for linting, testing, building, and deployment.
- Planning zero-downtime rolling updates and rollback strategies.

## Prerequisites

- [ ] Repository passes all unit, integration, and typecheck checks (`turbo run test typecheck lint`).
- [ ] Prisma schema migrations are committed and validated (`npx prisma migrate status`).
- [ ] Target environment credentials and container registry access configured.
- [ ] Environment secrets and database connection strings safely stored in vault/secret manager.

## Execution Procedure

### Step 1 — Pre-Flight Verification & Build Artifacts

1. Run full monorepo build:
   ```bash
   npm run build
   ```
2. Verify docker build files for both services:
   - `apps/api/Dockerfile`: Multi-stage Alpine Node.js build, non-root user, optimized production dependencies.
   - `apps/web/Dockerfile`: Standalone output mode Next.js build.
3. Validate environment configurations against `.env.example` templates ensuring no secrets are hardcoded.

### Step 2 — Database Migration Deployment Strategy

1. For backwards-compatible zero-downtime migrations (Expand/Contract pattern):
   - **Phase 1 (Expand)**: Add new nullable columns, tables, or views. Deploy migrations before application release.
   - **Phase 2 (Release)**: Deploy new application code that writes to both old and new fields, but reads from new fields.
   - **Phase 3 (Contract)**: Drop deprecated columns and legacy constraints in a subsequent scheduled release.
2. Run Prisma migration deployment command in CI:
   ```bash
   npx prisma migrate deploy
   ```
3. Verify connection pool sizing and PostgreSQL transaction timeouts before releasing traffic.

### Step 3 — Container Deployment & Health Checks

1. Deploy updated service containers with rolling update strategy (maximum 25% surge, 0% unavailable).
2. Monitor standard health check endpoints:
   - API: `GET /health/liveness` (returns 200 OK if process is responding).
   - API: `GET /health/readiness` (checks database connection, Redis cache, and tenant pool).
   - Web: `GET /api/health`
3. Configure ingress routing, SSL termination, and CDN caching headers for static assets (`/_next/static/*`).

### Step 4 — Post-Deployment Smoke Verification & Rollback Plan

1. Execute smoke test script against staging/production health and tenant endpoints.
2. Check APM and error tracking (e.g. Sentry/OpenTelemetry) for elevated 5xx error spikes.
3. If error rates exceed 0.5% or readiness checks fail within 5 minutes:
   - Roll back container image to previous known good SHA.
   - If schema changes were additive, no immediate database rollback is required.

## Validation Procedure

- [ ] All CI/CD pipeline steps execute cleanly and report green status.
- [ ] Database migrations execute without locking critical tables during active business hours.
- [ ] Health endpoints return HTTP 200 with latency < 50ms.
- [ ] Application logs confirm successful initialization of NestJS modules and database connection pool.

## Definition of Done

1. Containers deployed and healthy across all replicas.
2. Database schema matches latest migration history in `_prisma_migrations`.
3. Smoke test verification passes against live endpoints.
4. Rollback procedure documented and ready if required.
