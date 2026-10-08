# Rule: Security

Trigger: always_on
Scope: Entire repository — all code, configuration, and infrastructure

---

## Authentication

### JWT Strategy
- Access tokens: short-lived (15 minutes)
- Refresh tokens: long-lived (7 days), stored in `httpOnly`, `Secure`,
  `SameSite=Strict` cookies
- Refresh tokens are rotated on every use (one-time use)
- Refresh token family tracking to detect token theft

### Password Rules
- Minimum 12 characters
- Hashed with `bcrypt` (cost factor 12) or `argon2id` (preferred)
- Never logged, never stored in plaintext, never returned in API responses
- Never in URLs or query strings

### Session Invalidation
- On password change: invalidate all existing refresh tokens for the user
- On logout: invalidate the current refresh token family
- On suspicious activity detection: invalidate all tokens for the user
  and notify via email and WhatsApp

---

## Authorization

Authorization is enforced at **two layers** (defense-in-depth):

1. **CASL Abilities** — application-level, per-endpoint
2. **PostgreSQL Row Level Security** — database-level, always-on

**Rule:** Never bypass CASL. Every API endpoint that touches user data
must be decorated with `@CheckAbilities(...)`. There are no exceptions.

If a user should not see a resource, the response is `404 Not Found`
(not `403 Forbidden`) to prevent resource enumeration. Use `403` only
when the user has authenticated but lacks permission to perform an action
on a resource they know exists.

---

## Secrets Management

### What counts as a secret
- Database connection strings
- JWT signing keys
- API keys for third-party services (Razorpay, WhatsApp, Gemini, etc.)
- Redis connection strings
- SMTP credentials
- Any encryption key

### Rules
1. **Zero secrets in source code.** If a secret is committed to git,
   treat it as compromised and rotate it immediately.
2. All secrets are stored in **Google Cloud Secret Manager**.
3. Local development uses `.env.local` (gitignored). Developers copy
   `.env.example` and populate from the team's shared secrets vault.
4. CI/CD secrets are stored in GitHub Actions Secrets, fetched at
   build time, and never printed to logs.
5. Secrets are validated by the Zod env schema at startup — the
   application will refuse to start if required secrets are missing.

---

## Input Validation

**All inputs are untrusted.** This includes:
- HTTP request bodies
- URL parameters and query strings
- HTTP headers
- Webhook payloads
- File uploads
- Environment variables (validated at startup)

Validation rules:
1. Whitelist all expected fields — strip unknown fields (`whitelist: true`
   in NestJS ValidationPipe).
2. Validate length limits on all string fields.
3. Validate MIME types and file size limits on all uploads.
4. Sanitize HTML content — use `dompurify` for any user-generated HTML.
5. Never pass user input directly to `eval()`, `exec()`, raw SQL, or
   shell commands.

---

## OWASP Top 10 Requirements

| Threat | Mitigation |
|---|---|
| Injection | Prisma parameterised queries; NestJS ValidationPipe |
| Broken Auth | Short-lived JWT; rotating refresh tokens; secure cookies |
| Sensitive Data Exposure | TLS everywhere; no PII in logs; field-level encryption for highly sensitive data |
| XML External Entities | Not applicable (JSON APIs only) |
| Broken Access Control | CASL + RLS double enforcement |
| Security Misconfiguration | Terraform-managed infra; no manual console changes; security headers enforced |
| XSS | React escapes by default; DOMPurify for rich text; strict CSP |
| Insecure Deserialization | Zod validation on all inputs before any deserialization |
| Components with Vulnerabilities | `pnpm audit` in CI; Dependabot for automated dependency updates |
| Insufficient Logging | Structured logging with correlation IDs; no PII in logs |

---

## HTTP Security Headers

All responses from the Next.js frontend must include:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Configure in `apps/web/next.config.ts` via `headers()`.

---

## Student Data (Special Category)

Student personal data — especially data relating to minors — is classified
as **Restricted** (highest data sensitivity):

1. Student PII (name, date of birth, address, photo) must be encrypted
   at rest using field-level encryption for columns classified as Restricted.
2. Student data must never be included in system logs.
3. Student data access must be audited (every access logged in an audit
   table with user, timestamp, action, IP).
4. Student data is never shared with third parties without explicit consent.
5. Data retention: student records are retained for the period required
   by applicable Indian educational regulations. After retention period,
   records are anonymised, not deleted.

---

## Dependency Security

1. Run `pnpm audit` in every CI run. Block merges if `high` or `critical`
   vulnerabilities are found.
2. Dependabot is configured to open PRs for security updates automatically.
3. Container images are scanned with Google Artifact Registry's
   vulnerability scanning before deployment.
4. Lock files (`pnpm-lock.yaml`) are always committed and always
   consistent — CI fails if the lock file is out of sync.

---

## Infrastructure Security

1. All Cloud SQL instances have private IP only (no public IP).
2. All Cloud Run services communicate with Cloud SQL via the Cloud SQL
   Auth Proxy — never via connection string with public IP.
3. All GCS buckets have uniform bucket-level access, public access
   prevention enabled, and versioning enabled.
4. Cloud Run service accounts follow the principle of least privilege —
   each service has its own service account with only the IAM roles it
   needs.
5. All network traffic between services uses VPC-internal communication
   where possible.
