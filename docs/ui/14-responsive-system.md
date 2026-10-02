# 14 — Responsive UI Implementation Tokens: VEDIC TREE OS

## 1. Tailwind Responsive Grid & Prefix Mapping

VEDIC TREE OS enforces consistent Tailwind prefix patterns across all component JSX:

```
Mobile-First Default (<640px) -> sm: (>=640px) -> md: (>=768px) -> lg: (>=1024px) -> xl: (>=1280px)
```

---

## 2. Standard Responsive Layout Implementations

### 2.1 Responsive Form Layout
- Mobile (`<640px`): Single column (`grid grid-cols-1 gap-4`).
- Desktop (`>=1024px`): Two-column or three-column layout with logical section groupings (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`).

### 2.2 Responsive Modal & Bottom Sheet Mechanics
```tsx
export function ResponsiveDialog({ isOpen, onClose, title, children }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto">
          <SheetHeader><SheetTitle>{title}</SheetTitle></SheetHeader>
          <div className="mt-4">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-xl p-6">
        <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 3. Responsive Touch Targets

Touch targets automatically scale via utility classes:
- Buttons: `min-h-[44px] sm:min-h-[36px]` ensuring touch ergonomics on phones while maintaining high information density on desktop mice.
- Table rows: `h-14 sm:h-10` for easy finger-tapping on tablets and mobile screens.
