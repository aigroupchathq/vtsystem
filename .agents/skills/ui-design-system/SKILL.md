---
name: vtos-ui-design-system
description: >-
  Use this skill when building, extending, or consuming the VEDIC TREE OS shared
  UI component library in packages/ui or apps/web/components. Covers creating new
  shadcn/ui-based components, adding design tokens, documenting component APIs,
  and verifying accessibility. Activate when the user says "build a component",
  "add to the design system", "create a UI component", "extend the component
  library", or "design system token".
---

# Skill: UI Design System

## When to Use

- A UX flow has been approved and UI components need to be built to implement it.
- A new primitive (button variant, form input, data table, card) is required that
  does not yet exist in `packages/ui` or the shadcn/ui catalogue.
- Existing components need visual updates to meet the VEDIC TREE OS brand identity.
- Design tokens (colours, typography, spacing) need to be added or modified.

## Prerequisites

- [ ] A UX design document exists (`docs/ux/`) or the component's design intent
      is clearly specified by the user.
- [ ] `packages/ui` is scaffolded and the shadcn/ui base is installed.
- [ ] Design tokens are defined in `packages/config/tailwind.config.base.ts`.
- [ ] The monorepo is bootstrapped (Next.js + shared packages installed).

## Execution Procedure

### Step 1 — Check if shadcn/ui Already Has This Component

Before building anything custom, check https://ui.shadcn.com/components.

If the component exists in shadcn/ui:
```bash
cd apps/web
pnpm dlx shadcn@latest add <component-name>
# Component is added to apps/web/src/components/ui/ — do not edit it directly
```

If a wrapper with VTOS-specific behaviour is needed, create it in
`apps/web/src/components/shared/` (not in `components/ui/`).

### Step 2 — Design Token Changes

All tokens are defined in `packages/config/tailwind.config.base.ts`.

```typescript
// packages/config/tailwind.config.base.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          subtle: 'hsl(var(--color-primary-subtle))',
          foreground: 'hsl(var(--color-primary-foreground))',
        },
        // ... other semantic tokens
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};
```

CSS custom properties that power the tokens live in
`apps/web/src/app/globals.css`. Both `:root` (light) and `.dark` scopes
must be updated for every new token.

### Step 3 — Build a New Shared Component

For components that go into the shared library (`packages/ui/src/`):

**File structure:**
```
packages/ui/src/components/
├── student-avatar/
│   ├── StudentAvatar.tsx      # Component implementation
│   ├── StudentAvatar.test.tsx # Vitest + RTL tests
│   └── index.ts               # Named export
```

**Component template:**
```typescript
// packages/ui/src/components/student-avatar/StudentAvatar.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

type StudentAvatarSize = 'sm' | 'md' | 'lg';

type StudentAvatarProps = {
  src?: string;
  name: string;       // Used for alt text and initials fallback
  size?: StudentAvatarSize;
  className?: string;
};

const sizeClasses: Record<StudentAvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
};

export function StudentAvatar({
  src,
  name,
  size = 'md',
  className,
}: StudentAvatarProps): React.JSX.Element {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full bg-primary-subtle text-primary font-medium',
        sizeClasses[size],
        className,
      )}
      aria-label={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  );
}
```

### Step 4 — Write Component Tests

Every component gets a test file covering:
1. Default render (snapshot or key element assertions)
2. All interactive states that have logic (loading, disabled, error)
3. Accessibility — use `axe` or `toHaveAccessibleName`

```typescript
// StudentAvatar.test.tsx
import { render, screen } from '@testing-library/react';
import { StudentAvatar } from './StudentAvatar';

describe('StudentAvatar', () => {
  it('renders initials when no image is provided', () => {
    render(<StudentAvatar name="Arjun Sharma" />);
    expect(screen.getByText('AS')).toBeInTheDocument();
  });

  it('renders an image with correct alt text when src is provided', () => {
    render(<StudentAvatar name="Arjun Sharma" src="/photo.jpg" />);
    expect(screen.getByRole('img', { name: 'Arjun Sharma' })).toBeInTheDocument();
  });
});
```

### Step 5 — Export from Package Index

Add to `packages/ui/src/index.ts`:
```typescript
export { StudentAvatar } from './components/student-avatar/StudentAvatar';
export type { } from './components/student-avatar/StudentAvatar'; // if types exported
```

### Step 6 — Document the Component API

Add a section to `docs/ui/<component-name>.md`:

```markdown
# StudentAvatar

Displays a student's photo or their initials as a fallback.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | required | Full name — used for alt text and initials |
| `src` | `string` | `undefined` | Image URL |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Avatar dimensions |
| `className` | `string` | `undefined` | Additional Tailwind classes |

## Usage

\`\`\`tsx
<StudentAvatar name="Arjun Sharma" src={student.photoUrl} size="lg" />
\`\`\`
```

## Validation Procedure

- [ ] Component is exported from `packages/ui/src/index.ts`
- [ ] Component file has explicit return type (`React.JSX.Element`)
- [ ] All props have TypeScript types (no `any`)
- [ ] All interactive states are visually represented (hover, focus, disabled)
- [ ] Focus ring is present and visible (keyboard navigation)
- [ ] `aria-label` or equivalent is present on icon-only or image elements
- [ ] Test file exists and all tests pass: `pnpm turbo run test --filter=ui`
- [ ] Component is documented in `docs/ui/`
- [ ] Type check passes: `pnpm turbo run type-check --filter=ui`

## Definition of Done

1. Component is implemented with TypeScript strict compliance.
2. Both light and dark mode are verified visually.
3. All tests pass.
4. Accessibility: no `axe` violations on the component in isolation.
5. Documentation in `docs/ui/` is complete.
6. Component is usable by importing from `@ui/<component>`.
