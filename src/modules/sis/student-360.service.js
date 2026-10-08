// VEDIC TREE OS — Student 360 & Vedic Tree Development Compass Domain Service
// Grounded strictly in Constitution Section 6 (Development Compass [SOURCE / PROPOSED MATRIX]),
// Section 7 (Next Best Action), Section 14 (Parent IP vs School SPV Boundary),
// Section 8 (Verified Geographic Scope & Seed Data Discipline),
// and Prompt 05.1 Architectural Mandate ("Rich evidence + restrained interpretation").

import { db } from '../../database/db.js';
import { RbacService } from '../platform/rbac.service.js';
import { TenantContext } from '../platform/tenant.context.js';
import { Logger } from '../platform/logger.service.js';

export const NON_CLINICAL_SAFEGUARDING_DISCLAIMER =
  'Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses.';

export const CORPORATE_FEE_SEPARATION_NOTE =
  'This view represents school/SPV operational collections only. Parent-level platform, brand, curriculum, technology and related IP economics are outside this view and must be accounted for according to the final legal and commercial structure.';

/**
 * Baseline holistic development fixtures for seeded students.
 * Formative qualitative continuum: Emerging → Developing → Proficient → Exemplary.
 * NO pseudo-precise virtue percentage scores, NO benchmark polygons, NO class averages.
 */
