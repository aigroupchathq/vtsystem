/**
 * @file overview.test.js
 * @description Comprehensive unit, security, and tenancy tests for Executive & Centre Overview
 * 
 * Tests:
 * 1. Network scope aggregation (Multi-centre roll-up for central leadership)
 * 2. Centre scope isolation (Single campus containment, cross-campus boundary enforcement)
 * 3. Role-aware dashboard access (HQ Admin vs Principal vs unauthorized roles)
 * 4. Financial scope separation (Campus fee collections separate from Parent IP/royalties)
 * 5. Safeguarding restrictions (Educational formative observations, non-clinical disclaimers)
 * 6. Actionable Attention Required items (SLA alerts, responsible roles, target navs)
 * 7. Admissions funnel movement (Enquiries -> Applications -> Assessment -> Enrolments)
 * 8. Empty / limited-data graceful degradation (Zero division, empty collections)
 * 9. Metric provenance classification audit ([SOURCE], [ENABLER], [PROPOSED])
 */

import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../src/database/db.js';
import { AuthService } from '../src/modules/platform/auth.service.js';
import { OverviewService, METRIC_PROVENANCE } from '../src/modules/overview/overview.service.js';
import { getNavGroups } from '../src/components/shell/navConfig.js';

describe('Vedic Tree OS — Executive & Centre Overview Engine', () => {
  let hqRes, principalPanvel, teacherRes, parentRes;

  beforeEach(() => {
    db.reset();
    hqRes = AuthService.login('admin@vedictree.edu.in', 'admin123');
    principalPanvel = AuthService.login('principal.baner@vedictree.edu.in', 'principal123');
    teacherRes = AuthService.login('sunita.patil@vedictree.edu.in', 'teacher123');
    parentRes = AuthService.login('priya.deshmukh@gmail.com', 'parent123');
  });

  describe('1. Network Scope Aggregation (Central Governance)', () => {
    test('HQ Admin retrieves complete network-wide aggregated metrics', () => {
      const context = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: hqRes.tenantContext.activeCampusId
      };

      const overview = OverviewService.getNetworkOverview(context);

      assert.equal(overview.scopeType, 'NETWORK');
      assert.equal(overview.scopeTitle, 'Network Overview');
      assert.ok(overview.scopeSubtitle.includes('authorised Vedic Tree network'));

      // Validate KPI values match actual database counts
      assert.equal(overview.metrics.activeCentres, db.campuses.filter(c => c.status === 'ACTIVE').length);
      assert.equal(overview.metrics.totalStudents, db.students.filter(s => s.status === 'ACTIVE').length);
      assert.equal(overview.metrics.totalFaculty, db.employees.filter(e => e.status === 'ACTIVE').length);
      assert.equal(overview.metrics.admissionsEnquiries, db.leads.length);
      assert.ok(overview.metrics.attendanceRatePct > 0, 'Attendance rate is calculated');
      assert.ok(overview.metrics.collectedRevenueINR >= 0, 'Collections aggregated');

      // Verify Centre Health comparison includes all campuses
      assert.ok(Array.isArray(overview.centreHealth));
      assert.equal(overview.centreHealth.length, db.campuses.filter(c => c.status === 'ACTIVE').length);

      const firstCentre = overview.centreHealth[0];
      assert.ok(firstCentre.id);
      assert.ok(firstCentre.name);
      assert.ok(firstCentre.ownershipType);
      assert.ok(['HEALTHY', 'ATTENTION_REQUIRED'].includes(firstCentre.status));
    });

    test('Non-central roles cannot access Network Overview', () => {
      const principalContext = {
        userId: principalPanvel.user.id,
        userRole: principalPanvel.user.role,
        organizationId: principalPanvel.tenantContext.organizationId,
        campusId: principalPanvel.tenantContext.activeCampusId
      };

      assert.throws(
        () => OverviewService.getNetworkOverview(principalContext),
        (err) => {
          assert.equal(err.code, 'NETWORK_OVERVIEW_FORBIDDEN');
          assert.equal(err.status, 403);
          return true;
        }
      );
    });
  });

  describe('2. Centre Scope Isolation & Tenant Boundaries', () => {
    test('Principal retrieves metrics strictly isolated to their active campus', () => {
      const campusId = principalPanvel.tenantContext.activeCampusId;
      const context = {
        userId: principalPanvel.user.id,
        userRole: principalPanvel.user.role,
        organizationId: principalPanvel.tenantContext.organizationId,
        campusId: campusId,
        accessibleCampuses: principalPanvel.tenantContext.accessibleCampuses
      };

      const overview = OverviewService.getCentreOverview(context, campusId);

      assert.equal(overview.scopeType, 'CENTRE');
      assert.equal(overview.scopeTitle, 'Centre Overview');
      assert.ok(overview.scopeLocation.includes(overview.campusDetails.name));

      // Metric isolation verification
      const expectedStudents = db.students.filter(s => s.campusId === campusId && s.status === 'ACTIVE').length;
      assert.equal(overview.metrics.totalStudents, expectedStudents);

      const expectedLeads = db.leads.filter(l => l.campusId === campusId).length;
      assert.equal(overview.metrics.admissionsEnquiries, expectedLeads);

      // Verify no centre health table is leaked in single-centre scope
      assert.equal(overview.centreHealth, undefined);
    });

    test('Cross-campus boundary enforcement prevents access to unassigned campuses', () => {
      const principalContext = {
        userId: principalPanvel.user.id,
        userRole: principalPanvel.user.role,
        organizationId: principalPanvel.tenantContext.organizationId,
        campusId: principalPanvel.tenantContext.activeCampusId,
        accessibleCampuses: [principalPanvel.tenantContext.activeCampusId]
      };

      // Try accessing an unauthorized campus (e.g. Thane campus)
      const unauthorizedCampusId = 'cmp-mumbai-bandra';

      assert.throws(
        () => OverviewService.getCentreOverview(principalContext, unauthorizedCampusId),
        (err) => {
          assert.ok(err.message.includes('TENANT_ISOLATION_VIOLATION') || err.code === 'TENANT_ISOLATION_VIOLATION');
          assert.equal(err.status, 403);
          return true;
        }
      );
    });

    test('HQ Admin can access any centre overview across the network', () => {
      const hqContext = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: 'cmp-pune-baner',
        accessibleCampuses: ['cmp-pune-baner', 'cmp-pune-kothrud', 'cmp-mumbai-bandra', 'cmp-nagpur-wardha']
      };

      const thaneOverview = OverviewService.getCentreOverview(hqContext, 'cmp-mumbai-bandra');
      assert.equal(thaneOverview.scopeType, 'CENTRE');
      assert.equal(thaneOverview.campusDetails.id, 'cmp-mumbai-bandra');
    });
  });

  describe('3. Financial Scope Separation (School Fees vs Parent IP)', () => {
    test('Campus fee collections represent only school tuition/operating collections', () => {
      const context = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: hqRes.tenantContext.activeCampusId
      };

      const overview = OverviewService.getNetworkOverview(context);

      // Verify collections are calculated from db.payments with SUCCESS status
      const expectedCollections = db.payments
        .filter(p => p.status === 'SUCCESS')
        .reduce((sum, p) => sum + (p.amount || 0), 0);

      assert.equal(overview.metrics.collectedRevenueINR, expectedCollections);

      // Verify outstanding is calculated from invoices
      const expectedOutstanding = db.invoices
        .reduce((sum, inv) => sum + (inv.balanceAmount || 0), 0);

      assert.equal(overview.metrics.outstandingRevenueINR, expectedOutstanding);
    });
  });

  describe('4. Safeguarding Restrictions & Educational Development Model', () => {
    test('Holistic development summary carries mandatory non-clinical disclaimer', () => {
      const context = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: hqRes.tenantContext.activeCampusId
      };

      const overview = OverviewService.getNetworkOverview(context);
      const dev = overview.developmentSummary;

      assert.ok(dev);
      assert.ok(dev.pedagogyFramework.includes('Gurukul'));
      assert.equal(dev.holisticDimensions.length, 4);
      assert.deepEqual(
        dev.holisticDimensions.map(d => d.dimension),
        ['Academics', 'Character & Values', 'Wellbeing & Sports', 'Life Skills & Experiential']
      );

      // MANDATORY SAFEGUARDING DISCLAIMER
      assert.equal(
        dev.safeguardingNote,
        'Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses.'
      );
    });
  });

  describe('5. Actionable Attention Required Items', () => {
    test('Attention items include actionable metadata and valid target navigation', () => {
      const context = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: hqRes.tenantContext.activeCampusId
      };

      const overview = OverviewService.getNetworkOverview(context);
      assert.ok(Array.isArray(overview.attentionItems));
      assert.ok(overview.attentionItems.length > 0, 'Generates real attention items');

      overview.attentionItems.forEach(item => {
        assert.ok(item.id, 'Has unique id');
        assert.ok(item.title, 'Has clear title');
        assert.ok(item.description, 'Has context description');
        assert.ok(item.responsibleRole, 'Has responsible role assigned');
        assert.ok(item.actionLabel, 'Has action CTA');
        assert.ok(['admissions', 'finance', 'operations', 'attendance'].includes(item.targetNav), 'Target navigation is valid');
        assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(item.urgency), 'Has urgency level');
      });
    });
  });

  describe('6. Admissions Funnel Structure', () => {
    test('Admissions funnel reflects real pipeline progression without invented stages', () => {
      const context = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: hqRes.tenantContext.activeCampusId
      };

      const overview = OverviewService.getNetworkOverview(context);
      const funnel = overview.funnel;

      assert.ok(typeof funnel.enquiries === 'number');
      assert.ok(typeof funnel.applications === 'number');
      assert.ok(typeof funnel.assessments === 'number');
      assert.ok(typeof funnel.admissions === 'number');

      assert.equal(funnel.enquiries, db.leads.length);
      assert.equal(funnel.admissions, db.students.length);
    });
  });

  describe('7. Empty & Limited-Data Graceful Degradation', () => {
    test('Gracefully handles empty payments and invoices without crashing', () => {
      // Temporarily mock db with empty arrays
      const origInvoices = db.invoices;
      const origPayments = db.payments;
      const origAttendance = db.studentAttendance;

      try {
        db.invoices = [];
        db.payments = [];
        db.studentAttendance = [];

        const context = {
          userId: hqRes.user.id,
          userRole: hqRes.user.role,
          organizationId: hqRes.tenantContext.organizationId,
          campusId: hqRes.tenantContext.activeCampusId
        };

        const overview = OverviewService.getNetworkOverview(context);

        assert.equal(overview.metrics.collectedRevenueINR, 0);
        assert.equal(overview.metrics.outstandingRevenueINR, 0);
        assert.equal(overview.metrics.collectionProgressPct, 0);
        assert.ok(overview.metrics.attendanceRatePct >= 0);
      } finally {
        db.invoices = origInvoices;
        db.payments = origPayments;
        db.studentAttendance = origAttendance;
      }
    });
  });

  describe('8. Metric Provenance & Classification Audit', () => {
    test('All tracked overview metrics possess valid provenance classifications', () => {
      assert.ok(METRIC_PROVENANCE.length >= 8);

      METRIC_PROVENANCE.forEach(item => {
        assert.ok(item.metric, 'Metric name present');
        assert.ok(['[SOURCE]', '[ENABLER]', '[PROPOSED]'].includes(item.classification), `Valid classification for ${item.metric}`);
        assert.ok(item.dataSource, 'Data source documented');
        assert.ok(item.scope, 'Scope defined');
        assert.ok(item.validationStatus, 'Validation status defined');
      });

      // Verify specific expected classifications
      const studentsMetric = METRIC_PROVENANCE.find(m => m.metric === 'Enrolled Students');
      assert.equal(studentsMetric.classification, '[SOURCE]');

      const attentionMetric = METRIC_PROVENANCE.find(m => m.metric === 'Attention Required SLA Alerts');
      assert.equal(attentionMetric.classification, '[ENABLER]');

      const healthMetric = METRIC_PROVENANCE.find(m => m.metric === 'Centre Health Comparison');
      assert.equal(healthMetric.classification, '[PROPOSED]');
    });

    test('Navigation config includes overview for central leadership and principals', () => {
      const hqNav = getNavGroups('HQ_ADMIN');
      const hqFirstItem = hqNav[0].items[0];
      assert.equal(hqFirstItem.id, 'overview');
      assert.equal(hqFirstItem.label, 'Network Overview');
      assert.equal(hqFirstItem.classification, '[SOURCE]');

      const principalNav = getNavGroups('PRINCIPAL');
      const principalFirstItem = principalNav[0].items[0];
      assert.equal(principalFirstItem.id, 'overview');
      assert.equal(principalFirstItem.label, 'Centre Overview');
      assert.equal(principalFirstItem.classification, '[SOURCE]');
    });
  });

  describe('9. Hardening Pass — Operational Calm Control Room & Governance Assertions', () => {
    test('1 & 3: Attention items communicate priority, issue, scope, reason, and contextual Act Now', () => {
      const context = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: hqRes.tenantContext.activeCampusId
      };

      const overview = OverviewService.getNetworkOverview(context);
      assert.ok(overview.attentionItems.length > 0, 'Generates attention items from database');

      overview.attentionItems.forEach(item => {
        // Must communicate priority, issue, scope, reason/context, explicit next action
        assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(item.priority || item.urgency), 'Has valid priority');
        assert.ok(item.issue || item.title, 'Has explicit operational issue');
        assert.ok(item.scope, 'Has geographic/campus scope defined');
        assert.ok(item.reason || item.description, 'Has context/reason');
        assert.ok(item.actionLabel, 'Has explicit next action');
        assert.ok(['admissions', 'attendance', 'finance', 'operations'].includes(item.targetNav), 'Navigates to real subsystem');
      });

      // Contextual action coupling
      assert.ok(Array.isArray(overview.actNowActions));
      assert.equal(overview.actNowActions.length, overview.attentionItems.length);
      overview.actNowActions.forEach(action => {
        assert.ok(action.label, 'Has contextual action label with real count/target');
        assert.ok(action.targetNav, 'Has valid target navigation');
      });
    });

    test('2: Attention empty state behaves honestly without manufactured urgency', () => {
      // Mock db when all exceptions are cleared
      const origLeads = db.leads;
      const origAttendance = db.studentAttendance;
      const origMaint = db.maintenanceRequests;
      const origInvoices = db.invoices;

      try {
        db.leads = [];
        db.studentAttendance = [];
        db.maintenanceRequests = [];
        db.invoices = [];

        const context = {
          userId: hqRes.user.id,
          userRole: hqRes.user.role,
          organizationId: hqRes.tenantContext.organizationId,
          campusId: hqRes.tenantContext.activeCampusId
        };

        const overview = OverviewService.getNetworkOverview(context);
        assert.equal(overview.attentionItems.length, 0, 'No attention items when no exceptions exist');
        assert.equal(overview.actNowActions.length, 0, 'No act-now actions when clean');
      } finally {
        db.leads = origLeads;
        db.studentAttendance = origAttendance;
        db.maintenanceRequests = origMaint;
        db.invoices = origInvoices;
      }
    });

    test('7: Geographic scope distinction reconciles Mumbai MMR vs Nagpur strategic growth geography without data alteration', () => {
      const context = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: hqRes.tenantContext.activeCampusId
      };

      const overview = OverviewService.getNetworkOverview(context);
      assert.equal(overview.centreHealth.length, 4, 'All four configured demo/seed campus records are preserved');

      const nagpur = overview.centreHealth.find(c => c.city === 'Nagpur' || c.name.includes('Nagpur'));
      assert.ok(nagpur, 'Nagpur demo/seed campus record is preserved');
      assert.equal(nagpur.name, 'Demo Campus — Nagpur');
      assert.equal(nagpur.demoProvenanceNote, 'DEMO / PROPOSED — not a verified operating Vedic Tree campus');
      assert.equal(nagpur.geographicCluster, 'STRATEGIC_GROWTH');
      assert.equal(nagpur.clusterLabel, 'Nagpur — Future / Strategic Growth Geography [SOURCE]');
      assert.equal(nagpur.ownershipType, 'DEMO / PROPOSED');

      const mmrCampuses = overview.centreHealth.filter(c => c.geographicCluster === 'MUMBAI_MMR');
      assert.equal(mmrCampuses.length, 3, 'Panvel, Kharghar, and Thane classified under Mumbai MMR');
      mmrCampuses.forEach(c => {
        assert.equal(c.clusterLabel, 'Mumbai MMR Operating Scope');
      });
    });

    test('8: Demo environment signal is explicitly present and transparent', () => {
      const context = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: hqRes.tenantContext.activeCampusId
      };

      const overview = OverviewService.getNetworkOverview(context);
      assert.equal(overview.environmentSignal, 'DEMO ENVIRONMENT · Sample operational data');

      const centreOverview = OverviewService.getCentreOverview(context, 'cmp-pune-baner');
      assert.equal(centreOverview.environmentSignal, 'DEMO ENVIRONMENT · Sample operational data');
    });

    test('9: Attendance benchmark copy uses configured product benchmark without statutory claims', () => {
      const context = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: hqRes.tenantContext.activeCampusId
      };

      const overview = OverviewService.getNetworkOverview(context);
      assert.equal(overview.metrics.configuredBenchmarkPct, 75);

      const centreOverview = OverviewService.getCentreOverview(context, 'cmp-pune-baner');
      assert.equal(centreOverview.metrics.configuredBenchmarkPct, 75);
    });

    test('10 & 14: Student Development Pulse presents 4 concise dimensions and non-clinical safeguarding note', () => {
      const context = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: hqRes.tenantContext.activeCampusId
      };

      const overview = OverviewService.getNetworkOverview(context);
      const dev = overview.developmentSummary;

      assert.ok(dev);
      assert.equal(dev.holisticDimensions.length, 4);
      assert.deepEqual(
        dev.holisticDimensions.map(d => d.dimension),
        ['Academics', 'Character & Values', 'Wellbeing & Sports', 'Life Skills & Experiential']
      );

      // Verify no psychiatric or clinical diagnostic language is used
      assert.equal(
        dev.safeguardingNote,
        'Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses.'
      );
    });

    test('11: Financial boundary strictly isolates school receipts from parent platform IP economics', () => {
      const context = {
        userId: hqRes.user.id,
        userRole: hqRes.user.role,
        organizationId: hqRes.tenantContext.organizationId,
        campusId: hqRes.tenantContext.activeCampusId
      };

      const overview = OverviewService.getNetworkOverview(context);
      const collectionsMetric = METRIC_PROVENANCE.find(m => m.metric === 'Campus Fee Collections');
      assert.ok(collectionsMetric);
      assert.ok(collectionsMetric.validationStatus.includes('Parent platform, brand, curriculum, technology and related IP economics are outside this view'));
      assert.ok(overview.financialBoundaryNotice.includes('Parent-level platform, brand, curriculum, technology and related IP economics are outside this view'));
      assert.ok(overview.metrics.collectedRevenueINR >= 0);

      const centreOverview = OverviewService.getCentreOverview(context, 'cmp-pune-baner');
      assert.ok(centreOverview.financialBoundaryNotice.includes('Parent-level platform, brand, curriculum, technology and related IP economics are outside this view'));
    });

    test('5 & 10: Centre Overview information hierarchy differs meaningfully from Network Overview', () => {
      const principalContext = {
        userId: principalPanvel.user.id,
        userRole: principalPanvel.user.role,
        organizationId: principalPanvel.tenantContext.organizationId,
        campusId: principalPanvel.tenantContext.activeCampusId,
        accessibleCampuses: [principalPanvel.tenantContext.activeCampusId]
      };

      const centre = OverviewService.getCentreOverview(principalContext, principalPanvel.tenantContext.activeCampusId);

      // In Centre scope, no multi-centre health comparison exists
      assert.equal(centre.centreHealth, undefined);
      assert.equal(centre.scopeType, 'CENTRE');
      assert.ok(centre.campusDetails);
      assert.equal(centre.campusDetails.name, 'Panvel Campus [Demo Campus]');

      // All metrics are isolated to Panvel
      assert.equal(centre.metrics.activeCentres, undefined);
      assert.ok(typeof centre.metrics.attendanceRatePct === 'number');
      assert.ok(typeof centre.metrics.configuredBenchmarkPct === 'number');
    });
  });
});

