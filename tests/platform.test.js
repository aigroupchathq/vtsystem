// VEDIC TREE OS — Platform Foundation Tests
import test from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../src/database/db.js';
import { AuthService } from '../src/modules/platform/auth.service.js';
import { RbacService } from '../src/modules/platform/rbac.service.js';
import { TenantContext } from '../src/modules/platform/tenant.context.js';
import { StudentsService } from '../src/modules/sis/students.service.js';
import { EmployeesService } from '../src/modules/hrms/employees.service.js';

test('1. Authentication Service', async (t) => {
  db.reset();

  await t.test('1.1 Login succeeds with valid credentials', () => {
    const res = AuthService.login('admin@vedictree.edu.in', 'admin123');
    assert.ok(res.token, 'Session token should be generated');
    assert.equal(res.user.email, 'admin@vedictree.edu.in');
    assert.equal(res.user.role, 'HQ_ADMIN');
    assert.ok(res.tenantContext.accessibleCampuses.length >= 3, 'HQ Admin can access multiple campuses');
  });

  await t.test('1.2 Login fails with invalid password', () => {
    assert.throws(
      () => AuthService.login('admin@vedictree.edu.in', 'wrongpassword'),
      { code: 'AUTH_FAILED', status: 401 }
    );
  });

  await t.test('1.3 Token verification decodes correct user context', () => {
    const { token } = AuthService.login('principal.baner@vedictree.edu.in', 'principal123');
    const decoded = AuthService.verifyToken(token);
    assert.equal(decoded.userRole, 'PRINCIPAL');
    assert.equal(decoded.campusId, 'cmp-pune-baner');
  });
});

test('2. Multi-Tenant Isolation & Security', async (t) => {
  db.reset();

  // Baner Principal session
  const banerContext = {
    userId: 'usr-principal-baner',
    userRole: 'PRINCIPAL',
    organizationId: 'org-vedic-tree-foundation',
    campusId: 'cmp-pune-baner'
  };

  // Kothrud student exists in seed data: 'stu-ananya-joshi' (campusId: 'cmp-pune-kothrud')
  await t.test('2.1 Campus query list only returns students from active campus', () => {
    const students = StudentsService.list(banerContext);
    assert.ok(students.length > 0);
    for (const student of students) {
      assert.equal(student.campusId, 'cmp-pune-baner', 'All students must belong to active Baner campus');
    }
    const hasKothrudStudent = students.some(s => s.id === 'stu-ananya-joshi');
    assert.equal(hasKothrudStudent, false, 'Kothrud student must NOT appear in Baner list');
  });

  await t.test('2.2 Direct ID lookup of foreign campus student throws 403 Forbidden', () => {
    assert.throws(
      () => StudentsService.getById(banerContext, 'stu-ananya-joshi'),
      { code: 'TENANT_ISOLATION_VIOLATION', status: 403 }
    );
  });

  await t.test('2.3 Cross-campus employee lookup throws 403 Forbidden', () => {
    // Anand Kulkarni belongs to Kothrud: 'emp-kothrud-teacher'
    assert.throws(
      () => EmployeesService.getById(banerContext, 'emp-kothrud-teacher'),
      { code: 'TENANT_ISOLATION_VIOLATION', status: 403 }
    );
  });

  await t.test('2.4 HQ Admin bypasses campus isolation to view global records', () => {
    const hqContext = {
      userId: 'usr-hq-admin',
      userRole: 'HQ_ADMIN',
      organizationId: 'org-vedic-tree-foundation',
      campusId: null
    };
    const student = StudentsService.getById(hqContext, 'stu-ananya-joshi');
    assert.equal(student.id, 'stu-ananya-joshi');
    assert.equal(student.campusId, 'cmp-pune-kothrud');
  });
});

test('3. RBAC & Authorization Enforcement', async (t) => {
  db.reset();

  const teacherContext = {
    userId: 'usr-teacher-patil',
    userRole: 'TEACHER',
    organizationId: 'org-vedic-tree-foundation',
    campusId: 'cmp-pune-baner'
  };

  await t.test('3.1 Teacher has read access to students', () => {
    assert.equal(RbacService.hasPermission('TEACHER', 'students:read'), true);
    const students = StudentsService.list(teacherContext);
    assert.ok(students.length > 0);
  });

  await t.test('3.2 Teacher cannot admit student (throws 403 Permission Denied)', () => {
    assert.equal(RbacService.hasPermission('TEACHER', 'students:create'), false);
    assert.throws(
      () => StudentsService.admitStudent(teacherContext, {
        firstName: 'Unauthorized',
        lastName: 'Attempt',
        admissionNumber: 'VT-FAIL-01',
        emergencyPhone: '9999999999',
        gradeId: 'grd-5',
        divisionId: 'div-pune-5a'
      }),
      { code: 'PERMISSION_DENIED', status: 403 }
    );
  });

  await t.test('3.3 Teacher cannot onboard employees', () => {
    assert.throws(
      () => EmployeesService.onboardEmployee(teacherContext, {
        firstName: 'Fake',
        lastName: 'Staff',
        employeeCode: 'EMP-FAKE',
        email: 'fake@school.com',
        phone: '9999999999',
        departmentId: 'dept-acad',
        designationId: 'des-pri-teacher'
      }),
      { code: 'PERMISSION_DENIED', status: 403 }
    );
  });
});

test('4. Tenant Switching & Audit Logging', async (t) => {
  db.reset();

  const hqLogin = AuthService.login('admin@vedictree.edu.in', 'admin123');
  
  await t.test('4.1 HQ Admin can switch to Kothrud campus', () => {
    const switched = AuthService.switchCampus(hqLogin.token, 'cmp-pune-kothrud');
    assert.equal(switched.activeCampusId, 'cmp-pune-kothrud');

    const decoded = AuthService.verifyToken(switched.token);
    assert.equal(decoded.campusId, 'cmp-pune-kothrud');
  });

  await t.test('4.2 Non-HQ user is forbidden from switching to unauthorized campus', () => {
    const principalLogin = AuthService.login('principal.baner@vedictree.edu.in', 'principal123');
    assert.throws(
      () => AuthService.switchCampus(principalLogin.token, 'cmp-mumbai-bandra'),
      { code: 'CAMPUS_SWITCH_FORBIDDEN', status: 403 }
    );
  });

  await t.test('4.3 Audit logs capture events with immutable diffs', () => {
    const logs = db.getAuditLogs({ userRole: 'HQ_ADMIN' });
    assert.ok(logs.length >= 3, 'Audit logs must contain historical records');
    const switchAudit = logs.find(l => l.action === 'SWITCH_TENANT');
    assert.ok(switchAudit, 'Tenant switch must be recorded in audit log');
    assert.equal(switchAudit.entityName, 'Campus');
  });
});
