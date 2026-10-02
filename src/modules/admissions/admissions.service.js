// VEDIC TREE OS — Admissions CRM Service
// Coordinates the 10-stage journey:
// Lead -> Enquiry -> Counselling -> Visit -> Application -> Assessment -> Offer -> Admission -> Fee -> Student
import { db } from '../../database/db.js';
import { RbacService } from '../platform/rbac.service.js';
import { TenantContext } from '../platform/tenant.context.js';
import { Logger } from '../platform/logger.service.js';
import { CommunicationService } from '../communication/communication.service.js';
import { StudentsService } from '../sis/students.service.js';

export const PIPELINE_STAGES = [
  'LEAD',
  'ENQUIRY',
  'COUNSELLING',
  'VISIT',
  'APPLICATION',
  'ASSESSMENT',
  'OFFER',
  'ADMISSION',
  'FEE',
  'STUDENT'
];

export class AdmissionsService {
  /**
   * 1. Register a new Lead / Inquiry
   */
  static createLead(context, leadData, options = {}) {
    RbacService.enforce(context.userRole, 'admissions:create');
    TenantContext.validateCampusBoundary(context, leadData.campusId);

    if (!leadData.studentName?.trim()) {
      throw new Error('VALIDATION_ERROR: Candidate/Student name is mandatory.');
    }
    if (!leadData.guardianName?.trim()) {
      throw new Error('VALIDATION_ERROR: Guardian/Parent name is mandatory.');
    }
    if (!leadData.phone?.trim()) {
      throw new Error('VALIDATION_ERROR: Contact phone number is mandatory.');
    }
    if (!leadData.targetGrade?.trim()) {
      throw new Error('VALIDATION_ERROR: Target grade for admission is required.');
    }

    Logger.info('AdmissionsService', `Registering new lead: ${leadData.studentName} (Parent: ${leadData.guardianName})`);
    const lead = db.createLead(context, {
      ...leadData,
      stage: leadData.stage || 'LEAD'
    });

    // Auto-dispatch Welcome WhatsApp message if requested (defaults to true)
    if (options.sendWelcome !== false) {
      try {
        CommunicationService.sendWelcomeEnquiry(context, lead);
      } catch (err) {
        Logger.warn('AdmissionsService', `WhatsApp welcome dispatch skipped: ${err.message}`);
      }
    }

    return lead;
  }

  /**
   * Get all Leads for active campus
   */
  static getLeads(context, filters = {}) {
    RbacService.enforce(context.userRole, 'admissions:read');
    return db.getLeads(context, filters);
  }

  /**
   * Get single lead by ID with complete timeline and documents
   */
  static getLeadDetail(context, leadId) {
    RbacService.enforce(context.userRole, 'admissions:read');
    const lead = db.getLeadById(context, leadId);
    if (!lead) {
      const err = new Error(`Lead ${leadId} not found.`);
      err.status = 404;
      throw err;
    }

    const timeline = db.getLeadTimeline(context, leadId);
    const followUps = db.getFollowUps(context, { leadId });
    const visits = db.getCampusVisits(context, { leadId });
    const applications = db.getApplications(context, { leadId });
    const commLogs = db.getCommunicationLogs(context, { leadId });

    return {
      lead,
      timeline,
      followUps,
      visits,
      applications,
      communicationLogs: commLogs
    };
  }

  /**
   * Advance or change a lead's pipeline stage
   */
  static advanceStage(context, leadId, newStage, remarks = '') {
    RbacService.enforce(context.userRole, 'admissions:counsel');
    const lead = db.getLeadById(context, leadId);
    if (!lead) throw new Error(`Lead ${leadId} not found.`);

    TenantContext.validateCampusBoundary(context, lead.campusId);

    const validStages = [...PIPELINE_STAGES, 'LOST', 'ENROLLED'];
    if (!validStages.includes(newStage)) {
      throw new Error(`Invalid pipeline stage '${newStage}'. Allowed: ${validStages.join(', ')}`);
    }

    Logger.info('AdmissionsService', `Advancing lead ${leadId} stage: ${lead.stage} -> ${newStage}`);
    return db.updateLead(context, leadId, {
      stage: newStage,
      stageRemarks: remarks
    });
  }

