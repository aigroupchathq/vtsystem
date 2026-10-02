// VEDIC TREE OS — End-to-End (E2E) Workflow Tests
import test from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../src/database/db.js';
import { AuthService } from '../src/modules/platform/auth.service.js';
import { StudentsService } from '../src/modules/sis/students.service.js';
import { EmployeesService } from '../src/modules/hrms/employees.service.js';

test('E2E Full Workflow: Module 01 Student + Employee Core', async (t) => {
  db.reset();

  let principalSession = null;
  let admittedStudent = null;
  let onboardedEmployee = null;

  // 1. Authentication Phase
  await t.test('Step 1: Principal logs in and receives tenant-scoped session', () => {
    principalSession = AuthService.login('principal.baner@vedictree.edu.in', 'principal123');
    assert.ok(principalSession.token);
    assert.equal(principalSession.user.role, 'PRINCIPAL');
    assert.equal(principalSession.tenantContext.activeCampusId, 'cmp-pune-baner');
  });

  const principalContext = {
    userId: principalSession.user.id,
    userRole: principalSession.user.role,
    organizationId: principalSession.tenantContext.organizationId,
    campusId: principalSession.tenantContext.activeCampusId
  };

  // 2. Student Lifecycle Phase
  await t.test('Step 2: Admit student with Guardian and Enrollment', () => {
    admittedStudent = StudentsService.admitStudent(principalContext, {
      campusId: 'cmp-pune-baner',
      admissionNumber: 'VT-2026-888',
      firstName: 'Aarav',
      lastName: 'Sharma',
      dob: '2016-04-12',
      gender: 'MALE',
      bloodGroup: 'O+',
      emergencyPhone: '+91 98980 12345',
      gradeId: 'grd-5',
      divisionId: 'div-pune-5a',
      medicalNotes: 'Asthma inhaler in bag',
      guardian: {
        firstName: 'Vikram',
        lastName: 'Sharma',
        relation: 'FATHER',
        phone: '+91 98980 12345',
        email: 'vikram.sharma@example.com',
        occupation: 'Software Architect'
      }
    });

    assert.ok(admittedStudent.id);
    assert.equal(admittedStudent.admissionNumber, 'VT-2026-888');
    assert.equal(admittedStudent.firstName, 'Aarav');
    assert.equal(admittedStudent.gradeName, 'Grade 5');
    assert.equal(admittedStudent.guardiansDetailed.length, 1);
    assert.equal(admittedStudent.guardiansDetailed[0].firstName, 'Vikram');
  });

  await t.test('Step 3: Attach student document to vault', () => {
    const doc = StudentsService.attachDocument(principalContext, admittedStudent.id, {
      documentType: 'BIRTH_CERTIFICATE',
      fileName: 'Aarav_Sharma_BirthCert.pdf',
      fileSize: 520000
    });

    assert.ok(doc.id);
    assert.equal(doc.fileName, 'Aarav_Sharma_BirthCert.pdf');

    const profile = StudentsService.getById(principalContext, admittedStudent.id);
    assert.ok(profile.documents.some(d => d.fileName === 'Aarav_Sharma_BirthCert.pdf'));
  });

  await t.test('Step 4: Student duplicate admission validation rejects conflicts', () => {
    assert.throws(
      () => StudentsService.admitStudent(principalContext, {
        campusId: 'cmp-pune-baner',
        admissionNumber: 'VT-2026-888', // Duplicate!
        firstName: 'Conflict',
        lastName: 'Test',
        emergencyPhone: '9999999999',
        gradeId: 'grd-5',
        divisionId: 'div-pune-5a'
      }),
      { code: 'DUPLICATE_ADMISSION_NUMBER', status: 409 }
    );
  });

  // 3. Employee Lifecycle Phase
  await t.test('Step 5: Onboard employee with Department, Designation, and Biometric mapping', () => {
    onboardedEmployee = EmployeesService.onboardEmployee(principalContext, {
      campusId: 'cmp-pune-baner',
      employeeCode: 'VT-EMP-201',
      firstName: 'Rajesh',
      lastName: 'Verma',
      email: 'rajesh.verma@vedictree.edu.in',
      phone: '+91 97654 32100',
      gender: 'MALE',
      departmentId: 'dept-acad',
      designationId: 'des-pri-teacher',
      biometricId: 'BIO-BANER-201'
    });

    assert.ok(onboardedEmployee.id);
    assert.equal(onboardedEmployee.employeeCode, 'VT-EMP-201');
    assert.equal(onboardedEmployee.designationTitle, 'Primary Teacher');
    assert.equal(onboardedEmployee.departmentName, 'Academics & Teaching');
    assert.equal(onboardedEmployee.biometricId, 'BIO-BANER-201');
  });

  await t.test('Step 6: Attach employee credential document to vault', () => {
    const doc = EmployeesService.attachDocument(principalContext, onboardedEmployee.id, {
      documentType: 'POLICE_VERIFICATION',
      fileName: 'Rajesh_Verma_PoliceClearance.pdf',
      fileSize: 410000
    });

    assert.ok(doc.id);
    assert.equal(doc.fileName, 'Rajesh_Verma_PoliceClearance.pdf');

    const profile = EmployeesService.getById(principalContext, onboardedEmployee.id);
    assert.ok(profile.documents.some(d => d.fileName === 'Rajesh_Verma_PoliceClearance.pdf'));
  });

  await t.test('Step 7: Employee duplicate code validation rejects conflicts', () => {
    assert.throws(
      () => EmployeesService.onboardEmployee(principalContext, {
        campusId: 'cmp-pune-baner',
        employeeCode: 'VT-EMP-201', // Duplicate!
        firstName: 'Conflict',
        lastName: 'Employee',
        email: 'conflict@example.com',
        phone: '9999999999',
        departmentId: 'dept-acad',
        designationId: 'des-pri-teacher'
      }),
      { code: 'DUPLICATE_EMPLOYEE_CODE', status: 409 }
    );
  });

  // 4. Multi-Tenant Isolation & Security Barriers
  await t.test('Step 8: Principal cannot access records belonging to another campus', () => {
    assert.throws(
      () => StudentsService.getById(principalContext, 'stu-ananya-joshi'), // Kothrud student
      { code: 'TENANT_ISOLATION_VIOLATION', status: 403 }
    );

    assert.throws(
      () => EmployeesService.getById(principalContext, 'emp-kothrud-teacher'), // Kothrud teacher
      { code: 'TENANT_ISOLATION_VIOLATION', status: 403 }
    );
  });

  // 5. Tenant Switching & Audit Log Traceability
  await t.test('Step 9: HQ Admin switches tenant and audits are completely traceable', () => {
    const hqSession = AuthService.login('admin@vedictree.edu.in', 'admin123');
    const switched = AuthService.switchCampus(hqSession.token, 'cmp-pune-kothrud');
    assert.equal(switched.activeCampusId, 'cmp-pune-kothrud');

    const auditTrail = db.getAuditLogs({ userRole: 'HQ_ADMIN' });
    assert.ok(auditTrail.length > 0);

    // Verify student admission audit log exists with diff
    const admissionAudit = db.auditLogs.find(a => a.entityId === admittedStudent.id);
    assert.ok(admissionAudit, 'Student admission must have an audit log entry');
    assert.equal(admissionAudit.action, 'CREATE');
    assert.equal(admissionAudit.entityName, 'Student');
    assert.equal(JSON.parse(admissionAudit.diffAfter).admissionNumber, 'VT-2026-888');

    // Verify employee onboarding audit log exists with diff
    const employeeAudit = db.auditLogs.find(a => a.entityId === onboardedEmployee.id);
    assert.ok(employeeAudit, 'Employee onboarding must have an audit log entry');
    assert.equal(employeeAudit.action, 'CREATE');
    assert.equal(employeeAudit.entityName, 'Employee');
    assert.equal(JSON.parse(employeeAudit.diffAfter).employeeCode, 'VT-EMP-201');
  });
});
