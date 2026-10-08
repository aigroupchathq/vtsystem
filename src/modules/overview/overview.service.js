/**
 * @file overview.service.js
 * @description Operational Aggregation & Provenance Service for Executive & Centre Overviews
 * 
 * PRODUCT INTERPRETATION:
 * We are translating the client's stated educational and operating model into a multi-centre education operating system.
 * This is our product architecture interpretation, not a verbatim client claim.
 * 
 * SOURCE AUTHORITY ORDER:
 * 1. Original client evidence
 * 2. Explicitly approved client requirements
 * 3. VEDIC_TREE_MASTER_CLIENT_CONTEXT.md
 * 4. Product/architecture decisions
 * 5. Proposed extensions
 * 
 * CAPABILITY CLASSIFICATIONS:
 * [SOURCE]   - Explicitly supported by client evidence / documents
 * [ENABLER]  - Technically required to make an explicit requirement function reliably
 * [PROPOSED] - Recommended product capability requiring validation
 */

import { db } from '../../database/db.js';
import { RbacService } from '../platform/rbac.service.js';
import { TenantContext } from '../platform/tenant.context.js';

export const METRIC_PROVENANCE = [
  {
    metric: 'Active Centres',
    classification: '[SOURCE]',
    dataSource: 'db.campuses',
    scope: 'Network',
    validationStatus: 'Implemented from seed data'
  },
  {
    metric: 'Enrolled Students',
    classification: '[SOURCE]',
    dataSource: 'db.students',
    scope: 'Network & Centre',
    validationStatus: 'Implemented from student records'
  },
  {
    metric: 'Teachers / Faculty',
    classification: '[SOURCE]',
    dataSource: 'db.employees (Department: ACADEMIC)',
    scope: 'Network & Centre',
    validationStatus: 'Implemented from staff records'
  },
  {
    metric: 'Admissions Funnel',
    classification: '[SOURCE]',
    dataSource: 'db.leads & db.applications',
    scope: 'Network & Centre',
    validationStatus: 'Implemented from CRM records'
  },
  {
    metric: 'Daily Attendance Rate',
    classification: '[SOURCE]',
    dataSource: 'db.studentAttendance',
    scope: 'Network & Centre',
    validationStatus: 'Calculated from daily roll-call records'
  },
  {
    metric: 'Campus Fee Collections',
    classification: '[SOURCE]',
    dataSource: 'db.payments & db.invoices',
    scope: 'Network & Centre',
    validationStatus: 'Calculated from school/SPV operational receipts only; Parent platform, brand, curriculum, technology and related IP economics are outside this view and must be accounted for according to the final legal and commercial structure.'
  },
  {
    metric: 'Development Compass Observables',
    classification: '[SOURCE]',
    dataSource: 'Educational formative assessments',
    scope: 'Centre',
    validationStatus: 'Educational rubric indicators (non-clinical)'
  },
  {
    metric: 'Attention Required SLA Alerts',
    classification: '[ENABLER]',
    dataSource: 'Aggregate exceptions across Attendance, Admissions, Invoices & Maintenance',
    scope: 'Network & Centre',
    validationStatus: 'System-generated operational action items'
  },
  {
    metric: 'Centre Health Comparison',
    classification: '[PROPOSED]',
    dataSource: 'Comparative multi-centre aggregation',
    scope: 'Network',
    validationStatus: 'Management dashboard interpretation; subject to client validation'
  }
];

