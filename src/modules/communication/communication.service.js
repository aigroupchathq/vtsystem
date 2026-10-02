// VEDIC TREE OS — Communication Service
// Provider-agnostic communication hub for WhatsApp, SMS, and Email
import { MockWhatsAppProvider } from './providers/mock.provider.js';
import { MetaCloudWhatsAppProvider } from './providers/meta-cloud.provider.js';
import { TwilioWhatsAppProvider } from './providers/twilio.provider.js';
import { db } from '../../database/db.js';

class CommunicationServiceClass {
  constructor() {
    this.providers = new Map();
    // Register built-in providers
    this.registerProvider('MOCK', new MockWhatsAppProvider());
    this.registerProvider('META_CLOUD', new MetaCloudWhatsAppProvider());
    this.registerProvider('TWILIO', new TwilioWhatsAppProvider());
    
    // Default provider key
    this.activeProviderKey = 'MOCK';
  }

  /**
   * Registers a concrete communication provider
   * @param {string} key
   * @param {import('./provider.interface.js').ICommunicationProvider} providerInstance
   */
  registerProvider(key, providerInstance) {
    this.providers.set(key.toUpperCase(), providerInstance);
  }

  /**
   * Switches the active global communication provider
   * @param {string} key
   */
  setActiveProvider(key) {
    const upper = key.toUpperCase();
    if (!this.providers.has(upper)) {
      throw new Error(`Communication provider '${key}' is not registered. Available: ${Array.from(this.providers.keys()).join(', ')}`);
    }
    this.activeProviderKey = upper;
  }

  getActiveProvider() {
    return this.providers.get(this.activeProviderKey);
  }

  /**
   * Dispatches a templated WhatsApp message
   */
  sendTemplate(context, { leadId, recipientPhone, recipientName, templateId, parameters = {} }) {
    const templates = db.getWhatsAppTemplates();
    const template = templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`WhatsApp template '${templateId}' not found.`);
    }

    const provider = this.getActiveProvider();
    const result = provider.sendTemplateMessage({
      to: recipientPhone,
      templateId,
      rawTemplateBody: template.body,
      parameters,
      metadata: { leadId, campusId: context.campusId || context.activeCampusId }
    });

    // Persist communication log in database
    const log = db.logCommunication(context, {
      leadId,
      campusId: context.campusId || context.activeCampusId,
      recipientPhone,
      recipientName,
      channel: 'WHATSAPP',
      provider: provider.name,
      templateId,
      messageContent: result.renderedBody || template.body,
      status: result.status || 'SENT',
      providerMessageId: result.messageId,
      errorMessage: result.error || null
    });

    return {
      success: result.success,
      messageId: result.messageId,
      status: result.status,
      renderedText: result.renderedBody,
      logId: log.id,
      provider: provider.name
    };
  }

  /**
   * Dispatches a direct text WhatsApp message
   */
  sendDirectMessage(context, { leadId, recipientPhone, recipientName, text }) {
    const provider = this.getActiveProvider();
    const result = provider.sendTextMessage({
      to: recipientPhone,
      text,
      metadata: { leadId, campusId: context.campusId || context.activeCampusId }
    });

    const log = db.logCommunication(context, {
      leadId,
      campusId: context.campusId || context.activeCampusId,
      recipientPhone,
      recipientName,
      channel: 'WHATSAPP',
      provider: provider.name,
      templateId: null,
      messageContent: text,
      status: result.status || 'SENT',
      providerMessageId: result.messageId,
      errorMessage: result.error || null
    });

    return {
      success: result.success,
      messageId: result.messageId,
      status: result.status,
      renderedText: text,
      logId: log.id,
      provider: provider.name
    };
  }

  // ----------------------------------------------------
  // ADMISSION CRM JOURNEY COMMUNICATIONS
  // ----------------------------------------------------

  sendWelcomeEnquiry(context, lead, prospectusLink = 'https://vedictree.edu.in/prospectus-2026.pdf') {
    return this.sendTemplate(context, {
      leadId: lead.id,
      recipientPhone: lead.phone,
      recipientName: lead.guardianName,
      templateId: 'tpl_welcome_enquiry',
      parameters: {
        guardianName: lead.guardianName,
        studentName: lead.studentName,
        targetGrade: lead.targetGrade,
        link: prospectusLink
      }
    });
  }

  sendVisitConfirmation(context, lead, visit) {
    const campus = db.campuses.find(c => c.id === (visit.campusId || lead.campusId));
    const campusName = campus ? campus.name : 'Vedic Tree Campus';
    const dateTimeStr = new Date(visit.scheduledAt).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    return this.sendTemplate(context, {
      leadId: lead.id,
      recipientPhone: lead.phone,
      recipientName: lead.guardianName,
      templateId: 'tpl_visit_confirmation',
      parameters: {
        guardianName: lead.guardianName,
        studentName: lead.studentName,
        dateTime: dateTimeStr,
        campusName
      }
    });
  }

  sendAssessmentInvite(context, lead, application, assessmentDate) {
    const dateTimeStr = new Date(assessmentDate).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    return this.sendTemplate(context, {
      leadId: lead.id,
      recipientPhone: lead.phone,
      recipientName: lead.guardianName,
      templateId: 'tpl_assessment_invite',
      parameters: {
        guardianName: lead.guardianName,
        studentName: lead.studentName,
        appNo: application.applicationNumber,
        dateTime: dateTimeStr
      }
    });
  }

  sendOfferLetter(context, lead, offer) {
    const validUntilStr = new Date(offer.validUntil).toLocaleDateString('en-IN', {
      dateStyle: 'medium'
    });

    return this.sendTemplate(context, {
      leadId: lead.id,
      recipientPhone: lead.phone,
      recipientName: lead.guardianName,
      templateId: 'tpl_admission_offer',
      parameters: {
        guardianName: lead.guardianName,
        studentName: lead.studentName,
        offerNo: offer.offerNumber,
        grade: lead.targetGrade,
        validUntil: validUntilStr
      }
    });
  }

  sendFeeReceipt(context, lead, admissionRecord) {
    return this.sendTemplate(context, {
      leadId: lead.id,
      recipientPhone: lead.phone,
      recipientName: lead.guardianName,
      templateId: 'tpl_fee_confirmation',
      parameters: {
        guardianName: lead.guardianName,
        studentName: lead.studentName,
        receiptNo: admissionRecord.feeReceiptNumber,
        amount: admissionRecord.admissionFeePaid.toLocaleString('en-IN')
      }
    });
  }
}

export const CommunicationService = new CommunicationServiceClass();
