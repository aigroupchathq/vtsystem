---
name: vtos-ux-design
description: >-
  Use this skill when designing user experience flows, journey maps, interaction
  models, or wireframe descriptions for VEDIC TREE OS screens. Covers persona
  mapping, task analysis, user flow documentation, and placing outputs in
  docs/ux/. Activate when the user says "design the UX for", "map the user
  journey", "wireframe", "user flow", or "how should this feature work from
  the user's perspective".
---

# Skill: UX Design

## When to Use

- A product specification has been approved and UX needs to be designed before
  any UI implementation begins.
- An existing feature has a confusing flow and needs to be re-evaluated.
- A new role is being introduced and their end-to-end journey needs mapping.
- A complex multi-step workflow (e.g., fee collection, student enrolment) needs
  to be broken into discrete screens.

## Prerequisites

- [ ] A product specification exists in `docs/product/` for this feature (or the
      requirements are clearly stated by the user).
- [ ] The target role(s) are confirmed (see `09-ux-ui.md` role table).
- [ ] The device context is known (mobile-first for Student/Parent; desktop for Admin).

## Execution Procedure

### Step 1 — Identify the Persona and Context

Document:
- **Primary persona**: Who is the user? (e.g., Parent on a mobile phone)
- **Goal**: What are they trying to accomplish?
- **Entry point**: How do they arrive at this flow? (Dashboard, notification, search)
- **Exit point**: What is the successful outcome state?
- **Error paths**: What can go wrong and where?

### Step 2 — Write the User Flow

Output file: `docs/ux/<module>/<feature-slug>-flow.md`

Use this format:

```markdown
# [Feature] — User Flow

**Persona:** [Role + context — e.g., "Parent on mobile"]
**Goal:** [One sentence]
**Happy Path Steps:**

1. [Step — e.g., "Parent opens the app and sees the Home dashboard"]
2. [Step]
3. [Step — terminal success state]

**Alternative Paths:**

- If [condition]: [what happens instead]
- If [condition]: [what happens instead]

**Error States:**

- [Error scenario]: [how the system communicates it and what the user can do]

**Out of Scope (handled elsewhere):**
- [What this flow does NOT cover]
```

### Step 3 — Define Screen Inventory

List every distinct screen or state in the flow:

```markdown
## Screen Inventory

| Screen ID | Name | Entry From | Exits To | Notes |
|---|---|---|---|---|
| SCR-001 | Fee Overview | Home dashboard | SCR-002, SCR-005 | Shows unpaid invoices |
| SCR-002 | Fee Detail | SCR-001 | SCR-003, SCR-001 | Single invoice detail |
| SCR-003 | Payment Gateway | SCR-002 | SCR-004, SCR-002 | Razorpay redirect |
| SCR-004 | Payment Confirmation | SCR-003 | Home dashboard | Success state |
| SCR-005 | Contact School | SCR-001 | SCR-001 | Query flow |
```

### Step 4 — Write Interaction Notes per Screen

For each screen in the inventory, document:
- **Primary action** (the single most important CTA)
- **Secondary actions**
- **Empty state** (what appears when there is no data)
- **Loading state** (how the screen behaves while data fetches)
- **Error state** (what the user sees if the request fails)
- **Edge cases** (first-time user, no permissions, feature disabled)

### Step 5 — Apply Role-Specific Design Principles

Cross-check against `09-ux-ui.md`:
- Does the information density match the role?
- Is the primary action within one click of the entry point?
- Is the copy appropriate for the audience (jargon-free for students/parents)?
- Mobile-first if this is a Student/Parent flow?

### Step 6 — Generate Wireframe Description (if required)

If a visual wireframe is needed, describe the layout in structured prose
that can be used by a designer or the UI Design System skill:

```markdown
## Wireframe: Fee Overview (SCR-001)

**Layout:** Single-column, mobile viewport (375px)
**Header:** "My Fees" title, notification bell icon
**Content area:**
  - Summary card: total outstanding amount (large text, red if overdue)
  - List of invoices (card per invoice): term name, amount, due date, status chip
  - Each card is tappable → navigates to SCR-002
**Bottom navigation:** Tab bar (Home, Academics, Fees, Profile)
**Empty state:** Illustration + "All fees paid. Great job!" message
```

## Validation Procedure

- [ ] User flow document exists in `docs/ux/<module>/`
- [ ] All screens in the happy path are named and sequenced
- [ ] At least 2 error states are documented
- [ ] Empty and loading states are described for every screen
- [ ] The flow respects the role's device context (mobile vs desktop)
- [ ] No implementation detail (specific colours, API endpoints) in the UX doc —
      UX is device/technology agnostic

## Definition of Done

The UX design is done when:
1. User flow document is complete and committed.
2. Screen inventory is complete.
3. All edge cases (empty, loading, error) are documented.
4. A product stakeholder has reviewed and approved the flow.
5. The UI Design System skill can be handed this document to build components.
