# 08 — Motion & Micro-Interactions: VEDIC TREE OS

## 1. Motion Philosophy

Motion in VEDIC TREE OS is **functional, subtle, and responsive**. It provides spatial orientation and tactile confirmation without introducing lag into high-speed administrative tasks.

---

## 2. Duration & Easing Tokens

```css
/* Duration Tokens */
--duration-fast: 150ms;       /* Hover states, micro button clicks, badge toggles */
--duration-normal: 250ms;     /* Dropdowns, tooltips, collapsible accordions */
--duration-slow: 350ms;       /* Modal backdrops, slide-over drawers, page transitions */

/* Easing Curves */
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);   /* General UI transitions */
--ease-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1); /* Incoming elements (modals, sheets) */
--ease-accelerate: cubic-bezier(0.4, 0.0, 1, 1);   /* Dismissals and exit animations */
```

---

## 3. Micro-Interaction Standard Specifications

1. **Button Clicks**: Subtle scale effect on active press (`active:scale-[0.98] transition-transform duration-100`).
2. **Modal Ingress**: Fade-in backdrop + scale from 95% to 100% (`opacity: 0 -> 1, scale: 0.95 -> 1.0` over 200ms).
3. **Drawer / Mobile Bottom Sheet**: Slide-in from bottom or right edge with fluid spring easing.
4. **Toast Notifications**: Slide in from top-right on desktop, bottom on mobile (`translate-y-2 -> 0`).
5. **Skeleton Shimmer**: Linear sweeping gradient pulse (`animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`) for placeholder states during TanStack Query fetching.

---

## 4. Accessibility & Reduced Motion

Respect the system's `prefers-reduced-motion` media query unconditionally:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
