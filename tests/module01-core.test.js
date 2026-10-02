// VEDIC TREE OS — Module 01: Student + Employee Core Tests
import test from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../src/database/db.js';
import { StudentsService } from '../src/modules/sis/students.service.js';
import { EmployeesService } from '../src/modules/hrms/employees.service.js';

test('5. Module 01: Student + Guardian + Enrollment Core', async (t) => {
  db.reset();

  const principalContext = {
    userId: 'usr-principal-baner',
    userRole: 'PRINCIPAL',
    organizationId: 'org-vedic-tree-foundation',
    campusId: 'cmp-pune-baner'
  };

  await t.test('5.1 Admit new student with guardian and enrollment', () => {
    const student = StudentsService.admitStudent(principalContext, {
      campusId: 'cmp-pune-baner',
      admissionNumber: 'VT-2026-999',
      firstName: 'Rohan',
      lastName: 'Kulkarni',
      dob: '2015-03-25',
      gender: 'MALE',
      bloodGroup: 'B+',
      emergencyPhone: '+91 98222 11111',
      gradeId: 'grd-5',
      divisionId: 'div-pune-5a',
      medicalNotes: 'No known chronic conditions',
      guardian: {
        firstName: 'Nitin',
        lastName: 'Kulkarni',
        relation: 'FATHER',
        phone: '+91 98222 11111',
        occupation: 'Civil Engineer'
      }
    });

    assert.ok(student.id);
    assert.equal(student.admissionNumber, 'VT-2026-999');
    assert.equal(student.firstName, 'Rohan');
    assert.equal(student.gradeName, 'Grade 5');
    assert.equal(student.divisionName, 'A');
    assert.equal(student.guardiansDetailed.length, 1);
    assert.equal(student.guardiansDetailed[0].firstName, 'Nitin');

    // Confirm audit log emitted
    const audit = db.auditLogs.find(a => a.entityId === student.id && a.action === 'CREATE');
    assert.ok(audit, 'Admission creation must be recorded in audit log');
  });

  await t.test('5.2 Duplicate admission number is rejected with 409 Conflict', () => {
    assert.throws(
      () => StudentsService.admitStudent(principalContext, {
        campusId: 'cmp-pune-baner',
        admissionNumber: 'VT-2026-001', // Already belongs to Kabir Deshmukh!
        firstName: 'Duplicate',
        lastName: 'Student',
        emergencyPhone: '9999999999',
        gradeId: 'grd-5',
        divisionId: 'div-pune-5a'
      }),
      { code: 'DUPLICATE_ADMISSION_NUMBER', status: 409 }
    );
  });

  await t.test('5.3 Attach document to student', () => {
    const doc = StudentsService.attachDocument(principalContext, 'stu-kabir-deshmukh', {
      documentType: 'MEDICAL_CLEARANCE',
      fileName: 'Pediatric_Fitness_Certificate.pdf',
      fileSize: 450000
    });
    assert.ok(doc.id);
    assert.equal(doc.fileName, 'Pediatric_Fitness_Certificate.pdf');

    const updated = StudentsService.getById(principalContext, 'stu-kabir-deshmukh');
    assert.ok(updated.documents.some(d => d.fileName === 'Pediatric_Fitness_Certificate.pdf'));
  });
});

test('6. Module 01: Employee + Department + Designation Core', async (t) => {
  db.reset();

  const principalContext = {
    userId: 'usr-principal-baner',
    userRole: 'PRINCIPAL',
    organizationId: 'org-vedic-tree-foundation',
    campusId: 'cmp-pune-baner'
  };

  await t.test('6.1 Onboard new employee with department and designation', () => {
    const employee = EmployeesService.onboardEmployee(principalContext, {
      campusId: 'cmp-pune-baner',
      employeeCode: 'VT-EMP-105',
      firstName: 'Kavita',
      lastName: 'Iyer',
      email: 'kavita.iyer@vedictree.edu.in',
      phone: '+91 98200 77000',
      gender: 'FEMALE',
      departmentId: 'dept-sci',
      designationId: 'des-sr-teacher'
    });

    assert.ok(employee.id);
    assert.equal(employee.employeeCode, 'VT-EMP-105');
    assert.equal(employee.departmentName, 'Science & Robotics');
    assert.equal(employee.designationTitle, 'Senior Teacher');
    assert.ok(employee.biometricId);

    // Confirm audit log
    const audit = db.auditLogs.find(a => a.entityId === employee.id && a.action === 'CREATE');
    assert.ok(audit, 'Employee onboarding must be recorded in audit log');
  });

  await t.test('6.2 Duplicate employee code is rejected with 409 Conflict', () => {
    assert.throws(
      () => EmployeesService.onboardEmployee(principalContext, {
        campusId: 'cmp-pune-baner',
        employeeCode: 'VT-EMP-001', // Already exists (Principal Meenakshi)
        firstName: 'Duplicate',
        lastName: 'Employee',
        email: 'dup@vedictree.edu.in',
        phone: '9999999999',
        departmentId: 'dept-admin',
        designationId: 'des-principal'
      }),
      { code: 'DUPLICATE_EMPLOYEE_CODE', status: 409 }
    );
  });

  await t.test('6.3 Attach document to employee', () => {
    const doc = EmployeesService.attachDocument(principalContext, 'emp-sunita', {
      documentType: 'POLICE_VERIFICATION',
      fileName: 'Police_Clearance_2026.pdf',
      fileSize: 310000
    });
    assert.ok(doc.id);
    assert.equal(doc.fileName, 'Police_Clearance_2026.pdf');

    const updated = EmployeesService.getById(principalContext, 'emp-sunita');
    assert.ok(updated.documents.some(d => d.fileName === 'Police_Clearance_2026.pdf'));
  });
});
