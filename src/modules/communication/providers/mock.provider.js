// VEDIC TREE OS — Mock WhatsApp Provider (Test & Sandbox Adapter)
import { ICommunicationProvider } from '../provider.interface.js';

export class MockWhatsAppProvider extends ICommunicationProvider {
  constructor(config = {}) {
    super('MOCK');
    this.sentMessages = [];
    this.simulateFailure = config.simulateFailure || false;
  }

  interpolate(body, params = {}) {
    let result = body || '';
    for (const [key, value] of Object.entries(params)) {
      result = result.replaceAll(`{{${key}}}`, String(value));
    }
    return result;
  }

  sendTextMessage({ to, text, metadata = {} }) {
    if (this.simulateFailure) {
      return {
        success: false,
        messageId: `mock-fail-${Date.now()}`,
        status: 'FAILED',
        provider: this.name,
        error: 'Simulated communication gateway outage.'
      };
    }

    const messageId = `mock-msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const record = {
      messageId,
      to,
      type: 'TEXT',
      body: text,
      status: 'DELIVERED',
      provider: this.name,
      metadata,
      timestamp: new Date().toISOString()
    };

    this.sentMessages.push(record);
    return {
      success: true,
      messageId,
      status: 'DELIVERED',
      provider: this.name,
      renderedBody: text
    };
  }

  sendTemplateMessage({ to, templateId, rawTemplateBody, parameters = {}, metadata = {} }) {
    if (this.simulateFailure) {
      return {
        success: false,
        messageId: `mock-fail-${Date.now()}`,
        status: 'FAILED',
        provider: this.name,
        error: 'Simulated communication gateway outage.'
      };
    }

    const rendered = this.interpolate(rawTemplateBody, parameters);
    const messageId = `mock-wa-msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const record = {
      messageId,
      to,
      type: 'TEMPLATE',
      templateId,
      parameters,
      body: rendered,
      status: 'DELIVERED',
      provider: this.name,
      metadata,
      timestamp: new Date().toISOString()
    };

    this.sentMessages.push(record);
    return {
      success: true,
      messageId,
      status: 'DELIVERED',
      provider: this.name,
      renderedBody: rendered
    };
  }

  sendMediaMessage({ to, mediaUrl, caption = '', mediaType = 'application/pdf', metadata = {} }) {
    const messageId = `mock-media-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const record = {
      messageId,
      to,
      type: 'MEDIA',
      mediaUrl,
      caption,
      mediaType,
      status: 'DELIVERED',
      provider: this.name,
      metadata,
      timestamp: new Date().toISOString()
    };

    this.sentMessages.push(record);
    return {
      success: true,
      messageId,
      status: 'DELIVERED',
      provider: this.name,
      renderedBody: `[Media: ${mediaType}] ${caption} -> ${mediaUrl}`
    };
  }

  getHistory() {
    return [...this.sentMessages];
  }

  clear() {
    this.sentMessages = [];
  }
}
