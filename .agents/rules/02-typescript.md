# Rule: TypeScript

Trigger: always_on
Scope: All TypeScript/TSX source files

---

## Strict Mode Is Always On

All `tsconfig.json` files must extend `packages/config/tsconfig.base.json`
which sets:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

Never disable `strict` or any of these flags. If a third-party type
requires a workaround, use a narrow type assertion with a comment explaining
why — never a blanket `any`.

---

## Type Rules

### Never use `any`
`any` disables type checking and defeats the purpose of TypeScript. Use:
- `unknown` when the type is genuinely unknown, then narrow with guards
- `never` for exhaustive checks
- A proper interface or type alias for domain objects

If you must accept `any` from a third-party library, wrap it immediately
in a typed adapter with a comment: `// External library returns untyped response`.

### Prefer `type` over `interface` for domain objects
Use `type` for domain DTOs, response shapes, and union types.
Use `interface` only when extension (declaration merging) is required.

### Explicit return types on all exported functions
Every exported function and method must have an explicit return type
annotation. This is enforced by ESLint rule `@typescript-eslint/explicit-function-return-type`.

```typescript
// ✅ Correct
export function getStudentById(id: string): Promise<Student | null> { ... }

// ❌ Wrong — return type inferred
export function getStudentById(id: string) { ... }
```

### Use discriminated unions for state
Model loading/error/success states as discriminated unions, not optional
fields:

```typescript
// ✅ Correct
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// ❌ Wrong
type FetchState<T> = {
  loading?: boolean;
  data?: T;
  error?: Error;
};
```

### Zod for runtime validation
All external inputs (API request bodies, URL params, env vars, webhook
payloads) must be validated with Zod before they are used. Infer
TypeScript types from Zod schemas — do not maintain a parallel type and
schema for the same shape.

```typescript
// packages/types/src/student.ts
import { z } from 'zod';

export const CreateStudentSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  dateOfBirth: z.string().datetime(),
  enrollmentNumber: z.string().optional(),
});

export type CreateStudentDto = z.infer<typeof CreateStudentSchema>;
```

### Environment variables
All environment variables must be declared in a Zod schema and validated
at application startup. Access env vars only through the validated config
object — never `process.env.SOME_VAR` inline.

```typescript
// apps/api/src/config/env.ts
import { z } from 'zod';

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  REDIS_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
});

export const env = EnvSchema.parse(process.env);
```

---

## Import Conventions

1. Use path aliases — never relative `../../../` imports that cross module
   boundaries. Configure `@web/*`, `@api/*`, `@types/*` aliases.
2. Import types with `import type { ... }` to prevent runtime bloat.
3. Barrel files (`index.ts`) are permitted for packages but discouraged
   inside application modules — prefer explicit imports.

---

## Naming Conventions

| Construct | Convention | Example |
|---|---|---|
| Types / Interfaces | PascalCase | `Student`, `CreateStudentDto` |
| Zod schemas | PascalCase + Schema suffix | `CreateStudentSchema` |
| Functions | camelCase | `getStudentById` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FILE_SIZE_MB` |
| Enum members | PascalCase | `Role.Teacher`, `SubscriptionTier.Standard` |
| Files | kebab-case | `student-service.ts`, `create-student.dto.ts` |
| React components | PascalCase | `StudentCard.tsx` |
| React hooks | camelCase with `use` prefix | `useStudentQuery.ts` |
