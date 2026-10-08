# VEDIC TREE OS — Safeguarding & Access Control Architecture

> **Authority:** Security & Privacy Governance  
> **Constitutional Reference:** Invariant II (Safeguarding Vault) & Invariant I (Multi-Tenancy)  

---

## 1. The Safeguarding Vault

Vedic Tree OS treats child protection and safeguarding as a non-negotiable architectural boundary.

### Automatic Classification
Any incident logged under the following categories is automatically treated as **Tier 4 Restricted (Confidential Safeguarding Dossier)**:
- `SAFEGUARDING` (Child protection, POCSO compliance)
- `BULLYING` (Repeated harassment, physical/psychological intimidation)
- `HARASSMENT` (Verbal, sexual, or discriminatory harassment)
- `MEDICAL_EMERGENCY` (Severe trauma, hospital admission)

### Redaction at Query Boundary
When general staff members (`TEACHER`, operations staff, general administrators) query campus incidents:
1. `title` $\rightarrow$ `"[Confidential Incident - Restricted Access]"`
2. `description` $\rightarrow$ `"[Redacted for student safeguarding and statutory privacy compliance]"`
3. `personsInvolvedJson` $\rightarrow$ `"[]"`
4. `sensitiveNotes` $\rightarrow$ `null`

Direct ID access attempts without the `operations:sensitive_incidents_read` permission throw **`403 Forbidden`**.

### Immutable Access Audit
Every authorized viewing of a sensitive incident dossier by the Principal or Designated Safeguarding Officer immediately writes an event to the audit ledger:
- Action: `OPERATIONS_SENSITIVE_INCIDENT_ACCESSED`
- Logged fields: `userId`, `userRole`, `entityId`, timestamp, IP address.

---

## 2. Multi-Tenant Role-Based Access Control (RBAC) Matrix

| Permission Code | HQ Admin | Principal | Teacher | Parent | Student | Partner | Franchisee |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `tenant:manage` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `tenant:switch` | ✅ | ✅ (Own) | ❌ | ❌ | ❌ | ❌ | ❌ |
| `students:read` | ✅ | ✅ | ✅ (Roster)| ✅ (Child)| ✅ (Self) | ❌ | ❌ |
| `students:create` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `academic:manage` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `academic:grades_manage` | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `finance:collect` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `finance:read` | ✅ | ✅ | ❌ | ✅ (Child)| ❌ | ❌ | ❌ |
| `operations:sensitive_incidents_read` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `franchise:read_global` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `franchise:read_own` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| `partner:read_own` | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| `royalty:calculate_and_invoice` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
