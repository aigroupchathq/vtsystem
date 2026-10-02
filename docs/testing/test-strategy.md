# VEDIC TREE OS — Test Strategy

> Status: PLACEHOLDER — finalise after monorepo scaffold is complete

## Test Layers

| Layer | Tool | Coverage Target |
|---|---|---|
| Backend unit (services) | Vitest | 80% line |
| Backend integration (API) | Supertest | All routes |
| Frontend unit | Vitest + RTL | Non-trivial components |
| E2E | Playwright | Critical journeys |
| Load | k6 | Key API endpoints |
| Accessibility | @axe-core/playwright | All pages |

## Critical Journeys (must have E2E)

- [ ] Student enrolment flow
- [ ] Fee payment flow
- [ ] Attendance marking (Teacher)
- [ ] Parent viewing ward's progress
- [ ] Principal report generation
- [ ] Multi-tenant isolation verification

## CI Test Pipeline

On every PR:
1. pnpm turbo run lint
2. pnpm turbo run type-check
3. pnpm turbo run test (unit + integration)
4. pnpm turbo run build
5. Playwright E2E (on staging deploy)

Coverage report posted as PR comment.
