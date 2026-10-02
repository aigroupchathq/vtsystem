// VEDIC TREE OS — Student Information System (SIS) Service
import { db } from '../../database/db.js';
import { RbacService } from '../platform/rbac.service.js';
import { TenantContext } from '../platform/tenant.context.js';
import { Logger } from '../platform/logger.service.js';

export class StudentsService {
  /**
   * List students for the active tenant context
   */
  static list(context, filters = {}) {
    RbacService.enforce(context.userRole, 'students:read');
    Logger.info('StudentsService', `Listing students for campus: ${context.campusId || 'GLOBAL'}`, { filters });
    return db.getStudents(context, filters);
  }

  /**
   * Get single student by ID with strict tenant boundary check
   */
  static getById(context, studentId) {
    RbacService.enforce(context.userRole, 'students:read');
    const student = db.getStudentById(context, studentId);
    if (!student) {
      const err = new Error(`NOT_FOUND: Student with ID ${studentId} does not exist.`);
      err.code = 'STUDENT_NOT_FOUND';
      err.status = 404;
      throw err;
    }
    return student;
  }

  /**
   * Admit / Create student
   */
  static admitStudent(context, payload) {
    RbacService.enforce(context.userRole, 'students:create');
    TenantContext.validateCampusBoundary(context, payload.campusId);

    // Validation
    if (!payload.firstName?.trim() || !payload.lastName?.trim()) {
      throw new Error('VALIDATION_ERROR: First and Last names are mandatory.');
    }
    if (!payload.admissionNumber?.trim()) {
      throw new Error('VALIDATION_ERROR: Admission Number is required.');
    }
    if (!payload.emergencyPhone?.trim()) {
      throw new Error('VALIDATION_ERROR: Emergency Contact Phone is required.');
    }
    if (!payload.gradeId) {
      throw new Error('VALIDATION_ERROR: Grade assignment is required for enrollment.');
    }
    if (!payload.divisionId) {
      throw new Error('VALIDATION_ERROR: Division / Section assignment is required.');
    }

    Logger.info('StudentsService', `Admitting student ${payload.admissionNumber} (${payload.firstName} ${payload.lastName})`);
    return db.createStudent(context, payload);
  }

  /**
   * Upload / Attach Document to Student
   */
  static attachDocument(context, studentId, documentData) {
    RbacService.enforce(context.userRole, 'students:update');
    const student = this.getById(context, studentId);

    const docId = `sdoc-${Date.now()}`;
    const newDoc = {
      id: docId,
      documentType: documentData.documentType || 'OTHER',
      fileName: documentData.fileName,
      fileSize: documentData.fileSize || 102400,
      verifiedAt: new Date().toISOString().split('T')[0]
    };

    if (!student.documents) student.documents = [];
    student.documents.push(newDoc);

    db.recordAudit({
      organizationId: context.organizationId,
      campusId: student.campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'ATTACH_DOCUMENT',
      entityName: 'StudentDocument',
      entityId: docId,
      diffBefore: null,
      diffAfter: { studentId, fileName: newDoc.fileName, documentType: newDoc.documentType }
    });

    return newDoc;
  }
}