  /**
   * 2 & 3. Record Counselling Notes & Interactions
   */
  static recordCounsellingNotes(context, leadId, notes, counselorId) {
    RbacService.enforce(context.userRole, 'admissions:counsel');
    const lead = db.getLeadById(context, leadId);
    if (!lead) throw new Error(`Lead ${leadId} not found.`);

    TenantContext.validateCampusBoundary(context, lead.campusId);

    db.addLeadTimelineEvent(context, {
      leadId,
      campusId: lead.campusId,
      eventType: 'CALL',
      title: 'Counselling Session Logged',
      description: notes,
      metadata: { counselorId: counselorId || context.userId }
    });

    const updates = { notes };
    if (lead.stage === 'LEAD' || lead.stage === 'ENQUIRY') {
      updates.stage = 'COUNSELLING';
    }

    return db.updateLead(context, leadId, updates);
  }

  /**
   * 4. Schedule a Campus Visit / Tour
   */
  static scheduleCampusVisit(context, leadId, visitData) {
    RbacService.enforce(context.userRole, 'admissions:visit');
    const lead = db.getLeadById(context, leadId);
    if (!lead) throw new Error(`Lead ${leadId} not found.`);

    TenantContext.validateCampusBoundary(context, lead.campusId);

    const visit = db.scheduleCampusVisit(context, {
      ...visitData,
      leadId,
      campusId: lead.campusId,
      visitorName: visitData.visitorName || lead.guardianName,
      phone: visitData.phone || lead.phone
    });

    // Auto-dispatch Visit confirmation WhatsApp
    try {
      CommunicationService.sendVisitConfirmation(context, lead, visit);
    } catch (err) {
      Logger.warn('AdmissionsService', `WhatsApp visit confirmation skipped: ${err.message}`);
    }

    return visit;
  }

  /**
   * Complete Campus Visit with parent feedback
   */
  static completeCampusVisit(context, visitId, feedback = '', rating = 5) {
    RbacService.enforce(context.userRole, 'admissions:visit');
    return db.updateCampusVisit(context, visitId, {
      status: 'COMPLETED',
      feedback,
      rating: Number(rating)
    });
  }

  /**
   * 5. Register Formal Application
   */
  static submitApplication(context, leadId, appData) {
    RbacService.enforce(context.userRole, 'admissions:apply');
    const lead = db.getLeadById(context, leadId);
    if (!lead) throw new Error(`Lead ${leadId} not found.`);

    TenantContext.validateCampusBoundary(context, lead.campusId);

    const application = db.createApplication(context, {
      ...appData,
      leadId,
      campusId: lead.campusId,
      targetGrade: lead.targetGrade
    });

    return application;
  }

  /**
   * Attach Application Document
   */
  static uploadApplicationDocument(context, applicationId, docData) {
    RbacService.enforce(context.userRole, 'admissions:apply');
    const app = db.getApplicationById(context, applicationId);
    if (!app) throw new Error(`Application ${applicationId} not found.`);

    return db.addApplicationDocument(context, {
      ...docData,
      applicationId,
      campusId: app.campusId
    });
  }

  /**
   * Verify Application Document
   */
  static verifyApplicationDocument(context, docId, status, remarks = '') {
    RbacService.enforce(context.userRole, 'admissions:counsel');
    return db.verifyApplicationDocument(context, docId, status, remarks);
  }

