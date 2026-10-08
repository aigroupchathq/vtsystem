---
name: vtos-frontend-feature-development
description: >-
  Use this skill when building a frontend feature in apps/web for VEDIC TREE OS.
  Covers creating Next.js App Router pages, Server and Client components,
  TanStack Query hooks, React Hook Form integration, i18n wiring, and role-based
  UI visibility. Activate when the user says "build the frontend for", "create
  the page for", "implement the UI for", "add a screen for", or "wire up the
  frontend feature".
---

# Skill: Frontend Feature Development

## When to Use

- A UX design and API contract are ready and a frontend page or feature needs building.
- A new route needs to be added to the Next.js App Router.
- A data-fetching hook for a new API endpoint needs to be created.
- A form needs to be wired up with validation and submission.
- Role-based visibility needs to be implemented for a feature.

## Prerequisites

- [ ] UX design document exists (`docs/ux/`) or screen requirements are clearly specified.
- [ ] API endpoints for this feature exist and are documented (`docs/api/openapi.json`
      or the `api-contract-development` skill has been run).
- [ ] Required UI components exist in `packages/ui` or `apps/web/src/components/ui/`.
- [ ] i18n message keys for this feature are planned.
- [ ] CASL abilities for the required roles are defined in the backend.

## Execution Procedure

### Step 1 — Create the Route

Determine the route path from the URL strategy in `10-multi-tenancy.md`.

```
# Example: Fee invoices for a school
app/(dashboard)/[orgSlug]/[schoolSlug]/finance/fee-invoices/
├── page.tsx          # Server Component — fetches initial data
├── loading.tsx       # Suspense loading state
├── error.tsx         # Error boundary
└── [invoiceId]/
    └── page.tsx      # Invoice detail page
```

### Step 2 — Implement the Server Component (Page)

Server Components fetch data directly and pass it to Client Components.
They do NOT have interactivity.

```typescript
// app/(dashboard)/[orgSlug]/[schoolSlug]/finance/fee-invoices/page.tsx
import { getTranslations } from 'next-intl/server';
import { FeeInvoiceList } from '@/components/finance/FeeInvoiceList';
import { fetchFeeInvoices } from '@/lib/api/finance';
import type { PageProps } from '@/types/next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('feeInvoices');
  return { title: t('pageTitle') };
}

export default async function FeeInvoicesPage({ params }: PageProps): Promise<React.JSX.Element> {
  const invoices = await fetchFeeInvoices(params.schoolSlug);

  return (
    <div>
      <FeeInvoiceList initialData={invoices} />
    </div>
  );
}
```

### Step 3 — Create the API Client Function

API functions live in `apps/web/src/lib/api/<domain>.ts`.
They use `fetch` with the server session token.

```typescript
// lib/api/finance.ts
import { apiClient } from '@/lib/api/client';
import type { FeeInvoice } from '@types/finance';

export async function fetchFeeInvoices(
  schoolSlug: string,
  filters?: { studentId?: string; status?: string },
): Promise<FeeInvoice[]> {
  const params = new URLSearchParams(filters as Record<string, string>);
  return apiClient.get<FeeInvoice[]>(
    `/fee-invoices?${params}`,
    { schoolSlug },
  );
}

export async function createFeeInvoice(
  schoolSlug: string,
  data: CreateFeeInvoiceDto,
): Promise<FeeInvoice> {
  return apiClient.post<FeeInvoice>('/fee-invoices', data, { schoolSlug });
}
```

### Step 4 — Create TanStack Query Hooks

Query hooks live in `apps/web/src/lib/api/hooks/<domain>.ts`.

