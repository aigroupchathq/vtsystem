// VEDIC TREE OS — Module 03 Admissions CRM Test Suite
// Verifies full Lead -> Enquiry -> Counselling -> Visit -> Application -> Assessment -> Offer -> Admission -> Fee -> Student journey,
// WhatsApp provider-agnostic communication architecture, and multi-tenant isolation.
import test from 'node:test';
import assert from 'node:assert/strict';

import { db } from '../src/database/db.js';
import { AdmissionsService, PIPELINE_STAGES } from '../src/modules/admissions/admissions.service.js';
import { CommunicationService } from '../src/modules/communication/communication.service.js';
import { MockWhatsAppProvider } from '../src/modules/communication/providers/mock.provider.js';
import { MetaCloudWhatsAppProvider } from '../src/modules/communication/providers/meta-cloud.provider.js';
import { TwilioWhatsAppProvider } from '../src/modules/communication/providers/twilio.provider.js';

// Setup Mock Tenant Contexts
const ctxPrincipalBaner = {
  organizationId: 'org-vedic-tree-foundation',
  campusId: 'cmp-pune-baner',
  activeCampusId: 'cmp-pune-baner',
  userId: 'usr-principal-baner',
  userName: 'Dr. Meenakshi Sundaram',
  userRole: 'PRINCIPAL'
};

const ctxPrincipalKothrud = {
  organizationId: 'org-vedic-tree-foundation',
  campusId: 'cmp-pune-kothrud',
  activeCampusId: 'cmp-pune-kothrud',
  userId: 'usr-principal-kothrud',
  userName: 'Kothrud Admin',
  userRole: 'PRINCIPAL'
};

const ctxHQ = {
  organizationId: 'org-vedic-tree-foundation',
  campusId: null,
  activeCampusId: 'cmp-pune-baner',
  userId: 'usr-hq-admin',
  userName: 'Raghav Sharma',
  userRole: 'HQ_ADMIN'
};

const ctxTeacher = {
  organizationId: 'org-vedic-tree-foundation',
  campusId: 'cmp-pune-baner',
  activeCampusId: 'cmp-pune-baner',
  userId: 'usr-teacher-patil',
  userName: 'Sunita Patil',
  userRole: 'TEACHER'
};

test('1. Provider-Agnostic Communication Architecture & WhatsApp Adapters', async (t) => {
  db.reset();

  await t.test('1.1 Mock provider dispatches and logs template WhatsApp message', () => {
    CommunicationService.setActiveProvider('MOCK');
    const result = CommunicationService.sendTemplate(ctxPrincipalBaner, {
      leadId: 'lead-1',
      recipientPhone: '+91 98220 12345',
      recipientName: 'Vikram Joshi',
      templateId: 'tpl_welcome_enquiry',
      parameters: {
        guardianName: 'Vikram Joshi',
        studentName: 'Aarohi Joshi',
        targetGrade: 'Grade 1',
        link: 'https://vedictree.edu.in/prospectus.pdf'
      }
    });

    assert.equal(result.success, true);
    assert.equal(result.provider, 'MOCK');
    assert.equal(result.status, 'DELIVERED');
    assert.match(result.renderedText, /Aarohi Joshi/);

    // Verify DB log
    const logs = db.getCommunicationLogs(ctxPrincipalBaner, { leadId: 'lead-1' });
    assert.ok(logs.length >= 1);
    assert.equal(logs[0].provider, 'MOCK');
  });

  await t.test('1.2 Seamlessly switch to Meta Cloud provider without modifying business logic', () => {
    CommunicationService.setActiveProvider('META_CLOUD');
    const activeProvider = CommunicationService.getActiveProvider();
    assert.equal(activeProvider.name, 'META_CLOUD');

    const result = CommunicationService.sendTemplate(ctxPrincipalBaner, {
      leadId: 'lead-2',
      recipientPhone: '+91 98221 23456',
      recipientName: 'Sneha Patel',
      templateId: 'tpl_visit_confirmation',
      parameters: {
        guardianName: 'Sneha Patel',
        studentName: 'Reyansh Patel',
        dateTime: 'Tomorrow at 10 AM',
        campusName: 'Pune Baner Campus'
      }
    });

    assert.equal(result.success, true);
    assert.equal(result.provider, 'META_CLOUD');
    assert.equal(result.status, 'SENT');
    assert.match(result.renderedText, /Pune Baner Campus/);
  });

  await t.test('1.3 Seamlessly switch to Twilio WhatsApp provider without modifying business logic', () => {
    CommunicationService.setActiveProvider('TWILIO');
    const activeProvider = CommunicationService.getActiveProvider();
    assert.equal(activeProvider.name, 'TWILIO');

    const result = CommunicationService.sendTemplate(ctxPrincipalBaner, {
      leadId: 'lead-3',
      recipientPhone: '+91 98222 34567',
      recipientName: 'Sachin Kulkarni',
      templateId: 'tpl_assessment_invite',
      parameters: {
        guardianName: 'Sachin Kulkarni',
        studentName: 'Ananya Kulkarni',
        appNo: 'APP-2026-0001',
        dateTime: 'Friday at 2 PM'
      }
    });

    assert.equal(result.success, true);
    assert.equal(result.provider, 'TWILIO');
    assert.match(result.renderedText, /APP-2026-0001/);

    // Reset back to MOCK for subsequent tests
    CommunicationService.setActiveProvider('MOCK');
  });
});

