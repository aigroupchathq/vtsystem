# Rule: Backend

Trigger: always_on
Scope: apps/api

---

## Framework

The backend is **NestJS** with TypeScript, strict mode on. All files are
`.ts` — no `.js` files anywhere in `apps/api/src/`.

---

## Module Structure

Every feature module follows this layout:

```
src/modules/students/
├── students.module.ts          # NestJS @Module decorator
├── students.controller.ts      # HTTP route handlers only — no business logic
├── students.service.ts         # Business logic
├── students.repository.ts      # Data access via Prisma (optional layer)
├── dto/
│   ├── create-student.dto.ts   # Request body schema (class-validator or Zod)
│   └── update-student.dto.ts
├── entities/
│   └── student.entity.ts       # Response shape (for OpenAPI @ApiProperty)
└── tests/
    ├── students.service.spec.ts
    └── students.controller.spec.ts
```

---

## Controller Rules

Controllers are **thin orchestration layers only**:

```typescript
@Controller('students')
@UseGuards(JwtAuthGuard, AbilitiesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Student' })
  async create(
    @Body() dto: CreateStudentDto,
    @CurrentTenant() tenant: TenantContext,
  ): Promise<StudentEntity> {
    return this.studentsService.create(tenant, dto);
  }
}
```

Rules:
1. No database calls in controllers.
2. No business logic in controllers.
3. No try/catch in controllers — use NestJS exception filters.
4. Always apply `@UseGuards(JwtAuthGuard, AbilitiesGuard)` to every
   protected route.
5. Always extract tenant context via `@CurrentTenant()` decorator — never
   read from the request object directly in business logic.

---

## Service Rules

Services contain all business logic:

1. Services are the only layer that calls the repository or Prisma directly.
2. Services throw NestJS `HttpException` subclasses (`NotFoundException`,
   `ForbiddenException`, etc.) — never return error objects.
3. Services are unit-testable in isolation with mocked repositories.
4. Services must not call other module's repositories directly — inject
   the other module's service if cross-module data is needed.

---

## Validation Pipeline

All incoming requests are validated by the global `ValidationPipe`:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,        // Strip unknown properties
    forbidNonWhitelisted: true, // Throw on unknown properties
    transform: true,        // Auto-transform to DTO class instances
  }),
);
```

DTOs use `class-validator` decorators:

```typescript
export class CreateStudentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsUUID()
  schoolId: string;
}
```

Alternatively, use Zod with `ZodValidationPipe` for consistency with
frontend schemas (import from `packages/types`).

---

## Error Handling

All unhandled exceptions are caught by a global `HttpExceptionFilter` that:
1. Logs the error with correlation ID and tenant context (no PII in logs).
2. Returns a standardised error response shape:

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Student not found",
  "correlationId": "req-abc123",
  "timestamp": "2026-10-02T18:00:00.000Z"
}
```

Never return stack traces in production responses.

---

## Async Rules

1. All service methods that touch the database or external APIs must be
   `async` and return `Promise<T>`.
2. Never use callbacks — always `async/await`.
3. Always `await` Promises — never fire-and-forget inside a request
   handler (use BullMQ jobs for background work).
4. Use `Promise.all([...])` to run independent async operations in
   parallel — never sequential `await` on unrelated operations.

---

## Configuration

All configuration is loaded from environment variables validated by the
`ConfigModule` (using Zod schema). Access config via `ConfigService` —
never `process.env` directly.

```typescript
@Injectable()
export class StudentsService {
  constructor(
    private readonly config: ConfigService<Env>,
    private readonly prisma: PrismaService,
  ) {}
}
```

---

## Background Jobs (BullMQ)

All long-running, non-blocking operations use BullMQ queues:

- Fee reminder batch sends
- Report generation
- Document exports
- Bulk data imports
- Notification fan-out

Queues are defined in `src/queues/`. Each queue has a dedicated processor
class decorated with `@Processor('queue-name')`.

Never block the HTTP request cycle with operations that take more than
~200ms. Offload to a queue job and return a `202 Accepted` with a job ID.
