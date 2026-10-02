---
name: vtos-testing-and-qa
description: >-
  Use this skill when writing, running, or reviewing tests for VEDIC TREE OS.
  Covers unit tests for NestJS services, integration tests for API controllers,
  React Testing Library tests for frontend components, Playwright E2E tests for
  critical journeys, and accessibility audits. Activate when the user says
  "write tests for", "add test coverage", "QA the feature", "E2E test",
  "integration test", or "test the [module/component]".
---

# Skill: Testing and QA

## When to Use

- A module has been implemented and needs test coverage before it can be merged.
- An E2E test for a critical user journey needs to be written.
- An existing test is failing and needs to be debugged.
- Coverage thresholds have been missed and need to be addressed.
- An accessibility audit needs to be run on a page or component.

## Prerequisites

- [ ] The feature being tested is implemented (or at least the interface is stable).
- [ ] Test environment is configured (`apps/api/.env.test`, test database seeded).
- [ ] For E2E tests: the feature must be deployed to the staging environment or
      be runnable locally end-to-end.
- [ ] For new features: the product spec and API contract exist to write
      meaningful assertions against.

## Execution Procedure

### Step 1 — Determine Which Tests Are Needed

| Scenario | Test type needed |
|---|---|
| New service method | Unit test |
| New API endpoint | Integration test |
| New React component with logic | Component test (Vitest + RTL) |
| New critical user journey | E2E test (Playwright) |
| New page | Accessibility audit |
| Security-sensitive operation | Tenant isolation integration test |

### Step 2 — Unit Tests (Backend Services)

Unit tests are in `src/modules/<module>/tests/<module>.service.spec.ts`.

**Setup pattern:**
```typescript
import { Test } from '@nestjs/testing';
import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { FeeInvoicesService } from '../fee-invoices.service';
import { PrismaService } from '@/prisma/prisma.service';
import { makeTenant, makeStudent, makeInvoice } from '@/test/factories';

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

  afterEach(() => vi.clearAllMocks());
```

**Coverage targets per service:**
- Every public method has at least a happy-path test
- Every `throw` branch has a test that verifies the exception type
- Every Prisma call is verified to include `organizationId` in the where clause

### Step 3 — Integration Tests (API Controllers)

Integration tests are in `src/modules/<module>/tests/<module>.controller.spec.ts`.

Use `@nestjs/testing` to create the full module, and Supertest for HTTP:

```typescript
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { bootstrapTestApp, cleanTestDb } from '@/test/helpers';
import { createTestTenant, loginAs } from '@/test/auth-helpers';

describe('FeeInvoicesController (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await bootstrapTestApp();
  });

  beforeEach(async () => {
    await cleanTestDb(); // truncate all tables, re-seed
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/v1/fee-invoices', () => {
    it('returns 201 with created invoice when Finance Admin submits valid data', async () => {
      const { tenant, financeAdmin } = await createTestTenant();
      const token = await loginAs(app, financeAdmin);
      const student = await tenant.createStudent();

      const res = await request(app.getHttpServer())
        .post('/api/v1/fee-invoices')
        .set('Authorization', `Bearer ${token}`)
        .send({
          studentId: student.id,
          academicYear: '2026-27',
          term: 'Term 1',
          dueDate: '2026-10-31T00:00:00.000Z',
          totalAmount: 12500,
        })
        .expect(201);

      expect(res.body).toMatchObject({
        studentId: student.id,
        status: 'DRAFT',
        totalAmount: '12500.00',
      });
    });

    it('returns 403 when Teacher attempts to create invoice', async () => {
      const { tenant, teacher } = await createTestTenant();
      const token = await loginAs(app, teacher);
      await request(app.getHttpServer())
        .post('/api/v1/fee-invoices')
        .set('Authorization', `Bearer ${token}`)
        .send({ /* valid body */ })
        .expect(403);
    });

    it('returns 400 when totalAmount is negative', async () => {
      const { financeAdmin } = await createTestTenant();
      const token = await loginAs(app, financeAdmin);
      await request(app.getHttpServer())
        .post('/api/v1/fee-invoices')
        .set('Authorization', `Bearer ${token}`)
        .send({ totalAmount: -100, /* other fields */ })
        .expect(400);
    });
  });
});
```