```typescript
// lib/api/hooks/finance.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFeeInvoices, createFeeInvoice } from '@/lib/api/finance';
import { toast } from '@/components/ui/use-toast';
import { useTranslations } from 'next-intl';

export const feeInvoiceKeys = {
  all: ['fee-invoices'] as const,
  list: (filters: object) => [...feeInvoiceKeys.all, 'list', filters] as const,
};

export function useFeeInvoices(schoolSlug: string, filters?: object) {
  return useQuery({
    queryKey: feeInvoiceKeys.list(filters ?? {}),
    queryFn: () => fetchFeeInvoices(schoolSlug, filters),
    staleTime: 60_000, // 1 minute
  });
}

export function useCreateFeeInvoice(schoolSlug: string) {
  const queryClient = useQueryClient();
  const t = useTranslations('feeInvoices');

  return useMutation({
    mutationFn: (data: CreateFeeInvoiceDto) => createFeeInvoice(schoolSlug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feeInvoiceKeys.all });
      toast({ title: t('createSuccess') });
    },
    onError: () => {
      toast({ title: t('createError'), variant: 'destructive' });
    },
  });
}
```

### Step 5 — Implement the Client Component

Mark the file with `'use client'`. Use TanStack Query for data, React Hook Form
for forms.

```typescript
// components/finance/FeeInvoiceList.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useFeeInvoices } from '@/lib/api/hooks/finance';
import { useTenant } from '@/lib/auth/useTenant';
import { DataTable } from '@/components/ui/data-table';
import { FeeInvoiceEmptyState } from './FeeInvoiceEmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import type { FeeInvoice } from '@types/finance';

type FeeInvoiceListProps = {
  initialData: FeeInvoice[];
};

export function FeeInvoiceList({ initialData }: FeeInvoiceListProps): React.JSX.Element {
  const t = useTranslations('feeInvoices');
  const { schoolSlug } = useTenant();
  const { data: invoices, isLoading, isError } = useFeeInvoices(schoolSlug, {
    initialData,
  });

  if (isLoading) return <Skeleton className="h-64 w-full" />;
  if (isError) return <div role="alert">{t('errors.fetchFailed')}</div>;
  if (!invoices?.length) return <FeeInvoiceEmptyState />;

  return <DataTable columns={columns} data={invoices} />;
}
```

### Step 6 — Wire Up i18n

Add message keys to `apps/web/src/messages/en.json`:

```json
{
  "feeInvoices": {
    "pageTitle": "Fee Invoices",
    "createInvoice": "Create Invoice",
    "createSuccess": "Invoice created successfully",
    "createError": "Failed to create invoice. Please try again.",
    "errors": {
      "fetchFailed": "Failed to load invoices. Please try again."
    },
    "empty": {
      "title": "No invoices yet",
      "description": "Create the first fee invoice for this term."
    }
  }
}
```

Add the same keys (untranslated initially) to `hi.json` and `mr.json`.

### Step 7 — Implement Role-Based Visibility

Use the CASL React integration to conditionally render elements:

```typescript
import { useAbility } from '@casl/react';
import { AbilityContext } from '@/lib/auth/AbilityContext';

const ability = useAbility(AbilityContext);

{ability.can('create', 'FeeInvoice') && (
  <Button onClick={openCreateModal}>{t('createInvoice')}</Button>
)}
```

### Step 8 — Handle Loading, Empty, and Error States

Every data-displaying component must implement all three states:

- **Loading**: `<Skeleton>` or shimmer placeholder
- **Empty**: Illustration + descriptive message + CTA (from `09-ux-ui.md` standard)
- **Error**: Human-readable message + Retry button + `role="alert"` on the container

## Validation Procedure

- [ ] Route exists in the correct App Router path
- [ ] `loading.tsx` and `error.tsx` exist for the route
- [ ] All user-visible strings use `t()` from next-intl (no hardcoded English)
- [ ] Message keys exist in `en.json`, `hi.json`, `mr.json`
- [ ] TanStack Query is used for all client-side fetching (no bare useEffect+fetch)
- [ ] Role-based visibility uses CASL ability checks
- [ ] Loading, empty, and error states are all implemented
- [ ] Type check passes: `pnpm turbo run type-check --filter=web`
- [ ] No `any` types in component props
- [ ] `next/image` used for all images (no raw `<img>`)

## Definition of Done

1. Route renders correctly in development.
2. All three states (loading, empty, error) are implemented and tested.
3. Role-based visibility works: create/edit controls hidden for non-authorised roles.
4. i18n keys exist in all three base languages.
5. Type check passes.
6. Component tests cover the key rendering logic.
7. No accessibility violations (`axe` in E2E or Storybook).
