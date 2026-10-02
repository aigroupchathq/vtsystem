# 15 — UI Component Accessibility Specs: VEDIC TREE OS

## 1. Component Level Accessibility Contracts

Every component in `@vtos/ui` complies with WAI-ARIA authoring practices.

---

## 2. Component Specifications

### 2.1 Buttons & Interactive Controls
- Every button has an accessible name via text content, `aria-label`, or `aria-labelledby`.
- Disabled buttons feature `aria-disabled="true"`.
- Buttons triggering popup menus include `aria-haspopup="menu"` and `aria-expanded={isOpen}`.

### 2.2 Form Fields & Error Linking
- Inputs MUST link to their error messages using `aria-describedby`:
  ```tsx
  <Input
    id="phone"
    aria-invalid={hasError ? "true" : "false"}
    aria-describedby={hasError ? "phone-error" : "phone-help"}
  />
  {hasError && <p id="phone-error" role="alert" className="text-destructive text-xs">{error}</p>}
  ```

### 2.3 Modal Dialogs
- Traps keyboard focus within dialog while open.
- Pressing `Escape` closes the dialog.
- Background content is marked `aria-hidden="true"`.
- Focus returns to the trigger button immediately upon dismissal.

### 2.4 Tables & Lists
- Complex data tables feature `<caption className="sr-only">Student Academic Directory</caption>`.
- Sortable column headers have `aria-sort="ascending" | "descending" | "none"`.
