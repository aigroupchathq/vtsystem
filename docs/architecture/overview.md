# VEDIC TREE OS — Architecture Overview

> Status: PLACEHOLDER — populate when D-001 through D-004 are DECIDED

## System Context

[Architecture diagram to be added]

## Key Components

- **apps/web** — Next.js 14 frontend (App Router)
- **apps/api** — NestJS modular monolith
- **apps/mobile** — React Native + Expo (v1.1)
- **packages/types** — Shared TypeScript types
- **packages/ui** — Shared component library
- **packages/config** — Shared tooling configs

## Infrastructure (Google Cloud, asia-south1)

- Cloud Run (web + api)
- Cloud SQL for PostgreSQL
- Memorystore for Redis
- Cloud Storage
- Pub/Sub
- Secret Manager
- Artifact Registry

See [gcp-architecture.md](../deployment/gcp-architecture.md) for detail.
