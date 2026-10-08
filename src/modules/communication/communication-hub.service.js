// VEDIC TREE OS — Master Communication Hub & Dispatch Engine (Module 05)
import { db } from '../../database/db.js';
import { defaultProviderRegistry } from './provider.registry.js';
import { TemplateEngine } from './template.engine.js';
import { Logger } from '../platform/logger.service.js';

export class CommunicationHubService {
  constructor(registry = defaultProviderRegistry) {
    this.registry = registry;
  }

  // ----------------------------------------------------
  // TEMPLATES
  // ----------------------------------------------------
  getTemplates(context, filters = {}) {
    return db.getCommunicationTemplates(context, filters);
  }

  getTemplateById(context, id) {
    return db.getCommunicationTemplateById(context, id);
  }

  createTemplate(context, data) {
    if (!data.name || !data.channel || !data.body) {
      throw new Error('Template name, channel, and body are required.');
    }
    const variables = data.variables || TemplateEngine.extractVariables(data.body);
    return db.createCommunicationTemplate(context, { ...data, variables });
  }

  updateTemplate(context, id, updates) {
    if (updates.body && !updates.variables) {
      updates.variables = TemplateEngine.extractVariables(updates.body);
    }
    return db.updateCommunicationTemplate(context, id, updates);
  }

  // ----------------------------------------------------
  // TRANSACTIONAL NOTIFICATIONS
  // ----------------------------------------------------
  /**
   * Dispatches a transactional notification across any of the 5 channels
   */
  async sendNotification(context, {
    channel,
    recipientType = 'GUARDIAN',
    recipientId,
    recipientName,
    recipientAddress,
    subject = null,
    body = null,
    templateId = null,
    parameters = {},
    category = 'TRANSACTIONAL',
    priority = 'NORMAL',
    isCritical = false,
    providerOverride = null,
    scheduledFor = null,
    metadata = {}
  }) {
    const ch = channel.toUpperCase();

    // 1. Check Notification Preferences (Opt-out check)
    const isAllowed = db.isChannelEnabled(context, {
      userId: recipientId,
      channel: ch,
      category,
      isCritical
    });

    if (!isAllowed) {
      Logger.info('CommunicationHub', `Notification suppressed by user preference: ${recipientId} opted out of ${category} on ${ch}`);
      return {
        success: false,
        suppressed: true,
        reason: 'OPTED_OUT_BY_USER_PREFERENCE'
      };
    }

    // 2. Resolve Content (Direct text or Template)
    let finalBody = body;
    let finalSubject = subject;

    if (templateId) {
      const template = db.getCommunicationTemplateById(context, templateId);
      if (!template) {
        throw new Error(`Communication template '${templateId}' not found.`);
      }
      const rendered = TemplateEngine.render(template.body, parameters);
      finalBody = rendered.rendered;
      if (template.subject) {
        finalSubject = TemplateEngine.render(template.subject, parameters).rendered;
      }
    }

    if (!finalBody) {
      throw new Error('Message body or valid templateId is required.');
    }

    // 3. Resolve Target Provider
    const provider = providerOverride
      ? this.registry.getProvider(ch, providerOverride)
      : this.registry.getActiveProvider(ch);

    if (!provider) {
      throw new Error(`No provider adapter available for channel '${ch}'.`);
    }

    // 4. Handle Scheduled Delivery
    if (scheduledFor && new Date(scheduledFor) > new Date()) {
      const scheduledMessage = db.createCommunicationMessage(context, {
        channel: ch,
        recipientType,
        recipientId,
        recipientName,
        recipientAddress,
        subject: finalSubject,
        body: finalBody,
        templateId,
        category,
        priority,
        status: 'SCHEDULED',
        scheduledFor,
        provider: provider.name,
        metadata
      });

      return {
        success: true,
        scheduled: true,
        messageId: scheduledMessage.id,
        scheduledFor,
        status: 'SCHEDULED'
      };
    }

    // 5. Initial Persist as QUEUED -> SENDING
    const message = db.createCommunicationMessage(context, {
      channel: ch,
      recipientType,
      recipientId,
      recipientName,
      recipientAddress,
      subject: finalSubject,
      body: finalBody,
      templateId,
      category,
      priority,
      status: 'SENDING',
      provider: provider.name,
      metadata
    });

    // 6. Provider Dispatch
    try {
      const result = await provider.send({
        to: recipientAddress,
        text: finalBody,
        subject: finalSubject,
        templateId,
        rawTemplateBody: finalBody,
        parameters,
        metadata: { ...metadata, messageId: message.id }
      });

      if (result.success) {
        db.updateMessageDeliveryStatus(context, message.id, result.status || 'SENT', {
          externalMessageId: result.messageId,
          provider: provider.name
        });

        return {
          success: true,
          messageId: message.id,
          externalMessageId: result.messageId,
          status: result.status || 'SENT',
          renderedBody: finalBody,
          provider: provider.name
        };
      } else {
        // Provider returned failure
        db.updateMessageDeliveryStatus(context, message.id, 'FAILED', {
          failureReason: result.error || 'Provider rejected dispatch',
          provider: provider.name
        });

        return {
          success: false,
          messageId: message.id,
          status: 'FAILED',
          error: result.error,
          retryable: Boolean(result.retryable)
        };
      }
    } catch (err) {
      db.updateMessageDeliveryStatus(context, message.id, 'FAILED', {
        failureReason: err.message,
        provider: provider.name
      });

      return {
        success: false,
        messageId: message.id,
        status: 'FAILED',
        error: err.message,
        retryable: true
      };
    }
  }

