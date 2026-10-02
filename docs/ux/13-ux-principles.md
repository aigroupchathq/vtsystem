# 13 — Core UX Principles & Heuristics: VEDIC TREE OS

## 1. The 10 Commandments of Vedic Tree OS UX

These 10 immutable heuristics govern all UI design, screen workflows, and interaction engineering across VEDIC TREE OS:

---

### Principle 1: Respect the 5 Universal Orientation Questions
Every major screen must immediately and unambiguously answer:
1. **WHERE AM I?** (Hierarchy breadcrumbs: Organization > Region > School > Campus > Module > Subpage).
2. **WHAT AM I SEEING?** (Clear descriptive title, active filters, selected academic session).
3. **WHAT MATTERS?** (Key KPI counters, alert banners, items pending action highlighted).
4. **WHAT CAN I DO?** (Prominent primary action, secondary actions in consistent button hierarchy).
5. **WHAT HAPPENS NEXT?** (Immediate tactile feedback, progress indicators, unambiguous next steps).

---

### Principle 2: Task Velocity Over Visual Decoration
- In a school, teachers have 3 minutes between class periods; cashiers face queues of 20 parents; bus drivers must depart on exact schedules.
- Design for speed of data entry and retrieval. Never sacrifice input speed for gratuitous animations or excessive white space.
- Maximize keyboard accessibility (Tab, Enter, hotkeys) for heavy administrative screens.

---

### Principle 3: Zero Ambiguity in Financial & Academic Data
- Financial totals, fee balances, late fees, and marks must never display ambiguous formats.
- Show currency symbol (`₹`), breakdown components, and tax (GST) status clearly.
- Calculations must be deterministic, transparent, and accompanied by printable audit receipts.

---

### Principle 4: Graceful Degradation & Network Resiliency
- Assume network drops in basement classrooms, transit buses, and rural campus zones.
- Crucial actions (taking attendance, marking bus boarding, reviewing student medical alerts) must work offline via local IndexedDB storage and sync automatically once back online.
- Visual sync badges ("3 attendance records queued for sync") provide reassurance to staff.

---

### Principle 5: India-First Localization with International Polish
- Native support for Indian names, phone numbers (+91), Aadhaar/PAN IDs, UPI QR workflows, and Indic languages (Hindi, Marathi, etc.).
- Architecture must seamlessly scale to international branches (Middle East, SE Asia) with multi-currency, dual calendars, and RTL support.

---

### Principle 6: Empathetic & Respectful Communication
- School communication touches sensitive family matters: child health, behavioral issues, unpaid fees, examination grades.
- Tone must be courteous, constructive, and dignified. Never publicly humiliate students or parents (e.g. no public defaulter lists in parent-accessible portals).

---

### Principle 7: Role-Specific Cognitive Scoping
- Don't overwhelm a 1st-grade teacher with master fee configuration menus, and don't bury the cashier's POS under academic lesson plan hierarchies.
- Deliver tailored, role-specific experiences. Every user sees exactly what empowers their specific responsibilities.

---

### Principle 8: Universal Mobile Touch Optimization
- Primary user actions on mobile screens must feature touch targets of at least **44 x 44 physical pixels**.
- Key controls must be within the thumb zone on standard smartphones.
- Forms must trigger appropriate mobile keyboards (`numeric` for fees, OTPs, roll numbers; `email` for emails; `tel` for phone numbers).

---

### Principle 9: Clear Feedback & State Transitions
- Every interaction must provide immediate, unambiguous feedback:
  - Button transitions to loading state with spinner on click.
  - Success toasts auto-dismiss in 4 seconds with an "Undo" action where applicable.
  - Form errors highlight the exact input field with clear inline explanation text.

---

### Principle 10: Multi-Tenant Safety & Visual Boundary Anchoring
- The active school and campus context must be persistently visible.
- Staff working across multiple schools or campuses must always have clear visual markers (distinct campus badges) to prevent accidental data entry into the wrong school.