  /**
   * 6. Record Entrance Assessment
   */
  static recordEntranceAssessment(context, leadId, applicationId, assessmentData) {
    RbacService.enforce(context.userRole, 'admissions:assess');
    const lead = db.getLeadById(context, leadId);
    const app = db.getApplicationById(context, applicationId);
    if (!lead || !app) throw new Error('Lead and Application are required.');

    TenantContext.validateCampusBoundary(context, lead.campusId);

    const assessment = db.recordEntranceAssessment(context, {
      ...assessmentData,
      leadId,
      applicationId,
      campusId: lead.campusId
    });

    return assessment;
  }

  /**
   * 7. Issue Admission Offer Letter
   */
  static issueAdmissionOffer(context, leadId, applicationId, offerData = {}) {
    RbacService.enforce(context.userRole, 'admissions:offer');
    const lead = db.getLeadById(context, leadId);
    const app = db.getApplicationById(context, applicationId);
    if (!lead || !app) throw new Error('Lead and Application are required.');

    TenantContext.validateCampusBoundary(context, lead.campusId);

    const offer = db.issueAdmissionOffer(context, {
      ...offerData,
      leadId,
      applicationId,
      campusId: lead.campusId,
      offeredGradeId: offerData.offeredGradeId || app.gradeId
    });

    // Auto-dispatch Offer Letter WhatsApp
    try {
      CommunicationService.sendOfferLetter(context, lead, offer);
    } catch (err) {
      Logger.warn('AdmissionsService', `WhatsApp offer letter skipped: ${err.message}`);
    }

    return offer;
  }

  /**
   * Accept Offer Letter
   */
  static acceptAdmissionOffer(context, offerId) {
    RbacService.enforce(context.userRole, 'admissions:counsel');
    return db.updateAdmissionOfferStatus(context, offerId, 'ACCEPTED');
  }

  /**
   * 8 & 9. Confirm Admission & Pay Fee
   */
  static confirmAdmissionAndPayFee(context, leadId, applicationId, paymentData) {
    RbacService.enforce(context.userRole, 'admissions:admit');
    const lead = db.getLeadById(context, leadId);
    const app = db.getApplicationById(context, applicationId);
    if (!lead || !app) throw new Error('Lead and Application are required.');

    TenantContext.validateCampusBoundary(context, lead.campusId);

    const admissionRecord = db.confirmAdmissionAndPayFee(context, {
      ...paymentData,
      leadId,
      applicationId,
      campusId: lead.campusId
    });

    // Auto-dispatch Fee Receipt WhatsApp
    try {
      CommunicationService.sendFeeReceipt(context, lead, admissionRecord);
    } catch (err) {
      Logger.warn('AdmissionsService', `WhatsApp fee receipt skipped: ${err.message}`);
    }

    return admissionRecord;
  }

