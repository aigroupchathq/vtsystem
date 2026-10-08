// VEDIC TREE OS — Communication Provider Interface
// Strategy / Adapter Pattern ensuring zero hardcoding of third-party vendors

/**
 * @typedef {Object} SendMessageResult
 * @property {boolean} success
 * @property {string} messageId
 * @property {string} status - 'QUEUED' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED'
 * @property {string} provider - Provider key (e.g. 'MOCK', 'META_CLOUD', 'TWILIO')
 * @property {string} [renderedBody]
 * @property {string} [error]
 */

export class ICommunicationProvider {
  /**
   * @param {string} providerName
   */
  constructor(providerName) {
    if (new.target === ICommunicationProvider) {
      throw new TypeError('Cannot construct ICommunicationProvider instances directly.');
    }
    this.name = providerName;
  }

  /**
   * Identifies the primary channel for this provider
   * @returns {'WHATSAPP'|'SMS'|'EMAIL'|'PUSH'|'IN_APP'}
   */
  getChannel() {
    return 'WHATSAPP';
  }

  /**
   * Provider identifier code (e.g. 'MOCK', 'META_CLOUD', 'TWILIO', 'MSG91', 'SENDGRID', 'FCM', 'IN_APP')
   */
  getProviderId() {
    return this.name;
  }

  /**
   * Generic send method accepting structured payload
   * @param {Object} params
   * @returns {Promise<SendMessageResult>|SendMessageResult}
   */
  async send(params) {
    if (params.templateId && params.rawTemplateBody) {
      return this.sendTemplateMessage(params);
    }
    return this.sendTextMessage(params);
  }

  /**
   * Dispatches a freeform text message
   * @param {Object} params
   * @param {string} params.to - Address / phone / email
   * @param {string} params.text - Message content
   * @param {string} [params.subject] - Optional subject
   * @param {Object} [params.metadata]
   * @returns {Promise<SendMessageResult>|SendMessageResult}
   */
  sendTextMessage(_params) {
    throw new Error('sendTextMessage() must be implemented by concrete communication provider.');
  }

  /**
   * Dispatches a pre-approved template message with parameters
   * @param {Object} params
   * @param {string} params.to - Address / phone / email
   * @param {string} params.templateId
   * @param {string} params.rawTemplateBody
   * @param {Record<string, string|number>} params.parameters
   * @param {Object} [params.metadata]
   * @returns {Promise<SendMessageResult>|SendMessageResult}
   */
  sendTemplateMessage(_params) {
    throw new Error('sendTemplateMessage() must be implemented by concrete communication provider.');
  }

  /**
   * Dispatches a media attachment (PDF prospectus, receipt, offer letter)
   * @param {Object} params
   * @param {string} params.to
   * @param {string} params.mediaUrl
   * @param {string} [params.caption]
   * @param {string} [params.mediaType]
   * @returns {Promise<SendMessageResult>|SendMessageResult}
   */
  sendMediaMessage(_params) {
    throw new Error('sendMediaMessage() must be implemented by concrete communication provider.');
  }

  /**
   * Check or poll external delivery status
   * @param {string} _externalId
   * @returns {Promise<{ status: string, deliveredAt?: string, readAt?: string }>}
   */
  async checkDeliveryStatus(_externalId) {
    return { status: 'DELIVERED', deliveredAt: new Date().toISOString() };
  }
}

