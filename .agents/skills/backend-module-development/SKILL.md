---
name: vtos-backend-module-development
description: >-
  Use this skill when implementing a NestJS module in apps/api for VEDIC TREE OS.
  Covers scaffolding the module directory, writing services with business logic,
  writing controllers, wiring CASL authorization, connecting Prisma, writing
  unit and integration tests, and verifying the module is correctly bounded.
  Activate when the user says "implement the [X] module", "build the backend
  for", "add a service", "add an endpoint", or "write the NestJS module for".
---

# Skill: Backend Module Development

## When to Use

- A new NestJS module needs to be implemented for a product feature.
- A service method needs to be added to an existing module.
- Business logic needs to be implemented with full authorization enforcement.
- An existing module needs to be refactored to respect module boundary rules.

## Prerequisites

- [ ] Product specification exists (`docs/product/`) for the feature.
- [ ] Database schema is designed and migrated (`database-engineering` skill complete).
- [ ] API contract is designed (`api-contract-development` skill complete or in progress).
- [ ] CASL ability definitions for the module's resources are planned.
- [ ] Module name appears in the architecture map (`01-architecture.md`).

## Execution Procedure

### Step 1 — Scaffold the Module

```bash
cd apps/api

# Generate module, controller, service
pnpm nest g module modules/<module-name> --no-spec
pnpm nest g controller modules/<module-name>/<module-name> --no-spec
pnpm nest g service modules/<module-name>/<module-name> --no-spec

# Create directory structure manually
mkdir -p src/modules/<module-name>/{dto,entities,tests}
```

Final structure:
```
src/modules/fee-invoices/
├── fee-invoices.module.ts
├── fee-invoices.controller.ts
├── fee-invoices.service.ts
├── dto/
│   ├── create-fee-invoice.dto.ts
│   └── update-fee-invoice.dto.ts
├── entities/
│   └── fee-invoice.entity.ts
└── tests/
    ├── fee-invoices.service.spec.ts
    └── fee-invoices.controller.spec.ts
```

### Step 2 — Register the Module in AppModule

```typescript
// src/app.module.ts
@Module({
  imports: [
    // ... existing modules
    FeeInvoicesModule,
  ],
})
export class AppModule {}
```

### Step 3 — Write the DTO

```typescript
// dto/create-fee-invoice.dto.ts
import { IsUUID, IsString, IsDateString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeeInvoiceDto {
  @ApiProperty({ description: 'Student UUID' })
  @IsUUID()
  studentId: string;

  @ApiProperty({ example: '2026-27' })
  @IsString()
  academicYear: string;

  @ApiProperty({ example: 'Term 1' })
  @IsString()
  term: string;

  @ApiProperty({ example: '2026-10-31' })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ example: 12500 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  totalAmount: number;
}
```

### Step 4 — Write the Entity (Response Shape)

```typescript
// entities/fee-invoice.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import type { FeeInvoice, FeeInvoiceStatus } from '@prisma/client';

export class FeeInvoiceEntity implements Partial<FeeInvoice> {
  @ApiProperty() id: string;
  @ApiProperty() studentId: string;
  @ApiProperty() academicYear: string;
  @ApiProperty() term: string;
  @ApiProperty() dueDate: Date;
  @ApiProperty() totalAmount: number;
  @ApiProperty() paidAmount: number;
  @ApiProperty({ enum: ['DRAFT','ISSUED','PARTIALLY_PAID','PAID','OVERDUE','WAIVED'] })
  status: FeeInvoiceStatus;
  @ApiProperty() createdAt: Date;
}
```

### Step 5 — Write the Service

**Business logic rules:**
1. Always accept `TenantContext` as the first parameter.
2. Always include `organizationId` in every Prisma query.
3. Always check `deletedAt: null` in read queries.
4. Throw NestJS HTTP exceptions — never return error objects.
5. Use `Promise.all` for independent parallel queries.

```typescript
// fee-invoices.service.ts
@Injectable()
export class FeeInvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    tenant: TenantContext,
    dto: CreateFeeInvoiceDto,
  ): Promise<FeeInvoiceEntity> {
    // Verify the student belongs to this tenant
    const student = await this.prisma.student.findFirst({
      where: { id: dto.studentId, organizationId: tenant.organizationId, deletedAt: null },
    });
    if (!student) throw new NotFoundException('Student not found');

    return this.prisma.feeInvoice.create({
      data: {
        ...dto,
        organizationId: tenant.organizationId,
        schoolId: tenant.schoolId,
        dueDate: new Date(dto.dueDate),
        totalAmount: dto.totalAmount,
        paidAmount: 0,
      },
    });
  }

  async findAll(
    tenant: TenantContext,
    filters: { studentId?: string; status?: FeeInvoiceStatus },
  ): Promise<FeeInvoiceEntity[]> {
    return this.prisma.feeInvoice.findMany({
      where: {
        organizationId: tenant.organizationId,
        deletedAt: null,
        ...(filters.studentId ? { studentId: filters.studentId } : {}),
        ...(filters.status ? { status: filters.status } : {}),
      },
      orderBy: { dueDate: 'asc' },
    });
  }
}
```