test('2. Complete 10-Stage Lead-to-Admission Journey', async (t) => {
  db.reset();
  CommunicationService.setActiveProvider('MOCK');

  let journeyLead;
  let journeyApplication;
  let journeyAssessment;
  let journeyOffer;
  let journeyAdmission;

  await t.test('Step 1: Lead Registration (Lead -> Enquiry)', () => {
    journeyLead = AdmissionsService.createLead(ctxPrincipalBaner, {
      campusId: 'cmp-pune-baner',
      studentName: 'Navya Deshpande',
      guardianName: 'Girish Deshpande',
      phone: '+91 98900 44556',
      email: 'girish.d@example.com',
      targetGrade: 'Grade 5',
      leadSource: 'WEBSITE',
      assignedCounselorId: 'emp-counselor-anjali',
      priority: 'HIGH',
      notes: 'Parent submitted online enquiry for Grade 5.'
    });

    assert.ok(journeyLead.id);
    assert.equal(journeyLead.stage, 'LEAD');
    assert.equal(journeyLead.studentName, 'Navya Deshpande');

    // Advance to Enquiry
    const enquiryLead = AdmissionsService.advanceStage(ctxPrincipalBaner, journeyLead.id, 'ENQUIRY', 'Tele-counselor contacted parent');
    assert.equal(enquiryLead.stage, 'ENQUIRY');
  });

  await t.test('Step 2: Counselling Session Logged (Enquiry -> Counselling)', () => {
    const counselled = AdmissionsService.recordCounsellingNotes(
      ctxPrincipalBaner,
      journeyLead.id,
      'Discussed CBSE vs Cambridge curriculum. Parent is looking for experiential STEM lab.',
      'emp-counselor-anjali'
    );

    assert.equal(counselled.stage, 'COUNSELLING');
    assert.match(counselled.notes, /STEM lab/);

    // Schedule counselor follow-up task
    const followUp = AdmissionsService.scheduleFollowUp(ctxPrincipalBaner, journeyLead.id, {
      title: 'Call to confirm campus visit date',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      type: 'CALL'
    });
    assert.ok(followUp.id);
    assert.equal(followUp.status, 'PENDING');
  });

  await t.test('Step 3: Campus Tour Booking & Completion (Counselling -> Visit)', () => {
    const visit = AdmissionsService.scheduleCampusVisit(ctxPrincipalBaner, journeyLead.id, {
      scheduledAt: '2026-10-06T10:30:00Z',
      visitorCount: 3,
      guideName: 'Anjali Deshmukh'
    });

    assert.ok(visit.id);
    assert.equal(visit.status, 'SCHEDULED');

    // Lead stage automatically advanced to VISIT
    const leadDetail = AdmissionsService.getLeadDetail(ctxPrincipalBaner, journeyLead.id);
    assert.equal(leadDetail.lead.stage, 'VISIT');

    // Complete the visit with parent feedback
    const completedVisit = AdmissionsService.completeCampusVisit(
      ctxPrincipalBaner,
      visit.id,
      'Parent highly satisfied with library and sports complex.',
      5
    );
    assert.equal(completedVisit.status, 'COMPLETED');
    assert.equal(completedVisit.rating, 5);
  });

  await t.test('Step 4: Formal Application & Documents (Visit -> Application)', () => {
    journeyApplication = AdmissionsService.submitApplication(ctxPrincipalBaner, journeyLead.id, {
      academicYearId: 'ay-2026-2027',
      gradeId: 'grd-5',
      candidateDob: '2015-08-12',
      candidateGender: 'FEMALE',
      previousSchool: 'Bishop High School Pune',
      siblingInfo: 'None',
      emergencyPhone: '+91 98900 44556',
      address: 'Pride Panorama, Senapati Bapat Road, Pune 411016'
    });

    assert.ok(journeyApplication.id);
    assert.ok(journeyApplication.applicationNumber.startsWith('APP-'));

    // Upload & verify application document
    const doc = AdmissionsService.uploadApplicationDocument(ctxPrincipalBaner, journeyApplication.id, {
      documentType: 'BIRTH_CERTIFICATE',
      fileName: 'navya_birth_cert.pdf'
    });
    assert.ok(doc.id);
    assert.equal(doc.verificationStatus, 'PENDING');

    const verifiedDoc = AdmissionsService.verifyApplicationDocument(ctxPrincipalBaner, doc.id, 'VERIFIED', 'Original birth certificate validated');
    assert.equal(verifiedDoc.verificationStatus, 'VERIFIED');

    // Verify lead stage
    const lead = db.getLeadById(ctxPrincipalBaner, journeyLead.id);
    assert.equal(lead.stage, 'APPLICATION');
  });

  await t.test('Step 5: Entrance Assessment (Application -> Assessment)', () => {
    journeyAssessment = AdmissionsService.recordEntranceAssessment(
      ctxPrincipalBaner,
      journeyLead.id,
      journeyApplication.id,
      {
        assessmentDate: '2026-10-07T11:00:00Z',
        evaluatorName: 'Sunita Patil',
        subjects: [
          { subject: 'Mathematics', maxMarks: 40, marks: 38 },
          { subject: 'English', maxMarks: 40, marks: 37 },
          { subject: 'Science & Logic', maxMarks: 20, marks: 19 }
        ],
        remarks: 'Candidate demonstrated exemplary logic and language skills.',
        result: 'RECOMMENDED'
      }
    );

    assert.ok(journeyAssessment.id);
    assert.equal(journeyAssessment.totalMarks, 94);
    assert.equal(journeyAssessment.percentage, 94.0);
    assert.equal(journeyAssessment.result, 'RECOMMENDED');

    const lead = db.getLeadById(ctxPrincipalBaner, journeyLead.id);
    assert.equal(lead.stage, 'ASSESSMENT');
  });

  await t.test('Step 6: Admission Offer Issuance & Acceptance (Assessment -> Offer -> Admission)', () => {
    journeyOffer = AdmissionsService.issueAdmissionOffer(
      ctxPrincipalBaner,
      journeyLead.id,
      journeyApplication.id,
      {
        offeredGradeId: 'grd-5',
        validUntil: '2026-10-25T23:59:59Z',
        terms: 'Admission offer valid upon fee deposit.'
      }
    );

    assert.ok(journeyOffer.id);
    assert.ok(journeyOffer.offerNumber.startsWith('OFR-'));
    assert.equal(journeyOffer.status, 'ISSUED');

    // Lead stage is OFFER
    let lead = db.getLeadById(ctxPrincipalBaner, journeyLead.id);
    assert.equal(lead.stage, 'OFFER');

    // Parent accepts offer
    AdmissionsService.acceptAdmissionOffer(ctxPrincipalBaner, journeyOffer.id);
    lead = db.getLeadById(ctxPrincipalBaner, journeyLead.id);
    assert.equal(lead.stage, 'ADMISSION');
  });

  await t.test('Step 7: Admission Fee Payment Confirmation (Admission -> Fee)', () => {
    journeyAdmission = AdmissionsService.confirmAdmissionAndPayFee(
      ctxPrincipalBaner,
      journeyLead.id,
      journeyApplication.id,
      {
        admissionFeePaid: 32000.0,
        paymentMethod: 'UPI'
      }
    );

    assert.ok(journeyAdmission.id);
    assert.ok(journeyAdmission.admissionNumber.startsWith('VT-'));
    assert.ok(journeyAdmission.feeReceiptNumber.startsWith('RCP-'));
    assert.equal(journeyAdmission.status, 'CONFIRMED');

    const lead = db.getLeadById(ctxPrincipalBaner, journeyLead.id);
    assert.equal(lead.stage, 'STUDENT');
  });

  await t.test('Step 8: Conversion to Student Core (Fee -> Student)', () => {
    const conversion = AdmissionsService.convertToStudent(ctxPrincipalBaner, {
      leadId: journeyLead.id,
      applicationId: journeyApplication.id,
      admissionRecordId: journeyAdmission.id,
      divisionId: 'div-pune-5a'
    });

    assert.equal(conversion.success, true);
    assert.ok(conversion.student.id);
    assert.equal(conversion.student.firstName, 'Navya');
    assert.equal(conversion.student.lastName, 'Deshpande');
    assert.equal(conversion.student.admissionNumber, journeyAdmission.admissionNumber);

    // Verify student is queryable directly in Student Core
    const coreStudent = db.getStudentById(ctxPrincipalBaner, conversion.student.id);
    assert.ok(coreStudent);
    assert.equal(coreStudent.admissionNumber, journeyAdmission.admissionNumber);

    // Verify enrollment
    assert.ok(coreStudent.enrollment);
    assert.equal(coreStudent.enrollment.divisionId, 'div-pune-5a');

    // Verify guardian
    assert.ok(coreStudent.guardians.length >= 1);
    assert.ok(coreStudent.guardians[0].guardianId);

    // Verify timeline entry on lead
    const timeline = db.getLeadTimeline(ctxPrincipalBaner, journeyLead.id);
    const enrollmentEvent = timeline.find(e => e.title.includes('Student Enrolled'));
    assert.ok(enrollmentEvent);
  });
});

