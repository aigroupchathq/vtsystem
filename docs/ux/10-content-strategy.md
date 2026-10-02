# 10 — Content Strategy, Voice & Localization: VEDIC TREE OS

## 1. Brand Voice & Tone Principles

VEDIC TREE OS bridges traditional cultural reverence with cutting-edge academic excellence. The voice is:
1. **Clear & Direct**: Eliminate administrative jargon and bloated legalistic phrasing. Say "Pay Fee", not "Remit Pending Financial Liabilities".
2. **Respectful & Reassuring**: School environments handle sensitive data (child attendance, grades, disciplinary issues, late fees). Communication to parents and teachers must be empathetic, calm, and constructive.
3. **Action-Oriented**: Tell the user what happened, why it matters, and exactly what action to take next.

---

## 2. Terminology & Glossary Standardization

To prevent confusion across different boards (CBSE, ICSE, IB, State Boards), the following standardized terminology is enforced:

| Term in VEDIC TREE OS | Avoid / Deprecated Variants | Description |
|---|---|---|
| **Academic Year** | Session / School Year | The active operational academic term (e.g. 2026-2027) |
| **Grade** | Class / Standard | Academic level (e.g., Grade 6) |
| **Division** | Section | Sub-group within a grade (e.g., Division A) |
| **Admission Number** | Scholar No / Registration No | Immutable primary identifier for a student in a school |
| **Guardian** | Parent / Caretaker | Legal guardian or parent accountable for student |
| **Employee ID** | Staff Code / Teacher No | Immutable identifier for an employee |
| **Fee Installment** | Term Fee / Quarter | Discrete scheduled fee payment tranche |
| **Concession** | Discount / Scholarship | Approved waiver applied to fee structure |
| **Circular** | Notice / Announcement | Official broadcast message from school to stakeholders |

---

## 3. Formatting & Regional Localization Standards

### 3.1 Currency Formatting
- Standard Indian Currency format: Use the ₹ Indian Rupee symbol with Lakh/Crore grouping:
  - Format: `₹1,50,000` (not `₹150,000.00`).
  - Drop decimal cents/paise unless dealing with financial reconciliation decimals.
- International contexts: Automatically adapt to local currency code (e.g., `$1,500.00`, `AED 5,200`).

### 3.2 Date & Time Formatting
- Default Display: `DD MMM YYYY` (e.g., `14 Aug 2026`) to avoid ambiguity between US (`MM/DD/YYYY`) and Indian/UK (`DD/MM/YYYY`) patterns.
- Relative Timestamps: Use relative time for recent notifications (`12 mins ago`, `Yesterday at 4:15 PM`), falling back to absolute date after 48 hours.
- Time Format: 12-hour format with AM/PM for parent-facing screens (`08:15 AM`); 24-hour format supported for administrative transport schedules.

### 3.3 Names & Honorifics
- Support for single names, multi-part Indian patronymics, and south-Indian initialisms without forcing arbitrary "First Name" and "Last Name" splitting where inappropriate.
- Support cultural honorifics in staff records (Dr., Prof., Smt., Shri).

---

## 4. Multilingual & Indic Script Support Architecture

1. **Language Keys (i18n)**: All UI copy is stored in JSON translation dictionaries under `packages/i18n/locales/`.
   - Core supported languages:
     - `en-IN` (Indian English - Primary Default)
     - `hi-IN` (Hindi)
     - `mr-IN` (Marathi)
     - `gu-IN` (Gujarati)
     - `ta-IN` (Tamil)
     - `te-IN` (Telugu)
     - `ar-SA` (Arabic - with RTL bidirectional layout switching)
2. **Typography for Indic Scripts**: Use Google Fonts `Noto Sans Devanagari`, `Noto Sans Tamil`, etc., with appropriate line-height adjustments to avoid diacritic clipping.
3. **No Machine Translation in Official Notices**: Official school circulars and report card templates must be reviewed by bilingual human administrators before mass publication.
