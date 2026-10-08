# VEDIC TREE OS — UX Specification: Student 360 & Vedic Tree Development Compass

> **Document Version:** 2.0.0 (Prompt 05.1 Alignment)  
> **Classification:** Product & Architectural Specification  
> **Constitutional References:** Section 6 (Student Development Compass [SOURCE]), Section 7 (Next Best Action [PROPOSED]), Section 8 (Geographic Scope), Section 14 (Parent IP vs School SPV Boundary)  
> **Status:** APPROVED FOR IMPLEMENTATION (Refactored per Audit & Product Decisions)

---

## 1. Executive Summary & Design Rationale

Unlike standard card-heavy Enterprise Resource Planning (ERP) systems that reduce students to attendance percentages and examination marks, **Vedic Tree OS** treats child development through a **holistic Gurukul-inspired pedagogical model** balanced with contemporary academic rigor.

The **Student 360 / Vedic Tree Development Compass** is the student-centric flagship surface of the platform. Designed under the core product principle:

> **"Rich evidence + restrained interpretation"**

It avoids visual clutter, decorative shadows, unbacked cohort benchmarks, and pseudo-clinical radar charts. Instead, it presents a dense, calm, and readable analytical control room where educators, parents, and administrators can understand a child's developmental journey across cognitive, ethical, emotional, and physical dimensions.

### Core Product Mandates (Prompt 05.1)
1. **Central Visualizer: Linear Developmental Continuum Matrix**:
   - The SVG radar/polar chart has been **completely removed**.
   - No benchmark polygons, class averages, peer comparisons, or cohort percentiles.
   - Student 360 is strictly about **individual growth over time**, not ranking children against each other.
2. **Formative Qualitative Stages**:
   - `EMERGING` → `DEVELOPING` → `PROFICIENT` → `EXEMPLARY`.
   - Never expressed as pseudo-precise percentage numbers (e.g. "94% Character").
3. **Non-Clinical Affective Language**:
   - Terminology is anchored to observable school practices: **"Mindfulness, Composure & Reflection"** (Pranayama, Assembly Dhyana, Peer Collaboration).
   - Mandatory notice: *"Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses."*
4. **Persona-Tailored Hierarchy**:
   - **Teacher**: Focuses on formative observation entry, classroom scaffolding, and learning activity. **Tuition fees are strictly hidden**.
   - **Parent**: Focuses on attendance, celebrated strengths, teacher commendations, homework, and SPV fee clearance. Zero internal teacher codes; zero radar charts.
   - **Student**: Focuses on "My Learning Journal", daily schedule, homework, reading goals, and positive recognitions. Zero fee or adult administrative data.
   - **Principal**: Full authorized view including statutory attendance tracking (75% CBSE rule), CCE certification, SPV financial status, and Tier-4 pastoral logs.

---

