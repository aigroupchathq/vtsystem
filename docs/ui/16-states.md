# 16 — Universal Component & Interface States: VEDIC TREE OS

## 1. The 11 Mandatory State Definitions

Every interactive component, data table, and screen in VEDIC TREE OS must explicitly implement, test, and render the following 11 states:

---

### 1. Default State
- **Appearance**: Crisp base styling according to component variant tokens. High readability, neutral borders (`border-input`), clean text (`text-foreground`).
- **Interaction**: Fully responsive to cursor, touch, and keyboard focus.

### 2. Hover State
- **Appearance**: Subtle background shift (`hover:bg-primary/90` for buttons; `hover:bg-muted/50` for table rows and list items).
- **Cursor**: `cursor-pointer` on all interactive targets.
- **Physics**: Fast transition (`transition-colors duration-150`).

### 3. Focus State
- **Appearance**: High-visibility 2px focus ring (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
- **Accessibility**: Visible via keyboard `Tab` navigation; never suppressed by `outline: none`.

### 4. Active (Pressed) State
- **Appearance**: Subtle physical compression feedback (`active:scale-[0.98] active:bg-primary/95`).
- **Timing**: Instant response (`duration-75`).

### 5. Disabled State
- **Appearance**: Opacity reduced to 50% (`opacity-50 cursor-not-allowed bg-muted text-muted-foreground`).
- **Interaction**: Pointer events suppressed; ignored by screen reader keyboard loops; `aria-disabled="true"`.

### 6. Loading State
- **Appearance**:
  - Buttons: Displays spinning loader icon (`<Loader2 className="animate-spin mr-2 h-4 w-4" />`), original text preserved or changed to "Saving...". Disabled to prevent duplicate submissions.
  - Tables & Cards: Animated skeleton shimmer placeholder (`<Skeleton className="h-10 w-full" />`). Never show a blank white screen during data fetching.

### 7. Success State
- **Appearance**: Emerald green semantic accent (`bg-emerald-50 text-emerald-700 border-emerald-200`).
- **Feedback**: Paired with `<CheckCircle2 />` icon and optional tactile haptic vibration on mobile devices.

### 8. Warning State
- **Appearance**: Amber saffron accent (`bg-amber-50 text-amber-700 border-amber-200`).
- **Feedback**: Accompanied by `<AlertTriangle />` icon (e.g., "Fee Due in 24 Hours", "Teacher Substitution Pending").

### 9. Error State
- **Appearance**: Crimson red accent (`bg-red-50 text-red-700 border-red-200`). Form inputs receive `border-destructive`.
- **Feedback**: Accompanied by `<AlertCircle />` icon and actionable error resolution copy (e.g. "Mobile number must be 10 digits").

### 10. Empty State
- **Appearance**: Illustrated or icon-driven placeholder centered in viewport/card.
- **Anatomy**:
  1. Semantic Hero Icon in muted circle (`<Users className="h-10 w-10 text-muted-foreground" />`).
  2. Clear Heading ("No Students Enrolled in Grade 6A").
  3. Helpful Context ("Students will appear here once admissions are confirmed or division transfers are approved.").
  4. Primary Call to Action Button (`[+ Admit First Student]`).

### 11. Permission Restricted State
- **Appearance**: Lock icon illustration with subtle amber/slate alert banner.
- **Context**: Explains why access is restricted (e.g., "You do not have permission to view Financial Receipts for this campus. Required permission: `fees:read`").
- **Action**: "Switch Campus" or "Contact Campus Administrator" button.
