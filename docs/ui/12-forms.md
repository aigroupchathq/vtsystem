# 12 — Form System & Validation: VEDIC TREE OS

## 1. Form Architecture

All forms in VEDIC TREE OS are standardized on **React Hook Form + Zod Schema Validation**.

---

## 2. Standard Form Patterns

### 2.1 Multi-Step Wizard Pattern (e.g. Student Admission)
For complex entity creation involving >10 fields:
- **Persistent Step Indicator**: Visual progress bar showing steps (e.g., `1. Student Info` -> `2. Guardians` -> `3. Academic History` -> `4. Documents` -> `5. Review & Submit`).
- **Autosave / Draft Preservation**: Form state is persisted to `sessionStorage` so an accidental browser refresh or tab close does not cause data loss.
- **Step Validation**: Next button is disabled or triggers step-specific schema validation before allowing progress.

### 2.2 Inline Validation & Error Messaging
- Validation triggers on blur (`mode: 'onBlur'`) and re-validates on change once an error is active.
- Error messages display directly beneath the offending input with an alert icon and red text (`text-xs text-destructive mt-1 flex items-center gap-1`).
- Inputs with errors receive high-visibility red borders (`border-destructive focus-visible:ring-destructive`).

### 2.3 Field Component Standards
- **Label**: Above the input (`text-sm font-medium text-foreground mb-1 block`), with a red asterisk `*` for mandatory fields.
- **Helper Description**: Below the input (`text-xs text-muted-foreground mt-1`) providing formatting hints (e.g. "Enter 10-digit Indian mobile number without +91").
- **Disabled State**: Opacity reduced (`opacity-50 cursor-not-allowed bg-muted`).
