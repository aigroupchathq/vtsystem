# 12 — Notification & Messaging Strategy: VEDIC TREE OS

## 1. Notification Hierarchy & Urgency Channels

Notifications in education operations range from life-safety alerts (unauthorized bus delay, missing child) to routine academic circulars. 

VEDIC TREE OS groups notifications into 4 distinct priority tiers with strictly enforced delivery channels:

```
+---------------------------------------------------------------------------------------+
| Priority Tier | Description & Examples                     | Multi-Channel Dispatch   |
+---------------+--------------------------------------------+--------------------------+
| 1. CRITICAL   | Bus breakdown, security gate alert,        | WhatsApp + SMS + Push +  |
|    EMERGENCY  | unexpected campus closure, severe health   | Automated Voice Call     |
+---------------+--------------------------------------------+--------------------------+
| 2. ACTION     | Unexcused student absence, fee due in 24h, | WhatsApp + Push +        |
|    REQUIRED   | teacher substitution assigned, leave req   | In-App Badge             |
+---------------+--------------------------------------------+--------------------------+
| 3. TIMELY     | Homework posted, bus 500m from stop,       | In-App Notification +    |
|    INFO       | report card published, upcoming PTA        | Mobile Push              |
+---------------+--------------------------------------------+--------------------------+
| 4. DIGEST /   | Weekly newsletter, non-urgent circular,    | In-App Notification Center|
|    ROUTINE    | system maintenance alert                   | & Email Digest           |
+---------------+--------------------------------------------+--------------------------+
```

---

## 2. In-App Notification Center UX

Located in the global topbar (`Bell Icon` with unread count badge).

### 2.1 Panel Anatomy
- **Header**: "Notifications" with unread counter, "Mark all as read", and "Settings" gear.
- **Filter Tabs**: `All`, `Unread`, `Academic`, `Fees`, `System`.
- **Notification Item Components**:
  - Semantic avatar/icon (Currency icon for fees, Bus icon for transport, Book for academics).
  - Title and 2-line summary.
  - Timestamp (e.g. `14m ago`).
  - Actionable button (e.g. `[Pay ₹18,500]`, `[Review Leave]`, `[Track Bus]`).
  - Unread indicator dot (Vedic saffron accent).

---

## 3. WhatsApp Business Platform Integration (India-First)

In India, WhatsApp has near 100% penetration among parents and teachers. VEDIC TREE OS integrates deeply with the WhatsApp Cloud API:

1. **Transactional Templates**: Pre-approved WhatsApp HSM templates (DLT registered) for:
   - Morning unexcused absence alerts.
   - Dynamic UPI fee payment reminders with direct pay button.
   - Report card PDF delivery with instant download button.
   - Bus tracking live location link.
2. **Interactive Quick Replies**:
   - Absentee notice includes 2 quick response buttons: `[Child is Sick]` and `[Family Function]`, auto-converting the unexcused absence into an excused absence on the school attendance ledger.
3. **Opt-in & Frequency Capping**: Parents can choose notification preferences (e.g., receive routine circulars only via in-app portal while keeping emergency alerts on WhatsApp).
