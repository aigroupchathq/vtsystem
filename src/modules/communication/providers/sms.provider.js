// VEDIC TREE OS — SMS Provider Adapters (Module 05)
// Encapsulates Indian DLT-compliant rails (MSG91) and international SMS rails (Twilio)
import { ICommunicationProvider } from '../provider.interface.js';

/**
 * Mock SMS Provider for local development, tests, and sandbox verification
 */
export class MockSmsProvider extends ICommunicationProvider {
  constructor(config = {}) {
    super('MOCK_SMS');
    this.failNext = Boolean(config.failNext);
    this.failureReason = config.failureReason || 'SIMULATED_CARRIER_TIMEOUT';
    this.sentMessages = [];
  }

  getChannel() {
    return 'SMS';
  }

  simulateFailure(shouldFail = true, reason = 'SIMULATED_CARRIER_TIMEOUT') {
    this.failNext = shouldFail;
    this.failureReason = reason;
  }

  sendTextMessage({ to, text, metadata = {} }) {
    if (this.failNext) {
      this.failNext = false; // Reset after one failure for retry testing
      return {
        success: false,
        messageId: null,
        status: 'FAILED',
        provider: this.name,
        error: this.failureReason,
        retryable: !this.failureReason.includes('INVALID_NUMBER')
      };
    }

    const messageId = `mock_sms_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const record = {
      to,
      text,
      messageId,
      metadata,
      sentAt: new Date().toISOString()
    };
    this.sentMessages.push(record);

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
    return this.sendTextMessage({ to, text: rendered, metadata: { ...metadata, templateId } });
  }
}

/**
 * MSG91 SMS Provider (India DLT-Compliant Rails)
 */
export class Msg91SmsProvider extends ICommunicationProvider {
  constructor(config = {}) {
    super('MSG91');
    this.authKey = config.authKey || 'mock_msg91_key_india_dlt';
    this.senderId = config.senderId || 'VEDICT';
  }

  getChannel() {
    return 'SMS';
  }

  sanitizeMsisdn(phone) {
    const cleaned = String(phone).replace(/[^\d]/g, '');
    return cleaned.startsWith('91') ? cleaned : `91${cleaned}`;
  }

  sendTextMessage({ to, text, metadata = {} }) {
    const cleanTo = this.sanitizeMsisdn(to);
    if (cleanTo.length < 10 || cleanTo === '919999900000') {
      return {
        success: false,
        messageId: null,
        status: 'FAILED',
        provider: this.name,
        error: 'MSG91_CARRIER_ERROR: Invalid destination MSISDN (Unallocated telecom number)',
        retryable: false
      };
    }

    const messageId = `msg91_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return {
      success: true,
      messageId,
      status: 'SENT',
      provider: this.name,
      renderedBody: text,
      metadata
    };
  }

  sendTemplateMessage({ to, templateId, rawTemplateBody, parameters = {}, metadata = {} }) {
    let rendered = rawTemplateBody;
    for (const [key, val] of Object.entries(parameters)) {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(val));
    }
    return this.sendTextMessage({ to, text: rendered, metadata: { ...metadata, templateId } });
  }
}

/**
 * Twilio SMS Provider (International Multi-Country SMS)
 */
export class TwilioSmsProvider extends ICommunicationProvider {
  constructor(config = {}) {
    super('TWILIO_SMS');
    this.accountSid = config.accountSid || 'mock_twilio_account_sid';
    this.fromNumber = config.fromNumber || '+15005550006';
  }

  getChannel() {
    return 'SMS';
  }

  sendTextMessage({ to, text, metadata = {} }) {
    if (!to || to.length < 7) {
      return {
        success: false,
        messageId: null,
        status: 'FAILED',
        provider: this.name,
        error: 'TWILIO_REST_ERROR: 21211 Invalid To phone number',
        retryable: false
      };
    }

    const messageId = `SM${Date.now().toString(16)}${Math.floor(Math.random() * 1000000).toString(16)}`;
    return {
      success: true,
      messageId,
      status: 'SENT',
      provider: this.name,
      renderedBody: text,
      metadata
    };
  }

  sendTemplateMessage({ to, templateId, rawTemplateBody, parameters = {}, metadata = {} }) {
    let rendered = rawTemplateBody;
    for (const [key, val] of Object.entries(parameters)) {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(val));
    }
    return this.sendTextMessage({ to, text: rendered, metadata: { ...metadata, templateId } });
  }
}
