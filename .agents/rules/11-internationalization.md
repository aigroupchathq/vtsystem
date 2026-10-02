# Rule: Internationalization

Trigger: always_on
Scope: apps/web, apps/mobile, packages/types

---

## Core Principle

India is the primary product context. The architecture must
support international expansion without requiring structural code changes.
Locale is a configuration layer, not a hardcoded assumption.

---

## i18n Library

Use **next-intl** for the Next.js web application.

Message files live at: `apps/web/src/messages/`

```
messages/
├── en.json     # English (en-IN as the primary locale)
├── hi.json     # Hindi
├── mr.json     # Marathi
└── [code].json # Future languages
```

All user-facing strings, labels, error messages, notifications, and
email templates must use the i18n system. **No hardcoded strings.**

---

## String Rules

### Every user-visible string goes in messages

```typescript
// ✅ Correct
const t = useTranslations('Students');
return <h1>{t('pageTitle')}</h1>;

// ❌ Wrong — hardcoded English
return <h1>All Students</h1>;
```

### String keys use namespace.camelCase hierarchy

```json
// messages/en.json
{
  "students": {
    "pageTitle": "Students",
    "addStudent": "Add Student",
    "noStudentsFound": "No students found. Add your first student to get started.",
    "errors": {
      "fetchFailed": "Failed to load students. Please try again.",
      "enrollmentNumberTaken": "This enrollment number is already in use."
    }
  }
}
```

### Pluralisation uses ICU syntax

```json
{
  "attendance": {
    "presentCount": "{count, plural, =0 {No students present} =1 {1 student present} other {# students present}}"
  }
}
```

### Variables in strings use named placeholders

```json
{
  "feeReceipt": {
    "greeting": "Dear {parentName}, the fee receipt for {studentName} is ready."
  }
}
```

---

## Locale Data: India-First Defaults

### Dates
- Default locale: `en-IN`
- Default date format: `dd/MM/yyyy` (Indian convention)
- Use `Intl.DateTimeFormat` with locale — never `moment.js` or manual
  format strings
- Store all dates as UTC in the database; display in the tenant's timezone

```typescript
// ✅ Correct
const formatted = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit', month: '2-digit', year: 'numeric',
  timeZone: tenant.timezone, // e.g., 'Asia/Kolkata'
}).format(date);

// ❌ Wrong
const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
```

### Numbers
- Default number format: `en-IN` (lakhs and crores system)
- Use `Intl.NumberFormat` — never manual formatting

```typescript
// 1,23,456 (Indian system)
const formatted = new Intl.NumberFormat('en-IN').format(123456);
```

### Currency
- Default currency: INR (`₹`)
- Currency symbol and formatting via `Intl.NumberFormat` with `style: 'currency'`
- Currency code stored per organization — never hardcoded as INR

```typescript
const formatted = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: tenant.currency, // 'INR', 'USD', 'GBP', etc.
}).format(amount);
```

### Phone Numbers
- India mobile format: `+91 XXXXX XXXXX`
- Validate with `libphonenumber-js` — never regex
- Store in E.164 format (`+91XXXXXXXXXX`) — display in local format per locale

```typescript
import { parsePhoneNumber } from 'libphonenumber-js';

const phone = parsePhoneNumber(input, 'IN'); // Default country: India
if (phone.isValid()) {
  const stored = phone.number; // E.164: +919876543210
}
```

### Addresses
- Indian address fields: Flat/House, Street, Locality, City, District,
  State, PIN Code
- Do not assume a UK/US address structure (no postcodes, no counties)
- Address schema is parameterised by country format — use a `country_code`
  field to select the correct address form

### Timezones
- Primary timezone: `Asia/Kolkata` (IST, UTC+5:30)
- Store timezone per Organization in the database
- All `DateTime` values stored as UTC in PostgreSQL
- Convert to local timezone only at the display layer

---

## Payment Localisation

| Country | Currency | Payment Methods |
|---|---|---|
| India | INR | UPI, IMPS, Debit/Credit Card, Net Banking, Wallets |
| International | USD / GBP / EUR / etc. | Stripe (cards, bank transfers) |

Payment method availability is driven by the tenant's country configuration,
not hardcoded per feature.

---

## Communication Localisation

- WhatsApp message templates must be registered separately in each
  approved language
- SMS: character limits differ for Unicode (Hindi) vs ASCII (English)
- Email templates: RTL support for future Arabic/Urdu locales

---

## Academic Calendar Localisation

Different Indian education boards have different academic years:
- CBSE: April – March (new academic year starts April)
- Maharashtra State Board: June – May
- IB: August – July (for most IB schools in India)

The academic calendar start/end is a tenant configuration — never
hardcoded. All academic year calculations use the tenant's configured
calendar, not the Gregorian January–December year.

---

## Adding a New Locale

1. Create `messages/[code].json` with all keys from `messages/en.json`
2. Add the locale to next-intl configuration
3. Configure date/number/currency formatting for the new locale
4. Test all screen flows in the new locale
5. Verify right-to-left layout if applicable (Arabic, Urdu)
