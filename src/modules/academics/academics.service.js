// VEDIC TREE OS — Academics & Continuous Comprehensive Evaluation (CCE) Domain Service (Module 06)
import { db } from '../../database/db.js';

/**
 * TeacherContextStore: In-memory & session-scoped store to remember teacher context
 * (Academic Year, Grade, Division, Subject) across operations to eliminate repeated selections.
 */
export class TeacherContextStore {
  constructor() {
    this._contextByTeacher = new Map();
  }

  getContext(teacherId) {
    if (!teacherId) return null;
    return this._contextByTeacher.get(teacherId) || null;
  }

  setContext(teacherId, contextData) {
    if (!teacherId) return;
    const current = this.getContext(teacherId) || {};
    this._contextByTeacher.set(teacherId, {
      ...current,
      ...contextData,
      lastUpdated: new Date().toISOString()
    });
  }

  clearContext(teacherId) {
    if (teacherId) {
      this._contextByTeacher.delete(teacherId);
    }
  }

  /**
   * Resolves default remembered context for a teacher.
   * If not explicitly set, picks their primary class-teacher assignment or first active assignment.
   */
  resolveDefaultContext(campusId, teacherId) {
    const remembered = this.getContext(teacherId);
    if (remembered && remembered.divisionId && remembered.subjectId) {
      return remembered;
    }

    const assignments = db.getTeacherAssignments(campusId, { employeeId: teacherId });
    if (!assignments || assignments.length === 0) {
      return {
        academicYearId: 'ay-2026-2027',
        gradeId: 'grd-5',
        divisionId: 'div-pune-5a',
        subjectId: 'subj-math',
        isDefaultFallback: true
      };
    }

    // Prefer class teacher assignment if available
    const primary = assignments.find(a => a.isClassTeacher) || assignments[0];
    const autoContext = {
      academicYearId: primary.academicYearId || 'ay-2026-2027',
      gradeId: primary.gradeId,
      divisionId: primary.divisionId,
      subjectId: primary.subjectId,
      teacherAssignmentId: primary.id,
      isDefaultFallback: false
    };

    this.setContext(teacherId, autoContext);
    return autoContext;
  }
}

export const defaultTeacherContextStore = new TeacherContextStore();

/**
 * AcademicsService — Core Business Logic for Curriculum, Timetables, Grading & Report Cards
 */
export class AcademicsService {
  constructor(database = db, contextStore = defaultTeacherContextStore) {
    this.db = database;
    this.contextStore = contextStore;
  }

  // ----------------------------------------------------
  // 1. Structure & Subject Offerings
  // ----------------------------------------------------
  getSubjects(schoolId) {
    return this.db.getSubjects(schoolId);
  }

  createSubject(schoolId, data) {
    return this.db.createSubject({ ...data, schoolId });
  }

  getTeacherAssignments(context, filters = {}) {
    return this.db.getTeacherAssignments(context.campusId, filters);
  }

  assignTeacherToDivision(context, data) {
    return this.db.createTeacherAssignment(context.campusId, data);
  }

  removeTeacherAssignment(context, id) {
    return this.db.deleteTeacherAssignment(context.campusId, id);
  }

  // ----------------------------------------------------
  // 2. Remembered Teacher Context
  // ----------------------------------------------------
  getTeacherContext(context, teacherId) {
    return this.contextStore.resolveDefaultContext(context.campusId, teacherId);
  }

  saveTeacherContext(teacherId, contextData) {
    this.contextStore.setContext(teacherId, contextData);
    return this.contextStore.getContext(teacherId);
  }

  // ----------------------------------------------------
  // 3. Timetable & Clash Validation
  // ----------------------------------------------------
  getTimetable(context, filters = {}) {
    return this.db.getTimetable(context.campusId, filters);
  }

  schedulePeriod(context, data) {
    return this.db.createTimetablePeriod(context.campusId, data);
  }

  deletePeriod(context, id) {
    return this.db.deleteTimetablePeriod(context.campusId, id);
  }

  // ----------------------------------------------------
  // 4. Lessons & Curriculum Delivery
  // ----------------------------------------------------
  getLessons(context, filters = {}) {
    return this.db.getLessons(context.campusId, filters);
  }

  planLesson(context, data) {
    return this.db.createLesson(context.campusId, data);
  }

  updateLessonProgress(context, id, status, updates = {}) {
    return this.db.updateLesson(context.campusId, id, { ...updates, status });
  }

  // ----------------------------------------------------
  // 5. Homework & Assignment Lifecycle
  // ----------------------------------------------------
  getHomeworks(context, filters = {}) {
    return this.db.getHomeworks(context.campusId, filters);
  }

  assignHomework(context, data) {
    return this.db.createHomework(context.campusId, data);
  }

  getHomeworkSubmissions(context, homeworkId) {
    return this.db.getHomeworkSubmissions(homeworkId);
  }

  submitStudentHomework(context, homeworkId, studentId, data) {
    return this.db.submitHomework(homeworkId, studentId, data);
  }

  gradeStudentHomework(context, homeworkId, studentId, gradeData) {
    return this.db.gradeHomeworkSubmission(homeworkId, studentId, gradeData);
  }

  // ----------------------------------------------------
  // 6. Assessments & CCE Continuous Grading
  // ----------------------------------------------------
  getAssessments(context, filters = {}) {
    return this.db.getAssessments(context.campusId, filters);
  }

  createAssessment(context, data) {
    return this.db.createAssessment(context.campusId, data);
  }

  getResults(context, filters = {}) {
    return this.db.getResults(context.campusId, filters);
  }

  recordResult(context, resultData) {
    return this.db.recordResult(context.campusId, resultData);
  }

  /**
   * Helper to derive CBSE/ICSE standard CCE 9-point scale grade letter
   */
  static calculateCceGrade(marksObtained, maxMarks) {
    if (!maxMarks || maxMarks <= 0) return 'D';
    const pct = (marksObtained / maxMarks) * 100;
    if (pct >= 91) return 'A1';
    if (pct >= 81) return 'A2';
    if (pct >= 71) return 'B1';
    if (pct >= 61) return 'B2';
    if (pct >= 51) return 'C1';
    if (pct >= 41) return 'C2';
    if (pct >= 33) return 'D';
    return 'E';
  }

  // ----------------------------------------------------
  // 7. Report Cards & Continuous Summative Aggregation
  // ----------------------------------------------------
  getReportCards(context, filters = {}) {
    return this.db.getReportCards(context.campusId, filters);
  }

  generateReportCard(context, params) {
    return this.db.generateReportCard(context.campusId, params);
  }

  publishReportCard(context, id) {
    return this.db.publishReportCard(context.campusId, id);
  }

  // ----------------------------------------------------
  // 8. Persona-Specific Aggregated Workspaces
  // ----------------------------------------------------
  getTeacherMyDay(context, employeeId, dayOfWeek = 'MON') {
    return this.db.getTeacherDailySchedule(context.campusId, employeeId, dayOfWeek);
  }

  getStudentAcademicView(context, studentId) {
    return this.db.getStudentAcademicProfile(context.campusId, studentId);
  }
}

export const defaultAcademicsService = new AcademicsService();