test('3. Counsellor Workspace & Follow-Up Management', async (t) => {
  db.reset();

  await t.test('3.1 Workspace aggregates stage metrics and pending tasks', () => {
    const workspace = AdmissionsService.getCounselorWorkspace(ctxPrincipalBaner);
    assert.ok(workspace.totalLeads >= 5);
    assert.ok(workspace.conversionRate >= 0);
    assert.ok(workspace.stageCounts);

    for (const stage of PIPELINE_STAGES) {
      assert.notEqual(workspace.stageCounts[stage], undefined);
    }
  });

  await t.test('3.2 Complete follow-up task updates status and adds timeline note', () => {
    const followUps = db.getFollowUps(ctxPrincipalBaner, { status: 'PENDING' });
    assert.ok(followUps.length > 0);
    const target = followUps[0];

    const updated = AdmissionsService.completeFollowUp(ctxPrincipalBaner, target.id, 'Parent requested evening callback.');
    assert.equal(updated.status, 'COMPLETED');
    assert.ok(updated.completedAt);
  });
});

test('4. Multi-Tenant Isolation & Audit Trail', async (t) => {
  db.reset();

  await t.test('4.1 Baner principal cannot read foreign Kothrud leads', () => {
    // Create a lead in Kothrud
    const kothrudLead = db.createLead(ctxHQ, {
      campusId: 'cmp-pune-kothrud',
      studentName: 'Aarush Kothrudkar',
      guardianName: 'Sunil Kothrudkar',
      phone: '+91 98000 11223',
      targetGrade: 'Grade 3'
    });

    // Baner principal querying by ID should get 403 Forbidden
    assert.throws(
      () => AdmissionsService.getLeadDetail(ctxPrincipalBaner, kothrudLead.id),
      /TENANT_ISOLATION_VIOLATION/
    );
  });

  await t.test('4.2 Baner principal cannot advance stage of foreign Kothrud lead', () => {
    const kothrudLead = db.createLead(ctxHQ, {
      campusId: 'cmp-pune-kothrud',
      studentName: 'Meera Sen',
      guardianName: 'Anil Sen',
      phone: '+91 98000 11224',
      targetGrade: 'Grade 2'
    });

    assert.throws(
      () => AdmissionsService.advanceStage(ctxPrincipalBaner, kothrudLead.id, 'COUNSELLING'),
      /TENANT_ISOLATION_VIOLATION/
    );
  });

  await t.test('4.3 Teacher without admissions:create permission cannot create leads', () => {
    assert.throws(
      () => AdmissionsService.createLead(ctxTeacher, {
        campusId: 'cmp-pune-baner',
        studentName: 'Test Student',
        guardianName: 'Test Parent',
        phone: '+91 98000 99999',
        targetGrade: 'Grade 1'
      }),
      /FORBIDDEN/
    );
  });

  await t.test('4.4 Admissions mutations generate traceable audit log entries', () => {
    const audits = db.getAuditLogs({ entityName: 'Lead' });
    assert.ok(audits.length > 0);
    assert.ok(audits[0].entityId);
    assert.equal(audits[0].entityName, 'Lead');
  });
});