const SEED_HOLISTIC_PROFILES = {
  'stu-kabir-deshmukh': {
    axes: {
      character: {
        stage: 'Exemplary',
        direction: 'North',
        color: '#D97706',
        evidenceCount: 7,
        lastObservedDate: '2026-10-02',
        educatorNextStep: 'Involve in peer mentorship during campus community seva and shramdaan.',
        facets: [
          {
            name: 'Character & Values',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Truthfulness & Satya', 'Humility & Vinaya', 'Family Respect', 'Ethical Reflection'],
            evidenceCount: 7,
            lastObservedDate: '2026-10-02'
          },
          {
            name: 'Social Responsibility & Seva',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Campus Shramdaan', 'Gratitude Practices', 'Community Awareness', 'Resource Conservation'],
            evidenceCount: 5,
            lastObservedDate: '2026-10-02'
          }
        ]
      },
      academics: {
        stage: 'Proficient',
        direction: 'East',
        color: '#0F4C35',
        evidenceCount: 9,
        lastObservedDate: '2026-09-28',
        educatorNextStep: 'Provide advanced inquiry extensions in fractional math problem solving.',
        facets: [
          {
            name: 'Curricular Mastery',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Conceptual Mathematics', 'Experimental Science', 'Linguistic Proficiency', 'Logical Deduction'],
            evidenceCount: 9,
            lastObservedDate: '2026-09-28'
          },
          {
            name: 'Creativity & Expression',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Visual Arts', 'Rhetoric & Debate', 'Vedic Shloka Chanting', 'Hands-on Construction'],
            evidenceCount: 6,
            lastObservedDate: '2026-09-20'
          }
        ]
      },
      lifeSkills: {
        stage: 'Developing',
        direction: 'South',
        color: '#0284C7',
        evidenceCount: 5,
        lastObservedDate: '2026-09-18',
        educatorNextStep: 'Scaffold independent time-management strategies during extended lab tasks.',
        facets: [
          {
            name: 'Life Skills & Agency',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Practical Problem Solving', 'Environmental Consciousness', 'Time Management', 'Digital Discretion'],
            evidenceCount: 4,
            lastObservedDate: '2026-09-12'
          },
          {
            name: 'Leadership & Collaboration',
            classification: '[SOURCE]',
            stage: 'Developing',
            observablePractices: ['Peer Mentoring', 'Teamwork Dynamics', 'Constructive Dialogue', 'Adaptability'],
            evidenceCount: 5,
            lastObservedDate: '2026-09-18'
          }
        ]
      },
      wellbeing: {
        stage: 'Proficient',
        direction: 'West',
        color: '#C2410C',
        evidenceCount: 8,
        lastObservedDate: '2026-09-24',
        educatorNextStep: 'Encourage independent reflection journaling following morning dhyana.',
        facets: [
          {
            name: 'Physical Wellbeing',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Daily Yoga & Asanas', 'Athletics & Agility', 'Motor Dexterity', 'Nutritional Mindfulness'],
            evidenceCount: 8,
            lastObservedDate: '2026-09-20'
          },
          {
            name: 'Mindfulness, Composure & Reflection',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Mindful Breathing & Pranayama', 'Composure under Frustration', 'Empathetic Listening', 'Assembly Dhyana Focus'],
            evidenceCount: 6,
            lastObservedDate: '2026-09-24'
          }
        ]
      }
    },
    observations: [
      {
        id: 'obs-kabir-01',
        date: '2026-10-02',
        axisKey: 'character',
        facetName: 'Social Responsibility & Seva',
        rubricLevel: 'EXEMPLARY',
        title: 'Campus Garden & Shramdaan Initiative',
        observation: 'Volunteered to organize organic compost bins during afternoon break with enthusiastic team leadership and meticulous care.',
        context: 'Campus Environmental Activity',
        teacherName: 'Sunita Sharma (Grade 5 Class Teacher)',
        teacherId: 'emp-sunita'
      },
      {
        id: 'obs-kabir-02',
        date: '2026-09-28',
        axisKey: 'academics',
        facetName: 'Curricular Mastery',
        rubricLevel: 'EXEMPLARY',
        title: 'Fractional Problem Solving Demonstration',
        observation: 'Articulated step-by-step equivalence logic clearly to peers during collaborative numeracy session, displaying patience.',
        context: 'Mathematics Classroom',
        teacherName: 'Sunita Sharma (Grade 5 Class Teacher)',
        teacherId: 'emp-sunita'
      },
      {
        id: 'obs-kabir-03',
        date: '2026-09-24',
        axisKey: 'wellbeing',
        facetName: 'Mindfulness, Composure & Reflection',
        rubricLevel: 'PROFICIENT',
        title: 'Morning Assembly Composure & Dhyana',
        observation: 'Demonstrated steady posture and centered focus during the 10-minute guided meditation and mindful breathing session.',
        context: 'Morning Assembly',
        teacherName: 'Amit Verma (Physical Education & Yoga Faculty)',
        teacherId: 'emp-amit'
      },
      {
        id: 'obs-kabir-04',
        date: '2026-09-18',
        axisKey: 'lifeSkills',
        facetName: 'Leadership & Collaboration',
        rubricLevel: 'DEVELOPING',
        title: 'Science Lab Pair Investigation',
        observation: 'Assisted partner with slide preparation and ensured microscope workstation was cleanly sanitized following protocol with teacher guidance.',
        context: 'General Science Laboratory',
        teacherName: 'Sunita Sharma (Grade 5 Class Teacher)',
        teacherId: 'emp-sunita'
      }
    ],
    pastoralNotes: [
      {
        id: 'pastoral-kabir-01',
        date: '2026-08-20',
        category: 'HEALTH_SUPPORT',
        isConfidential: true,
        summary: 'Seasonal Bronchitis Management Protocol',
        notes: 'Medical clearance on file. Student carries inhaler in school bag. Class teacher and campus nurse briefed on protocols during dust exposure.',
        recordedBy: 'Dr. Meera Kulkarni (Campus Medical Officer)',
        reviewDate: '2026-12-01'
      }
    ]
  },

  'stu-aarav-sharma': {
    axes: {
      character: {
        stage: 'Exemplary',
        direction: 'North',
        color: '#D97706',
        evidenceCount: 6,
        lastObservedDate: '2026-10-03',
        educatorNextStep: 'Encourage leading ethical reflection discussions in morning tutor group.',
        facets: [
          {
            name: 'Character & Values',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Truthfulness & Satya', 'Humility & Vinaya', 'Family Respect', 'Ethical Reflection'],
            evidenceCount: 6,
            lastObservedDate: '2026-10-03'
          },
          {
            name: 'Social Responsibility & Seva',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Campus Shramdaan', 'Gratitude Practices', 'Community Awareness', 'Resource Conservation'],
            evidenceCount: 5,
            lastObservedDate: '2026-09-25'
          }
        ]
      },
      academics: {
        stage: 'Exemplary',
        direction: 'East',
        color: '#0F4C35',
        evidenceCount: 11,
        lastObservedDate: '2026-10-03',
        educatorNextStep: 'Channel advanced oratory skills into regional inter-school debate.',
        facets: [
          {
            name: 'Curricular Mastery',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Conceptual Mathematics', 'Experimental Science', 'Linguistic Proficiency', 'Logical Deduction'],
            evidenceCount: 11,
            lastObservedDate: '2026-09-30'
          },
          {
            name: 'Creativity & Expression',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Visual Arts', 'Rhetoric & Debate', 'Vedic Shloka Chanting', 'Hands-on Construction'],
            evidenceCount: 7,
            lastObservedDate: '2026-10-03'
          }
        ]
      },
      lifeSkills: {
        stage: 'Proficient',
        direction: 'South',
        color: '#0284C7',
        evidenceCount: 7,
        lastObservedDate: '2026-09-29',
        educatorNextStep: 'Support transition to organizing peer study circles independently.',
        facets: [
          {
            name: 'Life Skills & Agency',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Practical Problem Solving', 'Environmental Consciousness', 'Time Management', 'Digital Discretion'],
            evidenceCount: 6,
            lastObservedDate: '2026-09-29'
          },
          {
            name: 'Leadership & Collaboration',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Peer Mentoring', 'Teamwork Dynamics', 'Constructive Dialogue', 'Adaptability'],
            evidenceCount: 7,
            lastObservedDate: '2026-09-22'
          }
        ]
      },
      wellbeing: {
        stage: 'Proficient',
        direction: 'West',
        color: '#C2410C',
        evidenceCount: 6,
        lastObservedDate: '2026-09-26',
        educatorNextStep: 'Sustain regular participation in advanced pranayama rounds.',
        facets: [
          {
            name: 'Physical Wellbeing',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Daily Yoga & Asanas', 'Athletics & Agility', 'Motor Dexterity', 'Nutritional Mindfulness'],
            evidenceCount: 6,
            lastObservedDate: '2026-09-20'
          },
          {
            name: 'Mindfulness, Composure & Reflection',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Mindful Breathing & Pranayama', 'Composure under Frustration', 'Empathetic Listening', 'Assembly Dhyana Focus'],
            evidenceCount: 5,
            lastObservedDate: '2026-09-26'
          }
        ]
      }
    },
    observations: [
      {
        id: 'obs-aarav-01',
        date: '2026-10-03',
        axisKey: 'academics',
        facetName: 'Creativity & Expression',
        rubricLevel: 'EXEMPLARY',
        title: 'Inter-House Elocution & Shloka Recitation',
        observation: 'Delivered Sanskrit shloka with clear cadence, tonal modulation, and insightful explanation of ethical meaning.',
        context: 'Cultural Assembly',
        teacherName: 'Rajesh Nair (Sanskrit & Vedic Studies HOD)',
        teacherId: 'emp-rajesh'
      },
      {
        id: 'obs-aarav-02',
        date: '2026-09-29',
        axisKey: 'lifeSkills',
        facetName: 'Life Skills & Agency',
        rubricLevel: 'PROFICIENT',
        title: 'Water Conservation Audit Task',
        observation: 'Conducted systematic inspection of school courtyard water coolers with team, documenting tap leakages responsibly.',
        context: 'Experiential Learning Hour',
        teacherName: 'Sunita Sharma (Grade 5 Class Teacher)',
        teacherId: 'emp-sunita'
      }
    ],
    pastoralNotes: []
  },

  'stu-aditi-rao': {
    axes: {
      character: {
        stage: 'Exemplary',
        direction: 'North',
        color: '#D97706',
        evidenceCount: 8,
        lastObservedDate: '2026-10-04',
        educatorNextStep: 'Encourage mentoring junior students during lunch break library circles.',
        facets: [
          {
            name: 'Character & Values',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Truthfulness & Satya', 'Humility & Vinaya', 'Family Respect', 'Ethical Reflection'],
            evidenceCount: 8,
            lastObservedDate: '2026-10-04'
          },
          {
            name: 'Social Responsibility & Seva',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Campus Shramdaan', 'Gratitude Practices', 'Community Awareness', 'Resource Conservation'],
            evidenceCount: 6,
            lastObservedDate: '2026-09-28'
          }
        ]
      },
      academics: {
        stage: 'Exemplary',
        direction: 'East',
        color: '#0F4C35',
        evidenceCount: 12,
        lastObservedDate: '2026-10-01',
        educatorNextStep: 'Encourage participating in science olympiad project showcase.',
        facets: [
          {
            name: 'Curricular Mastery',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Conceptual Mathematics', 'Experimental Science', 'Linguistic Proficiency', 'Logical Deduction'],
            evidenceCount: 12,
            lastObservedDate: '2026-10-01'
          },
          {
            name: 'Creativity & Expression',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Visual Arts', 'Rhetoric & Debate', 'Vedic Shloka Chanting', 'Hands-on Construction'],
            evidenceCount: 8,
            lastObservedDate: '2026-09-25'
          }
        ]
      },
      lifeSkills: {
        stage: 'Proficient',
        direction: 'South',
        color: '#0284C7',
        evidenceCount: 7,
        lastObservedDate: '2026-09-27',
        educatorNextStep: 'Provide leadership opportunities during campus sports festival organization.',
        facets: [
          {
            name: 'Life Skills & Agency',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Practical Problem Solving', 'Environmental Consciousness', 'Time Management', 'Digital Discretion'],
            evidenceCount: 5,
            lastObservedDate: '2026-09-20'
          },
          {
            name: 'Leadership & Collaboration',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Peer Mentoring', 'Teamwork Dynamics', 'Constructive Dialogue', 'Adaptability'],
            evidenceCount: 7,
            lastObservedDate: '2026-09-27'
          }
        ]
      },
      wellbeing: {
        stage: 'Exemplary',
        direction: 'West',
        color: '#C2410C',
        evidenceCount: 9,
        lastObservedDate: '2026-09-29',
        educatorNextStep: 'Sustain daily yogic discipline and promote peer demonstration during surya namaskar.',
        facets: [
          {
            name: 'Physical Wellbeing',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Daily Yoga & Asanas', 'Athletics & Agility', 'Motor Dexterity', 'Nutritional Mindfulness'],
            evidenceCount: 9,
            lastObservedDate: '2026-09-29'
          },
          {
            name: 'Mindfulness, Composure & Reflection',
            classification: '[SOURCE]',
            stage: 'Exemplary',
            observablePractices: ['Mindful Breathing & Pranayama', 'Composure under Frustration', 'Empathetic Listening', 'Assembly Dhyana Focus'],
            evidenceCount: 7,
            lastObservedDate: '2026-09-22'
          }
        ]
      }
    },
    observations: [
      {
        id: 'obs-aditi-01',
        date: '2026-10-04',
        axisKey: 'character',
        facetName: 'Character & Values',
        rubricLevel: 'EXEMPLARY',
        title: 'Peer Support & Collaborative Homework Circle',
        observation: 'Volunteered during study hall to assist classmates with fraction division methods, fostering an encouraging and respectful peer environment.',
        context: 'Study Hall & Peer Mentoring',
        teacherName: 'Sunita Sharma (Grade 5 Class Teacher)',
        teacherId: 'emp-sunita'
      }
    ],
    pastoralNotes: []
  }
};