## 2. Information Architecture Layout

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STUDENT 360 CONTROL ROOM — LINEAR DEVELOPMENTAL MATRIX ARCHITECTURE                   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. STUDENT IDENTITY & BASELINE RIBBON                                                  │
│    [Avatar] Name • Roll # • Admission # • Grade & Div • Campus [DEMO/SOURCE] • Status   │
│    [Continuous Metric Strip: Attendance Rate (96.7%) | CCE Grade | Fee Balance | Health]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. CORE ANALYTICAL STAGE: LINEAR DEVELOPMENTAL CONTINUUM MATRIX                        │
│    ┌──────────────────────────────────┬──────────────┬────────────┬─────────────┬─────┐│
│    │ DEVELOPMENT AREA                 │ CURRENT STAGE│ EVIDENCE   │ LAST OBS    │NEXT ││
│    ├──────────────────────────────────┼──────────────┼────────────┼─────────────┼─────┤│
│    │ ▲ North: Character & Values      │ Exemplary    │ 7 entries  │ 5 days ago  │ →   ││
│    │ ► East:  Academic Excellence     │ Proficient   │ 9 entries  │ 9 days ago  │ →   ││
│    │ ▼ South: Life Skills & Agency    │ Developing   │ 4 entries  │ 2 weeks ago │ →   ││
│    │ ◄ West:  Mindfulness & Reflection│ Proficient   │ 6 entries  │ 2 weeks ago │ →   ││
│    └──────────────────────────────────┴──────────────┴────────────┴─────────────┴─────┘│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. GRANULAR PERSPECTIVE LEDGERS (TABULAR DRILL-DOWN)                                   │
│    [Holistic Evidence Log]  [Academics & CCE]  [Attendance]  [Fees*]  [Family] [Pastoral*]│
│    - Chronological Formative Observations with Teacher Signatures & Context            │
│    - Subject-Wise Periodic Tests (PT-1/PT-2) and Summative Assessments (Objective Marks│
│    - Multi-Tenant RLS & Tier-4 Safeguarding Redaction Guard                            │
│    - Strict Mandatory Non-Clinical Safeguarding Disclaimer                             │
│    (*Fees hidden from Teacher/Student; Pastoral hidden from Teacher/Parent/Student)    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. The 4 Cardinal Areas & 8 Developmental Facets

```text
                               CHARACTER & VALUES [SOURCE]
                                           ▲
                                           │
                                           │
MINDFULNESS & REFLECTION [SOURCE] ◄────────┼────────► ACADEMIC EXCELLENCE [SOURCE]
                                           │
                                           │
                                           ▼
                               LIFE SKILLS & AGENCY [SOURCE]
```

| Cardinal Axis | Direction | Primary Vedic Theme | Observed Facets |
|---|:---:|---|---|
| **Character & Values** | **North** | Dharma & Seva | 1. **Character & Values**: Satya, Vinaya, Respect, Ethical Reflection<br>2. **Social Responsibility & Seva**: Campus Shramdaan, Gratitude, Community Awareness |
| **Academic Excellence** | **East** | Vidya & Jnana | 3. **Curricular Mastery**: Conceptual Math, Experimental Science, Language<br>4. **Creativity & Expression**: Visual Arts, Rhetoric, Shloka Recitation |
| **Life Skills & Agency** | **South** | Karma & Koushalya | 5. **Life Skills & Agency**: Practical Problem Solving, Environmental Stewardship<br>6. **Leadership & Collaboration**: Peer Mentorship, Teamwork Dynamics |
| **Mindfulness, Composure & Reflection** | **West** | Swasthya & Dhyana | 7. **Physical Wellbeing**: Daily Yoga & Asanas, Athletics, Motor Dexterity<br>8. **Mindfulness & Reflection**: Mindful Breathing (Pranayama), Composure under Frustration, Assembly Dhyana |

---

## 4. Strict Non-Clinical Safeguarding Mandate

### Mandatory Non-Clinical Disclaimer
Vedic Tree OS records **educational and formative pedagogical observations only**. It is strictly forbidden from recording psychiatric, diagnostic, or clinical psychological classifications.

Every Student 360 view must prominently display:
> **"Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses."**

### Pedagogical Guardrails
1. **Teacher Observations**: Must document observable behavioral and academic milestones in classroom, assembly, playground, or seva activities.
2. **Qualitative Rubric Categories**:
   - `EXEMPLARY`: Consistently embodies competency and models behavior for peers.
   - `PROFICIENT`: Consistently demonstrates independent agency and understanding.
   - `DEVELOPING`: Progressing steadily with occasional teacher scaffolding.
   - `EMERGING`: Early development stage; receiving structured classroom support.

---

## 5. Multi-Tenant Isolation & Role-Based Access Control (RBAC)

```text
┌─────────────────┬─────────────────────────────────────────────────────────────────────┐
│ Role            │ Tailored View & Safeguard Boundaries                                │
├─────────────────┼─────────────────────────────────────────────────────────────────────┤
│ Principal       │ Full Authorised View: All 8 surfaces, CCE cards, SPV tuition ledger, │
│                 │ Tier-4 pastoral dossier (audited), statutory attendance compliance. │
├─────────────────┼─────────────────────────────────────────────────────────────────────┤
│ Teacher         │ Classroom Cockpit: Developmental continuum matrix, observation form, │
│                 │ formative ledger, homework, exam marks. FEES STRICTLY HIDDEN.       │
├─────────────────┼─────────────────────────────────────────────────────────────────────┤
│ Parent          │ My Child Portal: Attendance, celebrated milestones, homework, home   │
│                 │ support tips, tuition fee payments. NO internal codes or radar.     │
├─────────────────┼─────────────────────────────────────────────────────────────────────┤
│ Student         │ My Learning Journal: Timetable, assignments, milestone recognitions.│
│                 │ FEES & CONFIDENTIAL RECORDS STRICTLY HIDDEN.                        │
└─────────────────┴─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Corporate Boundary & Financial Separation Notice

Per **Constitution Section 14**, campus fee balances shown on the student profile reflect **School SPV operational tuition collections only**. They must never be conflated with Vedic Tree Parent platform revenues, franchise royalties, or educational IP economics.