### Step 6 — Write the Controller

```typescript
// fee-invoices.controller.ts
@ApiTags('Fee Invoices')
@ApiBearerAuth()
@Controller('fee-invoices')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
export class FeeInvoicesController {
  constructor(private readonly feeInvoicesService: FeeInvoicesService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'FeeInvoice' })
  @ApiOperation({ summary: 'Create a fee invoice' })
  @ApiResponse({ status: 201, type: FeeInvoiceEntity })
  async create(
    @Body() dto: CreateFeeInvoiceDto,
    @CurrentTenant() tenant: TenantContext,
  ): Promise<FeeInvoiceEntity> {
    return this.feeInvoicesService.create(tenant, dto);
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'FeeInvoice' })
  @ApiOperation({ summary: 'List fee invoices' })
  async findAll(
    @CurrentTenant() tenant: TenantContext,
    @Query('studentId') studentId?: string,
    @Query('status') status?: FeeInvoiceStatus,
  ): Promise<FeeInvoiceEntity[]> {
    return this.feeInvoicesService.findAll(tenant, { studentId, status });
  }
}
```

### Step 7 — Define CASL Abilities

Add the new resource to `src/auth/abilities/ability.factory.ts`:

```typescript
// For each role, define what they can do with FeeInvoice
if (role === Role.FinanceAdmin) {
  can(Action.Manage, 'FeeInvoice', { schoolId: user.schoolId });
}
if (role === Role.Principal) {
  can(Action.Read, 'FeeInvoice', { schoolId: user.schoolId });
}
if (role === Role.Student) {
  can(Action.Read, 'FeeInvoice', { studentId: user.studentId });
}
if (role === Role.Parent) {
  can(Action.Read, 'FeeInvoice', { studentId: { $in: user.wardIds } });
}
```

### Step 8 — Write Unit Tests

```typescript
// tests/fee-invoices.service.spec.ts
describe('FeeInvoicesService', () => {
  let service: FeeInvoicesService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FeeInvoicesService,
        { provide: PrismaService, useValue: mockDeep<PrismaClient>() },
      ],
    }).compile();
    service = module.get(FeeInvoicesService);
    prisma = module.get(PrismaService);
  });

  describe('create()', () => {
    it('should throw NotFoundException when student does not belong to tenant', async () => {
      prisma.student.findFirst.mockResolvedValue(null);
      await expect(service.create(mockTenant, mockDto)).rejects.toThrow(NotFoundException);
    });

    it('should create and return a fee invoice when student is valid', async () => {
      prisma.student.findFirst.mockResolvedValue(mockStudent);
      prisma.feeInvoice.create.mockResolvedValue(mockInvoice);
      const result = await service.create(mockTenant, mockDto);
      expect(result.id).toBe(mockInvoice.id);
    });
  });
});
```

### Step 9 — Write Integration Tests

Integration tests go in `tests/fee-invoices.controller.spec.ts` and use
Supertest against the real test database. Cover at minimum:
- `POST /fee-invoices` — 201 success, 400 validation error, 403 wrong role
- `GET /fee-invoices` — 200 returns scoped list, 401 unauthenticated

## Validation Procedure

- [ ] Module is registered in AppModule
- [ ] All DTOs use class-validator decorators (no raw types accepted)
- [ ] All service methods include `organizationId` in Prisma queries
- [ ] All controller routes are guarded with `JwtAuthGuard` and `AbilitiesGuard`
- [ ] All controller routes have `@CheckAbilities` decorator
- [ ] CASL abilities defined for all roles that interact with this resource
- [ ] Unit tests cover all service methods: `pnpm turbo run test --filter=api`
- [ ] Integration tests cover all controller routes
- [ ] Type check passes: `pnpm turbo run type-check --filter=api`
- [ ] OpenAPI spec is complete (all `@ApiOperation`, `@ApiResponse` on routes)
- [ ] No business logic in controllers

## Definition of Done

1. Module scaffolded, registered, and all files in place.
2. All tests pass (unit + integration).
3. Type check passes.
4. CASL abilities defined for all roles.
5. OpenAPI decorators complete — spec generates without errors.
6. No cross-tenant data access possible (verified by integration test).