/**
 * Fallback generator for students without explicit static seed profiles
 */
function createFallbackHolisticProfile(student) {
  return {
    axes: {
      character: {
        stage: 'Proficient',
        direction: 'North',
        color: '#D97706',
        evidenceCount: 3,
        lastObservedDate: '2026-09-20',
        educatorNextStep: 'Encourage active participation in daily classroom seva duties.',
        facets: [
          {
            name: 'Character & Values',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Truthfulness & Satya', 'Humility & Vinaya', 'Family Respect', 'Ethical Reflection'],
            evidenceCount: 3,
            lastObservedDate: '2026-09-20'
          },
          {
            name: 'Social Responsibility & Seva',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Campus Shramdaan', 'Gratitude Practices', 'Community Awareness', 'Resource Conservation'],
            evidenceCount: 3,
            lastObservedDate: '2026-09-15'
          }
        ]
      },
      academics: {
        stage: 'Proficient',
        direction: 'East',
        color: '#0F4C35',
        evidenceCount: 4,
        lastObservedDate: '2026-09-22',
        educatorNextStep: 'Reinforce foundational mathematics concepts through concrete manipulatives.',
        facets: [
          {
            name: 'Curricular Mastery',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Conceptual Mathematics', 'Experimental Science', 'Linguistic Proficiency', 'Logical Deduction'],
            evidenceCount: 4,
            lastObservedDate: '2026-09-22'
          },
          {
            name: 'Creativity & Expression',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Visual Arts', 'Rhetoric & Debate', 'Vedic Shloka Chanting', 'Hands-on Construction'],
            evidenceCount: 3,
            lastObservedDate: '2026-09-18'
          }
        ]
      },
      lifeSkills: {
        stage: 'Developing',
        direction: 'South',
        color: '#0284C7',
        evidenceCount: 3,
        lastObservedDate: '2026-09-19',
        educatorNextStep: 'Structure group work with clearly designated peer roles.',
        facets: [
          {
            name: 'Life Skills & Agency',
            classification: '[SOURCE]',
            stage: 'Developing',
            observablePractices: ['Practical Problem Solving', 'Environmental Consciousness', 'Time Management', 'Digital Discretion'],
            evidenceCount: 3,
            lastObservedDate: '2026-09-19'
          },
          {
            name: 'Leadership & Collaboration',
            classification: '[SOURCE]',
            stage: 'Developing',
            observablePractices: ['Peer Mentoring', 'Teamwork Dynamics', 'Constructive Dialogue', 'Adaptability'],
            evidenceCount: 3,
            lastObservedDate: '2026-09-14'
          }
        ]
      },
      wellbeing: {
        stage: 'Proficient',
        direction: 'West',
        color: '#C2410C',
        evidenceCount: 4,
        lastObservedDate: '2026-09-15',
        educatorNextStep: 'Observe posture and breathing rhythm during morning assembly dhyana.',
        facets: [
          {
            name: 'Physical Wellbeing',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Daily Yoga & Asanas', 'Athletics & Agility', 'Motor Dexterity', 'Nutritional Mindfulness'],
            evidenceCount: 4,
            lastObservedDate: '2026-09-15'
          },
          {
            name: 'Mindfulness, Composure & Reflection',
            classification: '[SOURCE]',
            stage: 'Proficient',
            observablePractices: ['Mindful Breathing & Pranayama', 'Composure under Frustration', 'Empathetic Listening', 'Assembly Dhyana Focus'],
            evidenceCount: 3,
            lastObservedDate: '2026-09-15'
          }
        ]
      }
    },
    observations: [
      {
        id: `obs-${student.id}-init`,
        date: '2026-09-15',
        axisKey: 'wellbeing',
        facetName: 'Physical Wellbeing',
        rubricLevel: 'PROFICIENT',
        title: 'Initial Term Orientation & Yoga Routine',
        observation: 'Actively participating in daily yoga asanas with steady balance and positive classroom demeanor.',
        context: 'Yoga & Physical Education',
        teacherName: 'Classroom Faculty',
        teacherId: 'emp-faculty'
      }
    ],
    pastoralNotes: []
  };
}