  // ----------------------------------------------------
  // BROADCASTS & CAMPAIGNS
  // ----------------------------------------------------
  /**
   * Executes or schedules a multi-channel broadcast across a selected audience
   */
  async sendBroadcast(context, {
    title,
    channels = ['WHATSAPP'],
    audienceType = 'ALL_STUDENTS',
    audienceFilter = {},
    templateId = null,
    subject = null,
    body = null,
    scheduledFor = null
  }) {
    if (!title) throw new Error('Broadcast title is required.');
    if (!channels || channels.length === 0) throw new Error('At least one communication channel is required.');

    // 1. Resolve Target Recipients
    const recipients = db.getAudienceRecipients(context, audienceType, audienceFilter);
    if (recipients.length === 0) {
      throw new Error(`Audience resolution found 0 active recipients for type '${audienceType}'.`);
    }

    // 2. Create Broadcast Record
    const broadcast = db.createCommunicationBroadcast(context, {
      title,
      channels,
      templateId,
      subject,
      body: body || (templateId ? db.getCommunicationTemplateById(context, templateId)?.body : ''),
      audienceType,
      audienceFilter,
      totalRecipients: recipients.length * channels.length,
      scheduledFor,
      status: scheduledFor ? 'SCHEDULED' : 'PROCESSING'
    });

    // If scheduled for future, halt immediate execution
    if (scheduledFor && new Date(scheduledFor) > new Date()) {
      return {
        success: true,
        broadcastId: broadcast.id,
        status: 'SCHEDULED',
        scheduledFor,
        recipientCount: recipients.length,
        totalMessages: broadcast.totalRecipients
      };
    }

    // 3. Dispatch to all audience members across requested channels
    let sentCount = 0;
    let deliveredCount = 0;
    let failedCount = 0;

    for (const recipient of recipients) {
      for (const channel of channels) {
        const ch = channel.toUpperCase();
        let targetAddress = recipient.phone;
        if (ch === 'EMAIL') targetAddress = recipient.email;
        if (ch === 'PUSH') targetAddress = recipient.pushToken;
        if (ch === 'IN_APP') targetAddress = recipient.recipientId;

        if (!targetAddress) {
          failedCount++;
          continue;
        }

        const dispatchResult = await this.sendNotification(context, {
          channel: ch,
          recipientType: recipient.recipientType,
          recipientId: recipient.recipientId,
          recipientName: recipient.recipientName,
          recipientAddress: targetAddress,
          subject,
          body,
          templateId,
          parameters: {
            guardianName: recipient.recipientName,
            studentName: recipient.studentName || recipient.recipientName,
            campusName: context.campusName || 'Vedic Tree Academy',
            date: new Date().toLocaleDateString('en-IN')
          },
          category: 'BROADCAST',
          priority: 'NORMAL',
          isCritical: false,
          metadata: { broadcastId: broadcast.id }
        });

        if (dispatchResult.success) {
          sentCount++;
          if (dispatchResult.status === 'DELIVERED') deliveredCount++;
        } else if (!dispatchResult.suppressed) {
          failedCount++;
        }
      }
    }

    // 4. Update Broadcast Execution Summary
    db.updateCommunicationBroadcast(context, broadcast.id, {
      sentCount,
      deliveredCount,
      failedCount,
      status: 'COMPLETED',
      executedAt: new Date().toISOString()
    });

    return {
      success: true,
      broadcastId: broadcast.id,
      status: 'COMPLETED',
      totalRecipients: recipients.length,
      sentCount,
      deliveredCount,
      failedCount
    };
  }

