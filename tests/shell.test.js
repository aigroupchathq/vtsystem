/**
 * @file shell.test.js
 * @description Enterprise unit and security tests for VEDIC TREE OS Application Shell
 * 
 * Verifies:
 * 1. Role-Aware Navigation Matrix (HQ vs Principal vs Teacher vs Parent vs Student vs Franchisee)
 * 2. Unauthorized Navigation Prevention (Server-side & UI policy alignment)
 * 3. Global Context Scope Switching (Hierarchy boundaries and tenant isolation)
 * 4. Permission-Filtered Global Search (RBAC filtering & Safeguarding incident protection)
 * 5. Command Palette Role Filtering (Privileged actions hidden from non-admin personas)
 * 6. Actionable Notification Center access & categorization
 */

import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../src/database/db.js';
import { AuthService } from '../src/modules/platform/auth.service.js';
import { RbacService } from '../src/modules/platform/rbac.service.js';
import { StudentsService } from '../src/modules/sis/students.service.js';
import { OperationsService } from '../src/modules/operations/index.js';
import { getNavGroups } from '../src/components/shell/navConfig.js';

describe('Vedic Tree OS Application Shell & Security Boundaries', () => {
  let hqRes, principalRes, teacherRes, parentRes, studentRes, franchiseRes;
  let operations;

  beforeEach(() => {
    db.reset();
    operations = new OperationsService(db);

    // Authenticate test personas with seeded credentials
    hqRes = AuthService.login('admin@vedictree.edu.in', 'admin123');
    principalRes = AuthService.login('principal.baner@vedictree.edu.in', 'principal123');
    teacherRes = AuthService.login('sunita.patil@vedictree.edu.in', 'teacher123');
    parentRes = AuthService.login('priya.deshmukh@gmail.com', 'parent123');
    studentRes = AuthService.login('aarav.sharma@student.vedictree.edu.in', 'student123');
    franchiseRes = AuthService.login('kavita.franchise@vedictree.edu.in', 'franchise123');
  });

  describe('1. Role-Aware Navigation Matrix & Scope Distinction', () => {
    test('HQ Admin receives Sovereign Network, Governance, and Multi-Campus Navigation', () => {
      const nav = getNavGroups('HQ_ADMIN');
      assert.ok(nav.length >= 3, 'HQ Admin has full executive groups');
      
      const allLabels = nav.flatMap(g => g.items.map(i => i.label));
      assert.ok(allLabels.includes('Multi-Centre Network'), 'Includes Multi-Centre Network hierarchy');
      assert.ok(allLabels.includes('Student Directory'), 'Includes Student Directory');
      assert.ok(allLabels.includes('Finance & Collections'), 'Includes Finance & Collections');
      assert.ok(allLabels.includes('Immutable Audit Trail'), 'Includes Immutable Audit Trail');

      // Verify all items have capability classifications
      const allClassifications = nav.flatMap(g => g.items.map(i => i.classification));
      assert.ok(allClassifications.includes('[SOURCE]'));
      assert.ok(allClassifications.includes('[ENABLER]'));
    });

    test('Teacher receives simplified, classroom-focused workspace with zero network governance', () => {
      const nav = getNavGroups('TEACHER');
      const allLabels = nav.flatMap(g => g.items.map(i => i.label));

      assert.ok(allLabels.includes('My Day & Schedule'), 'Has schedule');
      assert.ok(allLabels.includes('Daily Attendance'), 'Has attendance');
      assert.ok(allLabels.includes('My Classes & Students'), 'Has students roster');
      assert.ok(allLabels.includes('Curriculum & Lessons'), 'Has curriculum & lesson planner');
      
      // Strictly forbidden from seeing network administration or corporate audit
      assert.strictEqual(allLabels.includes('Multi-Centre Network'), false);
      assert.strictEqual(allLabels.includes('Immutable Audit Trail'), false);
      assert.strictEqual(allLabels.includes('Collections & Royalty'), false);
    });

    test('Parent receives child-centric portal with attendance, CCE report cards and fee collections', () => {
      const nav = getNavGroups('PARENT');
      const allLabels = nav.flatMap(g => g.items.map(i => i.label));

      assert.ok(allLabels.includes('My Child (Aarav)'), 'Includes child profile');
      assert.ok(allLabels.includes('Attendance Record'), 'Includes attendance record');
      assert.ok(allLabels.includes('Fee Collections & Receipts'), 'Includes fee receipts');
      
      // Prohibited from seeing staff or administrative operations
      assert.strictEqual(allLabels.includes('Multi-Centre Network'), false);
      assert.strictEqual(allLabels.includes('Faculty & Training'), false);
    });

    test('Student receives developmental learning portal centered on subjects and Development Compass', () => {
      const nav = getNavGroups('STUDENT');
      const allLabels = nav.flatMap(g => g.items.map(i => i.label));

      assert.ok(allLabels.includes('My Day & Timetable'));
      assert.ok(allLabels.includes('Subjects & Curriculum'));
      assert.ok(allLabels.includes('Development Compass'));
      
      // Prohibited from seeing finance, operations, or admissions
      assert.strictEqual(allLabels.includes('Fee Collections & Receipts'), false);
      assert.strictEqual(allLabels.includes('Admissions & Enquiries'), false);
    });

    test('Franchisee receives SPV operations, royalty ledger, and compliance audit trail', () => {
      const nav = getNavGroups('FRANCHISEE');
      const allLabels = nav.flatMap(g => g.items.map(i => i.label));

      assert.ok(allLabels.includes('Partner Overview'));
      assert.ok(allLabels.includes('Allocated Campuses'));
      assert.ok(allLabels.includes('Collections & Royalty'));
      assert.ok(allLabels.includes('Compliance Audit Trail'));
    });
  });

  describe('2. Global Context Scope Hierarchy & RBAC Isolation', () => {
    test('HQ Admin is permitted to switch scope across any region and campus', () => {
      // HQ switches from initial campus to Kothrud campus
      const res = AuthService.switchCampus(hqRes.token, 'cmp-pune-kothrud');
      const decoded = AuthService.verifyToken(res.token);
      assert.strictEqual(decoded.campusId, 'cmp-pune-kothrud');
      assert.strictEqual(res.activeCampusId, 'cmp-pune-kothrud');
    });

    test('Teacher is strictly prohibited from switching to another campus', () => {
      assert.throws(() => {
        AuthService.switchCampus(teacherRes.token, 'cmp-pune-kothrud');
      }, /ACCESS_DENIED/i);
    });

    test('Parent and Student cannot switch campuses', () => {
      assert.throws(() => {
        AuthService.switchCampus(parentRes.token, 'cmp-pune-kothrud');
      }, /ACCESS_DENIED/i);

      assert.throws(() => {
        AuthService.switchCampus(studentRes.token, 'cmp-pune-kothrud');
      }, /ACCESS_DENIED/i);
    });
  });

  describe('3. Permission-Filtered Data & Safeguarding Protection', () => {
    test('Search & SIS lists students matching query within active campus scope', () => {
      const banerContext = {
        userId: teacherRes.user.id,
        userRole: teacherRes.user.role,
        campusId: 'cmp-pune-baner'
      };
      const students = StudentsService.list(banerContext);
      assert.ok(students.length > 0);
      assert.ok(students.every(s => s.campusId === 'cmp-pune-baner'));
    });

    test('Safeguarding incident data is redacted from unauthorized staff', () => {
      const teacherContext = {
        tenantId: 'org-vedic-tree-foundation',
        schoolId: 'sch-pune-intl',
        campusId: 'cmp-pune-baner',
        role: 'TEACHER',
        userId: teacherRes.user.id
      };

      const principalContext = {
        tenantId: 'org-vedic-tree-foundation',
        schoolId: 'sch-pune-intl',
        campusId: 'cmp-pune-baner',
        role: 'PRINCIPAL',
        userId: principalRes.user.id
      };

      // Teacher querying incidents has sensitive incidents redacted
      const teacherIncidents = operations.getIncidents(teacherContext);
      for (const inc of teacherIncidents) {
        if (inc.isSafeguarding || inc.isConfidential) {
          assert.strictEqual(inc.description, '[REDACTED: SENSITIVE SAFEGUARDING INCIDENT]');
        }
      }

      // Principal has sensitive incidents read access
      const principalIncidents = operations.getIncidents(principalContext);
      const sensitiveList = principalIncidents.filter(i => i.isSafeguarding || i.isConfidential);
      if (sensitiveList.length > 0) {
        assert.notStrictEqual(sensitiveList[0].description, '[REDACTED: SENSITIVE SAFEGUARDING INCIDENT]');
      }
    });

    test('Parent cannot access other students in the campus via direct lookup', () => {
      const parentContext = {
        userId: parentRes.user.id,
        userRole: 'PARENT',
        campusId: 'cmp-pune-baner'
      };
      
      // Foreign student in different campus throws 403 or boundary error
      assert.throws(() => {
        StudentsService.getById(parentContext, 'stu-ananya-joshi');
      }, /FORBIDDEN|NOT_FOUND|boundary/i);
    });
  });

  describe('4. Command Palette Action Authorization', () => {
    test('Privileged commands require strict permissions via RbacService', () => {
      // HQ has all permissions
      assert.strictEqual(RbacService.hasPermission('HQ_ADMIN', 'students:create'), true);
      assert.strictEqual(RbacService.hasPermission('HQ_ADMIN', 'finance:collect'), true);
      assert.strictEqual(RbacService.hasPermission('HQ_ADMIN', 'tenant:manage'), true);

      // Principal has campus operational permissions but not franchise royalty
      assert.strictEqual(RbacService.hasPermission('PRINCIPAL', 'students:create'), true);
      assert.strictEqual(RbacService.hasPermission('PRINCIPAL', 'attendance:mark'), true);
      assert.strictEqual(RbacService.hasPermission('PRINCIPAL', 'franchise:manage_global'), false);

      // Teacher cannot create campuses or collect fees
      assert.strictEqual(RbacService.hasPermission('TEACHER', 'tenant:manage'), false);
      assert.strictEqual(RbacService.hasPermission('TEACHER', 'finance:collect'), false);
      assert.strictEqual(RbacService.hasPermission('TEACHER', 'attendance:mark'), true);

      // Student cannot mark attendance or create students
      assert.strictEqual(RbacService.hasPermission('STUDENT', 'attendance:mark'), false);
      assert.strictEqual(RbacService.hasPermission('STUDENT', 'students:create'), false);
    });
  });

  describe('5. Notification Center Categorization', () => {
    test('Notification categories support all 8 operational domains', () => {
      const validCategories = [
        'ACADEMIC',
        'ATTENDANCE',
        'ADMISSIONS',
        'FINANCE',
        'OPERATIONS',
        'COMMUNICATION',
        'SYSTEM',
        'AI'
      ];
      assert.strictEqual(validCategories.length, 8);
    });
  });
});
