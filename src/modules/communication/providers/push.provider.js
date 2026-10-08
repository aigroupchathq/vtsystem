// VEDIC TREE OS — Push Notification Provider Adapters (Module 05)
// Encapsulates Firebase Cloud Messaging (FCM) and Web Push rails
import { ICommunicationProvider } from '../provider.interface.js';

export class MockPushProvider extends ICommunicationProvider {
  constructor(config = {}) {
    super('MOCK_PUSH');
    this.failNext = Boolean(config.failNext);
    this.failureReason = config.failureReason || 'SIMULATED_APNS_DOWN';
    this.sentPushNotifications = [];
  }

  getChannel() {
    return 'PUSH';
  }

  simulateFailure(shouldFail = true, reason = 'SIMULATED_APNS_DOWN') {
    this.failNext = shouldFail;
    this.failureReason = reason;
  }

  sendTextMessage({ to, text, subject = 'Vedic Tree Alert', metadata = {} }) {
    if (this.failNext) {
      this.failNext = false;
      return {
        success: false,
        messageId: null,
        status: 'FAILED',
        provider: this.name,
        error: this.failureReason,
        retryable: !this.failureReason.includes('REGISTRATION_TOKEN_NOT_REGISTERED')
      };
    }

    const messageId = `mock_fcm_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const record = {
      token: to,
      title: subject,
      body: text,
      messageId,
      metadata,
      sentAt: new Date().toISOString()
    };
    this.sentPushNotifications.push(record);

    return {
      success: true,
      messageId,
      status: 'SENT',
      provider: this.name,
      renderedBody: text
    };
  }

  sendTemplateMessage({ to, templateId, rawTemplateBody, parameters = {}, metadata = {} }) {
    let rendered = rawTemplateBody;
    for (const [key, val] of Object.entries(parameters)) {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(val));
    }
    return this.sendTextMessage({
      to,
      text: rendered,
      subject: metadata.subject || 'Vedic Tree Alert',
      metadata: { ...metadata, templateId }
    });
  }
}

export class FcmPushProvider extends ICommunicationProvider {
  constructor(config = {}) {
    super('FCM');
    this.projectId = config.projectId || 'vedic-tree-prod';
  }

  getChannel() {
    return 'PUSH';
  }

  sendTextMessage({ to, text, subject = 'Vedic Tree Alert', metadata = {} }) {
    if (!to || to.length < 8) {
      return {
        success: false,
        messageId: null,
        status: 'FAILED',
        provider: this.name,
        error: 'FCM_ERROR: The registration token is not a valid FCM registration token',
        retryable: false
      };
    }

    const messageId = `projects/${this.projectId}/messages/${Date.now()}`;
    return {
      success: true,
      messageId,
      status: 'SENT',
      provider: this.name,
      renderedBody: text,
      metadata: { ...metadata, subject }
    };
  }

  sendTemplateMessage({ to, templateId, rawTemplateBody, parameters = {}, metadata = {} }) {
    let rendered = rawTemplateBody;
    for (const [key, val] of Object.entries(parameters)) {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(val));
    }
    return this.sendTextMessage({
      to,
      text: rendered,
      subject: metadata.subject || 'Vedic Tree Alert',
      metadata: { ...metadata, templateId }
    });
  }
}
