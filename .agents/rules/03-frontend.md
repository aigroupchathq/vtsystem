# Rule: Frontend

Trigger: always_on
Scope: apps/web

---

## Framework

Use **Next.js 14+ with the App Router**. The Pages Router is not used.
Server Components are the default. Use Client Components only when
interactivity or browser APIs are required. Mark client components
explicitly with `'use client'` at the top of the file.

---

## Component Hierarchy

```
Server Component (default)
  └── fetches data via direct Prisma/service call or fetch()
  └── passes data down as props

Client Component ('use client')
  └── handles interactivity, form state, animations
  └── receives data as props or uses TanStack Query
```

**Rules:**
1. Do not fetch data inside Client Components via useEffect + fetch.
   Use TanStack Query (`useQuery`, `useMutation`) for all client-side
   data fetching.
2. Do not put large data-fetching logic into Server Components directly
   — extract into a `lib/api/` query function.
3. Do not mix server-only imports (e.g., `prisma`, `next/headers`) into
   files that also export Client Components.

---

## Component Structure

Every React component file follows this order:

```typescript
// 1. Imports
import type { ... } from '...';
import { ... } from '...';

// 2. Types local to this file
type Props = { ... };

// 3. Constants local to this file (if any)
const MAX_ITEMS = 10;

// 4. Component function (named, not default anonymous arrow)
export function StudentCard({ student }: Props): React.JSX.Element {
  // hooks at top
  // derived state
  // handlers
  // early returns (loading, error, empty)
  // render
}
```

**Naming:**
- Component files: `StudentCard.tsx` (PascalCase)
- Component functions: named exports preferred over default exports
  (better refactoring support). Exception: Next.js `page.tsx`, `layout.tsx`,
  `loading.tsx`, `error.tsx`, `not-found.tsx` use default exports
  (Next.js requirement).

---

## Styling

Use **Tailwind CSS** exclusively for styling. Do not use CSS Modules,
styled-components, or inline `style` props (except for dynamic values
that Tailwind cannot express, e.g., calculated pixel offsets).

Tailwind conventions:
- Use the design token names defined in `packages/config/tailwind.config.base.ts`
  — do not use raw colour hex values in className.
- Use the `cn()` utility (from `packages/ui/src/lib/utils.ts`) for
  conditional class merging — never string concatenation.
- Responsive design is mobile-first: base classes target mobile,
  `sm:`, `md:`, `lg:`, `xl:` add progressive enhancements.
- Dark mode is supported via the `dark:` variant and the
  `data-theme` attribute strategy — not via `@media (prefers-color-scheme)`.

---

## shadcn/ui Components

shadcn/ui components live in `apps/web/src/components/ui/` and are
generated via the shadcn CLI. They are the foundation layer.

**Rules:**
1. Do not edit generated shadcn/ui files directly. Instead, create a
   composed wrapper in `components/shared/` that adds Vedic Tree OS
   specific props or styling.
2. When a new UI primitive is needed, check shadcn/ui's catalogue first.
   Only build a custom primitive if no equivalent exists.
3. All interactive components must be keyboard-accessible and have
   correct ARIA attributes (shadcn/ui handles this for its components —
   preserve these attributes when wrapping).

---

## Forms

All forms use **React Hook Form + Zod**:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateStudentSchema, type CreateStudentDto } from '@types/student';

const form = useForm<CreateStudentDto>({
  resolver: zodResolver(CreateStudentSchema),
  defaultValues: { firstName: '', lastName: '' },
});
```

- Never use uncontrolled inputs without React Hook Form.
- Never validate form inputs manually — always delegate to Zod schema.
- Display field-level error messages using React Hook Form's
  `formState.errors`.

---

## State Management

| State Type | Solution |
|---|---|
| Server state (API data) | TanStack Query (`useQuery`, `useMutation`) |
| Form state | React Hook Form |
| Local component state | `useState`, `useReducer` |
| Shared client state (minimal) | React Context or Zustand (only if Context causes performance issues) |
| URL state (filters, pagination) | `useSearchParams` via Next.js |

Do not use Redux. Do not use global state for data that belongs in
TanStack Query's cache. Do not use Context for large state trees.

---

## Performance

1. Use `next/image` for all images — never raw `<img>` tags.
2. Use `next/font` for font loading — fonts are defined in
   `apps/web/src/app/layout.tsx`.
3. Lazy-load heavy components with `next/dynamic`.
4. Use `React.memo` only when there is a measured performance problem —
   do not apply it preemptively.
5. Large tables or lists must use virtualisation (`@tanstack/react-virtual`).

---

## Accessibility

Every UI component must meet WCAG 2.1 AA as a minimum.

- All form inputs have associated `<label>` elements.
- All icon-only buttons have `aria-label`.
- All images have meaningful `alt` text (or `alt=""` for decorative images).
- Color is never the sole means of conveying information.
- Focus indicators are visible — never `outline: none` without a custom
  focus ring replacement.
- Run `@axe-core/playwright` in the E2E test suite to catch violations.
