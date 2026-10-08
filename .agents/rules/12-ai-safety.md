# Rule: AI Safety

Trigger: always_on
Scope: apps/api (AIModule), apps/web (AI-powered features)

---

## Governing Principle

AI features in VEDIC TREE OS are tools that assist educators, students,
and administrators — not autonomous decision-makers. Every AI output that
affects a student's academic record, disciplinary record, fee status, or
personal profile must be reviewed and confirmed by a human before it
is applied.

AI must never be presented to users as infallible. All AI-generated
content is labelled as such.

---

## AI Feature Scope (v1)

Permitted AI use cases in v1:

| Feature | Model | Review Required |
|---|---|---|
| Automated report card narrative generation | Gemini | Teacher must review and approve before publish |
| Attendance pattern anomaly alerts | Gemini | Alert flagged; Principal reviews |
| Fee default prediction | Gemini | Finance Admin reviews; no auto-action |
| Student learning gap identification | Gemini | Teacher reviews; no auto-assessment |
| WhatsApp message draft generation | Gemini | Staff member reviews before sending |
| Document summarisation (policy docs) | Gemini | Staff reads summary, not a substitute |
| Administrative query answering (RAG) | Gemini + pgvector | Answers include source citations |

Not permitted in v1:
- Autonomous grading or assessment scoring
- Automated disciplinary actions
- Autonomous fee decisions (waivers, penalties)
- Facial recognition or biometric identity
- Predictive profiling of students based on demographic data

---

## Data Sent to AI Models

### What MAY be sent to Gemini API
- Anonymised or aggregate data (attendance rates, pass percentages
  without individual student identifiers)
- Teacher-written content for proofreading or translation
- School policy documents for summarisation
- Structured report data for narrative generation (student name, grades,
  teacher comments — all within the school's own tenant data)

### What must NEVER be sent to any external AI API
- Student biometric data
- Student medical records
- Family financial details beyond what is necessary for fee context
- Disciplinary records without explicit consent
- Any data that has not been reviewed for DPDP Act compliance
- Raw personal identifiers without anonymisation where possible

### Data minimisation for AI calls
Before sending data to the Gemini API, run it through the `DataSanitiser`
utility which:
1. Strips fields classified as `Restricted` (highest sensitivity)
2. Pseudonymises student identifiers where the AI does not need the real name
3. Logs what data was sent (audit trail — without the data itself)

---

## Prompt Safety

All prompts sent to Gemini must:

1. Be defined as named, versioned templates in the codebase — not
   constructed ad-hoc from user input via string concatenation.
2. Treat user-provided content as data, not instructions (inject user
   content into the `user` role, not the `system` role prompt).
3. Sanitise user input before including it in a prompt (remove prompt
   injection patterns).
4. Include explicit instructions to refuse if the model is asked to
   produce content outside the educational context.

```typescript
// ✅ Correct — template with parameterised data
const prompt = buildPrompt('report-card-narrative', {
  studentName: student.firstName, // Not surname
  subject: 'Mathematics',
  grade: 'B+',
  teacherComment: sanitiseInput(teacherComment),
});

// ❌ Wrong — user input spliced directly into prompt
const prompt = `Write a report for ${userInput}`;
```

---

## AI Output Handling

1. AI outputs are never written to the database without explicit human
   approval (modal with "Apply" button — not auto-applied on generation).
2. AI-generated text displayed to users carries a visual label:
   `AI-generated — please review before publishing`
3. AI outputs are logged (input prompt hash, output hash, user who
   approved) for audit purposes.
4. Hallucination risk: whenever the AI references facts (dates, rules,
   regulations), the UI displays a caveat:
   `AI may make mistakes. Verify important information.`

---

## RAG (Retrieval-Augmented Generation)

The RAG pipeline is used for the school policy Q&A and knowledge base
features.

RAG architecture:
1. Source documents are ingested and stored in Cloud Storage.
2. Documents are chunked and embedded using Gemini's embedding model.
3. Embeddings are stored in PostgreSQL with `pgvector`.
4. At query time, the user's question is embedded and the top-k most
   similar chunks are retrieved.
5. The retrieved chunks + the question are sent to Gemini for synthesis.
6. The response includes citation references so users can verify the
   source document.

RAG safety rules:
- Only organisation-owned documents are ingested into the tenant's RAG
  index — no cross-tenant document retrieval.
- Document ingestion is restricted to Admin roles.
- All documents are scanned for personal data before ingestion — documents
  containing student PII must be reviewed by an Admin before being added
  to the searchable index.

---

## AI Cost Controls

1. All Gemini API calls are routed through the `AIModule` which enforces:
   - Per-tenant daily request quotas
   - Per-user request rate limits
   - Request deduplication (same prompt hash within 60s returns cached result)
2. AI feature usage is metered and reported in the Finance module.
3. AI features can be disabled per tenant by HQ Admin.

---

## Incident Response

If an AI feature produces harmful, biased, or inappropriate output:
1. The user reports via the in-app feedback mechanism.
2. The incident is logged in the security incident log.
3. The AI feature is disabled for the affected tenant pending review.
4. The Engineering Lead reviews the prompt, output, and audit trail.
5. The prompt template is updated or the feature is flagged for removal.
