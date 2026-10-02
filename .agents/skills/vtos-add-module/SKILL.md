---
name: vtos-add-module
description: >-
  Use this skill when adding a new NestJS module to apps/api in VEDIC TREE OS.
  Covers creating the module scaffold (module, controller, service, DTOs, entities,
  tests), registering it in the app module, and verifying architecture compliance.
  Activate when the user asks to "add a module", "create a module", or "scaffold
  a new feature" for the backend API.
---

# Skill: Add a New NestJS Module

## Pre-flight Checks

1. Confirm the module is listed in the architecture rule (`01-architecture.md`).
   If not, add an ADR entry before creating the module.
2. Confirm the CASL ability definitions for this module are planned.
3. Confirm the Prisma schema models for this module are designed.

## Steps

### 1. Create the module directory

```bash
mkdir -p apps/api/src/modules/<module-name>/{dto,entities,tests}
```

### 2. Generate the module scaffold with NestJS CLI

```bash
cd apps/api
pnpm nest g module modules/<module-name> --no-spec
pnpm nest g controller modules/<module-name> --no-spec
pnpm nest g service modules/<module-name> --no-spec
```

### 3. Create the DTO files

`dto/create-<resource>.dto.ts` — validated with class-validator
`dto/update-<resource>.dto.ts` — extends Create with PartialType

### 4. Create the entity (response shape)

`entities/<resource>.entity.ts` — decorated with @ApiProperty for OpenAPI

### 5. Create test files

`tests/<module>.service.spec.ts` — unit tests for the service
`tests/<module>.controller.spec.ts` — integration tests for the controller

### 6. Register module in AppModule

Import the new module in `apps/api/src/app.module.ts`.

### 7. Add CASL ability definitions

Add the new resource to `apps/api/src/auth/abilities/ability.factory.ts`
with the correct per-role permissions.

### 8. Verify

```bash
pnpm turbo run type-check --filter=api
pnpm turbo run test --filter=api
```