### Step 4 — Component Tests (React)

Component tests are in `*.test.tsx` co-located with the component.

```typescript
// FeeInvoiceStatusBadge.test.tsx
import { render, screen } from '@testing-library/react';
import { FeeInvoiceStatusBadge } from './FeeInvoiceStatusBadge';

describe('FeeInvoiceStatusBadge', () => {
  it.each([
    ['PAID', 'Paid'],
    ['OVERDUE', 'Overdue'],
    ['DRAFT', 'Draft'],
  ])('renders correct label for status %s', (status, expectedLabel) => {
    render(<FeeInvoiceStatusBadge status={status as FeeInvoiceStatus} />);
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
  });

  it('applies destructive style for OVERDUE status', () => {
    render(<FeeInvoiceStatusBadge status="OVERDUE" />);
    expect(screen.getByText('Overdue')).toHaveClass('bg-destructive');
  });
});
```

Do not test Tailwind classes — only test meaningful logic or accessibility.

### Step 5 — E2E Tests (Playwright)

E2E tests are in `e2e/` at the repository root.
Use the Page Object Model pattern.

```typescript
// e2e/pages/fee-invoices.page.ts
import type { Page } from '@playwright/test';

export class FeeInvoicesPage {
  constructor(private readonly page: Page) {}

  async goto(orgSlug: string, schoolSlug: string): Promise<void> {
    await this.page.goto(`/dashboard/${orgSlug}/${schoolSlug}/finance/fee-invoices`);
  }

  get createButton() {
    return this.page.getByRole('button', { name: /create invoice/i });
  }

  get invoiceList() {
    return this.page.getByRole('table');
  }
}
```

```typescript
// e2e/fee-invoices.e2e.ts
import { test, expect } from '@playwright/test';
import { FeeInvoicesPage } from './pages/fee-invoices.page';
import { loginAs } from './helpers/auth';

test.describe('Fee Invoices — Finance Admin journey', () => {
  test('Finance Admin can create a fee invoice', async ({ page }) => {
    await loginAs(page, 'finance-admin');
    const invoicesPage = new FeeInvoicesPage(page);
    await invoicesPage.goto('vedic-tree', 'mumbai-primary');

    await expect(invoicesPage.createButton).toBeVisible();
    await invoicesPage.createButton.click();

    // Fill form and submit
    await page.getByLabel(/student/i).fill('Arjun');
    // ... complete form
    await page.getByRole('button', { name: /create/i }).click();

    await expect(page.getByText('Invoice created successfully')).toBeVisible();
  });

  test('Parent cannot see the Create Invoice button', async ({ page }) => {
    await loginAs(page, 'parent');
    const invoicesPage = new FeeInvoicesPage(page);
    await invoicesPage.goto('vedic-tree', 'mumbai-primary');

    await expect(invoicesPage.createButton).not.toBeVisible();
  });
});
```

### Step 6 — Accessibility Audit

For every new page added, run an accessibility audit:

```typescript
// In the E2E test for the page
import AxeBuilder from '@axe-core/playwright';

test('Fee Invoices page has no accessibility violations', async ({ page }) => {
  await loginAs(page, 'finance-admin');
  await page.goto('/dashboard/vedic-tree/mumbai-primary/finance/fee-invoices');

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

Block merges on `critical` or `serious` axe violations.

## Validation Procedure

- [ ] All tests pass: `pnpm turbo run test`
- [ ] Coverage thresholds met: `pnpm vitest --coverage`
- [ ] No failing E2E tests: `pnpm playwright test`
- [ ] No axe violations (critical or serious) on new pages
- [ ] Tenant isolation test exists for every module that stores tenant data
- [ ] Every public service method has at least one test
- [ ] Every API endpoint tested for at minimum: success, 400 validation, 403 wrong role

## Definition of Done

1. All unit tests pass.
2. All integration tests pass with real test database.
3. Coverage does not drop below thresholds (80% lines, 75% branches).
4. E2E test exists for any critical user journey introduced by this feature.
5. Accessibility audit passes.
6. No `test.skip` or `it.skip` without a linked GitHub issue explaining why.