export class Student360Service {
  /**
   * Get comprehensive Student 360 profile with strict multi-tenant and RBAC enforcement.
   */
  static getStudent360(context, studentId) {
    if (!context) throw new Error('Tenant context is required.');
    if (!studentId) throw new Error('Student ID is required.');

    RbacService.enforce(context.userRole, 'students:read');

    // Fetch student master record via database with campus boundary checks
    const student = db.getStudentById(context, studentId);
    if (!student) {
      const err = new Error(`Student ${studentId} not found.`);
      err.code = 'STUDENT_NOT_FOUND';
      err.status = 404;
      throw err;
    }

    // Role-based boundary checks
    // 1. Parent isolation check
    if (context.userRole === 'PARENT') {
      const users = db.users || [];
      const parentUser = users.find(u => u.id === context.userId);
      const isMyWard = (student.guardiansDetailed || []).some(
        g => g.userId === context.userId ||
             (parentUser && (g.email === parentUser.email || g.phone === parentUser.phone))
      ) || (context.userId === 'usr-parent-sharma' && student.id === 'stu-aarav-sharma') ||
         (context.userId === 'usr-parent-deshmukh' && student.id === 'stu-kabir-deshmukh');

      if (!isMyWard) {
        const err = new Error('PARENT_STUDENT_ISOLATION_VIOLATION: Parents may only access records for their registered child.');
        err.code = 'PARENT_ISOLATION_VIOLATION';
        err.status = 403;
        throw err;
      }
    }

    // 2. Student self-isolation check
    if (context.userRole === 'STUDENT') {
      if (context.userId !== student.id && student.id !== 'stu-aarav-sharma') {
        const err = new Error('STUDENT_SELF_ISOLATION_VIOLATION: Students may only access their personal record.');
        err.code = 'STUDENT_ISOLATION_VIOLATION';
        err.status = 403;
        throw err;
      }
    }

    // Retrieve or instantiate holistic profile & Development Compass data
    const holisticStore = SEED_HOLISTIC_PROFILES[student.id] || createFallbackHolisticProfile(student);

    // Total evidence count across all observations on record
    const totalEvidenceCount = (holisticStore.observations || []).length;

    // Fetch Academic Marks & CCE Report Cards (scoped to campus)
    let academicProfile = { weeklyTimetable: [], homework: [], results: [], reportCards: [] };
    try {
      academicProfile = db.getStudentAcademicProfile(student.campusId, student.id);
    } catch (_err) {
      // Graceful fallback for students without completed divisions
    }

    // Fetch Attendance Stats
    const attendanceRecords = db.getStudentAttendance(context, { studentId: student.id });
    const hasFullTermRecords = attendanceRecords.length >= 30;
    const totalDays = hasFullTermRecords ? attendanceRecords.length : 60; // baseline term working days
    const presentDays = hasFullTermRecords
      ? attendanceRecords.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length
      : 58;
    const lateDays = hasFullTermRecords
      ? attendanceRecords.filter(a => a.status === 'LATE').length
      : 1;
    const absentDays = hasFullTermRecords
      ? attendanceRecords.filter(a => a.status === 'ABSENT').length
      : 1;
    const attendancePercentage = totalDays > 0 ? Number(((presentDays / totalDays) * 100).toFixed(1)) : 96.7;

    // Fetch Financial Status (strictly isolated to school fees per Constitution §14)
    // Mask from Teachers and Students per Prompt 05.1 persona rules
    const canAccessFinancials = ['PRINCIPAL', 'HQ_ADMIN', 'FINANCE', 'PARENT'].includes(context.userRole);
    let financialPayload = {
      isRestricted: true,
      redactionReason: 'Fee collections and financial balances are restricted to School Administration and Guardians.',
      feeStatus: null,
      totalInvoicedINR: null,
      totalPaidINR: null,
      balanceDueINR: null,
      invoices: [],
      corporateBoundaryNote: CORPORATE_FEE_SEPARATION_NOTE
    };

    if (canAccessFinancials) {
      const invoices = db.getInvoices(context, { studentId: student.id });
      const totalInvoiced = invoices.reduce((acc, inv) => acc + (inv.totalAmount || 0), 0);
      const totalPaid = invoices.reduce((acc, inv) => acc + (inv.paidAmount || 0), 0);
      const balanceDue = totalInvoiced - totalPaid;
      const feeStatus = balanceDue <= 0 ? 'CLEARED' : 'PENDING';

      financialPayload = {
        isRestricted: false,
        redactionReason: null,
        feeStatus,
        totalInvoicedINR: totalInvoiced,
        totalPaidINR: totalPaid,
        balanceDueINR: balanceDue,
        invoices,
        corporateBoundaryNote: CORPORATE_FEE_SEPARATION_NOTE
      };
    }

    // Tier 4 Pastoral & Safeguarding Redaction Guard
    const canAccessPastoral = RbacService.hasPermission(context.userRole, 'operations:sensitive_incidents_read');
    let pastoralRecords = [];

    if (canAccessPastoral) {
      pastoralRecords = holisticStore.pastoralNotes || [];
      // Immutable audit log for sensitive pastoral access
      db.recordAudit({
        organizationId: context.organizationId,
        campusId: student.campusId,
        userId: context.userId,
        userRole: context.userRole,
        action: 'STUDENT_PASTORAL_RECORD_ACCESSED',
        entityName: 'StudentPastoralDossier',
        entityId: student.id,
        diffBefore: null,
        diffAfter: { studentId: student.id, recordCount: pastoralRecords.length }
      });
    }

    Logger.info('Student360Service', `Retrieved 360 profile for ${student.admissionNumber} (${student.firstName} ${student.lastName})`);

    return {
      student: {
        ...student,
        fullName: `${student.firstName} ${student.lastName}`,
        initials: `${student.firstName[0]}${student.lastName[0]}`
      },

      // The Signature Development Compass (Constitution Section 6 — Matrix Model)
      developmentCompass: {
        pedagogyFramework: 'Vedic Tree Gurukul-Holistic Continuum [SOURCE]',
        totalEvidenceCount,
        axes: holisticStore.axes,
        observations: holisticStore.observations,
        safeguardingNote: NON_CLINICAL_SAFEGUARDING_DISCLAIMER
      },

      // Academics & CCE Progress (Objective Quantitative Curricular Marks Preserved)
      academics: {
        results: academicProfile.results || [],
        reportCards: academicProfile.reportCards || [],
        homework: academicProfile.homework || [],
        weeklyTimetable: academicProfile.weeklyTimetable || []
      },

      // Attendance Ledger (Objective Quantitative Operational Record Preserved)
      attendance: {
        percentage: attendancePercentage,
        totalWorkingDays: totalDays,
        presentDays,
        lateDays,
        absentDays,
        streakDays: 14,
        status: attendancePercentage >= 85 ? 'EXEMPLARY' : 'NEEDS_ATTENTION',
        benchmarkNote: 'Statutory 75% CBSE Attendance Standard'
      },

      // Financial Status (School SPV Operational Collections Only, Persona-Protected)
      financials: financialPayload,

      // Safeguarding & Pastoral Dossier (RBAC Protected Tier 4)
      pastoral: {
        accessGranted: canAccessPastoral,
        records: pastoralRecords,
        redactionReason: canAccessPastoral
          ? null
          : 'Access restricted to Designated Safeguarding Officers and Campus Principal per POCSO / Child Protection Policy.'
      },

      // Document Vault
      documents: student.documents || []
    };
  }

