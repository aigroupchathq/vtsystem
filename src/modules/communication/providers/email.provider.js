// VEDIC TREE OS — Email Provider Adapters (Module 05)
// Encapsulates SendGrid, Amazon SES, and Mock Email engines
import { ICommunicationProvider } from '../provider.interface.js';

export class MockEmailProvider extends ICommunicationProvider {
  constructor(config = {}) {
    super('MOCK_EMAIL');
    this.failNext = Boolean(config.failNext);
    this.failureReason = config.failureReason || 'SIMULATED_SMTP_TIMEOUT';
    this.sentEmails = [];
  }

  getChannel() {
    return 'EMAIL';
  }

  simulateFailure(shouldFail = true, reason = 'SIMULATED_SMTP_TIMEOUT') {
    this.failNext = shouldFail;
    this.failureReason = reason;
  }

  sendTextMessage({ to, text, subject = 'Notification from Vedic Tree', metadata = {} }) {
    if (this.failNext) {
      this.failNext = false;
      return {
        success: false,
        messageId: null,
        status: 'FAILED',
        provider: this.name,
        error: this.failureReason,
        retryable: !this.failureReason.includes('BOUNCE_PERMANENT')
      };
    }

    const messageId = `mock_email_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const record = {
      to,
      subject,
      body: text,
      messageId,
      metadata,
      sentAt: new Date().toISOString()
    };
    this.sentEmails.push(record);

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
    const subject = metadata.subject || 'Vedic Tree Institutional Notice';
    return this.sendTextMessage({ to, text: rendered, subject, metadata: { ...metadata, templateId } });
  }
}

export class SendGridEmailProvider extends ICommunicationProvider {
  constructor(config = {}) {
    super('SENDGRID');
    this.apiKey = config.apiKey || 'mock_sg_key';
    this.fromEmail = config.fromEmail || 'notifications@vedictree.edu.in';
  }

  getChannel() {
    return 'EMAIL';
  }

  sendTextMessage({ to, text, subject = 'Vedic Tree Notice', metadata = {} }) {
    if (!to || !to.includes('@')) {
      return {
        success: false,
        messageId: null,
        status: 'FAILED',
        provider: this.name,
        error: 'SENDGRID_API_ERROR: Invalid email format in Personalizations block',
        retryable: false
      };
    }

    const messageId = `sg_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
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
    return this.sendTextMessage({
      to,
      text: rendered,
      subject: metadata.subject || 'Vedic Tree Notice',
      metadata: { ...metadata, templateId }
    });
  }
}

export class AwsSesEmailProvider extends ICommunicationProvider {
  constructor(config = {}) {
    super('AWS_SES');
    this.region = config.region || 'ap-south-1';
    this.fromEmail = config.fromEmail || 'principal@vedictree.edu.in';
  }

  getChannel() {
    return 'EMAIL';
  }

  sendTextMessage({ to, text, subject = 'Vedic Tree Institutional Communication', metadata = {} }) {
    if (!to || !to.includes('@')) {
      return {
        success: false,
        messageId: null,
        status: 'FAILED',
        provider: this.name,
        error: 'AWS_SES_ERROR: MessageRejected: Email address is not verified or invalid',
        retryable: false
      };
    }

    const messageId = `ses_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
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
    return this.sendTextMessage({
      to,
      text: rendered,
      subject: metadata.subject || 'Vedic Tree Institutional Communication',
      metadata: { ...metadata, templateId }
    });
  }
}
