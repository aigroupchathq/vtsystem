---
name: vtos-ai-feature-development
description: >-
  Use this skill when designing, implementing, evaluating, or auditing AI/LLM-powered
  capabilities within VEDIC TREE OS. Covers curriculum recommendations, automated report card
  narratives, parent communication assistants, RAG pipelines, safety guardrails,
  data privacy (FERPA/DPDP), rate limiting, and fallback mechanics.
---

# Skill: AI Feature Development and Safety Guardrails

## When to Use

- Implementing an AI-assisted feature (e.g., student performance summaries, lesson planning assistant, admissions inquiry chatbot, automated report card remarks).
- Integrating LLM APIs (Gemini, Vertex AI, OpenAI) into NestJS backend services.
- Building Retrieval Augmented Generation (RAG) over curriculum documents, circulars, or school policies.
- Designing prompt templates, output validation schemas (Zod/JSON schema), and evaluation benchmarks.
- Implementing student privacy safeguards (PII scrubbing, DPDP/COPPA compliance).

## Prerequisites

- [ ] AI feature product specification approved with explicit boundaries and fallbacks.
- [ ] Safe AI guidelines in `.agents/rules/12-ai-safety.md` reviewed and adopted.
- [ ] LLM provider credentials configured securely in environment variables (never in client-side code).
- [ ] PII redaction utilities and audit logging pipeline in place.

## Execution Procedure

### Step 1 — Privacy & Multi-Tenant Data Isolation (Safety First)

1. **PII Scrubbing**: Before transmitting any student or employee context to an LLM provider:
   - Redact full names, Aadhaar / National IDs, phone numbers, and addresses.
   - Use surrogate tokens: `[STUDENT_1]`, `[GRADE_7]`, `[CAMPUS_A]`.
2. **Tenant Scoping**: Vector embeddings and RAG stores must be partitioned by `tenantId`. A query from Campus A can NEVER retrieve embeddings or context from Campus B unless explicitly part of public HQ curriculum.
3. **No Training on Customer Data**: Ensure enterprise API agreements guarantee that zero prompt or completion data is utilized for model training.

### Step 2 — Structured Output & Schema Enforcement

1. Never accept raw unconstrained string output from LLMs in business-critical workflows.
2. Use Structured Outputs (e.g. Gemini `responseSchema` or Zod schema validation):
   ```typescript
   import { z } from 'zod';

   export const ReportCardNarrativeSchema = z.object({
     strengths: z.array(z.string()).min(1).max(3),
     areasForGrowth: z.array(z.string()).min(1).max(3),
     constructiveRemark: z.string().max(250),
     suggestedInterventions: z.array(z.string()).optional(),
   });
   export type ReportCardNarrative = z.infer<typeof ReportCardNarrativeSchema>;
   ```
3. Always validate the returned JSON against the Zod schema. If parsing fails, retry once with temperature=0 or fallback to human teacher template.

### Step 3 — Deterministic Fallbacks & Human-in-the-Loop

1. **Teacher / Admin Review**: All AI-generated content (remarks, disciplinary notices, parent communications) MUST be presented as drafts requiring human approval and editing before dispatch.
2. **Graceful Degradation**: If the AI service is unavailable, rate-limited, or returns a 5xx error, the application UI must seamlessly fall back to standard manual input or rule-based templates without crashing the user flow.

### Step 4 — Hallucination Guardrails & Grounding

1. Use grounded system prompts with strict instruction limits:
   "You are an academic assistant for Vedic Tree OS. Only use the provided student evaluation metrics below. Do NOT fabricate exam results, awards, or medical conditions. If information is missing, state 'Insufficient data provided'."
2. Log all LLM requests, token usage, latency, and user edits to evaluate model quality and detect hallucination patterns.

## Validation Procedure

- [ ] Automated tests verify PII sanitization before payload generation.
- [ ] Cross-tenant embedding isolation verified via integration tests.
- [ ] Prompt injection defense tested (e.g. ignore previous instructions attempts).
- [ ] Fallback mechanisms kick in smoothly when API responses timeout or fail validation.

## Definition of Done

1. Feature executes with strict JSON schema compliance.
2. Zero student PII exposed to external non-compliant endpoints.
3. Teacher/admin draft review step enforced before persistence.
4. Comprehensive audit logging of prompt metadata and generated tokens recorded.
