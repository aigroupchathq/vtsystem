// VEDIC TREE OS — Twilio WhatsApp Provider Adapter
import { ICommunicationProvider } from '../provider.interface.js';

export class TwilioWhatsAppProvider extends ICommunicationProvider {
  /**
   * @param {Object} config
   * @param {string} [config.accountSid]
   * @param {string} [config.authToken]
   * @param {string} [config.fromNumber] - e.g. 'whatsapp:+14155238886'
   */
  constructor(config = {}) {
    super('TWILIO');
    this.accountSid = config.accountSid || '';
    this.authToken = config.authToken || '';
    this.fromNumber = config.fromNumber || 'whatsapp:+14155238886';
    this.isLive = Boolean(this.accountSid && this.authToken);
  }

  formatTwilioNumber(phone) {
    const cleaned = String(phone).replace(/[^\d+]/g, '');
    return cleaned.startsWith('whatsapp:') ? cleaned : `whatsapp:${cleaned}`;
  }

  sendTextMessage({ to, text, metadata = {} }) {
    const toFormatted = this.formatTwilioNumber(to);

    return {
      success: true,
      messageId: `SM${Date.now()}${Math.floor(Math.random() * 100000)}`,
      status: 'SENT',
      provider: this.name,
      renderedBody: text,
      twilioParams: {
        From: this.fromNumber,
        To: toFormatted,
        Body: text
      }
    };
  }

  sendTemplateMessage({ to, templateId, rawTemplateBody, parameters = {}, metadata = {} }) {
    let rendered = rawTemplateBody || '';
    for (const [key, value] of Object.entries(parameters)) {
      rendered = rendered.replaceAll(`{{${key}}}`, String(value));
    }

    const toFormatted = this.formatTwilioNumber(to);

    return {
      success: true,
      messageId: `SM${Date.now()}${Math.floor(Math.random() * 100000)}`,
      status: 'SENT',
      provider: this.name,
      renderedBody: rendered,
      twilioParams: {
        From: this.fromNumber,
        To: toFormatted,
        Body: rendered
      }
    };
  }

  sendMediaMessage({ to, mediaUrl, caption = '', mediaType = 'application/pdf', metadata = {} }) {
    const toFormatted = this.formatTwilioNumber(to);

    return {
      success: true,
      messageId: `MM${Date.now()}${Math.floor(Math.random() * 100000)}`,
      status: 'SENT',
      provider: this.name,
      renderedBody: `[Twilio Media] ${caption} -> ${mediaUrl}`,
      twilioParams: {
        From: this.fromNumber,
        To: toFormatted,
        Body: caption,
        MediaUrl: [mediaUrl]
      }
    };
  }
}