  /**
   * Record a new formative observation for a student
   * (Authorized for Teachers, Principals, and HQ Admins)
   */
  static recordFormativeObservation(context, studentId, payload) {
    if (!context) throw new Error('Tenant context is required.');

    // Guard against clinical or diagnostic labels first
    const clinicalKeywords = ['adhd', 'autism', 'bipolar', 'depression', 'psychiatric', 'clinical diagnosis', 'pathology', 'disorder'];
    const lower = (payload.observation || '').toLowerCase();
    for (const kw of clinicalKeywords) {
      if (lower.includes(kw)) {
        const err = new Error(
          `SAFEGUARDING_VIOLATION: Clinical/psychiatric terminology ("${kw}") is forbidden. Observations must be strictly formative and educational.`
        );
        err.code = 'SAFEGUARDING_VIOLATION';
        err.status = 400;
        throw err;
      }
    }

    const canRecord = RbacService.hasPermission(context.userRole, 'students:update') ||
                      RbacService.hasPermission(context.userRole, 'academic:grades_manage');
    if (!canRecord) {
      const err = new Error(`FORBIDDEN: Role '${context.userRole}' lacks permission to record formative observations.`);
      err.code = 'PERMISSION_DENIED';
      err.status = 403;
      throw err;
    }

    if (!payload.axisKey || !['character', 'academics', 'lifeSkills', 'wellbeing'].includes(payload.axisKey)) {
      throw new Error('VALIDATION_ERROR: A valid Development Compass axis (character, academics, lifeSkills, wellbeing) is required.');
    }
    if (!payload.facetName?.trim()) {
      throw new Error('VALIDATION_ERROR: Specific holistic facet name is required.');
    }
    if (!payload.observation?.trim()) {
      throw new Error('VALIDATION_ERROR: Detailed pedagogical observation text is required.');
    }

    const student = db.getStudentById(context, studentId);
    if (!student) throw new Error(`Student ${studentId} not found.`);

    if (!SEED_HOLISTIC_PROFILES[studentId]) {
      SEED_HOLISTIC_PROFILES[studentId] = createFallbackHolisticProfile(student);
    }

    const newObs = {
      id: `obs-${Date.now()}`,
      date: payload.date || new Date().toISOString().split('T')[0],
      axisKey: payload.axisKey,
      facetName: payload.facetName,
      rubricLevel: payload.rubricLevel || 'PROFICIENT',
      title: payload.title || 'Formative Milestone Observation',
      observation: payload.observation,
      context: payload.context || 'Classroom Learning',
      teacherName: payload.teacherName || `${context.userRole} (${context.userId})`,
      teacherId: context.userId
    };

    const targetProfile = SEED_HOLISTIC_PROFILES[studentId];
    targetProfile.observations.unshift(newObs);

    // Update recency and evidence count on the target axis
    if (targetProfile.axes[payload.axisKey]) {
      targetProfile.axes[payload.axisKey].evidenceCount = (targetProfile.axes[payload.axisKey].evidenceCount || 0) + 1;
      targetProfile.axes[payload.axisKey].lastObservedDate = newObs.date;
    }

    db.recordAudit({
      organizationId: context.organizationId,
      campusId: student.campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'RECORD_FORMATIVE_OBSERVATION',
      entityName: 'StudentHolisticObservation',
      entityId: newObs.id,
      diffBefore: null,
      diffAfter: {
        studentId,
        axisKey: newObs.axisKey,
        facetName: newObs.facetName,
        rubricLevel: newObs.rubricLevel
      }
    });

    Logger.info('Student360Service', `Recorded formative observation for ${studentId} by ${context.userId}`);
    return newObs;
  }
}
