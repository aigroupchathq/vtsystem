// VEDIC TREE OS — MODULE 06: ACADEMICS & CCE COMPREHENSIVE TEST SUITE
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../src/database/db.js';
import {
  AcademicsService,
  TeacherContextStore
} from '../src/modules/academics/index.js';

describe('MODULE 06: ACADEMICS & CONTINUOUS EVALUATION (CCE) TEST SUITE', () => {
  let academics;
  let banerContext;
  let kothrudContext;
  let hqContext;

  beforeEach(() => {
    db.reset();
    academics = new AcademicsService(db, new TeacherContextStore());

    banerContext = {
      tenantId: 'org-vedictree',
      schoolId: 'sch-pune-intl',
      campusId: 'cmp-pune-baner',
      role: 'PRINCIPAL',
      userId: 'usr-principal-baner'
    };

    kothrudContext = {
      tenantId: 'org-vedictree',
      schoolId: 'sch-pune-intl',
      campusId: 'cmp-pune-kothrud',
      role: 'PRINCIPAL',
      userId: 'usr-principal-kothrud'
    };

    hqContext = {
      tenantId: 'org-vedictree',
      schoolId: 'sch-pune-intl',
      campusId: null,
      role: 'HQ_ADMIN',
      userId: 'usr-hq-admin'
    };
  });

  // ====================================================
  // 1. Academic Structure & Course Catalog
  // ====================================================
  describe('1. Academic Structure & Course Catalog', () => {
    it('1.1 Fetches subjects and adds a new accredited course offering', () => {
      const initial = academics.getSubjects('sch-pune-intl');
      assert.ok(initial.length >= 5, 'Should have standard school subjects seeded');

      const created = academics.createSubject('sch-pune-intl', {
        name: 'Artificial Intelligence & Robotics',
        code: 'AI-201',
        isElective: true,
        credits: 4
      });

      assert.equal(created.code, 'AI-201');
      assert.equal(created.name, 'Artificial Intelligence & Robotics');

      const updated = academics.getSubjects('sch-pune-intl');
      assert.ok(updated.some(s => s.code === 'AI-201'));
    });

    it('1.2 Rejects duplicate subject codes within the same school', () => {
      assert.throws(() => {
        academics.createSubject('sch-pune-intl', {
          name: 'Math Duplicate',
          code: 'MATH-101' // already seeded
        });
      }, /already exists/);
    });
  });

  // ====================================================
  // 2. Teacher Assignment & Class Teacher Invariant
  // ====================================================
  describe('2. Teacher Assignment & Class Teacher Invariant', () => {
    it('2.1 Assigns faculty to grade-division-subject with class teacher status', () => {
      const assignments = academics.getTeacherAssignments(banerContext, {
        divisionId: 'div-pune-5a'
      });
      assert.ok(assignments.length >= 2, 'Should have seeded teacher assignments in 5-A');

      const mathAssignment = assignments.find(a => a.subjectCode === 'MATH-101');
      assert.ok(mathAssignment, 'Math assignment should exist');
      assert.equal(mathAssignment.isClassTeacher, true, 'Sunita Patil should be 5-A class teacher');
    });

    it('2.2 Replaces previous class teacher when a new class teacher is designated', () => {
      // Reassign Rajesh Verma as class teacher for 5-A
      const newTa = academics.assignTeacherToDivision(banerContext, {
        employeeId: 'emp-rajesh',
        subjectId: 'subj-hin',
        divisionId: 'div-pune-5a',
        academicYearId: 'ay-2026-2027',
        isClassTeacher: true
      });

      assert.equal(newTa.isClassTeacher, true);

      // Verify Sunita Patil is no longer class teacher
      const sunitaTa = db.getTeacherAssignmentById(banerContext.campusId, 'ta-001');
      assert.equal(sunitaTa.isClassTeacher, false, 'Previous class teacher flag should be reset to false');
    });
  });

  // ====================================================
  // 3. Timetable Scheduling & Clash Prevention
  // ====================================================
  describe('3. Timetable Scheduling & Clash Prevention', () => {
    it('3.1 Fetches weekly period schedule sorted by period number', () => {
      const mondaySchedule = academics.getTimetable(banerContext, {
        divisionId: 'div-pune-5a',
        dayOfWeek: 'MON'
      });
      assert.equal(mondaySchedule.length, 6, 'Should have 6 periods on Monday');
      assert.equal(mondaySchedule[0].periodNumber, 1);
      assert.equal(mondaySchedule[5].periodNumber, 6);
    });

    it('3.2 Detects and blocks Division period collision (Invariant 1)', () => {
      // Attempt to schedule another class for 5-A on MON at Period 1
      assert.throws(() => {
        academics.schedulePeriod(banerContext, {
          divisionId: 'div-pune-5a',
          teacherAssignmentId: 'ta-005', // English
          dayOfWeek: 'MON',
          periodNumber: 1, // ALREADY OCCUPIED BY MATH
          startTime: '08:30',
          endTime: '09:15'
        });
      }, /TIMETABLE_CLASH: Division already has a scheduled class/);
    });

    it('3.3 Detects and blocks Teacher double-booking across different divisions (Invariant 2)', () => {
      // Sunita Patil (ta-001) is already teaching 5-A on MON in Period 1
      // Attempt to book Sunita Patil to teach 5-B on MON in Period 1
      assert.throws(() => {
        academics.schedulePeriod(banerContext, {
          divisionId: 'div-pune-5b',
          teacherAssignmentId: 'ta-003', // Sunita Patil Math in 5-B
          dayOfWeek: 'MON',
          periodNumber: 1, // CONFLICT! Sunita is already in 5-A Period 1
          startTime: '08:30',
          endTime: '09:15'
        });
      }, /TIMETABLE_CLASH: Teacher is already teaching another division/);
    });

    it('3.4 Allows scheduled period when teacher is substituting', () => {
      // If tagged as substitution with a substitute employee, or non-clashing slot, succeeds
      const period = academics.schedulePeriod(banerContext, {
        divisionId: 'div-pune-5b',
        teacherAssignmentId: 'ta-003',
        dayOfWeek: 'SAT',
        periodNumber: 1,
        startTime: '08:30',
        endTime: '09:15',
        isSubstitution: true,
        substituteEmployeeId: 'emp-rajesh'
      });
      assert.ok(period.id);
      assert.equal(period.isSubstitution, true);
    });
  });

  // ====================================================
  // 4. Remembered Teacher Context Pattern
  // ====================================================
  describe('4. Remembered Teacher Context Pattern', () => {
    it('4.1 Auto-resolves default context from active assignments without prompts', () => {
      const context = academics.getTeacherContext(banerContext, 'emp-sunita');
      assert.equal(context.divisionId, 'div-pune-5a');
      assert.equal(context.subjectId, 'subj-math');
      assert.equal(context.academicYearId, 'ay-2026-2027');
    });

    it('4.2 Persists updated teacher context across sessions to avoid repeated clicks', () => {
      // Teacher switches context to Grade 5-B Math
      academics.saveTeacherContext('emp-sunita', {
        divisionId: 'div-pune-5b',
        subjectId: 'subj-math'
      });

      // Subsequent access retains the exact chosen context
      const remembered = academics.getTeacherContext(banerContext, 'emp-sunita');
      assert.equal(remembered.divisionId, 'div-pune-5b');
      assert.equal(remembered.subjectId, 'subj-math');
    });
  });

  // ====================================================
  // 5. Curriculum & Lesson Progress Tracking
  // ====================================================
  describe('5. Curriculum & Lesson Progress Tracking', () => {
    it('5.1 Plans, transitions, and completes instructional lessons', () => {
      const lesson = academics.planLesson(banerContext, {
        teacherAssignmentId: 'ta-001',
        title: 'Polynomials & Factorization',
        chapter: 'Chapter 4',
        plannedDate: '2026-10-10',
        teachingAids: 'Algebra Tiles, Khan Academy Visualizer'
      });

      assert.equal(lesson.status, 'PLANNED');

      // Start lesson
      const inProgress = academics.updateLessonProgress(banerContext, lesson.id, 'IN_PROGRESS');
      assert.equal(inProgress.status, 'IN_PROGRESS');

      // Complete lesson
      const completed = academics.updateLessonProgress(banerContext, lesson.id, 'COMPLETED');
      assert.equal(completed.status, 'COMPLETED');
      assert.ok(completed.completedDate, 'Completion date should be stamped');
    });
  });

  // ====================================================
  // 6. Homework & Assignment Lifecycle
  // ====================================================
  describe('6. Homework & Assignment Lifecycle', () => {
    it('6.1 Assigns homework and automatically initializes submissions for division students', () => {
      const hw = academics.assignHomework(banerContext, {
        divisionId: 'div-pune-5a',
        subjectId: 'subj-math',
        teacherId: 'emp-sunita',
        title: 'Algebra Worksheet 4.1',
        dueDate: '2026-10-15',
        maxMarks: 15,
        submissionType: 'ONLINE_UPLOAD'
      });

      assert.ok(hw.id);

      const submissions = academics.getHomeworkSubmissions(banerContext, hw.id);
      assert.ok(submissions.length >= 2, 'Should initialize pending submissions for 5-A students (Aditi & Rohan)');
      assert.ok(submissions.every(s => s.status === 'PENDING'));
    });

    it('6.2 Handles student submission and teacher grading with feedback', () => {
      // Aditi Rao submits homework
      academics.submitStudentHomework(banerContext, 'hw-002', 'stu-aditi-rao', {
        content: 'Completed stomata diagram attached in portfolio.'
      });

      // Teacher grades submission
      const graded = academics.gradeStudentHomework(banerContext, 'hw-002', 'stu-aditi-rao', {
        marksObtained: 9.8,
        feedback: 'Superb scientific labeling and cross-sectional accuracy.'
      });

      assert.equal(graded.status, 'GRADED');
      assert.equal(graded.marksObtained, 9.8);
      assert.ok(graded.gradedAt);
    });
  });

  // ====================================================
  // 7. Assessments & Continuous Comprehensive Evaluation (CCE)
  // ====================================================
  describe('7. Assessments & Continuous Comprehensive Evaluation (CCE)', () => {
    it('7.1 Accurately computes CCE 9-point scale letter grades', () => {
      assert.equal(AcademicsService.calculateCceGrade(95, 100), 'A1');
      assert.equal(AcademicsService.calculateCceGrade(85, 100), 'A2');
      assert.equal(AcademicsService.calculateCceGrade(75, 100), 'B1');
      assert.equal(AcademicsService.calculateCceGrade(65, 100), 'B2');
      assert.equal(AcademicsService.calculateCceGrade(55, 100), 'C1');
      assert.equal(AcademicsService.calculateCceGrade(45, 100), 'C2');
      assert.equal(AcademicsService.calculateCceGrade(35, 100), 'D');
      assert.equal(AcademicsService.calculateCceGrade(20, 100), 'E');
    });

    it('7.2 Records student assessment score and automatically assigns CCE grade', () => {
      const result = academics.recordResult(banerContext, {
        assessmentId: 'asm-term1-math',
        studentId: 'stu-rohan-kulkarni',
        marksObtained: 68, // 68/80 = 85.0% -> A2
        remarks: 'Substantial improvement in coordinate geometry.'
      });

      assert.equal(result.marksObtained, 68);
      assert.equal(result.gradeLetter, 'A2');
    });
  });

  // ====================================================
  // 8. Report Cards & Summative Term Publishing
  // ====================================================
  describe('8. Report Cards & Summative Term Publishing', () => {
    it('8.1 Generates cumulative term report card with subject breakdown and attendance', () => {
      const rc = academics.generateReportCard(banerContext, {
        studentId: 'stu-aditi-rao',
        academicYearId: 'ay-2026-2027',
        term: 'Term 1',
        teacherRemarks: 'Aditi is a model student with stellar academic consistency.'
      });

      assert.ok(rc.id);
      assert.ok(rc.overallPercentage > 85);
      assert.equal(rc.overallGrade, 'A1');
      assert.ok(rc.attendancePercentage > 90);

      const parsed = JSON.parse(rc.summaryJson);
      assert.ok(parsed.subjects.length >= 2, 'Should compile multiple subjects');
      assert.ok(parsed.subjects.some(s => s.subject === 'Mathematics'));
    });

    it('8.2 Signs and publishes report card to student/parent portal', () => {
      const published = academics.publishReportCard(banerContext, 'rc-001');
      assert.ok(published.principalSignedAt);
      assert.ok(published.publishedAt);
    });
  });

  // ====================================================
  // 9. Persona-Specific Workspaces
  // ====================================================
  describe('9. Persona-Specific Workspaces', () => {
    it('9.1 Teacher My Day returns active daily periods and pending grading queue', () => {
      const myDay = academics.getTeacherMyDay(banerContext, 'emp-sunita', 'MON');
      assert.equal(myDay.teacherId, 'emp-sunita');
      assert.ok(myDay.periods.length >= 3, 'Sunita teaches multiple periods on Monday');
      assert.ok(myDay.activeLessons !== undefined);
      assert.ok(typeof myDay.pendingGradingCount === 'number');
    });

    it('9.2 Student Academic View returns personal timetable, homework and report card', () => {
      const profile = academics.getStudentAcademicView(banerContext, 'stu-aditi-rao');
      assert.equal(profile.student.id, 'stu-aditi-rao');
      assert.ok(profile.weeklyTimetable.length > 0);
      assert.ok(profile.homework.length > 0);
      assert.ok(profile.results.length > 0);
      assert.ok(profile.reportCards.length > 0);
    });
  });

  // ====================================================
  // 10. Multi-Tenant Campus Isolation Barrier
  // ====================================================
  describe('10. Multi-Tenant Campus Isolation Barrier', () => {
    it('10.1 Prevents Baner principal from accessing Kothrud student academic records', () => {
      assert.throws(() => {
        academics.getStudentAcademicView(banerContext, 'stu-ananya-joshi'); // Kothrud student
      }, /Student not found in this campus/);
    });

    it('10.2 Allows HQ Administrator universal visibility across all campuses', () => {
      const banerResults = academics.getResults(banerContext);
      const allResults = academics.getResults(hqContext);
      assert.ok(allResults.length >= banerResults.length);
    });

    it('10.3 Prevents Kothrud principal from accessing Baner student academic records', () => {
      assert.throws(() => {
        academics.getStudentAcademicView(kothrudContext, 'stu-aditi-rao'); // Baner student
      }, /Student not found in this campus/);
    });
  });
});
