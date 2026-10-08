// VEDIC TREE OS — Module 05: Communication Center Comprehensive Test Suite
// Verifies multi-channel provider adapters (WhatsApp, SMS, Email, Push, In-App),
// dynamic provider switching, templates, audience resolution, broadcasts,
// notification preferences, retries, transient vs permanent failures, scheduled dispatch, and tenant barriers.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { db } from '../src/database/db.js';
import {
  TemplateEngine,
  ProviderRegistry,
  CommunicationHubService,
  MockWhatsAppProvider,
  MetaCloudWhatsAppProvider,
  TwilioWhatsAppProvider,
  MockSmsProvider,
  Msg91SmsProvider,
  TwilioSmsProvider,
  MockEmailProvider,
  SendGridEmailProvider,
  AwsSesEmailProvider,
  MockPushProvider,
  FcmPushProvider,
  InAppNotificationProvider
} from '../src/modules/communication/index.js';

describe('MODULE 05: COMMUNICATION CENTER ARCHITECTURE & TEST SUITE', () => {
  let contextBaner;
  let contextKothrud;
  let contextHq;
  let customRegistry;
  let commHub;

  beforeEach(() => {
    db.reset();

    contextBaner = {
      tenantId: 'org-vedictree',
      campusId: 'cmp-pune-baner',
      activeCampusId: 'cmp-pune-baner',
      campusName: 'Vedic Tree Baner',
      userId: 'usr-principal-baner',
      role: 'PRINCIPAL'
    };

    contextKothrud = {
      tenantId: 'org-vedictree',
      campusId: 'cmp-pune-kothrud',
      activeCampusId: 'cmp-pune-kothrud',
      campusName: 'Vedic Tree Kothrud',
      userId: 'usr-principal-kothrud',
      role: 'PRINCIPAL'
    };

    contextHq = {
      tenantId: 'org-vedictree',
      campusId: null,
      activeCampusId: null,
      userId: 'usr-hq-director',
      role: 'HQ_ADMIN'
    };

    customRegistry = new ProviderRegistry();
    commHub = new CommunicationHubService(customRegistry);
  });

  // --------------------------------------------------------------------------
  // 1. PROVIDER ADAPTERS & MULTI-CHANNEL ABSTRACTION
  // --------------------------------------------------------------------------
  describe('1. Multi-Channel Provider Adapters & Provider-Agnostic Switching', () => {
    it('1.1 Dispatches via WhatsApp adapters (Mock, Meta Cloud, Twilio)', async () => {
      // Mock WhatsApp
      const mockResult = await customRegistry.getActiveProvider('WHATSAPP').send({
        to: '+919820011223',
        text: 'Test WhatsApp message'
      });
      assert.equal(mockResult.success, true);
      assert.ok(['SENT', 'DELIVERED'].includes(mockResult.status));

      // Meta Cloud WhatsApp
      const metaProvider = new MetaCloudWhatsAppProvider();
      const metaResult = await metaProvider.send({
        to: '+919820011223',
        text: 'Meta Cloud Direct message'
      });
      assert.equal(metaResult.success, true);
      assert.match(metaResult.messageId, /^wamid\./);

      // Twilio WhatsApp
      const twilioProvider = new TwilioWhatsAppProvider();
      const twilioResult = await twilioProvider.send({
        to: '+919820011223',
        text: 'Twilio WhatsApp message'
      });
      assert.equal(twilioResult.success, true);
      assert.match(twilioResult.messageId, /^SM/);
    });

    it('1.2 Dispatches via SMS adapters (MSG91 Indian DLT & Twilio SMS)', async () => {
      // MSG91 with valid Indian MSISDN
      const msg91 = new Msg91SmsProvider();
      const msg91Result = await msg91.send({
        to: '9820011223',
        text: 'VT-ALERT: School closes early today.'
      });
      assert.equal(msg91Result.success, true);
      assert.match(msg91Result.messageId, /^msg91_/);

      // MSG91 rejects invalid unallocated number
      const invalidResult = await msg91.send({
        to: '9999900000',
        text: 'Test'
      });
      assert.equal(invalidResult.success, false);
      assert.match(invalidResult.error, /Invalid destination MSISDN/);

      // Twilio SMS
      const twilioSms = new TwilioSmsProvider();
      const twilioResult = await twilioSms.send({
        to: '+14155552671',
        text: 'Your student pickup PIN is 8492'
      });
      assert.equal(twilioResult.success, true);
      assert.match(twilioResult.messageId, /^SM/);
    });

    it('1.3 Dispatches via Email adapters (SendGrid & AWS SES)', async () => {
      // SendGrid
      const sg = new SendGridEmailProvider();
      const sgResult = await sg.send({
        to: 'parent@example.com',
        subject: 'Monthly Progress Report',
        text: 'Please review your ward’s report card.'
      });
      assert.equal(sgResult.success, true);
      assert.match(sgResult.messageId, /^sg_/);

      // AWS SES
      const ses = new AwsSesEmailProvider();
      const sesResult = await ses.send({
        to: 'guardian@example.com',
        subject: 'Tuition Fee Clearance',
        text: 'Payment received.'
      });
      assert.equal(sesResult.success, true);
      assert.match(sesResult.messageId, /^ses_/);
    });

    it('1.4 Dispatches via Push (FCM) and In-App notification adapters', async () => {
      // FCM Push
      const fcm = new FcmPushProvider({ projectId: 'vedic-tree-prod' });
      const fcmResult = await fcm.send({
        to: 'fcm_registration_token_12345678',
        subject: 'Bus Update',
        text: 'School bus is 5 mins away'
      });
      assert.equal(fcmResult.success, true);
      assert.match(fcmResult.messageId, /^projects\/vedic-tree-prod\/messages\//);

      // In-App Notification Center
      const inApp = new InAppNotificationProvider();
      const inAppResult = await inApp.send({
        to: 'usr-parent-01',
        subject: 'Fee Receipt Generated',
        text: 'Receipt RCP-2026-0001 is ready'
      });
      assert.equal(inAppResult.success, true);
      assert.equal(inAppResult.status, 'DELIVERED');
    });

    it('1.5 Seamlessly switches active provider at runtime with zero core code change', async () => {
      // Switch SMS provider from MSG91 to Mock
      const mockSms = new MockSmsProvider();
      customRegistry.register('SMS', 'MOCK_SMS_TEST', mockSms);
      customRegistry.setActiveProvider('SMS', 'MOCK_SMS_TEST');

      const activeSms = customRegistry.getActiveProvider('SMS');
      assert.equal(activeSms.name, 'MOCK_SMS');

      const result = await commHub.sendNotification(contextBaner, {
        channel: 'SMS',
        recipientId: 'grd-001',
        recipientName: 'Dr. Anand Deshmukh',
        recipientAddress: '+919820011223',
        body: 'Runtime provider switch test'
      });

      assert.equal(result.success, true);
      assert.equal(result.provider, 'MOCK_SMS');
      assert.equal(mockSms.sentMessages.length, 1);
    });
  });

  // --------------------------------------------------------------------------
  // 2. TEMPLATE ENGINE & VARIABLE INTERPOLATION
  // --------------------------------------------------------------------------
  describe('2. Template Engine & Dynamic Variable Interpolation', () => {
    it('2.1 Correctly extracts variable placeholders from template body', () => {
      const body = 'Dear {{guardianName}}, fee of {{amount}} for {{studentName}} is due on {{dueDate}}.';
      const variables = TemplateEngine.extractVariables(body);
      assert.deepEqual(variables, ['guardianName', 'amount', 'studentName', 'dueDate']);
    });

    it('2.2 Renders template variables cleanly and flags missing parameters', () => {
      const template = 'Namaste {{guardianName}}! {{studentName}} admitted to {{grade}} at {{campusName}}.';
      const { rendered, missingVariables } = TemplateEngine.render(template, {
        guardianName: 'Pooja Kulkarni',
        studentName: 'Rohan Kulkarni',
        grade: 'Grade 1'
        // campusName omitted intentionally
      });

      assert.equal(rendered, 'Namaste Pooja Kulkarni! Rohan Kulkarni admitted to Grade 1 at [campusName].');
      assert.deepEqual(missingVariables, ['campusName']);
    });

    it('2.3 Creates and updates communication templates in database', () => {
      const created = commHub.createTemplate(contextBaner, {
        channel: 'WHATSAPP',
        name: 'STEM Exhibition Invitation',
        category: 'ACADEMIC',
        body: 'Dear {{guardianName}}, join us for Science Fair on {{date}} at {{campusName}}.'
      });

      assert.match(created.id, /^tpl-whatsapp-/);
      assert.equal(created.category, 'ACADEMIC');
      assert.deepEqual(JSON.parse(created.variablesJson), ['guardianName', 'date', 'campusName']);

      const updated = commHub.updateTemplate(contextBaner, created.id, {
        name: 'STEM Exhibition Invitation v2',
        body: 'Dear {{guardianName}}, join us for Science Fair on {{date}} at {{campusName}} in {{venue}}.'
      });

      assert.equal(updated.name, 'STEM Exhibition Invitation v2');
      assert.deepEqual(JSON.parse(updated.variablesJson), ['guardianName', 'date', 'campusName', 'venue']);
    });
  });

  // --------------------------------------------------------------------------
  // 3. AUDIENCE SELECTION & RESOLUTION
  // --------------------------------------------------------------------------
  describe('3. Audience Selection & Roster Resolution', () => {
    it('3.1 Resolves all active students in campus with guardian contacts', () => {
      const recipients = db.getAudienceRecipients(contextBaner, 'ALL_STUDENTS');
      assert.ok(recipients.length >= 2);
      const kabir = recipients.find(r => r.studentName.includes('Kabir'));
      assert.ok(kabir);
      assert.equal(kabir.recipientType, 'GUARDIAN');
      assert.ok(kabir.phone);
    });

    it('3.2 Resolves audience filtered by Grade', () => {
      const grade5Students = db.getAudienceRecipients(contextBaner, 'GRADE', { grade: 'Grade 5' });
      assert.ok(grade5Students.length > 0);
      assert.ok(grade5Students.every(s => s.grade === 'Grade 5'));
    });

    it('3.3 Resolves audience filtered by Staff & Department', () => {
      const allStaff = db.getAudienceRecipients(contextBaner, 'ALL_STAFF');
      assert.ok(allStaff.length > 0);
      assert.ok(allStaff.every(s => s.recipientType === 'EMPLOYEE'));

      const academicsStaff = db.getAudienceRecipients(contextBaner, 'DEPARTMENT', { department: 'Academics' });
      assert.ok(academicsStaff.length > 0);
      assert.ok(academicsStaff.every(s => s.department.includes('Academics')));
    });
  });

  // --------------------------------------------------------------------------
  // 4. BROADCAST CAMPAIGNS & MULTI-CHANNEL DISPATCH
  // --------------------------------------------------------------------------
  describe('4. Multi-Channel Broadcast Campaigns', () => {
    it('4.1 Dispatches broadcast campaign across multiple channels to target grade', async () => {
      const result = await commHub.sendBroadcast(contextBaner, {
        title: 'Grade 5 Sports Day Notice',
        channels: ['WHATSAPP', 'SMS'],
        audienceType: 'GRADE',
        audienceFilter: { grade: 'Grade 5' },
        body: 'Please send students in house t-shirts on Friday.'
      });

      assert.equal(result.success, true);
      assert.equal(result.status, 'COMPLETED');
      assert.ok(result.sentCount >= 2);
      assert.equal(result.failedCount, 0);

      // Verify broadcast record in DB
      const broadcast = commHub.getBroadcasts(contextBaner, { status: 'COMPLETED' })[0];
      assert.equal(broadcast.title, 'Grade 5 Sports Day Notice');
      assert.equal(broadcast.status, 'COMPLETED');
    });

    it('4.2 Schedules future broadcast campaign without immediate sending', async () => {
      const futureTime = new Date(Date.now() + 86400000).toISOString();
      const result = await commHub.sendBroadcast(contextBaner, {
        title: 'Diwali Recess Reminder',
        channels: ['EMAIL'],
        audienceType: 'ALL_STUDENTS',
        subject: 'Diwali Recess Circular',
        body: 'School will be closed from next Monday.',
        scheduledFor: futureTime
      });

      assert.equal(result.success, true);
      assert.equal(result.status, 'SCHEDULED');
      assert.equal(result.scheduledFor, futureTime);

      const scheduledBroadcast = db.getCommunicationBroadcastById(contextBaner, result.broadcastId);
      assert.equal(scheduledBroadcast.status, 'SCHEDULED');
      assert.equal(scheduledBroadcast.sentCount, 0);
    });
  });

  // --------------------------------------------------------------------------
  // 5. NOTIFICATION PREFERENCES & OPT-OUT COMPLIANCE
  // --------------------------------------------------------------------------
  describe('5. Notification Preferences & Opt-Out Compliance', () => {
    it('5.1 Suppresses non-critical broadcast when recipient has opted out', async () => {
      // Parent 1 (Dr. Anand Deshmukh / usr-parent-01) is opted out of GENERAL_BROADCASTS on WHATSAPP in seed data
      const result = await commHub.sendNotification(contextBaner, {
        channel: 'WHATSAPP',
        recipientId: 'usr-parent-01',
        recipientName: 'Dr. Anand Deshmukh',
        recipientAddress: '+919820011223',
        body: 'Weekend Carnival Announcement',
        category: 'GENERAL_BROADCASTS',
        isCritical: false
      });

      assert.equal(result.success, false);
      assert.equal(result.suppressed, true);
      assert.equal(result.reason, 'OPTED_OUT_BY_USER_PREFERENCE');
    });

    it('5.2 Bypasses opt-out for critical emergency alerts and invoices', async () => {
      // Even if user opted out of normal messages, critical alerts must bypass
      const result = await commHub.sendNotification(contextBaner, {
        channel: 'WHATSAPP',
        recipientId: 'usr-parent-01',
        recipientName: 'Dr. Anand Deshmukh',
        recipientAddress: '+919820011223',
        body: 'EMERGENCY: Immediate early dismissal due to flood alert.',
        category: 'ALERT',
        isCritical: true
      });

      assert.equal(result.success, true);
      assert.ok(['SENT', 'DELIVERED'].includes(result.status));
    });

    it('5.3 Updates user notification preferences dynamically', () => {
      commHub.setUserPreference(contextBaner, {
        userId: 'usr-parent-02',
        channel: 'SMS',
        category: 'CAMPUS_EVENTS',
        enabled: false
      });

      const prefs = commHub.getUserPreferences(contextBaner, 'usr-parent-02');
      const smsPref = prefs.find(p => p.channel === 'SMS' && p.category === 'CAMPUS_EVENTS');
      assert.ok(smsPref);
      assert.equal(smsPref.enabled, false);
    });
  });

  // --------------------------------------------------------------------------
  // 6. RETRY STATE MACHINE & FAILURE RESILIENCE
  // --------------------------------------------------------------------------
  describe('6. Retry State Machine & Failure Resilience', () => {
    it('6.1 Retries failed transient message and updates delivery state', async () => {
      // Setup mock provider that fails on first attempt
      const mockSms = new MockSmsProvider();
      mockSms.simulateFailure(true, 'SIMULATED_CARRIER_TIMEOUT');
      customRegistry.register('SMS', 'MOCK_RETRY_SMS', mockSms);
      customRegistry.setActiveProvider('SMS', 'MOCK_RETRY_SMS');

      const initialResult = await commHub.sendNotification(contextBaner, {
        channel: 'SMS',
        recipientId: 'grd-001',
        recipientName: 'Dr. Anand Deshmukh',
        recipientAddress: '+919820011223',
        body: 'Transient failure test'
      });

      assert.equal(initialResult.success, false);
      assert.equal(initialResult.status, 'FAILED');
      assert.equal(initialResult.retryable, true);

      // Now retry the message
      const retryResult = await commHub.retryMessage(contextBaner, initialResult.messageId);
      assert.equal(retryResult.success, true);
      assert.equal(retryResult.status, 'SENT');
      assert.equal(retryResult.retryCount, 1);

      const dbMessage = db.getCommunicationMessageById(contextBaner, initialResult.messageId);
      assert.equal(dbMessage.status, 'SENT');
      assert.equal(dbMessage.retryCount, 1);
      assert.equal(dbMessage.failureReason, null);
    });

    it('6.2 Prevents retry when maximum retry attempts (maxRetries = 3) are exhausted', async () => {
      // Create message with retryCount already at 3
      const msg = db.createCommunicationMessage(contextBaner, {
        channel: 'SMS',
        recipientId: 'grd-004',
        recipientName: 'Rohan Kulkarni',
        recipientAddress: '+919999900000',
        body: 'Permanently failed message',
        status: 'FAILED',
        retryCount: 3,
        maxRetries: 3,
        failureReason: 'PROVIDER_ERROR: Invalid destination MSISDN'
      });

      await assert.rejects(
        async () => {
          await commHub.retryMessage(contextBaner, msg.id);
        },
        {
          name: 'Error',
          message: /has exceeded max retry limit of 3/
        }
      );
    });
  });

  // --------------------------------------------------------------------------
  // 7. SCHEDULED MESSAGES & WEBHOOK DELIVERY TRACKING
  // --------------------------------------------------------------------------
  describe('7. Scheduled Message Dispatch & Delivery Webhooks', () => {
    it('7.1 Automatically evaluates and dispatches due scheduled messages', async () => {
      // Create a message scheduled 10 minutes ago
      const pastTime = new Date(Date.now() - 600000).toISOString();
      const scheduledMsg = db.createCommunicationMessage(contextBaner, {
        channel: 'EMAIL',
        recipientId: 'grd-001',
        recipientName: 'Dr. Anand Deshmukh',
        recipientAddress: 'anand.deshmukh@example.com',
        subject: 'Scheduled Progress Digest',
        body: 'Your weekly digest is ready.',
        status: 'SCHEDULED',
        scheduledFor: pastTime
      });

      assert.equal(scheduledMsg.status, 'SCHEDULED');

      // Run dispatcher
      const dispatchReport = await commHub.dispatchScheduledMessages(contextBaner);
      assert.ok(dispatchReport.evaluatedCount >= 1);
      assert.ok(dispatchReport.dispatchedCount >= 1);

      const updated = db.getCommunicationMessageById(contextBaner, scheduledMsg.id);
      assert.equal(updated.status, 'SENT');
    });

    it('7.2 Updates delivery states (SENT -> DELIVERED -> READ) via simulated webhook', () => {
      // Seed message msg-2026-003 is currently 'SENT'
      const msg = db.getCommunicationMessageById(contextBaner, 'msg-2026-003');
      assert.equal(msg.status, 'SENT');

      // Webhook callback: DELIVERED
      commHub.simulateDeliveryWebhook(contextBaner, {
        externalMessageId: msg.externalMessageId,
        status: 'DELIVERED'
      });
      assert.equal(msg.status, 'DELIVERED');
      assert.ok(msg.deliveredAt);

      // Webhook callback: READ
      commHub.simulateDeliveryWebhook(contextBaner, {
        externalMessageId: msg.externalMessageId,
        status: 'READ'
      });
      assert.equal(msg.status, 'READ');
      assert.ok(msg.readAt);
    });
  });

  // --------------------------------------------------------------------------
  // 8. MULTI-TENANT ISOLATION BARRIER
  // --------------------------------------------------------------------------
  describe('8. Multi-Tenant Campus Isolation Barrier', () => {
    it('8.1 Prevents Baner principal from accessing Kothrud communication records', () => {
      // Create Kothrud message
      const kothrudMsg = db.createCommunicationMessage(contextKothrud, {
        channel: 'WHATSAPP',
        recipientId: 'grd-kothrud-01',
        recipientName: 'Kothrud Parent',
        recipientAddress: '+919811122233',
        body: 'Kothrud campus notice'
      });

      // Baner principal querying directly throws 403 Forbidden
      assert.throws(
        () => {
          db.getCommunicationMessageById(contextBaner, kothrudMsg.id);
        },
        {
          name: 'Error',
          message: /Access denied to campus/
        }
      );

      // Baner principal message list does NOT contain Kothrud messages
      const banerList = commHub.getHistory(contextBaner);
      assert.ok(banerList.every(m => m.campusId === 'cmp-pune-baner'));
    });

    it('8.2 Allows HQ_ADMIN to view all communications across campuses', () => {
      const hqHistory = commHub.getHistory(contextHq);
      assert.ok(hqHistory.length >= 8);
      // Contains Baner records
      assert.ok(hqHistory.some(m => m.campusId === 'cmp-pune-baner'));
    });
  });
});
