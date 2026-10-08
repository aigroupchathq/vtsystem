# VEDIC TREE OS — Student 360 Data Provenance & Evidence Mapping

> **Specification Version:** 2.0.0 (Prompt 05.1 Alignment)  
> **Classification:** Product Architecture & Data Provenance Standard  
> **Constitutional References:** Section 6 (Development Compass), Section 7 (Next Best Action), Section 8 (Seed Data Discipline), Section 14 (Corporate Financial Boundary)  
> **Guiding Principle:** **"Rich evidence + restrained interpretation"**

---

## 1. Architectural Purpose

This document establishes the exact, unambiguous provenance for every field rendered on the **Student 360** surface. 

Under the user's explicit mandate:
> **Objective academic and operational data can be numeric.**  
> **Formative human development must not be reduced to a pseudo-precise number.**

Any field displayed on Student 360 must trace directly to a verified database record or formative observation, must be categorized by its evidence type, and must be strictly filtered according to the user persona's legitimate operational needs.

---

## 2. Complete Data Provenance Map

```text
Student 360 Field
    ↓
Underlying Database Field / Service
    ↓
Evidence Type
    ↓
Persona Visibility (Principal | Teacher | Parent | Student)
    ↓
Formative / Objective / Sensitive Classification
```

| # | Student 360 Surface Field | Underlying Database Field / Service | Evidence Type | Persona Visibility | Classification |
|---|---|---|---|---|---|
| **1** | **Learner Identity**<br>(Name, Roll #, Admission #, DOB, Blood Group, Gender) | `db.students[id]`<br>• `admissionNumber`<br>• `firstName`, `lastName`<br>• `dob`, `gender`, `bloodGroup`<br>• `enrollment.rollNumber` | Official Admission Record & School Enrollment File | **Principal**: Full<br>**Teacher**: Full<br>**Parent**: Own Ward Only<br>**Student**: Personal Profile | **Objective Institutional Baseline** |
| **2** | **Campus & Grade Placement**<br>(Campus Name, Grade, Division) | `db.students[id]`<br>• `campusId`, `campusName`<br>• `gradeName`, `divisionName` | Institutional Registration Ledger | **Principal**: Full<br>**Teacher**: Full<br>**Parent**: Own Ward<br>**Student**: Own Placement | **Objective Institutional Baseline** |
| **3** | **Emergency & Guardian Contact**<br>(Primary Guardian Name, Phone, Address, Pickup Authorization) | `db.students[id].guardiansDetailed`<br>• `firstName`, `lastName`<br>• `relation`, `phone`<br>• `address`, `emergencyPhone` | Verified Guardian KYC & Pickup Authorization Slip | **Principal**: Full<br>**Teacher**: Phone & Name<br>**Parent**: Own Details<br>**Student**: Read-Only | **Sensitive PII / Child Safety** |
| **4** | **Term Attendance Rate**<br>(Percentage, Working Days, Present, Late, Absent, Streak) | `db.attendance`<br>queried via `db.getStudentAttendance(context, { studentId })` | Daily Morning Roll-Call & Biometric Campus Gate Ledger | **Principal**: Full Compliance<br>**Teacher**: Classroom Management<br>**Parent**: Daily Status & Rate<br>**Student**: Streak & Rate | **Objective Operational Metric**<br>(Preserved Numeric: e.g. 96.7%, 58/60 days) |
| **5** | **Curricular Exam Marks**<br>(PT-1, Summative Tests, Marks Obtained, Max Marks, Grade, Remarks) | `db.academicProfiles[campusId].results`<br>• `marksObtained`, `maxMarks`<br>• `gradeLetter`, `remarks` | Evaluated Examination Scripts & CCE Periodic Assessments | **Principal**: Full<br>**Teacher**: Full<br>**Parent**: Own Ward Marks<br>**Student**: Personal Results | **Objective Academic Metric**<br>(Preserved Numeric: e.g. Math 38/40) |
| **6** | **Certified CCE Report Card**<br>(Term 1 Summary, Overall Grade, Teacher Remarks, Principal Signature) | `db.academicProfiles[campusId].reportCards`<br>• `overallGrade`, `overallPercentage`<br>• `teacherRemarks`, `principalSignedAt` | Principal-Certified Continuous & Comprehensive Evaluation (CCE) Card | **Principal**: Full / Signatory<br>**Teacher**: Full<br>**Parent**: View Certified Card<br>**Student**: View Certified Card | **Objective Curricular Record** |
| **7** | **Active Timetable & Homework**<br>(Daily schedule, pending assignments, due dates) | `db.academicProfiles[campusId].homework`<br>`db.academicProfiles[campusId].weeklyTimetable` | Classroom Lesson Plan & Academic Dairy System | **Principal**: Full<br>**Teacher**: Class Roster & Tasks<br>**Parent**: Homework Oversight<br>**Student**: Primary Work Queue | **Objective Learning Activity** |
| **8** | **Developmental Continuum: 4 Cardinal Areas**<br>• Character & Values<br>• Academic Excellence<br>• Life Skills & Agency<br>• Mindfulness, Composure & Reflection | `SEED_HOLISTIC_PROFILES.axes`<br>• `stage` (`EMERGING`, `DEVELOPING`, `PROFICIENT`, `EXEMPLARY`)<br>• `evidenceCount`<br>• `lastObservedDate`<br>• `educatorNextStep` | Formative Pedagogical Ledger (Continuous teacher observations across campus life) | **Principal**: Full Matrix & Recency<br>**Teacher**: Full Matrix & Scaffolding<br>**Parent**: Developmental Narrative<br>**Student**: Milestones & Growth Goals | **Formative Developmental Stage**<br>(Strictly NON-NUMERIC, NON-NORMATIVE, NON-CLINICAL) |
| **9** | **Developmental Sub-Dimensions (8 Facets)**<br>• Values (Satya, Vinaya)<br>• Seva (Shramdaan, Community)<br>• Curricular (Math, Science)<br>• Creativity (Arts, Shlokas)<br>• Life Agency (Environment)<br>• Collaboration (Teamwork)<br>• Physical (Yoga, Agility)<br>• Reflection (Pranayama, Dhyana) | `SEED_HOLISTIC_PROFILES.axes[key].facets`<br>• `name`<br>• `stage`<br>• `evidenceCount`<br>• `observablePractices` (array)<br>• `lastObservedDate` | Classroom, Assembly, Lab, Courtyard, and Seva Rubric Observation Logs | **Principal**: Full Facet Breakdown<br>**Teacher**: Formative Rubrics<br>**Parent**: Celebrated Strengths<br>**Student**: Learning Portfolio | **Formative Developmental Stage**<br>(Strictly Qualitative Descriptors) |
| **10** | **Formative Observation Ledger**<br>(Chronological observation narratives, contexts, teacher names, timestamps) | `SEED_HOLISTIC_PROFILES.observations`<br>• `title`, `observation`<br>• `context`, `rubricLevel`<br>• `teacherName`, `teacherId`, `date` | Verified Teacher Classroom Notes (Non-clinical observations signed by teachers) | **Principal**: Full Audit Log<br>**Teacher**: Full Pedagogical Ledger<br>**Parent**: Curated Teacher Notes<br>**Student**: Positive Feedback Badges | **Formative Qualitative Narrative**<br>(Signed Human Pedagogical Evidence) |
| **11** | **Educator Scaffolding Next Step**<br>(Actionable next pedagogical focus for teaching staff) | `SEED_HOLISTIC_PROFILES.axes[key].educatorNextStep` | Pedagogical Guidance Recommendation derived from formative observations | **Principal**: Scaffolding Plan<br>**Teacher**: Immediate Classroom Action<br>**Parent**: Home Encouragement Tips<br>**Student**: Personal Challenge | **Formative Actionable Guidance** |
| **12** | **School SPV Tuition Fee Ledger**<br>(Invoiced, Paid, Balance Due, Fee Status, Invoice Breakdown) | `db.invoices`<br>queried via `db.getInvoices(context, { studentId })` | Double-Entry Campus Tuition Invoices & Bank Receipts (SPV School Collections Only) | **Principal**: Full Campus Ledger<br>**Teacher**: **STRICTLY REDACTED**<br>**Parent**: Full Fee & Pay Portal<br>**Student**: **STRICTLY REDACTED** | **Sensitive Commercial / School SPV Financials** |
| **13** | **Corporate IP & Separation Notice**<br>(Explicit boundary separating School SPV tuition from Parent platform) | Constant: `CORPORATE_FEE_SEPARATION_NOTE` | Constitution Section 14 Mandate | **Principal**: Prominently Displayed<br>**Teacher**: N/A (Fees hidden)<br>**Parent**: Displayed on Receipts<br>**Student**: N/A (Fees hidden) | **Institutional Governance Boundary** |
| **14** | **Tier 4 Pastoral & Safeguarding Dossier**<br>(Medical management protocols, sensitive welfare notes, review dates) | `SEED_HOLISTIC_PROFILES.pastoralNotes`<br>• `category`, `summary`, `notes`<br>• `recordedBy`, `reviewDate` | Child Protection / POCSO Confidential Dossier & Medical Doctor Clearance | **Principal**: Full (Audited Access)<br>**Teacher**: **REDACTED**<br>**Parent**: **REDACTED**<br>**Student**: **REDACTED** | **Highly Sensitive Statutory / Child Welfare** |
| **15** | **Verified Document Vault**<br>(Birth Cert, Aadhaar, TC, Medical clearance filenames and verification dates) | `db.students[id].documents`<br>• `fileName`, `documentType`, `verifiedAt` | Verified Government & Medical Credentials | **Principal**: Full Verified Vault<br>**Teacher**: Read-Only Metadata<br>**Parent**: View Own Uploads<br>**Student**: Read-Only Metadata | **Institutional Compliance Credentials** |

---

## 3. Explicit Prohibitions & Purged Synthetic Constructs

The following synthetic constructs are **permanently removed** and have zero entry in the Data Provenance Map:

1. **NO "Grade-Level Benchmark"**:
   - `benchmark: 86%` → **DELETED**. There is no client evidence or valid psychometric benchmark for human virtues.
   - Dashed Benchmark Polygon on radar → **DELETED**.
2. **NO Virtue Percentage Scores**:
   - `score: 94% Character` → **DELETED**. Replaced by `stage: 'EXEMPLARY'` with `evidenceCount: 7`.
   - `score: 90% Emotional Development` → **DELETED**.
3. **NO Composite Holistic Index / "Child GPA"**:
   - `overallAverage: 91/100` → **DELETED**. Replaced by `16 Formative Observations on Record`.
4. **NO Trend Percentages**:
   - `trend: '+6% vs Prior Term'` → **DELETED**.
5. **NO Radar / Polar Visualizer**:
   - 4-point SVG radar chart → **DELETED**. Replaced by the **Linear Developmental Continuum Matrix**.
6. **NO Clinical Terminology**:
   - `Emotional Development (non-clinical)` → **RENAMED** to **`Mindfulness, Composure & Reflection`**.

---

## 4. Persona-Specific Information Architecture Rules

### 1. Principal View (Full Authorised Student 360)
- **Primary Operational Question**: *"What is happening with this learner and what requires authorised intervention?"*
- **Visible Surfaces**:
  1. Student Identity & Campus Baseline Ribbon
  2. Developmental Continuum Matrix (All 4 areas with stages, evidence counts, and teacher recency)
  3. Formative Pedagogical Ledger (Chronological observation history)
  4. Objective Academic Progression (Summative exam results & certified CCE cards)
  5. Attendance Compliance Ledger (Working days, rate, evaluated against 75% CBSE benchmark)
  6. School SPV Tuition Fee Ledger (Clearance status, balances, Constitution §14 separation notice)
  7. Tier-4 Pastoral & Safeguarding Dossier (POCSO / medical management protocols with immutable audit logging)
  8. Document Vault (Verified admissions documentation)

### 2. Teacher View (Classroom Pedagogical Cockpit)
- **Primary Operational Question**: *"What do I need to observe, support and record?"*
- **Visible Surfaces**:
  1. Student Identity & Placement (Grade, Division, Roll #, Guardian phone for pickup)
  2. Developmental Continuum Matrix (Current formative stages, observation counts, educator scaffolding next steps)
  3. Quick Observation Entry Affordance (`Record Formative Observation` modal with non-clinical guardrails)
  4. Formative Evidence Ledger (Observations logged by self and peer faculty)
  5. Curricular Performance (Subject marks, classroom homework status)
  6. Attendance Record (Present/Absent days to understand classroom continuity)
- **STRICTLY HIDDEN**:
  - **Financials / Tuition Fee Balances**: Hidden completely. Classroom educators must never be burdened with collection balances or display differential treatment based on payment status.
  - **Tier-4 Confidential Pastoral Dossier**: Redacted unless teacher holds designated child protection officer role.

### 3. Parent View (My Child's Developmental Journey)
- **Primary Operational Question**: *"How is my child progressing and how can I support them?"*
- **Tone**: Warm, supportive, celebratory, transparent.
- **Visible Surfaces**:
  1. Child Identity & Daily Presence (Today's attendance, term streak, bus pickup authorization)
  2. Developmental Journey Summary (Qualitative stages in Character, Academics, Life Skills, Mindfulness)
  3. Celebrated Strengths & Recent Observations (Teacher praise narratives, seva participation)
  4. Home Support Recommendations (Curated tips to support school learning at home)
  5. Curricular Marks & Certified Report Cards (Transparent academic progress)
  6. School Fee Clearance & Invoices (Transparent SPV invoice payments, download receipts)
- **STRICTLY HIDDEN**:
  - Internal teacher rubric codes and raw staff grading terminology
  - Tier-4 confidential safeguarding / pastoral notes
  - Zero radar charts; zero cohort comparison; zero peer ranking

### 4. Student View (My Learning Journal)
- **Primary Operational Question**: *"What am I learning and how am I growing?"*
- **Tone**: Empowering, engaging, child-friendly, focused on personal milestones.
- **Visible Surfaces**:
  1. Student Profile & House / Class Placement
  2. My Learning Schedule (Daily timetable, subject periods)
  3. My Active Assignments (Homework due dates, projects)
  4. Celebrated Milestones & Growth Areas (Formative recognitions, shlokas learned, seva projects led)
  5. Attendance Streak (Encouraging consistent attendance)
  6. Library & Reading Goals
- **STRICTLY HIDDEN**:
  - Tuition fee invoices and financial balances (Zero commercial pressure on the child)
  - Disciplinary or confidential pastoral logs
  - Internal administrative documentation

---

## 5. Non-Clinical Safeguarding Mandate

Every Student 360 surface must continue to prominently feature:
> **"Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses."**

Furthermore, the observation entry modal must enforce:
1. Strict regex rejection of psychiatric and diagnostic terms (`adhd`, `autism`, `bipolar`, `depression`, `psychiatric`, `clinical diagnosis`, `pathology`, `disorder`).
2. Mandatory pedagogical context selection (Classroom Learning, Morning Assembly, Laboratory, Courtyard / Seva, Sports & Yoga).
3. Clear guidance that entries document **observable student behaviors and learning milestones**, not personality judgments or clinical diagnoses.
