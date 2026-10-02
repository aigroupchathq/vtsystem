// VEDIC TREE OS — Staff & Human Resources (HRMS) Service
import { db } from '../../database/db.js';
import { RbacService } from '../platform/rbac.service.js';
import { TenantContext } from '../platform/tenant.context.js';
import { Logger } from '../platform/logger.service.js';

export class EmployeesService {
  /**
   * List employees for the active tenant context
   */
  static list(context, filters = {}) {
    RbacService.enforce(context.userRole, 'employees:read');
    Logger.info('EmployeesService', `Listing employees for campus: ${context.campusId || 'GLOBAL'}`, { filters });
    return db.getEmployees(context, filters);
  }

  /**
   * Get single employee by ID
   */
  static getById(context, employeeId) {
    RbacService.enforce(context.userRole, 'employees:read');
    const emp = db.getEmployeeById(context, employeeId);
    if (!emp) {
      const err = new Error(`NOT_FOUND: Employee with ID ${employeeId} does not exist.`);
      err.code = 'EMPLOYEE_NOT_FOUND';
      err.status = 404;
      throw err;
    }
    return emp;
  }

  /**
   * Onboard / Create employee
   */
  static onboardEmployee(context, payload) {
    RbacService.enforce(context.userRole, 'employees:create');
    TenantContext.validateCampusBoundary(context, payload.campusId);

    // Validation
    if (!payload.firstName?.trim() || !payload.lastName?.trim()) {
      throw new Error('VALIDATION_ERROR: First and Last names are mandatory.');
    }
    if (!payload.email?.trim()) {
      throw new Error('VALIDATION_ERROR: Official email is mandatory.');
    }
    if (!payload.employeeCode?.trim()) {
      throw new Error('VALIDATION_ERROR: Employee Code is required.');
    }
    if (!payload.departmentId) {
      throw new Error('VALIDATION_ERROR: Department assignment is required.');
    }
    if (!payload.designationId) {
      throw new Error('VALIDATION_ERROR: Designation is required.');
    }

    Logger.info('EmployeesService', `Onboarding employee ${payload.employeeCode} (${payload.firstName} ${payload.lastName})`);
    return db.createEmployee(context, payload);
  }

  /**
   * Attach Document to Employee Record
   */
  static attachDocument(context, employeeId, documentData) {
    RbacService.enforce(context.userRole, 'employees:update');
    const emp = this.getById(context, employeeId);

    const docId = `edoc-${Date.now()}`;
    const newDoc = {
      id: docId,
      documentType: documentData.documentType || 'OTHER',
      fileName: documentData.fileName,
      fileSize: documentData.fileSize || 204800,
      verifiedAt: new Date().toISOString().split('T')[0]
    };

    if (!emp.documents) emp.documents = [];
    emp.documents.push(newDoc);

    db.recordAudit({
      organizationId: context.organizationId,
      campusId: emp.campusId,
      userId: context.userId,
      userRole: context.userRole,
      action: 'ATTACH_DOCUMENT',
      entityName: 'EmployeeDocument',
      entityId: docId,
      diffBefore: null,
      diffAfter: { employeeId, fileName: newDoc.fileName, documentType: newDoc.documentType }
    });

    return newDoc;
  }
}
