// VEDIC TREE OS — Student 360 & Vedic Tree Development Compass Test Suite
// Grounded in Prompt 05.1 Architectural Mandates:
// - Linear Developmental Continuum Matrix (Emerging → Developing → Proficient → Exemplary)
// - No benchmark polygons, no class averages, no peer comparisons, no composite scores
// - "Mindfulness, Composure & Reflection" non-clinical terminology
// - Strict persona visibility: fees masked from Teacher/Student, pastoral masked from Teacher/Parent/Student
// - Objective academic (Math 38/40) and operational (96.7% attendance) metrics preserved
// - Multi-tenant, parent, and student isolation barriers enforced

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../src/database/db.js';
import {
  Student360Service,
  NON_CLINICAL_SAFEGUARDING_DISCLAIMER,
  CORPORATE_FEE_SEPARATION_NOTE
} from '../src/modules/sis/student-360.service.js';

describe('STUDENT 360 & VEDIC TREE DEVELOPMENT COMPASS TEST SUITE', () => {
  let hqContext;
  let banerPrincipalContext;
  let kothrudPrincipalContext;
  let teacherContext;
  let parentContext;
  let studentContext;

  beforeEach(() => {
    db.reset();

    hqContext = {
      organizationId: 'org-vedic-tree-foundation',
      campusId: 'cmp-pune-baner',
      activeCampusId: 'cmp-pune-baner',
      userId: 'usr-hq-admin',
      userRole: 'HQ_ADMIN'
    };

    banerPrincipalContext = {
      organizationId: 'org-vedic-tree-foundation',
      campusId: 'cmp-pune-baner',
      activeCampusId: 'cmp-pune-baner',
      userId: 'usr-principal-baner',
      userRole: 'PRINCIPAL'
    };

    kothrudPrincipalContext = {
      organizationId: 'org-vedic-tree-foundation',
      campusId: 'cmp-pune-kothrud',
      activeCampusId: 'cmp-pune-kothrud',
      userId: 'usr-principal-kothrud',
      userRole: 'PRINCIPAL'
    };

    teacherContext = {
      organizationId: 'org-vedic-tree-foundation',
      campusId: 'cmp-pune-baner',
      activeCampusId: 'cmp-pune-baner',
      userId: 'emp-sunita',
      userRole: 'TEACHER'
    };

    parentContext = {
      organizationId: 'org-vedic-tree-foundation',
      campusId: 'cmp-pune-baner',
      activeCampusId: 'cmp-pune-baner',
      userId: 'usr-parent-sharma',
      userRole: 'PARENT'
    };

    studentContext = {
      organizationId: 'org-vedic-tree-foundation',
      campusId: 'cmp-pune-baner',
      activeCampusId: 'cmp-pune-baner',
      userId: 'stu-aarav-sharma',
      userRole: 'STUDENT'
    };
  });

  // ==========================================================================
  // 1. Multi-Tenant Campus Isolation Barrier
  // ==========================================================================
  describe('1. Multi-Tenant Campus Isolation Barrier', () => {
    it('1.1 Allows Baner principal to retrieve Baner student 360 profile', () => {
      const profile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      assert.equal(profile.student.id, 'stu-kabir-deshmukh');
      assert.equal(profile.student.admissionNumber, 'VT-2026-001');
      assert.equal(profile.student.campusId, 'cmp-pune-baner');
    });

    it('1.2 Prevents Baner principal from accessing Kothrud student record (403 Forbidden)', () => {
      assert.throws(
        () => Student360Service.getStudent360(banerPrincipalContext, 'stu-ananya-joshi'),
        (err) => err.status === 403 || err.message.includes('CROSS_TENANT_ACCESS_DENIED')
      );
    });

    it('1.3 Prevents Kothrud principal from accessing Baner student record (403 Forbidden)', () => {
      assert.throws(
        () => Student360Service.getStudent360(kothrudPrincipalContext, 'stu-kabir-deshmukh'),
        (err) => err.status === 403 || err.message.includes('CROSS_TENANT_ACCESS_DENIED')
      );
    });

    it('1.4 Allows HQ Administrator universal visibility across all campuses', () => {
      const banerStudent = Student360Service.getStudent360(hqContext, 'stu-kabir-deshmukh');
      const kothrudStudent = Student360Service.getStudent360(hqContext, 'stu-ananya-joshi');
      assert.equal(banerStudent.student.id, 'stu-kabir-deshmukh');
      assert.equal(kothrudStudent.student.id, 'stu-ananya-joshi');
    });
  });

  // ==========================================================================
  // 2. Parent & Student Role Isolation
  // ==========================================================================
  describe('2. Parent & Student Role Isolation', () => {
    it('2.1 Allows Parent to access their own child record', () => {
      const profile = Student360Service.getStudent360(parentContext, 'stu-aarav-sharma');
      assert.equal(profile.student.id, 'stu-aarav-sharma');
      assert.equal(profile.student.firstName, 'Aarav');
    });

    it('2.2 Blocks Parent from viewing other students in same campus (403 Forbidden)', () => {
      assert.throws(
        () => Student360Service.getStudent360(parentContext, 'stu-kabir-deshmukh'),
        (err) => err.status === 403 && err.message.includes('PARENT_STUDENT_ISOLATION_VIOLATION')
      );
    });

    it('2.3 Allows Student to access their personal learning profile', () => {
      const profile = Student360Service.getStudent360(studentContext, 'stu-aarav-sharma');
      assert.equal(profile.student.id, 'stu-aarav-sharma');
    });

    it('2.4 Blocks Student from accessing peer student records (403 Forbidden)', () => {
      assert.throws(
        () => Student360Service.getStudent360(studentContext, 'stu-kabir-deshmukh'),
        (err) => err.status === 403 && err.message.includes('STUDENT_SELF_ISOLATION_VIOLATION')
      );
    });
  });

  // ==========================================================================
  // 3. Vedic Tree Development Compass Structure & Matrix Model (Prompt 05.1)
  // ==========================================================================
  describe('3. Vedic Tree Development Compass: Qualitative Matrix Model', () => {
    it('3.1 Returns the 4 cardinal areas with qualitative stages, not numeric scores', () => {
      const profile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      const compass = profile.developmentCompass;

      assert.ok(compass, 'Compass object must be present');
      assert.ok(compass.axes.character, 'Character axis must exist');
      assert.ok(compass.axes.academics, 'Academics axis must exist');
      assert.ok(compass.axes.lifeSkills, 'Life skills axis must exist');
      assert.ok(compass.axes.wellbeing, 'Wellbeing axis must exist');

      assert.equal(compass.axes.character.direction, 'North');
      assert.equal(compass.axes.academics.direction, 'East');
      assert.equal(compass.axes.lifeSkills.direction, 'South');
      assert.equal(compass.axes.wellbeing.direction, 'West');

      // Valid qualitative formative continuum stages
      const validStages = ['Emerging', 'Developing', 'Proficient', 'Exemplary'];
      assert.ok(validStages.includes(compass.axes.character.stage));
      assert.ok(validStages.includes(compass.axes.academics.stage));
      assert.ok(validStages.includes(compass.axes.lifeSkills.stage));
      assert.ok(validStages.includes(compass.axes.wellbeing.stage));
    });

    it('3.2 Contains NO benchmark polygons, NO grade averages, and NO composite holistic index', () => {
      const profile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      const compass = profile.developmentCompass;

      // Absolute prohibition on composite child scores
      assert.equal(compass.overallAverage, undefined, 'Composite holistic score (overallAverage) must be deleted');

      // Absolute prohibition on numeric benchmark thresholds
      for (const axisKey of ['character', 'academics', 'lifeSkills', 'wellbeing']) {
        const axis = compass.axes[axisKey];
        assert.equal(axis.benchmark, undefined, `Axis ${axisKey} must not contain benchmark property`);
        assert.equal(axis.score, undefined, `Axis ${axisKey} must not contain numeric score property`);
        assert.equal(axis.trend, undefined, `Axis ${axisKey} must not contain synthetic trend property`);

        for (const facet of axis.facets) {
          assert.equal(facet.score, undefined, `Facet ${facet.name} must not contain numeric score`);
          assert.equal(facet.benchmark, undefined, `Facet ${facet.name} must not contain benchmark`);
        }
      }
    });

    it('3.3 Renames emotional axis to "Mindfulness, Composure & Reflection" and spans 8 holistic facets', () => {
      const profile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      const axes = profile.developmentCompass.axes;

      const facetNames = [
        ...axes.character.facets.map(f => f.name),
        ...axes.academics.facets.map(f => f.name),
        ...axes.lifeSkills.facets.map(f => f.name),
        ...axes.wellbeing.facets.map(f => f.name)
      ];

      assert.equal(facetNames.length, 8, 'Must measure exactly 8 holistic facets');
      assert.ok(facetNames.includes('Character & Values'));
      assert.ok(facetNames.includes('Social Responsibility & Seva'));
      assert.ok(facetNames.includes('Curricular Mastery'));
      assert.ok(facetNames.includes('Creativity & Expression'));
      assert.ok(facetNames.includes('Life Skills & Agency'));
      assert.ok(facetNames.includes('Leadership & Collaboration'));
      assert.ok(facetNames.includes('Physical Wellbeing'));

      // Non-clinical affective naming
      assert.ok(facetNames.includes('Mindfulness, Composure & Reflection'), 'Must use non-clinical mindfulness terminology');
      assert.ok(!facetNames.includes('Emotional Development (non-clinical)'), 'Old clinical-sounding label must be purged');
    });

    it('3.4 Asserts evidence counts and actionable educator next steps on every axis', () => {
      const profile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      const compass = profile.developmentCompass;

      assert.ok(compass.totalEvidenceCount >= 1, 'Total evidence count must reflect verified observations');
      for (const axisKey of ['character', 'academics', 'lifeSkills', 'wellbeing']) {
        const axis = compass.axes[axisKey];
        assert.ok(typeof axis.evidenceCount === 'number' && axis.evidenceCount >= 1, `${axisKey} must have evidenceCount`);
        assert.ok(axis.lastObservedDate, `${axisKey} must have lastObservedDate`);
        assert.ok(axis.educatorNextStep && axis.educatorNextStep.length > 10, `${axisKey} must have educatorNextStep`);
      }
    });
  });

  // ==========================================================================
  // 4. Strict Non-Clinical Safeguarding Mandate
  // ==========================================================================
  describe('4. Strict Non-Clinical Safeguarding Mandate', () => {
    it('4.1 Asserts mandatory non-clinical disclaimer text on all profiles', () => {
      const profile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      assert.equal(
        profile.developmentCompass.safeguardingNote,
        NON_CLINICAL_SAFEGUARDING_DISCLAIMER
      );
      assert.equal(
        profile.developmentCompass.safeguardingNote,
        'Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses.'
      );
    });

    it('4.2 Rejects observation recording containing clinical or diagnostic terminology', () => {
      assert.throws(
        () => {
          Student360Service.recordFormativeObservation(teacherContext, 'stu-kabir-deshmukh', {
            axisKey: 'wellbeing',
            facetName: 'Mindfulness, Composure & Reflection',
            observation: 'Student exhibits signs of clinical depression and acute adhd in class.',
            rubricLevel: 'DEVELOPING'
          });
        },
        (err) => err.message.includes('SAFEGUARDING_VIOLATION')
      );
    });

    it('4.3 Successfully records educational formative observation and logs audit trail', () => {
      const newObs = Student360Service.recordFormativeObservation(teacherContext, 'stu-kabir-deshmukh', {
        axisKey: 'character',
        facetName: 'Character & Values',
        title: 'Morning Shloka and Seva Assistance',
        observation: 'Offered gentle peer support during morning assembly with calm demeanor.',
        rubricLevel: 'EXEMPLARY',
        context: 'Morning Assembly',
        teacherName: 'Sunita Sharma (Grade 5 Class Teacher)'
      });

      assert.ok(newObs.id);
      assert.equal(newObs.rubricLevel, 'EXEMPLARY');

      // Verify observation appears in refreshed profile and updates recency
      const updatedProfile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      assert.ok(
        updatedProfile.developmentCompass.observations.some(o => o.id === newObs.id)
      );
      assert.equal(updatedProfile.developmentCompass.axes.character.lastObservedDate, newObs.date);
    });
  });

  // ==========================================================================
  // 5. Persona-Specific Visibility & Financial Isolation (Prompt 05.1 Mandate)
  // ==========================================================================
  describe('5. Persona-Specific Visibility & Financial Protection', () => {
    it('5.1 Strictly masks tuition fees and collection balances from Teacher users', () => {
      const teacherProfile = Student360Service.getStudent360(teacherContext, 'stu-kabir-deshmukh');
      assert.equal(teacherProfile.financials.isRestricted, true);
      assert.equal(teacherProfile.financials.totalInvoicedINR, null);
      assert.equal(teacherProfile.financials.totalPaidINR, null);
      assert.equal(teacherProfile.financials.balanceDueINR, null);
      assert.deepEqual(teacherProfile.financials.invoices, []);
      assert.ok(teacherProfile.financials.redactionReason.includes('School Administration and Guardians'));
    });

    it('5.2 Strictly masks tuition fees from Student users to prevent financial pressure on children', () => {
      const studentProfile = Student360Service.getStudent360(studentContext, 'stu-aarav-sharma');
      assert.equal(studentProfile.financials.isRestricted, true);
      assert.equal(studentProfile.financials.balanceDueINR, null);
      assert.deepEqual(studentProfile.financials.invoices, []);
    });

    it('5.3 Allows Parent to view their registered ward tuition fees and payment status', () => {
      const parentProfile = Student360Service.getStudent360(parentContext, 'stu-aarav-sharma');
      assert.equal(parentProfile.financials.isRestricted, false);
      assert.equal(parentProfile.financials.feeStatus, 'PENDING');
      assert.equal(parentProfile.financials.balanceDueINR, 40500);
      assert.equal(parentProfile.financials.totalInvoicedINR, 75500);
      assert.equal(parentProfile.financials.totalPaidINR, 35000);
    });

    it('5.4 Allows Principal full access to campus tuition collections and fee clearance ledger', () => {
      const principalProfile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      assert.equal(principalProfile.financials.isRestricted, false);
      assert.equal(principalProfile.financials.feeStatus, 'CLEARED');
      assert.equal(principalProfile.financials.balanceDueINR, 0);
    });
  });

  // ==========================================================================
  // 6. Objective Curricular & Operational Data Preservation
  // ==========================================================================
  describe('6. Objective Academic & Operational Data Preservation', () => {
    it('6.1 Preserves authentic quantitative exam marks (Math 38/40)', () => {
      const profile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      assert.ok(profile.academics.results.length >= 1);
      const mathExam = profile.academics.results[0];
      assert.equal(mathExam.marksObtained, 38);
      assert.equal(mathExam.maxMarks, 40);
      assert.equal(mathExam.gradeLetter, 'A1');
    });

    it('6.2 Preserves authentic operational attendance metrics (96.7% attendance)', () => {
      const profile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      assert.equal(profile.attendance.percentage, 96.7);
      assert.equal(profile.attendance.presentDays, 58);
      assert.equal(profile.attendance.totalWorkingDays, 60);
      assert.equal(profile.attendance.streakDays, 14);
    });
  });

  // ==========================================================================
  // 7. Tier 4 Safeguarding & Pastoral Dossier RBAC Protection
  // ==========================================================================
  describe('7. Tier 4 Pastoral Dossier RBAC Protection', () => {
    it('7.1 Grants Principal access to confidential pastoral notes and logs audit record', () => {
      const initialLogs = db.getAuditLogs({ entityName: 'StudentPastoralDossier' });
      const initialCount = initialLogs.length;

      const profile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      assert.equal(profile.pastoral.accessGranted, true);
      assert.ok(profile.pastoral.records.length >= 1, 'Should contain health/pastoral note');

      const updatedLogs = db.getAuditLogs({ entityName: 'StudentPastoralDossier' });
      assert.equal(updatedLogs.length, initialCount + 1, 'Must log pastoral access event');
      assert.equal(updatedLogs[0].action, 'STUDENT_PASTORAL_RECORD_ACCESSED');
    });

    it('7.2 Redacts pastoral notes for general Teacher, Parent, and Student users', () => {
      const teacherProfile = Student360Service.getStudent360(teacherContext, 'stu-kabir-deshmukh');
      assert.equal(teacherProfile.pastoral.accessGranted, false);
      assert.deepEqual(teacherProfile.pastoral.records, []);
      assert.ok(teacherProfile.pastoral.redactionReason.includes('Designated Safeguarding Officers'));

      const parentProfile = Student360Service.getStudent360(parentContext, 'stu-aarav-sharma');
      assert.equal(parentProfile.pastoral.accessGranted, false);
      assert.deepEqual(parentProfile.pastoral.records, []);

      const studentProfile = Student360Service.getStudent360(studentContext, 'stu-aarav-sharma');
      assert.equal(studentProfile.pastoral.accessGranted, false);
      assert.deepEqual(studentProfile.pastoral.records, []);
    });
  });

  // ==========================================================================
  // 8. Corporate Boundary & Financial Separation (Constitution Section 14)
  // ==========================================================================
  describe('8. Corporate Boundary & Financial Separation (Constitution §14)', () => {
    it('8.1 Asserts exact corporate fee separation note isolating school tuition from parent IP', () => {
      const profile = Student360Service.getStudent360(banerPrincipalContext, 'stu-kabir-deshmukh');
      assert.equal(
        profile.financials.corporateBoundaryNote,
        CORPORATE_FEE_SEPARATION_NOTE
      );
      assert.ok(
        profile.financials.corporateBoundaryNote.includes('school/SPV operational collections only')
      );
      assert.ok(
        profile.financials.corporateBoundaryNote.includes('Parent-level platform, brand, curriculum, technology')
      );
    });
  });

  // ==========================================================================
  // 9. Graceful Fallback for Unseeded Students
  // ==========================================================================
  describe('9. Graceful Fallback for Unseeded Students', () => {
    it('9.1 Generates clean, robust holistic matrix for student without static profile', () => {
      // Rohan Kulkarni has basic student record but no bespoke seed compass
      const profile = Student360Service.getStudent360(banerPrincipalContext, 'stu-rohan-kulkarni');
      assert.equal(profile.student.id, 'stu-rohan-kulkarni');
      assert.ok(profile.developmentCompass.axes.character);
      assert.ok(profile.developmentCompass.axes.academics);
      assert.ok(profile.developmentCompass.axes.lifeSkills);
      assert.ok(profile.developmentCompass.axes.wellbeing);
      assert.equal(profile.developmentCompass.axes.character.score, undefined);
      assert.equal(profile.developmentCompass.axes.character.benchmark, undefined);
      assert.equal(
        profile.developmentCompass.safeguardingNote,
        NON_CLINICAL_SAFEGUARDING_DISCLAIMER
      );
    });
  });
});
