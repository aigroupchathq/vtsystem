# Rule: Testing

Trigger: always_on
Scope: Entire repository — all test files

---

## Test Coverage Requirements

| Layer | Minimum Coverage | Tool |
|---|---|---|
| Backend services (business logic) | 80% line coverage | Vitest |
| Backend controllers | Integration tests (all routes) | Supertest |
| Frontend components | Unit tests for non-trivial logic | Vitest + RTL |
| Critical user journeys | E2E tests | Playwright |
| API load / performance | Load tests for key endpoints | k6 |

Coverage thresholds are enforced in `vitest.config.ts`:

```typescript
coverage: {
  thresholds: { lines: 80, functions: 80, branches: 75 },
  reporter: ['text', 'lcov', 'html'],
}
```

CI fails if coverage drops below thresholds.

---

## Test File Location

Co-locate tests with the code they test:

```
src/modules/students/
├── students.service.ts
├── students.service.spec.ts      # Unit tests for service
├── students.controller.ts
└── students.controller.spec.ts   # Integration tests for controller
```

E2E tests live in a top-level `e2e/` directory:

```
e2e/
├── auth.e2e.ts
├── students.e2e.ts
└── fee-collection.e2e.ts
```

---

## Test Naming Convention

Use descriptive three-part names: `[unit under test] [scenario] [expected outcome]`

```typescript
describe('StudentsService', () => {
  describe('create()', () => {
    it('should create a student and return the record when valid data is provided', async () => { ... });
    it('should throw NotFoundException when the school does not exist', async () => { ... });
    it('should throw ConflictException when enrollment number is already taken', async () => { ... });
  });
});
```

---

## Unit Tests (Backend)

Unit tests test a single service or utility in complete isolation.
All dependencies are mocked:

```typescript
// students.service.spec.ts
describe('StudentsService', () => {
  let service: StudentsService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StudentsService,
        { provide: PrismaService, useValue: mockDeep<PrismaClient>() },
      ],
    }).compile();

    service = module.get(StudentsService);
    prisma = module.get(PrismaService);
  });

  it('should return null when student is not found', async () => {
    prisma.student.findFirst.mockResolvedValue(null);
    const result = await service.findById(tenant, 'non-existent-id');
    expect(result).toBeNull();
  });
});
```

Use `jest-mock-extended` / `vitest-mock-extended` for Prisma client mocks.

---

## Integration Tests (API)

Integration tests test the full HTTP request → response cycle using
Supertest against a real test database (isolated, seeded before each suite):

```typescript
// students.controller.spec.ts
describe('POST /api/v1/students', () => {
  it('should return 201 and created student when authenticated as Principal', async () => {
    const token = await loginAsPrincipal(app);
    const res = await request(app.getHttpServer())
      .post('/api/v1/students')
      .set('Authorization', `Bearer ${token}`)
      .send({ firstName: 'Arjun', lastName: 'Sharma', ... })
      .expect(201);

    expect(res.body).toMatchObject({ firstName: 'Arjun' });
  });

  it('should return 403 when authenticated as a Student', async () => {
    const token = await loginAsStudent(app);
    await request(app.getHttpServer())
      .post('/api/v1/students')
      .set('Authorization', `Bearer ${token}`)
      .send({ ... })
      .expect(403);
  });
});
```

Each integration test suite:
1. Connects to a dedicated test PostgreSQL database (seeded by Prisma).
2. Runs in isolation — no shared state between suites.
3. Cleans up after itself.

---

## Frontend Tests (React Testing Library)

Test components from the user's perspective — not implementation details:

```typescript
// StudentCard.test.tsx
it('should display the student full name', () => {
  render(<StudentCard student={mockStudent} />);
  expect(screen.getByText('Arjun Sharma')).toBeInTheDocument();
});

it('should show the edit button only for authorised roles', () => {
  renderWithAbility(<StudentCard student={mockStudent} />, { can: [['update', 'Student']] });
  expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
});
```

**Do not test:**
- Implementation details (internal state, private methods)
- CSS classes or styles
- Library internals

---

## E2E Tests (Playwright)

E2E tests cover critical user journeys. Every journey must have at
least a happy-path E2E test:

Critical journeys to cover:
- [ ] Student enrolment flow (Admissions → SIS)
- [ ] Fee payment flow (Invoice → Payment → Receipt)
- [ ] Parent viewing ward's attendance
- [ ] Teacher marking attendance
- [ ] Principal generating a report

Playwright tests use the Page Object Model pattern. Page objects live in
`e2e/pages/`.

---

## Test Data

1. **Never use production data in tests.**
2. Use factory functions to create test data — not literal object
   literals scattered through tests.
3. Test factories live in `apps/api/test/factories/` (backend) and
   `apps/web/test/factories/` (frontend).
4. Factories produce randomised but realistic data using `@faker-js/faker`
   configured with Indian locale (`faker.locale = 'en_IN'`).

---

## What to Test

Always test:
- Business logic branches (all if/else paths in services)
- Authorization (that role X can/cannot access resource Y)
- Validation (that invalid input is rejected)
- Error cases (not-found, conflict, server error)
- Cross-tenant isolation (that tenant A cannot access tenant B's data)

Do not write tests for:
- Trivial getters/setters
- Framework boilerplate
- Third-party library behaviour
