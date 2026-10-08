---
name: vtos-bootstrap-monorepo
description: >-
  Use this skill when setting up the VEDIC TREE OS monorepo from scratch.
  Covers creating the pnpm workspace, bootstrapping apps/web (Next.js),
  apps/api (NestJS), packages/types, packages/ui, packages/config,
  configuring shared TypeScript, ESLint, Tailwind, and Turborepo pipelines.
  Activate when the user asks to "bootstrap", "scaffold", "initialize",
  or "set up the monorepo".
---

# Skill: Bootstrap VEDIC TREE OS Monorepo

## Prerequisites

- Decision D-001 (monorepo toolchain) must be DECIDED in `docs/00-decisions.md`
- Decision D-009 (brand identity) should be DECIDED or a placeholder palette confirmed

## Steps

### 1. Verify prerequisites

Check that all blocking decisions in `docs/00-decisions.md` have status DECIDED.

### 2. Initialize pnpm workspace

Create `pnpm-workspace.yaml` at the repository root:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### 3. Initialize Turborepo

```bash
pnpm dlx create-turbo@latest --skip-install
```

Then configure `turbo.json` with pipelines for `build`, `test`, `lint`, `type-check`.

### 4. Create shared packages

```bash
mkdir -p packages/types packages/ui packages/config
```

Each package gets a `package.json`, `tsconfig.json` (extending base), and an `index.ts`.

### 5. Bootstrap Next.js web app

```bash
pnpm dlx create-next-app@latest apps/web \
  --typescript --tailwind --eslint --app \
  --src-dir --import-alias "@web/*"
```

Then install additional dependencies:
```bash
cd apps/web
pnpm add shadcn@latest next-intl @tanstack/react-query react-hook-form @hookform/resolvers zod
pnpm add -D @axe-core/playwright
```

### 6. Bootstrap NestJS API

```bash
pnpm dlx @nestjs/cli new apps/api --package-manager pnpm --strict
```

Then install additional dependencies:
```bash
cd apps/api
pnpm add @nestjs/swagger @nestjs/throttler @nestjs/event-emitter @casl/ability @casl/nest
pnpm add prisma @prisma/client bullmq ioredis
pnpm add argon2 class-validator class-transformer
pnpm dlx prisma init
```

### 7. Configure shared TypeScript

Create `packages/config/tsconfig.base.json` with strict settings.
All app-level `tsconfig.json` files extend this base.

### 8. Verify the setup

```bash
pnpm install
pnpm turbo run build
pnpm turbo run lint
pnpm turbo run type-check
```

All pipelines must pass before proceeding to feature development.
