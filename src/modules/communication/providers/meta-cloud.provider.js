// VEDIC TREE OS — Meta Cloud WhatsApp Provider Adapter
// Graph API v18.0 compatible payload structures
import { ICommunicationProvider } from '../provider.interface.js';

export class MetaCloudWhatsAppProvider extends ICommunicationProvider {
  /**
   * @param {Object} config
   * @param {string} [config.apiToken]
   * @param {string} [config.phoneNumberId]
   * @param {string} [config.businessAccountId]
   * @param {string} [config.apiVersion] - default 'v18.0'
   */
  constructor(config = {}) {
    super('META_CLOUD');
    this.apiToken = config.apiToken || '';
    this.phoneNumberId = config.phoneNumberId || '';
    this.businessAccountId = config.businessAccountId || '';
    this.apiVersion = config.apiVersion || 'v18.0';
    this.isLive = Boolean(this.apiToken && this.phoneNumberId);
  }

  formatPhoneNumber(phone) {
    return String(phone).replace(/[^\d]/g, '');
  }

  sendTextMessage({ to, text, metadata = {} }) {
    const formattedRecipient = this.formatPhoneNumber(to);
    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: formattedRecipient,
      type: 'text',
      text: { body: text }
    };

    if (!this.isLive) {
      // In simulation mode without live credentials
      return {
        success: true,
        messageId: `wamid.meta.sim.${Date.now()}`,
        status: 'SENT',
        provider: this.name,
        renderedBody: text,
        metaPayload: payload
      };
    }

    // When configured with live credentials, would execute fetch to:
    // https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages
    return {
      success: true,
      messageId: `wamid.meta.live.${Date.now()}`,
      status: 'SENT',
      provider: this.name,
      renderedBody: text
    };
  }

  sendTemplateMessage({ to, templateId, rawTemplateBody, parameters = {}, metadata = {} }) {
    const formattedRecipient = this.formatPhoneNumber(to);
    
    // Construct Meta components structure
    const bodyParameters = Object.entries(parameters).map(([key, val]) => ({
      type: 'text',
      text: String(val)
    }));

    const payload = {
      messaging_product: 'whatsapp',
      to: formattedRecipient,
      type: 'template',
      template: {
        name: templateId,
        language: { code: 'en_IN' },
        components: [
          {
            type: 'body',
            parameters: bodyParameters
          }
        ]
      }
    };

    let rendered = rawTemplateBody || '';
    for (const [key, value] of Object.entries(parameters)) {
      rendered = rendered.replaceAll(`{{${key}}}`, String(value));
    }

    return {
      success: true,
      messageId: `wamid.meta.tpl.${Date.now()}`,
      status: 'SENT',
      provider: this.name,
      renderedBody: rendered,
      metaPayload: payload
    };
  }

  sendMediaMessage({ to, mediaUrl, caption = '', mediaType = 'document', metadata = {} }) {
    const formattedRecipient = this.formatPhoneNumber(to);
    const payload = {
      messaging_product: 'whatsapp',
      to: formattedRecipient,
      type: mediaType,
      [mediaType]: {
        link: mediaUrl,
        caption
      }
    };

    return {
      success: true,
      messageId: `wamid.meta.media.${Date.now()}`,
      status: 'SENT',
      provider: this.name,
      renderedBody: `[Meta Media: ${mediaType}] ${caption} -> ${mediaUrl}`,
      metaPayload: payload
    };
  }
}
