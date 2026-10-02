---
name: vtos-browser-verification
description: >-
  Use this skill when performing manual or automated browser verification of VEDIC TREE OS
  user interfaces, workflows, responsive layouts, or role-based experiences. Covers using
  browser subagent, Chrome DevTools, responsive viewports, accessibility verification,
  tenant switching validation, and capturing proof of functional completion.
---

# Skill: Browser Verification

## When to Use

- Verifying that a new UI screen, form, or dashboard renders and operates correctly in a real browser.
- Testing responsive breakpoints (Mobile: 375px, Tablet: 768px, Desktop: 1280px+).
- Validating role-based UI experiences (HQ Admin vs. School Admin vs. Teacher vs. Parent).
- Verifying multi-tenant isolation and tenant switching in the browser.
- Performing visual regressions, empty state, loading state, and error toast validations.

## Prerequisites

- [ ] Local web development server (`apps/web`) is running and reachable.
- [ ] Backend API (`apps/api`) and test database are seeded with realistic multi-tenant data.
- [ ] Test user accounts with credentials for relevant roles (HQ, Principal, Teacher, Parent) are available.
- [ ] Browser automation / verification tools (browser subagent or Playwright) are operational.

## Execution Procedure

### Step 1 — Define the Verification Matrix

For the target feature, identify:
1. **Target URLs and Routes** (e.g. `/schools/[id]/students`, `/finance/invoices`).
2. **Roles to Test** (Admin, Teacher, Parent, Unauthorized User).
3. **Form States to Exercise**:
   - Initial render & skeleton loading state.
   - Successful submission with toast notification.
   - Client-side validation errors (empty required fields, invalid email/phone).
   - Server-side error handling (conflict, rate limit, permission denied).
4. **Viewports**:
   - Mobile: 375x812 (iPhone 13/14)
   - Tablet: 768x1024 (iPad Portrait)
   - Desktop: 1440x900 (MacBook Pro standard)

### Step 2 — Automated & Interactive Browser Traversal

1. Navigate to the login route `/login`.
2. Authenticate with appropriate role credentials and store session token.
3. Verify tenant context indicator in the top navbar (School Name, Campus selector, User Avatar).
4. Navigate to the feature under test.
5. Inspect the DOM to verify:
   - Unique, semantic `data-testid` or IDs on critical inputs and buttons.
   - Correct ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-describedby` for error states).
   - Adequate color contrast on all text elements (minimum 4.5:1 for normal text).
6. Perform form interactions:
   - Fill valid and invalid inputs.
   - Verify keyboard tab navigation focus rings.
   - Click submit and verify loading spinner/disabled button behavior.
   - Confirm table updates without full page reloads.

### Step 3 — Multi-Tenant & RBAC Verification in Browser

1. Attempt direct URL navigation to a restricted page with an unprivileged role (e.g., Parent accessing `/finance/settings`).
2. Verify redirect to `/unauthorized` or 403 Forbidden banner with "Return to Dashboard" action.
3. Switch tenant via the organization/campus switcher:
   - Ensure cached queries are invalidated and refetched.
   - Confirm no residual data from the previous tenant is visible in tables or selectors.

## Validation Procedure

- [ ] Every user journey succeeds without uncaught JavaScript exceptions in the console.
- [ ] Network tab confirms all API requests carry the appropriate tenant header (`x-tenant-id`).
- [ ] Responsive layouts adjust gracefully with zero horizontal scroll on mobile (375px).
- [ ] Empty states show helpful onboarding copy and action buttons when lists are empty.
- [ ] Error toasts and field error messages display friendly, localized strings.

## Definition of Done

1. Complete verification checklist recorded with screenshots or step logs.
2. Zero console errors or unhandled promise rejections.
3. All primary touch targets on mobile are >= 44x44px.
4. Tenant boundary integrity confirmed across all role perspectives.