  /**
   * 10. Complete Conversion to Student Core (Module 01 integration!)
   * Converts the candidate into an active Student, Guardian, and Enrollment.
   */
  static convertToStudent(context, { leadId, applicationId, admissionRecordId, divisionId }) {
    RbacService.enforce(context.userRole, 'admissions:admit');
    const lead = db.getLeadById(context, leadId);
    const app = db.getApplicationById(context, applicationId);
    if (!lead || !app) throw new Error('Lead and Application are required for conversion.');

    TenantContext.validateCampusBoundary(context, lead.campusId);

    const admissionRecord = db.admissionRecords.find(a => a.id === admissionRecordId || a.applicationId === applicationId);
    if (!admissionRecord) {
      throw new Error('CONFIRMATION_REQUIRED: Admission fee record must be created before converting candidate to student.');
    }

    // Split student name
    const nameParts = lead.studentName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || 'Vedic';

    // Split guardian name
    const gNameParts = lead.guardianName.trim().split(' ');
    const gFirstName = gNameParts[0];
    const gLastName = gNameParts.slice(1).join(' ') || lastName;

    const studentPayload = {
      campusId: lead.campusId,
      admissionNumber: admissionRecord.admissionNumber,
      firstName,
      lastName,
      dob: app.candidateDob ? new Date(app.candidateDob).toISOString().split('T')[0] : '2014-06-15',
      gender: app.candidateGender || 'MALE',
      bloodGroup: 'B+',
      aadhaarLastFour: '7890',
      emergencyPhone: lead.phone,
      gradeId: app.gradeId || 'grd-5',
      divisionId: divisionId || 'div-pune-5a',
      academicYearId: app.academicYearId || 'ay-2026-2027',
      rollNumber: `R-${Math.floor(10 + Math.random() * 80)}`,
      guardian: {
        firstName: gFirstName,
        lastName: gLastName,
        relation: 'FATHER',
        phone: lead.phone,
        email: lead.email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        isPrimaryContact: true
      }
    };

    // Invoke Module 01 StudentsService
    const createdStudent = StudentsService.admitStudent(context, studentPayload);

    // Link studentId in AdmissionRecord and update lead to STUDENT / ENROLLED
    admissionRecord.studentId = createdStudent.id;
    lead.stage = 'STUDENT';
    lead.updatedAt = new Date().toISOString();

    db.addLeadTimelineEvent(context, {
      leadId: lead.id,
      campusId: lead.campusId,
      eventType: 'STAGE_TRANSITION',
      title: `Student Enrolled: ${createdStudent.admissionNumber}`,
      description: `${createdStudent.firstName} ${createdStudent.lastName} has been officially enrolled into the student directory (Roll: ${studentPayload.rollNumber}).`,
      metadata: { studentId: createdStudent.id, admissionNumber: createdStudent.admissionNumber }
    });

    Logger.info('AdmissionsService', `Lead ${leadId} successfully converted to Student ${createdStudent.id} (${createdStudent.admissionNumber})`);

    return {
      success: true,
      student: createdStudent,
      admissionRecord,
      lead
    };
  }

  /**
   * Follow-up Scheduling & Counselor Tasks
   */
  static scheduleFollowUp(context, leadId, followUpData) {
    RbacService.enforce(context.userRole, 'admissions:counsel');
    const lead = db.getLeadById(context, leadId);
    if (!lead) throw new Error(`Lead ${leadId} not found.`);

    return db.createFollowUp(context, {
      ...followUpData,
      leadId,
      campusId: lead.campusId
    });
  }

  static completeFollowUp(context, followUpId, remarks = '') {
    RbacService.enforce(context.userRole, 'admissions:counsel');
    return db.updateFollowUp(context, followUpId, {
      status: 'COMPLETED',
      remarks
    });
  }

  /**
   * Counselor Workspace Overview & Performance Metrics
   */
  static getCounselorWorkspace(context, counselorId) {
    RbacService.enforce(context.userRole, 'admissions:read');
    const leads = db.getLeads(context);
    const activeLeads = counselorId ? leads.filter(l => l.assignedCounselorId === counselorId) : leads;
    
    const followUps = db.getFollowUps(context, { status: 'PENDING' });
    const pendingFollowUps = counselorId ? followUps.filter(f => f.counselorId === counselorId) : followUps;
    
    const visits = db.getCampusVisits(context, { status: 'SCHEDULED' });

    // Stage counts
    const stageCounts = {};
    for (const stage of PIPELINE_STAGES) {
      stageCounts[stage] = 0;
    }
    stageCounts['LOST'] = 0;

    for (const l of activeLeads) {
      if (stageCounts[l.stage] !== undefined) {
        stageCounts[l.stage]++;
      }
    }

    const totalLeads = activeLeads.length;
    const enrolledLeads = stageCounts['STUDENT'] || 0;
    const conversionRate = totalLeads > 0 ? Number(((enrolledLeads / totalLeads) * 100).toFixed(1)) : 0;

    return {
      totalLeads,
      enrolledLeads,
      conversionRate,
      pendingFollowUpsCount: pendingFollowUps.length,
      scheduledVisitsCount: visits.length,
      stageCounts,
      pendingFollowUps: pendingFollowUps.slice(0, 10),
      scheduledVisits: visits.slice(0, 10)
    };
  }
}
