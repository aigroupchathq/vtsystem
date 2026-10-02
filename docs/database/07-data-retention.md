# 07 — Data Retention, Archival & Purging: VEDIC TREE OS

## 1. Statutory Retention Windows

Educational institutions must maintain student records for extended statutory periods (often 20+ years for matriculation records), while ephemeral data (daily attendance SMS logs, bus GPS pings) must be purged to manage storage and privacy.

| Entity Type | Retention Period | Post-Retention Action | Statutory Requirement |
|---|---|---|---|
| **Student Permanent Records** | 25 Years from graduation | Cold Storage Archive (Parquet/GCS) | CBSE / State Board Affiliation Bylaws |
| **Financial Ledgers & Receipts** | 8 Financial Years | Cold Archive | Income Tax Act / Companies Act (India)|
| **Examination Marks & Report Cards**| 10 Years | Compressed Cold Archive | Academic Verification Requests |
| **Staff Service Records & PF** | 10 Years post-exit | Cold Archive | EPFO / Labor Law Compliance |
| **Daily Attendance Logs** | 3 Academic Years | Aggregated to Monthly Summary & Purged| Operational Optimization |
| **Bus GPS Telemetry & Pings** | 90 Days | Hard Delete | DPDP Act / Storage Cost Minimization |
| **Security Audit Logs** | 5 Years | Compressed Immutable Log Store | ISO 27001 / SOC 2 |

---

## 2. Soft-Deletion & Data Archival Architecture

1. **Soft-Deletion Pattern**:
   - Entities implement `deleted_at TIMESTAMPTZ NULL`.
   - When a user deletes a record in the UI, `deleted_at` is set to `NOW()`.
   - All normal queries include `WHERE deleted_at IS NULL`.
2. **Scheduled Cold Storage Archival**:
   - Academic sessions marked `is_locked = true` after 3 years are eligible for off-database archival.
   - A scheduled batch job extracts completed academic records to immutable encrypted Cloud Storage buckets with zero-knowledge encryption keys.