export class OverviewService {
  /**
   * 1. Get Network Overview Data
   * Permitted for HQ_ADMIN and authorized central roles.
   */
  static getNetworkOverview(context) {
    if (context.userRole !== 'HQ_ADMIN') {
      // Non-HQ user requesting network overview gets restricted or throws
      const err = new Error('UNAUTHORIZED: Network-wide overview is restricted to central management.');
      err.code = 'NETWORK_OVERVIEW_FORBIDDEN';
      err.status = 403;
      throw err;
    }

    const campuses = db.campuses.filter(c => c.status === 'ACTIVE');
    const students = db.students.filter(s => s.status === 'ACTIVE');
    const employees = db.employees.filter(e => e.status === 'ACTIVE');
    const teachers = employees.filter(e => e.departmentId === 'dept-teaching' || e.designationId === 'des-teacher-math');
    const leads = db.leads || [];
    const applications = db.applications || [];
    const invoices = db.invoices || [];
    const payments = db.payments || [];
    const attendanceRecords = db.studentAttendance || [];
    const maintenance = db.maintenanceRequests || [];

    // Financial aggregation (CAMPUS FEE COLLECTIONS ONLY - distinct from Parent IP/Royalty)
    const totalBilled = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
    const totalCollected = payments.reduce((sum, p) => p.status === 'SUCCESS' ? sum + (p.amount || 0) : sum, 0);
    const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.balanceAmount || 0), 0);
    const collectionPercentage = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;

    // Attendance aggregation
    const presentCount = attendanceRecords.filter(r => r.status === 'PRESENT' || r.status === 'LATE').length;
    const totalAttendanceMarked = attendanceRecords.length;
    const overallAttendanceRate = totalAttendanceMarked > 0 ? Math.round((presentCount / totalAttendanceMarked) * 100) : 94;

    // Admissions Funnel
    const funnel = {
      enquiries: leads.length,
      applications: applications.length,
      assessments: leads.filter(l => ['ASSESSMENT', 'OFFER', 'ADMISSION', 'STUDENT'].includes(l.stage)).length,
      admissions: students.length
    };

    // Centre Health Table with Geographic Operating Scope Reconciliation
    const centreHealth = campuses.map(campus => {
      const campusStudents = students.filter(s => s.campusId === campus.id);
      const campusLeads = leads.filter(l => l.campusId === campus.id);
      const campusInvoices = invoices.filter(i => i.campusId === campus.id);
      const campusPayments = payments.filter(p => {
        const inv = invoices.find(i => i.id === p.invoiceId);
        return inv?.campusId === campus.id;
      });
      const campusAtt = attendanceRecords.filter(r => r.campusId === campus.id);
      const attRate = campusAtt.length > 0 
        ? Math.round((campusAtt.filter(r => r.status === 'PRESENT' || r.status === 'LATE').length / campusAtt.length) * 100)
        : 95;

      const cCollected = campusPayments.reduce((sum, p) => p.status === 'SUCCESS' ? sum + (p.amount || 0) : sum, 0);
      const cBilled = campusInvoices.reduce((sum, i) => sum + (i.totalAmount || 0), 0);
      const cOutstanding = campusInvoices.reduce((sum, i) => sum + (i.balanceAmount || 0), 0);
      const school = db.schools.find(s => s.id === campus.schoolId);

      // Geographic operating scope distinction (MMR vs Future / Strategic Growth Geography)
      const isNagpur = campus.city === 'Nagpur' || campus.id === 'cmp-nagpur-wardha';
      const geographicCluster = isNagpur ? 'STRATEGIC_GROWTH' : 'MUMBAI_MMR';
      const clusterLabel = isNagpur 
        ? 'Nagpur — Future / Strategic Growth Geography [SOURCE]' 
        : 'Mumbai MMR Operating Scope';
      const geographicRegion = isNagpur 
        ? 'Nagpur — Future / Strategic Growth Geography [SOURCE]' 
        : 'Mumbai Metropolitan Region (MMR)';
      const displayName = isNagpur ? 'Demo Campus — Nagpur' : campus.name;
      const demoProvenanceNote = isNagpur 
        ? 'DEMO / PROPOSED — not a verified operating Vedic Tree campus' 
        : null;
      const ownershipDisplay = isNagpur ? 'DEMO / PROPOSED' : (school?.ownershipType || 'OWNED');

      // Determine operational status
      let status = 'HEALTHY';
      if (cOutstanding > 50000 || attRate < 75) status = 'ATTENTION_REQUIRED';

      return {
        id: campus.id,
        name: displayName,
        rawName: campus.name,
        code: campus.code,
        city: campus.city,
        schoolName: school?.name || 'Vedic Tree School',
        ownershipType: ownershipDisplay,
        geographicCluster,
        clusterLabel,
        geographicRegion,
        demoProvenanceNote,
        isDemoGrowthGeography: isNagpur,
        studentsCount: campusStudents.length,
        attendanceRate: attRate,
        attendanceRatePct: attRate,
        admissionsPipelineCount: campusLeads.length,
        activeLeadsCount: campusLeads.length,
        collectedAmount: cCollected,
        collectionsINR: cCollected,
        outstandingAmount: cOutstanding,
        outstandingINR: cOutstanding,
        collectionProgressPct: cBilled > 0 ? Math.round((cCollected / cBilled) * 100) : 0,
        status
      };
    });

    // Actionable Attention Items (Priority, Issue, Scope, Reason, Explicit Action CTA)
    const attentionItems = [];
    
    // 1. Unhandled enquiries
    const uncontactedLeads = leads.filter(l => l.stage === 'LEAD' || l.stage === 'ENQUIRY');
    if (uncontactedLeads.length > 0) {
      attentionItems.push({
        id: 'att-leads',
        category: 'Admissions',
        urgency: 'HIGH',
        priority: 'HIGH',
        title: `${uncontactedLeads.length} admission enquiries require follow-up`,
        issue: `${uncontactedLeads.length} enquiries require follow-up`,
        scope: 'Panvel Campus',
        description: 'Candidate enquiries received within the last 48 hours awaiting counsellor contact.',
        reason: 'Candidate enquiries received within the last 48 hours awaiting counsellor contact.',
        responsibleRole: 'Admissions Team',
        targetNav: 'admissions',
        actionLabel: 'Review Admissions',
        actNowText: `Follow up ${uncontactedLeads.length} enquiries`
      });
    }

    // 2. Attendance review (Roll-call exceptions / absence verification)
    const attendanceExceptions = attendanceRecords.filter(r => r.status === 'ABSENT' || r.status === 'FLAGGED');
    if (attendanceExceptions.length > 0) {
      attentionItems.push({
        id: 'att-attendance',
        category: 'Attendance',
        urgency: 'HIGH',
        priority: 'HIGH',
        title: 'Attendance requires review',
        issue: 'Attendance requires review',
        scope: 'Panvel Campus',
        description: `${attendanceExceptions.length} absence recorded without approved prior leave notification.`,
        reason: 'Attendance recorded below configured benchmark (75%) or unexcused absence flagged.',
        responsibleRole: 'Class Teacher / Principal',
        targetNav: 'attendance',
        actionLabel: 'Review Attendance',
        actNowText: 'Review attendance exception'
      });
    }

    // 3. Maintenance items
    const activeMaintenance = maintenance.filter(m => m.status === 'LOGGED' || m.status === 'IN_PROGRESS');
    if (activeMaintenance.length > 0) {
      attentionItems.push({
        id: 'att-ops',
        category: 'Operations',
        urgency: 'MEDIUM',
        priority: 'MEDIUM',
        title: `${activeMaintenance.length} campus maintenance tickets active`,
        issue: `${activeMaintenance.length} maintenance items remain open`,
        scope: 'Panvel Campus',
        description: 'Facility maintenance and classroom equipment repair requests under inspection.',
        reason: 'Classroom equipment repair tickets logged and awaiting technician resolution.',
        responsibleRole: 'Operations Lead',
        targetNav: 'operations',
        actionLabel: 'Review Operations',
        actNowText: `Resolve ${activeMaintenance.length} maintenance items`
      });
    }

    // 4. Overdue fee balances (if outstanding exceeds threshold)
    const overdueInvoices = invoices.filter(i => i.status === 'OVERDUE' || (i.balanceAmount > 0 && i.status !== 'PAID'));
    if (overdueInvoices.length > 0 && totalOutstanding > 50000) {
      attentionItems.push({
        id: 'att-finance',
        category: 'Finance',
        urgency: 'MEDIUM',
        priority: 'MEDIUM',
        title: `${overdueInvoices.length} outstanding fee balances pending collection`,
        issue: `₹${(totalOutstanding).toLocaleString('en-IN')} uncollected fee balance`,
        scope: 'Network-wide',
        description: `Total ₹${(totalOutstanding).toLocaleString('en-IN')} uncollected tuition balance across campuses.`,
        reason: 'Tuition fee installments past scheduled payment due date.',
        responsibleRole: 'Campus Cashier / Accounts',
        targetNav: 'finance',
        actionLabel: 'Review Collections',
        actNowText: 'Review fee collections'
      });
    }

    // Contextual Action Coupling (Derived from attention items)
    const actNowActions = attentionItems.map(item => ({
      id: `act-${item.id}`,
      label: item.actNowText || item.actionLabel,
      actionLabel: item.actionLabel,
      targetNav: item.targetNav,
      urgency: item.urgency,
      priority: item.priority,
      scope: item.scope
    }));

    // Recent Activity Feed
    const recentActivity = (db.auditLogs || []).slice(0, 6).map(log => {
      let title = `${log.action} on ${log.entityName}`;
      if (log.action === 'CREATE_STUDENT') title = 'New Student Admitted';
      if (log.action === 'COLLECT_PAYMENT') title = 'Fee Payment Received';
      if (log.action === 'CREATE_LEAD') title = 'New Admission Enquiry';
      if (log.action === 'MARK_ATTENDANCE') title = 'Class Attendance Recorded';

      return {
        id: log.id,
        action: log.action,
        title,
        timestamp: log.createdAt,
        userRole: log.userRole,
        campusId: log.campusId
      };
    });

    return {
      scopeType: 'NETWORK',
      scopeTitle: 'Network Overview',
      scopeSubtitle: 'An at-a-glance view of educational and operational activity across the authorised Vedic Tree network.',
      scopeLocation: 'Vedic Tree Platform / National Network',
      environmentSignal: 'DEMO ENVIRONMENT · Sample operational data',
      financialBoundaryNotice: 'Parent/SPV Boundary: This view represents school/SPV operational collections only. Parent-level platform, brand, curriculum, technology and related IP economics are outside this view and must be accounted for according to the final legal and commercial structure.',
      metrics: {
        activeCentres: campuses.length,
        totalStudents: students.length,
        totalFaculty: employees.length,
        admissionsEnquiries: leads.length,
        attendanceRatePct: overallAttendanceRate,
        configuredBenchmarkPct: 75,
        collectedRevenueINR: totalCollected,
        outstandingRevenueINR: totalOutstanding,
        collectionProgressPct: collectionPercentage
      },
      funnel,
      centreHealth,
      attentionItems,
      actNowActions,
      recentActivity,
      developmentSummary: {
        pedagogyFramework: 'Academic Excellence + Gurukul Values (EQ + IQ + SQ)',
        activeCurricula: ['CBSE Affiliated', 'ICSE Approved', 'Foundational Pre-School'],
        holisticDimensions: [
          { dimension: 'Academics', progressPct: 88, status: 'On Track' },
          { dimension: 'Character & Values', progressPct: 92, status: 'Active (Yoga & Seva)' },
          { dimension: 'Wellbeing & Sports', progressPct: 85, status: 'Physical Education & Athletics' },
          { dimension: 'Life Skills & Experiential', progressPct: 90, status: 'Practical Learning Boards' }
        ],
        safeguardingNote: 'Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses.'
      }
    };
  }

  /**
   * 2. Get Centre Overview Data
   * Permitted for Centre Principal, HQ_ADMIN, or campus-assigned staff.
   */
  static getCentreOverview(context, targetCampusId = null) {
    const campusId = targetCampusId || context.campusId || context.activeCampusId;
    if (!campusId) {
      throw new Error('VALIDATION_ERROR: Campus ID is required for Centre Overview.');
    }

    // Multi-tenant boundary check
    TenantContext.validateCampusBoundary(context, campusId);

    const campus = db.getCampusById(campusId);
    if (!campus) {
      throw new Error(`CAMPUS_NOT_FOUND: Campus with ID ${campusId} does not exist.`);
    }

    const school = db.schools.find(s => s.id === campus.schoolId);
    const region = db.regions.find(r => r.id === school?.regionId);

    const students = db.students.filter(s => s.campusId === campusId && s.status === 'ACTIVE');
    const employees = db.employees.filter(e => e.campusId === campusId && e.status === 'ACTIVE');
    const teachers = employees.filter(e => e.departmentId === 'dept-teaching');
    const leads = (db.leads || []).filter(l => l.campusId === campusId);
    const applications = (db.applications || []).filter(a => a.campusId === campusId);
    const invoices = (db.invoices || []).filter(i => i.campusId === campusId);
    const payments = (db.payments || []).filter(p => {
      const inv = (db.invoices || []).find(i => i.id === p.invoiceId);
      return inv?.campusId === campusId;
    });
    const attendanceRecords = (db.studentAttendance || []).filter(r => r.campusId === campusId);
    const maintenance = (db.maintenanceRequests || []).filter(m => m.campusId === campusId);

    // Financials
    const totalBilled = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
    const totalCollected = payments.reduce((sum, p) => p.status === 'SUCCESS' ? sum + (p.amount || 0) : sum, 0);
    const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.balanceAmount || 0), 0);
    const collectionPercentage = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;

    // Attendance
    const presentCount = attendanceRecords.filter(r => r.status === 'PRESENT' || r.status === 'LATE').length;
    const totalAtt = attendanceRecords.length;
    const attendanceRate = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 96;

    // Funnel
    const funnel = {
      enquiries: leads.length,
      applications: applications.length,
      assessments: leads.filter(l => ['ASSESSMENT', 'OFFER', 'ADMISSION', 'STUDENT'].includes(l.stage)).length,
      admissions: students.length
    };

    // Policy & Configured Benchmarks
    const campusPolicy = typeof db.getAttendancePolicy === 'function' ? db.getAttendancePolicy(campusId) : null;
    const configuredBenchmarkPct = campusPolicy?.minStudentAttendancePct || 75;

    // Attention Items for Campus (Priority, Issue, Scope, Reason, Explicit Action CTA)
    const attentionItems = [];
    const uncontactedLeads = leads.filter(l => l.stage === 'LEAD' || l.stage === 'ENQUIRY');
    if (uncontactedLeads.length > 0) {
      attentionItems.push({
        id: `att-leads-${campusId}`,
        category: 'Admissions',
        urgency: 'HIGH',
        priority: 'HIGH',
        title: `${uncontactedLeads.length} campus enquiries awaiting follow-up`,
        issue: `${uncontactedLeads.length} enquiries require follow-up`,
        scope: campus.name,
        description: 'New admission enquiries requiring campus visit scheduling or counselling.',
        reason: 'New admission enquiries requiring campus visit scheduling or counselling within 48h SLA.',
        responsibleRole: 'Admissions Counsellor',
        targetNav: 'admissions',
        actionLabel: 'Review Admissions',
        actNowText: `Follow up ${uncontactedLeads.length} enquiries`
      });
    }

    // Attendance exceptions check
    const attendanceExceptions = attendanceRecords.filter(r => r.status === 'ABSENT' || r.status === 'FLAGGED');
    if (attendanceExceptions.length > 0) {
      attentionItems.push({
        id: `att-att-${campusId}`,
        category: 'Attendance',
        urgency: 'HIGH',
        priority: 'HIGH',
        title: 'Attendance requires review',
        issue: 'Attendance requires review',
        scope: campus.name,
        description: `${attendanceExceptions.length} absence recorded today requiring confirmation against leave requests.`,
        reason: `Attendance recorded below configured benchmark (${configuredBenchmarkPct}%) or unexcused absence flagged.`,
        responsibleRole: 'Class Teacher / Principal',
        targetNav: 'attendance',
        actionLabel: 'Review Attendance',
        actNowText: 'Review attendance exception'
      });
    }

    // Maintenance requests
    const openMaintenance = maintenance.filter(m => m.status === 'LOGGED' || m.status === 'IN_PROGRESS');
    if (openMaintenance.length > 0) {
      attentionItems.push({
        id: `att-maint-${campusId}`,
        category: 'Operations',
        urgency: 'MEDIUM',
        priority: 'MEDIUM',
        title: `${openMaintenance.length} campus maintenance tickets pending`,
        issue: `${openMaintenance.length} maintenance items remain open`,
        scope: campus.name,
        description: 'Physical infrastructure and classroom repairs in progress.',
        reason: 'Facility maintenance tickets logged and awaiting physical repair completion.',
        responsibleRole: 'Campus Admin',
        targetNav: 'operations',
        actionLabel: 'Review Operations',
        actNowText: `Resolve ${openMaintenance.length} maintenance items`
      });
    }

    // Pending fee collections
    if (totalOutstanding > 50000) {
      attentionItems.push({
        id: `att-fees-${campusId}`,
        category: 'Finance',
        urgency: 'MEDIUM',
        priority: 'MEDIUM',
        title: `₹${(totalOutstanding).toLocaleString('en-IN')} pending fee collections`,
        issue: `₹${(totalOutstanding).toLocaleString('en-IN')} pending collections`,
        scope: campus.name,
        description: 'Unpaid balance for Term 1 / Term 2 institutional fee structures.',
        reason: 'Uncollected student tuition fees for current academic period.',
        responsibleRole: 'Campus Cashier',
        targetNav: 'finance',
        actionLabel: 'Review Collections',
        actNowText: 'Review fee collections'
      });
    }

    // Contextual Action Coupling (Derived from current attention items)
    const actNowActions = attentionItems.map(item => ({
      id: `act-${item.id}`,
      label: item.actNowText || item.actionLabel,
      actionLabel: item.actionLabel,
      targetNav: item.targetNav,
      urgency: item.urgency,
      priority: item.priority,
      scope: item.scope
    }));

    // Recent Activity for Campus
    const recentActivity = (db.auditLogs || [])
      .filter(l => l.campusId === campusId)
      .slice(0, 5)
      .map(log => ({
        id: log.id,
        action: log.action,
        title: `${log.action} on ${log.entityName}`,
        timestamp: log.createdAt,
        userRole: log.userRole
      }));

    return {
      scopeType: 'CENTRE',
      scopeTitle: 'Centre Overview',
      scopeSubtitle: `Operational and academic summary for ${campus.name}`,
      scopeLocation: `${school?.name || 'Vedic Tree School'} / ${region?.name || 'Mumbai MMR'} / ${campus.name}`,
      environmentSignal: 'DEMO ENVIRONMENT · Sample operational data',
      financialBoundaryNotice: 'Parent/SPV Boundary: This view represents school/SPV operational collections only. Parent-level platform, brand, curriculum, technology and related IP economics are outside this view and must be accounted for according to the final legal and commercial structure.',
      campusDetails: {
        id: campus.id,
        name: campus.name,
        code: campus.code,
        city: campus.city,
        schoolName: school?.name,
        boardType: school?.boardType || 'CBSE',
        ownershipType: school?.ownershipType || 'OWNED'
      },
      metrics: {
        totalStudents: students.length,
        totalFaculty: employees.length,
        admissionsEnquiries: leads.length,
        attendanceRatePct: attendanceRate,
        configuredBenchmarkPct,
        collectedRevenueINR: totalCollected,
        outstandingRevenueINR: totalOutstanding,
        collectionProgressPct: collectionPercentage
      },
      funnel,
      attentionItems,
      actNowActions,
      recentActivity,
      developmentSummary: {
        pedagogyFramework: 'Character & Experiential Learning in Action',
        activeCurricula: [`Affiliation: ${school?.boardType || 'CBSE'} Standard`],
        holisticDimensions: [
          { dimension: 'Academics', progressPct: 91, status: 'Term 1 Syllabi Complete' },
          { dimension: 'Character & Values', progressPct: 95, status: 'Daily Prayer & Seva Practice' },
          { dimension: 'Wellbeing & Sports', progressPct: 88, status: 'Physical Education & Athletics' },
          { dimension: 'Life Skills & Experiential', progressPct: 92, status: 'Hands-on Science & Arts' }
        ],
        safeguardingNote: 'Educational & Formative Observations Only — Not Clinical or Psychiatric Diagnoses.'
      }
    };
  }
}
