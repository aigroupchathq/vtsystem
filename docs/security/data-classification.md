# VEDIC TREE OS — Data Classification Policy

## Classification Tiers

| Tier | Label | Examples | Controls |
|---|---|---|---|
| 1 | **Public** | School name, location, published timetable | No restrictions |
| 2 | **Internal** | Staff names, fee structure | Authenticated access only |
| 3 | **Confidential** | Parent contact details, staff payroll, fee records | Role-restricted; logged access |
| 4 | **Restricted** | Student PII, biometric data, medical records, disciplinary records | Encrypted at rest; audited; explicit consent required |

## Student Data (Tier 4 — Restricted)

All fields containing student personal information are Restricted.
Handling requirements:
- Field-level encryption at rest
- Never logged in plaintext
- Access audited per DPDP Act 2023
- Retention period: per applicable Indian educational board regulations

## Data Retention

| Data Type | Retention Period |
|---|---|
| Active student records | Duration of enrolment + 7 years |
| Fee records | 7 years (GST compliance) |
| Attendance records | 5 years |
| System logs | 90 days |
| Audit logs | 7 years |
