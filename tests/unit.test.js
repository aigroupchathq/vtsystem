// VEDIC TREE OS — Unit Tests (Validation, Authorization, Models, Contracts)
import test from 'node:test';
import assert from 'node:assert/strict';
import { RbacService } from '../src/modules/platform/rbac.service.js';
import { TenantContext } from '../src/modules/platform/tenant.context.js';
import { db } from '../src/database/db.js';

test('Unit Tests: RBAC Permissions & Role Boundaries', async (t) => {
  await t.test('HQ_ADMIN has universal access', () => {
    assert.equal(RbacService.hasPermission('HQ_ADMIN', 'students:create'), true);
    assert.equal(RbacService.hasPermission('HQ_ADMIN', 'employees:create'), true);
    assert.equal(RbacService.hasPermission('HQ_ADMIN', 'audit:read'), true);
    assert.equal(RbacService.hasPermission('HQ_ADMIN', 'tenant:switch'), true);
  });

  await t.test('PRINCIPAL has campus-scoped management permissions', () => {
    assert.equal(RbacService.hasPermission('PRINCIPAL', 'students:create'), true);
    assert.equal(RbacService.hasPermission('PRINCIPAL', 'students:read'), true);
    assert.equal(RbacService.hasPermission('PRINCIPAL', 'employees:create'), true);
    assert.equal(RbacService.hasPermission('PRINCIPAL', 'audit:read'), true);
    assert.equal(RbacService.hasPermission('PRINCIPAL', 'tenant:manage'), false);
  });

  await t.test('TEACHER has read-only access to academic rosters', () => {
    assert.equal(RbacService.hasPermission('TEACHER', 'students:read'), true);
    assert.equal(RbacService.hasPermission('TEACHER', 'students:create'), false);
    assert.equal(RbacService.hasPermission('TEACHER', 'employees:read'), true);
    assert.equal(RbacService.hasPermission('TEACHER', 'employees:create'), false);
    assert.equal(RbacService.hasPermission('TEACHER', 'audit:read'), false);
  });

  await t.test('PARENT and STUDENT have strictly isolated personal permissions', () => {
    assert.equal(RbacService.hasPermission('PARENT', 'students:create'), false);
    assert.equal(RbacService.hasPermission('PARENT', 'employees:read'), false);
    assert.equal(RbacService.hasPermission('STUDENT', 'students:create'), false);
  });
});

test('Unit Tests: Tenant Context & Boundary Assertions', async (t) => {
  await t.test('validateCampusBoundary grants access when campus matches', () => {
    const context = {
      userId: 'usr-1',
      userRole: 'PRINCIPAL',
      organizationId: 'org-vedic-tree-foundation',
      campusId: 'cmp-pune-baner'
    };
    assert.doesNotThrow(() => TenantContext.validateCampusBoundary(context, 'cmp-pune-baner'));
  });

  await t.test('validateCampusBoundary throws 403 on cross-campus access attempt', () => {
    const context = {
      userId: 'usr-1',
      userRole: 'PRINCIPAL',
      organizationId: 'org-vedic-tree-foundation',
      campusId: 'cmp-pune-baner'
    };
    assert.throws(
      () => TenantContext.validateCampusBoundary(context, 'cmp-pune-kothrud'),
      { code: 'TENANT_ISOLATION_VIOLATION', status: 403 }
    );
  });

  await t.test('HQ_ADMIN bypasses single campus restriction', () => {
    const context = {
      userId: 'usr-hq',
      userRole: 'HQ_ADMIN',
      organizationId: 'org-vedic-tree-foundation',
      campusId: null
    };
    assert.doesNotThrow(() => TenantContext.validateCampusBoundary(context, 'cmp-pune-kothrud'));
    assert.doesNotThrow(() => TenantContext.validateCampusBoundary(context, 'cmp-mumbai-bandra'));
  });
});

test('Unit Tests: Data Model & Seed Integrity', async (t) => {
  db.reset();

  await t.test('Database contains core seed records', () => {
    assert.ok(db.getCampuses().length >= 3, 'Must have at least 3 campuses');
    assert.ok(db.getDepartments().length >= 4, 'Must have departments seeded');
    assert.ok(db.getDesignations().length >= 5, 'Must have designations seeded');
    assert.ok(db.getGrades().length >= 5, 'Must have grades seeded');
    assert.ok(db.getDivisions('cmp-pune-baner').length >= 2, 'Must have divisions for Baner');
  });

  await t.test('Audit log stores immutable records with before and after snapshots', () => {
    const initialLogCount = db.auditLogs.length;
    db.recordAudit({
      userId: 'usr-test',
      userRole: 'PRINCIPAL',
      action: 'TEST_ACTION',
      entityName: 'TestEntity',
      entityId: 'ent-1',
      campusId: 'cmp-pune-baner',
      diffBefore: { status: 'DRAFT' },
      diffAfter: { status: 'ACTIVE' }
    });

    assert.equal(db.auditLogs.length, initialLogCount + 1);
    const latest = db.auditLogs[0]; // unshifted to top of array
    assert.equal(latest.action, 'TEST_ACTION');
    assert.equal(JSON.parse(latest.diffBefore).status, 'DRAFT');
    assert.equal(JSON.parse(latest.diffAfter).status, 'ACTIVE');
  });
});
