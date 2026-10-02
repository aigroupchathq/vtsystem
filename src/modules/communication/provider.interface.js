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
   * Dispatches a freeform text message
   * @param {Object} params
   * @param {string} params.to - E.164 phone number
   * @param {string} params.text - Message content
   * @param {Object} [params.metadata]
   * @returns {Promise<SendMessageResult>|SendMessageResult}
   */
  sendTextMessage(/* params */) {
    throw new Error('sendTextMessage() must be implemented by concrete communication provider.');
  }

  /**
   * Dispatches a pre-approved template message with parameters
   * @param {Object} params
   * @param {string} params.to - E.164 phone number
   * @param {string} params.templateId
   * @param {string} params.rawTemplateBody
   * @param {Record<string, string|number>} params.parameters
   * @param {Object} [params.metadata]
   * @returns {Promise<SendMessageResult>|SendMessageResult}
   */
  sendTemplateMessage(/* params */) {
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
  sendMediaMessage(/* params */) {
    throw new Error('sendMediaMessage() must be implemented by concrete communication provider.');
  }
}