  // ----------------------------------------------------
  // RETRY & FAILURE MANAGEMENT
  // ----------------------------------------------------
  /**
   * Retries dispatch of a failed or pending communication message
   */
  async retryMessage(context, messageId) {
    const message = db.getCommunicationMessageById(context, messageId);
    if (!message) throw new Error(`Message ${messageId} not found.`);

    if (message.retryCount >= message.maxRetries) {
      throw new Error(`Message ${messageId} has exceeded max retry limit of ${message.maxRetries}. Manual intervention required.`);
    }

    const nextRetryCount = message.retryCount + 1;
    const provider = this.registry.getActiveProvider(message.channel);

    try {
      db.updateMessageDeliveryStatus(context, message.id, 'SENDING', {
        retryCount: nextRetryCount
      });

      const result = await provider.send({
        to: message.recipientAddress,
        text: message.body,
        subject: message.subject,
        metadata: { retryAttempt: nextRetryCount }
      });

      if (result.success) {
        db.updateMessageDeliveryStatus(context, message.id, result.status || 'SENT', {
          externalMessageId: result.messageId,
          failureReason: null,
          retryCount: nextRetryCount
        });

        return {
          success: true,
          messageId: message.id,
          status: result.status || 'SENT',
          retryCount: nextRetryCount
        };
      } else {
        db.updateMessageDeliveryStatus(context, message.id, 'FAILED', {
          failureReason: result.error || 'Retry attempt failed',
          retryCount: nextRetryCount
        });

        return {
          success: false,
          messageId: message.id,
          status: 'FAILED',
          error: result.error,
          retryCount: nextRetryCount
        };
      }
    } catch (err) {
      db.updateMessageDeliveryStatus(context, message.id, 'FAILED', {
        failureReason: `Retry exception: ${err.message}`,
        retryCount: nextRetryCount
      });

      return {
        success: false,
        messageId: message.id,
        status: 'FAILED',
        error: err.message,
        retryCount: nextRetryCount
      };
    }
  }

  // ----------------------------------------------------
  // SCHEDULED DISPATCH EVALUATION
  // ----------------------------------------------------
  /**
   * Cron/worker trigger to dispatch due scheduled messages
   */
  async dispatchScheduledMessages(context) {
    const allMessages = db.getCommunicationMessages(context, { status: 'SCHEDULED' });
    const now = new Date();
    const dueMessages = allMessages.filter(m => m.scheduledFor && new Date(m.scheduledFor) <= now);

    const results = [];
    for (const msg of dueMessages) {
      const provider = this.registry.getActiveProvider(msg.channel);
      try {
        const sendResult = await provider.send({
          to: msg.recipientAddress,
          text: msg.body,
          subject: msg.subject,
          metadata: { isScheduled: true }
        });

        if (sendResult.success) {
          db.updateMessageDeliveryStatus(context, msg.id, sendResult.status || 'SENT', {
            externalMessageId: sendResult.messageId
          });
          results.push({ messageId: msg.id, status: sendResult.status || 'SENT' });
        } else {
          db.updateMessageDeliveryStatus(context, msg.id, 'FAILED', {
            failureReason: sendResult.error
          });
          results.push({ messageId: msg.id, status: 'FAILED', error: sendResult.error });
        }
      } catch (err) {
        db.updateMessageDeliveryStatus(context, msg.id, 'FAILED', {
          failureReason: err.message
        });
        results.push({ messageId: msg.id, status: 'FAILED', error: err.message });
      }
    }

    return {
      evaluatedCount: dueMessages.length,
      dispatchedCount: results.filter(r => r.status === 'SENT' || r.status === 'DELIVERED').length,
      results
    };
  }

  // ----------------------------------------------------
  // WEBHOOK & DELIVERY STATUS SIMULATION
  // ----------------------------------------------------
  simulateDeliveryWebhook(context, { externalMessageId, status }) {
    const messages = db.getCommunicationMessages(context);
    const target = messages.find(m => m.externalMessageId === externalMessageId);
    if (!target) {
      throw new Error(`Message with externalMessageId ${externalMessageId} not found.`);
    }

    return db.updateMessageDeliveryStatus(context, target.id, status);
  }

  // ----------------------------------------------------
  // HISTORY & PREFERENCES QUERIES
  // ----------------------------------------------------
  getHistory(context, filters = {}) {
    return db.getCommunicationMessages(context, filters);
  }

  getBroadcasts(context, filters = {}) {
    return db.getCommunicationBroadcasts(context, filters);
  }

  getUserPreferences(context, userId) {
    return db.getNotificationPreferences(context, userId);
  }

  setUserPreference(context, params) {
    return db.setNotificationPreference(context, params);
  }
}

export const defaultCommunicationHub = new CommunicationHubService();
